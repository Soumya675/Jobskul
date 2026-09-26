import React, { useState, useEffect, useRef } from 'react';
import { Logo } from './Logo';
import { User } from '../types';
import {
  Briefcase,
  BookOpen,
  Target,
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
  Compass,
  Users,
  HelpCircle,
  Image as ImageIcon,
  Mail,
  Search,
  CheckCircle2,
  GraduationCap,
  Building,
  Home,
  ArrowRight,
  UserCheck,
  Share2,
  Sparkles,
  Award,
  MessageSquare
} from 'lucide-react';

interface HeaderProps {
  currentUser: User | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAuth: (role?: 'candidate' | 'recruiter' | 'admin') => void;
  onSwitchUser: (role: 'candidate' | 'recruiter' | 'admin') => void;
  onLogout: () => void;
  onOpenSearch?: () => void;
  onOpenPromote?: () => void;
  onSearchQueryChange?: (query: string) => void;
  unreadNotificationsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  activeTab,
  setActiveTab,
  onOpenAuth,
  onSwitchUser,
  onLogout,
  onOpenSearch,
  onOpenPromote,
  onSearchQueryChange,
  unreadNotificationsCount = 2,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [hireAiDropdownOpen, setHireAiDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [quickSearchOpen, setQuickSearchOpen] = useState(false);
  const [quickSearchInput, setQuickSearchInput] = useState('');

  const userDropdownRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setUserDropdownOpen(false);
        setNotificationsOpen(false);
        setServicesDropdownOpen(false);
        setToolsDropdownOpen(false);
        setMoreDropdownOpen(false);
        setMobileMenuOpen(false);
        setQuickSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Prevent body scroll and background bleed-through when mobile navigation drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu and search modals on desktop window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setMobileMenuOpen(false);
        setQuickSearchOpen(false);
        document.body.style.overflow = '';
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleQuickSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickSearchInput.trim()) {
      if (onSearchQueryChange) {
        onSearchQueryChange(quickSearchInput.trim());
      }
      setActiveTab('jobs');
      setQuickSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    setServicesDropdownOpen(false);
    setToolsDropdownOpen(false);
    setMoreDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full max-w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-[1600px] w-full mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 sm:h-[72px] gap-2 lg:gap-3 2xl:gap-4">
          {/* Logo & Main Navigation */}
          <div className="flex items-center space-x-1.5 xl:space-x-2 2xl:space-x-3 min-w-0">
            <div
              onClick={() => handleNavClick('home')}
              className="cursor-pointer shrink-0 transition-opacity hover:opacity-90 flex items-center"
              id="header-brand-logo"
            >
              <Logo size="md" className="h-8 sm:h-9 w-auto" />
            </div>

            {/* Desktop Navigation Links (>= 1280px / xl) */}
            <nav className="hidden xl:flex items-center space-x-0.5 2xl:space-x-1 shrink min-w-0">
              <button
                id="nav-home"
                onClick={() => handleNavClick('home')}
                className={`px-2 2xl:px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'home'
                    ? 'text-blue-600 bg-blue-50/90 border border-blue-200/70 font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-transparent'
                }`}
              >
                Home
              </button>

              <button
                id="nav-jobs"
                onClick={() => handleNavClick('jobs')}
                className={`px-2 2xl:px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'jobs'
                    ? 'text-blue-600 bg-blue-50/90 border border-blue-200/70 font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-transparent'
                }`}
              >
                Find Jobs
              </button>

              <button
                id="nav-courses"
                onClick={() => handleNavClick('courses')}
                className={`px-2 2xl:px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center space-x-1 ${
                  activeTab === 'courses'
                    ? 'text-blue-600 bg-blue-50/90 border border-blue-200/70 font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-transparent'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="hidden 2xl:inline">Courses & Live</span>
                <span className="2xl:hidden">Courses</span>
              </button>

              <button
                id="nav-assessment"
                onClick={() => handleNavClick('assessment')}
                className={`px-2 2xl:px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center space-x-1 ${
                  activeTab === 'assessment'
                    ? 'text-blue-600 bg-blue-50/90 border border-blue-200/70 font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-transparent'
                }`}
              >
                <Target className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="hidden 2xl:inline">Practice Lab</span>
                <span className="2xl:hidden">Practice</span>
              </button>

              <button
                id="nav-placement-tracker"
                onClick={() => handleNavClick('placement-tracker')}
                className={`px-2 2xl:px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center space-x-1 ${
                  activeTab === 'placement-tracker'
                    ? 'text-emerald-700 bg-emerald-50 border border-emerald-300 font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-transparent'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="hidden 2xl:inline">Placement Drives</span>
                <span className="2xl:hidden">Drives</span>
              </button>

              <button
                id="nav-companies"
                onClick={() => handleNavClick('companies')}
                className={`px-2 2xl:px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'companies'
                    ? 'text-blue-600 bg-blue-50/90 border border-blue-200/70 font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-transparent'
                }`}
              >
                Companies
              </button>

              {/* JobskulHireAI Suite & Multilingual Interview Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setHireAiDropdownOpen(true)}
                onMouseLeave={() => setHireAiDropdownOpen(false)}
              >
                <button
                  id="nav-hireai-menu"
                  onClick={() => handleNavClick('hireai-interview')}
                  className={`flex items-center space-x-1 px-2 2xl:px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'hireai-interview' || activeTab === 'hireai' || activeTab === 'hireai-partner'
                      ? 'text-purple-700 bg-purple-50 border border-purple-300/80 font-bold shadow-2xs'
                      : 'text-purple-700 hover:bg-purple-50/60 border border-transparent font-bold'
                  }`}
                  title="JobskulHireAI • Practice AI Interviews in English, Hindi & Odia"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse shrink-0" />
                  <span>HireAI Interview</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-purple-100 text-purple-700 text-[9px] font-bold">
                    EN•HI•OD
                  </span>
                  <ChevronDown className="w-3 h-3 ml-0.5 text-purple-400 shrink-0" />
                </button>

                {hireAiDropdownOpen && (
                  <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-200/80 p-2 space-y-1 animate-in fade-in slide-in-from-top-1 z-50">
                    <button
                      onClick={() => handleNavClick('hireai-interview')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-purple-50 flex items-start space-x-3 transition-colors cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700 shrink-0">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-slate-900">HireAI Mock Interview</p>
                          <span className="px-1.5 py-0.2 rounded bg-purple-100 text-purple-700 text-[9px] font-bold">
                            EN • HI • OD
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">Practice live technical & HR rounds in English, हिन्दी & ଓଡ଼ିଆ</p>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('hireai-partner')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 flex items-start space-x-3 transition-colors cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-slate-900">Partner & Recruiter Panel</p>
                          <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 text-[9px] font-bold">
                            Partner
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">Enterprise recruitment team & candidate pipeline</p>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('hireai')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 flex items-start space-x-3 transition-colors cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                        <Target className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-slate-900">Role Fit & ATS Matcher</p>
                          <span className="px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 text-[9px] font-bold">
                            ATS
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">Candidate compatibility & skill gap analysis</p>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {/* Career Tools Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setToolsDropdownOpen(true)}
                onMouseLeave={() => setToolsDropdownOpen(false)}
              >
                <button
                  id="nav-tools-dropdown"
                  onClick={() => handleNavClick('resume')}
                  className={`flex items-center space-x-1 px-2 2xl:px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'resume' || activeTab === 'ai-career' || activeTab === 'mentorship' || activeTab === 'community' || activeTab === 'college-portal' || activeTab === 'pricing'
                      ? 'text-blue-600 bg-blue-50/90 border border-blue-200/70 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-transparent'
                  }`}
                >
                  <span>Student Hub</span>
                  <ChevronDown className="w-3 h-3 ml-0.5 text-slate-400 shrink-0" />
                </button>

                {toolsDropdownOpen && (
                  <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-200/80 p-2 space-y-1 animate-in fade-in slide-in-from-top-1 z-50">
                    <button
                      onClick={() => handleNavClick('hireai-interview')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-purple-50 flex items-start space-x-3 transition-colors cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 shrink-0">
                        <Sparkles className="w-4 h-4 animate-pulse" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-slate-900">HireAI Mock Interview</p>
                          <span className="px-1.5 py-0.2 rounded bg-purple-100 text-purple-700 border border-purple-200 text-[10px] font-geometric-mono font-bold">
                            EN • HI • OD
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">Live AI audio/speech simulator in English, Hindi & Odia</p>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('resume')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 flex items-start space-x-3 transition-colors cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-slate-900">ATS Resume Builder</p>
                          <span className="px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-geometric-mono font-bold">
                            Free
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">Live scoring & ATS keyword optimization</p>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('ai-career')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 flex items-start space-x-3 transition-colors cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-900">AI Career Assistant & Chatbot</p>
                        <p className="text-[11px] text-slate-500">Personalized path & live interview coach</p>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('mentorship')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 flex items-start space-x-3 transition-colors cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                        <Users className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-900">1-on-1 Mentorship & Community</p>
                        <p className="text-[11px] text-slate-500">Book sessions with FAANG architects & discuss doubts</p>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('college-portal')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 flex items-start space-x-3 transition-colors cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-900">College & TPO Placement Portal</p>
                        <p className="text-[11px] text-slate-500">Institutional campus drives & reports</p>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('pricing')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 flex items-start space-x-3 transition-colors cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                        <Award className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-900">Pro Career Pass & Invoices</p>
                        <p className="text-[11px] text-slate-500">All courses access + coupons & tax invoices</p>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
              >
                <button
                  id="nav-services-dropdown"
                  onClick={() => handleNavClick('services')}
                  className={`flex items-center space-x-1 px-2 2xl:px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    activeTab.startsWith('services')
                      ? 'text-blue-600 bg-blue-50/90 border border-blue-200/70 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-transparent'
                  }`}
                >
                  <span>Services</span>
                  <ChevronDown className="w-3 h-3 ml-0.5 text-slate-400 shrink-0" />
                </button>

                {servicesDropdownOpen && (
                  <div className="absolute top-full left-0 w-72 bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-200/80 p-2 space-y-1 animate-in fade-in slide-in-from-top-1 z-50">
                    <button
                      onClick={() => handleNavClick('services-corporates')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 flex items-start space-x-3 transition-colors cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                        <Building className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">For Corporates</p>
                        <p className="text-[11px] text-slate-500">Lateral, Fresher, POSH, EQ & JILP</p>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('services-institutions')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 flex items-start space-x-3 transition-colors cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">For Institutions</p>
                        <p className="text-[11px] text-slate-500">Conclaves, Hackathons, CRT & TIC²</p>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('services-individuals')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 flex items-start space-x-3 transition-colors cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">For Individuals</p>
                        <p className="text-[11px] text-slate-500">CMT & Embedded Systems Traineeship</p>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {/* Company & Resources Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setMoreDropdownOpen(true)}
                onMouseLeave={() => setMoreDropdownOpen(false)}
              >
                <button
                  id="nav-more-dropdown"
                  className={`flex items-center space-x-1 px-2 2xl:px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    ['blog', 'faq', 'team', 'gallery', 'contact', 'candidates'].includes(activeTab)
                      ? 'text-blue-600 bg-blue-50/90 border border-blue-200/70 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-transparent'
                  }`}
                >
                  <span>Company</span>
                  <ChevronDown className="w-3 h-3 ml-0.5 text-slate-400 shrink-0" />
                </button>

                {moreDropdownOpen && (
                  <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-200/80 p-2 space-y-0.5 animate-in fade-in slide-in-from-top-1 z-50">
                    <button
                      onClick={() => handleNavClick('candidates')}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-lg flex items-center space-x-2.5 cursor-pointer"
                    >
                      <Users className="w-4 h-4 text-emerald-600" />
                      <span>Candidates Directory</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('blog')}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-lg flex items-center space-x-2.5 cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      <span>Career Blog</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('faq')}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-lg flex items-center space-x-2.5 cursor-pointer"
                    >
                      <HelpCircle className="w-4 h-4 text-slate-400" />
                      <span>FAQ</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('team')}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-lg flex items-center space-x-2.5 cursor-pointer"
                    >
                      <Users className="w-4 h-4 text-slate-400" />
                      <span>Our Team & Milestones</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('gallery')}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-lg flex items-center space-x-2.5 cursor-pointer"
                    >
                      <ImageIcon className="w-4 h-4 text-slate-400" />
                      <span>Conclaves Gallery</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('contact')}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-lg flex items-center space-x-2.5 cursor-pointer"
                    >
                      <Mail className="w-4 h-4 text-slate-400" />
                      <span>Contact Office</span>
                    </button>
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Desktop Right Action & User Controls (>= 1280px / xl) */}
          <div className="hidden xl:flex items-center space-x-1.5 2xl:space-x-2.5 shrink-0">
            {/* Quick Search Trigger Pill */}
            <button
              id="header-search-btn"
              onClick={() => setQuickSearchOpen(true)}
              className="flex items-center space-x-1 px-2 2xl:px-2.5 py-1.5 bg-slate-100/80 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200/80 rounded-xl text-xs font-medium transition-all group cursor-pointer"
              title="Quick Search (⌘K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors shrink-0" />
              <span className="text-[11px] hidden 2xl:inline">Quick Search</span>
              <kbd className="font-geometric-mono text-[9px] font-bold px-1.5 py-0.5 rounded bg-white text-slate-400 border border-slate-200 shadow-2xs">
                ⌘K
              </kbd>
            </button>

            {/* Share & Promote Website CTA */}
            {onOpenPromote && (
              <button
                id="header-promote-btn"
                onClick={onOpenPromote}
                className="flex items-center space-x-1 px-2 2xl:px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100/90 text-amber-900 border border-amber-200/90 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs"
                title="Promote Jobskül & Request College Placement Drive"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span className="text-[11px] hidden 2xl:inline">Promote & Share</span>
                <span className="text-[11px] hidden xl:inline 2xl:hidden">Share</span>
              </button>
            )}

            {/* Recruiter Quick Switch / Post Job */}
            {currentUser?.role === 'recruiter' ? (
              <button
                id="header-post-job-btn"
                onClick={() => handleNavClick('recruiter-post')}
                className="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white px-2.5 2xl:px-3 py-1.5 rounded-xl text-xs font-bold shadow-xs hover:shadow transition-all cursor-pointer whitespace-nowrap"
              >
                <PlusCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Post a Job</span>
              </button>
            ) : (
              <button
                id="header-employer-cta-btn"
                onClick={() => onSwitchUser('recruiter')}
                className="text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100/80 border border-blue-200/80 px-2 2xl:px-2.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap"
              >
                <span className="hidden 2xl:inline">For Employers</span>
                <span className="2xl:hidden">Employers</span>
              </button>
            )}

            {/* Notifications Dropdown */}
            {currentUser && (
              <div className="relative" ref={notificationsRef}>
                <button
                  id="notifications-toggle-btn"
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200 cursor-pointer"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4 shrink-0" />
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
                  )}
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-32px)] bg-white border border-slate-200/90 rounded-2xl shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Notifications</h4>
                      <span className="text-[11px] text-blue-600 font-semibold cursor-pointer">Mark all read</span>
                    </div>
                    <div className="space-y-2 mt-2">
                      <div className="p-2.5 bg-blue-50/70 rounded-xl border border-blue-100 text-xs">
                        <p className="font-bold text-blue-900">Technical Interview Confirmed</p>
                        <p className="text-slate-500 text-[11px] mt-0.5">CloudSphere Technologies on Sep 12 at 03:30 PM IST</p>
                      </div>
                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                        <p className="font-bold text-slate-900">ATS Profile Scored 94/100</p>
                        <p className="text-slate-500 text-[11px] mt-0.5">Jobskül Placement Team verified your resume skills.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* User Profile or Register / Sign In Buttons */}
            {currentUser ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  id="user-profile-menu-btn"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-1.5 p-1 2xl:p-1.5 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 rounded-xl transition-all cursor-pointer"
                >
                  <div className="w-7 h-7 2xl:w-8 2xl:h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-xs shadow-2xs shrink-0">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="text-left pr-1 hidden sm:block">
                    <p className="text-xs font-bold text-slate-900 leading-none truncate max-w-[75px] 2xl:max-w-[110px]">{currentUser.name}</p>
                    <p className="text-[10px] text-slate-500 uppercase font-geometric-mono mt-0.5 truncate max-w-[75px] 2xl:max-w-[110px]">{currentUser.role}</p>
                  </div>
                  <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
                </button>

                {/* Profile Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 max-w-[calc(100vw-32px)] bg-white border border-slate-200/80 rounded-2xl shadow-xl shadow-slate-900/10 p-3 z-50 space-y-2 animate-in fade-in slide-in-from-top-2">
                    <div className="pb-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-geometric-mono font-bold rounded-md">
                        ROLE: {currentUser.role.toUpperCase()}
                      </span>
                    </div>

                    <div className="space-y-0.5">
                      {currentUser.role === 'partner' && (
                        <>
                          <button
                            onClick={() => handleNavClick('hireai-partner')}
                            className="w-full text-left px-2.5 py-1.5 text-xs text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg flex items-center space-x-2 font-bold transition-colors cursor-pointer"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                            <span>Partner Dashboard</span>
                          </button>
                          <button
                            onClick={() => handleNavClick('hireai-partner')}
                            className="w-full text-left px-2.5 py-1.5 text-xs text-slate-800 hover:bg-slate-100 rounded-lg flex items-center space-x-2 transition-colors cursor-pointer"
                          >
                            <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                            <span>Positions & JD Requests</span>
                          </button>
                          <button
                            onClick={() => handleNavClick('hireai-partner')}
                            className="w-full text-left px-2.5 py-1.5 text-xs text-slate-800 hover:bg-slate-100 rounded-lg flex items-center space-x-2 transition-colors cursor-pointer"
                          >
                            <Users className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Candidate Pool & Interviews</span>
                          </button>
                        </>
                      )}

                      {currentUser.role === 'candidate' && (
                        <>
                          <button
                            onClick={() => handleNavClick('dashboard')}
                            className="w-full text-left px-2.5 py-1.5 text-xs text-slate-800 hover:bg-blue-50 hover:text-blue-600 rounded-lg flex items-center space-x-2 transition-colors cursor-pointer"
                          >
                            <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                            <span>My Applications & Saved Jobs</span>
                          </button>
                          <button
                            onClick={() => handleNavClick('profile')}
                            className="w-full text-left px-2.5 py-1.5 text-xs text-slate-800 hover:bg-blue-50 hover:text-blue-600 rounded-lg flex items-center space-x-2 transition-colors cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5 text-slate-400" />
                            <span>My Candidate Profile</span>
                          </button>
                        </>
                      )}

                      {currentUser.role === 'recruiter' && (
                        <>
                          <button
                            onClick={() => handleNavClick('recruiter-dashboard')}
                            className="w-full text-left px-2.5 py-1.5 text-xs text-slate-800 hover:bg-blue-50 hover:text-blue-600 rounded-lg flex items-center space-x-2 transition-colors cursor-pointer"
                          >
                            <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                            <span>Recruiter Dashboard</span>
                          </button>
                          <button
                            onClick={() => handleNavClick('recruiter-post')}
                            className="w-full text-left px-2.5 py-1.5 text-xs text-slate-800 hover:bg-blue-50 hover:text-blue-600 rounded-lg flex items-center space-x-2 transition-colors cursor-pointer"
                          >
                            <PlusCircle className="w-3.5 h-3.5 text-blue-600" />
                            <span>Post a New Job</span>
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => handleNavClick('hireai-partner')}
                        className="w-full text-left px-2.5 py-1.5 text-xs text-purple-700 hover:bg-purple-50 rounded-lg flex items-center space-x-2 font-bold transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                        <span>JobskulHireAI Partner Panel</span>
                      </button>

                      <button
                        onClick={() => handleNavClick('admin')}
                        className="w-full text-left px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-100 rounded-lg flex items-center space-x-2 font-bold transition-colors cursor-pointer"
                      >
                        <Shield className="w-3.5 h-3.5 text-slate-600" />
                        <span>Admin Panel</span>
                      </button>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <p className="px-2 text-[10px] font-bold uppercase text-slate-400 mb-1 font-geometric-mono">Demo Persona Switch</p>
                      <button
                        onClick={() => { onSwitchUser('candidate'); setUserDropdownOpen(false); }}
                        className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg transition-colors cursor-pointer ${
                          currentUser.role === 'candidate' ? 'font-bold text-blue-700 bg-blue-50' : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        Priya Sharma (Candidate / Student)
                      </button>
                      <button
                        onClick={() => { onSwitchUser('partner' as any); setUserDropdownOpen(false); }}
                        className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg transition-colors cursor-pointer ${
                          currentUser.role === 'partner' ? 'font-bold text-purple-700 bg-purple-50' : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        Partnerships Team (Super Admin)
                      </button>
                      <button
                        onClick={() => { onSwitchUser('recruiter'); setUserDropdownOpen(false); }}
                        className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg transition-colors cursor-pointer ${
                          currentUser.role === 'recruiter' ? 'font-bold text-blue-700 bg-blue-50' : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        Arun Mehta (Recruiter)
                      </button>
                      <button
                        onClick={() => { onSwitchUser('college' as any); setUserDropdownOpen(false); }}
                        className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg transition-colors cursor-pointer ${
                          currentUser.role === 'college' ? 'font-bold text-indigo-700 bg-indigo-50' : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        Prof. Senapati (College TPO)
                      </button>
                      <button
                        onClick={() => { onSwitchUser('admin'); setUserDropdownOpen(false); }}
                        className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg transition-colors cursor-pointer ${
                          currentUser.role === 'admin' ? 'font-bold text-blue-700 bg-blue-50' : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        Admin Moderator
                      </button>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <button
                        onClick={() => { onLogout(); setUserDropdownOpen(false); }}
                        className="w-full text-left px-2.5 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg flex items-center space-x-2 transition-colors cursor-pointer font-semibold"
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
                  className="text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-100/70 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  id="header-signup-btn"
                  onClick={() => onOpenAuth('candidate')}
                  className="text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-xl shadow-xs hover:shadow transition-all cursor-pointer"
                >
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Mobile & Tablet Bar Controls (< 1280px / xl) */}
          <div className="flex xl:hidden items-center space-x-1.5 sm:space-x-2">
            {/* Quick Search Trigger */}
            <button
              onClick={() => setQuickSearchOpen(true)}
              className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              title="Quick Search"
              aria-label="Quick Search"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Mobile Share & Promote Button */}
            {onOpenPromote && (
              <button
                onClick={onOpenPromote}
                className="p-2 text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 rounded-xl transition-colors cursor-pointer"
                title="Promote & Share"
                aria-label="Promote & Share"
              >
                <Share2 className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>
            )}

            {/* Notifications Button on Mobile */}
            {currentUser && (
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
                )}
              </button>
            )}

            {/* Quick Guest Sign-In button on Mobile */}
            {!currentUser && (
              <button
                onClick={() => onOpenAuth('candidate')}
                className="px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100/80 border border-blue-200/80 rounded-xl transition-all cursor-pointer"
              >
                Sign In
              </button>
            )}

            {/* Mobile User Avatar Pill if logged in */}
            {currentUser && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs hover:opacity-90 transition-opacity cursor-pointer shrink-0"
                title={`Logged in as ${currentUser.name}`}
              >
                {currentUser.name.charAt(0)}
              </button>
            )}

            {/* Hamburger / Close Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                mobileMenuOpen
                  ? 'bg-slate-100 text-blue-600'
                  : 'text-slate-800 hover:text-blue-600 hover:bg-slate-100'
              }`}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Notifications Floating Dropdown on Mobile (< xl) */}
      {notificationsOpen && (
        <div className="xl:hidden fixed inset-x-3 top-18 z-50 bg-white border border-slate-200/90 rounded-2xl shadow-2xl p-4 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">Notifications</h4>
            <div className="flex items-center space-x-3">
              <span className="text-xs text-blue-600 font-semibold cursor-pointer">Mark all read</span>
              <button
                onClick={() => setNotificationsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="space-y-2 mt-3">
            <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 text-xs">
              <p className="font-bold text-blue-900">Technical Interview Confirmed</p>
              <p className="text-slate-600 text-[11px] mt-0.5">CloudSphere Technologies on Sep 12 at 03:30 PM IST</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
              <p className="font-bold text-slate-900">ATS Profile Scored 94/100</p>
              <p className="text-slate-600 text-[11px] mt-0.5">Jobskül Placement Team verified your resume skills.</p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Search Modal */}
      {quickSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-24 bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-xl w-full p-4 sm:p-5 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <Search className="w-4 h-4 text-blue-600" />
                <span>Search Jobskül Platform</span>
              </h3>
              <button
                onClick={() => setQuickSearchOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1 cursor-pointer rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleQuickSearchSubmit} className="space-y-3">
              <input
                autoFocus
                type="text"
                value={quickSearchInput}
                onChange={(e) => setQuickSearchInput(e.target.value)}
                placeholder="Search jobs by role, skill, company, or city..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-blue-600 focus:bg-white font-medium"
              />

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-500">Press Enter to browse matching jobs</span>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Search Jobs
                </button>
              </div>

              {/* Quick Jump Shortcuts */}
              <div className="pt-3 border-t border-slate-100 space-y-1.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Quick Tools & Interview Prep</p>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setQuickSearchOpen(false);
                      handleNavClick('hireai-interview');
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-bold border border-purple-200 flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    <span>HireAI Interview (EN • हिन्दी • ଓଡ଼ିଆ)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setQuickSearchOpen(false);
                      handleNavClick('assessment');
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-200 flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Target className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Practice Lab</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setQuickSearchOpen(false);
                      handleNavClick('resume');
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center space-x-1.5 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-slate-500" />
                    <span>ATS Resume Builder</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-16 sm:top-[72px] bg-slate-950/40 backdrop-blur-xs z-30 xl:hidden animate-in fade-in duration-150"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer (Responsive, Full-Featured & Non-Overflowing) */}
      {mobileMenuOpen && (
        <div className="fixed top-16 sm:top-[72px] inset-x-0 z-40 xl:hidden bg-white border-b border-slate-200 shadow-2xl max-h-[calc(100vh-64px)] sm:max-h-[calc(100vh-72px)] overflow-y-auto px-4 pt-3 pb-8 space-y-5 animate-in slide-in-from-top-2 duration-200">
          {/* Quick Search Form inside Drawer */}
          <form onSubmit={handleQuickSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <input
              type="text"
              value={quickSearchInput}
              onChange={(e) => setQuickSearchInput(e.target.value)}
              placeholder="Search jobs, skills, companies..."
              className="w-full pl-9 pr-20 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:bg-white focus:border-blue-600"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold rounded-lg cursor-pointer"
            >
              Search
            </button>
          </form>

          {/* Primary Navigation Cards */}
          <div className="space-y-1.5">
            <p className="text-[10px] font-geometric-mono font-bold uppercase tracking-wider text-slate-400 px-1">
              Main Menu
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <button
                onClick={() => handleNavClick('home')}
                className={`p-3 rounded-xl text-left flex items-center space-x-2 transition-all cursor-pointer ${
                  activeTab === 'home'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200/70'
                }`}
              >
                <Home className="w-4 h-4 shrink-0 opacity-80" />
                <span className="truncate">Home</span>
              </button>

              <button
                onClick={() => handleNavClick('jobs')}
                className={`p-3 rounded-xl text-left flex items-center space-x-2 transition-all cursor-pointer ${
                  activeTab === 'jobs'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200/70'
                }`}
              >
                <Briefcase className="w-4 h-4 shrink-0 opacity-80" />
                <span className="truncate">Find Jobs</span>
              </button>

              <button
                onClick={() => handleNavClick('companies')}
                className={`p-3 rounded-xl text-left flex items-center space-x-2 transition-all cursor-pointer ${
                  activeTab === 'companies'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200/70'
                }`}
              >
                <Building2 className="w-4 h-4 shrink-0 opacity-80" />
                <span className="truncate">Companies</span>
              </button>

              <button
                onClick={() => handleNavClick('candidates')}
                className={`p-3 rounded-xl text-left flex items-center space-x-2 transition-all cursor-pointer ${
                  activeTab === 'candidates'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200/70'
                }`}
              >
                <Users className="w-4 h-4 shrink-0 opacity-80" />
                <span className="truncate">Candidates</span>
              </button>

              <button
                onClick={() => handleNavClick('courses')}
                className={`p-3 rounded-xl text-left flex items-center space-x-2 transition-all cursor-pointer ${
                  activeTab === 'courses'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200/70'
                }`}
              >
                <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="truncate">Courses & Live</span>
              </button>

              <button
                onClick={() => handleNavClick('assessment')}
                className={`p-3 rounded-xl text-left flex items-center space-x-2 transition-all cursor-pointer ${
                  activeTab === 'assessment'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200/70'
                }`}
              >
                <Target className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="truncate">Practice Lab</span>
              </button>

              <button
                onClick={() => handleNavClick('placement-tracker')}
                className={`p-3 rounded-xl text-left flex items-center space-x-2 transition-all cursor-pointer ${
                  activeTab === 'placement-tracker'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200/70'
                }`}
              >
                <Briefcase className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="truncate font-bold">Placement Drives</span>
              </button>

              <button
                onClick={() => handleNavClick('hireai-interview')}
                className={`p-3 rounded-xl text-left flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === 'hireai-interview' || activeTab === 'interview'
                    ? 'bg-purple-700 text-white shadow-xs'
                    : 'bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200/80 font-bold'
                }`}
              >
                <div className="flex items-center space-x-2 truncate">
                  <Sparkles className="w-4 h-4 text-purple-600 shrink-0 animate-pulse" />
                  <span className="truncate">HireAI Interview</span>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-purple-200 text-purple-800 text-[10px] font-bold shrink-0 ml-1">
                  EN•HI•OD
                </span>
              </button>

              <button
                onClick={() => handleNavClick('hireai-partner')}
                className={`p-3 rounded-xl text-left flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === 'hireai-partner'
                    ? 'bg-purple-700 text-white shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200/70 font-semibold'
                }`}
              >
                <div className="flex items-center space-x-2 truncate">
                  <Briefcase className="w-4 h-4 text-purple-600 shrink-0" />
                  <span className="truncate">HireAI Partner Portal</span>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px] font-bold shrink-0 ml-1">
                  Partner
                </span>
              </button>

              <button
                onClick={() => handleNavClick('resume')}
                className={`p-3 rounded-xl text-left flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === 'resume'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200/70'
                }`}
              >
                <div className="flex items-center space-x-2 truncate">
                  <FileText className="w-4 h-4 shrink-0 opacity-80" />
                  <span className="truncate">Resume Builder</span>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-geometric-mono font-bold shrink-0 ml-1">
                  Free
                </span>
              </button>

              <button
                onClick={() => handleNavClick('hireai')}
                className={`p-3 rounded-xl text-left flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === 'hireai'
                    ? 'bg-purple-700 text-white shadow-xs'
                    : 'bg-purple-50/70 hover:bg-purple-100 text-purple-900 border border-purple-200/80'
                }`}
              >
                <div className="flex items-center space-x-2 truncate">
                  <Target className="w-4 h-4 text-purple-600 shrink-0" />
                  <span className="truncate font-bold">Role Fit & ATS Matcher</span>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-purple-200/80 text-purple-800 text-[10px] font-bold shrink-0 ml-1">
                  ATS
                </span>
              </button>
            </div>
          </div>

          {/* Specialized Services */}
          <div className="space-y-2 pt-1 border-t border-slate-100">
            <p className="text-[10px] font-geometric-mono font-bold uppercase tracking-wider text-slate-400 px-1">
              Specialized Services
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                onClick={() => handleNavClick('services-corporates')}
                className="p-2.5 rounded-xl bg-blue-50/70 hover:bg-blue-50 border border-blue-100 text-left flex items-center space-x-3 cursor-pointer transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-blue-900">For Corporates</p>
                  <p className="text-[11px] text-slate-500">Lateral, POSH & Staffing</p>
                </div>
              </button>

              <button
                onClick={() => handleNavClick('services-institutions')}
                className="p-2.5 rounded-xl bg-indigo-50/70 hover:bg-indigo-50 border border-indigo-100 text-left flex items-center space-x-3 cursor-pointer transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-indigo-950">For Institutions</p>
                  <p className="text-[11px] text-slate-500">Campus Drives & CRT</p>
                </div>
              </button>

              <button
                onClick={() => handleNavClick('services-individuals')}
                className="p-2.5 rounded-xl bg-emerald-50/70 hover:bg-emerald-50 border border-emerald-100 text-left flex items-center space-x-3 cursor-pointer transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-emerald-950">For Individuals</p>
                  <p className="text-[11px] text-slate-500">Paid Traineeships & Skills</p>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Promote & Share Banner */}
          {onOpenPromote && (
            <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl flex items-center justify-between shadow-xs">
              <div className="flex items-center space-x-2.5">
                <Sparkles className="w-5 h-5 text-amber-100 shrink-0" />
                <div>
                  <p className="text-xs font-black">Promote Jobskül</p>
                  <p className="text-[10px] text-amber-100">Share with colleges & students</p>
                </div>
              </div>
              <button
                onClick={() => { onOpenPromote(); setMobileMenuOpen(false); }}
                className="px-3 py-1.5 bg-white text-amber-900 rounded-xl text-xs font-extrabold shadow-2xs hover:bg-amber-50 cursor-pointer shrink-0"
              >
                Share Now
              </button>
            </div>
          )}

          {/* Company & Resources */}
          <div className="space-y-2 pt-1 border-t border-slate-100">
            <p className="text-[10px] font-geometric-mono font-bold uppercase tracking-wider text-slate-400 px-1">
              Company & Resources
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-semibold">
              <button
                onClick={() => handleNavClick('blog')}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/70 text-slate-800 text-left flex items-center space-x-2 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="truncate">Career Blog</span>
              </button>
              <button
                onClick={() => handleNavClick('faq')}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/70 text-slate-800 text-left flex items-center space-x-2 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="truncate">FAQ</span>
              </button>
              <button
                onClick={() => handleNavClick('team')}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/70 text-slate-800 text-left flex items-center space-x-2 cursor-pointer"
              >
                <Users className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="truncate">Our Team</span>
              </button>
              <button
                onClick={() => handleNavClick('gallery')}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/70 text-slate-800 text-left flex items-center space-x-2 cursor-pointer"
              >
                <ImageIcon className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="truncate">Conclaves Gallery</span>
              </button>
            </div>

            <div className="flex items-center justify-between pt-1 px-1">
              <button
                onClick={() => handleNavClick('contact')}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center space-x-1 cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 mr-1" />
                <span>Contact Office &rarr;</span>
              </button>
              <button
                onClick={() => handleNavClick('admin')}
                className="text-xs font-bold text-purple-700 hover:text-purple-800 flex items-center space-x-1 cursor-pointer"
              >
                <Shield className="w-3.5 h-3.5 mr-1" />
                <span>Admin Suite</span>
              </button>
            </div>
          </div>

          {/* Employer Quick CTA */}
          <div className="pt-1 border-t border-slate-100">
            {currentUser?.role === 'recruiter' ? (
              <button
                onClick={() => handleNavClick('recruiter-post')}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post a New Job</span>
              </button>
            ) : (
              <button
                onClick={() => { onSwitchUser('recruiter'); setMobileMenuOpen(false); }}
                className="w-full py-2.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Building className="w-4 h-4" />
                <span>Switch to Employer / Recruiter View</span>
              </button>
            )}
          </div>

          {/* User Account / Auth Status */}
          <div className="pt-2 border-t border-slate-200">
            {currentUser ? (
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-3.5 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                      {currentUser.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 leading-tight">{currentUser.name}</p>
                      <p className="text-[10px] text-blue-600 font-geometric-mono font-bold uppercase">{currentUser.role}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                    className="text-xs text-red-600 hover:text-red-700 font-bold px-2.5 py-1 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>

                {/* Quick Persona Switching for Demo */}
                <div className="space-y-1">
                  <p className="text-[10px] font-geometric-mono font-bold uppercase text-slate-400">
                    Switch Active Persona:
                  </p>
                  <div className="grid grid-cols-3 gap-1.5 text-[10px] font-semibold text-center">
                    <button
                      onClick={() => { onSwitchUser('candidate'); setMobileMenuOpen(false); }}
                      className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                        currentUser.role === 'candidate'
                          ? 'bg-blue-600 text-white border-blue-600 font-bold'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Candidate
                    </button>
                    <button
                      onClick={() => { onSwitchUser('recruiter'); setMobileMenuOpen(false); }}
                      className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                        currentUser.role === 'recruiter'
                          ? 'bg-blue-600 text-white border-blue-600 font-bold'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Recruiter
                    </button>
                    <button
                      onClick={() => { onSwitchUser('admin'); setMobileMenuOpen(false); }}
                      className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                        currentUser.role === 'admin'
                          ? 'bg-blue-600 text-white border-blue-600 font-bold'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Admin
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => { onOpenAuth('candidate'); setMobileMenuOpen(false); }}
                  className="w-full py-2.5 text-center text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => { onOpenAuth('candidate'); setMobileMenuOpen(false); }}
                  className="w-full py-2.5 text-center text-xs font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-xs cursor-pointer"
                >
                  Register Free
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

