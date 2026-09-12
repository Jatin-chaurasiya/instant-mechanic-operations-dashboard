package com.instantmechanic.controller;

import com.instantmechanic.dto.mechanic.MechanicRequest;
import com.instantmechanic.dto.mechanic.MechanicResponse;
import com.instantmechanic.enums.MechanicStatus;
import com.instantmechanic.service.MechanicService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mechanics")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class MechanicController {

    private final MechanicService mechanicService;

    @GetMapping
    public ResponseEntity<Page<MechanicResponse>> getMechanics(

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "10")
            int size,

            @RequestParam(required = false)
            String keyword,

            @RequestParam(required = false)
            MechanicStatus status
    ) {

        return ResponseEntity.ok(
                mechanicService.getMechanics(
                        page,
                        size,
                        keyword,
                        status
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<MechanicResponse> getMechanicById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                mechanicService.getMechanicById(id)
        );
    }
    // Get Available Mechanics

    @GetMapping("/available")
    public ResponseEntity<Page<MechanicResponse>> getAvailableMechanics(

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "10")
            int size
    ) {

        return ResponseEntity.ok(
                mechanicService.getAvailableMechanics(
                        page,
                        size
                )
        );
    }
    // Add Mechanic

    @PostMapping
    public ResponseEntity<MechanicResponse> addMechanic(
            @Valid @RequestBody MechanicRequest request
    ) {

        return ResponseEntity.ok(
                mechanicService.addMechanic(request)
        );
    }
    // Update Mechanic

    @PutMapping("/{id}")
    public ResponseEntity<MechanicResponse> updateMechanic(
            @PathVariable Long id,
            @Valid @RequestBody MechanicRequest request
    ) {

        return ResponseEntity.ok(
                mechanicService.updateMechanic(
                        id,
                        request
                )
        );
    }
    // Deactivate Mechanic

    @PutMapping("/{id}/deactivate")
    public ResponseEntity<MechanicResponse> deactivateMechanic(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                mechanicService.deactivateMechanic(id)
        );
    }
    // Activate Mechanic

    @PutMapping("/{id}/activate")
    public ResponseEntity<MechanicResponse> activateMechanic(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                mechanicService.activateMechanic(id)
        );
    }
    // Get Inactive Mechanics

    @GetMapping("/inactive")
    public ResponseEntity<Page<MechanicResponse>> getInactiveMechanics(

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "10")
            int size
    ) {

        return ResponseEntity.ok(
                mechanicService.getInactiveMechanics(
                        page,
                        size
                )
        );
    }
}