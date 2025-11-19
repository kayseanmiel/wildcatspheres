// In src/main/java/com/wildcatspheres/wildcatspheres/dto/RegisterRequest.java
package com.wildcatspheres.wildcatspheres.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String course;
    private String studentNumber;
    private String section;
    private String password;
    private String confirmPassword;
}