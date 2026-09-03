import React, { useState } from 'react';
import { Company, JobListing } from '../types';
import {
  Building2,
  CheckCircle2,
  MapPin,
  Users,
  Globe,
  Star,
  Search,
  Briefcase,
  ArrowRight
} from 'lucide-react';

interface CompanyDirectoryProps {
  companies: Company[];
  jobs: JobListing[];
  onSelectCompanyJobs: (companyName: string) => void;
}

export const CompanyDirectory: React.FC<CompanyDirectoryProps> = ({
  companies,
  jobs,
  onSelectCompanyJobs,
}) => {
  const [search, setSearch] = useState('');
  const [industryFilter, setIndustryFilter] = useState('All');

  const industries = ['All', ...Array.from(new Set(companies.map(c => c.industry)))];

  const filtered = companies.filter((c) => {
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      const matches =
        c.name.toLowerCase().includes(q) ||
        c.industry.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q);
      if (!matches) return false;
    }
    if (industryFilter !== 'All' && c.industry !== industryFilter) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold uppercase tracking-wider">
              100% Verified Employers
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            Top Hiring Partners & Enterprises
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
            Explore actively hiring organizations partnering with Jobskül for lateral placements, graduate hire-train-deploy programs, and senior tech talent.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search companies, tech, location..."
              className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 p-0.5"
                title="Clear company search"
              >
                <span className="text-xs font-bold leading-none">&times;</span>
              </button>
            )}
          </div>

          <select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {industries.map(ind => (
              <option key={ind} value={ind}>{ind === 'All' ? 'All Industries' : ind}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((company) => {
          const companyJobs = jobs.filter(
            (j) => j.company.toLowerCase() === company.name.toLowerCase()
          );

          return (
            <div
              key={company.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all p-6 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center p-1">
                      {company.logo ? (
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="w-full h-full object-cover rounded-lg"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <Building2 className="w-6 h-6 text-slate-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{company.name}</h3>
                      <div className="flex items-center space-x-1 mt-0.5">
                        <span className="text-xs text-slate-500">{company.industry}</span>
                        {company.verified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{company.rating}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-3 line-clamp-3 leading-relaxed">
                  {company.about}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {company.benefits?.slice(0, 3).map((b, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-semibold"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">
                  {companyJobs.length} Open {companyJobs.length === 1 ? 'Job' : 'Jobs'}
                </span>
                <button
                  onClick={() => onSelectCompanyJobs(company.name)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                >
                  <span>View Openings</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
