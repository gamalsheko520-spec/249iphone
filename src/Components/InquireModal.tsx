import React, { useState } from 'react';
import { X, MessageCircle, Phone, Send, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';
import { StorageService } from '../services/storage';
import { STORE_PHONE_NUMBER, STORE_WHATSAPP_LINK } from '../data/initialProducts';

interface InquireModalProps {
  product: Product | null;
  selectedColor?: string;
  selectedStorage?: string;
  onClose: () => void;
  onInquirySubmitted?: () => void;
}

export const InquireModal: React.FC<InquireModalProps> = ({
  product,
  selectedColor = '',
  selectedStorage = '',
  onClose,
  onInquirySubmitted
}) => {
  if (!product) return null;

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [storage, setStorage] = useState(selectedStorage || product.storageOptions?.[0] || '');
  const [color, setColor] = useState(selectedColor || product.colors?.[0] || '');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;

    StorageService.addInquiry({
      productId: product.id,
      productName: product.name,
      customerName,
      customerPhone,
      selectedStorage: storage,
      selectedColor: color,
      notes
    });

    setIsSubmitted(true);
    if (onInquirySubmitted) onInquirySubmitted();
  };

  const whatsAppText = encodeURIComponent(
    `${product.name} - what is the price of this?`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div
        className="relative w-full max-w-lg bg-[#12141A] border border-[#2B2F3D] rounded-3xl p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#1A1D26] hover:bg-[#282D3B] text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#FF7A00]/20 border border-[#FF7A00] flex items-center justify-center text-[#FF7A00]">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white tracking-tight">
                  طلب استفسار عن السعر
                </h3>
                <p className="text-xs text-zinc-400">
                  استفسار مباشر عن جهاز <span className="text-white font-bold">{product.name}</span>
                </p>
              </div>
            </div>

            <div className="bg-[#0C0E13] p-3.5 rounded-xl border border-[#222530] mb-5 text-xs text-zinc-300 flex items-center justify-between">
              <div>
                <div className="font-semibold text-white">{product.name}</div>
                <div className="text-zinc-400">جهاز آبل أصلي معتمد • السعر: $0.00</div>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#FF7A00]/15 text-[#FF851B] font-bold text-[11px]">
                تسعير عند الطلب
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.storageOptions && product.storageOptions.length > 0 && (
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 mb-1">
                      السعة التخزينية
                    </label>
                    <select
                      value={storage}
                      onChange={(e) => setStorage(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#171922] border border-[#272B37] text-white text-xs focus:border-[#FF7A00] focus:outline-none"
                    >
                      {product.storageOptions.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {product.colors && product.colors.length > 0 && (
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 mb-1">
                      اللون المفضل
                    </label>
                    <select
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#171922] border border-[#272B37] text-white text-xs focus:border-[#FF7A00] focus:outline-none"
                    >
                      {product.colors.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">
                  الاسم الكامل *
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: أحمد علي"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#171922] border border-[#272B37] text-white text-xs placeholder-zinc-500 focus:border-[#FF7A00] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">
                  رقم الهاتف (واتساب أو اتصال) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="مثال: 0121816126"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#171922] border border-[#272B37] text-white text-xs placeholder-zinc-500 focus:border-[#FF7A00] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">
                  ملاحظات أو استفسار محدد (اختياري)
                </label>
                <textarea
                  rows={2}
                  placeholder="اسأل عن الضمان، التوصيل إلى منطقتك، الاستبدال..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#171922] border border-[#272B37] text-white text-xs placeholder-zinc-500 focus:border-[#FF7A00] focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2 space-y-2.5">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#FF7A00] hover:bg-[#FF851B] text-black font-black text-xs transition-all orange-glow"
                >
                  <Send className="w-4 h-4 text-black" />
                  <span>إرسال طلب السعر</span>
                </button>

                <a
                  href={`${STORE_WHATSAPP_LINK}?text=${whatsAppText}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#191D26] hover:bg-[#222734] border border-[#2A2E3D] text-white font-bold text-xs transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>أو تواصل فوراً عبر واتساب</span>
                </a>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl font-black text-white">تم استلام طلبك بنجاح!</h3>
              <p className="text-xs text-zinc-300 mt-2 max-w-sm mx-auto leading-relaxed">
                شكراً لك، <strong className="text-white">{customerName}</strong>! سيتواصل معك فريق مبيعات 249 iPhone Store قريباً على الرقم <strong className="text-[#FF7A00]">{customerPhone}</strong> لتزويدك بأفضل سعر حي اليوم.
              </p>
            </div>

            <div className="bg-[#0D0E13] p-4 rounded-2xl border border-[#21242E] max-w-sm mx-auto text-xs text-zinc-300 space-y-1 text-right">
              <div><strong className="text-zinc-400">الجهاز:</strong> {product.name}</div>
              {storage && <div><strong className="text-zinc-400">السعة:</strong> {storage}</div>}
              {color && <div><strong className="text-zinc-400">اللون:</strong> {color}</div>}
              <div><strong className="text-zinc-400">هاتف المتجر:</strong> {STORE_PHONE_NUMBER}</div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
              <a
                href={`${STORE_WHATSAPP_LINK}?text=${whatsAppText}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>المتابعة عبر واتساب</span>
              </a>

              <a
                href={`tel:${STORE_PHONE_NUMBER}`}
                className="w-full sm:w-auto flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#1A1D26] hover:bg-[#232733] border border-[#2B2F3D] text-white font-bold text-xs transition-all"
              >
                <Phone className="w-4 h-4 text-[#FF7A00]" />
                <span>الاتصال بالخط الساخن</span>
              </a>
            </div>

            <button
              onClick={onClose}
              className="text-xs text-zinc-400 hover:text-white underline pt-2 block mx-auto"
            >
              العودة إلى المتجر
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
