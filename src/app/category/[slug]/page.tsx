import React from 'react';
import { notFound } from 'next/navigation';
import { getCachedMainCategories, getCachedCategoryBySlug } from '@/lib/cache';
import CategoryListingClient from '@/components/CategoryListingClient';
import dbConnect from '@/lib/db';
import Category from '@/models/Category';
import Product from '@/models/Product';

export const revalidate = 3600;

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  try {
    await dbConnect();

    // 1. Fetch main categories for header category switcher
    const allMainCategories = await getCachedMainCategories();

    // 2. Find target category in DB
    const targetCategory = await Category.findOne({ slug }).lean();
    if (!targetCategory) {
      notFound();
    }

    let parentCategoryObj: any = null;
    let mainCategoryObj: any = null;
    let subcategories: any[] = [];
    let products: any[] = [];
    let activeSubcategorySlug = 'all';

    if (!targetCategory.parent) {
      // Target is a Level 1 Main Category
      mainCategoryObj = targetCategory;
      const rawSubs = await Category.find({ parent: targetCategory._id }).sort({ order: 1, name: 1 }).lean();
      
      subcategories = await Promise.all(
        rawSubs.map(async (sub) => {
          const subsubs = await Category.find({ parent: sub._id }).sort({ order: 1, name: 1 }).lean();
          return {
            ...sub,
            _id: sub._id.toString(),
            subsubcategories: JSON.parse(JSON.stringify(subsubs)),
          };
        })
      );

      const subcatIds = rawSubs.map((s) => s._id);
      products = await Product.find({
        $or: [
          { category: targetCategory._id },
          { subcategory: { $in: subcatIds } }
        ]
      }).sort({ createdAt: -1 }).lean();

    } else {
      // Target is a Level 2 Subcategory or Level 3 Item
      const parent = await Category.findById(targetCategory.parent).lean();
      if (!parent) {
        notFound();
      }

      if (!parent.parent) {
        // Target is a Level 2 Subcategory
        parentCategoryObj = parent;
        mainCategoryObj = parent;
        activeSubcategorySlug = targetCategory.slug;

        const rawSubs = await Category.find({ parent: parent._id }).sort({ order: 1, name: 1 }).lean();
        subcategories = await Promise.all(
          rawSubs.map(async (sub) => {
            const subsubs = await Category.find({ parent: sub._id }).sort({ order: 1, name: 1 }).lean();
            return {
              ...sub,
              _id: sub._id.toString(),
              subsubcategories: JSON.parse(JSON.stringify(subsubs)),
            };
          })
        );

        const subsubcatIds = (await Category.find({ parent: targetCategory._id })).map((s) => s._id);
        products = await Product.find({
          $or: [
            { subcategory: targetCategory._id },
            { subsubcategory: { $in: subsubcatIds } }
          ]
        }).sort({ createdAt: -1 }).lean();

      } else {
        // Target is a Level 3 Sub-subcategory
        const grandParent = await Category.findById(parent.parent).lean();
        parentCategoryObj = parent;
        mainCategoryObj = grandParent || parent;
        activeSubcategorySlug = parent.slug;

        const rawSubs = await Category.find({ parent: mainCategoryObj._id }).sort({ order: 1, name: 1 }).lean();
        subcategories = await Promise.all(
          rawSubs.map(async (sub) => {
            const subsubs = await Category.find({ parent: sub._id }).sort({ order: 1, name: 1 }).lean();
            return {
              ...sub,
              _id: sub._id.toString(),
              subsubcategories: JSON.parse(JSON.stringify(subsubs)),
            };
          })
        );

        products = await Product.find({ subsubcategory: targetCategory._id }).sort({ createdAt: -1 }).lean();
      }
    }

    const serializedProducts = JSON.parse(JSON.stringify(products));
    const serializedSubcategories = JSON.parse(JSON.stringify(subcategories));
    const serializedMainCategory = mainCategoryObj ? JSON.parse(JSON.stringify(mainCategoryObj)) : null;
    const serializedParentCategory = parentCategoryObj ? JSON.parse(JSON.stringify(parentCategoryObj)) : null;

    return (
      <CategoryListingClient
        targetCategory={JSON.parse(JSON.stringify(targetCategory))}
        mainCategory={serializedMainCategory}
        parentCategory={serializedParentCategory}
        allMainCategories={allMainCategories}
        currentMainSlug={serializedMainCategory ? serializedMainCategory.slug : slug}
        subcategories={serializedSubcategories}
        products={serializedProducts}
        activeSubcategorySlug={activeSubcategorySlug}
      />
    );
  } catch (error) {
    console.error("Database connection failed during category load:", error);
    notFound();
  }
}
