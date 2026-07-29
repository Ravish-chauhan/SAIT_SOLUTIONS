import path from 'path';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import dbConnect from '../lib/db';
import Category from '../models/Category';
import Product from '../models/Product';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const CATEGORIES_DATA = [
  {
    name: 'PC Components',
    slug: 'pc-components',
    localImage: 'pc components.webp',
    order: 1,
    subcategories: [
      { name: 'Graphics Cards (GPUs)', slug: 'gpus', order: 1 },
      { name: 'Processors (CPUs)', slug: 'cpus', order: 2 },
      { name: 'Motherboards', slug: 'motherboards', order: 3 },
      { name: 'DDR4 & DDR5 RAM', slug: 'ram-memory', order: 4 },
      { name: 'Power Supplies & Cabinets', slug: 'power-cabinets', order: 5 },
    ],
  },
  {
    name: 'Storage & NAS',
    slug: 'storage-nas',
    localImage: 'NAS-Storage.webp',
    order: 2,
    subcategories: [
      { name: 'NVMe M.2 SSDs', slug: 'nvme-ssds', order: 1 },
      { name: 'Enterprise NAS Drives', slug: 'nas-drives', order: 2 },
      { name: 'External Portable Storage', slug: 'external-storage', order: 3 },
    ],
  },
  {
    name: 'Peripherals',
    slug: 'peripherals',
    localImage: 'peripherals.avif',
    order: 3,
    subcategories: [
      { name: 'Keyboards', slug: 'keyboards', order: 1 },
      { name: 'Mouse', slug: 'mouse', order: 2 },
      { name: 'Headphones', slug: 'headphones', order: 3 },
      { name: 'Microphones', slug: 'microphones', order: 4 },
    ],
  },
  {
    name: 'Monitors & Displays',
    slug: 'monitors-display',
    localImage: 'monitor.jpg',
    order: 4,
    subcategories: [
      { name: 'Gaming Monitors', slug: 'gaming-monitors', order: 1 },
      { name: 'Ultra-wide Displays', slug: 'ultrawide-monitors', order: 2 },
      { name: '4K Displays', slug: '4k-displays', order: 3 },
    ],
  },
  {
    name: 'Network & Security',
    slug: 'network-security',
    localImage: 'network and security.jpg',
    order: 5,
    subcategories: [
      { name: 'IP CCTV Security Cameras', slug: 'cctv-cameras', order: 1 },
      { name: 'WiFi 6 Routers', slug: 'wifi-routers', order: 2 },
      { name: 'POE Switches', slug: 'poe-switches', order: 3 },
    ],
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    localImage: 'accessories.jpg',
    order: 6,
    subcategories: [
      { name: 'Monitor Arms & Stands', slug: 'monitor-stands', order: 1 },
      { name: 'Cables & Adapters', slug: 'cables-adapters', order: 2 },
      { name: 'UPS Power Solutions', slug: 'ups-power', order: 3 },
    ],
  },
];

async function runSeed() {
  console.log('Connecting to MongoDB...');
  await dbConnect();
  console.log('Connected!');

  const publicDir = path.join(process.cwd(), 'public', 'category');
  const createdCategories: any[] = [];

  for (const catData of CATEGORIES_DATA) {
    let cloudinaryUrl = '';

    try {
      const filePath = path.join(publicDir, catData.localImage);
      if (fs.existsSync(filePath)) {
        console.log(`Uploading ${catData.localImage} to Cloudinary...`);
        const uploadRes = await cloudinary.uploader.upload(filePath, {
          folder: 'sait_solutions_categories',
          public_id: `cat_${catData.slug}`,
          overwrite: true,
        });
        cloudinaryUrl = uploadRes.secure_url;
        console.log(`Uploaded! URL: ${cloudinaryUrl}`);
      }
    } catch (err) {
      console.error(`Cloudinary upload failed for ${catData.name}:`, err);
      cloudinaryUrl = `/category/${catData.localImage}`;
    }

    const mainCat = await Category.findOneAndUpdate(
      { slug: catData.slug },
      {
        name: catData.name,
        slug: catData.slug,
        image: cloudinaryUrl || `/category/${catData.localImage}`,
        parent: null,
        order: catData.order,
      },
      { upsert: true, new: true }
    );

    const subDocs = [];
    for (const sub of catData.subcategories) {
      const subCat = await Category.findOneAndUpdate(
        { slug: sub.slug },
        {
          name: sub.name,
          slug: sub.slug,
          image: '',
          parent: mainCat._id,
          order: sub.order,
        },
        { upsert: true, new: true }
      );
      subDocs.push(subCat);
    }

    createdCategories.push({ main: mainCat, subcategories: subDocs });
  }

  // Update existing products
  const allProducts = await Product.find({});
  for (const prod of allProducts) {
    const lowerName = prod.name.toLowerCase();
    let matchedMainCat: any = null;
    let matchedSubCat: any = null;

    if (lowerName.includes('keyboard') || lowerName.includes('keycap')) {
      matchedMainCat = createdCategories.find((c) => c.main.slug === 'peripherals')?.main;
      matchedSubCat = await Category.findOne({ slug: 'keyboards' });
    } else if (lowerName.includes('mouse') || lowerName.includes('mice')) {
      matchedMainCat = createdCategories.find((c) => c.main.slug === 'peripherals')?.main;
      matchedSubCat = await Category.findOne({ slug: 'mouse' });
    } else if (lowerName.includes('headset') || lowerName.includes('headphone')) {
      matchedMainCat = createdCategories.find((c) => c.main.slug === 'peripherals')?.main;
      matchedSubCat = await Category.findOne({ slug: 'headphones' });
    } else if (lowerName.includes('ssd') || lowerName.includes('ram') || lowerName.includes('power supply') || lowerName.includes('mwe')) {
      matchedMainCat = createdCategories.find((c) => c.main.slug === 'pc-components')?.main;
    }

    if (matchedMainCat) {
      prod.category = matchedMainCat._id;
      if (matchedSubCat) prod.subcategory = matchedSubCat._id;
      await prod.save();
    }
  }

  console.log('Seeding completed successfully!');
  process.exit(0);
}

runSeed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
