package com.instantmechanic.dto.payment;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateRazorpayOrderRequest {

    @NotNull(message = "Booking ID is required")
    private Long bookingId;
}