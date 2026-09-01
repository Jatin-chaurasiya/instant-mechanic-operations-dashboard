package com.instantmechanic.controller;

import com.instantmechanic.entity.Service;
import com.instantmechanic.service.ServiceService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/services")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class ServiceController {

    private final ServiceService serviceService;

    // Get all active services
    @GetMapping
    public ResponseEntity<List<Service>> getAllServices() {

        return ResponseEntity.ok(
                serviceService.getAllServices()
        );
    }

    // Get active service by ID
    @GetMapping("/{id}")
    public ResponseEntity<Service> getServiceById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                serviceService.getServiceById(id)
        );
    }

    // Get active service categories
    @GetMapping("/categories")
    public ResponseEntity<List<String>> getCategories() {

        return ResponseEntity.ok(
                serviceService.getCategories()
        );
    }
}