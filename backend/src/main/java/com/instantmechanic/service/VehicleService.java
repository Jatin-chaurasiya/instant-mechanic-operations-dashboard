package com.instantmechanic.service;

import com.instantmechanic.dto.vehicle.CustomerVehicleRequest;
import com.instantmechanic.dto.vehicle.VehicleRequest;
import com.instantmechanic.dto.vehicle.VehicleResponse;
import com.instantmechanic.entity.Customer;
import com.instantmechanic.entity.Vehicle;
import com.instantmechanic.exception.BadRequestException;
import com.instantmechanic.exception.ResourceNotFoundException;
import com.instantmechanic.repository.BookingRepository;
import com.instantmechanic.repository.CustomerRepository;
import com.instantmechanic.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class VehicleService {

    private final VehicleRepository vehicleRepository;
    private final CustomerRepository customerRepository;
    private final BookingRepository bookingRepository;


    // =========================================================
    // ADMIN
    // Get All Vehicles
    // =========================================================

    @Transactional(readOnly = true)
    public Page<VehicleResponse> getAllVehicles(
            int page,
            int size,
            String keyword
    ) {

        Pageable pageable = createPageable(page, size);

        Page<Vehicle> vehiclePage;

        if (hasKeyword(keyword)) {

            vehiclePage =
                    vehicleRepository.searchAllVehicles(
                            keyword.trim(),
                            pageable
                    );

        } else {

            vehiclePage =
                    vehicleRepository.findAll(pageable);
        }

        return vehiclePage.map(this::entityToDto);
    }


    // =========================================================
    // ADMIN
    // Get Vehicles By Customer
    // =========================================================

    @Transactional(readOnly = true)
    public Page<VehicleResponse> getVehiclesByCustomer(
            Long customerId,
            int page,
            int size,
            String keyword
    ) {

        if (!customerRepository.existsById(customerId)) {

            throw new ResourceNotFoundException(
                    "Customer not found with id: " + customerId
            );
        }

        Pageable pageable = createPageable(page, size);

        Page<Vehicle> vehiclePage;

        if (hasKeyword(keyword)) {

            vehiclePage =
                    vehicleRepository.searchByCustomer(
                            customerId,
                            keyword.trim(),
                            pageable
                    );

        } else {

            vehiclePage =
                    vehicleRepository.findByCustomerId(
                            customerId,
                            pageable
                    );
        }

        return vehiclePage.map(this::entityToDto);
    }


    // =========================================================
    // ADMIN
    // Add Vehicle For Customer
    // =========================================================

    @Transactional
    public VehicleResponse addVehicle(
            VehicleRequest request
    ) {

        Customer customer =
                customerRepository.findById(
                        request.getCustomerId()
                ).orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Customer not found with id: "
                                        + request.getCustomerId()
                        )
                );

        Vehicle vehicle = new Vehicle();

        vehicle.setVehicleNumber(
                request.getVehicleNumber().trim()
        );

        vehicle.setVehicleModel(
                request.getVehicleModel().trim()
        );

        vehicle.setCustomer(customer);

        Vehicle savedVehicle =
                vehicleRepository.save(vehicle);

        return entityToDto(savedVehicle);
    }


    // =========================================================
    // ADMIN
    // Delete Vehicle
    // =========================================================

    @Transactional
    public void deleteVehicle(Long vehicleId) {

        Vehicle vehicle =
                vehicleRepository.findById(vehicleId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Vehicle not found with id: "
                                                + vehicleId
                                )
                        );

        if (bookingRepository.existsByVehicleId(vehicleId)) {

            throw new BadRequestException(
                    "Vehicle cannot be deleted because it is linked to existing bookings."
            );
        }

        vehicleRepository.delete(vehicle);
    }


    // =========================================================
    // CUSTOMER
    // Get My Vehicles
    // =========================================================

    @Transactional(readOnly = true)
    public Page<VehicleResponse> getMyVehicles(
            Authentication authentication,
            int page,
            int size,
            String keyword
    ) {

        Customer customer =
                getLoggedInCustomer(authentication);

        Pageable pageable = createPageable(page, size);

        Page<Vehicle> vehiclePage;

        if (hasKeyword(keyword)) {

            vehiclePage =
                    vehicleRepository.searchByCustomer(
                            customer.getId(),
                            keyword.trim(),
                            pageable
                    );

        } else {

            vehiclePage =
                    vehicleRepository.findByCustomerId(
                            customer.getId(),
                            pageable
                    );
        }

        return vehiclePage.map(this::entityToDto);
    }


    // =========================================================
    // CUSTOMER
    // Add My Vehicle
    // =========================================================

    @Transactional
    public VehicleResponse addMyVehicle(
            CustomerVehicleRequest request,
            Authentication authentication
    ) {

        Customer customer =
                getLoggedInCustomer(authentication);

        Vehicle vehicle = new Vehicle();

        vehicle.setVehicleNumber(
                request.getVehicleNumber().trim()
        );

        vehicle.setVehicleModel(
                request.getVehicleModel().trim()
        );

        // Customer comes from JWT
        vehicle.setCustomer(customer);

        Vehicle savedVehicle =
                vehicleRepository.save(vehicle);

        return entityToDto(savedVehicle);
    }


    // =========================================================
    // CUSTOMER
    // Update My Vehicle
    // =========================================================

    @Transactional
    public VehicleResponse updateMyVehicle(
            Long vehicleId,
            CustomerVehicleRequest request,
            Authentication authentication
    ) {

        Customer customer =
                getLoggedInCustomer(authentication);

        Vehicle vehicle =
                vehicleRepository.findById(vehicleId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Vehicle not found with id: "
                                                + vehicleId
                                )
                        );

        checkOwnership(vehicle, customer);

        vehicle.setVehicleNumber(
                request.getVehicleNumber().trim()
        );

        vehicle.setVehicleModel(
                request.getVehicleModel().trim()
        );

        Vehicle updatedVehicle =
                vehicleRepository.save(vehicle);

        return entityToDto(updatedVehicle);
    }


    // =========================================================
    // CUSTOMER
    // Delete My Vehicle
    // =========================================================

    @Transactional
    public void deleteMyVehicle(
            Long vehicleId,
            Authentication authentication
    ) {

        Customer customer =
                getLoggedInCustomer(authentication);

        Vehicle vehicle =
                vehicleRepository.findById(vehicleId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Vehicle not found with id: "
                                                + vehicleId
                                )
                        );

        checkOwnership(vehicle, customer);

        if (bookingRepository.existsByVehicleId(vehicleId)) {

            throw new BadRequestException(
                    "Vehicle cannot be deleted because it is linked to existing bookings."
            );
        }

        vehicleRepository.delete(vehicle);
    }


    // =========================================================
    // PRIVATE
    // Get Logged-in Customer
    // =========================================================

    private Customer getLoggedInCustomer(
            Authentication authentication
    ) {

        String email = authentication.getName();

        return customerRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Customer not found"
                        )
                );
    }


    // =========================================================
    // PRIVATE
    // Ownership Check
    // =========================================================

    private void checkOwnership(
            Vehicle vehicle,
            Customer customer
    ) {

        if (!vehicle.getCustomer().getId()
                .equals(customer.getId())) {

            throw new BadRequestException(
                    "You are not allowed to access this vehicle."
            );
        }
    }


    // =========================================================
    // PRIVATE
    // Pageable
    // =========================================================

    private Pageable createPageable(
            int page,
            int size
    ) {

        if (page < 0) {
            page = 0;
        }

        if (size <= 0) {
            size = 10;
        }

        return PageRequest.of(
                page,
                size,
                Sort.by(
                        Sort.Direction.ASC,
                        "id"
                )
        );
    }


    // =========================================================
    // PRIVATE
    // Keyword Check
    // =========================================================

    private boolean hasKeyword(String keyword) {

        return keyword != null &&
                !keyword.trim().isEmpty();
    }


    // =========================================================
    // PRIVATE
    // Entity → DTO
    // =========================================================

    private VehicleResponse entityToDto(
            Vehicle vehicle
    ) {

        return VehicleResponse.builder()
                .id(vehicle.getId())
                .vehicleNumber(
                        vehicle.getVehicleNumber()
                )
                .vehicleModel(
                        vehicle.getVehicleModel()
                )
                .customerId(
                        vehicle.getCustomer().getId()
                )
                .customerName(
                        vehicle.getCustomer().getName()
                )
                .build();
    }
}