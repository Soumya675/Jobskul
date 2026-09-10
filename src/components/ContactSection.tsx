import React, { useState } from 'react';
import { CONTACT_INFO } from '../data/jobskulContent';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Building,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'General Enquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        category: 'General Enquiry',
        message: ''
      });
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header Banner */}
      <div className="bg-[#0F172A] rounded-2xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden border border-slate-800 text-center space-y-3">
        <span className="px-3 py-1 rounded-md bg-blue-500/20 text-blue-300 text-xs font-geometric-mono font-bold uppercase tracking-wider border border-blue-400/30">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
          Contact Jobskül
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          We welcome questions from candidates, corporate HR recruiters, and university placement directors.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Head Office Card */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2563EB]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0F172A]">Head Office</h3>
                <p className="text-xs text-[#2563EB] font-geometric-mono">Bhubaneswar, Odisha</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed pl-13">
              {CONTACT_INFO.address}
            </p>

            <div className="pt-2 pl-13">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(CONTACT_INFO.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#2563EB] hover:underline"
              >
                <span>View on Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Telephones & Emails */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs space-y-5">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#0F172A]">Direct Contact Numbers</h3>
                <div className="space-y-0.5 text-xs">
                  {CONTACT_INFO.phones.map((p, idx) => (
                    <div key={idx}>
                      <a href={`tel:${p}`} className="text-[#2563EB] hover:underline font-geometric-mono font-medium">
                        {p}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-[#E2E8F0] pt-4 flex items-start space-x-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#0F172A]">Email Inquiries</h3>
                <div className="space-y-0.5 text-xs">
                  {CONTACT_INFO.emails.map((m, idx) => (
                    <div key={idx}>
                      <a href={`mailto:${m}`} className="text-[#2563EB] hover:underline font-geometric-mono">
                        {m}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0F172A]">Operational Timings</h3>
                <p className="text-xs text-[#64748B]">Indian Standard Time (IST)</p>
              </div>
            </div>

            <div className="space-y-1.5 pt-2 text-xs">
              {CONTACT_INFO.workingHours.map((wh, idx) => (
                <div key={idx} className="flex justify-between py-1 border-b border-slate-100 last:border-b-0 text-[#475569]">
                  <span className="font-medium">{wh.days}</span>
                  <span className="font-geometric-mono font-semibold text-[#0F172A]">{wh.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Message Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-[#E2E8F0] pb-4 space-y-1">
            <h2 className="text-xl font-bold text-[#0F172A]">Send an Official Message</h2>
            <p className="text-xs text-[#64748B]">
              Fill out the form below and our team will get back to you within 24 business hours.
            </p>
          </div>

          {formSent ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
              <h3 className="text-lg font-bold text-[#0F172A]">Message Received</h3>
              <p className="text-xs text-[#64748B] max-w-sm mx-auto">
                Thank you for reaching out. A confirmation has been registered and a team member will reach out to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#0F172A] font-bold mb-1">Your Full Name *</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ananya Das"
                    className="w-full p-2.5 rounded-lg border border-[#CBD5E1] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="block text-[#0F172A] font-bold mb-1">Email Address *</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. ananya@domain.com"
                    className="w-full p-2.5 rounded-lg border border-[#CBD5E1] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#0F172A] font-bold mb-1">Phone Number *</label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full p-2.5 rounded-lg border border-[#CBD5E1] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="block text-[#0F172A] font-bold mb-1">Inquiry Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#CBD5E1] focus:outline-none focus:border-[#2563EB] bg-white"
                  >
                    <option value="General Enquiry">General Enquiry</option>
                    <option value="For Corporates (Hiring / POSH)">For Corporates (Hiring / POSH)</option>
                    <option value="For Institutions (Conclave / JILP)">For Institutions (Conclave / JILP)</option>
                    <option value="For Individuals (CMT / Embedded)">For Individuals (CMT / Embedded)</option>
                    <option value="Candidate Support & Job Alerts">Candidate Support & Job Alerts</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#0F172A] font-bold mb-1">Your Message or Query *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can Jobskül support your career, hiring, or institutional placement goals?"
                  className="w-full p-2.5 rounded-lg border border-[#CBD5E1] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg font-bold shadow-xs transition-colors flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
