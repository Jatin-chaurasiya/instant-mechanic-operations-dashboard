package com.instantmechanic.service;

import com.instantmechanic.dto.service.ServiceRequest;
import com.instantmechanic.dto.service.ServiceResponse;
import com.instantmechanic.entity.Service;
import com.instantmechanic.exception.BadRequestException;
import com.instantmechanic.exception.ResourceNotFoundException;
import com.instantmechanic.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;

import java.util.List;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
public class ServiceService {

    private final ServiceRepository serviceRepository;

    // Get all active services for customers
    public List<ServiceResponse> getAllServices() {

        return serviceRepository
                .findByActiveTrue()
                .stream()
                .map(this::entityToDto)
                .toList();
    }

    // Get active service by ID for customers
    public ServiceResponse getServiceById(Long id) {

        Service service =
                serviceRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Service not found with id: " + id
                                )
                        );

        if (!Boolean.TRUE.equals(service.getActive())) {

            throw new ResourceNotFoundException(
                    "Service not found with id: " + id
            );
        }

        return entityToDto(service);
    }

    // Get active service categories for customers
    public List<String> getCategories() {

        return serviceRepository.findActiveCategories();
    }

    // Get all services for admin
    public List<ServiceResponse> getAllServicesForAdmin() {

        return serviceRepository.findAll()
                .stream()
                .map(this::entityToDto)
                .toList();
    }

    // Get service by ID for admin
    public ServiceResponse getServiceByIdForAdmin(Long id) {

        Service service =
                serviceRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Service not found with id: " + id
                                )
                        );

        return entityToDto(service);
    }

    // Add service by admin
    public ServiceResponse addService(
            ServiceRequest request
    ) {

        Service service = new Service();

        service.setServiceName(
                request.getServiceName().trim()
        );

        service.setCategory(
                request.getCategory().trim()
        );

        service.setDescription(
                request.getDescription() != null
                        ? request.getDescription().trim()
                        : null
        );

        service.setPrice(request.getPrice());

        service.setDurationMinutes(
                request.getDurationMinutes()
        );

        service.setActive(true);

        Service savedService =
                serviceRepository.save(service);

        return entityToDto(savedService);
    }

    // Update service by admin
    public ServiceResponse updateService(
            Long id,
            ServiceRequest request
    ) {

        Service service =
                serviceRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Service not found with id: " + id
                                )
                        );

        service.setServiceName(
                request.getServiceName().trim()
        );

        service.setCategory(
                request.getCategory().trim()
        );

        service.setDescription(
                request.getDescription() != null
                        ? request.getDescription().trim()
                        : null
        );

        service.setPrice(request.getPrice());

        service.setDurationMinutes(
                request.getDurationMinutes()
        );

        Service updatedService =
                serviceRepository.save(service);

        return entityToDto(updatedService);
    }

    // Activate service by admin
    public ServiceResponse activateService(Long id) {

        Service service =
                serviceRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Service not found with id: " + id
                                )
                        );

        if (Boolean.TRUE.equals(service.getActive())) {

            throw new BadRequestException(
                    "Service is already active"
            );
        }

        service.setActive(true);

        Service updatedService =
                serviceRepository.save(service);

        return entityToDto(updatedService);
    }

    // Deactivate service by admin
    public ServiceResponse deactivateService(Long id) {

        Service service =
                serviceRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Service not found with id: " + id
                                )
                        );

        if (!Boolean.TRUE.equals(service.getActive())) {

            throw new BadRequestException(
                    "Service is already inactive"
            );
        }

        service.setActive(false);

        Service updatedService =
                serviceRepository.save(service);

        return entityToDto(updatedService);
    }

    // Entity to DTO
    private ServiceResponse entityToDto(
            Service service
    ) {

        return ServiceResponse.builder()
                .id(service.getId())
                .serviceName(service.getServiceName())
                .category(service.getCategory())
                .description(service.getDescription())
                .price(service.getPrice())
                .durationMinutes(service.getDurationMinutes())
                .active(service.getActive())
                .build();
    }
}