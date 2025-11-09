import { useQuery, useMutation } from './useQuery';
import { notificationService } from '../services/notificationService';
import type { Notification } from '../services/notificationService';

/**
 * Hook to fetch notifications for a specific user
 */
export const useUserNotifications = (userId: number, enabled = true) => {
  return useQuery<Notification[]>(
    ['notifications', 'user', userId.toString()],
    () => notificationService.getUserNotifications(userId),
    { enabled, refetchInterval: 30000 } // Refetch every 30 seconds
  );
};

/**
 * Hook to fetch all notifications (admin only)
 */
export const useAllNotifications = (enabled = true) => {
  return useQuery<Notification[]>(
    ['notifications', 'all'],
    () => notificationService.getAllNotifications(),
    { enabled }
  );
};

/**
 * Hook to fetch unread notification count
 */
export const useUnreadCount = (userId: number, enabled = true) => {
  return useQuery<number>(
    ['notifications', 'unread', userId.toString()],
    () => notificationService.getUnreadCount(userId),
    { enabled, refetchInterval: 15000 } // Refetch every 15 seconds
  );
};

/**
 * Hook to send a notification
 */
export const useSendNotification = () => {
  return useMutation(
    ({ email, message }: { email: string; message: string }) =>
      notificationService.sendNotification(email, message)
  );
};

/**
 * Hook to mark notification as read
 */
export const useMarkNotificationAsRead = () => {
  return useMutation(
    (notificationId: number) => notificationService.markAsRead(notificationId)
  );
};
