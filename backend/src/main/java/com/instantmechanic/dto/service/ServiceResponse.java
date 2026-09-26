package com.instantmechanic.dto.service;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServiceResponse {

    private Long id;
    private String serviceName;
    private String category;
    private String description;
    private BigDecimal price;
    private Integer durationMinutes;
    private Boolean active;
}