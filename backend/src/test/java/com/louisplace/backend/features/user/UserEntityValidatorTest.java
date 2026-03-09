package com.louisplace.backend.features.user;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.louisplace.backend.features.user.validator.UserEntityValidator;

public class UserEntityValidatorTest {

    UserEntityValidator validator;

    public UserEntityValidatorTest() {
        this.validator = new UserEntityValidator();
    }

    @Test
    @DisplayName("should name valid when fields are well filled")
    void shouldHaveFieldsWellValidated() {
        String firstName = "e";
        UserEntity user = new UserEntity();
        user.setFirstName(firstName);
        user.setLastName("x");

        boolean isValid = validator.validateFields(user);

        assert (isValid);
    }

    @Test
    @DisplayName("should name invalid when null")
    void shouldHaveNullNameInvalidated() {
        String firstName = null;
        UserEntity user = new UserEntity();
        user.setFirstName(firstName);
        user.setLastName("x");

        boolean isValid = validator.validateFields(user);

        assert (!isValid);
    }

    @Test
    @DisplayName("should name invalid when empty")
    void shouldHaveEmptyNameInvalidated() {
        String firstName = "";
        UserEntity user = new UserEntity();
        user.setFirstName(firstName);
        user.setLastName("x");

        boolean isValid = validator.validateFields(user);

        assert (!isValid);
    }

}