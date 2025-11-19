package com.wildcatspheres.wildcatspheres.dto;

public class CommentDTO {
    private Long eventId;
    private Long userId;
    private String text;

    public Long getEventId() { return eventId; }
    public void setEventId(Long eventId) { this.eventId = eventId; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
}
