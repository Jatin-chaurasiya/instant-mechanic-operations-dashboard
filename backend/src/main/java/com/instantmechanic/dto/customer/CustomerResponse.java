package com.instantmechanic.dto.customer;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerResponse {

    private Long id;

    private String name;

    private String email;

    private String phone;

    private String address;

    private LocalDateTime createdAt;

    private long totalBookings;
}