'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Slide {
  id: number;
  overline: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  ctaText: string;
  link: string;
  imagePath: string;
}

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      id: 1,
      overline: 'Level Up Your Experience',
      title: 'Gear Built for',
      titleAccent: 'Every Victory',
      subtitle: 'Upgrade your battlestation with cutting-edge peripherals.',
      ctaText: 'SHOP NOW',
      link: '/category/peripherals',
      imagePath: '/gaming_gear.png',
    },
    {
      id: 2,
      overline: 'Immersive Sound Experience',
      title: 'Headphones, Speakers',
      titleAccent: '& Earphones',
      subtitle: 'Discover premium audio gear, high-fidelity wireless speakers, studio earphones, and all sound accessories.',
      ctaText: 'SHOP SOUND PRODUCTS',
      link: '/category/peripherals',
      imagePath: '/sound-banner.png',
    },
    {
      id: 3,
      overline: 'Vivid Visual Displays',
      title: 'Premium Monitors',
      titleAccent: '& 4K Projectors',
      subtitle: 'Experience extreme detail and lifelike display quality.',
      ctaText: 'SHOP NOW',
      link: '/category/monitors-display',
      imagePath: '/monitor_banner.png',
    },
    {
      id: 4,
      overline: 'Secure Every Corner',
      title: 'Advanced CCTV',
      titleAccent: '& Security Systems',
      subtitle: 'Smart IP cameras, continuous recording, and remote live view monitoring.',
      ctaText: 'SHOP NOW',
      link: '/category/network-security',
      imagePath: '/cctv-security.png',
    },
    {
      id: 5,
      overline: 'Build Your Dream Rig',
      title: 'Custom PC Builder',
      titleAccent: 'Configure Your Own',
      subtitle: 'Choose your processor, motherboard, GPU, RAM, and other components to build the ultimate PC built for you.',
      ctaText: 'BUILD YOUR PC',
      link: '/category/pc-components',
      imagePath: '/custom-pc.png',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[180px] sm:h-[300px] md:h-[420px] lg:h-[530px] bg-zinc-950 overflow-hidden border-b border-slate-200 select-none">
      {/* Slides Wrapper */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full flex items-center transition-all duration-1000 ease-in-out bg-cover bg-right ${
            index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'
          }`}
          style={{
            backgroundImage: `url('${slide.imagePath}')`,
          }}
        >
          {/* Semi-transparent tint on mobile screens only to guard contrast */}
          <div className="absolute inset-0 bg-white/20 sm:bg-transparent z-0 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10">
            {/* Left Content (Constrained to max-w-[55%] on small screens to prevent overlapping products on the right) */}
            <div className="space-y-1.5 sm:space-y-3 md:space-y-5 text-left max-w-[55%] sm:max-w-xl md:max-w-2xl">
              <span className="block text-[8px] sm:text-xs md:text-sm font-extrabold text-slate-500 uppercase tracking-widest leading-none">
                {slide.overline}
              </span>
              <h1 className="text-base sm:text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight tracking-tight">
                {slide.title}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent to-brand-purple-light mt-0.5">
                  {slide.titleAccent}
                </span>
              </h1>
              <p className="hidden sm:block text-slate-650 text-xs md:text-base font-semibold leading-relaxed max-w-md">
                {slide.subtitle}
              </p>
              <div className="pt-1 sm:pt-2 md:pt-3">
                <Link
                  href={slide.link}
                  className="inline-block px-4 py-2 sm:px-8 sm:py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-[9px] sm:text-xs tracking-wider uppercase rounded-md sm:rounded-lg shadow-sm sm:shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-100 cursor-pointer"
                >
                  {slide.ctaText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Manual Dots Navigation Controls */}
      <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 md:gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              index === currentSlide ? 'bg-blue-600 w-5 h-1.5 md:w-6 md:h-2' : 'bg-slate-400 hover:bg-slate-500 w-1.5 h-1.5 md:w-2 md:h-2'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
