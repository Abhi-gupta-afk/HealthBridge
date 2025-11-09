import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Mail, Send, Calendar } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { notificationService } from '../services/notificationService';
import type { Notification } from '../services/notificationService';

const Notifications = () => {
  const { user, hasRole } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSend, setShowSend] = useState(false);
  const [formData, setFormData] = useState({
    recipientEmail: '',
    message: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const data = hasRole('ADMIN')
        ? await notificationService.getAllNotifications()
        : await notificationService.getUserNotifications(user!.id);
      setNotifications(data);
    } catch (err) {
      console.error('Failed to load notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await notificationService.sendNotification(
        formData.recipientEmail,
        formData.message
      );
      setSuccess('Notification sent successfully!');
      setFormData({ recipientEmail: '', message: '' });
      setShowSend(false);
      setTimeout(() => setSuccess(''), 3000);
      loadNotifications();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send notification');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
          {(hasRole('ADMIN') || hasRole('DOCTOR')) && (
            <button
              onClick={() => setShowSend(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              Send Notification
            </button>
          )}
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
          <div className="space-y-4">
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`card ${
                  notification.read ? 'bg-gray-50' : 'bg-white border-l-4 border-blue-600'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      notification.read ? 'bg-gray-200' : 'bg-blue-100'
                    }`}
                  >
                    <Bell
                      className={`w-5 h-5 ${
                        notification.read ? 'text-gray-500' : 'text-blue-600'
                      }`}
                    />
                  </div>

                  <div className="flex-1">
                    <p className="text-gray-800 dark:text-gray-200 mb-2">{notification.message}</p>
                    {notification.sentAt && (
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(notification.sentAt).toLocaleString()}</span>
                      </div>
                    )}
                  </div>

                  {!notification.read && (
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && notifications.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Bell className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No notifications</p>
          </div>
        )}

        {showSend && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowSend(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="card max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Notification</h2>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSendNotification} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Recipient Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={formData.recipientEmail}
                      onChange={(e) =>
                        setFormData({ ...formData, recipientEmail: e.target.value })
                      }
                      className="input-field pl-10"
                      placeholder="user@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="input-field"
                    rows={5}
                    placeholder="Enter notification message..."
                    required
                  ></textarea>
                </div>

                <div className="flex gap-3">
                  <button type="submit" className="btn-primary flex-1">
                    Send
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSend(false)}
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

export default Notifications;
