'use client';

import React from 'react';
import { Truck, RotateCcw, ShieldCheck, CreditCard, Headphones } from 'lucide-react';

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
    subtitle: 'Hassle-free return policy',
  },
  {
    icon: ShieldCheck,
    title: 'Genuine Products',
    subtitle: '100% authentic products',
  },
  {
    icon: CreditCard,
    title: 'Secure Payments',
    subtitle: 'Multiple safe payment options',
  },
  {
    icon: Headphones,
    title: 'Expert Support',
    subtitle: '24/7 customer support',
  },
];

export default function ValueTrustStrip() {
  return (
    <section className="w-full bg-white border-t border-slate-100 py-6 sm:py-8 px-4 md:px-8">
      <div className="max-w-[1500px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
        {TRUST_ITEMS.map((item, index) => {
          const IconComp = item.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-3.5 px-3 py-3 sm:py-1 first:pl-0 last:pr-0 justify-start sm:justify-center group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-100/50 text-[#5b21b6] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <IconComp className="w-5 h-5 text-[#5b21b6]" />
              </div>
              <div>
                <h4 className="text-slate-900 font-extrabold text-xs sm:text-sm leading-snug group-hover:text-[#5b21b6] transition-colors">
                  {item.title}
                </h4>
                <p className="text-slate-500 text-[11px] sm:text-xs font-medium mt-0.5">
                  {item.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
