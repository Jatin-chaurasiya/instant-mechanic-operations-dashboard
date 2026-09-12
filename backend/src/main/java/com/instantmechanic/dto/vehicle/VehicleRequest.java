package com.instantmechanic.dto.vehicle;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VehicleRequest {

    @NotBlank(message = "Vehicle number is required")
    @Size(max = 20, message = "Vehicle number cannot exceed 20 characters")
    private String vehicleNumber;

    @NotBlank(message = "Vehicle model is required")
    @Size(max = 100, message = "Vehicle model cannot exceed 100 characters")
    private String vehicleModel;

    @NotNull(message = "Customer is required")
    private Long customerId;
}