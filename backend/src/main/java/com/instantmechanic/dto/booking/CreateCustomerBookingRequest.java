package com.instantmechanic.dto.booking;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateCustomerBookingRequest {

    @NotNull(message = "Vehicle is required")
    private Long vehicleId;

    @NotNull(message = "Service is required")
    private Long serviceId;

    @NotNull(message = "Booking date is required")
    @FutureOrPresent(message = "Booking date cannot be in the past")
    private LocalDate bookingDate;

    @NotNull(message = "Booking time is required")
    private LocalTime bookingTime;
}