package com.instantmechanic.controller;

import com.instantmechanic.dto.GlobalSearch.GlobalSearchResponse;
import com.instantmechanic.service.GlobalSearchService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/search")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class GlobalSearchController {

    private final GlobalSearchService globalSearchService;

    @GetMapping
    public ResponseEntity<GlobalSearchResponse> search(
            @RequestParam String query
    ) {

        GlobalSearchResponse response =
                globalSearchService.search(query);

        return ResponseEntity.ok(response);
    }
}