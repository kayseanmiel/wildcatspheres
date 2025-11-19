import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import eventJoinService from '../services/eventJoinService';
import { useAuth } from '../contexts/AuthContext';
import './EventParticipation.css';

function EventParticipation() {
  const { eventId } = useParams();
  const { currentUser } = useAuth();
  const [participants, setParticipants] = useState([]);
  const [participantCount, setParticipantCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isParticipating, setIsParticipating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [participantsData, countData] = await Promise.all([
          eventJoinService.getEventParticipants(eventId),
          eventJoinService.countEventParticipants(eventId)
        ]);
        
        setParticipants(participantsData);
        setParticipantCount(countData);
        
        const userParticipating = participantsData.some(
          p => p.user && p.user.id === currentUser.id
        );
        setIsParticipating(userParticipating);
      } catch (err) {
        setError('Failed to load event data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (currentUser) {
      fetchData();
    }
  }, [eventId, currentUser]);

  const handleJoin = async () => {
    try {
      await eventJoinService.joinEvent(eventId, currentUser.id);
      setIsParticipating(true);
      const [updatedParticipants, updatedCount] = await Promise.all([
        eventJoinService.getEventParticipants(eventId),
        eventJoinService.countEventParticipants(eventId)
      ]);
      setParticipants(updatedParticipants);
      setParticipantCount(updatedCount);
    } catch (err) {
      setError('Failed to join event');
      console.error(err);
    }
  };

  const handleLeave = async () => {
    try {
      await eventJoinService.leaveEvent(currentUser.id, eventId);
      setIsParticipating(false);
      const [updatedParticipants, updatedCount] = await Promise.all([
        eventJoinService.getEventParticipants(eventId),
        eventJoinService.countEventParticipants(eventId)
      ]);
      setParticipants(updatedParticipants);
      setParticipantCount(updatedCount);
    } catch (err) {
      setError('Failed to leave event');
      console.error(err);
    }
  };

  if (isLoading) return <div className="loading">Loading event data...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="event-participation">
      <h3>Participants ({participantCount})</h3>
      
      {participants.length > 0 ? (
        <ul className="participants-list">
          {participants.map(participant => (
            <li key={participant.id} className="participant-item">
              <span className="participant-name">
                {participant.user?.name || 'Unknown User'}
              </span>
              <span className="join-time">
                Joined: {new Date(participant.joinedAt).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No participants yet. Be the first to join!</p>
      )}

      <div className="participation-actions">
        {isParticipating ? (
          <button onClick={handleLeave} className="btn btn-danger">
            Leave Event
          </button>
        ) : (
          <button onClick={handleJoin} className="btn btn-primary">
            Join Event
          </button>
        )}
      </div>
    </div>
  );
}

export default EventParticipation;
