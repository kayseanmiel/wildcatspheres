package com.wildcatspheres.wildcatspheres.service;

import com.wildcatspheres.wildcatspheres.dto.EventJoinDTO;
import com.wildcatspheres.wildcatspheres.entity.Event;
import com.wildcatspheres.wildcatspheres.entity.EventJoin;
import com.wildcatspheres.wildcatspheres.entity.User;
import com.wildcatspheres.wildcatspheres.repository.EventJoinRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EventJoinService {

    private final EventJoinRepository joinRepo;

    public EventJoinService(EventJoinRepository joinRepo) {
        this.joinRepo = joinRepo;
    }

    // Accept DTO and create EventJoin
    public EventJoin joinEvent(EventJoinDTO dto) {
        if (dto.getUserId() == null || dto.getEventId() == null) return null;

        User user = new User();
        user.setId(dto.getUserId());

        Event event = new Event();
        event.setId(dto.getEventId());

        EventJoin join = new EventJoin();
        join.setUser(user);
        join.setEvent(event);

        if (!joinRepo.existsByUserIdAndEventId(dto.getUserId(), dto.getEventId())) {
            join.setJoinedAt(LocalDateTime.now());
            return joinRepo.save(join);
        }
        return null;
    }

    public boolean leaveEvent(Long userId, Long eventId) {
        List<EventJoin> joins = joinRepo.findByEventId(eventId);
        for (EventJoin j : joins) {
            if (j.getUser().getId().equals(userId)) {
                joinRepo.delete(j);
                return true;
            }
        }
        return false;
    }

    public List<EventJoin> getParticipants(Long eventId) {
        return joinRepo.findByEventId(eventId);
    }

    public long countParticipants(Long eventId) {
        return joinRepo.countByEventId(eventId);
    }

    public List<EventJoin> getJoinsByUser(Long userId) {
        return joinRepo.findByUserId(userId);
    }
}
