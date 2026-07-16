'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
      title: 'Peripherals',
      description: 'Studio headphones, portable speakers, mechanical keyboards, and audio rigs.',
      image: '/gaming_gear.png',
      link: '/category/peripherals',
    },
    {
      title: 'Monitors & Projectors',
      description: 'Ultra-wide displays, gaming monitors, and high-quality projectors.',
      image: '/hero-projector.png',
      link: '/category/monitors-display',
    },
    {
      title: 'Network & Security',
      description: 'CCTV cameras, smart routers, switches, and remote access systems.',
      image: '/hero-security.png',
      link: '/category/network-security',
    },
    {
      title: 'Accessories',
      description: 'Gaming chairs, mounts, cables, power banks, and other accessories.',
      image: '/hero-accessories.png',
      link: '/category/peripherals',
    },
  ];

  return (
    <div className="w-full">
      {/* 1. Promotional Highlights Grid (Three short banners in a row) */}
      <div className="w-full bg-white">
        <section className="w-full max-w-[1500px] mx-auto px-3 md:px-4 pt-3 pb-10 md:pt-6 md:pb-10">
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

            {/* Banner Card 4 (Visible only on mobile to make it 2x2 grid, hidden on desktop/tablet where it is 1x3 grid) */}
            <Link href="/category/pc-components" className="relative md:hidden aspect-[1717/916] w-full overflow-hidden border border-slate-200/50 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 group cursor-pointer bg-slate-50">
              <Image
                src="/short-banner04.png"
                alt="Promo Banner 4"
                fill
                className="object-cover"
                sizes="(max-w-768px) 100vw, 380px"
                priority
              />
            </Link>

          </div>
        </section>
      </div>

      {/* 2. Premium Centered Shop by Category Grid Section (Subtle Soft BG, No Borders) */}
      <section className="bg-[#f0f4f8] py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
              Shop by Category
            </h2>
          </div>

          {/* Grid: 6 items in a row on desktop, centered and compact */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {categories.map((cat, index) => (
              <Link
                key={index}
                href={cat.link}
                className="bg-white rounded-xl border border-slate-100/50 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 flex flex-col items-center justify-between group cursor-pointer p-5"
              >
                {/* Image Box */}
                <div className="w-full aspect-square relative flex items-center justify-center p-1">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-w-768px) 50vw, 150px"
                  />
                </div>
                {/* Text Label */}
                <div className="text-center mt-4">
                  <span className="text-xs md:text-sm font-bold text-slate-800 group-hover:text-[#5b21b6] transition-colors leading-snug">
                    {cat.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Footer View All button */}
          <div className="flex justify-center mt-12">
            <Link
              href="/category/pc-components"
              className="px-8 py-3 rounded-lg bg-[#5b21b6] hover:bg-[#4c1d95] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm hover:shadow-md active:scale-95"
            >
              View All Categories
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
