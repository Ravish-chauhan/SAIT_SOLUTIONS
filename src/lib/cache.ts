import { unstable_cache } from 'next/cache';
import dbConnect from '@/lib/db';
import Category from '@/models/Category';
import Product from '@/models/Product';

// 1. Cached Main Categories Taxonomy (1 hour cache, tag 'categories')
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
  { revalidate: 3600, tags: ['categories'] }
);

// 2. Cached Full Category Tree by Slug (1 hour cache, tag 'categories')
export const getCachedCategoryBySlug = (slug: string) =>
  unstable_cache(
    async () => {
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
    [`sait-category-tree-${slug}`],
    { revalidate: 3600, tags: ['categories'] }
  )();

// 3. Cached Paginated Products (1 hour cache, tag 'products')
export const getCachedPaginatedProducts = (options: {
  categorySlug: string;
  subcategorySlug?: string;
  subsubcategorySlug?: string;
  page?: number;
  limit?: number;
  brand?: string;
  stock?: string;
  sort?: string;
  search?: string;
}) => {
  const {
    categorySlug,
    subcategorySlug = 'all',
    subsubcategorySlug = 'all',
    page = 1,
    limit = 12,
    brand = 'all',
    stock = 'all',
    sort = 'featured',
    search = '',
  } = options;

  const cacheKey = `sait-products-${categorySlug}-${subcategorySlug}-${subsubcategorySlug}-p${page}-l${limit}-b${brand}-s${stock}-srt${sort}-q${search}`;

  return unstable_cache(
    async () => {
      try {
        await dbConnect();
        const targetCategory = await Category.findOne({ slug: categorySlug }).lean();
        if (!targetCategory) return { products: [], totalProducts: 0, totalPages: 1, currentPage: page };

        let query: any = {};

        if (!targetCategory.parent) {
          const rawSubs = await Category.find({ parent: targetCategory._id }).lean();
          const subcatIds = rawSubs.map((s) => s._id);

          if (subcategorySlug !== 'all') {
            const matchedSub = rawSubs.find((s) => s.slug === subcategorySlug);
            if (matchedSub) {
              query.subcategory = matchedSub._id;

              if (subsubcategorySlug !== 'all') {
                const matchedSubSub = await Category.findOne({ parent: matchedSub._id, slug: subsubcategorySlug }).lean();
                if (matchedSubSub) {
                  query.subsubcategory = matchedSubSub._id;
                }
              }
            } else {
              query.subcategory = null;
            }
          } else {
            query.$or = [{ category: targetCategory._id }, { subcategory: { $in: subcatIds } }];
          }
        } else {
          query.subcategory = targetCategory._id;
        }

        if (brand !== 'all') {
          query.brand = brand;
        }

        if (stock !== 'all') {
          query.stockStatus = stock;
        }

        if (search.trim()) {
          const q = search.toLowerCase();
          query.$or = [
            { name: { $regex: q, $options: 'i' } },
            { description: { $regex: q, $options: 'i' } },
            { brand: { $regex: q, $options: 'i' } },
          ];
        }

        let sortOption: any = { createdAt: -1 };
        if (sort === 'price-low') sortOption = { offerPrice: 1, mrp: 1 };
        if (sort === 'price-high') sortOption = { offerPrice: -1, mrp: -1 };
        if (sort === 'name-asc') sortOption = { name: 1 };
        if (sort === 'name-desc') sortOption = { name: -1 };

        const skip = (page - 1) * limit;
        const totalProducts = await Product.countDocuments(query);
        const products = await Product.find(query)
          .sort(sortOption)
          .skip(skip)
          .limit(limit)
          .lean();

        const totalPages = Math.max(1, Math.ceil(totalProducts / limit));

        return {
          products: JSON.parse(JSON.stringify(products)),
          totalProducts,
          totalPages,
          currentPage: page,
        };
      } catch (error) {
        console.error('Error in getCachedPaginatedProducts:', error);
        return { products: [], totalProducts: 0, totalPages: 1, currentPage: page };
      }
    },
    [cacheKey],
    { revalidate: 3600, tags: ['products', 'categories'] }
  )();
};

// 4. Cached Full Category Page Data (1 hour cache, tags ['categories', 'products'])
export const getCachedCategoryPageData = (slug: string) =>
  unstable_cache(
    async () => {
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
    [`sait-category-page-data-${slug}`],
    { revalidate: 3600, tags: ['categories', 'products'] }
  )();

// 5. Cached Subcategory Page Data (1 hour cache, tags ['categories', 'products'])
export const getCachedSubcategoryPageData = (subslug: string) =>
  unstable_cache(
    async () => {
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
    [`sait-subcategory-page-data-${subslug}`],
    { revalidate: 3600, tags: ['categories', 'products'] }
  )();

// 6. Cached Product Detail Page Data (1 hour cache, tags ['products', 'categories'])
export const getCachedProductDetailPage = (slug: string) =>
  unstable_cache(
    async () => {
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
    [`sait-product-detail-${slug}`],
    { revalidate: 3600, tags: ['products', 'categories'] }
  )();


