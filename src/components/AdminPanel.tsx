import React, { useState } from 'react';
import { User, JobListing, JobApplication } from '../types';
import {
  ShieldCheck,
  Users,
  Briefcase,
  FileCheck,
  Award,
  CheckCircle2,
  XCircle,
  Database,
  Server,
  Search,
  X
} from 'lucide-react';

interface AdminPanelProps {
  users: User[];
  jobs: JobListing[];
  applications: JobApplication[];
  onApproveJob: (jobId: string) => void;
  onCloseJob: (jobId: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  users,
  jobs,
  applications,
  onApproveJob,
  onCloseJob,
}) => {
  const [jobSearch, setJobSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const candidatesCount = users.filter(u => u.role === 'candidate').length;
  const recruitersCount = users.filter(u => u.role === 'recruiter').length;
  const placedCount = applications.filter(a => a.status === 'selected').length;

  const filteredJobs = jobs.filter(j => {
    if (jobSearch.trim()) {
      const q = jobSearch.trim().toLowerCase();
      const matches =
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q) ||
        j.category.toLowerCase().includes(q);
      if (!matches) return false;
    }
    if (statusFilter !== 'All' && j.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner */}
      <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-md flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 text-xs font-bold uppercase">
              Jobskül Master Control
            </span>
            <span className="text-xs text-slate-400">• MySQL 8.0 Engine Online</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black mt-2">Platform Administration & Moderation</h1>
          <p className="text-xs text-slate-400 mt-1">
            Oversee job listings, verify enterprise employers, monitor application metrics, and enforce quality standards.
          </p>
        </div>

        <div className="hidden sm:flex items-center space-x-2 bg-slate-800/80 p-3 rounded-xl border border-slate-700">
          <Database className="w-5 h-5 text-emerald-400" />
          <div className="text-xs">
            <p className="font-bold text-slate-200">MySQL Database</p>
            <p className="text-emerald-400 text-[10px]">Connected (InnoDB Pool)</p>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <p className="text-xs font-bold uppercase text-slate-500">Registered Candidates</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{candidatesCount}</p>
          <p className="text-[11px] text-emerald-600 mt-0.5">Active Talent Pool</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <p className="text-xs font-bold uppercase text-slate-500">Recruiters & Employers</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{recruitersCount}</p>
          <p className="text-[11px] text-blue-600 mt-0.5">Verified Enterprises</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <p className="text-xs font-bold uppercase text-slate-500">Total Applications</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{applications.length}</p>
          <p className="text-[11px] text-purple-600 mt-0.5">Across all tracks</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <p className="text-xs font-bold uppercase text-slate-500">Successful Placements</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">{placedCount}</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Candidates placed</p>
        </div>
      </div>

      {/* Job Moderation Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Job Listings Moderation</h3>
            <p className="text-xs text-slate-500">Filter, search, approve, or archive postings across the platform.</p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative w-full sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={jobSearch}
                onChange={(e) => setJobSearch(e.target.value)}
                placeholder="Search job title, company, location..."
                className="w-full pl-8 pr-7 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {jobSearch && (
                <button
                  onClick={() => setJobSearch('')}
                  className="absolute right-2 top-2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="All">All ({jobs.length})</option>
              <option value="active">Active</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-100">
              <tr>
                <th className="p-4">Title & Company</th>
                <th className="p-4">Location</th>
                <th className="p-4">Applicants</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Moderation Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500 text-xs font-semibold">
                    No jobs match &ldquo;{jobSearch}&rdquo;
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50">
                    <td className="p-4 font-bold text-slate-900">
                      <div>{job.title}</div>
                      <div className="text-[11px] text-slate-500 font-normal">{job.company}</div>
                    </td>
                    <td className="p-4 text-slate-600">{job.location} ({job.workMode})</td>
                    <td className="p-4 font-semibold text-blue-700">{job.applicantCount} applicants</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        job.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      {job.status === 'active' ? (
                        <button
                          onClick={() => onCloseJob(job.id)}
                          className="px-2.5 py-1 bg-red-50 text-red-600 hover:bg-red-100 rounded-md font-semibold text-xs cursor-pointer"
                        >
                          Close Listing
                        </button>
                      ) : (
                        <button
                          onClick={() => onApproveJob(job.id)}
                          className="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-md font-semibold text-xs cursor-pointer"
                        >
                          Activate Job
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
