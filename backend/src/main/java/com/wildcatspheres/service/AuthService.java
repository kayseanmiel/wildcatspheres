package com.wildcatspheres.service;

import com.wildcatspheres.entity.UserEntity;
import com.wildcatspheres.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean register(String email, String password) {
        if (userRepository.findByEmail(email).isPresent()) {
            return false; // email already exists
        }
        UserEntity user = new UserEntity(email, password);
        userRepository.save(user);
        return true;
    }

    public boolean login(String email, String password) {
        Optional<UserEntity> user = userRepository.findByEmail(email);
        return user.map(u -> u.getPassword().equals(password)).orElse(false);
    }
}
