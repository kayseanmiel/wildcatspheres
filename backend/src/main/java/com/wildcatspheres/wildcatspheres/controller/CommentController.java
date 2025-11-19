package com.wildcatspheres.wildcatspheres.controller;

import com.wildcatspheres.wildcatspheres.dto.CommentDTO;
import com.wildcatspheres.wildcatspheres.entity.Comment;
import com.wildcatspheres.wildcatspheres.service.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "*")
public class CommentController {

    private final CommentService commentService;

    public CommentController(@NonNull CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping
    public ResponseEntity<Comment> addComment(@RequestBody @NonNull CommentDTO dto) {
        Comment comment = commentService.addComment(dto);
        if (comment == null) return ResponseEntity.badRequest().build();
        return ResponseEntity.ok(comment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Comment> updateComment(@PathVariable @NonNull Long id, @RequestBody @NonNull CommentDTO dto) {
        Comment updated = commentService.updateComment(id, dto);
        if (updated == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable @NonNull Long id) {
        if (commentService.deleteComment(id)) return ResponseEntity.ok().build();
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<Comment>> getCommentsByEvent(@PathVariable @NonNull Long eventId) {
        return ResponseEntity.ok(commentService.getCommentsByEvent(eventId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Comment>> getCommentsByUser(@PathVariable @NonNull Long userId) {
        return ResponseEntity.ok(commentService.getCommentsByUser(userId));
    }
}
