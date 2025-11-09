import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';

interface RevenueChartProps {
  data: Array<{ month: string; revenue: number }>;
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Revenue per Month
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="month" 
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
            formatter={(value) => `$${value}`}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="#10b981" 
            strokeWidth={3}
            name="Revenue ($)"
            dot={{ fill: '#10b981', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
