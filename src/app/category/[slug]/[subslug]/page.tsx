import React from 'react';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/db';
import Category from '@/models/Category';
import Product from '@/models/Product';
import CategoryListingClient from '@/components/CategoryListingClient';

export const revalidate = 60; // Revalidate every minute

interface SubcategoryPageProps {
  params: Promise<{
    slug: string;
    subslug: string;
  }>;
}

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  await dbConnect();
  
  const { subslug } = await params;

  // 1. Find the target subcategory
  const targetCategory = await Category.findOne({ slug: subslug }).lean();
  if (!targetCategory || !targetCategory.parent) {
    notFound();
  }

  // 2. Get the parent category
  const parentCategory = await Category.findById(targetCategory.parent).lean();
  if (!parentCategory) {
    notFound();
  }
  
  // 3. Get all subcategories under the same parent for the sidebar listing
  const subcategories = await Category.find({ parent: parentCategory._id }).sort({ order: 1 }).lean();

  // 4. Find products belonging to this subcategory
  const products = await Product.find({ subcategory: targetCategory._id }).sort({ createdAt: -1 }).lean();

  // Safely serialize database documents
  const serializedProducts = JSON.parse(JSON.stringify(products));
  const serializedSubcategories = JSON.parse(JSON.stringify(subcategories));

  return (
    <CategoryListingClient
      categoryName={parentCategory.name}
      subcategories={serializedSubcategories}
      products={serializedProducts}
      activeSubcategorySlug={targetCategory.slug}
    />
  );
}
