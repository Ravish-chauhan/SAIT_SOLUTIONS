import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/db';
import Category from '@/models/Category';
import Product from '@/models/Product';
import { triggerRevalidation } from '@/lib/revalidate';

async function verifyAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('sait_admin_token');
  return token?.value === 'authenticated_session_hash_sait_solutions';
}

export async function GET() {
  try {
    if (!(await verifyAuth())) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    await Category.findOne({}).lean();

    const products = await Product.find({})
      .populate('category', 'name')
      .populate('subcategory', 'name')
      .populate('subsubcategory', 'name')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, products });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!(await verifyAuth())) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();
    
    const slug = body.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const newProduct = await Product.create({
      ...body,
      slug,
    });

    // Bust the website cache so new product appears instantly
    await triggerRevalidation(['products', 'categories']);

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    if (!(await verifyAuth())) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { updates } = await request.json();

    if (!Array.isArray(updates)) {
      return NextResponse.json({ success: false, error: 'Updates must be an array' }, { status: 400 });
    }

    for (const update of updates) {
      await Product.findByIdAndUpdate(update.id, {
        mrp: update.mrp,
        offerPrice: update.offerPrice || undefined,
        stockStatus: update.stockStatus,
      });
    }

    // Bust the website cache so updated products appear instantly
    await triggerRevalidation(['products']);

    return NextResponse.json({ success: true, message: 'Products updated successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
