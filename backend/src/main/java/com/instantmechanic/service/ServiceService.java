package com.instantmechanic.service;

import com.instantmechanic.entity.Service;
import com.instantmechanic.exception.ResourceNotFoundException;
import com.instantmechanic.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;

import java.util.List;
@org.springframework.stereotype.Service

@RequiredArgsConstructor
public class ServiceService {

    private final ServiceRepository serviceRepository;

    // ==========================================
    // Get all active services
    // ==========================================

    public List<Service> getAllServices() {

        return serviceRepository.findByActiveTrue();
    }

    // ==========================================
    // Get active service by ID
    // ==========================================

    public Service getServiceById(Long id) {

        Service service =
                serviceRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Service not found with id: " + id
                                )
                        );

        if (!Boolean.TRUE.equals(
                service.getActive()
        )) {
            throw new ResourceNotFoundException(
                    "Service not found with id: " + id
            );
        }

        return service;
    }

    // ==========================================
    // Get active service categories
    // ==========================================

    public List<String> getCategories() {

        return serviceRepository
                .findActiveCategories();
    }
}