import React from 'react';
import {
  TEAM_MEMBERS,
  JOBSKUL_MILESTONES,
  CORE_VALUES,
  JOBSKUL_STATS
} from '../data/jobskulContent';
import { ResponsiveImage } from './ResponsiveImage';
import {
  Users,
  Target,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  Compass,
  Linkedin,
  Award,
  CheckCircle2,
  Calendar,
  Building2
} from 'lucide-react';

export const OurTeam: React.FC = () => {
  const iconMap: Record<string, any> = {
    Sparkles,
    ShieldCheck,
    HeartHandshake,
    Users,
    Compass,
    Target
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Banner */}
      <div className="bg-[#0F172A] rounded-2xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden border border-slate-800 text-center space-y-4">
        <span className="px-3 py-1 rounded-md bg-blue-500/20 text-blue-300 text-xs font-geometric-mono font-bold uppercase tracking-wider border border-blue-400/30">
          Executive Leadership & Purpose
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
          The Leadership Driving Jobskül
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Founded in 2019, Jobskül bridges the divide between higher education and modern industry demands through real-world capstone training, institutional alliances, and ethical recruitment solutions.
        </p>

        {/* Impact Numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 text-left">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
            <p className="text-2xl sm:text-3xl font-black font-geometric-mono text-[#38BDF8]">
              {JOBSKUL_STATS.peopleTrained}
            </p>
            <p className="text-xs text-slate-300 mt-1 font-semibold">People Trained</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
            <p className="text-2xl sm:text-3xl font-black font-geometric-mono text-emerald-400">
              {JOBSKUL_STATS.clientAssociations}
            </p>
            <p className="text-xs text-slate-300 mt-1 font-semibold">Client Associations</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
            <p className="text-2xl sm:text-3xl font-black font-geometric-mono text-amber-300">
              {JOBSKUL_STATS.internshipsFacilitated}
            </p>
            <p className="text-xs text-slate-300 mt-1 font-semibold">Internships Facilitated</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
            <p className="text-2xl sm:text-3xl font-black font-geometric-mono text-purple-300">
              {JOBSKUL_STATS.certificatesIssued}
            </p>
            <p className="text-xs text-slate-300 mt-1 font-semibold">Certificates Issued</p>
          </div>
        </div>
      </div>

      {/* Leadership Team Profiles */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A]">Key Leadership</h2>
          <p className="text-xs sm:text-sm text-[#64748B] max-w-xl mx-auto">
            Experienced operators and educators steering curriculum innovation, institutional tie-ups, and corporate talent programs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs hover:border-[#2563EB]/60 hover:shadow-lg transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-xl">
                  <ResponsiveImage
                    src={member.image}
                    alt={member.name}
                    aspectRatio="4/3"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="rounded-xl"
                  />
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs p-2 rounded-lg shadow-sm border border-slate-200 z-10">
                    <Linkedin className="w-4 h-4 text-[#2563EB]" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-black text-[#0F172A]">{member.name}</h3>
                  <p className="text-xs font-bold text-[#2563EB] font-geometric-mono mt-0.5">{member.role}</p>
                </div>

                <p className="text-xs text-[#475569] leading-relaxed">
                  {member.bio}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-[11px] text-[#64748B]">
                <span className="flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Jobskül Leadership</span>
                </span>
                <span className="font-semibold text-slate-500">Bhubaneswar, India</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Company Journey / Milestones */}
      <div className="bg-slate-50 rounded-2xl p-8 sm:p-12 border border-[#E2E8F0] space-y-8">
        <div className="text-center space-y-2">
          <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-[#2563EB] text-[11px] font-geometric-mono font-bold uppercase">
            Evolution & Heritage
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A]">Jobskül Milestones</h2>
          <p className="text-xs sm:text-sm text-[#64748B] max-w-xl mx-auto">
            From humble beginnings in Odisha to an institution-trusted pan-India career partner.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {JOBSKUL_MILESTONES.map((mile, mIdx) => (
            <div
              key={mIdx}
              className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-xs space-y-3 relative overflow-hidden"
            >
              <span className="text-3xl sm:text-4xl font-black font-geometric-mono text-[#2563EB]/25 absolute top-3 right-4 select-none">
                {mile.year}
              </span>
              <div className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-blue-50 text-[#2563EB] text-xs font-bold font-geometric-mono">
                <Calendar className="w-3.5 h-3.5" />
                <span>{mile.year}</span>
              </div>
              <h3 className="text-base font-bold text-[#0F172A]">{mile.title}</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                {mile.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Core Values */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-geometric-mono font-bold uppercase">
            Organizational Ethos
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A]">Our Core Values</h2>
          <p className="text-xs sm:text-sm text-[#64748B] max-w-xl mx-auto">
            Six foundational pillars that guide our candidate interactions, curriculum design, and client stewardship every single day.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_VALUES.map((val, vIdx) => {
            const Icon = iconMap[val.icon] || Sparkles;
            return (
              <div
                key={vIdx}
                className="bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-xs hover:border-[#2563EB]/50 transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center border border-blue-100">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#0F172A]">{val.title}</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">{val.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
