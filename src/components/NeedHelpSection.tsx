'use client';

import React from 'react';
import { MessageCircle, Phone, Mail } from 'lucide-react';

export default function NeedHelpSection() {
  const whatsappNumber = '919876543210';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hi Sait Solutions, I am looking for assistance regarding product availability.'
  )}`;

  return (
    <section className="w-full bg-white py-6 md:py-8 overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-4 md:px-8">
        
        {/* Soft Lavender Minimal Card Container */}
        <div className="bg-[#f9f8ff] border border-purple-100/80 rounded-3xl p-6 sm:p-8 md:p-9 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Block: Headline & Subtitle */}
            <div className="lg:col-span-4 lg:border-r border-slate-200/80 lg:pr-6">
              <span className="text-[10px] sm:text-xs font-black uppercase text-[#5b21b6] tracking-widest block mb-1.5">
                NEED HELP?
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug tracking-tight font-sans">
                Can’t find the product you’re looking for?
              </h3>
              <p className="text-xs font-medium text-slate-500 mt-2 leading-relaxed">
                Our team is here to help you find the right product for your needs.
              </p>
            </div>

            {/* Middle Block: 2 Contact Options (Call Us & Email Us) */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-6 items-center">
              
              {/* Option 1: Call Us */}
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3.5 group"
              >
                <div className="w-11 h-11 rounded-full bg-purple-100/80 text-[#5b21b6] flex items-center justify-center shrink-0 group-hover:bg-[#5b21b6] group-hover:text-white transition-all">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-slate-900 block group-hover:text-[#5b21b6] transition-colors">
                    Call Us
                  </span>
                  <span className="text-xs sm:text-sm font-black text-[#5b21b6] block">
                    +91 98765 43210
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium block">
                    Mon - Sat (9AM - 7PM)
                  </span>
                </div>
              </a>

              {/* Option 2: Email Us (Expanded Full Visibility) */}
              <a
                href="mailto:support@saitsol.com"
                className="flex items-center gap-3.5 sm:border-l border-slate-200/70 sm:pl-6 group"
              >
                <div className="w-11 h-11 rounded-full bg-purple-100/80 text-[#5b21b6] flex items-center justify-center shrink-0 group-hover:bg-[#5b21b6] group-hover:text-white transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-slate-900 block group-hover:text-[#5b21b6] transition-colors">
                    Email Us
                  </span>
                  <span className="text-xs sm:text-sm font-black text-[#5b21b6] block whitespace-nowrap">
                    support@saitsol.com
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium block">
                    We reply within 24h
                  </span>
                </div>
              </a>

            </div>

            {/* Right Block: Still Need Help CTA */}
            <div className="lg:col-span-3 lg:border-l border-slate-200/80 lg:pl-6 flex flex-col items-start justify-center">
              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
                Still need help?
              </h4>
              <p className="text-[11px] text-slate-500 font-medium mt-1 leading-normal">
                Our experts are ready to assist you over WhatsApp.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3.5 inline-flex items-center gap-2 border-2 border-[#5b21b6] text-[#5b21b6] hover:bg-[#5b21b6] hover:text-white rounded-xl px-4 py-2.5 text-xs font-extrabold transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
