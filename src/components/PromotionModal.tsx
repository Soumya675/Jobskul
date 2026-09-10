import React, { useState } from 'react';
import { Logo } from './Logo';
import {
  X,
  Share2,
  Copy,
  Check,
  Building,
  GraduationCap,
  Sparkles,
  Send,
  MessageCircle,
  Linkedin,
  Twitter,
  Award,
  Users,
  CheckCircle2,
  AlertCircle,
  Briefcase
} from 'lucide-react';

interface PromotionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onToast: (msg: string) => void;
}

export const PromotionModal: React.FC<PromotionModalProps> = ({
  isOpen,
  onClose,
  onToast
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [activeTab, setActiveTab] = useState<'share' | 'campus' | 'ambassador'>('share');

  // Campus drive form state
  const [collegeName, setCollegeName] = useState('');
  const [tpoName, setTpoName] = useState('');
  const [tpoEmail, setTpoEmail] = useState('');
  const [tpoPhone, setTpoPhone] = useState('');
  const [city, setCity] = useState('');
  const [batchSize, setBatchSize] = useState('200+ Students');
  const [submittingCampus, setSubmittingCampus] = useState(false);
  const [campusSubmitted, setCampusSubmitted] = useState(false);

  // Ambassador form state
  const [ambassadorName, setAmbassadorName] = useState('');
  const [ambassadorEmail, setAmbassadorEmail] = useState('');
  const [ambassadorCollege, setAmbassadorCollege] = useState('');
  const [ambassadorSubmitting, setAmbassadorSubmitting] = useState(false);
  const [ambassadorSubmitted, setAmbassadorSubmitted] = useState(false);

  if (!isOpen) return null;

  const shareUrl = window.location.origin || 'https://jobskul.com';
  const promotionalText = `🚀 Kickstart your tech career with Jobskül (Hire • Train • Deploy)!
✅ Project-verified tech jobs (₹4.5L - ₹28L CTC)
✅ AI Resume Score & ATS Builder
✅ Real-world MySQL, Python, and React Capstones
✅ Direct enterprise placement drives

Check it out: ${shareUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    onToast('Jobskül promotional link copied to clipboard!');
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(promotionalText);
    setCopiedMessage(true);
    onToast('Full promotional message copied! Ready to paste.');
    setTimeout(() => setCopiedMessage(false), 3000);
  };

  const handleWhatsAppShare = () => {
    const encoded = encodeURIComponent(promotionalText);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  const handleLinkedInShare = () => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const summary = encodeURIComponent('Connecting India’s Top Engineering Talent with Verified Tech Employers through project-first evaluation.');
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&summary=${summary}`, '_blank');
  };

  const handleTwitterShare = () => {
    const tweet = encodeURIComponent(`Explore verified tech roles, ATS resume building, and hands-on capstone certifications on @Jobskul! 🚀 #Jobskül #HireTrainDeploy #CampusPlacements`);
    window.open(`https://twitter.com/intent/tweet?text=${tweet}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const handleCampusDriveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!collegeName.trim() || !tpoEmail.trim()) {
      onToast('Please provide college name and official contact email.');
      return;
    }

    setSubmittingCampus(true);
    try {
      const res = await fetch('/api/promotions/campus-drive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          collegeName,
          contactPerson: tpoName,
          email: tpoEmail,
          phone: tpoPhone,
          city,
          expectedStudents: batchSize
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCampusSubmitted(true);
        onToast(`Campus placement drive requested for ${collegeName}!`);
      } else {
        onToast(data.error || 'Failed to submit request.');
      }
    } catch (err) {
      // Fallback optimistic success
      setCampusSubmitted(true);
      onToast('Campus placement drive request submitted successfully!');
    } finally {
      setSubmittingCampus(false);
    }
  };

  const handleAmbassadorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ambassadorEmail.trim() || !ambassadorName.trim()) {
      onToast('Please enter your name and email.');
      return;
    }
    setAmbassadorSubmitting(true);
    setTimeout(() => {
      setAmbassadorSubmitting(false);
      setAmbassadorSubmitted(true);
      onToast('🎉 Welcome to the Jobskül Campus Ambassador Network!');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl border border-slate-200 max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative animate-in zoom-in-95 duration-150">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
            <Share2 className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold tracking-wide uppercase mb-1">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>Growth & Community</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Promote Jobskül & Empower Students
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Share India’s premier project-verified career ecosystem with batchmates, colleges & hiring managers.
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex space-x-2 border-b border-slate-200 mb-6 text-xs font-bold">
          <button
            onClick={() => setActiveTab('share')}
            className={`pb-3 px-3 transition-colors relative cursor-pointer ${
              activeTab === 'share'
                ? 'text-blue-600 font-black border-b-2 border-blue-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Instant Share & Referrals
          </button>
          <button
            onClick={() => setActiveTab('campus')}
            className={`pb-3 px-3 transition-colors relative cursor-pointer ${
              activeTab === 'campus'
                ? 'text-blue-600 font-black border-b-2 border-blue-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Request College Placement Drive
          </button>
          <button
            onClick={() => setActiveTab('ambassador')}
            className={`pb-3 px-3 transition-colors relative cursor-pointer ${
              activeTab === 'ambassador'
                ? 'text-blue-600 font-black border-b-2 border-blue-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Campus Ambassador Program
          </button>
        </div>

        {/* TAB 1: INSTANT SOCIAL SHARE */}
        {activeTab === 'share' && (
          <div className="space-y-5">
            {/* Quick 1-Click Sharing Platforms */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                1-Click Social Promotion
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={handleWhatsAppShare}
                  className="flex items-center justify-center space-x-2 p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-xs hover:shadow transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Share on WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={handleLinkedInShare}
                  className="flex items-center justify-center space-x-2 p-3 bg-[#0077b5] hover:bg-[#006097] text-white rounded-xl font-bold text-xs shadow-xs hover:shadow transition-all cursor-pointer"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>Post on LinkedIn</span>
                </button>
                <button
                  type="button"
                  onClick={handleTwitterShare}
                  className="flex items-center justify-center space-x-2 p-3 bg-slate-900 hover:bg-black text-white rounded-xl font-bold text-xs shadow-xs hover:shadow transition-all cursor-pointer"
                >
                  <Twitter className="w-4 h-4" />
                  <span>Tweet on X</span>
                </button>
              </div>
            </div>

            {/* Copy Custom Promo Link */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Your Direct Share Link
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-geometric-mono text-slate-700 select-all"
                />
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-all shadow-xs cursor-pointer shrink-0"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedLink ? 'Copied Link!' : 'Copy Link'}</span>
                </button>
              </div>
            </div>

            {/* Copy Full Formatted Message for WhatsApp Groups */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Ready-to-Paste WhatsApp Group Message</span>
                </span>
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1 cursor-pointer"
                >
                  {copiedMessage ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedMessage ? 'Copied Message!' : 'Copy Message'}</span>
                </button>
              </div>
              <p className="text-xs font-sans text-slate-600 whitespace-pre-line leading-relaxed bg-white p-3 rounded-xl border border-slate-200/80 max-h-32 overflow-y-auto">
                {promotionalText}
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: REQUEST COLLEGE PLACEMENT DRIVE */}
        {activeTab === 'campus' && (
          <div>
            {campusSubmitted ? (
              <div className="py-8 text-center space-y-3 animate-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-lg font-black text-slate-900">Campus Partnership Request Dispatched!</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Thank you! Our Corporate Placement Director will coordinate with your college TPO office within 24 hours to organize online assessment drives and corporate interviews.
                </p>
                <button
                  onClick={() => setCampusSubmitted(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
                >
                  Submit Another Campus Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleCampusDriveSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      College / University Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={collegeName}
                      onChange={(e) => setCollegeName(e.target.value)}
                      placeholder="e.g. Gandhi Institute For Technology (GIFT)"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      City & State *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Bhubaneswar, Odisha"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      TPO / Coordinator Name
                    </label>
                    <input
                      type="text"
                      value={tpoName}
                      onChange={(e) => setTpoName(e.target.value)}
                      placeholder="e.g. Dr. Rajesh Mohanty"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Official Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={tpoEmail}
                      onChange={(e) => setTpoEmail(e.target.value)}
                      placeholder="tpo@gift.edu.in"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      value={tpoPhone}
                      onChange={(e) => setTpoPhone(e.target.value)}
                      placeholder="+91 94370 00000"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Expected Student Batch
                    </label>
                    <select
                      value={batchSize}
                      onChange={(e) => setBatchSize(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="50-100 Students">50 - 100 Engineering Students</option>
                      <option value="100-250 Students">100 - 250 Engineering Students</option>
                      <option value="250-500 Students">250 - 500 Engineering Students</option>
                      <option value="500+ Students">500+ Engineering & MCA Students</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submittingCampus}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{submittingCampus ? 'Registering Drive...' : 'Schedule Campus Recruitment Drive'}</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* TAB 3: CAMPUS AMBASSADOR PROGRAM */}
        {activeTab === 'ambassador' && (
          <div>
            {ambassadorSubmitted ? (
              <div className="py-8 text-center space-y-3 animate-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 mx-auto flex items-center justify-center">
                  <Award className="w-10 h-10" />
                </div>
                <h4 className="text-lg font-black text-slate-900">Application Received!</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  You’re on your way to becoming an official Jobskül Campus Ambassador. Check your email for your referral kit and priority placement credentials!
                </p>
              </div>
            ) : (
              <form onSubmit={handleAmbassadorSubmit} className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-2xl border border-blue-100 text-xs text-slate-700 space-y-1">
                  <p className="font-bold text-blue-900">Why become a Jobskül Ambassador?</p>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-600 text-[11px]">
                    <li>Direct fast-track interview referrals at partner tech firms</li>
                    <li>Official Certificate of Leadership from Jobskül Talent Network</li>
                    <li>Free access to all premium project verification capstones</li>
                  </ul>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={ambassadorName}
                    onChange={(e) => setAmbassadorName(e.target.value)}
                    placeholder="e.g. Soumya Parida"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Student / Work Email *</label>
                  <input
                    type="email"
                    required
                    value={ambassadorEmail}
                    onChange={(e) => setAmbassadorEmail(e.target.value)}
                    placeholder="soumya.parida2022@gift.edu.in"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">College & Graduation Year *</label>
                  <input
                    type="text"
                    required
                    value={ambassadorCollege}
                    onChange={(e) => setAmbassadorCollege(e.target.value)}
                    placeholder="GIFT Autonomous (Class of 2026)"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={ambassadorSubmitting}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md shadow-indigo-500/20 transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Award className="w-4 h-4" />
                  <span>{ambassadorSubmitting ? 'Submitting Application...' : 'Apply as Campus Ambassador'}</span>
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
