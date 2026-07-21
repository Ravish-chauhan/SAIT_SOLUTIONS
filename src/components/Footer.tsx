'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Phone, Send, Check } from 'lucide-react';

export default function Footer() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: 'B2B Dealer / Bulk Enquiry',
          productUrl: typeof window !== 'undefined' ? window.location.href : '',
          customerName: formData.name,
          customerPhone: formData.phone,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        const text = encodeURIComponent(
          `Hi Sait Solutions, I would like to submit a B2B Dealer/Bulk enquiry.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nMessage: ${formData.message}`
        );
        setTimeout(() => {
          window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
          setFormData({ name: '', phone: '', message: '' });
          setIsSubmitted(false);
        }, 1500);
      }
    } catch (error) {
      console.error('Error submitting B2B enquiry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="w-full bg-[#0c0915] border-t border-zinc-900 pt-16 pb-8 text-zinc-400">
      <div className="max-w-[1500px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-14">
        
        {/* Brand Section with Exact Navbar Logo Composition */}
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

          <p className="text-xs text-zinc-400 leading-relaxed font-medium">
            Sait Solutions is an authorized distributor of high-performance PC components, networking hardware, monitors, enterprise storage, and security systems.
          </p>

          <div className="space-y-3 text-xs pt-1">
            <div className="flex items-start gap-2.5 text-zinc-300">
              <div className="p-1.5 rounded-lg bg-zinc-900 text-purple-400 border border-zinc-800 shrink-0 mt-0.5">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <span className="leading-tight font-medium">123 IT Plaza, SP Road, Bengaluru, Karnataka</span>
            </div>

            <div className="flex items-center gap-2.5 text-zinc-300">
              <div className="p-1.5 rounded-lg bg-zinc-900 text-purple-400 border border-zinc-800 shrink-0">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span className="font-medium">+91 98765 43210</span>
            </div>

            <div className="flex items-center gap-2.5 text-zinc-300">
              <div className="p-1.5 rounded-lg bg-zinc-900 text-purple-400 border border-zinc-800 shrink-0">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <span className="font-medium">support@saitsol.com</span>
            </div>
          </div>
        </div>

        {/* Hot Categories */}
        <div className="space-y-4">
          <h3 className="text-white font-extrabold text-xs tracking-widest uppercase border-l-2 border-[#5b21b6] pl-2.5">
            Hot Categories
          </h3>
          <ul className="space-y-2.5 text-xs font-semibold">
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

        {/* Company Links */}
        <div className="space-y-4">
          <h3 className="text-white font-extrabold text-xs tracking-widest uppercase border-l-2 border-[#5b21b6] pl-2.5">
            Company & Services
          </h3>
          <ul className="space-y-2.5 text-xs font-semibold">
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
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                B2B Dealer Registration
              </a>
            </li>
          </ul>
        </div>

        {/* Dealer Registration Form */}
        <div className="space-y-3.5 bg-zinc-900/60 border border-zinc-800/80 p-4.5 rounded-2xl">
          <h3 className="text-white font-extrabold text-xs tracking-wider uppercase">
            Dealer & Bulk Enquiry
          </h3>
          <p className="text-[11px] text-zinc-400 font-medium leading-normal">
            Submit your contact info to register as a local dealer and unlock wholesale pricing.
          </p>

          {isSubmitted ? (
            <div className="bg-emerald-950/60 border border-emerald-700/60 text-emerald-400 p-3.5 rounded-xl flex items-center gap-2 text-xs font-bold">
              <Check className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Success! Opening WhatsApp chat...</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2.5 text-xs">
              <input
                type="text"
                placeholder="Business/Contact Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-[#5b21b6] text-xs font-medium"
                required
              />
              <input
                type="tel"
                placeholder="WhatsApp Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-[#5b21b6] text-xs font-medium"
                required
              />
              <textarea
                placeholder="Product requirements / Bulk volume..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-[#5b21b6] text-xs font-medium min-h-[55px] resize-none"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#5b21b6] to-[#4c1d95] hover:brightness-110 text-white rounded-xl py-2.5 transition-all text-xs font-bold tracking-wide flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-98 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Submitting...' : 'Register Dealer'}</span>
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="max-w-[1500px] mx-auto px-4 md:px-8 border-t border-zinc-900 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-zinc-500 font-medium">
        <div>
          &copy; {new Date().getFullYear()} Sait Solutions. All rights reserved.
        </div>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-zinc-300 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-zinc-300 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
