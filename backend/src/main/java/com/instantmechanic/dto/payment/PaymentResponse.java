package com.instantmechanic.dto.payment;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentResponse {

    private Long id;

    private Long bookingId;

    private String bookingCode;

    private BigDecimal amount;

    private String paymentMethod;

    private String paymentStatus;

    private String razorpayOrderId;

    private String razorpayPaymentId;

    private LocalDateTime paidAt;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}