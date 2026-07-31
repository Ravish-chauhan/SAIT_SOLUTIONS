'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronRight,
  ArrowRight,
  Boxes,
  Sparkles,
  Search
} from 'lucide-react';

interface SubcategoryData {
  _id: string;
  name: string;
  slug: string;
}

interface CategoryData {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parent?: any;
  subcategories?: SubcategoryData[];
}

interface AllCategoriesClientProps {
  categories: CategoryData[];
}

export default function AllCategoriesClient({ categories: initialCategories }: AllCategoriesClientProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Default image mapping fallback for core categories if image URL is empty
  const defaultImagesMap: Record<string, string> = {
    'pc-components': '/category/pc components.webp',
    'storage-nas': '/category/NAS-Storage.webp',
    'peripherals': '/category/peripherals.avif',
    'monitors-display': '/category/monitor.jpg',
    'network-security': '/category/network and security.jpg',
    'networking': '/category/network and security.jpg',
    'accessories': '/category/accessories.jpg',
  };

  // Dynamically render main categories from database
  const categoriesList = useMemo(() => {
    // Filter top-level main categories (parent is null/undefined)
    const mainCategories = (initialCategories || []).filter((c) => !c.parent);

    if (mainCategories.length === 0) {
      // Fallback showcase categories if DB is empty
      return [
        { _id: 'c1', name: 'PC Components', slug: 'pc-components', image: '/category/pc components.webp', productCount: 0 },
        { _id: 'c2', name: 'Storage & NAS', slug: 'storage-nas', image: '/category/NAS-Storage.webp', productCount: 0 },
        { _id: 'c3', name: 'Peripherals', slug: 'peripherals', image: '/category/peripherals.avif', productCount: 0 },
        { _id: 'c4', name: 'Monitors & Displays', slug: 'monitors-display', image: '/category/monitor.jpg', productCount: 0 },
        { _id: 'c5', name: 'Networking', slug: 'networking', image: '/category/network and security.jpg', productCount: 0 },
        { _id: 'c6', name: 'Accessories', slug: 'accessories', image: '/category/accessories.jpg', productCount: 0 },
      ];
    }

    return mainCategories.map((cat: any) => {
      const fallbackImg = defaultImagesMap[cat.slug] || '/logo.png';
      return {
        _id: cat._id,
        name: cat.name,
        slug: cat.slug,
        image: cat.image && cat.image.trim() !== '' ? cat.image : fallbackImg,
        productCount: cat.productCount || 0,
        link: `/category/${cat.slug}`,
      };
    });
  }, [initialCategories]);

  // Filter categories by search term
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categoriesList;
    const q = searchQuery.toLowerCase();
    return categoriesList.filter((cat) => cat.name.toLowerCase().includes(q));
  }, [categoriesList, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-8 px-4 md:px-8 max-w-7xl mx-auto space-y-8 font-sans">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-[#5b21b6] transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-700 font-bold">All Categories</span>
      </div>

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Shop by Category
          </h1>
          <p className="text-xs md:text-sm text-slate-500 font-medium mt-1">
            Explore our wide range of IT hardware and accessories.
          </p>
        </div>

        {/* Quick Search Input */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-xl pl-4 pr-10 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#5b21b6] font-medium shadow-sm transition-all"
          />
          <Search className="w-4 h-4 absolute right-3.5 top-3 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* DYNAMIC IMAGE-FIRST CATEGORIES GRID */}
      {filteredCategories.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3 shadow-sm">
          <Boxes className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No categories found matching "{searchQuery}"</h3>
          <button
            onClick={() => setSearchQuery('')}
            className="bg-purple-700 text-white font-bold text-xs px-5 py-2 rounded-xl hover:bg-purple-800 transition-all cursor-pointer inline-block"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
          {filteredCategories.map((cat, idx) => (
            <Link
              key={cat._id}
              href={`/category/${cat.slug}`}
              className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(15,23,42,0.05)] hover:shadow-xl hover:border-[#5b21b6]/40 transition-all duration-300 flex flex-col group cursor-pointer"
            >
              {/* TOP SECTION: Category Image Box (Full-width light container) */}
              <div className="w-full h-32 sm:h-48 md:h-56 relative bg-slate-50 flex items-center justify-center border-b border-slate-100 overflow-hidden shrink-0">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  priority={idx < 4}
                  unoptimized={cat.image.startsWith('http')}
                  className="object-contain p-3 sm:p-5 group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>

              {/* BOTTOM SECTION: Title, Live Cached Product Count, & Arrow */}
              <div className="p-3 sm:p-5 flex items-center justify-between gap-2 bg-white">
                <div>
                  <h3 className="text-xs sm:text-base md:text-lg font-black text-slate-900 group-hover:text-[#5b21b6] transition-colors tracking-tight leading-snug line-clamp-1">
                    {cat.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-0.5 sm:mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span className="text-[10px] sm:text-xs text-slate-500 font-bold">
                      {cat.productCount} Items
                    </span>
                  </div>
                </div>

                <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-purple-50 group-hover:bg-[#5b21b6] text-[#5b21b6] group-hover:text-white flex items-center justify-center transition-all shrink-0 shadow-sm group-hover:scale-110">
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
