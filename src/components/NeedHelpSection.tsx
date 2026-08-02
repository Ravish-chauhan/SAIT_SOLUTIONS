'use client';

import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

export default function NeedHelpSection() {
  const whatsappNumber = '919369991770';
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

              {/* Email Us */}
              <a href="mailto:sales@saitsolutions.co.in" className="flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-full bg-purple-200/60 text-[#6d28d9] flex items-center justify-center shrink-0 group-hover:bg-[#6d28d9] group-hover:text-white transition-all">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-slate-900 block group-hover:text-[#6d28d9] transition-colors leading-none mb-1">
                    Email Us
                  </span>
                  <span className="text-[11px] font-bold text-[#6d28d9] block">
                    sales@saitsolutions.co.in
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

            {/* Col 3: Email Us */}
            <div className="md:col-span-6 lg:col-span-3 pt-4 md:pt-0 lg:pl-5 lg:pr-3 flex items-center gap-3 group">
              <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-purple-200/60 text-[#6d28d9] flex items-center justify-center shrink-0 group-hover:bg-[#6d28d9] group-hover:text-white transition-all">
                <Mail className="w-4.5 h-4.5 lg:w-5 lg:h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-extrabold text-slate-900 block leading-tight mb-0.5">
                  Email Us
                </span>
                <a
                  href="mailto:sales@saitsolutions.co.in"
                  className="text-xs lg:text-xs xl:text-sm font-extrabold text-[#6d28d9] hover:underline block leading-tight truncate"
                  title="sales@saitsolutions.co.in"
                >
                  sales@saitsolutions.co.in
                </a>
                <span className="text-[10.5px] text-slate-500 font-medium block mt-0.5">
                  We reply within 24h
                </span>
              </div>
            </div>

            {/* Col 4: Still need help? CTA Button */}
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
    </section>
  );
}
