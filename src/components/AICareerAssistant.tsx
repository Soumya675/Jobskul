import React, { useState } from 'react';
import { User } from '../types';
import {
  Sparkles,
  Bot,
  Send,
  Target,
  ArrowRight,
  TrendingUp,
  Award,
  CheckCircle2,
  RefreshCw,
  Copy,
  Lightbulb,
  Building2,
  Compass
} from 'lucide-react';

interface AICareerAssistantProps {
  currentUser: User | null;
  onNavigateToCourses?: () => void;
  onNavigateToJobs?: () => void;
}

export const AICareerAssistant: React.FC<AICareerAssistantProps> = ({
  currentUser,
  onNavigateToCourses,
  onNavigateToJobs
}) => {
  const [activeTab, setActiveTab] = useState<'advisor' | 'chatbot' | 'roadmap'>('advisor');

  // Chatbot state
  const [chatMessages, setChatMessages] = useState<
    { sender: 'ai' | 'user'; text: string; time: string }[]
  >([
    {
      sender: 'ai',
      text: `Hello ${currentUser?.name || 'Priya'}! I am your Jobskül AI Career & Technical Interview Coach. What role would you like to prepare for today (e.g. Full Stack Cloud Engineer, GenAI Developer, SAP Consultant)? You can also ask me to conduct a mock interview or review your career trajectory!`,
      time: 'Just now'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  // Career Advisor state
  const [targetRole, setTargetRole] = useState('Full Stack Cloud & Distributed Systems Engineer');
  const [targetCompanyTier, setTargetCompanyTier] = useState('Tier 1 Product / High Growth FinTech');
  const [generatedRoadmap, setGeneratedRoadmap] = useState<any>({
    readinessScore: 88,
    targetCTC: '₹14 - ₹22 LPA',
    recommendedTimeline: '6 - 8 Weeks to Placement Ready',
    milestones: [
      {
        week: 'Weeks 1-2',
        title: 'Concurrency & Microservice Architecture',
        focus: 'Asynchronous workers, message queues with Kafka/RabbitMQ, and database indexing.',
        course: 'Full Stack Python & Enterprise Cloud'
      },
      {
        week: 'Weeks 3-4',
        title: 'Distributed System Design & Caching',
        focus: 'Cache invalidation, Redis cluster configuration, and API rate limiting.',
        course: 'DSA & System Design Masterclass'
      },
      {
        week: 'Weeks 5-6',
        title: 'Production Containerization & CI/CD',
        focus: 'Docker multi-stage builds, Kubernetes ingress, and AWS deployment.',
        course: 'Full Stack Python & Enterprise Cloud'
      },
      {
        week: 'Weeks 7-8',
        title: 'Mock Interview Rounds & Corporate Drives',
        focus: 'STAR behavioral interviews, live coding sessions, and direct corporate partner placement applications.',
        course: 'Jobskül Campus Pool Drives'
      }
    ]
  });

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userText = chatInput.trim();
    const newMsg = {
      sender: 'user' as const,
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setChatInput('');
    setChatLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          userName: currentUser?.name || 'Priya',
          skills: currentUser?.skills || ['Python', 'Django', 'React', 'MySQL'],
          role: targetRole
        })
      });
      const data = await res.json();
      if (data.reply) {
        setChatMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: data.reply,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else {
        throw new Error('No reply');
      }
    } catch (e) {
      // Fallback response
      setTimeout(() => {
        let reply = `That is a great technical inquiry. For the ${targetRole} path, hiring managers consistently emphasize two core pillars: 1) Demonstrating real-world hands-on project artifacts on GitHub with automated tests, and 2) Being able to articulate query execution plans (EXPLAIN ANALYZE) and architectural trade-offs during the live technical rounds.`;
        if (userText.toLowerCase().includes('interview') || userText.toLowerCase().includes('question')) {
          reply = `Here is a popular technical question: "How would you design a distributed idempotency key mechanism for a payment gateway to ensure a user is never double-charged under network retry conditions?" Tip: Structure your response around Redis SETNX with TTL and relational transactions with unique constraint tokens.`;
        }
        setChatMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: reply,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 700);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner */}
      <div className="bg-linear-to-r from-purple-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs font-geometric-mono font-bold tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-purple-300" />
            <span>GEMINI AI POWERED CAREER AGENT</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            AI Career Advisor & Technical Interview Chatbot
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Personalized learning paths tailored to your target CTC, real-time mock interviews with adaptive follow-up questions, and intelligent skill-match recommendations.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center shrink-0 space-y-1">
          <span className="text-[10px] uppercase font-geometric-mono text-purple-200">Career Readiness</span>
          <p className="text-3xl font-black text-white">88%</p>
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 text-[11px] font-bold">
            Target: ₹14-22 LPA
          </span>
        </div>
      </div>

      {/* Nav Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('advisor')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'advisor'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>AI Career Advisor & Target CTC</span>
        </button>

        <button
          onClick={() => setActiveTab('chatbot')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'chatbot'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>Live Interview Chatbot</span>
        </button>

        <button
          onClick={() => setActiveTab('roadmap')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'roadmap'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>Personalized Learning Roadmap</span>
        </button>
      </div>

      {/* TAB 1: AI CAREER ADVISOR */}
      {activeTab === 'advisor' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-geometric-mono">
              Career Trajectory Parameters
            </h3>

            <div>
              <label className="text-xs font-bold text-slate-700">Target Engineering Role:</label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">Target Employer Category:</label>
              <select
                value={targetCompanyTier}
                onChange={(e) => setTargetCompanyTier(e.target.value)}
                className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
              >
                <option value="Tier 1 Product / High Growth FinTech">Tier 1 Product / High Growth FinTech</option>
                <option value="FAANG / Top Multinational">FAANG / Top Multinational</option>
                <option value="Enterprise IT Consulting & SIs">Enterprise IT Consulting & SIs</option>
                <option value="High-Yield Remote Global Startups">High-Yield Remote Global Startups</option>
              </select>
            </div>

            <div className="p-4 bg-purple-50/70 rounded-2xl border border-purple-200 text-xs text-purple-950 space-y-2">
              <p className="font-bold flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>AI Projection Insights:</span>
              </p>
              <p className="leading-relaxed">
                Candidates with verified Python backend and React full-stack benchmarks command a <strong>35% higher CTC</strong> in campus pool drives compared to candidates without verified capstone artifacts.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-geometric-mono text-purple-600 font-bold uppercase">
                  Adaptive AI Career Recommendation
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">{targetRole}</h3>
              </div>
              <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-geometric-mono font-black">
                {generatedRoadmap.targetCTC}
              </span>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-geometric-mono">
                Step-by-Step Milestones ({generatedRoadmap.recommendedTimeline}):
              </h4>
              <div className="space-y-3">
                {generatedRoadmap.milestones.map((m: any, idx: number) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-blue-600 font-geometric-mono">{m.week}</span>
                      <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-semibold text-slate-700">
                        {m.course}
                      </span>
                    </div>
                    <h5 className="font-bold text-slate-900 text-sm">{m.title}</h5>
                    <p className="text-slate-600 leading-relaxed">{m.focus}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end space-x-3">
              {onNavigateToCourses && (
                <button
                  onClick={onNavigateToCourses}
                  className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all shadow-md"
                >
                  Start Recommended Courses &rarr;
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INTERVIEW CHATBOT */}
      {activeTab === 'chatbot' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs flex flex-col h-[600px]">
          {/* Header */}
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center text-white">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold">Jobskül AI Interview Simulator</h4>
                <p className="text-[10px] text-purple-300">Powered by Gemini 2.5 Flash • Context: {targetRole}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setChatMessages([
                  {
                    sender: 'ai',
                    text: 'Session refreshed! Let us practice another round. What topic would you like to drill?',
                    time: 'Just now'
                  }
                ]);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              Reset Chat
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/50">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-start space-x-2.5 ${
                  msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-purple-600 text-white'
                  }`}
                >
                  {msg.sender === 'user' ? 'You' : 'AI'}
                </div>

                <div
                  className={`max-w-xl p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-2xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <span
                    className={`block text-[10px] mt-1 text-right ${
                      msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {chatLoading && (
              <div className="flex items-center space-x-2 text-xs text-purple-600 font-semibold p-2">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Jobskül AI Coach is thinking and evaluating...</span>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type your answer, or ask 'Ask me a system design question'..."
              className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            />
            <button
              type="submit"
              disabled={chatLoading || !chatInput.trim()}
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: PERSONALIZED LEARNING ROADMAP */}
      {activeTab === 'roadmap' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-xl font-black text-slate-900">Personalized Placement Pathway</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Targeted curriculum mapped to high-yield enterprise job descriptions.
            </p>
          </div>

          <div className="relative pl-6 border-l-2 border-purple-200 space-y-6 my-4">
            {[
              {
                stage: 'Phase 1: Foundations & Problem Solving',
                detail: 'DSA patterns, Time/Space complexities, standard arrays and tree algorithms.',
                status: 'Completed (100%)'
              },
              {
                stage: 'Phase 2: Full-Stack Web & Relational Database Design',
                detail: 'FastAPI / Django REST services, React 19 SPA, and MySQL query indexing.',
                status: 'In Progress (80%)'
              },
              {
                stage: 'Phase 3: Cloud Architecture & DevOps CI/CD',
                detail: 'Docker microservice containers, Kubernetes orchestration, and AWS deployments.',
                status: 'Upcoming'
              },
              {
                stage: 'Phase 4: Campus Drives & Partner Fast-Track',
                detail: 'Direct referrals into CloudSphere, FinVantage, and TCS enterprise hiring pipelines.',
                status: 'Upcoming'
              }
            ].map((p, i) => (
              <div key={i} className="relative space-y-1">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-purple-600 border-2 border-white" />
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900">{p.stage}</h4>
                  <span className="text-[10px] font-bold font-geometric-mono px-2 py-0.5 rounded bg-purple-50 text-purple-700">
                    {p.status}
                  </span>
                </div>
                <p className="text-xs text-slate-600">{p.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
