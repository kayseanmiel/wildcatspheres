package com.wildcatspheres.wildcatspheres.repository;

import com.wildcatspheres.wildcatspheres.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByEventId(Long eventId);
    List<Comment> findByCreatedBy_Id(Long userId);
}
