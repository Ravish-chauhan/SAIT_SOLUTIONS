import React from 'react';
import HeroCarousel from '@/components/HeroCarousel';
import CategoriesCarousel from '@/components/CategoriesCarousel';
import FeaturedProductsCarousel from '@/components/FeaturedProductsCarousel';
import PromoLongBanner from '@/components/PromoLongBanner';
import BestSellersByCategory from '@/components/BestSellersByCategory';
import PeripheralZone from '@/components/PeripheralZone';
import SideBySideBanners from '@/components/SideBySideBanners';
import NeedHelpSection from '@/components/NeedHelpSection';
import ValueTrustStrip from '@/components/ValueTrustStrip';

export const revalidate = 3600; // ISR: Revalidate page every hour

export default async function HomePage() {
  return (
    <div className="w-full">
      {/* Hero Banner Carousel */}
      <HeroCarousel />

      {/* Scrolling Marquee & Categories Carousel Showcase */}
      <CategoriesCarousel />

      {/* Featured Products Carousel Showcase */}
      <FeaturedProductsCarousel />

      {/* Promoted Custom Build Long Banner */}
      <PromoLongBanner />

      {/* Best Sellers by Category Section */}
      <BestSellersByCategory />

      {/* Peripheral Zone Showcase Section */}
      <PeripheralZone />

      {/* Side by Side Dual Banners: Work & Productivity + Network & Security */}
      <SideBySideBanners />

      {/* Need Help Assistance Section */}
      <NeedHelpSection />

      {/* Value Trust Strip (Fast Delivery, 7 Days Returns, Genuine Products, Secure Payments, Expert Support) */}
      <ValueTrustStrip />
    </div>
  );
}
