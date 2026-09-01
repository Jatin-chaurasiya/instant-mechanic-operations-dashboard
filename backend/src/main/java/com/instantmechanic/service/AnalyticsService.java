package com.instantmechanic.service;

import com.instantmechanic.dto.analytics.AnalyticsResponse;
import com.instantmechanic.dto.analytics.BookingTrendResponse;
import com.instantmechanic.dto.analytics.RevenueTrendResponse;
import com.instantmechanic.entity.Booking;
import com.instantmechanic.enums.BookingStatus;
import com.instantmechanic.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.instantmechanic.dto.analytics.CategoryBreakdownResponse;
import com.instantmechanic.dto.analytics.StatusDistributionResponse;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final BookingRepository bookingRepository;

    @Transactional(readOnly = true)
    public AnalyticsResponse getAnalytics(
            LocalDate fromDate,
            LocalDate toDate
    ) {

        long totalBookings =
                bookingRepository.countByBookingDateBetween(
                        fromDate,
                        toDate
                );

        long completedBookings =
                bookingRepository
                        .countByBookingDateBetweenAndStatus(
                                fromDate,
                                toDate,
                                BookingStatus.COMPLETED
                        );

        BigDecimal revenue =
                bookingRepository
                        .getRevenueByStatusAndDateRange(
                                BookingStatus.COMPLETED,
                                fromDate,
                                toDate
                        );

        double completionRate = 0.0;

        if (totalBookings > 0) {

            completionRate =
                    ((double) completedBookings
                            / totalBookings) * 100.0;

            completionRate =
                    BigDecimal.valueOf(completionRate)
                            .setScale(1, RoundingMode.HALF_UP)
                            .doubleValue();
        }

        List<BookingTrendResponse> bookingTrend =
                bookingRepository
                        .getBookingTrend(fromDate, toDate)
                        .stream()
                        .map(this::toBookingTrend)
                        .toList();

        List<RevenueTrendResponse> revenueTrend =
                bookingRepository
                        .getRevenueTrend(fromDate, toDate)
                        .stream()
                        .map(this::toRevenueTrend)
                        .toList();
        List<StatusDistributionResponse> statusDistribution =
                bookingRepository
                        .getStatusDistribution(fromDate, toDate)
                        .stream()
                        .map(this::toStatusDistribution)
                        .toList();

        List<CategoryBreakdownResponse> categoryBreakdown =
                bookingRepository
                        .getCategoryBreakdown(fromDate, toDate)
                        .stream()
                        .map(this::toCategoryBreakdown)
                        .toList();

        return AnalyticsResponse.builder()
                .totalBookings(totalBookings)
                .revenue(revenue)
                .completionRate(completionRate)
                .bookingsOverTime(bookingTrend)
                .revenueOverTime(revenueTrend)
                .statusDistribution(statusDistribution)
                .categoryBreakdown(categoryBreakdown)
                .build();
    }

    private BookingTrendResponse toBookingTrend(
            Object[] row
    ) {

        return BookingTrendResponse.builder()
                .date((LocalDate) row[0])
                .bookings(((Number) row[1]).longValue())
                .build();
    }

    private RevenueTrendResponse toRevenueTrend(
            Object[] row
    ) {

        BigDecimal revenue =
                (BigDecimal) row[1];

        return RevenueTrendResponse.builder()
                .date((LocalDate) row[0])
                .revenue(revenue)
                .build();
    }
    private StatusDistributionResponse toStatusDistribution(
            Object[] row
    ) {

        return StatusDistributionResponse.builder()
                .name(((BookingStatus) row[0]).name())
                .value(((Number) row[1]).longValue())
                .build();
    }
    private CategoryBreakdownResponse toCategoryBreakdown(
            Object[] row
    ) {

        return CategoryBreakdownResponse.builder()
                .category((String) row[0])
                .bookings(((Number) row[1]).longValue())
                .build();
    }
}