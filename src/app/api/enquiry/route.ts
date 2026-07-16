import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Enquiry from '@/models/Enquiry';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { productName, productUrl, customerName, customerPhone, message } = body;

    if (!productName || !productUrl || !customerName || !customerPhone) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const enquiry = await Enquiry.create({
      productName,
      productUrl,
      customerName,
      customerPhone,
      message,
      status: 'Pending',
    });

    return NextResponse.json({ success: true, data: enquiry });
  } catch (error: any) {
    console.error('Enquiry API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
