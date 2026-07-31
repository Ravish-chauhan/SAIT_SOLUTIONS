'use client';

import React from 'react';
import { WhatsAppIcon } from './WhatsAppIcon';

export default function WhatsAppButton() {
  const handleChatClick = () => {
    const text = encodeURIComponent("Hi Sait Solutions, I am browsing your website and have a query regarding products and availability.");
    window.open(`https://wa.me/919369991770?text=${text}`, '_blank');
  };

  return (
    <button
      onClick={handleChatClick}
      className="hidden md:flex fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 items-center justify-center cursor-pointer group"
      aria-label="Contact on WhatsApp"
    >
      <WhatsAppIcon className="w-6 h-6 shrink-0 text-white group-hover:rotate-12 transition-transform" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 text-xs font-black tracking-wide transition-all duration-300">
        WhatsApp Chat
      </span>
    </button>
  );
}
