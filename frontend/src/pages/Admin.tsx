import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { StatCard } from '../components/StatCard';
import {
  Users,
  Calendar,
  CreditCard,
  FileText,
  Trash2,
  Search
} from 'lucide-react';
import { adminService } from '../services/adminService';
import { useAllAppointments } from '../hooks/useAppointments';
import { useAllPayments } from '../hooks/usePayments';
import type { User } from '../services/authService';

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const { data: appointments } = useAllAppointments();
  const { data: payments } = useAllPayments();

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    // Filter users based on search query
    if (searchQuery.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllUsers();
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      console.error('Failed to load users', error);
      // Mock data for demonstration
      const mockUsers: User[] = [
        { id: 1, name: 'John Doe', email: 'john@example.com', roles: [{ name: 'PATIENT' }] },
        { id: 2, name: 'Dr. Sarah Smith', email: 'sarah@example.com', roles: [{ name: 'DOCTOR' }] },
        { id: 3, name: 'Admin User', email: 'admin@example.com', roles: [{ name: 'ADMIN' }] },
      ];
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await adminService.deleteUser(userId);
        setUsers(users.filter(u => u.id !== userId));
        alert('User deleted successfully');
      } catch (error) {
        console.error('Failed to delete user', error);
        alert('Failed to delete user');
      }
    }
  };

  const totalRevenue = payments?.reduce((sum, payment) => sum + payment.amount, 0) || 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Admin Dashboard 🛡️
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
            Manage users, monitor system activity, and view analytics
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={users.length}
            icon={Users}
            color="blue"
            trend={{ value: 12.5, isPositive: true }}
          />
          <StatCard
            title="Appointments"
            value={appointments?.length || 0}
            icon={Calendar}
            color="green"
            trend={{ value: 8.2, isPositive: true }}
          />
          <StatCard
            title="Total Payments"
            value={payments?.length || 0}
            icon={CreditCard}
            color="purple"
          />
          <StatCard
            title="Total Revenue"
            value={`$${totalRevenue.toLocaleString()}`}
            icon={FileText}
            color="orange"
            trend={{ value: 15.3, isPositive: true }}
          />
        </div>

        {/* User Management Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
              User Management
            </h2>
            
            {/* Search Bar */}
            <div className="relative flex-1 md:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Users Table */}
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredUsers.map((user) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                      transition={{ duration: 0.2 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                        {user.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600 dark:text-gray-400">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.roles?.[0]?.name === 'ADMIN'
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                            : user.roles?.[0]?.name === 'DOCTOR'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        }`}>
                          {user.roles?.[0]?.name || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
              
              {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">No users found</p>
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* Recent Activity Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Recent Appointments
          </h2>
          
          <div className="space-y-4">
            {appointments?.slice(0, 5).map((appointment) => (
              <motion.div
                key={appointment.id}
                whileHover={{ scale: 1.01 }}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      Patient ID: {appointment.userId}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Doctor: {appointment.doctorName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {new Date(appointment.appointmentDate).toLocaleDateString()}
                    </p>
                    <span className="inline-block mt-1 px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded">
                      {appointment.status || 'Scheduled'}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {(!appointments || appointments.length === 0) && (
              <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                No recent appointments
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
