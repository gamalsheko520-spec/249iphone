import React, { useState } from 'react';
import { X, Trash2, MessageCircle, Phone, ArrowRight, CheckCircle, ShieldAlert } from 'lucide-react';
import { CartItem } from '../types';
import { StorageService } from '../services/storage';
import { STORE_PHONE_NUMBER, STORE_WHATSAPP_LINK } from '../data/initialProducts';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (productId: string, qty: number, color?: string, storage?: string) => void;
  onOrderSuccess: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onOrderSuccess
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'review' | 'checkout' | 'success'>('review');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [notes, setNotes] = useState('');

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;

    StorageService.createOrder({
      customerName,
      customerPhone,
      address: address || 'Store Pickup / Direct Delivery',
      city: city || 'Sudan',
      items: cart.map(i => ({
        productId: i.product.id,
        name: i.product.name,
        price: 0,
        qty: i.qty,
        selectedColor: i.selectedColor,
        selectedStorage: i.selectedStorage
      })),
      total: 0,
      notes
    });

    setStep('success');
    onOrderSuccess();
  };

  const whatsAppSummaryText = encodeURIComponent(
    cart.length === 1
      ? `${cart[0].product.name} - what is the price of this?`
      : cart.length > 1
      ? `${cart.map(i => i.product.name).join(', ')} - what is the price of this?`
      : `What is the price of this?`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#101217] border-l border-[#242733] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-[#20232E] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-black text-lg text-white tracking-tight">
                سلة الاستفسارات
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#FF7A00]/20 text-[#FF851B] text-xs font-extrabold">
                {totalItems} منتج
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#1A1D26] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5">
            {step === 'review' && (
              <>
                {cart.length === 0 ? (
                  <div className="text-center py-16 text-zinc-400 space-y-3">
                    <p className="text-sm font-semibold">سلة الاستفسارات فارغة حالياً.</p>
                    <p className="text-xs text-zinc-500">
                      تصفح هواتف iPhone وإكسسواراتنا لطلب الأسعار المباشرة.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Notice */}
                    <div className="p-3.5 rounded-xl bg-[#171922] border border-[#272B38] text-xs text-zinc-300 flex items-start gap-2.5">
                      <ShieldAlert className="w-4 h-4 text-[#FF7A00] flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">تنبيه أسعار الهواتف:</strong>
                        <p className="text-zinc-400 text-[11px] mt-0.5">
                          الأسعار معروضة بقيمة $0.00. إرسال هذه السلة سيرسل طلباً لمتجر 249 iPhone Store (0121816126) لمعرفة السعر اللحظي الدقيق لهذا اليوم.
                        </p>
                      </div>
                    </div>

                    {/* Cart Items List */}
                    <div className="divide-y divide-[#1D202A]">
                      {cart.map((item, idx) => (
                        <div key={idx} className="py-3.5 flex gap-3.5 items-center">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 object-contain bg-[#090A0D] p-1.5 rounded-xl border border-[#232634] flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-black text-white truncate">
                              {item.product.name}
                            </h4>
                            <div className="text-xs text-zinc-400 mt-0.5">
                              {item.selectedStorage && <span className="ml-2">{item.selectedStorage}</span>}
                              {item.selectedColor && <span>{item.selectedColor}</span>}
                            </div>
                            <div className="mt-1 flex items-center gap-2">
                              <span className="text-xs font-bold text-white">$0.00</span>
                              <span className="text-[10px] text-[#FF851B] font-extrabold">
                                تواصل لمعرفة السعر
                              </span>
                            </div>
                          </div>

                          {/* Quantity & Delete */}
                          <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-2 bg-[#171922] border border-[#272B37] rounded-lg px-2 py-0.5 text-xs text-white">
                              <button
                                onClick={() =>
                                  onUpdateQty(item.product.id, item.qty - 1, item.selectedColor, item.selectedStorage)
                                }
                                className="hover:text-[#FF7A00] font-bold"
                              >
                                -
                              </button>
                              <span className="font-bold">{item.qty}</span>
                              <button
                                onClick={() =>
                                  onUpdateQty(item.product.id, item.qty + 1, item.selectedColor, item.selectedStorage)
                                }
                                className="hover:text-[#FF7A00] font-bold"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() =>
                                onUpdateQty(item.product.id, 0, item.selectedColor, item.selectedStorage)
                              }
                              className="text-zinc-500 hover:text-red-400"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {step === 'checkout' && (
              <form onSubmit={handlePlaceOrder} className="space-y-4">
                <div className="text-xs font-bold text-[#FF7A00] mb-2">
                  بيانات المستلم والتوصيل
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1">
                    الاسم بالكامل *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="الاسم الثلاثي"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#171922] border border-[#272B37] text-white text-xs placeholder-zinc-500 focus:border-[#FF7A00] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1">
                    رقم الهاتف / واتساب *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="مثال: 0121816126"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#171922] border border-[#272B37] text-white text-xs placeholder-zinc-500 focus:border-[#FF7A00] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">
                      المدينة / المنطقة
                    </label>
                    <input
                      type="text"
                      placeholder="مثال: الخرطوم / أم درمان"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#171922] border border-[#272B37] text-white text-xs placeholder-zinc-500 focus:border-[#FF7A00] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">
                      الشارع / نقطة دالة
                    </label>
                    <input
                      type="text"
                      placeholder="الحي أو أقرب معلم"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#171922] border border-[#272B37] text-white text-xs placeholder-zinc-500 focus:border-[#FF7A00] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1">
                    ملاحظات الطلب أو الاستفسارات
                  </label>
                  <textarea
                    rows={2}
                    placeholder="أي أسئلة أو طلبات خاصة..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#171922] border border-[#272B37] text-white text-xs placeholder-zinc-500 focus:border-[#FF7A00] focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-[#FF7A00] hover:bg-[#FF851B] text-black font-black text-xs transition-all orange-glow"
                  >
                    تأكيد وإرسال طلب الأسعار
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep('review')}
                    className="w-full py-2 text-xs text-zinc-400 hover:text-white mt-1"
                  >
                    → العودة لمراجعة السلة
                  </button>
                </div>
              </form>
            )}

            {step === 'success' && (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-white">تم إرسال طلب السلة!</h3>
                <p className="text-xs text-zinc-300 max-w-xs mx-auto leading-relaxed">
                  شكراً لك! تلقى متجر 249 iPhone Store طلبك. سنتواصل معك على الرقم{' '}
                  <strong className="text-[#FF7A00]">{customerPhone}</strong> لتأكيد السعر المباشر وتفاصيل التسليم.
                </p>

                <div className="pt-3 space-y-2">
                  <a
                    href={`${STORE_WHATSAPP_LINK}?text=${whatsAppSummaryText}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>إرسال الطلب عبر واتساب</span>
                  </a>

                  <a
                    href={`tel:${STORE_PHONE_NUMBER}`}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#1A1D26] hover:bg-[#232733] border border-[#2A2E3D] text-white font-bold text-xs transition-all"
                  >
                    <Phone className="w-4 h-4 text-[#FF7A00]" />
                    <span>الاتصال بالمتجر: {STORE_PHONE_NUMBER}</span>
                  </a>
                </div>

                <button
                  onClick={onClose}
                  className="text-xs text-zinc-400 hover:text-white underline pt-3 block mx-auto"
                >
                  إغلاق السلة
                </button>
              </div>
            )}
          </div>

          {/* Footer for Review step */}
          {step === 'review' && cart.length > 0 && (
            <div className="p-5 border-t border-[#20232E] bg-[#0E1015] space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>المجموع الفرعي</span>
                  <span className="font-bold text-white">$0.00</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>السعر النهائي للجهاز</span>
                  <span className="font-bold text-[#FF851B]">يحدد عبر المراسلة</span>
                </div>
              </div>

              <div className="pt-1 flex flex-col gap-2">
                <button
                  onClick={() => setStep('checkout')}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#FF7A00] hover:bg-[#FF851B] text-black font-black text-xs transition-all orange-glow"
                >
                  <span>متابعة إرسال الطلب</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`${STORE_WHATSAPP_LINK}?text=${whatsAppSummaryText}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#1A1D26] hover:bg-[#232733] border border-[#2B2F3D] text-white font-bold text-xs transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>استفسار فوري عبر واتساب</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
