import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Menu,
  Search,
  FileText,
  BarChart3,
  LogOut,
  ChevronDown,
  ShieldCheck,
  Building2,
  ExternalLink
} from 'lucide-react';
import { NotificationDropdown } from '../notifications/NotificationDropdown';

export const Navbar = ({ onToggleSidebar }) => {
  const { currentUser, currentRole, logout } = useAuth();
  const navigate = useNavigate();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const getRoleBadge = (role) => {
    switch (role) {
      case 'ADMIN':
        return { label: 'Admin', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' };
      case 'ESG_MANAGER':
        return { label: 'ESG Manager', color: 'bg-teal-100 text-teal-800 border-teal-200' };
      case 'CONTRIBUTOR':
        return { label: 'Contributor', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
      case 'REVIEWER':
        return { label: 'Reviewer', color: 'bg-amber-100 text-amber-800 border-amber-200' };
      case 'APPROVER':
        return { label: 'Executive Approver', color: 'bg-purple-100 text-purple-800 border-purple-200' };
      default:
        return { label: role, color: 'bg-slate-100 text-slate-700 border-slate-200' };
    }
  };

  const roleBadge = getRoleBadge(currentRole);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-xs">
      <div className="px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Left Side: Mobile Menu Button & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 -ml-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg lg:hidden"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/" className="flex items-center gap-3 group">
            {/* MEIL Corporate Mark */}
            <div className="w-9 h-9 rounded-lg bg-[#0F2942] flex items-center justify-center text-white font-extrabold text-sm tracking-wider shadow-xs border border-emerald-500/30">
              <span className="text-emerald-400">M</span>EIL
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  MEIL ESG & BRSR
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase">
                  Portal
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-none">
                Megha Engineering and Infrastructures Limited
              </p>
            </div>
          </Link>
        </div>

        {/* Center / Navigation shortcuts */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/esg-group-dashboard"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-800 hover:bg-emerald-50/70 rounded-lg transition-colors border border-transparent hover:border-emerald-200"
          >
            <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Group ESG Dashboard</span>
          </Link>

          <Link
            to="/brsr-report"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-800 hover:bg-emerald-50/70 rounded-lg transition-colors border border-transparent hover:border-emerald-200"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-600" />
            <span>BRSR Core Report</span>
          </Link>
        </div>

        {/* Right Side: Notifications & User Profile */}
        <div className="flex items-center gap-3">
          <NotificationDropdown />

          <div className="h-6 w-px bg-slate-200 hidden sm:block" />

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(prev => !prev)}
              className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-slate-50 transition-colors focus:outline-none"
            >
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'}
                alt={currentUser?.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/20"
              />
              <div className="hidden lg:block text-left">
                <p className="text-xs font-bold text-slate-800 leading-tight">
                  {currentUser?.name || 'Authorized User'}
                </p>
                <span className={`inline-block text-[10px] font-semibold px-1.5 py-0.2 rounded-full border ${roleBadge.color}`}>
                  {roleBadge.label}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {userDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-64 rounded-xl bg-white shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onClick={() => setUserDropdownOpen(false)}
              >
                <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                  <p className="text-xs font-bold text-slate-900">{currentUser?.name}</p>
                  <p className="text-[11px] text-slate-500 truncate">{currentUser?.email}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Role</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${roleBadge.color}`}>
                      {roleBadge.label}
                    </span>
                  </div>
                </div>

                <div className="p-1">
                  <div className="px-3 py-2 text-[11px] text-slate-500">
                    <p className="font-medium text-slate-700">Project / BU:</p>
                    <p className="truncate">{currentUser?.projectName || currentUser?.subsidiaryName || 'Enterprise Wide'}</p>
                  </div>
                </div>

                <div className="border-t border-slate-100 p-1">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
