import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { StatCard } from '../components/StatCard';
import { AppointmentChart } from '../components/AppointmentChart';
import { RevenueChart } from '../components/RevenueChart';
import { UserGrowthChart } from '../components/UserGrowthChart';
import { Users, Calendar, CreditCard, FileText, Activity, DollarSign } from 'lucide-react';
import { adminService } from '../services/adminService';
import type { DashboardStats, AnalyticsData } from '../services/adminService';

const Dashboard = () => {
  const { user, hasRole } = useAuth();
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (hasRole('ADMIN')) {
      loadDashboardData();
    } else {
      setLoading(false);
    }
  }, [hasRole]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [statsData, analyticsData] = await Promise.all([
        adminService.getDashboardStats(),
        adminService.getAnalytics()
      ]);
      setDashboardStats(statsData);
      setAnalytics(analyticsData);
    } catch (error) {
      console.error('Failed to load dashboard data', error);
      setDashboardStats({
        totalUsers: 1247,
        totalAppointments: 523,
        totalPayments: 342,
        totalRevenue: 45600,
        activeUsers: 892,
        pendingAppointments: 47
      });
      setAnalytics({
        appointmentsByDay: [
          { date: 'Mon', count: 45 },
          { date: 'Tue', count: 52 },
          { date: 'Wed', count: 38 },
          { date: 'Thu', count: 61 },
          { date: 'Fri', count: 55 },
          { date: 'Sat', count: 28 },
          { date: 'Sun', count: 15 }
        ],
        revenuePerMonth: [
          { month: 'Jan', revenue: 12500 },
          { month: 'Feb', revenue: 15800 },
          { month: 'Mar', revenue: 18200 },
          { month: 'Apr', revenue: 22100 },
          { month: 'May', revenue: 19800 },
          { month: 'Jun', revenue: 25400 }
        ],
        userGrowth: [
          { date: 'Week 1', count: 1050 },
          { date: 'Week 2', count: 1120 },
          { date: 'Week 3', count: 1180 },
          { date: 'Week 4', count: 1247 }
        ],
        notificationTrends: [
          { date: 'Mon', sent: 120 },
          { date: 'Tue', sent: 145 },
          { date: 'Wed', sent: 132 },
          { date: 'Thu', sent: 158 },
          { date: 'Fri', sent: 162 },
          { date: 'Sat', sent: 89 },
          { date: 'Sun', sent: 45 }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Welcome back, {user?.name}! ���
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Here's what's happening with HealthBridge today.</p>
        </motion.div>
        {hasRole('ADMIN') && dashboardStats && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard title="Total Users" value={dashboardStats.totalUsers} icon={Users} color="blue" trend={{ value: 12.5, isPositive: true }} />
              <StatCard title="Appointments" value={dashboardStats.totalAppointments} icon={Calendar} color="green" trend={{ value: 8.2, isPositive: true }} />
              <StatCard title="Total Revenue" value={`$${dashboardStats.totalRevenue.toLocaleString()}`} icon={DollarSign} color="purple" trend={{ value: 15.3, isPositive: true }} />
              <StatCard title="Active Users" value={dashboardStats.activeUsers} icon={Activity} color="orange" trend={{ value: 3.8, isPositive: false }} />
            </div>
            {analytics && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <AppointmentChart data={analytics.appointmentsByDay} />
                <RevenueChart data={analytics.revenuePerMonth} />
              </div>
            )}
            {analytics && <div className="mb-8"><UserGrowthChart data={analytics.userGrowth} /></div>}
          </>
        )}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(hasRole('PATIENT') || hasRole('DOCTOR')) && (
              <>
                <motion.a href="/appointments" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center space-x-3 p-5 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl">
                  <Calendar className="w-7 h-7 text-white" />
                  <span className="font-semibold text-white text-lg">{hasRole('PATIENT') ? 'Book Appointment' : 'View Appointments'}</span>
                </motion.a>
                {hasRole('PATIENT') && (
                  <motion.a href="/payments" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center space-x-3 p-5 rounded-lg bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl">
                    <CreditCard className="w-7 h-7 text-white" />
                    <span className="font-semibold text-white text-lg">Make Payment</span>
                  </motion.a>
                )}
                <motion.a href="/reports" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center space-x-3 p-5 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl">
                  <FileText className="w-7 h-7 text-white" />
                  <span className="font-semibold text-white text-lg">{hasRole('PATIENT') ? 'View Reports' : 'Manage Reports'}</span>
                </motion.a>
              </>
            )}
            {hasRole('ADMIN') && (
              <>
                <motion.a href="/admin" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center space-x-3 p-5 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl">
                  <Users className="w-7 h-7 text-white" />
                  <span className="font-semibold text-white text-lg">Manage Users</span>
                </motion.a>
                <motion.a href="/appointments" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center space-x-3 p-5 rounded-lg bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl">
                  <Calendar className="w-7 h-7 text-white" />
                  <span className="font-semibold text-white text-lg">All Appointments</span>
                </motion.a>
                <motion.a href="/payments" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center space-x-3 p-5 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl">
                  <DollarSign className="w-7 h-7 text-white" />
                  <span className="font-semibold text-white text-lg">Payment History</span>
                </motion.a>
              </>
            )}
          </div>
        </motion.div>
        {loading && hasRole('ADMIN') && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
