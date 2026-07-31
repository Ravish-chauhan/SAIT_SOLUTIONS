import React from 'react';
import SearchClient from '@/components/SearchClient';

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q || '';

  return <SearchClient initialQuery={query} />;
}
