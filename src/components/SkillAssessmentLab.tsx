import React, { useState, useEffect } from 'react';
import { AssessmentQuestion, CodingProblem, User } from '../types';
import {
  Code,
  Terminal,
  Play,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  TrendingUp,
  Brain,
  MessageSquare,
  Database,
  ArrowRight,
  RotateCcw,
  Check,
  X,
  Award
} from 'lucide-react';

interface SkillAssessmentLabProps {
  questions: AssessmentQuestion[];
  codingProblems: CodingProblem[];
  currentUser: User | null;
  onNavigateToCourses?: () => void;
  onNavigateToJobs?: () => void;
}

export const SkillAssessmentLab: React.FC<SkillAssessmentLabProps> = ({
  questions,
  codingProblems,
  currentUser,
  onNavigateToCourses,
  onNavigateToJobs
}) => {
  const [activeTab, setActiveTab] = useState<'coding' | 'mcq' | 'sql' | 'communication' | 'gap-analysis'>('coding');

  // 1. Coding Lab State
  const [selectedProblem, setSelectedProblem] = useState<CodingProblem>(codingProblems[0]);
  const [codeLanguage, setCodeLanguage] = useState<'javascript' | 'python'>('javascript');
  const [codeSnippet, setCodeSnippet] = useState<string>(codingProblems[0].starterCode.javascript);
  const [runOutput, setRunOutput] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<{ passed: boolean; test: string; output: string }[]>([]);
  const [codeRunning, setCodeRunning] = useState(false);

  // 2. MCQ State
  const [currentMcqIndex, setCurrentMcqIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [mcqSubmitted, setMcqSubmitted] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(600); // 10 mins

  // 3. SQL Practice Lab State
  const [sqlQuery, setSqlQuery] = useState<string>(
    'SELECT u.name, COUNT(o.id) AS total_orders, SUM(o.amount) AS total_spent\nFROM users u\nJOIN orders o ON u.id = o.user_id\nGROUP BY u.name\nHAVING total_spent > 5000\nORDER BY total_spent DESC;'
  );
  const [sqlResults, setSqlResults] = useState<any[] | null>([
    { name: 'Priya Sharma', total_orders: 14, total_spent: '₹42,800' },
    { name: 'Rahul Mehta', total_orders: 8, total_spent: '₹28,500' },
    { name: 'Ananya Verma', total_orders: 6, total_spent: '₹19,200' },
    { name: 'Vikramaditya K.', total_orders: 4, total_spent: '₹12,400' }
  ]);

  // 4. Communication & GD Scenario State
  const [gdScenarioIndex, setGdScenarioIndex] = useState(0);
  const [gdTimer, setGdTimer] = useState(180);
  const [isRecording, setIsRecording] = useState(false);
  const [speechFeedback, setSpeechFeedback] = useState<string | null>(null);

  // Timer countdown
  useEffect(() => {
    if (mcqSubmitted) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [mcqSubmitted]);

  // Handle problem change
  const handleSelectProblem = (prob: CodingProblem) => {
    setSelectedProblem(prob);
    setCodeSnippet(codeLanguage === 'javascript' ? prob.starterCode.javascript : prob.starterCode.python);
    setRunOutput(null);
    setTestResults([]);
  };

  const handleRunCode = () => {
    setCodeRunning(true);
    setTimeout(() => {
      setCodeRunning(false);
      setRunOutput(`> Code executed in 14ms (Memory: 32.4MB)\n✓ Sample Test 1 Passed\n✓ Sample Test 2 Passed\n✓ Sample Test 3 Passed\nAll 3/3 test assertions validated successfully.`);
      setTestResults([
        { passed: true, test: selectedProblem.sampleTestCases[0].input, output: selectedProblem.sampleTestCases[0].expectedOutput },
        { passed: true, test: selectedProblem.sampleTestCases[1].input, output: selectedProblem.sampleTestCases[1].expectedOutput },
        { passed: true, test: selectedProblem.sampleTestCases[2]?.input || 'Edge Case: Empty Array', output: selectedProblem.sampleTestCases[2]?.expectedOutput || '[]' }
      ]);
    }, 650);
  };

  const calculateMcqScore = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctOptionIndex) {
        correct++;
      }
    });
    return {
      correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100)
    };
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner */}
      <div className="bg-linear-to-r from-slate-900 via-indigo-950 to-blue-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-geometric-mono font-bold tracking-wider">
            <Brain className="w-3.5 h-3.5 text-blue-300" />
            <span>PRACTICE LAB & ASSESSMENT MATRIX</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Code, Query & Practice Like You Are in a Real Interview
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Test yourself against hiring criteria from top tech firms: solve live coding problems, run SQL sandbox queries, practice aptitude MCQs with countdown clocks, and benchmark your skill readiness.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center shrink-0 space-y-1">
          <span className="text-[10px] uppercase font-geometric-mono text-blue-200">Current Skill Score</span>
          <p className="text-3xl font-black text-white">880 <span className="text-sm font-normal text-slate-300">/ 1000</span></p>
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 text-[11px] font-bold">
            Top 5% Jobskül Rank
          </span>
        </div>
      </div>

      {/* Nav Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'coding', label: 'Coding Lab IDE', icon: Code },
          { id: 'mcq', label: 'Technical & Aptitude MCQ Test', icon: Brain },
          { id: 'sql', label: 'SQL Query Sandbox', icon: Database },
          { id: 'communication', label: 'Communication & GD Practice', icon: MessageSquare },
          { id: 'gap-analysis', label: 'AI Skill-Gap Analysis', icon: TrendingUp }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: CODING LAB IDE */}
      {activeTab === 'coding' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Problem Selector & Description (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 space-y-5 shadow-2xs">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-geometric-mono">
                Coding Problems
              </h3>
              <span className="text-xs font-bold text-emerald-600">3 Verified Challenges</span>
            </div>

            {/* Problem Pills */}
            <div className="space-y-2">
              {codingProblems.map((prob) => (
                <button
                  key={prob.id}
                  onClick={() => handleSelectProblem(prob)}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between cursor-pointer ${
                    selectedProblem.id === prob.id
                      ? 'bg-blue-50 border-blue-500 font-bold text-blue-900 shadow-2xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <p className="truncate">{prob.title}</p>
                    <p className="text-[10px] text-slate-400 font-normal">{prob.category}</p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                      prob.difficulty === 'Easy'
                        ? 'bg-emerald-100 text-emerald-800'
                        : prob.difficulty === 'Medium'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {prob.difficulty}
                  </span>
                </button>
              ))}
            </div>

            {/* Active Problem Specs */}
            <div className="pt-3 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-extrabold text-slate-900">{selectedProblem.title}</h4>
                <span className="text-[11px] font-bold text-slate-500">
                  Acceptance: {selectedProblem.acceptanceRate}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedProblem.description}
              </p>

              <div className="space-y-2 pt-2">
                <p className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">Sample Test Cases:</p>
                {selectedProblem.sampleTestCases.map((tc, i) => (
                  <div key={i} className="p-2.5 bg-slate-50 rounded-lg text-[11px] font-geometric-mono border border-slate-200">
                    <p className="text-slate-500">Input: <span className="text-slate-900 font-bold">{tc.input}</span></p>
                    <p className="text-slate-500">Expected: <span className="text-emerald-700 font-bold">{tc.expectedOutput}</span></p>
                  </div>
                ))}
              </div>

              {selectedProblem.hints.length > 0 && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
                  <p className="font-bold flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Algorithm Hint:</span>
                  </p>
                  <p className="text-[11px]">{selectedProblem.hints[0]}</p>
                </div>
              )}
            </div>
          </div>

          {/* Code Editor & Test Runner (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl flex flex-col">
            {/* IDE Toolbar */}
            <div className="p-3 bg-slate-950 flex items-center justify-between border-b border-slate-800 text-white">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs font-geometric-mono font-bold text-slate-300 ml-2">
                  code_editor.{codeLanguage === 'javascript' ? 'js' : 'py'}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <select
                  value={codeLanguage}
                  onChange={(e) => {
                    const lang = e.target.value as 'javascript' | 'python';
                    setCodeLanguage(lang);
                    setCodeSnippet(lang === 'javascript' ? selectedProblem.starterCode.javascript : selectedProblem.starterCode.python);
                  }}
                  className="bg-slate-800 border border-slate-700 rounded-lg text-xs font-geometric-mono px-2.5 py-1 text-slate-200"
                >
                  <option value="javascript">JavaScript (Node v20)</option>
                  <option value="python">Python 3.12</option>
                </select>

                <button
                  onClick={handleRunCode}
                  disabled={codeRunning}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>{codeRunning ? 'Running...' : 'Run Tests'}</span>
                </button>
              </div>
            </div>

            {/* Code Input Area */}
            <div className="p-4 bg-slate-900">
              <textarea
                rows={12}
                value={codeSnippet}
                onChange={(e) => setCodeSnippet(e.target.value)}
                className="w-full bg-transparent font-geometric-mono text-xs sm:text-sm text-emerald-400 focus:outline-none resize-none leading-relaxed"
                spellCheck={false}
              />
            </div>

            {/* Terminal Output */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 font-geometric-mono">
                <span className="flex items-center space-x-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Execution Output Console</span>
                </span>
                {testResults.length > 0 && (
                  <span className="text-emerald-400 font-bold">✓ 3 of 3 Passed (100%)</span>
                )}
              </div>

              {runOutput ? (
                <pre className="p-3 bg-slate-900 rounded-xl font-geometric-mono text-xs text-slate-300 overflow-x-auto whitespace-pre-wrap border border-slate-800">
                  {runOutput}
                </pre>
              ) : (
                <p className="text-xs text-slate-600 font-geometric-mono">
                  Click &ldquo;Run Tests&rdquo; to execute test suites and measure time complexity.
                </p>
              )}

              {testResults.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  {testResults.map((t, idx) => (
                    <div key={idx} className="p-2 bg-emerald-950/40 border border-emerald-800/80 rounded-lg text-[10px] font-geometric-mono text-emerald-300">
                      <p className="font-bold flex items-center space-x-1">
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>Test Case {idx + 1}: Passed</span>
                      </p>
                      <p className="truncate text-slate-400 mt-0.5">{t.test}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TECHNICAL & APTITUDE MCQ TEST */}
      {activeTab === 'mcq' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-geometric-mono font-bold uppercase">
                Timed Cognitive & Technical Benchmark
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Full-Stack Architecture & Aptitude Screening Test
              </h3>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-geometric-mono font-bold">
                <Clock className="w-4 h-4" />
                <span>Time Remaining: {formatTimer(timerSeconds)}</span>
              </div>
            </div>
          </div>

          {!mcqSubmitted ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Question {currentMcqIndex + 1} of {questions.length}</span>
                <span className="font-geometric-mono font-bold text-blue-600">
                  {questions[currentMcqIndex].category} • {questions[currentMcqIndex].difficulty}
                </span>
              </div>

              {/* Active Question Box */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-4">
                <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  {questions[currentMcqIndex].question}
                </h4>

                <div className="space-y-2">
                  {questions[currentMcqIndex].options.map((option, optIdx) => {
                    const qId = questions[currentMcqIndex].id;
                    const isSelected = selectedAnswers[qId] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => setSelectedAnswers({ ...selectedAnswers, [qId]: optIdx })}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center space-x-3 cursor-pointer ${
                          isSelected
                            ? 'bg-blue-50/80 border-blue-500 text-blue-900 font-bold ring-2 ring-blue-500/20'
                            : 'bg-white border-slate-200 hover:bg-slate-100/60 text-slate-700'
                        }`}
                      >
                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                          isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="flex-1">{option}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  disabled={currentMcqIndex === 0}
                  onClick={() => setCurrentMcqIndex(currentMcqIndex - 1)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
                >
                  Previous
                </button>

                {currentMcqIndex < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentMcqIndex(currentMcqIndex + 1)}
                    className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-md"
                  >
                    Next Question
                  </button>
                ) : (
                  <button
                    onClick={() => setMcqSubmitted(true)}
                    className="px-6 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 shadow-md"
                  >
                    Submit Test Assessment
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Result Score Card */
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-xl font-black text-slate-900">
                  Assessment Completed! Score: {calculateMcqScore().percentage}%
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  You answered {calculateMcqScore().correct} of {calculateMcqScore().total} questions accurately.
                </p>
              </div>

              <div className="inline-block p-4 bg-white rounded-xl border border-slate-200 text-left text-xs space-y-1">
                <p className="text-slate-600">Percentile among campus candidates: <strong className="text-emerald-600 font-geometric-mono">92nd Percentile</strong></p>
                <p className="text-slate-600">Verified Skill Badges Earned: <strong>Database Optimization & System Architecture</strong></p>
              </div>

              <div className="pt-2 flex justify-center space-x-3">
                <button
                  onClick={() => {
                    setMcqSubmitted(false);
                    setSelectedAnswers({});
                    setCurrentMcqIndex(0);
                    setTimerSeconds(600);
                  }}
                  className="px-4 py-2 border border-slate-200 bg-white rounded-xl text-xs font-bold text-slate-700"
                >
                  Retake Assessment
                </button>
                {onNavigateToJobs && (
                  <button
                    onClick={onNavigateToJobs}
                    className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700"
                  >
                    Apply to Matching Jobs
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SQL QUERY SANDBOX */}
      {activeTab === 'sql' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-geometric-mono font-bold uppercase">
                Interactive Relational Sandbox
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-1">SQL Query Practice Lab</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Practice complex JOINs, GROUP BY, aggregations, and window functions on sample enterprise schemas.
              </p>
            </div>
            <button
              onClick={() => {
                setSqlResults([
                  { name: 'Priya Sharma', total_orders: 14, total_spent: '₹42,800' },
                  { name: 'Rahul Mehta', total_orders: 8, total_spent: '₹28,500' }
                ]);
              }}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Execute SQL Query</span>
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Write SQL Query (PostgreSQL / MySQL):</label>
            <textarea
              rows={5}
              value={sqlQuery}
              onChange={(e) => setSqlQuery(e.target.value)}
              className="w-full p-4 bg-slate-950 text-emerald-400 font-geometric-mono text-xs sm:text-sm rounded-2xl border border-slate-800 focus:outline-none resize-none leading-relaxed"
            />
          </div>

          {/* Results Table */}
          {sqlResults && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-bold text-slate-900">Query Output Matrix ({sqlResults.length} Rows returned in 3.2ms)</span>
                <span className="text-emerald-600 font-bold">✓ Index Used: idx_orders_user_id</span>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700 uppercase font-geometric-mono border-b border-slate-200">
                    <tr>
                      <th className="p-3">Customer Name</th>
                      <th className="p-3">Total Orders</th>
                      <th className="p-3">Total Spent</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-geometric-mono">
                    {sqlResults.map((r, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="p-3 font-sans font-bold text-slate-900">{r.name}</td>
                        <td className="p-3 text-slate-700">{r.total_orders}</td>
                        <td className="p-3 font-bold text-emerald-700">{r.total_spent}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: COMMUNICATION & GD PRACTICE */}
      {activeTab === 'communication' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="border-b border-slate-100 pb-4">
            <span className="px-2.5 py-0.5 rounded bg-purple-50 text-purple-700 text-[10px] font-geometric-mono font-bold uppercase">
              Corporate HR & Group Discussion Trainer
            </span>
            <h3 className="text-xl font-black text-slate-900 mt-1">
              Communication & Group Discussion (GD) Simulator
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Hiring managers screen candidates for articulation, conflict resolution, and technical conciseness. Practice structured prompts with instant AI evaluation.
            </p>
          </div>

          <div className="p-5 bg-purple-50/60 rounded-2xl border border-purple-200/80 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-900 uppercase tracking-wider">
                Active GD Prompt #{gdScenarioIndex + 1}
              </span>
              <span className="text-xs font-bold text-purple-700 bg-white px-2.5 py-1 rounded-lg border border-purple-200">
                Recommended Speaking Time: 2 Mins
              </span>
            </div>

            <h4 className="text-base font-extrabold text-slate-900">
              &ldquo;Artificial Intelligence in Corporate Hiring: Does algorithmic screening reduce human bias or amplify historical prejudice?&rdquo;
            </h4>

            <div className="p-3 bg-white rounded-xl border border-purple-100 text-xs text-slate-600 space-y-1">
              <p className="font-bold text-slate-800">Suggested Framework (STAR & Multi-Perspective):</p>
              <p>• Acknowledge both sides: efficiency & scaling vs training data bias risks</p>
              <p>• Propose balanced solution: human-in-the-loop with auditable model metrics</p>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                onClick={() => {
                  setIsRecording(!isRecording);
                  if (!isRecording) {
                    setSpeechFeedback(null);
                  } else {
                    setSpeechFeedback(
                      'AI Speech Evaluation: Fluency Score: 88/100 • Vocabulary: Strong • Filler words count: Low • Articulation: Clear and structured. Good transition between pros and cons.'
                    );
                  }
                }}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer ${
                  isRecording
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                <span>{isRecording ? '⏹ Stop Speaking & Evaluate' : '🎙 Start Speaking Practice'}</span>
              </button>

              <button
                onClick={() => setGdScenarioIndex((gdScenarioIndex + 1) % 3)}
                className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 cursor-pointer"
              >
                Next GD Topic &rarr;
              </button>
            </div>

            {speechFeedback && (
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
                <p className="font-bold flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Speech Analysis Report:</span>
                </p>
                <p>{speechFeedback}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 5: AI SKILL-GAP ANALYSIS */}
      {activeTab === 'gap-analysis' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="border-b border-slate-100 pb-4">
            <span className="px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-geometric-mono font-bold uppercase">
              Role Readiness Benchmark
            </span>
            <h3 className="text-xl font-black text-slate-900 mt-1">Target Role: Associate Cloud Software Engineer</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Based on your projects, assessments, and GitHub profile compared to 32+ verified partner job descriptions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strong Skills */}
            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3">
              <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Verified Match Skills (High Proficiency)</span>
              </h4>
              <div className="space-y-2 text-xs">
                {[
                  { skill: 'Python & Django Architecture', score: '95%' },
                  { skill: 'React 19 & State Flow', score: '90%' },
                  { skill: 'Relational Database (MySQL / Postgres)', score: '92%' },
                  { skill: 'RESTful Microservices', score: '88%' }
                ].map((s) => (
                  <div key={s.skill} className="flex items-center justify-between p-2 bg-white rounded-lg border border-emerald-100">
                    <span className="font-semibold text-slate-800">{s.skill}</span>
                    <span className="font-bold text-emerald-700 font-geometric-mono">{s.score}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gap Skills */}
            <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center space-x-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Identified Skill Gaps (Action Required)</span>
              </h4>
              <div className="space-y-2 text-xs">
                {[
                  { skill: 'Docker Containerization & CI/CD', current: '55%', req: '80%', course: 'Full Stack Python & Cloud' },
                  { skill: 'Distributed Caching (Redis)', current: '40%', req: '75%', course: 'DSA & System Design' }
                ].map((g) => (
                  <div key={g.skill} className="p-2.5 bg-white rounded-lg border border-amber-200/80 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">{g.skill}</span>
                      <span className="text-[10px] text-amber-700 font-bold">Current: {g.current} (Req: {g.req})</span>
                    </div>
                    <p className="text-[11px] text-blue-600 font-medium">Recommended: {g.course}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
