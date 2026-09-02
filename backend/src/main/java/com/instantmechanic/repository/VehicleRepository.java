package com.instantmechanic.repository;

import com.instantmechanic.entity.Service;
import com.instantmechanic.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VehicleRepository
        extends JpaRepository<Service, Long> {
    @Query("""
        SELECT v
        FROM Vehicle v
        LEFT JOIN v.customer c
        WHERE
            LOWER(v.vehicleNumber) LIKE LOWER(CONCAT('%', :query, '%'))
            OR LOWER(v.vehicleModel) LIKE LOWER(CONCAT('%', :query, '%'))
            OR LOWER(c.name) LIKE LOWER(CONCAT('%', :query, '%'))
            OR LOWER(c.email) LIKE LOWER(CONCAT('%', :query, '%'))
        """)
    List<Vehicle> searchVehicles(@Param("query") String query);
}