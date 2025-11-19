package com.wildcatspheres.wildcatspheres.controller;

import com.wildcatspheres.wildcatspheres.entity.User;
import com.wildcatspheres.wildcatspheres.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173") // Allow Frontend access
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // ✅ ENDPOINT: GET /api/users/me
    // This gets the currently logged-in user's details using their Token.
    @GetMapping("/me")
    public ResponseEntity<User> authenticatedUser() {
        // 1. Get the email from the Security Context (put there by your JwtFilter)
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName(); // This is the email

        // 2. Fetch the full user details from the database
        User user = userService.getUserByEmail(currentPrincipalName);

        return ResponseEntity.ok(user);
    }
}