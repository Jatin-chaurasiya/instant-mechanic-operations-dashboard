package com.instantmechanic.controller;

import com.instantmechanic.dto.profile.ProfileResponse;
import com.instantmechanic.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/profile")
@RequiredArgsConstructor
public class AdminProfileController {

    private final ProfileService profileService;

    @GetMapping
    public ResponseEntity<ProfileResponse> getProfile(
            Authentication authentication
    ) {
        ProfileResponse response =
                profileService.getProfile(authentication);

        return ResponseEntity.ok(response);
    }
}