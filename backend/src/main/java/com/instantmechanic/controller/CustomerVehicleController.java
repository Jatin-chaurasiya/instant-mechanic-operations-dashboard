package com.instantmechanic.controller;

import com.instantmechanic.dto.vehicle.CustomerVehicleRequest;
import com.instantmechanic.dto.vehicle.VehicleResponse;
import com.instantmechanic.service.VehicleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customer/vehicles")
@RequiredArgsConstructor
public class CustomerVehicleController {

    private final VehicleService vehicleService;


    // Get My Vehicles
    @GetMapping
    public ResponseEntity<Page<VehicleResponse>> getMyVehicles(
            Authentication authentication,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String keyword
    ) {

        return ResponseEntity.ok(
                vehicleService.getMyVehicles(
                        authentication,
                        page,
                        size,
                        keyword
                )
        );
    }


    // =========================================================
    // Add My Vehicle
    // =========================================================

    @PostMapping
    public ResponseEntity<VehicleResponse> addMyVehicle(
            @Valid @RequestBody CustomerVehicleRequest request,
            Authentication authentication
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        vehicleService.addMyVehicle(
                                request,
                                authentication
                        )
                );
    }


    // =========================================================
    // Update My Vehicle
    // =========================================================

    @PutMapping("/{vehicleId}")
    public ResponseEntity<VehicleResponse> updateMyVehicle(
            @PathVariable Long vehicleId,
            @Valid @RequestBody CustomerVehicleRequest request,
            Authentication authentication
    ) {

        return ResponseEntity.ok(
                vehicleService.updateMyVehicle(
                        vehicleId,
                        request,
                        authentication
                )
        );
    }


    // =========================================================
    // Delete My Vehicle
    // =========================================================

    @DeleteMapping("/{vehicleId}")
    public ResponseEntity<Void> deleteMyVehicle(
            @PathVariable Long vehicleId,
            Authentication authentication
    ) {

        vehicleService.deleteMyVehicle(
                vehicleId,
                authentication
        );

        return ResponseEntity.noContent().build();
    }
}