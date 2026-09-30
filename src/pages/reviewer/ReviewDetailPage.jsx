import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { ConfirmationDialog } from '../../components/ui/ConfirmationDialog';
import {
  FileCheck2,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Download,
  FileText,
  Building2,
  Layers,
  Calendar,
  Eye,
  ArrowLeft,
  UserCheck,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

export const ReviewDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { submissions, projects, reviewSubmission } = useData();
  const { currentUser } = useAuth();

  // Find target submission
  const subm = submissions.find(s => s.id === id) || submissions[0];
  const project = projects.find(p => p.id === subm?.projectId);

  const [reviewerComments, setReviewerComments] = useState(subm?.reviewerComment || '');
  const [commentError, setCommentError] = useState('');
  const [activeEvidenceTab, setActiveEvidenceTab] = useState('pdf'); // 'pdf' | 'metadata'

  // Confirm modals
  const [confirmAction, setConfirmAction] = useState(null); // 'APPROVE' | 'CORRECTION' | 'REJECT'

  const handleApprove = () => {
    reviewSubmission(subm.id, {
      status: 'Approved',
      reviewerComment: reviewerComments || 'Verified against site meter statement and approved for BRSR Core reporting.',
      reviewerName: currentUser?.name || 'Siddharth Sen'
    });
    setConfirmAction(null);
    navigate('/reviewer/pending');
  };

  const handleRequestCorrection = () => {
    if (!reviewerComments.trim()) {
      setCommentError('A specific auditor comment is mandatory when requesting corrections.');
      return;
    }
    reviewSubmission(subm.id, {
      status: 'Correction Required',
      reviewerComment: reviewerComments,
      reviewerName: currentUser?.name || 'Siddharth Sen'
    });
    setConfirmAction(null);
    navigate('/reviewer/pending');
  };

  const handleReject = () => {
    if (!reviewerComments.trim()) {
      setCommentError('Please provide a reason for rejecting this ESG submission.');
      return;
    }
    reviewSubmission(subm.id, {
      status: 'Rejected',
      reviewerComment: reviewerComments,
      reviewerName: currentUser?.name || 'Siddharth Sen'
    });
    setConfirmAction(null);
    navigate('/reviewer/pending');
  };

  if (!subm) {
    return (
      <div className="p-8 text-center text-slate-500">
        Submission not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: 'Reviewer', href: '/reviewer/dashboard' },
          { label: 'Pending Reviews', href: '/reviewer/pending' },
          { label: `Audit: ${subm.indicatorName}` }
        ]}
      />

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/reviewer/pending')}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
            title="Back to queue"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">ESG Data Verification Console</h1>
              <StatusBadge status={subm.status} size="xs" />
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Review ID: <span className="font-mono">{subm.id}</span> • Assigned Auditor: {currentUser?.name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded">
            Submitted: {subm.submittedDate || 'Recent'}
          </span>
        </div>
      </div>

      {commentError && (
        <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span className="font-semibold">{commentError}</span>
          </div>
          <button onClick={() => setCommentError('')} className="font-bold">✕</button>
        </div>
      )}

      {/* 3-COLUMN REVIEW SCREEN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* LEFT COLUMN: Project Information (4 cols) */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-amber-700" />
            <span>Project Information</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Subsidiary</span>
              <p className="font-bold text-slate-900 mt-0.5">{subm.subsidiaryName || 'MEIL Water Projects'}</p>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Business Unit</span>
              <p className="font-medium text-slate-800 mt-0.5">{subm.businessUnitName || 'Irrigation & Water Distribution'}</p>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Project Site</span>
              <p className="font-extrabold text-slate-900 mt-0.5">{subm.projectName}</p>
              <span className="text-[11px] font-mono text-slate-500">{project?.projectId || 'MEIL-PRJ-2024-OD01'}</span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Location</span>
              <p className="text-slate-700 mt-0.5">{project?.location || 'Odisha, India'}</p>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Reporting Window</span>
              <p className="font-bold text-slate-900 font-mono mt-0.5">{subm.reportingPeriod} ({subm.reportingYear || 'FY 2026-27'})</p>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Site Contributor</span>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px]">
                  {subm.contributorName?.charAt(0) || 'C'}
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-xs">{subm.contributorName}</p>
                  <p className="text-[10px] text-slate-400">Site EHS & Data Officer</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: ESG Data (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-emerald-700" />
            <span>Reported ESG Metric</span>
          </h3>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Pillar Category</span>
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {subm.category}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Indicator Code</span>
                <span className="inline-block mt-1 font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                  {subm.indicatorCode}
                </span>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Indicator Name</span>
              <p className="text-base font-bold text-slate-900 mt-0.5">{subm.indicatorName}</p>
            </div>

            {/* Prominent Reported Value Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Field Reported Measurement
              </span>
              <div className="flex items-baseline justify-center gap-2 mt-1">
                <span className="text-3xl font-extrabold text-slate-900 font-mono">
                  {subm.value !== null && subm.value !== undefined ? subm.value.toLocaleString() : '0'}
                </span>
                <span className="text-base font-bold text-emerald-800 font-mono">
                  {subm.unit}
                </span>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Contributor Remarks & Context
              </span>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed text-xs">
                {subm.remarks || 'No specific remarks provided by contributor.'}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-blue-50/50 border border-blue-200/80">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <p className="text-[11px] text-blue-900 leading-tight">
                  SEBI BRSR Core Mandate: Verified figures are incorporated directly into MEIL's annual sustainability report.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Evidence & Preview (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-blue-700" />
                <span>Supporting Proof</span>
              </h3>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Uploaded
              </span>
            </div>

            {subm.evidenceFileName ? (
              <div className="space-y-3">
                {/* Mock File Card */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <FileText className="w-6 h-6 text-emerald-700 shrink-0" />
                    <div className="truncate">
                      <p className="font-bold text-slate-900 text-xs truncate font-mono">{subm.evidenceFileName}</p>
                      <p className="text-[10px] text-slate-500">{subm.evidenceFileSize || '2.4 MB'} • Digital Seal Stamped</p>
                    </div>
                  </div>
                  <a
                    href="#download"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Downloading sample certified evidence file: ${subm.evidenceFileName}`);
                    }}
                    className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-white rounded border border-slate-200 transition-colors shrink-0 ml-2"
                    title="Download Evidence"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>

                {/* Simulated Document Viewer Pane */}
                <div className="rounded-xl border border-slate-200 bg-slate-900 p-4 text-white text-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-[10px] font-mono text-emerald-400">PDF PREVIEW • CERTIFIED</span>
                    <span className="text-[10px] text-slate-400">Page 1 of 1</span>
                  </div>

                  <div className="space-y-1.5 font-mono text-[11px] text-slate-300">
                    <p className="text-white font-bold">MEIL WATER PROJECTS - SITE DISPENSARY / METER LOG</p>
                    <p className="text-[10px] text-slate-400">Site: {subm.projectName}</p>
                    <p className="text-[10px] text-slate-400">Meter Serial: FLW-OD-2024-991A</p>
                    <div className="p-2 rounded bg-slate-800 border border-slate-700 my-2">
                      <p className="text-emerald-400 font-bold">CERTIFIED RECORDED DISCHARGE:</p>
                      <p className="text-lg font-extrabold text-white">
                        {subm.value !== null ? `${subm.value.toLocaleString()} ${subm.unit}` : '25,000 KL'}
                      </p>
                    </div>
                    <p className="text-[10px] text-slate-400">Tested & Verified: M/s State Water Resource Dept.</p>
                    <p className="text-[10px] text-emerald-300">✓ Digital Signature Validated</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-slate-400 border border-dashed border-slate-200 rounded-xl">
                No proof file uploaded for this submission.
              </div>
            )}
          </div>

          <div className="pt-3 text-[11px] text-slate-400 text-center">
            Verification complies with ISO 14064 GHG verification protocols.
          </div>
        </div>
      </div>

      {/* BOTTOM ACTION PANEL: Auditor Comments & Verification Decision */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <FileCheck2 className="w-4 h-4 text-amber-700" />
          <span>Auditor Review Assessment & Verification Decision</span>
        </h3>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Reviewer Audit Notes / Instructions for Contributor
          </label>
          <textarea
            rows={3}
            value={reviewerComments}
            onChange={(e) => {
              setReviewerComments(e.target.value);
              setCommentError('');
            }}
            placeholder="Document audit remarks, cross-checks performed against billing receipts, or specific reasons if requesting revision..."
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            Select one of the 3 formal decisions to update the ESG reporting register:
          </p>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Reject Button */}
            <button
              type="button"
              onClick={() => setConfirmAction('REJECT')}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold rounded-lg transition-colors"
            >
              <XCircle className="w-4 h-4" />
              <span>Reject</span>
            </button>

            {/* Request Correction Button */}
            <button
              type="button"
              onClick={() => setConfirmAction('CORRECTION')}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Request Correction</span>
            </button>

            {/* Approve Button */}
            <button
              type="button"
              onClick={() => setConfirmAction('APPROVE')}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Approve Submission</span>
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Dialogs */}
      <ConfirmationDialog
        isOpen={confirmAction === 'APPROVE'}
        onClose={() => setConfirmAction(null)}
        onConfirm={handleApprove}
        title="Approve ESG Data Submission"
        message={`Confirm approval of ${subm.indicatorName} (${subm.value} ${subm.unit}) for ${subm.projectName}. This metric will be validated and promoted to the executive BRSR approval pack.`}
        confirmText="Confirm & Approve"
        type="success"
      />

      <ConfirmationDialog
        isOpen={confirmAction === 'CORRECTION'}
        onClose={() => setConfirmAction(null)}
        onConfirm={handleRequestCorrection}
        title="Request Correction from Site"
        message="This will return the submission to the contributor with your audit note. Contributor will be notified to revise measurements or re-upload stamped evidence."
        confirmText="Send Correction Request"
        type="warning"
      />

      <ConfirmationDialog
        isOpen={confirmAction === 'REJECT'}
        onClose={() => setConfirmAction(null)}
        onConfirm={handleReject}
        title="Reject Submission"
        message="Are you sure you want to reject this data point? This marks the entry as invalid in the audit logs."
        confirmText="Reject Data"
        type="danger"
      />
    </div>
  );
};
