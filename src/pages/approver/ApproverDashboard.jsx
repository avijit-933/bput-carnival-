import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/ui/StatCard';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import {
  FileCheck2,
  CheckCircle2,
  FolderKanban,
  RotateCcw,
  Building2,
  FileSpreadsheet,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

export const ApproverDashboard = () => {
  const { projects, submissions, subsidiaries } = useData();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Metrics
  const projectsAwaitingApproval = projects.filter(p => (p.esgCompletion || 0) >= 85);
  const completedProjects = projects.filter(p => (p.esgCompletion || 0) >= 95).length;
  const approvedTotal = submissions.filter(s => s.status === 'Approved').length;
  const returnedTotal = submissions.filter(s => s.status === 'Correction Required').length;

  // Subsidiary Performance Data
  const subPerformanceData = subsidiaries.map(s => ({
    name: s.code.replace('MEIL-', ''),
    completion: s.completionPercentage || 85
  }));

  // Pillar Maturity Radar Data
  const radarData = [
    { subject: 'Water Stewardship', score: 92 },
    { subject: 'Energy & Renewables', score: 86 },
    { subject: 'GHG Accounting', score: 88 },
    { subject: 'Health & Safety (Zero Harm)', score: 96 },
    { subject: 'Labor Rights', score: 94 },
    { subject: 'Statutory Clearances', score: 98 }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Executive Governance & BRSR Sign-Off</h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-purple-50 text-purple-800 border border-purple-200">
              Board Level Oversight
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Executive Director: <span className="font-semibold text-slate-700">{currentUser?.name}</span>.
            Review validated divisional ESG dossiers, authorize official SEBI BRSR Core submissions, and monitor company-wide sustainability scores.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/approver/queue"
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-purple-900 hover:bg-purple-950 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
          >
            <FileCheck2 className="w-4 h-4" />
            <span>Approval Queue ({projectsAwaitingApproval.length})</span>
          </Link>
          <Link
            to="/brsr-report"
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>View Full BRSR Report</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Dossiers In Queue"
          value={projectsAwaitingApproval.length}
          subtitle="Projects Ready for Sign-Off"
          icon={FileCheck2}
          variant="purple"
          onClick={() => navigate('/approver/queue')}
        />
        <StatCard
          title="Fully Validated"
          value={completedProjects}
          subtitle="Projects Above 95%"
          icon={CheckCircle2}
          variant="green"
          onClick={() => navigate('/approver/approved')}
        />
        <StatCard
          title="Total Data Approved"
          value={approvedTotal}
          subtitle="Verified Evidence Points"
          icon={ShieldCheck}
          variant="navy"
          trend="+12 this cycle"
          trendUp={true}
        />
        <StatCard
          title="Returned to Sites"
          value={returnedTotal}
          subtitle="Audit Remediation"
          icon={RotateCcw}
          variant="amber"
        />
      </div>

      {/* 2 Charts: Subsidiary Performance & ESG Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subsidiary Performance Comparison */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Subsidiary Division ESG Completion</h3>
              <p className="text-xs text-slate-500">Benchmark across MEIL 5 major operating arms</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 100]} unit="%" tick={{ fontSize: 11 }} />
                <Tooltip formatter={(value) => [`${value}%`, 'Completion']} />
                <Bar dataKey="completion" fill="#581C87" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ESG Maturity Radar */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">BRSR Core Dimension Performance</h3>
              <p className="text-xs text-slate-500">Assurance scores across mandatory regulatory topics</p>
            </div>
            <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
              High Assurance
            </span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Radar name="MEIL Performance" dataKey="score" stroke="#059669" fill="#10B981" fillOpacity={0.4} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Projects Awaiting Approval Preview Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-purple-700" />
            <h3 className="text-sm font-bold text-slate-900">Projects Awaiting Board Sign-Off</h3>
          </div>
          <Link to="/approver/queue" className="text-xs font-semibold text-purple-800 hover:underline">
            Open full queue →
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {projectsAwaitingApproval.slice(0, 4).map(proj => (
            <div key={proj.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">{proj.name}</span>
                  <span className="font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded text-[11px]">
                    {proj.projectId}
                  </span>
                </div>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  {proj.subsidiaryName} • Site Manager: {proj.projectManager}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">ESG Completion</span>
                  <span className="text-sm font-bold text-emerald-700 block font-mono">{proj.esgCompletion}%</span>
                </div>

                <Link
                  to={`/approver/final-review/${proj.id}`}
                  className="px-3.5 py-1.5 bg-purple-900 hover:bg-purple-950 text-white font-bold text-xs rounded-lg shadow-xs transition-colors whitespace-nowrap"
                >
                  Review Dossier
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
