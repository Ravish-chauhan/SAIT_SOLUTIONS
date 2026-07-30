import React from 'react';
import Link from 'next/link';
import { Heart, ArrowLeft } from 'lucide-react';

export default function WishlistPage() {
  return (
    <div className="min-h-[70vh] bg-slate-50 py-12 px-4 max-w-5xl mx-auto font-sans flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mb-4">
        <Heart className="w-8 h-8" />
      </div>
      <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">Your Wishlist</h1>
      <p className="text-sm text-slate-500 max-w-md mb-6 font-medium">
        Save items you love to your wishlist and inspect them whenever you return.
      </p>
      <Link
        href="/categories"
        className="inline-flex items-center gap-2 bg-[#5b21b6] hover:bg-[#4c1d95] text-white font-bold text-xs uppercase px-6 py-3 rounded-xl transition-all shadow-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Explore Categories</span>
      </Link>
    </div>
  );
}
