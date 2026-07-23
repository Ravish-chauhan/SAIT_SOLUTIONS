'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Cpu, HardDrive, Headphones, Wifi, Smartphone, Heart, MessageSquare, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import EnquiryModal from './EnquiryModal';

interface BestSellerProduct {
  id: string;
  name: string;
  categoryLabel: string;
  mrp: number;
  offerPrice: number;
  image: string;
  slug: string;
}

interface CategoryTabData {
  id: string;
  label: string;
  icon: React.ElementType;
  products: BestSellerProduct[];
}

const CATEGORY_TABS: CategoryTabData[] = [
  {
    id: 'pc-components',
    label: 'PC Components',
    icon: Cpu,
    products: [
      {
        id: 'bs-pc-1',
        name: 'ASUS PRIME B550M-K',
        categoryLabel: 'Motherboard',
        offerPrice: 9999,
        mrp: 12999,
        image: '/b550m_motherboard.png',
        slug: 'asus-prime-b550m-k',
      },
      {
        id: 'bs-pc-2',
        name: 'AMD Ryzen 5 5600X',
        categoryLabel: 'Processor',
        offerPrice: 13499,
        mrp: 16000,
        image: '/ryzen_processor.png',
        slug: 'amd-ryzen-5-5600x',
      },
      {
        id: 'bs-pc-3',
        name: 'MSI GeForce RTX 4060',
        categoryLabel: 'Graphics Card',
        offerPrice: 28999,
        mrp: 34999,
        image: '/rtx_gpu.png',
        slug: 'msi-geforce-rtx-4060',
      },
      {
        id: 'bs-pc-4',
        name: 'Corsair Vengeance 16GB',
        categoryLabel: 'RAM DDR4',
        offerPrice: 4299,
        mrp: 5499,
        image: '/ddr4_ram.png',
        slug: 'corsair-vengeance-16gb-ddr4',
      },
      {
        id: 'bs-pc-5',
        name: 'Cooler Master 650W',
        categoryLabel: 'Power Supply',
        offerPrice: 5499,
        mrp: 6999,
        image: '/power_supply.png',
        slug: 'cooler-master-650w-psu',
      },
      {
        id: 'bs-pc-6',
        name: 'Intel Core i5-13400F',
        categoryLabel: 'Processor',
        offerPrice: 18499,
        mrp: 22000,
        image: '/ryzen_processor.png',
        slug: 'intel-core-i5-13400f',
      },
      {
        id: 'bs-pc-7',
        name: 'Gigabyte B760M DS3H',
        categoryLabel: 'Motherboard',
        offerPrice: 11899,
        mrp: 14999,
        image: '/b550m_motherboard.png',
        slug: 'gigabyte-b760m-ds3h',
      },
      {
        id: 'bs-pc-8',
        name: 'Zotac RTX 4070 Twin Edge',
        categoryLabel: 'Graphics Card',
        offerPrice: 54999,
        mrp: 62999,
        image: '/rtx_gpu.png',
        slug: 'zotac-rtx-4070-twin-edge',
      },
      {
        id: 'bs-pc-9',
        name: 'G.Skill Ripjaws V 32GB',
        categoryLabel: 'RAM DDR5',
        offerPrice: 9499,
        mrp: 11999,
        image: '/ddr4_ram.png',
        slug: 'gskill-ripjaws-32gb-ddr5',
      },
      {
        id: 'bs-pc-10',
        name: 'Deepcool PM750D 750W',
        categoryLabel: 'Gold Power Supply',
        offerPrice: 6899,
        mrp: 8499,
        image: '/power_supply.png',
        slug: 'deepcool-pm750d-psu',
      },
    ],
  },
  {
    id: 'storage',
    label: 'Storage',
    icon: HardDrive,
    products: [
      {
        id: 'bs-st-1',
        name: 'Crucial MX500 1TB SSD',
        categoryLabel: 'Internal SSD',
        offerPrice: 6200,
        mrp: 8500,
        image: '/category/pc components.webp',
        slug: 'crucial-mx500-1tb-ssd',
      },
      {
        id: 'bs-st-2',
        name: 'WD Purple 4TB Surveillance',
        categoryLabel: 'NAS HDD',
        offerPrice: 8499,
        mrp: 10999,
        image: '/category/NAS-Storage.webp',
        slug: 'wd-purple-4tb-hdd',
      },
      {
        id: 'bs-st-3',
        name: 'SanDisk Ultra 128GB USB 3.0',
        categoryLabel: 'Pen Drive',
        offerPrice: 1199,
        mrp: 1799,
        image: '/category/NAS-Storage.webp',
        slug: 'sandisk-ultra-128gb',
      },
      {
        id: 'bs-st-4',
        name: 'Seagate Expansion 2TB',
        categoryLabel: 'External Hard Drive',
        offerPrice: 5899,
        mrp: 7499,
        image: '/category/NAS-Storage.webp',
        slug: 'seagate-expansion-2tb',
      },
      {
        id: 'bs-st-5',
        name: 'Samsung 980 PRO 1TB NVMe',
        categoryLabel: 'M.2 PCIe SSD',
        offerPrice: 9299,
        mrp: 12499,
        image: '/category/pc components.webp',
        slug: 'samsung-980-pro-1tb',
      },
      {
        id: 'bs-st-6',
        name: 'Kingston NV2 2TB NVMe SSD',
        categoryLabel: 'PCIe 4.0 SSD',
        offerPrice: 10499,
        mrp: 13999,
        image: '/category/pc components.webp',
        slug: 'kingston-nv2-2tb-ssd',
      },
      {
        id: 'bs-st-7',
        name: 'WD Red Pro 8TB NAS Drive',
        categoryLabel: 'Enterprise NAS',
        offerPrice: 21499,
        mrp: 26999,
        image: '/category/NAS-Storage.webp',
        slug: 'wd-red-pro-8tb',
      },
      {
        id: 'bs-st-8',
        name: 'SanDisk Extreme PRO 256GB',
        categoryLabel: 'Micro SDXC',
        offerPrice: 3299,
        mrp: 4500,
        image: '/category/NAS-Storage.webp',
        slug: 'sandisk-extreme-pro-256gb',
      },
      {
        id: 'bs-st-9',
        name: 'Crucial P3 500GB NVMe M.2',
        categoryLabel: 'Budget SSD',
        offerPrice: 3499,
        mrp: 4799,
        image: '/category/pc components.webp',
        slug: 'crucial-p3-500gb-ssd',
      },
      {
        id: 'bs-st-10',
        name: 'Toshiba Canvio Basics 1TB',
        categoryLabel: 'Portable Storage',
        offerPrice: 4299,
        mrp: 5699,
        image: '/category/NAS-Storage.webp',
        slug: 'toshiba-canvio-basics-1tb',
      },
    ],
  },
  {
    id: 'peripherals',
    label: 'Peripherals',
    icon: Headphones,
    products: [
      {
        id: 'bs-pe-1',
        name: 'Logitech G Pro X Keyboard',
        categoryLabel: 'Mechanical Keyboard',
        offerPrice: 10499,
        mrp: 13999,
        image: '/peripheral_keyboard.png',
        slug: 'logitech-g-pro-x-keyboard',
      },
      {
        id: 'bs-pe-2',
        name: 'Razer DeathAdder V2',
        categoryLabel: 'Gaming Mouse',
        offerPrice: 5499,
        mrp: 6999,
        image: '/peripheral_mouse.png',
        slug: 'razer-deathadder-v2-mouse',
      },
      {
        id: 'bs-pe-3',
        name: 'HyperX Cloud III Wireless',
        categoryLabel: 'Gaming Headset',
        offerPrice: 12499,
        mrp: 15999,
        image: '/peripheral_headset.png',
        slug: 'hyperx-cloud-iii-headset',
      },
      {
        id: 'bs-pe-4',
        name: 'Cooler Master Caliber R2',
        categoryLabel: 'Gaming Chair',
        offerPrice: 18999,
        mrp: 24999,
        image: '/peripheral_chair.png',
        slug: 'cooler-master-caliber-r2-chair',
      },
      {
        id: 'bs-pe-5',
        name: 'Logitech C922 Pro Stream',
        categoryLabel: 'Full HD Webcam',
        offerPrice: 6199,
        mrp: 8999,
        image: '/peripheral_webcam.png',
        slug: 'logitech-c922-pro-webcam',
      },
      {
        id: 'bs-pe-6',
        name: 'Logitech G502 Hero Mouse',
        categoryLabel: 'RGB Gaming Mouse',
        offerPrice: 4499,
        mrp: 5999,
        image: '/peripheral_mouse.png',
        slug: 'logitech-g502-hero',
      },
      {
        id: 'bs-pe-7',
        name: 'Corsair K70 RGB PRO Keyboard',
        categoryLabel: 'Mechanical Keyboard',
        offerPrice: 13999,
        mrp: 17999,
        image: '/peripheral_keyboard.png',
        slug: 'corsair-k70-rgb-pro',
      },
      {
        id: 'bs-pe-8',
        name: 'Razer Kraken V3 Headset',
        categoryLabel: 'Surround Sound Headset',
        offerPrice: 8999,
        mrp: 11999,
        image: '/peripheral_headset.png',
        slug: 'razer-kraken-v3-headset',
      },
      {
        id: 'bs-pe-9',
        name: 'Elgato Facecam 1080p60',
        categoryLabel: 'Pro Streaming Cam',
        offerPrice: 14999,
        mrp: 18999,
        image: '/peripheral_webcam.png',
        slug: 'elgato-facecam-1080p',
      },
      {
        id: 'bs-pe-10',
        name: 'Secretlab TITAN EVO Chair',
        categoryLabel: 'Premium Ergonomic Chair',
        offerPrice: 34999,
        mrp: 42999,
        image: '/peripheral_chair.png',
        slug: 'secretlab-titan-evo-chair',
      },
    ],
  },
  {
    id: 'network',
    label: 'Network',
    icon: Wifi,
    products: [
      {
        id: 'bs-nw-1',
        name: 'TP-Link Archer AX73 AX5400',
        categoryLabel: 'Wi-Fi 6 Router',
        offerPrice: 9499,
        mrp: 12999,
        image: '/cctv-security.png',
        slug: 'tp-link-archer-ax73-wifi6-router',
      },
      {
        id: 'bs-nw-2',
        name: 'Hikvision DS-2CD2043G2 Bullet',
        categoryLabel: 'Security Camera',
        offerPrice: 5800,
        mrp: 7500,
        image: '/cctv-security.png',
        slug: 'hikvision-ds-2cd2043g2-i-bullet-camera',
      },
      {
        id: 'bs-nw-3',
        name: 'Netgear 8-Port Gigabit Switch',
        categoryLabel: 'Unmanaged Switch',
        offerPrice: 2499,
        mrp: 3499,
        image: '/banner-security.png',
        slug: 'netgear-8-port-gigabit-switch',
      },
      {
        id: 'bs-nw-4',
        name: 'Ubiquiti UniFi 6 Lite AP',
        categoryLabel: 'Access Point',
        offerPrice: 11499,
        mrp: 14999,
        image: '/hero-security.png',
        slug: 'ubiquiti-unifi-6-lite-ap',
      },
      {
        id: 'bs-nw-5',
        name: 'D-Link AC1200 Range Extender',
        categoryLabel: 'Wi-Fi Extender',
        offerPrice: 1899,
        mrp: 2799,
        image: '/cctv-security.png',
        slug: 'd-link-ac1200-range-extender',
      },
      {
        id: 'bs-nw-6',
        name: 'TP-Link Deco X20 Mesh 3-Pack',
        categoryLabel: 'Mesh Wi-Fi System',
        offerPrice: 16999,
        mrp: 21999,
        image: '/cctv-security.png',
        slug: 'tp-link-deco-x20-3pack',
      },
      {
        id: 'bs-nw-7',
        name: 'Hikvision 8 Channel NVR',
        categoryLabel: 'Network Video Recorder',
        offerPrice: 7999,
        mrp: 10499,
        image: '/cctv-security.png',
        slug: 'hikvision-8ch-nvr',
      },
      {
        id: 'bs-nw-8',
        name: 'Cisco Business 110 16-Port Switch',
        categoryLabel: 'Rackmount Switch',
        offerPrice: 6899,
        mrp: 8999,
        image: '/banner-security.png',
        slug: 'cisco-16-port-switch',
      },
      {
        id: 'bs-nw-9',
        name: 'CP PLUS Outdoor PTZ Dome Cam',
        categoryLabel: '360 PTZ Camera',
        offerPrice: 8499,
        mrp: 11500,
        image: '/cctv-security.png',
        slug: 'cp-plus-ptz-dome-camera',
      },
      {
        id: 'bs-nw-10',
        name: 'MikroTik hEX S Gigabit Router',
        categoryLabel: 'SFP Routerboard',
        offerPrice: 5299,
        mrp: 6999,
        image: '/hero-security.png',
        slug: 'mikrotik-hex-s-router',
      },
    ],
  },
  {
    id: 'accessories',
    label: 'Accessories',
    icon: Smartphone,
    products: [
      {
        id: 'bs-ac-1',
        name: 'Anker 65W GaN Fast Charger',
        categoryLabel: 'Power Adapter',
        offerPrice: 3299,
        mrp: 4499,
        image: '/hero-accessories.png',
        slug: 'anker-65w-gan-charger',
      },
      {
        id: 'bs-ac-2',
        name: 'Baseus 8-in-1 USB-C Hub',
        categoryLabel: 'Docking Station',
        offerPrice: 2499,
        mrp: 3999,
        image: '/banner-accessories.png',
        slug: 'baseus-8in1-usbc-hub',
      },
      {
        id: 'bs-ac-3',
        name: 'AmazonBasics High-Speed HDMI 2.1',
        categoryLabel: 'Display Cable',
        offerPrice: 799,
        mrp: 1299,
        image: '/banner-accessories.png',
        slug: 'amazonbasics-hdmi-21-cable',
      },
      {
        id: 'bs-ac-4',
        name: 'Portronics RGB Laptop Cooler',
        categoryLabel: 'Cooling Pad',
        offerPrice: 1499,
        mrp: 2199,
        image: '/category/accessories.jpg',
        slug: 'portronics-laptop-cooling-pad',
      },
      {
        id: 'bs-ac-5',
        name: 'North Bayou Dual Monitor Arm',
        categoryLabel: 'Desk Mount',
        offerPrice: 2999,
        mrp: 4500,
        image: '/category/accessories.jpg',
        slug: 'north-bayou-dual-monitor-arm',
      },
      {
        id: 'bs-ac-6',
        name: 'Logitech MX Palm Rest',
        categoryLabel: 'Ergonomic Wrist Support',
        offerPrice: 1299,
        mrp: 1799,
        image: '/hero-accessories.png',
        slug: 'logitech-mx-palm-rest',
      },
      {
        id: 'bs-ac-7',
        name: 'UGREEN 100W USB-C Braided Cable',
        categoryLabel: 'Charging Cable',
        offerPrice: 899,
        mrp: 1399,
        image: '/banner-accessories.png',
        slug: 'ugreen-100w-usbc-cable',
      },
      {
        id: 'bs-ac-8',
        name: 'Belkin 4-Way Surge Protector',
        categoryLabel: 'Power Extension Box',
        offerPrice: 1699,
        mrp: 2299,
        image: '/hero-accessories.png',
        slug: 'belkin-4way-surge-protector',
      },
      {
        id: 'bs-ac-9',
        name: 'Razer Gigantus V2 XXL Pad',
        categoryLabel: 'Extended Mouse Pad',
        offerPrice: 2199,
        mrp: 2999,
        image: '/category/accessories.jpg',
        slug: 'razer-gigantus-v2-xxl',
      },
      {
        id: 'bs-ac-10',
        name: 'Verbatim Universal Travel Adapter',
        categoryLabel: 'International Adapter',
        offerPrice: 1899,
        mrp: 2699,
        image: '/banner-accessories.png',
        slug: 'verbatim-travel-adapter',
      },
    ],
  },
];

export default function BestSellersByCategory() {
  const [activeTabId, setActiveTabId] = useState<string>('pc-components');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<BestSellerProduct | null>(null);
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  const activeTab = CATEGORY_TABS.find((t) => t.id === activeTabId) || CATEGORY_TABS[0];

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardElement = container.querySelector('.shrink-0');
      const cardWidth = cardElement ? cardElement.getBoundingClientRect().width : 210;
      const gap = 16;
      const scrollAmount = (cardWidth + gap) * 2;

      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="w-full pt-4 md:pt-6 pb-6 md:pb-10 bg-white overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-4 md:px-8">
        
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
            Best Sellers by Category
          </h2>
        </div>

        {/* Category Tabs Row with Smooth Sliding Active Indicator Pill */}
        <div className="flex justify-center mb-8 px-2">
          <div className="inline-flex items-center gap-4 sm:gap-8 overflow-x-auto no-scrollbar px-4 sm:px-8 relative">
            {CATEGORY_TABS.map((tab) => {
              const IconComp = tab.icon;
              const isActive = tab.id === activeTabId;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`relative flex items-center gap-2 text-xs sm:text-sm pb-3.5 transition-colors cursor-pointer whitespace-nowrap px-2.5 z-10 ${
                    isActive
                      ? 'text-[#5b21b6] font-extrabold'
                      : 'text-slate-500 hover:text-slate-900 font-semibold'
                  }`}
                >
                  <IconComp className={`w-4 h-4 transition-colors ${isActive ? 'text-[#5b21b6]' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                  
                  {/* Smooth Framer Motion Animated Active Indicator Pill */}
                  {isActive && (
                    <motion.span
                      layoutId="activeCategoryPill"
                      className="absolute bottom-0 left-0 right-0 h-[3.5px] bg-[#5b21b6] rounded-full z-10"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Carousel Track Wrapper with Floating Side Arrows */}
        <div className="relative group/carousel">
          
          {/* Left Arrow Button */}
          <button
            onClick={() => handleScroll('left')}
            className="hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-md items-center justify-center transition-all cursor-pointer active:scale-95 z-20 hover:scale-105"
            aria-label="Scroll Left"
          >
            <ChevronLeft className="w-5 h-5 text-slate-700" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => handleScroll('right')}
            className="hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-md items-center justify-center transition-all cursor-pointer active:scale-95 z-20 hover:scale-105"
            aria-label="Scroll Right"
          >
            <ChevronRight className="w-5 h-5 text-slate-700" />
          </button>

          {/* Animated Scrollable Cards Track */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTabId}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              ref={scrollRef}
              className="flex gap-2.5 sm:gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth pb-3 px-0.5 no-scrollbar items-stretch"
              style={{
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              <style>{`
                .no-scrollbar::-webkit-scrollbar {
                  display: none !important;
                }
              `}</style>

              {activeTab.products.map((prod) => {
                const isWishlisted = !!wishlist[prod.id];
                return (
                  <div
                    key={prod.id}
                    className="w-[calc(50%-5px)] min-w-[145px] sm:w-[210px] xl:w-[220px] shrink-0 snap-start bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-4 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative group/card border border-slate-100"
                  >
                    <div>
                      {/* Image Box & Wishlist Button */}
                      <div className="w-full aspect-square relative mb-2 sm:mb-3 bg-slate-50/50 rounded-lg sm:rounded-xl flex items-center justify-center overflow-hidden p-1.5 sm:p-2">
                        <Image
                          src={prod.image}
                          alt={prod.name}
                          fill
                          className="object-contain p-1 group-hover/card:scale-105 transition-transform duration-300"
                          sizes="(max-w-640px) 140px, 200px"
                        />
                        
                        {/* Wishlist Button */}
                        <button
                          onClick={(e) => toggleWishlist(prod.id, e)}
                          className={`absolute top-1.5 right-1.5 sm:top-2 sm:right-2 p-1 sm:p-1.5 rounded-full border transition-all cursor-pointer z-10 ${
                            isWishlisted
                              ? 'bg-red-50 border-red-200 text-red-500 shadow-sm'
                              : 'bg-white/80 backdrop-blur-sm border-slate-100 text-slate-400 hover:text-red-500 hover:bg-white'
                          }`}
                          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                        >
                          <Heart className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isWishlisted ? 'fill-red-500' : ''}`} />
                        </button>
                      </div>

                      {/* Title & Sub-category */}
                      <div className="space-y-0.5 sm:space-y-1">
                        <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm leading-snug group-hover/card:text-[#5b21b6] transition-colors line-clamp-1">
                          {prod.name}
                        </h3>
                        <p className="text-slate-400 text-[10px] sm:text-xs font-semibold line-clamp-1">
                          {prod.categoryLabel}
                        </p>
                      </div>
                    </div>

                    {/* Price & Send Enquiry */}
                    <div className="mt-3 sm:mt-4 pt-2 border-t border-slate-100 space-y-2 sm:space-y-2.5">
                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-2">
                        <span className="text-slate-900 font-extrabold text-xs sm:text-base">
                          ₹{prod.offerPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-slate-400 text-[9px] sm:text-xs line-through">
                          ₹{prod.mrp.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <button
                        onClick={() => setSelectedProduct(prod)}
                        className="w-full bg-gradient-to-r from-[#5b21b6] to-[#4c1d95] hover:brightness-110 text-white rounded-lg sm:rounded-xl py-1.5 sm:py-2 px-2 sm:px-3 transition-all text-[10px] sm:text-xs font-bold tracking-wide flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer shadow-sm active:scale-98"
                      >
                        <MessageSquare className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                        <span>Send Enquiry</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>

        </div>

        {/* Bottom Link */}
        <div className="text-center mt-8">
          <Link
            href={`/category/${activeTab.id}`}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-[#5b21b6] hover:text-[#4c1d95] transition-colors hover:underline tracking-wide"
          >
            <span>View All Best Sellers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* Enquiry Modal */}
      {selectedProduct && (
        <EnquiryModal
          product={{
            name: selectedProduct.name,
            slug: selectedProduct.slug,
          }}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}
