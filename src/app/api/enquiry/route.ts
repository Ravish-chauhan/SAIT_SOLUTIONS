import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Enquiry from '@/models/Enquiry';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { productName, productUrl, customerName, customerPhone, customerEmail, message, subject } = body;

    const finalProductName = productName || subject || 'General Homepage Query';
    const finalProductUrl = productUrl || '/';

    if (!customerName || !customerPhone) {
      return NextResponse.json({ success: false, error: 'Name and Phone Number are required' }, { status: 400 });
    }

    const enquiry = await Enquiry.create({
      productName: finalProductName,
      productUrl: finalProductUrl,
      customerName,
      customerPhone,
      customerEmail: customerEmail || undefined,
      message,
      status: 'Pending',
    });

    return NextResponse.json({ success: true, data: enquiry });
  } catch (error: any) {
    console.error('Enquiry API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
