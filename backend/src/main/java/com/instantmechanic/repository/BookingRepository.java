package com.instantmechanic.repository;

import com.instantmechanic.entity.Booking;
import com.instantmechanic.enums.BookingStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface BookingRepository
        extends JpaRepository<Booking, Long> {

    // DASHBOARD

    long countByStatus(BookingStatus status);

    long countByBookingDate(LocalDate bookingDate);

    @Query("""
            SELECT COALESCE(SUM(b.amount), 0)
            FROM Booking b
            WHERE b.status = :status
            """)
    BigDecimal getRevenueByStatus(
            @Param("status") BookingStatus status
    );


    // BOOKING LIST - OLD METHODS KEPT

    @Query("""
            SELECT b
            FROM Booking b
            WHERE
                LOWER(b.bookingCode)
                    LIKE LOWER(CONCAT('%', :keyword, '%'))

                OR LOWER(b.customer.name)
                    LIKE LOWER(CONCAT('%', :keyword, '%'))

                OR LOWER(b.customer.email)
                    LIKE LOWER(CONCAT('%', :keyword, '%'))

                OR LOWER(b.vehicle.vehicleNumber)
                    LIKE LOWER(CONCAT('%', :keyword, '%'))

                OR LOWER(b.vehicle.vehicleModel)
                    LIKE LOWER(CONCAT('%', :keyword, '%'))

                OR LOWER(b.service.serviceName)
                    LIKE LOWER(CONCAT('%', :keyword, '%'))

                OR LOWER(b.service.category)
                    LIKE LOWER(CONCAT('%', :keyword, '%'))

                OR LOWER(b.mechanic.name)
                    LIKE LOWER(CONCAT('%', :keyword, '%'))
            """)
    Page<Booking> searchBookings(
            @Param("keyword") String keyword,
            Pageable pageable
    );

    Page<Booking> findByStatus(
            BookingStatus status,
            Pageable pageable
    );



    // NEW - BOOKING SEARCH + STATUS + CATEGORY

    @Query("""
            SELECT b
            FROM Booking b
            WHERE
                (
                    :keyword IS NULL
                    OR :keyword = ''
                    OR LOWER(b.bookingCode)
                        LIKE LOWER(CONCAT('%', :keyword, '%'))
                    OR LOWER(b.customer.name)
                        LIKE LOWER(CONCAT('%', :keyword, '%'))
                    OR LOWER(b.customer.email)
                        LIKE LOWER(CONCAT('%', :keyword, '%'))
                    OR LOWER(b.vehicle.vehicleNumber)
                        LIKE LOWER(CONCAT('%', :keyword, '%'))
                    OR LOWER(b.vehicle.vehicleModel)
                        LIKE LOWER(CONCAT('%', :keyword, '%'))
                    OR LOWER(b.service.serviceName)
                        LIKE LOWER(CONCAT('%', :keyword, '%'))
                    OR LOWER(b.service.category)
                        LIKE LOWER(CONCAT('%', :keyword, '%'))
                    OR LOWER(b.mechanic.name)
                        LIKE LOWER(CONCAT('%', :keyword, '%'))
                )
                AND (
                    :status IS NULL
                    OR b.status = :status
                )
                AND (
                    :category IS NULL
                    OR :category = ''
                    OR LOWER(b.service.category)
                        = LOWER(:category)
                )
            """)
    Page<Booking> searchAndFilterBookings(
            @Param("keyword") String keyword,
            @Param("status") BookingStatus status,
            @Param("category") String category,
            Pageable pageable
    );


    // MECHANIC

    @Query("""
            SELECT COUNT(b)
            FROM Booking b
            WHERE b.mechanic.id = :mechanicId
            AND b.status =
                com.instantmechanic.enums.BookingStatus.COMPLETED
            """)
    long countCompletedBookingsByMechanicId(
            @Param("mechanicId") Long mechanicId
    );



    // CUSTOMER


    @Query("""
            SELECT COUNT(b)
            FROM Booking b
            WHERE b.customer.id = :customerId
            """)
    long countBookingsByCustomerId(
            @Param("customerId") Long customerId
    );


    // ANALYTICS

    @Query("""
            SELECT b.bookingDate, COUNT(b)
            FROM Booking b
            WHERE b.bookingDate
                BETWEEN :fromDate AND :toDate
            GROUP BY b.bookingDate
            ORDER BY b.bookingDate
            """)
    List<Object[]> getBookingTrend(
            @Param("fromDate") LocalDate fromDate,
            @Param("toDate") LocalDate toDate
    );

    @Query("""
            SELECT b.bookingDate,
                   COALESCE(SUM(b.amount), 0)
            FROM Booking b
            WHERE b.bookingDate
                BETWEEN :fromDate AND :toDate
            AND b.status =
                com.instantmechanic.enums.BookingStatus.COMPLETED
            GROUP BY b.bookingDate
            ORDER BY b.bookingDate
            """)
    List<Object[]> getRevenueTrend(
            @Param("fromDate") LocalDate fromDate,
            @Param("toDate") LocalDate toDate
    );

    long countByBookingDateBetween(
            LocalDate fromDate,
            LocalDate toDate
    );

    long countByBookingDateBetweenAndStatus(
            LocalDate fromDate,
            LocalDate toDate,
            BookingStatus status
    );

    @Query("""
            SELECT COALESCE(SUM(b.amount), 0)
            FROM Booking b
            WHERE b.status = :status
            AND b.bookingDate
                BETWEEN :fromDate AND :toDate
            """)
    BigDecimal getRevenueByStatusAndDateRange(
            @Param("status") BookingStatus status,
            @Param("fromDate") LocalDate fromDate,
            @Param("toDate") LocalDate toDate
    );
// ANALYTICS - STATUS DISTRIBUTION

    @Query("""
        SELECT b.status, COUNT(b)
        FROM Booking b
        WHERE b.bookingDate
            BETWEEN :fromDate AND :toDate
        GROUP BY b.status
        ORDER BY COUNT(b) DESC
        """)
    List<Object[]> getStatusDistribution(
            @Param("fromDate") LocalDate fromDate,
            @Param("toDate") LocalDate toDate
    );


// ANALYTICS - CATEGORY BREAKDOWN


    @Query("""
        SELECT b.service.category, COUNT(b)
        FROM Booking b
        WHERE b.bookingDate
            BETWEEN :fromDate AND :toDate
        GROUP BY b.service.category
        ORDER BY COUNT(b) DESC
        """)
    List<Object[]> getCategoryBreakdown(
            @Param("fromDate") LocalDate fromDate,
            @Param("toDate") LocalDate toDate
    );
    @Query("""
            SELECT DISTINCT b
            FROM Booking b
            LEFT JOIN b.customer c
            LEFT JOIN b.vehicle v
            LEFT JOIN b.service s
            LEFT JOIN b.mechanic m
            WHERE
                LOWER(b.bookingCode) LIKE LOWER(CONCAT('%', :query, '%'))
                OR LOWER(c.name) LIKE LOWER(CONCAT('%', :query, '%'))
                OR LOWER(c.email) LIKE LOWER(CONCAT('%', :query, '%'))
                OR LOWER(c.phone) LIKE LOWER(CONCAT('%', :query, '%'))
                OR LOWER(v.vehicleNumber) LIKE LOWER(CONCAT('%', :query, '%'))
                OR LOWER(v.vehicleModel) LIKE LOWER(CONCAT('%', :query, '%'))
                OR LOWER(s.serviceName) LIKE LOWER(CONCAT('%', :query, '%'))
                OR LOWER(s.category) LIKE LOWER(CONCAT('%', :query, '%'))
                OR LOWER(m.name) LIKE LOWER(CONCAT('%', :query, '%'))
                OR LOWER(m.mechanicCode) LIKE LOWER(CONCAT('%', :query, '%'))
            """)
    List<Booking> searchBookings(@Param("query") String query);
}