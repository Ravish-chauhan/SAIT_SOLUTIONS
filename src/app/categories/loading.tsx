import React from 'react';

export default function CategoriesLoading() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-8 px-4 md:px-8 max-w-7xl mx-auto space-y-8 font-sans">
      {/* Breadcrumb Skeleton */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <div className="h-3.5 w-12 bg-slate-200 animate-pulse rounded" />
        <div className="h-3.5 w-3 bg-slate-200 animate-pulse rounded" />
        <div className="h-3.5 w-32 bg-purple-200/60 animate-pulse rounded" />
      </div>

      {/* Header Bar Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
        <div className="space-y-2">
          <div className="h-7 w-48 bg-slate-200 animate-pulse rounded-xl" />
          <div className="h-3.5 w-72 bg-slate-100 animate-pulse rounded-lg" />
        </div>
        <div className="w-full sm:w-64 h-10 bg-slate-100 border border-slate-200 animate-pulse rounded-xl" />
      </div>

      {/* Grid Cards Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-5 md:gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white border border-slate-200/80 rounded-3xl p-5 md:p-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)] flex flex-col items-center justify-between text-center"
          >
            {/* Image Skeleton Box */}
            <div className="w-full h-44 md:h-52 bg-slate-100 rounded-2xl overflow-hidden mb-4 border border-slate-100 flex items-center justify-center p-6">
              <div className="w-24 h-24 bg-slate-200/70 animate-pulse rounded-2xl" />
            </div>

            {/* Title & Arrow Skeleton */}
            <div className="w-full pt-1 flex items-center justify-between">
              <div className="h-5 w-32 bg-slate-200 animate-pulse rounded-lg" />
              <div className="w-8 h-8 rounded-full bg-slate-100 animate-pulse shrink-0" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
