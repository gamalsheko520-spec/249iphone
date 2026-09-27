import React from 'react';
import { Phone, MessageCircle, ShieldCheck, MapPin, Clock } from 'lucide-react';
import { StoreLogo } from './StoreLogo';
import { STORE_PHONE_NUMBER, STORE_WHATSAPP_LINK } from '../data/initialProducts';

interface FooterProps {
  onSelectCategory: (cat: any) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenAdmin
}) => {
  return (
    <footer className="mt-20 border-t border-[#222530] bg-[#090A0D] text-zinc-400">
      {/* Top Banner with Direct Support */}
      <div className="border-b border-[#1A1D26] bg-[#0F1116] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#FF7A00]/15 text-[#FF851B] border border-[#FF7A00]/30">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-zinc-400">
                الخط الساخن لخدمة العملاء
              </div>
              <a
                href={`tel:${STORE_PHONE_NUMBER}`}
                className="text-xl font-black text-white hover:text-[#FF7A00] transition-colors italic tracking-tight"
              >
                {STORE_PHONE_NUMBER}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`${STORE_WHATSAPP_LINK}?text=Hello%20249%20iPhone%20Store%2C%20what%20is%20the%20price%20of%20this%3F`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>ممثلو خدمة العملاء على واتساب</span>
            </a>

            <a
              href={`tel:${STORE_PHONE_NUMBER}`}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#171922] hover:bg-[#20232E] border border-[#2A2E3B] text-white font-bold text-xs transition-all"
            >
              <Phone className="w-4 h-4 text-[#FF7A00]" />
              <span>اتصال مباشر</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Logo */}
          <div className="md:col-span-2 space-y-4">
            <StoreLogo size="lg" showPhone={true} />
            
            <p className="text-xs text-zinc-400 max-w-md leading-relaxed">
              وجهتكم الأولى لأجهزة Apple iPhone الذكية الأصلية، وسماعات AirPods، وأجهزة Apple المعتمدة.
              نظراً لتغيرات الأسعار اللحظية، تم تحديد أسعار الهواتف بقيمة <span className="text-white font-bold">$0.00</span> ليتمكن عملاؤنا من مراسلتنا مباشرة وحجز أقل سعر فوري.
            </p>

            <div className="flex items-center gap-3 text-xs text-zinc-400">
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" /> منتجات آبل أصلية 100%
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-zinc-300">
                <Clock className="w-4 h-4 text-[#FF7A00]" /> استجابة فورية وسريعة
              </span>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white">
              تشكيلة الأجهزة
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectCategory('iPhone')}
                  className="hover:text-[#FF7A00] transition-colors"
                >
                  سلسلة iPhone 16 (Pro &amp; Pro Max)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('iPhone')}
                  className="hover:text-[#FF7A00] transition-colors"
                >
                  سلسلة iPhone 15
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('AirPods')}
                  className="hover:text-[#FF7A00] transition-colors"
                >
                  AirPods Pro (الجيل الثاني)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Apple Watch')}
                  className="hover:text-[#FF7A00] transition-colors"
                >
                  Apple Watch Ultra 2
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Accessories')}
                  className="hover:text-[#FF7A00] transition-colors"
                >
                  شواحن أصلية 20W و MagSafe
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Admin */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white">
              التواصل والإدارة
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#FF7A00]" />
                <a href={`tel:${STORE_PHONE_NUMBER}`} className="hover:text-white font-mono">
                  {STORE_PHONE_NUMBER}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <a href={STORE_WHATSAPP_LINK} target="_blank" rel="noreferrer" className="hover:text-white">
                  واتساب: {STORE_PHONE_NUMBER}
                </a>
              </li>
              <li className="pt-2 border-t border-[#1C1E26]">
                <button
                  onClick={onOpenAdmin}
                  className="text-xs font-bold text-[#FF7A00] hover:text-white transition-colors"
                >
                  دخول لوحة الإدارة ←
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-10 pt-6 border-t border-[#1A1D26] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            © {new Date().getFullYear()} <span className="text-white font-bold">249 IPHONE STORE</span>. جميع الحقوق محفوظة. الهاتف: {STORE_PHONE_NUMBER}
          </div>
          <div className="flex items-center gap-4">
            <span>إصدار الأسود والبرتقالي عالي التباين</span>
            <span>•</span>
            <span>تسعير مباشر عبر المراسلة</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
