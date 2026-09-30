import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Shield, UserCheck, RefreshCw, ChevronDown, Check, Sparkles } from 'lucide-react';
import { ConfirmationDialog } from './ConfirmationDialog';

export const QuickRoleSwitcher = () => {
  const { currentUser, currentRole, switchRole } = useAuth();
  const { resetToDemoData } = useData();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const roles = [
    { role: 'ADMIN', label: 'Admin', desc: 'Org Setup, Users & ESG Config', path: '/admin/dashboard', color: 'bg-indigo-600 text-white' },
    { role: 'ESG_MANAGER', label: 'ESG Manager', desc: 'Assignments & Workflow Mgmt', path: '/manager/dashboard', color: 'bg-teal-600 text-white' },
    { role: 'CONTRIBUTOR', label: 'Data Contributor', desc: 'Enter Metrics & Upload Proof', path: '/contributor/dashboard', color: 'bg-emerald-600 text-white' },
    { role: 'REVIEWER', label: 'Reviewer', desc: 'Validate Evidence & Approve', path: '/reviewer/dashboard', color: 'bg-amber-600 text-white' },
    { role: 'APPROVER', label: 'Approver / Exec', desc: 'BRSR Sign-off & Reports', path: '/approver/dashboard', color: 'bg-purple-600 text-white' },
  ];

  const handleSelectRole = (r) => {
    switchRole(r.role);
    setIsOpen(false);
    navigate(r.path);
  };

  const handleReset = () => {
    resetToDemoData();
    setShowResetConfirm(false);
    window.location.reload();
  };

  return (
    <>
      <div className="bg-slate-900 text-slate-200 border-b border-slate-800 text-xs px-3 py-1.5 flex items-center justify-between no-print z-40 relative">
        <div className="flex items-center gap-2 overflow-x-auto py-0.5">
          <span className="inline-flex items-center gap-1 font-bold text-amber-400 uppercase tracking-wider text-[10px] bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/80">
            <Sparkles className="w-3 h-3" />
            Hackathon Demo Mode
          </span>
          <span className="hidden sm:inline text-slate-400">|</span>
          <span className="text-slate-300 hidden md:inline">Quick Role Switch:</span>

          <div className="flex items-center gap-1.5">
            {roles.map(r => {
              const isActive = currentRole === r.role;
              return (
                <button
                  key={r.role}
                  onClick={() => handleSelectRole(r)}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all flex items-center gap-1 ${
                    isActive
                      ? `${r.color} shadow-xs ring-1 ring-white/30`
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {isActive && <Check className="w-3 h-3 stroke-[3]" />}
                  {r.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2 pl-2 shrink-0">
          <button
            onClick={() => setShowResetConfirm(true)}
            title="Reset mock data to fresh demo state"
            className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium text-slate-300 bg-slate-800 hover:bg-rose-900/60 hover:text-rose-200 border border-slate-700 rounded transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span className="hidden lg:inline">Reset Demo State</span>
          </button>
        </div>
      </div>

      <ConfirmationDialog
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={handleReset}
        title="Reset Demo Database"
        message="This will restore all original mock subsidiaries, projects, users, indicators, and submissions to their default state. Useful for restarting your presentation workflow."
        confirmText="Reset Now"
        type="warning"
      />
    </>
  );
};
