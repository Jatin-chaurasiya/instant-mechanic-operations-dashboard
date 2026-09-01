package com.instantmechanic.dto.analytics;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RevenueTrendResponse {

    private LocalDate date;

    private BigDecimal revenue;
}