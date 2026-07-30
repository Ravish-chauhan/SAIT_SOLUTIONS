import React from 'react';

export default function CategoryLoading() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-6 px-4 md:px-8 max-w-[1500px] mx-auto space-y-6 font-sans">
      {/* Category Header Bar Skeleton */}
      <div className="bg-white border border-slate-200 p-5 md:p-6 rounded-2xl shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-3.5 w-12 bg-slate-200 animate-pulse rounded" />
          <div className="h-3.5 w-3 bg-slate-200 animate-pulse rounded" />
          <div className="h-3.5 w-24 bg-slate-200 animate-pulse rounded" />
          <div className="h-3.5 w-3 bg-slate-200 animate-pulse rounded" />
          <div className="h-3.5 w-32 bg-purple-200/70 animate-pulse rounded" />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-2">
          <div>
            <div className="h-8 w-64 bg-slate-200 animate-pulse rounded-xl" />
            <div className="h-4 w-96 bg-slate-100 animate-pulse rounded-lg mt-2" />
          </div>
          <div className="flex gap-2">
            <div className="h-9 w-28 bg-slate-100 animate-pulse rounded-xl" />
            <div className="h-9 w-28 bg-slate-100 animate-pulse rounded-xl" />
          </div>
        </div>
      </div>

      {/* Subcategories Horizontal Pill Chips Skeleton */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-10 w-32 bg-white border border-slate-200 rounded-full animate-pulse shrink-0" />
        ))}
      </div>

      {/* Main Content: Filters + Product Cards Grid Skeleton */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Filter Sidebar Skeleton */}
        <div className="hidden lg:block w-64 shrink-0 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-6">
            <div className="h-6 w-32 bg-slate-200 animate-pulse rounded-lg" />
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-4 w-full bg-slate-100 animate-pulse rounded" />
              ))}
            </div>
            <div className="h-[1px] bg-slate-100" />
            <div className="h-6 w-24 bg-slate-200 animate-pulse rounded-lg" />
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 w-3/4 bg-slate-100 animate-pulse rounded" />
              ))}
            </div>
          </div>
        </div>

        {/* Right Product Grid Skeleton */}
        <div className="flex-1 space-y-4">
          {/* Top Filter Bar Skeleton */}
          <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex justify-between items-center">
            <div className="h-4 w-36 bg-slate-200 animate-pulse rounded" />
            <div className="h-8 w-44 bg-slate-100 animate-pulse rounded-xl" />
          </div>

          {/* Product Cards Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between h-[380px] shadow-sm"
              >
                {/* Image Placeholder */}
                <div className="w-full h-44 bg-slate-100 rounded-xl overflow-hidden mb-3 animate-pulse flex items-center justify-center">
                  <div className="w-20 h-20 bg-slate-200/80 rounded-xl" />
                </div>
                {/* Product Title Skeleton */}
                <div className="space-y-2">
                  <div className="h-3.5 w-16 bg-purple-100/80 animate-pulse rounded" />
                  <div className="h-4 w-full bg-slate-200 animate-pulse rounded" />
                  <div className="h-4 w-3/4 bg-slate-200 animate-pulse rounded" />
                </div>
                {/* Price & Action Button Skeleton */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <div className="space-y-1">
                    <div className="h-5 w-20 bg-slate-200 animate-pulse rounded" />
                    <div className="h-3 w-12 bg-slate-100 animate-pulse rounded" />
                  </div>
                  <div className="h-9 w-24 bg-slate-200 animate-pulse rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
