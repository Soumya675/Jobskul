import React, { useState } from 'react';
import {
  Users,
  GraduationCap,
  ShieldCheck,
  Building,
  CheckCircle2,
  Mail,
  Phone,
  Send,
  Sparkles,
  ArrowRight,
  BookOpen,
  Calendar,
  Award,
  Cpu,
  Briefcase,
  HelpCircle,
  FileCheck,
  Check
} from 'lucide-react';
import {
  CORPORATE_SERVICES,
  INSTITUTIONAL_SERVICES,
  INDIVIDUAL_SERVICES,
  CONTACT_INFO
} from '../data/jobskulContent';
import { ResponsiveImage } from './ResponsiveImage';

interface HRServicesProps {
  initialAudience?: 'corporates' | 'institutions' | 'individuals';
}

export const HRServices: React.FC<HRServicesProps> = ({ initialAudience = 'corporates' }) => {
  const [activeAudience, setActiveAudience] = useState<'corporates' | 'institutions' | 'individuals'>(initialAudience);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedServiceTitle, setSelectedServiceTitle] = useState<string>('General Enquiry');
  const [formSent, setFormSent] = useState(false);
  const [inquiry, setInquiry] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    audienceType: activeAudience,
    serviceTitle: '',
    message: ''
  });

  const handleOpenEnquiry = (serviceTitle: string) => {
    setSelectedServiceTitle(serviceTitle);
    setInquiry(prev => ({
      ...prev,
      serviceTitle,
      audienceType: activeAudience
    }));
    setEnquiryModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setEnquiryModalOpen(false);
      setInquiry({
        name: '',
        organization: '',
        email: '',
        phone: '',
        audienceType: activeAudience,
        serviceTitle: '',
        message: ''
      });
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Hero Banner */}
      <div className="bg-[#0F172A] rounded-2xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #94A3B8 1px, transparent 1px), linear-gradient(to bottom, #94A3B8 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-geometric-mono font-bold tracking-wider uppercase">
            <span>Jobskül Solutions & Programs</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Transforming Employability & Enterprise Talent
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Delivering targeted lateral & fresher hiring solutions, statutory POSH compliance, comprehensive college conclaves & hackathons, and industry-sponsored individual traineeships.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300 font-geometric-mono">
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>65+ Client Associations</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>50+ Institutional Partners</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>10,000+ Internships Facilitated</span>
            </span>
          </div>
        </div>
      </div>

      {/* 3-Audience Segment Control */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 p-1.5 bg-slate-200/80 rounded-xl max-w-2xl mx-auto border border-slate-300/60">
        <button
          id="tab-btn-corporates"
          onClick={() => setActiveAudience('corporates')}
          className={`flex-1 w-full sm:w-auto py-2.5 px-5 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center space-x-2 ${
            activeAudience === 'corporates'
              ? 'bg-[#2563EB] text-white shadow-sm'
              : 'text-[#0F172A] hover:bg-white/60'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>For Corporates</span>
        </button>

        <button
          id="tab-btn-institutions"
          onClick={() => setActiveAudience('institutions')}
          className={`flex-1 w-full sm:w-auto py-2.5 px-5 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center space-x-2 ${
            activeAudience === 'institutions'
              ? 'bg-[#2563EB] text-white shadow-sm'
              : 'text-[#0F172A] hover:bg-white/60'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>For Institutions</span>
        </button>

        <button
          id="tab-btn-individuals"
          onClick={() => setActiveAudience('individuals')}
          className={`flex-1 w-full sm:w-auto py-2.5 px-5 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center space-x-2 ${
            activeAudience === 'individuals'
              ? 'bg-[#2563EB] text-white shadow-sm'
              : 'text-[#0F172A] hover:bg-white/60'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>For Individuals</span>
        </button>
      </div>

      {/* SECTION: FOR CORPORATES */}
      {activeAudience === 'corporates' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-200 text-xs font-geometric-mono font-bold uppercase">
                Enterprise Talent Infrastructure
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Corporate HR & Executive Talent Acquisition
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Engineered for Chief Human Resources Officers, Talent Acquisition Directors, and high-growth engineering organizations seeking zero-notice lateral talent and compliant staffing.
              </p>
              <div className="flex flex-wrap gap-4 pt-2 text-xs font-bold text-slate-700">
                <span className="flex items-center space-x-1 text-emerald-600">
                  <Check className="w-4 h-4" />
                  <span>Sub-15 Day SLA Lateral Fulfillment</span>
                </span>
                <span className="flex items-center space-x-1 text-emerald-600">
                  <Check className="w-4 h-4" />
                  <span>Statutory POSH Compliance Panels</span>
                </span>
              </div>
            </div>
            <div className="w-full lg:w-96 shrink-0 rounded-xl overflow-hidden shadow-md border border-slate-200">
              <ResponsiveImage
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2"
                alt="Corporate HR Talent Advisory"
                aspectRatio="16/10"
                sizes="(max-width: 1024px) 100vw, 384px"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORPORATE_SERVICES.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs hover:border-[#2563EB]/60 hover:shadow-md transition-all flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200 text-[11px] font-geometric-mono font-bold">
                      {service.badge}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0F172A] leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    {service.description}
                  </p>
                  <div className="pt-2 border-t border-[#E2E8F0] space-y-2">
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start space-x-2 text-xs text-[#334155]">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleOpenEnquiry(service.title)}
                  className="w-full py-2.5 px-4 bg-[#EFF6FF] hover:bg-[#2563EB] text-[#2563EB] hover:text-white rounded-lg text-xs font-bold transition-all border border-blue-200 flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <span>Request Proposal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION: FOR INSTITUTIONS */}
      {activeAudience === 'institutions' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-geometric-mono font-bold uppercase">
                Higher Education Alliance
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Campus Placement & Faculty Conclave Ecosystem
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Partnering with accredited engineering, MBA, and degree colleges across India. Accelerate student placement conversion with pre-assessed talent pipelines and pool campus drives.
              </p>
              <div className="flex flex-wrap gap-4 pt-2 text-xs font-bold text-slate-700">
                <span className="flex items-center space-x-1 text-indigo-600">
                  <Check className="w-4 h-4" />
                  <span>50+ Partnered Institutions</span>
                </span>
                <span className="flex items-center space-x-1 text-indigo-600">
                  <Check className="w-4 h-4" />
                  <span>Statewide Hackathons & Conclaves</span>
                </span>
              </div>
            </div>
            <div className="w-full lg:w-96 shrink-0 rounded-xl overflow-hidden shadow-md border border-slate-200">
              <ResponsiveImage
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4"
                alt="Institutional Campus Conclave"
                aspectRatio="16/10"
                sizes="(max-width: 1024px) 100vw, 384px"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {INSTITUTIONAL_SERVICES.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs hover:border-[#2563EB]/60 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-geometric-mono font-bold">
                    {service.badge}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-[#0F172A] leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                  <div className="pt-2 border-t border-[#E2E8F0] space-y-1.5">
                    {service.features.slice(0, 3).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start space-x-1.5 text-[11px] text-[#334155]">
                        <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleOpenEnquiry(service.title)}
                  className="w-full py-2 px-3 bg-[#EFF6FF] hover:bg-[#2563EB] text-[#2563EB] hover:text-white rounded-lg text-xs font-bold transition-all border border-blue-200 flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <span>Connect with TPO Desk</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION: FOR INDIVIDUALS */}
      {activeAudience === 'individuals' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-geometric-mono font-bold uppercase">
                Direct Career Acceleration
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Paid Traineeships & Industry Capstone Fellowships
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Hands-on immersion with production database schemas, code reviews by principal engineers, and fast-track interviews with hiring partner networks.
              </p>
              <div className="flex flex-wrap gap-4 pt-2 text-xs font-bold text-slate-700">
                <span className="flex items-center space-x-1 text-emerald-600">
                  <Check className="w-4 h-4" />
                  <span>Verified Experience Certificates</span>
                </span>
                <span className="flex items-center space-x-1 text-emerald-600">
                  <Check className="w-4 h-4" />
                  <span>Competitive Monthly Stipends</span>
                </span>
              </div>
            </div>
            <div className="w-full lg:w-96 shrink-0 rounded-xl overflow-hidden shadow-md border border-slate-200">
              <ResponsiveImage
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                alt="Individual Fellowship & Code Immersion"
                aspectRatio="16/10"
                sizes="(max-width: 1024px) 100vw, 384px"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {INDIVIDUAL_SERVICES.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl border border-[#E2E8F0] p-7 shadow-xs hover:border-[#2563EB] hover:shadow-lg transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-geometric-mono font-bold">
                      {service.badge}
                    </span>
                    <span className="text-xs text-[#64748B] font-semibold">{service.audience}</span>
                  </div>

                  <h3 className="text-xl font-extrabold text-[#0F172A]">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                    {service.description}
                  </p>

                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200/80 space-y-2.5">
                    <h4 className="text-xs font-bold font-geometric-mono uppercase tracking-wider text-[#0F172A]">
                      Program Highlights & Outcomes:
                    </h4>
                    {service.highlights.map((hl, hIdx) => (
                      <div key={hIdx} className="flex items-start space-x-2 text-xs text-[#334155]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => handleOpenEnquiry(service.title)}
                    className="w-full py-3 px-5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>Apply / Enquire for Traineeship</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-center text-[11px] text-[#64748B]">
                    Selection based on profile review & foundational aptitude assessment.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Enquiry Modal */}
      {enquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E2E8F0] space-y-5">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div>
                <h3 className="text-lg font-bold text-[#0F172A]">Submit Program Enquiry</h3>
                <p className="text-xs text-[#2563EB] font-semibold">{selectedServiceTitle}</p>
              </div>
              <button
                onClick={() => setEnquiryModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {formSent ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                <h4 className="text-base font-bold text-[#0F172A]">Enquiry Dispatched</h4>
                <p className="text-xs text-[#64748B] max-w-xs mx-auto">
                  Thank you! A senior program director from our Bhubaneswar team will contact you within 24 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-[#0F172A] font-bold mb-1">Your Full Name *</label>
                  <input
                    required
                    type="text"
                    value={inquiry.name}
                    onChange={(e) => setInquiry({ ...inquiry, name: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full p-2.5 rounded-lg border border-[#CBD5E1] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#0F172A] font-bold mb-1">Email Address *</label>
                    <input
                      required
                      type="email"
                      value={inquiry.email}
                      onChange={(e) => setInquiry({ ...inquiry, email: e.target.value })}
                      placeholder="e.g. name@company.com"
                      className="w-full p-2.5 rounded-lg border border-[#CBD5E1] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#0F172A] font-bold mb-1">Phone Number *</label>
                    <input
                      required
                      type="tel"
                      value={inquiry.phone}
                      onChange={(e) => setInquiry({ ...inquiry, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full p-2.5 rounded-lg border border-[#CBD5E1] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#0F172A] font-bold mb-1">
                    {activeAudience === 'individuals' ? 'Current College / Degree' : 'Organization / College Name *'}
                  </label>
                  <input
                    required
                    type="text"
                    value={inquiry.organization}
                    onChange={(e) => setInquiry({ ...inquiry, organization: e.target.value })}
                    placeholder={activeAudience === 'individuals' ? 'e.g. KIIT University / B.Tech CSE' : 'e.g. Acme Technologies / Institute of Tech'}
                    className="w-full p-2.5 rounded-lg border border-[#CBD5E1] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="block text-[#0F172A] font-bold mb-1">Project Details or Requirements</label>
                  <textarea
                    rows={3}
                    value={inquiry.message}
                    onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })}
                    placeholder="Provide details about expected timeline, cohort size, or specific requirements..."
                    className="w-full p-2.5 rounded-lg border border-[#CBD5E1] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg font-bold shadow-xs transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Request</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Quick Contact Footer Bar */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <p className="text-sm font-extrabold text-[#0F172A]">Need bespoke advisory or campus consultation?</p>
          <p className="text-xs text-[#64748B]">Speak directly with our leadership team at Esplanade One, Bhubaneswar.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={`tel:${CONTACT_INFO.phones[0]}`}
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#0F172A] rounded-lg text-xs font-bold transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>{CONTACT_INFO.phones[0]}</span>
          </a>
          <a
            href={`mailto:${CONTACT_INFO.emails[0]}`}
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{CONTACT_INFO.emails[0]}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
