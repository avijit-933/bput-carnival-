import React from 'react';
import { useData } from '../../context/DataContext';
import { DataTable } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { History, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';

export const ReviewHistoryPage = () => {
  const { submissions } = useData();

  // All reviewed submissions
  const reviewedSubmissions = submissions.filter(s =>
    s.status === 'Approved' || s.status === 'Rejected' || s.status === 'Correction Required'
  );

  const columns = [
    {
      key: 'indicatorName',
      header: 'Indicator & Code',
      sortable: true,
      render: (row) => (
        <div>
          <span className="font-bold text-slate-900 block">{row.indicatorName}</span>
          <span className="text-[11px] font-mono text-slate-500">{row.indicatorCode} ({row.category})</span>
        </div>
      )
    },
    {
      key: 'projectName',
      header: 'Project Site',
      sortable: true,
      render: (row) => (
        <span className="text-slate-800 font-medium">{row.projectName}</span>
      )
    },
    {
      key: 'value',
      header: 'Verified Value',
      sortable: true,
      render: (row) => (
        <span className="font-mono font-bold text-slate-900">
          {row.value !== null ? `${row.value.toLocaleString()} ${row.unit}` : '—'}
        </span>
      )
    },
    {
      key: 'reviewedDate',
      header: 'Audit Review Date',
      sortable: true,
      render: (row) => <span className="font-mono text-slate-500 text-xs">{row.reviewedDate || row.submittedDate}</span>
    },
    {
      key: 'reviewerName',
      header: 'Auditor',
      sortable: true,
      render: (row) => <span className="text-slate-700 font-medium">{row.reviewerName || 'Siddharth Sen'}</span>
    },
    {
      key: 'status',
      header: 'Audit Outcome',
      sortable: true,
      render: (row) => <StatusBadge status={row.status} size="xs" />
    },
    {
      key: 'reviewerComment',
      header: 'Auditor Remarks',
      render: (row) => (
        <span className="text-xs text-slate-600 block max-w-xs truncate">
          {row.reviewerComment || 'Verified against billing statement'}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-5">
      <Breadcrumb
        items={[
          { label: 'Reviewer', href: '/reviewer/dashboard' },
          { label: 'Review History' }
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">ESG Compliance Review History</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Historical audit logs of approved, returned, and rejected submissions across all MEIL infrastructure divisions.
          </p>
        </div>

        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
          {reviewedSubmissions.length} Audited Items
        </span>
      </div>

      <DataTable
        columns={columns}
        data={reviewedSubmissions}
        searchPlaceholder="Search audit history by indicator, project or auditor..."
        searchKeys={['indicatorName', 'projectName', 'reviewerComment', 'indicatorCode', 'status']}
        defaultPageSize={10}
      />
    </div>
  );
};
