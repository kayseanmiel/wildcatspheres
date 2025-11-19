package com.wildcatspheres.controller;

import com.wildcatspheres.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public String register(@RequestParam String email, @RequestParam String password) {
        boolean success = authService.register(email, password);
        return success ? "Registration successful" : "Email already exists";
    }

    @PostMapping("/login")
    public String login(@RequestParam String email, @RequestParam String password) {
        boolean success = authService.login(email, password);
        return success ? "Login successful" : "Invalid email or password";
    }
}
