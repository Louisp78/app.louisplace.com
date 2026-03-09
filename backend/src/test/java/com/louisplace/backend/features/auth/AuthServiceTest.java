package com.louisplace.backend.features.auth;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.louisplace.backend.features.auth.auth_service.AuthService;
import com.louisplace.backend.features.auth.auth_strategy.AuthUserInfoDTO;
import com.louisplace.backend.features.auth.auth_strategy.IAuthStragegy;
import com.louisplace.backend.features.auth.session_service.SessionService;
import com.louisplace.backend.features.user.IUserRepository;
import com.louisplace.backend.features.user.UserEntity;

@ExtendWith(MockitoExtension.class)
@DisplayName("AuthService Tests")
class AuthServiceTest {

        @Mock
        private IAuthStragegy strategy;

        @Mock
        private IUserRepository userRepository;

        @Mock
        private SessionService sessionService;

        @InjectMocks
        private AuthService authService;

        @Test
        @DisplayName("Should successfully authenticate with Google provider")
        void shouldAuthenticateWithGoogle() {
                String authorizationCode = "google_auth_code_123";
                UserEntity mockUser = new UserEntity();
                mockUser.setEmail("test@google.com");

                AuthUserInfoDTO mockUserInfo = new AuthUserInfoDTO(
                                "GoogleFirstName",
                                "GoogleLastName",
                                "test@google.com");

                when(strategy.authenticate(eq("google"), eq(authorizationCode)))
                                .thenReturn(mockUserInfo);
                when(userRepository.findByEmail("test@google.com"))
                                .thenReturn(java.util.Optional.of(mockUser));

                UserEntity user = authService.authenticate("google", authorizationCode);

                assertNotNull(user);
                assertNotNull(user.getEmail());
        }

        @Test
        @DisplayName("Should successfully authenticate with GitHub provider")
        void shouldAuthenticateWithGitHub() {
                String authorizationCode = "github_auth_code_456";
                UserEntity mockUser = new UserEntity();
                mockUser.setEmail("test@github.com");

                AuthUserInfoDTO mockUserInfo = new AuthUserInfoDTO(
                                "GitHubFirstName",
                                "GitHubLastName",
                                "test@github.com");

                when(strategy.authenticate(eq("github"), eq(authorizationCode)))
                                .thenReturn(mockUserInfo);
                when(userRepository.findByEmail("test@github.com"))
                                .thenReturn(java.util.Optional.of(mockUser));

                UserEntity user = authService.authenticate("github", authorizationCode);

                assertNotNull(user);
                assertNotNull(user.getEmail());
        }
}
