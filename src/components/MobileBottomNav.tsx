'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, Heart, MessageCircle } from 'lucide-react';

export default function MobileBottomNav() {
  const pathname = usePathname();

  // Do not display bottom nav on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const isHome = pathname === '/';
  const isCategories = pathname === '/categories' || pathname?.startsWith('/category/');
  const isWishlist = pathname === '/wishlist';

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-2 px-2 flex justify-around items-center md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      {/* 1. Home */}
      <Link
        href="/"
        className={`flex flex-col items-center gap-0.5 transition-all px-3 py-1 rounded-xl cursor-pointer ${
          isHome ? 'text-[#5b21b6] font-extrabold' : 'text-slate-500 hover:text-slate-900 font-medium'
        }`}
      >
        <Home className={`w-5 h-5 ${isHome ? 'text-[#5b21b6] stroke-[2.5]' : 'text-slate-500'}`} />
        <span className="text-[10px] tracking-tight">Home</span>
      </Link>

      {/* 2. Categories */}
      <Link
        href="/categories"
        className={`flex flex-col items-center gap-0.5 transition-all px-3 py-1 rounded-xl cursor-pointer ${
          isCategories ? 'text-[#5b21b6] font-extrabold' : 'text-slate-500 hover:text-slate-900 font-medium'
        }`}
      >
        <LayoutGrid className={`w-5 h-5 ${isCategories ? 'text-[#5b21b6] stroke-[2.5]' : 'text-slate-500'}`} />
        <span className="text-[10px] tracking-tight">Categories</span>
      </Link>

      {/* 3. Wishlist */}
      <Link
        href="/wishlist"
        className={`flex flex-col items-center gap-0.5 transition-all px-3 py-1 rounded-xl cursor-pointer relative ${
          isWishlist ? 'text-[#5b21b6] font-extrabold' : 'text-slate-500 hover:text-slate-900 font-medium'
        }`}
      >
        <Heart className={`w-5 h-5 ${isWishlist ? 'text-[#5b21b6] stroke-[2.5]' : 'text-slate-500'}`} />
        <span className="text-[10px] tracking-tight">Wishlist</span>
      </Link>

      {/* 4. WhatsApp / Contact */}
      <a
        href="https://wa.me/919876543210?text=Hi%20Sait%20Solutions%2C%20I%20have%20an%20inquiry."
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-0.5 text-[#25d366] hover:text-[#1da851] transition-all px-3 py-1 rounded-xl cursor-pointer font-bold"
      >
        <MessageCircle className="w-5 h-5 stroke-[2.5]" />
        <span className="text-[10px] tracking-tight">Contact</span>
      </a>
    </div>
  );
}
