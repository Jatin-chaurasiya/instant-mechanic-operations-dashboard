package com.instantmechanic.service;

import com.instantmechanic.config.RazorpayConfig;
import com.instantmechanic.dto.booking.UnpaidBookingResponse;
import com.instantmechanic.dto.payment.*;
import com.instantmechanic.entity.Booking;
import com.instantmechanic.entity.payment.Payment;
import com.instantmechanic.enums.PaymentMethod;
import com.instantmechanic.enums.PaymentStatus;
import com.instantmechanic.exception.BadRequestException;
import com.instantmechanic.exception.ResourceNotFoundException;
import com.instantmechanic.repository.BookingRepository;
import com.instantmechanic.repository.PaymentRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.Utils;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;
    private final RazorpayConfig razorpayConfig;

    @Transactional
    public PaymentResponse createCashPayment(
            CreateCashPaymentRequest request,
            String customerEmail
    ) {

        // Find booking
        Booking booking = bookingRepository.findById(
                request.getBookingId()
        ).orElseThrow(() ->
                new ResourceNotFoundException(
                        "Booking not found with id: "
                                + request.getBookingId()
                )
        );

        // Verify booking belongs to logged-in customer
        if (!booking.getCustomer()
                .getEmail()
                .equalsIgnoreCase(customerEmail)) {

            throw new BadRequestException(
                    "You can make payment only for your own booking"
            );
        }

        // Prevent duplicate payment
        if (paymentRepository.existsByBookingId(
                booking.getId())) {

            throw new BadRequestException(
                    "Payment already exists for this booking"
            );
        }

        // Create CASH payment
        Payment payment = Payment.builder()
                .booking(booking)
                .paymentMethod(PaymentMethod.CASH)
                .paymentStatus(PaymentStatus.UNPAID)
                .amount(booking.getAmount())
                .build();

        Payment savedPayment =
                paymentRepository.save(payment);

        return entityToDto(savedPayment);
    }
    @Transactional
    public RazorpayOrderResponse createRazorpayOrder(
            CreateRazorpayOrderRequest request,
            String customerEmail
    ) {

        Booking booking = bookingRepository.findById(
                request.getBookingId()
        ).orElseThrow(() ->
                new ResourceNotFoundException(
                        "Booking not found with id: "
                                + request.getBookingId()
                )
        );

        // Customer ownership check
        if (!booking.getCustomer()
                .getEmail()
                .equalsIgnoreCase(customerEmail)) {

            throw new BadRequestException(
                    "You can make payment only for your own booking"
            );
        }

        // Prevent duplicate payment
        if (paymentRepository.existsByBookingId(
                booking.getId())) {

            throw new BadRequestException(
                    "Payment already exists for this booking"
            );
        }

        try {

            RazorpayClient razorpayClient =
                    new RazorpayClient(
                            razorpayConfig.getKeyId(),
                            razorpayConfig.getKeySecret()
                    );

            // Razorpay expects INR amount in paise
            long amountInPaise =
                    booking.getAmount()
                            .multiply(BigDecimal.valueOf(100))
                            .longValueExact();

            JSONObject orderRequest = new JSONObject();

            orderRequest.put(
                    "amount",
                    amountInPaise
            );

            orderRequest.put(
                    "currency",
                    "INR"
            );

            orderRequest.put(
                    "receipt",
                    booking.getBookingCode()
            );

            Order razorpayOrder =
                    razorpayClient.orders.create(
                            orderRequest
                    );

            Payment payment = Payment.builder()
                    .booking(booking)
                    .paymentMethod(PaymentMethod.ONLINE)
                    .paymentStatus(PaymentStatus.UNPAID)
                    .amount(booking.getAmount())
                    .razorpayOrderId(
                            razorpayOrder.get("id")
                    )
                    .build();

            Payment savedPayment =
                    paymentRepository.save(payment);

            return RazorpayOrderResponse.builder()
                    .paymentId(savedPayment.getId())
                    .bookingId(booking.getId())
                    .amount(booking.getAmount())
                    .currency("INR")
                    .razorpayOrderId(
                            razorpayOrder.get("id")
                    )
                    .razorpayKeyId(
                            razorpayConfig.getKeyId()
                    )
                    .build();

        } catch (Exception e) {

            throw new BadRequestException(
                    "Unable to create Razorpay order"
            );
        }
    }
    @Transactional
    public PaymentResponse verifyRazorpayPayment(
            VerifyRazorpayPaymentRequest request,
            String customerEmail
    ) {

        // Find payment using Razorpay Order ID
        Payment payment = paymentRepository
                .findByRazorpayOrderId(request.getRazorpayOrderId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Payment not found for Razorpay Order ID: "
                                        + request.getRazorpayOrderId()
                        )
                );

        // Verify payment belongs to logged-in customer
        if (!payment.getBooking()
                .getCustomer()
                .getEmail()
                .equalsIgnoreCase(customerEmail)) {

            throw new BadRequestException(
                    "You can verify payment only for your own booking"
            );
        }

        // Verify payment method
        if (payment.getPaymentMethod() != PaymentMethod.ONLINE) {

            throw new BadRequestException(
                    "This is not an online payment"
            );
        }

        // Prevent re-verification
        if (payment.getPaymentStatus() == PaymentStatus.PAID) {

            throw new BadRequestException(
                    "Payment is already verified"
            );
        }

        // Verify Order ID matches our stored Razorpay Order ID
        if (!payment.getRazorpayOrderId()
                .equals(request.getRazorpayOrderId())) {

            throw new BadRequestException(
                    "Invalid Razorpay Order ID"
            );
        }

        try {

            JSONObject attributes = new JSONObject();

            attributes.put(
                    "razorpay_order_id",
                    request.getRazorpayOrderId()
            );

            attributes.put(
                    "razorpay_payment_id",
                    request.getRazorpayPaymentId()
            );

            attributes.put(
                    "razorpay_signature",
                    request.getRazorpaySignature()
            );

            boolean isValid = Utils.verifyPaymentSignature(
                    attributes,
                    razorpayConfig.getKeySecret()
            );

            if (!isValid) {

                payment.setPaymentStatus(PaymentStatus.FAILED);

                paymentRepository.save(payment);

                throw new BadRequestException(
                        "Invalid Razorpay payment signature"
                );
            }

            // Signature is valid
            payment.setRazorpayPaymentId(
                    request.getRazorpayPaymentId()
            );

            payment.setRazorpaySignature(
                    request.getRazorpaySignature()
            );

            payment.setPaymentStatus(
                    PaymentStatus.PAID
            );

            payment.setPaidAt(
                    java.time.LocalDateTime.now()
            );

            Payment savedPayment =
                    paymentRepository.save(payment);

            return entityToDto(savedPayment);

        } catch (BadRequestException e) {

            throw e;

        } catch (Exception e) {

            throw new BadRequestException(
                    "Unable to verify Razorpay payment"
            );
        }
    }
    @Transactional(readOnly = true)
    public Page<UnpaidBookingResponse> getUnpaidCashPayments(
            int page,
            int size
    ) {
        if (page < 0) {
            page = 0;
        }

        if (size <= 0) {
            size = 10;
        }

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(
                        Sort.Direction.DESC,
                        "createdAt"
                )
        );

        Page<Payment> paymentPage =
                paymentRepository.findByPaymentMethodAndPaymentStatus(
                        PaymentMethod.CASH,
                        PaymentStatus.UNPAID,
                        pageable
                );

        return paymentPage.map(this::paymentToUnpaidBookingDto);
    }
    @Transactional
    public PaymentResponse markCashPaymentAsPaid(
            Long bookingId
    ) {

        Payment payment =
                paymentRepository
                        .findByBookingId(bookingId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Payment not found for booking: "
                                                + bookingId
                                )
                        );

        if (payment.getPaymentMethod() != PaymentMethod.CASH) {
            throw new BadRequestException(
                    "Only CASH payments can be marked as paid manually"
            );
        }

        if (payment.getPaymentStatus() == PaymentStatus.PAID) {
            throw new BadRequestException(
                    "Payment is already marked as paid"
            );
        }

        if (payment.getPaymentStatus() != PaymentStatus.UNPAID) {
            throw new BadRequestException(
                    "Payment cannot be marked as paid when status is: "
                            + payment.getPaymentStatus()
            );
        }

        payment.setPaymentStatus(PaymentStatus.PAID);
        payment.setPaidAt(
                java.time.LocalDateTime.now()
        );

        Payment savedPayment =
                paymentRepository.save(payment);

        return entityToDto(savedPayment);
    }
    @Transactional
    public PaymentResponse createAdminCashPayment(Long bookingId) {

        Booking booking =
                bookingRepository.findById(bookingId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Booking not found with id: " + bookingId
                                )
                        );

        if (paymentRepository.existsByBookingId(bookingId)) {
            throw new BadRequestException(
                    "Payment already exists for this booking"
            );
        }

        Payment payment = Payment.builder()
                .booking(booking)
                .paymentMethod(PaymentMethod.CASH)
                .paymentStatus(PaymentStatus.UNPAID)
                .amount(booking.getAmount())
                .build();

        Payment savedPayment =
                paymentRepository.save(payment);

        return entityToDto(savedPayment);
    }

    private PaymentResponse entityToDto(Payment payment) {

        return PaymentResponse.builder()
                .id(payment.getId())
                .bookingId(payment.getBooking().getId())
                .bookingCode(payment.getBooking().getBookingCode())
                .amount(payment.getAmount())
                .paymentMethod(
                        payment.getPaymentMethod().name()
                )
                .paymentStatus(
                        payment.getPaymentStatus().name()
                )
                .razorpayOrderId(
                        payment.getRazorpayOrderId()
                )
                .razorpayPaymentId(
                        payment.getRazorpayPaymentId()
                )
                .paidAt(payment.getPaidAt())
                .createdAt(payment.getCreatedAt())
                .updatedAt(payment.getUpdatedAt())
                .build();
    }
    private UnpaidBookingResponse paymentToUnpaidBookingDto(
            Payment payment
    ) {
        Booking booking = payment.getBooking();

        return UnpaidBookingResponse.builder()
                .id(booking.getId())
                .bookingCode(booking.getBookingCode())

                .customerName(
                        booking.getCustomer() != null
                                ? booking.getCustomer().getName()
                                : null
                )
                .customerEmail(
                        booking.getCustomer() != null
                                ? booking.getCustomer().getEmail()
                                : null
                )

                .vehicleName(
                        booking.getVehicle() != null
                                ? booking.getVehicle().getVehicleModel()
                                : null
                )
                .vehicleNumber(
                        booking.getVehicle() != null
                                ? booking.getVehicle().getVehicleNumber()
                                : null
                )

                .serviceName(
                        booking.getService() != null
                                ? booking.getService().getServiceName()
                                : null
                )

                .mechanicName(
                        booking.getMechanic() != null
                                ? booking.getMechanic().getName()
                                : null
                )

                .status(
                        booking.getStatus() != null
                                ? booking.getStatus().name()
                                : null
                )

                .amount(booking.getAmount())

                .bookingDate(booking.getBookingDate())
                .bookingTime(booking.getBookingTime())

                .paymentMethod(
                        payment.getPaymentMethod() != null
                                ? payment.getPaymentMethod().name()
                                : null
                )
                .paymentStatus(
                        payment.getPaymentStatus() != null
                                ? payment.getPaymentStatus().name()
                                : null
                )

                .build();
    }
}
