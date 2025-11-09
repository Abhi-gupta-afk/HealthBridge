import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';

interface AppointmentChartProps {
  data: Array<{ date: string; count: number }>;
}

export const AppointmentChart: React.FC<AppointmentChartProps> = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Appointments by Day
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="date" 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1f2937', 
              border: 'none', 
              borderRadius: '8px',
              color: '#fff'
            }}
          />
          <Legend />
          <Bar 
            dataKey="count" 
            fill="#3b82f6" 
            name="Appointments"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
