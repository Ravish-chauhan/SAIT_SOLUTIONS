'use client';

import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Headphones } from 'lucide-react';

interface TrustItem {
  icon: React.ElementType;
  title: string;
  subtitle: string;
}

const TRUST_ITEMS: TrustItem[] = [
  {
    icon: Truck,
    title: 'Fast & Free Delivery',
    subtitle: 'On orders above ₹999',
  },
  {
    icon: RotateCcw,
    title: '7 Days Easy Returns',
    subtitle: 'Hassle-free returns',
  },
  {
    icon: ShieldCheck,
    title: 'Genuine Products',
    subtitle: '100% authentic',
  },
  {
    icon: Headphones,
    title: 'Expert Support',
    subtitle: '24/7 assistance',
  },
];

export default function ValueTrustStrip() {
  return (
    <section className="w-full bg-white border-t border-slate-100 py-6 sm:py-8 md:py-10 px-4 md:px-8 overflow-hidden">
      <div className="max-w-[1500px] mx-auto">
        {/* 4 Lines vertical stack on mobile (grid-cols-1), 4 columns on desktop (md:grid-cols-4) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 items-center">
          {TRUST_ITEMS.map((item, index) => {
            const IconComp = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3.5 group justify-start sm:justify-center p-1"
              >
                {/* Light Purple Circular Icon Badge */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-purple-100/70 text-[#5b21b6] flex items-center justify-center shrink-0 group-hover:bg-[#5b21b6] group-hover:text-white transition-all">
                  <IconComp className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="text-slate-900 font-extrabold text-xs sm:text-sm leading-snug group-hover:text-[#5b21b6] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-slate-400 text-[11px] sm:text-xs font-medium mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
