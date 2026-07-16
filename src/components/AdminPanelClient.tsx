'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Table, FileUp, MessageSquare, Plus, Save, RefreshCw, LogOut, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';

interface CategoryData {
  _id: string;
  name: string;
  slug: string;
  parent?: string;
}

interface ProductData {
  _id: string;
  name: string;
  slug: string;
  mrp: number;
  offerPrice?: number;
  brand: string;
  stockStatus: 'In Stock' | 'Out of Stock' | 'Call for Availability';
  category: { _id: string; name: string };
  subcategory?: { _id: string; name: string };
}

interface EnquiryData {
  _id: string;
  productName: string;
  productUrl: string;
  customerName: string;
  customerPhone: string;
  message?: string;
  status: 'Pending' | 'Contacted' | 'Closed';
  createdAt: string;
}

interface AdminPanelClientProps {
  initialProducts: ProductData[];
  initialEnquiries: EnquiryData[];
  categories: CategoryData[];
}

export default function AdminPanelClient({
  initialProducts,
  initialEnquiries,
  categories,
}: AdminPanelClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'spreadsheet' | 'csv' | 'enquiries' | 'add-product'>('spreadsheet');
  const [products, setProducts] = useState<ProductData[]>(initialProducts);
  const [enquiries, setEnquiries] = useState<EnquiryData[]>(initialEnquiries);
  const [pendingUpdates, setPendingUpdates] = useState<Record<string, Partial<ProductData>>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [csvText, setCsvText] = useState('');
  const [importResult, setImportResult] = useState<{ success: boolean; importedCount: number; errors: string[] } | null>(null);
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    brand: '',
    description: '',
    mrp: '',
    offerPrice: '',
    stockStatus: 'In Stock',
    categoryId: '',
    subcategoryId: '',
    specsInput: 'Warranty : 1 Year\nCondition : Brand New',
  });

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  const handleInlineChange = (productId: string, field: keyof ProductData, value: any) => {
    setProducts((prev) =>
      prev.map((p) => (p._id === productId ? { ...p, [field]: value } : p))
    );
    setPendingUpdates((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value,
      },
    }));
  };

  const saveSpreadsheetUpdates = async () => {
    const updatesArray = Object.entries(pendingUpdates).map(([id, fields]) => {
      const prod = products.find((p) => p._id === id);
      return {
        id,
        mrp: Number(fields.mrp ?? prod?.mrp),
        offerPrice: fields.offerPrice !== undefined ? Number(fields.offerPrice) : prod?.offerPrice,
        stockStatus: fields.stockStatus ?? prod?.stockStatus,
      };
    });

    if (updatesArray.length === 0) return;

    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates: updatesArray }),
      });
      if (res.ok) {
        setPendingUpdates({});
        alert('All updates saved successfully!');
        router.refresh();
      }
    } catch (e) {
      alert('Save failed.');
    } finally {
      setIsSaving(false);
    }
  };

  const updateEnquiryStatus = async (id: string, status: EnquiryData['status']) => {
    try {
      const res = await fetch('/api/admin/enquiries', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setEnquiries((prev) => prev.map((e) => (e._id === id ? { ...e, status } : e)));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCsvImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!csvText.trim()) return;

    setIsSaving(true);
    setImportResult(null);

    try {
      const res = await fetch('/api/admin/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ csvText }),
      });
      const data = await res.json();
      setImportResult({
        success: data.success,
        importedCount: data.importedCount || 0,
        errors: data.errors || [],
      });
      if (data.success) {
        setCsvText('');
        router.refresh();
      }
    } catch (e) {
      setImportResult({ success: false, importedCount: 0, errors: ['Request failed'] });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.brand || !newProduct.mrp || !newProduct.categoryId) {
      alert('Fill all required fields');
      return;
    }

    setIsSaving(true);
    try {
      const specsObj: Record<string, string> = {};
      newProduct.specsInput.split('\n').forEach((line) => {
        const [k, v] = line.split(':');
        if (k && v) specsObj[k.trim()] = v.trim();
      });

      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newProduct.name,
          brand: newProduct.brand,
          description: newProduct.description || newProduct.name,
          mrp: Number(newProduct.mrp),
          offerPrice: newProduct.offerPrice ? Number(newProduct.offerPrice) : undefined,
          stockStatus: newProduct.stockStatus,
          category: newProduct.categoryId,
          subcategory: newProduct.subcategoryId || undefined,
          specs: specsObj,
          images: ['/logo.png'],
        }),
      });

      if (res.ok) {
        alert('Product created successfully!');
        setNewProduct({
          name: '',
          brand: '',
          description: '',
          mrp: '',
          offerPrice: '',
          stockStatus: 'In Stock',
          categoryId: '',
          subcategoryId: '',
          specsInput: 'Warranty : 1 Year\nCondition : Brand New',
        });
        router.refresh();
      }
    } catch (e) {
      alert('Creation failed');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-8 text-slate-800">
      {/* Header Panel */}
      <div className="flex justify-between items-center pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs text-accent uppercase font-extrabold tracking-wider">Console Center</span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">Sait Solutions Panel</h1>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-slate-250 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-all cursor-pointer shadow-sm"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Tabs Selector */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-px">
        <button
          onClick={() => setActiveTab('spreadsheet')}
          className={`flex items-center gap-1.5 px-5 py-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'spreadsheet' ? 'border-accent text-accent' : 'border-transparent text-slate-450 hover:text-slate-700'
          }`}
        >
          <Table className="w-4 h-4" />
          Spreadsheet Editor
        </button>
        <button
          onClick={() => setActiveTab('csv')}
          className={`flex items-center gap-1.5 px-5 py-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'csv' ? 'border-accent text-accent' : 'border-transparent text-slate-450 hover:text-slate-700'
          }`}
        >
          <FileUp className="w-4 h-4" />
          Bulk CSV Import
        </button>
        <button
          onClick={() => setActiveTab('enquiries')}
          className={`flex items-center gap-1.5 px-5 py-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'enquiries' ? 'border-accent text-accent' : 'border-transparent text-slate-450 hover:text-slate-700'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          Enquiry Leads ({enquiries.length})
        </button>
        <button
          onClick={() => setActiveTab('add-product')}
          className={`flex items-center gap-1.5 px-5 py-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'add-product' ? 'border-accent text-accent' : 'border-transparent text-slate-450 hover:text-slate-700'
          }`}
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* TAB 1: SPREADSHEET INLINE EDITOR */}
      {activeTab === 'spreadsheet' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-slate-500 text-xs font-medium">
              Quickly edit pricing and stock availability directly from the grid.
            </p>
            {Object.keys(pendingUpdates).length > 0 && (
              <button
                onClick={saveSpreadsheetUpdates}
                disabled={isSaving}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-xs font-bold rounded-lg cursor-pointer transition-all shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes ({Object.keys(pendingUpdates).length})</span>
              </button>
            )}
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-x-auto shadow-sm">
            <table className="w-full text-left text-xs border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="p-4">Product Name</th>
                  <th className="p-4">Brand</th>
                  <th className="p-4">Category</th>
                  <th className="p-4 w-32">MRP (₹)</th>
                  <th className="p-4 w-32">Offer Price (₹)</th>
                  <th className="p-4 w-44">Stock Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50/50 text-slate-700">
                    <td className="p-4 font-bold text-slate-900 max-w-xs truncate">{p.name}</td>
                    <td className="p-4 font-medium">{p.brand}</td>
                    <td className="p-4">
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded border border-slate-200 font-semibold">
                        {p.category?.name || 'General'}
                      </span>
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        value={p.mrp}
                        onChange={(e) => handleInlineChange(p._id, 'mrp', Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-slate-800 focus:outline-none focus:bg-white focus:border-accent font-semibold"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        value={p.offerPrice || ''}
                        onChange={(e) => handleInlineChange(p._id, 'offerPrice', e.target.value ? Number(e.target.value) : undefined)}
                        placeholder="Indicative"
                        className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-slate-800 focus:outline-none focus:bg-white focus:border-accent font-semibold"
                      />
                    </td>
                    <td className="p-3">
                      <select
                        value={p.stockStatus}
                        onChange={(e) => handleInlineChange(p._id, 'stockStatus', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-slate-850 focus:outline-none focus:bg-white focus:border-accent text-xs font-semibold"
                      >
                        <option value="In Stock">In Stock</option>
                        <option value="Call for Availability">Call for Availability</option>
                        <option value="Out of Stock">Out of Stock</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: BULK CSV IMPORT */}
      {activeTab === 'csv' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <form onSubmit={handleCsvImport} className="space-y-4">
              <div>
                <label className="block text-slate-550 font-bold mb-1 text-xs">Paste CSV Data Below</label>
                <textarea
                  required
                  placeholder="name,brand,description,mrp,offerprice,stockstatus,categoryslug,subcategoryslug,specs&#10;TP-Link Router,TP-Link,High speed,4500,3200,In Stock,network-security,routers-mesh-wifi,Speed:300Mbps|Warranty:2 Years"
                  value={csvText}
                  onChange={(e) => setCsvText(e.target.value)}
                  className="w-full h-80 bg-white border border-slate-250 rounded-xl p-4 text-xs font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:border-accent shadow-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isSaving || !csvText.trim()}
                className="px-6 py-3 bg-accent hover:bg-accent-hover text-white text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <FileUp className="w-4 h-4" />
                {isSaving ? 'Processing CSV...' : 'Import CSV Products'}
              </button>
            </form>

            {importResult && (
              <div className={`p-4 rounded-xl border text-xs space-y-2 ${
                importResult.success ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-rose-50 border-rose-200 text-rose-600'
              }`}>
                <h4 className="font-bold flex items-center gap-1">
                  {importResult.success ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  {importResult.success ? 'Import Complete!' : 'Import Failed'}
                </h4>
                <p>Imported: {importResult.importedCount} products.</p>
                {importResult.errors.length > 0 && (
                  <div className="mt-2 space-y-1">
                    <p className="font-semibold text-rose-800">Errors encountered ({importResult.errors.length}):</p>
                    <ul className="list-disc pl-4 font-mono max-h-40 overflow-y-auto">
                      {importResult.errors.map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          <aside className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 text-xs shadow-sm">
            <h3 className="text-slate-900 font-bold flex items-center gap-1.5 pb-2 border-b border-slate-100">
              <HelpCircle className="w-4 h-4 text-accent" />
              CSV Requirements
            </h3>
            <p className="text-slate-500 leading-relaxed font-medium">
              CSV file structure must match the column keys exactly. Order does not matter, but headers must be present in the first row.
            </p>
            <div className="bg-slate-50 rounded-xl p-3.5 font-mono text-[10px] text-slate-500 space-y-1.5 border border-slate-150">
              <span className="text-accent font-bold">Headers:</span>
              <p>name,brand,description,mrp,offerprice,stockstatus,categoryslug,subcategoryslug,specs</p>
              <span className="text-accent font-bold">Formatting Specs:</span>
              <p>Separate key-value spec pairs with a pipe symbol (<code className="text-slate-800">|</code>) and colon (<code className="text-slate-800">:</code>). Example: <code className="text-slate-800">Warranty:1 Year|Interface:USB</code></p>
            </div>
          </aside>
        </div>
      )}

      {/* TAB 3: ENQUIRY LEADS LOG */}
      {activeTab === 'enquiries' && (
        <div className="space-y-4">
          <p className="text-slate-500 text-xs font-medium">
            Leads captured directly via the product and dealer inquiry modals before customer WhatsApp redirection.
          </p>

          <div className="bg-white border border-slate-200 rounded-xl overflow-x-auto shadow-sm">
            <table className="w-full text-left text-xs border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="p-4">Customer Details</th>
                  <th className="p-4">Product Name</th>
                  <th className="p-4">Requirements</th>
                  <th className="p-4">Logged At</th>
                  <th className="p-4 w-40">Status Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {enquiries.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400">No leads logged yet.</td>
                  </tr>
                ) : (
                  enquiries.map((e) => (
                    <tr key={e._id} className="hover:bg-slate-50/50 text-slate-700">
                      <td className="p-4 space-y-1">
                        <p className="font-bold text-slate-900">{e.customerName}</p>
                        <a
                          href={`https://wa.me/${e.customerPhone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-600 hover:underline flex items-center gap-1 font-semibold text-[11px]"
                        >
                          {e.customerPhone}
                        </a>
                      </td>
                      <td className="p-4">
                        <a href={e.productUrl} target="_blank" rel="noopener noreferrer" className="text-slate-900 hover:text-accent font-bold hover:underline">
                          {e.productName}
                        </a>
                      </td>
                      <td className="p-4 max-w-xs leading-relaxed text-slate-500 font-medium truncate" title={e.message}>
                        {e.message || '—'}
                      </td>
                      <td className="p-4 text-slate-400 text-[10px] font-medium">
                        {new Date(e.createdAt).toLocaleString('en-IN')}
                      </td>
                      <td className="p-3">
                        <select
                          value={e.status}
                          onChange={(evt) => updateEnquiryStatus(e._id, evt.target.value as EnquiryData['status'])}
                          className={`w-full bg-white border rounded px-2.5 py-1.5 text-xs font-bold focus:outline-none ${
                            e.status === 'Pending' ? 'border-amber-200 text-amber-600 bg-amber-50/50' : e.status === 'Contacted' ? 'border-blue-200 text-blue-600 bg-blue-50/50' : 'border-emerald-200 text-emerald-600 bg-emerald-50/50'
                          }`}
                        >
                          <option value="Pending">⌛ Pending</option>
                          <option value="Contacted">💬 Contacted</option>
                          <option value="Closed">✅ Closed</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: MANUAL PRODUCT ADDITION */}
      {activeTab === 'add-product' && (
        <form onSubmit={handleAddProduct} className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6 max-w-3xl shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            
            <div>
              <label className="block text-slate-550 font-bold mb-1">Product Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Hikvision Bullet Camera"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:bg-white focus:border-accent transition-all shadow-sm"
              />
            </div>

            <div>
              <label className="block text-slate-550 font-bold mb-1">Brand *</label>
              <input
                type="text"
                required
                placeholder="e.g. Hikvision"
                value={newProduct.brand}
                onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:bg-white focus:border-accent transition-all shadow-sm"
              />
            </div>

            <div>
              <label className="block text-slate-550 font-bold mb-1">MRP (₹) *</label>
              <input
                type="number"
                required
                placeholder="e.g. 5000"
                value={newProduct.mrp}
                onChange={(e) => setNewProduct({ ...newProduct, mrp: e.target.value })}
                className="w-full bg-slate-50 border border-slate-205 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:bg-white focus:border-accent transition-all shadow-sm"
              />
            </div>

            <div>
              <label className="block text-slate-550 font-bold mb-1">Offer Price (₹, Optional)</label>
              <input
                type="number"
                placeholder="Indicative bulk pricing"
                value={newProduct.offerPrice}
                onChange={(e) => setNewProduct({ ...newProduct, offerPrice: e.target.value })}
                className="w-full bg-slate-50 border border-slate-205 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:bg-white focus:border-accent transition-all shadow-sm"
              />
            </div>

            <div>
              <label className="block text-slate-555 font-bold mb-1">Primary Category *</label>
              <select
                required
                value={newProduct.categoryId}
                onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value, subcategoryId: '' })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:bg-white focus:border-accent transition-all shadow-sm font-semibold"
              >
                <option value="">Select Category</option>
                {categories.filter(c => !c.parent).map(c => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-555 font-bold mb-1">Subcategory (Optional)</label>
              <select
                value={newProduct.subcategoryId}
                onChange={(e) => setNewProduct({ ...newProduct, subcategoryId: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:bg-white focus:border-accent transition-all shadow-sm font-semibold"
                disabled={!newProduct.categoryId}
              >
                <option value="">Select Subcategory</option>
                {categories
                  .filter((c) => c.parent === newProduct.categoryId)
                  .map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-555 font-bold mb-1">Stock Status</label>
              <select
                value={newProduct.stockStatus}
                onChange={(e) => setNewProduct({ ...newProduct, stockStatus: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:bg-white focus:border-accent transition-all shadow-sm font-semibold"
              >
                <option value="In Stock">In Stock</option>
                <option value="Call for Availability">Call for Availability</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-550 font-bold mb-1">Hardware Description</label>
              <textarea
                placeholder="Product summary and highlights..."
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:bg-white focus:border-accent transition-all shadow-sm min-h-[80px]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-550 font-bold mb-1">Specs (Formated as Key : Value, one per line)</label>
              <textarea
                placeholder="Warranty : 1 Year&#10;Resolution : 4 MP"
                value={newProduct.specsInput}
                onChange={(e) => setNewProduct({ ...newProduct, specsInput: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-805 focus:outline-none focus:bg-white focus:border-accent transition-all shadow-sm min-h-[100px] font-mono"
              />
            </div>

          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3.5 bg-gradient-to-r from-brand-purple-light to-brand-purple-dark text-white rounded-xl hover:brightness-110 transition-all font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md"
          >
            Create Product Listing
          </button>
        </form>
      )}
    </div>
  );
}
