import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/ui/StatCard';
import { StatusBadge } from '../../components/ui/StatusBadge';
import {
  ClipboardList,
  Edit3,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  UploadCloud,
  FileCheck2
} from 'lucide-react';

export const ContributorDashboard = () => {
  const { submissions } = useData();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Filter assignments for current contributor or all demo contributor assignments
  const mySubmissions = submissions.filter(s =>
    s.contributorId === currentUser?.id || s.contributorName === currentUser?.name || currentUser?.role === 'ADMIN'
  );

  const totalAssigned = mySubmissions.length;
  const pendingCount = mySubmissions.filter(s => s.status === 'In Progress' || s.status === 'Not Started').length;
  const submittedCount = mySubmissions.filter(s => s.status === 'Submitted' || s.status === 'Under Review').length;
  const approvedCount = mySubmissions.filter(s => s.status === 'Approved').length;
  const correctionCount = mySubmissions.filter(s => s.status === 'Correction Required' || s.status === 'Rejected').length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Site Contributor Workstation</h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              Site Data Officer
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Logged in as <span className="font-semibold text-slate-700">{currentUser?.name}</span> ({currentUser?.projectName || 'Odisha Project Site'}).
            Input monthly site ESG metrics and attach verified evidence documents.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/contributor/enter-data"
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
          >
            <Edit3 className="w-4 h-4" />
            <span>Enter ESG Data</span>
          </Link>
          <Link
            to="/contributor/assignments"
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
          >
            <span>My Assignments</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        <StatCard
          title="My Assignments"
          value={totalAssigned}
          subtitle="Site Indicators"
          icon={ClipboardList}
          variant="navy"
          onClick={() => navigate('/contributor/assignments')}
        />
        <StatCard
          title="Pending Entry"
          value={pendingCount}
          subtitle="Action Required"
          icon={Clock}
          variant="amber"
          onClick={() => navigate('/contributor/enter-data')}
        />
        <StatCard
          title="Submitted"
          value={submittedCount}
          subtitle="Under Audit Review"
          icon={FileCheck2}
          variant="purple"
          onClick={() => navigate('/contributor/submissions')}
        />
        <StatCard
          title="Approved"
          value={approvedCount}
          subtitle="Sign-Off Granted"
          icon={CheckCircle2}
          variant="green"
          onClick={() => navigate('/contributor/submissions')}
        />
        <StatCard
          title="Corrections"
          value={correctionCount}
          subtitle="Re-Upload Needed"
          icon={AlertTriangle}
          variant="red"
          onClick={() => navigate('/contributor/corrections')}
        />
      </div>

      {/* Active Correction Alerts (High priority for site contributor) */}
      {correctionCount > 0 && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 shadow-xs">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                Correction Requested by ESG Reviewer
              </h4>
              <p className="text-xs text-amber-800 mt-1">
                Reviewer Siddharth Sen returned Diesel Consumption for Odisha Irrigation Project: "Please upload the verified water meter / fuel bowser statement stamped by accountant."
              </p>
              <div className="mt-2.5">
                <Link
                  to="/contributor/corrections"
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-md shadow-xs transition-colors"
                >
                  <span>Resolve & Re-Upload Evidence</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Two Column Section: Upcoming Deadlines & Recent Submissions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold text-slate-900">Upcoming Submission Deadlines</h3>
            </div>
            <Link to="/contributor/assignments" className="text-xs font-semibold text-emerald-700 hover:underline">
              View all →
            </Link>
          </div>

          <div className="space-y-3">
            {mySubmissions.filter(s => s.status === 'In Progress' || s.status === 'Not Started' || s.status === 'Correction Required').slice(0, 4).map(sub => (
              <div
                key={sub.id}
                className="p-3 rounded-lg border border-slate-200 hover:border-emerald-300 transition-colors flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-xs text-slate-900 block">{sub.indicatorName}</span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {sub.projectName} • {sub.category}
                  </span>
                  <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-400">
                    <span>Deadline:</span>
                    <span className="font-bold text-amber-700 font-mono">{sub.deadline}</span>
                  </div>
                </div>

                <Link
                  to={`/contributor/enter-data?submissionId=${sub.id}`}
                  className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
                >
                  Enter Data
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold text-slate-900">Recent Metric Submissions</h3>
            </div>
            <Link to="/contributor/submissions" className="text-xs font-semibold text-emerald-700 hover:underline">
              View full list →
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {mySubmissions.slice(0, 4).map(sub => (
              <div key={sub.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-bold text-slate-900 block">{sub.indicatorName}</span>
                  <span className="text-[11px] text-slate-500">
                    Reported: <strong className="text-slate-800 font-mono">{sub.value !== null ? `${sub.value.toLocaleString()} ${sub.unit}` : 'Draft'}</strong>
                  </span>
                </div>
                <div className="text-right">
                  <StatusBadge status={sub.status} size="xs" />
                  <span className="text-[10px] text-slate-400 block mt-1 font-mono">{sub.submittedDate || 'Saved'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
