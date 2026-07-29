'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProductCard from './ProductCard';
import {
  ChevronRight,
  ChevronLeft,
  Search,
  Grid,
  List,
  Check,
  Tag,
  Globe,
  Star,
  Sparkles,
  ChevronDown,
  SlidersHorizontal,
  ArrowUpDown,
  X
} from 'lucide-react';

interface CategoryDoc {
  _id: string;
  name: string;
  slug: string;
  parent?: any;
}

interface SubSubcategoryData {
  _id: string;
  name: string;
  slug: string;
}

interface SubcategoryData {
  _id: string;
  name: string;
  slug: string;
  subsubcategories?: SubSubcategoryData[];
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
  subsubcategory?: string;
}

interface CategoryListingClientProps {
  targetCategory: CategoryDoc;
  mainCategory?: CategoryDoc | null;
  parentCategory?: CategoryDoc | null;
  allMainCategories?: CategoryDoc[];
  currentMainSlug?: string;
  subcategories: SubcategoryData[];
  products: ProductData[];
  activeSubcategorySlug?: string;
}

export default function CategoryListingClient({
  targetCategory,
  mainCategory,
  parentCategory,
  allMainCategories = [],
  currentMainSlug = '',
  subcategories = [],
  products = [],
  activeSubcategorySlug = 'all',
}: CategoryListingClientProps) {
  const router = useRouter();

  const [selectedSubcat, setSelectedSubcat] = useState<string>(activeSubcategorySlug || 'all');
  const [selectedSubSubcat, setSelectedSubSubcat] = useState<string>('all');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [brandSearch, setBrandSearch] = useState<string>('');
  const [selectedStock, setSelectedStock] = useState<string>('all');
  const [selectedBadge, setSelectedBadge] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showMoreBrands, setShowMoreBrands] = useState<boolean>(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Accordion Expand/Collapse States
  const [isBrandOpen, setIsBrandOpen] = useState<boolean>(true);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState<boolean>(true);

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 24;

  // Active subcategory object
  const currentSubcatObj = useMemo(() => {
    return subcategories.find((s) => s.slug === selectedSubcat);
  }, [subcategories, selectedSubcat]);

  // Real 3rd layer subsubcategories from MongoDB
  const current3rdLayerItems = useMemo(() => {
    if (!currentSubcatObj || !currentSubcatObj.subsubcategories) return [];
    return currentSubcatObj.subsubcategories;
  }, [currentSubcatObj]);

  // Real brand counts from MongoDB products
  const brandCounts = useMemo(() => {
    const map: Record<string, number> = {};
    products.forEach((p) => {
      if (p.brand) {
        map[p.brand] = (map[p.brand] || 0) + 1;
      }
    });
    return Object.entries(map)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [products]);

  // Filtered brand list by brand search
  const filteredBrandList = useMemo(() => {
    if (!brandSearch.trim()) return brandCounts;
    return brandCounts.filter((b) => b.name.toLowerCase().includes(brandSearch.toLowerCase()));
  }, [brandCounts, brandSearch]);

  const displayedBrandList = showMoreBrands ? filteredBrandList : filteredBrandList.slice(0, 8);

  // Real subcategory counts calculated strictly from MongoDB products
  const subcategoryCounts = useMemo(() => {
    const map: Record<string, number> = {};
    subcategories.forEach((sub) => {
      const realCount = products.filter((p) => p.subcategory === sub._id).length;
      map[sub.slug] = realCount;
    });
    return map;
  }, [subcategories, products]);

  // Filtered Products Calculation
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Subcategory Filter
        if (selectedSubcat !== 'all') {
          const matchedSub = subcategories.find((s) => s.slug === selectedSubcat);
          if (matchedSub && p.subcategory !== matchedSub._id) return false;
        }

        // 3rd Layer Specification Filter
        if (selectedSubSubcat !== 'all' && currentSubcatObj) {
          const matchedSubSub = current3rdLayerItems.find((ss) => ss.slug === selectedSubSubcat);
          if (matchedSubSub && p.subsubcategory !== matchedSubSub._id) return false;
        }

        // Multi Brand Checklist Filter
        if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) {
          return false;
        }

        // Stock Filter
        if (selectedStock !== 'all' && p.stockStatus !== selectedStock) return false;

        // Quick Tag Badge Filter
        if (selectedBadge === 'instock' && p.stockStatus !== 'In Stock') return false;
        if (selectedBadge === 'offers' && (!p.offerPrice || p.offerPrice >= p.mrp)) return false;

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
  }, [products, selectedSubcat, selectedSubSubcat, selectedBrands, selectedStock, selectedBadge, sortBy, subcategories, currentSubcatObj, current3rdLayerItems]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSubcat, selectedSubSubcat, selectedBrands, selectedStock, selectedBadge, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const toggleBrandCheckbox = (brandName: string) => {
    if (selectedBrands.includes(brandName)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brandName));
    } else {
      setSelectedBrands([...selectedBrands, brandName]);
    }
  };

  const clearAllFilters = () => {
    setSelectedSubcat('all');
    setSelectedSubSubcat('all');
    setSelectedBrands([]);
    setSelectedStock('all');
    setSelectedBadge('all');
    setSortBy('featured');
    setBrandSearch('');
    setCurrentPage(1);
  };

  const handleSelectSubcat = (slug: string) => {
    setSelectedSubcat(slug);
    setSelectedSubSubcat('all');
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 py-6 px-4 md:px-8 max-w-[1440px] mx-auto space-y-6 font-sans">
      
      {/* 1. DYNAMIC BREADCRUMBS FROM REAL MONGODB CATEGORIES */}
      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium flex-wrap">
        <Link href="/" className="hover:text-purple-700 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/categories" className="hover:text-purple-700 transition-colors">Categories</Link>

        {mainCategory && mainCategory.slug !== targetCategory.slug && (
          <>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href={`/category/${mainCategory.slug}`} className="hover:text-purple-700 transition-colors">
              {mainCategory.name}
            </Link>
          </>
        )}

        {parentCategory && parentCategory.slug !== mainCategory?.slug && parentCategory.slug !== targetCategory.slug && (
          <>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href={`/category/${parentCategory.slug}`} className="hover:text-purple-700 transition-colors">
              {parentCategory.name}
            </Link>
          </>
        )}

        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-800 font-bold">{targetCategory.name}</span>
      </div>

      {/* 2. DYNAMIC PAGE HEADER & SUBTITLE */}
      <div className="space-y-1">
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">{targetCategory.name}</h1>
        <p className="text-xs md:text-sm text-slate-500 font-medium">
          Explore authentic {targetCategory.name.toLowerCase()} for gaming, enterprise IT, and everyday use.
        </p>
      </div>

      {/* 3. DYNAMIC LEVEL 2 SUBCATEGORY TAB BAR WITH REAL PRODUCT COUNTS */}
      {subcategories.length > 0 && (
        <div className="border-b border-slate-200 overflow-x-auto scrollbar-none flex items-center gap-8 text-xs font-bold pt-2 no-scrollbar">
          <button
            onClick={() => handleSelectSubcat('all')}
            className={`pb-3 transition-all shrink-0 cursor-pointer flex flex-col items-center gap-0.5 ${
              selectedSubcat === 'all'
                ? 'border-b-2 border-[#5b21b6] text-[#5b21b6] font-black'
                : 'text-slate-500 hover:text-[#5b21b6] font-semibold'
            }`}
          >
            <span>All {mainCategory ? mainCategory.name : targetCategory.name}</span>
            <span className={`text-[10px] ${selectedSubcat === 'all' ? 'text-[#5b21b6] font-bold' : 'text-slate-400 font-normal'}`}>{products.length}</span>
          </button>

          {subcategories.map((sub) => {
            const isSelected = selectedSubcat === sub.slug;
            const count = subcategoryCounts[sub.slug] || 0;
            return (
              <button
                key={sub._id}
                onClick={() => handleSelectSubcat(sub.slug)}
                className={`pb-3 transition-all shrink-0 cursor-pointer flex flex-col items-center gap-0.5 ${
                  isSelected
                    ? 'border-b-2 border-[#5b21b6] text-[#5b21b6] font-black'
                    : 'text-slate-500 hover:text-[#5b21b6] font-semibold'
                }`}
              >
                <span>{sub.name}</span>
                <span className={`text-[10px] ${isSelected ? 'text-[#5b21b6] font-bold' : 'text-slate-400 font-normal'}`}>{count}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* 4. DYNAMIC LEVEL 3 SPECIFICATION PILLS BAR (Only rendered if MongoDB has items) */}
      {current3rdLayerItems.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap pt-1">
          <button
            onClick={() => setSelectedSubSubcat('all')}
            className={`text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer ${
              selectedSubSubcat === 'all'
                ? 'bg-[#5b21b6] text-white shadow-sm font-extrabold'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-purple-50 hover:text-[#5b21b6]'
            }`}
          >
            All {currentSubcatObj?.name || targetCategory.name}
          </button>

          {current3rdLayerItems.map((ss) => (
            <button
              key={ss._id}
              onClick={() => setSelectedSubSubcat(ss.slug)}
              className={`text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer ${
                selectedSubSubcat === ss.slug
                  ? 'bg-[#5b21b6] text-white shadow-sm font-extrabold'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-purple-50 hover:text-[#5b21b6]'
              }`}
            >
              {ss.name}
            </button>
          ))}
        </div>
      )}

      {/* MAIN LAYOUT (Sidebar Filters + Grid Area) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pt-2">
        
        {/* LEFT SIDEBAR FILTERS & CATEGORY NAVIGATOR - Desktop Only */}
        <aside className="hidden lg:block lg:col-span-1 space-y-5">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-6 shadow-sm">
            
            {/* Header: FILTERS + Clear All */}
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <span className="text-slate-900 font-extrabold text-xs tracking-wider uppercase">FILTERS</span>
              <button
                onClick={clearAllFilters}
                className="text-xs text-purple-700 font-bold hover:underline cursor-pointer"
              >
                Clear All
              </button>
            </div>

            {/* BRAND Accordion with Search & Checkboxes */}
            {brandCounts.length > 0 && (
              <div className="space-y-3 border-b border-slate-100 pb-4">
                <button
                  type="button"
                  onClick={() => setIsBrandOpen(!isBrandOpen)}
                  className="w-full flex justify-between items-center text-xs font-extrabold text-slate-900 uppercase tracking-wider cursor-pointer select-none py-1 group"
                >
                  <span>BRAND</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-transform duration-200 ${isBrandOpen ? 'rotate-180' : ''}`} />
                </button>

                {isBrandOpen && (
                  <div className="space-y-3 pt-1">
                    {/* Search brand input inside accordion */}
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search brand"
                        value={brandSearch}
                        onChange={(e) => setBrandSearch(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-600 font-medium"
                      />
                    </div>

                    {/* Checklist items with real product counts */}
                    <div className="space-y-2 pt-1 max-h-56 overflow-y-auto scrollbar-thin">
                      {displayedBrandList.map((b) => {
                        const checked = selectedBrands.includes(b.name);
                        return (
                          <label
                            key={b.name}
                            onClick={() => toggleBrandCheckbox(b.name)}
                            className="flex items-center justify-between text-xs text-slate-700 hover:text-purple-700 cursor-pointer font-medium select-none"
                          >
                            <div className="flex items-center gap-2">
                              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                                checked ? 'bg-purple-700 border-purple-700 text-white' : 'border-slate-300 bg-white'
                              }`}>
                                {checked && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <span>{b.name}</span>
                            </div>
                            <span className="text-[11px] text-slate-400 font-normal">({b.count})</span>
                          </label>
                        );
                      })}
                    </div>

                    {filteredBrandList.length > 8 && (
                      <button
                        onClick={() => setShowMoreBrands(!showMoreBrands)}
                        className="text-xs font-bold text-purple-700 hover:underline cursor-pointer pt-1 block"
                      >
                        {showMoreBrands ? '- View Less' : '+ View More'}
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* OTHER CATEGORIES ACCORDION */}
            {allMainCategories.length > 0 && (
              <div className="space-y-3 pt-1">
                <button
                  type="button"
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className="w-full flex justify-between items-center text-xs font-extrabold text-slate-900 uppercase tracking-wider cursor-pointer select-none py-1 group"
                >
                  <span>ALL CATEGORIES</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-transform duration-200 ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                </button>

                {isCategoriesOpen && (
                  <div className="space-y-1.5 pt-1">
                    {allMainCategories.map((cat) => {
                      const isCurrent = cat.slug === mainCategory?.slug || cat.slug === targetCategory.slug;
                      return (
                        <button
                          key={cat._id}
                          onClick={() => router.push(`/category/${cat.slug}`)}
                          className={`w-full text-left text-xs py-2.5 px-3 rounded-xl transition-all cursor-pointer ${
                            isCurrent
                              ? 'bg-slate-200/80 text-slate-900 font-extrabold'
                              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
                          }`}
                        >
                          {cat.name}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

          </div>
        </aside>

        {/* RIGHT MAIN CONTENT AREA */}
        <main className="lg:col-span-3 space-y-4">

          {/* GRID HEADER ROW - Desktop Only (Hidden on Phone) */}
          <div className="hidden md:flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm">
            <span className="text-xs text-slate-600 font-semibold">
              Showing <strong className="text-slate-900">{filteredProducts.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} – {Math.min(currentPage * itemsPerPage, filteredProducts.length)}</strong> of <strong className="text-slate-900">{filteredProducts.length}</strong> products
            </span>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 font-bold focus:outline-none focus:border-purple-600"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name-asc">Name: A-Z</option>
                  <option value="name-desc">Name: Z-A</option>
                </select>
              </div>

              {/* View Switcher (Grid / List) */}
              <div className="flex items-center gap-1 border border-slate-200 rounded-xl p-1 bg-slate-50">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    viewMode === 'grid' ? 'bg-[#5b21b6] text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    viewMode === 'list' ? 'bg-[#5b21b6] text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* QUICK FILTER BADGES ROW - Desktop Only */}
          <div className="hidden md:flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
            <button
              onClick={() => setSelectedBadge(selectedBadge === 'instock' ? 'all' : 'instock')}
              className={`text-xs font-bold px-3.5 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                selectedBadge === 'instock'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300'
              }`}
            >
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>In Stock</span>
            </button>

            <button
              onClick={() => setSelectedBadge(selectedBadge === 'offers' ? 'all' : 'offers')}
              className={`text-xs font-bold px-3.5 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                selectedBadge === 'offers'
                  ? 'bg-rose-50 text-rose-700 border-rose-300 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-rose-300'
              }`}
            >
              <Tag className="w-3.5 h-3.5 text-rose-600" />
              <span>Offers</span>
            </button>

            <button
              onClick={() => setSelectedBadge(selectedBadge === 'rgb' ? 'all' : 'rgb')}
              className={`text-xs font-bold px-3.5 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                selectedBadge === 'rgb'
                  ? 'bg-purple-50 text-purple-700 border-purple-300 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-purple-300'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-purple-600" />
              <span>RGB</span>
            </button>

            <button
              onClick={() => setSelectedBadge(selectedBadge === 'bestseller' ? 'all' : 'bestseller')}
              className={`text-xs font-bold px-3.5 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                selectedBadge === 'bestseller'
                  ? 'bg-amber-50 text-amber-700 border-amber-300 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-amber-300'
              }`}
            >
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Best Seller</span>
            </button>

            <button
              onClick={() => setSelectedBadge(selectedBadge === 'new' ? 'all' : 'new')}
              className={`text-xs font-bold px-3.5 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                selectedBadge === 'new'
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-300 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>New Arrival</span>
            </button>
          </div>

          {/* PRODUCT CARDS GRID */}
          {paginatedProducts.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center text-slate-400 space-y-3 shadow-sm">
              <Grid className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No products found matching selected filters.</h3>
              <button
                onClick={clearAllFilters}
                className="bg-[#5b21b6] text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-[#4c1d95] transition-all cursor-pointer inline-block"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className={
                viewMode === 'grid'
                  ? "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5"
                  : "space-y-4"
              }>
                {paginatedProducts.map((prod) => (
                  <ProductCard key={prod._id} product={prod} viewMode={viewMode} />
                ))}
              </div>

              {/* PAGINATION CONTROLS */}
              {totalPages > 1 && (
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-slate-500 font-medium">
                    Showing <strong className="text-slate-800">{(currentPage - 1) * itemsPerPage + 1}</strong> to{' '}
                    <strong className="text-slate-800">{Math.min(currentPage * itemsPerPage, filteredProducts.length)}</strong> of{' '}
                    <strong className="text-slate-800">{filteredProducts.length}</strong> products
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => {
                        setCurrentPage((prev) => Math.max(prev - 1, 1));
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 text-slate-700 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Prev</span>
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => {
                          setCurrentPage(pageNum);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-8 h-8 rounded-xl text-xs font-black transition-all cursor-pointer ${
                          pageNum === currentPage
                            ? 'bg-[#5b21b6] text-white shadow-md scale-105'
                            : 'bg-slate-100 text-slate-700 hover:bg-purple-50 hover:text-purple-700'
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => {
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 text-slate-700 cursor-pointer"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </main>

      </div>

      {/* FLOATING MOBILE FILTER, SORT & VIEW PILL (Phone Only - Exactly matches reference screenshot) */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-30 md:hidden flex items-center bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-full shadow-2xl px-4 py-2 gap-3 text-xs font-bold text-slate-800">
        {/* 1. Filters */}
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex items-center gap-1.5 text-slate-800 hover:text-[#5b21b6] cursor-pointer"
        >
          <SlidersHorizontal className="w-4 h-4 text-[#5b21b6]" />
          <span>Filters</span>
          {selectedBrands.length > 0 && (
            <span className="bg-[#5b21b6] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-black">
              {selectedBrands.length}
            </span>
          )}
        </button>

        <span className="w-px h-4 bg-slate-200" />

        {/* 2. Sort */}
        <div className="flex items-center gap-1">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-xs text-slate-800 font-bold focus:outline-none cursor-pointer"
          >
            <option value="featured">Sort</option>
            <option value="price-low">Low → High</option>
            <option value="price-high">High → Low</option>
            <option value="name-asc">A-Z</option>
          </select>
        </div>

        <span className="w-px h-4 bg-slate-200" />

        {/* 3. View Switcher (Grid / List) */}
        <button
          onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          className="flex items-center gap-1.5 text-slate-800 hover:text-[#5b21b6] cursor-pointer"
        >
          {viewMode === 'grid' ? (
            <>
              <Grid className="w-4 h-4 text-[#5b21b6]" />
              <span>View</span>
            </>
          ) : (
            <>
              <List className="w-4 h-4 text-[#5b21b6]" />
              <span>View</span>
            </>
          )}
        </button>
      </div>

      {/* MOBILE FILTER MODAL DRAWER */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end md:hidden">
          <div className="w-4/5 max-w-sm bg-white h-full p-5 overflow-y-auto space-y-6 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <span className="text-slate-900 font-extrabold text-sm uppercase tracking-wider">FILTERS</span>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="text-slate-400 hover:text-slate-800 p-1 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Brands Filter */}
              {brandCounts.length > 0 && (
                <div className="space-y-3">
                  <span className="text-xs font-black text-slate-900 uppercase">Brands</span>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {brandCounts.map((b) => (
                      <label key={b.name} className="flex items-center justify-between text-xs text-slate-700 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedBrands.includes(b.name)}
                            onChange={() => toggleBrandCheckbox(b.name)}
                            className="rounded border-slate-300 text-[#5b21b6] focus:ring-[#5b21b6]"
                          />
                          <span>{b.name}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium">({b.count})</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex gap-3">
              <button
                onClick={clearAllFilters}
                className="flex-1 bg-slate-100 text-slate-700 text-xs font-bold py-2.5 rounded-xl"
              >
                Clear All
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 bg-[#5b21b6] text-white text-xs font-bold py-2.5 rounded-xl shadow-md"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
