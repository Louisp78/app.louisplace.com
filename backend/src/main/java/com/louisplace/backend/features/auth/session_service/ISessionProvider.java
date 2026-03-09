package com.louisplace.backend.features.auth.session_service;

import org.springframework.security.core.context.SecurityContext;

public interface ISessionProvider {
    SecurityContext getSession(String email);

    void logout();
}
