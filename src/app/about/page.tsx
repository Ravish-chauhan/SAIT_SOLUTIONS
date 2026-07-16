import React from 'react';
import Link from 'next/link';
import { Send, MapPin, Building, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-12">
      <div className="space-y-4">
        <span className="text-xs text-accent uppercase font-bold tracking-wider">Our Profile</span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white">About Sait Solutions</h1>
        <p className="text-zinc-400 text-sm leading-relaxed">
          Founded in Bengaluru, Sait Solutions is a premier B2B and retail IT hardware distributor. We bridge the gap between global hardware manufacturers and local technology dealers, corporate enterprises, and system integrators.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 text-center space-y-2">
          <Building className="w-8 h-8 text-accent mx-auto" />
          <h3 className="text-white font-bold text-sm">State-of-art Warehouse</h3>
          <p className="text-zinc-500 text-xs">Direct warehousing holding massive ready inventory of routers, GPUs, and SSD arrays.</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 text-center space-y-2">
          <Users className="w-8 h-8 text-accent mx-auto" />
          <h3 className="text-white font-bold text-sm">1,500+ Dealer Network</h3>
          <p className="text-zinc-500 text-xs">Enabling local shops and retailers to procure at the absolute lowest wholesale rates.</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 text-center space-y-2">
          <MapPin className="w-8 h-8 text-accent mx-auto" />
          <h3 className="text-white font-bold text-sm">Pan-India Logistics</h3>
          <p className="text-zinc-500 text-xs">Express shipping options across India with real-time tracking support.</p>
        </div>
      </div>

      <section className="bg-gradient-to-r from-zinc-900 to-brand-purple-dark/30 border border-zinc-800 rounded-2xl p-8 space-y-6">
        <h2 className="text-xl font-bold text-white">Partner with Sait Solutions</h2>
        <p className="text-zinc-400 text-xs leading-relaxed">
          Are you a local computer shop, CCTV technician, or networking systems installer? Partnering with us gets you direct access to warranty tracking, custom quote sheets, batch shipments, and direct account managers.
        </p>
        <a
          href="https://wa.me/919999999999?text=Hi%20Sait%20Solutions%2C%20I%20am%20interested%20in%20becoming%20a%20registered%20dealer."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent hover:bg-accent-hover text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Apply for Dealer Account</span>
        </a>
      </section>
    </div>
  );
}
