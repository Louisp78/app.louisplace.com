package com.louisplace.backend.features.user;

import java.util.Optional;

import org.springframework.data.repository.Repository;

public interface IUserRepository extends Repository<UserEntity, Long> {
    Optional<UserEntity> findById(Long id);

    Optional<UserEntity> findByEmail(String email);

    UserEntity save(UserEntity user);
}
