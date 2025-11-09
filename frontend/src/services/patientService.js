import apiClient from './api';

/**
 * Patient service
 * Handles patient-related API calls
 */
const patientService = {
  getAllPatients: async () => {
    const response = await apiClient.get('/patients');
    return response.data;
  },

  getPatientById: async (id) => {
    const response = await apiClient.get(`/patients/${id}`);
    return response.data;
  },

  createPatient: async (patientData) => {
    const response = await apiClient.post('/patients', patientData);
    return response.data;
  },

  updatePatient: async (id, patientData) => {
    const response = await apiClient.put(`/patients/${id}`, patientData);
    return response.data;
  },

  deletePatient: async (id) => {
    const response = await apiClient.delete(`/patients/${id}`);
    return response.data;
  },
};

export default patientService;
