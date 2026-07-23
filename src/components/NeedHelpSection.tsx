'use client';

import React from 'react';
import { MessageCircle, Phone, Mail } from 'lucide-react';

export default function NeedHelpSection() {
  const whatsappNumber = '919876543210';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hi Sait Solutions, I am looking for assistance regarding product availability.'
  )}`;

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

            {/* Middle Row: WhatsApp, Call Us & Email Us */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5 items-center">
              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <div className="w-9 h-9 rounded-full bg-purple-200/60 text-[#6d28d9] flex items-center justify-center shrink-0 group-hover:bg-[#6d28d9] group-hover:text-white transition-all">
                  <MessageCircle className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-slate-900 block group-hover:text-[#6d28d9] transition-colors leading-none mb-1">
                    WhatsApp
                  </span>
                  <span className="text-xs font-bold text-[#6d28d9] block">
                    +91 98765 43210
                  </span>
                </div>
              </a>

              {/* Call Us */}
              <a href="tel:+919876543210" className="flex items-center gap-3 group">
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

              {/* Email Us */}
              <a href="mailto:support@saitsol.com" className="flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-full bg-purple-200/60 text-[#6d28d9] flex items-center justify-center shrink-0 group-hover:bg-[#6d28d9] group-hover:text-white transition-all">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-slate-900 block group-hover:text-[#6d28d9] transition-colors leading-none mb-1">
                    Email Us
                  </span>
                  <span className="text-[11px] font-bold text-[#6d28d9] block">
                    support@saitsol.com
                  </span>
                </div>
              </a>
            </div>

            {/* Bottom Full-Width Chat on WhatsApp Button */}
            <div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl border-2 border-[#6d28d9] bg-white hover:bg-purple-50 text-[#6d28d9] font-extrabold text-sm flex items-center justify-center gap-2.5 transition-all shadow-sm active:scale-[0.99] cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 shrink-0" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* ======================================================== */}
          {/* 2. LAPTOP / DESKTOP DESIGN (Matching Reference Image)    */}
          {/* ======================================================== */}
          <div className="hidden md:grid md:grid-cols-12 gap-6 items-center divide-x divide-purple-200/60">
            
            {/* Col 1: Heading & Subtitle (4 cols) */}
            <div className="md:col-span-4 pr-4">
              <span className="text-xs font-black uppercase text-[#6d28d9] tracking-widest block mb-1">
                NEED HELP?
              </span>
              <h3 className="text-xl lg:text-2xl font-extrabold text-slate-900 leading-tight tracking-tight font-sans mb-1.5">
                Can’t find the product you’re looking for?
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Our team is here to help you find the right product for your needs.
              </p>
            </div>

            {/* Col 2: Call Us (3 cols) */}
            <div className="md:col-span-3 pl-6 pr-4 flex items-center gap-3.5 group">
              <div className="w-11 h-11 rounded-full bg-purple-200/60 text-[#6d28d9] flex items-center justify-center shrink-0 group-hover:bg-[#6d28d9] group-hover:text-white transition-all">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-extrabold text-slate-900 block leading-tight mb-0.5">
                  Call Us
                </span>
                <a
                  href="tel:+919876543210"
                  className="text-sm font-extrabold text-[#6d28d9] hover:underline block leading-tight"
                >
                  +91 98765 43210
                </a>
                <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                  Mon - Sat (9AM - 7PM)
                </span>
              </div>
            </div>

            {/* Col 3: Email Us (3 cols) */}
            <div className="md:col-span-3 pl-6 pr-4 flex items-center gap-3.5 group">
              <div className="w-11 h-11 rounded-full bg-purple-200/60 text-[#6d28d9] flex items-center justify-center shrink-0 group-hover:bg-[#6d28d9] group-hover:text-white transition-all">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-extrabold text-slate-900 block leading-tight mb-0.5">
                  Email Us
                </span>
                <a
                  href="mailto:support@saitsol.com"
                  className="text-sm font-extrabold text-[#6d28d9] hover:underline block leading-tight"
                >
                  support@saitsol.com
                </a>
                <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                  We reply within 24h
                </span>
              </div>
            </div>

            {/* Col 4: Still need help? CTA Button (2 cols) */}
            <div className="md:col-span-2 pl-6 flex flex-col justify-center items-start space-y-2">
              <div>
                <h4 className="text-xs font-extrabold text-slate-900">Still need help?</h4>
                <p className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
                  Our experts are ready to assist.
                </p>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border-2 border-[#6d28d9] bg-white hover:bg-purple-50 text-[#6d28d9] font-extrabold text-xs transition-all shadow-sm active:scale-95 cursor-pointer mt-1"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
