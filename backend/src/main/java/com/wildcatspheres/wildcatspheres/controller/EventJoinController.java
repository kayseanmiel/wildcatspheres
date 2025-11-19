package com.wildcatspheres.wildcatspheres.controller;

import com.wildcatspheres.wildcatspheres.dto.EventJoinDTO;
import com.wildcatspheres.wildcatspheres.entity.EventJoin;
import com.wildcatspheres.wildcatspheres.service.EventJoinService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/event-joins")
@CrossOrigin(origins = "*")
public class EventJoinController {

    private final EventJoinService joinService;

    public EventJoinController(EventJoinService joinService) {
        this.joinService = joinService;
    }

    // Join event
    @PostMapping
    public ResponseEntity<EventJoin> joinEvent(@RequestBody EventJoinDTO dto) {
        EventJoin result = joinService.joinEvent(dto);
        if (result == null) return ResponseEntity.badRequest().build();
        return ResponseEntity.ok(result);
    }

    // Leave event
    @DeleteMapping("/leave")
    public ResponseEntity<Void> leaveEvent(@RequestParam Long userId, @RequestParam Long eventId) {
        boolean left = joinService.leaveEvent(userId, eventId);
        if (left) return ResponseEntity.ok().build();
        return ResponseEntity.badRequest().build();
    }

    // List participants
    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<EventJoin>> getParticipants(@PathVariable Long eventId) {
        return ResponseEntity.ok(joinService.getParticipants(eventId));
    }

    // Count participants
    @GetMapping("/event/{eventId}/count")
    public ResponseEntity<Long> countParticipants(@PathVariable Long eventId) {
        return ResponseEntity.ok(joinService.countParticipants(eventId));
    }

    // List all joins by a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<EventJoin>> getUserJoins(@PathVariable Long userId) {
        return ResponseEntity.ok(joinService.getJoinsByUser(userId));
    }
}
