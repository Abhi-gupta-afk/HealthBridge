import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Lazy load pages for code splitting
const Login = lazy(() => import('./pages/Login.tsx'));
const Register = lazy(() => import('./pages/Register.tsx'));
const Dashboard = lazy(() => import('./pages/Dashboard.tsx'));
const Appointments = lazy(() => import('./pages/Appointments.tsx'));
const Payments = lazy(() => import('./pages/Payments.tsx'));
const Reports = lazy(() => import('./pages/Reports.tsx'));
const Notifications = lazy(() => import('./pages/Notifications.tsx'));
const Admin = lazy(() => import('./pages/Admin.tsx'));
const AdminUserManagement = lazy(() => import('./pages/AdminUserManagement.tsx'));
const AdminAppointments = lazy(() => import('./pages/AdminAppointments.tsx'));
const AdminPayments = lazy(() => import('./pages/AdminPayments.tsx'));
const AdminReports = lazy(() => import('./pages/AdminReports.tsx'));
const NotificationHistory = lazy(() => import('./pages/NotificationHistory.tsx'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/appointments"
                element={
                  <ProtectedRoute>
                    <Appointments />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payments"
                element={
                  <ProtectedRoute>
                    <Payments />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports"
                element={
                  <ProtectedRoute>
                    <Reports />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notifications"
                element={
                  <ProtectedRoute>
                    <Notifications />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requiredRole="ADMIN">
                    <Admin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute requiredRole="ADMIN">
                    <AdminUserManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/appointments"
                element={
                  <ProtectedRoute requiredRole="ADMIN">
                    <AdminAppointments />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/payments"
                element={
                  <ProtectedRoute requiredRole="ADMIN">
                    <AdminPayments />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/reports"
                element={
                  <ProtectedRoute requiredRole="ADMIN">
                    <AdminReports />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notifications/history"
                element={
                  <ProtectedRoute>
                    <NotificationHistory />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
