import React from 'react';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendLabel,
  trendUp,
  variant = 'blue',
  className = '',
  onClick
}) => {
  const variantStyles = {
    navy: {
      bg: 'bg-white',
      border: 'border-slate-200',
      iconBg: 'bg-slate-900 text-white',
      valueColor: 'text-slate-900',
    },
    green: {
      bg: 'bg-white',
      border: 'border-emerald-100',
      iconBg: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
      valueColor: 'text-emerald-950',
    },
    blue: {
      bg: 'bg-white',
      border: 'border-slate-200',
      iconBg: 'bg-blue-50 text-blue-700 border border-blue-200',
      valueColor: 'text-slate-900',
    },
    amber: {
      bg: 'bg-white',
      border: 'border-amber-100',
      iconBg: 'bg-amber-50 text-amber-700 border border-amber-200',
      valueColor: 'text-amber-950',
    },
    purple: {
      bg: 'bg-white',
      border: 'border-purple-100',
      iconBg: 'bg-purple-50 text-purple-700 border border-purple-200',
      valueColor: 'text-purple-950',
    },
    red: {
      bg: 'bg-white',
      border: 'border-rose-100',
      iconBg: 'bg-rose-50 text-rose-700 border border-rose-200',
      valueColor: 'text-rose-950',
    }
  };

  const style = variantStyles[variant] || variantStyles.blue;

  return (
    <div
      onClick={onClick}
      className={`rounded-xl border ${style.border} ${style.bg} p-5 shadow-xs transition-all hover:shadow-md ${
        onClick ? 'cursor-pointer hover:border-slate-300' : ''
      } ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</p>
          <div className="flex items-baseline space-x-2">
            <h3 className={`text-2xl font-bold tracking-tight ${style.valueColor}`}>{value}</h3>
            {trend && (
              <span
                className={`inline-flex items-center text-xs font-medium ${
                  trendUp ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {trendUp ? '↑' : '↓'} {trend}
              </span>
            )}
          </div>
          {subtitle && <p className="text-xs text-slate-500 font-normal">{subtitle}</p>}
          {trendLabel && <p className="text-[11px] text-slate-400">{trendLabel}</p>}
        </div>

        {Icon && (
          <div className={`p-2.5 rounded-lg shrink-0 ${style.iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
};
