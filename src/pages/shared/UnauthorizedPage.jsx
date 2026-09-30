import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';

export const UnauthorizedPage = () => {
  const { currentRole, currentUser } = useAuth();
  const navigate = useNavigate();

  const getHomePath = () => {
    switch (currentRole) {
      case 'ADMIN': return '/admin/dashboard';
      case 'ESG_MANAGER': return '/manager/dashboard';
      case 'CONTRIBUTOR': return '/contributor/dashboard';
      case 'REVIEWER': return '/reviewer/dashboard';
      case 'APPROVER': return '/approver/dashboard';
      default: return '/login';
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-md p-8 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto ring-8 ring-rose-50/50">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Access Denied</h2>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            You don't have permission to access this page under your current role (<strong>{currentRole}</strong>).
          </p>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 text-left space-y-1">
          <p className="font-semibold text-slate-800">Role-Based Access Enforcement:</p>
          <p className="text-[11px] text-slate-500">
            Contributors are restricted to site data entry, while organizational configuration and executive BRSR sign-off require elevated governance credentials.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-1/2 py-2 px-3 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>

          <Link
            to={getHomePath()}
            className="w-full sm:w-1/2 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
          >
            <Home className="w-4 h-4" />
            <span>My Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
