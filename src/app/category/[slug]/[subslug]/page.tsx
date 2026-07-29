import React from 'react';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/db';
import Category from '@/models/Category';
import Product from '@/models/Product';
import CategoryListingClient from '@/components/CategoryListingClient';
import { getCachedMainCategories } from '@/lib/cache';

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
    await dbConnect();
    
    // 1. Fetch main categories for header switcher
    const allMainCategories = await getCachedMainCategories();

    // 2. Find the target subcategory
    const targetCategory = await Category.findOne({ slug: subslug }).lean();
    if (!targetCategory || !targetCategory.parent) {
      notFound();
    }

    // 3. Get the parent category
    const parentCategory = await Category.findById(targetCategory.parent).lean();
    if (!parentCategory) {
      notFound();
    }
    
    // 4. Get all subcategories under the same parent
    const rawSubs = await Category.find({ parent: parentCategory._id }).sort({ order: 1, name: 1 }).lean();
    const subcategories = await Promise.all(
      rawSubs.map(async (sub) => {
        const subsubs = await Category.find({ parent: sub._id }).sort({ order: 1, name: 1 }).lean();
        return {
          ...sub,
          _id: sub._id.toString(),
          subsubcategories: JSON.parse(JSON.stringify(subsubs)),
        };
      })
    );

    // 5. Find products belonging to this subcategory or sub-subcategories
    const subsubcatIds = (await Category.find({ parent: targetCategory._id })).map((s) => s._id);
    const products = await Product.find({
      $or: [
        { subcategory: targetCategory._id },
        { subsubcategory: { $in: subsubcatIds } }
      ]
    }).sort({ createdAt: -1 }).lean();

    const serializedTarget = JSON.parse(JSON.stringify(targetCategory));
    const serializedParent = JSON.parse(JSON.stringify(parentCategory));
    const serializedSubcategories = JSON.parse(JSON.stringify(subcategories));
    const serializedProducts = JSON.parse(JSON.stringify(products));

    return (
      <CategoryListingClient
        targetCategory={serializedTarget}
        mainCategory={serializedParent}
        parentCategory={serializedParent}
        allMainCategories={allMainCategories}
        currentMainSlug={serializedParent.slug}
        subcategories={serializedSubcategories}
        products={serializedProducts}
        activeSubcategorySlug={serializedTarget.slug}
      />
    );
  } catch (error) {
    console.error("Database connection failed during subcategory load:", error);
    notFound();
  }
}
