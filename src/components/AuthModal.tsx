import React, { useState } from 'react';
import { Logo } from './Logo';
import { User, UserRole } from '../types';
import { X, Lock, Mail, User as UserIcon, Building2, CheckCircle2, Shield } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  initialRole?: UserRole;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialRole = 'candidate',
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<UserRole>(initialRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('jobskul123');
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleDemoLogin = (demoRole: UserRole) => {
    let demoUser: any;
    if (demoRole === 'candidate') {
      demoUser = {
        id: 'user-cand-1',
        name: 'Priya Sharma',
        email: 'priya.sharma@example.com',
        role: 'candidate',
        phone: '+91 98765 43210',
        location: 'Bengaluru, India',
        qualification: 'B.Tech in Computer Science',
        experienceYears: 2,
        headline: 'Full Stack Developer | Python • React • MySQL',
        about: 'Passionate software engineer experienced in building scalable web applications, RESTful APIs, and relational databases. Completed multiple Jobskül hands-on capstones.',
        skills: ['Python', 'Django', 'React', 'MySQL', 'JavaScript', 'Tailwind CSS'],
        profileCompletion: 85
      };
    } else if (demoRole === 'recruiter') {
      demoUser = {
        id: 'user-rec-1',
        name: 'Arun Mehta',
        email: 'arun.mehta@cloudsphere.com',
        role: 'recruiter',
        companyName: 'CloudSphere Technologies',
        headline: 'Lead Talent Acquisition Partner',
        phone: '+91 98111 22334',
        location: 'Bengaluru, India',
        profileCompletion: 100
      };
    } else {
      demoUser = {
        id: 'user-admin-1',
        name: 'Platform Admin',
        email: 'admin@jobskul.com',
        role: 'admin',
        headline: 'Super Administrator & Moderator',
        profileCompletion: 100
      };
    }
    onLoginSuccess(demoUser);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, role })
        });
        const data = await res.json();
        if (data.success && data.user) {
          onLoginSuccess(data.user);
          onClose();
        } else {
          setErrorMsg(data.error || 'Invalid credentials.');
        }
      } else {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            password,
            role,
            companyName: role === 'recruiter' ? companyName : undefined,
            phone
          })
        });
        const data = await res.json();
        if (data.success && data.user) {
          onLoginSuccess(data.user);
          onClose();
        } else {
          setErrorMsg(data.error || 'Registration failed.');
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-6 sm:p-8 shadow-2xl relative animate-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 mb-6">
          <div className="flex justify-center">
            <Logo size="md" />
          </div>
          <h3 className="text-lg font-black text-slate-900 mt-2">
            {mode === 'login' ? 'Sign in to Jobskül' : 'Create your Jobskül Account'}
          </h3>
          <p className="text-xs text-slate-500">
            {mode === 'login'
              ? 'Access real-time job applications and recruitment pipelines.'
              : 'Join thousands of developers and recruiters.'}
          </p>
        </div>

        {/* Role Toggle */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl mb-5 text-xs font-bold">
          <button
            type="button"
            onClick={() => setRole('candidate')}
            className={`py-2 rounded-lg transition-colors ${
              role === 'candidate' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Job Seeker / Student
          </button>
          <button
            type="button"
            onClick={() => setRole('recruiter')}
            className={`py-2 rounded-lg transition-colors ${
              role === 'recruiter' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Employer / Recruiter
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-xs font-semibold border border-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          {mode === 'register' && (
            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Priya Sharma"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {mode === 'register' && role === 'recruiter' && (
            <div>
              <label className="block font-bold text-slate-700 mb-1">Company / Organization</label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. CloudSphere Technologies"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div>
            <label className="block font-bold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs transition-colors disabled:opacity-50 mt-2"
          >
            {loading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="flex items-center justify-between text-xs text-slate-500 mt-4 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="font-bold text-blue-600 hover:text-blue-800"
          >
            {mode === 'login' ? "Don't have an account? Sign up free" : 'Already have an account? Sign in'}
          </button>
        </div>

        {/* 1-Click Persona Demo Logins */}
        <div className="mt-5 pt-4 border-t border-slate-100 space-y-2 text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Instant 1-Click Demo Login
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleDemoLogin('candidate')}
              className="p-2 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded-lg border border-slate-200 text-[11px] font-bold"
            >
              Candidate
            </button>
            <button
              onClick={() => handleDemoLogin('recruiter')}
              className="p-2 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded-lg border border-slate-200 text-[11px] font-bold"
            >
              Recruiter
            </button>
            <button
              onClick={() => handleDemoLogin('admin')}
              className="p-2 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded-lg border border-slate-200 text-[11px] font-bold"
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
