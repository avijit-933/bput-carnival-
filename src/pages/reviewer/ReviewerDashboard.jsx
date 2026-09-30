import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/ui/StatCard';
import { StatusBadge } from '../../components/ui/StatusBadge';
import {
  FileCheck2,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  Eye,
  FileSpreadsheet
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

export const ReviewerDashboard = () => {
  const { submissions } = useData();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const pendingReviews = submissions.filter(s => s.status === 'Submitted' || s.status === 'Under Review');
  const approvedCount = submissions.filter(s => s.status === 'Approved').length;
  const rejectedCount = submissions.filter(s => s.status === 'Rejected').length;
  const correctionCount = submissions.filter(s => s.status === 'Correction Required').length;

  const reviewStatusData = [
    { name: 'Approved', value: approvedCount, color: '#059669' },
    { name: 'Pending Review', value: pendingReviews.length, color: '#D97706' },
    { name: 'Correction Needed', value: correctionCount, color: '#F97316' },
    { name: 'Rejected', value: rejectedCount, color: '#E11D48' }
  ];

  const categorySubmissionsData = [
    { name: 'Environmental', count: submissions.filter(s => s.category === 'Environmental').length, color: '#059669' },
    { name: 'Social', count: submissions.filter(s => s.category === 'Social').length, color: '#0284C7' },
    { name: 'Governance', count: submissions.filter(s => s.category === 'Governance').length, color: '#D97706' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">ESG Compliance Reviewer Console</h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
              Audit & Verification
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Logged in as <span className="font-semibold text-slate-700">{currentUser?.name}</span> (Lead ESG Compliance Auditor).
            Validate contributor calculations, inspect attached manifests/bills, and verify data before executive sign-off.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/reviewer/pending"
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
          >
            <FileCheck2 className="w-4 h-4" />
            <span>Pending Reviews ({pendingReviews.length})</span>
          </Link>
          <Link
            to="/reviewer/history"
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
          >
            <span>Review History</span>
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Pending Reviews"
          value={pendingReviews.length}
          subtitle="Awaiting Audit"
          icon={FileCheck2}
          variant="amber"
          onClick={() => navigate('/reviewer/pending')}
        />
        <StatCard
          title="Approved"
          value={approvedCount}
          subtitle="Verified & Passed"
          icon={CheckCircle2}
          variant="green"
          onClick={() => navigate('/reviewer/history')}
        />
        <StatCard
          title="Correction Required"
          value={correctionCount}
          subtitle="Sent Back to Site"
          icon={RotateCcw}
          variant="red"
          onClick={() => navigate('/reviewer/history')}
        />
        <StatCard
          title="Rejected"
          value={rejectedCount}
          subtitle="Invalid Entries"
          icon={AlertTriangle}
          variant="purple"
          onClick={() => navigate('/reviewer/history')}
        />
      </div>

      {/* 2 Charts: Review Status & Category-wise Submissions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Review Status Ratio</h3>
              <p className="text-xs text-slate-500">Distribution of audited vs pending records</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={reviewStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {reviewStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Pillar Submissions Received</h3>
              <p className="text-xs text-slate-500">Metrics volume submitted per ESG pillar</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categorySubmissionsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#D97706" radius={[6, 6, 0, 0]}>
                  {categorySubmissionsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Priority Queue Feed */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-amber-700" />
            <h3 className="text-sm font-bold text-slate-900">High-Priority Audit Queue</h3>
          </div>
          <Link to="/reviewer/pending" className="text-xs font-semibold text-amber-700 hover:underline">
            View all ({pendingReviews.length}) →
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {pendingReviews.slice(0, 4).map(subm => (
            <div key={subm.id} className="py-3 flex items-center justify-between gap-4 text-xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{subm.indicatorName}</span>
                  <span className="font-mono text-[10px] text-slate-500 bg-slate-100 px-1 rounded">
                    {subm.indicatorCode}
                  </span>
                  <StatusBadge status={subm.status} size="xs" />
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Project: <strong className="text-slate-700">{subm.projectName}</strong> • Contributor: {subm.contributorName}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-slate-800 text-xs">
                  {subm.value !== null ? `${subm.value.toLocaleString()} ${subm.unit}` : 'Draft'}
                </span>
                <Link
                  to={`/reviewer/review-data/${subm.id}`}
                  className="px-3 py-1 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs rounded-lg shadow-xs transition-colors"
                >
                  Review Proof
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
