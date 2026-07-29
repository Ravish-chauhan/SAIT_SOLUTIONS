import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import dbConnect from '@/lib/db';
import Category from '@/models/Category';
import Product from '@/models/Product';

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
      {
        name: 'Graphics Cards (GPUs)',
        slug: 'gpus',
        order: 1,
        subsubcategories: [
          { name: 'NVIDIA RTX 40-Series', slug: 'rtx-40-gpus', order: 1 },
          { name: 'AMD Radeon RX-Series', slug: 'radeon-gpus', order: 2 },
        ],
      },
      {
        name: 'Processors (CPUs)',
        slug: 'cpus',
        order: 2,
        subsubcategories: [
          { name: 'Intel Core i7 / i9', slug: 'intel-cpus', order: 1 },
          { name: 'AMD Ryzen 7 / 9', slug: 'ryzen-cpus', order: 2 },
        ],
      },
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
      {
        name: 'NVMe M.2 SSDs',
        slug: 'nvme-ssds',
        order: 1,
        subsubcategories: [
          { name: 'Gen4 PCIe NVMe', slug: 'gen4-ssds', order: 1 },
          { name: 'Gen5 High-Speed NVMe', slug: 'gen5-ssds', order: 2 },
        ],
      },
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
      {
        name: 'Mouse',
        slug: 'mouse',
        order: 1,
        subsubcategories: [
          { name: 'Bluetooth Wireless', slug: 'bluetooth-mouse', order: 1 },
          { name: '2.4GHz Wireless Dongle', slug: '24ghz-mouse', order: 2 },
          { name: 'Wired Gaming', slug: 'wired-mouse', order: 3 },
        ],
      },
      {
        name: 'Keyboards',
        slug: 'keyboards',
        order: 2,
        subsubcategories: [
          { name: 'Wireless Mechanical', slug: 'wireless-keyboards', order: 1 },
          { name: 'Hot-Swappable RGB', slug: 'hotswap-keyboards', order: 2 },
          { name: 'Wired Compact', slug: 'wired-keyboards', order: 3 },
        ],
      },
      {
        name: 'Headphones',
        slug: 'headphones',
        order: 3,
        subsubcategories: [
          { name: 'Wireless Gaming Headsets', slug: 'wireless-headsets', order: 1 },
          { name: 'Studio Wired Monitors', slug: 'wired-headsets', order: 2 },
        ],
      },
      {
        name: 'Microphones',
        slug: 'microphones',
        order: 4,
        subsubcategories: [
          { name: 'USB Streaming Mics', slug: 'usb-mics', order: 1 },
          { name: 'XLR Studio Mics', slug: 'xlr-mics', order: 2 },
        ],
      },
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

export async function GET() {
  return handleSeed();
}

export async function POST() {
  return handleSeed();
}

async function handleSeed() {
  try {
    await dbConnect();
    const publicDir = path.join(process.cwd(), 'public', 'category');
    const createdCategories: any[] = [];

    for (const catData of CATEGORIES_DATA) {
      let cloudinaryUrl = '';

      try {
        const filePath = path.join(publicDir, catData.localImage);
        if (fs.existsSync(filePath)) {
          const uploadRes = await cloudinary.uploader.upload(filePath, {
            folder: 'sait_solutions_categories',
            public_id: `cat_${catData.slug}`,
            overwrite: true,
          });
          cloudinaryUrl = uploadRes.secure_url;
        }
      } catch (err) {
        console.error(`Error uploading image for ${catData.name} to Cloudinary:`, err);
        cloudinaryUrl = `/category/${catData.localImage}`;
      }

      // 1. Upsert Main Category (Level 1)
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

      // 2. Upsert Subcategories (Level 2)
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

        // 3. Upsert Sub-Subcategories (Level 3)
        const subSubDocs = [];
        if (sub.subsubcategories) {
          for (const subsub of sub.subsubcategories) {
            const subSubCat = await Category.findOneAndUpdate(
              { slug: subsub.slug },
              {
                name: subsub.name,
                slug: subsub.slug,
                image: '',
                parent: subCat._id,
                order: subsub.order,
              },
              { upsert: true, new: true }
            );
            subSubDocs.push(subSubCat);
          }
        }

        subDocs.push({ sub: subCat, subsubcategories: subSubDocs });
      }

      createdCategories.push({
        main: mainCat,
        subcategories: subDocs,
      });
    }

    // Assign products to 3rd-layer subsubcategories if applicable
    const mouseBtSub = await Category.findOne({ slug: 'bluetooth-mouse' });
    const mouseWiredSub = await Category.findOne({ slug: 'wired-mouse' });
    const kbdWirelessSub = await Category.findOne({ slug: 'wireless-keyboards' });

    const allProducts = await Product.find({});
    for (const prod of allProducts) {
      const lowerName = prod.name.toLowerCase();

      if (lowerName.includes('mouse') && lowerName.includes('wireless')) {
        if (mouseBtSub) prod.subsubcategory = mouseBtSub._id;
      } else if (lowerName.includes('mouse') && lowerName.includes('wired')) {
        if (mouseWiredSub) prod.subsubcategory = mouseWiredSub._id;
      } else if (lowerName.includes('keyboard') && lowerName.includes('wireless')) {
        if (kbdWirelessSub) prod.subsubcategory = kbdWirelessSub._id;
      }

      await prod.save();
    }

    return NextResponse.json({
      success: true,
      message: '3-tier categories taxonomy successfully seeded to MongoDB!',
      categoriesCount: createdCategories.length,
    });
  } catch (error: any) {
    console.error('Seed categories error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
