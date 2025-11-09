import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, FileText, X, Plus } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { appointmentService } from '../services/appointmentService';
import type { Appointment } from '../services/appointmentService';

const Appointments = () => {
  const { user, hasRole } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);
  const [formData, setFormData] = useState({
    doctorName: '',
    appointmentDate: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const data = hasRole('ADMIN')
        ? await appointmentService.getAllAppointments()
        : await appointmentService.getUserAppointments(user!.id);
      setAppointments(data);
    } catch (err) {
      console.error('Failed to load appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await appointmentService.bookAppointment(
        user!.id,
        formData.doctorName,
        formData.appointmentDate
      );
      setShowBooking(false);
      setFormData({ doctorName: '', appointmentDate: '' });
      loadAppointments();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to book appointment');
    }
  };

  const handleCancelAppointment = async (id: number) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;

    try {
      await appointmentService.cancelAppointment(id);
      loadAppointments();
    } catch (err) {
      console.error('Failed to cancel appointment:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Appointments</h1>
          {hasRole('PATIENT') && (
            <button
              onClick={() => setShowBooking(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Book Appointment
            </button>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments.map((appointment) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
              >
                <div className="flex justify-between items-start mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      appointment.status === 'CONFIRMED'
                        ? 'bg-green-100 text-green-800'
                        : appointment.status === 'CANCELLED'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {appointment.status}
                  </span>
                  {appointment.status !== 'CANCELLED' && hasRole('PATIENT') && (
                    <button
                      onClick={() => handleCancelAppointment(appointment.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  {appointment.doctorName && (
                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <User className="w-5 h-5 text-blue-600" />
                      <span>Dr. {appointment.doctorName}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span>{new Date(appointment.appointmentDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span>Patient ID: {appointment.userId}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && appointments.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No appointments found</p>
          </div>
        )}

        {showBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowBooking(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="card max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Book Appointment</h2>
                <button
                  onClick={() => setShowBooking(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleBookAppointment} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Doctor Name</label>
                  <input
                    type="text"
                    value={formData.doctorName}
                    onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                    className="input-field"
                    placeholder="Enter doctor name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={formData.appointmentDate}
                    onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                    className="input-field"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  Book Appointment
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
