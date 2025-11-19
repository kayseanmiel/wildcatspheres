// In UserRepository.java
package com.wildcatspheres.wildcatspheres.repository;

import com.wildcatspheres.wildcatspheres.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByStudentNumber(String studentNumber);
}