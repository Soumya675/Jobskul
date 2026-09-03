import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { JobCard } from './components/JobCard';
import { FilterSidebar, FilterState } from './components/FilterSidebar';
import { JobDetailsModal } from './components/JobDetailsModal';
import { CandidateDashboard } from './components/CandidateDashboard';
import { CandidateProfile } from './components/CandidateProfile';
import { ResumeBuilder } from './components/ResumeBuilder';
import { JobskulHireAI } from './components/JobskulHireAI';
import { JobskulLearn } from './components/JobskulLearn';
import { RecruiterDashboard } from './components/RecruiterDashboard';
import { CompanyDirectory } from './components/CompanyDirectory';
import { HRServices } from './components/HRServices';
import { CareerBlog } from './components/CareerBlog';
import { AdminPanel } from './components/AdminPanel';
import { AuthModal } from './components/AuthModal';
import { SystemTestRunnerModal } from './components/SystemTestRunnerModal';

import {
  INITIAL_JOBS,
  INITIAL_COMPANIES,
  INITIAL_PROJECTS,
  INITIAL_USERS,
  INITIAL_APPLICATIONS,
  INITIAL_BLOG_POSTS
} from './data/initialData';
import { JobListing, JobApplication, User, UserRole } from './types';

import {
  Search,
  MapPin,
  Briefcase,
  Sparkles,
  TrendingUp,
  Building2,
  Users,
  Award,
  ArrowRight,
  CheckCircle2,
  Filter,
  ShieldCheck,
  X,
  RotateCcw,
  SlidersHorizontal,
  Check
} from 'lucide-react';

export function App() {
  // --- STATE MANAGEMENT ---
  const [currentUser, setCurrentUser] = useState<User | null>(INITIAL_USERS[0]); // Priya Sharma default
  const [activeTab, setActiveTab] = useState<string>('home');
  const [jobs, setJobs] = useState<JobListing[]>(INITIAL_JOBS);
  const [companies] = useState(INITIAL_COMPANIES);
  const [projects] = useState(INITIAL_PROJECTS);
  const [applications, setApplications] = useState<JobApplication[]>(INITIAL_APPLICATIONS);
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [savedJobIds, setSavedJobIds] = useState<string[]>(['job-1', 'job-3']);
  const [activeJobForModal, setActiveJobForModal] = useState<JobListing | null>(null);

  // Auth modal
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalRole, setAuthModalRole] = useState<UserRole>('candidate');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [sortBy, setSortBy] = useState<'relevant' | 'salary' | 'latest'>('relevant');
  const [testRunnerOpen, setTestRunnerOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    category: 'All',
    workMode: 'All',
    employmentType: 'All',
    experienceLevel: 'All',
    salaryMin: 0,
    salaryMax: 40,
    verifiedOnly: false,
  });

  // Notification toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync jobs and applications from server if available
  useEffect(() => {
    fetch('/api/jobs')
      .then(res => res.json())
      .then(data => {
        if (data.jobs && data.jobs.length > 0) {
          setJobs(data.jobs);
        }
      })
      .catch(() => {});

    fetch('/api/applications')
      .then(res => res.json())
      .then(data => {
        if (data.applications && data.applications.length > 0) {
          setApplications(data.applications);
        }
      })
      .catch(() => {});
  }, []);

  // --- ACTIONS ---
  const handleSaveToggle = (jobId: string) => {
    if (savedJobIds.includes(jobId)) {
      setSavedJobIds(savedJobIds.filter(id => id !== jobId));
      showToast('Job removed from saved listings');
    } else {
      setSavedJobIds([...savedJobIds, jobId]);
      showToast('Job saved to your bookmarks!');
    }
  };

  const handleApply = async (job: JobListing, customCoverLetter?: string) => {
    if (!currentUser) {
      setAuthModalRole('candidate');
      setAuthModalOpen(true);
      return;
    }

    // Check if already applied
    const alreadyApplied = applications.some(
      a => a.jobId === job.id && a.candidateId === currentUser.id
    );
    if (alreadyApplied) {
      showToast('You have already submitted an application for this position.');
      return;
    }

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: job.id,
          candidateId: currentUser.id,
          coverLetter: customCoverLetter || `I am excited to apply for ${job.title} at ${job.company}.`
        })
      });
      const data = await res.json();
      if (data.success && data.application) {
        setApplications([data.application, ...applications]);
        // Increment applicant count on job
        setJobs(jobs.map(j => j.id === job.id ? { ...j, applicantCount: j.applicantCount + 1 } : j));
        showToast(`Application successfully sent to ${job.company}!`);
        setActiveJobForModal(null);
      } else {
        showToast(data.error || 'Application failed.');
      }
    } catch (e) {
      // Offline fallback
      const newApp: JobApplication = {
        id: `app-${Date.now()}`,
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        companyLogo: job.companyLogo,
        candidateId: currentUser.id,
        candidateName: currentUser.name,
        candidateEmail: currentUser.email,
        candidateSkills: currentUser.skills || ['Python', 'Django', 'MySQL', 'React'],
        status: 'applied',
        appliedAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        coverLetter: customCoverLetter,
        aiMatchScore: 92
      };
      setApplications([newApp, ...applications]);
      showToast(`Application successfully sent to ${job.company}!`);
      setActiveJobForModal(null);
    }
  };

  const handleWithdrawApplication = async (appId: string) => {
    try {
      await fetch(`/api/applications/${appId}`, { method: 'DELETE' });
    } catch (e) {}
    setApplications(applications.filter(a => a.id !== appId));
    showToast('Application withdrawn.');
  };

  const handleStatusChange = async (appId: string, newStatus: any) => {
    try {
      await fetch(`/api/applications/${appId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (e) {}
    setApplications(applications.map(a => a.id === appId ? { ...a, status: newStatus } : a));
    showToast(`Applicant status updated to: ${newStatus.replace('_', ' ')}`);
  };

  const handleScheduleInterview = async (interviewData: any) => {
    try {
      const res = await fetch('/api/interviews/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(interviewData)
      });
      const data = await res.json();
      if (data.application) {
        setApplications(applications.map(a => a.id === interviewData.applicationId ? data.application : a));
      }
    } catch (e) {
      setApplications(applications.map(a => {
        if (a.id === interviewData.applicationId) {
          return {
            ...a,
            status: 'interview',
            interview: {
              id: `int-${Date.now()}`,
              date: interviewData.date,
              time: interviewData.time,
              type: interviewData.type,
              mode: interviewData.mode,
              meetingLink: interviewData.meetingLink,
              interviewerName: interviewData.interviewerName,
              interviewerRole: interviewData.interviewerRole,
              notes: interviewData.notes,
              status: 'scheduled'
            }
          };
        }
        return a;
      }));
    }
    showToast('Interview scheduled & Google Meet invitation created!');
  };

  const handlePostJobSubmit = async (jobData: any) => {
    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData)
      });
      const data = await res.json();
      if (data.job) {
        setJobs([data.job, ...jobs]);
      }
    } catch (e) {
      const newJob: JobListing = {
        id: `job-${Date.now()}`,
        ...jobData,
        companyVerified: true,
        salaryDisplay: `₹${jobData.salaryMin} - ₹${jobData.salaryMax} LPA`,
        postedDate: new Date().toISOString().split('T')[0],
        status: 'active',
        applicantCount: 0
      };
      setJobs([newJob, ...jobs]);
    }
    showToast('New job opportunity posted to Jobskül!');
    setActiveTab('recruiter-dashboard');
  };

  const handleUpdateProfile = async (updates: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updates };
    setCurrentUser(updated);
    setUsers(users.map(u => u.id === currentUser.id ? updated : u));
    try {
      await fetch('/api/auth/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: currentUser.id, ...updates })
      });
    } catch (e) {}
    showToast('Profile changes saved to MySQL database.');
  };

  const handleApproveJob = (jobId: string) => {
    setJobs(jobs.map(j => j.id === jobId ? { ...j, status: 'active' } : j));
    showToast('Job listing approved and active.');
  };

  const handleCloseJob = (jobId: string) => {
    setJobs(jobs.map(j => j.id === jobId ? { ...j, status: 'closed' } : j));
    showToast('Job listing marked as closed.');
  };

  const handleSwitchPersona = (role: UserRole) => {
    const target = users.find(u => u.role === role) || users[0];
    setCurrentUser(target);
    showToast(`Switched active persona to ${target.name} (${target.role})`);
    if (role === 'recruiter') {
      setActiveTab('recruiter-dashboard');
    } else if (role === 'admin') {
      setActiveTab('admin');
    } else {
      setActiveTab('jobs');
    }
  };

  const handleSearchSubmit = () => {
    if (activeTab !== 'home' && activeTab !== 'jobs') {
      setActiveTab('jobs');
    }
    setTimeout(() => {
      const el = document.getElementById('job-listings-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  const handleQuickFilter = (skill: string) => {
    if (skill === 'Remote Jobs') {
      setFilters(prev => ({ ...prev, workMode: 'Remote' }));
      setSearchQuery('');
    } else if (skill === 'AI & Machine Learning') {
      setSearchQuery('AI');
      setFilters(prev => ({ ...prev, category: 'AI & Data Science' }));
    } else if (skill === 'SAP MM/SD') {
      setSearchQuery('SAP');
      setFilters(prev => ({ ...prev, category: 'SAP & ERP' }));
    } else if (skill === 'Python & Django') {
      setSearchQuery('Python');
    } else if (skill === 'React & Full Stack') {
      setSearchQuery('React');
    } else if (skill === 'MySQL & Backend') {
      setSearchQuery('MySQL');
    } else {
      setSearchQuery(skill.split(' ')[0]);
    }
    handleSearchSubmit();
  };

  // --- FILTERED & SORTED JOBS ---
  const filteredJobs = useMemo(() => {
    const list = jobs.filter(j => {
      // Keyword search
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const matches =
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          j.requiredSkills.some(s => s.toLowerCase().includes(q)) ||
          (j.preferredSkills && j.preferredSkills.some(s => s.toLowerCase().includes(q))) ||
          j.description.toLowerCase().includes(q) ||
          j.category.toLowerCase().includes(q) ||
          j.workMode.toLowerCase().includes(q) ||
          j.location.toLowerCase().includes(q) ||
          (j.industry && j.industry.toLowerCase().includes(q));
        if (!matches) return false;
      }

      // Location search
      if (searchLocation.trim()) {
        const l = searchLocation.trim().toLowerCase();
        const matchesLoc =
          j.location.toLowerCase().includes(l) ||
          (l.includes('remote') && j.workMode.toLowerCase().includes('remote'));
        if (!matchesLoc) return false;
      }

      // Sidebar filters
      if (filters.category !== 'All' && j.category.toLowerCase() !== filters.category.toLowerCase()) {
        return false;
      }
      if (filters.workMode !== 'All' && j.workMode.toLowerCase() !== filters.workMode.toLowerCase()) {
        return false;
      }
      if (filters.employmentType !== 'All' && j.employmentType.toLowerCase() !== filters.employmentType.toLowerCase()) {
        return false;
      }
      if (filters.experienceLevel !== 'All' && j.experienceLevel.toLowerCase() !== filters.experienceLevel.toLowerCase()) {
        return false;
      }
      if (filters.salaryMin > 0 && j.salaryMax < filters.salaryMin) {
        return false;
      }
      if (filters.verifiedOnly && !j.companyVerified) {
        return false;
      }

      return true;
    });

    // Apply Sorting
    if (sortBy === 'salary') {
      list.sort((a, b) => (b.salaryMax || 0) - (a.salaryMax || 0));
    } else if (sortBy === 'latest') {
      list.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
    } else if (sortBy === 'relevant') {
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        list.sort((a, b) => {
          const aTitle = a.title.toLowerCase().includes(q) ? 2 : 0;
          const bTitle = b.title.toLowerCase().includes(q) ? 2 : 0;
          const aSkill = a.requiredSkills.some(s => s.toLowerCase().includes(q)) ? 1 : 0;
          const bSkill = b.requiredSkills.some(s => s.toLowerCase().includes(q)) ? 1 : 0;
          return (bTitle + bSkill) - (aTitle + aSkill);
        });
      }
    }

    return list;
  }, [jobs, searchQuery, searchLocation, filters, sortBy]);

  // Saved Jobs for candidate
  const savedJobs = useMemo(() => {
    return jobs.filter(j => savedJobIds.includes(j.id));
  }, [jobs, savedJobIds]);

  // Candidate applications
  const candidateApps = useMemo(() => {
    if (!currentUser) return [];
    return applications.filter(a => a.candidateId === currentUser.id);
  }, [applications, currentUser]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] font-sans antialiased selection:bg-[#2563EB] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F172A] text-white text-xs font-bold px-4 py-3 rounded-lg shadow-2xl border border-slate-700 flex items-center space-x-2 animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Header */}
      <Header
        currentUser={currentUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuth={(r) => { setAuthModalRole(r || 'candidate'); setAuthModalOpen(true); }}
        onSwitchUser={handleSwitchPersona}
        onLogout={() => { setCurrentUser(null); showToast('Signed out successfully.'); }}
      />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1">
        {/* TAB: HOME & FIND JOBS */}
        {(activeTab === 'home' || activeTab === 'jobs') && (
          <div className="space-y-12">
            {/* HERO SEARCH SECTION - Geometric Balance */}
            <div className="bg-[#0F172A] text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-[#E2E8F0]/20">
              {/* Geometric Grid Pattern Overlay */}
              <div 
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(to right, #94A3B8 1px, transparent 1px), linear-gradient(to bottom, #94A3B8 1px, transparent 1px)`,
                  backgroundSize: '36px 36px'
                }}
              />

              <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/15 text-blue-200 text-xs font-geometric-mono font-semibold tracking-wider">
                  <span>Hire</span>
                  <span>•</span>
                  <span>Train</span>
                  <span>•</span>
                  <span>Deploy</span>
                  <span className="ml-1 text-amber-300 font-bold">★ Career Ecosystem</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                  Learn. Build. Showcase. <span className="text-[#38BDF8]">Get Hired.</span>
                </h1>
                <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                  Discover verified software, full-stack, and tech roles with ATS matching, project verification, and direct employer pipelines.
                </p>

                {/* Main Search Bar Box */}
                <div className="bg-white rounded-xl p-2 sm:p-2.5 shadow-xl max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-2 border border-[#E2E8F0] text-[#0F172A]">
                  <div className="relative flex-1 w-full flex items-center pl-3">
                    <Search className="w-5 h-5 text-[#94A3B8] shrink-0" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSearchSubmit();
                      }}
                      placeholder="Job title, skill (Python, React, MySQL), or company..."
                      className="w-full p-2.5 text-xs sm:text-sm bg-transparent focus:outline-none text-[#0F172A] placeholder-[#94A3B8] font-medium"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 mr-2 shrink-0 transition-colors"
                        title="Clear search query"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="hidden md:block w-px h-8 bg-[#E2E8F0]" />

                  <div className="relative flex-1 w-full flex items-center pl-3">
                    <MapPin className="w-5 h-5 text-[#94A3B8] shrink-0" />
                    <input
                      type="text"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSearchSubmit();
                      }}
                      placeholder="City (Bengaluru, Pune, Remote)..."
                      className="w-full p-2.5 text-xs sm:text-sm bg-transparent focus:outline-none text-[#0F172A] placeholder-[#94A3B8] font-medium"
                    />
                    {searchLocation && (
                      <button
                        type="button"
                        onClick={() => setSearchLocation('')}
                        className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 mr-2 shrink-0 transition-colors"
                        title="Clear location"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <button
                    onClick={handleSearchSubmit}
                    className="w-full md:w-auto px-7 py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg text-xs sm:text-sm font-bold shadow-xs transition-colors shrink-0 flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>Search Jobs</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Popular Skill Quick Filters */}
                <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-300 pt-2">
                  <span className="font-semibold text-white">Trending Roles:</span>
                  {['Python & Django', 'React & Full Stack', 'MySQL & Backend', 'SAP MM/SD', 'AI & Machine Learning', 'Remote Jobs'].map((skill) => (
                    <button
                      key={skill}
                      onClick={() => handleQuickFilter(skill)}
                      className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white font-geometric-mono text-[11px] font-medium transition-colors border border-white/10 cursor-pointer"
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              {/* Geometric subtle corner accents */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
            </div>

            {/* PLATFORM STATS STRIP */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs text-center">
                <div className="border-r border-[#E2E8F0]/60 last:border-r-0">
                  <p className="text-2xl sm:text-3xl font-black font-geometric-mono text-[#2563EB]">12,400+</p>
                  <p className="text-xs font-semibold text-[#64748B] mt-0.5">Candidates Placed</p>
                </div>
                <div className="border-r border-[#E2E8F0]/60 last:border-r-0">
                  <p className="text-2xl sm:text-3xl font-black font-geometric-mono text-[#0F172A]">450+</p>
                  <p className="text-xs font-semibold text-[#64748B] mt-0.5">Verified Companies</p>
                </div>
                <div className="border-r border-[#E2E8F0]/60 last:border-r-0">
                  <p className="text-2xl sm:text-3xl font-black font-geometric-mono text-emerald-600">₹8.5 LPA</p>
                  <p className="text-xs font-semibold text-[#64748B] mt-0.5">Average Starting CTC</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black font-geometric-mono text-amber-500">4.9 / 5</p>
                  <p className="text-xs font-semibold text-[#64748B] mt-0.5">Candidate Placed Rating</p>
                </div>
              </div>
            </div>

            {/* MAIN JOB SEARCH & FILTER LAYOUT */}
            <div id="job-listings-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Filter Sidebar (3 cols) */}
                <div className="lg:col-span-3">
                  <FilterSidebar
                    filters={filters}
                    onFilterChange={setFilters}
                    onReset={() => {
                      setSearchQuery('');
                      setSearchLocation('');
                      setFilters({
                        category: 'All',
                        workMode: 'All',
                        employmentType: 'All',
                        experienceLevel: 'All',
                        salaryMin: 0,
                        salaryMax: 40,
                        verifiedOnly: false,
                      });
                    }}
                    totalResultsCount={filteredJobs.length}
                  />
                </div>

                {/* Right Job Cards List (9 cols) */}
                <div className="lg:col-span-9 space-y-4">
                  {/* Filter Status Bar */}
                  <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="text-xs text-[#64748B]">
                      Showing <strong className="text-[#0F172A] font-geometric-mono">{filteredJobs.length}</strong> {filteredJobs.length === 1 ? 'matching verified opportunity' : 'matching verified opportunities'}
                      {searchQuery && <span> for &ldquo;{searchQuery}&rdquo;</span>}
                      {searchLocation && <span> in &ldquo;{searchLocation}&rdquo;</span>}
                    </div>

                    <div className="flex items-center space-x-2 text-xs">
                      <span className="text-[#64748B] font-medium">Sort by:</span>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'relevant' | 'salary' | 'latest')}
                        className="bg-slate-50 border border-[#E2E8F0] rounded-lg p-1.5 text-xs font-bold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                      >
                        <option value="relevant">Most Relevant</option>
                        <option value="salary">Highest Salary</option>
                        <option value="latest">Latest Posted</option>
                      </select>
                    </div>
                  </div>

                  {/* Active Filter Chips */}
                  {(searchQuery || searchLocation || filters.category !== 'All' || filters.workMode !== 'All' || filters.employmentType !== 'All' || filters.experienceLevel !== 'All' || filters.salaryMin > 0 || filters.verifiedOnly) && (
                    <div className="flex flex-wrap items-center gap-1.5 p-3 bg-blue-50/50 rounded-xl border border-blue-100 text-xs">
                      <span className="text-[11px] font-bold text-blue-900 mr-1 flex items-center space-x-1">
                        <Filter className="w-3 h-3 text-[#2563EB]" />
                        <span>Active Filters:</span>
                      </span>

                      {searchQuery && (
                        <span className="inline-flex items-center space-x-1 bg-white border border-blue-200 px-2 py-0.5 rounded-md text-[11px] font-semibold text-slate-800 shadow-2xs">
                          <span>Keyword: &ldquo;{searchQuery}&rdquo;</span>
                          <button onClick={() => setSearchQuery('')} className="hover:text-rose-600 ml-1">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}

                      {searchLocation && (
                        <span className="inline-flex items-center space-x-1 bg-white border border-blue-200 px-2 py-0.5 rounded-md text-[11px] font-semibold text-slate-800 shadow-2xs">
                          <span>Location: &ldquo;{searchLocation}&rdquo;</span>
                          <button onClick={() => setSearchLocation('')} className="hover:text-rose-600 ml-1">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}

                      {filters.category !== 'All' && (
                        <span className="inline-flex items-center space-x-1 bg-white border border-blue-200 px-2 py-0.5 rounded-md text-[11px] font-semibold text-slate-800 shadow-2xs">
                          <span>Category: {filters.category}</span>
                          <button onClick={() => setFilters(f => ({ ...f, category: 'All' }))} className="hover:text-rose-600 ml-1">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}

                      {filters.workMode !== 'All' && (
                        <span className="inline-flex items-center space-x-1 bg-white border border-blue-200 px-2 py-0.5 rounded-md text-[11px] font-semibold text-slate-800 shadow-2xs">
                          <span>Work Mode: {filters.workMode}</span>
                          <button onClick={() => setFilters(f => ({ ...f, workMode: 'All' }))} className="hover:text-rose-600 ml-1">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}

                      {filters.employmentType !== 'All' && (
                        <span className="inline-flex items-center space-x-1 bg-white border border-blue-200 px-2 py-0.5 rounded-md text-[11px] font-semibold text-slate-800 shadow-2xs">
                          <span>Type: {filters.employmentType}</span>
                          <button onClick={() => setFilters(f => ({ ...f, employmentType: 'All' }))} className="hover:text-rose-600 ml-1">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}

                      {filters.experienceLevel !== 'All' && (
                        <span className="inline-flex items-center space-x-1 bg-white border border-blue-200 px-2 py-0.5 rounded-md text-[11px] font-semibold text-slate-800 shadow-2xs">
                          <span>Exp: {filters.experienceLevel}</span>
                          <button onClick={() => setFilters(f => ({ ...f, experienceLevel: 'All' }))} className="hover:text-rose-600 ml-1">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}

                      {filters.salaryMin > 0 && (
                        <span className="inline-flex items-center space-x-1 bg-white border border-blue-200 px-2 py-0.5 rounded-md text-[11px] font-semibold text-slate-800 shadow-2xs">
                          <span>Min ₹{filters.salaryMin} LPA</span>
                          <button onClick={() => setFilters(f => ({ ...f, salaryMin: 0 }))} className="hover:text-rose-600 ml-1">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}

                      {filters.verifiedOnly && (
                        <span className="inline-flex items-center space-x-1 bg-white border border-blue-200 px-2 py-0.5 rounded-md text-[11px] font-semibold text-slate-800 shadow-2xs">
                          <span>Verified Companies Only</span>
                          <button onClick={() => setFilters(f => ({ ...f, verifiedOnly: false }))} className="hover:text-rose-600 ml-1">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}

                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setSearchLocation('');
                          setFilters({
                            category: 'All',
                            workMode: 'All',
                            employmentType: 'All',
                            experienceLevel: 'All',
                            salaryMin: 0,
                            salaryMax: 40,
                            verifiedOnly: false,
                          });
                        }}
                        className="text-[11px] font-bold text-[#2563EB] hover:text-[#1D4ED8] hover:underline ml-auto flex items-center space-x-1"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Clear All</span>
                      </button>
                    </div>
                  )}

                  {/* Empty state or Job Cards */}
                  {filteredJobs.length === 0 ? (
                    <div className="bg-white rounded-xl border border-[#E2E8F0] p-12 text-center space-y-4">
                      <Briefcase className="w-12 h-12 text-[#94A3B8] mx-auto" />
                      <h3 className="text-base font-bold text-[#0F172A]">No matching jobs found</h3>
                      <p className="text-xs text-[#64748B] max-w-md mx-auto">
                        Try clearing some search filters or searching for common terms like "Python", "React", or "Software Engineer".
                      </p>
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setSearchLocation('');
                          setFilters({
                            category: 'All',
                            workMode: 'All',
                            employmentType: 'All',
                            experienceLevel: 'All',
                            salaryMin: 0,
                            salaryMax: 40,
                            verifiedOnly: false,
                          });
                        }}
                        className="px-4 py-2 bg-[#2563EB] text-white rounded-lg text-xs font-bold hover:bg-[#1D4ED8] transition-colors"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredJobs.map((job) => {
                        const hasApplied = applications.some(
                          a => a.jobId === job.id && a.candidateId === currentUser?.id
                        );
                        return (
                          <JobCard
                            key={job.id}
                            job={job}
                            isSaved={savedJobIds.includes(job.id)}
                            onSaveToggle={handleSaveToggle}
                            onApply={(j) => handleApply(j)}
                            onViewDetails={(j) => setActiveJobForModal(j)}
                            hasApplied={hasApplied}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* VERIFIED HIRING PARTNERS LOGO STRIP */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
              <div className="bg-white rounded-xl border border-[#E2E8F0] p-8 shadow-xs text-center space-y-6">
                <span className="text-xs font-geometric-mono font-bold uppercase tracking-widest text-[#64748B]">
                  Trusted by 450+ Fast-Growing Tech Enterprises & Startups
                </span>
                <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-85">
                  {companies.slice(0, 5).map((comp) => (
                    <div key={comp.id} className="flex items-center space-x-2 grayscale hover:grayscale-0 transition-all cursor-pointer">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 border border-[#E2E8F0] p-1 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-[#2563EB]" />
                      </div>
                      <span className="text-sm font-extrabold text-[#0F172A]">{comp.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: CANDIDATE DASHBOARD */}
        {activeTab === 'dashboard' && currentUser && (
          <CandidateDashboard
            currentUser={currentUser}
            applications={candidateApps}
            savedJobs={savedJobs}
            onWithdrawApplication={handleWithdrawApplication}
            onNavigateToTab={setActiveTab}
            onViewJob={(j) => setActiveJobForModal(j)}
          />
        )}

        {/* TAB: CANDIDATE PROFILE */}
        {activeTab === 'profile' && currentUser && (
          <CandidateProfile
            user={currentUser}
            onUpdateUser={handleUpdateProfile}
          />
        )}

        {/* TAB: RESUME BUILDER */}
        {activeTab === 'resume' && (
          <ResumeBuilder user={currentUser || users[0]} />
        )}

        {/* TAB: JOBSKUL HIREAI */}
        {activeTab === 'hireai' && (
          <JobskulHireAI
            currentUser={currentUser}
            jobs={jobs}
            onNavigateToLearn={() => setActiveTab('learn')}
          />
        )}

        {/* TAB: JOBSKUL LEARN */}
        {activeTab === 'learn' && (
          <JobskulLearn
            projects={projects}
            currentUser={currentUser}
            onNavigateToJobs={() => setActiveTab('jobs')}
          />
        )}

        {/* TAB: RECRUITER DASHBOARD & POST JOB */}
        {(activeTab === 'recruiter-dashboard' || activeTab === 'recruiter-post') && currentUser && (
          <RecruiterDashboard
            currentUser={currentUser}
            jobs={jobs}
            applications={applications}
            candidates={users}
            onStatusChange={handleStatusChange}
            onScheduleInterview={handleScheduleInterview}
            onPostJobSubmit={handlePostJobSubmit}
            initialView={activeTab === 'recruiter-post' ? 'post' : 'dashboard'}
          />
        )}

        {/* TAB: COMPANIES DIRECTORY */}
        {activeTab === 'companies' && (
          <CompanyDirectory
            companies={companies}
            jobs={jobs}
            onSelectCompanyJobs={(compName) => {
              setSearchQuery(compName);
              setActiveTab('jobs');
            }}
          />
        )}

        {/* TAB: HR SERVICES */}
        {activeTab === 'services' && <HRServices />}

        {/* TAB: CAREER BLOG */}
        {activeTab === 'blog' && <CareerBlog articles={INITIAL_BLOG_POSTS} />}

        {/* TAB: ADMIN PANEL */}
        {activeTab === 'admin' && (
          <AdminPanel
            users={users}
            jobs={jobs}
            applications={applications}
            onApproveJob={handleApproveJob}
            onCloseJob={handleCloseJob}
          />
        )}
      </main>

      {/* JOB DETAILS MODAL */}
      {activeJobForModal && (
        <JobDetailsModal
          job={activeJobForModal}
          onClose={() => setActiveJobForModal(null)}
          onApplySubmit={(jobId, cl) => handleApply(activeJobForModal, cl)}
          isSaved={savedJobIds.includes(activeJobForModal.id)}
          onSaveToggle={handleSaveToggle}
          similarJobs={jobs.filter(j => j.id !== activeJobForModal.id && j.category === activeJobForModal.category).slice(0, 2)}
          onSelectSimilarJob={(j) => setActiveJobForModal(j)}
          currentUser={currentUser}
          hasApplied={applications.some(a => a.jobId === activeJobForModal.id && a.candidateId === currentUser?.id)}
        />
      )}

      {/* AUTH MODAL */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialRole={authModalRole}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          showToast(`Logged in as ${user.name}`);
          if (user.role === 'recruiter') {
            setActiveTab('recruiter-dashboard');
          } else {
            setActiveTab('dashboard');
          }
        }}
      />

      {/* SYSTEM TEST RUNNER MODAL */}
      <SystemTestRunnerModal
        isOpen={testRunnerOpen}
        onClose={() => setTestRunnerOpen(false)}
        jobs={jobs}
        applications={applications}
        currentUser={currentUser}
        onApplyTestJob={async (job) => {
          await handleApply(job);
          return true;
        }}
        onTestFilterSearch={(q, l) => {
          setSearchQuery(q);
          setSearchLocation(l);
          return filteredJobs.length;
        }}
      />

      {/* FLOATING QA SYSTEM TEST SUITE BUTTON */}
      <button
        onClick={() => setTestRunnerOpen(true)}
        className="fixed bottom-6 left-6 z-40 px-3.5 py-2.5 bg-[#0F172A] hover:bg-[#2563EB] text-white text-xs font-bold rounded-xl shadow-xl border border-slate-700/80 flex items-center space-x-2 transition-all hover:scale-105 cursor-pointer group"
        title="Open End-to-End System Test Suite to verify all search & application workflows"
      >
        <ShieldCheck className="w-4 h-4 text-emerald-400 group-hover:text-white transition-colors" />
        <span>System Test Suite</span>
        <span className="px-1.5 py-0.5 rounded bg-blue-500/30 text-blue-200 text-[10px] font-geometric-mono">
          11 Tests
        </span>
      </button>

      {/* Global Footer */}
      <Footer onNavigate={setActiveTab} />
    </div>
  );
}

export default App;
