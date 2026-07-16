import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import Enquiry from '@/models/Enquiry';
import Category from '@/models/Category';
import AdminPanelClient from '@/components/AdminPanelClient';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get('sait_admin_token');

  // Route protection
  if (token?.value !== 'authenticated_session_hash_sait_solutions') {
    redirect('/admin/login');
  }

  let products: any[] = [];
  let enquiries: any[] = [];
  let categories: any[] = [];

  try {
    await dbConnect();

    // Fetch all necessary data
    products = await Product.find({})
      .populate('category', 'name')
      .populate('subcategory', 'name')
      .sort({ createdAt: -1 })
      .lean();

    enquiries = await Enquiry.find({})
      .sort({ createdAt: -1 })
      .lean();

    categories = await Category.find({})
      .sort({ name: 1 })
      .lean();
  } catch (error) {
    console.error("Database connection failed in admin dashboard:", error);
  }

  // Safely serialize database documents for Client Component rendering
  const serializedProducts = JSON.parse(JSON.stringify(products));
  const serializedEnquiries = JSON.parse(JSON.stringify(enquiries));
  const serializedCategories = JSON.parse(JSON.stringify(categories));

  return (
    <AdminPanelClient
      initialProducts={serializedProducts}
      initialEnquiries={serializedEnquiries}
      categories={serializedCategories}
    />
  );
}
