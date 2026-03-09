package com.louisplace.backend.features.auth.session_service;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class SessionService implements ISessionProvider {

    @Override
    public SecurityContext getSession(String email) {

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                email,
                null,
                null);

        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(authentication);
        SecurityContextHolder.setContext(securityContext);
        return securityContext;
    }

    public String getPrincipal() {
        SecurityContext context = SecurityContextHolder.getContext();
        if (context == null || context.getAuthentication() == null) {
            return null;
        }
        return (String) context.getAuthentication().getPrincipal();
    }

    @Override
    public void logout() {
        SecurityContextHolder.clearContext();
    }

}
