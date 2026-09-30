import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { DataTable } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Modal } from '../../components/ui/Modal';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Layers, Plus, Edit2, Trash2 } from 'lucide-react';

export const BusinessUnitsPage = () => {
  const { businessUnits, subsidiaries, addBusinessUnit } = useData();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    subsidiaryId: '',
    manager: '',
    status: 'Active'
  });

  const handleOpenAdd = () => {
    setFormData({
      name: '',
      subsidiaryId: subsidiaries[0]?.id || '',
      manager: 'A. R. Krishnan',
      status: 'Active'
    });
    setIsAddModalOpen(true);
  };

  const handleSaveBU = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.subsidiaryId) {
      alert('Please specify Business Unit name and Parent Subsidiary');
      return;
    }
    const parentSub = subsidiaries.find(s => s.id === formData.subsidiaryId);
    addBusinessUnit({
      ...formData,
      subsidiaryName: parentSub ? parentSub.name : 'MEIL Subsidiary'
    });
    setIsAddModalOpen(false);
  };

  const columns = [
    {
      key: 'name',
      header: 'Business Unit',
      sortable: true,
      render: (row) => (
        <span className="font-bold text-slate-900">{row.name}</span>
      )
    },
    {
      key: 'subsidiaryName',
      header: 'Parent Subsidiary',
      sortable: true,
      render: (row) => (
        <span className="text-slate-600 font-medium">{row.subsidiaryName}</span>
      )
    },
    {
      key: 'manager',
      header: 'Unit Head / Manager',
      sortable: true,
      render: (row) => <span className="text-slate-700">{row.manager}</span>
    },
    {
      key: 'projectsCount',
      header: 'Active Projects',
      sortable: true,
      render: (row) => (
        <span className="font-semibold text-slate-800">{row.projectsCount || 0} Sites</span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (row) => <StatusBadge status={row.status} size="xs" />
    }
  ];

  return (
    <div className="space-y-5">
      <Breadcrumb
        items={[
          { label: 'Admin', href: '/admin/dashboard' },
          { label: 'Organization' },
          { label: 'Business Units' }
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Business Units</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Operational verticals responsible for specialized engineering infrastructure execution.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Business Unit</span>
        </button>
      </div>

      <DataTable
        columns={columns}
        data={businessUnits}
        searchPlaceholder="Search business units or managers..."
        searchKeys={['name', 'subsidiaryName', 'manager']}
        defaultPageSize={10}
      />

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Business Unit"
        subtitle="Create an operating business vertical under an established MEIL subsidiary."
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
              onClick={handleSaveBU}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
            >
              Create Business Unit
            </button>
          </>
        }
      >
        <form className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Business Unit Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Electrical Transmission Systems"
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
                  {sub.name} ({sub.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Business Unit Head / Manager</label>
            <input
              type="text"
              value={formData.manager}
              onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
              placeholder="Manager Name"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Status</label>
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
    </div>
  );
};
