import React from 'react';
import { notFound } from 'next/navigation';
import { getCachedProductDetailPage } from '@/lib/cache';
import ProductDetailClient from '@/components/ProductDetailClient';

export const revalidate = 2592000; // 30 Days ISR Edge Cache - automatically invalidated on admin edits

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  try {
    const pageData = await getCachedProductDetailPage(slug);
    if (!pageData || !pageData.product) {
      notFound();
    }

    return (
      <ProductDetailClient
        product={pageData.product}
        relatedProducts={pageData.relatedProducts}
      />
    );
  } catch (error) {
    console.error("Failed to load product page:", error);
    notFound();
  }
}
