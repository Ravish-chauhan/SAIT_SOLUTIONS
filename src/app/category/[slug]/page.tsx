import React from 'react';
import { notFound } from 'next/navigation';
import { getCachedMainCategories, getCachedCategoryPageData } from '@/lib/cache';
import CategoryListingClient from '@/components/CategoryListingClient';

export const revalidate = 3600;

export async function generateStaticParams() {
  return [
    { slug: 'pc-components' },
    { slug: 'storage-nas' },
    { slug: 'peripherals' },
    { slug: 'monitors-display' },
    { slug: 'network-security' },
    { slug: 'accessories' },
  ];
}

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  try {
    const [allMainCategories, pageData] = await Promise.all([
      getCachedMainCategories(),
      getCachedCategoryPageData(slug),
    ]);

    if (!pageData || !pageData.targetCategory) {
      notFound();
    }

    const {
      targetCategory,
      mainCategory,
      parentCategory,
      subcategories,
      products,
      activeSubcategorySlug,
    } = pageData;

    return (
      <CategoryListingClient
        targetCategory={targetCategory}
        mainCategory={mainCategory}
        parentCategory={parentCategory}
        allMainCategories={allMainCategories}
        currentMainSlug={mainCategory ? mainCategory.slug : slug}
        subcategories={subcategories}
        products={products}
        activeSubcategorySlug={activeSubcategorySlug}
      />
    );
  } catch (error) {
    console.error("Failed to load category page:", error);
    notFound();
  }
}
