import React from 'react';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/db';
import Category from '@/models/Category';
import Product from '@/models/Product';
import CategoryListingClient from '@/components/CategoryListingClient';

export const revalidate = 60; // Revalidate every minute

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  await dbConnect();
  
  const { slug } = await params;

  // 1. Find the target category
  const targetCategory = await Category.findOne({ slug }).lean();
  if (!targetCategory) {
    notFound();
  }

  let subcategories: any[] = [];
  let products: any[] = [];
  let activeSubcategorySlug = 'all';

  if (!targetCategory.parent) {
    // Parent Category:
    // Get its subcategories
    subcategories = await Category.find({ parent: targetCategory._id }).sort({ order: 1 }).lean();
    
    const subcatIds = subcategories.map((sub) => sub._id);
    
    // Find products belonging to this parent category OR any of its subcategories
    products = await Product.find({
      $or: [
        { category: targetCategory._id },
        { subcategory: { $in: subcatIds } }
      ]
    }).sort({ createdAt: -1 }).lean();
  } else {
    // Sub-category:
    // Get the parent category
    const parentCategory = await Category.findById(targetCategory.parent).lean();
    if (!parentCategory) {
      notFound();
    }
    
    // Get all subcategories under the same parent for the sidebar listing
    subcategories = await Category.find({ parent: parentCategory._id }).sort({ order: 1 }).lean();
    activeSubcategorySlug = targetCategory.slug;

    // Find products belonging to this subcategory
    products = await Product.find({ subcategory: targetCategory._id }).sort({ createdAt: -1 }).lean();
  }

  // Safely serialize database documents
  const serializedProducts = JSON.parse(JSON.stringify(products));
  const serializedSubcategories = JSON.parse(JSON.stringify(subcategories));
  const categoryName = targetCategory.name;

  return (
    <CategoryListingClient
      categoryName={categoryName}
      subcategories={serializedSubcategories}
      products={serializedProducts}
      activeSubcategorySlug={activeSubcategorySlug}
    />
  );
}
