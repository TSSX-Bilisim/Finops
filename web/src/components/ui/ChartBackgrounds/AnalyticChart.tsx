import React, { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
  trend?: number;
}

interface AnalyticChartProps {
  title: string;
  subtitle?: string;
  data: ChartDataPoint[];
  type: 'line' | 'bar' | 'doughnut' | 'area';
  height?: number;
  showLegend?: boolean;
  showGrid?: boolean;
  icon?: LucideIcon;
  loading?: boolean;
  className?: string;
  onDataPointClick?: (dataPoint: ChartDataPoint, index: number) => void;
  delay?: number;
}

const AnalyticChart: React.FC<AnalyticChartProps> = ({
  title,
  subtitle,
  data,
  type,
  height = 300,
  showLegend = true,
  showGrid = true,
  icon: Icon,
  loading = false,
  className = '',
  onDataPointClick,
  delay = 0
}) => {
  const chartColors = useMemo(() => [
    'var(--color-info-500)',
    'var(--color-accent-500)', 
    '#f39c12',
    'var(--color-success-500)',
    'var(--color-danger-500)',
    'var(--color-primary-500)',
    '#16a085',
    '#9b59b6'
  ], []);

  const getColorForDataPoint = useCallback((index: number, customColor?: string): string => {
    if (customColor) return customColor;
    return chartColors[index % chartColors.length];
  }, [chartColors]);

  const formatValue = (value: number): string => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value.toLocaleString()}`;
  };

  // Prepare data for Recharts
  const chartData = useMemo(() => {
    return data.map((item, index) => ({
      name: item.label,
      value: item.value,
      color: getColorForDataPoint(index, item.color),
      originalData: item
    }));
  }, [data, getColorForDataPoint]);

  const CustomTooltip = ({ active, payload, label }: { active?: boolean, payload?: Array<{ value: number, color: string }>, label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div 
          className="px-3 py-2 rounded-lg border shadow-lg"
          style={{
            backgroundColor: 'var(--color-card)',
            borderColor: 'var(--color-border)',
            color: 'var(--color-text-primary)'
          }}
        >
          <p className="font-medium">{`${label}`}</p>
          <p className="text-sm" style={{ color: payload[0].color }}>
            {`Value: ${formatValue(payload[0].value)}`}
          </p>
        </div>
      );
    }
    return null;
  };

  const handleClick = (data: { originalData?: ChartDataPoint }, index: number) => {
    if (onDataPointClick && data.originalData) {
      onDataPointClick(data.originalData, index);
    }
  };

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              {showGrid && (
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="var(--color-border)" 
                  opacity={0.3}
                />
              )}
              <XAxis 
                dataKey="name" 
                tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
                axisLine={{ stroke: 'var(--color-border)' }}
              />
              <YAxis 
                tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
                axisLine={{ stroke: 'var(--color-border)' }}
                tickFormatter={formatValue}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={chartColors[0]}
                strokeWidth={3}
                dot={{ fill: chartColors[0], strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: chartColors[0], strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              {showGrid && (
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="var(--color-border)" 
                  opacity={0.3}
                />
              )}
              <XAxis 
                dataKey="name" 
                tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
                axisLine={{ stroke: 'var(--color-border)' }}
              />
              <YAxis 
                tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
                axisLine={{ stroke: 'var(--color-border)' }}
                tickFormatter={formatValue}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="value" 
                radius={[4, 4, 0, 0]}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );

      case 'area':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              {showGrid && (
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="var(--color-border)" 
                  opacity={0.3}
                />
              )}
              <XAxis 
                dataKey="name" 
                tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
                axisLine={{ stroke: 'var(--color-border)' }}
              />
              <YAxis 
                tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
                axisLine={{ stroke: 'var(--color-border)' }}
                tickFormatter={formatValue}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={chartColors[0]}
                strokeWidth={2}
                fill={chartColors[0]}
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'doughnut':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                onClick={handleClick}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return renderChart();
    }
  };

  if (loading) {
    return (
      <motion.div 
        className={`rounded-xl border p-6 ${className}`}
        style={{
          backgroundColor: 'var(--color-card)',
          borderColor: 'var(--color-border)',
          boxShadow: 'var(--shadow-sm)'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
      >
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-6">
            <div 
              className="h-5 rounded w-1/3"
              style={{ backgroundColor: 'var(--color-primary-300)' }}
            />
            <div 
              className="h-8 w-8 rounded-lg"
              style={{ backgroundColor: 'var(--color-primary-300)' }}
            />
          </div>
          <div 
            className="rounded"
            style={{ 
              height: height,
              backgroundColor: 'var(--color-primary-300)' 
            }}
          />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className={`rounded-xl border p-6 transition-all duration-300 hover:shadow-lg ${className}`}
      style={{
        backgroundColor: 'var(--color-card)',
        borderColor: 'var(--color-border)',
        boxShadow: 'var(--shadow-sm)'
      }}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{
        y: -2,
        boxShadow: 'var(--shadow-lg)',
        transition: { duration: 0.2 }
      }}
      transition={{ duration: 0.5, delay }}
    >
      {/* Header */}
      <motion.div 
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: delay + 0.1 }}
      >
        <div>
          <h3 
            className="text-lg font-semibold mb-1"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {title}
          </h3>
          {subtitle && (
            <p 
              className="text-sm"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {subtitle}
            </p>
          )}
        </div>
        {Icon && (
          <motion.div 
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ 
              backgroundColor: 'var(--color-primary-100)',
              color: 'var(--color-accent-500)'
            }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <Icon size={20} />
          </motion.div>
        )}
      </motion.div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
      >
        {renderChart()}
      </motion.div>

      {/* Legend for Doughnut Chart */}
      {showLegend && type === 'doughnut' && (
        <motion.div 
          className="mt-6 grid grid-cols-2 gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: delay + 0.4 }}
        >
          {chartData.map((point, i) => (
            <motion.div 
              key={i} 
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: delay + 0.5 + (i * 0.1) }}
              whileHover={{ scale: 1.02 }}
            >
              <div 
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: point.color }}
              />
              <span 
                className="text-sm truncate"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {point.name}
              </span>
              <span 
                className="text-sm font-medium ml-auto"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {formatValue(point.value)}
              </span>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default AnalyticChart;
