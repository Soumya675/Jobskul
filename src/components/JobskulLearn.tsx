import React, { useState } from 'react';
import { ProjectTrack, User } from '../types';
import {
  BookOpen,
  Code,
  Database,
  CheckCircle2,
  Award,
  Clock,
  Layers,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Download,
  Share2,
  Terminal,
  Check,
  Search,
  X
} from 'lucide-react';

interface JobskulLearnProps {
  projects: ProjectTrack[];
  currentUser: User | null;
  onNavigateToJobs: () => void;
}

export const JobskulLearn: React.FC<JobskulLearnProps> = ({
  projects,
  currentUser,
  onNavigateToJobs,
}) => {
  const [selectedProject, setSelectedProject] = useState<ProjectTrack>(projects[0]);
  const [activeTab, setActiveTab] = useState<'overview' | 'database' | 'tasks'>('overview');
  const [completedTaskIndices, setCompletedTaskIndices] = useState<number[]>([0, 1, 2]);
  const [showCertModal, setShowCertModal] = useState(false);
  const [certificateData, setCertificateData] = useState<any>(null);
  const [trackSearch, setTrackSearch] = useState('');

  const filteredProjects = projects.filter(p => {
    if (trackSearch.trim()) {
      const q = trackSearch.trim().toLowerCase();
      const matches =
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.skillsAcquired.some(s => s.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q);
      if (!matches) return false;
    }
    return true;
  });

  const toggleTask = (index: number) => {
    if (completedTaskIndices.includes(index)) {
      setCompletedTaskIndices(completedTaskIndices.filter(i => i !== index));
    } else {
      setCompletedTaskIndices([...completedTaskIndices, index]);
    }
  };

  const currentPercentage = Math.round(
    (completedTaskIndices.length / Math.max(selectedProject.tasksCount, 4)) * 100
  );

  const handleClaimCertificate = async () => {
    try {
      const res = await fetch(`/api/projects/${selectedProject.id}/certificate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser?.id || 'user-cand-1',
          candidateName: currentUser?.name || 'Priya Sharma'
        })
      });
      const data = await res.json();
      if (data.certificate) {
        setCertificateData(data.certificate);
        setShowCertModal(true);
      }
    } catch (e) {
      console.error(e);
      setCertificateData({
        id: `JOBSKUL-CERT-${Date.now().toString().slice(-8).toUpperCase()}`,
        candidateName: currentUser?.name || 'Priya Sharma',
        projectTitle: selectedProject.title,
        category: selectedProject.category,
        issueDate: 'Sep 2, 2026',
        verificationUrl: `https://jobskul.com/verify/JOBSKUL-CERT-PY892401`,
        grade: "Exemplary (95%)",
        issuer: "Jobskül Talent & Certification Board"
      });
      setShowCertModal(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner */}
      <div className="bg-linear-to-r from-blue-700 via-indigo-800 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-md">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <span className="px-2.5 py-1 rounded-full bg-blue-500/30 text-blue-200 text-xs font-semibold uppercase tracking-wider">
              Project-Based Talent Enablement
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Learn. Build. Showcase. Get Hired.
            </h1>
            <p className="text-blue-200 text-xs sm:text-sm max-w-xl">
              Employers hire proof of skill, not just resumes. Build real production microservices, design relational MySQL databases, and earn verified Jobskül credentials.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center min-w-[220px]">
            <p className="text-xs font-semibold text-blue-200">Track Progress</p>
            <p className="text-2xl font-black text-amber-300 mt-0.5">{currentPercentage}% Done</p>
            <p className="text-[11px] text-blue-200 mt-1">{completedTaskIndices.length} of {selectedProject.tasksCount} Tasks Finished</p>
          </div>
        </div>
      </div>

      {/* Project Selector & Search */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">Select Learning & Project Track ({filteredProjects.length} Available)</p>
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={trackSearch}
              onChange={(e) => setTrackSearch(e.target.value)}
              placeholder="Search tracks (e.g. Python, Docker)..."
              className="w-full pl-8 pr-7 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {trackSearch && (
              <button
                onClick={() => setTrackSearch('')}
                className="absolute right-2 top-2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {filteredProjects.map((proj) => {
            const isSelected = selectedProject.id === proj.id;
            return (
              <button
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {proj.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Workbench Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: Project Details & Workspace (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-bold uppercase">
                    {selectedProject.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">• {selectedProject.difficulty}</span>
                </div>
                <h2 className="text-xl font-black text-slate-900 mt-1">{selectedProject.title}</h2>
              </div>

              <div className="flex items-center space-x-2 text-xs text-slate-500">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{selectedProject.duration}</span>
              </div>
            </div>

            {/* Sub-nav */}
            <div className="flex space-x-2 border-b border-slate-100 pb-2 text-xs font-bold">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-1.5 rounded-lg ${
                  activeTab === 'overview' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                Overview & Architecture
              </button>
              <button
                onClick={() => setActiveTab('database')}
                className={`px-3 py-1.5 rounded-lg ${
                  activeTab === 'database' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                MySQL Schema Design
              </button>
              <button
                onClick={() => setActiveTab('tasks')}
                className={`px-3 py-1.5 rounded-lg ${
                  activeTab === 'tasks' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                Interactive Tasks ({completedTaskIndices.length}/{selectedProject.tasksCount})
              </button>
            </div>

            {/* Tab: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
                <div>
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-1">Project Description</h4>
                  <p>{selectedProject.description}</p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-2">Technologies Utilized</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.technology.map((t, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded-md font-semibold text-xs">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-2">Learning Objectives</h4>
                  <ul className="space-y-1.5 list-disc list-inside text-slate-600">
                    {selectedProject.learningObjectives.map((obj, idx) => (
                      <li key={idx} className="pl-1">{obj}</li>
                    ))}
                  </ul>
                </div>

                {selectedProject.architecture && (
                  <div className="p-4 bg-slate-900 text-slate-200 rounded-xl font-mono text-[11px] leading-relaxed space-y-2">
                    <div className="flex items-center space-x-2 text-blue-400 font-bold border-b border-slate-800 pb-1">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>System Architecture Blueprint</span>
                    </div>
                    <pre className="whitespace-pre-wrap">{selectedProject.architecture}</pre>
                  </div>
                )}
              </div>
            )}

            {/* Tab: Database */}
            {activeTab === 'database' && (
              <div className="space-y-4 text-xs">
                <p className="text-slate-600">
                  This capstone project implements standard third-normal-form (3NF) relational database design on MySQL 8.0+.
                </p>
                <div className="p-4 bg-slate-900 text-emerald-400 rounded-xl font-mono text-[11px] leading-relaxed overflow-x-auto">
                  <div className="flex items-center space-x-2 text-slate-400 border-b border-slate-800 pb-2 mb-2">
                    <Database className="w-4 h-4 text-emerald-400" />
                    <span>schema.sql (MySQL Table Definitions)</span>
                  </div>
                  <pre className="whitespace-pre">{selectedProject.databaseDesign || `-- Table definitions
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(191) UNIQUE NOT NULL,
  role ENUM('candidate', 'recruiter')
);`}</pre>
                </div>
              </div>
            )}

            {/* Tab: Tasks */}
            {activeTab === 'tasks' && (
              <div className="space-y-3 text-xs">
                <p className="text-slate-600 mb-2">
                  Complete each development checkpoint to verify your code implementation:
                </p>

                {[
                  '1. Configure Python virtual environment and install Django REST framework dependencies',
                  '2. Connect Django backend to local or cloud MySQL instance via PyMySQL/mysqlclient',
                  '3. Implement AbstractUser authentication model with JWT token rotation',
                  '4. Build Job search API endpoint with multi-criteria filtering (location, salary, skills)',
                  '5. Build Application pipeline model supporting (applied ➔ interview ➔ selected) statuses',
                  '6. Implement Google Gemini HireAI resume analyzer endpoint'
                ].map((taskText, idx) => {
                  const isChecked = completedTaskIndices.includes(idx);
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleTask(idx)}
                      className={`p-3 rounded-lg border flex items-center space-x-3 cursor-pointer select-none transition-colors ${
                        isChecked ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border ${
                        isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <span className={isChecked ? 'line-through text-slate-500 font-medium' : 'font-semibold'}>
                        {taskText}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Certification & Employer Proof (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-slate-900 text-sm">Verified Credentials</h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Completing this capstone grants an official Jobskül Verified Certificate with an immutable ID and employer verification link.
            </p>

            <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-950 space-y-2">
              <p className="font-bold">Credential Details:</p>
              <p>• Candidate: {currentUser?.name || 'Priya Sharma'}</p>
              <p>• Track: {selectedProject.title}</p>
              <p>• Assessment: Code Review & MySQL schema validation</p>
            </div>

            <button
              onClick={handleClaimCertificate}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-xs shadow-xs flex items-center justify-center space-x-2 transition-colors"
            >
              <Award className="w-4 h-4" />
              <span>Claim / View Certificate</span>
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Hiring Partners Looking for this Track</h4>
            <div className="space-y-2 text-xs text-slate-600">
              <p className="font-semibold text-blue-700">• CloudSphere Technologies (12 Openings)</p>
              <p className="font-semibold text-blue-700">• NexGen AI Labs (8 Openings)</p>
              <p className="font-semibold text-blue-700">• FinEdge Solutions (15 Openings)</p>
            </div>
            <button
              onClick={onNavigateToJobs}
              className="mt-2 text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1"
            >
              <span>View Matching Jobs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertModal && certificateData && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border-4 border-amber-400 p-8 max-w-2xl w-full shadow-2xl text-center space-y-6 animate-in zoom-in-95">
            <div className="flex justify-between items-start">
              <div className="text-left">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">
                  Official Verification Document
                </span>
                <h3 className="text-xl font-black text-slate-900">Certificate of Completion</h3>
              </div>
              <button
                onClick={() => setShowCertModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="py-6 border-y border-amber-200 space-y-3 bg-amber-50/40 rounded-xl p-4">
              <p className="text-xs uppercase tracking-widest text-slate-500">This certifies that</p>
              <h2 className="text-2xl font-black text-blue-900 font-serif">{certificateData.candidateName}</h2>
              <p className="text-xs text-slate-600">
                has successfully architected and completed the production capstone:
              </p>
              <p className="text-base font-bold text-slate-900">{certificateData.projectTitle}</p>
              <p className="text-xs font-semibold text-emerald-700">Evaluation Grade: {certificateData.grade}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3 pt-2">
              <div className="text-left">
                <p>Certificate ID: <strong className="font-mono text-slate-700">{certificateData.id}</strong></p>
                <p>Issued on: {certificateData.issueDate}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-800">Jobskül Certification Board</p>
                <p className="text-[10px] text-blue-600">{certificateData.verificationUrl}</p>
              </div>
            </div>

            <div className="flex justify-center space-x-3 pt-4">
              <button
                onClick={() => window.print()}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download / Print Credential</span>
              </button>
              <button
                onClick={() => setShowCertModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
