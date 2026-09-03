import React, { useState } from 'react';
import {
  Users,
  GraduationCap,
  ShieldCheck,
  TrendingUp,
  Building,
  CheckCircle2,
  Mail,
  Phone,
  Send
} from 'lucide-react';

export const HRServices: React.FC = () => {
  const [formSent, setFormSent] = useState(false);
  const [inquiry, setInquiry] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    serviceType: 'Lateral Hiring',
    openingsCount: '1-5 Hires',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
  };

  const services = [
    {
      title: 'Lateral Tech Hiring',
      icon: Users,
      badge: 'Mid & Senior Engineers',
      description: 'End-to-end recruitment of verified software engineers, architects, and product leaders with rigorous technical screening and Jobskül capstone verification.'
    },
    {
      title: 'Campus & Fresh Talent Deployment',
      icon: GraduationCap,
      badge: 'Hire • Train • Deploy',
      description: 'Zero-bench-cost graduate recruitment programs. We train candidates on your specific tech stack (Django, React, SAP, Cloud) before onboarding day one.'
    },
    {
      title: 'POSH Compliance Training',
      icon: ShieldCheck,
      badge: 'Mandatory Compliance',
      description: 'Certified workshops and digital compliance certifications for Prevention of Sexual Harassment (POSH) for leadership, employees, and Internal Committees (IC).'
    },
    {
      title: 'Organization Development (OD)',
      icon: TrendingUp,
      badge: 'Culture & Scaling',
      description: 'Customized talent frameworks, competency mapping, performance engineering, and leadership succession planning for high-growth tech firms.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Banner */}
      <div className="bg-linear-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-8 sm:p-12 text-white shadow-md text-center space-y-4">
        <span className="px-3 py-1 rounded-full bg-blue-500/30 text-blue-200 text-xs font-bold uppercase tracking-wider">
          Enterprise Talent Solutions
        </span>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
          Jobskül Corporate HR & Staffing Services
        </h1>
        <p className="text-blue-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          From rapid lateral engineering hires to full-cycle campus Hire-Train-Deploy pipelines and POSH compliance workshops, Jobskül empowers modern enterprises to scale with confidence.
        </p>
      </div>

      {/* Services Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((srv, idx) => {
          const Icon = srv.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">
                    {srv.badge}
                  </span>
                </div>
                <h3 className="text-lg font-black text-slate-900 mt-3">{srv.title}</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{srv.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center space-x-2 text-xs font-bold text-blue-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Dedicated Account Manager & SLA Guarantee</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Contact Form */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs max-w-3xl mx-auto">
        <h2 className="text-xl font-black text-slate-900 text-center">Schedule an Enterprise Consultation</h2>
        <p className="text-xs text-slate-500 text-center mt-1">
          Our talent advisors will contact you within 4 business hours with customized hiring proposals.
        </p>

        {formSent ? (
          <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs font-bold text-emerald-800">
            Thank you! Your enterprise inquiry has been received. A senior Jobskül talent consultant will reach out shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Company / Organization</label>
                <input
                  type="text"
                  required
                  value={inquiry.companyName}
                  onChange={(e) => setInquiry({ ...inquiry, companyName: e.target.value })}
                  placeholder="e.g. Acme Technologies"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Contact Person Name</label>
                <input
                  type="text"
                  required
                  value={inquiry.contactName}
                  onChange={(e) => setInquiry({ ...inquiry, contactName: e.target.value })}
                  placeholder="e.g. Rahul Verma"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Corporate Email</label>
                <input
                  type="email"
                  required
                  value={inquiry.email}
                  onChange={(e) => setInquiry({ ...inquiry, email: e.target.value })}
                  placeholder="e.g. hr@acme.com"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Service Required</label>
                <select
                  value={inquiry.serviceType}
                  onChange={(e) => setInquiry({ ...inquiry, serviceType: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                >
                  <option value="Lateral Hiring">Lateral Tech Hiring</option>
                  <option value="Campus Hire-Train-Deploy">Campus Hire • Train • Deploy</option>
                  <option value="POSH Training">POSH Compliance Training</option>
                  <option value="OD Consulting">Organization Development Consulting</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Additional Requirements</label>
              <textarea
                rows={3}
                value={inquiry.notes}
                onChange={(e) => setInquiry({ ...inquiry, notes: e.target.value })}
                placeholder="Tell us about your target hiring timeline, tech stack, and location..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-center pt-2">
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md flex items-center space-x-2 transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Submit Enterprise Request</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
