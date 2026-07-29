import React from 'react';
import dbConnect from '@/lib/db';
import Category from '@/models/Category';
import AllCategoriesClient from '@/components/AllCategoriesClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Fetch fresh category data on every request so admin image updates show immediately

export default async function CategoriesPage() {
  let categories: any[] = [];

  try {
    await dbConnect();
    const parentCategories = await Category.find({ parent: null })
      .sort({ order: 1, name: 1 })
      .lean();

    categories = JSON.parse(JSON.stringify(parentCategories));
  } catch (error) {
    console.error("Failed to load category taxonomy:", error);
  }

  return <AllCategoriesClient categories={categories} />;
}
