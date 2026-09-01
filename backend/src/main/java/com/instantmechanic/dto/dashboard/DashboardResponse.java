package com.instantmechanic.dto.dashboard;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardResponse {

    private long totalBookings;

    private long todayBookings;

    private long completedBookings;

    private long pendingBookings;

    private long cancelledBookings;

    private BigDecimal totalRevenue;

    private long activeMechanics;

    private long newCustomers;

    // ==============================
    // Dynamic trend percentages
    // ==============================

    private Double totalBookingsTrend;

    private Double todayBookingsTrend;

    private Double completedBookingsTrend;

    private Double pendingBookingsTrend;

    private Double cancelledBookingsTrend;

    private Double totalRevenueTrend;

    // Historical mechanic status is not stored,
    // so this remains null instead of fake data.
    private Double activeMechanicsTrend;

    private Double newCustomersTrend;
}