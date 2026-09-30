import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { NotificationProvider } from './context/NotificationContext';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { AppLayout } from './components/layout/AppLayout';

// Public Landing Page
import { LandingPage } from './pages/landing/LandingPage';

// Auth
import { LoginPage } from './pages/auth/LoginPage';

// Admin
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { SubsidiariesPage } from './pages/admin/SubsidiariesPage';
import { BusinessUnitsPage } from './pages/admin/BusinessUnitsPage';
import { ProjectsPage } from './pages/admin/ProjectsPage';
import { UserManagementPage } from './pages/admin/UserManagementPage';
import { RolesPermissionsPage } from './pages/admin/RolesPermissionsPage';
import { ESGConfigurationPage } from './pages/admin/ESGConfigurationPage';
import { IndicatorsPage } from './pages/admin/IndicatorsPage';
import { ReportingPeriodsPage } from './pages/admin/ReportingPeriodsPage';
import { AuditLogsPage } from './pages/admin/AuditLogsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

// ESG Manager
import { ManagerDashboard } from './pages/esg-manager/ManagerDashboard';
import { ManagerProjectsPage } from './pages/esg-manager/ManagerProjectsPage';
import { DataCollectionWorkflowPage } from './pages/esg-manager/DataCollectionWorkflowPage';
import { MonitorSubmissionsPage } from './pages/esg-manager/MonitorSubmissionsPage';
import { ManagerReportsPage } from './pages/esg-manager/ManagerReportsPage';

// Contributor
import { ContributorDashboard } from './pages/contributor/ContributorDashboard';
import { MyAssignmentsPage } from './pages/contributor/MyAssignmentsPage';
import { EnterDataPage } from './pages/contributor/EnterDataPage';
import { MySubmissionsPage } from './pages/contributor/MySubmissionsPage';
import { CorrectionsPage } from './pages/contributor/CorrectionsPage';

// Reviewer
import { ReviewerDashboard } from './pages/reviewer/ReviewerDashboard';
import { PendingReviewsPage } from './pages/reviewer/PendingReviewsPage';
import { ReviewDetailPage } from './pages/reviewer/ReviewDetailPage';
import { ReviewHistoryPage } from './pages/reviewer/ReviewHistoryPage';

// Approver
import { ApproverDashboard } from './pages/approver/ApproverDashboard';
import { ApprovalQueuePage } from './pages/approver/ApprovalQueuePage';
import { FinalApprovalPage } from './pages/approver/FinalApprovalPage';
import { ApprovedReportsPage } from './pages/approver/ApprovedReportsPage';

// Shared
import { GroupESGDashboard } from './pages/shared/GroupESGDashboard';
import { BRSRReportPreview } from './pages/shared/BRSRReportPreview';
import { NotificationsPage } from './pages/shared/NotificationsPage';
import { UnauthorizedPage } from './pages/shared/UnauthorizedPage';

export const RootRedirect = () => {
  const { currentRole, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  switch (currentRole) {
    case 'ADMIN': return <Navigate to="/admin/dashboard" replace />;
    case 'ESG_MANAGER': return <Navigate to="/manager/dashboard" replace />;
    case 'CONTRIBUTOR': return <Navigate to="/contributor/dashboard" replace />;
    case 'REVIEWER': return <Navigate to="/reviewer/dashboard" replace />;
    case 'APPROVER': return <Navigate to="/approver/dashboard" replace />;
    default: return <Navigate to="/admin/dashboard" replace />;
  }
};

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <NotificationProvider>
            <Routes>
              {/* Public Landing Page */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/landing" element={<LandingPage />} />

              {/* Public Authentication Route */}
              <Route path="/login" element={<LoginPage />} />

              {/* Portal Redirection Route */}
              <Route path="/portal" element={<RootRedirect />} />

              {/* Main Application with Sidebar & Header Layout */}
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                {/* Common Cross-Entity Views */}
                <Route path="esg-group-dashboard" element={<GroupESGDashboard />} />
                <Route path="brsr-report" element={<BRSRReportPreview />} />
                <Route path="notifications" element={<NotificationsPage />} />
                <Route path="unauthorized" element={<UnauthorizedPage />} />

                {/* 1. ADMIN ROUTES */}
                <Route
                  path="admin/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="admin/subsidiaries"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                      <SubsidiariesPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="admin/business-units"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                      <BusinessUnitsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="admin/projects"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                      <ProjectsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="admin/users"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                      <UserManagementPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="admin/roles-permissions"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                      <RolesPermissionsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="admin/esg-categories"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                      <ESGConfigurationPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="admin/indicators"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                      <IndicatorsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="admin/reporting-periods"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                      <ReportingPeriodsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="admin/reports"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                      <ManagerReportsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="admin/audit-logs"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                      <AuditLogsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="admin/settings"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                      <AdminSettingsPage />
                    </ProtectedRoute>
                  }
                />

                {/* 2. ESG MANAGER ROUTES */}
                <Route
                  path="manager/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN', 'ESG_MANAGER']}>
                      <ManagerDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="manager/projects"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN', 'ESG_MANAGER']}>
                      <ManagerProjectsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="manager/data-collection"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN', 'ESG_MANAGER']}>
                      <DataCollectionWorkflowPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="manager/monitor-submissions"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN', 'ESG_MANAGER']}>
                      <MonitorSubmissionsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="manager/reports"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN', 'ESG_MANAGER']}>
                      <ManagerReportsPage />
                    </ProtectedRoute>
                  }
                />

                {/* 3. CONTRIBUTOR ROUTES */}
                <Route
                  path="contributor/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN', 'CONTRIBUTOR']}>
                      <ContributorDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="contributor/assignments"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN', 'CONTRIBUTOR']}>
                      <MyAssignmentsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="contributor/enter-data"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN', 'CONTRIBUTOR']}>
                      <EnterDataPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="contributor/submissions"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN', 'CONTRIBUTOR']}>
                      <MySubmissionsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="contributor/corrections"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN', 'CONTRIBUTOR']}>
                      <CorrectionsPage />
                    </ProtectedRoute>
                  }
                />

                {/* 4. REVIEWER ROUTES */}
                <Route
                  path="reviewer/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN', 'REVIEWER']}>
                      <ReviewerDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="reviewer/pending"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN', 'REVIEWER']}>
                      <PendingReviewsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="reviewer/review-data/:id"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN', 'REVIEWER']}>
                      <ReviewDetailPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="reviewer/history"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN', 'REVIEWER']}>
                      <ReviewHistoryPage />
                    </ProtectedRoute>
                  }
                />

                {/* 5. APPROVER ROUTES */}
                <Route
                  path="approver/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN', 'APPROVER']}>
                      <ApproverDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="approver/queue"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN', 'APPROVER']}>
                      <ApprovalQueuePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="approver/final-review/:id"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN', 'APPROVER']}>
                      <FinalApprovalPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="approver/approved"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN', 'APPROVER']}>
                      <ApprovedReportsPage />
                    </ProtectedRoute>
                  }
                />
              </Route>

              {/* Catch-all 404 */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </NotificationProvider>
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}
