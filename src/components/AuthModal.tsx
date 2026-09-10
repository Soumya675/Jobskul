import React, { useState, useEffect, useRef } from 'react';
import { Logo } from './Logo';
import { User, UserRole } from '../types';
import {
  X,
  Lock,
  Mail,
  User as UserIcon,
  Building2,
  CheckCircle2,
  Shield,
  ArrowRight,
  RefreshCw,
  Sparkles,
  KeyRound,
  AlertCircle
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  initialRole?: UserRole;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialRole = 'candidate',
}) => {
  // Steps: 'email' | 'otp' | 'success'
  const [step, setStep] = useState<'email' | 'otp' | 'success'>('email');
  const [role, setRole] = useState<UserRole>(initialRole);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [otpPreviewHelper, setOtpPreviewHelper] = useState<string | null>(null);

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer countdown for resend
  useEffect(() => {
    let timer: any;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // Focus first OTP input when moving to OTP step
  useEffect(() => {
    if (step === 'otp') {
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 100);
    }
  }, [step]);

  if (!isOpen) return null;

  // Step 1: Send OTP code
  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    setInfoMsg('');

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      setErrorMsg('Please enter your email address to continue.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setErrorMsg('Please provide a valid email format (e.g. name@gmail.com).');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: cleanEmail,
          role,
          name: name.trim() || undefined
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to dispatch verification code.');
      }

      setStep('otp');
      setResendCooldown(30);
      setInfoMsg(`Verification code sent to ${cleanEmail}`);
      if (data.otpPreview) {
        setOtpPreviewHelper(data.otpPreview);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Unable to connect to authentication service.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Handle OTP input typing and auto-advance
  const handleOtpDigitChange = (index: number, val: string) => {
    // Handle paste event or single digit
    if (val.length > 1) {
      const pasted = val.replace(/\D/g, '').slice(0, 6);
      if (pasted) {
        const next = [...otpDigits];
        for (let i = 0; i < 6; i++) {
          next[i] = pasted[i] || '';
        }
        setOtpDigits(next);
        const nextFocus = Math.min(pasted.length, 5);
        otpInputRefs.current[nextFocus]?.focus();
        if (pasted.length === 6) {
          triggerVerifyWithCode(pasted);
        }
        return;
      }
    }

    const char = val.slice(-1);
    if (char && !/^\d$/.test(char)) return; // Only numbers allowed

    const next = [...otpDigits];
    next[index] = char;
    setOtpDigits(next);

    if (char && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }

    // Auto-verify if all 6 digits are filled
    const fullCode = next.join('');
    if (fullCode.length === 6 && !next.includes('')) {
      triggerVerifyWithCode(fullCode);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // Step 3: Verify OTP code
  const triggerVerifyWithCode = async (code: string) => {
    if (code.length !== 6) {
      setErrorMsg('Please enter the complete 6-digit verification code.');
      return;
    }

    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          otp: code,
          role,
          name: name.trim() || undefined,
          phone: phone.trim() || undefined,
          companyName: role === 'recruiter' ? (companyName.trim() || undefined) : undefined
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Incorrect or expired verification code.');
      }

      // Persist auth session in browser
      if (data.token) {
        localStorage.setItem('jobskul_auth_token', data.token);
      }
      if (data.user) {
        localStorage.setItem('jobskul_auth_user', JSON.stringify(data.user));
      }

      setStep('success');
      setTimeout(() => {
        onLoginSuccess(data.user);
        onClose();
      }, 1000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Verification failed. Please check the code.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerVerifyWithCode(otpDigits.join(''));
  };

  // Quick domain chips
  const applyDomain = (domain: string) => {
    const atIndex = email.indexOf('@');
    if (atIndex === -1) {
      setEmail((prev) => `${prev.trim()}${domain}`);
    } else {
      setEmail((prev) => `${prev.substring(0, atIndex)}${domain}`);
    }
  };

  // Quick test fill for current user or evaluation
  const fillQuickAccount = (testEmail: string, testRole: UserRole, testName: string) => {
    setEmail(testEmail);
    setRole(testRole);
    setName(testName);
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl border border-slate-200/90 max-w-md w-full p-6 sm:p-8 shadow-2xl shadow-slate-900/20 relative animate-in zoom-in-95 duration-150">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="flex justify-center">
            <Logo size="md" />
          </div>
          <div className="pt-1">
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
              {step === 'email' && 'Passwordless Secure Sign-In'}
              {step === 'otp' && 'Verify Your Email'}
              {step === 'success' && 'Authentication Successful!'}
            </h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              {step === 'email' && 'Enter your Gmail or work email to receive a secure 6-digit one-time code.'}
              {step === 'otp' && (
                <span>
                  Enter the 6-digit code sent to <strong className="text-slate-800">{email}</strong>
                </span>
              )}
              {step === 'success' && 'Loading your Jobskül career workspace...'}
            </p>
          </div>
        </div>

        {/* Alert Notifications */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-xl text-xs font-semibold border border-red-200 flex items-start space-x-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
            <span className="flex-1">{errorMsg}</span>
          </div>
        )}

        {infoMsg && step === 'otp' && (
          <div className="mb-4 p-2.5 bg-blue-50 text-blue-700 rounded-xl text-xs font-medium border border-blue-200/70 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-blue-600" />
            <span className="flex-1">{infoMsg}</span>
          </div>
        )}

        {/* STEP 1: EMAIL & ROLE SELECTION */}
        {step === 'email' && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            {/* Persona / Role Selector */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Sign in as
              </label>
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setRole('candidate')}
                  className={`py-2 px-3 rounded-lg transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                    role === 'candidate'
                      ? 'bg-white text-blue-700 shadow-xs border border-slate-200/60 font-black'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <UserIcon className="w-3.5 h-3.5 text-blue-600" />
                  <span>Job Seeker</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('recruiter')}
                  className={`py-2 px-3 rounded-lg transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                    role === 'recruiter'
                      ? 'bg-white text-blue-700 shadow-xs border border-slate-200/60 font-black'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Employer / Recruiter</span>
                </button>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block font-bold text-slate-700 text-xs mb-1">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  type="email"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="soumya.parida2022@gift.edu.in or name@gmail.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all text-slate-900"
                />
              </div>

              {/* Quick domain helper chips */}
              <div className="flex items-center space-x-1.5 mt-2 overflow-x-auto pb-1 text-[11px]">
                <span className="text-slate-400 shrink-0 font-medium">Suggestions:</span>
                <button
                  type="button"
                  onClick={() => applyDomain('@gmail.com')}
                  className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 font-medium transition-colors cursor-pointer shrink-0 border border-slate-200/60"
                >
                  @gmail.com
                </button>
                <button
                  type="button"
                  onClick={() => applyDomain('@gift.edu.in')}
                  className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 font-medium transition-colors cursor-pointer shrink-0 border border-slate-200/60"
                >
                  @gift.edu.in
                </button>
                <button
                  type="button"
                  onClick={() => applyDomain('@outlook.com')}
                  className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 font-medium transition-colors cursor-pointer shrink-0 border border-slate-200/60"
                >
                  @outlook.com
                </button>
              </div>
            </div>

            {/* Optional Name for First Time Account */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-bold text-slate-700 text-xs">
                  Full Name <span className="text-slate-400 font-normal">(Optional for existing users)</span>
                </label>
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Soumya Parida"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all text-slate-900"
              />
            </div>

            {/* Recruiter Company Name Field */}
            {role === 'recruiter' && (
              <div>
                <label className="block font-bold text-slate-700 text-xs mb-1">
                  Organization / Hiring Company
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. CloudSphere Technologies"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all text-slate-900"
                />
              </div>
            )}

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={loading || !email.trim()}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all disabled:opacity-50 flex items-center justify-center space-x-2 text-xs sm:text-sm cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Dispatching OTP...</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Send 6-Digit Verification Code</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Security Badge */}
            <div className="pt-2 flex items-center justify-center space-x-3 text-[11px] text-slate-500 border-t border-slate-100">
              <span className="flex items-center space-x-1">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-bit TLS Encrypted</span>
              </span>
              <span>•</span>
              <span>Instant Code Delivery</span>
            </div>

            {/* Quick Test Autofill Accounts */}
            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold mb-2">
                <span>Quick Test Account Autofill:</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => fillQuickAccount('soumya.parida2022@gift.edu.in', 'candidate', 'Soumya Parida')}
                  className="p-2 text-left bg-slate-50 hover:bg-blue-50/80 border border-slate-200 rounded-lg text-slate-700 transition-colors cursor-pointer"
                >
                  <p className="font-bold text-[11px] text-slate-900">Soumya Parida</p>
                  <p className="text-[10px] text-slate-500 truncate">soumya.parida2022@gift.edu.in</p>
                </button>
                <button
                  type="button"
                  onClick={() => fillQuickAccount('arun.mehta@cloudsphere.com', 'recruiter', 'Arun Mehta')}
                  className="p-2 text-left bg-slate-50 hover:bg-blue-50/80 border border-slate-200 rounded-lg text-slate-700 transition-colors cursor-pointer"
                >
                  <p className="font-bold text-[11px] text-slate-900">Recruiter Arun</p>
                  <p className="text-[10px] text-slate-500 truncate">arun.mehta@cloudsphere.com</p>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* STEP 2: ENTER OTP DIGITS */}
        {step === 'otp' && (
          <form onSubmit={handleVerifySubmit} className="space-y-5">
            {/* 6-Digit Pin Input Matrix */}
            <div>
              <label className="block text-center text-xs font-bold text-slate-700 mb-3">
                Enter 6-Digit Code
              </label>
              <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                {otpDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => (otpInputRefs.current[idx] = el)}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={idx === 0 ? 6 : 1}
                    value={digit}
                    onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className="w-10 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-black font-geometric-mono rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 bg-slate-50 focus:bg-white text-slate-900 transition-all"
                  />
                ))}
              </div>
            </div>

            {/* Instant Helper Pill in dev preview */}
            {otpPreviewHelper && (
              <div className="p-2.5 bg-amber-50 border border-amber-200/80 rounded-xl flex items-center justify-between text-xs animate-in fade-in">
                <div className="flex items-center space-x-1.5 text-amber-800">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="font-semibold text-[11px]">Dev Verification Code:</span>
                  <span className="font-geometric-mono font-bold tracking-widest text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded">
                    {otpPreviewHelper}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const digits = otpPreviewHelper.split('').slice(0, 6);
                    setOtpDigits(digits);
                    triggerVerifyWithCode(otpPreviewHelper);
                  }}
                  className="px-2 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-[10px] transition-colors cursor-pointer"
                >
                  Autofill & Verify
                </button>
              </div>
            )}

            {/* Verify CTA */}
            <button
              type="submit"
              disabled={loading || otpDigits.join('').length !== 6}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all disabled:opacity-50 flex items-center justify-center space-x-2 text-xs sm:text-sm cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Code...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verify Code & Enter Dashboard</span>
                </>
              )}
            </button>

            {/* Resend Code & Switch Email */}
            <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setStep('email');
                  setOtpDigits(['', '', '', '', '', '']);
                  setErrorMsg('');
                }}
                className="text-slate-500 hover:text-slate-900 font-medium cursor-pointer"
              >
                &larr; Change email
              </button>

              <button
                type="button"
                disabled={resendCooldown > 0 || loading}
                onClick={() => handleSendOtp()}
                className="text-blue-600 hover:text-blue-800 font-bold disabled:text-slate-400 cursor-pointer"
              >
                {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : 'Resend code'}
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: SUCCESS CELEBRATION */}
        {step === 'success' && (
          <div className="py-8 text-center space-y-3 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-lg font-black text-slate-900">Email Verified!</h4>
            <p className="text-xs text-slate-500">
              Welcome aboard, <strong>{name || email}</strong>. Opening your dashboard...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

