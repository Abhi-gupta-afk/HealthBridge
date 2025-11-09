import apiClient from './api';

/**
 * Appointment service
 * Handles appointment-related API calls
 */
const appointmentService = {
  getAllAppointments: async () => {
    const response = await apiClient.get('/appointments');
    return response.data;
  },

  getAppointmentById: async (id) => {
    const response = await apiClient.get(`/appointments/${id}`);
    return response.data;
  },

  createAppointment: async (appointmentData) => {
    const response = await apiClient.post('/appointments', appointmentData);
    return response.data;
  },

  updateAppointment: async (id, appointmentData) => {
    const response = await apiClient.put(`/appointments/${id}`, appointmentData);
    return response.data;
  },

  deleteAppointment: async (id) => {
    const response = await apiClient.delete(`/appointments/${id}`);
    return response.data;
  },
};

export default appointmentService;
