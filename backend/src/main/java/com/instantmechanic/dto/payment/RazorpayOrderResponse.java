package com.instantmechanic.dto.payment;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RazorpayOrderResponse {

    private Long paymentId;

    private Long bookingId;

    private BigDecimal amount;

    private String currency;

    private String razorpayOrderId;

    private String razorpayKeyId;
}