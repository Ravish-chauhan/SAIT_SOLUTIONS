'use client';

import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { SlidersHorizontal, ArrowUpDown, RefreshCw } from 'lucide-react';

interface SubcategoryData {
  _id: string;
  name: string;
  slug: string;
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
  category: string;
  subcategory?: string;
}

interface CategoryListingClientProps {
  categoryName: string;
  subcategories: SubcategoryData[];
  products: ProductData[];
  activeSubcategorySlug?: string;
}

export default function CategoryListingClient({
  categoryName,
  subcategories,
  products,
  activeSubcategorySlug,
}: CategoryListingClientProps) {
  const [selectedSubcat, setSelectedSubcat] = useState<string>(activeSubcategorySlug || 'all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedStock, setSelectedStock] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const brands = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.brand) set.add(p.brand);
    });
    return Array.from(set).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedSubcat !== 'all') {
          const matchedSub = subcategories.find((s) => s.slug === selectedSubcat);
          if (matchedSub && p.subcategory !== matchedSub._id) return false;
        }
        if (selectedBrand !== 'all' && p.brand !== selectedBrand) return false;
        if (selectedStock !== 'all' && p.stockStatus !== selectedStock) return false;

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          return (
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') {
          return (a.offerPrice || a.mrp) - (b.offerPrice || b.mrp);
        }
        if (sortBy === 'price-high') {
          return (b.offerPrice || b.mrp) - (a.offerPrice || a.mrp);
        }
        if (sortBy === 'name-asc') {
          return a.name.localeCompare(b.name);
        }
        if (sortBy === 'name-desc') {
          return b.name.localeCompare(a.name);
        }
        return 0;
      });
  }, [products, selectedSubcat, selectedBrand, selectedStock, sortBy, searchQuery, subcategories]);

  const resetFilters = () => {
    setSelectedSubcat('all');
    setSelectedBrand('all');
    setSelectedStock('all');
    setSortBy('featured');
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      {/* Category Header */}
      <div className="mb-8 border-b border-slate-200 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="text-xs text-accent uppercase font-bold tracking-wider">Catalog Directory</span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">{categoryName}</h1>
          <p className="text-slate-500 text-xs mt-1">Showing {filteredProducts.length} premium products</p>
        </div>

        {/* Live Search */}
        <input
          type="text"
          placeholder={`Search in ${categoryName}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:max-w-xs bg-white border border-slate-200 rounded-lg py-2 px-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-accent shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filter Panel */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-slate-150 rounded-2xl p-5 space-y-6 shadow-sm">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <span className="text-slate-900 font-bold text-sm flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-accent" />
                Filters
              </span>
              <button
                onClick={resetFilters}
                className="text-[11px] text-slate-400 hover:text-accent font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {/* Subcategories Filter */}
            {subcategories.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-slate-400 font-extrabold text-[10px] uppercase tracking-wider">Sub-categories</h3>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedSubcat('all')}
                    className={`w-full text-left text-xs py-2 px-3 rounded-lg transition-all cursor-pointer ${
                      selectedSubcat === 'all'
                        ? 'bg-brand-purple-light/10 text-brand-purple-light font-bold border-l-2 border-brand-purple-light'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    All Sub-categories
                  </button>
                  {subcategories.map((sub) => (
                    <button
                      key={sub._id}
                      onClick={() => setSelectedSubcat(sub.slug)}
                      className={`w-full text-left text-xs py-2 px-3 rounded-lg transition-all cursor-pointer ${
                        selectedSubcat === sub.slug
                          ? 'bg-brand-purple-light/10 text-brand-purple-light font-bold border-l-2 border-brand-purple-light'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Brand Filter */}
            {brands.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-slate-400 font-extrabold text-[10px] uppercase tracking-wider">Brands</h3>
                <div className="space-y-1">
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-accent shadow-sm"
                  >
                    <option value="all">All Brands</option>
                    {brands.map((br) => (
                      <option key={br} value={br}>{br}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Stock Status Filter */}
            <div className="space-y-2">
              <h3 className="text-slate-400 font-extrabold text-[10px] uppercase tracking-wider">Availability</h3>
              <div className="space-y-1">
                <select
                  value={selectedStock}
                  onChange={(e) => setSelectedStock(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-accent shadow-sm"
                >
                  <option value="all">All Stock Status</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Call for Availability">Call for Availability</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
            </div>

            {/* Sort Options */}
            <div className="space-y-2">
              <h3 className="text-slate-400 font-extrabold text-[10px] uppercase tracking-wider flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5" />
                Sort By
              </h3>
              <div className="space-y-1">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-accent shadow-sm"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </div>
            </div>

          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white border border-slate-150 rounded-2xl p-16 text-center text-slate-400 space-y-4 shadow-sm">
              <p className="text-sm">No products found matching your current filter criteria.</p>
              <button
                onClick={resetFilters}
                className="text-xs text-accent font-semibold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((prod) => (
                <ProductCard key={prod._id} product={prod} />
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
