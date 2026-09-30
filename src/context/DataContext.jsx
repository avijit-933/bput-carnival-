import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_SUBSIDIARIES,
  INITIAL_BUSINESS_UNITS,
  INITIAL_PROJECTS,
  DEMO_USERS,
  ESG_CATEGORIES,
  ESG_INDICATORS,
  REPORTING_PERIODS,
  INITIAL_PERMISSIONS,
  INITIAL_AUDIT_LOGS,
  generateInitialSubmissions
} from '../data/mockData';

const DataContext = createContext();

const STORAGE_KEYS = {
  SUBSIDIARIES: 'meil_esg_subsidiaries',
  BUSINESS_UNITS: 'meil_esg_bu',
  PROJECTS: 'meil_esg_projects',
  USERS: 'meil_esg_users',
  CATEGORIES: 'meil_esg_categories',
  INDICATORS: 'meil_esg_indicators',
  REPORTING_PERIODS: 'meil_esg_periods',
  PERMISSIONS: 'meil_esg_permissions',
  SUBMISSIONS: 'meil_esg_submissions',
  AUDIT_LOGS: 'meil_esg_audit_logs'
};

const getStored = (key, fallback) => {
  try {
    const val = localStorage.getItem(key);
    if (val) return JSON.parse(val);
  } catch (e) {
    console.error(`Error loading ${key}`, e);
  }
  return fallback;
};

export const DataProvider = ({ children }) => {
  const [subsidiaries, setSubsidiaries] = useState(() => getStored(STORAGE_KEYS.SUBSIDIARIES, INITIAL_SUBSIDIARIES));
  const [businessUnits, setBusinessUnits] = useState(() => getStored(STORAGE_KEYS.BUSINESS_UNITS, INITIAL_BUSINESS_UNITS));
  const [projects, setProjects] = useState(() => getStored(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS));
  const [users, setUsers] = useState(() => getStored(STORAGE_KEYS.USERS, DEMO_USERS));
  const [categories, setCategories] = useState(() => getStored(STORAGE_KEYS.CATEGORIES, ESG_CATEGORIES));
  const [indicators, setIndicators] = useState(() => getStored(STORAGE_KEYS.INDICATORS, ESG_INDICATORS));
  const [reportingPeriods, setReportingPeriods] = useState(() => getStored(STORAGE_KEYS.REPORTING_PERIODS, REPORTING_PERIODS));
  const [permissions, setPermissions] = useState(() => getStored(STORAGE_KEYS.PERMISSIONS, INITIAL_PERMISSIONS));
  const [submissions, setSubmissions] = useState(() => getStored(STORAGE_KEYS.SUBMISSIONS, generateInitialSubmissions()));
  const [auditLogs, setAuditLogs] = useState(() => getStored(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS));

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SUBSIDIARIES, JSON.stringify(subsidiaries));
  }, [subsidiaries]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BUSINESS_UNITS, JSON.stringify(businessUnits));
  }, [businessUnits]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  }, [projects]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INDICATORS, JSON.stringify(indicators));
  }, [indicators]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REPORTING_PERIODS, JSON.stringify(reportingPeriods));
  }, [reportingPeriods]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PERMISSIONS, JSON.stringify(permissions));
  }, [permissions]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
  }, [submissions]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Audit Logger Helper
  const logAction = ({ user, action, module, record, status = 'Success' }) => {
    const newLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: user || 'System User',
      action,
      module,
      record,
      ipDevice: '192.168.1.100 / Web Client',
      status
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Subsidiaries actions
  const addSubsidiary = (subsidiary) => {
    const newSub = {
      id: `sub-${Date.now()}`,
      projectsCount: 0,
      businessUnitsCount: 0,
      completionPercentage: 0,
      status: 'Active',
      ...subsidiary
    };
    setSubsidiaries(prev => [newSub, ...prev]);
    logAction({
      action: 'Created Subsidiary',
      module: 'Organization / Subsidiaries',
      record: `${newSub.name} (${newSub.code})`
    });
    return newSub;
  };

  const updateSubsidiary = (id, updatedFields) => {
    setSubsidiaries(prev => prev.map(s => s.id === id ? { ...s, ...updatedFields } : s));
    logAction({
      action: 'Updated Subsidiary Details',
      module: 'Organization / Subsidiaries',
      record: `ID: ${id}`
    });
  };

  // Business Units actions
  const addBusinessUnit = (bu) => {
    const newBu = {
      id: `bu-${Date.now()}`,
      projectsCount: 0,
      status: 'Active',
      ...bu
    };
    setBusinessUnits(prev => [newBu, ...prev]);
    // increment subsidiary count
    setSubsidiaries(prev => prev.map(s => s.id === bu.subsidiaryId ? { ...s, businessUnitsCount: s.businessUnitsCount + 1 } : s));
    logAction({
      action: 'Created Business Unit',
      module: 'Organization / Business Units',
      record: `${newBu.name}`
    });
    return newBu;
  };

  // Projects actions
  const addProject = (project) => {
    const newProj = {
      id: `proj-${Date.now()}`,
      esgCompletion: 0,
      environmentalProgress: 0,
      socialProgress: 0,
      governanceProgress: 0,
      status: 'Active',
      ...project
    };
    setProjects(prev => [newProj, ...prev]);
    // increment subsidiary & BU project counts
    setSubsidiaries(prev => prev.map(s => s.id === project.subsidiaryId ? { ...s, projectsCount: s.projectsCount + 1 } : s));
    setBusinessUnits(prev => prev.map(b => b.id === project.businessUnitId ? { ...b, projectsCount: b.projectsCount + 1 } : b));
    logAction({
      action: 'Created New Project',
      module: 'Organization / Projects',
      record: `${newProj.name} (${newProj.projectId})`
    });
    return newProj;
  };

  const updateProject = (id, updatedFields) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
  };

  // Users actions
  const addUser = (userData) => {
    const newUser = {
      id: `usr-${Date.now()}`,
      lastLogin: 'Never',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
      ...userData
    };
    setUsers(prev => [newUser, ...prev]);
    logAction({
      action: 'Created User Account',
      module: 'User Management',
      record: `${newUser.name} (${newUser.role})`
    });
    return newUser;
  };

  const updateUser = (id, updatedFields) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updatedFields } : u));
  };

  // Categories actions
  const addCategory = (category) => {
    const newCat = {
      id: `cat-${Date.now()}`,
      themeCount: 1,
      indicatorCount: 0,
      status: 'Active',
      ...category
    };
    setCategories(prev => [...prev, newCat]);
    logAction({
      action: 'Created ESG Category',
      module: 'ESG Configuration',
      record: newCat.name
    });
  };

  const updateCategory = (id, fields) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...fields } : c));
  };

  // Indicators actions
  const addIndicator = (ind) => {
    const newInd = {
      id: `ind-${Date.now()}`,
      status: 'Active',
      ...ind
    };
    setIndicators(prev => [newInd, ...prev]);
    logAction({
      action: 'Created ESG Indicator',
      module: 'ESG Configuration / Indicators',
      record: `${newInd.name} (${newInd.code})`
    });
    return newInd;
  };

  const updateIndicator = (id, fields) => {
    setIndicators(prev => prev.map(i => i.id === id ? { ...i, ...fields } : i));
  };

  // Permissions action
  const togglePermission = (moduleName, role) => {
    setPermissions(prev => prev.map(p => {
      if (p.module === moduleName) {
        return { ...p, [role]: !p[role] };
      }
      return p;
    }));
  };

  // Reporting periods actions
  const addReportingPeriod = (period) => {
    const newP = {
      id: `rp-${Date.now()}`,
      status: 'Upcoming',
      isDefault: false,
      ...period
    };
    setReportingPeriods(prev => [...prev, newP]);
    logAction({
      action: 'Created Reporting Period',
      module: 'Reporting Periods',
      record: newP.name
    });
  };

  // Submissions & ESG Workflow
  const createAssignment = (assignmentData) => {
    const project = projects.find(p => p.id === assignmentData.projectId);
    const indicator = indicators.find(i => i.id === assignmentData.indicatorId);
    const contributor = users.find(u => u.id === assignmentData.contributorId);

    const newSubm = {
      id: `subm-${Date.now()}`,
      projectId: assignmentData.projectId,
      projectName: project ? project.name : 'Project',
      subsidiaryId: project ? project.subsidiaryId : '',
      subsidiaryName: project ? project.subsidiaryName : '',
      businessUnitId: project ? project.businessUnitId : '',
      businessUnitName: project ? project.businessUnitName : '',
      indicatorId: assignmentData.indicatorId,
      indicatorCode: indicator ? indicator.code : 'IND-01',
      indicatorName: indicator ? indicator.name : 'Indicator',
      category: indicator ? indicator.category : 'Environmental',
      unit: indicator ? indicator.unit : 'Units',
      reportingPeriod: assignmentData.reportingPeriod || 'September 2026',
      reportingYear: assignmentData.reportingYear || 'FY 2026-27',
      value: null,
      contributorId: assignmentData.contributorId,
      contributorName: contributor ? contributor.name : 'Assigned Contributor',
      submittedDate: '',
      deadline: assignmentData.deadline || '2026-10-31',
      status: 'In Progress',
      evidenceFileName: '',
      evidenceFileType: '',
      evidenceFileSize: '',
      remarks: '',
      reviewerId: '',
      reviewerName: '',
      reviewerComment: '',
      reviewedDate: '',
      history: [
        {
          date: new Date().toISOString().substring(0, 10),
          action: 'Assignment Created',
          by: assignmentData.assignedBy || 'ESG Manager'
        }
      ]
    };

    setSubmissions(prev => [newSubm, ...prev]);
    logAction({
      action: 'Assigned ESG Indicator to Contributor',
      module: 'Data Collection Workflow',
      record: `${newSubm.indicatorName} -> ${newSubm.projectName} (${newSubm.contributorName})`
    });
    return newSubm;
  };

  const updateSubmission = (submissionId, updatedData) => {
    setSubmissions(prev => prev.map(s => {
      if (s.id === submissionId) {
        return { ...s, ...updatedData };
      }
      return s;
    }));
  };

  const submitForReview = (submissionId, data) => {
    setSubmissions(prev => prev.map(s => {
      if (s.id === submissionId) {
        const history = [...(s.history || []), {
          date: new Date().toISOString().substring(0, 10),
          action: 'Submitted for Review',
          by: data.contributorName || 'Contributor'
        }];
        return {
          ...s,
          ...data,
          status: 'Submitted',
          submittedDate: new Date().toISOString().substring(0, 10),
          history
        };
      }
      return s;
    }));
    logAction({
      action: 'Submitted ESG Data Record',
      module: 'Data Collection',
      record: `Submission ID: ${submissionId}`
    });
  };

  const reviewSubmission = (submissionId, { status, reviewerComment, reviewerName }) => {
    setSubmissions(prev => prev.map(s => {
      if (s.id === submissionId) {
        const history = [...(s.history || []), {
          date: new Date().toISOString().substring(0, 10),
          action: `Review Status: ${status}`,
          by: reviewerName || 'Reviewer'
        }];
        return {
          ...s,
          status,
          reviewerComment,
          reviewerName: reviewerName || s.reviewerName,
          reviewedDate: new Date().toISOString().substring(0, 10),
          history
        };
      }
      return s;
    }));
    logAction({
      action: `Review Action: ${status}`,
      module: 'ESG Validation',
      record: `Submission: ${submissionId} - Comment: ${reviewerComment || 'None'}`
    });
  };

  const finalApproveProjectReport = (projectId, approverName, notes = '') => {
    // Mark remaining approved project indicators
    setSubmissions(prev => prev.map(s => {
      if (s.projectId === projectId && s.status === 'Submitted') {
        return { ...s, status: 'Approved', reviewerComment: notes || 'Executive Approved' };
      }
      return s;
    }));
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return { ...p, esgCompletion: 100, status: 'Active' };
      }
      return p;
    }));
    logAction({
      action: 'Final Executive BRSR Approval Granted',
      module: 'BRSR Reporting & Governance',
      record: `Project ID: ${projectId} approved by ${approverName}`
    });
  };

  const resetToDemoData = () => {
    setSubsidiaries(INITIAL_SUBSIDIARIES);
    setBusinessUnits(INITIAL_BUSINESS_UNITS);
    setProjects(INITIAL_PROJECTS);
    setUsers(DEMO_USERS);
    setCategories(ESG_CATEGORIES);
    setIndicators(ESG_INDICATORS);
    setReportingPeriods(REPORTING_PERIODS);
    setPermissions(INITIAL_PERMISSIONS);
    setSubmissions(generateInitialSubmissions());
    setAuditLogs(INITIAL_AUDIT_LOGS);
    localStorage.clear();
  };

  return (
    <DataContext.Provider value={{
      subsidiaries,
      businessUnits,
      projects,
      users,
      categories,
      indicators,
      reportingPeriods,
      permissions,
      submissions,
      auditLogs,
      addSubsidiary,
      updateSubsidiary,
      addBusinessUnit,
      addProject,
      updateProject,
      addUser,
      updateUser,
      addCategory,
      updateCategory,
      addIndicator,
      updateIndicator,
      togglePermission,
      addReportingPeriod,
      createAssignment,
      updateSubmission,
      submitForReview,
      reviewSubmission,
      finalApproveProjectReport,
      logAction,
      resetToDemoData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
