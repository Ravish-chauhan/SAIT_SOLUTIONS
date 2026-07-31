'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ArrowLeft, Send, Trash2, ShoppingBag } from 'lucide-react';
import ProductCard from './ProductCard';

export default function WishlistClient() {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadWishlist = () => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('sait_wishlist');
        if (stored) {
          const dict = JSON.parse(stored);
          const items = Object.values(dict).filter((item: any) => item && item._id);
          setWishlistItems(items);
        } else {
          setWishlistItems([]);
        }
      } catch (e) {
        console.error('Failed to load wishlist:', e);
        setWishlistItems([]);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadWishlist();

    const handleStorage = () => loadWishlist();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear your entire wishlist?')) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('sait_wishlist');
        setWishlistItems([]);
      }
    }
  };

  const removeItem = (id: string) => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('sait_wishlist');
        if (stored) {
          const dict = JSON.parse(stored);
          delete dict[id];
          localStorage.setItem('sait_wishlist', JSON.stringify(dict));
          setWishlistItems(Object.values(dict).filter((item: any) => item && item._id));
        }
      } catch (e) {
        console.error('Error removing item:', e);
      }
    }
  };

  // WhatsApp Enquiry Message Construction for All Wishlisted Items
  const whatsappNumber = '919876543210';
  const messageLines = wishlistItems.map(
    (item, idx) => `${idx + 1}. ${item.name} (Brand: ${item.brand}) - ₹${(item.offerPrice || item.mrp).toLocaleString('en-IN')}`
  );
  const fullMessage = `Hi Sait Solutions, I am interested in receiving a price quote for my wishlisted items (${wishlistItems.length} items):\n\n${messageLines.join('\n')}\n\nPlease share your best price and stock availability!`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(fullMessage)}`;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 text-center space-y-4 font-sans min-h-[60vh]">
        <div className="h-8 w-48 bg-slate-200 animate-pulse rounded-xl mx-auto" />
        <div className="h-4 w-64 bg-slate-100 animate-pulse rounded mx-auto" />
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-[70vh] bg-slate-50 py-16 px-4 max-w-4xl mx-auto font-sans flex flex-col items-center justify-center text-center space-y-6">
        <div className="w-20 h-20 bg-purple-100 text-[#5b21b6] rounded-full flex items-center justify-center shadow-inner">
          <Heart className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">Your Wishlist is Empty</h1>
          <p className="text-sm text-slate-500 max-w-md mx-auto font-medium">
            Explore our hardware catalog and click the heart icon on any product to save it to your wishlist.
          </p>
        </div>
        <Link
          href="/categories"
          className="inline-flex items-center gap-2 bg-[#5b21b6] hover:bg-[#4c1d95] text-white font-extrabold text-xs uppercase px-7 py-3.5 rounded-xl transition-all shadow-md active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Explore Hardware Catalog</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-8 font-sans min-h-[70vh]">

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#5b21b6] uppercase font-bold tracking-wider">Saved Hardware</span>
            <span className="bg-purple-100 text-[#5b21b6] font-extrabold text-xs px-2.5 py-0.5 rounded-full">
              {wishlistItems.length} items
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-1">My Wishlist</h1>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* WHATSAPP ENQUIRY BUTTON FOR WISHLIST ITEMS */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial bg-[#5b21b6] hover:bg-[#4c1d95] text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
          >
            <Send className="w-4 h-4" />
            <span>Enquire Wishlisted Items on WhatsApp ({wishlistItems.length})</span>
          </a>

          <button
            onClick={handleClearAll}
            className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all border border-slate-200 cursor-pointer"
            title="Clear all wishlisted items"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Wishlist Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistItems.map((prod) => (
          <div key={prod._id} className="relative group">
            <ProductCard product={prod} />
          </div>
        ))}
      </div>
    </div>
  );
}
