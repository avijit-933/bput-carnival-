import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { DataTable } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Modal } from '../../components/ui/Modal';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import {
  FileCheck2,
  Filter,
  Eye,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Calendar,
  Building2
} from 'lucide-react';

export const MonitorSubmissionsPage = () => {
  const { submissions, projects } = useData();

  const [selectedSub, setSelectedSub] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredSubmissions = submissions.filter(s => {
    if (statusFilter === 'ALL') return true;
    return s.status.toLowerCase().includes(statusFilter.toLowerCase());
  });

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
      key: 'indicatorName',
      header: 'Indicator & Category',
      sortable: true,
      render: (row) => (
        <div>
          <span className="font-semibold text-slate-800 block">{row.indicatorName}</span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1 rounded">
              {row.indicatorCode}
            </span>
            <span className="text-[10px] text-slate-500 font-medium">({row.category})</span>
          </div>
        </div>
      )
    },
    {
      key: 'contributorName',
      header: 'Assigned Contributor',
      sortable: true,
      render: (row) => (
        <span className="text-slate-700 font-medium">{row.contributorName}</span>
      )
    },
    {
      key: 'reportingPeriod',
      header: 'Period Window',
      sortable: true,
      render: (row) => (
        <span className="text-slate-600 font-mono text-[11px]">{row.reportingPeriod}</span>
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
          <span className="text-slate-400 italic text-[11px]">Pending Entry</span>
        )
      )
    },
    {
      key: 'submittedDate',
      header: 'Submitted Date',
      sortable: true,
      render: (row) => (
        <span className="text-slate-500 font-mono text-[11px]">
          {row.submittedDate || '—'}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Audit Status',
      sortable: true,
      render: (row) => <StatusBadge status={row.status} size="xs" />
    },
    {
      key: 'actions',
      header: 'Action',
      render: (row) => (
        <button
          onClick={() => {
            setSelectedSub(row);
            setIsDetailModalOpen(true);
          }}
          className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Audit Log</span>
        </button>
      )
    }
  ];

  return (
    <div className="space-y-5">
      <Breadcrumb
        items={[
          { label: 'ESG Manager', href: '/manager/dashboard' },
          { label: 'Submissions Monitor' }
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Monitor Site ESG Submissions</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time tracking of contributor data inputs, evidence attachments, and reviewer validation progress.
          </p>
        </div>

        {/* Filter Pill Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg text-xs overflow-x-auto max-w-full">
          {['ALL', 'Submitted', 'Under Review', 'Approved', 'Correction Required', 'In Progress'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                statusFilter === st
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredSubmissions}
        searchPlaceholder="Filter submissions by project, indicator, or contributor..."
        searchKeys={['projectName', 'indicatorName', 'contributorName', 'indicatorCode', 'status']}
        defaultPageSize={10}
      />

      {/* Submission Audit Details Modal */}
      {selectedSub && (
        <Modal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          title={`Audit Record: ${selectedSub.indicatorName}`}
          subtitle={`Project: ${selectedSub.projectName} (${selectedSub.indicatorCode})`}
          footer={
            <button
              onClick={() => setIsDetailModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
            >
              Close Record
            </button>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-400 block font-medium">Reported Value</span>
                <span className="text-base font-extrabold text-slate-900 font-mono">
                  {selectedSub.value !== null ? `${selectedSub.value.toLocaleString()} ${selectedSub.unit}` : 'Not yet reported'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Audit Status</span>
                <StatusBadge status={selectedSub.status} size="sm" className="mt-1" />
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Assigned Contributor</span>
                <span className="text-slate-800 font-semibold">{selectedSub.contributorName}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Submission Deadline</span>
                <span className="text-slate-800 font-mono">{selectedSub.deadline}</span>
              </div>
            </div>

            {selectedSub.evidenceFileName && (
              <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-700" />
                  <div>
                    <span className="font-bold text-emerald-950 block">{selectedSub.evidenceFileName}</span>
                    <span className="text-[10px] text-emerald-700 font-mono">{selectedSub.evidenceFileSize} • Stamped Proof</span>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  Proof Attached
                </span>
              </div>
            )}

            {selectedSub.reviewerComment && (
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                <span className="font-bold text-amber-900 block mb-0.5">Reviewer Feedback:</span>
                <p className="text-amber-800 leading-relaxed">{selectedSub.reviewerComment}</p>
              </div>
            )}

            {/* Lifecycle History */}
            {selectedSub.history && (
              <div>
                <p className="font-bold text-slate-900 mb-2">Submission Timeline & History</p>
                <div className="space-y-2 border-l-2 border-slate-200 pl-3">
                  {selectedSub.history.map((h, idx) => (
                    <div key={idx} className="relative text-xs">
                      <div className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-teal-600 ring-2 ring-white" />
                      <p className="font-semibold text-slate-800">{h.action}</p>
                      <span className="text-[10px] text-slate-400 font-mono">{h.date} by {h.by}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
