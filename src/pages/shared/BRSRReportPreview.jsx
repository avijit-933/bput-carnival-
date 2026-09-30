import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { BRSR_EXECUTIVE_SUMMARY } from '../../data/mockData';
import {
  FileText,
  Download,
  Printer,
  FileSpreadsheet,
  CheckCircle2,
  Building2,
  Leaf,
  Users,
  Building,
  ShieldCheck,
  Calendar,
  Sparkles,
  QrCode
} from 'lucide-react';

export const BRSRReportPreview = () => {
  const { subsidiaries, projects, submissions } = useData();

  const [activeTab, setActiveTab] = useState('executive'); // 'executive' | 'pillars' | 'projects' | 'audit'

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const headers = 'Category,Indicator,Reported Value,Unit,Validation State\n';
    const rows = submissions.map(s => `"${s.category}","${s.indicatorName}","${s.value || 0}","${s.unit}","${s.status}"`).join('\n');
    const link = document.createElement('a');
    link.href = 'data:text/csv;charset=utf-8,' + encodeURI(headers + rows);
    link.download = `MEIL_BRSR_Core_Statement_FY27.csv`;
    link.click();
  };

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: 'Portal' },
          { label: 'BRSR Core Executive Statement' }
        ]}
      />

      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 no-print">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Business Responsibility and Sustainability Report (BRSR)
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              SEBI Compliant
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Annual statutory disclosure formatted according to SEBI circular SEBI/HO/CFD/CMD-2/P/CIR/2021/562.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg shadow-xs transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Export Excel</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* PRINTABLE OFFICIAL BRSR REPORT DOSSIER */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 sm:p-12 space-y-8 font-sans">
        {/* REPORT HEADER */}
        <div className="border-b-2 border-slate-900 pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#0F2942] flex items-center justify-center text-white font-extrabold text-2xl shadow-sm border border-emerald-500">
                <span className="text-emerald-400">M</span>EIL
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  MEGHA ENGINEERING AND INFRASTRUCTURES LIMITED
                </h1>
                <p className="text-xs text-slate-600 font-mono mt-0.5">
                  CIN: {BRSR_EXECUTIVE_SUMMARY.groupCin} • Registered Under Companies Act
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block px-3 py-1 rounded bg-slate-900 text-white font-bold text-xs uppercase tracking-wider">
                BRSR Core Report
              </span>
              <p className="text-xs font-bold text-emerald-800 mt-1">Financial Year 2026-27</p>
            </div>
          </div>
        </div>

        {/* SECTION 1: EXECUTIVE SUMMARY */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
              1
            </span>
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide">
              Executive Sustainability Statement & Chair's Perspective
            </h2>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed text-justify bg-slate-50 p-4 rounded-xl border border-slate-200">
            "{BRSR_EXECUTIVE_SUMMARY.chairpersonStatement}"
          </p>

          {/* Group Highlights Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
              <span className="text-[10px] text-emerald-800 font-bold block uppercase">GHG Intensity Reduction</span>
              <span className="text-lg font-extrabold text-emerald-950 font-mono mt-0.5 block">{BRSR_EXECUTIVE_SUMMARY.ghgIntensityReduction}</span>
              <span className="text-[10px] text-emerald-700">Scope 1 & 2 per INR Cr</span>
            </div>

            <div className="p-3 rounded-lg bg-sky-50 border border-sky-200">
              <span className="text-[10px] text-sky-800 font-bold block uppercase">Water Recycling Ratio</span>
              <span className="text-lg font-extrabold text-sky-950 font-mono mt-0.5 block">{BRSR_EXECUTIVE_SUMMARY.waterRecyclingRatio}</span>
              <span className="text-[10px] text-sky-700">STP & canal closed loop</span>
            </div>

            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
              <span className="text-[10px] text-amber-800 font-bold block uppercase">Safe Man-Hours Worked</span>
              <span className="text-lg font-extrabold text-amber-950 font-mono mt-0.5 block">{BRSR_EXECUTIVE_SUMMARY.safeManHoursTotal}</span>
              <span className="text-[10px] text-amber-700">Zero Fatalities Milestone</span>
            </div>

            <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
              <span className="text-[10px] text-purple-800 font-bold block uppercase">Community CSR Deployed</span>
              <span className="text-lg font-extrabold text-purple-950 font-mono mt-0.5 block">₹{BRSR_EXECUTIVE_SUMMARY.csrSpendTotalCr} Cr</span>
              <span className="text-[10px] text-purple-700">Water kiosks & rural clinics</span>
            </div>
          </div>
        </div>

        {/* SECTION 2: 3 PILLAR ESG PERFORMANCE BREAKDOWN */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
              2
            </span>
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide">
              Tri-Pillar ESG Performance Disclosures (FY 2026-27)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Environmental */}
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30 space-y-2">
              <div className="flex items-center gap-2 font-bold text-emerald-900 pb-1 border-b border-emerald-200">
                <Leaf className="w-4 h-4 text-emerald-700" />
                <span>Environmental Disclosures</span>
              </div>
              <ul className="space-y-1.5 text-slate-700">
                <li className="flex justify-between">
                  <span>Water Extracted:</span>
                  <strong className="font-mono">46,050 KL</strong>
                </li>
                <li className="flex justify-between">
                  <span>Grid Power Draw:</span>
                  <strong className="font-mono">479,500 kWh</strong>
                </li>
                <li className="flex justify-between">
                  <span>Diesel Consumption:</span>
                  <strong className="font-mono">42,100 Liters</strong>
                </li>
                <li className="flex justify-between">
                  <span>Renewable Energy Share:</span>
                  <strong className="font-mono text-emerald-800">94.2% (Solar PKG)</strong>
                </li>
                <li className="flex justify-between">
                  <span>C&D Waste Reused:</span>
                  <strong className="font-mono">14,200 MT</strong>
                </li>
                <li className="flex justify-between">
                  <span>Saplings Planted:</span>
                  <strong className="font-mono">12,500 Nos</strong>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div className="p-4 rounded-xl border border-sky-200 bg-sky-50/30 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sky-900 pb-1 border-b border-sky-200">
                <Users className="w-4 h-4 text-sky-700" />
                <span>Social & Safety Disclosures</span>
              </div>
              <ul className="space-y-1.5 text-slate-700">
                <li className="flex justify-between">
                  <span>LTIFR Lost Time Rate:</span>
                  <strong className="font-mono text-emerald-800">0.00 (Zero LTI)</strong>
                </li>
                <li className="flex justify-between">
                  <span>Active Onsite Workforce:</span>
                  <strong className="font-mono">4,200 Staff</strong>
                </li>
                <li className="flex justify-between">
                  <span>Avg Training Hours:</span>
                  <strong className="font-mono">34.2 Hrs / Staff</strong>
                </li>
                <li className="flex justify-between">
                  <span>Zero Child Labor Audits:</span>
                  <strong className="font-mono text-emerald-800">100% Verified</strong>
                </li>
                <li className="flex justify-between">
                  <span>Toolbox Inductions:</span>
                  <strong className="font-mono">312 Sessions</strong>
                </li>
                <li className="flex justify-between">
                  <span>Community Water Kiosks:</span>
                  <strong className="font-mono">18 Units Built</strong>
                </li>
              </ul>
            </div>

            {/* Governance */}
            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/30 space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-900 pb-1 border-b border-amber-200">
                <Building className="w-4 h-4 text-amber-700" />
                <span>Corporate Governance</span>
              </div>
              <ul className="space-y-1.5 text-slate-700">
                <li className="flex justify-between">
                  <span>Statutory Clearances:</span>
                  <strong className="font-mono text-emerald-800">100% MoEFCC CTO</strong>
                </li>
                <li className="flex justify-between">
                  <span>Anti-Corruption Training:</span>
                  <strong className="font-mono">98.5% Completion</strong>
                </li>
                <li className="flex justify-between">
                  <span>Grievances Within SLA:</span>
                  <strong className="font-mono">94.0% Resolved</strong>
                </li>
                <li className="flex justify-between">
                  <span>Data Security Breaches:</span>
                  <strong className="font-mono text-emerald-800">0 Incidents</strong>
                </li>
                <li className="flex justify-between">
                  <span>ESG Screened Tier-1 Vendors:</span>
                  <strong className="font-mono">78% Screened</strong>
                </li>
                <li className="flex justify-between">
                  <span>Board ESG Committee:</span>
                  <strong className="font-mono text-emerald-800">Active Oversight</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* SECTION 3: PROJECT-WISE PERFORMANCE TABLE */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
              3
            </span>
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide">
              Project-Wise ESG Audit Disclosures (10 Mega Sites)
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 border-y border-slate-300 text-slate-700 font-bold uppercase text-[10px]">
                <tr>
                  <th className="px-3 py-2">Project Site</th>
                  <th className="px-3 py-2">Project Code</th>
                  <th className="px-3 py-2">Division</th>
                  <th className="px-3 py-2">E-Progress</th>
                  <th className="px-3 py-2">S-Progress</th>
                  <th className="px-3 py-2">G-Progress</th>
                  <th className="px-3 py-2">Overall Score</th>
                  <th className="px-3 py-2">Assurance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {projects.map((proj, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="px-3 py-2.5 font-bold text-slate-900">{proj.name}</td>
                    <td className="px-3 py-2.5 font-mono text-slate-600">{proj.projectId}</td>
                    <td className="px-3 py-2.5 text-slate-600">{proj.subsidiaryName}</td>
                    <td className="px-3 py-2.5 font-mono font-semibold">{proj.environmentalProgress || 88}%</td>
                    <td className="px-3 py-2.5 font-mono font-semibold">{proj.socialProgress || 90}%</td>
                    <td className="px-3 py-2.5 font-mono font-semibold">{proj.governanceProgress || 92}%</td>
                    <td className="px-3 py-2.5 font-mono font-extrabold text-emerald-800">
                      {proj.esgCompletion || 90}%
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                        Audited
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 4: STATUTORY SIGN-OFFS & METADATA */}
        <div className="pt-6 border-t-2 border-slate-900 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Lead ESG Auditor Sign-Off
            </span>
            <p className="font-extrabold text-slate-900 text-sm">Siddharth Sen</p>
            <p className="text-slate-500">Lead ESG Compliance Auditor</p>
            <p className="text-[10px] text-emerald-700 font-mono mt-1">✓ Digital Fingerprint: 0x8F92...B41A</p>
            <p className="text-[10px] text-slate-400 font-mono">Date: 28 September 2026</p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Chief Sustainability Officer
            </span>
            <p className="font-extrabold text-slate-900 text-sm">Dr. K. V. Rao</p>
            <p className="text-slate-500">VP & Chief Sustainability Officer</p>
            <p className="text-[10px] text-emerald-700 font-mono mt-1">✓ Digital Fingerprint: 0x33A1...E98C</p>
            <p className="text-[10px] text-slate-400 font-mono">Date: 29 September 2026</p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Executive Director Approval
            </span>
            <p className="font-extrabold text-slate-900 text-sm">Rajeshwar Reddy</p>
            <p className="text-slate-500">Executive Director - Project Governance</p>
            <p className="text-[10px] text-emerald-700 font-mono mt-1">✓ Authorized SEBI Filing Sign-Off</p>
            <p className="text-[10px] text-slate-400 font-mono">Date: 30 September 2026</p>
          </div>
        </div>

        {/* BOTTOM LEGAL DISCLAIMER */}
        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-[10px] text-slate-500 text-center leading-tight">
          This document represents the consolidated Business Responsibility and Sustainability Report (BRSR) of Megha Engineering and Infrastructures Limited (MEIL) for FY 2026-27. Generated automatically by MEIL ESG Enterprise Portal v2.4 in compliance with SEBI sustainability frameworks.
        </div>
      </div>
    </div>
  );
};
