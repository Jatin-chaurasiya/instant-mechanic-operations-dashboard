package com.instantmechanic.service;

import com.instantmechanic.dto.GlobalSearch.GlobalSearchItem;
import com.instantmechanic.dto.GlobalSearch.GlobalSearchResponse;
import com.instantmechanic.entity.Booking;
import com.instantmechanic.entity.Customer;
import com.instantmechanic.entity.Mechanic;
import com.instantmechanic.entity.Vehicle;
import com.instantmechanic.repository.BookingRepository;
import com.instantmechanic.repository.CustomerRepository;
import com.instantmechanic.repository.MechanicRepository;
import com.instantmechanic.repository.ServiceRepository;
import com.instantmechanic.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GlobalSearchService {

    private final BookingRepository bookingRepository;
    private final CustomerRepository customerRepository;
    private final MechanicRepository mechanicRepository;
    private final VehicleRepository vehicleRepository;
    private final ServiceRepository serviceRepository;

    public GlobalSearchResponse search(String query) {

        List<GlobalSearchItem> results = new ArrayList<>();

        if (query == null || query.trim().isEmpty()) {
            return GlobalSearchResponse.builder()
                    .query(query)
                    .totalResults(0)
                    .results(results)
                    .build();
        }

        String searchQuery = query.trim();

        // 1. Bookings
        List<Booking> bookings =
                bookingRepository.searchBookings(searchQuery);

        for (Booking booking : bookings) {

            String customerName =
                    booking.getCustomer() != null
                            ? booking.getCustomer().getName()
                            : "Unknown Customer";

            String serviceName =
                    booking.getService() != null
                            ? booking.getService().getServiceName()
                            : "Unknown Service";

            results.add(
                    GlobalSearchItem.builder()
                            .type("BOOKING")
                            .id(booking.getId())
                            .title(booking.getBookingCode())
                            .subtitle(
                                    customerName
                                            + " • "
                                            + serviceName
                            )
                            .build()
            );
        }

        // 2. Customers
        List<Customer> customers =
                customerRepository.searchCustomers(searchQuery);

        for (Customer customer : customers) {

            results.add(
                    GlobalSearchItem.builder()
                            .type("CUSTOMER")
                            .id(customer.getId())
                            .title(customer.getName())
                            .subtitle(customer.getEmail())
                            .build()
            );
        }

        // 3. Mechanics
        List<Mechanic> mechanics =
                mechanicRepository.searchMechanics(searchQuery);

        for (Mechanic mechanic : mechanics) {

            results.add(
                    GlobalSearchItem.builder()
                            .type("MECHANIC")
                            .id(mechanic.getId())
                            .title(mechanic.getName())
                            .subtitle(
                                    mechanic.getMechanicCode()
                                            + " • "
                                            + mechanic.getStatus()
                            )
                            .build()
            );
        }

        // 4. Vehicles
        List<Vehicle> vehicles =
                vehicleRepository.searchVehicles(searchQuery);

        for (Vehicle vehicle : vehicles) {

            String customerName =
                    vehicle.getCustomer() != null
                            ? vehicle.getCustomer().getName()
                            : "Unknown Customer";

            results.add(
                    GlobalSearchItem.builder()
                            .type("VEHICLE")
                            .id(vehicle.getId())
                            .title(vehicle.getVehicleNumber())
                            .subtitle(
                                    vehicle.getVehicleModel()
                                            + " • "
                                            + customerName
                            )
                            .build()
            );
        }

        // 5. Services
        List<com.instantmechanic.entity.Service> services =
                serviceRepository.searchServices(searchQuery);

        for (com.instantmechanic.entity.Service service : services) {

            results.add(
                    GlobalSearchItem.builder()
                            .type("SERVICE")
                            .id(service.getId())
                            .title(service.getServiceName())
                            .subtitle(service.getCategory())
                            .build()
            );
        }

        return GlobalSearchResponse.builder()
                .query(searchQuery)
                .totalResults(results.size())
                .results(results)
                .build();
    }
}