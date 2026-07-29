import { redirect } from 'next/navigation';

export default function ProductsPage() {
  // Redirect /products directly to /categories so the category page is the main products store page
  redirect('/categories');
}
