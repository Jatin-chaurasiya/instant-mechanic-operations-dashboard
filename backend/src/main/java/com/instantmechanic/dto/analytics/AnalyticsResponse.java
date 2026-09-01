package com.instantmechanic.dto.analytics;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnalyticsResponse {

    private long totalBookings;

    private BigDecimal revenue;

    private double completionRate;

    private List<BookingTrendResponse> bookingsOverTime;

    private List<RevenueTrendResponse> revenueOverTime;

    // NEW
    private List<StatusDistributionResponse> statusDistribution;

    // NEW
    private List<CategoryBreakdownResponse> categoryBreakdown;
}