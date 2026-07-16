import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Category from '@/models/Category';
import Product from '@/models/Product';

const TAXONOMY = [
  {
    name: 'PC Components',
    slug: 'pc-components',
    subcategories: [
      { name: 'Graphics Cards (GPU)', slug: 'graphics-cards-gpu' },
      { name: 'Processors (CPU)', slug: 'processors-cpu' },
      { name: 'Motherboards', slug: 'motherboards' },
      { name: 'RAM', slug: 'ram' },
      { name: 'Power Supply (PSU)', slug: 'power-supply-psu' },
      { name: 'Cooling (CPU Fan/AIO)', slug: 'cooling-cpu-fan-aio' },
      { name: 'Cabinets', slug: 'cabinets' },
      { name: 'Gaming Cabinets', slug: 'gaming-cabinets' },
    ],
  },
  {
    name: 'Storage & NAS',
    slug: 'storage-nas',
    subcategories: [
      { name: 'NAS Devices', slug: 'nas-devices' },
      { name: 'NAS Hard Drives', slug: 'nas-hard-drives' },
      { name: 'SSDs (Internal/External)', slug: 'ssds-internal-external' },
      { name: 'Hard Drives (HDD Internal/External)', slug: 'hard-drives-hdd-internal-external' },
      { name: 'Pen Drives', slug: 'pen-drives' },
      { name: 'Micro SD Cards', slug: 'micro-sd-cards' },
      { name: 'Storage Accessories', slug: 'storage-accessories' },
    ],
  },
  {
    name: 'Laptop Spares',
    slug: 'laptop-spares',
    subcategories: [
      { name: 'Laptop Chargers/Adapters', slug: 'laptop-chargers-adapters' },
      { name: 'Laptop Batteries', slug: 'laptop-batteries' },
      { name: 'Docking Stations', slug: 'docking-stations' },
      { name: 'Laptop Bags/Backpacks', slug: 'laptop-bags-backpacks' },
      { name: 'Power Cables & Connectors', slug: 'power-cables-connectors' },
    ],
  },
  {
    name: 'Peripherals',
    slug: 'peripherals',
    subcategories: [
      { name: 'Wired/Wireless Keyboards', slug: 'wired-wireless-keyboards' },
      { name: 'Wired/Wireless Mouse', slug: 'wired-wireless-mouse' },
      { name: 'Combos (Wired/Wireless)', slug: 'combos-wired-wireless' },
      { name: 'Headphones/Headsets/Earphones', slug: 'headphones-headsets-earphones' },
      { name: 'Speakers (incl. USB)', slug: 'speakers-usb' },
      { name: 'Cables & Connectors', slug: 'cables-connectors' },
      { name: 'Webcams', slug: 'webcams' },
      { name: 'Power Extension Boxes', slug: 'power-extension-boxes' },
      { name: 'Presenters', slug: 'presenters' },
      { name: 'Remotes', slug: 'remotes' },
    ],
  },
  {
    name: 'Monitors & Display',
    slug: 'monitors-display',
    subcategories: [
      { name: 'Desktop Monitors', slug: 'desktop-monitors' },
      { name: 'Display Monitors', slug: 'display-monitors' },
      { name: 'Projectors', slug: 'projectors' },
    ],
  },
  {
    name: 'Printers',
    slug: 'printers',
    subcategories: [
      { name: 'Ink & Toners/Cartridges', slug: 'ink-toners-cartridges' },
    ],
  },
  {
    name: 'Network & Security',
    slug: 'network-security',
    subcategories: [
      { name: 'Routers & Mesh WiFi', slug: 'routers-mesh-wifi' },
      { name: 'Desktop Switches', slug: 'desktop-switches' },
      { name: 'Access Points', slug: 'access-points' },
      { name: 'PoE Devices (Injectors/Splitters)', slug: 'poe-devices' },
      { name: 'Security Cameras', slug: 'security-cameras' },
      { name: 'Recorders', slug: 'recorders' },
      { name: 'Access Control', slug: 'access-control' },
      { name: 'Network Accessories', slug: 'network-accessories' },
    ],
  },
  {
    name: 'Streaming & Software',
    slug: 'streaming-software',
    subcategories: [
      { name: 'Microphones', slug: 'microphones' },
      { name: 'Audio Interfaces', slug: 'audio-interfaces' },
      { name: 'Capture Cards', slug: 'capture-cards' },
      { name: 'Streaming Kits', slug: 'streaming-kits' },
      { name: 'Antivirus/Software', slug: 'antivirus-software' },
      { name: 'Lamination Machines', slug: 'lamination-machines' },
    ],
  },
  {
    name: 'Conferencing',
    slug: 'conferencing',
    subcategories: [
      { name: 'Conference Cameras', slug: 'conference-cameras' },
      { name: 'Video Conferencing Systems', slug: 'video-conferencing-systems' },
      { name: 'Projector Screens', slug: 'projector-screens' },
    ],
  },
  {
    name: 'Mobile Accessories',
    slug: 'mobile-accessories',
    subcategories: [
      { name: 'Power Banks (Battery)', slug: 'power-banks-battery' },
      { name: 'Chargers', slug: 'chargers' },
      { name: 'USB Cables/Hubs', slug: 'usb-cables-hubs' },
      { name: 'Wireless Chargers', slug: 'wireless-chargers' },
      { name: 'Phone Holders', slug: 'phone-holders' },
      { name: 'Ear Phones', slug: 'ear-phones' },
    ],
  },
];

export async function GET() {
  try {
    await dbConnect();

    // 1. Clear database
    await Category.deleteMany({});
    await Product.deleteMany({});

    console.log('Cleared existing categories and products.');

    // 2. Insert Taxonomy
    for (let i = 0; i < TAXONOMY.length; i++) {
      const parentData = TAXONOMY[i];
      const parentCat = await Category.create({
        name: parentData.name,
        slug: parentData.slug,
        parent: null,
        order: i * 10,
      });

      for (let j = 0; j < parentData.subcategories.length; j++) {
        const subData = parentData.subcategories[j];
        await Category.create({
          name: subData.name,
          slug: subData.slug,
          parent: parentCat._id,
          order: j,
        });
      }
    }

    // Retrieve categories for product seeding
    const allCategories = await Category.find({});
    const getCatIdBySlug = (slug: string) => allCategories.find((c) => c.slug === slug)?._id;

    // 3. Seed Demo Products
    const demoProducts = [
      {
        name: 'Hikvision DS-2CD2043G2-I Outdoor Bullet IP Camera',
        slug: 'hikvision-ds-2cd2043g2-i-bullet-camera',
        description: 'High quality imaging with 4 MP resolution, clear imaging against strong back light due to 120 dB WDR technology, water and dust resistant (IP67).',
        mrp: 7500,
        offerPrice: 5800,
        brand: 'Hikvision',
        specs: {
          'Resolution': '4 MP (2688 × 1520)',
          'Lens': '2.8 mm/4 mm/6 mm fixed lens',
          'Weatherproof': 'IP67 rating',
          'IR Range': 'Up to 40 meters',
          'Tech': 'AcuSense deep learning analytics',
        },
        images: ['/logo.png'],
        stockStatus: 'In Stock',
        category: getCatIdBySlug('network-security'),
        subcategory: getCatIdBySlug('security-cameras'),
        isTrending: true,
      },
      {
        name: 'TP-Link Archer AX73 AX5400 Dual-Band Gigabit Wi-Fi 6 Router',
        slug: 'tp-link-archer-ax73-wifi6-router',
        description: 'Equipped with the top-structure 4T4R and HE160 on the 5 GHz band to enable 4.8 Gbps ultra-fast connections. Supports HomeShield security.',
        mrp: 12999,
        offerPrice: 9499,
        brand: 'TP-Link',
        specs: {
          'Standard': 'Wi-Fi 6 (802.11ax)',
          'Speed': '5400 Mbps (5 GHz: 4804 Mbps, 2.4 GHz: 574 Mbps)',
          'Antennas': '6× High-Performance Antennas',
          'Processor': '1.5 GHz Triple-Core CPU',
        },
        images: ['/logo.png'],
        stockStatus: 'In Stock',
        category: getCatIdBySlug('network-security'),
        subcategory: getCatIdBySlug('routers-mesh-wifi'),
        isTrending: true,
      },
      {
        name: 'Epson CO-W01 WXGA 3000 Lumens Projector',
        slug: 'epson-co-w01-wxga-projector',
        description: 'Create the big screen experience with this high-quality, long-lasting and flexible projector for the home and office, with WXGA resolution.',
        mrp: 45000,
        offerPrice: 38500,
        brand: 'Epson',
        specs: {
          'Resolution': 'WXGA (1280 x 800)',
          'Brightness': '3000 Lumens',
          'Contrast Ratio': '16,000:1',
          'Lamp Life': 'Up to 12,000 hours (Eco mode)',
        },
        images: ['/logo.png'],
        stockStatus: 'In Stock',
        category: getCatIdBySlug('monitors-display'),
        subcategory: getCatIdBySlug('projectors'),
        isTrending: true,
      },
      {
        name: 'Zebronics Woodan Premium Micro-ATX Gaming Cabinet',
        slug: 'zebronics-woodan-premium-cabinet',
        description: 'Sleek design with vertical GPU mount option, perforated metal side panels for optimal ventilation, and compatibility with liquid coolers up to 240mm.',
        mrp: 6999,
        offerPrice: 4999,
        brand: 'Zebronics',
        specs: {
          'Form Factor': 'Micro-ATX / Mini-ITX',
          'Side Panel': 'Perforated / Tempered Glass',
          'USB Ports': '2 x USB 3.0, 1 x HD Audio',
          'VGA Max Length': '330mm',
        },
        images: ['/logo.png'],
        stockStatus: 'In Stock',
        category: getCatIdBySlug('pc-components'),
        subcategory: getCatIdBySlug('gaming-cabinets'),
        isTrending: true,
      },
      {
        name: 'Crucial MX500 1TB SATA 2.5-inch Internal SSD',
        slug: 'crucial-mx500-1tb-sata-ssd',
        description: 'Fly through everything you do. Start up your system in seconds, load files almost instantly, and accelerate the most demanding applications with the Crucial MX500.',
        mrp: 8500,
        offerPrice: 6200,
        brand: 'Crucial',
        specs: {
          'Capacity': '1 TB',
          'Form Factor': '2.5-inch',
          'Read Speed': 'Up to 560 MB/s',
          'Write Speed': 'Up to 510 MB/s',
          'Interface': 'SATA 6.0Gb/s',
        },
        images: ['/logo.png'],
        stockStatus: 'In Stock',
        category: getCatIdBySlug('storage-nas'),
        subcategory: getCatIdBySlug('ssds-internal-external'),
        isTrending: false,
      },
    ];

    await Product.create(demoProducts);

    return NextResponse.json({
      success: true,
      message: 'Seeded database successfully with categories and demo products',
    });
  } catch (error: any) {
    console.error('Seeding failed:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
