'use client';

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

interface SearchClientProps {
  initialQuery: string;
}

export default function SearchClient({ initialQuery }: SearchClientProps) {
  const [query, setQuery] = useState(initialQuery);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = initialQuery.trim();
    if (!q) {
      setProducts([]);
      setLoading(false);
      return;
    }

    // Clear any stale search cache from old sessionStorage caching
    if (typeof window !== 'undefined') {
      try {
        Object.keys(sessionStorage)
          .filter((k) => k.startsWith('sait_search_'))
          .forEach((k) => sessionStorage.removeItem(k));
      } catch (e) { /* ignore */ }
    }

    // Fetch fresh results from API
    setLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(q)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.products)) {
          setProducts(data.products);
        }
      })
      .catch((err) => console.error('Search fetch error:', err))
      .finally(() => setLoading(false));
  }, [initialQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-8 min-h-[70vh] font-sans">
      <div>
        <span className="text-xs text-[#5b21b6] uppercase font-bold tracking-wider">Search Results</span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-1">
          {initialQuery.trim() ? `Showing results for "${initialQuery}"` : 'Please enter a search query'}
        </h1>
        <p className="text-slate-500 text-xs mt-1 font-medium">Found {products.length} items</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between h-[380px] shadow-sm">
              <div className="w-full h-44 bg-slate-100 rounded-xl animate-pulse mb-3" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-slate-200 animate-pulse rounded" />
                <div className="h-4 w-3/4 bg-slate-200 animate-pulse rounded" />
              </div>
              <div className="pt-3 flex justify-between items-center border-t border-slate-100 mt-auto">
                <div className="h-5 w-20 bg-slate-200 animate-pulse rounded" />
                <div className="h-9 w-24 bg-slate-200 animate-pulse rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-10 md:p-16 text-center shadow-sm space-y-5">
          <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center">
            <Search className="w-7 h-7 text-slate-400" />
          </div>
          <h2 className="text-lg font-bold text-slate-800">No products found for &quot;{initialQuery}&quot;</h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            We couldn&apos;t find any matching products in our catalog. But don&apos;t worry — we can source almost any IT hardware for you!
          </p>
          <a
            href={`https://wa.me/919369991770?text=${encodeURIComponent(`Hi, I searched for "${initialQuery}" on your website but couldn't find it. Can you help me source this product?`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5a] text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors shadow-md hover:shadow-lg"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Ask on WhatsApp
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((prod: any) => (
            <ProductCard key={prod._id} product={prod} />
          ))}
        </div>
      )}
    </div>
  );
}
