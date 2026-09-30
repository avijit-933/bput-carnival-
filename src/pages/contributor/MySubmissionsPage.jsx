import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { DataTable } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Modal } from '../../components/ui/Modal';
import {
  CheckCircle2,
  AlertTriangle,
  FileText,
  Edit3,
  Eye,
  RotateCcw,
  Clock
} from 'lucide-react';

export const MySubmissionsPage = () => {
  const { submissions } = useData();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [selectedSubm, setSelectedSubm] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Submissions submitted by user or all site submissions
  const mySubmissions = submissions.filter(s =>
    s.contributorId === currentUser?.id || s.contributorName === currentUser?.name || currentUser?.role === 'ADMIN'
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
      header: 'Submitted Metric',
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
        <span className="text-slate-500 font-mono text-xs">{row.submittedDate || 'Saved'}</span>
      )
    },
    {
      key: 'status',
      header: 'Validation Status',
      sortable: true,
      render: (row) => <StatusBadge status={row.status} size="xs" />
    },
    {
      key: 'reviewerComment',
      header: 'Reviewer Feedback',
      render: (row) => (
        row.reviewerComment ? (
          <div className="max-w-xs">
            <span className="text-xs text-amber-900 font-medium block truncate">
              {row.reviewerComment}
            </span>
          </div>
        ) : (
          <span className="text-slate-400 text-xs italic">Awaiting review</span>
        )
      )
    },
    {
      key: 'actions',
      header: 'Action',
      render: (row) => {
        const needsCorrection = row.status === 'Correction Required' || row.status === 'Rejected';
        return (
          <div className="flex items-center gap-1.5">
            {needsCorrection ? (
              <Link
                to={`/contributor/enter-data?submissionId=${row.id}`}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs rounded transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Edit & Resubmit</span>
              </Link>
            ) : (
              <button
                onClick={() => {
                  setSelectedSubm(row);
                  setIsDetailOpen(true);
                }}
                className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View</span>
              </button>
            )}
          </div>
        );
      }
    }
  ];

  return (
    <div className="space-y-5">
      <Breadcrumb
        items={[
          { label: 'Contributor', href: '/contributor/dashboard' },
          { label: 'My Submissions' }
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Submitted Field ESG Records</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Track verification by Lead ESG Compliance Auditors, view auditor remarks, or revise returned entries.
          </p>
        </div>

        <Link
          to="/contributor/enter-data"
          className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
        >
          <Edit3 className="w-4 h-4" />
          <span>New Submission</span>
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={mySubmissions}
        searchPlaceholder="Filter submissions by indicator, project or status..."
        searchKeys={['indicatorName', 'projectName', 'status', 'reviewerComment']}
        defaultPageSize={10}
      />

      {/* Details Modal */}
      {selectedSubm && (
        <Modal
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          title={`Submission: ${selectedSubm.indicatorName}`}
          subtitle={`Project Site: ${selectedSubm.projectName}`}
          footer={
            <button
              onClick={() => setIsDetailOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
            >
              Close
            </button>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-400 block font-medium">Metric Value</span>
                <span className="text-base font-extrabold text-slate-900 font-mono">
                  {selectedSubm.value !== null ? `${selectedSubm.value.toLocaleString()} ${selectedSubm.unit}` : 'Draft'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Status</span>
                <StatusBadge status={selectedSubm.status} size="sm" className="mt-1" />
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Reporting Period</span>
                <span className="text-slate-800 font-mono">{selectedSubm.reportingPeriod}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Submitted Date</span>
                <span className="text-slate-800 font-mono">{selectedSubm.submittedDate || '—'}</span>
              </div>
            </div>

            {selectedSubm.evidenceFileName && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-700" />
                  <div>
                    <span className="font-bold text-emerald-950 block">{selectedSubm.evidenceFileName}</span>
                    <span className="text-[10px] text-emerald-700 font-mono">{selectedSubm.evidenceFileSize}</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  Audit Verified Proof
                </span>
              </div>
            )}

            {selectedSubm.remarks && (
              <div>
                <span className="font-bold text-slate-700 block mb-1">Contributor Remarks:</span>
                <p className="text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200 leading-relaxed">
                  {selectedSubm.remarks}
                </p>
              </div>
            )}

            {selectedSubm.reviewerComment && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <span className="font-bold text-amber-900 block mb-0.5">Auditor Feedback:</span>
                <p className="text-amber-800">{selectedSubm.reviewerComment}</p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
