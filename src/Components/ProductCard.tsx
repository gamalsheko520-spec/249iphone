import React, { useState } from 'react';
import { MessageCircle, Phone, Info, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types';
import { STORE_PHONE_NUMBER, STORE_WHATSAPP_LINK } from '../data/initialProducts';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onInquire: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onInquire,
  onAddToCart
}) => {
  const [addedAnim, setAddedAnim] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1500);
  };

  const encodedWhatsAppMsg = encodeURIComponent(
    `${product.name} - what is the price of this?`
  );

  return (
    <div
      onClick={() => onSelect(product)}
      className="group relative flex flex-col bg-[#12141A] border border-[#232632] hover:border-[#FF7A00] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_24px_-4px_rgba(255,107,0,0.3)] cursor-pointer"
    >
      {/* Top Image Container with Badges */}
      <div className="relative w-full aspect-square bg-[#0C0D12] overflow-hidden flex items-center justify-center p-4">
        {/* Subtle radial lighting behind device */}
        <div className="absolute inset-0 bg-radial from-zinc-800/20 to-transparent opacity-50 group-hover:opacity-80 transition-opacity" />
        
        <img
          src={imgError ? 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=600&q=80' : product.image}
          alt={product.name}
          onError={() => setImgError(true)}
          className="relative z-10 w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5 items-start">
          {product.badge && (
            <span className="px-2.5 py-1 rounded-md bg-[#FF7A00] text-black text-[10px] font-black uppercase tracking-wider shadow-sm">
              {product.badge}
            </span>
          )}
          <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-[#2E3240] text-zinc-300 text-[10px] font-semibold uppercase">
            {product.category}
          </span>
        </div>

        {/* Stock Badge */}
        <div className="absolute top-3 right-3 z-20">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#1A1D26] border border-[#2F3445] text-emerald-400">
            {product.stock > 0 ? `متوفر (${product.stock})` : 'طلب مسبق'}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-lg font-black text-white group-hover:text-[#FF7A00] transition-colors tracking-tight line-clamp-1">
            {product.name}
          </h3>

          <p className="mt-1.5 text-xs text-zinc-400 line-clamp-2 leading-relaxed font-normal">
            {product.description}
          </p>

          {/* Quick Specs Pills */}
          {product.specs && product.specs.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {product.specs.slice(0, 2).map((spec, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-[#181B23] border border-[#282B37] text-[10px] text-zinc-300 font-medium"
                >
                  {spec}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Pricing Area: $0.00 with Bold Message for Price Badge */}
        <div className="pt-3 border-t border-[#1F222C] space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-bold text-zinc-400">
                السعر المعروض
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-black text-white tracking-tight">
                  $0.00
                </span>
              </div>
            </div>

            {/* High-Contrast Orange Message Badge */}
            <div className="px-2.5 py-1 rounded-lg bg-[#FF7A00]/15 border border-[#FF7A00] text-[#FF851B] text-xs font-extrabold">
              راسلنا لمعرفة السعر
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            {/* Direct WhatsApp CTA */}
            <a
              href={`${STORE_WHATSAPP_LINK}?text=${encodedWhatsAppMsg}`}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="col-span-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#FF7A00] hover:bg-[#FF851B] text-black font-extrabold text-xs transition-all orange-glow-sm"
              title="راسل المتجر عبر واتساب لمعرفة السعر الفوري"
            >
              <MessageCircle className="w-4 h-4 text-black" />
              <span>واتساب</span>
            </a>

            {/* Direct Inquiry Modal CTA */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onInquire(product);
              }}
              className="col-span-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#1A1D26] hover:bg-[#232733] border border-[#2F3445] hover:border-[#FF7A00]/50 text-white font-bold text-xs transition-all"
            >
              <Info className="w-4 h-4 text-[#FF7A00]" />
              <span>استفسار</span>
            </button>
          </div>

          {/* Secondary Options: Call or Add to Inquiry Bag */}
          <div className="flex items-center justify-between text-xs pt-0.5">
            <a
              href={`tel:${STORE_PHONE_NUMBER}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#FF7A00]" />
              <span>اتصال {STORE_PHONE_NUMBER}</span>
            </a>

            <button
              onClick={handleAdd}
              className={`flex items-center gap-1 font-bold transition-all ${
                addedAnim ? 'text-emerald-400' : 'text-[#FF7A00] hover:text-white'
              }`}
            >
              {addedAnim ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>تمت الإضافة</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>إضافة للسلة</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
