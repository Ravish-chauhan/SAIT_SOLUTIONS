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

    const existingCategory = await Category.findById(id);
    if (!existingCategory) {
      return NextResponse.json({ success: false, error: 'Category not found' }, { status: 404 });
    }

    const name = body.name ? body.name.trim() : existingCategory.name;
    const parentId = body.parent !== undefined ? body.parent : existingCategory.parent;

    let baseSlug = body.slug
      ? body.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      : name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    if (!parentId) {
      const existingMain = await Category.findOne({
        _id: { $ne: id },
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
        _id: { $ne: id },
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
        const existingGlobalSlug = await Category.findOne({ _id: { $ne: id }, slug: baseSlug });
        if (existingGlobalSlug) {
          baseSlug = `${parentCat.slug}-${baseSlug}`;
        }
      }

      let finalSlug = baseSlug;
      let counter = 1;
      while (await Category.findOne({ _id: { $ne: id }, slug: finalSlug })) {
        finalSlug = `${baseSlug}-${counter}`;
        counter++;
      }
      baseSlug = finalSlug;
    }

    const updateFields: any = {
      name,
      slug: baseSlug,
      image: body.image !== undefined ? body.image : existingCategory.image,
      parent: parentId || null,
      order: body.order !== undefined ? body.order : existingCategory.order,
    };

    const updatedCategory = await Category.findByIdAndUpdate(id, updateFields, { new: true });

    try {
      (revalidateTag as any)('categories');
      (revalidateTag as any)('products');
      revalidatePath('/', 'layout');
    } catch (e) {
      console.error('Revalidation error:', e);
    }

    return NextResponse.json({ success: true, category: updatedCategory });
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

    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return NextResponse.json({ success: false, error: 'Category not found' }, { status: 404 });
    }

    try {
      (revalidateTag as any)('categories');
      (revalidateTag as any)('products');
      revalidatePath('/', 'layout');
    } catch (e) {
      console.error('Revalidation error:', e);
    }

    return NextResponse.json({ success: true, message: 'Category deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
