'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import EnquiryModal from './EnquiryModal';

interface SideProduct {
  id: string;
  brand: string;
  name: string;
  price: number;
  image: string;
  slug: string;
}

const WORK_PRODUCTS: SideProduct[] = [
  {
    id: 'work-1',
    brand: 'LOGITECH',
    name: 'MX Master 3S',
    price: 9999,
    image: '/peripheral_mouse.png',
    slug: 'logitech-mx-master-3s',
  },
  {
    id: 'work-2',
    brand: 'LOGITECH',
    name: 'MX Keys Wireless',
    price: 10499,
    image: '/peripheral_keyboard.png',
    slug: 'logitech-mx-keys-wireless',
  },
  {
    id: 'work-3',
    brand: 'LOGITECH',
    name: 'C922 Pro Webcam',
    price: 6199,
    image: '/peripheral_webcam.png',
    slug: 'logitech-c922-pro-webcam',
  },
  {
    id: 'work-4',
    brand: 'SAMSUNG',
    name: 'ViewFinity S7 Monitor',
    price: 22999,
    image: '/monitor_display.png',
    slug: 'samsung-viewfinity-s7-monitor',
  },
];

const SECURITY_PRODUCTS: SideProduct[] = [
  {
    id: 'sec-1',
    brand: 'HIKVISION',
    name: 'AcuSense 4MP Cam',
    price: 5800,
    image: '/cctv-security.png',
    slug: 'hikvision-ds-2cd2043g2-i-bullet-camera',
  },
  {
    id: 'sec-2',
    brand: 'TP-LINK',
    name: 'Archer AX73 Wi-Fi 6',
    price: 9499,
    image: '/cctv-security.png',
    slug: 'tp-link-archer-ax73-wifi6-router',
  },
  {
    id: 'sec-3',
    brand: 'CP PLUS',
    name: 'Outdoor 360 PTZ Cam',
    price: 8499,
    image: '/hero-security.png',
    slug: 'cp-plus-ptz-dome-camera',
  },
  {
    id: 'sec-4',
    brand: 'NETGEAR',
    name: '8-Port Gigabit Switch',
    price: 2499,
    image: '/banner-security.png',
    slug: 'netgear-8-port-gigabit-switch',
  },
];

export default function SideBySideBanners() {
  const [selectedProduct, setSelectedProduct] = useState<SideProduct | null>(null);

  return (
    <section className="w-full pt-4 md:pt-6 pb-6 md:pb-10 bg-white overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-4 md:px-8">
        
        {/* 2 Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          
          {/* Left Block: WORK & PRODUCTIVITY */}
          <div className="rounded-3xl overflow-hidden border border-slate-200/70 bg-[#f4f2fa] flex flex-col justify-between shadow-sm">
            
            {/* Top Banner Image Box (Banner 1 Image on Top Only) */}
            <div className="relative w-full h-[180px] sm:h-[210px] p-5 sm:p-7 flex flex-col justify-between overflow-hidden">
              <Image
                src="/sideby-banner1.png"
                alt="Work & Productivity Studio Setup"
                fill
                className="object-cover object-center pointer-events-none"
                sizes="(max-width: 1024px) 100vw, 750px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Text & CTA Overlay */}
              <div className="relative z-10 flex flex-col items-start space-y-1.5">
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase font-sans drop-shadow">
                  WORK & PRODUCTIVITY
                </h3>
                <p className="text-xs font-semibold text-slate-200">
                  Boost your workflow
                </p>
                <div className="pt-2">
                  <Link
                    href="/category/mobile-accessories"
                    className="inline-flex items-center gap-1.5 bg-[#251e3e]/85 hover:bg-[#251e3e] text-white text-xs font-bold px-4 py-2 rounded-xl border border-white/20 backdrop-blur-md transition-all cursor-pointer shadow-sm active:scale-95"
                  >
                    <span>Explore More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom Cards Grid on Normal Background */}
            <div className="p-3 sm:p-4 bg-[#f4f2fa]">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {WORK_PRODUCTS.map((prod) => (
                  <motion.div
                    key={prod.id}
                    whileHover={{ y: -3 }}
                    onClick={() => setSelectedProduct(prod)}
                    className="bg-white rounded-2xl p-3 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer group border border-slate-100/80"
                  >
                    <div>
                      <div className="w-full h-24 sm:h-26 relative mb-2 bg-slate-50/50 rounded-xl flex items-center justify-center overflow-hidden p-1">
                        <Image
                          src={prod.image}
                          alt={prod.name}
                          fill
                          className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                          sizes="150px"
                        />
                      </div>

                      <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest block">
                        {prod.brand}
                      </span>
                      <h4 className="text-xs font-extrabold text-slate-900 leading-tight group-hover:text-[#5b21b6] transition-colors line-clamp-1 mt-0.5">
                        {prod.name}
                      </h4>
                    </div>

                    <div className="mt-2 pt-1 border-t border-slate-100">
                      <span className="text-slate-900 font-black text-xs sm:text-sm block">
                        ₹{prod.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Block: NETWORK & SECURITY */}
          <div className="rounded-3xl overflow-hidden border border-slate-200/70 bg-[#f4f2fa] flex flex-col justify-between shadow-sm">
            
            {/* Top Banner Image Box (Banner 2 Image on Top Only) */}
            <div className="relative w-full h-[180px] sm:h-[210px] p-5 sm:p-7 flex flex-col justify-between overflow-hidden">
              <Image
                src="/sideby-banner2.png"
                alt="Network & Security Setup"
                fill
                className="object-cover object-[center_65%] pointer-events-none"
                sizes="(max-width: 1024px) 100vw, 750px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Text & CTA Overlay */}
              <div className="relative z-10 flex flex-col items-start space-y-1.5">
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase font-sans drop-shadow">
                  NETWORK & SECURITY
                </h3>
                <p className="text-xs font-semibold text-slate-200">
                  Protect & connect your space.
                </p>
                <div className="pt-2">
                  <Link
                    href="/category/network-security"
                    className="inline-flex items-center gap-1.5 bg-[#5b21b6] hover:bg-[#4c1d95] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer shadow-sm active:scale-95"
                  >
                    <span>Explore Security</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom Cards Grid on Normal Background */}
            <div className="p-3 sm:p-4 bg-[#f4f2fa]">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {SECURITY_PRODUCTS.map((prod) => (
                  <motion.div
                    key={prod.id}
                    whileHover={{ y: -3 }}
                    onClick={() => setSelectedProduct(prod)}
                    className="bg-white rounded-2xl p-3 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer group border border-slate-100/80"
                  >
                    <div>
                      <div className="w-full h-24 sm:h-26 relative mb-2 bg-slate-50/50 rounded-xl flex items-center justify-center overflow-hidden p-1">
                        <Image
                          src={prod.image}
                          alt={prod.name}
                          fill
                          className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                          sizes="150px"
                        />
                      </div>

                      <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest block">
                        {prod.brand}
                      </span>
                      <h4 className="text-xs font-extrabold text-slate-900 leading-tight group-hover:text-[#5b21b6] transition-colors line-clamp-1 mt-0.5">
                        {prod.name}
                      </h4>
                    </div>

                    <div className="mt-2 pt-1 border-t border-slate-100">
                      <span className="text-slate-900 font-black text-xs sm:text-sm block">
                        ₹{prod.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Enquiry Modal overlay */}
      {selectedProduct && (
        <EnquiryModal
          product={{
            name: `${selectedProduct.brand} ${selectedProduct.name}`,
            slug: selectedProduct.slug,
          }}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}
