import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';

interface UserGrowthChartProps {
  data: Array<{ date: string; count: number }>;
}

export const UserGrowthChart: React.FC<UserGrowthChartProps> = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Active Users Growth
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
            </linearGradient>
          </defs>
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
          <Area 
            type="monotone" 
            dataKey="count" 
            stroke="#8b5cf6" 
            fillOpacity={1}
            fill="url(#colorUsers)"
            name="Active Users"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
