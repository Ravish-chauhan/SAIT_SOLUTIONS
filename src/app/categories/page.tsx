import React from 'react';
import AllCategoriesClient from '@/components/AllCategoriesClient';
import { getCachedMainCategories } from '@/lib/cache';

export const revalidate = 3600; // ISR cache: cached statically on edge, automatically invalidated when admin mutates categories

export default async function CategoriesPage() {
  let categories: any[] = [];

  try {
    categories = await getCachedMainCategories();
  } catch (error) {
    console.error("Failed to load category taxonomy:", error);
  }

  return <AllCategoriesClient categories={categories} />;
}

