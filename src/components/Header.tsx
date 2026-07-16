import React from 'react';
import HeaderClient from './HeaderClient';
import { getCategoryTaxonomy } from '@/lib/categories';

export default async function Header() {
  const categories = await getCategoryTaxonomy();
  return <HeaderClient categories={categories} />;
}
