package com.instantmechanic.service;

import com.instantmechanic.dto.booking.BookingPageResponse;
import com.instantmechanic.dto.booking.BookingResponse;
import com.instantmechanic.dto.booking.CreateBookingRequest;

import com.instantmechanic.entity.Booking;
import com.instantmechanic.entity.Customer;
import com.instantmechanic.entity.Mechanic;
import com.instantmechanic.entity.Vehicle;
import com.instantmechanic.entity.Service;

import com.instantmechanic.enums.BookingStatus;

import com.instantmechanic.exception.BadRequestException;
import com.instantmechanic.exception.ResourceNotFoundException;

import com.instantmechanic.repository.BookingRepository;
import com.instantmechanic.repository.CustomerRepository;
import com.instantmechanic.repository.MechanicRepository;
import com.instantmechanic.repository.ServiceRepository;
import com.instantmechanic.repository.VehicleRepository;
import com.instantmechanic.dto.booking.AssignMechanicRequest;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final CustomerRepository customerRepository;
    private final VehicleRepository vehicleRepository;
    private final ServiceRepository serviceRepository;
    private final MechanicRepository mechanicRepository;

    @Transactional(readOnly = true)
    public BookingPageResponse getBookings(
            int page,
            int size,
            String keyword,
            BookingStatus status,
            String category,
            String sortBy,
            String sortOrder
    ) {

        if (page < 0) {
            page = 0;
        }

        if (size <= 0) {
            size = 10;
        }

        // Safe sorting

        String sortField =
                resolveSortField(sortBy);

        Sort.Direction direction =
                resolveSortDirection(sortOrder);

        Pageable pageable =
                PageRequest.of(
                        page,
                        size,
                        Sort.by(
                                direction,
                                sortField
                        )
                );
        // Booking data

        Page<Booking> bookingPage;

        boolean hasKeyword =
                keyword != null &&
                        !keyword.trim().isEmpty();

        boolean hasCategory =
                category != null &&
                        !category.trim().isEmpty();

        if (hasKeyword ||
                status != null ||
                hasCategory) {

            bookingPage =
                    bookingRepository
                            .searchAndFilterBookings(
                                    hasKeyword
                                            ? keyword.trim()
                                            : null,
                                    status,
                                    hasCategory
                                            ? category.trim()
                                            : null,
                                    pageable
                            );

        } else {

            bookingPage =
                    bookingRepository.findAll(
                            pageable
                    );
        }

        // Entity → DTO
        List<BookingResponse> bookings =
                bookingPage.getContent()
                        .stream()
                        .map(this::entityToDto)
                        .toList();

        return BookingPageResponse.builder()
                .bookings(bookings)
                .currentPage(
                        bookingPage.getNumber()
                )
                .pageSize(
                        bookingPage.getSize()
                )
                .totalElements(
                        bookingPage.getTotalElements()
                )
                .totalPages(
                        bookingPage.getTotalPages()
                )
                .last(
                        bookingPage.isLast()
                )
                .build();
    }
    // Get Active Bookings

    @Transactional(readOnly = true)
    public BookingPageResponse getActiveBookings(
            int page,
            int size
    ) {

        if (page < 0) {
            page = 0;
        }

        if (size <= 0) {
            size = 10;
        }

        Pageable pageable =
                PageRequest.of(
                        page,
                        size,
                        Sort.by(
                                Sort.Direction.DESC,
                                "bookingDate"
                        )
                );

        List<BookingStatus> activeStatuses =
                List.of(
                        BookingStatus.ASSIGNED,
                        BookingStatus.ON_THE_WAY,
                        BookingStatus.IN_PROGRESS
                );

        Page<Booking> bookingPage =
                bookingRepository.findByStatusIn(
                        activeStatuses,
                        pageable
                );

        List<BookingResponse> bookings =
                bookingPage.getContent()
                        .stream()
                        .map(this::entityToDto)
                        .toList();

        return BookingPageResponse.builder()
                .bookings(bookings)
                .currentPage(
                        bookingPage.getNumber()
                )
                .pageSize(
                        bookingPage.getSize()
                )
                .totalElements(
                        bookingPage.getTotalElements()
                )
                .totalPages(
                        bookingPage.getTotalPages()
                )
                .last(
                        bookingPage.isLast()
                )
                .build();
    }

    // Sort field whitelist
    private String resolveSortField(
            String sortBy
    ) {

        if (sortBy == null ||
                sortBy.trim().isEmpty()) {

            return "bookingDate";
        }

        return switch (
                sortBy.trim().toLowerCase()
                ) {

            case "date",
                 "bookingdate" ->
                    "bookingDate";

            case "amount" ->
                    "amount";

            case "status" ->
                    "status";

            case "customer",
                 "customername" ->
                    "customer.name";

            default ->
                    "bookingDate";
        };
    }

    // Sort direction
    private Sort.Direction resolveSortDirection(
            String sortOrder
    ) {

        if (sortOrder == null ||
                sortOrder.trim().isEmpty()) {

            return Sort.Direction.DESC;
        }

        return switch (
                sortOrder.trim().toLowerCase()
                ) {

            case "asc" ->
                    Sort.Direction.ASC;

            case "desc" ->
                    Sort.Direction.DESC;

            default ->
                    Sort.Direction.DESC;
        };
    }

    // Get booking by ID

    @Transactional(readOnly = true)
    public BookingResponse getBookingById(
            Long id
    ) {

        Booking booking =
                bookingRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Booking not found with id: "
                                                + id
                                )
                        );

        return entityToDto(booking);
    }

    // Update booking status=
    @Transactional
    public BookingResponse updateBookingStatus(
            Long id,
            BookingStatus newStatus
    ) {

        Booking booking =
                bookingRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Booking not found with id: "
                                                + id
                                )
                        );

        BookingStatus currentStatus =
                booking.getStatus();

        validateStatusTransition(
                currentStatus,
                newStatus
        );

        booking.setStatus(newStatus);

        Booking updatedBooking =
                bookingRepository.save(booking);

        return entityToDto(updatedBooking);
    }
    // Get Pending Assignment Bookings

    @Transactional(readOnly = true)
    public BookingPageResponse getPendingAssignments(
            int page,
            int size
    ) {

        if (page < 0) {
            page = 0;
        }

        if (size <= 0) {
            size = 10;
        }

        Pageable pageable =
                PageRequest.of(
                        page,
                        size,
                        Sort.by(
                                Sort.Direction.DESC,
                                "bookingDate"
                        )
                );

        Page<Booking> bookingPage =
                bookingRepository
                        .findByStatusAndMechanicIsNull(
                                BookingStatus.PENDING,
                                pageable
                        );

        List<BookingResponse> bookings =
                bookingPage.getContent()
                        .stream()
                        .map(this::entityToDto)
                        .toList();

        return BookingPageResponse.builder()
                .bookings(bookings)
                .currentPage(
                        bookingPage.getNumber()
                )
                .pageSize(
                        bookingPage.getSize()
                )
                .totalElements(
                        bookingPage.getTotalElements()
                )
                .totalPages(
                        bookingPage.getTotalPages()
                )
                .last(
                        bookingPage.isLast()
                )
                .build();
    }
    // Delete Booking

    @Transactional
    public void deleteBooking(Long id) {

        Booking booking =
                bookingRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Booking not found with id: "
                                                + id
                                )
                        );

        BookingStatus status =
                booking.getStatus();

        if (status != BookingStatus.PENDING &&
                status != BookingStatus.CANCELLED) {

            throw new BadRequestException(
                    "Booking cannot be deleted when status is: " + status + "->" + "Only PENDING bookings can be " +
                    "deleted !"
            );
        }

        bookingRepository.delete(booking);
    }
    // Status transition validation

    private void validateStatusTransition(
            BookingStatus currentStatus,
            BookingStatus newStatus
    ) {

        if (currentStatus == newStatus) {
            return;
        }

        boolean validTransition =
                switch (currentStatus) {

                    case PENDING ->
                            newStatus == BookingStatus.ASSIGNED
                                    || newStatus == BookingStatus.CANCELLED;

                    case ASSIGNED ->
                            newStatus == BookingStatus.ON_THE_WAY
                                    || newStatus == BookingStatus.CANCELLED;

                    case ON_THE_WAY ->
                            newStatus == BookingStatus.IN_PROGRESS
                                    || newStatus == BookingStatus.CANCELLED;

                    case IN_PROGRESS ->
                            newStatus == BookingStatus.COMPLETED
                                    || newStatus == BookingStatus.CANCELLED;

                    case COMPLETED,
                         CANCELLED ->
                            false;
                };

        if (!validTransition) {
            throw new BadRequestException(
                    "Invalid booking status transition: "
                            + currentStatus
                            + " -> "
                            + newStatus
            );
        }
    }
    // Create Booking

    @Transactional
    public BookingResponse createBooking(
            CreateBookingRequest request
    ) {

        // Customer
        Customer customer =
                customerRepository.findById(
                        request.getCustomerId()
                ).orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Customer not found with id: "
                                        + request.getCustomerId()
                        )
                );


        // Vehicle
        Vehicle vehicle =
                vehicleRepository.findById(
                        request.getVehicleId()
                ).orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Vehicle not found with id: "
                                        + request.getVehicleId()
                        )
                );
        // Make sure vehicle belongs to selected customer
        if (!vehicle.getCustomer().getId()
                .equals(customer.getId())) {

            throw new BadRequestException(
                    "Vehicle does not belong to the selected customer"
            );
        }


        // Service
        Service service =
                serviceRepository.findById(
                        request.getServiceId()
                ).orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Service not found with id: "
                                        + request.getServiceId()
                        )
                );

        // Mechanic is optional
        Mechanic mechanic = null;

        if (request.getMechanicId() != null) {

            mechanic =
                    mechanicRepository.findById(
                            request.getMechanicId()
                    ).orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Mechanic not found with id: "
                                            + request.getMechanicId()
                            )
                    );
        }


        // Determine booking status
        BookingStatus status =
                mechanic != null
                        ? BookingStatus.ASSIGNED
                        : BookingStatus.PENDING;


        // Create Booking
        Booking booking = new Booking();

        booking.setBookingCode(
                generateBookingCode()
        );

        booking.setCustomer(customer);

        booking.setVehicle(vehicle);

        booking.setService(service);

        booking.setMechanic(mechanic);

        booking.setBookingDate(
                request.getBookingDate()
        );

        booking.setBookingTime(
                request.getBookingTime()
        );

        booking.setAmount(
                request.getAmount()
        );

        booking.setStatus(status);


        // Save
        Booking savedBooking =
                bookingRepository.save(booking);


        return entityToDto(savedBooking);
    }
    // Assign Mechanic to Booking

    @Transactional
    public BookingResponse assignMechanic(
            Long bookingId,
            AssignMechanicRequest request
    ) {

        // Find booking
        Booking booking =
                bookingRepository.findById(bookingId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Booking not found with id: "
                                                + bookingId
                                )
                        );

        // Booking must be PENDING
        if (booking.getStatus() != BookingStatus.PENDING) {

            throw new BadRequestException(
                    "Only PENDING bookings can be assigned"
            );
        }

        // Find mechanic
        Mechanic mechanic =
                mechanicRepository.findById(
                        request.getMechanicId()
                ).orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Mechanic not found with id: "
                                        + request.getMechanicId()
                        )
                );

        // Mechanic must be AVAILABLE
        if (mechanic.getStatus()
                != com.instantmechanic.enums.MechanicStatus.AVAILABLE) {

            throw new BadRequestException(
                    "Mechanic is not available"
            );
        }

        // Assign mechanic
        booking.setMechanic(mechanic);

        // Change booking status
        booking.setStatus(
                BookingStatus.ASSIGNED
        );

        // Mechanic becomes BUSY
        mechanic.setStatus(
                com.instantmechanic.enums.MechanicStatus.BUSY
        );

        // Save
        bookingRepository.save(booking);
        mechanicRepository.save(mechanic);

        return entityToDto(booking);
    }
    // Entity → DTO
    private BookingResponse entityToDto(
            Booking booking
    ) {

        return BookingResponse.builder()
                .id(booking.getId())
                .bookingCode(
                        booking.getBookingCode()
                )
                .customerName(
                        booking.getCustomer().getName()
                )
                .customerEmail(
                        booking.getCustomer().getEmail()
                )
                .vehicleName(
                        booking.getVehicle()
                                .getVehicleModel()
                )
                .vehicleNumber(
                        booking.getVehicle()
                                .getVehicleNumber()
                )
                .serviceName(
                        booking.getService()
                                .getServiceName()
                )
                .mechanicName(
                        booking.getMechanic() != null
                                ? booking.getMechanic().getName()
                                : null
                )
                .amount(
                        booking.getAmount()
                )
                .bookingDate(
                        booking.getBookingDate()
                )
                .bookingTime(
                        booking.getBookingTime()
                )
                .status(
                        booking.getStatus().name()
                )
                .build();
    }
    private String generateBookingCode() {

        return "BK"
                + System.currentTimeMillis();
    }
}