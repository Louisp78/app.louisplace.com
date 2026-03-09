package com.louisplace.backend.features.user.validator;

import org.springframework.stereotype.Service;

import com.louisplace.backend.features.user.UserEntity;

@Service
public class UserEntityValidator implements IUserEntityValidator {

    public boolean validateFields(UserEntity user) {
        return validateNames(user.getFirstName()) &&
                validateNames(user.getLastName());
    }

    private boolean validateNames(String name) {
        return name != null && !name.isEmpty();
    }
}
