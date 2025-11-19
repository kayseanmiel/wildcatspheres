// In User.java
package com.wildcatspheres.wildcatspheres.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "course", nullable = false)
    private String course;

    @Column(name = "student_number", nullable = false, unique = true)
    private String studentNumber;

    @Column(nullable = false)
    private String section;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role = "STUDENT"; // Default role

    // Add any necessary getters and setters that aren't covered by @Data
}