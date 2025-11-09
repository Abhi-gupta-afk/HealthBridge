import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, DollarSign, Calendar, CheckCircle, XCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { paymentService } from '../services/paymentService';
import type { Payment } from '../services/paymentService';

const Payments = () => {
  const { user, hasRole } = useAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('CREDIT_CARD');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      setLoading(true);
      const data = hasRole('ADMIN')
        ? await paymentService.getAllPayments()
        : []; // TODO: Add getUserPayments endpoint
      setPayments(data);
    } catch (err) {
      console.error('Failed to load payments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleProcessPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await paymentService.processPayment(user!.id, parseFloat(amount));
      setSuccess('Payment processed successfully!');
      setAmount('');
      setShowPaymentForm(false);
      setTimeout(() => setSuccess(''), 3000);
      loadPayments();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to process payment');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Payments</h1>
          <button
            onClick={() => setShowPaymentForm(true)}
            className="btn-primary flex items-center gap-2"
          >
            <CreditCard className="w-5 h-5" />
            Make Payment
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
            {payments.map((payment) => (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-6 h-6 text-green-600" />
                    <span className="text-2xl font-bold text-gray-800">
                      ${payment.amount.toFixed(2)}
                    </span>
                  </div>
                  {payment.status === 'SUCCESS' ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600" />
                  )}
                </div>

                <div className="space-y-3">
                  {payment.paymentDate && (
                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <span>{new Date(payment.paymentDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  {payment.method && (
                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                      <span>{payment.method}</span>
                    </div>
                  )}
                  {payment.transactionId && (
                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 text-sm">
                      <span className="text-gray-500">Transaction: {payment.transactionId}</span>
                    </div>
                  )}
                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        payment.status === 'SUCCESS'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {payment.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && payments.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <CreditCard className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No payment history</p>
          </div>
        )}

        {showPaymentForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowPaymentForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="card max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Make Payment</h2>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleProcessPayment} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Amount</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="input-field pl-8"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Payment Method</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="input-field"
                  >
                    <option value="CREDIT_CARD">Credit Card</option>
                    <option value="DEBIT_CARD">Debit Card</option>
                    <option value="UPI">UPI</option>
                    <option value="NET_BANKING">Net Banking</option>
                  </select>
                </div>

                <div className="flex gap-3">
                  <button type="submit" className="btn-primary flex-1">
                    Pay Now
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPaymentForm(false)}
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

export default Payments;
