import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="min-h-[60vh] bg-slate-50 py-12 px-4 max-w-4xl mx-auto font-sans space-y-6">
      <h1 className="text-3xl font-extrabold text-slate-900">Privacy Policy</h1>
      <p className="text-sm text-slate-600 leading-relaxed font-medium">
        At SAIT Solutions, your privacy and data security are our top priorities. This document outlines how we collect, use, and protect your information.
      </p>
      <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm text-sm text-slate-700">
        <h2 className="text-base font-bold text-slate-900">1. Data Collection</h2>
        <p>We collect essential information required for order fulfillment, technical support enquiries, and hardware consultation.</p>
        <h2 className="text-base font-bold text-slate-900">2. Information Protection</h2>
        <p>Your personal data is encrypted and handled securely in compliance with privacy regulations. We never sell your personal information to third parties.</p>
      </div>
    </div>
  );
}
