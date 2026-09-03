import React, { useState } from 'react';
import { User, JobListing, JobApplication } from '../types';
import {
  Briefcase,
  Users,
  UserCheck,
  Calendar,
  PlusCircle,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Video,
  Send,
  ExternalLink,
  Clock,
  Eye,
  Building2,
  ChevronDown
} from 'lucide-react';

interface RecruiterDashboardProps {
  currentUser: User;
  jobs: JobListing[];
  applications: JobApplication[];
  candidates: User[];
  onStatusChange: (appId: string, status: any) => void;
  onScheduleInterview: (interviewData: any) => void;
  onPostJobSubmit: (jobData: any) => void;
  initialView?: 'dashboard' | 'post';
}

export const RecruiterDashboard: React.FC<RecruiterDashboardProps> = ({
  currentUser,
  jobs,
  applications,
  candidates,
  onStatusChange,
  onScheduleInterview,
  onPostJobSubmit,
  initialView = 'dashboard',
}) => {
  const [view, setView] = useState<'dashboard' | 'post' | 'candidates'>(initialView);
  const [selectedAppForInterview, setSelectedAppForInterview] = useState<JobApplication | null>(null);

  // Interview Form State
  const [intDate, setIntDate] = useState('2026-09-08');
  const [intTime, setIntTime] = useState('11:00 AM IST');
  const [intType, setIntType] = useState('Technical');
  const [intMode, setIntMode] = useState('Online (Google Meet)');
  const [intLink, setIntLink] = useState('https://meet.google.com/jsk-tech-eval');
  const [intNotes, setIntNotes] = useState('Hands-on coding walkthrough on Python & database design.');

  // Candidate Search State
  const [candSkillSearch, setCandSkillSearch] = useState('');
  const [candLocationSearch, setCandLocationSearch] = useState('All');

  // Job Posting Form State
  const [postTitle, setPostTitle] = useState('Senior Python & Backend Engineer');
  const [postCompany, setPostCompany] = useState(currentUser.companyName || 'CloudSphere Technologies');
  const [postLocation, setPostLocation] = useState('Bengaluru, India');
  const [postWorkMode, setPostWorkMode] = useState('Hybrid');
  const [postEmpType, setPostEmpType] = useState('Full-time');
  const [postExpLevel, setPostExpLevel] = useState('3-5 Years');
  const [postMinSalary, setPostMinSalary] = useState(14);
  const [postMaxSalary, setPostMaxSalary] = useState(24);
  const [postCategory, setPostCategory] = useState('Software & Tech');
  const [postSkills, setPostSkills] = useState('Python, Django, MySQL, Docker, REST APIs');
  const [postDesc, setPostDesc] = useState('We are seeking an experienced Backend Engineer to lead API development and database optimization.');
  const [postResponsibilities, setPostResponsibilities] = useState('Design robust microservices in Python\nOptimize MySQL relational schemas and query performance\nCollaborate with frontend engineers on REST endpoints');
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  // Filter applications for recruiter's company or all for demo
  const recruiterApps = applications;

  // Stats
  const activeJobsCount = jobs.filter(j => j.status === 'active').length;
  const totalApplicantsCount = recruiterApps.length;
  const shortlistedCount = recruiterApps.filter(a => a.status === 'shortlisted').length;
  const interviewsCount = recruiterApps.filter(a => a.status === 'interview').length;

  const handleAiGenerateJob = async () => {
    setIsAiGenerating(true);
    try {
      const res = await fetch('/api/ai/generate-job-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: postTitle,
          company: postCompany,
          skills: postSkills,
          experienceLevel: postExpLevel
        })
      });
      const data = await res.json();
      if (data.jobSpec) {
        setPostDesc(data.jobSpec.description);
        setPostResponsibilities(data.jobSpec.responsibilities.join('\n'));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPostJobSubmit({
      title: postTitle,
      company: postCompany,
      location: postLocation,
      workMode: postWorkMode,
      employmentType: postEmpType,
      experienceLevel: postExpLevel,
      salaryMin: postMinSalary,
      salaryMax: postMaxSalary,
      category: postCategory,
      requiredSkills: postSkills.split(',').map(s => s.trim()),
      description: postDesc,
      responsibilities: postResponsibilities.split('\n').filter(Boolean),
      applicationDeadline: '2026-10-31',
      benefits: ['Health Insurance', 'Annual Bonus', 'Continuous Learning Stipend'],
      openings: 2
    });
    setView('dashboard');
  };

  const handleConfirmInterview = () => {
    if (!selectedAppForInterview) return;
    onScheduleInterview({
      applicationId: selectedAppForInterview.id,
      date: intDate,
      time: intTime,
      type: intType,
      mode: intMode,
      meetingLink: intLink,
      interviewerName: currentUser.name,
      interviewerRole: currentUser.headline || 'Hiring Lead',
      notes: intNotes
    });
    setSelectedAppForInterview(null);
  };

  // Filtered Candidates
  const filteredCandidates = candidates.filter(c => {
    if (c.role !== 'candidate') return false;
    if (candSkillSearch) {
      const q = candSkillSearch.toLowerCase();
      const hasSkill = c.skills?.some(s => s.toLowerCase().includes(q));
      if (!hasSkill && !c.name.toLowerCase().includes(q)) return false;
    }
    if (candLocationSearch !== 'All' && !c.location?.includes(candLocationSearch)) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-linear-to-r from-slate-900 via-blue-900 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider">
              Recruiter & Talent Portal
            </span>
            <span className="text-xs text-blue-200">• {currentUser.companyName || 'Verified Enterprise'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            Welcome, {currentUser.name}
          </h1>
          <p className="text-blue-200 text-xs sm:text-sm max-w-xl">
            Streamline your hiring pipeline. Source ATS-verified talent, post new jobs with Gemini AI, and schedule candidate interviews with instant meeting links.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setView('post')}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center space-x-2 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post a New Job</span>
          </button>
        </div>
      </div>

      {/* View Switcher Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2 text-xs font-bold">
        <button
          onClick={() => setView('dashboard')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            view === 'dashboard' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Pipeline & Applications ({recruiterApps.length})
        </button>
        <button
          onClick={() => setView('candidates')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            view === 'candidates' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Search Candidate Database
        </button>
        <button
          onClick={() => setView('post')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            view === 'post' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Post a Job (AI Assisted)
        </button>
      </div>

      {/* VIEW: DASHBOARD / PIPELINE */}
      {view === 'dashboard' && (
        <div className="space-y-8 animate-in fade-in">
          {/* KPI Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
                <span>Active Jobs</span>
                <Briefcase className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-2xl font-black text-slate-900 mt-2">{activeJobsCount}</p>
              <p className="text-[11px] text-slate-500 mt-1">Live listings open for applications</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
                <span>Total Applicants</span>
                <Users className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-2xl font-black text-slate-900 mt-2">{totalApplicantsCount}</p>
              <p className="text-[11px] text-slate-500 mt-1">Screened through Jobskül</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
                <span>Shortlisted</span>
                <UserCheck className="w-4 h-4 text-amber-600" />
              </div>
              <p className="text-2xl font-black text-slate-900 mt-2">{shortlistedCount}</p>
              <p className="text-[11px] text-slate-500 mt-1">Advancing to interviews</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
                <span>Interviews Scheduled</span>
                <Calendar className="w-4 h-4 text-purple-600" />
              </div>
              <p className="text-2xl font-black text-slate-900 mt-2">{interviewsCount}</p>
              <p className="text-[11px] text-slate-500 mt-1">Technical & HR rounds</p>
            </div>
          </div>

          {/* Applications Kanban / Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Candidate Pipeline Management</h3>
                <p className="text-xs text-slate-500">
                  Review applicant profiles, evaluate AI match scores, and update candidate statuses.
                </p>
              </div>
              <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
                {recruiterApps.length} Total Applicants
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="p-4">Candidate & Role</th>
                    <th className="p-4">Key Skills</th>
                    <th className="p-4">AI Match</th>
                    <th className="p-4">Current Status</th>
                    <th className="p-4">Interview Schedule</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recruiterApps.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-slate-900 text-sm">{app.candidateName}</div>
                        <div className="text-[11px] text-slate-500">{app.candidateHeadline || 'Candidate'}</div>
                        <div className="text-[10px] text-blue-600 font-semibold mt-0.5">Applied: {app.jobTitle}</div>
                      </td>

                      <td className="p-4">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {app.candidateSkills?.slice(0, 3).map((s, i) => (
                            <span key={i} className="px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-700 text-[10px] font-medium">
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <Sparkles className="w-3 h-3 text-emerald-600" />
                          <span>{app.aiMatchScore || 88}%</span>
                        </span>
                      </td>

                      <td className="p-4">
                        <select
                          value={app.status}
                          onChange={(e) => onStatusChange(app.id, e.target.value)}
                          className="text-xs p-1.5 bg-white border border-slate-200 rounded-md font-semibold text-slate-700 focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="applied">Applied</option>
                          <option value="under_review">Under Review</option>
                          <option value="shortlisted">Shortlisted</option>
                          <option value="interview">Interview</option>
                          <option value="selected">Selected</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>

                      <td className="p-4">
                        {app.interview ? (
                          <div className="text-[11px] text-slate-700 space-y-0.5">
                            <p className="font-bold text-blue-700">{app.interview.date} @ {app.interview.time}</p>
                            <p className="text-slate-500">{app.interview.type} • {app.interview.mode}</p>
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-400">Not scheduled</span>
                        )}
                      </td>

                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => setSelectedAppForInterview(app)}
                          className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md font-semibold text-xs transition-colors"
                        >
                          {app.interview ? 'Reschedule' : 'Schedule Interview'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: CANDIDATES DIRECTORY SEARCH */}
      {view === 'candidates' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={candSkillSearch}
                onChange={(e) => setCandSkillSearch(e.target.value)}
                placeholder="Search candidates by skill (e.g. Python, MySQL, React, Docker) or name..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="w-full sm:w-auto">
              <select
                value={candLocationSearch}
                onChange={(e) => setCandLocationSearch(e.target.value)}
                className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
              >
                <option value="All">All Locations</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Pune">Pune</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCandidates.map((cand) => (
              <div key={cand.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                        {cand.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{cand.name}</h4>
                        <p className="text-[11px] text-blue-600 font-semibold">{cand.headline || 'Software Engineer'}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">{cand.about || 'Skilled developer with Jobskül project credentials.'}</p>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {cand.skills?.map((s, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-semibold">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">{cand.location}</span>
                  <button
                    onClick={() => alert(`Invitation sent to ${cand.name} for priority interview screening!`)}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-xs transition-colors"
                  >
                    Invite to Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW: POST A JOB WIZARD */}
      {view === 'post' && (
        <form onSubmit={handleFormSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-black text-slate-900">Post a Job Opening</h2>
              <p className="text-xs text-slate-500">Reach thousands of Jobskül candidates and students.</p>
            </div>
            <button
              type="button"
              onClick={handleAiGenerateJob}
              disabled={isAiGenerating}
              className="px-4 py-2 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center space-x-1.5 transition-all disabled:opacity-50"
            >
              <Sparkles className={`w-4 h-4 ${isAiGenerating ? 'animate-spin' : ''}`} />
              <span>{isAiGenerating ? 'Generating JD with AI...' : 'Generate JD with Gemini AI'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Job Title</label>
              <input
                type="text"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Hiring Company</label>
              <input
                type="text"
                value={postCompany}
                onChange={(e) => setPostCompany(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Location</label>
              <input
                type="text"
                value={postLocation}
                onChange={(e) => setPostLocation(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Work Mode</label>
              <select
                value={postWorkMode}
                onChange={(e) => setPostWorkMode(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
              >
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
                <option value="Work from office">Work from office</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Experience Level</label>
              <select
                value={postExpLevel}
                onChange={(e) => setPostExpLevel(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
              >
                <option value="Fresher">Fresher (0 Years)</option>
                <option value="1-3 Years">1-3 Years</option>
                <option value="3-5 Years">3-5 Years</option>
                <option value="5-8 Years">5-8 Years</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Salary Range (LPA)</label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={postMinSalary}
                  onChange={(e) => setPostMinSalary(Number(e.target.value))}
                  placeholder="Min"
                  className="w-1/2 p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                />
                <span className="text-slate-400">to</span>
                <input
                  type="number"
                  value={postMaxSalary}
                  onChange={(e) => setPostMaxSalary(Number(e.target.value))}
                  placeholder="Max"
                  className="w-1/2 p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Required Skills (Comma separated)</label>
              <input
                type="text"
                value={postSkills}
                onChange={(e) => setPostSkills(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Job Description</label>
              <textarea
                rows={4}
                value={postDesc}
                onChange={(e) => setPostDesc(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Responsibilities (One per line)</label>
              <textarea
                rows={3}
                value={postResponsibilities}
                onChange={(e) => setPostResponsibilities(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setView('dashboard')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
            >
              Publish Job Listing
            </button>
          </div>
        </form>
      )}

      {/* SCHEDULE INTERVIEW MODAL */}
      {selectedAppForInterview && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 max-w-lg w-full shadow-2xl space-y-4 animate-in zoom-in-95 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Video className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-sm">Schedule Candidate Interview</h3>
              </div>
              <button
                onClick={() => setSelectedAppForInterview(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg text-blue-900">
              <p><strong>Candidate:</strong> {selectedAppForInterview.candidateName}</p>
              <p className="mt-0.5"><strong>Role:</strong> {selectedAppForInterview.jobTitle}</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Interview Date</label>
                <input
                  type="date"
                  value={intDate}
                  onChange={(e) => setIntDate(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Interview Time (IST)</label>
                <input
                  type="text"
                  value={intTime}
                  onChange={(e) => setIntTime(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Interview Type</label>
                <select
                  value={intType}
                  onChange={(e) => setIntType(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                >
                  <option value="Technical">Technical Round</option>
                  <option value="Coding Round">Coding & System Design</option>
                  <option value="Managerial">Managerial Round</option>
                  <option value="HR">HR & Culture Fit</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Meeting Link (Google Meet / Zoom)</label>
                <input
                  type="url"
                  value={intLink}
                  onChange={(e) => setIntLink(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Instructions / Notes to Candidate</label>
                <textarea
                  rows={2}
                  value={intNotes}
                  onChange={(e) => setIntNotes(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedAppForInterview(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmInterview}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-xs flex items-center space-x-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Confirm & Notify Candidate</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
