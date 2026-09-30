import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { StatCard } from '../../components/ui/StatCard';
import { ProgressBar } from '../../components/ui/ProgressBar';
import {
  Globe2,
  Building2,
  Layers,
  FolderKanban,
  CheckCircle2,
  Clock,
  Sparkles,
  Leaf,
  Users,
  Building,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export const GroupESGDashboard = () => {
  const { subsidiaries, businessUnits, projects, submissions } = useData();

  // Top Filters
  const [financialYear, setFinancialYear] = useState('FY 2026-27');
  const [selectedSubId, setSelectedSubId] = useState('');
  const [selectedBuId, setSelectedBuId] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // Filter cascades
  const filteredBUs = businessUnits.filter(b => !selectedSubId || b.subsidiaryId === selectedSubId);
  const filteredProjects = projects.filter(p => {
    if (selectedSubId && p.subsidiaryId !== selectedSubId) return false;
    if (selectedBuId && p.businessUnitId !== selectedBuId) return false;
    return true;
  });

  const filteredSubmissions = submissions.filter(s => {
    if (selectedSubId && s.subsidiaryId !== selectedSubId) return false;
    if (selectedProjectId && s.projectId !== selectedProjectId) return false;
    if (selectedCategory !== 'ALL' && s.category !== selectedCategory) return false;
    return true;
  });

  // KPI calculations
  const totalProjectsCount = filteredProjects.length;
  const approvedCount = filteredSubmissions.filter(s => s.status === 'Approved').length;
  const totalSubmissionsCount = filteredSubmissions.length;
  const reportingCompletion = Math.round((approvedCount / (totalSubmissionsCount || 1)) * 100);
  const pendingReviewsCount = filteredSubmissions.filter(s => s.status === 'Submitted' || s.status === 'Under Review').length;

  // Chart 1: ESG Submission Completion Breakdown
  const completionPieData = [
    { name: 'Approved', value: approvedCount, color: '#059669' },
    { name: 'Under Review', value: pendingReviewsCount, color: '#D97706' },
    { name: 'Pending Entry', value: Math.max(0, totalSubmissionsCount - approvedCount - pendingReviewsCount), color: '#94A3B8' }
  ];

  // Chart 2: Environmental Indicators
  const envMetricsData = [
    { name: 'Water (000 KL)', value: 46.2 },
    { name: 'Power (MWh)', value: 480 },
    { name: 'Diesel (KL)', value: 42.1 },
    { name: 'C&D Recycled (MT)', value: 142 },
    { name: 'Trees (x100)', value: 125 }
  ];

  // Chart 3: Social Indicators
  const socMetricsData = [
    { name: 'Safe Hours (M)', value: 18.4 },
    { name: 'LTIFR Rate', value: 0.0 },
    { name: 'CSR (Lakhs)', value: 48.5 },
    { name: 'Workforce (Nos)', value: 4200 },
    { name: 'Training (Hrs/Emp)', value: 34 }
  ];

  // Chart 4: Governance Indicators
  const govMetricsData = [
    { name: 'Clearances (%)', value: 100 },
    { name: 'Ethics (%)', value: 98.5 },
    { name: 'Grievance SLA (%)', value: 94 },
    { name: 'Cyber Incidents', value: 0 },
    { name: 'ESG Vendors (%)', value: 78 }
  ];

  // Chart 5: Subsidiary Comparison
  const subComparisonData = subsidiaries.map(s => ({
    name: s.code.replace('MEIL-', ''),
    completion: s.completionPercentage || 85,
    projects: s.projectsCount
  }));

  // Chart 6: Project Completion
  const projectCompletionData = projects.slice(0, 7).map(p => ({
    name: p.name.length > 14 ? p.name.substring(0, 14) + '...' : p.name,
    score: p.esgCompletion || 85
  }));

  // Chart 7: Monthly Submission Trend
  const monthlyTrendData = [
    { month: 'Apr', submissions: 6, approvals: 5 },
    { month: 'May', submissions: 9, approvals: 8 },
    { month: 'Jun', submissions: 14, approvals: 12 },
    { month: 'Jul', submissions: 17, approvals: 15 },
    { month: 'Aug', submissions: 19, approvals: 17 },
    { month: 'Sep', submissions: 22, approvals: approvedCount }
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: 'Portal' },
          { label: 'Group ESG Dashboard' }
        ]}
      />

      {/* Top Banner with DEMO DATA Notice */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Group ESG & Sustainability Dashboard</h1>
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300 uppercase tracking-wider">
              DEMO DATA
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Enterprise-level ESG performance across Megha Engineering and Infrastructures Limited (MEIL) group entities.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            SEBI BRSR Core Master Console
          </span>
        </div>
      </div>

      {/* Enterprise Multi-Filter Toolbar */}
      <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
        <div>
          <label className="block font-semibold text-slate-600 mb-1">Financial Year</label>
          <select
            value={financialYear}
            onChange={(e) => setFinancialYear(e.target.value)}
            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            <option value="FY 2026-27">FY 2026-27 (Current)</option>
            <option value="FY 2025-26">FY 2025-26</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-slate-600 mb-1">Subsidiary Division</label>
          <select
            value={selectedSubId}
            onChange={(e) => {
              setSelectedSubId(e.target.value);
              setSelectedBuId('');
            }}
            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            <option value="">All Subsidiaries (5)</option>
            {subsidiaries.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold text-slate-600 mb-1">Business Unit</label>
          <select
            value={selectedBuId}
            onChange={(e) => setSelectedBuId(e.target.value)}
            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            <option value="">All Business Units</option>
            {filteredBUs.map(bu => (
              <option key={bu.id} value={bu.id}>{bu.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold text-slate-600 mb-1">Project Site</label>
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium"
          >
            <option value="">All Mega Projects ({totalProjectsCount})</option>
            {filteredProjects.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold text-slate-600 mb-1">ESG Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-semibold"
          >
            <option value="ALL">All Pillars (E, S, G)</option>
            <option value="Environmental">Environmental</option>
            <option value="Social">Social</option>
            <option value="Governance">Governance</option>
          </select>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        <StatCard
          title="Total Projects"
          value={totalProjectsCount}
          subtitle="Covered in Scope"
          icon={FolderKanban}
          variant="navy"
        />
        <StatCard
          title="Completion"
          value={`${reportingCompletion}%`}
          subtitle="BRSR Validated"
          icon={CheckCircle2}
          variant="green"
          trend="+5%"
          trendUp={true}
        />
        <StatCard
          title="Environmental"
          value="88.2%"
          subtitle="Resource Score"
          icon={Leaf}
          variant="green"
        />
        <StatCard
          title="Social Score"
          value="91.4%"
          subtitle="Zero Harm Index"
          icon={Users}
          variant="blue"
        />
        <StatCard
          title="Governance"
          value="96.0%"
          subtitle="Clearance Score"
          icon={Building}
          variant="amber"
        />
        <StatCard
          title="Pending Audit"
          value={pendingReviewsCount}
          subtitle="In Review Queue"
          icon={Clock}
          variant="amber"
        />
        <StatCard
          title="Approved Packs"
          value={approvedCount}
          subtitle="Ready for Filing"
          icon={CheckCircle2}
          variant="purple"
        />
      </div>

      {/* 7 Enterprise Visual Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: ESG Submission Completion */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">1. Submission Completion</h3>
            <span className="text-[10px] text-slate-400 font-mono">SEBI Pipeline</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={completionPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {completionPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Environmental Indicators */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">2. Environmental Metrics</h3>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">Pillar 1</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={envMetricsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 9 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#059669" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Social Indicators */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">3. Social & Safety Metrics</h3>
            <span className="text-[10px] text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded font-bold">Pillar 2</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={socMetricsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 9 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#0284C7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Governance Indicators */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">4. Governance Indicators</h3>
            <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-bold">Pillar 3</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={govMetricsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 9 }} />
                <YAxis domain={[0, 100]} unit="%" tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#D97706" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 5: Subsidiary Comparison */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">5. Subsidiary Comparison</h3>
            <span className="text-[10px] text-slate-400 font-mono">5 Entities</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subComparisonData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis domain={[0, 100]} unit="%" tick={{ fontSize: 10 }} />
                <Tooltip formatter={(value) => [`${value}%`, 'Completion']} />
                <Bar dataKey="completion" fill="#1E3E62" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 6: Project Completion */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">6. Project Completion</h3>
            <span className="text-[10px] text-slate-400 font-mono">Top Sites</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectCompletionData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} unit="%" tick={{ fontSize: 10 }} />
                <YAxis dataKey="name" type="category" width={90} tick={{ fontSize: 9 }} />
                <Tooltip formatter={(value) => [`${value}%`, 'Score']} />
                <Bar dataKey="score" fill="#15803D" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Chart 7: Monthly Submission Trend (Full Width) */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">7. Monthly Group Submission Velocity Trend</h3>
            <p className="text-xs text-slate-500">Cumulative submissions and verification pacing across all divisions</p>
          </div>
          <span className="text-xs font-semibold text-slate-400 font-mono">{financialYear}</span>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyTrendData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="submissions" stroke="#8B5CF6" strokeWidth={2.5} name="Total Submissions" />
              <Line type="monotone" dataKey="approvals" stroke="#059669" strokeWidth={2.5} name="Approved Validations" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
