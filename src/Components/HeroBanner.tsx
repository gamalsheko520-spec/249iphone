import React from 'react';
import { Phone, MessageCircle, Shield, Zap, Sparkles, CheckCircle2 } from 'lucide-react';
import { STORE_PHONE_NUMBER, STORE_WHATSAPP_LINK } from '../data/initialProducts';

interface HeroBannerProps {
  onBrowsePhones: () => void;
  onOpenQuickQuote: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onBrowsePhones,
  onOpenQuickQuote
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#111318] via-[#0D0E12] to-[#090A0C] border-b border-[#222530]">
      {/* Subtle orange accent glow behind content */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF6B00]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-72 h-72 bg-[#FF7A00]/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Headline Column */}
          <div className="lg:col-span-8 space-y-5">
            {/* Live Pricing Notification Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181B22] border border-[#FF7A00]/40 text-xs font-bold text-[#FF851B]">
              <span className="w-2 h-2 rounded-full bg-[#FF7A00] animate-ping" />
              <Sparkles className="w-3.5 h-3.5 text-[#FF7A00]" />
              <span>سياسة التسعير المباشر الرسمية</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-[1.08]">
              249 <span className="text-[#FF7A00] drop-shadow-[0_0_20px_rgba(255,107,0,0.4)]">IPHONE</span> STORE
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 font-medium max-w-2xl leading-relaxed">
              اكتشف أحدث هواتف Apple iPhone الأصلية، وسماعات AirPods، وإكسسوارات آبل المعتمدة.
              جميع أسعار الهواتف معروضة بقيمة <span className="text-[#FF7A00] font-bold">$0.00</span> — تواصل معنا مباشرة عبر واتساب للحصول على أسعار السوق الفورية وتوفر الألوان!
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href={`${STORE_WHATSAPP_LINK}?text=Hello%20249%20iPhone%20Store%2C%20what%20is%20the%20price%20of%20this%3F`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#FF7A00] hover:bg-[#FF851B] text-black font-black text-sm transition-all orange-glow transform active:scale-95"
              >
                <MessageCircle className="w-5 h-5 text-black" />
                <span>راسلنا لمعرفة السعر عبر واتساب</span>
              </a>

              <a
                href={`tel:${STORE_PHONE_NUMBER}`}
                className="flex items-center gap-2.5 px-5 py-3.5 rounded-xl bg-[#171922] hover:bg-[#1F222D] border border-[#2B2F3D] hover:border-[#FF7A00]/50 text-white font-bold text-sm tracking-wide transition-all"
              >
                <Phone className="w-4 h-4 text-[#FF7A00]" />
                <span>اتصل بنا: {STORE_PHONE_NUMBER}</span>
              </a>

              <button
                onClick={onOpenQuickQuote}
                className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-transparent hover:bg-[#14161C] text-zinc-300 hover:text-white font-semibold text-sm transition-all"
              >
                <span>طلب تسعيرة خاصة ←</span>
              </button>
            </div>

            {/* Value Guarantees */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-[#1C1F28] text-xs">
              <div className="flex items-center gap-2 text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-[#FF7A00] flex-shrink-0" />
                <span>منتجات آبل أصلية 100%</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-[#FF7A00] flex-shrink-0" />
                <span>بضاعة مختومة ومضمونة</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-[#FF7A00] flex-shrink-0" />
                <span>توصيل فوري ومباشر</span>
              </div>
            </div>
          </div>

          {/* Right Highlight Box: Quick Hotline Card */}
          <div className="lg:col-span-4">
            <div className="bg-[#13151C] border border-[#272A36] rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-[#FF7A00]/10 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase font-extrabold tracking-widest text-[#FF7A00]">
                  الاتصال الرسمي
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  متصل الآن
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-xs text-zinc-400 font-medium">الخط المباشر / خدمة العملاء</div>
                  <a
                    href={`tel:${STORE_PHONE_NUMBER}`}
                    className="text-2xl font-black tracking-tight text-white hover:text-[#FF7A00] transition-colors italic block mt-0.5"
                  >
                    {STORE_PHONE_NUMBER}
                  </a>
                </div>

                <div className="text-xs text-zinc-400 leading-relaxed bg-[#0C0D11] p-3 rounded-xl border border-[#20222C]">
                  <strong className="text-white block mb-1">لماذا أسعار الهواتف $0.00؟</strong>
                  لتقديم أفضل أسعار حية ومباشرة بدون زيادات وسطاء، يتم تحديد أسعار iPhone لحظياً بحسب مخزون اليوم وسعر الصرف المباشر.
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <a
                    href={`${STORE_WHATSAPP_LINK}?text=Hello%20249%20iPhone%20Store%2C%20what%20is%20the%20price%20of%20this%3F`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs text-center flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>احصل على أسعار اليوم عبر واتساب</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
