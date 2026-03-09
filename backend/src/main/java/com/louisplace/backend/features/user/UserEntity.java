package com.louisplace.backend.features.user;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "users")
public class UserEntity implements Serializable {
    @Getter
    @Id
    @GeneratedValue
    private Long id;

    @Setter
    @Getter
    @Column
    private String firstName;

    @Setter
    @Getter
    @Column
    private String lastName;

    @Setter
    @Getter
    @Column(nullable = false, unique = true)
    private String email;
}
