'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, ChevronRight } from 'lucide-react';

const OFFICES = [
  {
    tag: 'Main Headquarters',
    city: 'Lucknow',
    address: 'Office No. 4 & 4A, 1st Floor, F.I. Graphics Building, Near Nagar Nigam, Lalbagh, Lucknow - 226001',
    phone: '+91 9369991770',
    isMain: true,
  },
  {
    tag: 'Branch Office',
    city: 'Pune',
    address: '2nd Floor, Office No 27 & 28, Sanas Plaza, Shrimant Thorle Bajirao Peshwe Path, Shukrawar Peth, Pune - 411002, Maharashtra',
    phone: '+91 9371571234 / +91 9822508700',
    isMain: false,
  },
  {
    tag: 'Branch Office',
    city: 'Nagpur',
    address: 'Somwar Bazar Road, Near Hotel Kuber Narayani Building, Sitabuldi, Nagpur - 440012, Maharashtra',
    phone: '+91 7020561812',
    isMain: false,
  },
  {
    tag: 'Branch Office',
    city: 'Goa',
    address: 'G-7 Unitech City Center Building, Opp. Sheetal Hotel, Panjim, Goa - 403001',
    phone: '+91 98348 41819',
    isMain: false,
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#0c0a15] text-slate-300 font-sans border-t border-slate-850 pt-14 pb-8">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 space-y-12">
        
        {/* TOP BRAND & CATEGORY NAVIGATION GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10 pb-10 border-b border-slate-850">
          
          {/* Brand Info (2 Columns on Large Screens) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center p-1 shrink-0">
                <Image
                  src="/logo.webp"
                  alt="SA Monogram"
                  width={28}
                  height={28}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="h-5 w-px bg-slate-700" />
              <span className="text-sm font-black tracking-wider text-white uppercase font-sans">
                S A IT SOLUTIONS PVT. LTD.
              </span>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed font-normal max-w-md">
              Authorized distributor of high-performance PC hardware, server storage, networking infrastructure, surveillance solutions, and enterprise displays across India.
            </p>

            <div className="pt-1 flex flex-col space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-[#5b21b6] shrink-0" />
                <a href="tel:+919369991770" className="font-bold text-white hover:text-purple-300 transition-colors">
                  +91 9369991770 (Primary Support)
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-[#5b21b6] shrink-0" />
                <a href="mailto:sales@saitsolutions.co.in" className="font-medium text-slate-300 hover:text-white transition-colors">
                  sales@saitsolutions.co.in
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Categories */}
          <div className="space-y-3">
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider">Categories</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/category/pc-components" className="hover:text-white transition-colors">PC Components</Link></li>
              <li><Link href="/category/storage-nas" className="hover:text-white transition-colors">Storage & NAS</Link></li>
              <li><Link href="/category/peripherals" className="hover:text-white transition-colors">Peripherals</Link></li>
              <li><Link href="/category/monitors-display" className="hover:text-white transition-colors">Monitors & Displays</Link></li>
              <li><Link href="/category/network-security" className="hover:text-white transition-colors">Networking & Security</Link></li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/categories" className="hover:text-white transition-colors">Our Store</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">All Hardware</Link></li>
              <li><Link href="/wishlist" className="hover:text-white transition-colors">Wishlist</Link></li>
              <li><Link href="/support" className="hover:text-white transition-colors">Customer Support</Link></li>
            </ul>
          </div>

          {/* Column 4: Customer Help */}
          <div className="space-y-3">
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider">Customer Care</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Company</Link></li>
            </ul>
          </div>

        </div>

        {/* CLEAN 4-OFFICE LOCATIONS SECTION */}
        <div className="space-y-4">
          <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">
            Our Regional Locations
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {OFFICES.map((off, idx) => (
              <div
                key={idx}
                className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-extrabold text-white">{off.city}</span>
                    <span className={`text-[9px] font-bold px-2 py-0.2 rounded ${
                      off.isMain
                        ? 'bg-purple-950 text-purple-300 border border-purple-800/50'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {off.tag}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed font-normal mb-3">
                    {off.address}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/70 text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-[#5b21b6] shrink-0" />
                  <span>{off.phone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="pt-6 border-t border-slate-850 text-center text-xs text-slate-500 font-medium">
          &copy; {new Date().getFullYear()} <span className="text-slate-300 font-bold">S A IT SOLUTIONS PRIVATE LIMITED</span>. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
