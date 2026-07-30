import React from 'react';
import { notFound } from 'next/navigation';
import CategoryListingClient from '@/components/CategoryListingClient';
import { getCachedMainCategories, getCachedSubcategoryPageData } from '@/lib/cache';

export const revalidate = 3600;

interface SubcategoryPageProps {
  params: Promise<{
    slug: string;
    subslug: string;
  }>;
}

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const { subslug } = await params;

  try {
    const [allMainCategories, pageData] = await Promise.all([
      getCachedMainCategories(),
      getCachedSubcategoryPageData(subslug),
    ]);

    if (!pageData || !pageData.targetCategory) {
      notFound();
    }

    const { targetCategory, parentCategory, subcategories, products } = pageData;

    return (
      <CategoryListingClient
        targetCategory={targetCategory}
        mainCategory={parentCategory}
        parentCategory={parentCategory}
        allMainCategories={allMainCategories}
        currentMainSlug={parentCategory ? parentCategory.slug : ''}
        subcategories={subcategories}
        products={products}
        activeSubcategorySlug={targetCategory.slug}
      />
    );
  } catch (error) {
    console.error("Database connection failed during subcategory load:", error);
    notFound();
  }
}
