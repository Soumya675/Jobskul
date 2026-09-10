import React, { useState, useMemo } from 'react';
import { User } from '../types';
import {
  Users,
  Search,
  MapPin,
  Briefcase,
  GraduationCap,
  Sparkles,
  ExternalLink,
  Github,
  Linkedin,
  Filter,
  CheckCircle2,
  Mail,
  Phone
} from 'lucide-react';

interface CandidatesDirectoryProps {
  candidates: User[];
  onContactCandidate?: (candidate: User) => void;
}

export const CandidatesDirectory: React.FC<CandidatesDirectoryProps> = ({
  candidates,
  onContactCandidate
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedSkill, setSelectedSkill] = useState('All');

  // Filter only candidates
  const allCandidates = useMemo(() => {
    return candidates.filter(u => u.role === 'candidate');
  }, [candidates]);

  // Extract skills
  const availableSkills = useMemo(() => {
    const set = new Set<string>();
    allCandidates.forEach(c => {
      c.skills?.forEach(s => set.add(s));
    });
    return Array.from(set).slice(0, 8);
  }, [allCandidates]);

  const filteredCandidates = useMemo(() => {
    return allCandidates.filter(cand => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = cand.name.toLowerCase().includes(q);
        const matchesSkills = cand.skills?.some(s => s.toLowerCase().includes(q));
        const matchesHeadline = cand.headline?.toLowerCase().includes(q);
        const matchesLocation = cand.location?.toLowerCase().includes(q);
        if (!matchesName && !matchesSkills && !matchesHeadline && !matchesLocation) {
          return false;
        }
      }

      if (selectedSkill !== 'All') {
        if (!cand.skills?.includes(selectedSkill)) return false;
      }

      return true;
    });
  }, [allCandidates, searchQuery, selectedSkill]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-[#0F172A] rounded-2xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <span className="px-3 py-1 rounded-md bg-blue-500/20 text-blue-300 text-xs font-geometric-mono font-bold uppercase tracking-wider border border-blue-400/30">
            Verified Talent Pool
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Explore Verified Jobskül Candidates
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Discover pre-screened talent across software, HR, finance, marketing, and management with verified capstone projects and ATS-ready profiles.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by candidate name, skill (Python, React, MySQL), or location..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-[#CBD5E1] focus:outline-none focus:border-[#2563EB]"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="py-2 px-3 text-xs rounded-lg border border-[#CBD5E1] focus:outline-none focus:border-[#2563EB] bg-white font-medium"
            >
              <option value="All">All Skills</option>
              {availableSkills.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Candidate Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCandidates.map((candidate) => (
          <div
            key={candidate.id}
            className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs hover:border-[#2563EB]/60 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-base flex items-center justify-center shadow-xs">
                    {candidate.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#0F172A] flex items-center space-x-1.5">
                      <span>{candidate.name}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </h3>
                    <p className="text-[11px] text-[#64748B] flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{candidate.location || 'India'}</span>
                    </p>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-geometric-mono font-bold">
                  {candidate.experienceYears ? `${candidate.experienceYears} Yrs Exp` : 'Fresher'}
                </span>
              </div>

              <p className="text-xs text-[#334155] font-medium leading-snug line-clamp-2">
                {candidate.headline || 'Software Engineer & Project Graduate'}
              </p>

              {candidate.about && (
                <p className="text-[11px] text-[#64748B] line-clamp-2">
                  {candidate.about}
                </p>
              )}

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {candidate.skills?.slice(0, 5).map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2 py-0.5 rounded-md bg-slate-100 text-[#0F172A] text-[10px] font-geometric-mono font-medium"
                  >
                    {skill}
                  </span>
                ))}
                {(candidate.skills?.length || 0) > 5 && (
                  <span className="px-1.5 py-0.5 text-[10px] text-slate-400 font-geometric-mono">
                    +{(candidate.skills?.length || 0) - 5}
                  </span>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2 text-slate-500">
                {candidate.githubUrl && (
                  <a href={candidate.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-black">
                    <Github className="w-3.5 h-3.5" />
                  </a>
                )}
                {candidate.linkedinUrl && (
                  <a href={candidate.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#2563EB]">
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <a
                  href={`mailto:${candidate.email}`}
                  className="px-3 py-1.5 bg-[#EFF6FF] hover:bg-[#2563EB] text-[#2563EB] hover:text-white rounded-lg text-xs font-bold transition-colors flex items-center space-x-1"
                >
                  <Mail className="w-3 h-3" />
                  <span>Contact</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
