'use client';

import React from 'react';

// Original Brand Vector Logos (Transparent Background, Authentic Colors, Expanded ViewBox to prevent clipping)
const IntelLogo = () => (
  <svg className="h-7 sm:h-9 w-auto overflow-visible" viewBox="0 0 135 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 8C7.37 8 2 13.37 2 20C2 26.63 7.37 32 14 32C20.63 32 26 26.63 26 20C26 13.37 20.63 8 14 8ZM14 27.5C9.86 27.5 6.5 24.14 6.5 20C6.5 15.86 9.86 12.5 14 12.5C18.14 12.5 21.5 15.86 21.5 20C21.5 24.14 18.14 27.5 14 27.5Z" fill="#0068B5"/>
    <rect x="12" y="15" width="4" height="9" fill="#0068B5"/>
    <circle cx="14" cy="11" r="2" fill="#00C7FD"/>
    <text x="32" y="27" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="24" fill="#0068B5" letterSpacing="-0.5">intel</text>
  </svg>
);

const AmdLogo = () => (
  <svg className="h-6 sm:h-8 w-auto overflow-visible" viewBox="0 0 130 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 2H14V16H0V2Z" fill="#ED1C24"/>
    <path d="M14 16H28V30H14V16Z" fill="#ED1C24"/>
    <path d="M14 2L28 16H14V2Z" fill="#ED1C24"/>
    <text x="34" y="25" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="24" fill="#111827" letterSpacing="1">AMD</text>
  </svg>
);

const NvidiaLogo = () => (
  <svg className="h-7 sm:h-9 w-auto overflow-visible" viewBox="0 0 150 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 5C10.8 5 5 10.8 5 18C5 25.2 10.8 31 18 31C21.5 31 24.6 29.6 27 27.3L23.5 23.8C22.1 25.2 20.1 26 18 26C13.6 26 10 22.4 10 18C10 13.6 13.6 10 18 10C21.2 10 24 11.9 25.3 14.8L29.7 12.8C27.6 8.1 23.2 5 18 5Z" fill="#76B900"/>
    <path d="M18 13C15.2 13 13 15.2 13 18C13 20.8 15.2 23 18 23C19.4 23 20.7 22.4 21.6 21.5L19.2 19.1C18.9 19.4 18.5 19.5 18 19.5C17.2 19.5 16.5 18.8 16.5 18C16.5 17.2 17.2 16.5 18 16.5C18.6 16.5 19.1 16.8 19.3 17.3L22.6 15.8C21.7 14.1 20 13 18 13Z" fill="#76B900"/>
    <text x="36" y="27" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="22" fill="#0F172A" letterSpacing="1">NVIDIA</text>
  </svg>
);

const AsusLogo = () => (
  <svg className="h-6 sm:h-8 w-auto overflow-visible" viewBox="0 0 120 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="26" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="26" fill="#00539B" letterSpacing="2">ASUS</text>
    <line x1="2" y1="15" x2="30" y2="15" stroke="#00539B" strokeWidth="2.5" />
  </svg>
);

const MsiLogo = () => (
  <svg className="h-6 sm:h-8 w-auto overflow-visible" viewBox="0 0 110 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="26" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontStyle="italic" fontSize="28" fill="#FF0000" letterSpacing="1">msi</text>
  </svg>
);

const GigabyteLogo = () => (
  <svg className="h-5 sm:h-7 w-auto overflow-visible" viewBox="0 0 190 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="25" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="22" fill="#FF6600" letterSpacing="2">GIGABYTE</text>
  </svg>
);

const CorsairLogo = () => (
  <svg className="h-7 sm:h-9 w-auto overflow-visible" viewBox="0 0 165 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4L22 13L17 27L5 22Z" fill="#FACC15"/>
    <path d="M3 15L12 33H26L12 15Z" fill="#0F172A"/>
    <text x="32" y="27" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="21" fill="#0F172A" letterSpacing="2">CORSAIR</text>
  </svg>
);

const LogitechLogo = () => (
  <svg className="h-6 sm:h-8 w-auto overflow-visible" viewBox="0 0 160 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="13" cy="16" r="10" fill="none" stroke="#00B8FC" strokeWidth="3.5" />
    <circle cx="13" cy="16" r="4.5" fill="#00B8FC" />
    <text x="30" y="25" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="20" fill="#0F172A" letterSpacing="1">logitech</text>
  </svg>
);

const RazerLogo = () => (
  <svg className="h-7 sm:h-9 w-auto overflow-visible" viewBox="0 0 140 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="27" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="24" fill="#00FF00" letterSpacing="4">RAZER</text>
  </svg>
);

const SamsungLogo = () => (
  <svg className="h-6 sm:h-8 w-auto overflow-visible" viewBox="0 0 165 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="80" cy="18" rx="78" ry="14" fill="none" stroke="#1428A0" strokeWidth="2.5" transform="rotate(-6 80 18)" />
    <text x="24" y="24" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="19" fill="#1428A0" letterSpacing="2">SAMSUNG</text>
  </svg>
);

const WdLogo = () => (
  <svg className="h-6 sm:h-8 w-auto overflow-visible" viewBox="0 0 230 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="25" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="20" fill="#005195" letterSpacing="1.5">WESTERN DIGITAL</text>
  </svg>
);

const SeagateLogo = () => (
  <svg className="h-6 sm:h-8 w-auto overflow-visible" viewBox="0 0 155 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4C6.5 4 2 8.5 2 14C2 19.5 6.5 24 12 24C17.5 24 22 19.5 22 14L16.5 17.5C15.5 19 13.5 19.5 12 18.5C10.5 17.5 10 15.5 11 14L16.5 10.5Z" fill="#68BC45"/>
    <text x="28" y="25" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="21" fill="#0F172A" letterSpacing="2">SEAGATE</text>
  </svg>
);

const CrucialLogo = () => (
  <svg className="h-6 sm:h-8 w-auto overflow-visible" viewBox="0 0 135 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="25" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="24" fill="#00A3E0" letterSpacing="1">crucial</text>
  </svg>
);

const HikvisionLogo = () => (
  <svg className="h-6 sm:h-8 w-auto overflow-visible" viewBox="0 0 160 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="25" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="21">
      <tspan fill="#D71921">HIK</tspan>
      <tspan fill="#333333">VISION</tspan>
    </text>
  </svg>
);

const TpLinkLogo = () => (
  <svg className="h-6 sm:h-8 w-auto overflow-visible" viewBox="0 0 135 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="25" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="22" fill="#4AC4B6" letterSpacing="1">tp-link</text>
  </svg>
);

const CpPlusLogo = () => (
  <svg className="h-6 sm:h-8 w-auto overflow-visible" viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="25" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="23" fill="#ED1C24" letterSpacing="2">CP PLUS</text>
  </svg>
);

const CoolerMasterLogo = () => (
  <svg className="h-7 sm:h-9 w-auto overflow-visible" viewBox="0 0 215 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="12,3 24,9 24,21 12,27 0,21 0,9" fill="none" stroke="#7B2CBF" strokeWidth="2.8" />
    <text x="30" y="25" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="18" fill="#0F172A" letterSpacing="1.5">COOLER MASTER</text>
  </svg>
);

const HyperxLogo = () => (
  <svg className="h-6 sm:h-8 w-auto overflow-visible" viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="25" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="25" fill="#E21836" letterSpacing="3">HYPERX</text>
  </svg>
);

const ZotacLogo = () => (
  <svg className="h-6 sm:h-8 w-auto overflow-visible" viewBox="0 0 130 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="25" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="24" fill="#FFB800" letterSpacing="2">ZOTAC</text>
  </svg>
);

const KingstonLogo = () => (
  <svg className="h-6 sm:h-8 w-auto overflow-visible" viewBox="0 0 155 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="16" r="8" fill="#E31837" />
    <text x="24" y="25" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="22" fill="#0F172A" letterSpacing="1">Kingston</text>
  </svg>
);

const ROW1_LOGOS = [
  IntelLogo,
  AmdLogo,
  NvidiaLogo,
  AsusLogo,
  MsiLogo,
  GigabyteLogo,
  CorsairLogo,
  LogitechLogo,
  RazerLogo,
  SamsungLogo,
];

const ROW2_LOGOS = [
  WdLogo,
  SeagateLogo,
  CrucialLogo,
  HikvisionLogo,
  TpLinkLogo,
  CpPlusLogo,
  CoolerMasterLogo,
  HyperxLogo,
  ZotacLogo,
  KingstonLogo,
];

export default function BrandMarquee() {
  const duplicatedRow1 = [...ROW1_LOGOS, ...ROW1_LOGOS, ...ROW1_LOGOS];
  const duplicatedRow2 = [...ROW2_LOGOS, ...ROW2_LOGOS, ...ROW2_LOGOS];

  return (
    <section className="relative w-full py-8 md:py-12 bg-[#F8F9FC] overflow-hidden">
      {/* Full-Height Left & Right Gradient Fade Masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-36 bg-gradient-to-r from-[#F8F9FC] via-[#F8F9FC]/80 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-36 bg-gradient-to-l from-[#F8F9FC] via-[#F8F9FC]/80 to-transparent z-10" />

      {/* 2-3 Words Compact Top Heading */}
      <div className="relative z-20 text-center mb-6 md:mb-8">
        <h2 className="text-lg sm:text-xl font-extrabold text-slate-800 tracking-wider uppercase font-sans">
          Official Brand Partners
        </h2>
      </div>

      {/* Clean Brand Marquee Streams */}
      <div className="w-full space-y-7 py-2">
        {/* Row 1: Leftward Moving Brand Logos */}
        <div className="flex w-max items-center animate-marquee-left hover:[animation-play-state:paused]">
          {duplicatedRow1.map((LogoComponent, idx) => (
            <div
              key={`row1-logo-${idx}`}
              className="mx-7 sm:mx-11 shrink-0 flex items-center justify-center hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <LogoComponent />
            </div>
          ))}
        </div>

        {/* Row 2: Rightward Moving Brand Logos */}
        <div className="flex w-max items-center animate-marquee-right hover:[animation-play-state:paused]">
          {duplicatedRow2.map((LogoComponent, idx) => (
            <div
              key={`row2-logo-${idx}`}
              className="mx-7 sm:mx-11 shrink-0 flex items-center justify-center hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <LogoComponent />
            </div>
          ))}
        </div>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes marqueeLeft {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        @keyframes marqueeRight {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .animate-marquee-left {
          animation: marqueeLeft 32s linear infinite;
        }
        .animate-marquee-right {
          animation: marqueeRight 32s linear infinite;
        }
      `}</style>
    </section>
  );
}
