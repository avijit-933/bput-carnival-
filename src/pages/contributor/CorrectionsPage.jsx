import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { AlertTriangle, RotateCcw, FileText, CheckCircle2, MessageSquare } from 'lucide-react';

export const CorrectionsPage = () => {
  const { submissions } = useData();
  const { currentUser } = useAuth();

  const correctionsNeeded = submissions.filter(s =>
    (s.status === 'Correction Required' || s.status === 'Rejected') &&
    (s.contributorId === currentUser?.id || s.contributorName === currentUser?.name || currentUser?.role === 'ADMIN')
  );

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: 'Contributor', href: '/contributor/dashboard' },
          { label: 'Correction Requests' }
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Audit Corrections & Resubmissions</h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
              {correctionsNeeded.length} Pending Actions
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Review Lead Auditor requests, upload rectified supporting bills or manifests, and resubmit for verification.
          </p>
        </div>
      </div>

      {correctionsNeeded.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-xs">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Zero Pending Corrections!</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            All submitted project ESG indicators have passed audit validation or are actively under review.
          </p>
          <div className="mt-4">
            <Link
              to="/contributor/assignments"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-lg transition-colors"
            >
              <span>Back to My Assignments</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {correctionsNeeded.map((subm) => (
            <div
              key={subm.id}
              className="bg-white rounded-xl border border-amber-200 shadow-xs p-5 hover:border-amber-300 transition-colors space-y-4"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-slate-900">{subm.indicatorName}</span>
                    <span className="font-mono text-xs text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">
                      {subm.indicatorCode}
                    </span>
                    <StatusBadge status={subm.status} size="xs" />
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Project: <strong className="text-slate-800">{subm.projectName}</strong> • Reporting Window: {subm.reportingPeriod}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 block font-medium">Currently Reported</span>
                  <span className="text-base font-extrabold text-slate-900 font-mono">
                    {subm.value !== null ? `${subm.value.toLocaleString()} ${subm.unit}` : 'Draft'}
                  </span>
                </div>
              </div>

              {/* Reviewer Note Box */}
              <div className="p-3.5 rounded-lg bg-amber-50/80 border border-amber-200 text-xs text-amber-900 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-950">
                  <MessageSquare className="w-3.5 h-3.5 text-amber-700" />
                  <span>Auditor Reason for Correction (By {subm.reviewerName || 'Auditor'}):</span>
                </div>
                <p className="leading-relaxed pl-5 font-medium">
                  "{subm.reviewerComment || 'Please provide verified stamped bill or reconciliation statement from vendor.'}"
                </p>
              </div>

              {/* Contributor File & Action Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs pt-1">
                <div className="flex items-center gap-2 text-slate-500">
                  <FileText className="w-4 h-4 text-slate-400" />
                  <span>Previous file: <strong className="text-slate-700 font-mono">{subm.evidenceFileName || 'None'}</strong></span>
                </div>

                <Link
                  to={`/contributor/enter-data?submissionId=${subm.id}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg shadow-xs transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Edit Data & Re-Upload Evidence</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
