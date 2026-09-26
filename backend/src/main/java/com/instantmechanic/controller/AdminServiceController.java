package com.instantmechanic.controller;

import com.instantmechanic.dto.service.ServiceRequest;
import com.instantmechanic.dto.service.ServiceResponse;
import com.instantmechanic.service.ServiceService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/services")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class AdminServiceController {

    private final ServiceService serviceService;

    // Get all services for admin
    @GetMapping
    public ResponseEntity<List<ServiceResponse>> getAllServices() {

        return ResponseEntity.ok(
                serviceService.getAllServicesForAdmin()
        );
    }

    // Get service by ID for admin
    @GetMapping("/{id}")
    public ResponseEntity<ServiceResponse> getServiceById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                serviceService.getServiceByIdForAdmin(id)
        );
    }

    // Add service
    @PostMapping
    public ResponseEntity<ServiceResponse> addService(
            @Valid @RequestBody ServiceRequest request
    ) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(
                        serviceService.addService(request)
                );
    }

    // Update service
    @PutMapping("/{id}")
    public ResponseEntity<ServiceResponse> updateService(
            @PathVariable Long id,
            @Valid @RequestBody ServiceRequest request
    ) {

        return ResponseEntity.ok(
                serviceService.updateService(
                        id,
                        request
                )
        );
    }

    // Activate service
    @PutMapping("/{id}/activate")
    public ResponseEntity<ServiceResponse> activateService(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                serviceService.activateService(id)
        );
    }

    // Deactivate service
    @PutMapping("/{id}/deactivate")
    public ResponseEntity<ServiceResponse> deactivateService(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                serviceService.deactivateService(id)
        );
    }
}