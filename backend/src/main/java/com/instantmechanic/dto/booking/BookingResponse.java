package com.instantmechanic.dto.booking;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingResponse {

    private Long id;

    private String bookingCode;

    private String customerName;

    private String customerEmail;

    private String vehicleName;

    private String vehicleNumber;

    private String serviceName;

    private String mechanicName;

    private BigDecimal amount;

    private LocalDate bookingDate;

    private LocalTime bookingTime;

    private String status;
}