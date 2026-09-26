package com.instantmechanic.dto.payment;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VerifyRazorpayPaymentRequest {

    @NotBlank(message = "Razorpay Order ID is required")
    private String razorpayOrderId;

    @NotBlank(message = "Razorpay Payment ID is required")
    private String razorpayPaymentId;

    @NotBlank(message = "Razorpay Signature is required")
    private String razorpaySignature;
}