package com.wildcatspheres.wildcatspheres.controller;

import com.wildcatspheres.wildcatspheres.entity.Event;
import com.wildcatspheres.wildcatspheres.entity.User;
import com.wildcatspheres.wildcatspheres.service.EventService;
import com.wildcatspheres.wildcatspheres.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:5173") // Specific origin is safer
public class EventController {

    private final EventService eventService;
    private final UserService userService; // ✅ Added UserService

    // ✅ Updated Constructor to inject UserService
    public EventController(EventService eventService, UserService userService) {
        this.eventService = eventService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Event>> getEventsByUser(@PathVariable @NonNull Long userId) {
        return ResponseEntity.ok(eventService.getEventsByUserId(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable @NonNull Long id) {
        return eventService.getEventById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ UPDATED: Automatically links the event to the logged-in user
    @PostMapping
    public ResponseEntity<Event> createEvent(@RequestBody @NonNull Event event) {
        // 1. Get the email from the Security Token
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        // 2. Find the actual User entity
        User creator = userService.getUserByEmail(email);

        // 3. Link the user to the event
        event.setCreatedBy(creator);

        // 4. Save
        return ResponseEntity.ok(eventService.createEvent(event));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable @NonNull Long id, @RequestBody @NonNull Event event) {
        event.setId(id);
        return eventService.updateEvent(event)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable @NonNull Long id) {
        if (eventService.deleteEvent(id)) return ResponseEntity.ok().build();
        return ResponseEntity.notFound().build();
    }
}