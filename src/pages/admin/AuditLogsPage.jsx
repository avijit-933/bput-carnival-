import React from 'react';
import { useData } from '../../context/DataContext';
import { DataTable } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { History, Shield, Laptop, Filter } from 'lucide-react';

export const AuditLogsPage = () => {
  const { auditLogs } = useData();

  const columns = [
    {
      key: 'timestamp',
      header: 'Timestamp',
      sortable: true,
      render: (row) => (
        <span className="font-mono text-[11px] text-slate-500 whitespace-nowrap">
          {row.timestamp}
        </span>
      )
    },
    {
      key: 'user',
      header: 'User Account',
      sortable: true,
      render: (row) => (
        <span className="font-semibold text-slate-900 block">{row.user}</span>
      )
    },
    {
      key: 'action',
      header: 'Governance Action',
      sortable: true,
      render: (row) => (
        <span className="text-slate-800 font-medium">{row.action}</span>
      )
    },
    {
      key: 'module',
      header: 'System Module',
      sortable: true,
      render: (row) => (
        <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[10px] text-slate-700">
          {row.module}
        </span>
      )
    },
    {
      key: 'record',
      header: 'Target Record / Details',
      render: (row) => (
        <span className="text-slate-600 text-xs truncate max-w-xs block font-mono">
          {row.record}
        </span>
      )
    },
    {
      key: 'ipDevice',
      header: 'IP / Terminal',
      render: (row) => (
        <span className="text-slate-400 text-[11px] font-mono">
          {row.ipDevice}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Result',
      sortable: true,
      render: (row) => <StatusBadge status={row.status || 'Success'} size="xs" />
    }
  ];

  return (
    <div className="space-y-5">
      <Breadcrumb
        items={[
          { label: 'Admin', href: '/admin/dashboard' },
          { label: 'Audit & Governance' },
          { label: 'System Audit Logs' }
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">System Audit & Compliance Logs</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Immutable SEBI-compliant audit trail capturing project onboardings, indicator assignments, data submissions, and reviews.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Immutable Audit Trail Active
          </span>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={auditLogs}
        searchPlaceholder="Filter logs by user, action, module or record..."
        searchKeys={['user', 'action', 'module', 'record', 'timestamp']}
        defaultPageSize={10}
      />
    </div>
  );
};
