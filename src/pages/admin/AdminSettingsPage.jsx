import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { ConfirmationDialog } from '../../components/ui/ConfirmationDialog';
import { Settings, Shield, Bell, Database, RefreshCw, CheckCircle2 } from 'lucide-react';

export const AdminSettingsPage = () => {
  const { resetToDemoData } = useData();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [settings, setSettings] = useState({
    portalName: 'MEIL ESG & BRSR Reporting Portal',
    companyName: 'Megha Engineering and Infrastructures Limited',
    cinNumber: 'U45200TG2006PLC050123',
    enableBrsrCore: true,
    requireEvidenceForMandatory: true,
    emailAlertsOnSubmission: true,
    emailAlertsOnApproval: true,
    retentionYears: 7
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const handleReset = () => {
    resetToDemoData();
    setShowResetConfirm(false);
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: 'Admin', href: '/admin/dashboard' },
          { label: 'Settings' }
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Portal Configuration & Compliance Settings</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure system parameters, SEBI BRSR validation rules, and demonstration settings.
          </p>
        </div>

        {savedSuccess && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Configuration saved successfully
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSave} className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-5">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600" />
              General Entity Configuration
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">Portal Display Title</label>
                <input
                  type="text"
                  value={settings.portalName}
                  onChange={(e) => setSettings({ ...settings, portalName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Company Registered Legal Name</label>
                <input
                  type="text"
                  value={settings.companyName}
                  onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">CIN / Registration Number</label>
                <input
                  type="text"
                  value={settings.cinNumber}
                  onChange={(e) => setSettings({ ...settings, cinNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
                />
              </div>
            </div>

            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 pt-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Validation & Compliance Rules
            </h3>

            <div className="space-y-3 text-xs">
              <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                <input
                  type="checkbox"
                  checked={settings.enableBrsrCore}
                  onChange={(e) => setSettings({ ...settings, enableBrsrCore: e.target.checked })}
                  className="mt-0.5 w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                />
                <div>
                  <span className="font-semibold text-slate-900 block">Enforce SEBI BRSR Core 9 KPIs Validation</span>
                  <span className="text-slate-500 text-[11px]">
                    Requires comprehensive validation of Scope 1 & 2 GHG, water intensity, LTIFR, and female employee ratios before approval.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                <input
                  type="checkbox"
                  checked={settings.requireEvidenceForMandatory}
                  onChange={(e) => setSettings({ ...settings, requireEvidenceForMandatory: e.target.checked })}
                  className="mt-0.5 w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                />
                <div>
                  <span className="font-semibold text-slate-900 block">Mandatory Supporting Proof Upload</span>
                  <span className="text-slate-500 text-[11px]">
                    Block contributors from submitting data for review unless verified PDF/Excel/image proof is attached.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                <input
                  type="checkbox"
                  checked={settings.emailAlertsOnSubmission}
                  onChange={(e) => setSettings({ ...settings, emailAlertsOnSubmission: e.target.checked })}
                  className="mt-0.5 w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                />
                <div>
                  <span className="font-semibold text-slate-900 block">Instant Email Notifications to Reviewers</span>
                  <span className="text-slate-500 text-[11px]">
                    Dispatch automatic notification alerts when site contributors upload and submit new metrics.
                  </span>
                </div>
              </label>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
              >
                Save Settings
              </button>
            </div>
          </form>
        </div>

        {/* Demo Operations Box */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Database className="w-4 h-4 text-indigo-600" />
              <span>Demo State Management</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Reset all local storage state back to original mock presentation data. Useful during hackathon presentations when restarting your workflow demo from scratch.
            </p>
            <button
              onClick={() => setShowResetConfirm(true)}
              className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold rounded-lg transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset to Default Demo Data</span>
            </button>
          </div>
        </div>
      </div>

      <ConfirmationDialog
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={handleReset}
        title="Reset Demo State"
        message="This will re-initialize all 5 subsidiaries, 10 projects, 20 users, and all mock submission records to default demo status."
        confirmText="Confirm Reset"
        type="warning"
      />
    </div>
  );
};
