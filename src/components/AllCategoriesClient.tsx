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
        { _id: 'c1', name: 'PC Components', slug: 'pc-components', image: '/category/pc components.webp' },
        { _id: 'c2', name: 'Storage & NAS', slug: 'storage-nas', image: '/category/NAS-Storage.webp' },
        { _id: 'c3', name: 'Peripherals', slug: 'peripherals', image: '/category/peripherals.avif' },
        { _id: 'c4', name: 'Monitors & Displays', slug: 'monitors-display', image: '/category/monitor.jpg' },
        { _id: 'c5', name: 'Networking', slug: 'networking', image: '/category/network and security.jpg' },
        { _id: 'c6', name: 'Accessories', slug: 'accessories', image: '/category/accessories.jpg' },
      ];
    }

    return mainCategories.map((cat) => {
      const fallbackImg = defaultImagesMap[cat.slug] || '/logo.png';
      return {
        _id: cat._id,
        name: cat.name,
        slug: cat.slug,
        image: cat.image && cat.image.trim() !== '' ? cat.image : fallbackImg,
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
      <div className="flex items-center gap-2 text-xs text-slate-500 border-b border-slate-200 pb-3 font-medium">
        <Link href="/" className="hover:text-purple-700 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-purple-700 font-extrabold">Product Categories</span>
      </div>

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            <span>Shop by Category</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Browse our hardware categories to find IT equipment and component solutions
          </p>
        </div>

        {/* Quick Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-600 font-medium"
          />
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-5 md:gap-6">
          {filteredCategories.map((cat, idx) => (
            <Link
              key={cat._id}
              href={`/category/${cat.slug}`}
              className="bg-white border border-slate-200/80 rounded-3xl p-5 md:p-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)] hover:shadow-xl hover:border-purple-300 hover:scale-[1.02] transition-all duration-300 flex flex-col items-center justify-between text-center group cursor-pointer"
            >
              {/* Category Image Box */}
              <div className="w-full h-44 md:h-52 relative flex items-center justify-center bg-slate-50/70 rounded-2xl p-4 overflow-hidden mb-4 border border-slate-100">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  priority={idx < 3}
                  unoptimized={cat.image.startsWith('http')}
                  className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>

              {/* Title & Arrow */}
              <div className="w-full pt-1 flex items-center justify-between">
                <h3 className="text-sm md:text-base font-extrabold text-slate-900 group-hover:text-purple-700 transition-colors tracking-tight text-left">
                  {cat.name}
                </h3>
                <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-purple-700 group-hover:text-white text-slate-600 flex items-center justify-center transition-colors shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
