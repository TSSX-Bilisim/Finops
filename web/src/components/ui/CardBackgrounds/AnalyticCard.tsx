import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface AnalyticCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
  type?: 'default' | 'profit' | 'loss' | 'neutral' | 'info' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  className?: string;
  children?: React.ReactNode;
  delay?: number;
}

const AnalyticCard: React.FC<AnalyticCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  type = 'default',
  size = 'md',
  loading = false,
  className = '',
  children,
  delay = 0
}) => {
  const formatValue = (val: string | number): string => {
    if (typeof val === 'number') {
      if (val >= 1000000) {
        return `$${(val / 1000000).toFixed(1)}M`;
      } else if (val >= 1000) {
        return `$${(val / 1000).toFixed(1)}K`;
      } else {
        return `$${val.toLocaleString()}`;
      }
    }
    return val.toString();
  };

  const getTypeColors = () => {
    switch (type) {
      case 'profit':
        return {
          accent: 'var(--color-success-500)',
          background: 'var(--color-card)',
          border: 'var(--color-border)',
          iconBg: 'var(--color-success-100)'
        };
      case 'loss':
        return {
          accent: 'var(--color-danger-500)',
          background: 'var(--color-card)',
          border: 'var(--color-border)',
          iconBg: 'var(--color-danger-100)'
        };
      case 'info':
        return {
          accent: 'var(--color-info-500)',
          background: 'var(--color-card)',
          border: 'var(--color-border)',
          iconBg: 'var(--color-info-100)'
        };
      case 'warning':
        return {
          accent: '#f39c12',
          background: 'var(--color-card)',
          border: 'var(--color-border)',
          iconBg: '#fef3c7'
        };
      case 'neutral':
        return {
          accent: 'var(--color-primary-500)',
          background: 'var(--color-card)',
          border: 'var(--color-border)',
          iconBg: 'var(--color-primary-100)'
        };
      default:
        return {
          accent: 'var(--color-accent-500)',
          background: 'var(--color-card)',
          border: 'var(--color-border)',
          iconBg: 'var(--color-primary-100)'
        };
    }
  };

  const getSizeConfig = () => {
    switch (size) {
      case 'sm':
        return {
          padding: 'p-4',
          titleSize: 'text-sm',
          valueSize: 'text-xl',
          iconSize: 16,
          iconContainer: 'w-8 h-8'
        };
      case 'lg':
        return {
          padding: 'p-8',
          titleSize: 'text-lg',
          valueSize: 'text-3xl',
          iconSize: 24,
          iconContainer: 'w-12 h-12'
        };
      default:
        return {
          padding: 'p-6',
          titleSize: 'text-base',
          valueSize: 'text-2xl',
          iconSize: 20,
          iconContainer: 'w-10 h-10'
        };
    }
  };

  const colors = getTypeColors();
  const sizeConfig = getSizeConfig();

  if (loading) {
    return (
      <motion.div 
        className={`rounded-xl border ${sizeConfig.padding} ${className}`}
        style={{
          backgroundColor: colors.background,
          borderColor: colors.border,
          boxShadow: 'var(--shadow-sm)'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
      >
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div 
              className="h-4 rounded w-1/3"
              style={{ backgroundColor: 'var(--color-primary-300)' }}
            />
            <div 
              className={`${sizeConfig.iconContainer} rounded-lg`}
              style={{ backgroundColor: 'var(--color-primary-300)' }}
            />
          </div>
          <div 
            className="h-8 rounded w-1/2 mb-2"
            style={{ backgroundColor: 'var(--color-primary-300)' }}
          />
          <div 
            className="h-3 rounded w-2/3"
            style={{ backgroundColor: 'var(--color-primary-300)' }}
          />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className={`rounded-xl border cursor-pointer ${sizeConfig.padding} ${className}`}
      style={{
        backgroundColor: colors.background,
        borderColor: colors.border,
        boxShadow: 'var(--shadow-sm)'
      }}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{
        y: -4,
        boxShadow: 'var(--shadow-lg)',
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.5, delay }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <motion.h3 
          className={`font-medium ${sizeConfig.titleSize}`}
          style={{ color: 'var(--color-text-secondary)' }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: delay + 0.1 }}
        >
          {title}
        </motion.h3>
        {Icon && (
          <motion.div 
            className={`${sizeConfig.iconContainer} rounded-lg flex items-center justify-center`}
            style={{ 
              backgroundColor: colors.iconBg,
              color: colors.accent
            }}
            initial={{ scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <Icon size={sizeConfig.iconSize} />
          </motion.div>
        )}
      </div>

      {/* Value */}
      <motion.div 
        className="mb-2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
      >
        <span 
          className={`font-bold ${sizeConfig.valueSize}`}
          style={{ color: 'var(--color-text-primary)' }}
        >
          {formatValue(value)}
        </span>
      </motion.div>

      {/* Subtitle and Trend */}
      {(subtitle || trend) && (
        <motion.div 
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: delay + 0.3 }}
        >
          {subtitle && (
            <span 
              className={`${size === 'sm' ? 'text-xs' : 'text-sm'}`}
              style={{ color: 'var(--color-text-muted)' }}
            >
              {subtitle}
            </span>
          )}
          {trend && (
            <div className="flex items-center gap-1">
              <motion.span 
                className="text-xs font-medium px-2 py-1 rounded-full"
                style={{
                  color: trend.isPositive ? 'var(--color-success-600)' : 'var(--color-danger-600)',
                  backgroundColor: trend.isPositive ? 'var(--color-success-100)' : 'var(--color-danger-100)'
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.3, 
                  delay: delay + 0.4,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ scale: 1.05 }}
              >
                {trend.isPositive ? '+' : ''}{trend.value}%
              </motion.span>
              {trend.label && (
                <span 
                  className="text-xs"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {trend.label}
                </span>
              )}
            </div>
          )}
        </motion.div>
      )}

      {/* Custom Children Content */}
      {children && (
        <motion.div 
          className="mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: delay + 0.4 }}
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  );
};

export default AnalyticCard;
