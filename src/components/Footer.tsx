'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Phone, MessageSquare, Send, Check } from 'lucide-react';

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
      // Log the enquiry to the database
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: 'B2B Dealer / Bulk Enquiry',
          productUrl: window.location.href,
          customerName: formData.name,
          customerPhone: formData.phone,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        // Pre-fill WhatsApp message
        const text = encodeURIComponent(
          `Hi Sait Solutions, I would like to submit a B2B Dealer/Bulk enquiry.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nMessage: ${formData.message}`
        );
        setTimeout(() => {
          window.open(`https://wa.me/919999999999?text=${text}`, '_blank');
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
    <footer className="w-full bg-zinc-950 border-t border-zinc-900 pt-16 pb-8 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Brand Section */}
        <div className="space-y-4">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Sait Solutions Logo"
              width={140}
              height={45}
              className="object-contain mb-2"
            />
          </Link>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Sait Solutions is an elite distributor of high-performance PC hardware, advanced networking arrays, premium monitors, enterprise storage, and commercial-grade CCTV arrays.
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent shrink-0" />
              <span>123 IT Plaza, SP Road, Bengaluru, Karnataka</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-accent shrink-0" />
              <span>+91 9999999999</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-accent shrink-0" />
              <span>sales@saitsolutions.com</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold text-sm tracking-wider uppercase">Hot Categories</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/category/pc-components" className="hover:text-white transition-colors">PC Components & Cabinets</Link></li>
            <li><Link href="/category/storage-nas" className="hover:text-white transition-colors">Enterprise Storage & SSDs</Link></li>
            <li><Link href="/category/network-security" className="hover:text-white transition-colors">Mesh Routers & Access Points</Link></li>
            <li><Link href="/category/network-security" className="hover:text-white transition-colors">Security CCTV & Access Control</Link></li>
            <li><Link href="/category/monitors-display" className="hover:text-white transition-colors">Projectors & Conferencing Systems</Link></li>
          </ul>
        </div>

        {/* Information Links */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold text-sm tracking-wider uppercase">Company</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/support" className="hover:text-white transition-colors">Service Centers & Support</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">About Our Business</Link></li>
            <li><Link href="/admin" className="hover:text-white transition-colors">Admin Dashboard</Link></li>
            <li>
              <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Dealer Registration
              </a>
            </li>
          </ul>
        </div>

        {/* B2B Dealer Lead Form */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold text-sm tracking-wider uppercase">Dealer & Bulk Enquiry</h3>
          <p className="text-xs text-zinc-500">
            Submit your contact info to register as a local dealer and unlock bulk wholesale pricing.
          </p>
          {isSubmitted ? (
            <div className="bg-emerald-950/50 border border-emerald-800 text-emerald-400 p-4 rounded-lg flex items-center gap-2 text-xs">
              <Check className="w-4 h-4 shrink-0" />
              <span>Success! Opening WhatsApp chat...</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2 text-xs">
              <input
                type="text"
                placeholder="Business/Contact Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-accent"
                required
              />
              <input
                type="tel"
                placeholder="WhatsApp Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-accent"
                required
              />
              <textarea
                placeholder="Product requirements / Bulk volume..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-accent min-h-[60px] resize-none"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-brand-purple-light to-brand-purple-dark text-white rounded py-2 hover:brightness-110 transition-all font-semibold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3 h-3" />
                {isSubmitting ? 'Submitting...' : 'Register Dealer'}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600">
        <div>
          &copy; {new Date().getFullYear()} Sait Solutions. All rights reserved.
        </div>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-zinc-400 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-zinc-400 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
