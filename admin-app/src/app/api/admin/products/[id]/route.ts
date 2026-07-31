import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { triggerRevalidation } from '@/lib/revalidate';

async function verifyAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('sait_admin_token');
  return token?.value === 'authenticated_session_hash_sait_solutions';
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await verifyAuth())) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    await dbConnect();
    const body = await request.json();

    if (body.name) {
      body.slug = body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, body, { new: true })
      .populate('category', 'name')
      .populate('subcategory', 'name');

    if (!updatedProduct) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    // Bust the website cache so updated product appears instantly
    await triggerRevalidation(['products', 'categories']);

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await verifyAuth())) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    await dbConnect();

    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    // Bust the website cache so deleted product disappears instantly
    await triggerRevalidation(['products', 'categories']);

    return NextResponse.json({ success: true, message: 'Product deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
