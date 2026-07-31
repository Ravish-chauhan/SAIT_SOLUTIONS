import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function verifyAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('sait_admin_token');
  return token?.value === 'authenticated_session_hash_sait_solutions';
}

export async function POST(request: Request) {
  try {
    if (!(await verifyAuth())) {
      return NextResponse.json({ success: false, error: 'Unauthorized request' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = file.type || 'image/webp';
    const base64Data = `data:${mimeType};base64,${buffer.toString('base64')}`;

    const uploadResponse = await cloudinary.uploader.upload(base64Data, {
      folder: 'sait_solutions_products',
      resource_type: 'image',
      transformation: [
        { quality: 'auto', fetch_format: 'auto' }
      ]
    });

    return NextResponse.json({
      success: true,
      url: uploadResponse.secure_url,
      public_id: uploadResponse.public_id,
    });
  } catch (error: any) {
    console.error('Cloudinary upload error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Cloudinary upload failed' },
      { status: 500 }
    );
  }
}
