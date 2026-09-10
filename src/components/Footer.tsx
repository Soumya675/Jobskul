import React from 'react';
import { Logo } from './Logo';
import { CONTACT_INFO } from '../data/jobskulContent';
import { Mail, Phone, MapPin, ShieldCheck, CheckCircle2, ArrowUpRight, GraduationCap, Building, Users } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenPromote?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPromote }) => {
  return (
    <footer className="bg-[#0F172A] text-slate-300 border-t border-[#E2E8F0]/20 pt-16 pb-12 mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white inline-block p-2 rounded-lg border border-[#E2E8F0] shadow-xs cursor-pointer" onClick={() => onNavigate('home')}>
              <Logo size="md" />
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              <strong>Positioning:</strong> Learn. Build. Showcase. Get Hired.
              Jobskül bridges ambitious candidates, higher-education institutions, and enterprise recruiters with verified talent pipelines and hands-on traineeships.
            </p>

            <div className="flex flex-col space-y-2 text-xs text-slate-300 pt-2 font-geometric-mono">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                <span className="leading-snug">{CONTACT_INFO.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span>{CONTACT_INFO.phones.join(' | ')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span>{CONTACT_INFO.emails[0]}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Verified Employers • 50+ Institutional Partners</span>
            </div>
          </div>

          {/* Job Seekers */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4 font-geometric-mono text-[#94A3B8]">Job Seekers</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onNavigate('jobs')} className="hover:text-white transition-colors flex items-center space-x-1 cursor-pointer">
                  <span>Find Jobs</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('companies')} className="hover:text-white transition-colors cursor-pointer">
                  Verified Companies
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('candidates')} className="hover:text-white transition-colors cursor-pointer">
                  Talent Directory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('resume')} className="hover:text-white transition-colors cursor-pointer">
                  Free ATS Resume Builder
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('hireai')} className="hover:text-white transition-colors cursor-pointer">
                  Skill Assessment & Prep
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-white transition-colors cursor-pointer">
                  Career Playbooks & Blog
                </button>
              </li>
            </ul>
          </div>

          {/* Services & Programs */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4 font-geometric-mono text-[#94A3B8]">Services & Solutions</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onNavigate('services-corporates')} className="hover:text-white transition-colors cursor-pointer text-left">
                  For Corporates (Lateral & POSH)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services-institutions')} className="hover:text-white transition-colors cursor-pointer text-left">
                  For Institutions (JILP & Conclaves)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services-individuals')} className="hover:text-white transition-colors cursor-pointer text-left">
                  For Individuals (CMT Traineeship)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors cursor-pointer text-left">
                  All HR Solutions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gallery')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Conclaves & Events Gallery
                </button>
              </li>
            </ul>
          </div>

          {/* About & Corporate */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4 font-geometric-mono text-[#94A3B8]">Company & Support</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onNavigate('team')} className="hover:text-white transition-colors cursor-pointer">
                  Our Team & Leadership
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('team')} className="hover:text-white transition-colors cursor-pointer">
                  Jobskül Milestones
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-white transition-colors cursor-pointer">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Contact Office
                </button>
              </li>
              {onOpenPromote && (
                <li>
                  <button onClick={onOpenPromote} className="text-amber-400 hover:text-amber-300 font-bold transition-colors cursor-pointer flex items-center space-x-1">
                    <span>★ Promote Jobskül</span>
                  </button>
                </li>
              )}
              {onOpenPromote && (
                <li>
                  <button onClick={onOpenPromote} className="text-blue-400 hover:text-blue-300 font-semibold transition-colors cursor-pointer">
                    College Campus Drives
                  </button>
                </li>
              )}
              <li>
                <button onClick={() => onNavigate('admin')} className="hover:text-white transition-colors text-slate-500 cursor-pointer">
                  Admin Suite
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 space-y-4 sm:space-y-0 font-geometric-mono">
          <p>© {new Date().getFullYear()} Jobskül. All rights reserved. Hire • Train • Deploy.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms & Conditions</span>
            <span className="hover:text-slate-400 cursor-pointer">Bhubaneswar Head Office</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
