'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  SlidersHorizontal,
  Grid,
  List,
  MessageSquare,
  ChevronRight,
  Filter,
  CheckCircle,
  Tag,
  ArrowUpDown,
  Boxes,
  Sparkles
} from 'lucide-react';
import EnquiryModal from './EnquiryModal';

interface CategoryData {
  _id: string;
  name: string;
  slug: string;
  parent?: any;
}

interface ProductData {
  _id: string;
  name: string;
  slug: string;
  description: string;
  mrp: number;
  offerPrice?: number;
  brand: string;
  specs: Record<string, string>;
  images: string[];
  stockStatus: 'In Stock' | 'Out of Stock' | 'Call for Availability';
  category: { _id: string; name: string; slug: string } | string;
  subcategory?: { _id: string; name: string; slug: string } | string;
  isTrending?: boolean;
}

interface ProductsCatalogClientProps {
  initialProducts: ProductData[];
  categories: CategoryData[];
  initialCategorySlug?: string;
}

export default function ProductsCatalogClient({
  initialProducts,
  categories,
  initialCategorySlug = 'all',
}: ProductsCatalogClientProps) {
  const [activeCategorySlug, setActiveCategorySlug] = useState<string>(initialCategorySlug);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [stockOnly, setStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'name'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [selectedEnquiryProduct, setSelectedEnquiryProduct] = useState<ProductData | null>(null);

  // Extract unique brands for brand filter
  const allBrands = useMemo(() => {
    const brandsSet = new Set<string>();
    initialProducts.forEach((p) => {
      if (p.brand) brandsSet.add(p.brand);
    });
    return Array.from(brandsSet).sort();
  }, [initialProducts]);

  // Helper to find category object by slug or id
  const getCatSlug = (cat: any): string => {
    if (!cat) return '';
    if (typeof cat === 'object' && cat.slug) return cat.slug;
    const found = categories.find((c) => c._id === cat || c.slug === cat);
    return found ? found.slug : '';
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((product) => {
        // Category Filter (support parent category & subcategory matching)
        if (activeCategorySlug !== 'all') {
          const productCatSlug = getCatSlug(product.category);
          const productSubcatSlug = getCatSlug(product.subcategory);

          // Check if category or subcategory matches activeCategorySlug
          const activeCatObj = categories.find((c) => c.slug === activeCategorySlug);
          if (activeCatObj) {
            const isParentMatch = productCatSlug === activeCategorySlug;
            const isSubcatMatch = productSubcatSlug === activeCategorySlug;

            // Check if product's category parent matches selected category
            const parentCatObj = categories.find((c) => c._id === activeCatObj._id);
            const isSubChildMatch = categories.some(
              (sub) => sub.parent === activeCatObj._id && (productCatSlug === sub.slug || productSubcatSlug === sub.slug)
            );

            if (!isParentMatch && !isSubcatMatch && !isSubChildMatch) {
              return false;
            }
          }
        }

        // Search Filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const nameMatch = product.name.toLowerCase().includes(q);
          const brandMatch = product.brand.toLowerCase().includes(q);
          const descMatch = product.description.toLowerCase().includes(q);
          if (!nameMatch && !brandMatch && !descMatch) return false;
        }

        // Brand Filter
        if (selectedBrand !== 'all' && product.brand !== selectedBrand) {
          return false;
        }

        // Stock Filter
        if (stockOnly && product.stockStatus !== 'In Stock') {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') {
          const priceA = a.offerPrice || a.mrp;
          const priceB = b.offerPrice || b.mrp;
          return priceA - priceB;
        }
        if (sortBy === 'price-high') {
          const priceA = a.offerPrice || a.mrp;
          const priceB = b.offerPrice || b.mrp;
          return priceB - priceA;
        }
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        // Default 'featured' -> trending first
        if (a.isTrending && !b.isTrending) return -1;
        if (!a.isTrending && b.isTrending) return 1;
        return 0;
      });
  }, [initialProducts, activeCategorySlug, searchQuery, selectedBrand, stockOnly, sortBy, categories]);

  const activeCategoryName = useMemo(() => {
    if (activeCategorySlug === 'all') return 'All IT Hardware Products';
    const found = categories.find((c) => c.slug === activeCategorySlug);
    return found ? found.name : 'Category Products';
  }, [activeCategorySlug, categories]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-8 px-4 md:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-500 border-b border-slate-200 pb-4 font-medium">
        <Link href="/" className="hover:text-purple-700 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-purple-700 font-bold">Hardware Store Catalog</span>
        {activeCategorySlug !== 'all' && (
          <>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-900 font-extrabold capitalize">{activeCategoryName}</span>
          </>
        )}
      </div>

      {/* Header Banner & Stats */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white rounded-3xl p-8 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden border border-purple-800/30">
        <div className="space-y-2 z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Boxes className="w-3.5 h-3.5" /> Authorized B2B & Retail Hardware Store
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            {activeCategoryName}
          </h1>
          <p className="text-xs md:text-sm text-slate-300 font-medium leading-relaxed">
            Browse our complete inventory of enterprise storage, high-performance PC components, networking gear, security cameras, and displays with instant distributor quote enquiries.
          </p>
        </div>

        <div className="z-10 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-center shrink-0 min-w-[150px]">
          <div className="text-2xl md:text-3xl font-black text-purple-300">{filteredProducts.length}</div>
          <div className="text-[11px] text-slate-300 font-bold uppercase tracking-wider">Products Available</div>
        </div>

        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* CATEGORY SWITCHER TABS (TOP BAR) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-purple-600" /> Switch Category
          </span>
          {activeCategorySlug !== 'all' && (
            <button
              onClick={() => setActiveCategorySlug('all')}
              className="text-xs text-purple-700 hover:underline font-bold"
            >
              Show All Products ({initialProducts.length})
            </button>
          )}
        </div>

        {/* Scrollable Category Switcher Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveCategorySlug('all')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold shrink-0 transition-all cursor-pointer border ${
              activeCategorySlug === 'all'
                ? 'bg-purple-700 text-white border-purple-700 shadow-md shadow-purple-700/20 scale-[1.02]'
                : 'bg-white text-slate-700 border-slate-200 hover:border-purple-300 hover:bg-purple-50/50'
            }`}
          >
            🔥 All Categories
          </button>

          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setActiveCategorySlug(cat.slug)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold shrink-0 transition-all cursor-pointer border ${
                activeCategorySlug === cat.slug
                  ? 'bg-purple-700 text-white border-purple-700 shadow-md shadow-purple-700/20 scale-[1.02]'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-purple-300 hover:bg-purple-50/50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN LAYOUT: SIDEBAR FILTERS + PRODUCT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-2">
        
        {/* SIDEBAR FILTERS */}
        <aside className="space-y-6 lg:col-span-1 bg-white border border-slate-200 rounded-3xl p-6 h-fit shadow-sm">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Filter className="w-4 h-4 text-purple-600" /> Catalog Filters
            </h2>
            {(searchQuery || selectedBrand !== 'all' || stockOnly || activeCategorySlug !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedBrand('all');
                  setStockOnly(false);
                  setActiveCategorySlug('all');
                }}
                className="text-[11px] text-rose-600 hover:underline font-bold"
              >
                Reset All
              </button>
            )}
          </div>

          {/* Search Box */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">Search Products</label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Model, keyword, specs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-600 font-medium"
              />
            </div>
          </div>

          {/* Brand Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">Filter by Brand</label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-purple-600 font-medium"
            >
              <option value="all">All Brands ({allBrands.length})</option>
              {allBrands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Stock Filter Checkbox */}
          <div className="flex items-center gap-2.5 pt-1 border-t border-slate-100">
            <input
              type="checkbox"
              id="stockFilter"
              checked={stockOnly}
              onChange={(e) => setStockOnly(e.target.checked)}
              className="w-4 h-4 text-purple-600 rounded border-slate-300 focus:ring-purple-500 cursor-pointer"
            />
            <label htmlFor="stockFilter" className="text-xs font-semibold text-slate-700 cursor-pointer">
              Show In-Stock Only
            </label>
          </div>

          {/* B2B Wholesale Guarantee Badge */}
          <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4 text-xs space-y-2">
            <div className="font-extrabold text-purple-900 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-purple-600 shrink-0" />
              <span>Direct Distributor Pricing</span>
            </div>
            <p className="text-[11px] text-purple-700 leading-relaxed font-medium">
              Looking for bulk procurement, GST invoice, or project pricing? Connect directly with our team for custom quotations.
            </p>
          </div>
        </aside>

        {/* PRODUCT GRID & CONTROLS */}
        <main className="lg:col-span-3 space-y-6">
          
          {/* Controls Bar */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
            <div className="text-xs text-slate-500 font-medium">
              Showing <strong className="text-slate-900 font-extrabold">{filteredProducts.length}</strong> products
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 font-semibold focus:outline-none focus:border-purple-600"
                >
                  <option value="featured">Sort: Featured & Hot</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>

              {/* View Switcher Buttons */}
              <div className="flex items-center border border-slate-200 rounded-xl p-1 bg-slate-50">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    viewMode === 'grid' ? 'bg-white text-purple-700 shadow-sm' : 'text-slate-400 hover:text-slate-700'
                  }`}
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    viewMode === 'list' ? 'bg-white text-purple-700 shadow-sm' : 'text-slate-400 hover:text-slate-700'
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Cards Container */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3">
              <Boxes className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No products found in this selection</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try selecting another category above or resetting search filters to view more IT hardware items.
              </p>
              <button
                onClick={() => {
                  setActiveCategorySlug('all');
                  setSearchQuery('');
                  setSelectedBrand('all');
                }}
                className="bg-purple-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl hover:bg-purple-800 transition-all cursor-pointer inline-block"
              >
                Reset Category & Search
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const discount = product.offerPrice
                  ? Math.round(((product.mrp - product.offerPrice) / product.mrp) * 100)
                  : 0;

                return (
                  <div
                    key={product._id}
                    className="bg-white border border-slate-200 rounded-3xl p-5 hover:border-purple-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                  >
                    {discount > 0 && (
                      <span className="absolute top-4 left-4 z-10 bg-purple-700 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md uppercase tracking-wider">
                        {discount}% OFF
                      </span>
                    )}

                    <div>
                      {/* Product Image */}
                      <Link href={`/product/${product.slug}`} className="block relative h-48 w-full mb-4 overflow-hidden rounded-2xl bg-slate-50 p-4">
                        <Image
                          src={product.images[0] || '/logo.png'}
                          alt={product.name}
                          fill
                          className="object-contain group-hover:scale-105 transition-transform duration-300 p-2"
                        />
                      </Link>

                      {/* Brand & Stock */}
                      <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        <span className="text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-100 font-extrabold">
                          {product.brand}
                        </span>
                        <span className={product.stockStatus === 'In Stock' ? 'text-emerald-600 font-extrabold' : 'text-amber-600'}>
                          {product.stockStatus}
                        </span>
                      </div>

                      {/* Product Title */}
                      <Link href={`/product/${product.slug}`} className="block">
                        <h3 className="font-extrabold text-slate-900 text-sm leading-snug line-clamp-2 hover:text-purple-700 transition-colors">
                          {product.name}
                        </h3>
                      </Link>

                      {/* Short Description */}
                      <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Price & Action Row */}
                    <div className="pt-4 mt-4 border-t border-slate-100 space-y-3">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-bold uppercase">Estimated Quote</span>
                          <div className="flex items-baseline gap-2">
                            {product.offerPrice ? (
                              <>
                                <span className="text-slate-950 font-black text-base">
                                  ₹{product.offerPrice.toLocaleString('en-IN')}
                                </span>
                                <span className="text-slate-400 text-xs line-through font-medium">
                                  ₹{product.mrp.toLocaleString('en-IN')}
                                </span>
                              </>
                            ) : (
                              <span className="text-slate-900 font-black text-sm">
                                ₹{product.mrp.toLocaleString('en-IN')}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setSelectedEnquiryProduct(product)}
                          className="bg-purple-700 hover:bg-purple-800 text-white rounded-xl py-2.5 transition-all text-xs font-extrabold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Inquire Quote</span>
                        </button>
                        <Link
                          href={`/product/${product.slug}`}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl py-2.5 transition-all text-xs font-bold text-center flex items-center justify-center"
                        >
                          Details →
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* LIST VIEW */
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white border border-slate-200 rounded-3xl p-5 hover:border-purple-300 hover:shadow-lg transition-all flex flex-col sm:flex-row items-center gap-6"
                >
                  <Link href={`/product/${product.slug}`} className="relative h-32 w-32 shrink-0 rounded-2xl bg-slate-50 p-2">
                    <Image src={product.images[0] || '/logo.png'} alt={product.name} fill className="object-contain p-2" />
                  </Link>

                  <div className="space-y-2 flex-grow">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-100 font-extrabold uppercase">
                        {product.brand}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">{product.stockStatus}</span>
                    </div>

                    <Link href={`/product/${product.slug}`}>
                      <h3 className="font-extrabold text-slate-900 text-base hover:text-purple-700 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-slate-500 line-clamp-2">{product.description}</p>
                  </div>

                  <div className="shrink-0 space-y-3 text-right w-full sm:w-auto">
                    <div>
                      <span className="text-slate-950 font-black text-lg">
                        ₹{(product.offerPrice || product.mrp).toLocaleString('en-IN')}
                      </span>
                      {product.offerPrice && (
                        <span className="text-slate-400 text-xs line-through block">
                          ₹{product.mrp.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => setSelectedEnquiryProduct(product)}
                      className="w-full sm:w-auto bg-purple-700 hover:bg-purple-800 text-white rounded-xl px-5 py-2.5 transition-all text-xs font-extrabold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Send Enquiry</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Enquiry Modal */}
      {selectedEnquiryProduct && (
        <EnquiryModal
          product={selectedEnquiryProduct}
          onClose={() => setSelectedEnquiryProduct(null)}
        />
      )}
    </div>
  );
}
