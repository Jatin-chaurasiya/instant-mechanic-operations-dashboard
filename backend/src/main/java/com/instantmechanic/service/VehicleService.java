package com.instantmechanic.service;

import com.instantmechanic.dto.vehicle.VehicleRequest;
import com.instantmechanic.dto.vehicle.VehicleResponse;
import com.instantmechanic.entity.Customer;
import com.instantmechanic.entity.Vehicle;
import com.instantmechanic.exception.ResourceNotFoundException;
import com.instantmechanic.repository.BookingRepository;
import com.instantmechanic.repository.CustomerRepository;
import com.instantmechanic.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.instantmechanic.exception.BadRequestException;

@Service
@RequiredArgsConstructor
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    private final CustomerRepository customerRepository;

    private final BookingRepository bookingRepository;


    // ==========================================
    // Get All Vehicles
    // Pagination + Search
    // Used in Vehicles Page
    // ==========================================

    @Transactional(readOnly = true)
    public Page<VehicleResponse> getAllVehicles(
            int page,
            int size,
            String keyword
    ) {

        if (page < 0) {
            page = 0;
        }

        if (size <= 0) {
            size = 10;
        }

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(
                        Sort.Direction.ASC,
                        "id"
                )
        );

        Page<Vehicle> vehiclePage;

        if (keyword != null &&
                !keyword.trim().isEmpty()) {

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


    // ==========================================
    // Get Vehicles By Customer
    // Pagination + Search
    // Used in Booking
    // ==========================================

    @Transactional(readOnly = true)
    public Page<VehicleResponse> getVehiclesByCustomer(
            Long customerId,
            int page,
            int size,
            String keyword
    ) {

        if (page < 0) {
            page = 0;
        }

        if (size <= 0) {
            size = 10;
        }

        if (!customerRepository.existsById(customerId)) {

            throw new ResourceNotFoundException(
                    "Customer not found with id: " + customerId
            );
        }

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(
                        Sort.Direction.ASC,
                        "id"
                )
        );

        Page<Vehicle> vehiclePage;

        if (keyword != null &&
                !keyword.trim().isEmpty()) {

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


    // ==========================================
    // Add Vehicle
    // ==========================================

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
    // ==========================================
// Delete Vehicle
// ==========================================

    @Transactional
    public void deleteVehicle(Long vehicleId) {

        // Vehicle existence check
        if (!vehicleRepository.existsById(vehicleId)) {

            throw new ResourceNotFoundException(
                    "Vehicle not found with id: " + vehicleId
            );
        }

        // Check whether vehicle is linked
        // with any existing booking
        if (bookingRepository.existsByVehicleId(vehicleId)) {

            throw new BadRequestException(
                    "Vehicle cannot be deleted because it is linked to existing bookings."
            );
        }

        // Safe to delete
        vehicleRepository.deleteById(vehicleId);
    }
    // ==========================================
    // Entity → DTO
    // ==========================================

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