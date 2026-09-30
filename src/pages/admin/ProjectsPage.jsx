import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { DataTable } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Modal } from '../../components/ui/Modal';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { FolderKanban, Plus, Eye, Edit2, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export const ProjectsPage = () => {
  const { projects, subsidiaries, businessUnits, addProject, updateProject } = useData();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    projectId: '',
    subsidiaryId: '',
    businessUnitId: '',
    location: '',
    country: 'India',
    projectManager: '',
    startDate: '2024-01-01',
    expectedEndDate: '2027-12-31',
    description: '',
    budgetCr: 1200,
    status: 'Active'
  });

  const handleOpenAdd = () => {
    const randomNum = Math.floor(10 + Math.random() * 90);
    setFormData({
      name: '',
      projectId: `MEIL-PRJ-2026-IN${randomNum}`,
      subsidiaryId: subsidiaries[0]?.id || '',
      businessUnitId: businessUnits[0]?.id || '',
      location: 'Hyderabad, Telangana',
      country: 'India',
      projectManager: 'B. Srinivas Rao',
      startDate: '2024-04-01',
      expectedEndDate: '2027-03-31',
      description: 'Comprehensive EPC infrastructure project with strict environmental standards and ESG metric compliance.',
      budgetCr: 1500,
      status: 'Active'
    });
    setIsAddModalOpen(true);
  };

  const handleSaveProject = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.projectId) {
      alert('Please fill project name and project ID');
      return;
    }

    const sub = subsidiaries.find(s => s.id === formData.subsidiaryId);
    const bu = businessUnits.find(b => b.id === formData.businessUnitId);

    addProject({
      ...formData,
      subsidiaryName: sub ? sub.name : 'MEIL Subsidiary',
      businessUnitName: bu ? bu.name : 'Business Vertical',
      esgCompletion: 0,
      environmentalProgress: 0,
      socialProgress: 0,
      governanceProgress: 0
    });

    setIsAddModalOpen(false);
    setSuccessToast(`Project "${formData.name}" created successfully and is now ready for ESG Manager assignment!`);
    setTimeout(() => setSuccessToast(''), 6000);
  };

  const columns = [
    {
      key: 'name',
      header: 'Project Name & ID',
      sortable: true,
      render: (row) => (
        <div>
          <span className="font-bold text-slate-900 block">{row.name}</span>
          <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
            {row.projectId}
          </span>
        </div>
      )
    },
    {
      key: 'subsidiaryName',
      header: 'Subsidiary & BU',
      sortable: true,
      render: (row) => (
        <div>
          <span className="text-slate-800 font-medium block">{row.subsidiaryName}</span>
          <span className="text-[11px] text-slate-500">{row.businessUnitName}</span>
        </div>
      )
    },
    {
      key: 'location',
      header: 'Location',
      sortable: true,
      render: (row) => (
        <span className="text-slate-600 inline-flex items-center gap-1">
          <MapPin className="w-3 h-3 text-slate-400" />
          {row.location}
        </span>
      )
    },
    {
      key: 'projectManager',
      header: 'Project Manager',
      sortable: true,
      render: (row) => <span className="text-slate-700 font-medium">{row.projectManager}</span>
    },
    {
      key: 'startDate',
      header: 'Duration',
      render: (row) => (
        <div className="text-[11px] text-slate-500">
          <span>{row.startDate}</span> to <span>{row.expectedEndDate}</span>
        </div>
      )
    },
    {
      key: 'esgCompletion',
      header: 'ESG Completion',
      sortable: true,
      render: (row) => (
        <div className="w-28">
          <ProgressBar value={row.esgCompletion || 0} size="sm" showPercentage={true} />
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (row) => <StatusBadge status={row.status} size="xs" />
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              setSelectedProject(row);
              setIsViewModalOpen(true);
            }}
            title="View Details"
            className="p-1 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-5">
      <Breadcrumb
        items={[
          { label: 'Admin', href: '/admin/dashboard' },
          { label: 'Organization' },
          { label: 'Projects' }
        ]}
      />

      {successToast && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">{successToast}</span>
          </div>
          <button onClick={() => setSuccessToast('')} className="text-emerald-700 hover:text-emerald-900 font-bold ml-2">
            ✕
          </button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Mega Infrastructure Projects</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            10 Active MEIL infrastructure sites onboarded for ESG data tracking and BRSR Core validation.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      <DataTable
        columns={columns}
        data={projects}
        searchPlaceholder="Search projects by name, ID, manager or location..."
        searchKeys={['name', 'projectId', 'projectManager', 'location', 'subsidiaryName']}
        defaultPageSize={10}
      />

      {/* Add Project Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Project"
        subtitle="Onboard a new infrastructure site into the MEIL ESG reporting framework."
        footer={
          <>
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveProject}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
            >
              Save & Register Project
            </button>
          </>
        }
      >
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="sm:col-span-2">
            <label className="block font-semibold text-slate-700 mb-1">Project Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Polavaram Right Canal Package 3"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Project ID / Code *</label>
            <input
              type="text"
              value={formData.projectId}
              onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
              placeholder="MEIL-PRJ-2026-XX"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Project Manager *</label>
            <input
              type="text"
              value={formData.projectManager}
              onChange={(e) => setFormData({ ...formData, projectManager: e.target.value })}
              placeholder="Manager Name"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Parent Subsidiary *</label>
            <select
              value={formData.subsidiaryId}
              onChange={(e) => setFormData({ ...formData, subsidiaryId: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
            >
              {subsidiaries.map(sub => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Business Unit *</label>
            <select
              value={formData.businessUnitId}
              onChange={(e) => setFormData({ ...formData, businessUnitId: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
            >
              {businessUnits.map(bu => (
                <option key={bu.id} value={bu.id}>
                  {bu.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Site Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="District, State"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Country</label>
            <input
              type="text"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Start Date</label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Expected Completion</label>
            <input
              type="date"
              value={formData.expectedEndDate}
              onChange={(e) => setFormData({ ...formData, expectedEndDate: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-semibold text-slate-700 mb-1">Project Scope & ESG Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Engineering description..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </form>
      </Modal>

      {/* View Project Details Modal */}
      {selectedProject && (
        <Modal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title={selectedProject.name}
          subtitle={`Project ID: ${selectedProject.projectId}`}
          footer={
            <button
              onClick={() => setIsViewModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
            >
              Close
            </button>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-slate-600 leading-relaxed">{selectedProject.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3 bg-white rounded-lg border border-slate-200">
              <div>
                <span className="text-slate-400 block font-medium">Division</span>
                <span className="text-slate-800 font-semibold">{selectedProject.subsidiaryName}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Vertical</span>
                <span className="text-slate-800 font-semibold">{selectedProject.businessUnitName}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Location</span>
                <span className="text-slate-800 font-semibold">{selectedProject.location}, {selectedProject.country}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Site Leadership</span>
                <span className="text-slate-800 font-semibold">{selectedProject.projectManager}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <p className="font-bold text-slate-900">Pillar Progress Breakdown</p>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-2 bg-white rounded border border-slate-200">
                  <span className="text-[10px] text-emerald-700 font-bold block uppercase">Environmental</span>
                  <span className="text-base font-extrabold text-slate-900">{selectedProject.environmentalProgress || 80}%</span>
                </div>
                <div className="p-2 bg-white rounded border border-slate-200">
                  <span className="text-[10px] text-sky-700 font-bold block uppercase">Social</span>
                  <span className="text-base font-extrabold text-slate-900">{selectedProject.socialProgress || 85}%</span>
                </div>
                <div className="p-2 bg-white rounded border border-slate-200">
                  <span className="text-[10px] text-amber-700 font-bold block uppercase">Governance</span>
                  <span className="text-base font-extrabold text-slate-900">{selectedProject.governanceProgress || 90}%</span>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
