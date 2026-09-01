package com.instantmechanic.service;

import com.instantmechanic.dto.mechanic.MechanicResponse;
import com.instantmechanic.entity.Mechanic;
import com.instantmechanic.enums.MechanicStatus;
import com.instantmechanic.exception.ResourceNotFoundException;
import com.instantmechanic.repository.BookingRepository;
import com.instantmechanic.repository.MechanicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MechanicService {

    private final MechanicRepository mechanicRepository;

    private final BookingRepository bookingRepository;

    @Transactional(readOnly = true)
    public Page<MechanicResponse> getMechanics(
            int page,
            int size,
            String keyword,
            MechanicStatus status
    ) {

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(
                        Sort.Direction.ASC,
                        "id"
                )
        );

        Page<Mechanic> mechanicPage;

        if (status != null) {

            mechanicPage =
                    mechanicRepository.findByStatus(
                            status,
                            pageable
                    );

        } else if (keyword != null
                && !keyword.trim().isEmpty()) {

            mechanicPage =
                    mechanicRepository.searchMechanics(
                            keyword.trim(),
                            pageable
                    );

        } else {

            mechanicPage =
                    mechanicRepository.findAll(pageable);
        }

        return mechanicPage.map(this::entityToDto);
    }

    @Transactional(readOnly = true)
    public MechanicResponse getMechanicById(Long id) {

        Mechanic mechanic =
                mechanicRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Mechanic not found with id: " + id
                                )
                        );

        return entityToDto(mechanic);
    }

    private MechanicResponse entityToDto(
            Mechanic mechanic
    ) {

        long jobsCompleted =
                bookingRepository
                        .countCompletedBookingsByMechanicId(
                                mechanic.getId()
                        );

        return MechanicResponse.builder()
                .id(mechanic.getId())
                .mechanicCode(mechanic.getMechanicCode())
                .name(mechanic.getName())
                .phone(mechanic.getPhone())
                .location(mechanic.getLocation())
                .status(mechanic.getStatus().name())
                .jobsCompleted(jobsCompleted)
                .build();
    }
}