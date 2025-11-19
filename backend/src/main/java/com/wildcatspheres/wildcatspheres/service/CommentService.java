package com.wildcatspheres.wildcatspheres.service;

import com.wildcatspheres.wildcatspheres.dto.CommentDTO;
import com.wildcatspheres.wildcatspheres.entity.Comment;
import com.wildcatspheres.wildcatspheres.entity.User;
import com.wildcatspheres.wildcatspheres.repository.CommentRepository;
import com.wildcatspheres.wildcatspheres.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    private static final Logger log = LoggerFactory.getLogger(CommentService.class);

    private final CommentRepository commentRepo;
    private final UserRepository userRepo;

    public CommentService(CommentRepository commentRepo, UserRepository userRepo) {
        this.commentRepo = commentRepo;
        this.userRepo = userRepo;
    }

    public Comment addComment(CommentDTO dto) {
        if (dto == null) {
            log.warn("DTO is null");
            return null;
        }

        Long userId = dto.getUserId();
        if (userId == null) {
            log.warn("UserId is null");
            return null;
        }

        Optional<User> userOpt = userRepo.findById(userId);
        if (userOpt.isEmpty()) {
            log.warn("User not found with ID: {}", userId);
            return null;
        }

        User user = userOpt.get();
        log.info("Found user: {}", user.getId());

        Comment comment = new Comment();
        comment.setCreatedBy(user);
        comment.setEventId(dto.getEventId());
        comment.setText(dto.getText());

        Comment saved = commentRepo.save(comment);
        log.info("Saved comment ID: {} with createdBy: {}", saved.getId(), 
                 (saved.getCreatedBy() != null ? saved.getCreatedBy().getId() : "NULL"));

        return saved;
    }

    public Comment updateComment(Long id, CommentDTO dto) {
        if (id == null || dto == null) return null;

        Optional<Comment> existingOpt = commentRepo.findById(id);
        if (existingOpt.isEmpty()) return null;

        Comment comment = existingOpt.get();
        comment.setText(dto.getText());
        comment.setEventId(dto.getEventId());

        Long userId = dto.getUserId();
        if (userId != null) {
            userRepo.findById(userId).ifPresent(comment::setCreatedBy);
        }

        return commentRepo.save(comment);
    }

    public boolean deleteComment(Long id) {
        if (id == null) return false;
        if (commentRepo.existsById(id)) {
            commentRepo.deleteById(id);
            return true;
        }
        return false;
    }

    public List<Comment> getCommentsByEvent(Long eventId) {
        if (eventId == null) return List.of();
        return commentRepo.findByEventId(eventId);
    }

    public List<Comment> getCommentsByUser(Long userId) {
        if (userId == null) return List.of();
        return commentRepo.findByCreatedBy_Id(userId);
    }
}