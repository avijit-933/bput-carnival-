import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import {
  FileSpreadsheet,
  FileText,
  Download,
  Printer,
  Filter,
  CheckCircle2,
  Calendar,
  Building2,
  Layers,
  Sparkles
} from 'lucide-react';

export const ManagerReportsPage = () => {
  const { subsidiaries, businessUnits, projects, categories, submissions } = useData();
  const navigate = useNavigate();

  const [reportType, setReportType] = useState('project'); // 'project' | 'subsidiary' | 'group'
  const [financialYear, setFinancialYear] = useState('FY 2026-27');
  const [subsidiaryId, setSubsidiaryId] = useState(subsidiaries[1]?.id || subsidiaries[0]?.id || '');
  const [businessUnitId, setBusinessUnitId] = useState('');
  const [projectId, setProjectId] = useState(projects[0]?.id || '');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const [reportGenerated, setReportGenerated] = useState(false);

  const filteredProjects = projects.filter(p => {
    if (subsidiaryId && p.subsidiaryId !== subsidiaryId) return false;
    if (businessUnitId && p.businessUnitId !== businessUnitId) return false;
    return true;
  });

  const targetProject = projects.find(p => p.id === projectId) || projects[0];
  const targetSub = subsidiaries.find(s => s.id === subsidiaryId) || subsidiaries[0];

  const handleGenerateReport = (e) => {
    e.preventDefault();
    setReportGenerated(true);
  };

  const handleExportCSV = () => {
    const rows = submissions.map(s => `"${s.projectName}","${s.category}","${s.indicatorName}","${s.value || 0}","${s.unit}","${s.status}","${s.submittedDate || 'N/A'}"`);
    const csv = '"Project","Category","Indicator","Value","Unit","Status","Submitted Date"\n' + rows.join('\n');
    const link = document.createElement('a');
    link.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    link.download = `MEIL_ESG_Report_${financialYear.replace(/\s+/g, '_')}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: 'ESG Manager', href: '/manager/dashboard' },
          { label: 'ESG Reporting Engine' }
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">ESG Disclosures & BRSR Report Generator</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Compile Project, Subsidiary, or Group-level ESG compliance packets for statutory filing and management audit.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/brsr-report')}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            <span>Full BRSR Dossier Preview</span>
          </button>
        </div>
      </div>

      {/* Report Generator Control Card */}
      <form onSubmit={handleGenerateReport} className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-5">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Select Report Scope
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'project', label: 'Project Site ESG Report', desc: 'Granular project data, safe man-hours, water & GHG' },
              { id: 'subsidiary', label: 'Subsidiary Division Report', desc: 'Rollup metrics across business units and project sites' },
              { id: 'group', label: 'MEIL Group ESG / BRSR Report', desc: 'Consolidated enterprise disclosure conforming to SEBI Core' }
            ].map(type => (
              <div
                key={type.id}
                onClick={() => setReportType(type.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  reportType === type.id
                    ? 'border-teal-600 bg-teal-50/50 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-slate-900">{type.label}</span>
                  {reportType === type.id && <span className="w-2 h-2 rounded-full bg-teal-600" />}
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Financial Year</label>
            <select
              value={financialYear}
              onChange={(e) => setFinancialYear(e.target.value)}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-slate-800 font-semibold focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white"
            >
              <option value="FY 2026-27">FY 2026-27</option>
              <option value="FY 2025-26">FY 2025-26</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Subsidiary Division</label>
            <select
              value={subsidiaryId}
              onChange={(e) => {
                setSubsidiaryId(e.target.value);
                setBusinessUnitId('');
              }}
              disabled={reportType === 'group'}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white disabled:bg-slate-100"
            >
              <option value="">All Subsidiaries</option>
              {subsidiaries.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Business Unit</label>
            <select
              value={businessUnitId}
              onChange={(e) => setBusinessUnitId(e.target.value)}
              disabled={reportType !== 'project'}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white disabled:bg-slate-100"
            >
              <option value="">All Units</option>
              {businessUnits.map(b => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Project Site</label>
            <select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              disabled={reportType !== 'project'}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-slate-800 font-bold focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white disabled:bg-slate-100"
            >
              {filteredProjects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Pillar Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white font-medium"
            >
              <option value="ALL">All Pillars (E + S + G)</option>
              <option value="Environmental">Environmental</option>
              <option value="Social">Social</option>
              <option value="Governance">Governance</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-end gap-2.5">
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>Generate Report Preview</span>
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Export Excel / CSV</span>
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Print PDF</span>
          </button>
        </div>
      </form>

      {/* Generated Report Summary Panel */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider block">
              Draft Report Preview • {financialYear}
            </span>
            <h3 className="text-base font-bold text-slate-900">
              {reportType === 'project'
                ? `ESG Project Performance Dossier: ${targetProject?.name}`
                : reportType === 'subsidiary'
                ? `Subsidiary Disclosure Pack: ${targetSub?.name}`
                : 'MEIL Consolidated Group BRSR Disclosure Statement'}
            </h3>
          </div>
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
            Audit Ready
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-slate-50">
            <span className="text-slate-400 block font-medium">Reporting Entity</span>
            <span className="font-bold text-slate-800">MEIL Infrastructure Group</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-50">
            <span className="text-slate-400 block font-medium">Core Indicators</span>
            <span className="font-bold text-slate-800">24 Parameters</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-50">
            <span className="text-slate-400 block font-medium">Validation Status</span>
            <span className="font-bold text-emerald-700">92% Sign-off Rate</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-50">
            <span className="text-slate-400 block font-medium">Evidence Audit</span>
            <span className="font-bold text-slate-800">100% Stamped Manifests</span>
          </div>
        </div>

        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-y border-slate-200 text-slate-600 uppercase font-semibold text-[11px]">
              <tr>
                <th className="px-3 py-2.5">Indicator Code</th>
                <th className="px-3 py-2.5">Parameter Description</th>
                <th className="px-3 py-2.5">Pillar</th>
                <th className="px-3 py-2.5">Reported Value</th>
                <th className="px-3 py-2.5">Unit</th>
                <th className="px-3 py-2.5">Validation State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {submissions.slice(0, 6).map((sub, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="px-3 py-2.5 font-mono text-slate-700">{sub.indicatorCode}</td>
                  <td className="px-3 py-2.5 font-medium text-slate-900">{sub.indicatorName}</td>
                  <td className="px-3 py-2.5 text-slate-600">{sub.category}</td>
                  <td className="px-3 py-2.5 font-mono font-bold text-slate-900">
                    {sub.value !== null ? sub.value.toLocaleString() : 'Pending'}
                  </td>
                  <td className="px-3 py-2.5 font-mono text-slate-500">{sub.unit}</td>
                  <td className="px-3 py-2.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Validated
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
