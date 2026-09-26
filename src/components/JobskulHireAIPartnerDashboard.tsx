import React, { useState } from 'react';
import { Logo } from './Logo';
import {
  PartnerPosition,
  JDRequest,
  PartnerInterview,
  User,
  JobApplication
} from '../types';
import {
  LayoutDashboard,
  Briefcase,
  PlusCircle,
  FileCheck2,
  Calendar,
  BarChart3,
  Users,
  Shield,
  Bell,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowRight,
  MoreVertical,
  Edit,
  Trash2,
  Check,
  ChevronDown,
  Download,
  ExternalLink,
  MessageSquare,
  Sparkles,
  UserCheck,
  FileText
} from 'lucide-react';

interface JobskulHireAIPartnerDashboardProps {
  currentUser: User | null;
  positions: PartnerPosition[];
  jdRequests: JDRequest[];
  interviews: PartnerInterview[];
  candidates: User[];
  applications: JobApplication[];
  onAddPosition: (newPos: PartnerPosition) => void;
  onUpdatePosition: (id: string, updates: Partial<PartnerPosition>) => void;
  onAddJDRequest: (newReq: JDRequest) => void;
  onUpdateJDRequest: (id: string, updates: Partial<JDRequest>) => void;
  onConvertJDToPosition: (req: JDRequest) => void;
  onScheduleInterview: (newInt: PartnerInterview) => void;
  onUpdateInterview: (id: string, updates: Partial<PartnerInterview>) => void;
  onNavigateHome: () => void;
  onLogout: () => void;
}

export const JobskulHireAIPartnerDashboard: React.FC<JobskulHireAIPartnerDashboardProps> = ({
  currentUser,
  positions,
  jdRequests,
  interviews,
  candidates,
  applications,
  onAddPosition,
  onUpdatePosition,
  onAddJDRequest,
  onUpdateJDRequest,
  onConvertJDToPosition,
  onScheduleInterview,
  onUpdateInterview,
  onNavigateHome,
  onLogout
}) => {
  // Navigation section
  const [currentSection, setCurrentSection] = useState<
    'dashboard' | 'positions' | 'create-position' | 'jd-requests' | 'candidates' | 'applications' | 'interviews' | 'reports' | 'users'
  >('dashboard');

  // Search & Filter States
  const [positionSearch, setPositionSearch] = useState('');
  const [positionStatusFilter, setPositionStatusFilter] = useState('All');
  const [jdSearch, setJdSearch] = useState('');
  const [jdStatusFilter, setJdStatusFilter] = useState('All');
  const [candidateSearch, setCandidateSearch] = useState('');

  // Modals & Forms
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showCreateJDModal, setShowCreateJDModal] = useState(false);
  const [selectedCandidateForDetails, setSelectedCandidateForDetails] = useState<User | null>(null);
  const [selectedPositionForView, setSelectedPositionForView] = useState<PartnerPosition | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Position Form State
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newCompany, setNewCompany] = useState('CloudSphere Technologies');
  const [newDepartment, setNewDepartment] = useState('Platform Engineering');
  const [newLocation, setNewLocation] = useState('Bengaluru, Karnataka');
  const [newEmploymentType, setNewEmploymentType] = useState<'Full-time' | 'Contract' | 'Internship'>('Full-time');
  const [newExperience, setNewExperience] = useState('2-5 Years');
  const [newSalary, setNewSalary] = useState('₹14 - ₹20 LPA');
  const [newVacancies, setNewVacancies] = useState(3);
  const [newSkills, setNewSkills] = useState('Python, Django, React, PostgreSQL');
  const [newDescription, setNewDescription] = useState('');
  const [newDeadline, setNewDeadline] = useState('2026-10-30');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // New JD Request Form State
  const [jdClientName, setJdClientName] = useState('');
  const [jdTitle, setJdTitle] = useState('');
  const [jdDept, setJdDept] = useState('');
  const [jdLocation, setJdLocation] = useState('');
  const [jdMinSalary, setJdMinSalary] = useState(10);
  const [jdMaxSalary, setJdMaxSalary] = useState(16);
  const [jdOpenings, setJdOpenings] = useState(2);
  const [jdSkills, setJdSkills] = useState('');
  const [jdDescription, setJdDescription] = useState('');

  // New Interview Form State
  const [intCandName, setIntCandName] = useState('');
  const [intPosition, setIntPosition] = useState('');
  const [intDate, setIntDate] = useState('');
  const [intTime, setIntTime] = useState('');
  const [intType, setIntType] = useState<'Technical' | 'HR' | 'System Design'>('Technical');
  const [intInterviewer, setIntInterviewer] = useState('Arun Mehta');
  const [intLink, setIntLink] = useState('https://meet.google.com/jbs-interview-room');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered lists
  const filteredPositions = positions.filter((p) => {
    if (positionStatusFilter !== 'All' && p.status !== positionStatusFilter) return false;
    if (positionSearch.trim()) {
      const q = positionSearch.toLowerCase();
      const match =
        p.title.toLowerCase().includes(q) ||
        p.company.toLowerCase().includes(q) ||
        p.department.toLowerCase().includes(q) ||
        p.skills.some((s) => s.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  const filteredJDRequests = jdRequests.filter((r) => {
    if (jdStatusFilter !== 'All' && r.status !== jdStatusFilter) return false;
    if (jdSearch.trim()) {
      const q = jdSearch.toLowerCase();
      const match =
        r.clientName.toLowerCase().includes(q) ||
        r.jobTitle.toLowerCase().includes(q) ||
        r.department.toLowerCase().includes(q) ||
        r.requiredSkills.some((s) => s.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  // Calculate metrics
  const totalPositionsCount = positions.length;
  const activePositionsCount = positions.filter((p) => p.status === 'Open').length;
  const closedPositionsCount = positions.filter((p) => p.status === 'Closed' || p.status === 'Archived').length;
  const jdRequestsCount = jdRequests.length;
  const scheduledInterviewsCount = interviews.filter((i) => i.status === 'Scheduled').length;
  const selectedCandidatesCount = applications.filter((a) => a.status === 'selected').length || 6;

  // Handle Create Position Form Submit
  const handleCreatePositionSubmit = (status: 'Draft' | 'Open') => {
    const errs: Record<string, string> = {};
    if (!newJobTitle.trim()) errs.title = 'Job Title is required.';
    if (!newCompany.trim()) errs.company = 'Company / Client name is required.';
    if (!newDescription.trim()) errs.description = 'Job Description cannot be empty.';

    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      showToast('Please fix the validation errors in the form.');
      return;
    }

    const pos: PartnerPosition = {
      id: `pos-${Date.now()}`,
      jobId: `JOB-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      title: newJobTitle,
      company: newCompany,
      department: newDepartment,
      location: newLocation,
      employmentType: newEmploymentType,
      experience: newExperience,
      salaryRange: newSalary,
      skills: newSkills.split(',').map((s) => s.trim()).filter(Boolean),
      description: newDescription,
      responsibilities: ['Architect high throughput microservices', 'Collaborate with agile sprint teams'],
      qualifications: ['Bachelor degree or equivalent practical experience'],
      benefits: ['Medical insurance', 'Performance bonus'],
      openings: Number(newVacancies) || 1,
      status: status,
      createdDate: new Date().toISOString().split('T')[0],
      deadline: newDeadline,
      assignedRecruiter: currentUser?.name || 'Partnerships Lead',
      applicantsCount: 0,
      shortlistedCount: 0,
      interviewCount: 0
    };

    onAddPosition(pos);
    showToast(`Position "${newJobTitle}" successfully saved as ${status}!`);
    // Reset form
    setNewJobTitle('');
    setNewDescription('');
    setFormErrors({});
    setCurrentSection('positions');
  };

  // Handle Create JD Request
  const handleCreateJDRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jdClientName.trim() || !jdTitle.trim()) {
      showToast('Client Name and Job Title are required.');
      return;
    }

    const req: JDRequest = {
      id: `jdr-${Date.now()}`,
      requestNumber: `JDR-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      clientName: jdClientName,
      jobTitle: jdTitle,
      department: jdDept || 'Engineering',
      location: jdLocation || 'Remote / Hybrid',
      experienceRequired: '2-4 Years',
      salaryMin: jdMinSalary,
      salaryMax: jdMaxSalary,
      openings: jdOpenings,
      requiredSkills: jdSkills.split(',').map((s) => s.trim()).filter(Boolean),
      jobDescription: jdDescription,
      responsibilities: 'Deliver high quality feature sprints.',
      status: 'Pending',
      requestedBy: currentUser?.name || 'Client Partner',
      createdDate: new Date().toISOString().split('T')[0]
    };

    onAddJDRequest(req);
    showToast('New Job Description Request registered!');
    setShowCreateJDModal(false);
    setJdClientName('');
    setJdTitle('');
  };

  // Handle Schedule Interview Submit
  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!intCandName || !intDate || !intTime) {
      showToast('Please provide candidate name, date and time.');
      return;
    }

    const newInt: PartnerInterview = {
      id: `int-${Date.now()}`,
      candidateName: intCandName,
      candidateEmail: 'candidate@jobskul.com',
      positionTitle: intPosition || 'Senior Python & React Lead',
      company: 'CloudSphere Technologies',
      interviewerName: intInterviewer,
      date: intDate,
      time: intTime,
      interviewType: intType,
      meetingLink: intLink,
      status: 'Scheduled',
      notes: 'Automated calendar invite dispatched to candidate.'
    };

    onScheduleInterview(newInt);
    showToast(`Interview scheduled for ${intCandName} on ${intDate} at ${intTime}!`);
    setShowScheduleModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* TOP PARTNER BRAND BAR */}
      <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div onClick={onNavigateHome} className="cursor-pointer">
              <Logo size="md" className="h-8 w-auto brightness-200" />
            </div>
            <div className="h-6 w-px bg-slate-700" />
            <div className="flex items-center space-x-2">
              <span className="text-sm font-extrabold tracking-tight bg-linear-to-r from-blue-400 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
                JobskulHireAI
              </span>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-geometric-mono font-bold border border-blue-400/30">
                Partner Panel
              </span>
            </div>
          </div>

          {/* User Profile summary in Header */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-3 text-right">
              <div>
                <p className="text-xs font-bold text-white leading-none">
                  {currentUser?.name || 'Arun Mehta'}
                </p>
                <p className="text-[10px] text-blue-300 uppercase font-geometric-mono mt-0.5">
                  {currentUser?.partnerRole || 'Super Admin'} • Partnerships Team
                </p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs border border-blue-400/40">
                {currentUser?.name?.charAt(0) || 'PT'}
              </div>
            </div>

            <button
              onClick={onNavigateHome}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors"
            >
              Public Site
            </button>
            <button
              onClick={onLogout}
              className="px-3 py-1.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 text-xs font-bold border border-rose-500/40 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* DASHBOARD BODY WITH SIDEBAR - Isolated stacking context to prevent content from overlapping sticky header on scroll or resize */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-0 isolate min-w-0">
        {/* SIDEBAR NAVIGATION (3 cols) */}
        <aside className="lg:col-span-3 space-y-4">
          {/* User / Organization Profile Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-blue-600 to-indigo-700 text-white flex items-center justify-center font-black text-sm shadow-md">
                {currentUser?.name ? currentUser.name.slice(0, 2).toUpperCase() : 'PT'}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-extrabold text-slate-900 truncate">
                  {currentUser?.name || 'Partnerships Team'}
                </h3>
                <p className="text-[11px] text-blue-600 font-semibold font-geometric-mono">
                  {currentUser?.partnerRole || 'Super Admin'}
                </p>
                <p className="text-[10px] text-slate-400">Org: Jobskül Enterprise Alliances</p>
              </div>
            </div>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-2xs space-y-1">
            <p className="px-3 py-1 text-[10px] font-bold uppercase text-slate-400 font-geometric-mono">
              Main Dashboard
            </p>
            <button
              onClick={() => setCurrentSection('dashboard')}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-2.5 transition-colors cursor-pointer ${
                currentSection === 'dashboard'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Partner Dashboard</span>
            </button>

            <p className="px-3 pt-3 pb-1 text-[10px] font-bold uppercase text-slate-400 font-geometric-mono">
              Recruitment
            </p>
            <button
              onClick={() => setCurrentSection('positions')}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-2.5 transition-colors cursor-pointer ${
                currentSection === 'positions'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Positions ({positions.length})</span>
            </button>

            <button
              onClick={() => setCurrentSection('create-position')}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-2.5 transition-colors cursor-pointer ${
                currentSection === 'create-position'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <PlusCircle className="w-4 h-4 text-emerald-600" />
              <span>+ New Position</span>
            </button>

            <button
              onClick={() => setCurrentSection('jd-requests')}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-2.5 transition-colors cursor-pointer ${
                currentSection === 'jd-requests'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <FileCheck2 className="w-4 h-4" />
              <span>JD Requests ({jdRequests.length})</span>
            </button>

            <button
              onClick={() => setCurrentSection('candidates')}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-2.5 transition-colors cursor-pointer ${
                currentSection === 'candidates'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Candidate Pool ({candidates.length})</span>
            </button>

            <button
              onClick={() => setCurrentSection('applications')}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-2.5 transition-colors cursor-pointer ${
                currentSection === 'applications'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Applications ({applications.length})</span>
            </button>

            <button
              onClick={() => setCurrentSection('interviews')}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-2.5 transition-colors cursor-pointer ${
                currentSection === 'interviews'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Interviews ({interviews.length})</span>
            </button>

            <button
              onClick={() => setCurrentSection('reports')}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-2.5 transition-colors cursor-pointer ${
                currentSection === 'reports'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Reports & Analytics</span>
            </button>

            <p className="px-3 pt-3 pb-1 text-[10px] font-bold uppercase text-slate-400 font-geometric-mono">
              Administration & RBAC
            </p>
            <button
              onClick={() => setCurrentSection('users')}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-2.5 transition-colors cursor-pointer ${
                currentSection === 'users'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>User & Role Access</span>
            </button>
          </div>
        </aside>

        {/* MAIN PANEL CONTENT (9 cols) */}
        <main className="lg:col-span-9 space-y-6">
          {/* SECTION 1: DASHBOARD OVERVIEW */}
          {currentSection === 'dashboard' && (
            <div className="space-y-6">
              {/* Welcome message banner */}
              <div className="bg-linear-to-r from-blue-700 via-indigo-700 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-geometric-mono font-bold uppercase tracking-wider">
                    Partnership Portal • Active Session
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black">
                    Welcome, {currentUser?.name || 'Partnerships Lead'}!
                  </h2>
                  <p className="text-xs text-blue-100">
                    Here is the real-time summary of verified enterprise mandates, candidates, and interview rounds.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setCurrentSection('create-position')}
                    className="px-4 py-2 bg-white text-blue-900 hover:bg-blue-50 rounded-xl text-xs font-bold shadow-2xs transition-colors cursor-pointer"
                  >
                    + New Position
                  </button>
                  <button
                    onClick={() => setShowCreateJDModal(true)}
                    className="px-4 py-2 bg-blue-500/30 hover:bg-blue-500/50 border border-white/30 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    + JD Request
                  </button>
                </div>
              </div>

              {/* Metric Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-1">
                  <p className="text-xs text-slate-500 font-medium">Total Positions</p>
                  <p className="text-2xl font-black text-slate-900 font-geometric-mono">{totalPositionsCount}</p>
                  <span className="text-[10px] text-emerald-600 font-bold">{activePositionsCount} Active Mandates</span>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-1">
                  <p className="text-xs text-slate-500 font-medium">JD Requests</p>
                  <p className="text-2xl font-black text-slate-900 font-geometric-mono">{jdRequestsCount}</p>
                  <span className="text-[10px] text-amber-600 font-bold">1 In Review</span>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-1">
                  <p className="text-xs text-slate-500 font-medium">Upcoming Interviews</p>
                  <p className="text-2xl font-black text-slate-900 font-geometric-mono">{scheduledInterviewsCount}</p>
                  <span className="text-[10px] text-blue-600 font-bold">Google Meet Scheduled</span>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-1">
                  <p className="text-xs text-slate-500 font-medium">Selected / Offers</p>
                  <p className="text-2xl font-black text-emerald-600 font-geometric-mono">{selectedCandidatesCount}</p>
                  <span className="text-[10px] text-emerald-700 font-bold">18.4% Conversion Rate</span>
                </div>
              </div>

              {/* Quick Actions Strip */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider font-geometric-mono">
                  Quick Actions:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setCurrentSection('create-position')}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold"
                  >
                    + New Position
                  </button>
                  <button
                    onClick={() => setCurrentSection('positions')}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                  >
                    View Positions
                  </button>
                  <button
                    onClick={() => setCurrentSection('jd-requests')}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                  >
                    View JD Requests
                  </button>
                  <button
                    onClick={() => setCurrentSection('interviews')}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                  >
                    View Interviews
                  </button>
                  <button
                    onClick={() => setCurrentSection('reports')}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                  >
                    View Reports
                  </button>
                </div>
              </div>

              {/* Recent Positions Table */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">Recent Mandates & Positions</h3>
                  <button
                    onClick={() => setCurrentSection('positions')}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700"
                  >
                    View All Positions &rarr;
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 uppercase font-geometric-mono border-b border-slate-200">
                      <tr>
                        <th className="p-3">Job Title & ID</th>
                        <th className="p-3">Client</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Openings</th>
                        <th className="p-3">Salary</th>
                        <th className="p-3">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {positions.slice(0, 4).map((pos) => (
                        <tr key={pos.id} className="hover:bg-slate-50">
                          <td className="p-3">
                            <p className="font-bold text-slate-900">{pos.title}</p>
                            <p className="text-[10px] text-slate-400 font-geometric-mono">{pos.jobId}</p>
                          </td>
                          <td className="p-3 font-semibold text-slate-700">{pos.company}</td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                pos.status === 'Open'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : pos.status === 'On Hold'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {pos.status}
                            </span>
                          </td>
                          <td className="p-3 font-geometric-mono">{pos.openings}</td>
                          <td className="p-3 font-geometric-mono font-bold text-slate-900">{pos.salaryRange}</td>
                          <td className="p-3">
                            <button
                              onClick={() => {
                                setSelectedPositionForView(pos);
                                setCurrentSection('positions');
                              }}
                              className="text-blue-600 hover:text-blue-800 font-bold"
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Upcoming Interviews & Recruitment Activity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900">Upcoming Interviews</h3>
                    <button
                      onClick={() => setShowScheduleModal(true)}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700"
                    >
                      + Schedule
                    </button>
                  </div>
                  <div className="space-y-2">
                    {interviews.slice(0, 3).map((item) => (
                      <div key={item.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                        <div>
                          <p className="font-bold text-slate-900">{item.candidateName}</p>
                          <p className="text-[11px] text-slate-500">{item.positionTitle} ({item.interviewType})</p>
                          <p className="text-[10px] font-geometric-mono text-blue-600">{item.date} • {item.time}</p>
                        </div>
                        <a
                          href={item.meetingLink}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1 bg-blue-600 text-white rounded-lg text-[10px] font-bold"
                        >
                          Meet Link
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
                  <h3 className="text-sm font-bold text-slate-900">Recruitment Activity Log</h3>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 bg-blue-50/60 rounded-xl border border-blue-100">
                      <p className="font-semibold text-slate-900">JD Request JDR-2026-001 approved</p>
                      <p className="text-[10px] text-slate-500">Converted to Position: Senior Python & React Lead</p>
                    </div>
                    <div className="p-2.5 bg-emerald-50/60 rounded-xl border border-emerald-100">
                      <p className="font-semibold text-slate-900">Candidate Priya Sharma shortlisted</p>
                      <p className="text-[10px] text-slate-500">CloudSphere Technologies • Technical Round Scheduled</p>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="font-semibold text-slate-900">New JD Request received from Zomato</p>
                      <p className="text-[10px] text-slate-500">Backend Golang & Distributed Systems Engineer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: POSITIONS LIST */}
          {currentSection === 'positions' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Recruitment Mandates & Positions</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Manage active corporate client positions, update statuses, and view associated candidates.
                  </p>
                </div>
                <button
                  onClick={() => setCurrentSection('create-position')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-2xs"
                >
                  + Create New Position
                </button>
              </div>

              {/* Filter / Search Bar */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={positionSearch}
                    onChange={(e) => setPositionSearch(e.target.value)}
                    placeholder="Search by title, client, skill..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-500">Status:</span>
                  <select
                    value={positionStatusFilter}
                    onChange={(e) => setPositionStatusFilter(e.target.value)}
                    className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Draft">Draft</option>
                    <option value="Open">Open</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Closed">Closed</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              {/* Positions List */}
              <div className="space-y-4">
                {filteredPositions.map((pos) => (
                  <div
                    key={pos.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-geometric-mono text-[10px] text-blue-600 font-bold">{pos.jobId}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              pos.status === 'Open'
                                ? 'bg-emerald-100 text-emerald-800'
                                : pos.status === 'On Hold'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {pos.status}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-slate-900 mt-1">{pos.title}</h3>
                        <p className="text-xs text-slate-600 font-semibold">{pos.company} • {pos.department} • {pos.location}</p>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-black text-slate-900 font-geometric-mono">{pos.salaryRange}</span>
                        <p className="text-[11px] text-slate-500">{pos.openings} Openings • {pos.experience}</p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2">{pos.description}</p>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200">
                      <div className="flex flex-wrap gap-1">
                        {pos.skills.map((s) => (
                          <span key={s} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] text-slate-700">
                            {s}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center space-x-2">
                        <select
                          value={pos.status}
                          onChange={(e) => {
                            onUpdatePosition(pos.id, { status: e.target.value as any });
                            showToast(`Position status updated to ${e.target.value}`);
                          }}
                          className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold"
                        >
                          <option value="Draft">Draft</option>
                          <option value="Open">Open</option>
                          <option value="On Hold">On Hold</option>
                          <option value="Closed">Closed</option>
                          <option value="Archived">Archived</option>
                        </select>

                        <button
                          onClick={() => {
                            setCurrentSection('candidates');
                            setCandidateSearch(pos.title);
                          }}
                          className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold hover:bg-blue-100"
                        >
                          View Candidates ({pos.applicantsCount || 12})
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 3: CREATE NEW POSITION FORM */}
          {currentSection === 'create-position' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl font-black text-slate-900">Create New Position Mandate</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Publish a new client mandate with required skills, CTC, and recruiter ownership.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700">Job Title *</label>
                  <input
                    type="text"
                    value={newJobTitle}
                    onChange={(e) => setNewJobTitle(e.target.value)}
                    placeholder="e.g. Lead Full Stack Architect"
                    className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                  {formErrors.title && <p className="text-[10px] text-rose-500 mt-0.5">{formErrors.title}</p>}
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700">Company / Client *</label>
                  <input
                    type="text"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    placeholder="e.g. CloudSphere Technologies"
                    className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                  {formErrors.company && <p className="text-[10px] text-rose-500 mt-0.5">{formErrors.company}</p>}
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700">Department</label>
                  <input
                    type="text"
                    value={newDepartment}
                    onChange={(e) => setNewDepartment(e.target.value)}
                    placeholder="e.g. Engineering & Platform"
                    className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700">Location</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="e.g. Bengaluru / Remote"
                    className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700">Employment Type</label>
                  <select
                    value={newEmploymentType}
                    onChange={(e) => setNewEmploymentType(e.target.value as any)}
                    className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700">Experience Required</label>
                  <input
                    type="text"
                    value={newExperience}
                    onChange={(e) => setNewExperience(e.target.value)}
                    placeholder="e.g. 2-5 Years"
                    className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700">Salary / Range</label>
                  <input
                    type="text"
                    value={newSalary}
                    onChange={(e) => setNewSalary(e.target.value)}
                    placeholder="e.g. ₹16 - ₹24 LPA"
                    className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700">Number of Vacancies</label>
                  <input
                    type="number"
                    value={newVacancies}
                    onChange={(e) => setNewVacancies(Number(e.target.value))}
                    className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Required Skills (Comma separated)</label>
                <input
                  type="text"
                  value={newSkills}
                  onChange={(e) => setNewSkills(e.target.value)}
                  placeholder="Python, Django, React, MySQL, AWS"
                  className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Job Description *</label>
                <textarea
                  rows={4}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Detailed role summary, team goals, and architecture stack..."
                  className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none"
                />
                {formErrors.description && <p className="text-[10px] text-rose-500 mt-0.5">{formErrors.description}</p>}
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentSection('positions')}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleCreatePositionSubmit('Draft')}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold"
                >
                  Save Draft
                </button>
                <button
                  type="button"
                  onClick={() => handleCreatePositionSubmit('Open')}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Publish Position
                </button>
              </div>
            </div>
          )}

          {/* SECTION 4: JD REQUESTS MANAGEMENT */}
          {currentSection === 'jd-requests' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Job Description (JD) Requests</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Review incoming client JD briefs, assign recruiters, approve requests, and convert into live positions.
                  </p>
                </div>
                <button
                  onClick={() => setShowCreateJDModal(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-2xs"
                >
                  + Submit JD Request
                </button>
              </div>

              {/* JD Requests Table */}
              <div className="space-y-4">
                {filteredJDRequests.map((req) => (
                  <div
                    key={req.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-geometric-mono text-[10px] text-blue-600 font-bold">{req.requestNumber}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              req.status === 'Approved'
                                ? 'bg-emerald-100 text-emerald-800'
                                : req.status === 'In Review'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {req.status}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-slate-900 mt-1">{req.jobTitle}</h3>
                        <p className="text-xs text-slate-600 font-semibold">Client: {req.clientName} • Requested by: {req.requestedBy}</p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-slate-900 font-geometric-mono">
                          ₹{req.salaryMin} - ₹{req.salaryMax} LPA
                        </span>
                        <p className="text-[11px] text-slate-500">{req.openings} Openings • {req.location}</p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600">{req.jobDescription}</p>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200">
                      <div className="flex flex-wrap gap-1">
                        {req.requiredSkills.map((s) => (
                          <span key={s} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] text-slate-700">
                            {s}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center space-x-2">
                        {req.status !== 'Approved' && (
                          <button
                            onClick={() => {
                              onUpdateJDRequest(req.id, { status: 'Approved', approvedDate: new Date().toISOString().split('T')[0] });
                              showToast(`JD Request ${req.requestNumber} approved.`);
                            }}
                            className="px-3 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-xs font-bold"
                          >
                            Approve
                          </button>
                        )}

                        <button
                          onClick={() => {
                            onConvertJDToPosition(req);
                            showToast(`Converted JD ${req.requestNumber} into a Live Position!`);
                            setCurrentSection('positions');
                          }}
                          className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold"
                        >
                          Convert to Position
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 5: CANDIDATE POOL */}
          {currentSection === 'candidates' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Partner Candidate Pool</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Pre-screened engineering and business candidates with verified test benchmarks.
                  </p>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={candidateSearch}
                    onChange={(e) => setCandidateSearch(e.target.value)}
                    placeholder="Search candidate skills..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {candidates.map((cand) => (
                  <div
                    key={cand.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all space-y-3"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center justify-center">
                        {cand.name.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-bold text-slate-900 truncate">{cand.name}</h4>
                        <p className="text-xs text-slate-500">{cand.headline || 'Full Stack Engineer'}</p>
                        <p className="text-[10px] text-blue-600 font-geometric-mono">{cand.email}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        CGPA: {cand.cgpa || 8.4}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {(cand.skills || ['Python', 'Django', 'React', 'MySQL']).map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] text-slate-700">
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                      <span className="text-[11px] font-bold text-slate-500">Exp: {cand.experienceYears || 2} Years</span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setIntCandName(cand.name);
                            setShowScheduleModal(true);
                          }}
                          className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700"
                        >
                          Schedule Interview
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 6: APPLICATIONS PIPELINE */}
          {currentSection === 'applications' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl font-black text-slate-900">Application Tracking Pipeline</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update candidate stages: Applied &rarr; Under Review &rarr; Shortlisted &rarr; Interview &rarr; Selected &rarr; Rejected.
                </p>
              </div>

              <div className="space-y-3">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-900">{app.candidateName}</p>
                      <p className="text-[11px] text-slate-500">Applied for: <strong className="text-slate-800">{app.jobTitle}</strong> ({app.company})</p>
                      <p className="text-[10px] font-geometric-mono text-slate-400">Date: {app.appliedAt}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-slate-500 font-medium">Status:</span>
                      <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-800 text-xs font-bold">
                        {app.status.replace('_', ' ').toUpperCase()}
                      </span>
                      <button
                        onClick={() => {
                          setIntCandName(app.candidateName);
                          setIntPosition(app.jobTitle);
                          setShowScheduleModal(true);
                        }}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold"
                      >
                        Move to Interview
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 7: INTERVIEW MANAGEMENT */}
          {currentSection === 'interviews' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Partner Interview Manager</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Schedule, reschedule, or cancel interviews with real-time feedback logging.
                  </p>
                </div>
                <button
                  onClick={() => setShowScheduleModal(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold"
                >
                  + Schedule New Interview
                </button>
              </div>

              <div className="space-y-4">
                {interviews.map((intv) => (
                  <div
                    key={intv.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            intv.status === 'Scheduled'
                              ? 'bg-blue-100 text-blue-800'
                              : intv.status === 'Completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {intv.status}
                        </span>
                        <h4 className="text-base font-bold text-slate-900 mt-1">{intv.candidateName}</h4>
                        <p className="text-xs text-slate-600">{intv.positionTitle} • {intv.company}</p>
                      </div>

                      <div className="text-right">
                        <p className="text-xs font-bold text-slate-900 font-geometric-mono">{intv.date}</p>
                        <p className="text-[11px] text-slate-500">{intv.time}</p>
                      </div>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
                      <p className="text-slate-500">Interviewer: <strong className="text-slate-800">{intv.interviewerName}</strong></p>
                      <p className="text-slate-500">Meeting Link: <a href={intv.meetingLink} target="_blank" rel="noreferrer" className="text-blue-600 underline font-geometric-mono">{intv.meetingLink}</a></p>
                      {intv.notes && <p className="text-slate-600 italic">Notes: &ldquo;{intv.notes}&rdquo;</p>}
                      {intv.feedback && <p className="text-emerald-700 font-medium">Feedback: {intv.feedback}</p>}
                    </div>

                    <div className="flex items-center justify-end space-x-2 pt-1">
                      <button
                        onClick={() => {
                          onUpdateInterview(intv.id, { status: 'Completed', feedback: 'Passed technical interview with high marks.' });
                          showToast('Interview marked as Completed.');
                        }}
                        className="px-3 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-xs font-bold"
                      >
                        Mark Completed
                      </button>
                      <button
                        onClick={() => {
                          onUpdateInterview(intv.id, { status: 'Cancelled' });
                          showToast('Interview marked as Cancelled.');
                        }}
                        className="px-3 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg text-xs font-bold"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 8: RECRUITMENT REPORTS & ANALYTICS */}
          {currentSection === 'reports' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Recruitment Analytics & Funnel Reports</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Data-driven hiring insights across enterprise positions and applicant conversions.
                  </p>
                </div>
                <button
                  onClick={() => showToast('Recruitment analytics exported as PDF report.')}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Report (PDF)</span>
                </button>
              </div>

              {/* Funnel Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <p className="text-2xl font-black text-slate-900 font-geometric-mono">312</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Applications</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <p className="text-2xl font-black text-blue-600 font-geometric-mono">94</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Shortlisted</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <p className="text-2xl font-black text-purple-600 font-geometric-mono">42</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Interviews</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <p className="text-2xl font-black text-emerald-600 font-geometric-mono">24</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Selected</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <p className="text-2xl font-black text-rose-600 font-geometric-mono">18</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Rejected</p>
                </div>
              </div>

              {/* Conversion Funnel Bar */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-geometric-mono">
                  Hiring Pipeline Conversion Rate: 18.4%
                </h4>
                <div className="space-y-2 text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                      <span>Applied to Shortlist Rate</span>
                      <span className="font-bold">30.1%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-2 rounded-full w-[30%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                      <span>Shortlist to Interview Rate</span>
                      <span className="font-bold">44.6%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-purple-600 h-2 rounded-full w-[45%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                      <span>Interview to Offer Selection Rate</span>
                      <span className="font-bold">57.1%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-2 rounded-full w-[57%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 9: USER MANAGEMENT & RBAC */}
          {currentSection === 'users' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl font-black text-slate-900">Partner & Recruitment Access RBAC</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Manage permissions for Super Admin, Partnerships Team, Recruiters, and Hiring Managers.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase font-geometric-mono border-b border-slate-200">
                    <tr>
                      <th className="p-3">User & Organization</th>
                      <th className="p-3">Role</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Created</th>
                      <th className="p-3">Permission Level</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { name: 'Arun Mehta', email: 'arun.mehta@jobskul.com', role: 'Super Admin', org: 'Jobskül HQ', status: 'Active', perms: 'Full Control' },
                      { name: 'Neha Sengupta', email: 'neha.s@jobskul.com', role: 'Partnerships Team', org: 'Enterprise Mandates', status: 'Active', perms: 'Positions & JDs' },
                      { name: 'Rohan Deshmukh', email: 'rohan.d@jobskul.com', role: 'Recruiter', org: 'Campus Staffing', status: 'Active', perms: 'Interviews & Screening' },
                      { name: 'Dr. Rajesh K. Nair', email: 'rajesh.nair@partner.com', role: 'Hiring Manager', org: 'CloudSphere Tech', status: 'Active', perms: 'Interviews Only' }
                    ].map((u, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="p-3">
                          <p className="font-bold text-slate-900">{u.name}</p>
                          <p className="text-[10px] text-slate-400 font-geometric-mono">{u.email}</p>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">
                            {u.role}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            {u.status}
                          </span>
                        </td>
                        <td className="p-3 text-slate-500">2026-08-15</td>
                        <td className="p-3 font-semibold text-slate-700">{u.perms}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* SCHEDULE INTERVIEW MODAL */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleScheduleSubmit} className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Schedule Interview Round</h3>
              <button type="button" onClick={() => setShowScheduleModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">Candidate Name *</label>
              <input
                type="text"
                value={intCandName}
                onChange={(e) => setIntCandName(e.target.value)}
                placeholder="Candidate full name"
                className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">Position</label>
              <input
                type="text"
                value={intPosition}
                onChange={(e) => setIntPosition(e.target.value)}
                placeholder="Senior Python & React Lead"
                className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700">Date *</label>
                <input
                  type="date"
                  value={intDate}
                  onChange={(e) => setIntDate(e.target.value)}
                  className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700">Time *</label>
                <input
                  type="text"
                  value={intTime}
                  onChange={(e) => setIntTime(e.target.value)}
                  placeholder="03:30 PM IST"
                  className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">Interview Type</label>
              <select
                value={intType}
                onChange={(e) => setIntType(e.target.value as any)}
                className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              >
                <option value="Technical">Technical</option>
                <option value="System Design">System Design</option>
                <option value="HR">HR</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">Meeting Link</label>
              <input
                type="text"
                value={intLink}
                onChange={(e) => setIntLink(e.target.value)}
                className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-geometric-mono"
              />
            </div>

            <div className="pt-2 flex justify-end space-x-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowScheduleModal(false)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700"
              >
                Schedule & Send Invite
              </button>
            </div>
          </form>
        </div>
      )}

      {/* CREATE JD REQUEST MODAL */}
      {showCreateJDModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleCreateJDRequestSubmit} className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Submit Client JD Request</h3>
              <button type="button" onClick={() => setShowCreateJDModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700">Client / Organization *</label>
                <input
                  type="text"
                  value={jdClientName}
                  onChange={(e) => setJdClientName(e.target.value)}
                  placeholder="e.g. Wipro Digital"
                  className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700">Job Title *</label>
                <input
                  type="text"
                  value={jdTitle}
                  onChange={(e) => setJdTitle(e.target.value)}
                  placeholder="e.g. Cloud Data Engineer"
                  className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700">Min Salary (LPA)</label>
                <input
                  type="number"
                  value={jdMinSalary}
                  onChange={(e) => setJdMinSalary(Number(e.target.value))}
                  className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700">Max Salary (LPA)</label>
                <input
                  type="number"
                  value={jdMaxSalary}
                  onChange={(e) => setJdMaxSalary(Number(e.target.value))}
                  className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">Skills (Comma separated)</label>
              <input
                type="text"
                value={jdSkills}
                onChange={(e) => setJdSkills(e.target.value)}
                placeholder="Python, PySpark, Snowflake"
                className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">Brief Description</label>
              <textarea
                rows={3}
                value={jdDescription}
                onChange={(e) => setJdDescription(e.target.value)}
                placeholder="Key outcomes, project deliverables..."
                className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>

            <div className="pt-2 flex justify-end space-x-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowCreateJDModal(false)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
