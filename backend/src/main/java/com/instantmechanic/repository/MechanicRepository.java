package com.instantmechanic.repository;

import com.instantmechanic.entity.Mechanic;
import com.instantmechanic.enums.MechanicStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MechanicRepository
        extends JpaRepository<Mechanic, Long> {

    // Used by Dashboard API
    long countByStatusIn(
            Iterable<MechanicStatus> statuses
    );

    // Search mechanics
    @Query("""
            SELECT m
            FROM Mechanic m
            WHERE
                LOWER(m.mechanicCode) LIKE LOWER(CONCAT('%', :keyword, '%'))
                OR LOWER(m.name) LIKE LOWER(CONCAT('%', :keyword, '%'))
                OR LOWER(m.phone) LIKE LOWER(CONCAT('%', :keyword, '%'))
                OR LOWER(m.location) LIKE LOWER(CONCAT('%', :keyword, '%'))
            """)
    Page<Mechanic> searchMechanics(
            @Param("keyword") String keyword,
            Pageable pageable
    );

    // Filter by status
    Page<Mechanic> findByStatus(
            MechanicStatus status,
            Pageable pageable
    );
}