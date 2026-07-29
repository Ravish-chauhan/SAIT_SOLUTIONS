'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MessageSquare,
  Share2,
  ClipboardCheck,
  ArrowLeft,
  ShieldCheck,
  Truck,
  FileText,
  BadgeCheck,
  PhoneCall,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Copy
} from 'lucide-react';
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
  const [copiedSpecs, setCopiedSpecs] = useState(false);

  const imagesList = product.images && product.images.length > 0 ? product.images : ['/logo.png'];

  const discount = product.offerPrice
    ? Math.round(((product.mrp - product.offerPrice) / product.mrp) * 100)
    : 0;

  const whatsappNumber = '919876543210';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hi Sait Solutions, I am interested in receiving a bulk price quote for "${product.name}" (Brand: ${product.brand}). URL: ${typeof window !== 'undefined' ? window.location.href : ''}`
  )}`;

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopySpecs = () => {
    const specsString = Object.entries(product.specs || {})
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n');
    navigator.clipboard.writeText(`${product.name}\nBrand: ${product.brand}\n\nTechnical Specifications:\n${specsString}`);
    setCopiedSpecs(true);
    setTimeout(() => setCopiedSpecs(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-12 text-slate-800 font-sans">
      
      {/* Breadcrumbs & Navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs text-slate-500 pb-4 border-b border-slate-200 font-medium">
        <div className="flex items-center flex-wrap gap-1.5">
          <Link href="/" className="hover:text-purple-700 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/products" className="hover:text-purple-700 transition-colors font-bold text-purple-700">
            All Products
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href={`/category/${product.category.slug}`} className="hover:text-purple-700 transition-colors">
            {product.category.name}
          </Link>
          {product.subcategory && (
            <>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <Link href={`/category/${product.category.slug}`} className="hover:text-purple-700 transition-colors">
                {product.subcategory.name}
              </Link>
            </>
          )}
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-900 font-bold truncate max-w-xs">{product.name}</span>
        </div>

        <Link
          href={`/products?category=${product.category.slug}`}
          className="flex items-center gap-1.5 text-purple-700 hover:text-purple-900 font-extrabold transition-colors bg-purple-50 border border-purple-200 px-3 py-1.5 rounded-xl text-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Switch Category / Catalog</span>
        </Link>
      </div>

      {/* Main Info Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Column: Image Gallery */}
        <div className="space-y-4 sticky top-24">
          <div className="relative h-96 md:h-[480px] w-full bg-white border border-slate-200 rounded-3xl overflow-hidden flex items-center justify-center p-8 shadow-sm group">
            <Image
              src={imagesList[activeImageIndex]}
              alt={product.name}
              fill
              className="object-contain p-8 group-hover:scale-105 transition-transform duration-300"
              priority
            />

            {discount > 0 && (
              <span className="absolute top-5 left-5 bg-purple-700 text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg tracking-wider uppercase">
                🔥 SAVE {discount}%
              </span>
            )}

            <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md text-white text-[11px] px-3 py-1 rounded-full font-bold flex items-center gap-1">
              <BadgeCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>Genuine Hardware</span>
            </div>
          </div>

          {/* Thumbnails */}
          {imagesList.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {imagesList.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-2xl border bg-white overflow-hidden shrink-0 transition-all p-2 cursor-pointer ${
                    idx === activeImageIndex
                      ? 'border-purple-600 ring-2 ring-purple-600/30 scale-105'
                      : 'border-slate-200 hover:border-purple-300'
                  }`}
                >
                  <Image src={img} alt={`${product.name} thumbnail ${idx}`} fill className="object-contain p-1" />
                </button>
              ))}
            </div>
          )}

          {/* B2B Value Badges Strip */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-center space-y-1">
              <ShieldCheck className="w-5 h-5 text-purple-600 mx-auto" />
              <div className="text-[11px] font-extrabold text-slate-900">Official Warranty</div>
              <div className="text-[9px] text-slate-500 font-medium">100% Brand Authorized</div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-center space-y-1">
              <Truck className="w-5 h-5 text-purple-600 mx-auto" />
              <div className="text-[11px] font-extrabold text-slate-900">Express Delivery</div>
              <div className="text-[9px] text-slate-500 font-medium">Pan-India Dispatch</div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-center space-y-1">
              <FileText className="w-5 h-5 text-purple-600 mx-auto" />
              <div className="text-[11px] font-extrabold text-slate-900">GST Invoice</div>
              <div className="text-[9px] text-slate-500 font-medium">Input Tax Credit Ready</div>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing & Quotation CTAs */}
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-purple-700 bg-purple-50 border border-purple-200 uppercase tracking-widest font-black px-3 py-1 rounded-lg">
                {product.brand}
              </span>
              <span className="text-xs text-slate-400 font-bold">•</span>
              <span className="text-xs text-slate-500 font-bold uppercase">{product.category.name}</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
              {product.name}
            </h1>

            {/* Stock status */}
            <div className="flex items-center gap-2 pt-1">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  product.stockStatus === 'In Stock' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                }`}
              />
              <span className="text-xs text-slate-600 font-semibold">
                Availability: <strong className="text-slate-900 font-extrabold">{product.stockStatus}</strong>
              </span>
            </div>
          </div>

          <p className="text-slate-600 text-xs md:text-sm leading-relaxed border-t border-b border-slate-200 py-4 font-medium">
            {product.description}
          </p>

          {/* Pricing & Inquiry Action Box */}
          <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white rounded-3xl p-6 space-y-5 shadow-xl border border-purple-800/40">
            <div>
              <span className="text-[11px] text-purple-300 uppercase font-black tracking-widest block">
                Estimated Dealer Wholesale Price
              </span>
              <div className="flex items-baseline gap-3 mt-1">
                {product.offerPrice ? (
                  <>
                    <span className="text-white font-black text-3xl md:text-4xl">
                      ₹{product.offerPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-slate-400 text-base line-through font-bold">
                      ₹{product.mrp.toLocaleString('en-IN')}
                    </span>
                  </>
                ) : (
                  <span className="text-white font-black text-2xl md:text-3xl">
                    ₹{product.mrp.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-300 mt-2 leading-relaxed">
                * Rates are indicative for single unit purchase. Request an instant quote for volume business pricing and GST bill breakdown.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setIsEnquiryOpen(true)}
                className="w-full bg-purple-600 hover:bg-purple-500 text-white rounded-2xl py-4 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-purple-600/30 transition-all hover:scale-[1.02]"
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>Request B2B Quote</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25d366] hover:bg-[#20bd5a] text-white rounded-2xl py-4 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#25d366]/20 transition-all hover:scale-[1.02]"
              >
                <PhoneCall className="w-4 h-4 shrink-0" />
                <span>WhatsApp Instant Quote</span>
              </a>
            </div>

            <div className="flex justify-between items-center text-xs text-slate-300 pt-2 border-t border-white/10 font-semibold">
              <button
                onClick={handleShare}
                className="hover:text-purple-300 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <ClipboardCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Page Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    <span>Share Product Page</span>
                  </>
                )}
              </button>

              <button
                onClick={handleCopySpecs}
                className="hover:text-purple-300 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedSpecs ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Specs Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Tech Specs</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Specs Highlight Box */}
          {Object.keys(product.specs || {}).length > 0 && (
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600" /> Key Technical Specs
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-6 text-xs">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="flex justify-between border-b border-slate-200/60 pb-1.5">
                    <span className="text-slate-500 font-bold uppercase text-[11px]">{key}</span>
                    <span className="text-slate-900 font-extrabold text-right pl-2">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-6 border-t border-slate-200">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Similar Products in {product.category.name}</h2>
            <p className="text-xs text-slate-500 font-medium">Explore related IT hardware models and enterprise components</p>
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
