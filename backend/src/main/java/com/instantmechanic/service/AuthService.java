package com.instantmechanic.service;

import com.instantmechanic.dto.auth.AuthResponse;
import com.instantmechanic.dto.auth.LoginRequest;
import com.instantmechanic.dto.auth.RegisterRequest;
import com.instantmechanic.entity.Customer;
import com.instantmechanic.entity.User;
import com.instantmechanic.enums.Role;
import com.instantmechanic.exception.BadRequestException;
import com.instantmechanic.repository.CustomerRepository;
import com.instantmechanic.repository.UserRepository;
import com.instantmechanic.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;

    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;


    // =========================================================
    // REGISTER CUSTOMER
    // =========================================================

    @Transactional
    public AuthResponse register(RegisterRequest request) {

        // Check duplicate email
        if (userRepository.existsByEmail(request.getEmail())) {

            throw new BadRequestException(
                    "Email already registered"
            );
        }


        // =====================================================
        // 1. Create User
        // =====================================================

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());

        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );

        // Public registration always creates CUSTOMER
        user.setRole(Role.CUSTOMER);

        User savedUser =
                userRepository.save(user);


        // =====================================================
        // 2. Create Customer
        // =====================================================

        Customer customer = new Customer();

        customer.setName(request.getName());
        customer.setEmail(request.getEmail());
        customer.setPhone(request.getPhone());
        customer.setAddress(request.getAddress());

        customerRepository.save(customer);


        // =====================================================
        // 3. Create UserDetails
        // =====================================================

        UserDetails userDetails =
                org.springframework.security.core.userdetails.User
                        .withUsername(savedUser.getEmail())
                        .password(savedUser.getPassword())
                        .authorities(
                                savedUser.getRole().name()
                        )
                        .build();


        // =====================================================
        // 4. Generate JWT
        // =====================================================

        String token =
                jwtService.generateToken(userDetails);


        // =====================================================
        // 5. Return Response
        // =====================================================

        return new AuthResponse(
                token,
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getRole()
        );
    }


    // =========================================================
    // LOGIN
    // =========================================================

    public AuthResponse login(LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );


        User user =
                userRepository.findByEmail(
                        request.getEmail()
                ).orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        )
                );


        UserDetails userDetails =
                org.springframework.security.core.userdetails.User
                        .withUsername(user.getEmail())
                        .password(user.getPassword())
                        .authorities(
                                user.getRole().name()
                        )
                        .build();


        String token =
                jwtService.generateToken(userDetails);


        return new AuthResponse(
                token,
                user.getName(),
                user.getEmail(),
                user.getRole()
        );
    }
}