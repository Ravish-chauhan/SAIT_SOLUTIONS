'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, MessageSquare, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import EnquiryModal from './EnquiryModal';

interface MockProduct {
  _id: string;
  name: string;
  slug: string;
  description: string;
  mrp: number;
  offerPrice?: number;
  brand: string;
  specs: Record<string, string>;
  images: string[];
  stockStatus: 'In Stock' | 'Out of Stock' | 'Call for Availability';
  rating: number;
  reviewsCount: number;
  discount: number;
}

export default function FeaturedProductsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<MockProduct | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const featuredProducts: MockProduct[] = [
    {
      _id: 'feat-1',
      name: 'HyperX Cloud III Wireless Gaming Headset',
      slug: 'hyperx-cloud-iii-wireless',
      description: 'High-fidelity gaming headphones with crystal-clear spatial audio, ultra-soft memory foam ear pads, and up to 120 hours of battery life.',
      mrp: 14000,
      offerPrice: 11999,
      brand: 'HyperX',
      specs: { 'Connection': '2.4GHz Wireless', 'Battery Life': 'Up to 120 Hours', 'Audio': 'DTS Headphone:X Spatial' },
      images: ['/peripheral_headset.png'],
      stockStatus: 'In Stock',
      rating: 4,
      reviewsCount: 128,
      discount: 20
    },
    {
      _id: 'feat-2',
      name: 'Logitech G413 SE Mechanical Gaming Keyboard',
      slug: 'logitech-g413-se-keyboard',
      description: 'Full-size mechanical gaming keyboard with tactile switches, PBT keycaps, and durable aluminum top case designed for durability and performance.',
      mrp: 7999,
      offerPrice: 6799,
      brand: 'Logitech',
      specs: { 'Switches': 'Tactile Mechanical', 'Keycaps': 'PBT Wear-Resistant', 'Backlight': 'White LED' },
      images: ['/peripheral_keyboard.png'],
      stockStatus: 'In Stock',
      rating: 3.5,
      reviewsCount: 96,
      discount: 15
    },
    {
      _id: 'feat-3',
      name: 'Logitech G502 Hero High Performance Gaming Mouse',
      slug: 'logitech-g502-hero-mouse',
      description: 'Advanced gaming mouse with HERO 25K optical sensor, 11 programmable buttons, adjustable weights, and customizable RGB lighting.',
      mrp: 4999,
      offerPrice: 4499,
      brand: 'Logitech',
      specs: { 'Sensor': 'HERO 25K DPI', 'Buttons': '11 Programmable', 'Weight': 'Adjustable weights included' },
      images: ['/peripheral_mouse.png'],
      stockStatus: 'In Stock',
      rating: 5,
      reviewsCount: 210,
      discount: 10
    },
    {
      _id: 'feat-4',
      name: 'Corsair Vengeance RGB 16GB (8x2) DDR5 5200MHz RAM',
      slug: 'corsair-vengeance-rgb-ddr5-ram',
      description: 'Premium DDR5 memory optimized for Intel motherboards, with dynamic customizable multi-zone RGB lighting and onboard voltage regulation.',
      mrp: 8500,
      offerPrice: 6899,
      brand: 'Corsair',
      specs: { 'Memory Type': 'DDR5 SDRAM', 'Capacity': '16 GB (2 x 8GB)', 'Speed': '5200 MHz' },
      images: ['/ddr4_ram.png'],
      stockStatus: 'In Stock',
      rating: 4,
      reviewsCount: 75,
      discount: 18
    },
    {
      _id: 'feat-5',
      name: 'Cooler Master MWE 650 Bronze V2 Power Supply',
      slug: 'cooler-master-mwe-650-psu',
      description: 'Reliable 80 PLUS Bronze certified non-modular ATX power supply with HDB fan for quiet operation and DC-to-DC circuit design.',
      mrp: 6999,
      offerPrice: 5499,
      brand: 'Cooler Master',
      specs: { 'Efficiency': '80 PLUS Bronze', 'Wattage': '650W', 'Fan': '120mm HDB' },
      images: ['/power_supply.png'],
      stockStatus: 'In Stock',
      rating: 4,
      reviewsCount: 64,
      discount: 21
    },
    {
      _id: 'feat-6',
      name: 'ASUS PRIME B550M-K Gaming Motherboard',
      slug: 'asus-prime-b550m-k',
      description: 'AMD B550 Ultra Durable Micro-ATX motherboard with dual M.2, PCIe 4.0, 1 Gb Ethernet, HDMI/DVI-D/D-Sub, and SATA 6 Gbps.',
      mrp: 12999,
      offerPrice: 9999,
      brand: 'ASUS',
      specs: { 'Chipset': 'AMD B550', 'Form Factor': 'Micro-ATX', 'Socket': 'AM4' },
      images: ['/b550m_motherboard.png'],
      stockStatus: 'In Stock',
      rating: 4.5,
      reviewsCount: 142,
      discount: 23
    },
    {
      _id: 'feat-7',
      name: 'MSI GeForce RTX 4060 Ventus 2X Black OC',
      slug: 'msi-geforce-rtx-4060',
      description: 'NVIDIA Ada Lovelace architecture GPU with DLSS 3, 8GB GDDR6 VRAM, TORX Fan 4.0 cooling system and ultra-sleek black shroud.',
      mrp: 34999,
      offerPrice: 28999,
      brand: 'MSI',
      specs: { 'Memory': '8GB GDDR6', 'Architecture': 'NVIDIA Ada Lovelace', 'Interface': 'PCIe 4.0 x8' },
      images: ['/rtx_gpu.png'],
      stockStatus: 'In Stock',
      rating: 5,
      reviewsCount: 189,
      discount: 17
    },
    {
      _id: 'feat-8',
      name: 'Cooler Master Caliber R2 Ergonomic Gaming Chair',
      slug: 'cooler-master-caliber-r2-chair',
      description: 'Ergonomic gaming seat with breathable PU leather, adjustable armrests, Class 4 gas lift, and 180-degree reclining backrest.',
      mrp: 24999,
      offerPrice: 18999,
      brand: 'Cooler Master',
      specs: { 'Material': 'Breathable PU Leather', 'Recline': '90-180 Degrees', 'Lift': 'Class 4 Gas Lift' },
      images: ['/peripheral_chair.png'],
      stockStatus: 'In Stock',
      rating: 4.5,
      reviewsCount: 88,
      discount: 24
    }
  ];

  const handleScrollEvent = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScrollLeft = scrollWidth - clientWidth;
      if (maxScrollLeft > 0) {
        const progress = (scrollLeft / maxScrollLeft) * 100;
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    }
  };

  useEffect(() => {
    handleScrollEvent();
    window.addEventListener('resize', handleScrollEvent);
    return () => window.removeEventListener('resize', handleScrollEvent);
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardElement = container.querySelector('.shrink-0');
      const cardWidth = cardElement ? cardElement.getBoundingClientRect().width : 265;
      const gap = 24;
      const scrollAmount = cardWidth + gap;

      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="bg-white pt-11 pb-9 md:pt-16 md:pb-11 w-full overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-4 md:px-8">
        
        {/* Header Block with Arrows at Top Right */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
              Featured Products
            </h2>
            <p className="text-xs md:text-sm font-semibold text-slate-400 mt-1 font-sans">
              Top picks for gamers and tech enthusiasts
            </p>
          </div>
          
          {/* Arrow Navigation with Smooth Motion Hover & Tap */}
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleScroll('left')}
              className="w-9 h-9 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors cursor-pointer shadow-sm"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4 text-slate-700" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleScroll('right')}
              className="w-9 h-9 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 transition-colors cursor-pointer shadow-sm"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4 text-slate-700" />
            </motion.button>
          </div>
        </div>

        {/* Horizontal Scrolling Track (Scrollbars completely hidden) */}
        <div
          ref={scrollRef}
          onScroll={handleScrollEvent}
          className="flex gap-3 sm:gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth pb-6 pl-0.5 pt-2 px-0.5 no-scrollbar"
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {/* Custom style injection to hide scrollbars */}
          <style>{`
            .no-scrollbar::-webkit-scrollbar {
              display: none !important;
            }
          `}</style>
          
          {featuredProducts.map((prod, index) => {
            const isWishlisted = !!wishlist[prod._id];
            return (
              <motion.div
                key={`${prod._id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05, ease: 'easeOut' }}
                whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
                className="w-[calc(50%-6px)] min-w-[150px] sm:w-[265px] shrink-0 snap-start bg-white border border-slate-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 relative group"
              >
                <div>
                  {/* Purple Discount Badge */}
                  {prod.discount > 0 && (
                    <span className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 bg-[#5b21b6] text-white text-[8px] sm:text-[9px] font-black tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full z-10 shadow-sm">
                      -{prod.discount}%
                    </span>
                  )}

                  {/* Centered Image Box */}
                  <div className="w-full aspect-[4/3] relative flex items-center justify-center bg-slate-50/50 rounded-lg sm:rounded-xl overflow-hidden mb-2.5 sm:mb-4 border border-slate-50 p-1.5 sm:p-2">
                    <Image
                      src={prod.images[0]}
                      alt={prod.name}
                      fill
                      className="object-contain p-1 sm:p-2 group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 150px, 200px"
                    />
                  </div>

                  {/* Brand and Name */}
                  <div className="space-y-0.5 sm:space-y-1">
                    <span className="text-[8px] sm:text-[9px] text-slate-400 uppercase tracking-widest font-black block">
                      {prod.brand}
                    </span>
                    <Link
                      href={`/product/${prod.slug}`}
                      className="text-slate-800 hover:text-[#5b21b6] font-bold text-[11px] sm:text-xs line-clamp-2 leading-snug tracking-tight"
                    >
                      {prod.name}
                    </Link>
                  </div>
                </div>

                {/* Bottom Price, Wishlist and Action */}
                <div className="mt-3 sm:mt-4 pt-2 border-t border-slate-50 space-y-2 sm:space-y-3">
                  {/* Price block & Wishlist */}
                  <div className="flex items-center justify-between gap-1 sm:gap-2">
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-2">
                      {prod.offerPrice ? (
                        <>
                          <span className="text-slate-900 font-extrabold text-xs sm:text-base">
                            ₹{prod.offerPrice.toLocaleString('en-IN')}
                          </span>
                          <span className="text-slate-400 text-[9px] sm:text-[10px] line-through">
                            ₹{prod.mrp.toLocaleString('en-IN')}
                          </span>
                        </>
                      ) : (
                        <span className="text-slate-900 font-extrabold text-xs sm:text-base">
                          ₹{prod.mrp.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>

                    {/* Animated Wishlist button */}
                    <motion.button 
                      whileTap={{ scale: 0.85 }}
                      whileHover={{ scale: 1.1 }}
                      onClick={(e) => toggleWishlist(prod._id, e)}
                      className={`p-1 sm:p-1.5 rounded-full border transition-all cursor-pointer ${
                        isWishlisted
                          ? 'bg-red-50 border-red-200 text-red-500 shadow-sm'
                          : 'bg-white border-slate-100 hover:border-red-200 text-slate-400 hover:text-red-500 hover:bg-red-50/50'
                      }`}
                      title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    >
                      <Heart className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isWishlisted ? 'fill-red-500' : ''}`} />
                    </motion.button>
                  </div>

                  {/* Send Enquiry CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedProduct(prod)}
                    className="w-full bg-gradient-to-r from-[#5b21b6] to-[#4c1d95] hover:brightness-110 text-white rounded-lg sm:rounded-xl py-2 sm:py-2.5 transition-all text-[10px] sm:text-xs font-black tracking-wide flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer shadow-sm"
                  >
                    <MessageSquare className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                    <span>Send Enquiry</span>
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Actions Row */}
        <div className="flex justify-end mt-4">
          <Link
            href="/category/pc-components"
            className="text-xs font-black text-[#5b21b6] hover:text-[#4c1d95] transition-colors hover:underline tracking-widest uppercase"
          >
            View All Products →
          </Link>
        </div>

      </div>

      {/* Enquiry Modal overlay */}
      {selectedProduct && (
        <EnquiryModal
          product={{
            name: selectedProduct.name,
            slug: selectedProduct.slug
          }}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}
