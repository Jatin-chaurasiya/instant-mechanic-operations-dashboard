package com.instantmechanic.dto.analytics;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryBreakdownResponse {

    private String category;

    private long bookings;
}