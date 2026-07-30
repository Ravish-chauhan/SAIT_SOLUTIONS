import React from 'react';

export default function TermsPage() {
  return (
    <div className="min-h-[60vh] bg-slate-50 py-12 px-4 max-w-4xl mx-auto font-sans space-y-6">
      <h1 className="text-3xl font-extrabold text-slate-900">Terms of Service</h1>
      <p className="text-sm text-slate-600 leading-relaxed font-medium">
        Welcome to SAIT Solutions. By accessing or using our services, website, and products, you agree to be bound by these terms. Please read them carefully.
      </p>
      <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm text-sm text-slate-700">
        <h2 className="text-base font-bold text-slate-900">1. Usage & Equipment</h2>
        <p>All hardware, PC components, networking, and server equipment offered by SAIT Solutions are subject to availability and official manufacturer warranty terms.</p>
        <h2 className="text-base font-bold text-slate-900">2. Enquiries & Pricing</h2>
        <p>Prices listed on our portal are subject to update based on IT market availability. Official quotes will be confirmed upon order processing.</p>
      </div>
    </div>
  );
}
