'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MessageSquare, Share2, ClipboardCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import EnquiryModal from './EnquiryModal';
import ProductCard from './ProductCard';

interface ProductData {
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
  category: { _id: string; name: string; slug: string };
  subcategory?: { _id: string; name: string; slug: string };
}

interface ProductDetailClientProps {
  product: ProductData;
  relatedProducts: any[];
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const discount = product.offerPrice
    ? Math.round(((product.mrp - product.offerPrice) / product.mrp) * 100)
    : 0;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-16 text-slate-800">
      
      {/* Breadcrumbs & Back Link */}
      <div className="flex justify-between items-center text-xs text-slate-500 pb-3 border-b border-slate-200">
        <div className="flex items-center gap-1.5 font-medium">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/category/${product.category.slug}`} className="hover:text-accent transition-colors">
            {product.category.name}
          </Link>
          {product.subcategory && (
            <>
              <span>/</span>
              <Link href={`/category/${product.category.slug}/${product.subcategory.slug}`} className="hover:text-accent transition-colors">
                {product.subcategory.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-slate-800 font-semibold truncate max-w-xs">{product.name}</span>
        </div>
        <Link href={`/category/${product.category.slug}`} className="flex items-center gap-1 hover:text-accent font-semibold transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to catalog</span>
        </Link>
      </div>

      {/* Main Info Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Image Gallery */}
        <div className="space-y-4">
          <div className="relative h-96 md:h-[500px] w-full bg-white border border-slate-200 rounded-2xl overflow-hidden flex items-center justify-center p-8 shadow-sm">
            <Image
              src={product.images[activeImageIndex] || '/logo.png'}
              alt={product.name}
              fill
              className="object-contain p-8 animate-in fade-in duration-300"
              priority
            />
            {discount > 0 && (
              <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                🔥 SAVE {discount}%
              </span>
            )}
          </div>
          {/* Thumbnails (If multiple images exist) */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-lg border bg-white overflow-hidden shrink-0 transition-all p-2 ${
                    idx === activeImageIndex ? 'border-accent ring-1 ring-accent' : 'border-slate-200 hover:border-slate-350'
                  }`}
                >
                  <Image src={img} alt={`${product.name} thumbnail ${idx}`} fill className="object-contain p-1" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Pricing & Purchasing */}
        <div className="space-y-6 flex flex-col justify-center">
          <div className="space-y-2.5">
            {/* Brand */}
            <span className="text-xs text-accent uppercase tracking-widest font-extrabold px-3 py-1 rounded bg-accent/5 border border-accent/10 inline-block">
              {product.brand}
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
              {product.name}
            </h1>
            
            {/* Stock status */}
            <div className="flex items-center gap-2 pt-1">
              <span className={`w-2.5 h-2.5 rounded-full ${
                product.stockStatus === 'In Stock' ? 'bg-emerald-500' : 'bg-amber-500'
              }`} />
              <span className="text-xs text-slate-500 font-medium">
                Availability: <strong className="text-slate-800 font-bold">{product.stockStatus}</strong>
              </span>
            </div>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed border-t border-b border-slate-200/60 py-5">
            {product.description}
          </p>

          {/* Pricing & CTA Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
            <div>
              <span className="text-xs text-slate-400 block uppercase font-bold tracking-wider">Dealer Estimated Price</span>
              <div className="flex items-baseline gap-3 mt-1">
                {product.offerPrice ? (
                  <>
                    <span className="text-slate-950 font-extrabold text-3xl">₹{product.offerPrice.toLocaleString('en-IN')}</span>
                    <span className="text-slate-400 text-sm line-through font-medium">₹{product.mrp.toLocaleString('en-IN')}</span>
                  </>
                ) : (
                  <span className="text-slate-850 font-extrabold text-2xl">Enquire for Best Price</span>
                )}
              </div>
              <p className="text-[10px] text-slate-400 mt-2 font-medium">
                * Note: Prices are indicative. Connect on WhatsApp to fetch customized bulk wholesale distributor pricing.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setIsEnquiryOpen(true)}
                className="w-full bg-gradient-to-r from-brand-purple-light to-brand-purple-dark text-white rounded-xl py-3.5 hover:brightness-110 transition-all font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-brand-purple-light/10"
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>Enquire on WhatsApp</span>
              </button>
              <button
                onClick={handleShare}
                className="w-full bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-xl py-3.5 transition-all text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
              >
                {copied ? (
                  <>
                    <ClipboardCheck className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-600">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    <span>Copy Page Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Specifications Sheet */}
      {Object.keys(product.specs).length > 0 && (
        <section className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-sm">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold text-slate-900">Technical Specifications</h2>
            <p className="text-xs text-slate-400 font-medium">Detailed hardware and hardware metrics for {product.name}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1">
            {Object.entries(product.specs).map(([key, val]) => (
              <div key={key} className="flex justify-between items-center border-b border-slate-100 py-3 text-sm">
                <span className="text-slate-400 font-bold uppercase text-xs">{key}</span>
                <span className="text-slate-900 font-semibold text-right pl-4">{val}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="space-y-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Related Products</h2>
            <p className="text-xs text-slate-400 font-medium">Check similar options in this hardware domain</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((prod) => (
              <ProductCard key={prod._id} product={prod} />
            ))}
          </div>
        </section>
      )}

      {/* Enquiry Modal */}
      {isEnquiryOpen && (
        <EnquiryModal
          product={product}
          onClose={() => setIsEnquiryOpen(false)}
        />
      )}
    </div>
  );
}
