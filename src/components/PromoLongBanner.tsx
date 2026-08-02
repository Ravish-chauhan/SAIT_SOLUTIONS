'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ShieldCheck, ShoppingBag } from 'lucide-react';

export default function PromoLongBanner() {
  return (
    <section className="bg-white pb-8 md:pb-10 w-full">
      <div className="max-w-[1500px] mx-auto px-4 md:px-8 py-3">
        
        {/* Banner Wrapper - Height reduced on 1024px (lg:h-[180px]) and full on xl:h-[230px] */}
        <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-md sm:shadow-xl lg:shadow-2xl bg-[#0c0a13] h-[95px] min-[380px]:h-[110px] md:h-[160px] lg:h-[180px] xl:h-[230px]">
          
          {/* Complete background image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/long-banner3.webp"
              alt="Build Your Dream PC Background"
              fill
              className="object-cover object-left lg:object-center pointer-events-none opacity-85 scale-[1.6] lg:scale-100 origin-left transition-all"
              sizes="(max-w-1500px) 100vw, 1500px"
              priority
            />
            {/* Dark overlay gradients hidden on mobile */}
            <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#0c0a13]/85 via-transparent to-[#0c0a13]/85" />
          </div>

          {/* Grid Layout containing Left Text, Empty Center, and Right Features */}
          <div className="relative z-10 w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center px-6 py-3 md:px-8 lg:px-10 xl:px-12 lg:py-0">
            
            {/* Left Column: Title & CTA Button */}
            <div className="w-full lg:col-span-5 flex flex-col text-left items-start justify-center">
              <h2 className="text-xs sm:text-xl lg:text-2xl xl:text-3xl font-black text-white tracking-tight uppercase leading-tight font-sans">
                BUILD YOUR DREAM PC
              </h2>
              
              <p className="text-[8.5px] sm:text-xs lg:text-xs xl:text-sm text-slate-200 font-semibold mb-1.5 lg:mb-3 xl:mb-5 max-w-[180px] sm:max-w-sm">
                High performance. Best quality. Great prices.
              </p>
              
              <Link
                href="/custom-pc"
                className="bg-[#5b21b6] hover:bg-[#4c1d95] text-white px-2 py-1 sm:px-4 sm:py-2 lg:px-4 lg:py-2 xl:px-5 xl:py-2.5 text-[8px] sm:text-xs font-black tracking-wide rounded-md sm:rounded-lg inline-flex items-center transition-all shadow-sm hover:shadow-purple-500/20 hover:shadow-lg hover:scale-[1.02] active:scale-98 cursor-pointer"
              >
                <span className="lg:hidden">Explore →</span>
                <span className="hidden lg:inline">Explore PC Components →</span>
              </Link>
            </div>

            {/* Center Column: Empty to allow the centered background PC setup to shine through */}
            <div className="hidden lg:block lg:col-span-3 h-full pointer-events-none" />

            {/* Right Column: Dynamic Feature List */}
            <div className="hidden lg:flex lg:col-span-4 flex-col gap-2.5 lg:gap-3 xl:gap-4.5 justify-center lg:justify-self-end lg:pr-6 xl:pr-16">
              
              {/* Feature 1 */}
              <div className="flex items-center gap-2.5 lg:gap-3 xl:gap-3.5 group/item justify-start">
                <div className="w-7 h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 rounded-full bg-[#231f38]/90 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover/item:border-purple-500/40 group-hover/item:bg-[#2c2747] transition-all shrink-0">
                  <Sparkles className="w-3.5 h-3.5 xl:w-4.5 xl:h-4.5 text-purple-400" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] xl:text-xs font-black text-white leading-none">Expertly Curated</span>
                  <span className="text-[9px] xl:text-[10px] text-slate-300 font-bold mt-0.5 xl:mt-1">Top quality components</span>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center gap-2.5 lg:gap-3 xl:gap-3.5 group/item justify-start">
                <div className="w-7 h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 rounded-full bg-[#231f38]/90 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover/item:border-purple-500/40 group-hover/item:bg-[#2c2747] transition-all shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 xl:w-4.5 xl:h-4.5 text-purple-400" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] xl:text-xs font-black text-white leading-none">Best Price Guarantee</span>
                  <span className="text-[9px] xl:text-[10px] text-slate-300 font-bold mt-0.5 xl:mt-1">Unbeatable prices</span>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center gap-2.5 lg:gap-3 xl:gap-3.5 group/item justify-start">
                <div className="w-7 h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 rounded-full bg-[#231f38]/90 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover/item:border-purple-500/40 group-hover/item:bg-[#2c2747] transition-all shrink-0">
                  <ShoppingBag className="w-3.5 h-3.5 xl:w-4.5 xl:h-4.5 text-purple-400" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] xl:text-xs font-black text-white leading-none">Secure Shopping</span>
                  <span className="text-[9px] xl:text-[10px] text-slate-300 font-bold mt-0.5 xl:mt-1">100% secure payments</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
