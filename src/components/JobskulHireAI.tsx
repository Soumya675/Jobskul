import React, { useState } from 'react';
import { User, JobListing } from '../types';
import {
  ShieldCheck,
  Target,
  FileText,
  MessageSquare,
  Copy,
  Check,
  Send,
  RefreshCw,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  BookOpen
} from 'lucide-react';

interface JobskulHireAIProps {
  currentUser: User | null;
  jobs: JobListing[];
  onNavigateToLearn: () => void;
}

export const JobskulHireAI: React.FC<JobskulHireAIProps> = ({
  currentUser,
  jobs,
  onNavigateToLearn,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'matcher' | 'ats' | 'coverletter' | 'interview'>('matcher');

  // 1. Matcher State
  const [selectedJobId, setSelectedJobId] = useState<string>(jobs[0]?.id || '');
  const [matchLoading, setMatchLoading] = useState(false);
  const [matchResult, setMatchResult] = useState<any>({
    matchPercentage: 92,
    matchCategory: "Highly Recommended",
    matchingSkills: ["Python", "React", "MySQL", "REST APIs"],
    missingSkills: ["Docker Containerization", "Kubernetes"],
    strengths: [
      "Exceptional proficiency in core Python backend frameworks and MySQL database modeling.",
      "Demonstrated experience building end-to-end full stack workflows in React."
    ],
    improvementSuggestions: [
      "Complete the Jobskül Cloud & Containerization project to bridge the DevOps skill gap.",
      "Quantify API response time improvements in your project portfolio."
    ],
    summary: "Candidate profile exhibits strong technical synergy with the target requirements."
  });

  // 2. Cover Letter State
  const [clJobTitle, setClJobTitle] = useState('Full Stack Software Engineer');
  const [clCompany, setClCompany] = useState('CloudSphere Technologies');
  const [clLoading, setClLoading] = useState(false);
  const [coverLetterResult, setCoverLetterResult] = useState(
    `Dear Hiring Team at CloudSphere Technologies,\n\nI am writing to express my eager interest in the Full Stack Software Engineer role. Having engineered end-to-end production systems using Python, Django, React, and MySQL through Jobskül capstone tracks, I am prepared to contribute immediately to your agile sprint cycles.\n\nMy experience includes building resilient RESTful microservices, optimizing complex relational schemas in MySQL, and writing clean, scalable frontend components. I look forward to discussing how my technical background aligns with CloudSphere's product roadmap.\n\nSincerely,\n${currentUser?.name || 'Priya Sharma'}`
  );
  const [clCopied, setClCopied] = useState(false);

  // 3. Mock Interview Prep State
  const [prepRole, setPrepRole] = useState('Python & React Full Stack Developer');
  const [prepLoading, setPrepLoading] = useState(false);
  const [prepQuestions, setPrepQuestions] = useState([
    {
      question: "How do you optimize slow queries in MySQL when using an ORM like Django?",
      category: "Technical Architecture",
      modelAnswer: "Use select_related for single-valued relationships and prefetch_related for many-to-many to prevent N+1 queries. Inspect the generated SQL using connection.queries or EXPLAIN, and ensure appropriate indexing on foreign keys and filter columns.",
      tips: "Mention indexing and execution plans explicitly."
    },
    {
      question: "Explain the difference between React useEffect and useMemo, and when to avoid premature optimization.",
      category: "Frontend Engineering",
      modelAnswer: "useEffect manages side effects after render. useMemo memoizes expensive recalculations. Avoid useMemo for simple primitive calculations as the overhead of dependency comparison exceeds the calculation cost.",
      tips: "Demonstrate understanding of the virtual DOM and rendering cycles."
    },
    {
      question: "Tell me about a time you handled an unforeseen production bug under tight deadlines.",
      category: "Behavioral & STAR Method",
      modelAnswer: "Structure your response using the STAR method (Situation, Task, Action, Result). Highlight logging, rollback safety, root cause analysis, and preventive post-mortem documentation.",
      tips: "Emphasize team communication and composure."
    }
  ]);

  const handleRunMatch = async () => {
    const job = jobs.find(j => j.id === selectedJobId) || jobs[0];
    setMatchLoading(true);
    try {
      const res = await fetch('/api/ai/job-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidateSkills: currentUser?.skills || ['Python', 'React', 'MySQL'],
          candidateExp: `${currentUser?.experienceYears || 2} years`,
          jobSkills: job.requiredSkills,
          jobTitle: job.title,
          jobDesc: job.description
        })
      });
      const data = await res.json();
      if (data.result) {
        setMatchResult(data.result);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setMatchLoading(false);
    }
  };

  const handleGenerateCoverLetter = async () => {
    setClLoading(true);
    try {
      const res = await fetch('/api/ai/generate-cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle: clJobTitle,
          company: clCompany,
          candidateName: currentUser?.name || 'Priya Sharma',
          candidateSkills: currentUser?.skills || ['Python', 'React', 'MySQL'],
          experienceYears: currentUser?.experienceYears || 2
        })
      });
      const data = await res.json();
      if (data.coverLetter) {
        setCoverLetterResult(data.coverLetter);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setClLoading(false);
    }
  };

  const handleGenerateInterviewPrep = async () => {
    setPrepLoading(true);
    try {
      const res = await fetch('/api/ai/interview-prep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle: prepRole,
          skills: currentUser?.skills || ['Python', 'React', 'SQL']
        })
      });
      const data = await res.json();
      if (data.data && data.data.questions) {
        setPrepQuestions(data.data.questions);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setPrepLoading(false);
    }
  };

  const handleCopyLetter = () => {
    navigator.clipboard.writeText(coverLetterResult);
    setClCopied(true);
    setTimeout(() => setClCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Header */}
      <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden border border-slate-800">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Jobskül Placement & Competency Framework</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Career Assessment & Placement Preparation
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed font-normal">
              Objective role compatibility evaluation, candidate skill gap analysis, recruiter-aligned cover letter formatting, and structured technical interview readiness.
            </p>
          </div>

          <div className="bg-slate-800/90 rounded-xl p-4 border border-slate-700/80 text-center w-full md:w-auto md:min-w-[200px]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Evaluation Matrix</span>
            <p className="text-lg font-black text-white mt-0.5 font-geometric-mono">ATS & Role Standard</p>
            <p className="text-[10px] text-blue-300 mt-1">Industry Benchmarked Criteria</p>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-1 overflow-x-auto text-xs font-bold">
        <button
          onClick={() => setActiveSubTab('matcher')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap ${
            activeSubTab === 'matcher'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>1. Profile & Role Fit Analysis</span>
        </button>

        <button
          onClick={() => setActiveSubTab('coverletter')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap ${
            activeSubTab === 'coverletter'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>2. Custom Cover Letter</span>
        </button>

        <button
          onClick={() => setActiveSubTab('interview')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap ${
            activeSubTab === 'interview'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>3. Technical Interview Prep</span>
        </button>
      </div>

      {/* 1. MATCH TAB */}
      {activeSubTab === 'matcher' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in">
          {/* Target Job Selector */}
          <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
              <Target className="w-4 h-4 text-blue-600" />
              <span>Select Target Opportunity</span>
            </h3>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Choose Open Job:</label>
              <select
                value={selectedJobId}
                onChange={(e) => setSelectedJobId(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500"
              >
                {jobs.map((j) => (
                  <option key={j.id} value={j.id}>
                    {j.title} — {j.company} ({j.location})
                  </option>
                ))}
              </select>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-2">
              <p><strong>Candidate:</strong> {currentUser?.name || 'Priya Sharma'}</p>
              <p><strong>Skills:</strong> {currentUser?.skills?.join(', ') || 'Python, React, MySQL'}</p>
              <p><strong>Experience:</strong> {currentUser?.experienceYears || 2} Years</p>
            </div>

            <button
              onClick={handleRunMatch}
              disabled={matchLoading}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs flex items-center justify-center space-x-2 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${matchLoading ? 'animate-spin' : ''}`} />
              <span>{matchLoading ? 'Analyzing Alignment...' : 'Evaluate Role Fit & Gap Analysis'}</span>
            </button>
          </div>

          {/* Match Score & Analysis Result */}
          <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between pb-4 border-b border-slate-100 gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-blue-50 border-4 border-blue-600 flex flex-col items-center justify-center shrink-0">
                  <span className="text-xl font-black text-blue-700">{matchResult.matchPercentage}%</span>
                  <span className="text-[8px] font-bold text-blue-600 uppercase">Match</span>
                </div>
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    {matchResult.matchCategory}
                  </span>
                  <p className="text-xs text-slate-600 mt-1">{matchResult.summary}</p>
                </div>
              </div>
            </div>

            {/* Overlap & Gaps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Overlapping Skills */}
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
                <h4 className="text-xs font-bold text-emerald-900 flex items-center space-x-1.5 uppercase">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Verified Skill Overlap</span>
                </h4>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {matchResult.matchingSkills.map((s: string, i: number) => (
                    <span key={i} className="px-2 py-0.5 bg-white text-emerald-800 rounded-md text-xs font-semibold border border-emerald-300">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Skills / Gap */}
              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2">
                <h4 className="text-xs font-bold text-amber-900 flex items-center space-x-1.5 uppercase">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Skill Gap to Address</span>
                </h4>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {matchResult.missingSkills.map((s: string, i: number) => (
                    <span key={i} className="px-2 py-0.5 bg-white text-amber-800 rounded-md text-xs font-semibold border border-amber-300">
                      + {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actionable Recommendations */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center space-x-1.5">
                <Lightbulb className="w-4 h-4 text-blue-600" />
                <span>Recommendations to Elevate Your Profile</span>
              </h4>
              <div className="space-y-2">
                {matchResult.improvementSuggestions.map((sug: string, idx: number) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 flex items-start space-x-2">
                    <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-[10px] mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{sug}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={onNavigateToLearn}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs flex items-center space-x-2 transition-colors cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Enroll in Jobskül Project Tracks to Bridge Gaps</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. COVER LETTER TAB */}
      {activeSubTab === 'coverletter' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in">
          <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Target Role Details</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Target Job Title</label>
                <input
                  type="text"
                  value={clJobTitle}
                  onChange={(e) => setClJobTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Hiring Company</label>
                <input
                  type="text"
                  value={clCompany}
                  onChange={(e) => setClCompany(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-lg text-slate-600">
                <p><strong>Candidate:</strong> {currentUser?.name || 'Priya Sharma'}</p>
                <p className="mt-1"><strong>Skills:</strong> {currentUser?.skills?.join(', ') || 'Python, React, MySQL'}</p>
              </div>

              <button
                onClick={handleGenerateCoverLetter}
                disabled={clLoading}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-xs flex items-center justify-center space-x-2 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <FileText className={`w-4 h-4 ${clLoading ? 'animate-spin' : ''}`} />
                <span>{clLoading ? 'Crafting Letter...' : 'Generate Tailored Cover Letter'}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="font-bold text-slate-900 text-sm">Tailored Professional Cover Letter</h4>
              <button
                onClick={handleCopyLetter}
                className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                {clCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{clCopied ? 'Copied to Clipboard!' : 'Copy Text'}</span>
              </button>
            </div>

            <textarea
              rows={12}
              value={coverLetterResult}
              onChange={(e) => setCoverLetterResult(e.target.value)}
              className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl text-xs text-slate-800 leading-relaxed font-sans focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* 3. INTERVIEW PREP TAB */}
      {activeSubTab === 'interview' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex-1 w-full">
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Engineering Role for Prep:</label>
              <input
                type="text"
                value={prepRole}
                onChange={(e) => setPrepRole(e.target.value)}
                placeholder="e.g. Python & Django Engineer, React Frontend Architect"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleGenerateInterviewPrep}
              disabled={prepLoading}
              className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs flex items-center justify-center space-x-2 transition-colors disabled:opacity-50 self-end cursor-pointer"
            >
              <MessageSquare className={`w-4 h-4 ${prepLoading ? 'animate-spin' : ''}`} />
              <span>{prepLoading ? 'Structuring Questions...' : 'Generate Mock Interview Questions'}</span>
            </button>
          </div>

          <div className="space-y-4">
            {prepQuestions.map((qItem, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold uppercase">
                    {qItem.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">Question #{idx + 1}</span>
                </div>

                <h3 className="text-sm font-bold text-slate-900">{qItem.question}</h3>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed space-y-1.5">
                  <p className="font-bold text-slate-900">Recommended Model Answer:</p>
                  <p>{qItem.modelAnswer}</p>
                </div>

                <div className="flex items-center space-x-2 text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span><strong>Interviewer Tip:</strong> {qItem.tips}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
