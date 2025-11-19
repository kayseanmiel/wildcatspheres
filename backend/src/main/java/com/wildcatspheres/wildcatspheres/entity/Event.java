package com.wildcatspheres.wildcatspheres.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String location;

    private String date;    // e.g. "2025-03-14"
    private String time;    // e.g. "14:00"

    @ManyToOne
    @JoinColumn(name = "user_id")   // foreign key linking to users table
    private User createdBy;
}
