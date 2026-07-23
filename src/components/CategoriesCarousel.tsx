'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CategoryCard {
  title: string;
  description: string;
  image: string;
  link: string;
}

export default function CategoriesCarousel() {
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoryScrollRef.current) {
      const scrollAmount = 300;
      categoryScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const categories: CategoryCard[] = [
    {
      title: 'PC Components',
      description: 'High-end gaming CPUs, GPUs, motherboards, RAM, and custom cabinets.',
      image: '/category/pc components.webp',
      link: '/category/pc-components',
    },
    {
      title: 'Storage & NAS',
      description: 'Enterprise storage servers, high-speed NVMe SSDs, and storage drives.',
      image: '/category/NAS-Storage.webp',
      link: '/category/storage-nas',
    },
    {
      title: 'Peripherals',
      description: 'Studio headphones, portable speakers, mechanical keyboards, and audio rigs.',
      image: '/category/peripherals.avif',
      link: '/category/peripherals',
    },
    {
      title: 'Monitors & Projectors',
      description: 'Ultra-wide displays, gaming monitors, and high-quality projectors.',
      image: '/category/monitor.jpg',
      link: '/category/monitors-display',
    },
    {
      title: 'Network & Security',
      description: 'CCTV cameras, smart routers, switches, and remote access systems.',
      image: '/category/network and security.jpg',
      link: '/category/network-security',
    },
    {
      title: 'Accessories',
      description: 'Gaming chairs, mounts, cables, power banks, and other accessories.',
      image: '/category/accessories.jpg',
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
      <section className="bg-[#F8F9FC] py-11 md:py-16">
        <div className="max-w-[1360px] mx-auto px-4 md:px-8">

          {/* Centered Header */}
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
              Shop by Category
            </h2>
          </div>

          {/* Carousel Track Wrapper with Floating Side Arrows */}
          <div className="relative group/cat-carousel">
            
            {/* Left Floating Arrow Button */}
            <button
              onClick={() => scrollCategories('left')}
              className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-md flex items-center justify-center transition-all cursor-pointer active:scale-95 z-20 hover:scale-105"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700" />
            </button>

            {/* Right Floating Arrow Button */}
            <button
              onClick={() => scrollCategories('right')}
              className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-md flex items-center justify-center transition-all cursor-pointer active:scale-95 z-20 hover:scale-105"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-slate-700" />
            </button>

            {/* Grid/Flex: Horizontally scrollable row with ref & smooth scroll */}
            <div
              ref={categoryScrollRef}
              className="flex lg:grid lg:grid-cols-6 overflow-x-auto lg:overflow-x-visible scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden gap-3.5 sm:gap-5 snap-x snap-mandatory pb-4 lg:pb-0 scroll-smooth px-1"
            >
              {categories.map((cat, index) => (
                <Link
                  key={index}
                  href={cat.link}
                  className="bg-[#FFFFFF] rounded-xl border border-[#ECEEF3] shadow-[0_8px_30px_rgba(15,23,42,0.05)] hover:shadow-md hover:scale-[1.02] transition-all duration-300 flex flex-col items-center justify-between group cursor-pointer p-4 flex-shrink-0 w-[160px] sm:w-[185px] lg:w-auto snap-start"
                >
                  {/* Image Box */}
                  <div className="w-full h-[115px] md:h-[130px] relative flex items-center justify-center">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 160px, 180px"
                    />
                  </div>
                  {/* Text Label */}
                  <div className="text-center mt-3">
                    <span className="text-xs md:text-sm font-bold text-slate-800 group-hover:text-[#5b21b6] transition-colors leading-snug">
                      {cat.title}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

          </div>

          {/* Footer View All button */}
          <div className="flex justify-center mt-8">
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
