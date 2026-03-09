package com.louisplace.backend.features.user;

import java.util.Optional;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserUpdateDTO {
    private Optional<String> firstName;
    private Optional<String> lastName;
}
