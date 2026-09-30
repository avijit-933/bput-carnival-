import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { DataTable } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Modal } from '../../components/ui/Modal';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Tag, Plus, Check, X, Edit2, ShieldAlert } from 'lucide-react';

export const IndicatorsPage = () => {
  const { indicators, addIndicator, updateIndicator } = useData();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedInd, setSelectedInd] = useState(null);

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    category: 'Environmental',
    subcategory: 'Water Management',
    unit: 'KL',
    dataType: 'Number',
    frequency: 'Monthly',
    mandatory: true,
    description: '',
    brsrPrinciple: 'Principle 6: Environmental Protection',
    guidance: 'Attach verified site logs or utility bills.'
  });

  const handleOpenAdd = () => {
    const num = Math.floor(10 + Math.random() * 90);
    setFormData({
      code: `ENV-IND-${num}`,
      name: '',
      category: 'Environmental',
      subcategory: 'Resource Management',
      unit: 'Units',
      dataType: 'Number',
      frequency: 'Monthly',
      mandatory: true,
      description: 'Standard ESG metric for infrastructure environmental accounting.',
      brsrPrinciple: 'Principle 6: Environmental Protection',
      guidance: 'Attach verified measurement log.'
    });
    setSelectedInd(null);
    setIsAddModalOpen(true);
  };

  const handleSaveIndicator = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.code) {
      alert('Please fill indicator name and code');
      return;
    }

    if (selectedInd) {
      updateIndicator(selectedInd.id, formData);
    } else {
      addIndicator(formData);
    }
    setIsAddModalOpen(false);
  };

  const columns = [
    {
      key: 'name',
      header: 'Indicator & Code',
      sortable: true,
      render: (row) => (
        <div>
          <span className="font-bold text-slate-900 block">{row.name}</span>
          <span className="text-[11px] font-mono text-slate-500">{row.code}</span>
        </div>
      )
    },
    {
      key: 'category',
      header: 'ESG Pillar',
      sortable: true,
      render: (row) => {
        const colors = {
          Environmental: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          Social: 'bg-sky-50 text-sky-800 border-sky-200',
          Governance: 'bg-amber-50 text-amber-800 border-amber-200'
        };
        return (
          <div>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${colors[row.category] || 'bg-slate-100 text-slate-700'}`}>
              {row.category}
            </span>
            <span className="text-[11px] text-slate-500 block mt-0.5">{row.subcategory}</span>
          </div>
        );
      }
    },
    {
      key: 'unit',
      header: 'Unit',
      sortable: true,
      render: (row) => (
        <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[11px] font-semibold text-slate-700">
          {row.unit}
        </span>
      )
    },
    {
      key: 'dataType',
      header: 'Data Type',
      sortable: true,
      render: (row) => <span className="text-slate-600">{row.dataType}</span>
    },
    {
      key: 'frequency',
      header: 'Frequency',
      sortable: true,
      render: (row) => <span className="text-slate-700 font-medium">{row.frequency}</span>
    },
    {
      key: 'mandatory',
      header: 'Mandatory',
      sortable: true,
      render: (row) => (
        row.mandatory ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
            Yes
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[11px] text-slate-500">
            Optional
          </span>
        )
      )
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (row) => <StatusBadge status={row.status || 'Active'} size="xs" />
    }
  ];

  return (
    <div className="space-y-5">
      <Breadcrumb
        items={[
          { label: 'Admin', href: '/admin/dashboard' },
          { label: 'ESG Configuration' },
          { label: 'Indicators Master' }
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">ESG Indicators Master Catalog</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            24+ standardized quantitative and qualitative parameters tracked for SEBI BRSR and stakeholder disclosures.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Indicator</span>
        </button>
      </div>

      <DataTable
        columns={columns}
        data={indicators}
        searchPlaceholder="Search indicators by name, code or category..."
        searchKeys={['name', 'code', 'category', 'subcategory', 'unit']}
        defaultPageSize={10}
      />

      {/* Add Indicator Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add ESG Indicator"
        subtitle="Define data type, reporting frequency, and compliance guidance."
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
              onClick={handleSaveIndicator}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
            >
              Save Indicator
            </button>
          </>
        }
      >
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="sm:col-span-2">
            <label className="block font-semibold text-slate-700 mb-1">Indicator Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Total Water Consumption"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Indicator Code *</label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
              placeholder="e.g. ENV-WAT-01"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono uppercase"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">ESG Pillar *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white font-semibold"
            >
              <option value="Environmental">Environmental</option>
              <option value="Social">Social</option>
              <option value="Governance">Governance</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Subcategory / Theme</label>
            <input
              type="text"
              value={formData.subcategory}
              onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
              placeholder="e.g. Water Management"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Unit of Measurement *</label>
            <input
              type="text"
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              placeholder="KL, kWh, MT, %, Hours"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Data Type</label>
            <select
              value={formData.dataType}
              onChange={(e) => setFormData({ ...formData, dataType: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
            >
              <option value="Number">Number</option>
              <option value="Percentage">Percentage</option>
              <option value="Text">Descriptive Text</option>
              <option value="Boolean">Yes / No</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Reporting Frequency</label>
            <select
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
            >
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Annual">Annual</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="flex items-center gap-2 cursor-pointer mt-1">
              <input
                type="checkbox"
                checked={formData.mandatory}
                onChange={(e) => setFormData({ ...formData, mandatory: e.target.checked })}
                className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
              />
              <span className="font-semibold text-slate-700">Mandatory SEBI BRSR Core Disclosure</span>
            </label>
          </div>

          <div className="sm:col-span-2">
            <label className="block font-semibold text-slate-700 mb-1">Evidence Upload Guidance</label>
            <textarea
              rows={2}
              value={formData.guidance}
              onChange={(e) => setFormData({ ...formData, guidance: e.target.value })}
              placeholder="Instructions for site contributor on required supporting evidence..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};
