import React from 'react';

export const StatusBadge = ({ status, size = 'sm', className = '' }) => {
  const getBadgeConfig = (st) => {
    const s = (st || '').toString().toLowerCase().trim();

    if (s.includes('draft') || s === 'not started') {
      return {
        bg: 'bg-slate-100',
        text: 'text-slate-700',
        border: 'border-slate-200',
        dot: 'bg-slate-400',
        label: st || 'Draft'
      };
    }
    if (s.includes('in progress')) {
      return {
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        border: 'border-blue-200',
        dot: 'bg-blue-500 animate-pulse',
        label: 'In Progress'
      };
    }
    if (s.includes('submitted')) {
      return {
        bg: 'bg-purple-50',
        text: 'text-purple-700',
        border: 'border-purple-200',
        dot: 'bg-purple-500',
        label: 'Submitted'
      };
    }
    if (s.includes('under review')) {
      return {
        bg: 'bg-amber-50',
        text: 'text-amber-800',
        border: 'border-amber-200',
        dot: 'bg-amber-500',
        label: 'Under Review'
      };
    }
    if (s.includes('approved') || s === 'active' || s === 'success') {
      return {
        bg: 'bg-emerald-50',
        text: 'text-emerald-800',
        border: 'border-emerald-200',
        dot: 'bg-emerald-500',
        label: st || 'Approved'
      };
    }
    if (s.includes('correction') || s.includes('warning')) {
      return {
        bg: 'bg-amber-100',
        text: 'text-amber-900',
        border: 'border-amber-300',
        dot: 'bg-amber-600',
        label: 'Correction Required'
      };
    }
    if (s.includes('reject') || s === 'error' || s === 'failed') {
      return {
        bg: 'bg-rose-50',
        text: 'text-rose-700',
        border: 'border-rose-200',
        dot: 'bg-rose-500',
        label: 'Rejected'
      };
    }
    if (s === 'closed' || s === 'inactive') {
      return {
        bg: 'bg-slate-100',
        text: 'text-slate-600',
        border: 'border-slate-200',
        dot: 'bg-slate-400',
        label: st || 'Closed'
      };
    }
    if (s === 'upcoming') {
      return {
        bg: 'bg-sky-50',
        text: 'text-sky-700',
        border: 'border-sky-200',
        dot: 'bg-sky-500',
        label: 'Upcoming'
      };
    }

    return {
      bg: 'bg-slate-100',
      text: 'text-slate-700',
      border: 'border-slate-200',
      dot: 'bg-slate-400',
      label: st
    };
  };

  const config = getBadgeConfig(status);

  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-[10px]',
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs font-semibold'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${config.bg} ${config.text} ${config.border} ${sizeClasses[size] || sizeClasses.sm} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${config.dot}`} />
      <span>{config.label}</span>
    </span>
  );
};
