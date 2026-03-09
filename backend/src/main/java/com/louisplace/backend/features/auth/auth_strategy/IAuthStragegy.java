package com.louisplace.backend.features.auth.auth_strategy;

public interface IAuthStragegy {
    AuthUserInfoDTO authenticate(String identifier, String credential);

    boolean supports(String strategyType);
}
