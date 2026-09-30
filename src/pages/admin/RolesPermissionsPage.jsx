import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { ShieldCheck, Check, Save, RotateCcw, AlertCircle } from 'lucide-react';

export const RolesPermissionsPage = () => {
  const { permissions, togglePermission } = useData();
  const [savedNotice, setSavedNotice] = useState(false);

  const roles = [
    { key: 'ADMIN', label: 'Admin', desc: 'Full System Control', color: 'text-indigo-700 bg-indigo-50 border-indigo-200' },
    { key: 'ESG_MANAGER', label: 'ESG Manager', desc: 'Workflows & Monitoring', color: 'text-teal-700 bg-teal-50 border-teal-200' },
    { key: 'CONTRIBUTOR', label: 'Contributor', desc: 'Data Entry & Proof', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    { key: 'REVIEWER', label: 'Reviewer', desc: 'Verification & Audit', color: 'text-amber-700 bg-amber-50 border-amber-200' },
    { key: 'APPROVER', label: 'Approver', desc: 'BRSR Sign-off', color: 'text-purple-700 bg-purple-50 border-purple-200' },
  ];

  const handleToggle = (moduleName, roleKey) => {
    togglePermission(moduleName, roleKey);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="space-y-5">
      <Breadcrumb
        items={[
          { label: 'Admin', href: '/admin/dashboard' },
          { label: 'User Management' },
          { label: 'Roles & Permissions Matrix' }
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Role-Based Access Control (RBAC)</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Fine-grained governance matrix defining action authorization across the 5 enterprise reporting roles.
          </p>
        </div>

        {savedNotice && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-600" />
            Permissions updated live in local storage
          </span>
        )}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50/70 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900">Governance Matrix</h3>
          </div>
          <span className="text-xs text-slate-500">Click any checkbox to modify permission immediately</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold text-[11px]">
              <tr>
                <th className="px-5 py-3.5 w-1/3">Module / Capability</th>
                {roles.map(r => (
                  <th key={r.key} className="px-4 py-3.5 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold border ${r.color}`}>
                      {r.label}
                    </span>
                    <span className="block text-[10px] text-slate-400 font-normal mt-0.5 lowercase">
                      {r.desc}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {permissions.map((p, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-slate-800">
                    {p.module}
                  </td>
                  {roles.map(r => {
                    const isAllowed = !!p[r.key];
                    return (
                      <td key={r.key} className="px-4 py-3.5 text-center">
                        <label className="inline-flex items-center justify-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isAllowed}
                            onChange={() => handleToggle(p.module, r.key)}
                            className="w-4 h-4 text-emerald-600 bg-white border-slate-300 rounded focus:ring-emerald-500 cursor-pointer"
                          />
                        </label>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-50/50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-slate-400" />
            <span>Admin, ESG Manager, Contributor, Reviewer, and Approver roles are governed by SEBI audit separation rules.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
