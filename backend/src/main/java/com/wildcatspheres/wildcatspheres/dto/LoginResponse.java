package com.wildcatspheres.wildcatspheres.dto;

import com.wildcatspheres.wildcatspheres.entity.User;

public class LoginResponse {
    private String token;
    private User user; // ✅ Added User object so Frontend gets First Name/Last Name

    public LoginResponse(String token, User user) {
        this.token = token;
        this.user = user;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}