package com.instantmechanic.controller;

import com.instantmechanic.dto.vehicle.VehicleRequest;
import com.instantmechanic.dto.vehicle.VehicleResponse;
import com.instantmechanic.service.VehicleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/vehicles")
@RequiredArgsConstructor
public class VehicleController {

    private final VehicleService vehicleService;


    // =========================================================
    // Get All Vehicles
    // =========================================================

    @GetMapping
    public ResponseEntity<Page<VehicleResponse>> getAllVehicles(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String keyword
    ) {

        return ResponseEntity.ok(
                vehicleService.getAllVehicles(
                        page,
                        size,
                        keyword
                )
        );
    }


    // =========================================================
    // Get Vehicles By Customer
    // =========================================================

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<Page<VehicleResponse>>
    getVehiclesByCustomer(
            @PathVariable Long customerId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String keyword
    ) {

        return ResponseEntity.ok(
                vehicleService.getVehiclesByCustomer(
                        customerId,
                        page,
                        size,
                        keyword
                )
        );
    }


    // =========================================================
    // Add Vehicle For Customer
    // =========================================================

    @PostMapping
    public ResponseEntity<VehicleResponse> addVehicle(
            @Valid @RequestBody VehicleRequest request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        vehicleService.addVehicle(request)
                );
    }


    // =========================================================
    // Delete Vehicle
    // =========================================================

    @DeleteMapping("/{vehicleId}")
    public ResponseEntity<Void> deleteVehicle(
            @PathVariable Long vehicleId
    ) {

        vehicleService.deleteVehicle(vehicleId);

        return ResponseEntity.noContent().build();
    }
}