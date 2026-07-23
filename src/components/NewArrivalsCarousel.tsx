'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, MessageSquare, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import EnquiryModal from './EnquiryModal';

interface MockProduct {
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
  rating: number;
  reviewsCount: number;
  discount: number;
}

export default function NewArrivalsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<MockProduct | null>(null);
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const newArrivalsProducts: MockProduct[] = [
    {
      _id: 'new-1',
      name: 'NVIDIA GeForce RTX 4080 Super 16GB OC Edition',
      slug: 'nvidia-geforce-rtx-4080-super-16gb',
      description: 'Ultra-performance graphics card powered by Ada Lovelace architecture, DLSS 3.5, and advanced ray tracing cores for high frame-rate 4K gaming.',
      mrp: 115000,
      offerPrice: 98999,
      brand: 'NVIDIA',
      specs: { 'VRAM': '16GB GDDR6X', 'Architecture': 'Ada Lovelace', 'Ray Tracing': '3rd Gen' },
      images: ['/rtx_gpu.png'],
      stockStatus: 'In Stock',
      rating: 5,
      reviewsCount: 84,
      discount: 14
    },
    {
      _id: 'new-2',
      name: 'AMD Ryzen 9 7950X 16-Core 32-Thread Processor',
      slug: 'amd-ryzen-9-7950x-processor',
      description: 'Flagship desktop processor built on 5nm Zen 4 architecture with up to 5.7GHz boost clock for extreme workstation workloads and 4K gaming.',
      mrp: 62000,
      offerPrice: 52999,
      brand: 'AMD',
      specs: { 'Cores / Threads': '16 / 32', 'Boost Clock': 'Up to 5.7GHz', 'Socket': 'AM5' },
      images: ['/ryzen_processor.png'],
      stockStatus: 'In Stock',
      rating: 4.8,
      reviewsCount: 112,
      discount: 15
    },
    {
      _id: 'new-3',
      name: 'ASUS ROG Strix B550-F Gaming WiFi II Motherboard',
      slug: 'asus-rog-strix-b550-f-gaming-motherboard',
      description: 'High-end gaming motherboard featuring PCIe 4.0, 12+2 power stages, WiFi 6E, SupremeFX audio, and Aura Sync RGB lighting.',
      mrp: 22500,
      offerPrice: 18999,
      brand: 'ASUS',
      specs: { 'Form Factor': 'ATX', 'PCIe': 'PCIe 4.0 Ready', 'Wireless': 'WiFi 6E + BT 5.2' },
      images: ['/b550m_motherboard.png'],
      stockStatus: 'In Stock',
      rating: 4.5,
      reviewsCount: 65,
      discount: 16
    },
    {
      _id: 'new-4',
      name: 'Corsair RM850x 850W 80 Plus Gold Modular PSU',
      slug: 'corsair-rm850x-850w-power-supply',
      description: 'Fully modular low-noise power supply with 100% Japanese 105°C capacitors, Zero RPM fan mode, and high power efficiency.',
      mrp: 14500,
      offerPrice: 11899,
      brand: 'Corsair',
      specs: { 'Wattage': '850W', 'Efficiency': '80 PLUS Gold', 'Modularity': 'Fully Modular' },
      images: ['/power_supply.png'],
      stockStatus: 'In Stock',
      rating: 4.7,
      reviewsCount: 94,
      discount: 18
    },
    {
      _id: 'new-5',
      name: 'Hikvision 4K Ultra HD Outdoor Security Dome Camera',
      slug: 'hikvision-4k-ultra-hd-security-camera',
      description: 'Enterprise grade smart IP surveillance camera featuring 8MP 4K clarity, AcuSense human/vehicle detection, and ColorVu night vision.',
      mrp: 9999,
      offerPrice: 7499,
      brand: 'Hikvision',
      specs: { 'Resolution': '4K (3840 x 2160)', 'Night Vision': 'ColorVu 24/7', 'Casing': 'IP67 Weatherproof' },
      images: ['/cctv-security.png'],
      stockStatus: 'In Stock',
      rating: 4.6,
      reviewsCount: 42,
      discount: 25
    },
    {
      _id: 'new-6',
      name: 'Razer BlackWidow V4 Pro Mechanical Gaming Keyboard',
      slug: 'razer-blackwidow-v4-pro-keyboard',
      description: 'Pro gaming mechanical keyboard with command dial, dedicated macro keys, Razer Green tactile switches, and immersive underglow RGB.',
      mrp: 24999,
      offerPrice: 20999,
      brand: 'Razer',
      specs: { 'Switches': 'Razer Green Mechanical', 'Dial': 'Razer Command Dial', 'RGB': 'Per-key + Underglow' },
      images: ['/gaming_gear.png'],
      stockStatus: 'In Stock',
      rating: 4.9,
      reviewsCount: 57,
      discount: 16
    },
    {
      _id: 'new-7',
      name: 'Logitech Brio 4K Ultra HD Pro Stream Webcam',
      slug: 'logitech-brio-4k-webcam',
      description: 'Ultra high-definition webcam for streaming and business meetings with RightLight 3 HDR, dual noise-canceling mics, and 5x digital zoom.',
      mrp: 21999,
      offerPrice: 17499,
      brand: 'Logitech',
      specs: { 'Resolution': '4K Ultra HD @ 30fps', 'HDR': 'RightLight 3 HDR', 'Field of View': '90° / 78° / 65°' },
      images: ['/peripheral_webcam.png'],
      stockStatus: 'In Stock',
      rating: 4.5,
      reviewsCount: 88,
      discount: 20
    },
    {
      _id: 'new-8',
      name: 'Corsair T3 RUSH Ergonomic Fabric Gaming Chair',
      slug: 'corsair-t3-rush-gaming-chair',
      description: 'Breathable soft fabric exterior with padded neck cushion, memory foam lumbar support, and 4D adjustable armrests for all-day comfort.',
      mrp: 32000,
      offerPrice: 26999,
      brand: 'Corsair',
      specs: { 'Material': 'Breathable Soft Fabric', 'Recline': '90-160 Degrees', 'Support': 'Memory Foam Lumbar' },
      images: ['/peripheral_chair.png'],
      stockStatus: 'In Stock',
      rating: 4.8,
      reviewsCount: 49,
      discount: 15
    }
  ];

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full max-w-[1500px] mx-auto px-4 md:px-8 pt-10 pb-6 md:pt-14 md:pb-8 bg-white">
      
      {/* Header Section (Matching reference design) */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
            New Arrivals
          </h2>
          <p className="text-xs md:text-sm font-semibold text-slate-400 mt-1 font-sans">
            Fresh stock & latest tech gear
          </p>
        </div>

        {/* Arrow Navigation (Right Aligned) */}
        <div className="flex gap-2 shrink-0">
          <button
            onClick={scrollLeft}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors cursor-pointer shadow-sm active:scale-95"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4 text-slate-700" />
          </button>
          <button
            onClick={scrollRight}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 transition-colors cursor-pointer shadow-sm active:scale-95"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4 text-slate-700" />
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Row */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-3 sm:gap-5 overflow-x-auto scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory pb-6 pl-0.5 pt-2 px-0.5"
          style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {newArrivalsProducts.map((prod, index) => {
            const isWishlisted = !!wishlist[prod._id];
            return (
              <motion.div
                key={`${prod._id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05, ease: 'easeOut' }}
                whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
                className="w-[calc(50%-6px)] min-w-[150px] sm:w-[265px] shrink-0 snap-start bg-white border border-slate-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 relative group"
              >
                <div>
                  {/* Discount Badge */}
                  {prod.discount > 0 && (
                    <span className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 bg-[#5b21b6] text-white text-[8px] sm:text-[9px] font-black tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full z-10 shadow-sm">
                      -{prod.discount}%
                    </span>
                  )}

                  {/* Centered Image Box */}
                  <div className="w-full aspect-[4/3] relative flex items-center justify-center bg-slate-50/50 rounded-lg sm:rounded-xl overflow-hidden mb-2.5 sm:mb-4 border border-slate-50 p-1.5 sm:p-2">
                    <Image
                      src={prod.images[0]}
                      alt={prod.name}
                      fill
                      className="object-contain p-1 sm:p-2 group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-w-640px) 150px, 200px"
                    />
                  </div>

                  {/* Brand and Name */}
                  <div className="space-y-0.5 sm:space-y-1">
                    <span className="text-[8px] sm:text-[9px] text-slate-400 uppercase tracking-widest font-black block">
                      {prod.brand}
                    </span>
                    <Link
                      href={`/product/${prod.slug}`}
                      className="text-slate-800 hover:text-[#5b21b6] font-bold text-[11px] sm:text-xs line-clamp-2 leading-snug tracking-tight"
                    >
                      {prod.name}
                    </Link>
                  </div>
                </div>

                {/* Bottom Price, Wishlist and Action */}
                <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
                  {/* Price block & Wishlist */}
                  <div className="flex items-center justify-between gap-1 sm:gap-2">
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-2">
                      {prod.offerPrice ? (
                        <>
                          <span className="text-slate-900 font-extrabold text-xs sm:text-base">
                            ₹{prod.offerPrice.toLocaleString('en-IN')}
                          </span>
                          <span className="text-slate-400 text-[9px] sm:text-[10px] line-through">
                            ₹{prod.mrp.toLocaleString('en-IN')}
                          </span>
                        </>
                      ) : (
                        <span className="text-slate-900 font-extrabold text-xs sm:text-base">
                          ₹{prod.mrp.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>

                    {/* Animated Wishlist button */}
                    <motion.button 
                      whileTap={{ scale: 0.85 }}
                      whileHover={{ scale: 1.1 }}
                      onClick={(e) => toggleWishlist(prod._id, e)}
                      className={`p-1 sm:p-1.5 rounded-full border transition-all cursor-pointer ${
                        isWishlisted
                          ? 'bg-red-50 border-red-200 text-red-500 shadow-sm'
                          : 'bg-white border-slate-100 hover:border-red-200 text-slate-400 hover:text-red-500 hover:bg-red-50/50'
                      }`}
                      title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    >
                      <Heart className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isWishlisted ? 'fill-red-500' : ''}`} />
                    </motion.button>
                  </div>

                  {/* Send Enquiry CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedProduct(prod)}
                    className="w-full bg-gradient-to-r from-[#5b21b6] to-[#4c1d95] hover:brightness-110 text-white rounded-lg sm:rounded-xl py-2 sm:py-2.5 transition-all text-[10px] sm:text-xs font-black tracking-wide flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer shadow-sm"
                  >
                    <MessageSquare className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                    <span>Send Enquiry</span>
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Actions Row */}
        <div className="flex justify-end mt-4">
          <Link
            href="/category/pc-components"
            className="text-xs font-black text-[#5b21b6] hover:text-[#4c1d95] transition-colors hover:underline tracking-widest uppercase"
          >
            View All →
          </Link>
        </div>

      </div>

      {/* Enquiry Modal overlay */}
      {selectedProduct && (
        <EnquiryModal
          product={{
            name: selectedProduct.name,
            slug: selectedProduct.slug
          }}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}
