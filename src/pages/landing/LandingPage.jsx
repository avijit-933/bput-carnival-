import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Leaf,
  Layers,
  Building2,
  FolderKanban,
  ClipboardList,
  FileCheck2,
  ShieldCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Database,
  FileSpreadsheet,
  BarChart3,
  TrendingUp,
  Lock,
  History,
  FileText,
  Users,
  Building,
  Menu,
  X,
  Sparkles,
  Download,
  Eye,
  Check,
  Globe2,
  ExternalLink
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export const LandingPage = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll for navbar shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Autoplay slider every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 5);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % 5);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + 5) % 5);

  // Mock data for slider charts
  const slide1Trend = [
    { m: 'May', val: 65 },
    { m: 'Jun', val: 72 },
    { m: 'Jul', val: 79 },
    { m: 'Aug', val: 81 },
    { m: 'Sep', val: 84 }
  ];

  return (
    <div className="min-h-screen bg-[#F7F9FB] text-[#12202F] font-sans selection:bg-[#EAF7EF] selection:text-[#168A52]">
      {/* ==================================================
          1. NAVIGATION (Sticky, Premium, Clean)
          ================================================== */}
      <header
        className={`sticky top-0 z-50 transition-all duration-200 bg-white ${
          isScrolled ? 'shadow-md border-b border-[#E5E7EB]' : 'border-b border-[#E5E7EB]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#0B1F33] flex items-center justify-center text-white relative shadow-sm border border-emerald-500/30">
              <Leaf className="w-5 h-5 text-[#168A52]" />
              <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#168A52] ring-2 ring-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-extrabold tracking-tight text-[#0B1F33]">MEIL ESG</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#EAF7EF] text-[#168A52] uppercase tracking-wider">
                  Enterprise
                </span>
              </div>
              <p className="text-[11px] font-medium text-[#667085] leading-none">BRSR Reporting Portal</p>
            </div>
          </Link>

          {/* Desktop Center Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-[#667085]">
            <a href="#home" className="text-[#0B1F33] hover:text-[#168A52] transition-colors">
              Home
            </a>
            <a href="#platform" className="hover:text-[#168A52] transition-colors">
              Platform
            </a>
            <a href="#framework" className="hover:text-[#168A52] transition-colors">
              ESG Framework
            </a>
            <a href="#workflow" className="hover:text-[#168A52] transition-colors">
              Workflow
            </a>
            <a href="#reports" className="hover:text-[#168A52] transition-colors">
              Reports
            </a>
            <a href="#about" className="hover:text-[#168A52] transition-colors">
              About
            </a>
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-semibold text-[#0B1F33] hover:text-[#168A52] transition-colors px-3 py-2"
            >
              Login
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#168A52] hover:bg-[#127243] text-white text-sm font-bold shadow-xs hover:shadow-md transition-all"
            >
              <span>Access Portal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#0B1F33] hover:bg-slate-100 rounded-lg"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-[#E5E7EB] px-4 pt-3 pb-6 space-y-3">
            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-[#0B1F33]"
            >
              Home
            </a>
            <a
              href="#platform"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-[#667085]"
            >
              Platform
            </a>
            <a
              href="#framework"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-[#667085]"
            >
              ESG Framework
            </a>
            <a
              href="#workflow"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-[#667085]"
            >
              Workflow
            </a>
            <a
              href="#reports"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-[#667085]"
            >
              Reports
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-[#667085]"
            >
              About
            </a>
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <Link
                to="/login"
                className="w-full text-center py-2.5 rounded-lg border border-[#E5E7EB] text-sm font-semibold text-[#0B1F33]"
              >
                Login
              </Link>
              <Link
                to="/login"
                className="w-full text-center py-2.5 rounded-lg bg-[#168A52] text-white text-sm font-bold"
              >
                Access Portal
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ==================================================
          2. HERO SECTION + HERO SLIDER (5 SLIDES)
          ================================================== */}
      <section id="home" className="relative pt-12 pb-20 overflow-hidden">
        {/* Subtle futuristic background grid and soft green glow */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(#168A52 0.75px, transparent 0.75px), radial-gradient(#0B1F33 0.75px, #F7F9FB 0.75px)`,
              backgroundSize: '36px 36px',
              backgroundPosition: '0 0, 18px 18px'
            }}
          />
          <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#168A52]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Hero Content */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EAF7EF] border border-[#168A52]/20">
                <span className="w-2 h-2 rounded-full bg-[#168A52]" />
                <span className="text-xs font-bold text-[#168A52] tracking-wider uppercase">
                  ENTERPRISE ESG & BRSR REPORTING
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[46px] font-extrabold tracking-tight text-[#0B1F33] leading-[1.15]">
                Transform <span className="text-[#168A52]">ESG Data</span> Into Actionable Insights
              </h1>

              <p className="text-base sm:text-lg text-[#667085] leading-relaxed font-normal">
                Centralize Environmental, Social and Governance reporting across subsidiaries, business units and projects.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#168A52] hover:bg-[#127243] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
                >
                  <span>Access ESG Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#platform"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#0B1F33] border border-[#E5E7EB] font-semibold text-sm transition-colors shadow-xs"
                >
                  <span>Explore Platform</span>
                </a>
              </div>

              <div className="pt-4 flex items-center gap-3 text-xs font-semibold text-[#667085]">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#168A52]" />
                  <span>Environmental</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
                  <span>Social</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                  <span>Governance</span>
                </div>
              </div>
            </div>

            {/* Right Column: Large Premium Hero Slider (5 Slides) */}
            <div className="lg:col-span-7">
              <div className="relative rounded-[24px] bg-white border border-[#E5E7EB] shadow-xl p-5 sm:p-7 min-h-[460px] flex flex-col justify-between overflow-hidden">
                {/* Subtle Slide Glow Header */}
                <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-transparent via-[#168A52] to-transparent opacity-80" />

                {/* SLIDE 1: ESG OVERVIEW */}
                {currentSlide === 0 && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-[10px] font-bold text-[#168A52] uppercase tracking-wider block">
                          ESG PERFORMANCE
                        </span>
                        <h3 className="text-lg font-bold text-[#0B1F33]">ESG Performance Overview</h3>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
                        DEMO DATA
                      </span>
                    </div>

                    {/* Overall Reporting Metric + Pillar Breakdown */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-3 rounded-xl bg-[#EAF7EF]/70 border border-[#168A52]/20 text-center">
                        <span className="text-[10px] font-bold text-[#168A52] uppercase">Overall Reporting</span>
                        <span className="text-2xl font-extrabold text-[#0B1F33] block mt-0.5">84%</span>
                        <span className="text-[10px] text-[#168A52]">On Schedule</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Environmental</span>
                        <span className="text-2xl font-extrabold text-[#0B1F33] block mt-0.5">82%</span>
                        <span className="text-[10px] text-emerald-600">Water & GHG</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Social</span>
                        <span className="text-2xl font-extrabold text-[#0B1F33] block mt-0.5">76%</span>
                        <span className="text-[10px] text-sky-600">Zero Harm</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Governance</span>
                        <span className="text-2xl font-extrabold text-[#0B1F33] block mt-0.5">91%</span>
                        <span className="text-[10px] text-amber-600">Clearances</span>
                      </div>
                    </div>

                    {/* Cards: 250+ Projects, 12 Subsidiaries, 1,240+ Indicators */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3 rounded-xl bg-white border border-slate-200">
                        <span className="text-xs text-slate-400 block font-medium">Projects</span>
                        <span className="text-xl font-bold text-[#0B1F33]">250+</span>
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-slate-200">
                        <span className="text-xs text-slate-400 block font-medium">Subsidiaries</span>
                        <span className="text-xl font-bold text-[#0B1F33]">12</span>
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-slate-200">
                        <span className="text-xs text-slate-400 block font-medium">Indicators</span>
                        <span className="text-xl font-bold text-[#0B1F33]">1,240+</span>
                      </div>
                    </div>

                    {/* Line Chart Component */}
                    <div className="h-32 bg-slate-50 rounded-xl p-2 border border-slate-200">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={slide1Trend}>
                          <XAxis dataKey="m" tick={{ fontSize: 10 }} />
                          <YAxis domain={[50, 100]} tick={{ fontSize: 9 }} />
                          <Tooltip />
                          <Line type="monotone" dataKey="val" stroke="#168A52" strokeWidth={2.5} dot={{ r: 3 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* SLIDE 2: ESG DATA COLLECTION */}
                {currentSlide === 1 && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-[10px] font-bold text-[#168A52] uppercase tracking-wider block">
                          DATA COLLECTION
                        </span>
                        <h3 className="text-lg font-bold text-[#0B1F33]">Collect ESG Data From Every Project</h3>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
                        DEMO DATA
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <span className="text-slate-400 block text-[11px] font-semibold">Project</span>
                          <span className="font-bold text-[#0B1F33] text-sm">Odisha Infrastructure Project</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[11px] font-semibold">Pillar Category</span>
                          <span className="font-bold text-[#168A52]">Environmental</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200">
                        <div>
                          <span className="text-slate-400 block text-[11px] font-semibold">Indicator</span>
                          <span className="font-bold text-slate-800">Water Consumption</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[11px] font-semibold">Reporting Period</span>
                          <span className="font-mono text-slate-700">September 2026</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-white border border-slate-200 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase">Reported Value</span>
                          <span className="text-xl font-extrabold text-[#0B1F33] block font-mono">25,000 KL</span>
                        </div>
                        <span className="px-2 py-1 rounded bg-[#EAF7EF] text-[#168A52] font-bold text-xs">
                          Ready for Submission
                        </span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-[#EAF7EF] border border-[#168A52]/20 flex items-center gap-2 text-xs font-semibold text-[#168A52]">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>Evidence Attached: Water Meter Statement.pdf (2.4 MB)</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* SLIDE 3: VALIDATION & REVIEW */}
                {currentSlide === 2 && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-[10px] font-bold text-[#168A52] uppercase tracking-wider block">
                          VALIDATION & REVIEW
                        </span>
                        <h3 className="text-lg font-bold text-[#0B1F33]">Validate Every ESG Submission</h3>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
                        DEMO DATA
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-[#0B1F33] text-sm">Infrastructure Project A</p>
                          <p className="text-slate-500 text-[11px]">Energy Consumption • 120,000 kWh</p>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                          UNDER REVIEW
                        </span>
                      </div>

                      <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-2">
                        <span className="text-[11px] font-bold text-slate-700 block uppercase">
                          Auditor Validation Checklist:
                        </span>
                        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-700">
                          <span className="flex items-center gap-1.5 text-[#168A52] font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Data Complete
                          </span>
                          <span className="flex items-center gap-1.5 text-[#168A52] font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Evidence Uploaded
                          </span>
                          <span className="flex items-center gap-1.5 text-[#168A52] font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Reporting Period Valid
                          </span>
                          <span className="flex items-center gap-1.5 text-[#168A52] font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Required Fields Completed
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-1">
                        <button className="px-3 py-1.5 rounded-lg border border-amber-300 text-amber-800 bg-amber-50 text-xs font-bold">
                          Request Correction
                        </button>
                        <button className="px-4 py-1.5 rounded-lg bg-[#168A52] text-white text-xs font-bold shadow-xs">
                          Approve Metric
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* SLIDE 4: BRSR REPORT */}
                {currentSlide === 3 && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-[10px] font-bold text-[#168A52] uppercase tracking-wider block">
                          REPORTING & CONSOLIDATION
                        </span>
                        <h3 className="text-lg font-bold text-[#0B1F33]">From Project Data To ESG Reports</h3>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EAF7EF] text-[#168A52] border border-[#168A52]/20">
                        SAMPLE REPORT
                      </span>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-300 bg-slate-900 text-white space-y-3 text-xs font-sans">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <div>
                          <p className="text-sm font-extrabold text-white">MEIL ESG / BRSR REPORT</p>
                          <p className="text-[10px] text-slate-400 font-mono">FY 2026–27 Statutory Dossier</p>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                          ✓ Approved
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                        <span>• Environmental Performance</span>
                        <span>• Key ESG Indicators</span>
                        <span>• Social Performance</span>
                        <span>• Project-wise Data</span>
                        <span>• Governance Disclosures</span>
                        <span>• Subsidiary Consolidation</span>
                      </div>

                      <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-800">
                        <button className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold">
                          View Report
                        </button>
                        <button className="px-3 py-1 rounded bg-[#168A52] hover:bg-[#127243] text-white text-xs font-bold">
                          Export PDF
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* SLIDE 5: GROUP ANALYTICS */}
                {currentSlide === 4 && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-[10px] font-bold text-[#168A52] uppercase tracking-wider block">
                          GROUP-LEVEL VISIBILITY
                        </span>
                        <h3 className="text-lg font-bold text-[#0B1F33]">One View Across Your ESG Ecosystem</h3>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
                        ILLUSTRATIVE DEMO DATA
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-center text-xs">
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                        <span className="text-[10px] text-slate-400 block">Projects</span>
                        <span className="text-base font-extrabold text-[#0B1F33]">250+</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-purple-50 border border-purple-200">
                        <span className="text-[10px] text-purple-700 block">Submitted</span>
                        <span className="text-base font-extrabold text-purple-900">186</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200">
                        <span className="text-[10px] text-amber-700 block">Review</span>
                        <span className="text-base font-extrabold text-amber-900">32</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
                        <span className="text-[10px] text-emerald-700 block">Approved</span>
                        <span className="text-base font-extrabold text-emerald-900">154</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                      <div className="flex justify-between text-[11px] font-semibold text-slate-700">
                        <span>Pillar Progress</span>
                        <span>Avg 83%</span>
                      </div>
                      <div className="space-y-1 text-[11px]">
                        <div className="flex justify-between text-slate-600">
                          <span>Environmental</span>
                          <span className="font-bold text-emerald-700">82%</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Social</span>
                          <span className="font-bold text-sky-700">76%</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Governance</span>
                          <span className="font-bold text-amber-700">91%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Slider Controls Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    {[0, 1, 2, 3, 4].map((idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-2 rounded-full transition-all ${
                          currentSlide === idx ? 'w-6 bg-[#168A52]' : 'w-2 bg-slate-300 hover:bg-slate-400'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={prevSlide}
                      className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          3. VALUE STRIP
          ================================================== */}
      <section className="bg-white border-y border-[#E5E7EB] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold text-[#667085] uppercase tracking-wider mb-6">
            One Platform. Complete ESG Reporting Visibility.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="flex items-center gap-3 pt-4 md:pt-0 justify-center">
              <div className="w-10 h-10 rounded-xl bg-[#EAF7EF] text-[#168A52] flex items-center justify-center shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0B1F33]">Centralized Data</h4>
                <p className="text-xs text-[#667085]">Unified enterprise registry</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 md:pt-0 justify-center md:pl-6">
              <div className="w-10 h-10 rounded-xl bg-[#EAF7EF] text-[#168A52] flex items-center justify-center shrink-0">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0B1F33]">Evidence-Based</h4>
                <p className="text-xs text-[#667085]">Verified supporting proofs</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 md:pt-0 justify-center md:pl-6">
              <div className="w-10 h-10 rounded-xl bg-[#EAF7EF] text-[#168A52] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0B1F33]">Role-Based Workflow</h4>
                <p className="text-xs text-[#667085]">Governed 5-stage sign-off</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 md:pt-0 justify-center md:pl-6">
              <div className="w-10 h-10 rounded-xl bg-[#EAF7EF] text-[#168A52] flex items-center justify-center shrink-0">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0B1F33]">Consolidated Reports</h4>
                <p className="text-xs text-[#667085]">SEBI BRSR Core format</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          4. PROBLEM SECTION
          ================================================== */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#168A52] uppercase tracking-wider block mb-2">
            THE REPORTING CHALLENGE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F33] tracking-tight">
            ESG Reporting Becomes Complex At Scale
          </h2>
          <p className="text-sm sm:text-base text-[#667085] mt-3 leading-relaxed">
            Managing ESG information across multiple subsidiaries, business units and project locations can create fragmented data, manual processes and reporting challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-[24px] bg-white border border-[#E5E7EB] shadow-xs hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Database className="w-6 h-6 stroke-1.5" />
            </div>
            <h3 className="text-base font-bold text-[#0B1F33]">Fragmented Data</h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              ESG information can be distributed across teams, locations and reporting systems.
            </p>
          </div>

          <div className="p-6 rounded-[24px] bg-white border border-[#E5E7EB] shadow-xs hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <FileSpreadsheet className="w-6 h-6 stroke-1.5" />
            </div>
            <h3 className="text-base font-bold text-[#0B1F33]">Manual Processes</h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              Disconnected workflows can make collection and consolidation difficult.
            </p>
          </div>

          <div className="p-6 rounded-[24px] bg-white border border-[#E5E7EB] shadow-xs hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 stroke-1.5" />
            </div>
            <h3 className="text-base font-bold text-[#0B1F33]">Data Validation</h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              Supporting evidence and data accuracy require structured review.
            </p>
          </div>

          <div className="p-6 rounded-[24px] bg-white border border-[#E5E7EB] shadow-xs hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 stroke-1.5" />
            </div>
            <h3 className="text-base font-bold text-[#0B1F33]">Reporting Complexity</h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              Project-level information must be consolidated into meaningful reports.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================
          5. SOLUTION ARCHITECTURE DIAGRAM
          ================================================== */}
      <section id="platform" className="py-20 bg-white border-y border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#168A52] uppercase tracking-wider block mb-2">
              UNIFIED ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F33] tracking-tight">
              One Connected ESG Reporting Platform
            </h2>
            <p className="text-sm text-[#667085] mt-2">
              From corporate group oversight down to physical infrastructure sites, data flows seamlessly through validation into statutory BRSR statements.
            </p>
          </div>

          {/* Connected Enterprise Architecture Diagram */}
          <div className="bg-[#F7F9FB] rounded-[24px] border border-[#E5E7EB] p-8 sm:p-12 shadow-xs">
            {/* Top Org Hierarchy Chain */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-4 text-xs font-bold text-[#0B1F33]">
              <div className="px-5 py-3 rounded-xl bg-white border border-[#E5E7EB] shadow-xs text-center min-w-[130px]">
                <Building2 className="w-4 h-4 mx-auto mb-1 text-slate-700" />
                <span>GROUP</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 rotate-90 md:rotate-0" />
              <div className="px-5 py-3 rounded-xl bg-white border border-[#E5E7EB] shadow-xs text-center min-w-[130px]">
                <Building className="w-4 h-4 mx-auto mb-1 text-slate-700" />
                <span>SUBSIDIARY</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 rotate-90 md:rotate-0" />
              <div className="px-5 py-3 rounded-xl bg-white border border-[#E5E7EB] shadow-xs text-center min-w-[130px]">
                <Layers className="w-4 h-4 mx-auto mb-1 text-slate-700" />
                <span>BUSINESS UNIT</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 rotate-90 md:rotate-0" />
              <div className="px-5 py-3 rounded-xl bg-white border border-[#E5E7EB] shadow-xs text-center min-w-[130px]">
                <FolderKanban className="w-4 h-4 mx-auto mb-1 text-slate-700" />
                <span>PROJECT</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 rotate-90 md:rotate-0" />
              <div className="px-5 py-3 rounded-xl bg-[#0B1F33] text-white shadow-xs text-center min-w-[130px]">
                <Database className="w-4 h-4 mx-auto mb-1 text-[#168A52]" />
                <span>ESG DATA</span>
              </div>
            </div>

            {/* Tri-Pillar Branching */}
            <div className="my-8 flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl w-full">
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center text-xs space-y-1">
                  <Leaf className="w-5 h-5 mx-auto text-[#168A52]" />
                  <p className="font-bold text-emerald-950">ENVIRONMENTAL</p>
                  <p className="text-[11px] text-emerald-800">Water • Energy • GHG • Waste</p>
                </div>
                <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-center text-xs space-y-1">
                  <Users className="w-5 h-5 mx-auto text-sky-600" />
                  <p className="font-bold text-sky-950">SOCIAL</p>
                  <p className="text-[11px] text-sky-800">Zero Harm • Training • CSR</p>
                </div>
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-center text-xs space-y-1">
                  <ShieldCheck className="w-5 h-5 mx-auto text-amber-600" />
                  <p className="font-bold text-amber-950">GOVERNANCE</p>
                  <p className="text-[11px] text-amber-800">Clearances • Ethics • Risk</p>
                </div>
              </div>
            </div>

            {/* Bottom Governance Pipeline */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-4 text-xs font-bold text-[#0B1F33]">
              <div className="px-5 py-3 rounded-xl bg-white border border-[#E5E7EB] shadow-xs text-center min-w-[130px]">
                <span>VALIDATION</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#168A52] rotate-90 md:rotate-0" />
              <div className="px-5 py-3 rounded-xl bg-white border border-[#E5E7EB] shadow-xs text-center min-w-[130px]">
                <span>REVIEW</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#168A52] rotate-90 md:rotate-0" />
              <div className="px-5 py-3 rounded-xl bg-white border border-[#E5E7EB] shadow-xs text-center min-w-[130px]">
                <span>APPROVAL</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#168A52] rotate-90 md:rotate-0" />
              <div className="px-6 py-3 rounded-xl bg-[#168A52] text-white shadow-md text-center min-w-[150px]">
                <span>BRSR / ESG REPORT</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          6. FEATURES SECTION (6 Large Cards)
          ================================================== */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#168A52] uppercase tracking-wider block mb-2">
            PLATFORM CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F33] tracking-tight">
            Everything You Need For ESG Reporting
          </h2>
          <p className="text-sm text-[#667085] mt-2">
            A comprehensive suite of tools designed for enterprise-scale sustainability compliance and SEBI BRSR Core assurance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-8 rounded-[24px] bg-white border border-[#E5E7EB] shadow-xs hover:shadow-lg transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF7EF] text-[#168A52] flex items-center justify-center">
              <Building2 className="w-6 h-6 stroke-1.5" />
            </div>
            <h3 className="text-lg font-bold text-[#0B1F33]">Multi-Level Organization</h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              Manage Group → Subsidiary → Business Unit → Project. Flexible structural hierarchy accommodating diverse infrastructure operations.
            </p>
          </div>

          <div className="p-8 rounded-[24px] bg-white border border-[#E5E7EB] shadow-xs hover:shadow-lg transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF7EF] text-[#168A52] flex items-center justify-center">
              <ClipboardList className="w-6 h-6 stroke-1.5" />
            </div>
            <h3 className="text-lg font-bold text-[#0B1F33]">ESG Data Collection</h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              Collect structured Environmental, Social and Governance information with automated unit conversion and schedule tracking.
            </p>
          </div>

          <div className="p-8 rounded-[24px] bg-white border border-[#E5E7EB] shadow-xs hover:shadow-lg transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF7EF] text-[#168A52] flex items-center justify-center">
              <FileCheck2 className="w-6 h-6 stroke-1.5" />
            </div>
            <h3 className="text-lg font-bold text-[#0B1F33]">Evidence Management</h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              Connect supporting documents with ESG submissions. Stamped meter logs, utility billing receipts, and NABL test reports.
            </p>
          </div>

          <div className="p-8 rounded-[24px] bg-white border border-[#E5E7EB] shadow-xs hover:shadow-lg transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF7EF] text-[#168A52] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 stroke-1.5" />
            </div>
            <h3 className="text-lg font-bold text-[#0B1F33]">Validation & Review</h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              Validate submitted information through a controlled workflow. Dedicated 3-panel reviewer interface for auditors.
            </p>
          </div>

          <div className="p-8 rounded-[24px] bg-white border border-[#E5E7EB] shadow-xs hover:shadow-lg transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF7EF] text-[#168A52] flex items-center justify-center">
              <BarChart3 className="w-6 h-6 stroke-1.5" />
            </div>
            <h3 className="text-lg font-bold text-[#0B1F33]">Real-Time Visibility</h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              Monitor reporting completion across projects and subsidiaries. Granular drilldowns from holding company to individual site pumps.
            </p>
          </div>

          <div className="p-8 rounded-[24px] bg-white border border-[#E5E7EB] shadow-xs hover:shadow-lg transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF7EF] text-[#168A52] flex items-center justify-center">
              <FileSpreadsheet className="w-6 h-6 stroke-1.5" />
            </div>
            <h3 className="text-lg font-bold text-[#0B1F33]">BRSR / ESG Reporting</h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              Consolidate approved information into structured reports. Generate audit-ready statutory dossiers exportable to Excel and PDF.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================
          7. ESG FRAMEWORK SECTION (Tri-Pillar Trio)
          ================================================== */}
      <section id="framework" className="py-20 bg-white border-y border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#168A52] uppercase tracking-wider block mb-2">
              CORE METRIC TAXONOMY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F33] tracking-tight">
              Track Environmental, Social & Governance Performance
            </h2>
            <p className="text-sm text-[#667085] mt-2">
              Aligned with National Guidelines on Responsible Business Conduct (NGRBC) and SEBI BRSR Core KPIs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Environmental */}
            <div className="p-8 rounded-[24px] bg-[#F7F9FB] border border-emerald-200/80 shadow-xs flex flex-col justify-between space-y-6">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#168A52] flex items-center justify-center mb-5">
                  <Leaf className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1F33]">Environmental</h3>
                <p className="text-xs text-[#667085] mt-1 leading-relaxed">
                  Monitor environmental performance and resource-related indicators across construction yards and projects.
                </p>

                <div className="mt-6 pt-4 border-t border-slate-200 space-y-2 text-xs">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Core Indicators:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Energy', 'Water', 'Waste', 'Emissions', 'Biodiversity'].map((ind) => (
                      <span key={ind} className="px-2.5 py-1 rounded-full bg-white border border-slate-200 font-semibold text-slate-700">
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Pillar Progress</span>
                  <span className="text-2xl font-extrabold text-[#168A52]">82% Complete</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  DEMO DATA
                </span>
              </div>
            </div>

            {/* Social */}
            <div className="p-8 rounded-[24px] bg-[#F7F9FB] border border-sky-200/80 shadow-xs flex flex-col justify-between space-y-6">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mb-5">
                  <Users className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1F33]">Social</h3>
                <p className="text-xs text-[#667085] mt-1 leading-relaxed">
                  Workforce safety (Zero Harm LTIFR), community welfare, CSR investments, and human rights compliance.
                </p>

                <div className="mt-6 pt-4 border-t border-slate-200 space-y-2 text-xs">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Core Indicators:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Employees', 'Health & Safety', 'Training', 'Diversity', 'Community'].map((ind) => (
                      <span key={ind} className="px-2.5 py-1 rounded-full bg-white border border-slate-200 font-semibold text-slate-700">
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Pillar Progress</span>
                  <span className="text-2xl font-extrabold text-sky-700">76% Complete</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  DEMO DATA
                </span>
              </div>
            </div>

            {/* Governance */}
            <div className="p-8 rounded-[24px] bg-[#F7F9FB] border border-amber-200/80 shadow-xs flex flex-col justify-between space-y-6">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-5">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1F33]">Governance</h3>
                <p className="text-xs text-[#667085] mt-1 leading-relaxed">
                  Statutory clearances, anti-corruption training certifications, board oversight, and grievance handling.
                </p>

                <div className="mt-6 pt-4 border-t border-slate-200 space-y-2 text-xs">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Core Indicators:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Ethics', 'Compliance', 'Risk', 'Grievances', 'Data Privacy'].map((ind) => (
                      <span key={ind} className="px-2.5 py-1 rounded-full bg-white border border-slate-200 font-semibold text-slate-700">
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Pillar Progress</span>
                  <span className="text-2xl font-extrabold text-amber-700">91% Complete</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  DEMO DATA
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          8. WORKFLOW SECTION (Horizontal / Vertical Timeline)
          ================================================== */}
      <section id="workflow" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#168A52] uppercase tracking-wider block mb-2">
            END-TO-END PROCESS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F33] tracking-tight">
            From Data Collection To Final Report
          </h2>
          <p className="text-sm text-[#667085] mt-2">
            A linear, verifiable 6-step lifecycle ensuring audit segregation between site reporting and executive sign-off.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 relative">
          {[
            { step: '01', title: 'ADMIN', desc: 'Organization Setup', icon: Building2 },
            { step: '02', title: 'ESG MANAGER', desc: 'ESG Requirements', icon: ClipboardList },
            { step: '03', title: 'DATA CONTRIBUTOR', desc: 'Data & Evidence', icon: FileCheck2 },
            { step: '04', title: 'REVIEWER', desc: 'Validation', icon: ShieldCheck },
            { step: '05', title: 'APPROVER', desc: 'Final Approval', icon: CheckCircle2 },
            { step: '06', title: 'REPORT', desc: 'BRSR / ESG Report', icon: FileSpreadsheet }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs text-center flex flex-col justify-between space-y-4 hover:border-[#168A52] transition-colors"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#EAF7EF] text-[#168A52] font-extrabold text-sm flex items-center justify-center mx-auto mb-3">
                    {item.step}
                  </div>
                  <h4 className="text-xs font-extrabold text-[#0B1F33] uppercase tracking-wider">{item.title}</h4>
                  <p className="text-xs text-[#667085] mt-1 font-medium">{item.desc}</p>
                </div>
                <div className="pt-2 text-slate-400 flex justify-center">
                  <Icon className="w-4 h-4 text-[#168A52]" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ==================================================
          9. ROLE SECTION
          ================================================== */}
      <section className="py-20 bg-white border-y border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#168A52] uppercase tracking-wider block mb-2">
              SEPARATION OF DUTIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F33] tracking-tight">
              Built For Every Team In The Reporting Lifecycle
            </h2>
            <p className="text-sm text-[#667085] mt-2">
              Enforcing rigorous governance controls: site engineers cannot approve their own submissions, and auditors cannot alter raw metrics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                role: 'ADMIN',
                desc: 'Manage organization structure, users and ESG configuration.',
                color: 'border-indigo-200 bg-indigo-50/40 text-indigo-900',
                badge: 'System Architect'
              },
              {
                role: 'ESG MANAGER',
                desc: 'Manage ESG data collection, assignments and reporting progress.',
                color: 'border-teal-200 bg-teal-50/40 text-teal-900',
                badge: 'Workflow Coordinator'
              },
              {
                role: 'DATA CONTRIBUTOR',
                desc: 'Enter ESG data and upload supporting evidence.',
                color: 'border-emerald-200 bg-emerald-50/40 text-emerald-900',
                badge: 'Site EHS Engineer'
              },
              {
                role: 'REVIEWER',
                desc: 'Validate submitted data and verify attached evidence.',
                color: 'border-amber-200 bg-amber-50/40 text-amber-900',
                badge: 'Lead Auditor'
              },
              {
                role: 'APPROVER',
                desc: 'Review consolidated dossiers and authorize final reporting.',
                color: 'border-purple-200 bg-purple-50/40 text-purple-900',
                badge: 'Board Executive'
              }
            ].map((r, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-[24px] border ${r.color} shadow-xs flex flex-col justify-between space-y-4`}
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider block opacity-70 mb-1">
                    {r.badge}
                  </span>
                  <h4 className="text-sm font-extrabold">{r.role}</h4>
                  <p className="text-xs mt-2 leading-relaxed opacity-90">{r.desc}</p>
                </div>
                <div className="pt-2 flex items-center gap-1 text-[11px] font-bold">
                  <span>Role Workflow</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          10. DASHBOARD PREVIEW (Enterprise Browser Mockup)
          ================================================== */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#168A52] uppercase tracking-wider block mb-2">
            SINGLE PANE OF GLASS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F33] tracking-tight">
            Visibility From Project To Group Level
          </h2>
          <p className="text-sm text-[#667085] mt-2">
            Monitor real-time submission health, statutory clearance adherence, and data completion across all infrastructure assets.
          </p>
        </div>

        {/* Browser Mockup Window */}
        <div className="rounded-[24px] bg-white border border-[#E5E7EB] shadow-2xl overflow-hidden">
          {/* Browser Tab Bar */}
          <div className="bg-[#0B1F33] px-4 py-3 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-3 text-xs font-mono text-slate-400">
                https://portal.meil.in/esg/dashboard
              </span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 uppercase font-mono">
              ILLUSTRATIVE DEMO DATA
            </span>
          </div>

          {/* Inner Dashboard Surface */}
          <div className="p-6 sm:p-8 space-y-6 bg-[#F7F9FB]">
            {/* Filter Bar */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-slate-700">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-slate-400 font-normal">Active Filters:</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-100">FY 2026–27</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-100">All Subsidiaries</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-100">All Business Units</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-100">All Projects</span>
              </div>
              <span className="text-[#168A52] font-bold">100% Entities Synced</span>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                <span className="text-[11px] font-semibold text-slate-400 uppercase">Total Projects</span>
                <span className="text-2xl font-extrabold text-[#0B1F33] block mt-1">250+</span>
                <span className="text-[10px] text-[#168A52]">Across 12 States</span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                <span className="text-[11px] font-semibold text-purple-700 uppercase">Submitted</span>
                <span className="text-2xl font-extrabold text-purple-950 block mt-1">186</span>
                <span className="text-[10px] text-purple-600">Pending verification</span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                <span className="text-[11px] font-semibold text-amber-700 uppercase">Under Review</span>
                <span className="text-2xl font-extrabold text-amber-950 block mt-1">32</span>
                <span className="text-[10px] text-amber-600">In audit stage</span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                <span className="text-[11px] font-semibold text-emerald-700 uppercase">Approved</span>
                <span className="text-2xl font-extrabold text-emerald-950 block mt-1">154</span>
                <span className="text-[10px] text-emerald-600">Locked for filing</span>
              </div>
            </div>

            {/* Status Pills */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-bold text-[#0B1F33]">Project Status Health:</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" /> 154 Approved
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600" /> 32 Under Review
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" /> 58 Pending
                </span>
              </div>
              <Link to="/login" className="text-xs font-bold text-[#168A52] hover:underline">
                View Live System →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          11. DATA → REPORT TRANSFORMATION GRAPHIC
          ================================================== */}
      <section className="py-20 bg-white border-y border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#168A52] uppercase tracking-wider block mb-2">
              AUTOMATED COMPILATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F33] tracking-tight">
              Turn ESG Data Into Actionable Reports
            </h2>
            <p className="text-sm text-[#667085] mt-2">
              Transform dispersed site receipts and logs into audit-ready SEBI BRSR Core disclosures.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-11 gap-6 items-center">
            {/* Left: Raw Project Data (4 cols) */}
            <div className="lg:col-span-4 p-6 rounded-[24px] bg-[#F7F9FB] border border-slate-200 space-y-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                INPUT: DISPERSED PROJECT DATA
              </span>
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-white rounded-xl border border-slate-200 flex justify-between font-mono">
                  <span>Water Extraction:</span>
                  <strong className="text-[#0B1F33]">25,000 KL</strong>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 flex justify-between font-mono">
                  <span>Grid Electricity:</span>
                  <strong className="text-[#0B1F33]">120,000 kWh</strong>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 flex justify-between font-mono">
                  <span>C&D Waste Recycled:</span>
                  <strong className="text-[#0B1F33]">450 tonnes</strong>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 flex justify-between font-mono">
                  <span>Site Workforce:</span>
                  <strong className="text-[#0B1F33]">1,240 Onsite</strong>
                </div>
              </div>
            </div>

            {/* Center: Glowing Transformation Hub (3 cols) */}
            <div className="lg:col-span-3 text-center space-y-3 py-4">
              <div className="w-16 h-16 rounded-full bg-[#EAF7EF] text-[#168A52] flex items-center justify-center mx-auto shadow-md border border-[#168A52]/30">
                <Sparkles className="w-8 h-8 animate-spin" style={{ animationDuration: '8s' }} />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-extrabold text-[#0B1F33] uppercase tracking-wider">AUTOMATED PIPELINE</p>
                <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-[#168A52]">
                  <span>DATA</span>
                  <span>→</span>
                  <span>VALIDATE</span>
                  <span>→</span>
                  <span>CONSOLIDATE</span>
                </div>
              </div>
            </div>

            {/* Right: Consolidated BRSR Dossier (4 cols) */}
            <div className="lg:col-span-4 p-6 rounded-[24px] bg-[#0B1F33] text-white space-y-4 shadow-xl">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  OUTPUT: ESG / BRSR REPORT
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                  ✓ Approved
                </span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-300 font-sans">
                <p className="text-white font-bold">MEIL Annual Sustainability Statement</p>
                <p className="text-[11px] text-slate-400">SEBI Core Standard Compliance</p>
                <div className="grid grid-cols-2 gap-1.5 pt-2 text-[11px]">
                  <span>• Environmental Metrics</span>
                  <span>• Key Indicators</span>
                  <span>• Social Disclosures</span>
                  <span>• Project Rollup</span>
                  <span>• Governance Audit</span>
                  <span>• Sub Consolidation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          12. REPORT SECTION (Document Mockup)
          ================================================== */}
      <section id="reports" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#168A52] uppercase tracking-wider block mb-2">
            STATUTORY OUTPUT
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F33] tracking-tight">
            Structured ESG & BRSR Reporting
          </h2>
          <p className="text-sm text-[#667085] mt-2">
            Comprehensive annual report formatted to meet SEBI mandates, global investor benchmarks, and credit rating agency assessments.
          </p>
        </div>

        {/* Report Preview Surface */}
        <div className="max-w-4xl mx-auto rounded-[24px] bg-white border border-[#E5E7EB] shadow-xl p-8 sm:p-12 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-[#0B1F33] pb-6">
            <div>
              <span className="text-[10px] font-bold text-[#168A52] uppercase tracking-wider block">
                ANNUAL STATUTORY DOSSIER
              </span>
              <h3 className="text-2xl font-extrabold text-[#0B1F33]">MEIL ESG / BRSR REPORT</h3>
              <p className="text-xs text-slate-500 font-mono mt-0.5">Financial Year 2026–27</p>
            </div>
            <span className="px-3 py-1 rounded bg-[#EAF7EF] text-[#168A52] font-bold text-xs border border-[#168A52]/20">
              SAMPLE / DEMO REPORT
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block font-medium">Section 1</span>
              <span className="font-bold text-slate-800">Executive Summary</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block font-medium">Section 2</span>
              <span className="font-bold text-slate-800">Environmental</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block font-medium">Section 3</span>
              <span className="font-bold text-slate-800">Social & Safety</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block font-medium">Section 4</span>
              <span className="font-bold text-slate-800">Governance</span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed text-justify">
            "MEIL continues to scale national-priority infrastructure—from lift irrigation projects and clean energy solar parks to mass rapid transit—with strict carbon intensity monitoring and zero-harm occupational safety covenants."
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
            <Link
              to="/brsr-report"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#0B1F33] text-xs font-bold rounded-lg transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>View Sample Report</span>
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#168A52] hover:bg-[#127243] text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
            >
              <span>Access Portal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================
          13. SECURITY & GOVERNANCE
          ================================================== */}
      <section className="py-20 bg-white border-y border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#168A52] uppercase tracking-wider block mb-2">
              AUDIT INTEGRITY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F33] tracking-tight">
              Built For Controlled Enterprise Reporting
            </h2>
            <p className="text-sm text-[#667085] mt-2">
              Ensuring complete data veracity, accountability, and traceability required for statutory disclosures.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-[24px] bg-[#F7F9FB] border border-[#E5E7EB] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#0B1F33] flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#0B1F33]">Role-Based Access</h4>
              <p className="text-xs text-[#667085] leading-relaxed">
                Granular permissions ensure users can only perform authorized actions for their assigned projects.
              </p>
            </div>

            <div className="p-6 rounded-[24px] bg-[#F7F9FB] border border-[#E5E7EB] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#0B1F33] flex items-center justify-center">
                <History className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#0B1F33]">Audit Trail</h4>
              <p className="text-xs text-[#667085] leading-relaxed">
                Every action, submission, review and approval is permanently logged with timestamps and user details.
              </p>
            </div>

            <div className="p-6 rounded-[24px] bg-[#F7F9FB] border border-[#E5E7EB] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#0B1F33] flex items-center justify-center">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#0B1F33]">Evidence Tracking</h4>
              <p className="text-xs text-[#667085] leading-relaxed">
                Mandatory document uploads connect every reported data point with verifiable source evidence.
              </p>
            </div>

            <div className="p-6 rounded-[24px] bg-[#F7F9FB] border border-[#E5E7EB] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#0B1F33] flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#0B1F33]">Approval Workflow</h4>
              <p className="text-xs text-[#667085] leading-relaxed">
                Multi-stage validation prevents unreviewed or unverified information from reaching final reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          14. STATISTICS SECTION (Full-Width Dark Navy)
          ================================================== */}
      <section className="py-20 bg-[#0B1F33] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[10px] font-bold text-[#168A52] uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/80 inline-block mb-3">
            ILLUSTRATIVE DEMO METRICS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            ESG Reporting At A Glance
          </h2>
          <p className="text-xs text-slate-400 mt-2 max-w-xl mx-auto">
            Simulated enterprise deployment footprint showcasing reporting capacity.
          </p>

          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-1">
              <span className="text-4xl sm:text-5xl font-extrabold text-white font-mono block">250+</span>
              <span className="text-xs font-semibold text-[#168A52] uppercase tracking-wider">Projects Onboarded</span>
            </div>
            <div className="space-y-1">
              <span className="text-4xl sm:text-5xl font-extrabold text-white font-mono block">12</span>
              <span className="text-xs font-semibold text-[#168A52] uppercase tracking-wider">Subsidiary Divisions</span>
            </div>
            <div className="space-y-1">
              <span className="text-4xl sm:text-5xl font-extrabold text-white font-mono block">1,240+</span>
              <span className="text-xs font-semibold text-[#168A52] uppercase tracking-wider">Active ESG Indicators</span>
            </div>
            <div className="space-y-1">
              <span className="text-4xl sm:text-5xl font-extrabold text-white font-mono block">84%</span>
              <span className="text-xs font-semibold text-[#168A52] uppercase tracking-wider">Reporting Completion</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 mt-12">
            Example values shown for demonstration purposes only.
          </p>
        </div>
      </section>

      {/* ==================================================
          15. ABOUT SECTION
          ================================================== */}
      <section id="about" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#168A52] uppercase tracking-wider block mb-2">
            ABOUT THE PLATFORM
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F33] tracking-tight">
            Designed For Scalable ESG Reporting
          </h2>
          <p className="text-sm text-[#667085] mt-3 leading-relaxed">
            The platform provides a structured digital workflow for managing ESG information from project-level data collection through validation, approval and consolidated reporting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-[24px] bg-white border border-[#E5E7EB] shadow-xs text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF7EF] text-[#168A52] flex items-center justify-center mx-auto">
              <FolderKanban className="w-6 h-6 stroke-1.5" />
            </div>
            <h4 className="text-sm font-bold text-[#0B1F33] uppercase">PROJECT-LEVEL DATA</h4>
            <p className="text-xs text-[#667085] leading-relaxed">
              Capturing physical energy, fuel, water and safety metrics directly from site engineers at infrastructure assets.
            </p>
          </div>

          <div className="p-8 rounded-[24px] bg-white border border-[#E5E7EB] shadow-xs text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF7EF] text-[#168A52] flex items-center justify-center mx-auto">
              <Layers className="w-6 h-6 stroke-1.5" />
            </div>
            <h4 className="text-sm font-bold text-[#0B1F33] uppercase">MULTI-LEVEL CONSOLIDATION</h4>
            <p className="text-xs text-[#667085] leading-relaxed">
              Hierarchical rollups across business units and subsidiaries up to enterprise-wide executive scorecards.
            </p>
          </div>

          <div className="p-8 rounded-[24px] bg-white border border-[#E5E7EB] shadow-xs text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF7EF] text-[#168A52] flex items-center justify-center mx-auto">
              <FileSpreadsheet className="w-6 h-6 stroke-1.5" />
            </div>
            <h4 className="text-sm font-bold text-[#0B1F33] uppercase">STRUCTURED REPORTING</h4>
            <p className="text-xs text-[#667085] leading-relaxed">
              Standardized export conforming to the official SEBI BRSR Core format for Indian listed conglomerates.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================
          16. FINAL CTA SECTION (Dark Navy)
          ================================================== */}
      <section className="py-20 bg-[#0B1F33] text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#168A52] rounded-full blur-[140px]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Bring Your ESG Reporting Into One Platform
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Centralize ESG data, streamline validation and gain visibility across projects, business units and subsidiaries.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#168A52] hover:bg-[#127243] text-white font-bold text-sm shadow-lg transition-all"
            >
              <span>Access ESG Portal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#home"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold text-sm transition-colors"
            >
              <span>Explore Platform</span>
            </a>
          </div>
        </div>
      </section>

      {/* ==================================================
          17. FOOTER
          ================================================== */}
      <footer className="bg-[#0B1F33] text-slate-400 border-t border-slate-800 text-xs py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* Col 1: Logo & Info */}
            <div className="col-span-2 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-white border border-emerald-500/30">
                  <Leaf className="w-4 h-4 text-[#168A52]" />
                </div>
                <div>
                  <span className="text-base font-extrabold text-white tracking-tight">MEIL ESG</span>
                  <p className="text-[10px] text-slate-400 font-medium">BRSR Reporting Portal</p>
                </div>
              </div>
              <p className="text-slate-400 max-w-sm text-xs leading-relaxed">
                Centralized ESG Data Collection, Validation, Approval & BRSR Reporting for Megha Engineering and Infrastructures Limited.
              </p>
            </div>

            {/* Col 2: Platform */}
            <div className="space-y-2.5">
              <p className="font-bold text-white text-xs uppercase tracking-wider">PLATFORM</p>
              <ul className="space-y-1.5 text-xs">
                <li><a href="#home" className="hover:text-white transition-colors">Overview</a></li>
                <li><a href="#platform" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#workflow" className="hover:text-white transition-colors">Workflow</a></li>
                <li><Link to="/esg-group-dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link to="/brsr-report" className="hover:text-white transition-colors">Reports</Link></li>
              </ul>
            </div>

            {/* Col 3: ESG */}
            <div className="space-y-2.5">
              <p className="font-bold text-white text-xs uppercase tracking-wider">ESG</p>
              <ul className="space-y-1.5 text-xs">
                <li><a href="#framework" className="hover:text-white transition-colors">Environmental</a></li>
                <li><a href="#framework" className="hover:text-white transition-colors">Social</a></li>
                <li><a href="#framework" className="hover:text-white transition-colors">Governance</a></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Indicators</Link></li>
              </ul>
            </div>

            {/* Col 4: Portal & About */}
            <div className="space-y-2.5">
              <p className="font-bold text-white text-xs uppercase tracking-wider">PORTAL</p>
              <ul className="space-y-1.5 text-xs">
                <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Access Portal</Link></li>
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
            <p>© 2026 MEIL ESG Reporting Portal • Frontend Demonstration</p>
            <p>Demo interface — data shown is illustrative.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
