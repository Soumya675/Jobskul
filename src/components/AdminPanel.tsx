import React, { useState } from 'react';
import { User, JobListing, JobApplication, Company } from '../types';
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
  Database
} from 'lucide-react';

interface AdminPanelProps {
  users: User[];
  jobs: JobListing[];
  applications: JobApplication[];
  companies?: Company[];
  onApproveJob: (jobId: string) => void;
  onCloseJob: (jobId: string) => void;
}

type AdminSection =
  | 'dashboard'
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
  onApproveJob,
  onCloseJob
}) => {
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [toast, setToast] = useState<string | null>(null);

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

          {/* SECTION: OTHER SECTIONS (Services, HireAI, Reports, Settings, etc.) */}
          {!['dashboard', 'candidates', 'companies', 'jobs', 'applications', 'enquiries', 'audit-logs'].includes(activeSection) && (
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
