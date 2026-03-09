package com.louisplace.backend.features.user;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.louisplace.backend.features.auth.session_service.SessionService;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

    @Mock
    UserService userService;

    @Mock
    SessionService sessionService;

    @InjectMocks
    UserController userController;

    static String email = "test@example.com";
    static String firstName = "FirstName";
    static String lastName = "LastName";

    @BeforeEach
    void beforeEach() {
        lenient().when(sessionService.getPrincipal()).thenReturn(email);

        UserEntity mockUser = new UserEntity();
        mockUser.setEmail(email);
        mockUser.setFirstName(firstName);
        mockUser.setLastName(lastName);

        lenient().when(userService.getUserInfo(email))
                .thenReturn(java.util.Optional.of(mockUser));

        lenient().when(userService.updateUserInfo(any(), any()))
                .thenReturn(java.util.Optional.of(mockUser));
    }

    @Test
    @DisplayName("should expose get current user profile endpoint")
    void shouldExposeGetUserProfileEndpoint() {

        ResponseEntity<UserDTO> response = userController.getUserInfos();

        assertEquals(HttpStatus.OK.value(), response.getStatusCode().value());
        assertNotNull(response.getBody());
    }

    @Test
    @DisplayName("should return not found when getting non existent user")
    void shouldReturnNotFoundWhenGettingNonExistentUser() {
        when(userService.getUserInfo(any()))
                .thenReturn(Optional.empty());

        ResponseEntity<UserDTO> response = userController.getUserInfos();
        assertEquals(HttpStatus.NOT_FOUND.value(), response.getStatusCode().value());
        assertNull(response.getBody());
    }

    @Test
    @DisplayName("should update current user profile given valid data for authenticated user")

    void shouldExposeUpdateUserProfileEndpoint() {
        String firstName = "FirstNameUpdated";
        String lastName = "LastNameUpdated";
        UserUpdateDTO updateUserDto = new UserUpdateDTO(Optional.of(firstName), Optional.of(lastName));

        ResponseEntity<UserDTO> response = userController.updateUserInfos(updateUserDto);

        assertEquals(HttpStatus.OK.value(), response.getStatusCode().value());
        assertNotNull(response.getBody());
    }

    @Test
    @DisplayName("should return not found when updating non existent user")
    void shouldReturnNotFoundWhenUpdatingNonExistentUser() {
        String firstName = "FirstNameUpdated";
        String lastName = "LastNameUpdated";
        UserUpdateDTO updateUserDto = new UserUpdateDTO(Optional.of(firstName), Optional.of(lastName));

        when(userService.updateUserInfo(any(), any()))
                .thenReturn(Optional.empty());

        ResponseEntity<UserDTO> response = userController.updateUserInfos(updateUserDto);

        assertEquals(HttpStatus.NOT_FOUND.value(), response.getStatusCode().value());
        assertNull(response.getBody());
    }
}
