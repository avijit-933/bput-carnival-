import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Modal } from '../../components/ui/Modal';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Leaf, Users, Building, Plus, Edit2, Trash2, CheckCircle2 } from 'lucide-react';

export const ESGConfigurationPage = () => {
  const { categories, addCategory, updateCategory } = useData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    status: 'Active'
  });

  const pillarDetails = {
    Environmental: {
      icon: Leaf,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      badge: 'bg-emerald-100 text-emerald-800',
      themes: [
        'Energy Consumption',
        'Water Consumption',
        'Waste Management',
        'GHG Emissions (Scope 1, 2, 3)',
        'Biodiversity & Afforestation',
        'Air Emissions & Ambient PM10'
      ]
    },
    Social: {
      icon: Users,
      color: 'text-sky-700 bg-sky-50 border-sky-200',
      badge: 'bg-sky-100 text-sky-800',
      themes: [
        'Employee Welfare & Headcount',
        'Health & Safety (Zero Harm LTIFR)',
        'Training & Skill Development',
        'Workforce Diversity & Inclusion',
        'Community Development CSR',
        'Human Rights & Labor Compliance'
      ]
    },
    Governance: {
      icon: Building,
      color: 'text-amber-700 bg-amber-50 border-amber-200',
      badge: 'bg-amber-100 text-amber-800',
      themes: [
        'Business Ethics & Code of Conduct',
        'Anti-Corruption & Anti-Bribery',
        'Compliance & Clearances (MoEFCC)',
        'Enterprise Risk Management',
        'Grievances Redressal Mechanisms',
        'Data Privacy & SCADA Security'
      ]
    }
  };

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      code: '',
      description: '',
      status: 'Active'
    });
    setIsModalOpen(true);
  };

  const handleEdit = (cat) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      code: cat.code,
      description: cat.description,
      status: cat.status
    });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name) return;
    if (editingCategory) {
      updateCategory(editingCategory.id, formData);
    } else {
      addCategory(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: 'Admin', href: '/admin/dashboard' },
          { label: 'ESG Configuration' },
          { label: 'Pillar & Category Management' }
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">ESG Categories & Themes</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure the 3 core pillars (Environmental, Social, Governance) aligning with SEBI BRSR and GRI Standards.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Category</span>
        </button>
      </div>

      {/* 3 Main Pillars Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const detail = pillarDetails[cat.name] || pillarDetails.Environmental;
          const Icon = detail.icon;

          return (
            <div
              key={cat.id}
              className="bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between overflow-hidden hover:shadow-md transition-shadow"
            >
              <div>
                <div className={`p-4 border-b border-slate-100 flex items-center justify-between ${detail.color}`}>
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-5 h-5 shrink-0" />
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">{cat.name}</h3>
                      <span className="text-[10px] font-mono opacity-80 uppercase tracking-wider">{cat.code} Pillar</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleEdit(cat)}
                    className="p-1 hover:bg-white/50 rounded text-slate-600"
                    title="Edit Category"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-4 space-y-3">
                  <p className="text-xs text-slate-600 leading-relaxed min-h-[48px]">
                    {cat.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Key Reporting Themes
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {detail.themes.map((theme, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{theme}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Status</span>
                <StatusBadge status={cat.status} size="xs" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Category Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? 'Edit ESG Category' : 'Add Custom ESG Category'}
        footer={
          <>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
            >
              Save Category
            </button>
          </>
        }
      >
        <form className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Category Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Pillar Code *</label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
              placeholder="e.g. ENV, SOC, GOV"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono uppercase"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};
