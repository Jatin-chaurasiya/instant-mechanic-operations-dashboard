package com.instantmechanic.dto.booking;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateBookingRequest {

    @NotNull(message = "Customer is required")
    private Long customerId;

    @NotNull(message = "Vehicle is required")
    private Long vehicleId;

    @NotNull(message = "Service is required")
    private Long serviceId;

    // Optional
    private Long mechanicId;

    @NotNull(message = "Booking date is required")
    private LocalDate bookingDate;

    @NotNull(message = "Booking time is required")
    private LocalTime bookingTime;

    @NotNull(message = "Amount is required")
    @DecimalMin(
            value = "0.0",
            inclusive = true,
            message = "Amount cannot be negative"
    )
    private BigDecimal amount;
}