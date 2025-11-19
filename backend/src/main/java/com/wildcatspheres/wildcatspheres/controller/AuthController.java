package com.wildcatspheres.wildcatspheres.controller;

import com.wildcatspheres.wildcatspheres.dto.LoginRequest;
import com.wildcatspheres.wildcatspheres.dto.LoginResponse;
import com.wildcatspheres.wildcatspheres.dto.RegisterRequest;
import com.wildcatspheres.wildcatspheres.entity.User;
import com.wildcatspheres.wildcatspheres.security.JwtUtils; // Import your new Utils
import com.wildcatspheres.wildcatspheres.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserService userService;
    
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils; // ✅ Inject the Token Generator

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        try {
            User user = userService.register(registerRequest);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            // 1. Authenticate (Check Email & Password)
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getEmail(), 
                    loginRequest.getPassword()
                )
            );

            // 2. Generate REAL JWT Token
            String jwt = jwtUtils.generateToken(authentication);

            // 3. Get User Details (For the "Welcome" message)
            User userDetails = userService.getUserByEmail(loginRequest.getEmail());

            // 4. Return Token + User Object
            // Ensure your LoginResponse.java has a constructor for (String, User)
            return ResponseEntity.ok(new LoginResponse(jwt, userDetails));
            
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Login error: " + e.getMessage());
        }
    }
}