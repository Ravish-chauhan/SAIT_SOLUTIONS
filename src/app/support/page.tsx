import React from 'react';
import { ShieldCheck, MapPin, Phone, Mail, Clock } from 'lucide-react';

interface ServiceCenter {
  city: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
}

export default function SupportPage() {
  const centers: ServiceCenter[] = [
    {
      city: 'Bengaluru (Head Office)',
      address: '123 IT Plaza, SP Road, Bengaluru, Karnataka - 560002',
      phone: '+91 99999 99999',
      email: 'service.blr@saitsolutions.com',
      hours: 'Mon - Sat: 10:00 AM - 7:00 PM',
    },
    {
      city: 'Chennai',
      address: '45 Ritchie Street, Mount Road, Chennai, Tamil Nadu - 600002',
      phone: '+91 99999 88888',
      email: 'service.chn@saitsolutions.com',
      hours: 'Mon - Sat: 10:00 AM - 6:30 PM',
    },
    {
      city: 'Mumbai',
      address: 'Shop 12, Lamington Road, Grant Road, Mumbai, Maharashtra - 400007',
      phone: '+91 99999 77777',
      email: 'service.bom@saitsolutions.com',
      hours: 'Mon - Sat: 10:00 AM - 7:00 PM',
    },
    {
      city: 'Delhi',
      address: '204 Nehru Place, New Delhi - 110019',
      phone: '+91 99999 66666',
      email: 'service.del@saitsolutions.com',
      hours: 'Mon - Sat: 10:00 AM - 6:30 PM',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 space-y-16">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs text-accent uppercase font-bold tracking-wider">Quality Warranty Guarantee</span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white">Sait Service Centers</h1>
        <p className="text-zinc-500 text-sm leading-relaxed">
          As direct brand distributors, we run full warranty checking and hardware servicing at our regional centers. Walk in or mail in your hardware items.
        </p>
      </div>

      {/* Support Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center space-y-3">
          <div className="p-3 w-12 h-12 rounded-xl bg-brand-purple-light/10 text-brand-purple-light mx-auto flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-white font-bold text-base">Brand Warranty</h3>
          <p className="text-zinc-500 text-xs leading-relaxed">
            All devices come with standard 1-3 year manufacturer warranty. Bring original tax invoice.
          </p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center space-y-3">
          <div className="p-3 w-12 h-12 rounded-xl bg-accent/10 text-accent mx-auto flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-white font-bold text-base">Quick Servicing</h3>
          <p className="text-zinc-500 text-xs leading-relaxed">
            Common problems like adapter failures, camera firmware, and router configurations solved in 48 hours.
          </p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center space-y-3">
          <div className="p-3 w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center">
            <Phone className="w-6 h-6" />
          </div>
          <h3 className="text-white font-bold text-base">Support Hotline</h3>
          <p className="text-zinc-500 text-xs leading-relaxed">
            Call our specialized technical engineers directly for hardware debugging over call.
          </p>
        </div>
      </div>

      {/* Center Listing Grid */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-white border-b border-zinc-900 pb-3">Authorized Locations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {centers.map((center, idx) => (
            <div key={idx} className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-white font-extrabold text-lg">{center.city}</h3>
              <div className="space-y-2 text-xs text-zinc-400">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>{center.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-accent shrink-0" />
                  <span>{center.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-accent shrink-0" />
                  <span>{center.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-accent shrink-0" />
                  <span>{center.hours}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
