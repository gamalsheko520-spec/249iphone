import React from 'react';
import { MessageCircle, Phone, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { Order, ProductInquiry } from '../types';
import { STORE_PHONE_NUMBER, STORE_WHATSAPP_LINK } from '../data/initialProducts';

interface OrdersViewProps {
  orders: Order[];
  inquiries: ProductInquiry[];
  onGoToStore: () => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({
  orders,
  inquiries,
  onGoToStore
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#222530]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            استفساراتي وطلبات الأسعار
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            تابع حالة جميع استفسارات الهواتف الخاصة بك. هل تحتاج لتحديث فوري؟ اتصل بخطنا الساخن مباشرة على{' '}
            <a href={`tel:${STORE_PHONE_NUMBER}`} className="text-[#FF7A00] font-bold">
              {STORE_PHONE_NUMBER}
            </a>
          </p>
        </div>

        <button
          onClick={onGoToStore}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#171922] hover:bg-[#20232E] border border-[#272B38] text-xs font-bold text-white transition-all self-start sm:self-auto"
        >
          <span>العودة إلى واجهة المتجر ←</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inquiries List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-[#FF7A00]">
              استفسارات المنتجات الأخيرة ({inquiries.length})
            </h2>
            <span className="text-[11px] text-zinc-500">طلبات عروض الأسعار</span>
          </div>

          {inquiries.length === 0 ? (
            <div className="p-8 rounded-2xl bg-[#12141A] border border-[#222530] text-center text-zinc-500 text-xs">
              لم تقم بإرسال أي استفسار بعد. تصفح المنتجات واضغط على "راسلنا لمعرفة السعر" لطلب الأسعار الحية.
            </div>
          ) : (
            <div className="space-y-3">
              {inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="p-4 rounded-2xl bg-[#12141A] border border-[#222530] space-y-2 hover:border-[#FF7A00]/40 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-white text-sm">{inq.productName}</h4>
                      <div className="text-[11px] text-zinc-400">
                        العميل: <strong className="text-zinc-200">{inq.customerName}</strong> ({inq.customerPhone})
                      </div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                        inq.status === 'completed'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : inq.status === 'contacted'
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : 'bg-[#FF7A00]/20 text-[#FF851B] border border-[#FF7A00]/30'
                      }`}
                    >
                      {inq.status === 'completed' ? 'تم الرد' : inq.status === 'contacted' ? 'تم التواصل' : 'قيد الانتظار'}
                    </span>
                  </div>

                  {(inq.selectedStorage || inq.selectedColor) && (
                    <div className="text-xs text-zinc-400 flex items-center gap-3">
                      {inq.selectedStorage && <span>السعة: <strong className="text-zinc-300">{inq.selectedStorage}</strong></span>}
                      {inq.selectedColor && <span>اللون: <strong className="text-zinc-300">{inq.selectedColor}</strong></span>}
                    </div>
                  )}

                  {inq.notes && (
                    <p className="text-[11px] text-zinc-500 italic bg-[#0D0E13] p-2 rounded-lg">
                      "{inq.notes}"
                    </p>
                  )}

                  <div className="pt-2 flex items-center justify-between border-t border-[#1C1F28] text-xs">
                    <span className="text-[10px] text-zinc-500">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </span>

                    <a
                      href={`${STORE_WHATSAPP_LINK}?text=${encodeURIComponent(`${inq.productName} - what is the price of this?`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 font-bold text-emerald-400 hover:text-emerald-300"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>متابعة عبر واتساب</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-[#FF7A00]">
              سلات الاستفسار المرسلة ({orders.length})
            </h2>
            <span className="text-[11px] text-zinc-500">طلبات السلة</span>
          </div>

          {orders.length === 0 ? (
            <div className="p-8 rounded-2xl bg-[#12141A] border border-[#222530] text-center text-zinc-500 text-xs">
              لم يتم إرسال أي سلة استفسارات بعد. أضف أجهزة إلى السلة واضغط على متابعة لإرسال طلبك.
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((o) => (
                <div
                  key={o.id}
                  className="p-4 rounded-2xl bg-[#12141A] border border-[#222530] space-y-3 hover:border-[#FF7A00]/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono font-bold text-[#FF851B]">{o.id}</span>
                      <div className="text-xs text-zinc-400">{o.customerName} • {o.customerPhone}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {o.status === 'confirmed' ? 'تم التأكيد' : o.status === 'delivered' ? 'تم التسليم' : o.status === 'pricing_sent' ? 'تم إرسال السعر' : 'قيد المراجعة'}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs">
                    {o.items.map((i, idx) => (
                      <div key={idx} className="flex justify-between text-zinc-300">
                        <span>{i.name} ×{i.qty}</span>
                        <span className="font-mono text-zinc-400">$0.00 (استفسار)</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-[11px] text-zinc-500">
                    التوصيل إلى: {o.address}، {o.city}
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-[#1C1F28] text-xs">
                    <span className="text-[10px] text-zinc-500">
                      {new Date(o.createdAt).toLocaleDateString()}
                    </span>

                    <a
                      href={`tel:${STORE_PHONE_NUMBER}`}
                      className="flex items-center gap-1 font-bold text-white hover:text-[#FF7A00]"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#FF7A00]" />
                      <span>اتصال للتأكيد</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
