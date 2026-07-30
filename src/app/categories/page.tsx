import React from 'react';
import AllCategoriesClient from '@/components/AllCategoriesClient';
import { getCachedMainCategories } from '@/lib/cache';

export const revalidate = 2592000; // 30 Days ISR Edge Cache - automatically invalidated on admin edits

export default async function CategoriesPage() {
  let categories: any[] = [];

  try {
    categories = await getCachedMainCategories();
  } catch (error) {
    console.error("Failed to load category taxonomy:", error);
  }

  return <AllCategoriesClient categories={categories} />;
}

