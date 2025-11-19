package com.wildcatspheres.wildcatspheres.repository;

import com.wildcatspheres.wildcatspheres.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    // Find events by the ID of the user who created them
    @Query("SELECT e FROM Event e WHERE e.createdBy.id = :userId")
    List<Event> findByCreatedById(@Param("userId") Long userId);
}
