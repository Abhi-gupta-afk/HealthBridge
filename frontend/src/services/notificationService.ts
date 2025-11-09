import api from './api';

export interface Notification {
  id: number;
  email: string;
  message: string;
  sentAt?: string;
  status?: string;
  read?: boolean;
}

export interface SendNotificationRequest {
  email: string;
  message: string;
}

export const notificationService = {
  // POST /api/notifications/send - Send notification
  sendNotification: async (email: string, message: string) => {
    const response = await api.post('/notifications/send', { email, message });
    return response.data;
  },

  // GET /api/notifications/user/{userId} - Get notifications for user
  getUserNotifications: async (userId: number): Promise<Notification[]> => {
    const response = await api.get(`/notifications/user/${userId}`);
    return response.data;
  },

  // GET /api/notifications/all - Get all notifications (admin only)
  getAllNotifications: async (): Promise<Notification[]> => {
    const response = await api.get('/notifications/all');
    return response.data;
  },

  // PUT /api/notifications/{id}/read - Mark notification as read
  markAsRead: async (id: number) => {
    const response = await api.put(`/notifications/${id}/read`);
    return response.data;
  },

  // GET /api/notifications/unread/{userId} - Get unread count
  getUnreadCount: async (userId: number): Promise<number> => {
    const response = await api.get(`/notifications/unread/${userId}`);
    return response.data;
  },
};
