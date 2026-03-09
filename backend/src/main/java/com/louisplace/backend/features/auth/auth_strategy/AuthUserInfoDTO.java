package com.louisplace.backend.features.auth.auth_strategy;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthUserInfoDTO {
    private String firstName;
    private String lastName;
    private String email;
}
