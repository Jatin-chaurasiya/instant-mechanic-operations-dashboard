package com.instantmechanic.controller;

import com.instantmechanic.dto.vehicle.VehicleRequest;
import com.instantmechanic.dto.vehicle.VehicleResponse;
import com.instantmechanic.service.VehicleService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/vehicles")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class VehicleController {

    private final VehicleService vehicleService;


    // ==========================================
    // Get Vehicles
    // Global OR Customer-wise
    // Pagination + Search
    // ==========================================

    @GetMapping
    public ResponseEntity<Page<VehicleResponse>> getVehicles(

            @RequestParam(required = false)
            Long customerId,

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "10")
            int size,

            @RequestParam(required = false)
            String keyword
    ) {

        if (customerId != null) {

            // Customer-wise vehicles
            return ResponseEntity.ok(
                    vehicleService.getVehiclesByCustomer(
                            customerId,
                            page,
                            size,
                            keyword
                    )
            );
        }

        // All vehicles
        return ResponseEntity.ok(
                vehicleService.getAllVehicles(
                        page,
                        size,
                        keyword
                )
        );
    }


    // ==========================================
    // Add Vehicle
    // ==========================================

    @PostMapping
    public ResponseEntity<VehicleResponse> addVehicle(
            @Valid @RequestBody VehicleRequest request
    ) {

        return ResponseEntity.ok(
                vehicleService.addVehicle(request)
        );
    }
    // ==========================================
// Delete Vehicle
// ==========================================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehicle(
            @PathVariable Long id
    ) {

        vehicleService.deleteVehicle(id);

        return ResponseEntity.noContent().build();
    }
}