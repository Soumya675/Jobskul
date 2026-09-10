import React from 'react';
import { Filter, RotateCcw, CheckCircle2, IndianRupee } from 'lucide-react';

export interface FilterState {
  category: string;
  workMode: string;
  employmentType: string;
  experienceLevel: string;
  salaryMin: number;
  salaryMax: number;
  verifiedOnly: boolean;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onReset: () => void;
  totalResultsCount: number;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onReset,
  totalResultsCount,
}) => {
  const categories = [
    'All',
    'Marketing & Sales',
    'Software',
    'Retail & Products',
    'Human Resource',
    'Finance',
    'Management',
    'Customer Help',
    'Market Research'
  ];

  const workModes = ['All', 'Remote', 'Hybrid', 'Work from office'];

  const employmentTypes = ['All', 'Full-time', 'Internship', 'Contract', 'Part-time'];

  const experienceLevels = ['All', 'Fresher', '1-3 Years', '3-5 Years', '5-8 Years'];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs sticky top-24 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
            <Filter className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Filter Jobs</h3>
          <span className="text-[11px] font-geometric-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60">
            {totalResultsCount}
          </span>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center space-x-1 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Verified Companies Only */}
      <div className="p-3 bg-gradient-to-r from-blue-50/80 to-sky-50/60 rounded-xl border border-blue-200/70">
        <label className="flex items-center space-x-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={filters.verifiedOnly}
            onChange={(e) => onFilterChange({ ...filters, verifiedOnly: e.target.checked })}
            className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 accent-blue-600 cursor-pointer"
          />
          <div className="flex items-center space-x-1.5 text-xs font-bold text-blue-900">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>Verified Companies Only</span>
          </div>
        </label>
      </div>

      {/* Work Mode */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-geometric-mono">Work Mode</label>
        <div className="space-y-1.5">
          {workModes.map((mode) => (
            <label key={mode} className="flex items-center space-x-2.5 cursor-pointer text-xs font-medium text-slate-700 select-none hover:text-blue-600 transition-colors">
              <input
                type="radio"
                name="workMode"
                checked={filters.workMode === mode}
                onChange={() => onFilterChange({ ...filters, workMode: mode })}
                className="w-3.5 h-3.5 text-blue-600 focus:ring-blue-500 accent-blue-600 cursor-pointer"
              />
              <span>{mode}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Experience Level */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-geometric-mono">Experience</label>
        <div className="space-y-1.5">
          {experienceLevels.map((lvl) => (
            <label key={lvl} className="flex items-center space-x-2.5 cursor-pointer text-xs font-medium text-slate-700 select-none hover:text-blue-600 transition-colors">
              <input
                type="radio"
                name="experienceLevel"
                checked={filters.experienceLevel === lvl}
                onChange={() => onFilterChange({ ...filters, experienceLevel: lvl })}
                className="w-3.5 h-3.5 text-blue-600 focus:ring-blue-500 accent-blue-600 cursor-pointer"
              />
              <span className="font-geometric-mono text-[11px]">{lvl === 'Fresher' ? 'Fresher (0 Years)' : lvl}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Employment Type */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-geometric-mono">Employment Type</label>
        <div className="space-y-1.5">
          {employmentTypes.map((type) => (
            <label key={type} className="flex items-center space-x-2.5 cursor-pointer text-xs font-medium text-slate-700 select-none hover:text-blue-600 transition-colors">
              <input
                type="radio"
                name="employmentType"
                checked={filters.employmentType === type}
                onChange={() => onFilterChange({ ...filters, employmentType: type })}
                className="w-3.5 h-3.5 text-blue-600 focus:ring-blue-500 accent-blue-600 cursor-pointer"
              />
              <span className="font-geometric-mono text-[11px]">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Job Category */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-geometric-mono">Category</label>
        <select
          value={filters.category}
          onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
          className="w-full text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200/90 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Salary Range */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-geometric-mono">Min CTC (LPA)</label>
          <span className="text-xs font-extrabold font-geometric-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
            ₹{filters.salaryMin} LPA+
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={30}
          step={2}
          value={filters.salaryMin}
          onChange={(e) => onFilterChange({ ...filters, salaryMin: Number(e.target.value) })}
          className="w-full accent-blue-600 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] font-geometric-mono text-slate-400">
          <span>₹0</span>
          <span>₹15 LPA</span>
          <span>₹30+ LPA</span>
        </div>
      </div>
    </div>
  );
};
