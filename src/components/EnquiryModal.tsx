'use client';

import React, { useState } from 'react';
import { X, MessageSquare, CheckCircle } from 'lucide-react';

interface EnquiryModalProps {
  product: {
    name: string;
    slug: string;
  };
  onClose: () => void;
}

export default function EnquiryModal({ product, onClose }: EnquiryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);
    try {
      const productUrl = `${window.location.origin}/product/${product.slug}`;
      
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: product.name,
          productUrl,
          customerName: formData.name,
          customerPhone: formData.phone,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        
        const textMessage = `Hi Sait Solutions, I am interested in purchasing:
Product: ${product.name}
Link: ${productUrl}

My Details:
Name: ${formData.name}
Phone: ${formData.phone}
Query: ${formData.message || 'Please share stock availability and dealer price.'}`;

        const encodedMessage = encodeURIComponent(textMessage);
        
        setTimeout(() => {
          window.open(`https://wa.me/919999999999?text=${encodedMessage}`, '_blank');
          onClose();
        }, 1500);
      }
    } catch (error) {
      console.error('Enquiry submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white border border-slate-250 rounded-2xl w-full max-w-md p-6 relative shadow-2xl animate-in zoom-in-95 duration-200 text-slate-800">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4.5 right-4.5 text-slate-400 hover:text-slate-950 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-4 animate-in fade-in duration-300">
            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
            <h3 className="text-xl font-bold text-slate-900">Lead Recorded!</h3>
            <p className="text-sm text-slate-500">
              Connecting you with our sales expert on WhatsApp...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] text-accent uppercase font-extrabold tracking-wider">Product Enquiry</span>
              <h2 className="text-lg font-bold text-slate-900 line-clamp-1">{product.name}</h2>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                Log your details. This records your lead on our panel and opens WhatsApp.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe / Sai Enterprises"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-accent focus:bg-white transition-all shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">WhatsApp Mobile *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-accent focus:bg-white transition-all shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Requirements / Custom message (Optional)</label>
                <textarea
                  placeholder="Tell us if you want bulk units, customized configurations, or specific shipping..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-accent focus:bg-white transition-all shadow-sm min-h-[80px] resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-brand-purple-light to-brand-purple-dark text-white rounded-xl py-3 hover:brightness-110 transition-all font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              {isSubmitting ? 'Recording...' : 'Proceed to WhatsApp'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
