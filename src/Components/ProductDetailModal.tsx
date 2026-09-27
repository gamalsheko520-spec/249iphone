import React, { useState } from 'react';
import { X, MessageCircle, Phone, ShoppingBag, CheckCircle, Shield, Truck, RefreshCw } from 'lucide-react';
import { Product } from '../types';
import { STORE_PHONE_NUMBER, STORE_WHATSAPP_LINK } from '../data/initialProducts';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, selectedColor?: string, selectedStorage?: string) => void;
  onOpenInquire: (product: Product, selectedColor?: string, selectedStorage?: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenInquire
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors && product.colors.length > 0 ? product.colors[0] : ''
  );
  const [selectedStorage, setSelectedStorage] = useState<string>(
    product.storageOptions && product.storageOptions.length > 0 ? product.storageOptions[0] : ''
  );
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product, selectedColor, selectedStorage);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const whatsAppText = encodeURIComponent(
    `${product.name} - what is the price of this?`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
      <div
        className="relative w-full max-w-3xl bg-[#12141A] border border-[#2B2F3D] rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#1A1D26] hover:bg-[#282D3B] text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Product Photo & Badges */}
          <div className="relative bg-[#090A0D] p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#222530]">
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.badge && (
                <span className="px-3 py-1 rounded-md bg-[#FF7A00] text-black text-xs font-black uppercase tracking-wider">
                  {product.badge}
                </span>
              )}
              <span className="px-2.5 py-0.5 rounded bg-black/60 border border-[#2B2F3E] text-zinc-300 text-[11px] font-semibold uppercase">
                {product.category}
              </span>
            </div>

            <div className="w-full max-w-[280px] aspect-square flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]"
              />
            </div>

            <div className="mt-6 w-full space-y-2 text-xs text-zinc-400 border-t border-[#1C1F28] pt-4">
              <div className="flex items-center gap-2 text-zinc-300">
                <Shield className="w-4 h-4 text-[#FF7A00]" />
                <span>أجهزة آبل أصلية 100% ومضمونة</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <Truck className="w-4 h-4 text-[#FF7A00]" />
                <span>توصيل فوري / استلام مباشر من المتجر</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <RefreshCw className="w-4 h-4 text-[#FF7A00]" />
                <span>جديد بالكرتون ومختوم بالضمان الرسمي</span>
              </div>
            </div>
          </div>

          {/* Right Column: Specs, Options & Action */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {product.name}
                </h2>
                <div className="mt-2 flex items-center gap-3">
                  <span className="text-2xl font-black text-white">$0.00</span>
                  <span className="px-2.5 py-1 rounded-md bg-[#FF7A00]/20 border border-[#FF7A00] text-[#FF851B] text-xs font-black">
                    تواصل لمعرفة السعر
                  </span>
                </div>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                {product.description}
              </p>

              {/* Storage Selector */}
              {product.storageOptions && product.storageOptions.length > 0 && (
                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-2">
                    اختر السعة التخزينية:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.storageOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSelectedStorage(opt)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border transition-all ${
                          selectedStorage === opt
                            ? 'bg-[#FF7A00] text-black border-[#FF7A00]'
                            : 'bg-[#171922] text-zinc-300 border-[#282B37] hover:border-zinc-500'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-2">
                    الألوان المتوفرة:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((clr) => (
                      <button
                        key={clr}
                        onClick={() => setSelectedColor(clr)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                          selectedColor === clr
                            ? 'bg-[#1F232F] text-white border-[#FF7A00] ring-1 ring-[#FF7A00]'
                            : 'bg-[#151720] text-zinc-400 border-[#282B37] hover:text-white'
                        }`}
                      >
                        {clr}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Specs Highlights */}
              {product.specs && product.specs.length > 0 && (
                <div className="space-y-1.5 pt-2">
                  <div className="text-[11px] font-bold text-zinc-400">
                    أبرز المواصفات التقنية:
                  </div>
                  <ul className="space-y-1 text-xs text-zinc-300">
                    {product.specs.map((s, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00]" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="space-y-2.5 pt-4 border-t border-[#20232E]">
              {/* WhatsApp Direct */}
              <a
                href={`${STORE_WHATSAPP_LINK}?text=${whatsAppText}`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-[#FF7A00] hover:bg-[#FF851B] text-black font-black text-sm transition-all orange-glow"
              >
                <MessageCircle className="w-5 h-5 text-black" />
                <span>راسلنا لمعرفة السعر عبر واتساب</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${STORE_PHONE_NUMBER}`}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#1A1D26] hover:bg-[#232733] border border-[#2F3445] text-white font-bold text-xs transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#FF7A00]" />
                  <span>اتصال {STORE_PHONE_NUMBER}</span>
                </a>

                <button
                  onClick={handleAddToCart}
                  className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border font-bold text-xs transition-all ${
                    isAdded
                      ? 'bg-emerald-600 text-white border-emerald-500'
                      : 'bg-[#1A1D26] hover:bg-[#232733] border-[#2F3445] text-[#FF7A00] hover:text-white'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>تمت الإضافة للسلة</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>إضافة للسلة</span>
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenInquire(product, selectedColor, selectedStorage);
                }}
                className="w-full text-center text-xs text-zinc-400 hover:text-[#FF7A00] transition-colors font-semibold pt-1"
              >
                أو إرسال طلب استفسار مباشر مع ملاحظاتك الخاصة ←
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
