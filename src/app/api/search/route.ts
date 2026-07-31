import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q')?.trim() || '';

    if (!q) {
      return NextResponse.json({ success: true, products: [] });
    }

    await dbConnect();
    const products = await Product.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { brand: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
      ],
    })
      .limit(24)
      .lean();

    return NextResponse.json(
      { success: true, products: JSON.parse(JSON.stringify(products)) },
      {
        headers: {
          'Cache-Control': 'no-store', // Always fetch fresh results
        },
      }
    );
  } catch (error: any) {
    console.error('Search API error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
