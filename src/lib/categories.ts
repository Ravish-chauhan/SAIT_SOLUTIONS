import dbConnect from '@/lib/db';
import Category from '@/models/Category';

export interface CategoryWithChildren {
  _id: string;
  name: string;
  slug: string;
  order: number;
  subcategories: {
    _id: string;
    name: string;
    slug: string;
    order: number;
  }[];
}

export async function getCategoryTaxonomy(): Promise<CategoryWithChildren[]> {
  try {
    await dbConnect();
    const allCategories = await Category.find({}).sort({ order: 1 }).lean();
    
    const parents = allCategories.filter((c: any) => !c.parent);
    const children = allCategories.filter((c: any) => c.parent);

    return parents.map((parent: any) => {
      const subs = children
        .filter((c: any) => c.parent.toString() === parent._id.toString())
        .map((c: any) => ({
          _id: c._id.toString(),
          name: c.name,
          slug: c.slug,
          order: c.order,
        }));

      return {
        _id: parent._id.toString(),
        name: parent.name,
        slug: parent.slug,
        order: parent.order,
        subcategories: subs,
      };
    });
  } catch (error) {
    console.error('Error fetching category taxonomy:', error);
    return [];
  }
}
