package com.instantmechanic.dto.vehicle;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VehicleResponse {

    private Long id;

    private String vehicleNumber;

    private String vehicleModel;

    private Long customerId;

    private String customerName;
}