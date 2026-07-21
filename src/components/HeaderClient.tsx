'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Search, Menu, X, ChevronDown, User, Layers, Cpu, HardDrive, Shield, Monitor, Smartphone, Headphones, Tag, Heart, ChevronRight } from 'lucide-react';
import { CategoryWithChildren } from '@/lib/categories';

interface HeaderClientProps {
  categories: CategoryWithChildren[];
}

export default function HeaderClient({ categories }: HeaderClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileCategory, setActiveMobileCategory] = useState<string | null>(null);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const [activeCategorySlug, setActiveCategorySlug] = useState<string | null>(null);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCategoriesDropdownOpen(false);
        setActiveCategorySlug(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleDropdown = () => {
    const nextState = !isCategoriesDropdownOpen;
    setIsCategoriesDropdownOpen(nextState);
    if (nextState && categories.length > 0) {
      setActiveCategorySlug(categories[0].slug);
    } else {
      setActiveCategorySlug(null);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let url = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    if (selectedCategorySlug !== 'all') {
      url += `&category=${selectedCategorySlug}`;
    }
    router.push(url);
  };

  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'pc-components':
        return <Cpu className="w-4 h-4 mr-2 text-accent" />;
      case 'storage-nas':
        return <HardDrive className="w-4 h-4 mr-2 text-accent" />;
      case 'network-security':
        return <Shield className="w-4 h-4 mr-2 text-accent" />;
      case 'monitors-display':
        return <Monitor className="w-4 h-4 mr-2 text-accent" />;
      case 'mobile-accessories':
        return <Smartphone className="w-4 h-4 mr-2 text-accent" />;
      case 'peripherals':
        return <Headphones className="w-4 h-4 mr-2 text-accent" />;
      default:
        return <Layers className="w-4 h-4 mr-2 text-accent" />;
    }
  };

  return (
    <>
      <header className="w-full bg-white">

      {/* Mobile Sticky Header (Visible only on mobile/tablet) */}
      <div className="lg:hidden sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm w-full h-[60px] px-4 flex items-center justify-between relative overflow-hidden">
        
        {/* Left: Menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 text-slate-700 hover:text-accent transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Center: Complete Centered Logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 select-none shrink-0 group">
          <Image
            src="/logo.png"
            alt="SA Monogram"
            width={32}
            height={32}
            className="object-contain"
            priority
          />
          <div className="h-5 w-px bg-slate-300" />
          <span className="text-xs font-black tracking-wider text-slate-800 uppercase font-sans">
            SAIT SOLUTIONS
          </span>
        </Link>

        {/* Right: Search Toggle icon */}
        <button
          onClick={() => setIsMobileSearchOpen(true)}
          className="p-2 text-slate-700 hover:text-accent transition-colors"
        >
          <Search className="w-6 h-6" />
        </button>

        {/* Full-width Sliding Search Overlay */}
        <div className={`absolute inset-0 bg-white z-50 flex items-center px-6 transition-all duration-300 ease-in-out ${
          isMobileSearchOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}>
          <form onSubmit={handleSearchSubmit} className="w-full flex items-center gap-3 border-b-2 border-slate-900 pb-1.5">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow bg-transparent text-sm font-bold text-slate-800 placeholder-slate-400 focus:outline-none py-1 font-sans"
              autoFocus={isMobileSearchOpen}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-slate-400 hover:text-slate-700 text-xs font-black uppercase tracking-wider select-none shrink-0"
              >
                Clear
              </button>
            )}
            {searchQuery && <div className="h-4 w-px bg-slate-200 shrink-0" />}
            <button
              type="button"
              onClick={() => setIsMobileSearchOpen(false)}
              className="text-slate-500 hover:text-slate-950 transition-colors p-1 shrink-0"
            >
              <X className="w-5.5 h-5.5" />
            </button>
          </form>
        </div>
      </div>


      {/* ROW 2: Main Branding & Customized Search */}
      <div className="hidden lg:flex w-full py-3 px-4 md:px-8 border-b border-slate-100 justify-between items-center gap-4 bg-white">
        
        {/* Logo (Monogram + Divider + Text) */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group ml-4 md:ml-8">
          <Image
            src="/logo.png"
            alt="SA Monogram"
            width={54}
            height={54}
            className="object-contain"
            priority
          />
          <div className="h-7 w-px bg-slate-300 group-hover:bg-slate-400 transition-colors" />
          <span className="text-base font-black tracking-wider text-slate-800 uppercase font-sans select-none">
            SAIT SOLUTIONS
          </span>
        </Link>

        {/* Customized Search bar (Matching Elitehubs composition) */}
        <form onSubmit={handleSearchSubmit} className="w-full md:max-w-2xl flex items-center border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:border-slate-300 focus-within:border-[#5b21b6] transition-all bg-slate-50/50">
          
          {/* Categories Selector Dropdown */}
          <div className="relative shrink-0 border-r border-slate-200 bg-white">
            <select
              value={selectedCategorySlug}
              onChange={(e) => setSelectedCategorySlug(e.target.value)}
              className="bg-transparent pl-4 pr-8 py-2.5 text-xs font-bold text-slate-755 focus:outline-none appearance-none cursor-pointer h-full"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c._id} value={c.slug}>{c.name}</option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent py-2.5 px-4 text-xs text-slate-850 placeholder-slate-400 focus:outline-none font-sans"
          />

          {/* Search Button */}
          <button
            type="submit"
            className="bg-[#5b21b6] hover:bg-[#4c1d95] text-white px-6 py-3 transition-colors shrink-0 cursor-pointer flex items-center justify-center"
            aria-label="Submit Search"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>

        {/* Wishlist Link */}
        <Link href="/wishlist" className="flex items-center gap-2.5 shrink-0 hover:text-accent transition-colors text-left text-slate-800 group">
          <div className="p-2 border border-slate-200 rounded-full group-hover:border-accent group-hover:bg-accent/5 transition-all">
            <Heart className="w-4 h-4 text-slate-600 group-hover:text-accent" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-semibold leading-none font-sans">Favorites</p>
            <p className="text-xs font-bold text-slate-700 group-hover:text-accent leading-none mt-1 font-sans">Wishlist</p>
          </div>
        </Link>
      </div>
      </header>

      {/* ROW 3: Sticky Categories Ribbon */}
      <div className="hidden lg:flex sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm w-full h-[52px] px-4 md:px-8 items-center justify-between">
        
        {/* Left: Browse All Categories Button & Separator */}
        <div className="flex items-stretch h-full shrink-0 ml-4 md:ml-8">
          <div className="relative h-full flex items-stretch w-[280px]" ref={dropdownRef}>
            <button
              onClick={handleToggleDropdown}
              className="relative group h-full w-full flex items-center gap-2 text-slate-800 font-extrabold text-xs cursor-pointer pl-6 pr-6 transition-all"
            >
              {/* Expanding top border line from center on hover */}
              <span className="absolute top-0 left-0 right-0 h-[2px] bg-brand-purple-light scale-x-0 group-hover:scale-x-100 opacity-0 group-hover:opacity-100 transition-all duration-300 origin-center" />
              <Menu className="w-4.5 h-4.5 text-slate-700 transition-colors" />
              <span>Browse All Categories</span>
              
              {/* Vertical Separator Line at the right edge */}
              <span className="absolute right-0 top-1/2 -translate-y-1/2 h-6 w-px bg-slate-200" />
            </button>
            {/* Categories Sidebar & Mega Menu Dropdown */}
            {isCategoriesDropdownOpen && (
              <div className="absolute left-0 top-full mt-0 w-[240px] bg-white border border-slate-200 rounded-xl shadow-2xl z-50 flex flex-col py-2 overflow-visible animate-in fade-in slide-in-from-top-1 duration-200">
                {categories.map((cat) => (
                  <div
                    key={cat._id}
                    onMouseEnter={() => setActiveCategorySlug(cat.slug)}
                    className={`flex justify-between items-center px-4 py-2.5 cursor-pointer text-xs font-extrabold transition-all ${
                      activeCategorySlug === cat.slug
                        ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {getCategoryIcon(cat.slug)}
                      {cat.name}
                    </span>
                    <ChevronRight className={`w-3.5 h-3.5 ${activeCategorySlug === cat.slug ? 'text-blue-600' : 'text-slate-400'}`} />
                  </div>
                ))}

                {/* Subcategories Flyout Menu */}
                {activeCategorySlug && (() => {
                  const activeCategoryData = categories.find((c) => c.slug === activeCategorySlug);
                  if (!activeCategoryData) return null;
                  return (
                    <div className="absolute left-full top-0 ml-2 w-[480px] min-h-[300px] bg-white border border-slate-200 rounded-xl p-6 shadow-2xl z-50 animate-in fade-in slide-in-from-left-1 duration-200">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest pb-2 border-b border-slate-100 mb-4">
                        {activeCategoryData.name} Subcategories
                      </h4>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                        {activeCategoryData.subcategories && activeCategoryData.subcategories.length > 0 ? (
                          activeCategoryData.subcategories.map((sub) => (
                            <Link
                              key={sub._id}
                              href={`/category/${activeCategoryData.slug}/${sub.slug}`}
                              onClick={() => {
                                setIsCategoriesDropdownOpen(false);
                                setActiveCategorySlug(null);
                              }}
                              className="text-xs font-bold text-slate-755 hover:text-blue-655 transition-colors py-1 block"
                            >
                              {sub.name}
                            </Link>
                          ))
                        ) : (
                          <span className="text-xs text-slate-450 font-semibold italic">No subcategories available</span>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>

        {/* Center: Main Ribbon Navigation Links with Dropdown Arrows */}
        <nav className="hidden lg:flex flex-grow justify-center items-center gap-6 text-xs font-bold text-slate-655 h-full">
          <Link 
            href="/" 
            className={`relative hover:text-[#5b21b6] transition-colors py-4 flex items-center h-full ${
              isHome ? 'text-[#5b21b6] font-extrabold' : 'text-slate-600'
            }`}
          >
            <span>Home</span>
            {isHome && (
              <span className="absolute bottom-0 left-[-4px] right-[-4px] h-[2px] bg-[#5b21b6] rounded-full" />
            )}
          </Link>
          
          <Link href="/category/pc-components" className="hover:text-[#5b21b6] transition-colors flex items-center gap-1 group py-4 h-full">
            <span>PC Components</span>
            <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-[#5b21b6] transition-colors" />
          </Link>
          
          <Link href="/category/storage-nas" className="hover:text-[#5b21b6] transition-colors flex items-center gap-1 group py-4 h-full">
            <span>Storage & NAS</span>
            <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-[#5b21b6] transition-colors" />
          </Link>
          
          <Link href="/category/peripherals" className="hover:text-[#5b21b6] transition-colors flex items-center gap-1 group py-4 h-full">
            <span>Peripherals</span>
            <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-[#5b21b6] transition-colors" />
          </Link>
          
          <Link href="/category/monitors-display" className="hover:text-[#5b21b6] transition-colors flex items-center gap-1 group py-4 h-full">
            <span>Monitors & Projectors</span>
            <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-[#5b21b6] transition-colors" />
          </Link>
          
          <Link href="/category/network-security" className="hover:text-[#5b21b6] transition-colors flex items-center gap-1 group py-4 h-full">
            <span>Network & Security</span>
            <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-[#5b21b6] transition-colors" />
          </Link>
          
          <Link href="/support" className="hover:text-[#5b21b6] transition-colors py-4 h-full flex items-center">Our Stores</Link>
        </nav>

        {/* Right Spacer to mathematically balance the centered navigation links */}
        <div className="hidden lg:block w-[280px] shrink-0 h-full" />
      </div>

      {/* Mobile Drawer (Clean light theme) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex justify-end">
          <div className="w-full max-w-sm bg-white border-l border-slate-200 h-full flex flex-col p-6 overflow-y-auto animate-in slide-in-from-right duration-200 text-slate-800">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
              <Image
                src="/logo.png"
                alt="Sait Solutions Logo"
                width={100}
                height={32}
                className="object-contain"
              />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-400 hover:text-slate-950 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Links */}
            <nav className="flex flex-col gap-4 text-slate-700 font-semibold text-sm">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent transition-colors py-2 border-b border-slate-50">Home</Link>
              
              <div className="space-y-2">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Product Categories</span>
                {categories.map((cat) => (
                  <div key={cat._id} className="border-b border-slate-50 pb-2">
                    <button
                      onClick={() => setActiveMobileCategory(activeMobileCategory === cat._id ? null : cat._id)}
                      className="w-full flex justify-between items-center hover:text-accent transition-colors py-1.5 text-left text-sm"
                    >
                      <span className="flex items-center font-bold text-slate-800">{getCategoryIcon(cat.slug)}{cat.name}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeMobileCategory === cat._id ? 'rotate-180' : ''}`} />
                    </button>
                    {activeMobileCategory === cat._id && (
                      <ul className="mt-1 ml-6 space-y-2 text-slate-500 text-xs animate-in fade-in duration-200">
                        <li>
                          <Link href={`/category/${cat.slug}`} onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent transition-colors block py-1 font-semibold text-accent">
                            View All {cat.name}
                          </Link>
                        </li>
                        {cat.subcategories.map((sub) => (
                          <li key={sub._id}>
                            <Link href={`/category/${cat.slug}/${sub.slug}`} onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent transition-colors block py-1">
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              <Link href="/support" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent transition-colors py-2 border-b border-slate-50">Our Stores</Link>
              <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-slate-50 text-accent font-bold">Admin Dashboard</Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
