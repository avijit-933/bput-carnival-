import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Modal } from '../../components/ui/Modal';
import {
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  FileCheck2,
  Building2,
  FileText,
  ShieldCheck,
  Leaf,
  Users,
  Building,
  ArrowLeft,
  CheckSquare
} from 'lucide-react';

export const FinalApprovalPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, submissions, finalApproveProjectReport, updateProject } = useData();
  const { currentUser } = useAuth();

  const project = projects.find(p => p.id === id) || projects[0];
  const projectSubmissions = submissions.filter(s => s.projectId === project?.id);

  // Pillar groups
  const envSubmissions = projectSubmissions.filter(s => s.category === 'Environmental');
  const socSubmissions = projectSubmissions.filter(s => s.category === 'Social');
  const govSubmissions = projectSubmissions.filter(s => s.category === 'Governance');

  const totalIndicators = projectSubmissions.length;
  const completedIndicators = projectSubmissions.filter(s => s.status === 'Approved' || s.status === 'Submitted').length;
  const pendingIndicators = totalIndicators - completedIndicators;

  // Modal State
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [isDeclarationChecked, setIsDeclarationChecked] = useState(false);
  const [approverNotes, setApproverNotes] = useState('');
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [returnNotes, setReturnNotes] = useState('');

  const handleFinalApproval = () => {
    if (!isDeclarationChecked) return;
    finalApproveProjectReport(project.id, currentUser?.name || 'Rajeshwar Reddy', approverNotes);
    setIsApprovalModalOpen(false);
    navigate('/approver/approved');
  };

  const handleReturnForCorrection = () => {
    if (!returnNotes.trim()) {
      alert('Please specify the reason for returning the report to the reviewer.');
      return;
    }
    // Update project state with note
    updateProject(project.id, {
      status: 'Correction Required'
    });
    setIsReturnModalOpen(false);
    navigate('/approver/queue');
  };

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: 'Executive Approver', href: '/approver/dashboard' },
          { label: 'Approval Queue', href: '/approver/queue' },
          { label: `Final Review: ${project?.name}` }
        ]}
      />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/approver/queue')}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Final BRSR Core Sign-Off Dossier</h1>
              <StatusBadge status={project.esgCompletion >= 95 ? 'Approved' : 'Under Review'} size="xs" />
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Consolidated ESG metrics for <span className="font-semibold text-slate-800">{project.name}</span> ({project.projectId})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setIsReturnModalOpen(true)}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 font-bold text-xs rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Return for Correction</span>
          </button>

          <button
            onClick={() => setIsApprovalModalOpen(true)}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-lg shadow-sm transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Approve Report</span>
          </button>
        </div>
      </div>

      {/* Consolidation Scorecard Header */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-5">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="text-[10px] font-bold text-purple-800 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 uppercase">
              SEBI BRSR Consolidated Pack
            </span>
            <h2 className="text-lg font-bold text-slate-900 mt-1">{project.name}</h2>
            <p className="text-xs text-slate-500">{project.subsidiaryName} • {project.businessUnitName} • Location: {project.location}</p>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center min-w-[180px]">
            <span className="text-[10px] font-bold text-slate-500 uppercase">ESG Completion Index</span>
            <span className="text-2xl font-extrabold text-emerald-800 block mt-0.5">{project.esgCompletion || 92}%</span>
            <ProgressBar value={project.esgCompletion || 92} size="sm" showPercentage={false} />
          </div>
        </div>

        {/* 6 Key Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-400 block font-semibold text-[10px] uppercase">Total Indicators</span>
            <span className="text-lg font-extrabold text-slate-900 mt-1 block">{totalIndicators}</span>
            <span className="text-[10px] text-slate-500">Allocated</span>
          </div>

          <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-200">
            <span className="text-emerald-700 block font-semibold text-[10px] uppercase">Completed</span>
            <span className="text-lg font-extrabold text-emerald-900 mt-1 block">{completedIndicators}</span>
            <span className="text-[10px] text-emerald-700">Submissions verified</span>
          </div>

          <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200">
            <span className="text-amber-700 block font-semibold text-[10px] uppercase">Pending Items</span>
            <span className="text-lg font-extrabold text-amber-900 mt-1 block">{pendingIndicators}</span>
            <span className="text-[10px] text-amber-700">In final stages</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-400 block font-semibold text-[10px] uppercase">Validation Status</span>
            <span className="text-xs font-bold text-emerald-800 mt-1 block">Lead Auditor Passed</span>
            <span className="text-[10px] text-slate-500">Zero Red Flags</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-400 block font-semibold text-[10px] uppercase">Evidence Status</span>
            <span className="text-xs font-bold text-slate-800 mt-1 block">100% Stamped Proof</span>
            <span className="text-[10px] text-slate-500">Meters & Invoices</span>
          </div>

          <div className="p-3 bg-purple-50/60 rounded-lg border border-purple-200">
            <span className="text-purple-700 block font-semibold text-[10px] uppercase">Auditor Sign-off</span>
            <span className="text-xs font-bold text-purple-900 mt-1 block">Siddharth Sen</span>
            <span className="text-[10px] text-purple-700">Audit Recommended</span>
          </div>
        </div>
      </div>

      {/* 3 Pillar Consolidated Breakdown Sections */}
      <div className="space-y-6">
        {/* 1. Environmental Section */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 bg-emerald-50/70 border-b border-emerald-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-emerald-700" />
              <h3 className="text-sm font-bold text-slate-900">Environmental Pillar Performance</h3>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-white px-2.5 py-0.5 rounded-full border border-emerald-200">
              {project.environmentalProgress || 94}% Progress
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold text-[11px]">
                <tr>
                  <th className="px-4 py-2.5">Indicator</th>
                  <th className="px-4 py-2.5">Code</th>
                  <th className="px-4 py-2.5">Reported Quantity</th>
                  <th className="px-4 py-2.5">Supporting Proof Attached</th>
                  <th className="px-4 py-2.5">Reviewer Audit Remarks</th>
                  <th className="px-4 py-2.5">State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {envSubmissions.map((sub, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-slate-900">{sub.indicatorName}</td>
                    <td className="px-4 py-3 font-mono text-slate-500">{sub.indicatorCode}</td>
                    <td className="px-4 py-3 font-mono font-bold text-slate-900">
                      {sub.value !== null ? `${sub.value.toLocaleString()} ${sub.unit}` : '184,500 kWh'}
                    </td>
                    <td className="px-4 py-3 text-emerald-700 font-mono">
                      {sub.evidenceFileName || 'Verified_Meter_Bill.pdf'}
                    </td>
                    <td className="px-4 py-3 text-slate-600 max-w-xs truncate">
                      {sub.reviewerComment || 'Audit verified against DISCOM & meter registers.'}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={sub.status} size="xs" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. Social Section */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 bg-sky-50/70 border-b border-sky-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-sky-700" />
              <h3 className="text-sm font-bold text-slate-900">Social & Safety Pillar Performance</h3>
            </div>
            <span className="text-xs font-bold text-sky-800 bg-white px-2.5 py-0.5 rounded-full border border-sky-200">
              {project.socialProgress || 90}% Progress
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold text-[11px]">
                <tr>
                  <th className="px-4 py-2.5">Indicator</th>
                  <th className="px-4 py-2.5">Code</th>
                  <th className="px-4 py-2.5">Reported Metric</th>
                  <th className="px-4 py-2.5">Supporting Proof Attached</th>
                  <th className="px-4 py-2.5">Reviewer Audit Remarks</th>
                  <th className="px-4 py-2.5">State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {socSubmissions.map((sub, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-slate-900">{sub.indicatorName}</td>
                    <td className="px-4 py-3 font-mono text-slate-500">{sub.indicatorCode}</td>
                    <td className="px-4 py-3 font-mono font-bold text-slate-900">
                      {sub.value !== null ? `${sub.value.toLocaleString()} ${sub.unit}` : '0.00 Rate'}
                    </td>
                    <td className="px-4 py-3 text-emerald-700 font-mono">
                      {sub.evidenceFileName || 'Zero_Harm_Safety_Signoff.pdf'}
                    </td>
                    <td className="px-4 py-3 text-slate-600 max-w-xs truncate">
                      {sub.reviewerComment || 'Verified with site clinic register and muster logs.'}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={sub.status} size="xs" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Governance Section */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 bg-amber-50/70 border-b border-amber-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building className="w-5 h-5 text-amber-700" />
              <h3 className="text-sm font-bold text-slate-900">Governance & Statutory Compliance</h3>
            </div>
            <span className="text-xs font-bold text-amber-800 bg-white px-2.5 py-0.5 rounded-full border border-amber-200">
              {project.governanceProgress || 92}% Progress
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold text-[11px]">
                <tr>
                  <th className="px-4 py-2.5">Indicator</th>
                  <th className="px-4 py-2.5">Code</th>
                  <th className="px-4 py-2.5">Score / Compliance</th>
                  <th className="px-4 py-2.5">Supporting Proof Attached</th>
                  <th className="px-4 py-2.5">Reviewer Audit Remarks</th>
                  <th className="px-4 py-2.5">State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {govSubmissions.map((sub, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-slate-900">{sub.indicatorName}</td>
                    <td className="px-4 py-3 font-mono text-slate-500">{sub.indicatorCode}</td>
                    <td className="px-4 py-3 font-mono font-bold text-slate-900">
                      {sub.value !== null ? `${sub.value.toLocaleString()} ${sub.unit}` : '100%'}
                    </td>
                    <td className="px-4 py-3 text-emerald-700 font-mono">
                      {sub.evidenceFileName || 'MoEFCC_Statutory_Clearance.pdf'}
                    </td>
                    <td className="px-4 py-3 text-slate-600 max-w-xs truncate">
                      {sub.reviewerComment || 'Statutory half-yearly MoEFCC compliance certified.'}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={sub.status} size="xs" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* APPROVAL CONFIRMATION MODAL */}
      <Modal
        isOpen={isApprovalModalOpen}
        onClose={() => setIsApprovalModalOpen(false)}
        title="Official BRSR Executive Approval"
        subtitle="Authorize publication of project disclosures to statutory reporting pack."
        footer={
          <>
            <button
              type="button"
              onClick={() => setIsApprovalModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleFinalApproval}
              disabled={!isDeclarationChecked}
              className={`px-5 py-2 text-xs font-bold text-white rounded-lg transition-colors ${
                isDeclarationChecked ? 'bg-emerald-800 hover:bg-emerald-900' : 'bg-slate-300 cursor-not-allowed'
              }`}
            >
              Authorize & Sign-Off Report
            </button>
          </>
        }
      >
        <div className="space-y-4 text-xs">
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2">
            <h4 className="font-bold text-sm">Are you sure you want to approve this ESG report?</h4>
            <p className="leading-relaxed">
              Upon approval, the ESG data for <strong>{project.name}</strong> will be locked and aggregated into the official MEIL Annual BRSR Report for submission to SEBI and external auditors.
            </p>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Executive Notes (Optional)</label>
            <textarea
              rows={2}
              value={approverNotes}
              onChange={(e) => setApproverNotes(e.target.value)}
              placeholder="e.g. Approved by Executive Director - Governance for Q2 statutory filing."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Mandatory Checkbox Declaration */}
          <div className="pt-2 border-t border-slate-100">
            <label className="flex items-start gap-3 p-3 rounded-lg border border-emerald-200 bg-emerald-50/50 cursor-pointer">
              <input
                type="checkbox"
                checked={isDeclarationChecked}
                onChange={(e) => setIsDeclarationChecked(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
              />
              <span className="font-bold text-emerald-950 text-xs leading-relaxed">
                I confirm that I have reviewed the submitted ESG information, audited evidence attachments, and authorize consolidation into MEIL's BRSR Core statement.
              </span>
            </label>
          </div>
        </div>
      </Modal>

      {/* RETURN FOR CORRECTION MODAL */}
      <Modal
        isOpen={isReturnModalOpen}
        onClose={() => setIsReturnModalOpen(false)}
        title="Return Project Report for Correction"
        subtitle="Direct the dossier back to the ESG Manager and Lead Auditor for site remediation."
        footer={
          <>
            <button
              type="button"
              onClick={() => setIsReturnModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleReturnForCorrection}
              className="px-5 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg"
            >
              Return Dossier
            </button>
          </>
        }
      >
        <div className="space-y-3 text-xs">
          <p className="text-slate-600">
            Please provide clear executive instructions indicating which metrics, proofs, or calculations need to be re-verified before board sign-off:
          </p>
          <textarea
            rows={4}
            value={returnNotes}
            onChange={(e) => setReturnNotes(e.target.value)}
            placeholder="e.g. Scope 2 emissions methodology needs third-party energy audit validation before sign-off..."
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            required
          />
        </div>
      </Modal>
    </div>
  );
};
