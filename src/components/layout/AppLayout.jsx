import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { QuickRoleSwitcher } from '../ui/QuickRoleSwitcher';

export const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Demo Bar */}
      <QuickRoleSwitcher />

      {/* Main App Container */}
      <div className="flex-1 flex flex-col">
        <Navbar onToggleSidebar={() => setSidebarOpen(prev => !prev)} />

        <div className="flex-1 flex">
          {/* Sidebar */}
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          {/* Main Content Area */}
          <main className="flex-1 lg:pl-64 flex flex-col min-w-0">
            <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
              <Outlet />
            </div>

            {/* Enterprise Footer */}
            <footer className="mt-auto border-t border-slate-200 bg-white py-4 px-6 text-center text-xs text-slate-500 no-print">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
                <p>
                  © {new Date().getFullYear()} Megha Engineering and Infrastructures Limited (MEIL). ESG & BRSR Reporting Portal.
                </p>
                <div className="flex items-center gap-4 text-[11px] text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    SEBI BRSR Core Compliant
                  </span>
                  <span>•</span>
                  <span>Demo Platform v2.4</span>
                </div>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
};
