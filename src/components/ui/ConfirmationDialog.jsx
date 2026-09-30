import React from 'react';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { Modal } from './Modal';

export const ConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'warning', // 'warning' | 'danger' | 'success' | 'info'
  isLoading = false
}) => {
  const iconConfig = {
    warning: { icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-100', btn: 'bg-amber-600 hover:bg-amber-700' },
    danger: { icon: AlertTriangle, color: 'text-rose-600', bg: 'bg-rose-100', btn: 'bg-rose-600 hover:bg-rose-700' },
    success: { icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-100', btn: 'bg-emerald-600 hover:bg-emerald-700' },
    info: { icon: Info, color: 'text-blue-600', bg: 'bg-blue-100', btn: 'bg-blue-600 hover:bg-blue-700' }
  }[type];

  const Icon = iconConfig.icon;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      maxWidth="max-w-md"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-4 py-2 text-xs font-semibold text-white rounded-lg transition-colors ${iconConfig.btn}`}
          >
            {isLoading ? 'Processing...' : confirmText}
          </button>
        </>
      }
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-full shrink-0 ${iconConfig.bg}`}>
          <Icon className={`w-6 h-6 ${iconConfig.color}`} />
        </div>
        <div className="text-sm text-slate-600 leading-relaxed pt-1">
          {message}
        </div>
      </div>
    </Modal>
  );
};
