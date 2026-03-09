package com.louisplace.backend.features.user;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.louisplace.backend.features.user.validator.UserEntityValidator;

@Service
public class UserService implements IUserService {

    IUserRepository userRepository;
    UserEntityValidator userEntityValidator;

    public UserService(IUserRepository userRepository, UserEntityValidator userEntityValidator) {
        this.userRepository = userRepository;
        this.userEntityValidator = userEntityValidator;
    }

    public Optional<UserEntity> getUserInfo(String identifier) {
        Optional<UserEntity> user = userRepository.findByEmail(identifier);
        return user;
    }

    public Optional<UserEntity> updateUserInfo(String identifier, UserUpdateDTO dataToUpdate) {
        Optional<UserEntity> optUser = this.getUserInfo(identifier);
        if (optUser.isEmpty()) {
            return Optional.empty();
        }

        UserEntity userEntity = optUser.get();
        if (!userEntityValidator.validateFields(userEntity)) {
            return Optional.empty();
        }
        dataToUpdate.getFirstName().ifPresent(userEntity::setFirstName);
        dataToUpdate.getLastName().ifPresent(userEntity::setLastName);

        UserEntity savedUser = userRepository.save(userEntity);
        return Optional.of(savedUser);
    }

}
