package com.wildcatspheres.wildcatspheres.service;

import com.wildcatspheres.wildcatspheres.dto.RegisterRequest;
import com.wildcatspheres.wildcatspheres.entity.User;
import com.wildcatspheres.wildcatspheres.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(), 
                user.getPassword(), 
                new ArrayList<>()
        );
    }

    // ✅ NEW METHOD: Used by AuthController to get full user details
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }

    public User register(RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Email is already in use");
        }
        if (userRepository.existsByStudentNumber(registerRequest.getStudentNumber())) {
            throw new RuntimeException("Student number is already in use");
        }
        if (!registerRequest.getPassword().equals(registerRequest.getConfirmPassword())) {
            throw new RuntimeException("Passwords do not match");
        }

        User user = new User();
        user.setFirstName(registerRequest.getFirstName());
        user.setLastName(registerRequest.getLastName());
        user.setEmail(registerRequest.getEmail());
        user.setCourse(registerRequest.getCourse());
        user.setStudentNumber(registerRequest.getStudentNumber());
        user.setSection(registerRequest.getSection());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setRole("STUDENT");

        return userRepository.save(user);
    }
}