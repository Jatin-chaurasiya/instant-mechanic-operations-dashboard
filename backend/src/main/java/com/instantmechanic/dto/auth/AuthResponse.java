package com.instantmechanic.dto.auth;

import com.instantmechanic.enums.Role;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {

    private String token;
    private String name;
    private String email;
    private Role role;
}