import React, { useState } from 'react';
import { Logo } from './Logo';
import { User } from '../types';
import {
  Briefcase,
  BookOpen,
  Sparkles,
  FileText,
  Building2,
  Bell,
  User as UserIcon,
  ChevronDown,
  PlusCircle,
  LogOut,
  Shield,
  Menu,
  X,
  Compass
} from 'lucide-react';

interface HeaderProps {
  currentUser: User | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAuth: (role?: 'candidate' | 'recruiter' | 'admin') => void;
  onSwitchUser: (role: 'candidate' | 'recruiter' | 'admin') => void;
  onLogout: () => void;
  unreadNotificationsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  activeTab,
  setActiveTab,
  onOpenAuth,
  onSwitchUser,
  onLogout,
  unreadNotificationsCount = 2,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const navItems = [
    { id: 'jobs', label: 'Find Jobs', icon: Briefcase },
    { id: 'companies', label: 'Companies', icon: Building2 },
    { id: 'learn', label: 'Jobskül Learn', icon: BookOpen, badge: 'Projects' },
    { id: 'hireai', label: 'Jobskül HireAI', icon: Sparkles, badge: 'AI' },
    { id: 'resume', label: 'Resume Builder', icon: FileText, badge: 'Free' },
    { id: 'services', label: 'HR Services', icon: Compass },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <div onClick={() => setActiveTab('home')}>
              <Logo size="md" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-btn-${item.id}`}
                    onClick={() => setActiveTab(item.id)}
                    className={`relative flex items-center space-x-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                      isActive
                        ? 'text-[#2563EB] bg-[#EFF6FF] border border-blue-200/70 font-semibold shadow-2xs'
                        : 'text-[#0F172A] hover:text-[#2563EB] hover:bg-slate-50 border border-transparent'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#2563EB]' : 'text-[#64748B]'}`} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className={`ml-1 px-1.5 py-0.5 text-[10px] font-geometric-mono font-bold rounded-md ${
                        item.badge === 'AI' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-[#2563EB]'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Action & User Controls */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Quick Post Job for recruiters or CTA */}
            {currentUser?.role === 'recruiter' ? (
              <button
                id="header-post-job-btn"
                onClick={() => setActiveTab('recruiter-post')}
                className="flex items-center space-x-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-3.5 py-2 rounded-lg text-sm font-semibold shadow-xs transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post a Job</span>
              </button>
            ) : (
              <button
                id="header-employer-cta-btn"
                onClick={() => onSwitchUser('recruiter')}
                className="text-xs font-semibold text-[#2563EB] bg-[#EFF6FF] hover:bg-blue-100 border border-blue-200/80 px-3 py-1.5 rounded-lg transition-colors"
              >
                For Employers / Recruiters
              </button>
            )}

            {/* Notifications Dropdown */}
            {currentUser && (
              <div className="relative">
                <button
                  id="notifications-toggle-btn"
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative p-2 text-[#64748B] hover:text-[#2563EB] hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-[#E2E8F0]"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white" />
                  )}
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white border border-[#E2E8F0] rounded-xl shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Notifications</h4>
                      <span className="text-[11px] text-[#2563EB] font-semibold cursor-pointer">Mark all read</span>
                    </div>
                    <div className="space-y-2.5 mt-2">
                      <div className="p-2.5 bg-[#EFF6FF] rounded-lg border border-blue-100 text-xs text-slate-800">
                        <p className="font-semibold text-blue-900">Technical Interview Scheduled</p>
                        <p className="text-[#64748B] mt-0.5 font-geometric-mono text-[11px]">CloudSphere Technologies on Sep 5 at 03:30 PM IST</p>
                      </div>
                      <div className="p-2.5 bg-emerald-50/70 rounded-lg border border-emerald-100 text-xs text-slate-800">
                        <p className="font-semibold text-emerald-900">Application Shortlisted</p>
                        <p className="text-[#64748B] mt-0.5">NexGen AI Labs shortlisted your profile for Jr. Python Developer</p>
                      </div>
                      <div className="p-2.5 bg-slate-50 rounded-lg border border-[#E2E8F0] text-xs text-slate-700">
                        <p className="font-semibold text-[#0F172A]">Job Alert</p>
                        <p className="text-[#64748B] mt-0.5">3 new Full Stack jobs matching your Python & React preferences.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* User Profile / Role Selector */}
            {currentUser ? (
              <div className="relative">
                <button
                  id="user-profile-menu-btn"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 pr-3 rounded-lg border border-[#E2E8F0] bg-white hover:bg-slate-50 transition-colors shadow-2xs"
                >
                  <div className="w-8 h-8 rounded-md bg-[#2563EB] text-white font-bold flex items-center justify-center text-sm shadow-xs font-geometric-mono">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className="text-xs font-bold text-[#0F172A] leading-tight">{currentUser.name}</p>
                    <p className="text-[10px] uppercase font-geometric-mono font-semibold tracking-wider text-[#2563EB]">
                      {currentUser.role}
                    </p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-[#64748B]" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-[#E2E8F0] rounded-xl shadow-xl p-2 z-50">
                    <div className="px-3 py-2 border-b border-[#E2E8F0]">
                      <p className="text-xs font-semibold text-[#0F172A]">{currentUser.name}</p>
                      <p className="text-[11px] text-[#64748B] font-geometric-mono truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-geometric-mono font-bold rounded-md bg-blue-100 text-[#2563EB] uppercase">
                        Active: {currentUser.role}
                      </span>
                    </div>

                    <div className="py-1">
                      {currentUser.role === 'candidate' && (
                        <>
                          <button
                            onClick={() => { setActiveTab('dashboard'); setUserDropdownOpen(false); }}
                            className="w-full text-left px-3 py-1.5 text-xs text-[#0F172A] hover:bg-[#EFF6FF] hover:text-[#2563EB] rounded-md flex items-center space-x-2"
                          >
                            <UserIcon className="w-3.5 h-3.5 text-[#2563EB]" />
                            <span>Candidate Dashboard & Pipeline</span>
                          </button>
                          <button
                            onClick={() => { setActiveTab('profile'); setUserDropdownOpen(false); }}
                            className="w-full text-left px-3 py-1.5 text-xs text-[#0F172A] hover:bg-[#EFF6FF] hover:text-[#2563EB] rounded-md flex items-center space-x-2"
                          >
                            <FileText className="w-3.5 h-3.5 text-[#64748B]" />
                            <span>My Profile ({currentUser.profileCompletion || 85}% Done)</span>
                          </button>
                        </>
                      )}

                      {currentUser.role === 'recruiter' && (
                        <>
                          <button
                            onClick={() => { setActiveTab('recruiter-dashboard'); setUserDropdownOpen(false); }}
                            className="w-full text-left px-3 py-1.5 text-xs text-[#0F172A] hover:bg-[#EFF6FF] hover:text-[#2563EB] rounded-md flex items-center space-x-2"
                          >
                            <Briefcase className="w-3.5 h-3.5 text-[#2563EB]" />
                            <span>Recruiter Dashboard & Pipeline</span>
                          </button>
                          <button
                            onClick={() => { setActiveTab('recruiter-post'); setUserDropdownOpen(false); }}
                            className="w-full text-left px-3 py-1.5 text-xs text-[#0F172A] hover:bg-[#EFF6FF] hover:text-[#2563EB] rounded-md flex items-center space-x-2"
                          >
                            <PlusCircle className="w-3.5 h-3.5 text-[#2563EB]" />
                            <span>Post a New Job</span>
                          </button>
                        </>
                      )}

                      {currentUser.role === 'admin' && (
                        <button
                          onClick={() => { setActiveTab('admin'); setUserDropdownOpen(false); }}
                          className="w-full text-left px-3 py-1.5 text-xs text-[#0F172A] hover:bg-[#EFF6FF] hover:text-[#2563EB] rounded-md flex items-center space-x-2"
                        >
                          <Shield className="w-3.5 h-3.5 text-[#2563EB]" />
                          <span>Admin Control Center</span>
                        </button>
                      )}
                    </div>

                    <div className="pt-2 border-t border-[#E2E8F0]">
                      <p className="px-3 text-[10px] font-bold uppercase text-[#64748B] mb-1 font-geometric-mono">Switch Demo Persona</p>
                      <button
                        onClick={() => { onSwitchUser('candidate'); setUserDropdownOpen(false); }}
                        className={`w-full text-left px-3 py-1 text-xs rounded-md ${
                          currentUser.role === 'candidate' ? 'font-bold text-[#2563EB] bg-[#EFF6FF]' : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        Priya Sharma (Candidate)
                      </button>
                      <button
                        onClick={() => { onSwitchUser('recruiter'); setUserDropdownOpen(false); }}
                        className={`w-full text-left px-3 py-1 text-xs rounded-md ${
                          currentUser.role === 'recruiter' ? 'font-bold text-[#2563EB] bg-[#EFF6FF]' : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        Arun Mehta (Recruiter)
                      </button>
                      <button
                        onClick={() => { onSwitchUser('admin'); setUserDropdownOpen(false); }}
                        className={`w-full text-left px-3 py-1 text-xs rounded-md ${
                          currentUser.role === 'admin' ? 'font-bold text-[#2563EB] bg-[#EFF6FF]' : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        Admin Moderator
                      </button>
                    </div>

                    <div className="pt-2 border-t border-slate-100 mt-2">
                      <button
                        onClick={() => { onLogout(); setUserDropdownOpen(false); }}
                        className="w-full text-left px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-md flex items-center space-x-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  id="header-login-btn"
                  onClick={() => onOpenAuth('candidate')}
                  className="text-xs font-bold text-slate-700 hover:text-blue-600 px-3 py-2 rounded-lg transition-colors"
                >
                  Log In
                </button>
                <button
                  id="header-signup-btn"
                  onClick={() => onOpenAuth('candidate')}
                  className="text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-xs transition-colors"
                >
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-blue-600 rounded-lg"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                className={`flex items-center space-x-2 p-2.5 rounded-lg text-xs font-semibold ${
                  activeTab === item.id ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-700'
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col space-y-2">
            {currentUser ? (
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg">
                <div>
                  <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                  <p className="text-[10px] text-blue-600 uppercase font-semibold">{currentUser.role}</p>
                </div>
                <button
                  onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                  className="text-xs text-red-600 font-semibold"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { onOpenAuth('candidate'); setMobileMenuOpen(false); }}
                  className="w-full py-2 text-center text-xs font-bold text-slate-700 border border-slate-300 rounded-lg"
                >
                  Log In
                </button>
                <button
                  onClick={() => { onOpenAuth('candidate'); setMobileMenuOpen(false); }}
                  className="w-full py-2 text-center text-xs font-bold text-white bg-blue-600 rounded-lg"
                >
                  Sign Up Free
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
