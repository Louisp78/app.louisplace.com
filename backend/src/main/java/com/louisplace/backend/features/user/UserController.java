package com.louisplace.backend.features.user;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.louisplace.backend.features.auth.session_service.SessionService;

@RestController
@RequestMapping("/users")
public class UserController {

    SessionService sessionService;
    UserService userService;

    public UserController(SessionService sessionService, UserService userService) {
        this.sessionService = sessionService;
        this.userService = userService;
    }

    @PutMapping("/me")
    public ResponseEntity<UserDTO> updateUserInfos(@RequestBody UserUpdateDTO dataToUpdate) {
        String email = sessionService.getPrincipal();
        UserEntity user = userService.updateUserInfo(email, dataToUpdate).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(new UserDTO(user));
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getUserInfos() {
        String email = sessionService.getPrincipal();
        UserEntity user = userService.getUserInfo(email).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok().body(new UserDTO(user));
    }

}
