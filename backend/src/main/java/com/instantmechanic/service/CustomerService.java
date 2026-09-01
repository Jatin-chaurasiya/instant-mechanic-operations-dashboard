package com.instantmechanic.service;

import com.instantmechanic.dto.customer.CustomerResponse;
import com.instantmechanic.entity.Customer;
import com.instantmechanic.exception.ResourceNotFoundException;
import com.instantmechanic.repository.BookingRepository;
import com.instantmechanic.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;

    private final BookingRepository bookingRepository;

    @Transactional(readOnly = true)
    public Page<CustomerResponse> getCustomers(
            int page,
            int size,
            String keyword
    ) {

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(
                        Sort.Direction.ASC,
                        "id"
                )
        );

        Page<Customer> customerPage;

        if (keyword != null &&
                !keyword.trim().isEmpty()) {

            customerPage =
                    customerRepository.searchCustomers(
                            keyword.trim(),
                            pageable
                    );

        } else {

            customerPage =
                    customerRepository.findAll(pageable);
        }

        return customerPage.map(this::entityToDto);
    }

    @Transactional(readOnly = true)
    public CustomerResponse getCustomerById(Long id) {

        Customer customer =
                customerRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Customer not found with id: " + id
                                )
                        );

        return entityToDto(customer);
    }

    private CustomerResponse entityToDto(
            Customer customer
    ) {

        long totalBookings =
                bookingRepository.countBookingsByCustomerId(
                        customer.getId()
                );

        return CustomerResponse.builder()
                .id(customer.getId())
                .name(customer.getName())
                .email(customer.getEmail())
                .phone(customer.getPhone())
                .address(customer.getAddress())
                .createdAt(customer.getCreatedAt())
                .totalBookings(totalBookings)
                .build();
    }
}