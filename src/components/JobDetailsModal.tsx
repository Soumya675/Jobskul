import React, { useState } from 'react';
import { JobListing, User } from '../types';
import {
  X,
  MapPin,
  Briefcase,
  IndianRupee,
  Clock,
  CheckCircle2,
  Bookmark,
  Share2,
  Building2,
  Calendar,
  Users,
  Award,
  Send,
  FileCheck,
  Gift
} from 'lucide-react';

interface JobDetailsModalProps {
  job: JobListing;
  onClose: () => void;
  onApplySubmit: (jobId: string, coverLetter: string) => void;
  isSaved?: boolean;
  onSaveToggle: (jobId: string) => void;
  similarJobs?: JobListing[];
  onSelectSimilarJob?: (job: JobListing) => void;
  currentUser: User | null;
  hasApplied?: boolean;
}

export const JobDetailsModal: React.FC<JobDetailsModalProps> = ({
  job,
  onClose,
  onApplySubmit,
  isSaved = false,
  onSaveToggle,
  similarJobs = [],
  onSelectSimilarJob,
  currentUser,
  hasApplied = false,
}) => {
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [coverLetter, setCoverLetter] = useState(
    `Dear Hiring Team at ${job.company},\n\nI am thrilled to apply for the ${job.title} role. With my background in ${currentUser?.skills?.slice(0, 3).join(', ') || 'software development'} and my passion for building scalable solutions, I believe I can make an immediate positive contribution to your engineering team.\n\nBest regards,\n${currentUser?.name || 'Applicant'}`
  );
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    onApplySubmit(job.id, coverLetter);
    setShowApplyForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header Bar */}
        <div className="p-6 sm:p-7 border-b border-slate-100 flex items-start justify-between bg-slate-50/80">
          <div className="flex items-start space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200/80 overflow-hidden shrink-0 flex items-center justify-center p-1 shadow-xs">
              {job.companyLogo ? (
                <img
                  src={job.companyLogo}
                  alt={job.company}
                  className="w-full h-full object-cover rounded-xl"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <Building2 className="w-8 h-8 text-slate-400" />
              )}
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-slate-700">{job.company}</span>
                {job.companyVerified && (
                  <span className="inline-flex items-center space-x-1 text-[11px] font-geometric-mono font-bold text-blue-700 bg-blue-50 border border-blue-200/80 px-2 py-0.5 rounded-md">
                    <CheckCircle2 className="w-3 h-3 text-blue-600 shrink-0" />
                    <span>Verified Employer</span>
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                {job.title}
              </h2>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mt-2 font-geometric-mono">
                <div className="flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{job.location} ({job.workMode})</span>
                </div>
                <div className="flex items-center space-x-1 font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                  <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{job.salaryDisplay}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                  <span>{job.experienceLevel}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>{job.openings} Openings</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 rounded-xl transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-7 overflow-y-auto space-y-6 flex-1 text-slate-700 text-sm">
          {/* Quick Apply / Saved Bar */}
          <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center space-x-3 text-xs text-blue-950 font-geometric-mono">
              <Clock className="w-4 h-4 text-blue-600 shrink-0" />
              <span>
                Deadline: <strong>{job.applicationDeadline}</strong> • Posted {job.postedDate}
              </span>
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <button
                onClick={() => onSaveToggle(job.id)}
                className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                  isSaved
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200/80 hover:bg-slate-50'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
                <span>{isSaved ? 'Saved' : 'Save Job'}</span>
              </button>

              <button
                onClick={handleShare}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white text-slate-700 border border-slate-200/80 hover:bg-slate-50 transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>{copied ? 'Link Copied!' : 'Share'}</span>
              </button>

              {hasApplied ? (
                <div className="flex-1 sm:flex-initial px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-1 shadow-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Applied</span>
                </div>
              ) : (
                <button
                  onClick={() => setShowApplyForm(true)}
                  className="flex-1 sm:flex-initial px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs hover:shadow transition-all cursor-pointer"
                >
                  Apply with Profile / Resume
                </button>
              )}
            </div>
          </div>

          {/* Apply Form Drawer / Section */}
          {showApplyForm && (
            <div className="bg-slate-50 border border-blue-200 rounded-2xl p-5 space-y-4 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileCheck className="w-5 h-5 text-blue-600" />
                  <h4 className="font-bold text-slate-900 text-sm">Submit Application to {job.company}</h4>
                </div>
                <button
                  onClick={() => setShowApplyForm(false)}
                  className="text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
              </div>

              <div className="text-xs text-slate-600 bg-white p-3.5 rounded-xl border border-slate-200/80 space-y-1">
                <p><strong>Applying as:</strong> {currentUser?.name} ({currentUser?.email})</p>
                <p><strong>Attached Resume:</strong> {currentUser?.resumeUrl || 'Default ATS Resume (Created via Jobskül Builder)'}</p>
                <p><strong>Verified Skills:</strong> {currentUser?.skills?.join(', ') || 'Python, React, MySQL'}</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 font-geometric-mono uppercase tracking-wider">
                  Cover Letter / Notes to Hiring Manager:
                </label>
                <textarea
                  rows={4}
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="w-full text-xs p-3.5 bg-white border border-slate-200/90 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowApplyForm(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200/80 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitApplication}
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center space-x-1.5 shadow-xs hover:shadow transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit One-Click Application</span>
                </button>
              </div>
            </div>
          )}

          {/* Job Overview */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              About The Role
            </h3>
            <p className="leading-relaxed text-slate-600">{job.description}</p>
          </div>

          {/* Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                Key Responsibilities
              </h3>
              <ul className="space-y-1.5 list-disc list-inside text-slate-600">
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx} className="leading-relaxed pl-1">{resp}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Required Skills */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Required Skills & Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {job.requiredSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/60 rounded-md"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Preferred Skills */}
          {job.preferredSkills && job.preferredSkills.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                Preferred / Nice to Have
              </h3>
              <div className="flex flex-wrap gap-2">
                {job.preferredSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education & Perks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5 flex items-center space-x-1.5">
                <Award className="w-4 h-4 text-blue-600" />
                <span>Education Requirements</span>
              </h4>
              <p className="text-xs text-slate-600">{job.educationRequirements}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5 flex items-center space-x-1.5">
                <Gift className="w-4 h-4 text-blue-600" />
                <span>Benefits & Perks</span>
              </h4>
              <ul className="text-xs text-slate-600 space-y-1">
                {job.benefits.map((b, i) => (
                  <li key={i} className="flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Similar Jobs */}
          {similarJobs.length > 0 && (
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 mb-3">Similar Opportunities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {similarJobs.map((simJob) => (
                  <div
                    key={simJob.id}
                    onClick={() => onSelectSimilarJob && onSelectSimilarJob(simJob)}
                    className="p-3 bg-slate-50 hover:bg-blue-50/70 border border-slate-200 rounded-xl cursor-pointer transition-colors"
                  >
                    <p className="text-xs font-bold text-slate-900 line-clamp-1">{simJob.title}</p>
                    <p className="text-[11px] text-slate-600 mt-0.5">{simJob.company} • {simJob.location}</p>
                    <p className="text-[11px] font-semibold text-emerald-700 mt-1">{simJob.salaryDisplay}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
