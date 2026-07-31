'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MessageSquare,
  ShieldCheck,
  Truck,
  BadgeCheck,
  ChevronRight,
  Heart,
  RotateCcw,
  Headphones,
  CreditCard,
  Send
} from 'lucide-react';
import EnquiryModal from './EnquiryModal';
import ProductCard from './ProductCard';

interface ProductData {
  _id: string;
  name: string;
  slug: string;
  description?: string;
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
  const [activeTab, setActiveTab] = useState<'description' | 'specifications'>('description');
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const imagesList = product.images && product.images.length > 0 ? product.images : ['/logo.png'];

  const discount = product.offerPrice
    ? Math.round(((product.mrp - product.offerPrice) / product.mrp) * 100)
    : 0;

  // Initialize wishlist from localStorage
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

  const toggleWishlist = () => {
    const nextState = !isWishlisted;
    setIsWishlisted(nextState);
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('sait_wishlist');
        const list = stored ? JSON.parse(stored) : {};
        if (nextState) {
          list[product._id] = true;
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
    `Hi Sait Solutions, I am interested in "${product.name}" (Brand: ${product.brand}). Price: ₹${(product.offerPrice || product.mrp).toLocaleString('en-IN')}. Link: ${typeof window !== 'undefined' ? window.location.href : ''}`
  )}`;

  // Rich description parser for paragraphs, pointers (- or *), and bold text (**word**)
  const renderFormattedDescription = (text?: string) => {
    if (!text || !text.trim()) {
      return (
        <p className="text-slate-400 italic text-sm">
          No detailed description available for this item. Please review the technical specifications below.
        </p>
      );
    }

    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let bulletBuffer: string[] = [];

    const formatLine = (str: string) => {
      const parts = str.split(/(\*\*.*?\*\*|<b>.*?<\/b>)/g);
      return parts.map((part, i) => {
        if ((part.startsWith('**') && part.endsWith('**')) || (part.startsWith('<b>') && part.endsWith('</b>'))) {
          const clean = part.replace(/^\*\*|<b>|\*\*|<\/b>$/g, '');
          return <strong key={i} className="font-extrabold text-slate-900">{clean}</strong>;
        }
        return part;
      });
    };

    const flushBullets = (keyIndex: number) => {
      if (bulletBuffer.length > 0) {
        elements.push(
          <ul key={`ul-${keyIndex}`} className="list-disc list-inside space-y-2 my-3 text-slate-700 font-medium pl-2">
            {bulletBuffer.map((b, idx) => (
              <li key={idx} className="leading-relaxed">
                {formatLine(b)}
              </li>
            ))}
          </ul>
        );
        bulletBuffer = [];
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        bulletBuffer.push(trimmed.substring(2));
      } else if (trimmed === '') {
        flushBullets(index);
      } else {
        flushBullets(index);
        elements.push(
          <p key={`p-${index}`} className="text-slate-700 leading-relaxed font-medium mb-3">
            {formatLine(trimmed)}
          </p>
        );
      }
    });

    flushBullets(lines.length);
    return elements;
  };

  const hasSpecs = Object.keys(product.specs || {}).length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-10 text-slate-800 font-sans">

      {/* 1. TOP BREADCRUMBS */}
      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium flex-wrap border-b border-slate-200 pb-4">
        <Link href="/" className="hover:text-purple-700 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link href="/categories" className="hover:text-purple-700 transition-colors">Categories</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link href={`/category/${product.category.slug}`} className="hover:text-purple-700 transition-colors">
          {product.category.name}
        </Link>
        {product.subcategory && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href={`/category/${product.category.slug}`} className="hover:text-purple-700 transition-colors">
              {product.subcategory.name}
            </Link>
          </>
        )}
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-bold truncate max-w-xs">{product.name}</span>
      </div>

      {/* 2. MAIN PRODUCT SECTION: LEFT GALLERY + RIGHT DETAILS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">

        {/* Left Column: Product Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full bg-white border border-slate-200 rounded-3xl overflow-hidden flex items-center justify-center p-8 shadow-sm group">
            <Image
              src={imagesList[activeImageIndex]}
              alt={product.name}
              fill
              className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
              priority
            />

            {/* Pagination Counter Badge (e.g. 1/1) */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/70 backdrop-blur-md text-white text-[11px] px-3.5 py-1 rounded-full font-bold">
              {activeImageIndex + 1} / {imagesList.length}
            </div>
          </div>

          {/* Thumbnails list */}
          {imagesList.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 justify-center">
              {imagesList.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-2xl border bg-white overflow-hidden shrink-0 transition-all p-2 cursor-pointer ${idx === activeImageIndex
                      ? 'border-[#5b21b6] ring-2 ring-[#5b21b6]/30 scale-105'
                      : 'border-slate-200 hover:border-purple-300'
                    }`}
                >
                  <Image src={img} alt={`${product.name} thumbnail ${idx}`} fill className="object-contain p-1" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Meta & Purchase CTAs */}
        <div className="lg:col-span-6 space-y-5">
          {/* Brand Name */}
          <div>
            <span className="text-xs font-black text-[#5b21b6] uppercase tracking-widest block">
              {product.brand}
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-1 leading-snug tracking-tight">
              {product.name}
            </h1>
          </div>

          {/* Price Block */}
          <div className="flex items-baseline gap-3 pt-1">
            <span className="text-slate-900 font-extrabold text-3xl md:text-4xl tracking-tight">
              ₹{(product.offerPrice || product.mrp).toLocaleString('en-IN')}
            </span>

            {product.offerPrice && (
              <>
                <span className="text-slate-400 text-sm md:text-base line-through font-bold">
                  ₹{product.mrp.toLocaleString('en-IN')}
                </span>
                <span className="text-emerald-600 bg-emerald-50 border border-emerald-200 font-black text-xs px-2.5 py-1 rounded-md uppercase tracking-wider">
                  {discount}% OFF
                </span>
              </>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {product.stockStatus}
            </span>
          </div>

          {/* 3 Key Trust Features Strip */}
          <div className="grid grid-cols-3 gap-3 py-3 border-t border-b border-slate-200/80">
            <div className="flex items-center gap-2 text-left">
              <div className="p-2 rounded-xl bg-purple-50 text-[#5b21b6] shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-extrabold text-slate-900 leading-tight">Official Warranty</div>
                <div className="text-[9px] text-slate-500 font-medium">Brand Authorized</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-left">
              <div className="p-2 rounded-xl bg-purple-50 text-[#5b21b6] shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-extrabold text-slate-900 leading-tight">Fast & Free</div>
                <div className="text-[9px] text-slate-500 font-medium">Express Shipping</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-left">
              <div className="p-2 rounded-xl bg-purple-50 text-[#5b21b6] shrink-0">
                <BadgeCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-extrabold text-slate-900 leading-tight">100% Genuine</div>
                <div className="text-[9px] text-slate-500 font-medium">Original Products</div>
              </div>
            </div>
          </div>

          {/* Action Buttons Stack */}
          <div className="space-y-3 pt-1">
            {/* Primary CTA: WhatsApp Query */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#5b21b6] hover:bg-[#4c1d95] text-white rounded-2xl py-3.5 px-6 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg transition-all hover:scale-[1.01] active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>WhatsApp Query</span>
            </a>

            {/* Wishlist CTA */}
            <button
              onClick={toggleWishlist}
              className={`w-full border rounded-2xl py-3 px-6 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 ${isWishlisted
                  ? 'bg-red-50 border-red-200 text-red-600'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-purple-300 hover:text-purple-700'
                }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-600 text-red-600' : ''}`} />
              <span>{isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}</span>
            </button>
          </div>

          {/* Product Meta Tags Footer */}
          <div className="pt-4 border-t border-slate-200/80 space-y-1.5 text-xs text-slate-500 font-medium">
            <div>
              <span className="font-bold text-slate-700">SKU: </span>
              <span>{product._id.substring(0, 10).toUpperCase()}</span>
            </div>
            <div>
              <span className="font-bold text-slate-700">Categories: </span>
              <Link href={`/category/${product.category.slug}`} className="hover:text-purple-700 transition-colors">
                {product.category.name}
              </Link>
              {product.subcategory && (
                <>
                  {', '}
                  <Link href={`/category/${product.category.slug}/${product.subcategory.slug}`} className="hover:text-purple-700 transition-colors">
                    {product.subcategory.name}
                  </Link>
                </>
              )}
            </div>
            <div>
              <span className="font-bold text-slate-700">Tags: </span>
              <span>{product.brand}, {product.category.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. DESCRIPTION AND SPECIFICATIONS TABS SECTION */}
      <div className="pt-6 border-t border-slate-200 space-y-6">
        {/* Tab Headers */}
        <div className="flex border-b border-slate-200 gap-8">
          <button
            onClick={() => setActiveTab('description')}
            className={`pb-3 font-extrabold text-sm transition-all cursor-pointer relative ${activeTab === 'description'
                ? 'text-[#5b21b6]'
                : 'text-slate-500 hover:text-slate-900 font-bold'
              }`}
          >
            <span>Description</span>
            {activeTab === 'description' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#5b21b6] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('specifications')}
            className={`pb-3 font-extrabold text-sm transition-all cursor-pointer relative ${activeTab === 'specifications'
                ? 'text-[#5b21b6]'
                : 'text-slate-500 hover:text-slate-900 font-bold'
              }`}
          >
            <span>Specifications</span>
            {activeTab === 'specifications' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#5b21b6] rounded-full" />
            )}
          </button>
        </div>

        {/* Tab Content Container */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
          {activeTab === 'description' ? (
            <div className="space-y-4">
              <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">Product Description</h3>
              <div className="text-slate-700 text-sm">
                {renderFormattedDescription(product.description)}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">Specifications</h3>
              {hasSpecs ? (
                <div className="overflow-hidden border border-slate-200 rounded-2xl">
                  <table className="w-full text-left text-xs md:text-sm">
                    <tbody>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <td className="py-3 px-4 md:px-6 font-extrabold text-slate-800 w-1/3 border-r border-slate-200">Brand</td>
                        <td className="py-3 px-4 md:px-6 font-bold text-slate-900">{product.brand}</td>
                      </tr>
                      {Object.entries(product.specs).map(([key, val], idx) => (
                        <tr
                          key={key}
                          className={`border-b border-slate-200/70 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'
                            }`}
                        >
                          <td className="py-3 px-4 md:px-6 font-bold text-slate-700 w-1/3 border-r border-slate-200/70">{key}</td>
                          <td className="py-3 px-4 md:px-6 font-medium text-slate-900">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-slate-400 italic text-sm">
                  No technical specifications provided for this product yet.
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 4. YOU MAY ALSO LIKE SECTION */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-6 border-t border-slate-200">
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">You May Also Like</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((prod) => (
              <ProductCard key={prod._id} product={prod} />
            ))}
          </div>
        </section>
      )}

      {/* 5. BOTTOM VALUE TRUST STRIP */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-8 border-t border-slate-200 text-center">
        <div className="flex flex-col items-center p-3 space-y-1.5">
          <BadgeCheck className="w-6 h-6 text-[#5b21b6]" />
          <span className="text-xs font-black text-slate-900">100% Genuine Products</span>
          <span className="text-[10px] text-slate-400 font-medium">Official brand warranty</span>
        </div>

        <div className="flex flex-col items-center p-3 space-y-1.5">
          <Truck className="w-6 h-6 text-[#5b21b6]" />
          <span className="text-xs font-black text-slate-900">Fast & Free Delivery</span>
          <span className="text-[10px] text-slate-400 font-medium">On orders above ₹999</span>
        </div>

        <div className="flex flex-col items-center p-3 space-y-1.5">
          <CreditCard className="w-6 h-6 text-[#5b21b6]" />
          <span className="text-xs font-black text-slate-900">Secure Payments</span>
          <span className="text-[10px] text-slate-400 font-medium">Multiple payment options</span>
        </div>

        <div className="flex flex-col items-center p-3 space-y-1.5">
          <RotateCcw className="w-6 h-6 text-[#5b21b6]" />
          <span className="text-xs font-black text-slate-900">Easy Exchange</span>
          <span className="text-[10px] text-slate-400 font-medium">Replacement against defects</span>
        </div>

        <div className="flex flex-col items-center p-3 space-y-1.5 col-span-2 md:col-span-1">
          <Headphones className="w-6 h-6 text-[#5b21b6]" />
          <span className="text-xs font-black text-slate-900">Expert Support</span>
          <span className="text-[10px] text-slate-400 font-medium">24/7 customer support</span>
        </div>
      </div>

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
