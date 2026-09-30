import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { DataTable } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Modal } from '../../components/ui/Modal';
import { ConfirmationDialog } from '../../components/ui/ConfirmationDialog';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Building2, Plus, Edit2, Eye, Ban, CheckCircle } from 'lucide-react';

export const SubsidiariesPage = () => {
  const { subsidiaries, addSubsidiary, updateSubsidiary } = useData();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedSub, setSelectedSub] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deactivateSub, setDeactivateSub] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    regNumber: '',
    location: '',
    country: 'India',
    esgManager: '',
    reportingPeriod: 'FY 2026-27',
    status: 'Active'
  });

  const handleOpenAdd = () => {
    setFormData({
      name: '',
      code: '',
      regNumber: 'CIN: U45200TG2026PLC' + Math.floor(100000 + Math.random() * 900000),
      location: 'Hyderabad, Telangana',
      country: 'India',
      esgManager: 'Priyanka Sharma',
      reportingPeriod: 'FY 2026-27',
      status: 'Active'
    });
    setIsAddModalOpen(true);
  };

  const handleSaveSubsidiary = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.code) {
      alert('Please fill in subsidiary name and code');
      return;
    }
    addSubsidiary(formData);
    setIsAddModalOpen(false);
  };

  const handleToggleStatus = (sub) => {
    const newStatus = sub.status === 'Active' ? 'Inactive' : 'Active';
    updateSubsidiary(sub.id, { status: newStatus });
    setDeactivateSub(null);
  };

  const columns = [
    {
      key: 'name',
      header: 'Subsidiary Name',
      sortable: true,
      render: (row) => (
        <div>
          <span className="font-bold text-slate-900 block">{row.name}</span>
          <span className="text-[11px] text-slate-400 font-mono">{row.regNumber}</span>
        </div>
      )
    },
    {
      key: 'code',
      header: 'Code',
      sortable: true,
      render: (row) => (
        <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[11px] font-semibold text-slate-700">
          {row.code}
        </span>
      )
    },
    {
      key: 'location',
      header: 'Location',
      sortable: true,
      render: (row) => <span className="text-slate-600">{row.location}</span>
    },
    {
      key: 'businessUnitsCount',
      header: 'Business Units',
      sortable: true,
      render: (row) => (
        <span className="font-semibold text-slate-800">{row.businessUnitsCount || 0} Units</span>
      )
    },
    {
      key: 'projectsCount',
      header: 'Projects',
      sortable: true,
      render: (row) => (
        <span className="font-semibold text-slate-800">{row.projectsCount || 0} Projects</span>
      )
    },
    {
      key: 'esgManager',
      header: 'ESG Manager',
      sortable: true,
      render: (row) => <span className="text-slate-700 font-medium">{row.esgManager}</span>
    },
    {
      key: 'completionPercentage',
      header: 'ESG Progress',
      sortable: true,
      render: (row) => (
        <div className="w-28">
          <ProgressBar value={row.completionPercentage || 80} size="sm" showPercentage={true} />
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
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              setSelectedSub(row);
              setViewModalOpen(true);
            }}
            title="View Details"
            className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setSelectedSub(row);
              setFormData({ ...row });
              setIsAddModalOpen(true);
            }}
            title="Edit"
            className="p-1 text-slate-500 hover:text-emerald-700 hover:bg-slate-100 rounded"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeactivateSub(row)}
            title={row.status === 'Active' ? 'Deactivate' : 'Activate'}
            className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded"
          >
            <Ban className="w-4 h-4" />
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
          { label: 'Subsidiaries' }
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Subsidiaries Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure legal entities and business divisions within Megha Engineering and Infrastructures Limited.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Subsidiary</span>
        </button>
      </div>

      <DataTable
        columns={columns}
        data={subsidiaries}
        searchPlaceholder="Search subsidiaries by name, code or location..."
        searchKeys={['name', 'code', 'location', 'esgManager']}
        defaultPageSize={10}
      />

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={selectedSub ? 'Edit Subsidiary' : 'Add New Subsidiary'}
        subtitle="Specify division legal details, location, and assigned ESG leadership."
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
              onClick={handleSaveSubsidiary}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
            >
              {selectedSub ? 'Save Changes' : 'Create Subsidiary'}
            </button>
          </>
        }
      >
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="sm:col-span-2">
            <label className="block font-semibold text-slate-700 mb-1">Subsidiary Legal Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. MEIL Transmission & Distribution"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Division Code *</label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
              placeholder="e.g. MEIL-TRANS"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none uppercase"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Corporate Registration No. (CIN)</label>
            <input
              type="text"
              value={formData.regNumber}
              onChange={(e) => setFormData({ ...formData, regNumber: e.target.value })}
              placeholder="CIN / Reg Number"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Operating Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g. Hyderabad, Telangana"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Country</label>
            <input
              type="text"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              placeholder="India"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Assigned ESG Manager</label>
            <select
              value={formData.esgManager}
              onChange={(e) => setFormData({ ...formData, esgManager: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
            >
              <option value="Priyanka Sharma">Priyanka Sharma (Head of ESG)</option>
              <option value="Sunita Deshmukh">Sunita Deshmukh (Energy Division)</option>
              <option value="K. Satyanarayana">K. Satyanarayana (Transportation)</option>
              <option value="Vikram Murthy">Vikram Murthy (Hydrocarbons)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Reporting Period</label>
            <select
              value={formData.reportingPeriod}
              onChange={(e) => setFormData({ ...formData, reportingPeriod: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
            >
              <option value="FY 2026-27">FY 2026-27 (Current)</option>
              <option value="FY 2025-26">FY 2025-26</option>
              <option value="FY 2027-28">FY 2027-28</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block font-semibold text-slate-700 mb-1">Operational Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </form>
      </Modal>

      {/* View Details Modal */}
      {selectedSub && viewModalOpen && (
        <Modal
          isOpen={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
          title={selectedSub.name}
          subtitle={`Entity Code: ${selectedSub.code}`}
          footer={
            <button
              onClick={() => setViewModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
            >
              Close Details
            </button>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <p className="text-slate-400 font-medium">Corporate Registration</p>
                <p className="font-mono text-slate-800 font-bold">{selectedSub.regNumber}</p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Location & Geography</p>
                <p className="text-slate-800 font-semibold">{selectedSub.location}, {selectedSub.country}</p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Total Business Units</p>
                <p className="text-slate-800 font-semibold">{selectedSub.businessUnitsCount || 0} Operating Units</p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Active Mega Projects</p>
                <p className="text-slate-800 font-semibold">{selectedSub.projectsCount || 0} Project Sites</p>
              </div>
            </div>

            <div>
              <p className="font-semibold text-slate-700 mb-1.5">ESG Disclosure Completion</p>
              <ProgressBar value={selectedSub.completionPercentage || 85} showPercentage={true} size="lg" />
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between">
              <div>
                <p className="font-bold text-emerald-900">Assigned ESG Leadership</p>
                <p className="text-emerald-700">{selectedSub.esgManager}</p>
              </div>
              <StatusBadge status={selectedSub.status} />
            </div>
          </div>
        </Modal>
      )}

      {/* Deactivate confirmation dialog */}
      {deactivateSub && (
        <ConfirmationDialog
          isOpen={!!deactivateSub}
          onClose={() => setDeactivateSub(null)}
          onConfirm={() => handleToggleStatus(deactivateSub)}
          title={`${deactivateSub.status === 'Active' ? 'Deactivate' : 'Activate'} Subsidiary`}
          message={`Are you sure you want to change the status of "${deactivateSub.name}" to ${
            deactivateSub.status === 'Active' ? 'Inactive' : 'Active'
          }?`}
          confirmText={deactivateSub.status === 'Active' ? 'Deactivate Entity' : 'Activate Entity'}
          type={deactivateSub.status === 'Active' ? 'danger' : 'info'}
        />
      )}
    </div>
  );
};
