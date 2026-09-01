package com.instantmechanic.controller;

import com.instantmechanic.dto.analytics.AnalyticsResponse;
import com.instantmechanic.service.AnalyticsService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/analytics")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping
    public ResponseEntity<AnalyticsResponse> getAnalytics(

            @RequestParam(required = false)
            LocalDate from,

            @RequestParam(required = false)
            LocalDate to
    ) {

        LocalDate fromDate =
                from != null
                        ? from
                        : LocalDate.now().withDayOfMonth(1);

        LocalDate toDate =
                to != null
                        ? to
                        : LocalDate.now();

        return ResponseEntity.ok(
                analyticsService.getAnalytics(
                        fromDate,
                        toDate
                )
        );
    }
}