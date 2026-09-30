import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { DataTable } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { ClipboardList, Edit3, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

export const MyAssignmentsPage = () => {
  const { submissions } = useData();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Assignments
  const myAssignments = submissions.filter(s =>
    s.contributorId === currentUser?.id || s.contributorName === currentUser?.name || currentUser?.role === 'ADMIN'
  );

  const columns = [
    {
      key: 'projectName',
      header: 'Project Site',
      sortable: true,
      render: (row) => (
        <div>
          <span className="font-bold text-slate-900 block">{row.projectName}</span>
          <span className="text-[11px] text-slate-500">{row.subsidiaryName}</span>
        </div>
      )
    },
    {
      key: 'category',
      header: 'Category',
      sortable: true,
      render: (row) => (
        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
          {row.category}
        </span>
      )
    },
    {
      key: 'indicatorName',
      header: 'Indicator & Code',
      sortable: true,
      render: (row) => (
        <div>
          <span className="font-semibold text-slate-900 block">{row.indicatorName}</span>
          <span className="text-[11px] font-mono text-slate-500">{row.indicatorCode} ({row.unit})</span>
        </div>
      )
    },
    {
      key: 'reportingPeriod',
      header: 'Reporting Period',
      sortable: true,
      render: (row) => <span className="text-slate-600 font-mono text-xs">{row.reportingPeriod}</span>
    },
    {
      key: 'deadline',
      header: 'Deadline',
      sortable: true,
      render: (row) => (
        <span className="font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded text-xs font-semibold border border-amber-200">
          {row.deadline}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Current Status',
      sortable: true,
      render: (row) => <StatusBadge status={row.status} size="xs" />
    },
    {
      key: 'actions',
      header: 'Action',
      render: (row) => (
        <Link
          to={`/contributor/enter-data?submissionId=${row.id}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-lg shadow-xs transition-colors"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Enter Data</span>
        </Link>
      )
    }
  ];

  return (
    <div className="space-y-5">
      <Breadcrumb
        items={[
          { label: 'Contributor', href: '/contributor/dashboard' },
          { label: 'My Assignments' }
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Assigned Site ESG Data Requirements</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Review allocated environmental and safety indicators, verify submission deadlines, and submit verified measurements.
          </p>
        </div>

        <Link
          to="/contributor/enter-data"
          className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
        >
          <Edit3 className="w-4 h-4" />
          <span>Quick Data Entry</span>
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={myAssignments}
        searchPlaceholder="Search assignments by indicator, project, or category..."
        searchKeys={['indicatorName', 'projectName', 'category', 'indicatorCode', 'status']}
        defaultPageSize={10}
      />
    </div>
  );
};
