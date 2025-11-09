import api from './api';
import type { User } from './authService';
import type { Appointment } from './appointmentService';
import type { Payment } from './paymentService';
import type { Report } from './reportService';

export interface DashboardStats {
  totalUsers: number;
  totalAppointments: number;
  totalPayments: number;
  totalRevenue: number;
  activeUsers: number;
  pendingAppointments: number;
}

export interface AnalyticsData {
  appointmentsByDay: Array<{ date: string; count: number }>;
  revenuePerMonth: Array<{ month: string; revenue: number }>;
  userGrowth: Array<{ date: string; count: number }>;
  notificationTrends: Array<{ date: string; sent: number }>;
}

export const adminService = {
  // GET /api/users/all - Get all users (admin only)
  getAllUsers: async (): Promise<User[]> => {
    const response = await api.get('/users/all');
    return response.data;
  },

  // GET /api/appointments/all - Get all appointments (admin only)
  getAllAppointments: async (): Promise<Appointment[]> => {
    const response = await api.get('/appointments/all');
    return response.data;
  },

  // GET /api/payments/all - Get all payments (admin only)
  getAllPayments: async (): Promise<Payment[]> => {
    const response = await api.get('/payments/all');
    return response.data;
  },

  // GET /api/reports/all - Get all reports (admin only)
  getAllReports: async (): Promise<Report[]> => {
    const response = await api.get('/reports/all');
    return response.data;
  },

  // GET /api/users/stats - Get dashboard statistics
  getDashboardStats: async (): Promise<DashboardStats> => {
    const response = await api.get('/users/stats');
    return response.data;
  },

  // GET /api/users/analytics - Get analytics data for charts
  getAnalytics: async (): Promise<AnalyticsData> => {
    const response = await api.get('/users/analytics');
    return response.data;
  },

  // DELETE /api/users/{id} - Delete user (admin only)
  deleteUser: async (userId: number) => {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  },

  // PUT /api/users/{id}/role - Update user role (admin only)
  updateUserRole: async (userId: number, role: string) => {
    const response = await api.put(`/users/${userId}/role`, { role });
    return response.data;
  },

  // GET /api/users/search - Search users
  searchUsers: async (query: string): Promise<User[]> => {
    const response = await api.get('/users/search', { params: { query } });
    return response.data;
  },
};
