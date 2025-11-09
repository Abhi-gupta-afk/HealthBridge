import { useQuery, useMutation } from './useQuery';
import { paymentService } from '../services/paymentService';
import type { Payment } from '../services/paymentService';

/**
 * Hook to fetch payments for a specific user
 */
export const useUserPayments = (userId: number, enabled = true) => {
  return useQuery<Payment[]>(
    ['payments', 'user', userId.toString()],
    () => paymentService.getUserPayments(userId),
    { enabled }
  );
};

/**
 * Hook to fetch all payments (admin only)
 */
export const useAllPayments = (enabled = true) => {
  return useQuery<Payment[]>(
    ['payments', 'all'],
    () => paymentService.getAllPayments(),
    { enabled }
  );
};

/**
 * Hook to fetch payment statistics
 */
export const usePaymentStats = (enabled = true) => {
  return useQuery(
    ['payments', 'stats'],
    () => paymentService.getPaymentStats(),
    { enabled }
  );
};

/**
 * Hook to fetch revenue data for charts
 */
export const useRevenueData = (enabled = true) => {
  return useQuery(
    ['payments', 'revenue'],
    () => paymentService.getRevenueData(),
    { enabled }
  );
};

/**
 * Hook to process a payment
 */
export const useProcessPayment = () => {
  return useMutation(
    ({ userId, amount }: { userId: number; amount: number }) =>
      paymentService.processPayment(userId, amount)
  );
};

/**
 * Hook to charge a payment
 */
export const useChargePayment = () => {
  return useMutation(
    ({ userId, amount }: { userId: number; amount: number }) =>
      paymentService.chargePayment(userId, amount)
  );
};
