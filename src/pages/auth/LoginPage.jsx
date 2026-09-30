import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { DEMO_USERS } from '../../data/mockData';
import {
  ShieldCheck,
  Leaf,
  Users,
  Building,
  ArrowRight,
  Lock,
  Mail,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@demo.com');
  const [password, setPassword] = useState('••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const demoAccounts = [
    {
      role: 'ADMIN',
      title: 'Admin',
      name: 'Dr. K. V. Rao',
      email: 'admin@demo.com',
      badge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      path: '/admin/dashboard',
      description: 'Setup subsidiaries, projects, users & indicators'
    },
    {
      role: 'ESG_MANAGER',
      title: 'ESG Manager',
      name: 'Priyanka Sharma',
      email: 'esgmanager@demo.com',
      badge: 'bg-teal-50 text-teal-700 border-teal-200',
      path: '/manager/dashboard',
      description: 'Assign indicators to sites & monitor submissions'
    },
    {
      role: 'CONTRIBUTOR',
      title: 'Data Contributor',
      name: 'Rahul Verma',
      email: 'contributor@demo.com',
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      path: '/contributor/dashboard',
      description: 'Input site metrics & upload evidence documents'
    },
    {
      role: 'REVIEWER',
      title: 'Reviewer',
      name: 'Siddharth Sen',
      email: 'reviewer@demo.com',
      badge: 'bg-amber-50 text-amber-700 border-amber-200',
      path: '/reviewer/dashboard',
      description: 'Validate data against proof & approve/reject'
    },
    {
      role: 'APPROVER',
      title: 'Approver',
      name: 'Rajeshwar Reddy',
      email: 'approver@demo.com',
      badge: 'bg-purple-50 text-purple-700 border-purple-200',
      path: '/approver/dashboard',
      description: 'Executive sign-off on BRSR report & disclosures'
    }
  ];

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email or employee ID');
      return;
    }
    const loggedInUser = login(email, password);
    redirectForRole(loggedInUser.role);
  };

  const handleQuickDemoLogin = (account) => {
    setEmail(account.email);
    const loggedInUser = login(account.email, 'demo123', account.role);
    redirectForRole(account.role);
  };

  const redirectForRole = (role) => {
    switch (role) {
      case 'ADMIN':
        navigate('/admin/dashboard');
        break;
      case 'ESG_MANAGER':
        navigate('/manager/dashboard');
        break;
      case 'CONTRIBUTOR':
        navigate('/contributor/dashboard');
        break;
      case 'REVIEWER':
        navigate('/reviewer/dashboard');
        break;
      case 'APPROVER':
        navigate('/approver/dashboard');
        break;
      default:
        navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center">
      <div className="w-full flex flex-col lg:flex-row min-h-screen">
        {/* Left Side: MEIL ESG Portal Presentation */}
        <div className="lg:w-1/2 bg-[#0A1B2D] p-8 sm:p-12 lg:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800 relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Brand */}
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white font-extrabold text-lg shadow-lg">
                MEIL
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white block">
                  Megha Engineering & Infrastructures Limited
                </span>
                <span className="text-xs font-semibold text-emerald-400 tracking-wide uppercase">
                  Sustainability & Corporate Governance
                </span>
              </div>
            </div>

            <div className="mt-14 max-w-lg">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                SEBI BRSR Core Mandate Platform
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                MEIL ESG & BRSR Reporting Portal
              </h1>
              <p className="mt-4 text-base text-slate-300 leading-relaxed font-light">
                Centralized ESG Data Collection, Validation, Approval & BRSR Reporting across subsidiaries, business units, and mega infrastructure projects.
              </p>
            </div>
          </div>

          {/* ESG Pillar Pillars Grid */}
          <div className="my-10 grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10">
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-xs">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                <Leaf className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Environmental</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Water conservation, GHG Scope 1 & 2 carbon accounting, circular waste, and renewable power.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-xs">
              <div className="w-9 h-9 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Social</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Zero Harm LTIFR safety, safe man-hours, community CSR, and human rights compliance.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-xs">
              <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                <Building className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Governance</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Statutory environmental clearances, anti-corruption training, and BRSR disclosures.
              </p>
            </div>
          </div>

          {/* Bottom Compliance Badge */}
          <div className="text-xs text-slate-400 flex items-center gap-2 relative z-10 pt-4 border-t border-slate-800/80">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Compliant with SEBI BRSR Format & Global GRI Standards (FY 2026-27)</span>
          </div>
        </div>

        {/* Right Side: Login Form & Role Switcher */}
        <div className="lg:w-1/2 bg-white p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Portal Authentication</h2>
              <p className="text-xs text-slate-500 mt-1">
                Enter your corporate credentials or select a demo role below to explore the portal.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700">
                {error}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email / Employee ID
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. admin@demo.com or MEIL-CORP-001"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 bg-white"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-700">Password</label>
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("In Demo Mode, any password will work!"); }} className="text-xs font-medium text-emerald-600 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-xs text-slate-600 cursor-pointer">
                  Remember my workstation
                </label>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
              >
                <span>Sign In to ESG Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Demo Quick Logins Section */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Instant Demo Login
                </span>
                <span className="text-[10px] text-slate-400">Click any role to test workflow</span>
              </div>

              <div className="space-y-2">
                {demoAccounts.map((account) => (
                  <button
                    key={account.role}
                    type="button"
                    onClick={() => handleQuickDemoLogin(account)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 text-left transition-all group flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${account.badge}`}>
                          {account.title}
                        </span>
                        <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                          {account.name}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{account.description}</p>
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
