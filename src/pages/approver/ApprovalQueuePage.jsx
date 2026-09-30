import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { DataTable } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { FileCheck2, ArrowRight, ShieldCheck } from 'lucide-react';

export const ApprovalQueuePage = () => {
  const { projects } = useData();
  const navigate = useNavigate();

  // Projects formatted for approval queue
  const queueData = projects.map(p => ({
    ...p,
    reportingPeriod: 'FY 2026-27 (Interim)',
    reviewerStatus: p.esgCompletion >= 90 ? 'Audited & Recommended' : 'Partially Audited',
    submittedDate: '2026-09-28'
  }));

  const columns = [
    {
      key: 'subsidiaryName',
      header: 'Subsidiary & Division',
      sortable: true,
      render: (row) => (
        <div>
          <span className="font-bold text-slate-900 block">{row.subsidiaryName}</span>
          <span className="text-[11px] text-slate-500">{row.businessUnitName}</span>
        </div>
      )
    },
    {
      key: 'name',
      header: 'Project Site',
      sortable: true,
      render: (row) => (
        <div>
          <span className="font-bold text-slate-900 block">{row.name}</span>
          <span className="text-[11px] font-mono text-slate-500">{row.projectId}</span>
        </div>
      )
    },
    {
      key: 'reportingPeriod',
      header: 'Reporting Period',
      sortable: true,
      render: (row) => <span className="font-mono text-slate-600 text-xs">{row.reportingPeriod}</span>
    },
    {
      key: 'esgCompletion',
      header: 'ESG Completion',
      sortable: true,
      render: (row) => (
        <div className="w-28">
          <ProgressBar value={row.esgCompletion || 85} size="sm" showPercentage={true} />
        </div>
      )
    },
    {
      key: 'reviewerStatus',
      header: 'Reviewer Status',
      sortable: true,
      render: (row) => (
        <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
          row.reviewerStatus.includes('Recommended')
            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
            : 'bg-amber-50 text-amber-800 border-amber-200'
        }`}>
          {row.reviewerStatus}
        </span>
      )
    },
    {
      key: 'submittedDate',
      header: 'Audit Sign-Off Date',
      sortable: true,
      render: (row) => <span className="text-slate-500 font-mono text-xs">{row.submittedDate}</span>
    },
    {
      key: 'actions',
      header: 'Action',
      render: (row) => (
        <Link
          to={`/approver/final-review/${row.id}`}
          className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-900 hover:bg-purple-950 text-white font-semibold text-xs rounded-lg shadow-xs transition-colors"
        >
          <FileCheck2 className="w-3.5 h-3.5" />
          <span>Review Dossier</span>
        </Link>
      )
    }
  ];

  return (
    <div className="space-y-5">
      <Breadcrumb
        items={[
          { label: 'Executive Approver', href: '/approver/dashboard' },
          { label: 'Approval Queue' }
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Executive BRSR Approval Queue</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Dossiers recommended by Lead ESG Compliance Auditors awaiting final executive confirmation.
          </p>
        </div>

        <span className="text-xs font-bold text-purple-800 bg-purple-50 px-3 py-1.5 rounded-full border border-purple-200">
          {queueData.length} Projects in Dossier Queue
        </span>
      </div>

      <DataTable
        columns={columns}
        data={queueData}
        searchPlaceholder="Filter queue by project, subsidiary or reviewer status..."
        searchKeys={['name', 'subsidiaryName', 'projectId', 'reviewerStatus']}
        defaultPageSize={10}
      />
    </div>
  );
};
