import React, { useState } from 'react';
import { PlacementDrive, ApplicationTrackerItem, User } from '../types';
import {
  Briefcase,
  Building2,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  Award,
  ChevronRight,
  Filter,
  Search,
  Sparkles,
  ExternalLink,
  AlertTriangle,
  GraduationCap
} from 'lucide-react';

interface PlacementTrackerHubProps {
  drives: PlacementDrive[];
  applications: ApplicationTrackerItem[];
  currentUser: User | null;
  onNavigateToAssessment?: () => void;
  onNavigateToCourses?: () => void;
}

export const PlacementTrackerHub: React.FC<PlacementTrackerHubProps> = ({
  drives,
  applications,
  currentUser,
  onNavigateToAssessment,
  onNavigateToCourses
}) => {
  const [activeTab, setActiveTab] = useState<'all-drives' | 'my-applications' | 'matching-engine'>('all-drives');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [registeredDriveIds, setRegisteredDriveIds] = useState<string[]>(['drive-1']);
  const [activeDriveModal, setActiveDriveModal] = useState<PlacementDrive | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const driveTypes = ['All', 'Campus Drive', 'Off-Campus Drive', 'Pool Drive', 'Referral'];

  const filteredDrives = drives.filter((d) => {
    if (selectedType !== 'All' && d.driveType !== selectedType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        d.companyName.toLowerCase().includes(q) ||
        d.role.toLowerCase().includes(q) ||
        d.location.toLowerCase().includes(q) ||
        d.skillsRequired.some((s) => s.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  const handleRegisterDrive = (drive: PlacementDrive) => {
    const studentCGPA = currentUser?.cgpa || 8.4;
    if (studentCGPA < drive.minCGPA) {
      showToast(`Eligibility requirement: Minimum CGPA of ${drive.minCGPA} required (Current: ${studentCGPA}).`);
      return;
    }

    if (!registeredDriveIds.includes(drive.id)) {
      setRegisteredDriveIds([...registeredDriveIds, drive.id]);
      showToast(`Registered successfully for ${drive.companyName} ${drive.role} drive!`);
    } else {
      showToast(`You are already registered for this drive.`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Banner */}
      <div className="bg-linear-to-r from-emerald-900 via-teal-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-geometric-mono font-bold tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>CAMPUS TO CORPORATE PLACEMENT GATEWAY</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Placement Tracker & Verified Corporate Drives
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Monitor every stage of your campus recruitment journey in real time: Applied → Shortlisted → Online Test → Technical Interview → Offer Letter.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-center shrink-0">
          <div className="p-3 bg-white/10 rounded-2xl border border-white/20">
            <p className="text-2xl font-black text-white">4</p>
            <p className="text-[10px] text-emerald-200 uppercase font-geometric-mono">Active Drives</p>
          </div>
          <div className="p-3 bg-white/10 rounded-2xl border border-white/20">
            <p className="text-2xl font-black text-white">100%</p>
            <p className="text-[10px] text-emerald-200 uppercase font-geometric-mono">Verified CTC</p>
          </div>
        </div>
      </div>

      {/* Nav Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('all-drives')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'all-drives'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Placement & Hiring Drives ({filteredDrives.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('my-applications')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'my-applications'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>My Application Pipeline ({applications.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('matching-engine')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'matching-engine'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>AI Placement Matcher</span>
        </button>
      </div>

      {/* TAB 1: ALL DRIVES */}
      {activeTab === 'all-drives' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {driveTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedType === type
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search drives by role, skills..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Drives Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDrives.map((drive) => {
              const isRegistered = registeredDriveIds.includes(drive.id);
              return (
                <div
                  key={drive.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-geometric-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {drive.driveType}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">{drive.role}</h3>
                        <p className="text-xs font-semibold text-blue-600">{drive.companyName}</p>
                      </div>

                      <span className="px-3 py-1 rounded-xl bg-slate-100 text-slate-900 font-geometric-mono font-black text-xs">
                        {drive.packageLPA}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 pt-1">
                      <div className="flex items-center space-x-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{drive.location}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>Min CGPA: <strong>{drive.minCGPA}</strong></span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>Drive Date: <strong>{drive.driveDate}</strong></span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>Deadline: <strong>{drive.deadline}</strong></span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {drive.skillsRequired.map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-slate-700 text-[10px]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500">
                      {drive.registeredCount} Students Registered
                    </span>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setActiveDriveModal(drive)}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
                      >
                        Hiring Process
                      </button>
                      <button
                        onClick={() => handleRegisterDrive(drive)}
                        className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isRegistered
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold'
                            : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-2xs'
                        }`}
                      >
                        {isRegistered ? '✓ Registered' : 'Register for Drive'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: MY APPLICATION PIPELINE */}
      {activeTab === 'my-applications' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
            <h2 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3">
              Live Stage-by-Stage Application Funnel ({applications.length})
            </h2>

            <div className="space-y-6">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="p-6 rounded-2xl border border-slate-200/90 bg-slate-50/50 space-y-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-geometric-mono text-emerald-700 font-bold uppercase">
                        Active Placement Application
                      </span>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">{app.role}</h3>
                      <p className="text-xs text-blue-600 font-bold">{app.company} • Applied: {app.appliedDate}</p>
                    </div>
                    <div className="text-right">
                      <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-geometric-mono font-bold">
                        {app.packageLPA}
                      </span>
                    </div>
                  </div>

                  {/* Horizontal Stage Stepper */}
                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 pt-2">
                    {app.stages.map((st, i) => (
                      <div
                        key={i}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          st.completed
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                            : st.current
                            ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-500/20'
                            : 'bg-white border-slate-200 text-slate-400'
                        }`}
                      >
                        <div className="flex items-center justify-center mb-1">
                          {st.completed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : st.current ? (
                            <Clock className="w-4 h-4 text-white animate-pulse" />
                          ) : (
                            <span className="w-4 h-4 rounded-full border border-slate-300 text-[10px] flex items-center justify-center">
                              {i + 1}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] font-bold leading-tight">{st.stage}</p>
                        {st.date && <p className="text-[9px] opacity-80 mt-0.5">{st.date}</p>}
                        {st.score && <p className="text-[9px] font-geometric-mono font-bold mt-0.5">{st.score}</p>}
                      </div>
                    ))}
                  </div>

                  {/* Next Step Banner */}
                  {app.nextAction && (
                    <div className="p-3.5 bg-blue-50/80 rounded-xl border border-blue-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center space-x-2 text-blue-950">
                        <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                        <span><strong>Next Action:</strong> {app.nextAction}</span>
                      </div>
                      <span className="font-geometric-mono text-blue-700 font-bold text-[11px]">
                        Deadline: {app.actionDeadline}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AI PLACEMENT MATCHER */}
      {activeTab === 'matching-engine' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="border-b border-slate-100 pb-4">
            <span className="px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-geometric-mono font-bold uppercase">
              Automated Candidate Synergy
            </span>
            <h3 className="text-xl font-black text-slate-900 mt-1">Smart Placement Opportunity Matcher</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Calculates match affinity using candidate verified CGPA ({currentUser?.cgpa || 8.4}), skills ({currentUser?.skills?.join(', ') || 'Python, React, MySQL'}), and project completions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-bold">
                  96% High Fit
                </span>
                <span className="text-xs font-geometric-mono font-bold text-slate-900">₹8.5 - 12.0 LPA</span>
              </div>
              <h4 className="text-base font-bold text-slate-900">CloudSphere Technologies - Associate Cloud Software Engineer</h4>
              <p className="text-xs text-slate-600">
                Matches 4/4 primary requirements: Python, React, Relational Schema, and CGPA &ge; 7.0.
              </p>
              <button
                onClick={() => showToast('Fast-track application submitted to CloudSphere recruiting team!')}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold"
              >
                1-Click Apply with Jobskül Verified Profile
              </button>
            </div>

            <div className="p-5 rounded-2xl border border-blue-200 bg-blue-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-blue-100 text-blue-800 text-xs font-bold">
                  88% Strong Fit
                </span>
                <span className="text-xs font-geometric-mono font-bold text-slate-900">₹11.0 - 15.5 LPA</span>
              </div>
              <h4 className="text-base font-bold text-slate-900">FinVantage Global Bank - Fintech Backend Trainee</h4>
              <p className="text-xs text-slate-600">
                High concurrency and database indexing background matches candidate profile.
              </p>
              <button
                onClick={() => showToast('Fast-track application submitted to FinVantage bank team!')}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold"
              >
                1-Click Apply with Jobskül Verified Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HIRING PROCESS MODAL */}
      {activeDriveModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl animate-in fade-in">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-geometric-mono text-emerald-700 font-bold uppercase">
                  Drive Evaluation Pipeline
                </span>
                <h3 className="text-base font-bold text-slate-900">{activeDriveModal.companyName} - {activeDriveModal.role}</h3>
              </div>
              <button onClick={() => setActiveDriveModal(null)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Hiring Rounds & Evaluation:</h4>
              <div className="space-y-2">
                {activeDriveModal.hiringProcess.map((round, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-start space-x-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-slate-800">{round}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end space-x-3">
              <button
                onClick={() => setActiveDriveModal(null)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleRegisterDrive(activeDriveModal);
                  setActiveDriveModal(null);
                }}
                className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700"
              >
                Register for Drive
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
