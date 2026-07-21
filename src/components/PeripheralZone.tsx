'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowRight, Heart, MessageSquare } from 'lucide-react';
import EnquiryModal from './EnquiryModal';

interface PeripheralProduct {
  id: string;
  categoryTitle: string;
  modelName: string;
  price: number;
  image: string;
  slug: string;
}

const PERIPHERAL_PRODUCTS: PeripheralProduct[] = [
  {
    id: 'perip-1',
    categoryTitle: 'Mechanical Keyboard',
    modelName: 'Logitech G Pro X',
    price: 10499,
    image: '/peripheral_keyboard.png',
    slug: 'logitech-g-pro-x-keyboard',
  },
  {
    id: 'perip-2',
    categoryTitle: 'Wireless Mouse',
    modelName: 'Razer DeathAdder V2',
    price: 5499,
    image: '/peripheral_mouse.png',
    slug: 'razer-deathadder-v2-mouse',
  },
  {
    id: 'perip-3',
    categoryTitle: 'Gaming Headset',
    modelName: 'HyperX Cloud III',
    price: 12499,
    image: '/peripheral_headset.png',
    slug: 'hyperx-cloud-iii-headset',
  },
  {
    id: 'perip-4',
    categoryTitle: 'Gaming Chair',
    modelName: 'Cooler Master Caliber R2',
    price: 18999,
    image: '/peripheral_chair.png',
    slug: 'cooler-master-caliber-r2-chair',
  },
  {
    id: 'perip-5',
    categoryTitle: 'Webcam',
    modelName: 'Logitech C922 Pro',
    price: 6199,
    image: '/peripheral_webcam.png',
    slug: 'logitech-c922-pro-webcam',
  },
  {
    id: 'perip-6',
    categoryTitle: 'High DPI Mouse',
    modelName: 'Logitech G502 Hero',
    price: 4499,
    image: '/peripheral_mouse.png',
    slug: 'logitech-g502-hero',
  },
  {
    id: 'perip-7',
    categoryTitle: 'RGB Keyboard',
    modelName: 'Corsair K70 RGB PRO',
    price: 13999,
    image: '/peripheral_keyboard.png',
    slug: 'corsair-k70-rgb-pro',
  },
  {
    id: 'perip-8',
    categoryTitle: 'Surround Headset',
    modelName: 'Razer Kraken V3',
    price: 8999,
    image: '/peripheral_headset.png',
    slug: 'razer-kraken-v3',
  },
  {
    id: 'perip-9',
    categoryTitle: 'Streaming Cam',
    modelName: 'Elgato Facecam 1080p',
    price: 14999,
    image: '/peripheral_webcam.png',
    slug: 'elgato-facecam-1080p',
  },
  {
    id: 'perip-10',
    categoryTitle: 'Ergonomic Chair',
    modelName: 'Secretlab TITAN EVO',
    price: 34999,
    image: '/peripheral_chair.png',
    slug: 'secretlab-titan-evo-chair',
  },
];

export default function PeripheralZone() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<PeripheralProduct | null>(null);
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardElement = container.querySelector('.shrink-0');
      const cardWidth = cardElement ? cardElement.getBoundingClientRect().width : 200;
      const gap = 16;
      const scrollAmount = (cardWidth + gap) * 2;

      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="w-full pt-6 md:pt-8 pb-3 md:pb-4 bg-white overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-4 md:px-8">
        
        {/* Main Banner Box with peripheral_zone.png as Full Background */}
        <div className="relative w-full rounded-3xl overflow-hidden shadow-sm bg-[#ece7f9] border border-purple-100/50 min-h-[380px] flex flex-col justify-center">
          
          {/* Background Image Container - Clear Image without white gradient overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/peripheral_zone.png"
              alt="Peripheral Zone Studio Background"
              fill
              className="object-cover object-left lg:object-center pointer-events-none opacity-100"
              sizes="(max-width: 1500px) 100vw, 1500px"
              priority
            />
          </div>

          {/* Foreground Content */}
          <div className="relative z-10 p-6 sm:p-8 lg:p-9 flex flex-col justify-center">
            
            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column */}
              <div className="lg:col-span-4 flex flex-col items-start justify-start pt-6 sm:pt-8 md:pt-10 pl-2 sm:pl-4 md:pl-6 space-y-3.5">
                <h2 className="text-3xl sm:text-4xl lg:text-4xl xl:text-4xl font-black text-slate-900 tracking-tight leading-none font-sans uppercase">
                  PERIPHERAL <span className="text-[#5b21b6]">ZONE</span>
                </h2>
                
                <p className="text-xs sm:text-sm font-semibold text-slate-700 max-w-xs leading-relaxed">
                  Everything you need for smooth control, comfort & immersion.
                </p>

                <div className="pt-1">
                  <Link
                    href="/category/peripherals"
                    className="inline-flex items-center gap-2 bg-[#5b21b6] hover:bg-[#4c1d95] text-white text-xs sm:text-sm font-extrabold px-4.5 py-2.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-purple-500/20 hover:scale-[1.02] active:scale-95 cursor-pointer"
                  >
                    <span>Explore All Peripherals</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-8 flex flex-col relative pl-1 sm:pl-3">
                
                {/* Navigation Arrows */}
                <div className="flex justify-end items-center mb-2.5">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleScroll('left')}
                      className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm flex items-center justify-center transition-all cursor-pointer active:scale-95"
                      aria-label="Previous Peripherals"
                    >
                      <ChevronLeft className="w-4.5 h-4.5 text-slate-700" />
                    </button>
                    <button
                      onClick={() => handleScroll('right')}
                      className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm flex items-center justify-center transition-all cursor-pointer active:scale-95"
                      aria-label="Next Peripherals"
                    >
                      <ChevronRight className="w-4.5 h-4.5 text-slate-700" />
                    </button>
                  </div>
                </div>

                {/* Horizontal Scroll Track */}
                <div
                  ref={scrollRef}
                  className="flex gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth pb-2 no-scrollbar items-stretch"
                  style={{
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                  }}
                >
                  <style>{`
                    .no-scrollbar::-webkit-scrollbar {
                      display: none !important;
                    }
                  `}</style>

                  {PERIPHERAL_PRODUCTS.map((prod) => {
                    const isWishlisted = !!wishlist[prod.id];
                    return (
                      <div
                        key={prod.id}
                        className="w-[180px] sm:w-[200px] xl:w-[210px] shrink-0 snap-start bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group border border-slate-100/80"
                      >
                        <div>
                          {/* Image Box & Wishlist Button */}
                          <div className="w-full h-35 relative mb-3 bg-slate-50/50 rounded-xl flex items-center justify-center overflow-hidden p-2">
                            <Image
                              src={prod.image}
                              alt={prod.modelName}
                              fill
                              className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                              sizes="200px"
                            />
                            
                            {/* Wishlist Button */}
                            <button
                              onClick={(e) => toggleWishlist(prod.id, e)}
                              className={`absolute top-2 right-2 p-1.5 rounded-full border transition-all cursor-pointer z-10 ${
                                isWishlisted
                                  ? 'bg-red-50 border-red-200 text-red-500 shadow-sm'
                                  : 'bg-white/80 backdrop-blur-sm border-slate-100 text-slate-400 hover:text-red-500 hover:bg-white'
                              }`}
                              title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                            >
                              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-red-500' : ''}`} />
                            </button>
                          </div>

                          {/* Category & Model */}
                          <div className="space-y-0.5">
                            <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm leading-snug group-hover:text-[#5b21b6] transition-colors">
                              {prod.categoryTitle}
                            </h3>
                            <p className="text-slate-400 text-[11px] sm:text-xs font-semibold line-clamp-1">
                              {prod.modelName}
                            </p>
                          </div>
                        </div>

                        {/* Price & Send Enquiry CTA Button */}
                        <div className="mt-3 pt-2 border-t border-slate-100 space-y-2">
                          <span className="text-slate-900 font-black text-xs sm:text-sm block">
                            ₹{prod.price.toLocaleString('en-IN')}
                          </span>

                          <button
                            onClick={() => setSelectedProduct(prod)}
                            className="w-full bg-gradient-to-r from-[#5b21b6] to-[#4c1d95] hover:brightness-110 text-white rounded-xl py-2 px-3 transition-all text-xs font-bold tracking-wide flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-98"
                          >
                            <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                            <span>Send Enquiry</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Enquiry Modal overlay when Send Enquiry is clicked */}
      {selectedProduct && (
        <EnquiryModal
          product={{
            name: `${selectedProduct.categoryTitle} - ${selectedProduct.modelName}`,
            slug: selectedProduct.slug,
          }}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}
