import React from 'react';
import HeaderClient from './HeaderClient';

const HARDCODED_NAVBAR_CATEGORIES = [
  {
    _id: 'nav-1',
    name: 'PC Components',
    slug: 'pc-components',
    order: 1,
    subcategories: [
      { _id: 'nav-sub-1', name: 'Graphics Cards (GPUs)', slug: 'pc-components', order: 1 },
      { _id: 'nav-sub-2', name: 'Processors (CPUs)', slug: 'pc-components', order: 2 },
      { _id: 'nav-sub-3', name: 'Motherboards', slug: 'pc-components', order: 3 },
      { _id: 'nav-sub-4', name: 'DDR4 & DDR5 RAM', slug: 'pc-components', order: 4 },
    ],
  },
  {
    _id: 'nav-2',
    name: 'Storage & NAS',
    slug: 'storage-nas',
    order: 2,
    subcategories: [
      { _id: 'nav-sub-5', name: 'NVMe M.2 SSDs', slug: 'storage-nas', order: 1 },
      { _id: 'nav-sub-6', name: 'Enterprise NAS Drives', slug: 'storage-nas', order: 2 },
    ],
  },
  {
    _id: 'nav-3',
    name: 'Peripherals',
    slug: 'peripherals',
    order: 3,
    subcategories: [
      { _id: 'nav-sub-7', name: 'Keyboards', slug: 'peripherals', order: 1 },
      { _id: 'nav-sub-8', name: 'Mouse', slug: 'peripherals', order: 2 },
      { _id: 'nav-sub-9', name: 'Headphones', slug: 'peripherals', order: 3 },
    ],
  },
  {
    _id: 'nav-4',
    name: 'Monitors & Displays',
    slug: 'monitors-display',
    order: 4,
    subcategories: [
      { _id: 'nav-sub-10', name: 'Gaming Monitors', slug: 'monitors-display', order: 1 },
      { _id: 'nav-sub-11', name: 'Ultra-wide Displays', slug: 'monitors-display', order: 2 },
    ],
  },
  {
    _id: 'nav-5',
    name: 'Network & Security',
    slug: 'network-security',
    order: 5,
    subcategories: [
      { _id: 'nav-sub-12', name: 'CCTV Cameras', slug: 'network-security', order: 1 },
      { _id: 'nav-sub-13', name: 'WiFi Routers & Switches', slug: 'network-security', order: 2 },
    ],
  },
  {
    _id: 'nav-6',
    name: 'Accessories',
    slug: 'accessories',
    order: 6,
    subcategories: [
      { _id: 'nav-sub-14', name: 'Cables & Adapters', slug: 'accessories', order: 1 },
      { _id: 'nav-sub-15', name: 'Monitor Arms', slug: 'accessories', order: 2 },
    ],
  },
];

export default function Header() {
  return <HeaderClient categories={HARDCODED_NAVBAR_CATEGORIES} />;
}
