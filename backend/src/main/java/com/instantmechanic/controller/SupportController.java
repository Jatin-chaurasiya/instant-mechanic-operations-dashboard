package com.instantmechanic.controller;

import com.instantmechanic.dto.support.SupportRequest;
import com.instantmechanic.service.SupportService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/support")
@RequiredArgsConstructor
public class SupportController {

    private final SupportService supportService;

    @PostMapping
    public ResponseEntity<Map<String, String>> sendSupportMessage(
            @Valid @RequestBody SupportRequest request
    ) {

        supportService.sendSupportMessage(request);

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Support message sent successfully."
                )
        );
    }
}