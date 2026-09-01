package com.instantmechanic.dto.analytics;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingTrendResponse {

    private LocalDate date;

    private long bookings;
}