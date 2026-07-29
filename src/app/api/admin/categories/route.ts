import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { revalidateTag, revalidatePath } from 'next/cache';
import dbConnect from '@/lib/db';
import Category from '@/models/Category';

async function verifyAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('sait_admin_token');
  return token?.value === 'authenticated_session_hash_sait_solutions';
}

export async function GET() {
  try {
    await dbConnect();
    const categories = await Category.find({})
      .populate('parent', 'name slug')
      .sort({ order: 1, name: 1 })
      .lean();

    return NextResponse.json({ success: true, categories });
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

    const name = body.name?.trim();
    if (!name) {
      return NextResponse.json({ success: false, error: 'Category name is required' }, { status: 400 });
    }

    const parentId = body.parent || null;
    let baseSlug = body.slug
      ? body.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      : name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    if (!parentId) {
      const existingMain = await Category.findOne({
        parent: null,
        $or: [
          { name: { $regex: new RegExp(`^${name.trim()}$`, 'i') } },
          { slug: baseSlug }
        ]
      });

      if (existingMain) {
        return NextResponse.json(
          { success: false, error: `A main category named "${name}" already exists.` },
          { status: 400 }
        );
      }
    } else {
      const existingInSameParent = await Category.findOne({
        parent: parentId,
        name: { $regex: new RegExp(`^${name.trim()}$`, 'i') }
      });

      if (existingInSameParent) {
        return NextResponse.json(
          { success: false, error: `A category named "${name}" already exists under this parent.` },
          { status: 400 }
        );
      }

      const parentCat = await Category.findById(parentId);
      if (parentCat) {
        const existingGlobalSlug = await Category.findOne({ slug: baseSlug });
        if (existingGlobalSlug) {
          baseSlug = `${parentCat.slug}-${baseSlug}`;
        }
      }

      let finalSlug = baseSlug;
      let counter = 1;
      while (await Category.findOne({ slug: finalSlug })) {
        finalSlug = `${baseSlug}-${counter}`;
        counter++;
      }
      baseSlug = finalSlug;
    }

    const categoryData: any = {
      name,
      slug: baseSlug,
      image: body.image || '',
      parent: parentId,
      order: body.order || 0,
    };

    const newCategory = await Category.create(categoryData);
    
    try {
      (revalidateTag as any)('categories');
      (revalidateTag as any)('products');
      revalidatePath('/', 'layout');
    } catch (e) {
      console.error('Revalidation error:', e);
    }

    return NextResponse.json({ success: true, category: newCategory });
  } catch (error: any) {
    console.error('Create category error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
