import React from 'react';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import Category from '@/models/Category';
import ProductDetailClient from '@/components/ProductDetailClient';

export const revalidate = 60; // Revalidate every minute

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  try {
    await dbConnect();
    
    // 1. Fetch the product
    const product = await Product.findOne({ slug }).lean();
    if (!product) {
      notFound();
    }

    // 2. Fetch category and subcategory names for breadcrumbs
    const categoryDoc = await Category.findById(product.category).lean();
    const subcategoryDoc = product.subcategory 
      ? await Category.findById(product.subcategory).lean() 
      : null;

    // 3. Query related products (excluding current product)
    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
    })
      .limit(4)
      .lean();

    // Safely serialize database documents for Client Component consumption
    const serializedProduct = {
      ...JSON.parse(JSON.stringify(product)),
      category: categoryDoc 
        ? { _id: categoryDoc._id.toString(), name: categoryDoc.name, slug: categoryDoc.slug }
        : { _id: '', name: 'Hardware', slug: 'all' },
      subcategory: subcategoryDoc 
        ? { _id: subcategoryDoc._id.toString(), name: subcategoryDoc.name, slug: subcategoryDoc.slug }
        : undefined
    };

    const serializedRelated = JSON.parse(JSON.stringify(relatedProducts));

    return (
      <ProductDetailClient
        product={serializedProduct}
        relatedProducts={serializedRelated}
      />
    );
  } catch (error) {
    console.error("Database connection failed during product load:", error);
    notFound();
  }
}
