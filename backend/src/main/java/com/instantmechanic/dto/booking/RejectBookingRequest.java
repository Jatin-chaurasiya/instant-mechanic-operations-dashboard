package com.instantmechanic.dto.booking;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RejectBookingRequest {

    @NotBlank(message = "Rejection reason is required")
    @Size(
            max = 500,
            message = "Rejection reason cannot exceed 500 characters"
    )
    private String reason;
}