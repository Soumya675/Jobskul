import React, { useState } from 'react';
import { Mentor, ForumTopic, User } from '../types';
import {
  Users,
  MessageSquare,
  Star,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
  Filter,
  Plus,
  ThumbsUp,
  Award,
  ExternalLink,
  Check
} from 'lucide-react';

interface MentorshipCommunityHubProps {
  mentors: Mentor[];
  forumTopics: ForumTopic[];
  currentUser: User | null;
}

export const MentorshipCommunityHub: React.FC<MentorshipCommunityHubProps> = ({
  mentors,
  forumTopics,
  currentUser
}) => {
  const [activeTab, setActiveTab] = useState<'mentorship' | 'community'>('mentorship');

  // Mentorship Booking State
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [bookingSlot, setBookingSlot] = useState<string>('Tomorrow, 05:00 PM IST');
  const [bookingTopic, setBookingTopic] = useState<string>('System Design Mock Interview');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Forum State
  const [topics, setTopics] = useState<ForumTopic[]>(forumTopics);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [newPostModalOpen, setNewPostModalOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostCategory, setNewPostCategory] = useState<ForumTopic['category']>('Tech Doubts');
  const [newPostContent, setNewPostContent] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleUpvote = (topicId: string) => {
    setTopics((prev) =>
      prev.map((t) => (t.id === topicId ? { ...t, upvotes: t.upvotes + 1 } : t))
    );
    showToast('Upvoted community question!');
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const newTopic: ForumTopic = {
      id: `post-${Date.now()}`,
      title: newPostTitle,
      category: newPostCategory,
      author: {
        name: currentUser?.name || 'Priya Sharma',
        role: currentUser?.role === 'candidate' ? 'Candidate' : 'Student',
        college: currentUser?.collegeName || 'GIFT University, Bhubaneswar'
      },
      content: newPostContent,
      tags: ['Discussion', 'Community'],
      createdAt: 'Just now',
      upvotes: 1,
      repliesCount: 0,
      isSolved: false
    };

    setTopics([newTopic, ...topics]);
    setNewPostTitle('');
    setNewPostContent('');
    setNewPostModalOpen(false);
    showToast('Your question was posted to the community forum!');
  };

  const filteredTopics = topics.filter((t) => {
    if (selectedCategory !== 'All' && t.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Banner */}
      <div className="bg-linear-to-r from-blue-900 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-geometric-mono font-bold tracking-wider">
            <Users className="w-3.5 h-3.5 text-blue-300" />
            <span>EXPERT NETWORK & PEER COMMUNITY</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            1-to-1 Industry Mentorship & Student Discussion Forum
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Book 1-on-1 counseling and technical mock interviews with staff engineers from Google, Amazon, Microsoft and Deloitte. Resolve doubts and share placement interview experiences with 15,000+ active student peers.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => setActiveTab('mentorship')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'mentorship'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            Book 1-on-1 Mentor
          </button>
          <button
            onClick={() => setActiveTab('community')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'community'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            Discussion Forum
          </button>
        </div>
      </div>

      {/* TAB 1: MENTORSHIP BOOKING */}
      {activeTab === 'mentorship' && (
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900">Verified Technical & HR Mentors</h2>
              <p className="text-xs text-slate-500">Select an expert for resume critique, architectural review, or mock interviews.</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl">
              100% Satisfaction Guaranteed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mentors.map((m) => (
              <div
                key={m.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <img
                      src={m.avatar}
                      alt={m.name}
                      className="w-14 h-14 rounded-2xl object-cover shadow-2xs"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-extrabold text-slate-900">{m.name}</h3>
                      <p className="text-xs text-blue-600 font-semibold">{m.company}</p>
                      <p className="text-[11px] text-slate-500">{m.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                    <span className="flex items-center space-x-1 font-bold text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span>{m.rating}</span>
                      <span className="text-slate-400 font-normal">({m.sessionsCompleted} sessions)</span>
                    </span>
                    <span className="font-geometric-mono text-emerald-700 font-bold">{m.experienceYears}+ Yrs Exp</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{m.bio}</p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {m.expertise.map((exp) => (
                      <span key={exp} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px]">
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900 font-geometric-mono">
                    {m.hourlyRate}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedMentor(m);
                      setBookingSuccess(false);
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
                  >
                    Book Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: DISCUSSION FORUM */}
      {activeTab === 'community' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {['All', 'Tech Doubts', 'LeetCode & DSA', 'Interview Experiences', 'Resume Review'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-purple-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              onClick={() => setNewPostModalOpen(true)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Ask a Question</span>
            </button>
          </div>

          <div className="space-y-4">
            {filteredTopics.map((topic) => (
              <div
                key={topic.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-2xs hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-purple-50 text-purple-700 text-[10px] font-bold">
                        {topic.category}
                      </span>
                      {topic.isSolved && (
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold flex items-center space-x-1">
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Solved</span>
                        </span>
                      )}
                      <span className="text-slate-400 text-xs">• {topic.createdAt}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {topic.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => handleUpvote(topic.id)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-purple-700 rounded-xl border border-slate-200 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{topic.upvotes}</span>
                  </button>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{topic.content}</p>

                {/* Answers Stream */}
                {topic.replies && topic.replies.length > 0 && (
                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-geometric-mono">
                      Verified Mentor Responses:
                    </p>
                    {topic.replies.map((rep) => (
                      <div
                        key={rep.id}
                        className={`p-3.5 rounded-2xl text-xs space-y-1 ${
                          rep.isAcceptedSolution
                            ? 'bg-emerald-50/70 border border-emerald-200 text-emerald-950'
                            : 'bg-slate-50 border border-slate-200 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold">{rep.author} ({rep.role})</span>
                          {rep.isAcceptedSolution && (
                            <span className="px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-bold">
                              Accepted Solution
                            </span>
                          )}
                        </div>
                        <p className="leading-relaxed">{rep.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BOOKING MODAL */}
      {selectedMentor && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl animate-in fade-in">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-3">
                <img src={selectedMentor.avatar} alt={selectedMentor.name} className="w-10 h-10 rounded-xl object-cover" />
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedMentor.name}</h3>
                  <p className="text-xs text-blue-600">{selectedMentor.company}</p>
                </div>
              </div>
              <button onClick={() => setSelectedMentor(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            {!bookingSuccess ? (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700">Select Discussion Focus:</label>
                  <select
                    value={bookingTopic}
                    onChange={(e) => setBookingTopic(e.target.value)}
                    className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  >
                    <option value="System Design Mock Interview">System Design Mock Interview (45 Mins)</option>
                    <option value="FAANG DSA Live Problem Solving">FAANG DSA Live Problem Solving</option>
                    <option value="ATS Resume & Portfolio Review">ATS Resume & Portfolio Review</option>
                    <option value="Executive Career Counseling & Salary Strategy">Executive Career Counseling & Salary Strategy</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700">Available Slot:</label>
                  <select
                    value={bookingSlot}
                    onChange={(e) => setBookingSlot(e.target.value)}
                    className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  >
                    <option value="Tomorrow, 05:00 PM IST">Tomorrow, 05:00 PM - 05:45 PM IST</option>
                    <option value="Saturday, 11:00 AM IST">Saturday, 11:00 AM - 11:45 AM IST</option>
                    <option value="Sunday, 04:00 PM IST">Sunday, 04:00 PM - 04:45 PM IST</option>
                  </select>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex justify-between items-center">
                  <span className="text-slate-600">Session Fee:</span>
                  <span className="font-black text-slate-900 font-geometric-mono">{selectedMentor.hourlyRate}</span>
                </div>

                <div className="pt-2 flex justify-end space-x-2">
                  <button
                    onClick={() => setSelectedMentor(null)}
                    className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setBookingSuccess(true);
                      showToast('Mentorship session confirmed! Google Meet invite dispatched.');
                    }}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md"
                  >
                    Confirm & Book
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-slate-900">Session Confirmed!</h4>
                <p className="text-xs text-slate-500">
                  Google Meet link has been emailed to {currentUser?.email || 'priya.sharma@example.com'} for {bookingSlot}.
                </p>
                <button
                  onClick={() => setSelectedMentor(null)}
                  className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold mt-2"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ASK QUESTION MODAL */}
      {newPostModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleCreatePost} className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Ask a Question in Discussion Forum</h3>
              <button type="button" onClick={() => setNewPostModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">Question Title *</label>
              <input
                type="text"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                placeholder="e.g. How to structure Redis cache invalidation in Django?"
                className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">Category</label>
              <select
                value={newPostCategory}
                onChange={(e) => setNewPostCategory(e.target.value as any)}
                className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              >
                <option value="Tech Doubts">Tech Doubts</option>
                <option value="LeetCode & DSA">LeetCode & DSA</option>
                <option value="Interview Experiences">Interview Experiences</option>
                <option value="Resume Review">Resume Review</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">Description & Context *</label>
              <textarea
                rows={4}
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="Provide code snippet, error messages, and what approaches you have already tried..."
                className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                required
              />
            </div>

            <div className="pt-2 flex justify-end space-x-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setNewPostModalOpen(false)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-md"
              >
                Post to Forum
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
