package com.louisplace.backend.features.user;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.lenient;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.louisplace.backend.features.user.validator.UserEntityValidator;

@ExtendWith(MockitoExtension.class)
@DisplayName("UserService Tests")
public class UserServiceTest {

    @Mock
    private IUserRepository userRepository;

    @Mock
    private UserEntityValidator userEntityValidator;

    @InjectMocks
    private UserService userService;

    static String email = "test@example.com";
    static String firstName = "FirstName";
    static String lastName = "LastName";

    @BeforeEach
    void beforeEach() {
        lenient().when(userEntityValidator.validateFields(any())).thenReturn(true);

        UserEntity mockUser = new UserEntity();
        mockUser.setEmail(email);
        mockUser.setFirstName(firstName);
        mockUser.setLastName(lastName);

        lenient().when(userRepository.findByEmail(email))
                .thenReturn(java.util.Optional.of(mockUser));

        lenient().when(userRepository.save(any(UserEntity.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));
    }

    @Nested
    @DisplayName("UserService Tests")
    class UserServiceTests {

        @Test
        @DisplayName("Should successfully retrieve user by email")
        void shouldRetrieveUserByEmail() {
            UserEntity user = userService.getUserInfo(email).orElse(null);

            assertNotNull(user);
            assertEquals(email, user.getEmail());
            assertEquals(firstName, user.getFirstName());
            assertEquals(lastName, user.getLastName());
        }

        @Test
        @DisplayName("Should return null when user not found by email")
        void shouldReturnNullWhenUserNotFoundByEmail() {
            UserEntity user = userService.getUserInfo("notfound@gmail.com").orElse(null);

            assertNull(user);
        }

        @Test
        @DisplayName("Should successfully update user information when user already exists")
        void shouldUpdateUserInfo() {
            String firstName = "UpdatedFirstName";
            String lastName = "UpdatedLastName";

            UserUpdateDTO updateDTO = new UserUpdateDTO(Optional.of(firstName), Optional.of(lastName));

            UserEntity updatedUser = userService.updateUserInfo(email, updateDTO).orElse(null);

            assertNotNull(updatedUser);
            assertEquals(firstName, updatedUser.getFirstName());
            assertEquals(lastName, updatedUser.getLastName());
        }

        @Test
        @DisplayName("Should return null when trying to update non-existent user")
        void shouldReturnNullWhenUpdatingNonExistentUser() {
            String firstName = "FirstName";
            String lastName = "LastName";
            String email = "notfound@gmail.com";

            UserUpdateDTO updateDTO = new UserUpdateDTO(Optional.of(firstName), Optional.of(lastName));

            UserEntity updatedUser = userService.updateUserInfo(email, updateDTO).orElse(null);

            assertNull(updatedUser);
        }
    }
}
