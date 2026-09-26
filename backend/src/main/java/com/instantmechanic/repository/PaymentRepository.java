package com.instantmechanic.repository;

import com.instantmechanic.entity.payment.Payment;
import com.instantmechanic.enums.PaymentMethod;
import com.instantmechanic.enums.PaymentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaymentRepository
        extends JpaRepository<Payment, Long> {

    Optional<Payment> findByBookingId(Long bookingId);

    Optional<Payment> findByRazorpayOrderId(String razorpayOrderId);

    boolean existsByBookingId(Long bookingId);

    Page<Payment> findByPaymentMethodAndPaymentStatus(
            PaymentMethod paymentMethod,
            PaymentStatus paymentStatus,
            Pageable pageable
    );
}