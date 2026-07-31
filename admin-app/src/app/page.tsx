import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/db';
import Category from '@/models/Category';
import Product from '@/models/Product';
import Enquiry from '@/models/Enquiry';
import AdminPanelClient from '@/components/AdminPanelClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get('sait_admin_token');

  // Route protection - Redirect to login if unauthenticated
  if (token?.value !== 'authenticated_session_hash_sait_solutions') {
    redirect('/login');
  }

  let products: any[] = [];
  let enquiries: any[] = [];
  let categories: any[] = [];

  try {
    await dbConnect();

    categories = await Category.find({})
      .sort({ name: 1 })
      .lean();

    products = await Product.find({})
      .populate('category', 'name')
      .populate('subcategory', 'name')
      .populate('subsubcategory', 'name')
      .sort({ createdAt: -1 })
      .lean();

    enquiries = await Enquiry.find({})
      .sort({ createdAt: -1 })
      .lean();

  } catch (error) {
    console.error("Database error in admin dashboard:", error);
  }

  const serializedProducts = JSON.parse(JSON.stringify(products));
  const serializedEnquiries = JSON.parse(JSON.stringify(enquiries));
  const serializedCategories = JSON.parse(JSON.stringify(categories));

  return (
    <AdminPanelClient
      initialProducts={serializedProducts}
      initialEnquiries={serializedEnquiries}
      initialCategories={serializedCategories}
    />
  );
}
