import React, { useState } from 'react';
import { User } from '../types';
import {
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Globe,
  Github,
  Linkedin,
  Wrench,
  Save,
  CheckCircle2,
  Plus,
  Trash2,
  FileText
} from 'lucide-react';

interface CandidateProfileProps {
  user: User;
  onUpdateUser: (updatedData: Partial<User>) => void;
}

export const CandidateProfile: React.FC<CandidateProfileProps> = ({ user, onUpdateUser }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || '+91 98765 43210',
    location: user.location || 'Bengaluru, India',
    qualification: user.qualification || 'B.Tech in Computer Science',
    experienceYears: user.experienceYears || 2,
    headline: user.headline || 'Full Stack Developer | Python • React • MySQL',
    about: user.about || 'Passionate software engineer experienced in building scalable web applications, RESTful APIs, and relational databases. Completed multiple Jobskül hands-on capstones.',
    skills: user.skills || ['Python', 'Django', 'React', 'MySQL', 'JavaScript', 'Tailwind CSS'],
    githubUrl: user.githubUrl || 'https://github.com/priyasharma-dev',
    linkedinUrl: user.linkedinUrl || 'https://linkedin.com/in/priya-sharma-tech',
    portfolioUrl: user.portfolioUrl || 'https://priyasharma.dev',
    preferredRole: user.preferredRole || 'Full Stack Software Engineer',
    preferredLocation: user.preferredLocation || 'Bengaluru / Remote',
    expectedSalary: user.expectedSalary || '₹12,00,000 - ₹16,00,000 LPA',
    noticePeriod: user.noticePeriod || 'Immediate / 15 Days',
    workPreference: user.workPreference || 'Hybrid',
  });

  const [newSkill, setNewSkill] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s !== skillToRemove)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...formData,
      profileCompletion: 95
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Profile Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-5 text-center sm:text-left">
          <div className="w-20 h-20 rounded-2xl bg-blue-600 text-white font-extrabold text-3xl flex items-center justify-center shadow-md">
            {formData.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">{formData.name}</h1>
            <p className="text-sm font-semibold text-blue-600 mt-0.5">{formData.headline}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2 text-xs text-slate-500">
              <span className="flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{formData.location}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Briefcase className="w-3.5 h-3.5" />
                <span>{formData.experienceYears} Years Experience</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>{formData.qualification}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center w-full sm:w-auto sm:min-w-[140px]">
          <span className="text-[10px] font-bold text-blue-800 uppercase">Profile Strength</span>
          <p className="text-2xl font-black text-blue-700 mt-0.5">95%</p>
          <span className="text-[10px] font-semibold text-emerald-600 flex items-center justify-center space-x-1 mt-0.5">
            <CheckCircle2 className="w-3 h-3" />
            <span>ATS Verified</span>
          </span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal & Contact Information */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2 flex items-center space-x-2">
            <UserIcon className="w-4 h-4 text-blue-600" />
            <span>Personal & Contact Information</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Current Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Professional Headline</label>
              <input
                type="text"
                value={formData.headline}
                onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">About / Executive Summary</label>
              <textarea
                rows={3}
                value={formData.about}
                onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Skills Matrix */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2 flex items-center space-x-2">
            <Wrench className="w-4 h-4 text-blue-600" />
            <span>Key Skills & Technical Competencies</span>
          </h2>

          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-semibold flex items-center space-x-1.5"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <input
              type="text"
              placeholder="Add skill (e.g. Docker, TypeScript, FastAPI)..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex-1 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-4 py-2.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 flex items-center space-x-1 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>
        </div>

        {/* Career Preferences */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2 flex items-center space-x-2">
            <Briefcase className="w-4 h-4 text-blue-600" />
            <span>Job & Career Preferences</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Target Role</label>
              <input
                type="text"
                value={formData.preferredRole}
                onChange={(e) => setFormData({ ...formData, preferredRole: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Preferred Location</label>
              <input
                type="text"
                value={formData.preferredLocation}
                onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Expected Salary</label>
              <input
                type="text"
                value={formData.expectedSalary}
                onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Notice Period</label>
              <input
                type="text"
                value={formData.noticePeriod}
                onChange={(e) => setFormData({ ...formData, noticePeriod: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Work Preference</label>
              <div className="flex space-x-4 pt-1">
                {['Remote', 'Hybrid', 'Work from office'].map((mode) => (
                  <label key={mode} className="flex items-center space-x-2 cursor-pointer text-xs text-slate-700 font-medium">
                    <input
                      type="radio"
                      name="workPreference"
                      checked={formData.workPreference === mode}
                      onChange={() => setFormData({ ...formData, workPreference: mode as any })}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span>{mode}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* External Portfolios & Social Links */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2 flex items-center space-x-2">
            <Globe className="w-4 h-4 text-blue-600" />
            <span>Online Portfolios & Work Repositories</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center space-x-1">
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Profile</span>
              </label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center space-x-1">
                <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                <span>LinkedIn Profile</span>
              </label>
              <input
                type="url"
                value={formData.linkedinUrl}
                onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center space-x-1">
                <Globe className="w-3.5 h-3.5 text-emerald-600" />
                <span>Live Portfolio / Website</span>
              </label>
              <input
                type="url"
                value={formData.portfolioUrl}
                onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-between pt-2">
          {savedSuccess && (
            <div className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-lg flex items-center space-x-1.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Profile updated successfully in MySQL database!</span>
            </div>
          )}
          <div className="ml-auto">
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center space-x-2 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save & Update Profile</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
