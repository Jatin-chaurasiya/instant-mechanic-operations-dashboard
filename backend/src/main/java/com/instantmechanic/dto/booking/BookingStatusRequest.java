package com.instantmechanic.dto.booking;

import com.instantmechanic.enums.BookingStatus;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookingStatusRequest {

    @NotNull(message = "Booking status is required")
    private BookingStatus status;
}