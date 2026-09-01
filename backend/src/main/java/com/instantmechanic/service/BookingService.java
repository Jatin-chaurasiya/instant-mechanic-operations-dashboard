package com.instantmechanic.service;

import com.instantmechanic.dto.booking.BookingPageResponse;
import com.instantmechanic.dto.booking.BookingResponse;
import com.instantmechanic.entity.Booking;
import com.instantmechanic.enums.BookingStatus;
import com.instantmechanic.exception.BadRequestException;
import com.instantmechanic.exception.ResourceNotFoundException;
import com.instantmechanic.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;

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
}