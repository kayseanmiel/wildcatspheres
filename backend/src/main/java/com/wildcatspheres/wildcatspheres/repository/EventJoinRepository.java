package com.wildcatspheres.wildcatspheres.repository;

import com.wildcatspheres.wildcatspheres.entity.EventJoin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EventJoinRepository extends JpaRepository<EventJoin, Long> {

    // find joins for 1 event
    List<EventJoin> findByEventId(Long eventId);

    // find joins for 1 user
    List<EventJoin> findByUserId(Long userId);

    // check if user already joined
    boolean existsByUserIdAndEventId(Long userId, Long eventId);

    // count joins
    long countByEventId(Long eventId);
}
