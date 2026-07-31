import React from 'react';

export default function SearchLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-8 min-h-[70vh]">
      <div className="space-y-2">
        <div className="h-4 w-24 bg-[#5b21b6]/20 animate-pulse rounded" />
        <div className="h-8 w-64 bg-slate-200 animate-pulse rounded-xl" />
        <div className="h-4 w-32 bg-slate-100 animate-pulse rounded" />
      </div>

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
    </div>
  );
}
