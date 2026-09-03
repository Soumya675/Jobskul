import React, { useState } from 'react';
import { User } from '../types';
import {
  FileText,
  Printer,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Download,
  Layout,
  Plus,
  Trash2,
  RefreshCw
} from 'lucide-react';

interface ResumeBuilderProps {
  user: User;
}

export const ResumeBuilder: React.FC<ResumeBuilderProps> = ({ user }) => {
  const [template, setTemplate] = useState<'modern' | 'executive' | 'compact'>('modern');
  const [atsScore, setAtsScore] = useState(88);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>({
    verdict: "ATS Interview Ready",
    keywordsFound: ["Python", "React", "MySQL", "REST APIs", "Git", "System Design"],
    keywordsMissing: ["Docker Containerization", "CI/CD Pipeline", "Microservices"],
    formattingTips: [
      "Optimal single-column structure ensures flawless parsing by Workday, Greenhouse & Taleo ATS.",
      "Clear chronological reverse ordering for education and experience."
    ],
    aiSuggestions: "Quantify your achievements with performance metrics (e.g. 'boosted throughput by 30%')."
  });

  const [resumeData, setResumeData] = useState({
    name: user.name,
    headline: user.headline || 'Full Stack Engineer | Python • React • MySQL',
    email: user.email,
    phone: user.phone || '+91 98765 43210',
    location: user.location || 'Bengaluru, India',
    github: user.githubUrl || 'github.com/priyasharma-dev',
    linkedin: user.linkedinUrl || 'linkedin.com/in/priya-sharma-tech',
    summary: 'Proactive Full Stack Engineer with strong proficiency in Python, Django, React, and MySQL. Experienced in designing resilient RESTful APIs, optimizing relational schemas, and developing end-to-end web applications through Jobskül capstone tracks.',
    experiences: [
      {
        role: 'Full Stack Engineer Intern',
        company: 'CloudSphere Tech',
        period: '2024 - Present',
        bullets: [
          'Engineered scalable REST microservices handling 50k+ daily requests with Python & Django.',
          'Reduced query latency by 42% by introducing indexing and optimized query sets in MySQL.',
          'Built responsive dashboard components in React and Tailwind CSS for real-time analytics.'
        ]
      }
    ],
    projects: [
      {
        title: 'Jobskül Enterprise Recruitment Engine',
        tech: 'Python, Django REST, MySQL, React, Tailwind CSS',
        description: 'Built a full-cycle applicant tracking and ATS scoring portal connecting candidates with recruiters. Implemented JWT authentication, multi-criteria filtering, and automated interview scheduling.'
      },
      {
        title: 'High-Throughput Analytics & Notification Microservice',
        tech: 'Python, Celery, Redis, MySQL',
        description: 'Developed an asynchronous job queue for automated email notifications and interview reminders.'
      }
    ],
    skills: user.skills || ['Python', 'Django', 'React', 'MySQL', 'JavaScript', 'REST APIs', 'Git', 'Tailwind CSS'],
    education: [
      {
        degree: 'B.Tech in Computer Science & Engineering',
        institution: 'National Institute of Technology',
        year: '2020 - 2024',
        grade: 'CGPA 8.7 / 10'
      }
    ],
    certifications: [
      'Jobskül Certified Python & MySQL Engineer (Grade: Exemplary)',
      'Jobskül ATS Certified Full Stack Track'
    ]
  });

  const handleTriggerAtsScan = async () => {
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/ai/resume-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText: `${resumeData.name} ${resumeData.headline} ${resumeData.summary} ${resumeData.skills.join(' ')}`,
          targetRole: resumeData.headline
        })
      });
      const data = await res.json();
      if (data.analysis) {
        setAnalysisResult(data.analysis);
        setAtsScore(data.analysis.atsScore || 90);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Controls Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold uppercase tracking-wider">
              100% Free & ATS-Optimized
            </span>
            <span className="text-xs text-slate-500">• Workday, Greenhouse & Taleo Friendly</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Jobskül ATS Resume Builder</h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Create high-scoring, ATS-compliant resumes with real-time scoring and AI suggestions.
          </p>
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          {/* Template Selector */}
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setTemplate('modern')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                template === 'modern' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Modern Tech
            </button>
            <button
              onClick={() => setTemplate('executive')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                template === 'executive' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Executive
            </button>
            <button
              onClick={() => setTemplate('compact')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                template === 'compact' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Compact Classic
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center space-x-1.5 transition-colors shrink-0"
          >
            <Printer className="w-4 h-4" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Editor & ATS Score, Right Live Resume */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: ATS Scanner & Quick Fields (4 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* ATS Meter Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-bold text-slate-900">ATS Resume Score</h3>
              </div>
              <button
                onClick={handleTriggerAtsScan}
                disabled={isAnalyzing}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1 disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
                <span>{isAnalyzing ? 'Scanning...' : 'Re-Scan'}</span>
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border-4 border-emerald-500 flex flex-col items-center justify-center shrink-0">
                <span className="text-lg font-black text-emerald-700">{atsScore}</span>
                <span className="text-[9px] font-bold text-emerald-600 uppercase">/ 100</span>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">{analysisResult.verdict}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  High pass rate across ATS filters. Clean formatting and strong keyword density.
                </p>
              </div>
            </div>

            {/* Keyword Hits */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700">Keywords Identified:</span>
                <span className="text-emerald-700 font-bold">{analysisResult.keywordsFound.length} Found</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {analysisResult.keywordsFound.map((kw: string, i: number) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-semibold border border-emerald-200">
                    ✓ {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Recommended Keywords */}
            <div className="space-y-2 text-xs pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700">Add to boost to 95+:</span>
                <span className="text-amber-700 font-bold">Recommended</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {analysisResult.keywordsMissing.map((kw: string, i: number) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 text-[10px] font-semibold border border-amber-200">
                    + {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* AI Suggestion */}
            <div className="p-3 bg-blue-50 rounded-lg text-xs text-blue-900 border border-blue-100 flex items-start space-x-2">
              <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>{analysisResult.aiSuggestions}</span>
            </div>
          </div>

          {/* Quick Edit Inputs */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs border-b border-slate-100 pb-2">
              Edit Resume Content
            </h3>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Headline</label>
              <input
                type="text"
                value={resumeData.headline}
                onChange={(e) => setResumeData({ ...resumeData, headline: e.target.value })}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Executive Summary</label>
              <textarea
                rows={4}
                value={resumeData.summary}
                onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Technical Skills (Comma separated)</label>
              <input
                type="text"
                value={resumeData.skills.join(', ')}
                onChange={(e) => setResumeData({ ...resumeData, skills: e.target.value.split(',').map(s => s.trim()) })}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Right Col: Live A4 Printable Preview (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-xl border border-slate-300 shadow-xl p-8 sm:p-10 font-sans text-slate-800 min-h-[840px] print:shadow-none print:border-none print:p-0">
            {/* Template Header */}
            <div className={`pb-4 mb-4 border-b ${
              template === 'modern' ? 'border-blue-600' : template === 'executive' ? 'border-slate-800' : 'border-slate-300'
            }`}>
              <h1 className={`text-2xl sm:text-3xl font-black tracking-tight ${
                template === 'modern' ? 'text-blue-900' : 'text-slate-900'
              }`}>
                {resumeData.name}
              </h1>
              <p className="text-sm font-bold text-slate-700 mt-0.5">{resumeData.headline}</p>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-2 font-medium">
                <span>{resumeData.email}</span>
                <span>•</span>
                <span>{resumeData.phone}</span>
                <span>•</span>
                <span>{resumeData.location}</span>
                <span>•</span>
                <span className="text-blue-600">{resumeData.github}</span>
                <span>•</span>
                <span className="text-blue-600">{resumeData.linkedin}</span>
              </div>
            </div>

            {/* Summary */}
            <div className="mb-4">
              <h2 className={`text-xs font-bold uppercase tracking-wider mb-1.5 ${
                template === 'modern' ? 'text-blue-800' : 'text-slate-900'
              }`}>
                Professional Summary
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed">{resumeData.summary}</p>
            </div>

            {/* Technical Skills */}
            <div className="mb-4">
              <h2 className={`text-xs font-bold uppercase tracking-wider mb-1.5 ${
                template === 'modern' ? 'text-blue-800' : 'text-slate-900'
              }`}>
                Technical Skills & Competencies
              </h2>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {resumeData.skills.map((s, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded-sm font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Professional Experience */}
            <div className="mb-4">
              <h2 className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                template === 'modern' ? 'text-blue-800' : 'text-slate-900'
              }`}>
                Work Experience
              </h2>
              <div className="space-y-3">
                {resumeData.experiences.map((exp, idx) => (
                  <div key={idx} className="text-xs">
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>{exp.role} — {exp.company}</span>
                      <span className="text-slate-500 font-normal">{exp.period}</span>
                    </div>
                    <ul className="mt-1 list-disc list-inside space-y-0.5 text-slate-600">
                      {exp.bullets.map((b, bi) => (
                        <li key={bi} className="leading-relaxed pl-1">{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Jobskül Capstone Projects */}
            <div className="mb-4">
              <h2 className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                template === 'modern' ? 'text-blue-800' : 'text-slate-900'
              }`}>
                Featured Projects & Architectures
              </h2>
              <div className="space-y-2.5">
                {resumeData.projects.map((proj, idx) => (
                  <div key={idx} className="text-xs">
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>{proj.title}</span>
                      <span className="text-blue-700 text-[11px] font-semibold">{proj.tech}</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed mt-0.5">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Certifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <h2 className={`text-xs font-bold uppercase tracking-wider mb-1.5 ${
                  template === 'modern' ? 'text-blue-800' : 'text-slate-900'
                }`}>
                  Education
                </h2>
                {resumeData.education.map((edu, idx) => (
                  <div key={idx} className="text-xs text-slate-700">
                    <p className="font-bold">{edu.degree}</p>
                    <p className="text-slate-500">{edu.institution} ({edu.year})</p>
                    <p className="text-emerald-700 font-semibold">{edu.grade}</p>
                  </div>
                ))}
              </div>

              <div>
                <h2 className={`text-xs font-bold uppercase tracking-wider mb-1.5 ${
                  template === 'modern' ? 'text-blue-800' : 'text-slate-900'
                }`}>
                  Certifications & Honors
                </h2>
                <ul className="text-xs text-slate-600 space-y-1">
                  {resumeData.certifications.map((c, idx) => (
                    <li key={idx} className="flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
