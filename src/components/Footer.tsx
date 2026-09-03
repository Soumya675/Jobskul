import React from 'react';
import { Logo } from './Logo';
import { Mail, Phone, MapPin, ShieldCheck, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#0F172A] text-slate-300 border-t border-[#E2E8F0]/20 pt-16 pb-12 mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white inline-block p-2 rounded-lg border border-[#E2E8F0] shadow-xs">
              <Logo size="md" />
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              <strong>Positioning:</strong> Learn. Build. Showcase. Get Hired.
              Jobskül is the unified career & talent ecosystem bridging ambitious job seekers, students, and top hiring enterprises with AI-driven matching and hands-on project preparation.
            </p>

            <div className="flex flex-col space-y-2 text-xs text-slate-400 pt-2 font-geometric-mono">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span>Tech Hub: Bengaluru • Hyderabad • Pune • Chennai • Noida</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span>support@jobskul.com | partnerships@jobskul.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span>+91 (080) 4567-8900 / +91 98765 43210</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Verified Employers & ATS-Compatible Certifications</span>
            </div>
          </div>

          {/* Job Seekers */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4 font-geometric-mono text-[#94A3B8]">Job Seekers</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onNavigate('jobs')} className="hover:text-white transition-colors flex items-center space-x-1">
                  <span>Explore Jobs</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('resume')} className="hover:text-white transition-colors">
                  Free ATS Resume Builder
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('hireai')} className="hover:text-white transition-colors">
                  Jobskül HireAI Matcher
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-white transition-colors">
                  Application Tracking Pipeline
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('companies')} className="hover:text-white transition-colors">
                  Verified Company Directory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-white transition-colors">
                  Career Insights & Guides
                </button>
              </li>
            </ul>
          </div>

          {/* Jobskül Learn */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4 font-geometric-mono text-[#94A3B8]">Jobskül Learn</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onNavigate('learn')} className="hover:text-white transition-colors">
                  Python Developer Track
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('learn')} className="hover:text-white transition-colors">
                  React & Full Stack Track
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('learn')} className="hover:text-white transition-colors">
                  Java Spring Boot Systems
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('learn')} className="hover:text-white transition-colors">
                  SAP MM / SD / FICO
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('learn')} className="hover:text-white transition-colors">
                  AI & NLP Microservices
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('learn')} className="hover:text-white transition-colors">
                  Project Portfolio Certifications
                </button>
              </li>
            </ul>
          </div>

          {/* Recruiters & Services */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4 font-geometric-mono text-[#94A3B8]">Recruiters & HR</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onNavigate('recruiter-post')} className="hover:text-white transition-colors flex items-center space-x-1 text-[#38BDF8] font-semibold">
                  <span>Post a Job Free</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('recruiter-dashboard')} className="hover:text-white transition-colors">
                  Candidate Search & Screening
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">
                  Lateral & Campus Hiring
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">
                  POSH & Compliance Training
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">
                  OD Consulting & Staffing
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="hover:text-white transition-colors text-slate-400">
                  Admin Control Portal
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 space-y-4 sm:space-y-0 font-geometric-mono">
          <p>© {new Date().getFullYear()} Jobskül Technologies Private Limited. All rights reserved. Hire • Train • Deploy.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms & Conditions</span>
            <span className="hover:text-slate-400 cursor-pointer">Security Standards</span>
            <span className="hover:text-slate-400 cursor-pointer">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
