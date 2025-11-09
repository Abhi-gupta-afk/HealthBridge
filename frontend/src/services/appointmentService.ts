import api from './api';

export interface Appointment {
  id: number;
  userId: number;
  doctorName: string;
  appointmentDate: string;
  status?: string;
  createdAt?: string;
}

export interface BookAppointmentRequest {
  userId: number;
  doctorName: string;
  appointmentDate: string;
}

export const appointmentService = {
  // POST /api/appointments/book - Book new appointment
  bookAppointment: async (userId: number, doctorName: string, appointmentDate: string) => {
    const response = await api.post('/appointments/book', null, {
      params: { userId, doctorName, appointmentDate }
    });
    return response.data;
  },

  // GET /api/appointments/user/{userId} - Get appointments for specific user
  getUserAppointments: async (userId: number): Promise<Appointment[]> => {
    const response = await api.get(`/appointments/user/${userId}`);
    return response.data;
  },

  // GET /api/appointments/all - Get all appointments (admin only)
  getAllAppointments: async (): Promise<Appointment[]> => {
    const response = await api.get('/appointments/all');
    return response.data;
  },

  // DELETE /api/appointments/cancel/{id} - Cancel appointment
  cancelAppointment: async (id: number) => {
    const response = await api.delete(`/appointments/cancel/${id}`);
    return response.data;
  },

  // GET /api/appointments/{id} - Get specific appointment details
  getAppointmentById: async (id: number): Promise<Appointment> => {
    const response = await api.get(`/appointments/${id}`);
    return response.data;
  },

  // GET /api/appointments/stats - Get appointment statistics
  getAppointmentStats: async () => {
    const response = await api.get('/appointments/stats');
    return response.data;
  },
};
