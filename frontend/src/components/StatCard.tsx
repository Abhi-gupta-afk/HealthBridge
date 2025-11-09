import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

const colorVariants = {
  blue: 'from-blue-500 to-cyan-500',
  green: 'from-green-500 to-emerald-500',
  purple: 'from-purple-500 to-pink-500',
  orange: 'from-orange-500 to-amber-500',
  red: 'from-red-500 to-rose-500',
};

export const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  trend,
  color = 'blue' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          {trend && (
            <div className="flex items-center mt-2">
              <span className={`text-sm font-semibold ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-gray-500 ml-2">vs last month</span>
            </div>
          )}
        </div>
        <div className={`bg-gradient-to-br ${colorVariants[color]} p-4 rounded-lg`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
    </motion.div>
  );
};
