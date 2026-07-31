'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  MessageSquare,
  FileSpreadsheet,
  Plus,
  Trash2,
  Edit,
  Save,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Search,
  ExternalLink,
  Tag,
  TrendingUp,
  X,
  Boxes,
  HelpCircle,
  Sparkles,
  UploadCloud,
  Layers,
  ChevronRight
} from 'lucide-react';

interface CategoryData {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  parent?: any;
  order?: number;
}

interface ProductData {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  mrp: number;
  offerPrice?: number;
  brand: string;
  stockStatus: 'In Stock' | 'Out of Stock' | 'Call for Availability';
  category: { _id: string; name: string; slug?: string } | string;
  subcategory?: { _id: string; name: string; slug?: string } | string;
  subsubcategory?: { _id: string; name: string; slug?: string } | string;
  images?: string[];
  specs?: Record<string, string>;
  isTrending?: boolean;
}

interface EnquiryData {
  _id: string;
  productName: string;
  customerName: string;
  customerPhone: string;
  message?: string;
  createdAt: string;
}

interface AdminPanelClientProps {
  initialProducts: ProductData[];
  initialCategories: CategoryData[];
  initialEnquiries: EnquiryData[];
}

export default function AdminPanelClient({
  initialProducts,
  initialCategories,
  initialEnquiries,
}: AdminPanelClientProps) {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'categories' | 'enquiries' | 'import'>('products');
  const [products, setProducts] = useState<ProductData[]>(initialProducts);
  const [categories, setCategories] = useState<CategoryData[]>(initialCategories);
  const [enquiries, setEnquiries] = useState<EnquiryData[]>(initialEnquiries);

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  useEffect(() => {
    setCategories(initialCategories);
  }, [initialCategories]);

  useEffect(() => {
    setEnquiries(initialEnquiries);
  }, [initialEnquiries]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');

  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductData | null>(null);

  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryData | null>(null);

  const [csvText, setCsvText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [inlinePriceUpdates, setInlinePriceUpdates] = useState<
    Record<string, { mrp: number; offerPrice?: number; stockStatus: 'In Stock' | 'Out of Stock' | 'Call for Availability' }>
  >({});

  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Product Form State
  const [productForm, setProductForm] = useState({
    name: '',
    brand: '',
    description: '',
    mrp: '',
    offerPrice: '',
    stockStatus: 'In Stock' as 'In Stock' | 'Out of Stock' | 'Call for Availability',
    categoryId: '',
    subcategoryId: '',
    subsubcategoryId: '',
    imagesInput: '',
    specsInput: '',
    isTrending: false,
  });

  // Key-Value Pair Specification Rows State
  const [specRows, setSpecRows] = useState<{ id: string; key: string; value: string }[]>([
    { id: '1', key: 'Warranty', value: '1 Year' },
    { id: '2', key: 'Condition', value: 'Brand New' },
  ]);

  const addSpecRow = () => {
    setSpecRows((prev) => [...prev, { id: String(Date.now()), key: '', value: '' }]);
  };

  const updateSpecRow = (id: string, field: 'key' | 'value', text: string) => {
    setSpecRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: text } : r)));
  };

  const removeSpecRow = (id: string) => {
    setSpecRows((prev) => prev.filter((r) => r.id !== id));
  };

  // Category Form State
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    slug: '',
    image: '',
    parentId: '',
    order: 0,
  });

  const [isUploadingCloudinary, setIsUploadingCloudinary] = useState(false);

  const compressFileToWebP = (file: File): Promise<File> => {
    return new Promise((resolve) => {
      if (file.type === 'image/webp' || file.type === 'image/gif' || file.type === 'image/svg+xml') {
        resolve(file);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX_SIZE = 1200;

          if (width > MAX_SIZE || height > MAX_SIZE) {
            if (width > height) {
              height = Math.round((height * MAX_SIZE) / width);
              width = MAX_SIZE;
            } else {
              width = Math.round((width * MAX_SIZE) / height);
              height = MAX_SIZE;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(file);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                resolve(file);
                return;
              }
              const webpName = file.name.replace(/\.[^/.]+$/, '') + '.webp';
              const webpFile = new File([blob], webpName, { type: 'image/webp' });
              resolve(webpFile);
            },
            'image/webp',
            0.85
          );
        };
        img.onerror = () => resolve(file);
        img.src = event.target?.result as string;
      };
      reader.onerror = () => resolve(file);
      reader.readAsDataURL(file);
    });
  };

  const handleCloudinaryFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploadingCloudinary(true);
    let successCount = 0;

    try {
      for (let i = 0; i < files.length; i++) {
        const webpFile = await compressFileToWebP(files[i]);
        const formData = new FormData();
        formData.append('file', webpFile);

        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (res.ok && data.success && data.url) {
          setProductForm((prev) => ({
            ...prev,
            imagesInput: prev.imagesInput ? `${prev.imagesInput.trim()}\n${data.url}` : data.url,
          }));
          successCount++;
        } else {
          showToast('error', data.error || 'Cloudinary upload failed.');
        }
      }

      if (successCount > 0) {
        showToast('success', `${successCount} WebP image(s) uploaded to Cloudinary! ☁️`);
      }
    } catch (err) {
      showToast('error', 'Error uploading image to Cloudinary.');
    } finally {
      setIsUploadingCloudinary(false);
      e.target.value = '';
    }
  };

  const handleCloudinaryCategoryFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploadingCloudinary(true);

    try {
      const webpFile = await compressFileToWebP(files[0]);
      const formData = new FormData();
      formData.append('file', webpFile);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success && data.url) {
        setCategoryForm((prev) => ({ ...prev, image: data.url }));
        showToast('success', 'Category WebP image uploaded to Cloudinary! ☁️');
      } else {
        showToast('error', data.error || 'Cloudinary upload failed.');
      }
    } catch (err) {
      showToast('error', 'Error uploading category image to Cloudinary.');
    } finally {
      setIsUploadingCloudinary(false);
      e.target.value = '';
    }
  };

  const showToast = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const getCategoryProductCount = (catId: string) => {
    const childIds: string[] = [];
    const collectChildren = (targetId: string) => {
      categories.forEach((c) => {
        if (!c.parent) return;
        const pid = typeof c.parent === 'object' ? c.parent._id : c.parent;
        if (String(pid) === String(targetId)) {
          childIds.push(c._id);
          collectChildren(c._id);
        }
      });
    };
    collectChildren(catId);

    const allCatIds = [catId, ...childIds];

    return products.filter((p) => {
      const pCat = typeof p.category === 'object' ? (p.category as any)?._id : p.category;
      const pSub = typeof p.subcategory === 'object' ? (p.subcategory as any)?._id : p.subcategory;
      const pSubSub = typeof p.subsubcategory === 'object' ? (p.subsubcategory as any)?._id : p.subsubcategory;

      return (
        (pCat && allCatIds.includes(String(pCat))) ||
        (pSub && allCatIds.includes(String(pSub))) ||
        (pSubSub && allCatIds.includes(String(pSubSub)))
      );
    }).length;
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Helper category filters
  const parentCategories = categories.filter((c) => !c.parent);
  const subCategories = categories.filter((c) => {
    if (!c.parent) return false;
    const parentId = typeof c.parent === 'object' ? c.parent._id : c.parent;
    return parentCategories.some((p) => String(p._id) === String(parentId));
  });
  const subsubCategories = categories.filter((c) => {
    if (!c.parent) return false;
    const parentId = typeof c.parent === 'object' ? c.parent._id : c.parent;
    return subCategories.some((sub) => String(sub._id) === String(parentId));
  });

  const getCategoryName = (cat: any) => {
    if (!cat) return '-';
    if (typeof cat === 'object' && cat.name) return cat.name;
    const found = categories.find((c) => c._id === String(cat));
    return found ? found.name : '-';
  };

  // Filtered product list
  const filteredProducts = products.filter((prod) => {
    const matchesSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.brand.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedCategoryFilter !== 'all') {
      const catId = typeof prod.category === 'object' ? prod.category?._id : prod.category;
      const subId = typeof prod.subcategory === 'object' ? prod.subcategory?._id : prod.subcategory;
      const subsubId = typeof prod.subsubcategory === 'object' ? prod.subsubcategory?._id : prod.subsubcategory;

      return (
        String(catId) === selectedCategoryFilter ||
        String(subId) === selectedCategoryFilter ||
        String(subsubId) === selectedCategoryFilter
      );
    }

    return true;
  });

  // Product CRUD
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.brand || !productForm.mrp || !productForm.categoryId) {
      showToast('error', 'Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    const specsMap: Record<string, string> = {};
    specRows.forEach((row) => {
      if (row.key.trim() && row.value.trim()) {
        specsMap[row.key.trim()] = row.value.trim();
      }
    });

    const imagesArray = productForm.imagesInput
      ? productForm.imagesInput.split('\n').map((u) => u.trim()).filter((u) => u.length > 0)
      : [];

    const payload = {
      name: productForm.name,
      brand: productForm.brand,
      description: productForm.description || productForm.name,
      mrp: Number(productForm.mrp),
      offerPrice: productForm.offerPrice ? Number(productForm.offerPrice) : undefined,
      stockStatus: productForm.stockStatus,
      category: productForm.categoryId,
      subcategory: productForm.subcategoryId || undefined,
      subsubcategory: productForm.subsubcategoryId || undefined,
      images: imagesArray.length > 0 ? imagesArray : ['/logo.png'],
      specs: specsMap,
      isTrending: productForm.isTrending,
    };

    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        showToast('success', 'Product created successfully!');
        setProducts([data.product, ...products]);
        setIsAddProductOpen(false);
        setProductForm({
          name: '',
          brand: '',
          description: '',
          mrp: '',
          offerPrice: '',
          stockStatus: 'In Stock',
          categoryId: '',
          subcategoryId: '',
          subsubcategoryId: '',
          imagesInput: '',
          specsInput: '',
          isTrending: false,
        });
        setSpecRows([
          { id: '1', key: 'Warranty', value: '1 Year' },
          { id: '2', key: 'Condition', value: 'Brand New' },
        ]);
        router.refresh();
      } else {
        showToast('error', data.error || 'Failed to create product');
      }
    } catch (err) {
      showToast('error', 'Network error creating product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    setIsSubmitting(true);

    const specsMap: Record<string, string> = {};
    specRows.forEach((row) => {
      if (row.key.trim() && row.value.trim()) {
        specsMap[row.key.trim()] = row.value.trim();
      }
    });

    const imagesArray = productForm.imagesInput
      ? productForm.imagesInput.split('\n').map((u) => u.trim()).filter((u) => u.length > 0)
      : editingProduct.images || [];

    const payload = {
      name: productForm.name,
      brand: productForm.brand,
      description: productForm.description,
      mrp: Number(productForm.mrp),
      offerPrice: productForm.offerPrice ? Number(productForm.offerPrice) : undefined,
      stockStatus: productForm.stockStatus,
      category: productForm.categoryId,
      subcategory: productForm.subcategoryId || undefined,
      subsubcategory: productForm.subsubcategoryId || undefined,
      images: imagesArray,
      specs: specsMap,
      isTrending: productForm.isTrending,
    };

    try {
      const res = await fetch(`/api/admin/products/${editingProduct._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        showToast('success', 'Product updated successfully!');
        setProducts(products.map((p) => (p._id === editingProduct._id ? data.product : p)));
        setEditingProduct(null);
        router.refresh();
      } else {
        showToast('error', data.error || 'Failed to update product');
      }
    } catch (err) {
      showToast('error', 'Error updating product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete product "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast('success', 'Product deleted.');
        setProducts(products.filter((p) => p._id !== id));
        router.refresh();
      } else {
        showToast('error', data.error || 'Failed to delete product.');
      }
    } catch (err) {
      showToast('error', 'Error deleting product.');
    }
  };

  const openEditProductModal = (prod: ProductData) => {
    setEditingProduct(prod);

    const catId = typeof prod.category === 'object' ? prod.category?._id : prod.category;
    const subId = typeof prod.subcategory === 'object' ? prod.subcategory?._id : prod.subcategory;
    const subsubId = typeof prod.subsubcategory === 'object' ? prod.subsubcategory?._id : prod.subsubcategory;

    const initialRows = prod.specs && Object.keys(prod.specs).length > 0
      ? Object.entries(prod.specs).map(([k, v], idx) => ({ id: String(idx + 1), key: k, value: v }))
      : [{ id: '1', key: 'Warranty', value: '1 Year' }, { id: '2', key: 'Condition', value: 'Brand New' }];

    setSpecRows(initialRows);

    setProductForm({
      name: prod.name,
      brand: prod.brand,
      description: prod.description || '',
      mrp: String(prod.mrp),
      offerPrice: prod.offerPrice ? String(prod.offerPrice) : '',
      stockStatus: prod.stockStatus,
      categoryId: catId || '',
      subcategoryId: subId || '',
      subsubcategoryId: subsubId || '',
      imagesInput: (prod.images || []).join('\n'),
      specsInput: '',
      isTrending: prod.isTrending || false,
    });
  };

  // Category CRUD
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryForm.name.trim()) return;

    setIsSubmitting(true);
    try {
      if (editingCategory) {
        // PUT update category
        const res = await fetch(`/api/admin/categories/${editingCategory._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: categoryForm.name.trim(),
            slug: categoryForm.slug.trim(),
            image: categoryForm.image.trim(),
            parent: categoryForm.parentId || null,
            order: categoryForm.order,
          }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          showToast('success', 'Category updated successfully!');
          setCategories(categories.map((c) => (c._id === editingCategory._id ? data.category : c)));
          setEditingCategory(null);
          setIsAddCategoryOpen(false);
          setCategoryForm({ name: '', slug: '', image: '', parentId: '', order: 0 });
          router.refresh();
        } else {
          showToast('error', data.error || 'Failed to update category');
        }
      } else {
        // POST create category
        const res = await fetch('/api/admin/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: categoryForm.name.trim(),
            slug: categoryForm.slug.trim(),
            image: categoryForm.image.trim(),
            parent: categoryForm.parentId || null,
            order: categoryForm.order,
          }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          showToast('success', 'Category created successfully!');
          setCategories([...categories, data.category]);
          setIsAddCategoryOpen(false);
          setCategoryForm({ name: '', slug: '', image: '', parentId: '', order: 0 });
          router.refresh();
        } else {
          showToast('error', data.error || 'Failed to create category');
        }
      }
    } catch (err) {
      showToast('error', 'Error saving category');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async (id: string, name: string) => {
    if (!confirm(`Delete category "${name}"? Nested sub-items may become unassigned.`)) return;

    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast('success', 'Category deleted.');
        setCategories(categories.filter((c) => c._id !== id));
        router.refresh();
      } else {
        showToast('error', data.error || 'Failed to delete category');
      }
    } catch (err) {
      showToast('error', 'Error deleting category');
    }
  };

  const openAddCategoryWithParent = (parentId: string = '') => {
    setEditingCategory(null);
    setCategoryForm({
      name: '',
      slug: '',
      image: '',
      parentId: parentId,
      order: 0,
    });
    setIsAddCategoryOpen(true);
  };

  const openEditCategoryModal = (cat: CategoryData) => {
    setEditingCategory(cat);
    const parentId = typeof cat.parent === 'object' ? cat.parent?._id : cat.parent;
    setCategoryForm({
      name: cat.name,
      slug: cat.slug,
      image: cat.image || '',
      parentId: parentId || '',
      order: cat.order || 0,
    });
    setIsAddCategoryOpen(true);
  };

  // Inline pricing edits
  const handleInlineChange = (id: string, field: 'mrp' | 'offerPrice' | 'stockStatus', value: any) => {
    const current = inlinePriceUpdates[id] || {
      mrp: products.find((p) => p._id === id)?.mrp || 0,
      offerPrice: products.find((p) => p._id === id)?.offerPrice,
      stockStatus: (products.find((p) => p._id === id)?.stockStatus || 'In Stock') as 'In Stock' | 'Out of Stock' | 'Call for Availability',
    };

    setInlinePriceUpdates({
      ...inlinePriceUpdates,
      [id]: {
        ...current,
        [field]: field === 'stockStatus' ? (value as any) : Number(value),
      },
    });
  };

  const handleSaveBulkPricing = async () => {
    const updatesArray = Object.entries(inlinePriceUpdates).map(([id, val]) => ({
      id,
      ...val,
    }));

    if (updatesArray.length === 0) {
      showToast('error', 'No price changes to save.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates: updatesArray }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast('success', 'Spreadsheet pricing updated!');
        setProducts(
          products.map((p) => {
            if (inlinePriceUpdates[p._id]) {
              return { ...p, ...inlinePriceUpdates[p._id] };
            }
            return p;
          })
        );
        setInlinePriceUpdates({});
        router.refresh();
      } else {
        showToast('error', data.error || 'Failed to save bulk prices.');
      }
    } catch (err) {
      showToast('error', 'Error saving prices.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // CSV Import
  const handleCsvImport = async () => {
    if (!csvText.trim()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ csvContent: csvText }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast('success', `Imported ${data.count} products successfully!`);
        setCsvText('');
        router.refresh();
      } else {
        showToast('error', data.error || 'Import failed.');
      }
    } catch (err) {
      showToast('error', 'Error during CSV import.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
      
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-extrabold border ${
            notification.type === 'success'
              ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/50'
              : 'bg-rose-950/90 text-rose-300 border-rose-500/50'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Admin Header Navbar */}
      <header className="bg-slate-900/90 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg font-black text-white text-base tracking-tighter">
              ST
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-white tracking-tight text-sm">Sait Solutions</span>
                <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Store Control Panel
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">B2B Dealer Inventory & Taxonomy Center</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-3.5 py-2 rounded-xl transition-all border border-slate-700 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Store Frontend</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 text-xs font-extrabold px-3.5 py-2 rounded-xl transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 space-y-6">

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto gap-2 border-b border-slate-800 pb-2 scrollbar-none">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'products'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-900/30'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products Inventory ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'categories'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-900/30'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FolderTree className="w-4 h-4" />
            <span>3-Tier Taxonomy ({parentCategories.length} Main Categories)</span>
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center gap-2 transition-all cursor-pointer shrink-0 relative ${
              activeTab === 'enquiries'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-900/30'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Customer Quotes</span>
            {enquiries.length > 0 && (
              <span className="ml-1 bg-amber-500 text-slate-950 font-black text-[10px] px-1.5 py-0.2 rounded-full">
                {enquiries.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('import')}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'import'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-900/30'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>CSV Catalog Import</span>
          </button>
        </div>

        {/* TAB 1: PRODUCTS INVENTORY */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/60 border border-slate-800 p-4 rounded-2xl">
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                {/* Search */}
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search product or brand..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 font-medium"
                  />
                </div>

                {/* Category Filter */}
                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-medium"
                >
                  <option value="all">All Categories ({products.length} Products)</option>
                  {parentCategories.map((main) => {
                    const subs = categories.filter((sub) => {
                      if (!sub.parent) return false;
                      const pid = typeof sub.parent === 'object' ? sub.parent._id : sub.parent;
                      return String(pid) === String(main._id);
                    });

                    const mainCount = getCategoryProductCount(main._id);

                    return (
                      <React.Fragment key={main._id}>
                        <option value={main._id} className="font-bold text-purple-300">
                          📂 {main.name} ({mainCount} items)
                        </option>
                        {subs.map((sub) => {
                          const subsubs = categories.filter((ss) => {
                            if (!ss.parent) return false;
                            const pid = typeof ss.parent === 'object' ? ss.parent._id : ss.parent;
                            return String(pid) === String(sub._id);
                          });

                          const subCount = getCategoryProductCount(sub._id);

                          return (
                            <React.Fragment key={sub._id}>
                              <option value={sub._id} className="text-slate-200">
                                &nbsp;&nbsp;↳ {sub.name} ({subCount} items)
                              </option>
                              {subsubs.map((ss) => {
                                const ssCount = getCategoryProductCount(ss._id);
                                return (
                                  <option key={ss._id} value={ss._id} className="text-slate-400">
                                    &nbsp;&nbsp;&nbsp;&nbsp;• {ss.name} ({ssCount} items)
                                  </option>
                                );
                              })}
                            </React.Fragment>
                          );
                        })}
                      </React.Fragment>
                    );
                  })}
                </select>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                {Object.keys(inlinePriceUpdates).length > 0 && (
                  <button
                    onClick={handleSaveBulkPricing}
                    disabled={isSubmitting}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg animate-pulse"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save {Object.keys(inlinePriceUpdates).length} Price Edits</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setProductForm({
                      name: '',
                      brand: '',
                      description: '',
                      mrp: '',
                      offerPrice: '',
                      stockStatus: 'In Stock',
                      categoryId: parentCategories[0]?._id || '',
                      subcategoryId: '',
                      subsubcategoryId: '',
                      imagesInput: '',
                      specsInput: 'Warranty : 1 Year\nCondition : Brand New',
                      isTrending: false,
                    });
                    setIsAddProductOpen(true);
                  }}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950/80 text-slate-400 font-extrabold uppercase text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="py-3.5 px-4">Product</th>
                      <th className="py-3.5 px-4">Brand</th>
                      <th className="py-3.5 px-4">Category Taxonomy</th>
                      <th className="py-3.5 px-4">MRP (₹)</th>
                      <th className="py-3.5 px-4">Dealer Offer (₹)</th>
                      <th className="py-3.5 px-4">Stock Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-500">
                          No products found matching filters.
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((prod) => (
                        <tr key={prod._id} className="hover:bg-slate-800/50 transition-colors">
                          <td className="py-3 px-4">
                            <div className="font-extrabold text-white">{prod.name}</div>
                            {prod.isTrending && (
                              <span className="inline-flex items-center gap-1 text-[10px] text-amber-400 font-bold mt-0.5">
                                <Sparkles className="w-3 h-3" /> Hot Trending
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 font-bold text-slate-300">{prod.brand}</td>
                          <td className="py-3 px-4 text-slate-400 font-medium">
                            <span className="text-purple-300 font-semibold">{getCategoryName(prod.category)}</span>
                            {prod.subcategory && (
                              <span className="text-slate-400"> → {getCategoryName(prod.subcategory)}</span>
                            )}
                            {prod.subsubcategory && (
                              <span className="text-indigo-300"> → {getCategoryName(prod.subsubcategory)}</span>
                            )}
                          </td>
                          {/* Inline MRP */}
                          <td className="py-3 px-4">
                            <input
                              type="number"
                              defaultValue={prod.mrp}
                              onChange={(e) => handleInlineChange(prod._id, 'mrp', e.target.value)}
                              className="w-24 bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                            />
                          </td>
                          {/* Inline Offer Price */}
                          <td className="py-3 px-4">
                            <input
                              type="number"
                              defaultValue={prod.offerPrice || ''}
                              placeholder="Dealer Quote"
                              onChange={(e) => handleInlineChange(prod._id, 'offerPrice', e.target.value)}
                              className="w-24 bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-xs text-emerald-400 font-bold focus:outline-none focus:border-purple-500 font-mono"
                            />
                          </td>
                          {/* Inline Stock Status */}
                          <td className="py-3 px-4">
                            <select
                              defaultValue={prod.stockStatus}
                              onChange={(e) => handleInlineChange(prod._id, 'stockStatus', e.target.value)}
                              className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-[11px] text-slate-300 focus:outline-none focus:border-purple-500"
                            >
                              <option value="In Stock">In Stock</option>
                              <option value="Call for Availability">Call for Availability</option>
                              <option value="Out of Stock">Out of Stock</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <button
                              onClick={() => openEditProductModal(prod)}
                              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-indigo-300 rounded-lg transition-colors cursor-pointer"
                              title="Edit product"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(prod._id, prod.name)}
                              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-rose-400 rounded-lg transition-colors cursor-pointer"
                              title="Delete product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: 3-TIER CATEGORIES MANAGEMENT */}
        {activeTab === 'categories' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex justify-between items-center bg-slate-900/60 border border-slate-800 p-4 rounded-2xl">
              <div>
                <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-400" /> 3-Tier Store Taxonomy Hierarchy
                </h3>
                <p className="text-xs text-slate-400">Level 1 (Main Category) → Level 2 (Subcategory) → Level 3 (3rd Layer Items)</p>
              </div>
              <button
                onClick={() => openAddCategoryWithParent('')}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Add Main Category</span>
              </button>
            </div>

            {/* 3-Tier Hierarchy Tree Cards */}
            <div className="space-y-4">
              {parentCategories.map((mainCat) => {
                const childSubs = subCategories.filter(
                  (s) => String(typeof s.parent === 'object' ? s.parent?._id : s.parent) === String(mainCat._id)
                );

                return (
                  <div
                    key={mainCat._id}
                    className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg"
                  >
                    {/* Level 1 Main Category Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-700/50 flex items-center justify-center shrink-0">
                          <FolderTree className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-extrabold text-white">{mainCat.name}</h4>
                            <span className="bg-purple-900/40 text-purple-300 border border-purple-700/40 text-[10px] font-bold px-2 py-0.5 rounded-md">
                              Level 1 (Main)
                            </span>
                            <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-700/50 text-[10px] font-black px-2 py-0.5 rounded-md">
                              {getCategoryProductCount(mainCat._id)} Products
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 font-mono">slug: /category/{mainCat.slug}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openAddCategoryWithParent(mainCat._id)}
                          className="bg-purple-900/40 hover:bg-purple-800/60 text-purple-200 border border-purple-700/50 font-bold text-[11px] px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Level 2 Subcategory</span>
                        </button>
                        <button
                          onClick={() => openEditCategoryModal(mainCat)}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-indigo-300 rounded-lg cursor-pointer"
                          title="Edit Main Category"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(mainCat._id, mainCat.name)}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-rose-400 rounded-lg cursor-pointer"
                          title="Delete Main Category"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Level 2 Subcategories List */}
                    {childSubs.length === 0 ? (
                      <div className="text-xs text-slate-500 italic pl-6 py-2">
                        No subcategories added under {mainCat.name} yet. Click "Add Level 2 Subcategory" above to create one.
                      </div>
                    ) : (
                      <div className="pl-4 md:pl-6 space-y-3 border-l-2 border-purple-800/40">
                        {childSubs.map((subCat) => {
                          const childSubSubs = subsubCategories.filter(
                            (ss) => String(typeof ss.parent === 'object' ? ss.parent?._id : ss.parent) === String(subCat._id)
                          );

                          return (
                            <div
                              key={subCat._id}
                              className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 space-y-3"
                            >
                              {/* Level 2 Subcategory Header */}
                              <div className="flex justify-between items-center gap-2">
                                <div className="flex items-center gap-2">
                                  <ChevronRight className="w-4 h-4 text-indigo-400" />
                                  <span className="text-sm font-bold text-slate-100">{subCat.name}</span>
                                  <span className="bg-indigo-900/40 text-indigo-300 border border-indigo-700/40 text-[9px] font-bold px-2 py-0.2 rounded">
                                    Level 2
                                  </span>
                                  <span className="bg-indigo-950 text-indigo-300 border border-indigo-700/50 text-[9px] font-extrabold px-2 py-0.2 rounded">
                                    {getCategoryProductCount(subCat._id)} Products
                                  </span>
                                </div>

                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => openAddCategoryWithParent(subCat._id)}
                                    className="bg-indigo-950 hover:bg-indigo-900/80 text-indigo-200 border border-indigo-700/40 font-bold text-[10px] px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                                  >
                                    <Plus className="w-3 h-3" />
                                    <span>Add 3rd Layer Item</span>
                                  </button>
                                  <button
                                    onClick={() => openEditCategoryModal(subCat)}
                                    className="p-1 text-slate-400 hover:text-white cursor-pointer"
                                    title="Edit Subcategory"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteCategory(subCat._id, subCat.name)}
                                    className="p-1 text-rose-400 hover:text-rose-300 cursor-pointer"
                                    title="Delete Subcategory"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>

                              {/* Level 3 Sub-subcategories Pills */}
                              {childSubSubs.length > 0 && (
                                <div className="pl-6 pt-1 flex flex-wrap gap-2">
                                  {childSubSubs.map((subSubCat) => (
                                    <div
                                      key={subSubCat._id}
                                      className="bg-slate-900 border border-slate-700 px-3 py-1 rounded-lg flex items-center gap-2 text-xs"
                                    >
                                      <span className="text-slate-300 font-semibold">{subSubCat.name}</span>
                                      <span className="text-[9px] bg-slate-800 text-purple-300 px-1.5 py-0.2 rounded font-mono font-bold">
                                        {getCategoryProductCount(subSubCat._id)} Items
                                      </span>
                                      <button
                                        onClick={() => openEditCategoryModal(subSubCat)}
                                        className="text-indigo-400 hover:text-indigo-300 cursor-pointer ml-1"
                                        title="Edit 3rd Layer Item"
                                      >
                                        <Edit className="w-3 h-3" />
                                      </button>
                                      <button
                                        onClick={() => handleDeleteCategory(subSubCat._id, subSubCat.name)}
                                        className="text-rose-400 hover:text-rose-300 cursor-pointer"
                                        title="Delete 3rd Layer Item"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: ENQUIRIES */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl">
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
                Customer Quote Requests & Enquiries
              </h3>
              <p className="text-xs text-slate-400">Direct WhatsApp and form inquiries submitted by prospective buyers</p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950/80 text-slate-400 font-extrabold uppercase text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="py-3.5 px-4">Date</th>
                      <th className="py-3.5 px-4">Product Requested</th>
                      <th className="py-3.5 px-4">Customer Name</th>
                      <th className="py-3.5 px-4">Phone Number</th>
                      <th className="py-3.5 px-4">Message / Requirements</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {enquiries.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-500">
                          No inquiries received yet.
                        </td>
                      </tr>
                    ) : (
                      enquiries.map((enq) => (
                        <tr key={enq._id} className="hover:bg-slate-800/50 transition-colors">
                          <td className="py-3 px-4 text-slate-400 text-[11px]">
                            {new Date(enq.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 font-bold text-white">{enq.productName}</td>
                          <td className="py-3 px-4 font-semibold text-slate-200">{enq.customerName}</td>
                          <td className="py-3 px-4 font-bold text-purple-300">
                            <a href={`tel:${enq.customerPhone}`} className="hover:underline">
                              {enq.customerPhone}
                            </a>
                          </td>
                          <td className="py-3 px-4 text-slate-400">{enq.message || 'No additional message provided'}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CSV CATALOG IMPORT */}
        {activeTab === 'import' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-4">
              <div>
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-indigo-400" />
                  <span>Bulk Product CSV Importer</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Paste raw CSV data to import multiple hardware products at once. Format: Name, Brand, MRP, OfferPrice, CategorySlug, SubcategorySlug, StockStatus, Images(semicolon separated)
                </p>
              </div>

              <textarea
                rows={8}
                placeholder="Name,Brand,MRP,OfferPrice,CategorySlug,SubcategorySlug,StockStatus,Images&#10;Logitech MX Master 3S,Logitech,10995,8999,peripherals,mouse,In Stock,https://res.cloudinary.com/..."
                value={csvText}
                onChange={(e) => setCsvText(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-purple-500"
              />

              <button
                onClick={handleCsvImport}
                disabled={isSubmitting || !csvText.trim()}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-lg cursor-pointer transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Importing Products...' : 'Execute Bulk CSV Import'}
              </button>
            </div>
          </div>
        )}

      </div>

      {/* --- ADD / EDIT PRODUCT MODAL --- */}
      {(isAddProductOpen || editingProduct) && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl text-slate-100">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                <Package className="w-5 h-5 text-purple-400" />
                <span>{editingProduct ? `Edit Product: ${editingProduct.name}` : 'Add New Hardware Product'}</span>
              </h2>
              <button
                onClick={() => {
                  setIsAddProductOpen(false);
                  setEditingProduct(null);
                }}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-slate-300 font-bold">Product Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ASUS ROG Strix GeForce RTX 4090"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-slate-300 font-bold">Brand *</label>
                  <input
                    type="text"
                    required
                    placeholder="ASUS, Logitech, Corsair, Seagate..."
                    value={productForm.brand}
                    onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* 3-Tier Category Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="block text-slate-300 font-bold">Level 1 Main Category *</label>
                  <select
                    required
                    value={productForm.categoryId}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        categoryId: e.target.value,
                        subcategoryId: '',
                        subsubcategoryId: '',
                      })
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="">Select Main Category</option>
                    {parentCategories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-slate-300 font-bold">Level 2 Subcategory</label>
                  <select
                    value={productForm.subcategoryId}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        subcategoryId: e.target.value,
                        subsubcategoryId: '',
                      })
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="">Select Subcategory</option>
                    {subCategories
                      .filter((s) => (productForm.categoryId ? String(s.parent) === String(productForm.categoryId) : true))
                      .map((sub) => (
                        <option key={sub._id} value={sub._id}>
                          {sub.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-slate-300 font-bold">Level 3 (3rd Layer Item)</label>
                  <select
                    value={productForm.subsubcategoryId}
                    onChange={(e) => setProductForm({ ...productForm, subsubcategoryId: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="">Select 3rd Layer Item</option>
                    {subsubCategories
                      .filter((ss) => (productForm.subcategoryId ? String(ss.parent) === String(productForm.subcategoryId) : true))
                      .map((subsub) => (
                        <option key={subsub._id} value={subsub._id}>
                          {subsub.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="block text-slate-300 font-bold">MRP Price (₹) *</label>
                  <input
                    type="number"
                    required
                    placeholder="12000"
                    value={productForm.mrp}
                    onChange={(e) => setProductForm({ ...productForm, mrp: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-slate-300 font-bold">Dealer Offer Price (₹)</label>
                  <input
                    type="number"
                    placeholder="9999"
                    value={productForm.offerPrice}
                    onChange={(e) => setProductForm({ ...productForm, offerPrice: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-emerald-400 font-bold focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-slate-300 font-bold">Stock Status</label>
                  <select
                    value={productForm.stockStatus}
                    onChange={(e) => setProductForm({ ...productForm, stockStatus: e.target.value as any })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                    <option value="Call for Availability">Call for Availability</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="block text-slate-300 font-bold">Product Description (Main Tab)</label>
                  <span className="text-[10px] text-purple-400 font-medium">Supports paragraphs, - bullet points, & **bold text**</span>
                </div>
                <textarea
                  rows={4}
                  placeholder={`Write detailed product description here...\n\n- Ultra-fast 1ms wireless connectivity\n- **Customizable RGB** backlighting per key\n- Quiet and responsive key switches`}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 font-sans text-xs leading-relaxed"
                />
              </div>

              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <label className="block text-slate-300 font-bold">Product Images (Cloudinary or URLs)</label>
                  <label className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white font-black text-[11px] px-3.5 py-1.5 rounded-xl cursor-pointer flex items-center gap-1.5 transition-all shadow-md active:scale-95">
                    <UploadCloud className="w-4 h-4 text-purple-200" />
                    <span>{isUploadingCloudinary ? 'Uploading to Cloudinary...' : 'Upload Image via Cloudinary ☁️'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      disabled={isUploadingCloudinary}
                      onChange={handleCloudinaryFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <textarea
                  rows={3}
                  placeholder="https://res.cloudinary.com/your-cloud/image/upload/..."
                  value={productForm.imagesInput}
                  onChange={(e) => setProductForm({ ...productForm, imagesInput: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 font-mono text-[11px]"
                />
              </div>

              {/* Technical Specifications Key-Value Row Editor */}
              <div className="space-y-2.5 bg-slate-950/70 border border-slate-800 p-4 rounded-xl">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <label className="block text-slate-300 font-bold">Technical Specifications</label>
                    <span className="text-[10px] text-emerald-400 font-medium bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                      Structured Key-Value Pairs
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={addSpecRow}
                    className="bg-indigo-900/60 hover:bg-indigo-800 text-indigo-200 border border-indigo-700/50 text-[11px] font-bold px-3 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Spec Row</span>
                  </button>
                </div>

                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {specRows.length === 0 ? (
                    <p className="text-slate-500 italic text-[11px]">No specification rows added yet. Click "+ Add Spec Row" above.</p>
                  ) : (
                    specRows.map((row) => (
                      <div key={row.id} className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Spec Name e.g. Warranty"
                          value={row.key}
                          onChange={(e) => updateSpecRow(row.id, 'key', e.target.value)}
                          className="w-1/2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-medium"
                        />
                        <input
                          type="text"
                          placeholder="Value e.g. 2 Years"
                          value={row.value}
                          onChange={(e) => updateSpecRow(row.id, 'value', e.target.value)}
                          className="w-1/2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-medium"
                        />
                        <button
                          type="button"
                          onClick={() => removeSpecRow(row.id)}
                          className="p-1.5 bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-300 rounded-lg transition-colors cursor-pointer shrink-0"
                          title="Remove specification row"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddProductOpen(false);
                    setEditingProduct(null);
                  }}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold px-5 py-2 rounded-xl hover:brightness-110 shadow-lg cursor-pointer"
                >
                  {isSubmitting ? 'Saving...' : editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- ADD / EDIT CATEGORY MODAL --- */}
      {isAddCategoryOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 space-y-5 shadow-2xl text-slate-100">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                <FolderTree className="w-5 h-5 text-indigo-400" />
                <span>{editingCategory ? `Edit Category: ${editingCategory.name}` : 'Create Category / 3rd Layer Item'}</span>
              </h2>
              <button
                onClick={() => {
                  setIsAddCategoryOpen(false);
                  setEditingCategory(null);
                }}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="block text-slate-300 font-bold">Category Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mouse, Bluetooth Wireless, Keyboards..."
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-slate-300 font-bold">Parent Category Level</label>
                <select
                  value={categoryForm.parentId}
                  onChange={(e) => setCategoryForm({ ...categoryForm, parentId: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="">None (Level 1 - Top-Level Main Category)</option>
                  <optgroup label="Level 1 Parents (Create Level 2 Subcategory)">
                    {parentCategories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Level 2 Parents (Create Level 3 3rd Layer Item)">
                    {subCategories.map((c) => (
                      <option key={c._id} value={c._id}>
                        ↳ {c.name} (under {getCategoryName(c.parent)})
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {!categoryForm.parentId && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-slate-300 font-bold">Main Category Image (Cloudinary)</label>
                    <label className="bg-indigo-600 hover:bg-indigo-500 text-white font-black text-[10px] px-3 py-1 rounded-lg cursor-pointer flex items-center gap-1.5 transition-all shadow-md">
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>Upload Image ☁️</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={isUploadingCloudinary}
                        onChange={handleCloudinaryCategoryFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="https://res.cloudinary.com/..."
                    value={categoryForm.image}
                    onChange={(e) => setCategoryForm({ ...categoryForm, image: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-xs font-mono"
                  />
                  <p className="text-[10px] text-slate-400">
                    Category images are displayed on the main categories grid. (Subcategories & 3rd layer items do not require an image).
                  </p>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddCategoryOpen(false);
                    setEditingCategory(null);
                  }}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold px-5 py-2 rounded-xl shadow-lg cursor-pointer"
                >
                  {isSubmitting ? 'Saving...' : editingCategory ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
