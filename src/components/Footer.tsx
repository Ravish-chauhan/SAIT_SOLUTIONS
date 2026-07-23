'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Phone, Clock, MessageCircle } from 'lucide-react';

export default function Footer() {
  const whatsappNumber = '919876543210';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hi Sait Solutions, I would like to inquire about IT hardware products.'
  )}`;

  return (
    <footer className="w-full bg-[#0c0915] border-t border-zinc-900 pt-16 pb-8 text-zinc-300">
      <div className="max-w-[1500px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-14">
        
        {/* Column 1: Brand & Contact Info */}
        <div className="space-y-5">
          
          {/* Logo with White Badge for Monogram + Divider + Text */}
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center p-1 shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <Image
                src="/logo.png"
                alt="SA Monogram"
                width={32}
                height={32}
                className="object-contain"
                priority
              />
            </div>
            <div className="h-6 w-px bg-zinc-700 group-hover:bg-zinc-500 transition-colors" />
            <span className="text-base font-black tracking-wider text-white uppercase font-sans select-none group-hover:text-purple-300 transition-colors">
              SAIT SOLUTIONS
            </span>
          </Link>

          <p className="text-xs text-zinc-300 leading-relaxed font-normal">
            Sait Solutions is an authorized distributor of high-performance PC components, networking hardware, monitors, enterprise storage, and security systems.
          </p>

          <div className="space-y-3 text-xs pt-1">
            <div className="flex items-start gap-2.5 text-zinc-200">
              <div className="p-1.5 rounded-lg bg-purple-950/60 text-purple-400 border border-purple-800/40 shrink-0 mt-0.5">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <span className="leading-tight font-medium text-zinc-200">
                123 IT Plaza, SP Road, Bengaluru, Karnataka
              </span>
            </div>

            <div className="flex items-center gap-2.5 text-zinc-200">
              <div className="p-1.5 rounded-lg bg-purple-950/60 text-purple-400 border border-purple-800/40 shrink-0">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <a href="tel:+919876543210" className="font-bold text-white hover:text-purple-300 transition-colors">
                +91 98765 43210
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-zinc-200">
              <div className="p-1.5 rounded-lg bg-purple-950/60 text-purple-400 border border-purple-800/40 shrink-0">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <a href="mailto:support@saitsol.com" className="font-bold text-white hover:text-purple-300 transition-colors">
                support@saitsol.com
              </a>
            </div>
          </div>
        </div>

        {/* Column 2: Hot Categories */}
        <div className="space-y-4">
          <h3 className="text-white font-extrabold text-xs tracking-widest uppercase border-l-2 border-purple-500 pl-2.5">
            Hot Categories
          </h3>
          <ul className="space-y-2.5 text-xs font-medium text-zinc-300">
            <li>
              <Link href="/category/pc-components" className="hover:text-white transition-colors">
                PC Components & Cabinets
              </Link>
            </li>
            <li>
              <Link href="/category/storage-nas" className="hover:text-white transition-colors">
                Enterprise Storage & SSDs
              </Link>
            </li>
            <li>
              <Link href="/category/network-security" className="hover:text-white transition-colors">
                Mesh Routers & Switches
              </Link>
            </li>
            <li>
              <Link href="/category/network-security" className="hover:text-white transition-colors">
                Security CCTV Cameras
              </Link>
            </li>
            <li>
              <Link href="/category/monitors-display" className="hover:text-white transition-colors">
                Gaming Monitors & Displays
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Company & Services */}
        <div className="space-y-4">
          <h3 className="text-white font-extrabold text-xs tracking-widest uppercase border-l-2 border-purple-500 pl-2.5">
            Company & Services
          </h3>
          <ul className="space-y-2.5 text-xs font-medium text-zinc-300">
            <li>
              <Link href="/about" className="hover:text-white transition-colors">
                About Our Business
              </Link>
            </li>
            <li>
              <Link href="/support" className="hover:text-white transition-colors">
                Support & Warranty
              </Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-white transition-colors">
                Admin Portal
              </Link>
            </li>
            <li>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Product Inquiry
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Business Hours & Support */}
        <div className="space-y-4">
          <h3 className="text-white font-extrabold text-xs tracking-widest uppercase border-l-2 border-purple-500 pl-2.5">
            Business Hours & Support
          </h3>
          
          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-2.5 text-zinc-200">
              <div className="p-1.5 rounded-lg bg-purple-950/60 text-purple-400 border border-purple-800/40 shrink-0 mt-0.5">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-bold text-white block">Monday - Saturday</span>
                <span className="text-zinc-400 text-[11px]">9:00 AM - 7:00 PM IST</span>
              </div>
            </div>

            <p className="text-zinc-300 text-xs leading-relaxed font-normal pt-1">
              Have questions or need custom quotes? Connect directly with our team over WhatsApp for instant assistance.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25d366]/15 hover:bg-[#25d366] text-[#25d366] hover:text-white border border-[#25d366]/40 rounded-xl px-4 py-2.5 text-xs font-extrabold transition-all cursor-pointer shadow-sm active:scale-95 mt-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="max-w-[1500px] mx-auto px-4 md:px-8 border-t border-zinc-900/80 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-zinc-400 font-medium">
        <div>
          &copy; {new Date().getFullYear()} <span className="text-white font-bold">Sait Solutions</span>. All rights reserved.
        </div>
        <div className="flex gap-5">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
