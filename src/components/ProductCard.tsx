'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MessageSquare, Eye } from 'lucide-react';
import EnquiryModal from './EnquiryModal';

export interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    slug: string;
    description: string;
    mrp: number;
    offerPrice?: number;
    brand: string;
    specs: Record<string, string>;
    images: string[];
    stockStatus: 'In Stock' | 'Out of Stock' | 'Call for Availability';
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const discount = product.offerPrice
    ? Math.round(((product.mrp - product.offerPrice) / product.mrp) * 100)
    : 0;

  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-purple-light/25 transition-all duration-300 flex flex-col h-full group relative">
      
      {/* Discount / Offer Badge */}
      {discount > 0 && (
        <span className="absolute top-3.5 left-3.5 bg-blue-600 text-white text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full z-10 shadow-sm">
          {discount}% OFF
        </span>
      )}

      {/* Stock Status Badge */}
      <span className={`absolute top-3.5 right-3.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full z-10 ${
        product.stockStatus === 'In Stock'
          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
          : product.stockStatus === 'Call for Availability'
          ? 'bg-amber-50 text-amber-600 border border-amber-100'
          : 'bg-rose-50 text-rose-600 border border-rose-100'
      }`}>
        {product.stockStatus}
      </span>

      {/* Image Block */}
      <Link href={`/product/${product.slug}`} className="block relative h-48 bg-slate-50/80 overflow-hidden shrink-0 border-b border-slate-100">
        <Image
          src={product.images[0] || '/logo.png'}
          alt={product.name}
          fill
          className="object-contain p-6 group-hover:scale-103 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="flex items-center gap-1.5 bg-white border border-slate-200 text-slate-800 text-xs font-bold px-3.5 py-2 rounded-full shadow-lg">
            <Eye className="w-4 h-4 text-accent" />
            Quick View
          </span>
        </div>
      </Link>

      {/* Specs & Info */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div className="space-y-2">
          {/* Brand */}
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold block">
            {product.brand}
          </span>

          {/* Title */}
          <Link href={`/product/${product.slug}`} className="text-slate-800 hover:text-accent font-bold text-sm line-clamp-2 leading-snug">
            {product.name}
          </Link>

          {/* Spec Dense Section */}
          {Object.keys(product.specs).length > 0 && (
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 space-y-2 text-xs text-slate-600">
              {Object.entries(product.specs).slice(0, 3).map(([key, val]) => (
                <div key={key} className="flex justify-between items-center gap-2 border-b border-slate-200/50 pb-1.5 last:border-0 last:pb-0">
                  <span className="text-[9px] text-slate-400 uppercase font-extrabold shrink-0">{key}</span>
                  <span className="text-[11px] truncate text-right font-semibold text-slate-700">{val}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-4">
          {/* Price Block */}
          <div className="flex items-baseline gap-2 mb-4">
            {product.offerPrice ? (
              <>
                <span className="text-slate-900 font-extrabold text-lg">₹{product.offerPrice.toLocaleString('en-IN')}</span>
                <span className="text-slate-400 text-xs line-through">₹{product.mrp.toLocaleString('en-IN')}</span>
              </>
            ) : (
              <span className="text-slate-500 font-bold text-sm">Enquire for Best Price</span>
            )}
          </div>

          {/* Action Buttons */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-gradient-to-r from-brand-purple-light to-brand-purple-dark text-white rounded-xl py-3 hover:brightness-110 transition-all text-xs font-bold tracking-wide flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
          >
            <MessageSquare className="w-3.5 h-3.5 shrink-0" />
            <span>Enquire on WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Enquiry Modal */}
      {isModalOpen && (
        <EnquiryModal
          product={product}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
