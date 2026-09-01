package com.instantmechanic.dto.analytics;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StatusDistributionResponse {

    private String name;

    private long value;
}