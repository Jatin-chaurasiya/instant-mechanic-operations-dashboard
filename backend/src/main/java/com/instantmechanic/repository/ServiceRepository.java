package com.instantmechanic.repository;

import com.instantmechanic.entity.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ServiceRepository
        extends JpaRepository<Service, Long> {

    // Active services for booking/service listing
    List<Service> findByActiveTrue();

    // Distinct active service categories
    @Query("""
            SELECT DISTINCT s.category
            FROM Service s
            WHERE s.active = true
              AND s.category IS NOT NULL
              AND TRIM(s.category) <> ''
            ORDER BY s.category
            """)
    List<String> findActiveCategories();
}