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
      {/* 1. Promotional Highlights Grid (Three short banners in a row) */}
      <section className="w-full max-w-[1500px] mx-auto px-3 md:px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          
          {/* Banner Card 1 */}
          <Link href="/category/peripherals" className="relative aspect-[1717/916] w-full overflow-hidden border border-slate-200/50 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 group cursor-pointer bg-slate-50">
            <Image
              src="/short-banner01.png"
              alt="Promo Banner 1"
              fill
              className="object-cover"
              sizes="(max-w-768px) 100vw, 380px"
              priority
            />
          </Link>

          {/* Banner Card 2 */}
          <Link href="/category/monitors-display" className="relative aspect-[1717/916] w-full overflow-hidden border border-slate-200/50 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 group cursor-pointer bg-slate-50">
            <Image
              src="/short-banner02.png"
              alt="Promo Banner 2"
              fill
              className="object-cover"
              sizes="(max-w-768px) 100vw, 380px"
              priority
            />
          </Link>

          {/* Banner Card 3 */}
          <Link href="/category/peripherals" className="relative aspect-[1717/916] w-full overflow-hidden border border-slate-200/50 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 group cursor-pointer bg-slate-50">
            <Image
              src="/short-banner03.png"
              alt="Promo Banner 3"
              fill
              className="object-cover"
              sizes="(max-w-768px) 100vw, 380px"
              priority
            />
          </Link>

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
