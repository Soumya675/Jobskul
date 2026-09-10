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
import { OurTeam } from './components/OurTeam';
import { FAQSection } from './components/FAQSection';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { CandidatesDirectory } from './components/CandidatesDirectory';
import { ResponsiveImage } from './components/ResponsiveImage';
import { PromotionModal } from './components/PromotionModal';

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
  Code2,
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
  Check,
  Sparkles
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

  // Promotion & Growth modal
  const [promotionModalOpen, setPromotionModalOpen] = useState(false);

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
    try {
      const savedUser = localStorage.getItem('jobskul_auth_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed && parsed.id) {
          setCurrentUser(parsed);
        }
      }
    } catch (e) {}

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
      // Multi-keyword Tokenized Search
      if (searchQuery.trim()) {
        const qStr = searchQuery.trim().toLowerCase();
        // Support quoted phrases e.g. "Full Stack" and standalone keywords
        const tokens: string[] = [];
        const regex = /"([^"]+)"|(\S+)/g;
        let match;
        while ((match = regex.exec(qStr)) !== null) {
          tokens.push(match[1] || match[2]);
        }

        if (tokens.length > 0) {
          const searchableCorpus = [
            j.title,
            j.company,
            j.category,
            j.location,
            j.workMode,
            j.employmentType,
            j.experienceLevel,
            j.industry || '',
            j.description || '',
            ...(j.requiredSkills || []),
            ...(j.preferredSkills || []),
            ...(j.benefits || []),
            ...(j.responsibilities || [])
          ].join(' ').toLowerCase();

          // Every token must match somewhere in the corpus
          const allMatch = tokens.every(token => searchableCorpus.includes(token));
          if (!allMatch) return false;
        }
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
        const qStr = searchQuery.trim().toLowerCase();
        const tokens = qStr.split(/\s+/).filter(Boolean);
        list.sort((a, b) => {
          let scoreA = 0;
          let scoreB = 0;
          tokens.forEach(tok => {
            if (a.title.toLowerCase().includes(tok)) scoreA += 50;
            if (b.title.toLowerCase().includes(tok)) scoreB += 50;
            if (a.requiredSkills.some(s => s.toLowerCase().includes(tok))) scoreA += 40;
            if (b.requiredSkills.some(s => s.toLowerCase().includes(tok))) scoreB += 40;
            if (a.company.toLowerCase().includes(tok)) scoreA += 30;
            if (b.company.toLowerCase().includes(tok)) scoreB += 30;
            if (a.location.toLowerCase().includes(tok)) scoreA += 20;
            if (b.location.toLowerCase().includes(tok)) scoreB += 20;
          });
          return scoreB - scoreA;
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
        onOpenPromote={() => setPromotionModalOpen(true)}
        onSearchQueryChange={(query) => {
          setSearchQuery(query);
          setActiveTab('jobs');
        }}
        onSwitchUser={handleSwitchPersona}
        onLogout={() => {
          setCurrentUser(null);
          localStorage.removeItem('jobskul_auth_user');
          localStorage.removeItem('jobskul_auth_token');
          showToast('Signed out successfully.');
        }}
      />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1">
        {/* TAB: HOME & FIND JOBS */}
        {(activeTab === 'home' || activeTab === 'jobs') && (
          <div className="space-y-12">
            {/* HERO SEARCH SECTION - Modern Split Hero with Responsive Image */}
            <div className="bg-slate-900 text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-slate-800">
              {/* Geometric Grid Pattern Overlay */}
              <div 
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(to right, #94A3B8 1px, transparent 1px), linear-gradient(to bottom, #94A3B8 1px, transparent 1px)`,
                  backgroundSize: '36px 36px'
                }}
              />

              <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                  {/* Left Column: Copy & Search (7 cols) */}
                  <div className="lg:col-span-7 space-y-6 text-left">
                    <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-blue-200 text-xs font-geometric-mono font-semibold tracking-wider shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Hire</span>
                      <span className="text-slate-500">•</span>
                      <span>Train</span>
                      <span className="text-slate-500">•</span>
                      <span>Deploy</span>
                      <span className="ml-1 text-slate-300 font-medium">| Corporate Staffing & Placement</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
                      Learn. Build. Showcase. <br className="hidden sm:inline" />
                      <span className="text-blue-400">
                        Get Hired.
                      </span>
                    </h1>

                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                      India&apos;s premier project-verified career ecosystem. Connecting engineering and business talent with verified enterprise hiring teams, validated competency benchmarks, and direct corporate placement.
                    </p>

                    {/* Main Search Bar Box */}
                    <div className="bg-white rounded-2xl p-2 sm:p-2.5 shadow-2xl shadow-slate-950/25 flex flex-col md:flex-row items-center gap-2 border border-slate-200/80 text-slate-900">
                      <div className="relative flex-1 w-full flex items-center pl-3">
                        <Search className="w-5 h-5 text-slate-400 shrink-0" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSearchSubmit();
                          }}
                          placeholder="Job title, skill (Python, React, MySQL)..."
                          className="w-full p-2.5 text-xs sm:text-sm bg-transparent focus:outline-none text-slate-900 placeholder-slate-400 font-medium"
                        />
                        {searchQuery && (
                          <button
                            type="button"
                            onClick={() => setSearchQuery('')}
                            className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 mr-2 shrink-0 transition-colors cursor-pointer"
                            title="Clear search query"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="hidden md:block w-px h-8 bg-slate-200" />

                      <div className="relative flex-1 w-full flex items-center pl-3">
                        <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
                        <input
                          type="text"
                          value={searchLocation}
                          onChange={(e) => setSearchLocation(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSearchSubmit();
                          }}
                          placeholder="Location (Bengaluru, Pune, Remote)..."
                          className="w-full p-2.5 text-xs sm:text-sm bg-transparent focus:outline-none text-slate-900 placeholder-slate-400 font-medium"
                        />
                        {searchLocation && (
                          <button
                            type="button"
                            onClick={() => setSearchLocation('')}
                            className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 mr-2 shrink-0 transition-colors cursor-pointer"
                            title="Clear location"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <button
                        onClick={handleSearchSubmit}
                        className="w-full md:w-auto px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs hover:shadow transition-all shrink-0 flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <span>Search Jobs</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Popular Skill Quick Filters */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300 pt-1">
                      <span className="font-semibold text-slate-200">Trending:</span>
                      {['Python & Django', 'React & Full Stack', 'MySQL & Backend', 'SAP MM/SD', 'AI & Machine Learning', 'Remote Jobs'].map((skill) => (
                        <button
                          key={skill}
                          onClick={() => handleQuickFilter(skill)}
                          className="px-3 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700/90 text-slate-200 font-geometric-mono text-[11px] font-medium transition-all border border-slate-700/60 cursor-pointer"
                        >
                          {skill}
                        </button>
                      ))}
                    </div>

                    {/* Trust Indicators */}
                    <div className="flex items-center space-x-4 pt-2 text-xs text-slate-400">
                      <div className="flex -space-x-2">
                        <img className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80" alt="Placed candidate" referrerPolicy="no-referrer" />
                        <img className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80" alt="Placed candidate" referrerPolicy="no-referrer" />
                        <img className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&h=100&q=80" alt="Placed candidate" referrerPolicy="no-referrer" />
                      </div>
                      <span className="text-slate-300 font-medium">
                        Joined by <strong className="text-white font-geometric-mono">500+</strong> candidates placed across 32+ verified tech leaders
                      </span>
                    </div>
                  </div>

                  {/* Right Column: High-Impact Responsive Visual Showcase (5 cols) */}
                  <div className="lg:col-span-5">
                    <div className="relative mx-auto max-w-md lg:max-w-none">
                      {/* Main Image Container */}
                      <div className="relative rounded-3xl border border-slate-700/80 bg-slate-800/80 p-2 shadow-2xl overflow-hidden group">
                        <ResponsiveImage
                          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
                          alt="Jobskül tech engineers collaborating"
                          aspectRatio="4/3"
                          priority={true}
                          className="rounded-2xl group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 1024px) 90vw, 480px"
                        />

                        {/* Floating Badge 1 - Top Left */}
                        <div className="absolute top-5 left-5 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-2xl p-3 shadow-xl flex items-center space-x-2.5 animate-in fade-in slide-in-from-top-2 duration-300">
                          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white font-geometric-mono">98% ATS Match</p>
                            <p className="text-[10px] text-slate-400">Project-Verified Profiles</p>
                          </div>
                        </div>

                        {/* Floating Badge 2 - Bottom Right */}
                        <div className="absolute bottom-5 right-5 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-2xl p-3 shadow-xl flex items-center space-x-2.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                          <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-sky-400">
                            <Briefcase className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white font-geometric-mono">14+ Live Vacancies</p>
                            <p className="text-[10px] text-slate-400">Direct Employer Reviews</p>
                          </div>
                        </div>

                        {/* Live Activity Indicator Bar */}
                        <div className="absolute bottom-5 left-5 bg-slate-950/80 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-slate-800 text-[10px] font-geometric-mono text-emerald-400 flex items-center space-x-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                          <span>Active Hiring Pulse</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PROMOTIONAL TICKER & CAMPUS RECRUITMENT PARTNERSHIP BANNER */}
            <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-950 text-white border-y border-blue-900/60 shadow-inner py-3.5 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center space-x-3 text-left">
                  <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 text-[11px] shrink-0">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Campus & Enterprise Drives</span>
                  </div>
                  <p className="text-slate-300 font-medium hidden sm:inline">
                    🎓 <strong className="text-white font-bold">2,480+ Students Placed</strong> • 🏢 <strong className="text-white font-bold">180+ Enterprise Partners</strong> • 💼 <strong className="text-white font-bold">₹4.5L – ₹28L CTC</strong> • 🛡️ 100% Verified
                  </p>
                </div>

                <div className="flex items-center space-x-2.5 shrink-0">
                  <button
                    onClick={() => setPromotionModalOpen(true)}
                    className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl font-bold text-xs shadow-xs hover:shadow transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Promote Jobskül</span>
                  </button>
                  <button
                    onClick={() => setPromotionModalOpen(true)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold text-xs border border-white/20 transition-all cursor-pointer"
                  >
                    <span>Request College Drive</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* PLATFORM STATS STRIP - Exact Live Site Figures */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs text-center">
                <div className="border-r border-slate-100 last:border-r-0">
                  <p className="text-2xl sm:text-3xl font-black font-geometric-mono text-blue-600">14+ Live Jobs</p>
                  <p className="text-xs font-semibold text-slate-500 mt-1">Verified Vacancies</p>
                </div>
                <div className="border-r border-slate-100 last:border-r-0">
                  <p className="text-2xl sm:text-3xl font-black font-geometric-mono text-slate-900">32+ Verified Companies</p>
                  <p className="text-xs font-semibold text-slate-500 mt-1">Actively Hiring Partners</p>
                </div>
                <div className="border-r border-slate-100 last:border-r-0">
                  <p className="text-2xl sm:text-3xl font-black font-geometric-mono text-emerald-600">500+ Placed</p>
                  <p className="text-xs font-semibold text-slate-500 mt-1">Across Tech & Non-Tech</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black font-geometric-mono text-amber-500">4.8 Rating</p>
                  <p className="text-xs font-semibold text-slate-500 mt-1">Platform Feedback Score</p>
                </div>
              </div>
            </div>

            {/* BROWSE JOB CATEGORIES - Exact 8 Live Categories */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                      Explore Job Categories
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Curated opportunities across all 8 specialized industry categories.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setFilters(prev => ({ ...prev, category: 'All' }));
                      document.getElementById('job-listings-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
                  >
                    View All Categories &rarr;
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { name: 'Marketing & Sales', icon: TrendingUp, count: jobs.filter(j => j.category === 'Marketing & Sales').length },
                    { name: 'Software', icon: Code2, count: jobs.filter(j => j.category === 'Software').length },
                    { name: 'Retail & Products', icon: Building2, count: jobs.filter(j => j.category === 'Retail & Products').length },
                    { name: 'Human Resource', icon: Users, count: jobs.filter(j => j.category === 'Human Resource').length },
                    { name: 'Finance', icon: Award, count: jobs.filter(j => j.category === 'Finance').length },
                    { name: 'Management', icon: Briefcase, count: jobs.filter(j => j.category === 'Management').length },
                    { name: 'Customer Help', icon: CheckCircle2, count: jobs.filter(j => j.category === 'Customer Help').length },
                    { name: 'Market Research', icon: Search, count: jobs.filter(j => j.category === 'Market Research').length }
                  ].map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = filters.category.toLowerCase() === cat.name.toLowerCase();
                    return (
                      <button
                        key={cat.name}
                        onClick={() => {
                          setFilters(prev => ({
                            ...prev,
                            category: isSelected ? 'All' : cat.name
                          }));
                          document.getElementById('job-listings-section')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 cursor-pointer ${
                          isSelected
                            ? 'bg-blue-50/80 border-blue-500 shadow-xs ring-1 ring-blue-500/20'
                            : 'bg-slate-50/60 hover:bg-white hover:border-blue-300 hover:shadow-md border-slate-200/80'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-blue-600 shadow-2xs">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">{cat.name}</p>
                          <p className="text-[11px] text-slate-500 font-geometric-mono mt-0.5">{cat.count} openings</p>
                        </div>
                      </button>
                    );
                  })}
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
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="text-xs text-slate-500 font-medium">
                      Showing <strong className="text-slate-900 font-geometric-mono font-bold">{filteredJobs.length}</strong> {filteredJobs.length === 1 ? 'matching verified opportunity' : 'matching verified opportunities'}
                      {searchQuery && <span> for &ldquo;{searchQuery}&rdquo;</span>}
                      {searchLocation && <span> in &ldquo;{searchLocation}&rdquo;</span>}
                    </div>

                    <div className="flex items-center space-x-2 text-xs">
                      <span className="text-slate-500 font-medium">Sort by:</span>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'relevant' | 'salary' | 'latest')}
                        className="bg-slate-50 border border-slate-200/90 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                      >
                        <option value="relevant">Most Relevant</option>
                        <option value="salary">Highest Salary</option>
                        <option value="latest">Latest Posted</option>
                      </select>
                    </div>
                  </div>

                  {/* Active Filter Chips */}
                  {(searchQuery || searchLocation || filters.category !== 'All' || filters.workMode !== 'All' || filters.employmentType !== 'All' || filters.experienceLevel !== 'All' || filters.salaryMin > 0 || filters.verifiedOnly) && (
                    <div className="flex flex-wrap items-center gap-1.5 p-3.5 bg-blue-50/60 rounded-2xl border border-blue-100 text-xs">
                      <span className="text-[11px] font-bold text-blue-900 mr-1 flex items-center space-x-1">
                        <Filter className="w-3 h-3 text-blue-600" />
                        <span>Active Filters:</span>
                      </span>

                      {searchQuery && (
                        <span className="inline-flex items-center space-x-1 bg-white border border-blue-200/80 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-slate-800 shadow-2xs">
                          <span>Keyword: &ldquo;{searchQuery}&rdquo;</span>
                          <button onClick={() => setSearchQuery('')} className="hover:text-rose-600 ml-1 cursor-pointer">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}

                      {searchLocation && (
                        <span className="inline-flex items-center space-x-1 bg-white border border-blue-200/80 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-slate-800 shadow-2xs">
                          <span>Location: &ldquo;{searchLocation}&rdquo;</span>
                          <button onClick={() => setSearchLocation('')} className="hover:text-rose-600 ml-1 cursor-pointer">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}

                      {filters.category !== 'All' && (
                        <span className="inline-flex items-center space-x-1 bg-white border border-blue-200/80 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-slate-800 shadow-2xs">
                          <span>Category: {filters.category}</span>
                          <button onClick={() => setFilters(f => ({ ...f, category: 'All' }))} className="hover:text-rose-600 ml-1 cursor-pointer">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}

                      {filters.workMode !== 'All' && (
                        <span className="inline-flex items-center space-x-1 bg-white border border-blue-200/80 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-slate-800 shadow-2xs">
                          <span>Work Mode: {filters.workMode}</span>
                          <button onClick={() => setFilters(f => ({ ...f, workMode: 'All' }))} className="hover:text-rose-600 ml-1 cursor-pointer">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}

                      {filters.employmentType !== 'All' && (
                        <span className="inline-flex items-center space-x-1 bg-white border border-blue-200/80 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-slate-800 shadow-2xs">
                          <span>Type: {filters.employmentType}</span>
                          <button onClick={() => setFilters(f => ({ ...f, employmentType: 'All' }))} className="hover:text-rose-600 ml-1 cursor-pointer">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}

                      {filters.experienceLevel !== 'All' && (
                        <span className="inline-flex items-center space-x-1 bg-white border border-blue-200/80 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-slate-800 shadow-2xs">
                          <span>Exp: {filters.experienceLevel}</span>
                          <button onClick={() => setFilters(f => ({ ...f, experienceLevel: 'All' }))} className="hover:text-rose-600 ml-1 cursor-pointer">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}

                      {filters.salaryMin > 0 && (
                        <span className="inline-flex items-center space-x-1 bg-white border border-blue-200/80 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-slate-800 shadow-2xs">
                          <span>Min ₹{filters.salaryMin} LPA</span>
                          <button onClick={() => setFilters(f => ({ ...f, salaryMin: 0 }))} className="hover:text-rose-600 ml-1 cursor-pointer">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}

                      {filters.verifiedOnly && (
                        <span className="inline-flex items-center space-x-1 bg-white border border-blue-200/80 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-slate-800 shadow-2xs">
                          <span>Verified Companies Only</span>
                          <button onClick={() => setFilters(f => ({ ...f, verifiedOnly: false }))} className="hover:text-rose-600 ml-1 cursor-pointer">
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
                        className="text-[11px] font-bold text-blue-600 hover:text-blue-700 ml-auto flex items-center space-x-1 cursor-pointer transition-colors"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Clear All</span>
                      </button>
                    </div>
                  )}

                  {/* Empty state or Job Cards */}
                  {filteredJobs.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center space-y-4 shadow-xs">
                      <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center mx-auto text-slate-400">
                        <Briefcase className="w-8 h-8" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900">No matching jobs found</h3>
                      <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
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
                        className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-xs hover:shadow transition-all cursor-pointer"
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

            {/* THE JOBSKÜL ADVANTAGE - Responsive Visual Pillars */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200/90 pb-4">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200/60 text-[11px] font-geometric-mono font-bold uppercase tracking-wider">
                      The Jobskül Advantage
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 tracking-tight">
                      Learn. Train. Deploy.
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
                      A complete ecosystem combining hands-on technical incubation, verified institutional drives, and direct enterprise placement.
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setActiveTab('services')}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center space-x-1 cursor-pointer"
                    >
                      <span>Explore all programs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Pillar 1: Project-Based Learning */}
                  <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group">
                    <div className="relative overflow-hidden">
                      <ResponsiveImage
                        src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                        alt="Project based learning code workspace"
                        aspectRatio="16/10"
                        className="group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-xs text-white text-[10px] font-geometric-mono font-semibold px-2.5 py-1 rounded-md border border-slate-700/80">
                        JILP Capstone Incubation
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                          Verifiable Code Over Simple Resumes
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          Build live full-stack web applications, microservices with Python/Django, and relational schemas. Every candidate receives a tamper-proof portfolio link.
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab('learn')}
                        className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center space-x-1.5 pt-2 border-t border-slate-100 cursor-pointer"
                      >
                        <span>Explore 4 Project Tracks</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Pillar 2: Direct Enterprise Sourcing */}
                  <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group">
                    <div className="relative overflow-hidden">
                      <ResponsiveImage
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2"
                        alt="Enterprise technical recruiter screening candidates"
                        aspectRatio="16/10"
                        className="group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-xs text-white text-[10px] font-geometric-mono font-semibold px-2.5 py-1 rounded-md border border-slate-700/80">
                        Direct Corporate Pipelines
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                          Direct Sourcing With Zero Agency Markup
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          Over 32+ verified hiring enterprises source job-ready engineers directly from Jobskül. Fast-track interviews with verified skill badges.
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab('companies')}
                        className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center space-x-1.5 pt-2 border-t border-slate-100 cursor-pointer"
                      >
                        <span>View 32+ Hiring Companies</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Pillar 3: College Conclaves & Hackathons */}
                  <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group">
                    <div className="relative overflow-hidden">
                      <ResponsiveImage
                        src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4"
                        alt="University tech conclave and student hackathon"
                        aspectRatio="16/10"
                        className="group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-xs text-white text-[10px] font-geometric-mono font-semibold px-2.5 py-1 rounded-md border border-slate-700/80">
                        Campus Alliances & Fairs
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                          Institutional Footprint Across 12+ States
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          Partnering with 50+ engineering and management colleges to host on-ground hackathons, corporate HR conclaves, and campus recruitment drives.
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab('gallery')}
                        className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center space-x-1.5 pt-2 border-t border-slate-100 cursor-pointer"
                      >
                        <span>View Conclave Moments</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* VERIFIED HIRING PARTNERS LOGO STRIP */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
              <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-10 shadow-xs text-center space-y-6">
                <span className="text-xs font-geometric-mono font-bold uppercase tracking-widest text-slate-400">
                  Trusted by 450+ Fast-Growing Tech Enterprises & Startups
                </span>
                <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-85">
                  {companies.slice(0, 5).map((comp) => (
                    <div key={comp.id} className="flex items-center space-x-2.5 grayscale hover:grayscale-0 transition-all cursor-pointer group">
                      <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200/80 p-1.5 flex items-center justify-center group-hover:border-blue-200 group-hover:bg-blue-50/50 transition-colors">
                        <Building2 className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">{comp.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 12+ STATES COVERED NATIONWIDE */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
              <div className="bg-slate-900 rounded-2xl p-8 sm:p-10 text-white shadow-xl border border-slate-800 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <span className="px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-geometric-mono font-bold uppercase tracking-wider">
                      Pan-India Footprint
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                      12+ States Covered Across India
                    </h2>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Empowering candidates and colleges with localized campus hiring and remote/onsite placements.
                    </p>
                  </div>
                  <span className="text-xs font-geometric-mono text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-800 px-3 py-1.5 rounded-lg">
                    Active Hiring Hubs
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {[
                    { state: 'Odisha', city: 'Bhubaneswar' },
                    { state: 'Karnataka', city: 'Bengaluru' },
                    { state: 'Maharashtra', city: 'Pune & Mumbai' },
                    { state: 'Delhi NCR', city: 'Noida & Gurugram' },
                    { state: 'Telangana', city: 'Hyderabad' },
                    { state: 'Tamil Nadu', city: 'Chennai & CBE' },
                    { state: 'West Bengal', city: 'Kolkata' },
                    { state: 'Gujarat', city: 'Ahmedabad' },
                    { state: 'Uttar Pradesh', city: 'Lucknow' },
                    { state: 'Kerala', city: 'Kochi & TVM' },
                    { state: 'Rajasthan', city: 'Jaipur' },
                    { state: 'Madhya Pradesh', city: 'Indore' }
                  ].map((loc) => (
                    <button
                      key={loc.state}
                      onClick={() => {
                        setSearchLocation(loc.city);
                        document.getElementById('job-listings-section')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="p-3 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 rounded-xl text-left transition-all group cursor-pointer"
                    >
                      <div className="flex items-center space-x-1.5 text-xs font-bold text-white group-hover:text-blue-300">
                        <MapPin className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                        <span className="truncate">{loc.state}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-geometric-mono mt-0.5 pl-5 truncate">
                        {loc.city}
                      </p>
                    </button>
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

        {/* TAB: CANDIDATES DIRECTORY */}
        {activeTab === 'candidates' && (
          <CandidatesDirectory
            candidates={users}
            onContactCandidate={(cand) => showToast(`Contact enquiry initiated for candidate ${cand.name}`)}
          />
        )}

        {/* TAB: HR SERVICES */}
        {activeTab === 'services' && <HRServices initialAudience="corporates" />}
        {activeTab === 'services-corporates' && <HRServices initialAudience="corporates" />}
        {activeTab === 'services-institutions' && <HRServices initialAudience="institutions" />}
        {activeTab === 'services-individuals' && <HRServices initialAudience="individuals" />}

        {/* TAB: CAREER BLOG */}
        {activeTab === 'blog' && <CareerBlog articles={INITIAL_BLOG_POSTS} />}

        {/* TAB: OUR TEAM */}
        {activeTab === 'team' && <OurTeam />}

        {/* TAB: FAQ */}
        {activeTab === 'faq' && <FAQSection onContactClick={() => setActiveTab('contact')} />}

        {/* TAB: GALLERY */}
        {activeTab === 'gallery' && <GallerySection />}

        {/* TAB: CONTACT */}
        {activeTab === 'contact' && <ContactSection />}

        {/* TAB: ADMIN PANEL */}
        {activeTab === 'admin' && (
          <AdminPanel
            users={users}
            jobs={jobs}
            applications={applications}
            companies={companies}
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
          try {
            localStorage.setItem('jobskul_auth_user', JSON.stringify(user));
          } catch (e) {}
          showToast(`Logged in as ${user.name}`);
          if (user.role === 'recruiter') {
            setActiveTab('recruiter-dashboard');
          } else {
            setActiveTab('dashboard');
          }
        }}
      />

      {/* PROMOTION & SHARE MODAL */}
      <PromotionModal
        isOpen={promotionModalOpen}
        onClose={() => setPromotionModalOpen(false)}
        onToast={showToast}
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
      <Footer onNavigate={setActiveTab} onOpenPromote={() => setPromotionModalOpen(true)} />
    </div>
  );
}

export default App;
