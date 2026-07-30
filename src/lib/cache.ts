import { unstable_cache } from 'next/cache';
import dbConnect from '@/lib/db';
import Category from '@/models/Category';
import Product from '@/models/Product';

// 30 Days Revalidation in seconds (30 days * 24h * 60m * 60s)
const THIRTY_DAYS_SECONDS = 2592000;

// 1. Cached Main Categories Taxonomy (30 days cache, tag 'categories')
export const getCachedMainCategories = unstable_cache(
  async () => {
    try {
      await dbConnect();
      const mainCats = await Category.find({ parent: null })
        .sort({ order: 1, name: 1 })
        .lean();
      return JSON.parse(JSON.stringify(mainCats));
    } catch (error) {
      console.error('Error in getCachedMainCategories:', error);
      return [];
    }
  },
  ['sait-main-categories-key'],
  { revalidate: THIRTY_DAYS_SECONDS, tags: ['categories'] }
);

// 2. Cached Full Category Tree by Slug (30 days cache, tag 'categories')
export const getCachedCategoryBySlug = unstable_cache(
  async (slug: string) => {
    try {
      await dbConnect();
      const target = await Category.findOne({ slug }).lean();
      if (!target) return null;

      let subcategories: any[] = [];
      if (!target.parent) {
        const rawSubs = await Category.find({ parent: target._id }).sort({ order: 1, name: 1 }).lean();
        subcategories = await Promise.all(
          rawSubs.map(async (sub) => {
            const subsubs = await Category.find({ parent: sub._id }).sort({ order: 1, name: 1 }).lean();
            return {
              ...sub,
              subsubcategories: JSON.parse(JSON.stringify(subsubs)),
            };
          })
        );
      } else {
        const parentCategory = await Category.findById(target.parent).lean();
        if (parentCategory && !parentCategory.parent) {
          const rawSubs = await Category.find({ parent: parentCategory._id }).sort({ order: 1, name: 1 }).lean();
          subcategories = await Promise.all(
            rawSubs.map(async (sub) => {
              const subsubs = await Category.find({ parent: sub._id }).sort({ order: 1, name: 1 }).lean();
              return {
                ...sub,
                subsubcategories: JSON.parse(JSON.stringify(subsubs)),
              };
            })
          );
        }
      }

      return {
        targetCategory: JSON.parse(JSON.stringify(target)),
        subcategories: JSON.parse(JSON.stringify(subcategories)),
      };
    } catch (error) {
      console.error('Error in getCachedCategoryBySlug:', error);
      return null;
    }
  },
  ['sait-category-tree-key'],
  { revalidate: THIRTY_DAYS_SECONDS, tags: ['categories'] }
);

// 3. Cached Full Category Page Data (30 days cache, tags ['categories', 'products'])
export const getCachedCategoryPageData = unstable_cache(
  async (slug: string) => {
    try {
      await dbConnect();
      const targetCategory = await Category.findOne({ slug }).lean();
      if (!targetCategory) return null;

      let parentCategoryObj: any = null;
      let mainCategoryObj: any = null;
      let subcategories: any[] = [];
      let products: any[] = [];
      let activeSubcategorySlug = 'all';

      if (!targetCategory.parent) {
        mainCategoryObj = targetCategory;
        const rawSubs = await Category.find({ parent: targetCategory._id }).sort({ order: 1, name: 1 }).lean();
        subcategories = await Promise.all(
          rawSubs.map(async (sub) => {
            const subsubs = await Category.find({ parent: sub._id }).sort({ order: 1, name: 1 }).lean();
            return {
              ...sub,
              _id: sub._id.toString(),
              subsubcategories: JSON.parse(JSON.stringify(subsubs)),
            };
          })
        );
        const subcatIds = rawSubs.map((s) => s._id);
        products = await Product.find({
          $or: [
            { category: targetCategory._id },
            { subcategory: { $in: subcatIds } }
          ]
        }).sort({ createdAt: -1 }).lean();
      } else {
        const parent = await Category.findById(targetCategory.parent).lean();
        if (!parent) return null;

        if (!parent.parent) {
          parentCategoryObj = parent;
          mainCategoryObj = parent;
          activeSubcategorySlug = targetCategory.slug;

          const rawSubs = await Category.find({ parent: parent._id }).sort({ order: 1, name: 1 }).lean();
          subcategories = await Promise.all(
            rawSubs.map(async (sub) => {
              const subsubs = await Category.find({ parent: sub._id }).sort({ order: 1, name: 1 }).lean();
              return {
                ...sub,
                _id: sub._id.toString(),
                subsubcategories: JSON.parse(JSON.stringify(subsubs)),
              };
            })
          );

          const subsubcatIds = (await Category.find({ parent: targetCategory._id })).map((s) => s._id);
          products = await Product.find({
            $or: [
              { subcategory: targetCategory._id },
              { subsubcategory: { $in: subsubcatIds } }
            ]
          }).sort({ createdAt: -1 }).lean();
        } else {
          const grandParent = await Category.findById(parent.parent).lean();
          parentCategoryObj = parent;
          mainCategoryObj = grandParent || parent;
          activeSubcategorySlug = parent.slug;

          const rawSubs = await Category.find({ parent: mainCategoryObj._id }).sort({ order: 1, name: 1 }).lean();
          subcategories = await Promise.all(
            rawSubs.map(async (sub) => {
              const subsubs = await Category.find({ parent: sub._id }).sort({ order: 1, name: 1 }).lean();
              return {
                ...sub,
                _id: sub._id.toString(),
                subsubcategories: JSON.parse(JSON.stringify(subsubs)),
              };
            })
          );

          products = await Product.find({ subsubcategory: targetCategory._id }).sort({ createdAt: -1 }).lean();
        }
      }

      return {
        targetCategory: JSON.parse(JSON.stringify(targetCategory)),
        mainCategory: mainCategoryObj ? JSON.parse(JSON.stringify(mainCategoryObj)) : null,
        parentCategory: parentCategoryObj ? JSON.parse(JSON.stringify(parentCategoryObj)) : null,
        subcategories: JSON.parse(JSON.stringify(subcategories)),
        products: JSON.parse(JSON.stringify(products)),
        activeSubcategorySlug,
      };
    } catch (error) {
      console.error('Error in getCachedCategoryPageData:', error);
      return null;
    }
  },
  ['sait-category-page-data-key'],
  { revalidate: THIRTY_DAYS_SECONDS, tags: ['categories', 'products'] }
);

// 4. Cached Subcategory Page Data (30 days cache, tags ['categories', 'products'])
export const getCachedSubcategoryPageData = unstable_cache(
  async (subslug: string) => {
    try {
      await dbConnect();
      const targetCategory = await Category.findOne({ slug: subslug }).lean();
      if (!targetCategory || !targetCategory.parent) return null;

      const parentCategory = await Category.findById(targetCategory.parent).lean();
      if (!parentCategory) return null;

      const rawSubs = await Category.find({ parent: parentCategory._id }).sort({ order: 1, name: 1 }).lean();
      const subcategories = await Promise.all(
        rawSubs.map(async (sub) => {
          const subsubs = await Category.find({ parent: sub._id }).sort({ order: 1, name: 1 }).lean();
          return {
            ...sub,
            _id: sub._id.toString(),
            subsubcategories: JSON.parse(JSON.stringify(subsubs)),
          };
        })
      );

      const subsubcatIds = (await Category.find({ parent: targetCategory._id })).map((s) => s._id);
      const products = await Product.find({
        $or: [
          { subcategory: targetCategory._id },
          { subsubcategory: { $in: subsubcatIds } }
        ]
      }).sort({ createdAt: -1 }).lean();

      return {
        targetCategory: JSON.parse(JSON.stringify(targetCategory)),
        parentCategory: JSON.parse(JSON.stringify(parentCategory)),
        subcategories: JSON.parse(JSON.stringify(subcategories)),
        products: JSON.parse(JSON.stringify(products)),
      };
    } catch (error) {
      console.error('Error in getCachedSubcategoryPageData:', error);
      return null;
    }
  },
  ['sait-subcategory-page-data-key'],
  { revalidate: THIRTY_DAYS_SECONDS, tags: ['categories', 'products'] }
);

// 5. Cached Product Detail Page Data (30 days cache, tags ['products', 'categories'])
export const getCachedProductDetailPage = unstable_cache(
  async (slug: string) => {
    try {
      await dbConnect();
      const product = await Product.findOne({ slug }).lean();
      if (!product) return null;

      const categoryDoc = await Category.findById(product.category).lean();
      const subcategoryDoc = product.subcategory
        ? await Category.findById(product.subcategory).lean()
        : null;

      const relatedProducts = await Product.find({
        category: product.category,
        _id: { $ne: product._id },
      })
        .limit(4)
        .lean();

      const serializedProduct = {
        ...JSON.parse(JSON.stringify(product)),
        category: categoryDoc
          ? { _id: categoryDoc._id.toString(), name: categoryDoc.name, slug: categoryDoc.slug }
          : { _id: '', name: 'Hardware', slug: 'all' },
        subcategory: subcategoryDoc
          ? { _id: subcategoryDoc._id.toString(), name: subcategoryDoc.name, slug: subcategoryDoc.slug }
          : undefined,
      };

      return {
        product: serializedProduct,
        relatedProducts: JSON.parse(JSON.stringify(relatedProducts)),
      };
    } catch (error) {
      console.error('Error in getCachedProductDetailPage:', error);
      return null;
    }
  },
  ['sait-product-detail-key'],
  { revalidate: THIRTY_DAYS_SECONDS, tags: ['products', 'categories'] }
);
