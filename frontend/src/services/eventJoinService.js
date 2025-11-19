import api from '../config/api';

const eventJoinService = {
  async joinEvent(eventId, userId) {
    try {
      const response = await api.post('/api/event-joins', {
        userId,
        eventId
      });
      return response.data;
    } catch (error) {
      console.error('Error joining event:', error);
      throw error;
    }
  },

  async leaveEvent(userId, eventId) {
    try {
      await api.delete(`/api/event-joins/leave?userId=${userId}&eventId=${eventId}`);
    } catch (error) {
      console.error('Error leaving event:', error);
      throw error;
    }
  },

  async getEventParticipants(eventId) {
    try {
      const response = await api.get(`/api/event-joins/event/${eventId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching event participants:', error);
      throw error;
    }
  },

  async countEventParticipants(eventId) {
    try {
      const response = await api.get(`/api/event-joins/event/${eventId}/count`);
      return response.data;
    } catch (error) {
      console.error('Error counting event participants:', error);
      throw error;
    }
  }
};

export default eventJoinService;
