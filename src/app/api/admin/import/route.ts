import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/db';
import Category from '@/models/Category';
import Product from '@/models/Product';

async function verifyAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('sait_admin_token');
  return token?.value === 'authenticated_session_hash_sait_solutions';
}

// Built-in CSV Parser to avoid external dependencies
function parseCSV(text: string): string[][] {
  const lines: string[][] = [];
  let row: string[] = [''];
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        row[row.length - 1] += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push('');
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      lines.push(row);
      row = [''];
    } else {
      row[row.length - 1] += char;
    }
  }
  if (row.length > 1 || row[0] !== '') {
    lines.push(row);
  }
  return lines;
}

export async function POST(request: Request) {
  try {
    if (!(await verifyAuth())) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { csvText } = await request.json();

    if (!csvText) {
      return NextResponse.json({ success: false, error: 'CSV data is required' }, { status: 400 });
    }

    const rows = parseCSV(csvText);
    if (rows.length < 2) {
      return NextResponse.json({ success: false, error: 'CSV must contain headers and at least one data row' }, { status: 400 });
    }

    const headers = rows[0].map(h => h.trim().toLowerCase());
    const dataRows = rows.slice(1);

    const categoriesCache = await Category.find({}).lean();
    const getCatIdBySlug = (slug: string) => categoriesCache.find(c => c.slug === slug)?._id;

    let importedCount = 0;
    const errors: string[] = [];

    for (let index = 0; index < dataRows.length; index++) {
      const row = dataRows[index];
      if (row.length < headers.length) continue; // Skip empty/corrupted lines

      // Map row columns to header indexes
      const item: Record<string, string> = {};
      headers.forEach((header, colIdx) => {
        item[header] = row[colIdx]?.trim() || '';
      });

      const name = item['name'];
      const brand = item['brand'];
      const description = item['description'];
      const mrp = parseFloat(item['mrp']);
      const offerPrice = item['offerprice'] ? parseFloat(item['offerprice']) : undefined;
      const stockStatus = item['stockstatus'] || 'In Stock';
      const categorySlug = item['categoryslug'];
      const subcategorySlug = item['subcategoryslug'];
      const specsRaw = item['specs']; // Expected format: "key1:val1|key2:val2" or JSON

      if (!name || !brand || isNaN(mrp) || !categorySlug) {
        errors.push(`Row ${index + 2}: Missing required fields (name, brand, mrp, categoryslug)`);
        continue;
      }

      // Resolve category
      const categoryId = getCatIdBySlug(categorySlug);
      if (!categoryId) {
        errors.push(`Row ${index + 2}: Category slug "${categorySlug}" not found in database. Seed taxonomy first.`);
        continue;
      }

      // Resolve subcategory (optional)
      let subcategoryId = undefined;
      if (subcategorySlug) {
        subcategoryId = getCatIdBySlug(subcategorySlug);
        if (!subcategoryId) {
          errors.push(`Row ${index + 2}: Subcategory slug "${subcategorySlug}" not found.`);
          continue;
        }
      }

      // Parse specs JSON or string (key1:val1|key2:val2)
      let specsObj: Record<string, string> = {};
      if (specsRaw) {
        try {
          if (specsRaw.startsWith('{')) {
            specsObj = JSON.parse(specsRaw);
          } else {
            specsRaw.split('|').forEach(pair => {
              const [key, value] = pair.split(':');
              if (key && value) {
                specsObj[key.trim()] = value.trim();
              }
            });
          }
        } catch (e) {
          errors.push(`Row ${index + 2}: Failed to parse specs field`);
        }
      }

      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      // Upsert product (update if slug exists, else insert)
      await Product.findOneAndUpdate(
        { slug },
        {
          name,
          slug,
          brand,
          description: description || name,
          mrp,
          offerPrice,
          stockStatus,
          category: categoryId,
          subcategory: subcategoryId,
          specs: specsObj,
          images: ['/logo.png'],
        },
        { upsert: true, new: true }
      );

      importedCount++;
    }

    return NextResponse.json({
      success: true,
      importedCount,
      errorsCount: errors.length,
      errors,
    });
  } catch (error: any) {
    console.error('Import failed:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
