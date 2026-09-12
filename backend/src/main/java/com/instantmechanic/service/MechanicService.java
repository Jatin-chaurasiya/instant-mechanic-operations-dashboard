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
import com.instantmechanic.dto.mechanic.MechanicRequest;
import com.instantmechanic.enums.BookingStatus;
import com.instantmechanic.exception.BadRequestException;


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
    // Get Available Mechanics

    @Transactional(readOnly = true)
    public Page<MechanicResponse> getAvailableMechanics(
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
                        Sort.Direction.ASC,
                        "id"
                )
        );

        Page<Mechanic> mechanicPage =
                mechanicRepository.findByStatus(
                        MechanicStatus.AVAILABLE,
                        pageable
                );

        return mechanicPage.map(this::entityToDto);
    }
    // Add Mechanic

    @Transactional
    public MechanicResponse addMechanic(
            MechanicRequest request
    ) {

        Mechanic mechanic = new Mechanic();

        mechanic.setMechanicCode(
                generateMechanicCode()
        );

        mechanic.setName(
                request.getName().trim()
        );

        mechanic.setPhone(
                request.getPhone().trim()
        );

        mechanic.setLocation(
                request.getLocation() != null
                        ? request.getLocation().trim()
                        : null
        );

        mechanic.setStatus(
                request.getStatus()
        );

        Mechanic savedMechanic =
                mechanicRepository.save(mechanic);

        return entityToDto(savedMechanic);
    }
    // Update Mechanic

    @Transactional
    public MechanicResponse updateMechanic(
            Long id,
            MechanicRequest request
    ) {

        Mechanic mechanic =
                mechanicRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Mechanic not found with id: "
                                                + id
                                )
                        );

        mechanic.setName(
                request.getName().trim()
        );

        mechanic.setPhone(
                request.getPhone().trim()
        );

        mechanic.setLocation(
                request.getLocation() != null
                        ? request.getLocation().trim()
                        : null
        );

        mechanic.setStatus(
                request.getStatus()
        );

        Mechanic updatedMechanic =
                mechanicRepository.save(mechanic);

        return entityToDto(updatedMechanic);
    }
    // Deactivate Mechanic

    @Transactional
    public MechanicResponse deactivateMechanic(Long id) {

        Mechanic mechanic =
                mechanicRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Mechanic not found with id: "
                                                + id
                                )
                        );

        if (mechanic.getStatus() == MechanicStatus.INACTIVE) {

            throw new BadRequestException(
                    "Mechanic is already inactive"
            );
        }

        if (mechanic.getStatus() != MechanicStatus.AVAILABLE) {

            throw new BadRequestException(
                    "Only AVAILABLE mechanics can be deactivated"
            );
        }

        mechanic.setStatus(
                MechanicStatus.INACTIVE
        );

        Mechanic updatedMechanic =
                mechanicRepository.save(mechanic);

        return entityToDto(updatedMechanic);
    }
    // Activate Mechanic

    @Transactional
    public MechanicResponse activateMechanic(Long id) {

        Mechanic mechanic =
                mechanicRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Mechanic not found with id: "
                                                + id
                                )
                        );

        if (mechanic.getStatus() != MechanicStatus.INACTIVE) {

            throw new BadRequestException(
                    "Only INACTIVE mechanics can be activated"
            );
        }

        mechanic.setStatus(
                MechanicStatus.AVAILABLE
        );

        Mechanic updatedMechanic =
                mechanicRepository.save(mechanic);

        return entityToDto(updatedMechanic);
    }
    // Get Inactive Mechanics

    @Transactional(readOnly = true)
    public Page<MechanicResponse> getInactiveMechanics(
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
                        Sort.Direction.ASC,
                        "id"
                )
        );

        Page<Mechanic> mechanicPage =
                mechanicRepository.findByStatus(
                        MechanicStatus.INACTIVE,
                        pageable
                );

        return mechanicPage.map(
                this::entityToDto
        );
    }
    private String generateMechanicCode() {

        return "MEC" + System.currentTimeMillis();
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