import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Phone, MessageCircle, RefreshCw, CheckCircle, Clock, ShieldCheck, AlertCircle } from 'lucide-react';
import { Product, ProductInquiry, Order } from '../types';
import { StorageService } from '../services/storage';
import { STORE_PHONE_NUMBER, STORE_WHATSAPP_LINK } from '../data/initialProducts';

interface AdminPanelProps {
  products: Product[];
  onRefreshProducts: () => void;
  onExitAdmin: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  products,
  onRefreshProducts,
  onExitAdmin
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'inquiries' | 'orders'>('products');
  const [inquiries, setInquiries] = useState<ProductInquiry[]>(StorageService.getInquiries());
  const [orders, setOrders] = useState<Order[]>(StorageService.getOrders());

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'iPhone' as Product['category'],
    stock: 15,
    image: '',
    badge: 'Popular',
    colors: 'Natural Titanium, Black Titanium, White Titanium',
    storageOptions: '128GB, 256GB, 512GB'
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      category: 'iPhone',
      stock: 15,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1000&q=80',
      badge: 'New Arrival',
      colors: 'Natural Titanium, Desert Titanium, Black Titanium',
      storageOptions: '128GB, 256GB, 512GB'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      stock: product.stock,
      image: product.image,
      badge: product.badge || '',
      colors: product.colors ? product.colors.join(', ') : '',
      storageOptions: product.storageOptions ? product.storageOptions.join(', ') : ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      StorageService.deleteProduct(id);
      onRefreshProducts();
    }
  };

  const handleResetCatalog = () => {
    if (window.confirm('Reset catalog to official 249 iPhone Store Apple products (with all prices at $0)?')) {
      StorageService.resetProductsToDefault();
      onRefreshProducts();
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.image) return;

    StorageService.saveProduct({
      id: editingProduct?.id,
      name: formData.name,
      description: formData.description,
      category: formData.category,
      stock: Number(formData.stock),
      image: formData.image,
      badge: formData.badge,
      colors: formData.colors.split(',').map(s => s.trim()).filter(Boolean),
      storageOptions: formData.storageOptions.split(',').map(s => s.trim()).filter(Boolean)
    });

    setIsModalOpen(false);
    onRefreshProducts();
  };

  const handleUpdateInquiryStatus = (id: string, status: 'pending' | 'contacted' | 'completed') => {
    StorageService.updateInquiryStatus(id, status);
    setInquiries(StorageService.getInquiries());
  };

  const handleUpdateOrderStatus = (id: string, status: Order['status']) => {
    StorageService.updateOrderStatus(id, status);
    setOrders(StorageService.getOrders());
  };

  const totalStockUnits = products.reduce((acc, p) => acc + p.stock, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#222530]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-[#FF7A00]/20 text-[#FF851B]">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              لوحة التحكم والإدارة
            </h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            249 iPhone Store • الخط الساخن المباشر: <strong className="text-white">{STORE_PHONE_NUMBER}</strong> • وضع التسعير: <span className="text-[#FF7A00] font-bold">المراسلة المباشرة (العرض $0.00)</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetCatalog}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#171922] hover:bg-[#20232E] border border-[#272B38] text-xs font-bold text-zinc-300 hover:text-white transition-all"
            title="إعادة تحميل كتالوج منتجات Apple الرسمي مع الصور الحقيقية"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#FF7A00]" />
            <span>استعادة الكتالوج الرسمي</span>
          </button>

          <button
            onClick={onExitAdmin}
            className="px-4 py-2 rounded-xl bg-[#FF7A00] hover:bg-[#FF851B] text-black text-xs font-black transition-all"
          >
            عرض المتجر ←
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 my-6">
        <div className="p-4 rounded-2xl bg-[#12141A] border border-[#222530]">
          <div className="text-[11px] font-bold text-zinc-400">
            إجمالي الأجهزة بالكتالوج
          </div>
          <div className="text-2xl font-black text-white mt-1">{products.length}</div>
          <div className="text-[10px] text-zinc-500 mt-0.5">موديل نشط في المتجر</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#12141A] border border-[#222530]">
          <div className="text-[11px] font-bold text-zinc-400">
            إجمالي الوحدات بالمخزن
          </div>
          <div className="text-2xl font-black text-white mt-1">{totalStockUnits}</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">جاهزة للتسليم</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#12141A] border border-[#222530]">
          <div className="text-[11px] font-bold text-zinc-400">
            استفسارات الأسعار
          </div>
          <div className="text-2xl font-black text-[#FF7A00] mt-1">{inquiries.length}</div>
          <div className="text-[10px] text-zinc-400 mt-0.5">
            {inquiries.filter(i => i.status === 'pending').length} بانتظار الرد
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#12141A] border border-[#222530]">
          <div className="text-[11px] font-bold text-zinc-400">
            سلات الطلبات المستلمة
          </div>
          <div className="text-2xl font-black text-white mt-1">{orders.length}</div>
          <div className="text-[10px] text-zinc-400 mt-0.5">طلب سلة مكتمل</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#222530] mb-6">
        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 px-4 text-xs font-black border-b-2 transition-all ${
            activeTab === 'products'
              ? 'border-[#FF7A00] text-[#FF7A00]'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          كتالوج الأجهزة ({products.length})
        </button>

        <button
          onClick={() => setActiveTab('inquiries')}
          className={`pb-3 px-4 text-xs font-black border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'inquiries'
              ? 'border-[#FF7A00] text-[#FF7A00]'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <span>استفسارات الأسعار</span>
          {inquiries.filter(i => i.status === 'pending').length > 0 && (
            <span className="w-2 h-2 rounded-full bg-[#FF7A00] animate-ping" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 px-4 text-xs font-black border-b-2 transition-all ${
            activeTab === 'orders'
              ? 'border-[#FF7A00] text-[#FF7A00]'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          الطلبات المستلمة ({orders.length})
        </button>
      </div>

      {/* TAB 1: PRODUCTS */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-xs text-zinc-400">
              جميع الهواتف مضبوطة على <strong className="text-white">سعر $0.00</strong> لتوجيه العملاء للمراسلة المباشرة.
            </div>
            <button
              onClick={handleOpenAdd}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FF7A00] hover:bg-[#FF851B] text-black font-extrabold text-xs transition-all orange-glow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة جهاز جديد</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#222530] bg-[#12141A]">
            <table className="w-full text-right text-xs text-zinc-300">
              <thead className="bg-[#0C0D11] border-b border-[#222530] text-[11px] font-black text-zinc-400">
                <tr>
                  <th className="py-3.5 px-4">الصورة</th>
                  <th className="py-3.5 px-4">اسم الجهاز</th>
                  <th className="py-3.5 px-4">القسم</th>
                  <th className="py-3.5 px-4">السعر المعروض</th>
                  <th className="py-3.5 px-4">المخزون</th>
                  <th className="py-3.5 px-4 text-left">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1B1E28]">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-[#161820] transition-colors">
                    <td className="py-3 px-4">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-12 h-12 object-contain bg-[#090A0D] rounded-lg p-1 border border-[#262A38]"
                        onError={(e) => {
                          (e.target as HTMLElement).setAttribute(
                            'src',
                            'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=100&q=80'
                          );
                        }}
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-white text-sm">{p.name}</div>
                      <div className="text-[11px] text-zinc-500 max-w-xs truncate">{p.description}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-[#1A1D27] border border-[#272B38] text-[10px] font-bold text-zinc-300">
                        {p.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white">$0.00</span>
                        <span className="px-1.5 py-0.5 rounded bg-[#FF7A00]/20 text-[#FF851B] text-[9px] font-black">
                          راسلنا للسعر
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-zinc-300">
                      {p.stock} قطعة
                    </td>
                    <td className="py-3 px-4 text-left">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 rounded-lg bg-[#181B23] hover:bg-[#222733] text-zinc-300 hover:text-white transition-colors"
                          title="تعديل"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id, p.name)}
                          className="p-1.5 rounded-lg bg-[#181B23] hover:bg-red-950/40 text-zinc-400 hover:text-red-400 transition-colors"
                          title="حذف"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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

      {/* TAB 2: INQUIRIES */}
      {activeTab === 'inquiries' && (
        <div className="space-y-4">
          <div className="text-xs text-zinc-400">
            استفسارات العملاء المرسلة مباشرة من المتجر. استخدم أزرار واتساب والاتصال السريعة للرد الفوري.
          </div>

          {inquiries.length === 0 ? (
            <div className="text-center py-16 rounded-2xl border border-[#222530] bg-[#12141A] text-zinc-500">
              لا توجد استفسارات مستلمة حالياً.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-[#222530] bg-[#12141A]">
              <table className="w-full text-right text-xs text-zinc-300">
                <thead className="bg-[#0C0D11] border-b border-[#222530] text-[11px] font-black text-zinc-400">
                  <tr>
                    <th className="py-3.5 px-4">العميل</th>
                    <th className="py-3.5 px-4">الجهاز المطلوب</th>
                    <th className="py-3.5 px-4">الخيارات</th>
                    <th className="py-3.5 px-4">ملاحظات</th>
                    <th className="py-3.5 px-4">التاريخ</th>
                    <th className="py-3.5 px-4">الحالة</th>
                    <th className="py-3.5 px-4 text-left">تواصل سريع</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1B1E28]">
                  {inquiries.map((inq) => {
                    const waText = encodeURIComponent(
                      `مرحباً ${inq.customerName}، معك متجر 249 iPhone Store بخصوص استفسارك عن ${inq.productName}. سعر اليوم هو: `
                    );
                    return (
                      <tr key={inq.id} className="hover:bg-[#161820] transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-bold text-white">{inq.customerName}</div>
                          <div className="text-[11px] text-[#FF851B] font-mono">{inq.customerPhone}</div>
                        </td>
                        <td className="py-3 px-4 font-bold text-white">
                          {inq.productName}
                        </td>
                        <td className="py-3 px-4 text-zinc-400">
                          {inq.selectedStorage && <span className="ml-2">{inq.selectedStorage}</span>}
                          {inq.selectedColor && <span>{inq.selectedColor}</span>}
                        </td>
                        <td className="py-3 px-4 text-zinc-400 max-w-xs truncate">
                          {inq.notes || '—'}
                        </td>
                        <td className="py-3 px-4 text-zinc-500 text-[11px]">
                          {new Date(inq.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={inq.status}
                            onChange={(e) =>
                              handleUpdateInquiryStatus(inq.id, e.target.value as any)
                            }
                            className={`px-2 py-1 rounded text-[10px] font-extrabold bg-[#181B24] border ${
                              inq.status === 'completed'
                                ? 'text-emerald-400 border-emerald-500/40'
                                : inq.status === 'contacted'
                                ? 'text-amber-400 border-amber-500/40'
                                : 'text-[#FF851B] border-[#FF7A00]/40'
                            }`}
                          >
                            <option value="pending">قيد الانتظار</option>
                            <option value="contacted">تم التواصل</option>
                            <option value="completed">مكتمل</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-left">
                          <div className="flex items-center justify-end gap-2">
                            <a
                              href={`https://wa.me/${inq.customerPhone.replace(/\D/g, '')}?text=${waText}`}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-900/60"
                              title="محادثة عبر واتساب"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </a>
                            <a
                              href={`tel:${inq.customerPhone}`}
                              className="p-1.5 rounded-lg bg-[#181B23] border border-[#2B2F3E] text-zinc-300 hover:text-white"
                              title="اتصال بالعميل"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="text-xs text-zinc-400">
            طلبات سلة الاستفسارات المباشرة من العملاء.
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-16 rounded-2xl border border-[#222530] bg-[#12141A] text-zinc-500">
              لم يتم استلام أي طلبات سلة حتى الآن.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-[#222530] bg-[#12141A]">
              <table className="w-full text-right text-xs text-zinc-300">
                <thead className="bg-[#0C0D11] border-b border-[#222530] text-[11px] font-black text-zinc-400">
                  <tr>
                    <th className="py-3.5 px-4">رقم الطلب</th>
                    <th className="py-3.5 px-4">العميل</th>
                    <th className="py-3.5 px-4">المنتجات</th>
                    <th className="py-3.5 px-4">العنوان</th>
                    <th className="py-3.5 px-4">التاريخ</th>
                    <th className="py-3.5 px-4">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1B1E28]">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-[#161820] transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-[#FF851B]">
                        {o.id}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-white">{o.customerName}</div>
                        <div className="text-xs text-zinc-400 font-mono">{o.customerPhone}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="space-y-1">
                          {o.items.map((i, idx) => (
                            <div key={idx} className="text-white">
                              {i.name} ×{i.qty}
                              {i.selectedStorage && <span className="text-zinc-400 text-[11px]"> ({i.selectedStorage})</span>}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-zinc-400">
                        {o.address}، {o.city}
                      </td>
                      <td className="py-3 px-4 text-zinc-500 text-[11px]">
                        {new Date(o.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={o.status}
                          onChange={(e) =>
                            handleUpdateOrderStatus(o.id, e.target.value as any)
                          }
                          className="px-2 py-1 rounded text-[10px] font-bold bg-[#181B24] border border-[#2B2F3D] text-zinc-300"
                        >
                          <option value="inquiry_received">تم استلام الطلب</option>
                          <option value="pricing_sent">تم إرسال السعر</option>
                          <option value="confirmed">تم التأكيد</option>
                          <option value="delivered">تم التسليم</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Product Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div
            className="w-full max-w-xl bg-[#12141A] border border-[#2B2F3D] rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-black text-white tracking-tight mb-4">
              {editingProduct ? 'تعديل الجهاز' : 'إضافة جهاز جديد'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">
                  اسم الجهاز *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="مثال: iPhone 16 Pro Max"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#171922] border border-[#272B37] text-white text-xs focus:border-[#FF7A00] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-1">
                    القسم *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#171922] border border-[#272B37] text-white text-xs focus:border-[#FF7A00] focus:outline-none"
                  >
                    <option value="iPhone">iPhone</option>
                    <option value="AirPods">AirPods</option>
                    <option value="Apple Watch">Apple Watch</option>
                    <option value="iPad">iPad</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-1">
                    كمية المخزون
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#171922] border border-[#272B37] text-white text-xs focus:border-[#FF7A00] focus:outline-none"
                  />
                </div>
              </div>

              {/* Price Notice */}
              <div className="p-3 rounded-xl bg-[#FF7A00]/10 border border-[#FF7A00]/30 text-xs text-zinc-300">
                <strong className="text-[#FF851B] block">سياسة التسعير المطبقة:</strong>
                جميع أسعار الأجهزة مقفلة على <strong className="text-white">$0.00</strong> لتشجيع العملاء على المراسلة لمعرفة السعر الفعلي.
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">
                  رابط صورة المنتج (صورة حقيقية) *
                </label>
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#171922] border border-[#272B37] text-white text-xs focus:border-[#FF7A00] focus:outline-none"
                />
                {formData.image && (
                  <div className="mt-2 flex items-center gap-3">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-12 h-12 object-contain bg-[#0C0D11] p-1 rounded-lg border border-[#262A38]"
                    />
                    <span className="text-[11px] text-zinc-400">معاينة الصورة</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">
                  الوصف / المواصفات التقنية
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="مواصفات الجهاز الدقيقة، المعالج، الشاشة..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#171922] border border-[#272B37] text-white text-xs focus:border-[#FF7A00] focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-1">
                    خيارات السعة (مفصولة بفواصل)
                  </label>
                  <input
                    type="text"
                    value={formData.storageOptions}
                    onChange={(e) => setFormData({ ...formData, storageOptions: e.target.value })}
                    placeholder="128GB, 256GB, 512GB"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#171922] border border-[#272B37] text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-1">
                    الألوان (مفصولة بفواصل)
                  </label>
                  <input
                    type="text"
                    value={formData.colors}
                    onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                    placeholder="تيتانيوم طبيعي، أسود، أبيض"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#171922] border border-[#272B37] text-white text-xs"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#222530]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#1A1D26] text-zinc-400 hover:text-white text-xs font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#FF7A00] hover:bg-[#FF851B] text-black font-black text-xs"
                >
                  حفظ الجهاز
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
