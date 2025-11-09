import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, Download, Trash2, AlertCircle, FileCheck, Calendar } from 'lucide-react';
import { useAllReports } from '../hooks/useReports';
import type { Report } from '../services/reportService';
import { reportService } from '../services/reportService';

const AdminReports = () => {
  const { data: reports, isLoading, refetch } = useAllReports();
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (reports) {
      filterReports();
    }
  }, [reports, searchQuery, typeFilter]);

  const filterReports = () => {
    if (!reports) return;

    let filtered = reports;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter((report: Report) =>
        report.fileName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.userId?.toString().includes(searchQuery) ||
        report.reportType?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by type
    if (typeFilter !== 'ALL') {
      filtered = filtered.filter((report: Report) => report.reportType === typeFilter);
    }

    // Sort by date (newest first)
    filtered.sort((a: Report, b: Report) => {
      const dateA = new Date(a.uploadDate || 0).getTime();
      const dateB = new Date(b.uploadDate || 0).getTime();
      return dateB - dateA;
    });

    setFilteredReports(filtered);
    setCurrentPage(1);
  };

  const handleDeleteReport = async (reportId: number) => {
    if (!window.confirm('Are you sure you want to delete this report? This action cannot be undone.')) {
      return;
    }

    try {
      await reportService.deleteReport(reportId);
      alert('Report deleted successfully!');
      refetch();
    } catch (error) {
      alert('Failed to delete report. Please try again.');
      console.error('Delete error:', error);
    }
  };

  const handleDownloadReport = async (reportId: number, fileName: string) => {
    try {
      await reportService.downloadReport(reportId, fileName || `report_${reportId}.pdf`);
    } catch (error) {
      alert('Failed to download report. Please try again.');
      console.error('Download error:', error);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getReportTypeColor = (type: string) => {
    switch (type?.toUpperCase()) {
      case 'BLOOD_TEST':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'X_RAY':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'MRI':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'CT_SCAN':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
      case 'ULTRASOUND':
        return 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200';
      case 'ECG':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'PRESCRIPTION':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  // Get unique report types for filter
  const reportTypes = [...new Set(reports?.map((r: Report) => r.reportType).filter(Boolean))];

  // Pagination
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReports = filteredReports.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <FileText className="w-8 h-8 text-blue-600" />
            Report Management
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            View, download, and manage all medical reports
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Reports</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {reports?.length || 0}
                </p>
              </div>
              <FileText className="w-12 h-12 text-blue-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">This Month</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {reports?.filter((r: Report) => {
                    const uploadDate = new Date(r.uploadDate || '');
                    const now = new Date();
                    return uploadDate.getMonth() === now.getMonth() && 
                           uploadDate.getFullYear() === now.getFullYear();
                  }).length || 0}
                </p>
              </div>
              <Calendar className="w-12 h-12 text-green-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Report Types</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {reportTypes.length}
                </p>
              </div>
              <FileCheck className="w-12 h-12 text-purple-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pending Review</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {reports?.filter((r: Report) => r.status === 'PENDING').length || 0}
                </p>
              </div>
              <AlertCircle className="w-12 h-12 text-yellow-500" />
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by file name, type, or user ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="ALL">All Types</option>
              {reportTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredReports.length)} of {filteredReports.length} reports
          </div>
        </motion.div>

        {/* Reports Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    File Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    User ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Uploaded
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {currentReports.map((report, index) => (
                  <motion.tr
                    key={report.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-gray-900 dark:text-white">
                          {report.fileName || 'Untitled Report'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                      #{report.userId || 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${getReportTypeColor(report.reportType || '')}`}>
                        {report.reportType || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${
                        report.status === 'COMPLETED' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        report.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                      }`}>
                        {report.status || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                      {formatDate(report.uploadDate)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDownloadReport(report.id!, report.fileName || '')}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors"
                          title="Download Report"
                        >
                          <Download className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteReport(report.id!)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
                          title="Delete Report"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 flex items-center justify-center gap-2"
          >
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:text-white"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => goToPage(i + 1)}
                className={`px-4 py-2 border rounded-lg transition-colors ${
                  currentPage === i + 1
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:text-white"
            >
              Next
            </button>
          </motion.div>
        )}

        {filteredReports.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg mt-6"
          >
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No reports found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter criteria.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminReports;
