package com.instantmechanic.repository;

import com.instantmechanic.entity.Vehicle;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VehicleRepository
        extends JpaRepository<Vehicle, Long> {

    // ==========================================
    // Get Customer Vehicles
    // Pagination
    // ==========================================

    Page<Vehicle> findByCustomerId(
            Long customerId,
            Pageable pageable
    );


    // ==========================================
    // Search Customer Vehicles
    // Pagination + Search
    // ==========================================

    @Query("""
        SELECT v
        FROM Vehicle v
        WHERE v.customer.id = :customerId
        AND (
            LOWER(v.vehicleNumber) LIKE
                LOWER(CONCAT('%', :keyword, '%'))
            OR
            LOWER(v.vehicleModel) LIKE
                LOWER(CONCAT('%', :keyword, '%'))
        )
        """)
    Page<Vehicle> searchByCustomer(
            @Param("customerId") Long customerId,
            @Param("keyword") String keyword,
            Pageable pageable
    );


    // ==========================================
    // Search All Vehicles
    // Pagination + Search
    // ==========================================

    @Query("""
        SELECT v
        FROM Vehicle v
        LEFT JOIN v.customer c
        WHERE
            LOWER(v.vehicleNumber) LIKE
                LOWER(CONCAT('%', :keyword, '%'))
            OR
            LOWER(v.vehicleModel) LIKE
                LOWER(CONCAT('%', :keyword, '%'))
            OR
            LOWER(c.name) LIKE
                LOWER(CONCAT('%', :keyword, '%'))
            OR
            LOWER(c.email) LIKE
                LOWER(CONCAT('%', :keyword, '%'))
        """)
    Page<Vehicle> searchAllVehicles(
            @Param("keyword") String keyword,
            Pageable pageable
    );


    // ==========================================
    // Existing Global Search
    // Used by BookingService
    // ==========================================

    @Query("""
        SELECT v
        FROM Vehicle v
        LEFT JOIN v.customer c
        WHERE
            LOWER(v.vehicleNumber) LIKE
                LOWER(CONCAT('%', :query, '%'))
            OR
            LOWER(v.vehicleModel) LIKE
                LOWER(CONCAT('%', :query, '%'))
            OR
            LOWER(c.name) LIKE
                LOWER(CONCAT('%', :query, '%'))
            OR
            LOWER(c.email) LIKE
                LOWER(CONCAT('%', :query, '%'))
        """)
    List<Vehicle> searchVehicles(
            @Param("query") String query
    );
}