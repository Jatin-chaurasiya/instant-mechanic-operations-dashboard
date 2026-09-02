package com.instantmechanic.service;

import com.instantmechanic.dto.profile.ProfileResponse;
import com.instantmechanic.entity.User;
import com.instantmechanic.exception.ResourceNotFoundException;
import com.instantmechanic.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public ProfileResponse getProfile(Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"
                        )
                );

        return ProfileResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role("ADMIN")
                .createdAt(user.getCreatedAt())
                .build();
    }
}