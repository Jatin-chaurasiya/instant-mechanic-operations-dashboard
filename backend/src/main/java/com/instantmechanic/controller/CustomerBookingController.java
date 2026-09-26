package com.instantmechanic.controller;

import com.instantmechanic.dto.booking.BookingPageResponse;
import com.instantmechanic.dto.booking.BookingResponse;
import com.instantmechanic.dto.booking.CreateCustomerBookingRequest;
import com.instantmechanic.dto.booking.RejectBookingRequest;
import com.instantmechanic.service.BookingService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customer/bookings")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class CustomerBookingController {

    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<BookingResponse> createBooking(
            @Valid @RequestBody
            CreateCustomerBookingRequest request,

            Authentication authentication
    ) {

        String customerEmail =
                authentication.getName();

        return ResponseEntity.ok(
                bookingService.createCustomerBooking(
                        customerEmail,
                        request
                )
        );
    }
    @GetMapping
    public ResponseEntity<BookingPageResponse> getMyBookings(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication authentication
    ) {

        String customerEmail =
                authentication.getName();

        return ResponseEntity.ok(
                bookingService.getCustomerBookings(
                        customerEmail,
                        page,
                        size
                )
        );
    }
    @GetMapping("/{id}")
    public ResponseEntity<BookingResponse> getMyBookingById(
            @PathVariable Long id,
            Authentication authentication
    ) {

        String customerEmail =
                authentication.getName();

        return ResponseEntity.ok(
                bookingService.getCustomerBookingById(
                        customerEmail,
                        id
                )
        );
    }
}