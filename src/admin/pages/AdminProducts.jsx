import React, { useState, useEffect, useRef } from 'react';
import {
  Package,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  AlertCircle,
  X,
  Star,
  Upload,
  Image as ImageIcon,
  Link as LinkIcon,
  Search,
  Filter,
  Eye,
  LayoutGrid,
  List,
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

export const AdminProducts = () => {
  const { authFetch, token, apiBase } = useAdminAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalMode, setModalMode] = useState(null); // 'create' | 'edit'
  const [activeProduct, setActiveProduct] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  const fileInputRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: '',
    customCategory: '',
    imageUrl: '',
    shortDescription: '',
    fullDescription: '',
    gradePurity: '',
    packagingOptions: '',
    inStock: true,
    featured: true,
    order: 1,
  });

  const predefinedCategories = [
    'Chemical & Industrial Minerals',
    'Chemical Raw Materials',
    'Mineral Fillers & Extenders',
    'Agri-Food Commodities',
    'Industrial Commodities',
    'Specialty Minerals',
    '+ Custom Category',
  ];

  const quickImagePresets = [
    { label: 'Salt Crystal', url: 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Chemical Processing', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Mineral Powder', url: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Grains & Food', url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Spices Market', url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80' },
  ];

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await authFetch('/admin/products');
      const json = await res.json();
      if (json.success) {
        setProducts(json.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openCreateModal = () => {
    setFormData({
      name: '',
      slug: '',
      category: 'Chemical Raw Materials',
      customCategory: '',
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      shortDescription: '',
      fullDescription: '',
      gradePurity: 'Commercial / Industrial Grade',
      packagingOptions: '25kg Bags, 50kg Bags, 1 Ton Jumbo Bags',
      inStock: true,
      featured: true,
      order: products.length + 1,
    });
    setModalMode('create');
  };

  const openEditModal = (p) => {
    setActiveProduct(p);
    const isCustom = !predefinedCategories.slice(0, -1).includes(p.category);
    setFormData({
      name: p.name || '',
      slug: p.slug || '',
      category: isCustom ? '+ Custom Category' : p.category,
      customCategory: isCustom ? p.category : '',
      imageUrl: p.imageUrl || '',
      shortDescription: p.shortDescription || '',
      fullDescription: p.fullDescription || '',
      gradePurity: p.gradePurity || '',
      packagingOptions: Array.isArray(p.packagingOptions) ? p.packagingOptions.join(', ') : '',
      inStock: p.inStock ?? true,
      featured: p.featured ?? true,
      order: p.order ?? 1,
    });
    setModalMode('edit');
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Handle direct file upload from user's computer
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPG, PNG, WEBP, GIF).');
      return;
    }

    try {
      setUploadingImage(true);
      const uploadFormData = new FormData();
      uploadFormData.append('image', file);

      const res = await fetch(`${apiBase}/admin/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: uploadFormData,
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Image upload failed');
      }

      // Backend returns relative /uploads/... or full URL
      const baseUrl = apiBase?.replace(/\/api\/?$/, '') || (typeof window !== 'undefined' ? window.location.origin : '');
      const finalUrl = json.url.startsWith('http')
        ? json.url
        : `${baseUrl}${json.url}`;

      setFormData((prev) => ({
        ...prev,
        imageUrl: finalUrl,
      }));
      showToast('Image uploaded and preview updated!');
    } catch (err) {
      alert('Upload error: ' + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const finalCategory =
        formData.category === '+ Custom Category'
          ? formData.customCategory.trim() || 'General Trading'
          : formData.category;

      const payload = {
        name: formData.name.trim(),
        slug: formData.slug.toLowerCase().trim(),
        category: finalCategory,
        imageUrl: formData.imageUrl.trim(),
        shortDescription: formData.shortDescription.trim(),
        fullDescription: formData.fullDescription.trim(),
        gradePurity: formData.gradePurity.trim(),
        packagingOptions: formData.packagingOptions
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        inStock: formData.inStock,
        featured: formData.featured,
        order: parseInt(formData.order) || 1,
      };

      if (modalMode === 'create') {
        const res = await authFetch('/admin/products', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (!json.success) throw new Error(json.message);
        showToast('Category created successfully with image in MongoDB Atlas.');
      } else {
        const res = await authFetch(`/admin/products/${activeProduct._id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (!json.success) throw new Error(json.message);
        showToast('Category and image updated successfully.');
      }

      setModalMode(null);
      fetchProducts();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await authFetch(`/admin/products/${id}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      setDeleteConfirmId(null);
      showToast('Product category deleted successfully.');
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  // Get unique categories for filter bar
  const categoriesList = ['all', ...new Set(products.map((p) => p.category).filter(Boolean))];

  // Filtered products list
  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      !search.trim() ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-navy-900 border border-gold-500/40 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fadeIn">
          <CheckCircle className="w-5 h-5 text-gold-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 p-6 rounded-2xl shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-navy-900 dark:text-white">
            Trading Products & Categories
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Add new product categories, upload custom images, edit purity grades, and manage availability.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-sm shadow-gold-glow transition-all duration-200 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Filter, Search & View Controls */}
      <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 p-4 rounded-2xl shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search category, product name, or description..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-gold-500 transition-colors"
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 self-end lg:self-auto">
            <span className="text-xs text-slate-400 font-medium mr-1">View:</span>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg border transition-colors ${
                viewMode === 'grid'
                  ? 'bg-gold-500/20 text-gold-600 dark:text-gold-400 border-gold-500/40'
                  : 'bg-slate-100 dark:bg-navy-800 text-slate-400 border-transparent hover:text-white'
              }`}
              title="Card Grid with Images"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg border transition-colors ${
                viewMode === 'table'
                  ? 'bg-gold-500/20 text-gold-600 dark:text-gold-400 border-gold-500/40'
                  : 'bg-slate-100 dark:bg-navy-800 text-slate-400 border-transparent hover:text-white'
              }`}
              title="Compact Table"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100 dark:border-navy-800">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider shrink-0 mr-1">
            Category:
          </span>
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-navy-900 text-gold-400 dark:bg-gold-500 dark:text-navy-950 shadow-xs'
                  : 'bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-navy-700'
              }`}
            >
              {cat === 'all' ? `All (${products.length})` : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content: Grid View or Table View */}
      {loading ? (
        <div className="p-16 text-center">
          <div className="w-8 h-8 border-4 border-gold-500/30 border-t-gold-500 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-slate-400">Loading catalog from MongoDB Atlas...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white dark:bg-navy-900 p-12 text-center rounded-2xl border border-slate-200 dark:border-navy-800">
          <Package className="w-12 h-12 mx-auto text-slate-400 mb-2" />
          <p className="font-semibold text-base text-navy-900 dark:text-white">No categories found</p>
          <p className="text-xs text-slate-400 mt-1">Try adjusting your category filter or search query.</p>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW WITH RICH PRODUCT IMAGES */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
            <div
              key={p._id}
              className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Product Image Header */}
                <div className="relative h-48 w-full bg-navy-950 overflow-hidden">
                  <img
                    src={p.imageUrl || '/assets/logo.jpg'}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = '/assets/logo.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-black/20" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-navy-900/90 text-gold-400 border border-gold-500/30 px-2.5 py-1 rounded-md backdrop-blur-xs shadow-xs">
                      {p.category}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded shadow-xs ${
                        p.inStock
                          ? 'bg-emerald-500 text-white'
                          : 'bg-red-500 text-white'
                      }`}
                    >
                      {p.inStock ? 'In Stock' : 'Unavailable'}
                    </span>
                  </div>

                  {/* Bottom Image Overlay Title */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <span className="text-xs font-mono text-slate-300">
                      slug: /{p.slug}
                    </span>
                    {p.featured && (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-gold-400 bg-navy-900/80 px-2 py-0.5 rounded">
                        <Star className="w-3 h-3 fill-current" />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <h3 className="font-bold text-lg text-navy-900 dark:text-white group-hover:text-gold-500 transition-colors">
                    {p.name}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-2 leading-relaxed">
                    {p.shortDescription}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-navy-800 text-xs space-y-1.5">
                    <div>
                      <span className="text-slate-400 font-medium">Standard Grade: </span>
                      <span className="text-navy-900 dark:text-slate-200 font-semibold">{p.gradePurity}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-medium">Packaging: </span>
                      <span className="text-slate-600 dark:text-slate-300">
                        {Array.isArray(p.packagingOptions) ? p.packagingOptions.slice(0, 2).join(', ') : ''}
                        {p.packagingOptions?.length > 2 && ' + more'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-5 pb-5 pt-3 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between bg-slate-50/50 dark:bg-navy-900/50">
                <span className="text-[11px] text-slate-400 font-mono">
                  Priority #{p.order || 1}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(p)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-navy-800 hover:bg-gold-500 hover:text-navy-950 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit / Image</span>
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(p._id)}
                    className="p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                    title="Delete Category"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* TABLE VIEW WITH THUMBNAIL AVATARS */
        <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[680px]">
              <thead className="bg-slate-50 dark:bg-navy-950/60 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-navy-800">
                <tr>
                  <th className="px-6 py-4">Image & Category</th>
                  <th className="px-6 py-4">Classification</th>
                  <th className="px-6 py-4">Purity Grade</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-navy-800">
                {filteredProducts.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50/60 dark:hover:bg-navy-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-navy-950 shrink-0 border border-slate-200 dark:border-navy-700">
                          <img
                            src={p.imageUrl || '/assets/logo.jpg'}
                            alt={p.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = '/assets/logo.jpg';
                            }}
                          />
                        </div>
                        <div>
                          <div className="font-bold text-navy-900 dark:text-white">
                            {p.name}
                          </div>
                          <span className="text-xs font-mono text-slate-400">/{p.slug}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-block px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300">
                        {p.category}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {p.gradePurity}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          p.inStock
                            ? 'bg-emerald-500/15 text-emerald-500'
                            : 'bg-red-500/15 text-red-400'
                        }`}
                      >
                        {p.inStock ? 'Available' : 'Unavailable'}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-2 rounded-lg bg-slate-100 dark:bg-navy-800 hover:bg-gold-500 hover:text-navy-950 text-slate-600 dark:text-slate-200 transition-colors"
                          title="Edit Category & Image"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(p._id)}
                          className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                          title="Delete Category"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL: ADD OR EDIT PRODUCT CATEGORY WITH IMAGE */}
      {modalMode && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto p-4 sm:p-6 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-navy-800">
              <div>
                <h3 className="text-lg font-bold text-navy-900 dark:text-white">
                  {modalMode === 'create' ? 'Add New Trading Category' : `Edit ${formData.name}`}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Upload category photos, define commercial specifications, and set display options.
                </p>
              </div>
              <button
                onClick={() => setModalMode(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="mt-5 space-y-5">
              {/* IMAGE UPLOAD & PREVIEW SECTION */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-gold-500" />
                    <span>Category Image / Photo *</span>
                  </label>
                  {formData.imageUrl && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, imageUrl: '' })}
                      className="text-xs text-red-400 hover:underline"
                    >
                      Clear Image
                    </button>
                  )}
                </div>

                {/* Image Live Preview */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-full sm:w-44 h-32 rounded-xl bg-navy-900 border-2 border-dashed border-slate-300 dark:border-navy-700 overflow-hidden relative shrink-0 flex items-center justify-center">
                    {formData.imageUrl ? (
                      <img
                        src={formData.imageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/assets/logo.jpg';
                        }}
                      />
                    ) : (
                      <div className="text-center p-3 text-slate-400">
                        <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-50" />
                        <span className="text-[11px]">No image selected</span>
                      </div>
                    )}
                    {uploadingImage && (
                      <div className="absolute inset-0 bg-navy-950/80 flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
                      </div>
                    )}
                  </div>

                  {/* Upload Controls */}
                  <div className="flex-1 space-y-2.5 w-full">
                    {/* Method 1: Upload File from Computer */}
                    <div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadingImage}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-navy-800 hover:bg-navy-700 text-white font-semibold text-xs shadow-xs transition-colors"
                      >
                        <Upload className="w-3.5 h-3.5 text-gold-400" />
                        <span>{uploadingImage ? 'Uploading Image...' : 'Upload Image from Computer'}</span>
                      </button>
                      <span className="text-[11px] text-slate-400 ml-2 block sm:inline mt-1 sm:mt-0">
                        PNG, JPG, WEBP up to 10MB
                      </span>
                    </div>

                    {/* Method 2: Direct URL Input */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                        Or enter Image URL:
                      </label>
                      <div className="relative">
                        <LinkIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="url"
                          value={formData.imageUrl}
                          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                          placeholder="https://example.com/category-image.jpg"
                          className="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-lg text-xs font-mono text-slate-800 dark:text-slate-100 focus:outline-none focus:border-gold-500"
                        />
                      </div>
                    </div>

                    {/* Quick Presets */}
                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      <span className="text-[10px] text-slate-400">Presets:</span>
                      {quickImagePresets.map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => setFormData({ ...formData, imageUrl: preset.url })}
                          className="text-[10px] px-2 py-0.5 rounded bg-slate-200 dark:bg-navy-800 hover:bg-gold-500 hover:text-navy-950 text-slate-700 dark:text-slate-300 transition-colors"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Category / Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      const newName = e.target.value;
                      setFormData({
                        ...formData,
                        name: newName,
                        slug:
                          modalMode === 'create'
                            ? newName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
                            : formData.slug,
                      });
                    }}
                    placeholder="e.g. Copper Cathodes"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    URL Identifier (Slug) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. copper-cathodes"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-xl text-sm font-mono text-slate-800 dark:text-slate-100 focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              {/* Category Selection or Custom Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Category Group *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:border-gold-500"
                  >
                    {predefinedCategories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {formData.category === '+ Custom Category' && (
                  <div>
                    <label className="block text-xs font-semibold text-gold-600 dark:text-gold-400 mb-1">
                      New Custom Category Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.customCategory}
                      onChange={(e) => setFormData({ ...formData, customCategory: e.target.value })}
                      placeholder="e.g. Metal & Ore Commodities"
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-navy-950 border border-gold-500 rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Commercial Purity / Grade
                  </label>
                  <input
                    type="text"
                    value={formData.gradePurity}
                    onChange={(e) => setFormData({ ...formData, gradePurity: e.target.value })}
                    placeholder="e.g. 99.99% Grade A Commercial"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              {/* Packaging Options */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Packaging Options (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.packagingOptions}
                  onChange={(e) => setFormData({ ...formData, packagingOptions: e.target.value })}
                  placeholder="25kg Woven Bags, 50kg Bags, 1 Ton Jumbo Bags, Bulk Vessel"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-gold-500"
                />
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Short Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Commercial summary describing applications, industrial sourcing, and market standards..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-gold-500"
                />
              </div>

              {/* Checkboxes & Ordering */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.inStock}
                      onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                      className="w-4 h-4 text-gold-500 rounded focus:ring-gold-500"
                    />
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Available in Stock
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4 text-gold-500 rounded focus:ring-gold-500"
                    />
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Featured on Homepage
                    </span>
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-xs text-slate-400 font-semibold">Priority Order:</label>
                  <input
                    type="number"
                    min={1}
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                    className="w-16 px-2 py-1 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-xs font-semibold text-center"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-navy-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-navy-700 text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploadingImage}
                  className="px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 text-xs font-bold shadow-gold-glow transition-all"
                >
                  {modalMode === 'create' ? 'Save New Category' : 'Update Category & Image'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-2xl w-full max-w-md p-6 shadow-2xl animate-fadeIn">
            <h3 className="text-lg font-bold text-red-500 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span>Confirm Category Removal</span>
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
              Are you sure you want to permanently delete this category from your MongoDB Atlas database?
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-navy-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors"
              >
                Delete Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
