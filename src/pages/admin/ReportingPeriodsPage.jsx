import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { DataTable } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Modal } from '../../components/ui/Modal';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { CalendarDays, Plus, Clock, CheckCircle } from 'lucide-react';

export const ReportingPeriodsPage = () => {
  const { reportingPeriods, addReportingPeriod } = useData();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: 'FY 2028-29',
    startDate: '2028-04-01',
    endDate: '2029-03-31',
    submissionDeadline: '2028-10-31',
    approvalDeadline: '2028-11-15',
    status: 'Upcoming'
  });

  const handleSavePeriod = (e) => {
    e.preventDefault();
    addReportingPeriod(formData);
    setIsAddModalOpen(false);
  };

  const columns = [
    {
      key: 'name',
      header: 'Financial Year',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-900 text-sm">{row.name}</span>
          {row.isDefault && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Active Cycle
            </span>
          )}
        </div>
      )
    },
    {
      key: 'startDate',
      header: 'Period Window',
      render: (row) => (
        <span className="text-slate-600 font-mono text-xs">
          {row.startDate} to {row.endDate}
        </span>
      )
    },
    {
      key: 'submissionDeadline',
      header: 'Site Data Submission Deadline',
      sortable: true,
      render: (row) => (
        <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded font-mono text-xs font-semibold border border-amber-200">
          {row.submissionDeadline}
        </span>
      )
    },
    {
      key: 'approvalDeadline',
      header: 'Executive Sign-Off Deadline',
      sortable: true,
      render: (row) => (
        <span className="text-slate-700 font-mono text-xs">
          {row.approvalDeadline}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Cycle Status',
      sortable: true,
      render: (row) => <StatusBadge status={row.status} size="xs" />
    }
  ];

  return (
    <div className="space-y-5">
      <Breadcrumb
        items={[
          { label: 'Admin', href: '/admin/dashboard' },
          { label: 'Configuration' },
          { label: 'Reporting Periods' }
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Financial Reporting Cycles</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure financial year reporting timelines and statutory submission deadlines for MEIL ESG reporting.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Reporting Period</span>
        </button>
      </div>

      <DataTable
        columns={columns}
        data={reportingPeriods}
        searchPlaceholder="Search reporting periods..."
        searchKeys={['name', 'status']}
        defaultPageSize={10}
      />

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Financial Reporting Period"
        subtitle="Schedule upcoming financial year reporting calendar."
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
              onClick={handleSavePeriod}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
            >
              Save Period
            </button>
          </>
        }
      >
        <form className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Financial Year Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. FY 2028-29"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
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
              <label className="block font-semibold text-slate-700 mb-1">End Date</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Contributor Submission Deadline *</label>
            <input
              type="date"
              value={formData.submissionDeadline}
              onChange={(e) => setFormData({ ...formData, submissionDeadline: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Approver Sign-Off Deadline</label>
            <input
              type="date"
              value={formData.approvalDeadline}
              onChange={(e) => setFormData({ ...formData, approvalDeadline: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};
