'use client';

import React, { useState } from 'react';
import { Phone, MessageSquare, Send, CheckCircle2, User, Mail, X } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

export default function NeedHelpSection() {
  const whatsappNumber = '919369991770';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hi Sait Solutions, I am looking for assistance regarding product availability.'
  )}`;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    subject: 'Product Availability Inquiry',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName.trim() || !formData.customerPhone.trim()) {
      setErrorMessage('Please provide your name and phone number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.customerName.trim(),
          customerPhone: formData.customerPhone.trim(),
          customerEmail: formData.customerEmail.trim() || undefined,
          productName: formData.subject,
          productUrl: window.location.href,
          message: formData.message.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSuccess(true);
        setFormData({
          customerName: '',
          customerPhone: '',
          customerEmail: '',
          subject: 'Product Availability Inquiry',
          message: '',
        });
      } else {
        setErrorMessage(data.error || 'Failed to submit query. Please try again.');
      }
    } catch (error) {
      console.error('Query form submission error:', error);
      setErrorMessage('Network error. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsSuccess(false);
    setErrorMessage('');
  };

  return (
    <section className="w-full bg-white py-6 md:py-10 overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-4 md:px-8">
        
        {/* Soft Lavender Card Container */}
        <div className="bg-[#f5f3ff] border border-purple-100/80 rounded-2xl md:rounded-3xl p-5 sm:p-7 md:p-8 shadow-sm">
          
          {/* ========================================== */}
          {/* 1. MOBILE DESIGN (Visible on Phone screens) */}
          {/* ========================================== */}
          <div className="md:hidden">
            {/* Top Heading */}
            <div className="mb-5">
              <span className="text-xs font-black uppercase text-[#6d28d9] tracking-widest block mb-1.5">
                NEED HELP?
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 leading-snug tracking-tight font-sans">
                Can’t find the product you’re looking for?
              </h3>
            </div>

            {/* Middle Row: WhatsApp, Call Us & Submit Query (replacing Email Us) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5 items-center">
              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <div className="w-9 h-9 rounded-full bg-purple-200/60 text-[#6d28d9] flex items-center justify-center shrink-0 group-hover:bg-[#6d28d9] group-hover:text-white transition-all">
                  <WhatsAppIcon className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-slate-900 block group-hover:text-[#6d28d9] transition-colors leading-none mb-1">
                    WhatsApp
                  </span>
                  <span className="text-xs font-bold text-[#6d28d9] block">
                    +91 9369991770
                  </span>
                </div>
              </a>

              {/* Call Us */}
              <a href="tel:+919369991770" className="flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-full bg-purple-200/60 text-[#6d28d9] flex items-center justify-center shrink-0 group-hover:bg-[#6d28d9] group-hover:text-white transition-all">
                  <Phone className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-slate-900 block group-hover:text-[#6d28d9] transition-colors leading-none mb-1">
                    Call Us
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium block leading-tight">
                    Mon - Sat (9AM - 7PM)
                  </span>
                </div>
              </a>

              {/* Submit Query Button (Replaces Email Us) */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-purple-200/60 text-[#6d28d9] flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col items-start gap-1">
                  <span className="text-xs font-extrabold text-slate-900 block leading-none">
                    Submit Query
                  </span>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border-2 border-[#6d28d9] bg-white hover:bg-purple-50 text-[#6d28d9] font-extrabold text-xs transition-all shadow-sm active:scale-95 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#6d28d9] shrink-0" />
                    <span>Submit Query</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Full-Width Chat on WhatsApp Button */}
            <div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl border-2 border-[#6d28d9] bg-white hover:bg-purple-50 text-[#6d28d9] font-extrabold text-sm flex items-center justify-center gap-2.5 transition-all shadow-sm active:scale-[0.99] cursor-pointer"
              >
                <WhatsAppIcon className="w-5 h-5 text-[#25D366] shrink-0" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* ======================================================== */}
          {/* 2. TABLET & DESKTOP DESIGN (768px, 1024px, 1280px+)       */}
          {/* ======================================================== */}
          <div className="hidden md:grid md:grid-cols-12 gap-4 xl:gap-6 items-center divide-y md:divide-y-0 lg:divide-x divide-purple-200/60">
            
            {/* Col 1: Heading & Subtitle */}
            <div className="md:col-span-12 lg:col-span-4 lg:pr-4 pb-4 md:pb-0">
              <span className="text-[11px] font-black uppercase text-[#6d28d9] tracking-widest block mb-1">
                NEED HELP?
              </span>
              <h3 className="text-lg lg:text-xl xl:text-2xl font-extrabold text-slate-900 leading-snug tracking-tight font-sans mb-1">
                Can’t find the product you’re looking for?
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Our team is here to help you find the right product for your needs.
              </p>
            </div>

            {/* Col 2: Call Us */}
            <div className="md:col-span-6 lg:col-span-3 pt-4 md:pt-0 lg:pl-5 lg:pr-3 flex items-center gap-3 group">
              <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-purple-200/60 text-[#6d28d9] flex items-center justify-center shrink-0 group-hover:bg-[#6d28d9] group-hover:text-white transition-all">
                <Phone className="w-4.5 h-4.5 lg:w-5 lg:h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-extrabold text-slate-900 block leading-tight mb-0.5">
                  Call Us
                </span>
                <a
                  href="tel:+919369991770"
                  className="text-xs lg:text-sm font-extrabold text-[#6d28d9] hover:underline block leading-tight truncate"
                >
                  +91 9369991770
                </a>
                <span className="text-[10.5px] text-slate-500 font-medium block mt-0.5">
                  Mon - Sat (9AM - 7PM)
                </span>
              </div>
            </div>

            {/* Col 3: Submit Query Button (Replaces Email Us) */}
            <div className="md:col-span-6 lg:col-span-3 pt-4 md:pt-0 lg:pl-5 lg:pr-3 flex items-center gap-3 group">
              <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-purple-200/60 text-[#6d28d9] flex items-center justify-center shrink-0 group-hover:bg-[#6d28d9] group-hover:text-white transition-all">
                <MessageSquare className="w-4.5 h-4.5 lg:w-5 lg:h-5" />
              </div>
              <div className="min-w-0 flex flex-col items-start">
                <span className="text-xs font-extrabold text-slate-900 block leading-tight mb-1">
                  Submit Query
                </span>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border-2 border-[#6d28d9] bg-white hover:bg-purple-50 text-[#6d28d9] font-extrabold text-xs transition-all shadow-sm active:scale-95 cursor-pointer shrink-0"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#6d28d9] shrink-0" />
                  <span>Submit Query</span>
                </button>
                <span className="text-[10.5px] text-slate-500 font-medium block mt-1">
                  We reply within 24h
                </span>
              </div>
            </div>

            {/* Col 4: Still need help? WhatsApp CTA Button */}
            <div className="md:col-span-12 lg:col-span-2 pt-4 lg:pt-0 lg:pl-5 flex flex-row lg:flex-col justify-between lg:justify-center items-center lg:items-start gap-2">
              <div>
                <h4 className="text-xs font-extrabold text-slate-900">Still need help?</h4>
                <p className="text-[10.5px] text-slate-500 font-medium leading-tight mt-0.5">
                  Our experts are ready to assist.
                </p>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border-2 border-[#6d28d9] bg-white hover:bg-purple-50 text-[#6d28d9] font-extrabold text-xs transition-all shadow-sm active:scale-95 cursor-pointer shrink-0"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>

      {/* ======================================================== */}
      {/* RESPONSIVE QUERY POPUP MODAL (Bottom Sheet on Mobile) */}
      {/* ======================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-4 animate-in fade-in duration-200">
          
          {/* Modal Card / Bottom Sheet Container */}
          <div
            className="w-full md:max-w-lg bg-white rounded-t-3xl md:rounded-3xl p-5 sm:p-7 shadow-2xl animate-in slide-in-from-bottom md:zoom-in-95 duration-300 max-h-[85vh] md:max-h-[90vh] overflow-y-auto relative text-slate-800 border border-purple-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Bottom Sheet Pull Bar Handle */}
            <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto mb-4 md:hidden" />

            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#6d28d9] text-white flex items-center justify-center font-bold shadow-md shadow-purple-900/20">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">Submit Your Query</h4>
                  <p className="text-xs text-slate-500 font-medium">Direct query goes to our support & admin team</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            {isSuccess ? (
              <div className="py-8 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9 animate-bounce" />
                </div>
                <h4 className="text-xl font-extrabold text-slate-900">Query Submitted Successfully!</h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out to SA IT Solutions. Our support team will review your query and contact you on your phone number shortly.
                </p>
                <button
                  onClick={closeModal}
                  className="mt-4 px-6 py-2.5 bg-gradient-to-r from-[#6d28d9] to-[#5b21b6] text-white text-xs font-black rounded-xl transition-all cursor-pointer shadow-md"
                >
                  Done & Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {errorMessage && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl font-semibold">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Name */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Full Name / Company <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#6d28d9] focus:bg-white font-medium transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Mobile / Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 9876543210"
                        value={formData.customerPhone}
                        onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#6d28d9] focus:bg-white font-medium transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Email */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                      <input
                        type="email"
                        placeholder="e.g. name@company.com"
                        value={formData.customerEmail}
                        onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#6d28d9] focus:bg-white font-medium transition-all"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Query Topic / Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-[#6d28d9] focus:bg-white font-medium transition-all"
                    >
                      <option value="Product Availability Inquiry">Product Availability Inquiry</option>
                      <option value="Bulk Order & Dealer Pricing Quote">Bulk Order & Dealer Pricing Quote</option>
                      <option value="Custom PC Build Advice">Custom PC Build Advice</option>
                      <option value="Server & Storage Infrastructure">Server & Storage Infrastructure</option>
                      <option value="Networking & Security Systems">Networking & Security Systems</option>
                      <option value="Other Assistance">Other Assistance</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Query Details / Message
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Mention model names, quantity, or specific requirements you are looking for..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#6d28d9] focus:bg-white font-medium transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#6d28d9] to-[#5b21b6] hover:brightness-110 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shadow-purple-900/20 active:scale-[0.99] cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Submitting Query...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Query to Admin</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

        </div>
      )}
    </section>
  );
}
