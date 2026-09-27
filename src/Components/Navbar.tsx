import React from 'react';
import { Phone, MessageCircle, ShoppingBag, ShieldCheck, Search, X } from 'lucide-react';
import { StoreLogo } from './StoreLogo';
import { STORE_PHONE_NUMBER, STORE_WHATSAPP_LINK } from '../data/initialProducts';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  activeView: 'store' | 'admin' | 'orders';
  setActiveView: (view: 'store' | 'admin' | 'orders') => void;
  isAdmin: boolean;
  onToggleAdmin: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  activeView,
  setActiveView,
  isAdmin,
  onToggleAdmin,
  searchQuery,
  setSearchQuery
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#22252E] bg-[#0A0B0E]/95 backdrop-blur-md">
      {/* Top Notice Bar with Direct Phone & Market Notice */}
      <div className="bg-[#121419] border-b border-[#1F222B] px-4 py-1.5 text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#FF7A00] animate-pulse"></span>
            <span className="font-semibold text-white">الخط الساخن للأسعار المباشرة:</span>
            <span className="text-zinc-300">جميع أسعار الهواتف $0.00 — راسلنا مباشرة لمعرفة سعر السوق الحالي!</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a
              href={`tel:${STORE_PHONE_NUMBER}`}
              className="flex items-center gap-1.5 font-bold text-[#FF7A00] hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{STORE_PHONE_NUMBER}</span>
            </a>
            <span className="text-zinc-600">|</span>
            <a
              href={STORE_WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>واتساب مباشر</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div
            onClick={() => setActiveView('store')}
            className="cursor-pointer transition-opacity hover:opacity-95"
            id="brandLogoBtn"
          >
            <StoreLogo size="md" showPhone={true} />
          </div>

          {/* Search Box in Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="ابحث عن موديلات iPhone، AirPods، المواصفات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 pl-9 py-2 rounded-xl bg-[#14161C] border border-[#272A34] text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-[#FF7A00] focus:ring-1 focus:ring-[#FF7A00] transition-all text-right"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* View Store Tab */}
            <button
              onClick={() => setActiveView('store')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeView === 'store'
                  ? 'bg-[#1C1E26] text-[#FF7A00] border border-[#FF7A00]/40'
                  : 'text-zinc-400 hover:text-white hover:bg-[#14161C]'
              }`}
            >
              المتجر
            </button>

            {/* Orders / Inquiries Tab */}
            <button
              onClick={() => setActiveView('orders')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeView === 'orders'
                  ? 'bg-[#1C1E26] text-[#FF7A00] border border-[#FF7A00]/40'
                  : 'text-zinc-400 hover:text-white hover:bg-[#14161C]'
              }`}
            >
              الاستفسارات
            </button>

            {/* Admin Toggle */}
            <button
              onClick={onToggleAdmin}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                isAdmin
                  ? 'bg-[#FF7A00]/10 text-[#FF7A00] border-[#FF7A00]'
                  : 'bg-[#14161C] text-zinc-400 border-[#272A34] hover:text-white'
              }`}
              title={isAdmin ? 'وضع الإدارة مفعل' : 'التبديل إلى لوحة الإدارة'}
            >
              <ShieldCheck className="w-4 h-4 text-[#FF7A00]" />
              <span className="hidden sm:inline">{isAdmin ? 'لوحة الإدارة' : 'الإدارة'}</span>
            </button>

            {/* Cart / Inquiry Bag Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FF7A00] hover:bg-[#FF851B] text-black font-extrabold text-xs transition-all orange-glow-sm"
              id="openCartBtn"
            >
              <ShoppingBag className="w-4 h-4 text-black" />
              <span className="hidden sm:inline">سلة الاستفسارات</span>
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-black text-[#FF7A00] text-[11px] font-black">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 md:hidden">
          <div className="relative w-full">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="ابحث عن أجهزة iPhone والمقترحات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-9 py-2 rounded-xl bg-[#14161C] border border-[#272A34] text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-[#FF7A00] text-right"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
