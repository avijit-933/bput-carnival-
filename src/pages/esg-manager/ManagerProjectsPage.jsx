import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import {
  FolderKanban,
  Building2,
  Layers,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Leaf,
  Users,
  Building
} from 'lucide-react';

export const ManagerProjectsPage = () => {
  const { subsidiaries, businessUnits, projects, submissions, indicators } = useData();

  const [selectedSubId, setSelectedSubId] = useState(subsidiaries[1]?.id || subsidiaries[0]?.id || '');
  const [selectedBuId, setSelectedBuId] = useState('');
  const [selectedProjId, setSelectedProjId] = useState(projects[0]?.id || '');

  // Filtered options
  const filteredBUs = businessUnits.filter(b => !selectedSubId || b.subsidiaryId === selectedSubId);
  const filteredProjects = projects.filter(p => {
    if (selectedSubId && p.subsidiaryId !== selectedSubId) return false;
    if (selectedBuId && p.businessUnitId !== selectedBuId) return false;
    return true;
  });

  const activeProject = projects.find(p => p.id === selectedProjId) || filteredProjects[0] || projects[0];

  // Project submissions & indicator stats
  const projectSubmissions = submissions.filter(s => s.projectId === activeProject?.id);
  const approvedCount = projectSubmissions.filter(s => s.status === 'Approved').length;
  const underReviewCount = projectSubmissions.filter(s => s.status === 'Under Review' || s.status === 'Submitted').length;
  const correctionCount = projectSubmissions.filter(s => s.status === 'Correction Required').length;

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: 'ESG Manager', href: '/manager/dashboard' },
          { label: 'Assigned Projects' },
          { label: activeProject?.name || 'Project Drilldown' }
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Project ESG Drilldown & Oversight</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Filter through enterprise hierarchy to review individual site progress and assigned indicator statuses.
          </p>
        </div>
      </div>

      {/* Filter Bar: Subsidiary -> Business Unit -> Project */}
      <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
            1. Select Subsidiary
          </label>
          <select
            value={selectedSubId}
            onChange={(e) => {
              setSelectedSubId(e.target.value);
              setSelectedBuId('');
            }}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
          >
            <option value="">All Subsidiaries</option>
            {subsidiaries.map(s => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.code})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
            2. Select Business Unit
          </label>
          <select
            value={selectedBuId}
            onChange={(e) => setSelectedBuId(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
          >
            <option value="">All Business Units</option>
            {filteredBUs.map(b => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
            3. Select Project Site
          </label>
          <select
            value={activeProject?.id || ''}
            onChange={(e) => setSelectedProjId(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-white border border-teal-500 rounded-lg text-slate-900 font-bold focus:ring-2 focus:ring-teal-500 focus:outline-none shadow-xs"
          >
            {filteredProjects.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.projectId})
              </option>
            ))}
          </select>
        </div>
      </div>

      {activeProject ? (
        <div className="space-y-6">
          {/* Project Details Banner */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-slate-900">{activeProject.name}</h2>
                  <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    {activeProject.projectId}
                  </span>
                  <StatusBadge status={activeProject.status} size="xs" />
                </div>
                <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
                  {activeProject.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-600">
                  <span className="inline-flex items-center gap-1 font-medium">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    {activeProject.subsidiaryName}
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1 font-medium">
                    <Layers className="w-3.5 h-3.5 text-slate-400" />
                    {activeProject.businessUnitName}
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {activeProject.location}, {activeProject.country}
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {activeProject.startDate} to {activeProject.expectedEndDate}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center min-w-[160px]">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  ESG Completion
                </span>
                <span className="text-3xl font-extrabold text-teal-900 my-1 block">
                  {activeProject.esgCompletion || 88}%
                </span>
                <ProgressBar value={activeProject.esgCompletion || 88} size="sm" showPercentage={false} />
              </div>
            </div>

            {/* 3 Pillar Progress Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5">
              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
                  <div className="flex items-center gap-1.5">
                    <Leaf className="w-4 h-4 text-emerald-600" />
                    <span>Environmental</span>
                  </div>
                  <span>{activeProject.environmentalProgress || 85}%</span>
                </div>
                <ProgressBar value={activeProject.environmentalProgress || 85} colorScheme="green" size="sm" showPercentage={false} />
                <span className="text-[11px] text-emerald-700 block">Water, grid power, diesel & waste tracked</span>
              </div>

              <div className="p-4 rounded-xl bg-sky-50/50 border border-sky-100 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-sky-900">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-sky-600" />
                    <span>Social Progress</span>
                  </div>
                  <span>{activeProject.socialProgress || 90}%</span>
                </div>
                <ProgressBar value={activeProject.socialProgress || 90} colorScheme="blue" size="sm" showPercentage={false} />
                <span className="text-[11px] text-sky-700 block">Zero Harm LTIFR safety, safe man-hours & CSR</span>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-100 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-amber-600" />
                    <span>Governance Progress</span>
                  </div>
                  <span>{activeProject.governanceProgress || 92}%</span>
                </div>
                <ProgressBar value={activeProject.governanceProgress || 92} colorScheme="amber" size="sm" showPercentage={false} />
                <span className="text-[11px] text-amber-700 block">Statutory EC compliance & ethics certifications</span>
              </div>
            </div>
          </div>

          {/* Indicators Assigned & Data Submission Status */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Assigned Indicators for {activeProject.name}</h3>
                <p className="text-xs text-slate-500">Live submission progress and verification logs for this site</p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                  {approvedCount} Approved
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[11px]">
                  {underReviewCount} Under Review
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold text-[11px]">
                  <tr>
                    <th className="px-4 py-3">Indicator</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Reported Value</th>
                    <th className="px-4 py-3">Assigned Contributor</th>
                    <th className="px-4 py-3">Deadline</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Reviewer Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {projectSubmissions.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                        No submissions recorded yet for this project.
                      </td>
                    </tr>
                  ) : (
                    projectSubmissions.map((sub) => (
                      <tr key={sub.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3">
                          <span className="font-bold text-slate-900 block">{sub.indicatorName}</span>
                          <span className="text-[11px] font-mono text-slate-500">{sub.indicatorCode}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-slate-600 font-medium">{sub.category}</span>
                        </td>
                        <td className="px-4 py-3">
                          {sub.value !== null && sub.value !== undefined ? (
                            <span className="font-mono font-bold text-slate-900">
                              {sub.value.toLocaleString()} {sub.unit}
                            </span>
                          ) : (
                            <span className="text-slate-400 italic">Not entered</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-slate-700">
                          {sub.contributorName}
                        </td>
                        <td className="px-4 py-3 font-mono text-slate-500">
                          {sub.deadline}
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={sub.status} size="xs" />
                        </td>
                        <td className="px-4 py-3 text-slate-500 max-w-xs truncate">
                          {sub.reviewerComment || '—'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-slate-400 bg-white rounded-xl border border-slate-200">
          No project matching criteria.
        </div>
      )}
    </div>
  );
};
