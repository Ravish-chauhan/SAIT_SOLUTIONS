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
      overline: 'PREMIUM GAMING PERIPHERALS',
      title: 'Gear Built for',
      titleAccent: 'Every Victory',
      subtitle: 'High-performance peripherals engineered for gamers and creators who demand the best.',
      ctaText: 'Shop Gaming →',
      link: '/category/peripherals',
      imagePath: '/gaming_gear.png',
    },
    {
      id: 2,
      overline: 'PREMIUM AUDIO. PURE IMMERSION.',
      title: 'Hear Every Detail.',
      titleAccent: 'Feel Every Beat.',
      subtitle: 'High-quality audio gear for music lovers, gamers, creators, and everyone in between.',
      ctaText: 'EXPLORE AUDIO →',
      link: '/category/peripherals',
      imagePath: '/sound-banner.png',
    },
    {
      id: 3,
      overline: 'VIVID VISUAL DISPLAYS',
      title: 'Premium Monitors',
      titleAccent: '& 4K Projectors',
      subtitle: 'Experience extreme detail and lifleike display quality.',
      ctaText: 'SHOP NOW →',
      link: '/category/monitors-display',
      imagePath: '/monitor_banner.png',
    },
    {
      id: 4,
      overline: 'SMART SECURITY. TOTAL PEACE OF MIND.',
      title: 'Security You',
      titleAccent: 'Can Trust',
      subtitle: 'Advanced CCTV & security systems for complete protection of what matters most.',
      ctaText: 'SHOP NOW →',
      link: '/category/network-security',
      imagePath: '/cctv-security.png',
    },
    {
      id: 5,
      overline: 'BUILD YOUR DREAM RIG',
      title: 'Custom PC Builder',
      titleAccent: 'Build It Your Way',
      subtitle: 'Choose premium components and create a PC tailored for gaming, work or creation.',
      ctaText: 'BUILD YOUR PC →',
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
          {/* No overlay to keep slide images perfectly clear and bright */}

          <div className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10">
            {/* Left Content (Constrained to max-w-[55%] on small screens to prevent overlapping products on the right) */}
            <div className="space-y-1.5 sm:space-y-3 md:space-y-4 text-left max-w-[55%] sm:max-w-xl md:max-w-2xl">
              {slide.id === 3 ? (
                <span className="flex items-center gap-2 text-[8px] sm:text-xs md:text-sm font-extrabold uppercase tracking-widest leading-none text-[#e9b384]">
                  <span className="w-4 h-[1px] bg-[#e9b384]/50"></span>
                  {slide.overline}
                  <span className="w-4 h-[1px] bg-[#e9b384]/50"></span>
                </span>
              ) : slide.id === 5 ? (
                <span className="flex items-center gap-1.5 text-[8px] sm:text-xs md:text-sm font-extrabold uppercase tracking-widest leading-none text-slate-500">
                  {/* Custom building block / case outline icon */}
                  <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  {slide.overline}
                </span>
              ) : (
                <span className={`block text-[8px] sm:text-xs md:text-sm font-extrabold uppercase tracking-widest leading-none ${
                  slide.id === 1 ? 'text-[#5b21b6]' : slide.id === 4 ? 'text-[#8b5cf6]' : slide.id === 2 ? 'text-blue-600' : 'text-slate-500'
                }`}>
                  {slide.overline}
                </span>
              )}

              <h1 className={`text-base sm:text-3xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight ${
                slide.id === 3 ? 'text-white' : 'text-slate-900'
              }`}>
                {slide.title}
                <span className={`block mt-0.5 ${
                  slide.id === 1 || slide.id === 4 || slide.id === 5
                    ? 'text-[#5b21b6]' 
                    : slide.id === 2
                    ? 'text-blue-600'
                    : slide.id === 3
                    ? 'text-[#e9b384]'
                    : 'text-transparent bg-clip-text bg-gradient-to-r from-accent to-brand-purple-light'
                }`}>
                  {slide.titleAccent}
                </span>
              </h1>

              {/* Purple divider line for first slide */}
              {slide.id === 1 && (
                <div className="w-8 sm:w-12 h-[2px] bg-[#5b21b6] mt-1 mb-2.5 sm:mb-3"></div>
              )}

              <p className={`hidden sm:block text-xs md:text-base font-semibold leading-relaxed max-w-md ${
                slide.id === 3 ? 'text-slate-300' : slide.id === 4 || slide.id === 5 ? 'text-slate-500' : 'text-slate-650'
              }`}>
                {slide.subtitle}
              </p>

              {/* Slide 2 Feature Badges */}
              {slide.id === 2 && (
                <div className="hidden md:flex items-center gap-6 mt-3 mb-4 pl-1">
                  {/* Feature 1: Crystal Clear Sound */}
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                      </svg>
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] font-black text-slate-800 tracking-tight leading-none">Crystal Clear</span>
                      <span className="text-[8px] text-slate-400 font-extrabold uppercase tracking-widest mt-0.5">Sound</span>
                    </div>
                  </div>
                  
                  <div className="h-6 w-[1.5px] bg-slate-200/80"></div>

                  {/* Feature 2: Wireless Freedom */}
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] font-black text-slate-800 tracking-tight leading-none">Wireless</span>
                      <span className="text-[8px] text-slate-400 font-extrabold uppercase tracking-widest mt-0.5">Freedom</span>
                    </div>
                  </div>

                  <div className="h-6 w-[1.5px] bg-slate-200/80"></div>

                  {/* Feature 3: Long Lasting Battery */}
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] font-black text-slate-800 tracking-tight leading-none">Long Lasting</span>
                      <span className="text-[8px] text-slate-400 font-extrabold uppercase tracking-widest mt-0.5">Battery</span>
                    </div>
                  </div>

                  <div className="h-6 w-[1.5px] bg-slate-200/80"></div>

                  {/* Feature 4: Trusted Brands */}
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] font-black text-slate-800 tracking-tight leading-none">Trusted</span>
                      <span className="text-[8px] text-slate-400 font-extrabold uppercase tracking-widest mt-0.5">Brands</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Slide 3 Feature Badges */}
              {slide.id === 3 && (
                <div className="hidden md:flex items-center gap-3.5 mt-3 mb-4 pl-1">
                  {/* Feature 1: 4K Ultra HD */}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700/60 bg-slate-900/40 text-white">
                    <svg className="w-4 h-4 text-[#e9b384]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-[10px] font-bold tracking-tight">4K Ultra HD</span>
                  </div>

                  {/* Feature 2: Vivid Colors */}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700/60 bg-slate-900/40 text-white">
                    <svg className="w-4 h-4 text-[#e9b384]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                    </svg>
                    <span className="text-[10px] font-bold tracking-tight">Vivid Colors</span>
                  </div>

                  {/* Feature 3: Trusted Quality */}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700/60 bg-slate-900/40 text-white">
                    <svg className="w-4 h-4 text-[#e9b384]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-[10px] font-bold tracking-tight">Trusted Quality</span>
                  </div>
                </div>
              )}

              {/* Slide 4 Feature Badges */}
              {slide.id === 4 && (
                <div className="hidden md:flex items-center gap-4.5 mt-1.5 mb-3 pl-1">
                  {/* Feature 1: 24/7 Monitoring */}
                  <div className="flex flex-col items-center gap-1.5 w-24">
                    <svg className="w-10 h-10 text-[#5b21b6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-[10.5px] font-black text-slate-800 tracking-tight text-center leading-tight">24/7 Monitoring</span>
                  </div>
                  
                  <div className="h-10 w-px bg-slate-200/85"></div>

                  {/* Feature 2: AI Detection */}
                  <div className="flex flex-col items-center gap-1.5 w-24">
                    <svg className="w-10 h-10 text-[#5b21b6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <span className="text-[10.5px] font-black text-slate-800 tracking-tight text-center leading-tight">AI Detection</span>
                  </div>

                  <div className="h-10 w-px bg-slate-200/85"></div>

                  {/* Feature 3: Night Vision */}
                  <div className="flex flex-col items-center gap-1.5 w-24">
                    <svg className="w-10 h-10 text-[#5b21b6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                    <span className="text-[10.5px] font-black text-slate-800 tracking-tight text-center leading-tight">Night Vision</span>
                  </div>

                  <div className="h-10 w-px bg-slate-200/85"></div>

                  {/* Feature 4: Instant Alerts */}
                  <div className="flex flex-col items-center gap-1.5 w-24">
                    <svg className="w-10 h-10 text-[#5b21b6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.02 6.02 0 00-4.902-5.903m0 0A6.002 6.002 0 006 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span className="text-[10.5px] font-black text-slate-800 tracking-tight text-center leading-tight">Instant Alerts</span>
                  </div>
                </div>
              )}

              {/* Slide 5 Feature Badges */}
              {slide.id === 5 && (
                <div className="hidden md:flex items-center gap-4.5 mt-1.5 mb-3 pl-1">
                  {/* Feature 1: Premium Components */}
                  <div className="flex flex-col items-center gap-1.5 w-24">
                    <svg className="w-10 h-10 text-[#5b21b6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 5h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9h6v6H9z" />
                    </svg>
                    <span className="text-[10.5px] font-black text-slate-800 tracking-tight text-center leading-tight">Premium Components</span>
                  </div>
                  
                  <div className="h-10 w-px bg-slate-200/85"></div>

                  {/* Feature 2: Top Performance Guaranteed */}
                  <div className="flex flex-col items-center gap-1.5 w-24">
                    <svg className="w-10 h-10 text-[#5b21b6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="text-[10.5px] font-black text-slate-800 tracking-tight text-center leading-tight">Top Performance Guaranteed</span>
                  </div>

                  <div className="h-10 w-px bg-slate-200/85"></div>

                  {/* Feature 3: Reliable & Trusted */}
                  <div className="flex flex-col items-center gap-1.5 w-24">
                    <svg className="w-10 h-10 text-[#5b21b6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-[10.5px] font-black text-slate-800 tracking-tight text-center leading-tight">Reliable & Trusted</span>
                  </div>

                  <div className="h-10 w-px bg-slate-200/85"></div>

                  {/* Feature 4: Expert Support Available */}
                  <div className="flex flex-col items-center gap-1.5 w-24">
                    <svg className="w-10 h-10 text-[#5b21b6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span className="text-[10.5px] font-black text-slate-800 tracking-tight text-center leading-tight">Expert Support Available</span>
                  </div>
                </div>
              )}

              <div className="pt-0.5 sm:pt-2 md:pt-3">
                <Link
                  href={slide.link}
                  className={`inline-block px-2.5 py-1 sm:px-8 sm:py-3.5 text-white font-black text-[7.5px] sm:text-xs tracking-wider uppercase rounded-sm sm:rounded-lg shadow-sm sm:shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-100 cursor-pointer ${
                    slide.id === 1 || slide.id === 4 || slide.id === 5
                      ? 'bg-[#5b21b6] hover:bg-[#4c1d95]'
                      : slide.id === 2
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : slide.id === 3
                      ? 'bg-[#e9b384] hover:bg-[#dfa575] !text-slate-950 font-extrabold'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500'
                  }`}
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
