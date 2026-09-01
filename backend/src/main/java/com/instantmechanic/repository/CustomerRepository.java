package com.instantmechanic.repository;

import com.instantmechanic.entity.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;

public interface CustomerRepository
        extends JpaRepository<Customer, Long> {

    // Used by Dashboard API
    long countByCreatedAtAfter(
            java.time.LocalDateTime dateTime
    );
    long countByCreatedAtBetween(
            LocalDateTime from,
            LocalDateTime to
    );

    // Search customers
    @Query("""
            SELECT c
            FROM Customer c
            WHERE
                LOWER(c.name) LIKE LOWER(CONCAT('%', :keyword, '%'))
                OR LOWER(c.email) LIKE LOWER(CONCAT('%', :keyword, '%'))
                OR LOWER(c.phone) LIKE LOWER(CONCAT('%', :keyword, '%'))
                OR LOWER(c.address) LIKE LOWER(CONCAT('%', :keyword, '%'))
            """)
    Page<Customer> searchCustomers(
            @Param("keyword") String keyword,
            Pageable pageable
    );
}