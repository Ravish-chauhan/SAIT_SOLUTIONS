import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

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
