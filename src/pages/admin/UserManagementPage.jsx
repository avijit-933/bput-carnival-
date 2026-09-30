import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { DataTable } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Modal } from '../../components/ui/Modal';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Users, Plus, Shield, Mail, Phone, CheckCircle2 } from 'lucide-react';

export const UserManagementPage = () => {
  const { users, subsidiaries, businessUnits, projects, addUser, updateUser } = useData();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    email: '',
    phone: '',
    role: 'CONTRIBUTOR',
    subsidiaryId: '',
    businessUnitId: '',
    projectId: '',
    status: 'Active'
  });

  const handleOpenAdd = () => {
    const num = Math.floor(100 + Math.random() * 900);
    setFormData({
      name: '',
      employeeId: `MEIL-EMP-${num}`,
      email: '',
      phone: '+91 98490 ' + num + '12',
      role: 'CONTRIBUTOR',
      subsidiaryId: subsidiaries[0]?.id || '',
      businessUnitId: businessUnits[0]?.id || '',
      projectId: projects[0]?.id || '',
      status: 'Active'
    });
    setIsAddModalOpen(true);
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Please fill user name and corporate email');
      return;
    }

    const sub = subsidiaries.find(s => s.id === formData.subsidiaryId);
    const bu = businessUnits.find(b => b.id === formData.businessUnitId);
    const proj = projects.find(p => p.id === formData.projectId);

    addUser({
      ...formData,
      subsidiaryName: sub ? sub.name : 'MEIL Subsidiary',
      businessUnitName: bu ? bu.name : 'Business Unit',
      projectName: proj ? proj.name : 'Project Site',
      designation: getDesignationForRole(formData.role)
    });

    setIsAddModalOpen(false);
    setSuccessToast(`User account created for ${formData.name} (${formData.role})`);
    setTimeout(() => setSuccessToast(''), 5000);
  };

  const getDesignationForRole = (role) => {
    switch (role) {
      case 'ADMIN': return 'System Administrator';
      case 'ESG_MANAGER': return 'ESG Lead Coordinator';
      case 'CONTRIBUTOR': return 'Site EHS & Data Engineer';
      case 'REVIEWER': return 'ESG Quality Auditor';
      case 'APPROVER': return 'Executive Director - Governance';
      default: return 'ESG Staff';
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'ADMIN':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">Admin</span>;
      case 'ESG_MANAGER':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200">ESG Manager</span>;
      case 'CONTRIBUTOR':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Contributor</span>;
      case 'REVIEWER':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">Reviewer</span>;
      case 'APPROVER':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">Approver</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">{role}</span>;
    }
  };

  const columns = [
    {
      key: 'name',
      header: 'User & Employee ID',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150'}
            alt={row.name}
            className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-slate-200"
          />
          <div>
            <span className="font-bold text-slate-900 block">{row.name}</span>
            <span className="text-[11px] font-mono text-slate-500">{row.employeeId}</span>
          </div>
        </div>
      )
    },
    {
      key: 'email',
      header: 'Contact Email',
      sortable: true,
      render: (row) => (
        <span className="text-slate-600 font-mono text-[11px]">{row.email}</span>
      )
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
      render: (row) => getRoleBadge(row.role)
    },
    {
      key: 'subsidiaryName',
      header: 'Organization Assignment',
      render: (row) => (
        <div>
          <span className="text-slate-800 font-medium block text-xs truncate max-w-[180px]">{row.subsidiaryName || 'Corporate'}</span>
          <span className="text-[11px] text-slate-500 truncate block max-w-[180px]">{row.projectName || row.businessUnitName}</span>
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
      key: 'lastLogin',
      header: 'Last Active',
      sortable: true,
      render: (row) => <span className="text-slate-400 text-[11px]">{row.lastLogin || 'Recent'}</span>
    }
  ];

  return (
    <div className="space-y-5">
      <Breadcrumb
        items={[
          { label: 'Admin', href: '/admin/dashboard' },
          { label: 'User Management' },
          { label: 'Authorized Users' }
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
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">User Access Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Role assignments and site access for data contributors, reviewers, ESG managers, and executive approvers.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add User</span>
        </button>
      </div>

      <DataTable
        columns={columns}
        data={users}
        searchPlaceholder="Search users by name, email, employee ID or role..."
        searchKeys={['name', 'email', 'employeeId', 'role', 'subsidiaryName']}
        defaultPageSize={10}
      />

      {/* Add User Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Authorized User"
        subtitle="Provision a new account with appropriate role-based privileges."
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
              onClick={handleSaveUser}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
            >
              Create Account
            </button>
          </>
        }
      >
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Anand Mahindra"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Employee ID *</label>
            <input
              type="text"
              value={formData.employeeId}
              onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
              placeholder="MEIL-CORP-XXX"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Corporate Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="name@meilgroup.demo"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+91 XXXXX XXXXX"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Access Role *</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white font-semibold"
            >
              <option value="ADMIN">ADMIN (Full System Config)</option>
              <option value="ESG_MANAGER">ESG MANAGER (Assignments & Workflow)</option>
              <option value="CONTRIBUTOR">DATA CONTRIBUTOR (Site Data Entry)</option>
              <option value="REVIEWER">REVIEWER (Evidence Validation & Audit)</option>
              <option value="APPROVER">APPROVER (Executive Sign-Off)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Assigned Subsidiary</label>
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
            <label className="block font-semibold text-slate-700 mb-1">Assigned Business Unit</label>
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
            <label className="block font-semibold text-slate-700 mb-1">Assigned Project</label>
            <select
              value={formData.projectId}
              onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
            >
              {projects.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </form>
      </Modal>
    </div>
  );
};
