package com.louisplace.backend.features.auth.auth_service;

import com.louisplace.backend.features.user.UserEntity;

public interface IAuthProvider {
    UserEntity authenticate(String identifier, String credential);

    void logout();
}
