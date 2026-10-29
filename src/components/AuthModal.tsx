/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Eye, EyeOff, Lock, Mail, User, CheckCircle2, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'register';
  onClose: () => void;
  onSuccess: (user: { name: string; email: string; role: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'login',
  onClose,
  onSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (mode === 'register' && !name.trim()) {
      errs.name = 'Please provide your full name or research investigator identifier.';
    }

    if (!email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please provide a valid email format (e.g. investigator@university.edu).';
    }

    if (!password) {
      errs.password = 'Password is required.';
    } else if (password.length < 8) {
      errs.password = 'Password must be at least 8 characters long.';
    }

    if (mode === 'register' && password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setSuccessMsg(null);

    // Simulate authenticating client-side
    setTimeout(() => {
      setIsLoading(false);
      const displayName = mode === 'register' ? name : (name || email.split('@')[0] || 'Investigator');
      setSuccessMsg(mode === 'login' ? 'Successfully authenticated session.' : 'Research account registered.');

      setTimeout(() => {
        onSuccess({
          name: displayName,
          email,
          role: 'Research Investigator',
        });
        onClose();
      }, 700);
    }, 900);
  };

  const handleFillDemo = () => {
    setEmail('dr.elena.vance@neuro-speech.org');
    setPassword('CognitiveVoice2026!');
    if (mode === 'register') {
      setName('Dr. Elena Vance');
      setConfirmPassword('CognitiveVoice2026!');
    }
    setErrors({});
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#272438]/45 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-[#FCFBFF] rounded-3xl border border-[#8B78D6]/30 shadow-2xl overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-[#8B78D6]/15 bg-white">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#F1EDFF] border border-[#8B78D6]/20 text-[#6552A3]">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="2" fill="#8B78D6" />
                <circle cx="6" cy="8" r="1.5" />
                <circle cx="18" cy="8" r="1.5" />
                <path d="M7.5 9L10.5 11" />
                <path d="M16.5 9L13.5 11" />
              </svg>
            </div>
            <span className="font-serif text-lg font-semibold text-[#272438]">Loquacious</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#777387] hover:text-[#272438] rounded-lg hover:bg-black/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B78D6]"
            aria-label="Close authentication dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-7 sm:p-8 space-y-5">
          <div>
            <h3 id="auth-modal-title" className="font-serif text-2xl font-medium text-[#272438] mb-1">
              {mode === 'login' ? 'Welcome to Loquacious' : 'Create research account'}
            </h3>
            <p className="text-xs text-[#777387]">
              {mode === 'login'
                ? 'Sign in to access exploratory speech cohorts and acoustic session telemetry.'
                : 'Join the cognitive acoustic research prototype to explore speech biomarkers.'}
            </p>
          </div>

          {/* Quick Demo Autofill Pill */}
          <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-[#F1EDFF] border border-[#8B78D6]/20">
            <span className="text-[#6552A3] font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Testing prototype?</span>
            </span>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[#6552A3] hover:text-[#272438] font-semibold underline underline-offset-2 transition-colors cursor-pointer"
            >
              Fill Demo Credentials
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Name Field (Register only) */}
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-mono uppercase text-[#6552A3] font-semibold mb-1.5">
                  Full Name / Identifier
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-[#777387]" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Dr. Elena Vance"
                    className={`w-full pl-10 pr-4 py-2.5 bg-white text-sm text-[#272438] rounded-xl border focus-visible:outline-none transition-colors ${
                      errors.name ? 'border-rose-400 focus-visible:ring-2 focus-visible:ring-rose-400' : 'border-[#8B78D6]/20 focus-visible:ring-2 focus-visible:ring-[#8B78D6]'
                    }`}
                  />
                </div>
                {errors.name && <p className="text-[11px] text-rose-600 mt-1">{errors.name}</p>}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-xs font-mono uppercase text-[#6552A3] font-semibold mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-[#777387]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="investigator@neuro-research.org"
                  className={`w-full pl-10 pr-4 py-2.5 bg-white text-sm text-[#272438] rounded-xl border focus-visible:outline-none transition-colors ${
                    errors.email ? 'border-rose-400 focus-visible:ring-2 focus-visible:ring-rose-400' : 'border-[#8B78D6]/20 focus-visible:ring-2 focus-visible:ring-[#8B78D6]'
                  }`}
                />
              </div>
              {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-mono uppercase text-[#6552A3] font-semibold mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-[#777387]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className={`w-full pl-10 pr-10 py-2.5 bg-white text-sm text-[#272438] rounded-xl border focus-visible:outline-none transition-colors ${
                    errors.password ? 'border-rose-400 focus-visible:ring-2 focus-visible:ring-rose-400' : 'border-[#8B78D6]/20 focus-visible:ring-2 focus-visible:ring-[#8B78D6]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-[#777387] hover:text-[#272438] transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-[11px] text-rose-600 mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password Field (Register only) */}
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-mono uppercase text-[#6552A3] font-semibold mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-[#777387]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className={`w-full pl-10 pr-4 py-2.5 bg-white text-sm text-[#272438] rounded-xl border focus-visible:outline-none transition-colors ${
                      errors.confirmPassword ? 'border-rose-400 focus-visible:ring-2 focus-visible:ring-rose-400' : 'border-[#8B78D6]/20 focus-visible:ring-2 focus-visible:ring-[#8B78D6]'
                    }`}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            )}

            {/* Success message banner */}
            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium text-white bg-[#6552A3] hover:bg-[#523F8F] active:bg-[#46347A] rounded-xl shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B78D6] disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>{mode === 'login' ? 'Sign In to Prototype' : 'Register Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Mode Switch Link */}
          <div className="pt-3 border-t border-[#8B78D6]/15 text-center text-xs text-[#777387]">
            {mode === 'login' ? (
              <p>
                Don't have a research account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setErrors({});
                  }}
                  className="text-[#6552A3] font-semibold hover:underline cursor-pointer"
                >
                  Create an account
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setErrors({});
                  }}
                  className="text-[#6552A3] font-semibold hover:underline cursor-pointer"
                >
                  Back to Log In
                </button>
              </p>
            )}
          </div>

          {/* Technical Integration Note */}
          <div className="p-3 bg-white/70 rounded-xl border border-[#8B78D6]/15 text-[11px] text-[#777387] leading-relaxed">
            <div className="font-semibold text-[#272438] mb-0.5">Authentication Infrastructure Note:</div>
            This interface is an accessible frontend research authentication view designed for seamless compatibility with future Supabase Auth / OAuth integration. Passwords are never persisted in local storage.
          </div>
        </div>
      </div>
    </div>
  );
};
