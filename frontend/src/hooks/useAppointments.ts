import { useQuery, useMutation } from './useQuery';
import { appointmentService } from '../services/appointmentService';
import type { Appointment } from '../services/appointmentService';

/**
 * Hook to fetch appointments for a specific user
 */
export const useUserAppointments = (userId: number, enabled = true) => {
  return useQuery<Appointment[]>(
    ['appointments', 'user', userId.toString()],
    () => appointmentService.getUserAppointments(userId),
    { enabled }
  );
};

/**
 * Hook to fetch all appointments (admin only)
 */
export const useAllAppointments = (enabled = true) => {
  return useQuery<Appointment[]>(
    ['appointments', 'all'],
    () => appointmentService.getAllAppointments(),
    { enabled }
  );
};

/**
 * Hook to fetch appointment statistics
 */
export const useAppointmentStats = (enabled = true) => {
  return useQuery(
    ['appointments', 'stats'],
    () => appointmentService.getAppointmentStats(),
    { enabled }
  );
};

/**
 * Hook to book a new appointment
 */
export const useBookAppointment = () => {
  return useMutation(
    ({ userId, doctorName, appointmentDate }: { userId: number; doctorName: string; appointmentDate: string }) =>
      appointmentService.bookAppointment(userId, doctorName, appointmentDate)
  );
};

/**
 * Hook to cancel an appointment
 */
export const useCancelAppointment = () => {
  return useMutation(
    (appointmentId: number) => appointmentService.cancelAppointment(appointmentId)
  );
};
