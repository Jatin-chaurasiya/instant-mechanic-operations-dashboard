package com.instantmechanic.controller;

import com.instantmechanic.dto.payment.*;
import com.instantmechanic.service.PaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customer/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/cash")
    public ResponseEntity<PaymentResponse> createCashPayment(
            @Valid @RequestBody CreateCashPaymentRequest request
    ) {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String customerEmail =
                authentication.getName();

        return ResponseEntity.ok(
                paymentService.createCashPayment(
                        request,
                        customerEmail
                )
        );
    }
    @PostMapping("/razorpay/order")
    public ResponseEntity<RazorpayOrderResponse> createRazorpayOrder(
            @Valid @RequestBody CreateRazorpayOrderRequest request
    ) {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String customerEmail =
                authentication.getName();

        return ResponseEntity.ok(
                paymentService.createRazorpayOrder(
                        request,
                        customerEmail
                )
        );
    }
    @PostMapping("/razorpay/verify")
    public ResponseEntity<PaymentResponse> verifyRazorpayPayment(
            @Valid @RequestBody VerifyRazorpayPaymentRequest request
    ) {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String customerEmail =
                authentication.getName();

        return ResponseEntity.ok(
                paymentService.verifyRazorpayPayment(
                        request,
                        customerEmail
                )
        );
    }
}