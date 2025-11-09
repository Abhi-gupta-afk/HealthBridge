import { useQuery, useMutation } from './useQuery';
import { reportService } from '../services/reportService';
import type { Report } from '../services/reportService';

/**
 * Hook to fetch reports for a specific user
 */
export const useUserReports = (userId: number, enabled = true) => {
  return useQuery<Report[]>(
    ['reports', 'user', userId.toString()],
    () => reportService.getUserReports(userId),
    { enabled }
  );
};

/**
 * Hook to fetch all reports (admin only)
 */
export const useAllReports = (enabled = true) => {
  return useQuery<Report[]>(
    ['reports', 'all'],
    () => reportService.getAllReports(),
    { enabled }
  );
};

/**
 * Hook to fetch report statistics
 */
export const useReportStats = (enabled = true) => {
  return useQuery(
    ['reports', 'stats'],
    () => reportService.getReportStats(),
    { enabled }
  );
};

/**
 * Hook to upload a report
 */
export const useUploadReport = () => {
  return useMutation(
    ({ userId, reportType, file }: { userId: number; reportType: string; file: File }) =>
      reportService.uploadReport(userId, reportType, file)
  );
};

/**
 * Hook to delete a report
 */
export const useDeleteReport = () => {
  return useMutation(
    (reportId: number) => reportService.deleteReport(reportId)
  );
};
