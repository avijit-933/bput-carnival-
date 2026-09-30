import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { DataTable } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { CheckCircle2, FileText, Download, Printer, ShieldCheck } from 'lucide-react';

export const ApprovedReportsPage = () => {
  const { projects } = useData();
  const navigate = useNavigate();

  // Filter approved / high-completion projects
  const approvedProjects = projects.filter(p => (p.esgCompletion || 0) >= 80);

  const columns = [
    {
      key: 'name',
      header: 'Project Name & ID',
      sortable: true,
      render: (row) => (
        <div>
          <span className="font-bold text-slate-900 block">{row.name}</span>
          <span className="text-[11px] font-mono text-slate-500">{row.projectId}</span>
        </div>
      )
    },
    {
      key: 'subsidiaryName',
      header: 'Subsidiary Division',
      sortable: true,
      render: (row) => <span className="text-slate-800 font-medium">{row.subsidiaryName}</span>
    },
    {
      key: 'location',
      header: 'Location',
      sortable: true,
      render: (row) => <span className="text-slate-600">{row.location}</span>
    },
    {
      key: 'esgCompletion',
      header: 'ESG Score',
      sortable: true,
      render: (row) => (
        <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          {row.esgCompletion}% Compliant
        </span>
      )
    },
    {
      key: 'status',
      header: 'Statutory Status',
      render: () => <StatusBadge status="Approved" size="xs" />
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-2">
          <Link
            to="/brsr-report"
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>View BRSR Dossier</span>
          </Link>
          <button
            onClick={() => window.print()}
            className="p-1 text-slate-500 hover:text-slate-800 rounded border border-slate-200 hover:bg-slate-50"
            title="Print Report"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-5">
      <Breadcrumb
        items={[
          { label: 'Approver', href: '/approver/dashboard' },
          { label: 'Approved BRSR Reports' }
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Authorized ESG & BRSR Reports</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Published reports signed off by the Executive Director, ready for regulatory filing and stakeholder publication.
          </p>
        </div>

        <Link
          to="/brsr-report"
          className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-lg shadow-xs transition-colors"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Consolidated Enterprise Statement</span>
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={approvedProjects}
        searchPlaceholder="Search approved dossiers by project or subsidiary..."
        searchKeys={['name', 'subsidiaryName', 'location', 'projectId']}
        defaultPageSize={10}
      />
    </div>
  );
};
