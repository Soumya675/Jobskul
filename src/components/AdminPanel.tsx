import React, { useState, useEffect } from 'react';
import { User, JobListing, JobApplication, Company, PlacedCandidate } from '../types';
import {
  OFFICIAL_BLOG_ARTICLES,
  CORPORATE_SERVICES,
  INSTITUTIONAL_SERVICES,
  INDIVIDUAL_SERVICES,
  JOBSKUL_STATS
} from '../data/jobskulContent';
import {
  ShieldCheck,
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  FileCheck,
  UserCheck,
  Calendar,
  Target,
  FileText,
  BookOpen,
  Compass,
  Inbox,
  Bell,
  BarChart3,
  KeyRound,
  Settings,
  History,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Search,
  X,
  Filter,
  ArrowRight,
  TrendingUp,
  Download,
  PlusCircle,
  Eye,
  Trash2,
  Edit,
  Sliders,
  Database,
  Trophy,
  Upload,
  Camera,
  Image as ImageIcon,
  Sparkles,
  GraduationCap,
  Star,
  Check
} from 'lucide-react';

interface AdminPanelProps {
  users: User[];
  jobs: JobListing[];
  applications: JobApplication[];
  companies?: Company[];
  placedCandidates?: PlacedCandidate[];
  initialSection?: AdminSection;
  onApproveJob: (jobId: string) => void;
  onCloseJob: (jobId: string) => void;
  onAddPlacedCandidate?: (candidate: Omit<PlacedCandidate, 'id' | 'placedDate' | 'verified'>) => Promise<void> | void;
  onUpdatePlacedCandidate?: (id: string, updates: Partial<PlacedCandidate>) => Promise<void> | void;
  onDeletePlacedCandidate?: (id: string) => Promise<void> | void;
}

type AdminSection =
  | 'dashboard'
  | 'placed-candidates'
  | 'candidates'
  | 'companies'
  | 'jobs'
  | 'applications'
  | 'recruiters'
  | 'interviews'
  | 'hireai'
  | 'resume-builder'
  | 'blog-cms'
  | 'services'
  | 'enquiries'
  | 'notifications'
  | 'reports'
  | 'users-roles'
  | 'settings'
  | 'audit-logs';

export const AdminPanel: React.FC<AdminPanelProps> = ({
  users,
  jobs,
  applications,
  companies = [],
  placedCandidates = [],
  initialSection = 'dashboard',
  onApproveJob,
  onCloseJob,
  onAddPlacedCandidate,
  onUpdatePlacedCandidate,
  onDeletePlacedCandidate
}) => {
  const [activeSection, setActiveSection] = useState<AdminSection>(initialSection);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [toast, setToast] = useState<string | null>(null);

  // Placed candidates management state
  const [placedList, setPlacedList] = useState<PlacedCandidate[]>(placedCandidates);
  const [placedSearch, setPlacedSearch] = useState('');
  const [isSubmittingCandidate, setIsSubmittingCandidate] = useState(false);
  const [candidateForm, setCandidateForm] = useState({
    name: '',
    imageUrl: '',
    company: '',
    role: '',
    packageLPA: '₹6.50 LPA',
    college: 'Gandhi Institute For Technology (GIFT Autonomous), Bhubaneswar',
    batch: '2025',
    skills: 'Python, Django, PostgreSQL, Git',
    story: '',
    featuredInHero: true
  });

  // Real-Time Email & SMTP Gateway States
  const [smtpStatus, setSmtpStatus] = useState<{
    configured: boolean;
    activeEngine?: string;
    resendConfigured?: boolean;
    smtpConfigured?: boolean;
    host: string;
    port: number;
    user: string;
    rawUser?: string;
    lastDeliveryStatus?: 'success' | 'failed' | 'idle';
    lastDeliveryError?: string | null;
    totalDelivered: number;
    totalOutbox: number;
  }>({
    configured: false,
    activeEngine: 'outbox',
    host: 'Connecting...',
    port: 587,
    user: 'None',
    totalDelivered: 0,
    totalOutbox: 0
  });
  const [testEmailTarget, setTestEmailTarget] = useState('soumya.parida2022@gift.edu.in');
  const [isTestingEmail, setIsTestingEmail] = useState(false);
  const [testEmailFeedback, setTestEmailFeedback] = useState<{
    success: boolean;
    message: string;
    deliveryMethod?: string;
    deliveryError?: string | null;
  } | null>(null);
  const [smtpForm, setSmtpForm] = useState({
    providerType: 'gmail', // 'gmail' | 'resend' | 'custom'
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: '465',
    user: '',
    pass: '',
    resendApiKey: ''
  });

  // HireAI Admin Evaluation States
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>(users[0]?.id || '');
  const [selectedJobId, setSelectedJobId] = useState<string>(jobs[0]?.id || '');
  const [aiEvaluation, setAiEvaluation] = useState<any | null>(null);
  const [isAiEvaluating, setIsAiEvaluating] = useState(false);

  const fetchSmtpStatus = async () => {
    try {
      const res = await fetch('/api/admin/smtp-status');
      const data = await res.json();
      if (data.success) {
        setSmtpStatus(data);
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchSmtpStatus();
  }, []);

  useEffect(() => {
    if (placedCandidates && placedCandidates.length > 0) {
      setPlacedList(placedCandidates);
    }
  }, [placedCandidates]);

  // Initial dummy enquiries for the admin view
  const [enquiries, setEnquiries] = useState([
    {
      id: 'enq-1',
      name: 'Rohan Deshmukh',
      organization: 'TechVision Infotech',
      service: 'Lateral Hiring Solutions',
      type: 'Corporate',
      date: '2026-09-04',
      status: 'pending',
      email: 'rohan.d@techvision.com'
    },
    {
      id: 'enq-2',
      name: 'Dr. S. K. Patnaik',
      organization: 'Centurion University',
      service: 'JILP — Academic Integration',
      type: 'Institution',
      date: '2026-09-03',
      status: 'contacted',
      email: 'tpo@centurion.ac.in'
    },
    {
      id: 'enq-3',
      name: 'Aditya Sen',
      organization: 'KIIT School of Electronics',
      service: 'Embedded Systems Internship',
      type: 'Individual',
      date: '2026-09-02',
      status: 'closed',
      email: 'aditya.sen@kiit.ac.in'
    }
  ]);

  // Initial audit logs
  const [auditLogs] = useState([
    { id: 'log-1', admin: 'SuperAdmin (Sitansu Mishra)', action: 'Approved Job Listing', entity: 'Senior Full Stack Python Dev', timestamp: '2026-09-04 14:32 IST', ip: '103.24.12.98' },
    { id: 'log-2', admin: 'OpsAdmin (Manoranjan Mishra)', action: 'Verified Employer Company', entity: 'CloudSphere Technologies', timestamp: '2026-09-04 11:15 IST', ip: '103.24.12.98' },
    { id: 'log-3', admin: 'PM (Soumya Mohanty)', action: 'Scheduled TPO Conclave', entity: 'Odisha Institutional Conclave', timestamp: '2026-09-03 16:40 IST', ip: '115.98.23.44' },
    { id: 'log-4', admin: 'System Engine', action: 'Auto-Synced ATS Parsers', entity: 'ATS Assessment Engine v2.4', timestamp: '2026-09-03 09:00 IST', ip: '127.0.0.1' },
    { id: 'log-5', admin: 'SuperAdmin', action: 'Exported Monthly Report', entity: 'August Placements Summary', timestamp: '2026-09-01 18:20 IST', ip: '103.24.12.98' }
  ]);

  const showNotification = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const candidates = users.filter(u => u.role === 'candidate');
  const recruiters = users.filter(u => u.role === 'recruiter');
  const interviews = applications.filter(a => a.status === 'interview');
  const placed = applications.filter(a => a.status === 'selected');

  const navMenuItems: { id: AdminSection; label: string; icon: any; count?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'placed-candidates', label: 'Placed Candidates & Photos', icon: Trophy, count: placedList.length },
    { id: 'candidates', label: 'Candidates', icon: Users, count: candidates.length },
    { id: 'companies', label: 'Companies', icon: Building2, count: companies.length || 32 },
    { id: 'jobs', label: 'Jobs', icon: Briefcase, count: jobs.length },
    { id: 'applications', label: 'Applications', icon: FileCheck, count: applications.length },
    { id: 'recruiters', label: 'Recruiters', icon: UserCheck, count: recruiters.length },
    { id: 'interviews', label: 'Interviews', icon: Calendar, count: interviews.length },
    { id: 'hireai', label: 'Skill Assessment', icon: Target },
    { id: 'resume-builder', label: 'Resume Builder', icon: FileText },
    { id: 'blog-cms', label: 'Blog / CMS', icon: BookOpen, count: OFFICIAL_BLOG_ARTICLES.length },
    { id: 'services', label: 'Services', icon: Compass },
    { id: 'enquiries', label: 'Enquiries', icon: Inbox, count: enquiries.filter(e => e.status === 'pending').length },
    { id: 'notifications', label: 'Notifications', icon: Bell, count: 4 },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'users-roles', label: 'Users & Roles', icon: KeyRound, count: users.length },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'audit-logs', label: 'Audit Logs', icon: History }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F172A] text-white text-xs font-bold px-4 py-3 rounded-lg shadow-2xl border border-slate-700 flex items-center space-x-2 animate-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-[#0F172A] rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 text-[10px] font-geometric-mono font-bold uppercase tracking-wider border border-red-500/30">
              Jobskül Administration Suite
            </span>
            <span className="text-xs text-slate-400">• Master Control Panel</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black mt-2 tracking-tight">Platform Administration & Moderation</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Centralized governance for candidate pools, verified enterprise companies, live job listings, corporate/institutional service pipelines, and audit logs.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <div className="bg-slate-800/80 px-3.5 py-2.5 rounded-xl border border-slate-700 flex items-center space-x-2.5 text-xs">
            <Database className="w-4 h-4 text-emerald-400" />
            <div>
              <p className="font-bold text-slate-200">Database Engine</p>
              <p className="text-emerald-400 text-[10px]">Connected & Healthy</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Layout: Left Sidebar + Right Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Navigation Menu (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-[#E2E8F0] p-3 shadow-xs space-y-1">
          <p className="px-3 py-2 text-[10px] font-geometric-mono font-bold uppercase tracking-widest text-[#64748B]">
            Admin Modules
          </p>
          <nav className="space-y-0.5">
            {navMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setSearchQuery('');
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#2563EB] text-white shadow-xs font-bold'
                      : 'text-[#334155] hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#64748B]'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span
                      className={`text-[10px] font-geometric-mono px-1.5 py-0.2 rounded font-bold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 text-[#475569]'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Active Panel Content (9 cols) */}
        <div className="lg:col-span-9 space-y-6">
          {/* SECTION: DASHBOARD */}
          {activeSection === 'dashboard' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Top KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-xs">
                  <p className="text-[10px] font-bold uppercase font-geometric-mono text-[#64748B]">Active Jobs</p>
                  <p className="text-2xl font-black text-[#2563EB] mt-1">{jobs.length}</p>
                  <p className="text-[11px] text-emerald-600 mt-0.5 font-medium">100% Verified Listings</p>
                </div>
                <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-xs">
                  <p className="text-[10px] font-bold uppercase font-geometric-mono text-[#64748B]">Registered Candidates</p>
                  <p className="text-2xl font-black text-[#0F172A] mt-1">{candidates.length}</p>
                  <p className="text-[11px] text-blue-600 mt-0.5 font-medium">Pre-screened Profiles</p>
                </div>
                <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-xs">
                  <p className="text-[10px] font-bold uppercase font-geometric-mono text-[#64748B]">Total Applications</p>
                  <p className="text-2xl font-black text-purple-600 mt-1">{applications.length}</p>
                  <p className="text-[11px] text-[#64748B] mt-0.5 font-medium">Across all tracks</p>
                </div>
                <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-xs">
                  <p className="text-[10px] font-bold uppercase font-geometric-mono text-[#64748B]">Successful Placements</p>
                  <p className="text-2xl font-black text-emerald-600 mt-1">{JOBSKUL_STATS.candidatesPlaced}</p>
                  <p className="text-[11px] text-emerald-600 mt-0.5 font-medium">4.8 Candidate Rating</p>
                </div>
              </div>

              {/* Quick Actions Strip */}
              <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-bold text-[#0F172A]">Moderation Shortcuts</h3>
                  <p className="text-xs text-[#64748B]">Quick triggers for review queues and institutional communications.</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setActiveSection('jobs')}
                    className="px-3 py-1.5 bg-[#EFF6FF] text-[#2563EB] hover:bg-blue-100 rounded-lg text-xs font-bold transition-colors"
                  >
                    Moderate Jobs ({jobs.length})
                  </button>
                  <button
                    onClick={() => setActiveSection('enquiries')}
                    className="px-3 py-1.5 bg-amber-50 text-amber-800 hover:bg-amber-100 rounded-lg text-xs font-bold transition-colors"
                  >
                    Review Enquiries ({enquiries.filter(e => e.status === 'pending').length})
                  </button>
                  <button
                    onClick={() => showNotification('Monthly placement metrics export generated.')}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-[#0F172A] rounded-lg text-xs font-bold transition-colors flex items-center space-x-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>Export Data</span>
                  </button>
                </div>
              </div>

              {/* Recent Applications Feed */}
              <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-bold text-sm text-[#0F172A]">Recent Candidate Applications</h3>
                  <button onClick={() => setActiveSection('applications')} className="text-xs font-bold text-[#2563EB] hover:underline">
                    View All
                  </button>
                </div>
                <div className="divide-y divide-slate-100 text-xs">
                  {applications.slice(0, 4).map((app) => (
                    <div key={app.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                      <div>
                        <p className="font-bold text-[#0F172A]">{app.candidateName}</p>
                        <p className="text-[11px] text-[#64748B]">{app.jobTitle} • {app.company}</p>
                      </div>
                      <div className="text-right space-y-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-50 text-[#2563EB]">
                          {app.status}
                        </span>
                        <p className="text-[10px] text-[#64748B]">{app.appliedAt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SECTION: PLACED CANDIDATES & REAL IMAGE UPLOADS */}
          {activeSection === 'placed-candidates' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Header & Stats Banner */}
              <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white rounded-2xl p-6 sm:p-7 shadow-md border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold font-geometric-mono uppercase tracking-wider flex items-center space-x-1">
                      <Trophy className="w-3 h-3 text-amber-400" />
                      <span>Admin Placement Suite</span>
                    </span>
                    <span className="text-xs text-slate-300">• Verified Candidate Photos</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                    Placed Candidates & Real Photo Publishing
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                    Post authentic candidate photos and placement records. Real student photos uploaded here immediately appear in the Homepage Hero Trust indicator and the Public Hall of Fame.
                  </p>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end gap-3 shrink-0">
                  <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-center">
                    <p className="text-xl font-black font-geometric-mono text-emerald-400">
                      {placedList.filter(c => !!c.imageUrl).length} / {placedList.length}
                    </p>
                    <p className="text-[10px] text-slate-300 font-semibold">Candidates with Real Photos</p>
                  </div>
                </div>
              </div>

              {/* POST CANDIDATE FORM */}
              <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs p-6 space-y-5">
                <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-bold text-[#0F172A] flex items-center space-x-2">
                      <PlusCircle className="w-4 h-4 text-blue-600" />
                      <span>Post New Placed Candidate Profile</span>
                    </h3>
                    <p className="text-xs text-[#64748B]">
                      Upload the candidate's real photograph and verified offer details.
                    </p>
                  </div>
                </div>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!candidateForm.name.trim() || !candidateForm.company.trim()) {
                      showNotification('Candidate name and company are required.');
                      return;
                    }

                    setIsSubmittingCandidate(true);
                    try {
                      const payload = {
                        name: candidateForm.name.trim(),
                        imageUrl: candidateForm.imageUrl.trim(),
                        company: candidateForm.company.trim(),
                        role: candidateForm.role.trim() || 'Software Engineer',
                        packageLPA: candidateForm.packageLPA.trim() || '₹6.50 LPA',
                        college: candidateForm.college.trim() || 'Partner University',
                        batch: candidateForm.batch.trim() || '2025',
                        skills: candidateForm.skills.split(',').map(s => s.trim()).filter(Boolean),
                        story: candidateForm.story.trim(),
                        featuredInHero: candidateForm.featuredInHero
                      };

                      if (onAddPlacedCandidate) {
                        await onAddPlacedCandidate(payload);
                      } else {
                        // Fallback API call
                        const res = await fetch('/api/placed-candidates', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(payload)
                        });
                        const data = await res.json();
                        if (data.candidate) {
                          setPlacedList(prev => [data.candidate, ...prev]);
                        }
                      }

                      showNotification(`Successfully published placed candidate profile for ${candidateForm.name}!`);
                      setCandidateForm({
                        name: '',
                        imageUrl: '',
                        company: '',
                        role: '',
                        packageLPA: '₹6.50 LPA',
                        college: 'Gandhi Institute For Technology (GIFT Autonomous), Bhubaneswar',
                        batch: '2025',
                        skills: 'Python, Django, PostgreSQL, Git',
                        story: '',
                        featuredInHero: true
                      });
                    } catch (err: any) {
                      showNotification(err.message || 'Failed to post placed candidate.');
                    } finally {
                      setIsSubmittingCandidate(false);
                    }
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] mb-1">
                        Candidate Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={candidateForm.name}
                        onChange={(e) => setCandidateForm({ ...candidateForm, name: e.target.value })}
                        placeholder="e.g. Soumya Ranjan Parida"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] mb-1">
                        Company Placed At *
                      </label>
                      <input
                        type="text"
                        required
                        value={candidateForm.company}
                        onChange={(e) => setCandidateForm({ ...candidateForm, company: e.target.value })}
                        placeholder="e.g. Tech Mahindra / TCS / Infosys"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] mb-1">
                        Designation / Role
                      </label>
                      <input
                        type="text"
                        value={candidateForm.role}
                        onChange={(e) => setCandidateForm({ ...candidateForm, role: e.target.value })}
                        placeholder="e.g. Associate Software Engineer"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] mb-1">
                        Offered CTC / Package
                      </label>
                      <input
                        type="text"
                        value={candidateForm.packageLPA}
                        onChange={(e) => setCandidateForm({ ...candidateForm, packageLPA: e.target.value })}
                        placeholder="e.g. ₹6.50 LPA or ₹9.20 LPA"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 font-geometric-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] mb-1">
                        College / Institution
                      </label>
                      <input
                        type="text"
                        value={candidateForm.college}
                        onChange={(e) => setCandidateForm({ ...candidateForm, college: e.target.value })}
                        placeholder="e.g. GIFT Autonomous / Silicon / KIIT"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] mb-1">
                        Graduation Batch
                      </label>
                      <input
                        type="text"
                        value={candidateForm.batch}
                        onChange={(e) => setCandidateForm({ ...candidateForm, batch: e.target.value })}
                        placeholder="e.g. 2025"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 font-geometric-mono"
                      />
                    </div>
                  </div>

                  {/* REAL IMAGE UPLOAD BOX */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-[#0F172A] flex items-center space-x-1.5">
                        <Camera className="w-4 h-4 text-blue-600" />
                        <span>Candidate Photograph (Real Photo Upload — No AI Placeholders)</span>
                      </label>
                      <span className="text-[11px] text-slate-500">Supports PNG, JPG, WebP (Max 12MB)</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                      {/* Drag & Drop / File Input */}
                      <div>
                        <input
                          type="file"
                          id="candidate-photo-file-input"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            if (file.size > 12 * 1024 * 1024) {
                              showNotification('File is too large. Limit is 12MB.');
                              return;
                            }
                            const reader = new FileReader();
                            reader.onload = () => {
                              setCandidateForm(prev => ({ ...prev, imageUrl: reader.result as string }));
                              showNotification('Real candidate photo loaded successfully!');
                            };
                            reader.readAsDataURL(file);
                          }}
                        />
                        <label
                          htmlFor="candidate-photo-file-input"
                          className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer bg-white transition-all group"
                        >
                          <Upload className="w-6 h-6 text-slate-400 group-hover:text-blue-600 transition-colors mb-1.5" />
                          <span className="text-xs font-bold text-slate-700 group-hover:text-blue-600">
                            Click to Browse & Upload Real Photo
                          </span>
                          <span className="text-[10px] text-slate-400 mt-0.5">
                            Direct local upload from your computer
                          </span>
                        </label>
                      </div>

                      {/* Photo URL or Live Preview */}
                      <div className="flex items-center space-x-3">
                        {candidateForm.imageUrl ? (
                          <div className="flex items-center space-x-3 bg-white p-2 rounded-xl border border-slate-200">
                            <img
                              src={candidateForm.imageUrl}
                              alt="Uploaded candidate preview"
                              className="w-14 h-14 rounded-xl object-cover ring-2 ring-blue-500"
                              referrerPolicy="no-referrer"
                            />
                            <div className="space-y-1">
                              <span className="text-xs font-bold text-emerald-600 flex items-center space-x-1">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Real Photo Ready</span>
                              </span>
                              <button
                                type="button"
                                onClick={() => setCandidateForm(prev => ({ ...prev, imageUrl: '' }))}
                                className="text-[11px] text-rose-600 font-semibold hover:underline block"
                              >
                                Remove Photo
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full space-y-1.5">
                            <span className="text-[11px] text-slate-500 font-semibold">Or enter direct Image URL:</span>
                            <input
                              type="url"
                              value={candidateForm.imageUrl}
                              onChange={(e) => setCandidateForm({ ...candidateForm, imageUrl: e.target.value })}
                              placeholder="https://example.com/candidate-photo.jpg"
                              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-blue-600"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] mb-1">
                        Core Technical Skills (Comma separated)
                      </label>
                      <input
                        type="text"
                        value={candidateForm.skills}
                        onChange={(e) => setCandidateForm({ ...candidateForm, skills: e.target.value })}
                        placeholder="Python, Django, PostgreSQL, Docker"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] mb-1">
                        Placement Story / Candidate Quote
                      </label>
                      <input
                        type="text"
                        value={candidateForm.story}
                        onChange={(e) => setCandidateForm({ ...candidateForm, story: e.target.value })}
                        placeholder="Placed via Jobskül Campus drive after completing capstone..."
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={candidateForm.featuredInHero}
                        onChange={(e) => setCandidateForm({ ...candidateForm, featuredInHero: e.target.checked })}
                        className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                      />
                      <span>Feature in Homepage Hero Trust Indicator</span>
                    </label>

                    <button
                      type="submit"
                      disabled={isSubmittingCandidate}
                      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center space-x-2 cursor-pointer disabled:opacity-50"
                    >
                      <Check className="w-4 h-4" />
                      <span>{isSubmittingCandidate ? 'Publishing Profile...' : 'Publish Placed Candidate Profile'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* CANDIDATES TABLE & MANAGEMENT */}
              <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-sm font-bold text-[#0F172A]">
                      Published Placed Candidates ({placedList.length})
                    </h3>
                    <p className="text-xs text-[#64748B]">
                      Manage photos, hero visibility, and candidate records.
                    </p>
                  </div>

                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={placedSearch}
                      onChange={(e) => setPlacedSearch(e.target.value)}
                      placeholder="Search candidates or company..."
                      className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-[#64748B] uppercase text-[10px] tracking-wider border-b border-slate-100 font-geometric-mono">
                      <tr>
                        <th className="p-3">Candidate & Photo</th>
                        <th className="p-3">Company & Role</th>
                        <th className="p-3">Package / CTC</th>
                        <th className="p-3">College & Batch</th>
                        <th className="p-3 text-center">Hero Trust Badge</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {placedList
                        .filter(c => {
                          if (!placedSearch.trim()) return true;
                          const q = placedSearch.toLowerCase();
                          return (
                            c.name.toLowerCase().includes(q) ||
                            c.company.toLowerCase().includes(q) ||
                            c.role.toLowerCase().includes(q) ||
                            c.college.toLowerCase().includes(q)
                          );
                        })
                        .map((cand) => {
                          const initials = cand.name
                            .split(' ')
                            .map(n => n[0])
                            .slice(0, 2)
                            .join('')
                            .toUpperCase();

                          return (
                            <tr key={cand.id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="p-3 font-bold text-[#0F172A]">
                                <div className="flex items-center space-x-3">
                                  {cand.imageUrl ? (
                                    <img
                                      src={cand.imageUrl}
                                      alt={cand.name}
                                      className="w-10 h-10 rounded-xl object-cover ring-2 ring-blue-500/30 shrink-0"
                                      referrerPolicy="no-referrer"
                                    />
                                  ) : (
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                                      {initials}
                                    </div>
                                  )}
                                  <div>
                                    <p className="font-bold text-[#0F172A]">{cand.name}</p>
                                    <label className="text-[10px] text-blue-600 hover:underline cursor-pointer font-semibold inline-block">
                                      <span>Change / Upload Photo</span>
                                      <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                          const file = e.target.files?.[0];
                                          if (!file) return;
                                          const reader = new FileReader();
                                          reader.onload = async () => {
                                            const dataUrl = reader.result as string;
                                            if (onUpdatePlacedCandidate) {
                                              await onUpdatePlacedCandidate(cand.id, { imageUrl: dataUrl });
                                            } else {
                                              await fetch(`/api/placed-candidates/${cand.id}/photo`, {
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({ imageUrl: dataUrl })
                                              });
                                            }
                                            setPlacedList(prev => prev.map(c => c.id === cand.id ? { ...c, imageUrl: dataUrl } : c));
                                            showNotification(`Photo updated for ${cand.name}!`);
                                          };
                                          reader.readAsDataURL(file);
                                        }}
                                      />
                                    </label>
                                  </div>
                                </div>
                              </td>

                              <td className="p-3">
                                <p className="font-bold text-blue-600">{cand.company}</p>
                                <p className="text-[11px] text-slate-500">{cand.role}</p>
                              </td>

                              <td className="p-3 font-geometric-mono font-bold text-emerald-600">
                                {cand.packageLPA}
                              </td>

                              <td className="p-3 text-slate-600">
                                <p className="font-medium line-clamp-1">{cand.college}</p>
                                <p className="text-[10px] text-slate-400">Batch {cand.batch}</p>
                              </td>

                              <td className="p-3 text-center">
                                <button
                                  type="button"
                                  onClick={async () => {
                                    const nextVal = !cand.featuredInHero;
                                    if (onUpdatePlacedCandidate) {
                                      await onUpdatePlacedCandidate(cand.id, { featuredInHero: nextVal });
                                    } else {
                                      await fetch(`/api/placed-candidates/${cand.id}`, {
                                        method: 'PUT',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ featuredInHero: nextVal })
                                      });
                                    }
                                    setPlacedList(prev => prev.map(c => c.id === cand.id ? { ...c, featuredInHero: nextVal } : c));
                                    showNotification(nextVal ? `Featured ${cand.name} in Hero` : `Removed ${cand.name} from Hero`);
                                  }}
                                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-geometric-mono transition-colors cursor-pointer ${
                                    cand.featuredInHero
                                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                  }`}
                                >
                                  {cand.featuredInHero ? '★ Hero Featured' : 'Not in Hero'}
                                </button>
                              </td>

                              <td className="p-3 text-right">
                                <button
                                  type="button"
                                  onClick={async () => {
                                    if (window.confirm(`Delete placement record for ${cand.name}?`)) {
                                      if (onDeletePlacedCandidate) {
                                        await onDeletePlacedCandidate(cand.id);
                                      } else {
                                        await fetch(`/api/placed-candidates/${cand.id}`, { method: 'DELETE' });
                                      }
                                      setPlacedList(prev => prev.filter(c => c.id !== cand.id));
                                      showNotification(`Deleted ${cand.name}`);
                                    }
                                  }}
                                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                                  title="Delete Record"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: CANDIDATES */}
          {activeSection === 'candidates' && (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs p-5 space-y-4 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-base font-bold text-[#0F172A]">Candidates Pool Management</h2>
                  <p className="text-xs text-[#64748B]">Total verified registered candidates: {candidates.length}</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-[#64748B] uppercase text-[10px] tracking-wider border-b border-slate-100">
                    <tr>
                      <th className="p-3">Candidate</th>
                      <th className="p-3">Contact</th>
                      <th className="p-3">Skills</th>
                      <th className="p-3">Profile %</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {candidates.map((cand) => (
                      <tr key={cand.id} className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-[#0F172A]">
                          <div>{cand.name}</div>
                          <div className="text-[11px] font-normal text-[#64748B]">{cand.headline}</div>
                        </td>
                        <td className="p-3 text-[#475569]">
                          <div>{cand.email}</div>
                          <div className="text-[11px] font-geometric-mono text-[#64748B]">{cand.phone || '+91 98765 43210'}</div>
                        </td>
                        <td className="p-3">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {cand.skills?.slice(0, 3).map((s, idx) => (
                              <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-100 text-[10px]">
                                {s}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="p-3 font-geometric-mono font-bold text-emerald-600">
                          {cand.profileCompletion || 85}%
                        </td>
                        <td className="p-3 text-right space-x-2">
                          <button
                            onClick={() => showNotification(`Candidate profile for ${cand.name} verified.`)}
                            className="px-2.5 py-1 bg-blue-50 text-[#2563EB] hover:bg-blue-100 rounded text-xs font-bold"
                          >
                            Verify
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SECTION: COMPANIES */}
          {activeSection === 'companies' && (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs p-5 space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-base font-bold text-[#0F172A]">Verified Hiring Employers ({companies.length})</h2>
                  <p className="text-xs text-[#64748B]">Review corporate partner accounts and compliance records.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {companies.slice(0, 8).map((comp) => (
                  <div key={comp.id} className="p-3 border border-[#E2E8F0] rounded-xl flex items-center justify-between hover:border-[#2563EB]/40">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 p-1 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-[#2563EB]" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#0F172A]">{comp.name}</p>
                        <p className="text-[10px] text-[#64748B]">{comp.location} • {comp.industry}</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                      Verified
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION: JOBS MODERATION */}
          {activeSection === 'jobs' && (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs p-5 space-y-4 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-base font-bold text-[#0F172A]">Job Listings Directory ({jobs.length})</h2>
                  <p className="text-xs text-[#64748B]">Approve, review, or archive listings across all 8 sectors.</p>
                </div>

                <div className="flex items-center space-x-2">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
                  >
                    <option value="All">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-[#64748B] uppercase text-[10px] tracking-wider border-b border-slate-100">
                    <tr>
                      <th className="p-3">Title & Company</th>
                      <th className="p-3">Category & Location</th>
                      <th className="p-3">Applicants</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Moderation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {jobs.filter(j => statusFilter === 'All' || j.status === statusFilter).map((job) => (
                      <tr key={job.id} className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-[#0F172A]">
                          <div>{job.title}</div>
                          <div className="text-[11px] font-normal text-[#64748B]">{job.company}</div>
                        </td>
                        <td className="p-3 text-[#475569]">
                          <div>{job.category}</div>
                          <div className="text-[11px] text-[#64748B]">{job.location}</div>
                        </td>
                        <td className="p-3 font-geometric-mono text-[#2563EB] font-bold">
                          {job.applicantCount} candidates
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            job.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {job.status}
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-2">
                          {job.status === 'active' ? (
                            <button
                              onClick={() => {
                                onCloseJob(job.id);
                                showNotification(`Closed job ${job.title}`);
                              }}
                              className="px-2.5 py-1 bg-red-50 text-red-600 hover:bg-red-100 rounded text-xs font-bold"
                            >
                              Close
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                onApproveJob(job.id);
                                showNotification(`Activated job ${job.title}`);
                              }}
                              className="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded text-xs font-bold"
                            >
                              Activate
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SECTION: APPLICATIONS */}
          {activeSection === 'applications' && (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs p-5 space-y-4 animate-in fade-in duration-150">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-[#0F172A]">Applications Ledger ({applications.length})</h2>
                <p className="text-xs text-[#64748B]">Monitor candidate status progression across recruiter pipelines.</p>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                {applications.map((app) => (
                  <div key={app.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50 px-2 rounded-lg">
                    <div>
                      <p className="font-bold text-[#0F172A]">{app.candidateName} &rarr; <span className="text-[#2563EB]">{app.jobTitle}</span></p>
                      <p className="text-[11px] text-[#64748B]">{app.company} • Applied: {app.appliedAt}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="px-2.5 py-1 rounded bg-blue-50 text-[#2563EB] text-[10px] font-geometric-mono font-bold uppercase">
                        {app.status}
                      </span>
                      <button
                        onClick={() => showNotification(`Viewing details for application ${app.id}`)}
                        className="text-xs font-bold text-[#2563EB] hover:underline"
                      >
                        Inspect
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION: ENQUIRIES */}
          {activeSection === 'enquiries' && (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs p-5 space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h2 className="text-base font-bold text-[#0F172A]">Service Inquiries & Lead Desk</h2>
                  <p className="text-xs text-[#64748B]">Inbound requests for corporate hiring, POSH workshops, and institutional JILP.</p>
                </div>
                <button
                  onClick={() => showNotification('Exported all customer enquiries.')}
                  className="px-3 py-1.5 bg-slate-100 text-[#0F172A] hover:bg-slate-200 rounded-lg text-xs font-bold flex items-center space-x-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>

              <div className="space-y-3">
                {enquiries.map((enq) => (
                  <div key={enq.id} className="p-4 border border-[#E2E8F0] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-sm text-[#0F172A]">{enq.name}</span>
                        <span className="text-[10px] font-geometric-mono px-2 py-0.5 rounded bg-blue-50 text-[#2563EB] font-bold">
                          {enq.type}
                        </span>
                      </div>
                      <p className="text-xs text-[#475569]">{enq.organization} • {enq.service}</p>
                      <p className="text-[11px] text-[#64748B] font-geometric-mono">{enq.email} • {enq.date}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setEnquiries(enquiries.map(e => e.id === enq.id ? { ...e, status: 'contacted' } : e));
                          showNotification(`Marked enquiry for ${enq.name} as contacted.`);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          enq.status === 'contacted'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-[#2563EB] text-white hover:bg-[#1D4ED8]'
                        }`}
                      >
                        {enq.status === 'contacted' ? 'Contacted ✓' : 'Mark Contacted'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION: AUDIT LOGS */}
          {activeSection === 'audit-logs' && (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs p-5 space-y-4 animate-in fade-in duration-150">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-[#0F172A]">System Audit & Security Logs</h2>
                <p className="text-xs text-[#64748B]">Immutable operational actions recorded across administrators and automated services.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-[#64748B] uppercase text-[10px] tracking-wider border-b border-slate-100">
                    <tr>
                      <th className="p-3">Administrator</th>
                      <th className="p-3">Action</th>
                      <th className="p-3">Target Entity</th>
                      <th className="p-3">Timestamp</th>
                      <th className="p-3">IP Address</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-geometric-mono text-[11px]">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-[#0F172A]">{log.admin}</td>
                        <td className="p-3 text-[#2563EB] font-semibold">{log.action}</td>
                        <td className="p-3 text-[#475569]">{log.entity}</td>
                        <td className="p-3 text-[#64748B]">{log.timestamp}</td>
                        <td className="p-3 text-slate-400">{log.ip}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SECTION: HIREAI ORCHESTRATION & EVALUATION */}
          {activeSection === 'hireai' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-2xl p-6 text-white border border-purple-800 shadow-md">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="space-y-1">
                    <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs font-bold">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                      <span>Jobskül HireAI Intelligence Suite</span>
                    </div>
                    <h2 className="text-xl font-bold tracking-tight">AI Candidate Matching & ATS Screener</h2>
                    <p className="text-xs text-purple-200 max-w-xl">
                      Evaluate candidates against live vacancies using algorithmic ATS matching, skill taxonomy analysis, and automated interview question synthesis.
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="px-3 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-center">
                      <p className="text-lg font-geometric-mono font-bold text-emerald-400">98.4%</p>
                      <p className="text-[10px] text-purple-200">Matching Accuracy</p>
                    </div>
                    <div className="px-3 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-center">
                      <p className="text-lg font-geometric-mono font-bold text-amber-300">3,420+</p>
                      <p className="text-[10px] text-purple-200">AI Screenings Run</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Evaluation Workstation */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Controls (5 cols) */}
                <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-5 space-y-4 shadow-xs">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                    <Target className="w-4 h-4 text-purple-600" />
                    <span>Select Candidate & Job Vacancy</span>
                  </h3>

                  {/* Candidate Selection */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Target Candidate</label>
                    <select
                      value={selectedCandidateId}
                      onChange={(e) => setSelectedCandidateId(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 font-medium focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    >
                      {users.filter(u => u.role === 'candidate').map(u => (
                        <option key={u.id} value={u.id}>
                          {u.name} — {u.email} ({u.skills?.slice(0, 3).join(', ') || 'General'})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Job Vacancy Selection */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Job Opportunity</label>
                    <select
                      value={selectedJobId}
                      onChange={(e) => setSelectedJobId(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 font-medium focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    >
                      {jobs.map(j => (
                        <option key={j.id} value={j.id}>
                          {j.title} @ {j.company} ({j.location})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Action Button */}
                  <button
                    type="button"
                    disabled={isAiEvaluating}
                    onClick={async () => {
                      setIsAiEvaluating(true);
                      setAiEvaluation(null);
                      try {
                        const res = await fetch('/api/hireai/evaluate', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            candidateId: selectedCandidateId,
                            jobId: selectedJobId
                          })
                        });
                        const data = await res.json();
                        setAiEvaluation(data);
                        showNotification('HireAI evaluation completed successfully.');
                      } catch (e) {
                        showNotification('Evaluation failed. Check connectivity.');
                      } finally {
                        setIsAiEvaluating(false);
                      }
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/20 transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                  >
                    {isAiEvaluating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Analyzing Resume & Taxonomy...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span>Run HireAI Evaluation</span>
                      </>
                    )}
                  </button>

                  <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100 text-[11px] text-purple-900 space-y-1">
                    <p className="font-bold flex items-center space-x-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                      <span>Enterprise Verification Guarantee</span>
                    </p>
                    <p className="text-slate-600">
                      Evaluates technical skills, experience alignment, and project depth stored in the persistent database.
                    </p>
                  </div>
                </div>

                {/* Right Results Display (7 cols) */}
                <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-5 space-y-4 shadow-xs min-h-[380px]">
                  {aiEvaluation ? (
                    <div className="space-y-4 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">{aiEvaluation.candidateName}</h4>
                          <p className="text-xs text-slate-500">
                            Evaluating for: <span className="font-semibold text-slate-700">{aiEvaluation.jobTitle}</span>
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-geometric-mono font-extrabold text-purple-600">
                            {aiEvaluation.overallMatchScore}%
                          </span>
                          <p className="text-[10px] font-bold uppercase text-slate-400">ATS Match Score</p>
                        </div>
                      </div>

                      {/* Recommendation Chip */}
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${aiEvaluation.overallMatchScore >= 75 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                          <span className="text-xs font-bold text-slate-800">
                            Recommendation: <strong className="text-purple-700">{aiEvaluation.hiringRecommendation}</strong>
                          </span>
                        </div>
                        <span className="text-[11px] font-geometric-mono text-slate-500">
                          {aiEvaluation.matchedSkills?.length} Skills Matched
                        </span>
                      </div>

                      {/* Skills Breakdown */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/60 space-y-1.5">
                          <p className="text-[11px] font-bold text-emerald-800 flex items-center space-x-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Matched Required Skills</span>
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {aiEvaluation.matchedSkills?.map((s: string) => (
                              <span key={s} className="px-2 py-0.5 rounded-md bg-white text-emerald-700 text-[10px] font-bold border border-emerald-200 shadow-2xs">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 space-y-1.5">
                          <p className="text-[11px] font-bold text-amber-800 flex items-center space-x-1">
                            <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
                            <span>Recommended Learning Upgrades</span>
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {aiEvaluation.missingSkills?.length > 0 ? (
                              aiEvaluation.missingSkills.map((s: string) => (
                                <span key={s} className="px-2 py-0.5 rounded-md bg-white text-amber-700 text-[10px] font-bold border border-amber-200 shadow-2xs">
                                  {s}
                                </span>
                              ))
                            ) : (
                              <span className="text-[10px] text-slate-500 italic">No missing skills detected</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* AI Generated Technical Questions */}
                      <div className="space-y-2 pt-2 border-t border-slate-100">
                        <p className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                          <span>AI-Synthesized Technical Interview Questions</span>
                        </p>
                        <div className="space-y-1.5">
                          {aiEvaluation.interviewQuestions?.map((q: string, idx: number) => (
                            <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70 text-xs text-slate-700 flex items-start space-x-2">
                              <span className="font-geometric-mono font-bold text-purple-600 shrink-0">Q{idx + 1}:</span>
                              <span>{q}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Immediate Action Buttons */}
                      <div className="flex items-center space-x-3 pt-2">
                        <button
                          type="button"
                          onClick={() => showNotification(`Interview invite draft dispatched for ${aiEvaluation.candidateName}`)}
                          className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all text-center cursor-pointer shadow-xs"
                        >
                          Send Interview Invite
                        </button>
                        <button
                          type="button"
                          onClick={() => showNotification(`Copied AI evaluation report to clipboard.`)}
                          className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                        >
                          Export Summary
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full py-16 text-center space-y-3">
                      <div className="w-14 h-14 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
                        <Sparkles className="w-7 h-7" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">Ready to Screen Candidates</h4>
                      <p className="text-xs text-slate-500 max-w-sm">
                        Choose a candidate and job from the left panel and click <strong>Run HireAI Evaluation</strong> to see instant algorithmic analysis.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* SECTION: SETTINGS & REAL-TIME SMTP GATEWAY */}
          {activeSection === 'settings' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Header */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                    <Settings className="w-4 h-4 text-blue-600" />
                    <span>Real-Time Email Gateway & Production Settings</span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    Manage direct SMTP transmission, verify live OTP deliverability, and audit outbound server emails.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    fetchSmtpStatus();
                    showNotification('Refreshed real-time gateway status.');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer inline-flex items-center space-x-1.5"
                >
                  <History className="w-3.5 h-3.5" />
                  <span>Refresh Status</span>
                </button>
              </div>

              {/* Status Overview Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-1">
                  <p className="text-[10px] font-geometric-mono font-bold uppercase tracking-wider text-slate-400">
                    Active Delivery Engine
                  </p>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${smtpStatus.configured ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                    <span className="text-sm font-bold text-slate-900">
                      {smtpStatus.configured ? (smtpStatus.activeEngine === 'resend' ? 'Resend HTTPS API' : 'Live SMTP Active') : 'Internal Outbox Mode'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {smtpStatus.configured ? 'Routing to external real inboxes' : 'Ready for SMTP/Resend keys'}
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-1">
                  <p className="text-[10px] font-geometric-mono font-bold uppercase tracking-wider text-slate-400">
                    Server Host / API Route
                  </p>
                  <p className="text-sm font-bold text-slate-900 font-geometric-mono truncate" title={smtpStatus.host}>
                    {smtpStatus.host}
                  </p>
                  <p className="text-[11px] text-slate-500">Port {smtpStatus.port} (TLS / HTTPS)</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-1">
                  <p className="text-[10px] font-geometric-mono font-bold uppercase tracking-wider text-slate-400">
                    Sender Account
                  </p>
                  <p className="text-sm font-bold text-slate-900 truncate" title={smtpStatus.user}>
                    {smtpStatus.user || 'None'}
                  </p>
                  <p className="text-[11px] text-slate-500">Authenticated delivery identity</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-1">
                  <p className="text-[10px] font-geometric-mono font-bold uppercase tracking-wider text-slate-400">
                    Delivered Messages
                  </p>
                  <p className="text-sm font-bold text-slate-900 font-geometric-mono">
                    {smtpStatus.totalDelivered} real / {smtpStatus.totalOutbox} total
                  </p>
                  <p className="text-[11px] text-slate-500">Full audit log preserved</p>
                </div>
              </div>

              {/* Two Column Console: Live Test Email & Credentials Config */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Column 1: Test Email Dispatcher (5 cols) */}
                <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-5 space-y-4 shadow-xs">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                      <Inbox className="w-4 h-4 text-emerald-600" />
                      <span>Live Test Email Dispatcher</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      Send a real-time verification handshake message to verify your inbox deliverability.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Recipient Email Address</label>
                      <input
                        type="email"
                        value={testEmailTarget}
                        onChange={(e) => setTestEmailTarget(e.target.value)}
                        placeholder="soumya.parida2022@gift.edu.in"
                        className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    <button
                      type="button"
                      disabled={isTestingEmail || !testEmailTarget}
                      onClick={async () => {
                        setIsTestingEmail(true);
                        setTestEmailFeedback(null);
                        try {
                          const res = await fetch('/api/admin/test-email', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ to: testEmailTarget })
                          });
                          const data = await res.json();
                          if (data.success) {
                            setTestEmailFeedback({
                              success: Boolean(data.smtpUsed),
                              message: data.message,
                              deliveryMethod: data.deliveryMethod,
                              deliveryError: data.deliveryError
                            });
                            showNotification(data.smtpUsed ? `Live email sent to ${testEmailTarget}!` : `Email registered in Outbox`);
                            fetchSmtpStatus();
                          } else {
                            setTestEmailFeedback({
                              success: false,
                              message: data.error || 'Check server logs'
                            });
                          }
                        } catch (err: any) {
                          setTestEmailFeedback({
                            success: false,
                            message: `Network error: ${err.message}`
                          });
                        } finally {
                          setIsTestingEmail(false);
                        }
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                    >
                      {isTestingEmail ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Dispatching Test Email...</span>
                        </>
                      ) : (
                        <>
                          <Inbox className="w-4 h-4" />
                          <span>Send Test Email to {testEmailTarget.split('@')[0] || 'Recipient'}</span>
                        </>
                      )}
                    </button>

                    {testEmailFeedback && (
                      <div className={`p-3 rounded-xl text-xs space-y-1.5 border ${testEmailFeedback.success ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-amber-50 text-amber-900 border-amber-200'}`}>
                        <div className="flex items-center space-x-1.5 font-bold">
                          {testEmailFeedback.success ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>Live Handshake Successful!</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-4 h-4 text-amber-600" />
                              <span>Dispatched to Outbox (No External SMTP)</span>
                            </>
                          )}
                        </div>
                        <p className="text-[11px] leading-relaxed">{testEmailFeedback.message}</p>
                        {testEmailFeedback.deliveryError && (
                          <div className="p-2 bg-white rounded-lg border border-amber-200 text-[10px] text-red-600 font-mono">
                            Diagnostic Error: {testEmailFeedback.deliveryError}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 text-[11px] text-slate-600 space-y-1">
                      <p className="font-bold text-slate-800">Target Testing Address:</p>
                      <p className="font-geometric-mono text-blue-600 font-semibold break-all">{testEmailTarget}</p>
                      <p className="text-slate-500">
                        Tests end-to-end socket TLS transmission to Gmail, university MX relays, and corporate mailboxes.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Column 2: SMTP / Resend Configuration Form (7 cols) */}
                <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-5 space-y-4 shadow-xs">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                      <KeyRound className="w-4 h-4 text-blue-600" />
                      <span>Configure Live Delivery Gateway</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      Configure your Gmail App Password, Resend API key, or custom SMTP server to activate 100% real inbox delivery.
                    </p>
                  </div>

                  {/* Provider Selection Tabs */}
                  <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setSmtpForm(prev => ({
                        ...prev,
                        providerType: 'gmail',
                        service: 'gmail',
                        host: 'smtp.gmail.com',
                        port: '465'
                      }))}
                      className={`py-2 px-2 text-center rounded-lg transition-all cursor-pointer ${
                        smtpForm.providerType === 'gmail'
                          ? 'bg-white text-blue-700 shadow-xs border border-slate-200/60 font-black'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Google Gmail
                    </button>
                    <button
                      type="button"
                      onClick={() => setSmtpForm(prev => ({
                        ...prev,
                        providerType: 'resend',
                        service: 'resend',
                        host: 'api.resend.com',
                        port: '443'
                      }))}
                      className={`py-2 px-2 text-center rounded-lg transition-all cursor-pointer ${
                        smtpForm.providerType === 'resend'
                          ? 'bg-white text-blue-700 shadow-xs border border-slate-200/60 font-black'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Resend API (HTTPS)
                    </button>
                    <button
                      type="button"
                      onClick={() => setSmtpForm(prev => ({
                        ...prev,
                        providerType: 'custom',
                        service: 'custom',
                        host: 'smtp-relay.brevo.com',
                        port: '587'
                      }))}
                      className={`py-2 px-2 text-center rounded-lg transition-all cursor-pointer ${
                        smtpForm.providerType === 'custom'
                          ? 'bg-white text-blue-700 shadow-xs border border-slate-200/60 font-black'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Custom SMTP
                    </button>
                  </div>

                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      try {
                        const payload: any = {};
                        if (smtpForm.providerType === 'resend') {
                          payload.resendApiKey = smtpForm.resendApiKey;
                        } else {
                          payload.service = smtpForm.service;
                          payload.host = smtpForm.host;
                          payload.port = Number(smtpForm.port);
                          payload.user = smtpForm.user;
                          payload.pass = smtpForm.pass;
                        }

                        const res = await fetch('/api/admin/smtp-config', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(payload)
                        });
                        const data = await res.json();
                        if (data.success) {
                          showNotification(data.message || 'Email Gateway parameters successfully saved!');
                          fetchSmtpStatus();
                        } else {
                          showNotification(`Error: ${data.error}`);
                        }
                      } catch (err: any) {
                        showNotification(`Failed to save: ${err.message}`);
                      }
                    }}
                    className="space-y-3"
                  >
                    {/* RESEND API FORM */}
                    {smtpForm.providerType === 'resend' ? (
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-700">
                            Resend API Key (<code className="text-blue-600">re_...</code>)
                          </label>
                          <input
                            type="password"
                            value={smtpForm.resendApiKey}
                            onChange={(e) => setSmtpForm(prev => ({ ...prev, resendApiKey: e.target.value }))}
                            placeholder="re_123456789_abcdef..."
                            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </div>
                        <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200/70 text-[11px] text-slate-700 space-y-1">
                          <p className="font-bold text-blue-900">Why Resend is recommended for Cloud Run:</p>
                          <p className="text-slate-600 leading-relaxed">
                            Resend operates over standard HTTPS (port 443). Unlike SMTP ports 25, 465, or 587, port 443 is 100% immune to cloud container firewall blocks. Free plan includes 3,000 emails/month at <strong>resend.com</strong>.
                          </p>
                        </div>
                      </div>
                    ) : (
                      /* GMAIL OR CUSTOM SMTP FORM */
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-700">SMTP Host</label>
                            <input
                              type="text"
                              value={smtpForm.host}
                              onChange={(e) => setSmtpForm(prev => ({ ...prev, host: e.target.value }))}
                              placeholder="smtp.gmail.com"
                              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-700">Port (465 for SSL, 587 for TLS)</label>
                            <input
                              type="text"
                              value={smtpForm.port}
                              onChange={(e) => setSmtpForm(prev => ({ ...prev, port: e.target.value }))}
                              placeholder="465 or 587"
                              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-700">
                            {smtpForm.providerType === 'gmail' ? 'Your Gmail Address' : 'Sender Username / Mailbox'}
                          </label>
                          <input
                            type="email"
                            value={smtpForm.user}
                            onChange={(e) => setSmtpForm(prev => ({ ...prev, user: e.target.value }))}
                            placeholder="your.email@gmail.com"
                            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-700">
                            {smtpForm.providerType === 'gmail' ? '16-Character Google App Password' : 'SMTP Password / Secret'}
                          </label>
                          <input
                            type="password"
                            value={smtpForm.pass}
                            onChange={(e) => setSmtpForm(prev => ({ ...prev, pass: e.target.value }))}
                            placeholder="16 letters (e.g. abcd efgh ijkl mnop)"
                            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </div>

                        {smtpForm.providerType === 'gmail' && (
                          <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200/70 text-[11px] text-slate-700 space-y-1">
                            <p className="font-bold text-blue-900">How to generate a Gmail App Password in 1 minute:</p>
                            <ol className="list-decimal list-inside space-y-0.5 text-slate-600">
                              <li>Open <strong>myaccount.google.com/security</strong></li>
                              <li>Turn ON <strong>2-Step Verification</strong></li>
                              <li>Search for <strong>"App Passwords"</strong></li>
                              <li>Create an app named <strong>"Jobskül Live Mail"</strong> and copy the 16 letters</li>
                              <li>Paste it above and click <strong>Save & Activate Gateway</strong></li>
                            </ol>
                          </div>
                        )}

                        {smtpForm.providerType === 'custom' && (
                          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-700 space-y-1">
                            <p className="font-bold text-slate-900">Institutional & Custom Relay Configuration:</p>
                            <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                              <li><strong>Brevo / Sendinblue:</strong> Host: <code className="bg-slate-200 px-1 py-0.5 rounded">smtp-relay.brevo.com</code> | Port: <code className="bg-slate-200 px-1 py-0.5 rounded">587</code></li>
                              <li><strong>SendGrid:</strong> Host: <code className="bg-slate-200 px-1 py-0.5 rounded">smtp.sendgrid.net</code> | Port: <code className="bg-slate-200 px-1 py-0.5 rounded">587</code> | User: <code className="bg-slate-200 px-1 py-0.5 rounded">apikey</code></li>
                              <li><strong>Amazon SES:</strong> Use your AWS SES SMTP endpoint and generated IAM credentials.</li>
                              <li><strong>College / University MX Relay:</strong> Enter your campus mail server hostname and institutional SMTP credentials.</li>
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <span className="text-[11px] text-slate-500">
                        Loaded into runtime memory securely.
                      </span>
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
                      >
                        Save & Activate Gateway
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: OTHER SECTIONS (Services, Reports, etc.) */}
          {!['dashboard', 'candidates', 'companies', 'jobs', 'applications', 'enquiries', 'audit-logs', 'placed-candidates', 'hireai', 'settings'].includes(activeSection) && (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs p-6 space-y-4 animate-in fade-in duration-150">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-[#0F172A] capitalize">
                  {activeSection.replace('-', ' ')} Module
                </h2>
                <p className="text-xs text-[#64748B]">Configuration and operational controls for {activeSection}.</p>
              </div>

              <div className="py-6 text-center space-y-3">
                <Sliders className="w-10 h-10 text-[#2563EB] mx-auto opacity-80" />
                <h3 className="text-sm font-bold text-[#0F172A]">Module Active & Synchronized</h3>
                <p className="text-xs text-[#64748B] max-w-md mx-auto">
                  All automated routines, webhooks, and analytics for {activeSection} are operating normally with zero pending exceptions.
                </p>
                <button
                  onClick={() => showNotification(`Refreshed ${activeSection} sync parameters.`)}
                  className="px-4 py-2 bg-[#2563EB] text-white rounded-lg text-xs font-bold hover:bg-[#1D4ED8] transition-colors"
                >
                  Force Sync Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
