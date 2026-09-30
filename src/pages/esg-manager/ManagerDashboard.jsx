import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/ui/StatCard';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import {
  FolderKanban,
  Tag,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  ClipboardList,
  Leaf,
  Users,
  Building,
  TrendingUp
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

export const ManagerDashboard = () => {
  const { projects, indicators, submissions } = useData();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Filter metrics
  const activeProjectsCount = projects.length;
  const totalIndicatorsCount = indicators.length;

  const totalSubmissions = submissions.length;
  const approvedSubmissions = submissions.filter(s => s.status === 'Approved').length;
  const pendingSubmissions = submissions.filter(s => s.status === 'In Progress' || s.status === 'Not Started').length;
  const underReviewSubmissions = submissions.filter(s => s.status === 'Submitted' || s.status === 'Under Review').length;

  const overallCompletion = Math.round((approvedSubmissions / (totalSubmissions || 1)) * 100);

  // Projects Chart Data
  const projectChartData = projects.slice(0, 5).map(p => ({
    name: p.name.length > 15 ? p.name.substring(0, 15) + '...' : p.name,
    completion: p.esgCompletion || 80
  }));

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">ESG Manager Workstation</h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
              Workflow Control
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Welcome, <span className="font-semibold text-slate-700">{currentUser?.name}</span>. Manage data assignments, verify site deadlines, and drive ESG reporting completion.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/manager/data-collection"
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
          >
            <ClipboardList className="w-4 h-4" />
            <span>Assign Indicator Data</span>
          </Link>

          <Link
            to="/manager/monitor-submissions"
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
          >
            <span>Monitor Submissions</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Assigned Subsidiaries"
          value="5 Divisions"
          subtitle="Enterprise Coverage"
          icon={Building}
          variant="navy"
          onClick={() => navigate('/manager/projects')}
        />
        <StatCard
          title="Active Projects"
          value={activeProjectsCount}
          subtitle="Infrastructure Sites"
          icon={FolderKanban}
          variant="blue"
          onClick={() => navigate('/manager/projects')}
        />
        <StatCard
          title="Total ESG Indicators"
          value={totalIndicatorsCount}
          subtitle="E, S, G Parameters"
          icon={Tag}
          variant="green"
          onClick={() => navigate('/manager/data-collection')}
        />
        <StatCard
          title="Data Completion"
          value={`${overallCompletion}%`}
          subtitle="Toward BRSR Sign-Off"
          icon={CheckCircle2}
          variant="purple"
          trend="+8% this week"
          trendUp={true}
        />
      </div>

      {/* Pipeline Status Breakdown */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Submission Pipeline Status</h3>
            <p className="text-xs text-slate-500">Live operational status of all data points across sites</p>
          </div>
          <Link to="/manager/monitor-submissions" className="text-xs font-semibold text-teal-700 hover:underline">
            View all submissions →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs text-slate-500 font-semibold block">Pending Site Entry</span>
            <span className="text-2xl font-extrabold text-slate-800 mt-1 block">{pendingSubmissions}</span>
            <span className="text-[11px] text-slate-400">Assigned with deadlines</span>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200">
            <span className="text-xs text-amber-800 font-semibold block">Under Review / Audit</span>
            <span className="text-2xl font-extrabold text-amber-900 mt-1 block">{underReviewSubmissions}</span>
            <span className="text-[11px] text-amber-600">Pending reviewer action</span>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200">
            <span className="text-xs text-emerald-800 font-semibold block">Approved Data</span>
            <span className="text-2xl font-extrabold text-emerald-900 mt-1 block">{approvedSubmissions}</span>
            <span className="text-[11px] text-emerald-600">Evidence verified</span>
          </div>

          <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200">
            <span className="text-xs text-rose-800 font-semibold block">Corrections Needed</span>
            <span className="text-2xl font-extrabold text-rose-900 mt-1 block">
              {submissions.filter(s => s.status === 'Correction Required').length}
            </span>
            <span className="text-[11px] text-rose-600">Sent back to contributors</span>
          </div>
        </div>
      </div>

      {/* Middle Row: ESG Category Progress & Project Completion Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ESG Category Progress */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">ESG Category Progress</h3>
            <p className="text-xs text-slate-500">Aggregate completion by ESG reporting pillar</p>
          </div>

          <div className="space-y-4 pt-2">
            <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-emerald-700" />
                  <span className="text-xs font-bold text-emerald-900">Environmental Pillar</span>
                </div>
                <span className="text-xs font-extrabold text-emerald-800">82%</span>
              </div>
              <ProgressBar value={82} colorScheme="green" size="md" showPercentage={false} />
              <p className="text-[11px] text-slate-500 mt-2">
                Water, fuel & electricity logs progressing on schedule; hazardous waste manifests awaiting certification.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-sky-50/50 border border-sky-100">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-sky-700" />
                  <span className="text-xs font-bold text-sky-900">Social Pillar</span>
                </div>
                <span className="text-xs font-extrabold text-sky-800">75%</span>
              </div>
              <ProgressBar value={75} colorScheme="blue" size="md" showPercentage={false} />
              <p className="text-[11px] text-slate-500 mt-2">
                Zero Harm safety metrics verified; subcontractor training hour tallies pending HR payroll integration.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-100">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-amber-700" />
                  <span className="text-xs font-bold text-amber-900">Governance Pillar</span>
                </div>
                <span className="text-xs font-extrabold text-amber-800">91%</span>
              </div>
              <ProgressBar value={91} colorScheme="amber" size="md" showPercentage={false} />
              <p className="text-[11px] text-slate-500 mt-2">
                Statutory EC clearances, anti-corruption training certifications, and grievance redressal logged.
              </p>
            </div>
          </div>
        </div>

        {/* Project Completion Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Priority Projects Completion</h3>
              <p className="text-xs text-slate-500">Readiness for BRSR executive sign-off</p>
            </div>
            <Link to="/manager/projects" className="text-xs font-semibold text-teal-700 hover:underline">
              View all sites →
            </Link>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis domain={[0, 100]} unit="%" tick={{ fontSize: 11 }} />
                <Tooltip formatter={(value) => [`${value}%`, 'Completion']} />
                <Bar dataKey="completion" fill="#0F766E" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Pending Actions Feed */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-bold text-slate-900">Pending Actions & Work items</h3>
          </div>
          <span className="text-xs font-semibold text-slate-400">Action items requiring coordinator review</span>
        </div>

        <div className="divide-y divide-slate-100">
          <div className="py-3 flex items-center justify-between gap-4 text-xs">
            <div className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
              <div>
                <p className="font-bold text-slate-900">Project Odisha-01 - Water Consumption data submission pending</p>
                <p className="text-slate-500 text-[11px] mt-0.5">Assigned to Rahul Verma. Due on 30 Sep 2026.</p>
              </div>
            </div>
            <Link
              to="/manager/monitor-submissions"
              className="text-xs font-semibold text-teal-700 hover:underline whitespace-nowrap"
            >
              Check Status →
            </Link>
          </div>

          <div className="py-3 flex items-center justify-between gap-4 text-xs">
            <div className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
              <div>
                <p className="font-bold text-slate-900">Metro Infrastructure Project - Grid Electricity bills under review</p>
                <p className="text-slate-500 text-[11px] mt-0.5">Submitted by Kavita Singhal. Reviewer Siddharth Sen verifying DISCOM slabs.</p>
              </div>
            </div>
            <Link
              to="/manager/monitor-submissions"
              className="text-xs font-semibold text-teal-700 hover:underline whitespace-nowrap"
            >
              Monitor Review →
            </Link>
          </div>

          <div className="py-3 flex items-center justify-between gap-4 text-xs">
            <div className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0" />
              <div>
                <p className="font-bold text-slate-900">Solar Energy Project - Diesel consumption statement returned for correction</p>
                <p className="text-slate-500 text-[11px] mt-0.5">IOCL stamped voucher requested. Contributor notified.</p>
              </div>
            </div>
            <Link
              to="/manager/monitor-submissions"
              className="text-xs font-semibold text-teal-700 hover:underline whitespace-nowrap"
            >
              View Correction →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
