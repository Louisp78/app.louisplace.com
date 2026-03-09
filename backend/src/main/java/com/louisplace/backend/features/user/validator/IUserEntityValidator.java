package com.louisplace.backend.features.user.validator;

import com.louisplace.backend.features.user.UserEntity;

public interface IUserEntityValidator {
    boolean validateFields(UserEntity user);
}
