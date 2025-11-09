import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Search, Mail, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useAllNotifications } from '../hooks/useNotifications';
import type { Notification } from '../services/notificationService';

const NotificationHistory = () => {
  const { data: notifications, isLoading } = useAllNotifications();
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (notifications) {
      filterNotifications();
    }
  }, [notifications, searchQuery, statusFilter]);

  const filterNotifications = () => {
    if (!notifications) return;

    let filtered = notifications;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter((notif: Notification) =>
        notif.message?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notif.email?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter((notif: Notification) => notif.status === statusFilter);
    }

    // Sort by date (newest first)
    filtered.sort((a: Notification, b: Notification) => {
      const dateA = new Date(a.sentAt || 0).getTime();
      const dateB = new Date(b.sentAt || 0).getTime();
      return dateB - dateA;
    });

    setFilteredNotifications(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'SENT':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'FAILED':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'SENT':
        return <CheckCircle className="w-4 h-4" />;
      case 'PENDING':
        return <Clock className="w-4 h-4" />;
      case 'FAILED':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  // Pagination
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotifications = filteredNotifications.slice(startIndex, endIndex);

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
            <Bell className="w-8 h-8 text-blue-600" />
            Notification History
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            View all past notifications and their delivery status
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
                <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {notifications?.length || 0}
                </p>
              </div>
              <Bell className="w-12 h-12 text-blue-500" />
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
                <p className="text-sm text-gray-600 dark:text-gray-400">Sent</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {notifications?.filter((n: Notification) => n.status === 'SENT').length || 0}
                </p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-500" />
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
                <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {notifications?.filter((n: Notification) => n.status === 'PENDING').length || 0}
                </p>
              </div>
              <Clock className="w-12 h-12 text-yellow-500" />
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
                <p className="text-sm text-gray-600 dark:text-gray-400">Failed</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {notifications?.filter((n: Notification) => n.status === 'FAILED').length || 0}
                </p>
              </div>
              <AlertCircle className="w-12 h-12 text-red-500" />
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
                placeholder="Search by message or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="ALL">All Status</option>
              <option value="SENT">Sent</option>
              <option value="PENDING">Pending</option>
              <option value="FAILED">Failed</option>
            </select>
          </div>

          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredNotifications.length)} of {filteredNotifications.length} notifications
          </div>
        </motion.div>

        {/* Notifications List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {currentNotifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 inline-flex items-center gap-1 text-xs font-semibold rounded-full ${getStatusColor(notification.status || '')}`}>
                        {getStatusIcon(notification.status || '')}
                        {notification.status || 'N/A'}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(notification.sentAt)}
                      </span>
                    </div>

                    <div className="mb-2">
                      <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span className="font-medium">{notification.email}</span>
                      </div>
                    </div>

                    <p className="text-gray-900 dark:text-white">
                      {notification.message}
                    </p>
                  </div>
                </div>

                {notification.read && (
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Read
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
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

        {filteredNotifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
          >
            <Bell className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No notifications found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter criteria.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default NotificationHistory;
