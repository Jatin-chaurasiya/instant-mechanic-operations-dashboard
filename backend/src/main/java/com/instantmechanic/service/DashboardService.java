package com.instantmechanic.service;

import com.instantmechanic.dto.dashboard.DashboardResponse;
import com.instantmechanic.enums.BookingStatus;
import com.instantmechanic.enums.MechanicStatus;
import com.instantmechanic.repository.BookingRepository;
import com.instantmechanic.repository.CustomerRepository;
import com.instantmechanic.repository.MechanicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final BookingRepository bookingRepository;

    private final MechanicRepository mechanicRepository;

    private final CustomerRepository customerRepository;

    @Transactional(readOnly = true)
    public DashboardResponse getDashboard() {

        LocalDate today = LocalDate.now();

        LocalDate yesterday =
                today.minusDays(1);

        // ==============================
        // Current month
        // ==============================

        LocalDate currentMonthStart =
                today.withDayOfMonth(1);

        LocalDate currentMonthEnd =
                today;

        // ==============================
        // Previous month
        // ==============================

        LocalDate previousMonthDate =
                currentMonthStart.minusDays(1);

        LocalDate previousMonthStart =
                previousMonthDate.withDayOfMonth(1);

        LocalDate previousMonthEnd =
                previousMonthDate;

        // ==============================
        // Basic dashboard metrics
        // ==============================

        long totalBookings =
                bookingRepository.count();

        long todayBookings =
                bookingRepository.countByBookingDate(
                        today
                );

        long completedBookings =
                bookingRepository.countByStatus(
                        BookingStatus.COMPLETED
                );

        long pendingBookings =
                bookingRepository.countByStatus(
                        BookingStatus.PENDING
                );

        long cancelledBookings =
                bookingRepository.countByStatus(
                        BookingStatus.CANCELLED
                );

        BigDecimal totalRevenue =
                bookingRepository.getRevenueByStatus(
                        BookingStatus.COMPLETED
                );

        long activeMechanics =
                mechanicRepository.countByStatusIn(
                        List.of(
                                MechanicStatus.AVAILABLE,
                                MechanicStatus.BUSY,
                                MechanicStatus.ON_THE_WAY
                        )
                );

        LocalDateTime thirtyDaysAgo =
                LocalDateTime.now()
                        .minusDays(30);

        long newCustomers =
                customerRepository.countByCreatedAtAfter(
                        thirtyDaysAgo
                );

        // ==============================
        // Current month bookings
        // ==============================

        long currentMonthBookings =
                bookingRepository.countByBookingDateBetween(
                        currentMonthStart,
                        currentMonthEnd
                );

        long previousMonthBookings =
                bookingRepository.countByBookingDateBetween(
                        previousMonthStart,
                        previousMonthEnd
                );

        // ==============================
        // Today vs yesterday
        // ==============================

        long yesterdayBookings =
                bookingRepository.countByBookingDate(
                        yesterday
                );

        // ==============================
        // Current month status counts
        // ==============================

        long currentCompleted =
                bookingRepository
                        .countByBookingDateBetweenAndStatus(
                                currentMonthStart,
                                currentMonthEnd,
                                BookingStatus.COMPLETED
                        );

        long previousCompleted =
                bookingRepository
                        .countByBookingDateBetweenAndStatus(
                                previousMonthStart,
                                previousMonthEnd,
                                BookingStatus.COMPLETED
                        );

        long currentPending =
                bookingRepository
                        .countByBookingDateBetweenAndStatus(
                                currentMonthStart,
                                currentMonthEnd,
                                BookingStatus.PENDING
                        );

        long previousPending =
                bookingRepository
                        .countByBookingDateBetweenAndStatus(
                                previousMonthStart,
                                previousMonthEnd,
                                BookingStatus.PENDING
                        );

        long currentCancelled =
                bookingRepository
                        .countByBookingDateBetweenAndStatus(
                                currentMonthStart,
                                currentMonthEnd,
                                BookingStatus.CANCELLED
                        );

        long previousCancelled =
                bookingRepository
                        .countByBookingDateBetweenAndStatus(
                                previousMonthStart,
                                previousMonthEnd,
                                BookingStatus.CANCELLED
                        );

        // ==============================
        // Revenue comparison
        // ==============================

        BigDecimal currentMonthRevenue =
                bookingRepository
                        .getRevenueByStatusAndDateRange(
                                BookingStatus.COMPLETED,
                                currentMonthStart,
                                currentMonthEnd
                        );

        BigDecimal previousMonthRevenue =
                bookingRepository
                        .getRevenueByStatusAndDateRange(
                                BookingStatus.COMPLETED,
                                previousMonthStart,
                                previousMonthEnd
                        );

        // ==============================
        // Customer comparison
        // ==============================

        LocalDateTime currentMonthCustomerStart =
                currentMonthStart.atStartOfDay();

        LocalDateTime currentMonthCustomerEnd =
                currentMonthEnd
                        .plusDays(1)
                        .atStartOfDay()
                        .minusNanos(1);

        LocalDateTime previousMonthCustomerStart =
                previousMonthStart.atStartOfDay();

        LocalDateTime previousMonthCustomerEnd =
                previousMonthEnd
                        .plusDays(1)
                        .atStartOfDay()
                        .minusNanos(1);

        long currentMonthCustomers =
                customerRepository.countByCreatedAtBetween(
                        currentMonthCustomerStart,
                        currentMonthCustomerEnd
                );

        long previousMonthCustomers =
                customerRepository.countByCreatedAtBetween(
                        previousMonthCustomerStart,
                        previousMonthCustomerEnd
                );

        // ==============================
        // Dynamic trends
        // ==============================

        double totalBookingsTrend =
                calculatePercentageChange(
                        previousMonthBookings,
                        currentMonthBookings
                );

        double todayBookingsTrend =
                calculatePercentageChange(
                        yesterdayBookings,
                        todayBookings
                );

        double completedBookingsTrend =
                calculatePercentageChange(
                        previousCompleted,
                        currentCompleted
                );

        double pendingBookingsTrend =
                calculatePercentageChange(
                        previousPending,
                        currentPending
                );

        double cancelledBookingsTrend =
                calculatePercentageChange(
                        previousCancelled,
                        currentCancelled
                );

        double totalRevenueTrend =
                calculatePercentageChange(
                        previousMonthRevenue,
                        currentMonthRevenue
                );

        double newCustomersTrend =
                calculatePercentageChange(
                        previousMonthCustomers,
                        currentMonthCustomers
                );

        return DashboardResponse.builder()

                // Main metrics
                .totalBookings(totalBookings)
                .todayBookings(todayBookings)
                .completedBookings(completedBookings)
                .pendingBookings(pendingBookings)
                .cancelledBookings(cancelledBookings)
                .totalRevenue(totalRevenue)
                .activeMechanics(activeMechanics)
                .newCustomers(newCustomers)

                // Trends
                .totalBookingsTrend(
                        totalBookingsTrend
                )

                .todayBookingsTrend(
                        todayBookingsTrend
                )

                .completedBookingsTrend(
                        completedBookingsTrend
                )

                .pendingBookingsTrend(
                        pendingBookingsTrend
                )

                .cancelledBookingsTrend(
                        cancelledBookingsTrend
                )

                .totalRevenueTrend(
                        totalRevenueTrend
                )

                .activeMechanicsTrend(
                        null
                )

                .newCustomersTrend(
                        newCustomersTrend
                )

                .build();
    }

    // ==============================
    // Percentage change
    // ==============================

    private double calculatePercentageChange(
            long previous,
            long current
    ) {

        if (previous == 0) {

            if (current == 0) {
                return 0.0;
            }

            return 100.0;
        }

        double percentage =
                ((double) (current - previous)
                        / previous)
                        * 100.0;

        return BigDecimal
                .valueOf(percentage)
                .setScale(1, RoundingMode.HALF_UP)
                .doubleValue();
    }

    private double calculatePercentageChange(
            BigDecimal previous,
            BigDecimal current
    ) {

        if (previous == null) {
            previous = BigDecimal.ZERO;
        }

        if (current == null) {
            current = BigDecimal.ZERO;
        }

        if (previous.compareTo(BigDecimal.ZERO) == 0) {

            if (current.compareTo(BigDecimal.ZERO) == 0) {
                return 0.0;
            }

            return 100.0;
        }

        BigDecimal difference =
                current.subtract(previous);

        BigDecimal percentage =
                difference
                        .multiply(BigDecimal.valueOf(100))
                        .divide(
                                previous,
                                1,
                                RoundingMode.HALF_UP
                        );

        return percentage.doubleValue();
    }
}