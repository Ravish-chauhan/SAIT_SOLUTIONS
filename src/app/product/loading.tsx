import React from 'react';

export default function ProductDetailLoading() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-10 text-slate-800 font-sans space-y-8 min-h-screen">
      {/* Breadcrumbs Skeleton */}
      <div className="flex items-center gap-2 pb-2">
        <div className="h-3.5 w-12 bg-slate-200 animate-pulse rounded" />
        <div className="h-3.5 w-3 bg-slate-200 animate-pulse rounded" />
        <div className="h-3.5 w-24 bg-slate-200 animate-pulse rounded" />
        <div className="h-3.5 w-3 bg-slate-200 animate-pulse rounded" />
        <div className="h-3.5 w-40 bg-purple-200/70 animate-pulse rounded" />
      </div>

      {/* Top Main Section: Image Gallery + Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 bg-white border border-slate-200/80 rounded-3xl p-6 md:p-10 shadow-sm">
        {/* Left: Image Gallery Skeleton */}
        <div className="lg:col-span-6 space-y-4">
          <div className="w-full aspect-square bg-slate-100 rounded-3xl overflow-hidden border border-slate-100 flex items-center justify-center p-8">
            <div className="w-48 h-48 bg-slate-200/80 animate-pulse rounded-2xl" />
          </div>
          <div className="flex gap-3 justify-center">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-16 h-16 bg-slate-100 animate-pulse rounded-xl border border-slate-200" />
            ))}
          </div>
        </div>

        {/* Right: Product Meta Info Skeleton */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="h-4 w-28 bg-purple-100 animate-pulse rounded-full" />
            <div className="h-8 w-full bg-slate-200 animate-pulse rounded-xl" />
            <div className="h-8 w-3/4 bg-slate-200 animate-pulse rounded-xl" />
            <div className="h-4 w-40 bg-slate-100 animate-pulse rounded-lg" />
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-4">
            <div className="flex items-baseline gap-3">
              <div className="h-9 w-32 bg-slate-300 animate-pulse rounded-xl" />
              <div className="h-5 w-20 bg-slate-200 animate-pulse rounded-lg" />
            </div>
            <div className="h-12 w-full bg-purple-600/30 animate-pulse rounded-xl" />
            <div className="h-12 w-full bg-slate-200 animate-pulse rounded-xl" />
          </div>

          {/* Quick Specs List Skeleton */}
          <div className="space-y-2 pt-2">
            <div className="h-4 w-32 bg-slate-200 animate-pulse rounded" />
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-8 bg-slate-100 animate-pulse rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
