'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, Send } from 'lucide-react';

export interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    slug: string;
    description: string;
    mrp: number;
    offerPrice?: number;
    brand: string;
    specs?: Record<string, string>;
    images: string[];
    stockStatus: 'In Stock' | 'Out of Stock' | 'Call for Availability';
  };
  viewMode?: 'grid' | 'list';
}

export default function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('sait_wishlist');
        if (stored) {
          const list = JSON.parse(stored);
          setIsWishlisted(!!list[product._id]);
        }
      } catch (e) {
        console.error('Wishlist error:', e);
      }
    }
  }, [product._id]);

  const discount = product.offerPrice && product.mrp > product.offerPrice
    ? Math.round(((product.mrp - product.offerPrice) / product.mrp) * 100)
    : 0;

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nextState = !isWishlisted;
    setIsWishlisted(nextState);

    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('sait_wishlist');
        const list = stored ? JSON.parse(stored) : {};
        if (nextState) {
          list[product._id] = product;
        } else {
          delete list[product._id];
        }
        localStorage.setItem('sait_wishlist', JSON.stringify(list));
      } catch (e) {
        console.error('Wishlist error:', e);
      }
    }
  };

  const whatsappNumber = '919876543210';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hi Sait Solutions, I am interested in "${product.name}" (Brand: ${product.brand}). Price: ₹${(product.offerPrice || product.mrp).toLocaleString('en-IN')}. Link: ${typeof window !== 'undefined' ? `${window.location.origin}/product/${product.slug}` : ''}`
  )}`;

  // LIST VIEW HORIZONTAL LAYOUT
  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ y: -3, transition: { duration: 0.2, ease: 'easeOut' } }}
        className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-5 hover:shadow-xl transition-all duration-300 relative group w-full font-sans"
      >
        {/* Left Side: Image */}
        <Link href={`/product/${product.slug}`} className="w-full sm:w-48 h-40 relative flex items-center justify-center bg-slate-50/60 rounded-xl overflow-hidden shrink-0 border border-slate-100 p-2">
          {discount > 0 && (
            <span className="absolute top-2.5 left-2.5 bg-[#5b21b6] text-white text-[8px] sm:text-[9px] font-black tracking-wider px-2 py-0.5 rounded-full z-10 shadow-sm">
              -{discount}%
            </span>
          )}
          <Image
            src={product.images && product.images[0] ? product.images[0] : '/logo.png'}
            alt={product.name}
            fill
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, 200px"
          />
        </Link>

        {/* Middle: Content */}
        <div className="flex-1 space-y-2 w-full">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[9px] text-slate-400 uppercase tracking-widest font-black block">
              {product.brand}
            </span>
            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${product.stockStatus === 'In Stock'
                ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                : product.stockStatus === 'Call for Availability'
                  ? 'bg-amber-50 text-amber-600 border border-amber-100'
                  : 'bg-rose-50 text-rose-600 border border-rose-100'
              }`}>
              {product.stockStatus}
            </span>
          </div>

          <Link
            href={`/product/${product.slug}`}
            className="text-slate-900 hover:text-[#5b21b6] font-extrabold text-sm sm:text-base line-clamp-1 leading-snug tracking-tight block"
          >
            {product.name}
          </Link>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-medium">
            {product.description}
          </p>
        </div>

        {/* Right Side: Price & Direct WhatsApp CTA */}
        <div className="w-full sm:w-48 flex flex-row sm:flex-col justify-between sm:justify-center items-center sm:items-end gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 sm:border-l border-slate-100 sm:pl-5 shrink-0">
          <div className="flex flex-col items-start sm:items-end">
            <div className="flex items-baseline gap-1.5">
              {product.offerPrice ? (
                <>
                  <span className="text-slate-900 font-black text-base sm:text-lg">
                    ₹{product.offerPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-slate-400 text-xs line-through">
                    ₹{product.mrp.toLocaleString('en-IN')}
                  </span>
                </>
              ) : (
                <span className="text-slate-900 font-black text-base sm:text-lg">
                  ₹{product.mrp.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            {discount > 0 && (
              <span className="text-[10px] font-extrabold text-emerald-600">Save {discount}%</span>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <motion.button
              whileTap={{ scale: 0.85 }}
              whileHover={{ scale: 1.1 }}
              onClick={toggleWishlist}
              className={`p-2 rounded-full border transition-all cursor-pointer ${isWishlisted
                  ? 'bg-red-50 border-red-200 text-red-500 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-red-200 text-slate-400 hover:text-red-500 hover:bg-red-50/50'
                }`}
              title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
            </motion.button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:w-full bg-[#5b21b6] hover:bg-[#4c1d95] text-white rounded-xl py-2 sm:py-2.5 px-3 transition-all text-[10.5px] sm:text-xs font-black tracking-wide flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer shadow-sm whitespace-nowrap"
            >
              <Send className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              <span>Send Enquiry</span>
            </a>
          </div>
        </div>
      </motion.div>
    );
  }

  // STANDARD GRID VIEW VERTICAL CARD LAYOUT
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2, ease: 'easeOut' } }}
      className="bg-white border border-slate-100 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between hover:shadow-xl transition-all duration-300 relative group h-full font-sans"
    >
      <div>
        {/* Purple Discount Badge */}
        {discount > 0 && (
          <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#5b21b6] text-white text-[8px] sm:text-[9px] font-black tracking-wider px-2 py-0.5 rounded-full z-10 shadow-sm">
            -{discount}%
          </span>
        )}

        {/* Stock Status Badge */}
        <span className={`absolute top-3 right-3 sm:top-4 sm:right-4 text-[8px] sm:text-[9px] font-bold px-2 py-0.5 rounded-full z-10 ${product.stockStatus === 'In Stock'
            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
            : product.stockStatus === 'Call for Availability'
              ? 'bg-amber-50 text-amber-600 border border-amber-100'
              : 'bg-rose-50 text-rose-600 border border-rose-100'
          }`}>
          {product.stockStatus}
        </span>

        {/* Centered Image Box */}
        <Link href={`/product/${product.slug}`} className="block w-full aspect-[4/3] relative flex items-center justify-center bg-slate-50/50 rounded-lg sm:rounded-xl overflow-hidden mb-3 border border-slate-50 p-2">
          <Image
            src={product.images && product.images[0] ? product.images[0] : '/logo.png'}
            alt={product.name}
            fill
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, 300px"
          />
        </Link>

        {/* Brand and Title */}
        <div className="space-y-1">
          <span className="text-[8px] sm:text-[9px] text-slate-400 uppercase tracking-widest font-black block">
            {product.brand}
          </span>
          <Link
            href={`/product/${product.slug}`}
            className="text-slate-800 hover:text-[#5b21b6] font-bold text-xs sm:text-sm line-clamp-2 leading-snug tracking-tight block"
          >
            {product.name}
          </Link>
        </div>
      </div>

      {/* Bottom Price, Wishlist and Direct WhatsApp Query CTA */}
      <div className="mt-4 pt-3 border-t border-slate-50 space-y-2 sm:space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1.5">
            {product.offerPrice ? (
              <>
                <span className="text-slate-900 font-extrabold text-sm sm:text-base">
                  ₹{product.offerPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-slate-400 text-[10px] sm:text-xs line-through">
                  ₹{product.mrp.toLocaleString('en-IN')}
                </span>
              </>
            ) : (
              <span className="text-slate-900 font-extrabold text-sm sm:text-base">
                ₹{product.mrp.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Animated Wishlist Button */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            whileHover={{ scale: 1.1 }}
            onClick={toggleWishlist}
            className={`p-1.5 rounded-full border transition-all cursor-pointer ${isWishlisted
                ? 'bg-red-50 border-red-200 text-red-500 shadow-sm'
                : 'bg-white border-slate-100 hover:border-red-200 text-slate-400 hover:text-red-500 hover:bg-red-50/50'
              }`}
            title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
          </motion.button>
        </div>

        {/* Direct WhatsApp Query CTA Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#5b21b6] hover:bg-[#4c1d95] text-white rounded-lg sm:rounded-xl py-2 sm:py-2.5 px-1.5 transition-all text-[10.5px] sm:text-xs font-black tracking-tight flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer shadow-sm active:scale-95 whitespace-nowrap"
        >
          <Send className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
          <span>Send Enquiry</span>
        </a>
      </div>
    </motion.div>
  );
}
