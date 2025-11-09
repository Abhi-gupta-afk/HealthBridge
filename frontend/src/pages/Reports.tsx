import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Upload, Download, Calendar, User } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { reportService } from '../services/reportService';
import type { Report } from '../services/reportService';

const Reports = () => {
  const { user, hasRole } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [reportType, setReportType] = useState('LAB_REPORT');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      setLoading(true);
      const data = hasRole('ADMIN')
        ? await reportService.getAllReports()
        : await reportService.getUserReports(user!.id);
      setReports(data);
    } catch (err) {
      console.error('Failed to load reports:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    try {
      await reportService.uploadReport(user!.id, reportType, file);
      setSuccess('Report uploaded successfully!');
      setFile(null);
      setShowUpload(false);
      setTimeout(() => setSuccess(''), 3000);
      loadReports();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to upload report');
    }
  };

  const handleDownload = (report: Report) => {
    reportService.downloadReport(report.id, report.fileName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Medical Reports</h1>
          <button
            onClick={() => setShowUpload(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Upload className="w-5 h-5" />
            Upload Report
          </button>
        </div>

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6"
          >
            {success}
          </motion.div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{report.reportType}</h3>
                    <p className="text-sm text-gray-500">Report #{report.id}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  {report.uploadDate && (
                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <span className="text-sm">{new Date(report.uploadDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span className="text-sm">{report.fileName}</span>
                  </div>
                  {hasRole('ADMIN') && (
                    <div className="flex items-center gap-3 text-gray-700">
                      <User className="w-5 h-5 text-blue-600" />
                      <span className="text-sm">User ID: {report.userId}</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleDownload(report)}
                  className="btn-secondary w-full flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && reports.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No reports available</p>
          </div>
        )}

        {showUpload && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowUpload(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="card max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Report</h2>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleUpload} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Report Type</label>
                  <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    className="input-field"
                  >
                    <option value="LAB_REPORT">Lab Report</option>
                    <option value="XRAY">X-Ray</option>
                    <option value="MRI">MRI</option>
                    <option value="CT_SCAN">CT Scan</option>
                    <option value="PRESCRIPTION">Prescription</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Select File</label>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="input-field"
                      accept=".pdf,.jpg,.jpeg,.png"
                      required
                    />
                  </div>
                  {file && (
                    <p className="text-sm text-gray-600 mt-2">
                      Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
                    </p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button type="submit" className="btn-primary flex-1">
                    Upload
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowUpload(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Reports;
