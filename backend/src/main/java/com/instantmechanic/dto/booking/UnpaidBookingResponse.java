package com.instantmechanic.dto.booking;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UnpaidBookingResponse {

    private Long id;
    private String bookingCode;

    private String customerName;
    private String customerEmail;

    private String vehicleName;
    private String vehicleNumber;

    private String serviceName;
    private String mechanicName;

    private String status;

    private BigDecimal amount;

    private LocalDate bookingDate;
    private LocalTime bookingTime;

    private String paymentMethod;
    private String paymentStatus;
}