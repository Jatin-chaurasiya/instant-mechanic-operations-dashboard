package com.instantmechanic.controller;

import com.instantmechanic.dto.booking.*;
import com.instantmechanic.enums.BookingStatus;
import com.instantmechanic.service.BookingService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/bookings")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class BookingController {

    private final BookingService bookingService;

    @GetMapping
    public ResponseEntity<BookingPageResponse> getBookings(

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "10")
            int size,

            @RequestParam(required = false)
            String keyword,

            @RequestParam(required = false)
            BookingStatus status,

            @RequestParam(required = false)
            String category,

            @RequestParam(
                    defaultValue = "bookingDate"
            )
            String sortBy,

            @RequestParam(
                    defaultValue = "desc"
            )
            String sortOrder
    ) {

        return ResponseEntity.ok(
                bookingService.getBookings(
                        page,
                        size,
                        keyword,
                        status,
                        category,
                        sortBy,
                        sortOrder
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingResponse> getBookingById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                bookingService.getBookingById(id)
        );
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<BookingResponse> updateBookingStatus(
            @PathVariable Long id,
            @Valid
            @RequestBody
            BookingStatusRequest request
    ) {

        return ResponseEntity.ok(
                bookingService.updateBookingStatus(
                        id,
                        request.getStatus()
                )
        );
    }
    // Get Pending Assignment Bookings

    @GetMapping("/pending-assignments")
    public ResponseEntity<BookingPageResponse> getPendingAssignments(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {

        return ResponseEntity.ok(
                bookingService.getPendingAssignments(
                        page,
                        size
                )
        );
    }


// Delete Booking

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(
            @PathVariable Long id
    ) {

        bookingService.deleteBooking(id);

        return ResponseEntity.noContent().build();
    }
    // Get Active Bookings

    @GetMapping("/active")
    public ResponseEntity<BookingPageResponse> getActiveBookings(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {

        return ResponseEntity.ok(
                bookingService.getActiveBookings(
                        page,
                        size
                )
        );
    }
    // Create Booking

    @PostMapping
    public ResponseEntity<BookingResponse> createBooking(
            @Valid @RequestBody CreateBookingRequest request
    ) {

        return ResponseEntity.ok(
                bookingService.createBooking(request)
        );
    }
    // Assign Mechanic

    @PutMapping("/{id}/assign")
    public ResponseEntity<BookingResponse> assignMechanic(
            @PathVariable Long id,
            @Valid @RequestBody AssignMechanicRequest request
    ) {

        return ResponseEntity.ok(
                bookingService.assignMechanic(
                        id,
                        request
                )
        );
    }
}