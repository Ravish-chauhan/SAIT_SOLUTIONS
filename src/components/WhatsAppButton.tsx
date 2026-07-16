'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const handleChatClick = () => {
    const text = encodeURIComponent("Hi Sait Solutions, I am browsing your website and have a general query regarding products and dealership opportunities.");
    window.open(`https://wa.me/919999999999?text=${text}`, '_blank');
  };

  return (
    <button
      onClick={handleChatClick}
      className="fixed bottom-6 right-6 z-50 bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer group"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 shrink-0 group-hover:rotate-12 transition-transform" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 text-xs font-semibold tracking-wide transition-all duration-300">
        WhatsApp Chat
      </span>
    </button>
  );
}
