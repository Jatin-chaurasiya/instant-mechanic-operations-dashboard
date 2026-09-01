package com.instantmechanic.controller;

import com.instantmechanic.entity.Service;
import com.instantmechanic.service.ServiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/services")
@RequiredArgsConstructor
public class ServiceController {

    private final ServiceService serviceService;

    // ==========================================
    // Get all active services
    // GET /api/v1.0/services
    // ==========================================

    @GetMapping
    public ResponseEntity<List<Service>> getAllServices() {

        return ResponseEntity.ok(
                serviceService.getAllServices()
        );
    }

    // ==========================================
    // Get active service by ID
    // GET /api/v1.0/services/{id}
    // ==========================================

    @GetMapping("/{id}")
    public ResponseEntity<Service> getServiceById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                serviceService.getServiceById(id)
        );
    }

    // ==========================================
    // Get active service categories
    // GET /api/v1.0/services/categories
    // ==========================================

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getCategories() {

        return ResponseEntity.ok(
                serviceService.getCategories()
        );
    }
}