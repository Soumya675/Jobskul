import React from 'react';
import { JobListing } from '../types';
import {
  MapPin,
  Briefcase,
  IndianRupee,
  Clock,
  Sparkles,
  Bookmark,
  CheckCircle2,
  Building2,
  ChevronRight
} from 'lucide-react';

interface JobCardProps {
  job: JobListing;
  isSaved?: boolean;
  onSaveToggle: (jobId: string) => void;
  onApply: (job: JobListing) => void;
  onViewDetails: (job: JobListing) => void;
  hasApplied?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  isSaved = false,
  onSaveToggle,
  onApply,
  onViewDetails,
  hasApplied = false,
}) => {
  return (
    <div
      id={`job-card-${job.id}`}
      className="group relative bg-white rounded-xl border border-[#E2E8F0] hover:border-[#CBD5E1] hover:shadow-md transition-all p-5 flex flex-col justify-between"
    >
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            {/* Company Logo / Avatar */}
            <div className="w-12 h-12 rounded-lg bg-slate-50 border border-[#E2E8F0] overflow-hidden shrink-0 flex items-center justify-center p-1">
              {job.companyLogo ? (
                <img
                  src={job.companyLogo}
                  alt={job.company}
                  className="w-full h-full object-cover rounded-md"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <Building2 className="w-6 h-6 text-[#94A3B8]" />
              )}
            </div>

            {/* Title & Company */}
            <div>
              <h3
                onClick={() => onViewDetails(job)}
                className="text-base font-bold text-[#0F172A] group-hover:text-[#2563EB] cursor-pointer transition-colors line-clamp-1 leading-snug"
              >
                {job.title}
              </h3>
              <div className="flex items-center space-x-1.5 mt-0.5">
                <span className="text-xs font-semibold text-[#0F172A]">{job.company}</span>
                {job.companyVerified && (
                  <span className="inline-flex items-center space-x-0.5 text-[10px] font-geometric-mono font-bold text-[#2563EB] bg-[#EFF6FF] border border-blue-200/70 px-1.5 py-0.5 rounded-md">
                    <CheckCircle2 className="w-3 h-3 text-[#2563EB]" />
                    <span>Verified</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Bookmark Button */}
          <button
            id={`bookmark-btn-${job.id}`}
            onClick={() => onSaveToggle(job.id)}
            className={`p-2 rounded-lg border transition-colors ${
              isSaved
                ? 'text-[#2563EB] bg-[#EFF6FF] border-blue-200'
                : 'text-[#64748B] hover:text-[#0F172A] bg-white border-[#E2E8F0] hover:bg-slate-50'
            }`}
            aria-label={isSaved ? "Unsave Job" : "Save Job"}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#2563EB]' : ''}`} />
          </button>
        </div>

        {/* Badges / Key Metadata */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 mt-3.5 text-xs text-[#64748B]">
          <div className="flex items-center space-x-1 font-medium font-geometric-mono text-[11px]">
            <Briefcase className="w-3.5 h-3.5 text-[#94A3B8]" />
            <span>{job.experienceLevel}</span>
          </div>
          <div className="flex items-center space-x-1 font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#94A3B8]" />
            <span className="truncate max-w-[140px]">{job.location}</span>
          </div>
          <div className="flex items-center space-x-1 font-geometric-mono font-bold text-emerald-700">
            <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
            <span>{job.salaryDisplay}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="px-2 py-0.5 text-[11px] font-geometric-mono font-medium bg-slate-100 text-[#0F172A] rounded-md border border-[#E2E8F0]">
              {job.workMode}
            </span>
            <span className="px-2 py-0.5 text-[11px] font-geometric-mono font-semibold bg-[#EFF6FF] text-[#2563EB] rounded-md border border-blue-200/60">
              {job.employmentType}
            </span>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-xs text-[#64748B] mt-3 line-clamp-2 leading-relaxed">
          {job.description}
        </p>

        {/* Skill Tags */}
        <div className="flex flex-wrap items-center gap-1.5 mt-3.5">
          {job.requiredSkills.slice(0, 4).map((skill, idx) => (
            <span
              key={idx}
              className="text-[11px] font-geometric-mono font-medium px-2 py-0.5 bg-slate-50 text-[#0F172A] border border-[#E2E8F0] rounded-md hover:bg-slate-100 transition-colors"
            >
              {skill}
            </span>
          ))}
          {job.requiredSkills.length > 4 && (
            <span className="text-[10px] font-geometric-mono text-[#94A3B8] font-medium">
              +{job.requiredSkills.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Card Footer: Post Date & Actions */}
      <div className="pt-4 mt-4 border-t border-[#E2E8F0] flex items-center justify-between">
        <div className="flex items-center space-x-2 text-[11px] font-geometric-mono text-[#64748B]">
          <Clock className="w-3 h-3 text-[#94A3B8]" />
          <span>{job.postedDate}</span>
          <span>•</span>
          <span className="text-[#0F172A] font-semibold">{job.applicantCount} applicants</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            id={`view-details-${job.id}`}
            onClick={() => onViewDetails(job)}
            className="text-xs font-semibold text-[#0F172A] hover:text-[#2563EB] px-2.5 py-1.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-[#E2E8F0] transition-colors flex items-center space-x-1"
          >
            <span>Details</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          {hasApplied ? (
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Applied</span>
            </span>
          ) : (
            <button
              id={`apply-btn-${job.id}`}
              onClick={() => onApply(job)}
              className="text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] px-3.5 py-1.5 rounded-lg shadow-xs transition-colors"
            >
              Apply Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
