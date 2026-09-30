import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/ui/StatCard';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import {
  Building2,
  Layers,
  FolderKanban,
  Users,
  AlertTriangle,
  Clock,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  FileSpreadsheet,
  ShieldCheck,
  Plus
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts';

export const AdminDashboard = () => {
  const { subsidiaries, businessUnits, projects, users, submissions, auditLogs } = useData();
  const navigate = useNavigate();

  // Metrics calculation
  const totalSubsidiaries = subsidiaries.length;
  const totalBUs = businessUnits.length;
  const totalProjects = projects.length;
  const totalUsers = users.length;

  const totalDataPoints = submissions.length;
  const submittedCount = submissions.filter(s => s.status === 'Submitted').length;
  const underReviewCount = submissions.filter(s => s.status === 'Under Review').length;
  const approvedCount = submissions.filter(s => s.status === 'Approved').length;
  const rejectedCount = submissions.filter(s => s.status === 'Rejected').length;
  const correctionCount = submissions.filter(s => s.status === 'Correction Required').length;
  const pendingCount = submissions.filter(s => s.status === 'In Progress' || s.status === 'Not Started').length;

  // Chart data: ESG Category Distribution
  const categoryData = [
    { name: 'Environmental', count: submissions.filter(s => s.category === 'Environmental').length, color: '#059669' },
    { name: 'Social', count: submissions.filter(s => s.category === 'Social').length, color: '#0284C7' },
    { name: 'Governance', count: submissions.filter(s => s.category === 'Governance').length, color: '#D97706' }
  ];

  // Chart data: Project-wise completion
  const projectCompletionData = projects.slice(0, 6).map(p => ({
    name: p.name.length > 18 ? p.name.substring(0, 18) + '...' : p.name,
    completion: p.esgCompletion || 75
  }));

  // Chart data: Monthly submission trend
  const trendData = [
    { month: 'Apr 2026', submitted: 4, approved: 3 },
    { month: 'May 2026', submitted: 7, approved: 6 },
    { month: 'Jun 2026', submitted: 11, approved: 10 },
    { month: 'Jul 2026', submitted: 14, approved: 12 },
    { month: 'Aug 2026', submitted: 16, approved: 14 },
    { month: 'Sep 2026', submitted: submissions.length, approved: approvedCount }
  ];

  // Status breakdown
  const statusPieData = [
    { name: 'Approved', value: approvedCount, color: '#10B981' },
    { name: 'Submitted / Review', value: submittedCount + underReviewCount, color: '#8B5CF6' },
    { name: 'Corrections', value: correctionCount, color: '#F59E0B' },
    { name: 'Pending Entry', value: pendingCount, color: '#94A3B8' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header & Fast Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Admin Operations Console</h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              System Control
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Group ESG data architecture, organizational hierarchy, users, indicators, and reporting governance.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/admin/projects"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </Link>

          <Link
            to="/admin/reports"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Generate Report</span>
          </Link>
        </div>
      </div>

      {/* Primary Organization KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Subsidiaries"
          value={totalSubsidiaries}
          subtitle="Operating Divisions"
          icon={Building2}
          variant="navy"
          trend="+1 this FY"
          trendUp={true}
          onClick={() => navigate('/admin/subsidiaries')}
        />
        <StatCard
          title="Business Units"
          value={totalBUs}
          subtitle="Across 5 Divisions"
          icon={Layers}
          variant="blue"
          onClick={() => navigate('/admin/business-units')}
        />
        <StatCard
          title="Active Projects"
          value={totalProjects}
          subtitle="Infrastructure Sites"
          icon={FolderKanban}
          variant="green"
          trend="100% Onboarded"
          trendUp={true}
          onClick={() => navigate('/admin/projects')}
        />
        <StatCard
          title="Authorized Users"
          value={totalUsers}
          subtitle="5 Governance Roles"
          icon={Users}
          variant="purple"
          onClick={() => navigate('/admin/users')}
        />
      </div>

      {/* ESG Reporting Progress Breakdown Cards */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">ESG Reporting Progress (FY 2026-27)</h3>
            <p className="text-xs text-slate-500">Live submission pipeline across all projects and assigned indicators</p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            {approvedCount} of {totalDataPoints} Validated
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
            <p className="text-[11px] font-semibold text-slate-500 uppercase">Total Data Points</p>
            <p className="text-xl font-extrabold text-slate-900 mt-1">{totalDataPoints}</p>
            <span className="text-[10px] text-slate-400">Assigned indicators</span>
          </div>

          <div className="p-3 rounded-lg bg-purple-50/70 border border-purple-200">
            <p className="text-[11px] font-semibold text-purple-700 uppercase">Submitted</p>
            <p className="text-xl font-extrabold text-purple-900 mt-1">{submittedCount}</p>
            <span className="text-[10px] text-purple-600">Awaiting verification</span>
          </div>

          <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200">
            <p className="text-[11px] font-semibold text-amber-700 uppercase">Under Review</p>
            <p className="text-xl font-extrabold text-amber-900 mt-1">{underReviewCount}</p>
            <span className="text-[10px] text-amber-600">Audit in progress</span>
          </div>

          <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200">
            <p className="text-[11px] font-semibold text-emerald-700 uppercase">Approved</p>
            <p className="text-xl font-extrabold text-emerald-900 mt-1">{approvedCount}</p>
            <span className="text-[10px] text-emerald-600">Verified & Sign-off</span>
          </div>

          <div className="p-3 rounded-lg bg-orange-50/70 border border-orange-200">
            <p className="text-[11px] font-semibold text-orange-700 uppercase">Correction Req.</p>
            <p className="text-xl font-extrabold text-orange-900 mt-1">{correctionCount}</p>
            <span className="text-[10px] text-orange-600">Sent back to site</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <p className="text-[11px] font-semibold text-slate-500 uppercase">Pending Entry</p>
            <p className="text-xl font-extrabold text-slate-700 mt-1">{pendingCount}</p>
            <span className="text-[10px] text-slate-400">Not submitted yet</span>
          </div>
        </div>
      </div>

      {/* 4 Interactive Visual Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: ESG Submission Status Breakdown */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Submission Pipeline Breakdown</h3>
              <p className="text-xs text-slate-500">Live proportion of verified vs pending data</p>
            </div>
            <span className="text-xs font-semibold text-slate-400">Total: {totalDataPoints}</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {statusPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Pillar Distribution (E vs S vs G) */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">ESG Pillar Distribution</h3>
              <p className="text-xs text-slate-500">Data requirements allocated per pillar</p>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              Balanced ESG Coverage
            </span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" width={110} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#0F2942" radius={[0, 6, 6, 0]}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Project-wise Completion */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Top Projects ESG Completion (%)</h3>
              <p className="text-xs text-slate-500">Progress toward full BRSR sign-off</p>
            </div>
            <Link to="/admin/projects" className="text-xs font-semibold text-emerald-700 hover:underline">
              View all 10 projects →
            </Link>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectCompletionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} unit="%" />
                <Tooltip formatter={(value) => [`${value}%`, 'Completion']} />
                <Bar dataKey="completion" fill="#059669" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Monthly Submission Trend */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Monthly Submission & Approval Velocity</h3>
              <p className="text-xs text-slate-500">Volume trends leading into BRSR reporting deadline</p>
            </div>
            <span className="text-xs font-semibold text-slate-500">FY 2026-27</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="submitted" stroke="#8B5CF6" strokeWidth={2} name="Submitted" />
                <Line type="monotone" dataKey="approved" stroke="#059669" strokeWidth={2} name="Approved" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row: System Alerts & Recent Audit Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Alerts */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-bold text-slate-900">Operational Alerts</h3>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
              3 Requires Attention
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-amber-50/60 border border-amber-200/80">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-amber-900">Upcoming Submission Deadline</p>
                  <p className="text-[11px] text-amber-700 mt-0.5">
                    FY 2026-27 interim data submission window closes in 30 days (31 October 2026).
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-rose-50/60 border border-rose-200/80">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-rose-900">Site Correction Overdue</p>
                  <p className="text-[11px] text-rose-700 mt-0.5">
                    Odisha Irrigation Project: Reviewer Siddharth Sen requested IOCL fuel voucher clarification.
                  </p>
                  <Link to="/manager/monitor-submissions" className="text-[11px] font-bold text-rose-800 underline mt-1 inline-block">
                    Review Status →
                  </Link>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-blue-50/60 border border-blue-200/80">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-blue-900">Pending Executive Approval</p>
                  <p className="text-[11px] text-blue-700 mt-0.5">
                    Kaleshwaram Lift Irrigation O&M Unit has achieved 98% validated indicators.
                  </p>
                  <Link to="/approver/queue" className="text-[11px] font-bold text-blue-800 underline mt-1 inline-block">
                    Go to Approval Queue →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Audit Activities */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900">Recent Enterprise Governance Activity</h3>
            <Link to="/admin/audit-logs" className="text-xs font-semibold text-emerald-700 hover:underline">
              View full audit trail →
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {auditLogs.slice(0, 5).map(log => (
              <div key={log.id} className="py-3 flex items-start justify-between gap-3 text-xs">
                <div>
                  <p className="font-semibold text-slate-900">{log.action}</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">{log.record}</p>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                    <span>By {log.user}</span>
                    <span>•</span>
                    <span>{log.module}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-400 block">{log.timestamp}</span>
                  <StatusBadge status={log.status} size="xs" className="mt-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
