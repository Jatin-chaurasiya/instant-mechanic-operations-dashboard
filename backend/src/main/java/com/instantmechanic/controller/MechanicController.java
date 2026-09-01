package com.instantmechanic.controller;

import com.instantmechanic.dto.mechanic.MechanicResponse;
import com.instantmechanic.enums.MechanicStatus;
import com.instantmechanic.service.MechanicService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}