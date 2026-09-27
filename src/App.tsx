import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { InquireModal } from './components/InquireModal';
import { CartDrawer } from './components/CartDrawer';
import { AdminPanel } from './components/AdminPanel';
import { OrdersView } from './components/OrdersView';
import { Footer } from './components/Footer';
import { StorageService } from './services/storage';
import { Product, ProductCategory, CartItem, ProductInquiry, Order } from './types';
import { Filter, SlidersHorizontal, MessageCircle, Phone, Sparkles } from 'lucide-react';
import { STORE_PHONE_NUMBER, STORE_WHATSAPP_LINK } from './data/initialProducts';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [inquiries, setInquiries] = useState<ProductInquiry[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Navigation & Modals
  const [activeView, setActiveView] = useState<'store' | 'admin' | 'orders'>('store');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [inquireProduct, setInquireProduct] = useState<Product | null>(null);
  const [inquireColor, setInquireColor] = useState<string>('');
  const [inquireStorage, setInquireStorage] = useState<string>('');

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [sortBy, setSortBy] = useState<'default' | 'name' | 'stock'>('default');

  // Load initial data
  const loadData = () => {
    setProducts(StorageService.getProducts());
    setCart(StorageService.getCart());
    setInquiries(StorageService.getInquiries());
    setOrders(StorageService.getOrders());
  };

  useEffect(() => {
    loadData();
  }, []);

  // Cart operations
  const handleAddToCart = (product: Product, color?: string, storage?: string) => {
    const updatedCart = StorageService.addToCart(product, color, storage);
    setCart([...updatedCart]);
  };

  const handleUpdateCartQty = (productId: string, qty: number, color?: string, storage?: string) => {
    const updatedCart = StorageService.updateCartQty(productId, qty, color, storage);
    setCart([...updatedCart]);
  };

  const handleOpenInquire = (product: Product, color?: string, storage?: string) => {
    setInquireProduct(product);
    setInquireColor(color || '');
    setInquireStorage(storage || '');
  };

  const handleInquirySubmitted = () => {
    setInquiries(StorageService.getInquiries());
  };

  const handleOrderSuccess = () => {
    setCart([]);
    setOrders(StorageService.getOrders());
  };

  // Filter & search products
  const categories: ProductCategory[] = ['All', 'iPhone', 'AirPods', 'Apple Watch', 'iPad', 'Accessories'];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      (product.specs && product.specs.some(s => s.toLowerCase().includes(query)));

    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'stock') return b.stock - a.stock;
    return 0; // default
  });

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#090A0C] text-[#F3F4F6]">
      {/* Top Navigation */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        activeView={activeView}
        setActiveView={setActiveView}
        isAdmin={isAdmin}
        onToggleAdmin={() => {
          setIsAdmin(!isAdmin);
          if (!isAdmin) setActiveView('admin');
          else setActiveView('store');
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeView === 'admin' ? (
          <AdminPanel
            products={products}
            onRefreshProducts={loadData}
            onExitAdmin={() => setActiveView('store')}
          />
        ) : activeView === 'orders' ? (
          <OrdersView
            orders={orders}
            inquiries={inquiries}
            onGoToStore={() => setActiveView('store')}
          />
        ) : (
          <div>
            {/* Hero Showcase Banner */}
            <HeroBanner
              onBrowsePhones={() => {
                setSelectedCategory('iPhone');
                const el = document.getElementById('productsSection');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenQuickQuote={() => {
                const firstPhone = products.find(p => p.category === 'iPhone') || products[0];
                if (firstPhone) handleOpenInquire(firstPhone);
              }}
            />

            {/* Storefront Catalog Section */}
            <div id="productsSection" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              
              {/* Category Navigation Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#20232E]">
                {/* Categories */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                  {categories.map((cat) => {
                    const count =
                      cat === 'All'
                        ? products.length
                        : products.filter(p => p.category === cat).length;
                    const isActive = selectedCategory === cat;

                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all ${
                          isActive
                            ? 'bg-[#FF7A00] text-black shadow-[0_0_16px_rgba(255,107,0,0.35)]'
                            : 'bg-[#13151B] text-zinc-400 hover:text-white border border-[#232634] hover:border-zinc-500'
                        }`}
                      >
                        <span>{cat}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                            isActive ? 'bg-black/20 text-black' : 'bg-[#1C1F28] text-zinc-400'
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Sort / Filter Options */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#FF7A00]" />
                    <span className="font-semibold">ترتيب حسب:</span>
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-3 py-1.5 rounded-xl bg-[#13151B] border border-[#232634] text-white text-xs font-bold focus:border-[#FF7A00] focus:outline-none"
                  >
                    <option value="default">الأجهزة المميزة</option>
                    <option value="name">الاسم (أبجدياً)</option>
                    <option value="stock">الأعلى توفراً بالمخزن</option>
                  </select>
                </div>
              </div>

              {/* Status Header: Count & Price Notice */}
              <div className="flex flex-wrap items-center justify-between gap-2 py-4 text-xs text-zinc-400">
                <div>
                  عرض <strong className="text-white">{sortedProducts.length}</strong> جهاز Apple
                  {selectedCategory !== 'All' && (
                    <span> في قسم <strong className="text-[#FF7A00]">{selectedCategory}</strong></span>
                  )}
                  {searchQuery && (
                    <span> يطابق "<strong className="text-white">{searchQuery}</strong>"</span>
                  )}
                </div>

                <div className="flex items-center gap-2 bg-[#12141A] px-3 py-1.5 rounded-xl border border-[#242735] text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00]" />
                  <span>جميع أسعار الهواتف = <strong className="text-white">$0.00</strong> (السعر الفعلي عبر واتساب)</span>
                </div>
              </div>

              {/* Products Grid */}
              {sortedProducts.length === 0 ? (
                <div className="text-center py-20 rounded-3xl border border-[#20232E] bg-[#101217] space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#FF7A00]/10 border border-[#FF7A00]/30 flex items-center justify-center mx-auto text-[#FF7A00]">
                    <Filter className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-white">لم يتم العثور على أجهزة</h3>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                    لم نعثر على أي أجهزة تطابق معايير البحث الحالية. يرجى اختيار قسم آخر أو مسح كلمة البحث.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setSearchQuery('');
                    }}
                    className="px-4 py-2 rounded-xl bg-[#FF7A00] text-black font-extrabold text-xs"
                  >
                    إعادة ضبط الفلاتر
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {sortedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onSelect={(p) => setSelectedProduct(p)}
                      onInquire={(p) => handleOpenInquire(p)}
                      onAddToCart={(p) => handleAddToCart(p)}
                    />
                  ))}
                </div>
              )}

              {/* Floating Quick Action Strip on Bottom Left for WhatsApp / Call */}
              <div className="fixed bottom-5 left-5 z-30 flex flex-col gap-2.5 items-start">
                <a
                  href={`${STORE_WHATSAPP_LINK}?text=Hello%20249%20iPhone%20Store%2C%20what%20is%20the%20price%20of%20this%3F`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-2xl transition-transform hover:scale-105"
                  title="تواصل معنا مباشرة عبر واتساب"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                  <span className="hidden sm:inline">واتساب 0121816126</span>
                </a>

                <a
                  href={`tel:${STORE_PHONE_NUMBER}`}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#14161D] hover:bg-[#1E212B] border border-[#2F3446] hover:border-[#FF7A00] text-white font-extrabold text-xs shadow-xl transition-all"
                  title="اتصل بالخط الساخن"
                >
                  <Phone className="w-4 h-4 text-[#FF7A00]" />
                  <span className="hidden sm:inline">اتصال {STORE_PHONE_NUMBER}</span>
                </a>
              </div>

            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveView('store');
          setSelectedCategory(cat);
          const el = document.getElementById('productsSection');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenAdmin={() => {
          setIsAdmin(true);
          setActiveView('admin');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenInquire={(p, clr, st) => {
          setSelectedProduct(null);
          handleOpenInquire(p, clr, st);
        }}
      />

      <InquireModal
        product={inquireProduct}
        selectedColor={inquireColor}
        selectedStorage={inquireStorage}
        onClose={() => setInquireProduct(null)}
        onInquirySubmitted={handleInquirySubmitted}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateCartQty}
        onOrderSuccess={handleOrderSuccess}
      />
    </div>
  );
}
