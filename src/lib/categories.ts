import dbConnect from '@/lib/db';
import Category from '@/models/Category';

export interface CategoryWithChildren {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  order: number;
  subcategories: {
    _id: string;
    name: string;
    slug: string;
    image?: string;
    order: number;
    subsubcategories?: {
      _id: string;
      name: string;
      slug: string;
      order: number;
    }[];
  }[];
}

export async function getCategoryTaxonomy(): Promise<CategoryWithChildren[]> {
  try {
    await dbConnect();

    const parentCategories = await Category.find({ parent: null })
      .sort({ order: 1, name: 1 })
      .lean();

    const categoriesWithSubs = await Promise.all(
      parentCategories.map(async (parent: any) => {
        const subcategories = await Category.find({ parent: parent._id })
          .sort({ order: 1, name: 1 })
          .lean();

        const subsWithSubSubs = await Promise.all(
          subcategories.map(async (sub: any) => {
            const subsubcategories = await Category.find({ parent: sub._id })
              .sort({ order: 1, name: 1 })
              .lean();

            return {
              _id: sub._id.toString(),
              name: sub.name,
              slug: sub.slug,
              image: sub.image || '',
              order: sub.order || 0,
              subsubcategories: subsubcategories.map((subsub: any) => ({
                _id: subsub._id.toString(),
                name: subsub.name,
                slug: subsub.slug,
                order: subsub.order || 0,
              })),
            };
          })
        );

        return {
          _id: parent._id.toString(),
          name: parent.name,
          slug: parent.slug,
          image: parent.image || '',
          order: parent.order || 0,
          subcategories: subsWithSubSubs,
        };
      })
    );

    return JSON.parse(JSON.stringify(categoriesWithSubs));
  } catch (error) {
    console.error('Error fetching category taxonomy:', error);
    return [];
  }
}
