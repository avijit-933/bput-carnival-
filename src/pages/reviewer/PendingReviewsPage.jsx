import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { DataTable } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { FileCheck2, FileText, ArrowRight, ShieldCheck } from 'lucide-react';

export const PendingReviewsPage = () => {
  const { submissions } = useData();
  const navigate = useNavigate();

  // All submissions needing verification
  const pendingSubmissions = submissions.filter(s =>
    s.status === 'Submitted' || s.status === 'Under Review' || s.status === 'In Progress'
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
      key: 'contributorName',
      header: 'Site Contributor',
      sortable: true,
      render: (row) => <span className="text-slate-800 font-medium">{row.contributorName}</span>
    },
    {
      key: 'indicatorName',
      header: 'Indicator & Code',
      sortable: true,
      render: (row) => (
        <div>
          <span className="font-semibold text-slate-900 block">{row.indicatorName}</span>
          <span className="text-[11px] font-mono text-slate-500">{row.indicatorCode} ({row.category})</span>
        </div>
      )
    },
    {
      key: 'value',
      header: 'Reported Metric',
      sortable: true,
      render: (row) => (
        row.value !== null && row.value !== undefined ? (
          <span className="font-mono font-bold text-slate-900">
            {row.value.toLocaleString()} {row.unit}
          </span>
        ) : (
          <span className="text-slate-400 italic">Draft</span>
        )
      )
    },
    {
      key: 'submittedDate',
      header: 'Submitted Date',
      sortable: true,
      render: (row) => (
        <span className="text-slate-500 font-mono text-xs">{row.submittedDate || '—'}</span>
      )
    },
    {
      key: 'evidenceFileName',
      header: 'Evidence Stamped',
      render: (row) => (
        row.evidenceFileName ? (
          <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-medium">
            <FileText className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate max-w-[140px] font-mono">{row.evidenceFileName}</span>
          </div>
        ) : (
          <span className="text-slate-400 text-xs italic">Missing Evidence</span>
        )
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
          to={`/reviewer/review-data/${row.id}`}
          className="inline-flex items-center gap-1 px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs rounded-lg shadow-xs transition-colors"
        >
          <FileCheck2 className="w-3.5 h-3.5" />
          <span>Review</span>
        </Link>
      )
    }
  ];

  return (
    <div className="space-y-5">
      <Breadcrumb
        items={[
          { label: 'Reviewer', href: '/reviewer/dashboard' },
          { label: 'Pending Reviews' }
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Pending ESG Data Verification Queue</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Conduct 3-point audit checks: Verify calculation accuracy, check stamped manifests, and approve or reject submissions.
          </p>
        </div>

        <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
          {pendingSubmissions.length} Records In Queue
        </span>
      </div>

      <DataTable
        columns={columns}
        data={pendingSubmissions}
        searchPlaceholder="Search pending submissions by site, indicator or contributor..."
        searchKeys={['projectName', 'indicatorName', 'contributorName', 'indicatorCode']}
        defaultPageSize={10}
      />
    </div>
  );
};
