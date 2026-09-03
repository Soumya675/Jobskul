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
    'Full Stack',
    'Software & Tech',
    'AI & Data Science',
    'SAP & ERP',
    'Cloud & DevOps',
    'Product & Design',
    'FinTech & Banking'
  ];

  const workModes = ['All', 'Remote', 'Hybrid', 'Work from office'];

  const employmentTypes = ['All', 'Full-time', 'Internship', 'Contract', 'Part-time'];

  const experienceLevels = ['All', 'Fresher', '1-3 Years', '3-5 Years', '5-8 Years'];

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs sticky top-24 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-[#2563EB]" />
          <h3 className="text-sm font-bold text-[#0F172A]">Filters</h3>
          <span className="text-[11px] font-geometric-mono font-semibold text-[#64748B] bg-slate-100 px-2 py-0.5 rounded-md border border-[#E2E8F0]">
            {totalResultsCount}
          </span>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center space-x-1"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Verified Companies Only */}
      <div className="p-3 bg-[#EFF6FF] rounded-lg border border-blue-100/90">
        <label className="flex items-center space-x-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={filters.verifiedOnly}
            onChange={(e) => onFilterChange({ ...filters, verifiedOnly: e.target.checked })}
            className="w-4 h-4 text-[#2563EB] rounded border-slate-300 focus:ring-[#2563EB] accent-[#2563EB]"
          />
          <div className="flex items-center space-x-1 text-xs font-bold text-blue-900">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Verified Companies Only</span>
          </div>
        </label>
      </div>

      {/* Work Mode */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-[#64748B] font-geometric-mono">Work Mode</label>
        <div className="space-y-1.5">
          {workModes.map((mode) => (
            <label key={mode} className="flex items-center space-x-2 cursor-pointer text-xs text-[#0F172A] select-none hover:text-[#2563EB]">
              <input
                type="radio"
                name="workMode"
                checked={filters.workMode === mode}
                onChange={() => onFilterChange({ ...filters, workMode: mode })}
                className="w-3.5 h-3.5 text-[#2563EB] focus:ring-[#2563EB] accent-[#2563EB]"
              />
              <span>{mode}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Experience Level */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-[#64748B] font-geometric-mono">Experience</label>
        <div className="space-y-1.5">
          {experienceLevels.map((lvl) => (
            <label key={lvl} className="flex items-center space-x-2 cursor-pointer text-xs text-[#0F172A] select-none hover:text-[#2563EB]">
              <input
                type="radio"
                name="experienceLevel"
                checked={filters.experienceLevel === lvl}
                onChange={() => onFilterChange({ ...filters, experienceLevel: lvl })}
                className="w-3.5 h-3.5 text-[#2563EB] focus:ring-[#2563EB] accent-[#2563EB]"
              />
              <span className="font-geometric-mono text-[11px]">{lvl === 'Fresher' ? 'Fresher (0 Years)' : lvl}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Employment Type */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-[#64748B] font-geometric-mono">Employment Type</label>
        <div className="space-y-1.5">
          {employmentTypes.map((type) => (
            <label key={type} className="flex items-center space-x-2 cursor-pointer text-xs text-[#0F172A] select-none hover:text-[#2563EB]">
              <input
                type="radio"
                name="employmentType"
                checked={filters.employmentType === type}
                onChange={() => onFilterChange({ ...filters, employmentType: type })}
                className="w-3.5 h-3.5 text-[#2563EB] focus:ring-[#2563EB] accent-[#2563EB]"
              />
              <span className="font-geometric-mono text-[11px]">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Job Category */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-[#64748B] font-geometric-mono">Category</label>
        <select
          value={filters.category}
          onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
          className="w-full text-xs font-medium text-[#0F172A] bg-slate-50 border border-[#E2E8F0] rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Salary Range */}
      <div className="space-y-2 pt-2 border-t border-[#E2E8F0]">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-[#64748B] font-geometric-mono">Min Salary (LPA)</label>
          <span className="text-xs font-bold font-geometric-mono text-[#2563EB]">₹{filters.salaryMin} LPA+</span>
        </div>
        <input
          type="range"
          min={0}
          max={30}
          step={2}
          value={filters.salaryMin}
          onChange={(e) => onFilterChange({ ...filters, salaryMin: Number(e.target.value) })}
          className="w-full accent-[#2563EB] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] font-geometric-mono text-[#64748B]">
          <span>₹0</span>
          <span>₹15 LPA</span>
          <span>₹30+ LPA</span>
        </div>
      </div>
    </div>
  );
};
