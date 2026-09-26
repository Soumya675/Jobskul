import React, { useState } from 'react';
import { User, PlacementDrive } from '../types';
import {
  GraduationCap,
  Building2,
  Users,
  Award,
  Calendar,
  Download,
  Plus,
  CheckCircle2,
  TrendingUp,
  FileSpreadsheet,
  Search,
  Sparkles
} from 'lucide-react';

interface CollegePortalProps {
  currentUser: User | null;
  drives: PlacementDrive[];
  onAddDrive?: (drive: PlacementDrive) => void;
}

export const CollegePortal: React.FC<CollegePortalProps> = ({
  currentUser,
  drives,
  onAddDrive
}) => {
  const [selectedBatch, setSelectedBatch] = useState('2026 Batch');
  const [showDriveModal, setShowDriveModal] = useState(false);
  const [driveCompany, setDriveCompany] = useState('');
  const [driveRole, setDriveRole] = useState('');
  const [driveCTC, setDriveCTC] = useState('8.5 - 12.0 LPA');
  const [driveCGPA, setDriveCGPA] = useState(7.0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCreateDrive = (e: React.FormEvent) => {
    e.preventDefault();
    if (!driveCompany || !driveRole) return;

    const newDrive: PlacementDrive = {
      id: `drive-${Date.now()}`,
      companyName: driveCompany,
      role: driveRole,
      driveType: 'Campus Drive',
      packageLPA: driveCTC,
      location: 'Campus Auditorium / Online',
      minCGPA: driveCGPA,
      eligibleBatches: [selectedBatch.replace(' Batch', '')],
      deadline: 'Oct 15, 2026',
      driveDate: 'Oct 22, 2026',
      openings: 20,
      registeredCount: 0,
      hiringProcess: ['Online Aptitude Test', 'Technical Round 1', 'HR Round'],
      skillsRequired: ['Python', 'SQL', 'React'],
      status: 'Registration Open'
    };

    if (onAddDrive) onAddDrive(newDrive);
    showToast(`Campus Placement Drive for ${driveCompany} created!`);
    setShowDriveModal(false);
    setDriveCompany('');
    setDriveRole('');
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
      <div className="bg-linear-to-r from-indigo-900 via-slate-900 to-blue-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-geometric-mono font-bold tracking-wider">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-300" />
            <span>COLLEGE & INSTITUTIONAL PLACEMENT SUITE</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Institutional Placement Office (TPO) Portal
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Manage your student cohort, invite corporate employers for on-campus & pool recruitment, monitor verification benchmarks, and export NAAC/NIRF accreditation placement analytics.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <button
            onClick={() => setShowDriveModal(true)}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Campus Drive</span>
          </button>
          <button
            onClick={() => showToast('Exporting NIRF / NAAC Placement Master Excel...')}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Export Reports</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-1">
          <p className="text-xs text-slate-500 font-medium">Eligible Batch Strength</p>
          <p className="text-3xl font-black text-slate-900 font-geometric-mono">840</p>
          <span className="text-[10px] text-blue-600 font-bold">{selectedBatch} (B.Tech & MCA)</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-1">
          <p className="text-xs text-slate-500 font-medium">Placed Students</p>
          <p className="text-3xl font-black text-emerald-600 font-geometric-mono">682</p>
          <span className="text-[10px] text-emerald-700 font-bold">81.2% Overall Placement</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-1">
          <p className="text-xs text-slate-500 font-medium">Average Package CTC</p>
          <p className="text-3xl font-black text-slate-900 font-geometric-mono">₹7.8 LPA</p>
          <span className="text-[10px] text-purple-600 font-bold">Highest CTC: ₹28.5 LPA</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-1">
          <p className="text-xs text-slate-500 font-medium">Recruiting Partners</p>
          <p className="text-3xl font-black text-slate-900 font-geometric-mono">48+</p>
          <span className="text-[10px] text-amber-600 font-bold">CloudSphere, TCS, Wipro, etc.</span>
        </div>
      </div>

      {/* Placement Drives Schedule */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-black text-slate-900">Campus Drives Timeline & Status</h3>
            <p className="text-xs text-slate-500">Scheduled campus visits, online screening windows, and shortlists.</p>
          </div>
          <span className="text-xs font-bold text-blue-600">Active Academic Year 2026-27</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-geometric-mono border-b border-slate-200">
              <tr>
                <th className="p-3">Company & Role</th>
                <th className="p-3">Drive Type</th>
                <th className="p-3">Package CTC</th>
                <th className="p-3">Min CGPA</th>
                <th className="p-3">Drive Date</th>
                <th className="p-3">Registered</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {drives.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50">
                  <td className="p-3">
                    <p className="font-bold text-slate-900">{d.companyName}</p>
                    <p className="text-[11px] text-slate-500">{d.role}</p>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-bold">
                      {d.driveType}
                    </span>
                  </td>
                  <td className="p-3 font-geometric-mono font-bold text-slate-900">{d.packageLPA}</td>
                  <td className="p-3 font-geometric-mono">{d.minCGPA}</td>
                  <td className="p-3 font-geometric-mono">{d.driveDate}</td>
                  <td className="p-3 font-geometric-mono text-emerald-700 font-bold">{d.registeredCount}</td>
                  <td className="p-3">
                    <button
                      onClick={() => showToast(`Exported candidate shortlist for ${d.companyName}`)}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800"
                    >
                      Export Roster
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SCHEDULE DRIVE MODAL */}
      {showDriveModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleCreateDrive} className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Schedule Campus Placement Drive</h3>
              <button type="button" onClick={() => setShowDriveModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">Company Name *</label>
              <input
                type="text"
                value={driveCompany}
                onChange={(e) => setDriveCompany(e.target.value)}
                placeholder="e.g. Cognizant Enterprise"
                className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">Role Designation *</label>
              <input
                type="text"
                value={driveRole}
                onChange={(e) => setDriveRole(e.target.value)}
                placeholder="e.g. Graduate Software Trainee"
                className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700">Package CTC</label>
                <input
                  type="text"
                  value={driveCTC}
                  onChange={(e) => setDriveCTC(e.target.value)}
                  className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-geometric-mono"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700">Min CGPA Cutoff</label>
                <input
                  type="number"
                  step="0.1"
                  value={driveCGPA}
                  onChange={(e) => setDriveCGPA(Number(e.target.value))}
                  className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-geometric-mono"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end space-x-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowDriveModal(false)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700"
              >
                Publish Drive to Students
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
