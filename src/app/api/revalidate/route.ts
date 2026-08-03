import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { secret, tags } = body;

    // Verify the revalidation secret
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ success: false, error: 'Invalid secret' }, { status: 401 });
    }

    // Revalidate the requested cache tags with immediate expiration
    const tagsToRevalidate: string[] = tags || ['products', 'categories'];
    for (const tag of tagsToRevalidate) {
      revalidateTag(tag, { expire: 0 });
    }

    // Also bust the Full Route Cache (ISR page-level cache) for affected pages.
    // revalidateTag only invalidates the data cache (unstable_cache entries),
    // but the rendered page HTML is cached separately by ISR. We must call
    // revalidatePath to force re-render on the next visit.
    if (tagsToRevalidate.includes('categories') || tagsToRevalidate.includes('products')) {
      // Purge everything: root layout covers all pages + client cache
      revalidatePath('/', 'layout');
    }

    return NextResponse.json({
      success: true,
      revalidated: tagsToRevalidate,
      now: Date.now(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
