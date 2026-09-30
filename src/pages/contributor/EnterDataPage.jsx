import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import {
  Edit3,
  UploadCloud,
  FileCheck2,
  CheckCircle2,
  AlertCircle,
  FileText,
  X,
  Save,
  Send,
  Building2,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';

export const EnterDataPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { submissions, projects, categories, indicators, submitForReview, updateSubmission } = useData();
  const { currentUser } = useAuth();

  const submissionIdParam = searchParams.get('submissionId');

  // Find target submission or use default
  const targetSubm = submissionIdParam ? submissions.find(s => s.id === submissionIdParam) : null;

  // Form Fields
  const [projectId, setProjectId] = useState(targetSubm ? targetSubm.projectId : projects[0]?.id || '');
  const [categoryId, setCategoryId] = useState(targetSubm ? targetSubm.category : 'Environmental');
  const [indicatorId, setIndicatorId] = useState(targetSubm ? targetSubm.indicatorId : indicators[0]?.id || '');
  const [reportingPeriod, setReportingPeriod] = useState(targetSubm ? targetSubm.reportingPeriod : 'September 2026');
  const [metricValue, setMetricValue] = useState(targetSubm?.value !== null && targetSubm?.value !== undefined ? targetSubm.value : 25000);
  const [remarks, setRemarks] = useState(targetSubm?.remarks || 'Measured directly from calibrated flow meters at pumphouses 1 through 4. Calibration verified on 10 Aug 2026.');

  // Evidence Mock File Upload State
  const [uploadedFile, setUploadedFile] = useState(
    targetSubm?.evidenceFileName ? {
      name: targetSubm.evidenceFileName,
      size: targetSubm.evidenceFileSize || '2.4 MB',
      type: targetSubm.evidenceFileType || 'application/pdf'
    } : {
      name: 'Odisha_Water_Meter_Billing_Sep2026.pdf',
      size: '2.4 MB',
      type: 'application/pdf'
    }
  );

  const [notificationMsg, setNotificationMsg] = useState('');

  // Selected indicator details
  const selectedInd = indicators.find(i => i.id === indicatorId) || indicators[0];
  const selectedProj = projects.find(p => p.id === projectId) || projects[0];

  // Validation Checklist state
  const isIndicatorSelected = Boolean(indicatorId);
  const isValueEntered = metricValue !== '' && metricValue !== null && !isNaN(Number(metricValue));
  const isUnitSelected = Boolean(selectedInd?.unit);
  const isEvidenceUploaded = Boolean(uploadedFile?.name);
  const isPeriodSelected = Boolean(reportingPeriod);

  const isAllValid = isIndicatorSelected && isValueEntered && isUnitSelected && isEvidenceUploaded && isPeriodSelected;

  // Handle Mock File Drop/Select
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        type: file.type
      });
    }
  };

  const handleSimulateDefaultFile = (filename, size) => {
    setUploadedFile({
      name: filename,
      size: size,
      type: 'application/pdf'
    });
  };

  const handleSaveDraft = (e) => {
    e.preventDefault();
    if (targetSubm) {
      updateSubmission(targetSubm.id, {
        value: Number(metricValue),
        remarks,
        evidenceFileName: uploadedFile?.name || '',
        evidenceFileSize: uploadedFile?.size || '',
        evidenceFileType: uploadedFile?.type || '',
        status: 'In Progress'
      });
    }
    setNotificationMsg('Draft saved successfully! You can resume and submit anytime.');
    setTimeout(() => setNotificationMsg(''), 5000);
  };

  const handleSubmitData = (e) => {
    e.preventDefault();
    if (!isAllValid) {
      alert('Please complete all 5 validation checklist items before submitting.');
      return;
    }

    const payload = {
      value: Number(metricValue),
      remarks,
      evidenceFileName: uploadedFile.name,
      evidenceFileSize: uploadedFile.size,
      evidenceFileType: uploadedFile.type,
      contributorName: currentUser?.name || 'Rahul Verma',
      contributorId: currentUser?.id || 'usr-cont-1'
    };

    if (targetSubm) {
      submitForReview(targetSubm.id, payload);
    } else {
      // Find matching submission or create submission
      const existing = submissions.find(s => s.projectId === projectId && s.indicatorId === indicatorId);
      if (existing) {
        submitForReview(existing.id, payload);
      } else {
        // Fallback update first submission
        submitForReview(submissions[0].id, payload);
      }
    }

    setNotificationMsg('ESG data and evidence successfully submitted to Lead Auditor for review!');
    setTimeout(() => {
      navigate('/contributor/submissions');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: 'Contributor', href: '/contributor/dashboard' },
          { label: 'Enter ESG Data' }
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Enter Site ESG Metric & Evidence</h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase">
              Field Data Ingestion
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Record physical meter readings, invoice totals, or safety records with verifiable supporting documentation.
          </p>
        </div>
      </div>

      {notificationMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="font-semibold text-sm">{notificationMsg}</span>
          </div>
          <button onClick={() => setNotificationMsg('')} className="text-emerald-700 hover:text-emerald-900 font-bold ml-2">
            ✕
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Form: Data Entry & File Upload */}
        <div className="lg:col-span-2 space-y-6">
          <form className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-5">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-emerald-700" />
              <span>Project & ESG Indicator Identification</span>
            </h3>

            {/* Scope Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Project Site *</label>
                <select
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white font-semibold"
                >
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.projectId})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">ESG Pillar *</label>
                <select
                  value={categoryId}
                  onChange={(e) => {
                    setCategoryId(e.target.value);
                    const matching = indicators.filter(i => i.category.toLowerCase() === e.target.value.toLowerCase());
                    if (matching.length) setIndicatorId(matching[0].id);
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                >
                  <option value="Environmental">Environmental</option>
                  <option value="Social">Social</option>
                  <option value="Governance">Governance</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Assigned Indicator *</label>
                <select
                  value={indicatorId}
                  onChange={(e) => setIndicatorId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white font-bold"
                >
                  {indicators.filter(i => i.category.toLowerCase() === categoryId.toLowerCase()).map(ind => (
                    <option key={ind.id} value={ind.id}>{ind.name} ({ind.code})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Reporting Period *</label>
                <select
                  value={reportingPeriod}
                  onChange={(e) => setReportingPeriod(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                >
                  <option value="September 2026">September 2026</option>
                  <option value="August 2026">August 2026</option>
                  <option value="Q2 FY27">Q2 FY 2026-27</option>
                </select>
              </div>
            </div>

            {/* Metric Value & Unit Display */}
            <div className="pt-4 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-900 mb-1">
                Reported Metric Value *
              </label>
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <input
                    type="number"
                    step="any"
                    value={metricValue}
                    onChange={(e) => setMetricValue(e.target.value)}
                    placeholder="Enter numerical measurement"
                    className="w-full px-4 py-2.5 text-base font-extrabold text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
                    required
                  />
                </div>
                <div className="px-4 py-2.5 bg-slate-100 border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-800">
                  {selectedInd?.unit || 'Unit'}
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                {selectedInd?.description}
              </p>
            </div>

            {/* Supporting Evidence Uploader */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-xs font-bold text-slate-900">
                    Supporting Evidence Document *
                  </label>
                  <p className="text-[11px] text-slate-500">
                    Upload water bill, meter logbook, NABL certificate, or manifest (Allowed: PDF, Excel, CSV, JPG, PNG)
                  </p>
                </div>
                <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  Audit Mandatory
                </span>
              </div>

              {uploadedFile ? (
                <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
                      <FileCheck2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-emerald-950 font-mono">{uploadedFile.name}</p>
                      <p className="text-[11px] text-emerald-700">{uploadedFile.size} • Ready for audit validation</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setUploadedFile(null)}
                    className="p-1 rounded-md text-emerald-800 hover:bg-emerald-100 transition-colors"
                    title="Remove file"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-xl p-6 text-center transition-colors">
                  <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-slate-700">Drag & drop files or click to browse</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Maximum file size: 25 MB</p>

                  <div className="mt-3 flex items-center justify-center gap-2">
                    <label className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors">
                      <span>Browse Files</span>
                      <input type="file" onChange={handleFileUpload} className="hidden" accept=".pdf,.xlsx,.xls,.csv,.jpg,.jpeg,.png" />
                    </label>

                    <button
                      type="button"
                      onClick={() => handleSimulateDefaultFile('Odisha_Water_Meter_Billing_Sep2026.pdf', '2.4 MB')}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
                    >
                      Attach Sample Stamped PDF
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Description / Remarks */}
            <div className="pt-4 border-t border-slate-100 text-xs">
              <label className="block font-semibold text-slate-700 mb-1">
                Description / Engineering Remarks
              </label>
              <textarea
                rows={3}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Include calculation basis, meter serial numbers, sampling location, or exceptional variances..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
              >
                <Save className="w-4 h-4 text-slate-500" />
                <span>Save Draft</span>
              </button>

              <button
                type="button"
                onClick={handleSubmitData}
                disabled={!isAllValid}
                className={`inline-flex items-center gap-1.5 px-5 py-2 text-white text-xs font-bold rounded-lg shadow-sm transition-colors ${
                  isAllValid
                    ? 'bg-emerald-800 hover:bg-emerald-900 cursor-pointer'
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>Submit for Review</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Data Validation Checklist */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Pre-Submission Checklist</span>
              </h4>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${isAllValid ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                {isAllValid ? 'Ready to Submit' : 'Incomplete'}
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Every data record entered into the MEIL ESG portal is audited against SEBI BRSR Core assurance standards.
            </p>

            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold ${
                  isIndicatorSelected ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'
                }`}>
                  {isIndicatorSelected ? '✓' : '•'}
                </span>
                <div>
                  <p className={`font-semibold ${isIndicatorSelected ? 'text-slate-900' : 'text-slate-400'}`}>
                    Indicator Selected
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono">{selectedInd?.code} ({selectedInd?.name})</p>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold ${
                  isValueEntered ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'
                }`}>
                  {isValueEntered ? '✓' : '•'}
                </span>
                <div>
                  <p className={`font-semibold ${isValueEntered ? 'text-slate-900' : 'text-slate-400'}`}>
                    Measured Value Entered
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono">
                    {isValueEntered ? `${Number(metricValue).toLocaleString()} ${selectedInd?.unit}` : 'Missing numerical value'}
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold ${
                  isUnitSelected ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'
                }`}>
                  {isUnitSelected ? '✓' : '•'}
                </span>
                <div>
                  <p className={`font-semibold ${isUnitSelected ? 'text-slate-900' : 'text-slate-400'}`}>
                    Unit Verified
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono">{selectedInd?.unit}</p>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold ${
                  isEvidenceUploaded ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'
                }`}>
                  {isEvidenceUploaded ? '✓' : '•'}
                </span>
                <div>
                  <p className={`font-semibold ${isEvidenceUploaded ? 'text-slate-900' : 'text-slate-400'}`}>
                    Supporting Evidence Attached
                  </p>
                  <p className="text-[11px] text-slate-400 truncate max-w-[200px]">
                    {uploadedFile?.name || 'No file selected'}
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold ${
                  isPeriodSelected ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'
                }`}>
                  {isPeriodSelected ? '✓' : '•'}
                </span>
                <div>
                  <p className={`font-semibold ${isPeriodSelected ? 'text-slate-900' : 'text-slate-400'}`}>
                    Reporting Period Selected
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono">{reportingPeriod}</p>
                </div>
              </li>
            </ul>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleSubmitData}
                disabled={!isAllValid}
                className={`w-full py-2 px-3 text-xs font-bold rounded-lg text-white transition-colors ${
                  isAllValid ? 'bg-emerald-800 hover:bg-emerald-900' : 'bg-slate-300 cursor-not-allowed'
                }`}
              >
                Submit Data For Audit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
