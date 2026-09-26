package com.instantmechanic.config;

import com.instantmechanic.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    private final UserDetailsService userDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {

        DaoAuthenticationProvider provider =
                new DaoAuthenticationProvider(userDetailsService);

        provider.setPasswordEncoder(passwordEncoder());

        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration
    ) throws Exception {

        return configuration.getAuthenticationManager();
    }
    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http
                // REST API → CSRF not required
                .csrf(csrf -> csrf.disable())

                // Enable CORS
                .cors(cors -> {})

                // JWT → Stateless session
                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                .authorizeHttpRequests(auth -> auth

                        // Public APIs
                        .requestMatchers(
                                "/auth/register",
                                "/auth/login",
                                "/swagger-ui/**",
                                "/v3/api-docs/**",
                                "/**/OPTIONS"
                        ).permitAll()

                        // Public service viewing
                        .requestMatchers(
                                HttpMethod.GET,
                                "/services",
                                "/services/**"
                        ).permitAll()

                        // Admin APIs
                        .requestMatchers("/admin/**")
                        .hasAuthority("ADMIN")

                        // Customer APIs
                        .requestMatchers("/customer/**")
                        .hasAuthority("CUSTOMER")

                        // Admin customer management APIs
                        .requestMatchers("/customers/**")
                        .hasAuthority("ADMIN")
                        .requestMatchers("/mechanics/**")
                        .hasAuthority("ADMIN")

                        // Admin booking APIs
                        .requestMatchers("/bookings/**")
                        .hasAuthority("ADMIN")

                        // Other authenticated APIs
                        .anyRequest()
                        .authenticated()
                )
                // Authentication Provider
                .authenticationProvider(
                        authenticationProvider()
                )

                // JWT Filter
                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}