'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

interface CategoryCard {
  title: string;
  description: string;
  image: string;
  link: string;
}

export default function CategoriesCarousel() {
  const categories: CategoryCard[] = [
    {
      title: 'PC Components',
      description: 'High-end gaming CPUs, GPUs, motherboards, RAM, and custom cabinets.',
      image: '/hero-cabinet.png',
      link: '/category/pc-components',
    },
    {
      title: 'Storage & NAS',
      description: 'Enterprise storage servers, high-speed NVMe SSDs, and storage drives.',
      image: '/custom-pc.png',
      link: '/category/storage-nas',
    },
    {
      title: 'Network & Security',
      description: 'CCTV cameras, smart routers, switches, and remote access systems.',
      image: '/hero-security.png',
      link: '/category/network-security',
    },
    {
      title: 'Monitors & Displays',
      description: 'Ultra-wide displays, gaming monitors, and high-quality projectors.',
      image: '/hero-projector.png',
      link: '/category/monitors-display',
    },
    {
      title: 'Audio & Peripherals',
      description: 'Studio headphones, portable speakers, mechanical keyboards, and audio rigs.',
      image: '/sound-banner.png',
      link: '/category/peripherals',
    },
    {
      title: 'Gaming Gear',
      description: 'Wired and wireless gaming mice, webcams, streaming kits, and accessories.',
      image: '/gaming_gear.png',
      link: '/category/peripherals',
    },
  ];

  return (
    <div className="w-full">
      {/* 1. Promotional Highlights Grid (2-3 Cards Side-by-Side) */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Promo Card 1: Exclusive Offers */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm group hover:shadow-md transition-all duration-300 flex flex-col">
            <div className="relative w-full h-[200px] overflow-hidden bg-slate-50">
              <Image
                src="/offers_card_promo.png"
                alt="Exclusive Hardware Offers"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                sizes="(max-w-768px) 100vw, 360px"
              />
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black tracking-widest text-accent uppercase bg-blue-50 px-2 py-0.5 rounded-full">
                  Dealer Deals
                </span>
                <h3 className="text-lg font-black text-slate-800 mt-2.5 uppercase tracking-tight">
                  Exclusive Offers
                </h3>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed mt-2">
                  Unlock special high-volume discounts and custom pricing tiers on premium components.
                </p>
              </div>
              <Link href="/search?q=deal" className="inline-flex items-center text-xs font-black text-accent mt-5 group hover:text-blue-700 transition-colors">
                <span>BROWSE DEALS</span>
                <ChevronRight className="w-4 h-4 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Promo Card 2: Premium Peripherals */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm group hover:shadow-md transition-all duration-300 flex flex-col">
            <div className="relative w-full h-[200px] overflow-hidden bg-slate-50">
              <Image
                src="/peripherals_card_promo.png"
                alt="High-End Peripherals"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                sizes="(max-w-768px) 100vw, 360px"
              />
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black tracking-widest text-accent uppercase bg-blue-50 px-2 py-0.5 rounded-full">
                  Pro Accessories
                </span>
                <h3 className="text-lg font-black text-slate-800 mt-2.5 uppercase tracking-tight">
                  Peripherals Showcase
                </h3>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed mt-2">
                  Upgrade your workspace with custom mechanical keyboards, wireless mice, and studio headphones.
                </p>
              </div>
              <Link href="/category/peripherals" className="inline-flex items-center text-xs font-black text-accent mt-5 group hover:text-blue-700 transition-colors">
                <span>EXPLORE GEAR</span>
                <ChevronRight className="w-4 h-4 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Promo Card 3: Custom Builds */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm group hover:shadow-md transition-all duration-300 flex flex-col">
            <div className="relative w-full h-[200px] overflow-hidden bg-slate-50">
              <Image
                src="/custom_pc_promo.png"
                alt="Custom PC Builds"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                sizes="(max-w-768px) 100vw, 360px"
              />
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black tracking-widest text-accent uppercase bg-blue-50 px-2 py-0.5 rounded-full">
                  Workstation Builds
                </span>
                <h3 className="text-lg font-black text-slate-800 mt-2.5 uppercase tracking-tight">
                  Custom Rigs
                </h3>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed mt-2">
                  Custom engineered gaming machines and heavy-duty rendering setups tailored for professionals.
                </p>
              </div>
              <Link href="/category/pc-components" className="inline-flex items-center text-xs font-black text-accent mt-5 group hover:text-blue-700 transition-colors">
                <span>BUILD YOUR RIG</span>
                <ChevronRight className="w-4 h-4 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Compact Shop By Category Vertical Flow Grid */}
      <section className="bg-slate-50/50 py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-8">
            <span className="text-[10px] text-accent font-extrabold uppercase tracking-widest bg-blue-50 px-2.5 py-0.5 rounded-full">
              Quick Selection
            </span>
            <h2 className="text-xl font-black text-slate-900 mt-2 uppercase tracking-tight font-sans">
              Shop By Category
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((cat, index) => (
              <Link
                key={index}
                href={cat.link}
                className="bg-white border border-slate-200/80 rounded-2xl p-4 hover:border-accent hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="w-16 h-16 rounded-xl bg-slate-50 overflow-hidden relative flex items-center justify-center p-1.5 border border-slate-100">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                    sizes="64px"
                  />
                </div>
                <span className="text-xs font-bold text-slate-700 group-hover:text-accent transition-colors mt-3 line-clamp-1">
                  {cat.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
