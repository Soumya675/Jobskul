import React, { useState } from 'react';
import { User, JobApplication, JobListing } from '../types';
import {
  CheckCircle2,
  Clock,
  Video,
  FileText,
  Bookmark,
  Calendar,
  Target,
  MessageSquare,
  ArrowRight,
  AlertCircle,
  ExternalLink,
  Trash2,
  Award,
  BookOpen,
  Search,
  X
} from 'lucide-react';

interface CandidateDashboardProps {
  currentUser: User;
  applications: JobApplication[];
  savedJobs: JobListing[];
  onWithdrawApplication: (appId: string) => void;
  onNavigateToTab: (tab: string) => void;
  onViewJob: (job: JobListing) => void;
}

export const CandidateDashboard: React.FC<CandidateDashboardProps> = ({
  currentUser,
  applications,
  savedJobs,
  onWithdrawApplication,
  onNavigateToTab,
  onViewJob,
}) => {
  const [appSearch, setAppSearch] = useState('');
  const [appStatusFilter, setAppStatusFilter] = useState('All');
  const completion = currentUser.profileCompletion || 85;

  const filteredApplications = applications.filter((app) => {
    if (appSearch.trim()) {
      const q = appSearch.trim().toLowerCase();
      const matches =
        app.jobTitle.toLowerCase().includes(q) ||
        app.company.toLowerCase().includes(q) ||
        (app.candidateSkills && app.candidateSkills.some(s => s.toLowerCase().includes(q))) ||
        app.status.toLowerCase().includes(q);
      if (!matches) return false;
    }
    if (appStatusFilter !== 'All' && app.status !== appStatusFilter) return false;
    return true;
  });

  const pipelineStages = [
    { key: 'applied', label: 'Applied' },
    { key: 'application_received', label: 'Received' },
    { key: 'under_review', label: 'Under Review' },
    { key: 'shortlisted', label: 'Shortlisted' },
    { key: 'interview', label: 'Interview' },
    { key: 'selected', label: 'Selected' },
  ];

  const getStageIndex = (status: string) => {
    switch (status) {
      case 'applied': return 0;
      case 'application_received': return 1;
      case 'under_review': return 2;
      case 'shortlisted': return 3;
      case 'interview': return 4;
      case 'selected': return 5;
      case 'rejected': return -1;
      default: return 0;
    }
  };

  const scheduledInterviews = applications
    .filter((a) => a.interview && a.interview.status === 'scheduled')
    .map((a) => ({
      appId: a.id,
      jobTitle: a.jobTitle,
      company: a.company,
      interview: a.interview!,
    }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-linear-to-r from-blue-700 via-blue-800 to-indigo-900 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <span className="px-2.5 py-1 rounded-full bg-blue-500/30 text-blue-200 text-xs font-semibold uppercase tracking-wider">
              Candidate Career Hub
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {currentUser.name}!
            </h1>
            <p className="text-blue-200 text-sm max-w-xl">
              Track your real-time job applications, access scheduled mock and live interviews, build ATS resumes, and advance through hands-on project certificates.
            </p>
          </div>

          {/* Profile Completion Widget */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-5 border border-white/20 w-full md:w-auto md:min-w-[260px]">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-blue-100">Profile Completion</span>
              <span className="font-extrabold text-amber-300 text-sm">{completion}%</span>
            </div>
            <div className="w-full bg-blue-950/60 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-amber-400 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${completion}%` }}
              />
            </div>
            {completion < 100 && (
              <p className="text-[11px] text-blue-100 mt-2 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span>Add a live demo to your React capstone to reach 100%!</span>
              </p>
            )}
            <button
              onClick={() => onNavigateToTab('profile')}
              className="mt-3 w-full text-center py-1.5 bg-white text-blue-900 rounded-lg text-xs font-bold hover:bg-blue-50 transition-colors shadow-xs"
            >
              Update Profile Details
            </button>
          </div>
        </div>
      </div>

      {/* Scheduled Interviews Alert (If any) */}
      {scheduledInterviews.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span>Upcoming Scheduled Interviews</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scheduledInterviews.map((item, idx) => (
              <div
                key={idx}
                className="p-5 bg-blue-50/70 border border-blue-200 rounded-xl flex flex-col justify-between space-y-4 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-blue-600 text-white">
                      {item.interview.type} Round
                    </span>
                    <span className="text-xs font-semibold text-slate-600">
                      {item.interview.date} at {item.interview.time}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base mt-2">
                    {item.jobTitle}
                  </h3>
                  <p className="text-xs font-semibold text-slate-600">
                    {item.company} • Interviewer: {item.interview.interviewerName} ({item.interview.interviewerRole})
                  </p>

                  {item.interview.notes && (
                    <p className="text-xs text-slate-600 mt-2 bg-white/80 p-2.5 rounded-lg border border-blue-100">
                      <strong>Prep Note:</strong> {item.interview.notes}
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-3 pt-2">
                  {item.interview.meetingLink ? (
                    <a
                      href={item.interview.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 text-center py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center justify-center space-x-1.5 shadow-xs transition-colors"
                    >
                      <Video className="w-4 h-4" />
                      <span>Join Google Meet Session</span>
                    </a>
                  ) : (
                    <span className="text-xs text-slate-500 font-medium">Link will be sent prior to interview</span>
                  )}
                  <button
                    onClick={() => onNavigateToTab('hireai')}
                    className="px-3 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-blue-700 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Interview Prep</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Application Tracking Pipeline Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span>Real-Time Application Pipeline</span>
            </h2>
            <p className="text-xs text-slate-500">
              Live updates as recruiters review, screen, shortlist, and invite you to interviews.
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="relative w-full sm:w-56">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={appSearch}
                onChange={(e) => setAppSearch(e.target.value)}
                placeholder="Search applied roles, company..."
                className="w-full pl-8 pr-7 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {appSearch && (
                <button
                  onClick={() => setAppSearch('')}
                  className="absolute right-2 top-2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <select
              value={appStatusFilter}
              onChange={(e) => setAppStatusFilter(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg py-1.5 px-2 text-xs font-semibold text-slate-700"
            >
              <option value="All">All Statuses</option>
              <option value="applied">Applied</option>
              <option value="under_review">Under Review</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="interview">Interview</option>
              <option value="selected">Selected</option>
            </select>
          </div>
        </div>

        {applications.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center space-y-3">
            <p className="text-sm font-semibold text-slate-700">You haven't submitted any job applications yet.</p>
            <p className="text-xs text-slate-500">Explore open opportunities with one-click apply or build custom ATS resumes.</p>
            <button
              onClick={() => onNavigateToTab('jobs')}
              className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg shadow-xs cursor-pointer"
            >
              Browse Jobs Now
            </button>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center space-y-2">
            <p className="text-xs font-semibold text-slate-600">No applications match your search &ldquo;{appSearch}&rdquo;</p>
            <button
              onClick={() => { setAppSearch(''); setAppStatusFilter('All'); }}
              className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
            >
              Clear filter
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((app) => {
              const currentStageIdx = getStageIndex(app.status);
              const isRejected = app.status === 'rejected';

              return (
                <div
                  key={app.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-base font-bold text-slate-900">{app.jobTitle}</h3>
                        {app.aiMatchScore && (
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center space-x-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>{app.aiMatchScore}% Match</span>
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-slate-600 mt-0.5">
                        {app.company} • Applied on {app.appliedAt}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full capitalize ${
                        isRejected
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : app.status === 'interview'
                          ? 'bg-purple-50 text-purple-700 border border-purple-200'
                          : app.status === 'shortlisted'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        Status: {app.status.replace('_', ' ')}
                      </span>

                      <button
                        onClick={() => onWithdrawApplication(app.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors"
                        title="Withdraw Application"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Visual Pipeline Bar */}
                  {!isRejected ? (
                    <div className="pt-2">
                      <div className="grid grid-cols-6 gap-1 relative">
                        {pipelineStages.map((stage, idx) => {
                          const isPassed = currentStageIdx >= idx;
                          const isCurrent = currentStageIdx === idx;
                          return (
                            <div key={stage.key} className="flex flex-col items-center text-center space-y-1">
                              <div
                                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                                  isCurrent
                                    ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                                    : isPassed
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-100 text-slate-400 border border-slate-200'
                                }`}
                              >
                                {isPassed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                              </div>
                              <span
                                className={`text-[10px] font-semibold leading-tight ${
                                  isCurrent
                                    ? 'text-blue-700 font-bold'
                                    : isPassed
                                    ? 'text-slate-800'
                                    : 'text-slate-400'
                                }`}
                              >
                                {stage.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-rose-50 rounded-lg border border-rose-100 text-xs text-rose-800 flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>This application was not selected. Keep building your project portfolio and applying to matching roles!</span>
                    </div>
                  )}

                  {/* Interview Callout if shortlisted / interview */}
                  {app.status === 'interview' && app.interview && (
                    <div className="mt-3 bg-purple-50/80 border border-purple-200 rounded-xl p-3.5 flex items-center justify-between">
                      <div className="text-xs text-purple-900">
                        <strong>Interview Scheduled:</strong> {app.interview.type} round on {app.interview.date} at {app.interview.time}
                      </div>
                      {app.interview.meetingLink && (
                        <a
                          href={app.interview.meetingLink}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 bg-purple-600 text-white rounded-lg text-xs font-bold hover:bg-purple-700 transition-colors"
                        >
                          Join Call
                        </a>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Saved Jobs & Projects Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Saved Jobs */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <Bookmark className="w-4 h-4 text-blue-600" />
              <span>Saved Jobs ({savedJobs.length})</span>
            </h3>
            <button
              onClick={() => onNavigateToTab('jobs')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800"
            >
              Explore More
            </button>
          </div>

          {savedJobs.length === 0 ? (
            <div className="text-center py-6 text-xs text-slate-500">
              No saved jobs yet. Click the bookmark icon on any job card to save it for later.
            </div>
          ) : (
            <div className="space-y-3">
              {savedJobs.slice(0, 4).map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between p-3 bg-slate-50 hover:bg-blue-50/60 rounded-xl border border-slate-200/70 transition-colors"
                >
                  <div>
                    <h4
                      onClick={() => onViewJob(job)}
                      className="text-xs font-bold text-slate-900 hover:text-blue-700 cursor-pointer"
                    >
                      {job.title}
                    </h4>
                    <p className="text-[11px] text-slate-500">{job.company} • {job.location}</p>
                    <p className="text-[11px] font-semibold text-emerald-700 mt-0.5">{job.salaryDisplay}</p>
                  </div>
                  <button
                    onClick={() => onViewJob(job)}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs"
                  >
                    View & Apply
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Project Certifications & Quick Links */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Project Credentials</span>
            </h3>
          </div>

          <div className="p-3.5 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-2">
            <div className="flex items-center justify-between font-bold">
              <span>Python & MySQL Capstone</span>
              <span className="text-emerald-700">Verified ✓</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Enterprise Job Portal & Recruitment Engine (Django + MySQL)
            </p>
            <div className="text-[10px] text-slate-500 font-mono">
              Cert ID: JOBSKUL-CERT-PY892401
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <button
              onClick={() => onNavigateToTab('learn')}
              className="w-full py-2 px-3 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-lg text-xs font-semibold flex items-center justify-between border border-slate-200 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Jobskül Project Learning</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => onNavigateToTab('resume')}
              className="w-full py-2 px-3 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-lg text-xs font-semibold flex items-center justify-between border border-slate-200 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>Edit ATS Resume</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => onNavigateToTab('hireai')}
              className="w-full py-2 px-3 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-lg text-xs font-semibold flex items-center justify-between border border-slate-200 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-blue-600" />
                <span>Jobskül Skill Assessment & Prep</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
