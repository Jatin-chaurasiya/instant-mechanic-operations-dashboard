package com.instantmechanic.controller;

import com.instantmechanic.dto.customer.CustomerResponse;
import com.instantmechanic.service.CustomerService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customers")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class CustomerController {

    private final CustomerService customerService;

    @GetMapping
    public ResponseEntity<Page<CustomerResponse>> getCustomers(

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "10")
            int size,

            @RequestParam(required = false)
            String keyword
    ) {

        return ResponseEntity.ok(
                customerService.getCustomers(
                        page,
                        size,
                        keyword
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerResponse> getCustomerById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                customerService.getCustomerById(id)
        );
    }
}