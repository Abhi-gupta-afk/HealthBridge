import api, { downloadFile } from './api';

export interface Report {
  id: number;
  userId: number;
  reportType: string;
  fileName: string;
  filePath?: string;
  uploadDate?: string;
  status?: string;
}

export const reportService = {
  // POST /api/reports/upload - Upload report file
  uploadReport: async (userId: number, reportType: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/reports/upload', formData, {
      params: { userId, reportType },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // GET /api/reports/user/{userId} - Get reports for specific user
  getUserReports: async (userId: number): Promise<Report[]> => {
    const response = await api.get(`/reports/user/${userId}`);
    return response.data;
  },

  // GET /api/reports/all - Get all reports (admin only)
  getAllReports: async (): Promise<Report[]> => {
    const response = await api.get('/reports/all');
    return response.data;
  },

  // GET /api/reports/{id} - Get specific report details
  getReportById: async (id: number): Promise<Report> => {
    const response = await api.get(`/reports/${id}`);
    return response.data;
  },

  // DELETE /api/reports/{id} - Delete report
  deleteReport: async (id: number) => {
    const response = await api.delete(`/reports/${id}`);
    return response.data;
  },

  // GET /api/reports/download/{id} - Download report file
  downloadReport: async (id: number, fileName: string) => {
    await downloadFile(`/reports/download/${id}`, fileName);
  },

  // GET /api/reports/stats - Get report statistics
  getReportStats: async () => {
    const response = await api.get('/reports/stats');
    return response.data;
  },
};
