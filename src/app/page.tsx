import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Truck, Percent, MessageSquare, ChevronRight, Server, Cpu, Video, Shield, Monitor, HardDrive, Smartphone, HelpCircle, Headphones } from 'lucide-react';
import dbConnect from '@/lib/db';
import Category from '@/models/Category';
import Product from '@/models/Product';
import HeroCarousel from '@/components/HeroCarousel';
import ProductCard from '@/components/ProductCard';
import CategoriesCarousel from '@/components/CategoriesCarousel';

// Inline mapping of category slugs to specific icons
const getCategoryIcon = (slug: string) => {
  const props = { className: "w-8 h-8 text-accent mb-3 group-hover:scale-110 transition-transform" };
  switch (slug) {
    case 'pc-components':
      return <Cpu {...props} />;
    case 'storage-nas':
      return <HardDrive {...props} />;
    case 'network-security':
      return <Shield {...props} />;
    case 'monitors-display':
      return <Monitor {...props} />;
    case 'mobile-accessories':
      return <Smartphone {...props} />;
    default:
      return <Server {...props} />;
  }
};

export const revalidate = 3600; // ISR: Revalidate page every hour

export default async function HomePage() {
  await dbConnect();

  // Fetch parent categories and trending products from the database
  const parentCategories = await Category.find({ parent: null }).sort({ order: 1 }).lean();
  const trendingProducts = await Product.find({ isTrending: true }).limit(8).lean();

  // Serialize MongoDB documents for Client Components safely
  const serializedProducts = JSON.parse(JSON.stringify(trendingProducts));
  const serializedCategories = JSON.parse(JSON.stringify(parentCategories));

  return (
    <div className="w-full pb-16">
      <HeroCarousel />

      {/* Scrolling Marquee & Categories Carousel Showcase */}
      <CategoriesCarousel />

      {/* Why Choose Us Strip */}
      <section className="bg-zinc-950 border-b border-zinc-900 py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4 p-4 bg-zinc-900/40 border border-zinc-800/40 rounded-xl">
            <div className="p-3 rounded-lg bg-brand-purple-light/10 text-brand-purple-light">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Genuine Products</h4>
              <p className="text-zinc-500 text-xs mt-0.5">100% direct-from-brand authentic stock.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-zinc-900/40 border border-zinc-800/40 rounded-xl">
            <div className="p-3 rounded-lg bg-accent/10 text-accent">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Pan-India Service</h4>
              <p className="text-zinc-500 text-xs mt-0.5">Dedicated repair centers in all major cities.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-zinc-900/40 border border-zinc-800/40 rounded-xl">
            <div className="p-3 rounded-lg bg-amber-500/10 text-amber-400">
              <Percent className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Bulk & Dealer Pricing</h4>
              <p className="text-zinc-500 text-xs mt-0.5">High volume discounts for local retailers.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-zinc-900/40 border border-zinc-800/40 rounded-xl">
            <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Quick WhatsApp Response</h4>
              <p className="text-zinc-500 text-xs mt-0.5">Instant query resolution during business hours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-xs text-accent uppercase font-bold tracking-wider">Browse Catalog</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-1">Featured Categories</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {serializedCategories.map((cat: any) => (
            <Link
              key={cat._id}
              href={`/category/${cat.slug}`}
              className="bg-zinc-900/60 border border-zinc-800 hover:border-brand-purple-light/40 rounded-xl p-6 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {getCategoryIcon(cat.slug)}
                <h3 className="text-white font-bold text-sm leading-snug group-hover:text-accent transition-colors">
                  {cat.name}
                </h3>
              </div>
              <div className="flex items-center text-xs text-zinc-500 group-hover:text-white transition-colors mt-6">
                <span>View Range</span>
                <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-20">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-xs text-brand-purple-light uppercase font-bold tracking-wider">Most Requested</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-1 font-sans">Trending Hardware</h2>
          </div>
          <Link
            href="/category/pc-components"
            className="text-xs text-zinc-400 hover:text-accent font-semibold transition-colors flex items-center gap-1"
          >
            <span>View Full Catalog</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {serializedProducts.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center text-zinc-500">
            No trending products currently available. Setup database and visit <Link href="/api/seed" className="text-accent underline font-semibold">/api/seed</Link> to initialize data.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serializedProducts.map((prod: any) => (
              <ProductCard key={prod._id} product={prod} />
            ))}
          </div>
        )}
      </section>

      {/* Brand Strip / Manufacturer Partners */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-8">
        <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-8 text-center space-y-6">
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Authorized Distribution Partner</span>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-30 grayscale hover:opacity-50 transition-opacity duration-300">
            <span className="text-white font-extrabold text-lg tracking-wider">ZEBRONICS</span>
            <span className="text-white font-extrabold text-lg tracking-wider">HIKVISION</span>
            <span className="text-white font-extrabold text-lg tracking-wider">TP-LINK</span>
            <span className="text-white font-extrabold text-lg tracking-wider">FRONTECH</span>
            <span className="text-white font-extrabold text-lg tracking-wider">FOXIN</span>
          </div>
        </div>
      </section>
    </div>
  );
}
