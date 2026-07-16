import React from 'react';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import ProductCard from '@/components/ProductCard';

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  await dbConnect();
  
  const { q } = await searchParams;
  const query = q || '';

  let products: any[] = [];
  if (query.trim()) {
    products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { brand: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ],
    })
      .limit(20)
      .lean();
  }

  const serializedProducts = JSON.parse(JSON.stringify(products));

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-8">
      <div>
        <span className="text-xs text-accent uppercase font-bold tracking-wider">Search Results</span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
          {query.trim() ? `Showing results for "${query}"` : 'Please enter a search query'}
        </h1>
        <p className="text-zinc-500 text-xs mt-1">Found {serializedProducts.length} items</p>
      </div>

      {serializedProducts.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-16 text-center text-zinc-500">
          No hardware items found matching your search. Try searching for "Bullet", "Router", "Epson", or check spelling.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {serializedProducts.map((prod: any) => (
            <ProductCard key={prod._id} product={prod} />
          ))}
        </div>
      )}
    </div>
  );
}
