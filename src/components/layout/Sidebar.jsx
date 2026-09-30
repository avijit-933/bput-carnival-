import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import {
  LayoutDashboard,
  Building2,
  Layers,
  FolderKanban,
  Users,
  ShieldCheck,
  Tag,
  Gauge,
  CalendarDays,
  FileCheck2,
  FileSpreadsheet,
  History,
  Settings,
  ClipboardList,
  Edit3,
  CheckCircle2,
  AlertTriangle,
  FileText,
  BarChart3,
  ChevronDown,
  ChevronRight,
  Leaf,
  Globe2
} from 'lucide-react';

export const Sidebar = ({ isOpen, onClose }) => {
  const { currentRole } = useAuth();
  const { submissions } = useData();
  const location = useLocation();

  // Collapsible submenus for Admin
  const [orgOpen, setOrgOpen] = useState(true);
  const [userMgmtOpen, setUserMgmtOpen] = useState(true);
  const [esgConfigOpen, setEsgConfigOpen] = useState(true);

  // Dynamic counts for badges
  const pendingReviewCount = submissions.filter(s => s.status === 'Submitted' || s.status === 'Under Review').length;
  const correctionCount = submissions.filter(s => s.status === 'Correction Required').length;
  const pendingApprovalCount = submissions.filter(s => s.status === 'Submitted').length;

  const renderNavLinks = () => {
    switch (currentRole) {
      case 'ADMIN':
        return (
          <>
            <div className="px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Administration & Governance
            </div>

            <NavLink
              to="/admin/dashboard"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Admin Dashboard</span>
            </NavLink>

            {/* Organization Accordion */}
            <div className="pt-2">
              <button
                onClick={() => setOrgOpen(!orgOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-4 h-4 text-slate-500" />
                  <span>Organization</span>
                </div>
                {orgOpen ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
              </button>

              {orgOpen && (
                <div className="pl-6 pr-2 pt-1 space-y-1">
                  <NavLink
                    to="/admin/subsidiaries"
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-colors ${
                        isActive ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`
                    }
                  >
                    <span>Subsidiaries</span>
                  </NavLink>
                  <NavLink
                    to="/admin/business-units"
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-colors ${
                        isActive ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`
                    }
                  >
                    <span>Business Units</span>
                  </NavLink>
                  <NavLink
                    to="/admin/projects"
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-colors ${
                        isActive ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`
                    }
                  >
                    <span>Projects</span>
                  </NavLink>
                </div>
              )}
            </div>

            {/* User Management Accordion */}
            <div className="pt-2">
              <button
                onClick={() => setUserMgmtOpen(!userMgmtOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-slate-500" />
                  <span>User Management</span>
                </div>
                {userMgmtOpen ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
              </button>

              {userMgmtOpen && (
                <div className="pl-6 pr-2 pt-1 space-y-1">
                  <NavLink
                    to="/admin/users"
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-colors ${
                        isActive ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`
                    }
                  >
                    <span>Users</span>
                  </NavLink>
                  <NavLink
                    to="/admin/roles-permissions"
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-colors ${
                        isActive ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`
                    }
                  >
                    <span>Roles & Permissions</span>
                  </NavLink>
                </div>
              )}
            </div>

            {/* ESG Configuration Accordion */}
            <div className="pt-2">
              <button
                onClick={() => setEsgConfigOpen(!esgConfigOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Tag className="w-4 h-4 text-slate-500" />
                  <span>ESG Configuration</span>
                </div>
                {esgConfigOpen ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
              </button>

              {esgConfigOpen && (
                <div className="pl-6 pr-2 pt-1 space-y-1">
                  <NavLink
                    to="/admin/esg-categories"
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-colors ${
                        isActive ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`
                    }
                  >
                    <span>ESG Categories</span>
                  </NavLink>
                  <NavLink
                    to="/admin/indicators"
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-colors ${
                        isActive ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`
                    }
                  >
                    <span>Indicators</span>
                  </NavLink>
                </div>
              )}
            </div>

            <NavLink
              to="/admin/reporting-periods"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors mt-2 ${
                  isActive ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
            >
              <CalendarDays className="w-4 h-4" />
              <span>Reporting Periods</span>
            </NavLink>

            <NavLink
              to="/admin/reports"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  isActive ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Reports</span>
            </NavLink>

            <NavLink
              to="/admin/audit-logs"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  isActive ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
            >
              <History className="w-4 h-4" />
              <span>Audit Logs</span>
            </NavLink>

            <NavLink
              to="/admin/settings"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  isActive ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
            >
              <Settings className="w-4 h-4" />
              <span>System Settings</span>
            </NavLink>
          </>
        );

      case 'ESG_MANAGER':
        return (
          <>
            <div className="px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              ESG Workflow Management
            </div>

            <NavLink
              to="/manager/dashboard"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  isActive ? 'bg-[#0F2942] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Manager Dashboard</span>
            </NavLink>

            <NavLink
              to="/manager/projects"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  isActive ? 'bg-[#0F2942] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
            >
              <FolderKanban className="w-4 h-4" />
              <span>Assigned Projects</span>
            </NavLink>

            <NavLink
              to="/manager/data-collection"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  isActive ? 'bg-[#0F2942] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
            >
              <ClipboardList className="w-4 h-4" />
              <span>Data Collection (Assign)</span>
            </NavLink>

            <NavLink
              to="/manager/monitor-submissions"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  isActive ? 'bg-[#0F2942] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <FileCheck2 className="w-4 h-4" />
                <span>Monitor Submissions</span>
              </div>
              {pendingReviewCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                  {pendingReviewCount}
                </span>
              )}
            </NavLink>

            <NavLink
              to="/manager/reports"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  isActive ? 'bg-[#0F2942] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>ESG Reports</span>
            </NavLink>
          </>
        );

      case 'CONTRIBUTOR':
        return (
          <>
            <div className="px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Data Entry & Evidence
            </div>

            <NavLink
              to="/contributor/dashboard"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  isActive ? 'bg-emerald-800 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Contributor Dashboard</span>
            </NavLink>

            <NavLink
              to="/contributor/assignments"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  isActive ? 'bg-emerald-800 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
            >
              <ClipboardList className="w-4 h-4" />
              <span>My Assignments</span>
            </NavLink>

            <NavLink
              to="/contributor/enter-data"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  isActive ? 'bg-emerald-800 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
            >
              <Edit3 className="w-4 h-4" />
              <span>Enter ESG Data</span>
            </NavLink>

            <NavLink
              to="/contributor/submissions"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  isActive ? 'bg-emerald-800 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>My Submissions</span>
            </NavLink>

            <NavLink
              to="/contributor/corrections"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  isActive ? 'bg-emerald-800 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Corrections Needed</span>
              </div>
              {correctionCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                  {correctionCount}
                </span>
              )}
            </NavLink>
          </>
        );

      case 'REVIEWER':
        return (
          <>
            <div className="px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Verification & Audit
            </div>

            <NavLink
              to="/reviewer/dashboard"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  isActive ? 'bg-amber-800 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Reviewer Dashboard</span>
            </NavLink>

            <NavLink
              to="/reviewer/pending"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  isActive ? 'bg-amber-800 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <FileCheck2 className="w-4 h-4" />
                <span>Pending Reviews</span>
              </div>
              {pendingReviewCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                  {pendingReviewCount}
                </span>
              )}
            </NavLink>

            <NavLink
              to="/reviewer/history"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  isActive ? 'bg-amber-800 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
            >
              <History className="w-4 h-4" />
              <span>Review History</span>
            </NavLink>
          </>
        );

      case 'APPROVER':
        return (
          <>
            <div className="px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Executive BRSR Sign-Off
            </div>

            <NavLink
              to="/approver/dashboard"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  isActive ? 'bg-purple-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Executive Dashboard</span>
            </NavLink>

            <NavLink
              to="/approver/queue"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  isActive ? 'bg-purple-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <FileCheck2 className="w-4 h-4" />
                <span>Approval Queue</span>
              </div>
              {pendingApprovalCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">
                  {pendingApprovalCount}
                </span>
              )}
            </NavLink>

            <NavLink
              to="/approver/approved"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  isActive ? 'bg-purple-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Approved Reports</span>
            </NavLink>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transition-transform duration-200 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Brand Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between h-16 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0F2942] flex items-center justify-center text-emerald-400 font-extrabold text-sm">
              M
            </div>
            <div>
              <p className="text-xs font-extrabold text-slate-900 tracking-tight">MEIL ESG PORTAL</p>
              <p className="text-[10px] text-slate-500 font-medium">Enterprise Sustainability</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 lg:hidden"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
          {renderNavLinks()}

          {/* Shared Common Section */}
          <div className="pt-4 mt-4 border-t border-slate-100">
            <div className="px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Cross-Entity Views
            </div>

            <NavLink
              to="/esg-group-dashboard"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  isActive ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
            >
              <Globe2 className="w-4 h-4 text-emerald-600" />
              <span>Group ESG Dashboard</span>
            </NavLink>

            <NavLink
              to="/brsr-report"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  isActive ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
            >
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>BRSR Core Report</span>
            </NavLink>
          </div>
        </div>

        {/* Bottom Sustainability Badge */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/70">
          <div className="rounded-lg bg-emerald-50 border border-emerald-100 p-2.5 text-center">
            <div className="flex items-center justify-center gap-1.5 text-emerald-800 font-bold text-xs mb-1">
              <Leaf className="w-3.5 h-3.5 text-emerald-600" />
              <span>Zero Harm & Net Zero</span>
            </div>
            <p className="text-[10px] text-emerald-700 leading-tight">
              Aligned with SEBI BRSR Core & UN SDGs for Indian Infrastructure
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
