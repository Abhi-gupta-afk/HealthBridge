import api, { downloadFile } from './api';

export interface Payment {
  id: number;
  userId: number;
  amount: number;
  status: string;
  transactionId?: string;
  paymentDate?: string;
  method?: string;
}

export const paymentService = {
  // POST /api/payments/process - Process payment
  processPayment: async (userId: number, amount: number) => {
    const response = await api.post('/payments/process', null, {
      params: { userId, amount }
    });
    return response.data;
  },

  // POST /api/payments/charge - Charge payment
  chargePayment: async (userId: number, amount: number) => {
    const response = await api.post('/payments/charge', null, {
      params: { userId, amount }
    });
    return response.data;
  },

  // GET /api/payments/all - Get all payments (admin only)
  getAllPayments: async (): Promise<Payment[]> => {
    const response = await api.get('/payments/all');
    return response.data;
  },

  // GET /api/payments/user/{userId} - Get payments for specific user
  getUserPayments: async (userId: number): Promise<Payment[]> => {
    const response = await api.get(`/payments/user/${userId}`);
    return response.data;
  },

  // GET /api/payments/{id} - Get specific payment details
  getPaymentById: async (id: number): Promise<Payment> => {
    const response = await api.get(`/payments/${id}`);
    return response.data;
  },

  // GET /api/payments/receipt/{id} - Download payment receipt
  downloadReceipt: async (id: number) => {
    await downloadFile(`/payments/receipt/${id}`, `receipt-${id}.pdf`);
  },

  // GET /api/payments/stats - Get payment statistics
  getPaymentStats: async () => {
    const response = await api.get('/payments/stats');
    return response.data;
  },

  // GET /api/payments/revenue - Get revenue data for charts
  getRevenueData: async () => {
    const response = await api.get('/payments/revenue');
    return response.data;
  },
};
