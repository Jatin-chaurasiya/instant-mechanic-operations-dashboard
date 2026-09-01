package com.instantmechanic.service;

import com.instantmechanic.dto.auth.AuthResponse;
import com.instantmechanic.dto.auth.LoginRequest;
import com.instantmechanic.dto.auth.RegisterRequest;
import com.instantmechanic.entity.User;
import com.instantmechanic.exception.BadRequestException;
import com.instantmechanic.repository.UserRepository;
import com.instantmechanic.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already registered");
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        User savedUser = userRepository.save(user);

        UserDetails userDetails =
                org.springframework.security.core.userdetails.User
                        .withUsername(savedUser.getEmail())
                        .password(savedUser.getPassword())
                        .authorities("USER")
                        .build();

        String token =
                jwtService.generateToken(userDetails);

        return new AuthResponse(
                token,
                savedUser.getName(),
                savedUser.getEmail()
        );
    }

    public AuthResponse login(LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user =
                userRepository.findByEmail(request.getEmail())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                )
                        );

        UserDetails userDetails =
                org.springframework.security.core.userdetails.User
                        .withUsername(user.getEmail())
                        .password(user.getPassword())
                        .authorities("USER")
                        .build();

        String token =
                jwtService.generateToken(userDetails);

        return new AuthResponse(
                token,
                user.getName(),
                user.getEmail()
        );
    }
}