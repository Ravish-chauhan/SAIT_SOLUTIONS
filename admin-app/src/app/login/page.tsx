'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Lock, Mail, Eye, EyeOff, AlertTriangle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        router.push('/');
      } else {
        setError(data.error || 'Invalid administrator ID or password');
      }
    } catch (err) {
      setError('Connection failed. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 flex items-center justify-center px-4 py-16 text-slate-100">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-8 shadow-2xl space-y-6">
        
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center mx-auto mb-3 font-black text-xl">
            SA
          </div>
          <h1 className="text-xl font-extrabold text-white">SA IT Solutions - Admin Portal</h1>
          <p className="text-xs text-slate-400 font-medium leading-relaxed">
            Enter administrator credentials to access inventory, manage categories, and handle customer enquiries.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-rose-950/60 border border-rose-800/80 text-rose-300 p-3 rounded-lg flex items-center gap-2 text-xs font-semibold">
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="block text-slate-300 font-bold mb-1">Admin Email / ID</label>
            <div className="relative">
              <span className="absolute left-3.5 top-3.5 text-slate-500">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                required
                placeholder="saitsolutions@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all shadow-sm font-medium"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-slate-300 font-bold mb-1">Password</label>
            <div className="relative">
              <span className="absolute left-3.5 top-3.5 text-slate-500">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all shadow-sm font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-slate-500 hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl py-3.5 hover:brightness-110 transition-all font-bold text-xs uppercase tracking-wider cursor-pointer disabled:opacity-50 shadow-lg shadow-indigo-900/30 mt-2"
          >
            {isSubmitting ? 'Authenticating...' : 'Sign In to Admin Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}
