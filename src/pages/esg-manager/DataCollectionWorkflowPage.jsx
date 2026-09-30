import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import {
  ClipboardList,
  CheckCircle2,
  Calendar,
  UserCheck,
  Tag,
  FolderKanban,
  Building2,
  Layers,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const DataCollectionWorkflowPage = () => {
  const {
    reportingPeriods,
    subsidiaries,
    businessUnits,
    projects,
    categories,
    indicators,
    users,
    createAssignment
  } = useData();

  const { currentUser } = useAuth();

  // Form State matching the requested workflow steps
  const [reportingYear, setReportingYear] = useState('FY 2026-27');
  const [subsidiaryId, setSubsidiaryId] = useState(subsidiaries[1]?.id || subsidiaries[0]?.id || '');
  const [businessUnitId, setBusinessUnitId] = useState('');
  const [projectId, setProjectId] = useState(projects[0]?.id || '');
  const [categoryId, setCategoryId] = useState('cat-env');
  const [indicatorId, setIndicatorId] = useState(indicators[0]?.id || '');
  const [contributorId, setContributorId] = useState('');
  const [deadline, setDeadline] = useState('2026-10-31');
  const [reportingPeriodName, setReportingPeriodName] = useState('September 2026');

  const [successMessage, setSuccessMessage] = useState('');

  // Cascading Filter
  const filteredBUs = businessUnits.filter(b => !subsidiaryId || b.subsidiaryId === subsidiaryId);
  const filteredProjects = projects.filter(p => {
    if (subsidiaryId && p.subsidiaryId !== subsidiaryId) return false;
    if (businessUnitId && p.businessUnitId !== businessUnitId) return false;
    return true;
  });

  const selectedCategory = categories.find(c => c.id === categoryId) || categories[0];
  const filteredIndicators = indicators.filter(i => i.category.toLowerCase() === selectedCategory?.name?.toLowerCase());

  const selectedIndicator = indicators.find(i => i.id === indicatorId) || filteredIndicators[0];
  const contributorUsers = users.filter(u => u.role === 'CONTRIBUTOR');

  const handleSaveAssignment = (e) => {
    e.preventDefault();
    if (!projectId || !indicatorId || !contributorId) {
      alert('Please select project, indicator, and assign a contributor.');
      return;
    }

    const assignment = createAssignment({
      projectId,
      indicatorId,
      contributorId,
      deadline,
      reportingYear,
      reportingPeriod: reportingPeriodName,
      assignedBy: currentUser?.name || 'ESG Manager'
    });

    setSuccessMessage(`Data requirement for "${assignment.indicatorName}" assigned to ${assignment.contributorName} for ${assignment.projectName}!`);
    setTimeout(() => setSuccessMessage(''), 8000);
  };

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: 'ESG Manager', href: '/manager/dashboard' },
          { label: 'Data Collection Workflow' },
          { label: 'Create Assignment' }
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">ESG Data Collection & Assignment Workflow</h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-100 text-teal-800 border border-teal-200 uppercase">
              Step-by-Step Assignment
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Dispatch mandatory ESG indicators to designated site engineers and data contributors with audit deadlines.
          </p>
        </div>
      </div>

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold text-emerald-900">Assignment Created Successfully</p>
              <p className="text-emerald-700">{successMessage}</p>
            </div>
          </div>
          <button onClick={() => setSuccessMessage('')} className="text-emerald-700 hover:text-emerald-900 font-bold ml-2">
            ✕
          </button>
        </div>
      )}

      {/* Main Workflow Grid: Left Form, Right Preview Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Form: The 9-step workflow */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-xs p-6">
          <form onSubmit={handleSaveAssignment} className="space-y-5">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-teal-700" />
                <span>Configure ESG Data Assignment</span>
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">SEBI BRSR Principle Alignment</span>
            </div>

            {/* Row 1: Reporting Year & Cycle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Step 1: Select Reporting Financial Year *
                </label>
                <select
                  value={reportingYear}
                  onChange={(e) => setReportingYear(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white font-semibold"
                >
                  {reportingPeriods.map(rp => (
                    <option key={rp.id} value={rp.name}>
                      {rp.name} ({rp.status})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Reporting Month / Quarter *
                </label>
                <select
                  value={reportingPeriodName}
                  onChange={(e) => setReportingPeriodName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white"
                >
                  <option value="September 2026">September 2026 (Current Cycle)</option>
                  <option value="October 2026">October 2026</option>
                  <option value="Q2 FY27">Q2 FY 2026-27 (Jul - Sep)</option>
                  <option value="Q3 FY27">Q3 FY 2026-27 (Oct - Dec)</option>
                </select>
              </div>
            </div>

            {/* Row 2: Organization Hierarchy (Subsidiary -> BU -> Project) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2 border-t border-slate-100">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Step 2: Select Subsidiary *
                </label>
                <select
                  value={subsidiaryId}
                  onChange={(e) => {
                    setSubsidiaryId(e.target.value);
                    setBusinessUnitId('');
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white"
                >
                  {subsidiaries.map(sub => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Step 3: Select Business Unit *
                </label>
                <select
                  value={businessUnitId}
                  onChange={(e) => setBusinessUnitId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white"
                >
                  <option value="">All Units</option>
                  {filteredBUs.map(bu => (
                    <option key={bu.id} value={bu.id}>
                      {bu.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Step 4: Select Project *
                </label>
                <select
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className="w-full px-3 py-2 border border-teal-500 rounded-lg text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white font-bold"
                >
                  {filteredProjects.map(proj => (
                    <option key={proj.id} value={proj.id}>
                      {proj.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 3: ESG Category & Indicator */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2 border-t border-slate-100">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Step 5: Select ESG Category *
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => {
                    setCategoryId(e.target.value);
                    const newCat = categories.find(c => c.id === e.target.value);
                    const matching = indicators.filter(i => i.category.toLowerCase() === newCat?.name?.toLowerCase());
                    if (matching.length) setIndicatorId(matching[0].id);
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white font-semibold"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name} Pillar
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Step 6: Select Indicator *
                </label>
                <select
                  value={indicatorId}
                  onChange={(e) => setIndicatorId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white font-semibold"
                >
                  {filteredIndicators.map(ind => (
                    <option key={ind.id} value={ind.id}>
                      {ind.name} ({ind.code} - {ind.unit})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 4: Contributor & Deadline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2 border-t border-slate-100">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Step 7: Assign Contributor (Site EHS Engineer) *
                </label>
                <select
                  value={contributorId}
                  onChange={(e) => setContributorId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white font-semibold"
                  required
                >
                  <option value="">-- Choose Authorized Contributor --</option>
                  {contributorUsers.map(u => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.employeeId} - {u.projectName || 'Site'})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Step 8: Set Submission Deadline *
                </label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none font-mono"
                  required
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Save Assignment & Notify Contributor</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Assignment Preview Card */}
        <div className="space-y-4">
          <div className="bg-slate-900 text-white rounded-xl p-5 shadow-xs border border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 block mb-1">
              Assignment Summary Preview
            </span>
            <h4 className="text-base font-bold text-white">
              {projects.find(p => p.id === projectId)?.name || 'Project'}
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              {subsidiaries.find(s => s.id === subsidiaryId)?.name}
            </p>

            <div className="my-4 pt-3 border-t border-slate-800 space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">ESG Pillar:</span>
                <span className="font-semibold text-white">{selectedCategory?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Indicator:</span>
                <span className="font-semibold text-teal-300 text-right">{selectedIndicator?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Measurement Unit:</span>
                <span className="font-mono text-white">{selectedIndicator?.unit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Reporting Frequency:</span>
                <span className="text-white">{selectedIndicator?.frequency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Assigned To:</span>
                <span className="font-semibold text-white">
                  {users.find(u => u.id === contributorId)?.name || 'Pending Selection'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Audit Deadline:</span>
                <span className="font-mono text-amber-400">{deadline}</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700 text-[11px] text-slate-300 leading-relaxed">
              <p className="font-bold text-teal-400 mb-0.5">Evidence Requirement:</p>
              {selectedIndicator?.guidance || 'Supporting measurement logs or invoice slips required.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
