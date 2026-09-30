import React from 'react';

export const ProgressBar = ({
  value = 0,
  max = 100,
  label,
  showPercentage = true,
  size = 'md',
  colorScheme = 'auto', // 'auto' | 'green' | 'blue' | 'amber'
  className = ''
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const getColorClass = () => {
    if (colorScheme === 'green') return 'bg-emerald-600';
    if (colorScheme === 'blue') return 'bg-sky-600';
    if (colorScheme === 'amber') return 'bg-amber-500';

    // Auto based on completion threshold
    if (percentage >= 85) return 'bg-emerald-600';
    if (percentage >= 60) return 'bg-sky-600';
    if (percentage >= 35) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-xs mb-1 font-medium">
          {label && <span className="text-slate-600 truncate">{label}</span>}
          {showPercentage && <span className="text-slate-700 ml-auto font-semibold">{percentage}%</span>}
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${heights[size] || heights.md}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ${getColorClass()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
