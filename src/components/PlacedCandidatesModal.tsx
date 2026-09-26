import React, { useState, useMemo } from 'react';
import { PlacedCandidate, User } from '../types';
import {
  Trophy,
  X,
  Search,
  Building2,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  PlusCircle,
  ExternalLink,
  Award,
  Filter,
  Briefcase
} from 'lucide-react';

interface PlacedCandidatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidates: PlacedCandidate[];
  currentUser: User | null;
  onOpenAdminPanel?: () => void;
}

export const PlacedCandidatesModal: React.FC<PlacedCandidatesModalProps> = ({
  isOpen,
  onClose,
  candidates,
  currentUser,
  onOpenAdminPanel
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollege, setSelectedCollege] = useState('All');

  // Unique colleges for filtering
  const colleges = useMemo(() => {
    const set = new Set<string>();
    candidates.forEach(c => {
      if (c.college) set.add(c.college);
    });
    return Array.from(set);
  }, [candidates]);

  // Filtered list
  const filteredCandidates = useMemo(() => {
    return candidates.filter(c => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          c.name.toLowerCase().includes(q) ||
          c.company.toLowerCase().includes(q) ||
          c.role.toLowerCase().includes(q) ||
          c.college.toLowerCase().includes(q) ||
          c.skills.some(s => s.toLowerCase().includes(q));
        if (!matches) return false;
      }
      if (selectedCollege !== 'All' && c.college !== selectedCollege) {
        return false;
      }
      return true;
    });
  }, [candidates, searchQuery, selectedCollege]);

  if (!isOpen) return null;

  return (
    <div
      id="placed-candidates-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="placed-candidates-modal-card"
        className="relative bg-white rounded-3xl shadow-2xl border border-slate-200/90 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-6 sm:p-8 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="max-w-3xl space-y-2">
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold font-geometric-mono uppercase tracking-wider">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>Jobskül Placement Hall of Fame</span>
              </span>
              <span className="text-xs text-slate-300">• Verified Tech Placements</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Real Candidates. Verified Offers. Real Impact.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Meet our successfully placed engineering, MCA, and management students hired across leading tech firms, product unicorns, and enterprise leaders.
            </p>
          </div>

          {/* Quick Admin Action */}
          {currentUser?.role === 'admin' && onOpenAdminPanel && (
            <div className="mt-4 pt-4 border-t border-slate-700/60 flex items-center justify-between">
              <span className="text-xs text-amber-300 font-semibold flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Admin Privileges Active</span>
              </span>
              <button
                onClick={() => {
                  onClose();
                  onOpenAdminPanel();
                }}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer transition-all"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Post Candidate Photo & Profile (Admin Suite)</span>
              </button>
            </div>
          )}
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 shrink-0 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student name, company (TCS, Infosys, Tech Mahindra), skill, or college..."
              className="w-full pl-9 pr-3.5 py-2 bg-white text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
            />
          </div>

          {colleges.length > 1 && (
            <div className="flex items-center space-x-2 w-full sm:w-auto shrink-0">
              <Filter className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={selectedCollege}
                onChange={(e) => setSelectedCollege(e.target.value)}
                className="w-full sm:w-auto py-2 px-3 bg-white text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 font-medium text-slate-700"
              >
                <option value="All">All Institutions & Colleges</option>
                {colleges.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Placed Candidates Grid */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Showing <strong>{filteredCandidates.length}</strong> placed candidate profiles</span>
            <span className="flex items-center space-x-1 text-emerald-600 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>All 100% Verified Placements</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCandidates.map((candidate) => {
              // Extract initials for clean monogram fallback (No AI placeholder faces)
              const initials = candidate.name
                .split(' ')
                .map(n => n[0])
                .slice(0, 2)
                .join('')
                .toUpperCase();

              return (
                <div
                  key={candidate.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md hover:border-blue-500/50 transition-all flex flex-col justify-between space-y-4 relative group"
                >
                  {/* Top: Avatar & Meta */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        {candidate.imageUrl ? (
                          <img
                            src={candidate.imageUrl}
                            alt={`${candidate.name} placed at ${candidate.company}`}
                            className="w-13 h-13 rounded-2xl object-cover ring-2 ring-blue-500/20 shadow-xs shrink-0"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-slate-900 text-white font-black text-base flex items-center justify-center shadow-xs shrink-0 tracking-wider">
                            {initials}
                          </div>
                        )}

                        <div>
                          <div className="flex items-center space-x-1.5">
                            <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{candidate.name}</h3>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" title="Verified Placement" />
                          </div>
                          <p className="text-xs font-bold text-blue-600 line-clamp-1 mt-0.5">
                            {candidate.company}
                          </p>
                          <p className="text-[11px] text-slate-500 line-clamp-1 font-medium">
                            {candidate.role}
                          </p>
                        </div>
                      </div>

                      <span className="px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-xs font-bold font-geometric-mono shrink-0 shadow-2xs">
                        {candidate.packageLPA}
                      </span>
                    </div>

                    {/* College & Batch Info */}
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-slate-600">
                      <div className="flex items-center space-x-1.5 text-[11px]">
                        <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="font-semibold line-clamp-1 text-slate-700">{candidate.college}</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-500">
                        <span>Batch: <strong className="text-slate-700">{candidate.batch}</strong></span>
                        <span>Placed: <strong className="text-slate-700">{candidate.placedDate}</strong></span>
                      </div>
                    </div>

                    {/* Testimonial / Story */}
                    {candidate.story && (
                      <p className="text-xs text-slate-600 italic bg-amber-50/50 p-2.5 rounded-xl border border-amber-100/80 leading-relaxed">
                        "{candidate.story}"
                      </p>
                    )}

                    {/* Skills pills */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {candidate.skills.slice(0, 4).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-geometric-mono font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                      {candidate.skills.length > 4 && (
                        <span className="px-1.5 py-0.5 text-[10px] text-slate-400 font-geometric-mono">
                          +{candidate.skills.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom Footer */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-medium">Jobskül Placement Partner</span>
                    <span className="text-blue-600 font-bold flex items-center space-x-1">
                      <span>Verified Hire</span>
                      <Award className="w-3 h-3 text-amber-500" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredCandidates.length === 0 && (
            <div className="text-center py-12 space-y-3">
              <Trophy className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-700">No placed candidates found</p>
              <p className="text-xs text-slate-500">Try adjusting your search query or college filter.</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-slate-500">
            Jobskül University Relations & Corporate Placement Division • India
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold cursor-pointer transition-colors"
          >
            Close Hall of Fame
          </button>
        </div>
      </div>
    </div>
  );
};
