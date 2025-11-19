package com.wildcatspheres.wildcatspheres.service;

import com.wildcatspheres.wildcatspheres.entity.Event;
import com.wildcatspheres.wildcatspheres.repository.EventRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public List<Event> getEventsByUserId(@NonNull Long userId) {
        return eventRepository.findByCreatedById(userId);
    }

    public Optional<Event> getEventById(@NonNull Long id) {
        return eventRepository.findById(id);
    }

    public Event createEvent(@NonNull Event event) {
        return eventRepository.save(event);
    }

    public Optional<Event> updateEvent(@NonNull Event event) {
        Long id = event.getId();
        if (id == null || !eventRepository.existsById(id)) {
            return Optional.empty();
        }
        return Optional.of(eventRepository.save(event));
    }

    public boolean deleteEvent(@NonNull Long id) {
        if (!eventRepository.existsById(id)) return false;
        eventRepository.deleteById(id);
        return true;
    }
}
