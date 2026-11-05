import React, { useState } from 'react';
import { X, Trash2, ArrowRight, Tag, Check, ShoppingBag, Truck } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  promoCode,
  discountAmount,
  onApplyPromo,
  subtotal
}) {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoLoading, setPromoLoading] = useState(false);

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 100;
  const progressToFreeShipping = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 10;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleApplyPromo = async (codeToUse) => {
    const code = (codeToUse || promoInput).trim().toUpperCase();
    if (!code) return;
    setPromoLoading(true);
    setPromoError('');

    try {
      const res = await fetch('/api/promos/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, cartTotal: subtotal })
      });
      const data = await res.json();
      if (data.success) {
        onApplyPromo(data.code, data.discountAmount);
        setPromoInput('');
      } else {
        setPromoError(data.message || 'Invalid promo code');
      }
    } catch (err) {
      setPromoError('Failed to validate code');
    } finally {
      setPromoLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0E0E12] border-l border-zinc-800 flex flex-col justify-between shadow-2xl">
          
          {/* Header */}
          <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-[#CCFF00]" />
              <h2 className="font-display font-black text-xl text-white uppercase tracking-tight">
                YOUR BAG ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="px-6 py-3 bg-zinc-950/80 border-b border-zinc-800/80 text-xs font-mono">
            <div className="flex items-center justify-between mb-1.5">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <Truck size={14} className="text-[#CCFF00]" />
                {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                  <span className="text-[#CCFF00] font-bold">YOU UNLOCKED FREE SHIPPING! 🔥</span>
                ) : (
                  <span>Add <strong className="text-white">${remainingForFreeShipping.toFixed(2)}</strong> more for FREE express shipping</span>
                )}
              </span>
              <span className="text-zinc-500 font-bold">{Math.round(progressToFreeShipping)}%</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-[#CCFF00] h-full transition-all duration-500"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
                  <ShoppingBag size={28} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-lg text-white">YOUR BAG IS EMPTY</h3>
                  <p className="text-xs font-mono text-zinc-500">Go get some aura before it sells out.</p>
                </div>
                <button
                  onClick={onClose}
                  className="inline-block bg-[#CCFF00] text-black font-mono font-bold text-xs px-6 py-2.5 rounded-xl neo-border"
                >
                  START BROWSING
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div 
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor?.name}`}
                  className="flex gap-4 p-3.5 bg-zinc-900/60 rounded-2xl border border-zinc-800/90 relative group"
                >
                  {/* Image */}
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-20 h-24 object-cover rounded-xl bg-zinc-950 flex-shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-display font-bold text-xs text-white line-clamp-1 uppercase">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id, item.selectedSize, item.selectedColor?.name)}
                          className="text-zinc-500 hover:text-[#FF007F] p-1 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-zinc-400">
                        <span className="bg-zinc-800 px-1.5 py-0.5 rounded text-white">Size: {item.selectedSize}</span>
                        {item.selectedColor && (
                          <span className="flex items-center gap-1">
                            <span className="w-2.5 h-2.5 rounded-full border border-zinc-700" style={{ backgroundColor: item.selectedColor.hex }} />
                            <span>{item.selectedColor.name}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity & Item Total */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-lg px-2 py-0.5 font-mono text-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.selectedColor?.name, item.quantity - 1)}
                          className="text-zinc-400 hover:text-white px-1"
                        >
                          -
                        </button>
                        <span className="px-2 font-bold text-white">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.selectedColor?.name, item.quantity + 1)}
                          className="text-zinc-400 hover:text-white px-1"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-mono font-bold text-sm text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-6 border-t border-zinc-800 bg-[#0A0A0C] space-y-4">
              
              {/* Promo Code Input */}
              <div>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag size={14} className="absolute left-3 top-3 text-zinc-500" />
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo code (e.g. NOCAP)"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs font-mono text-white placeholder-zinc-500 uppercase outline-none focus:border-[#CCFF00]"
                    />
                  </div>
                  <button
                    onClick={() => handleApplyPromo()}
                    disabled={promoLoading}
                    className="bg-zinc-800 hover:bg-[#CCFF00] hover:text-black text-zinc-200 text-xs font-mono font-bold px-4 py-2 rounded-xl transition-colors"
                  >
                    {promoLoading ? '...' : 'APPLY'}
                  </button>
                </div>

                {/* Quick Promo Tags */}
                {!promoCode && (
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="text-[10px] font-mono text-zinc-500">TRY:</span>
                    <button
                      onClick={() => handleApplyPromo('NOCAP')}
                      className="text-[10px] font-mono text-[#CCFF00] hover:underline bg-[#CCFF00]/10 px-1.5 py-0.5 rounded"
                    >
                      NOCAP (20% OFF)
                    </button>
                    <button
                      onClick={() => handleApplyPromo('GENZ10')}
                      className="text-[10px] font-mono text-zinc-400 hover:text-white bg-zinc-800/80 px-1.5 py-0.5 rounded"
                    >
                      GENZ10
                    </button>
                  </div>
                )}

                {promoCode && (
                  <div className="flex items-center justify-between text-xs font-mono text-[#CCFF00] mt-2 bg-[#CCFF00]/10 px-3 py-1.5 rounded-lg border border-[#CCFF00]/30">
                    <span className="flex items-center gap-1 font-bold">
                      <Check size={14} /> {promoCode} APPLIED
                    </span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                {promoError && (
                  <p className="text-xs font-mono text-rose-400 mt-1.5">{promoError}</p>
                )}
              </div>

              {/* Breakdown */}
              <div className="space-y-2 text-xs font-mono text-zinc-400 border-t border-zinc-800/80 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#CCFF00]">
                    <span>Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Shipping</span>
                  <span className="text-white">
                    {shippingCost === 0 ? <strong className="text-[#CCFF00]">FREE</strong> : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-zinc-800 font-mono">
                  <span>TOTAL</span>
                  <span className="text-[#CCFF00]">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={onCheckout}
                className="w-full bg-[#CCFF00] hover:bg-[#b8e600] text-black font-mono font-black text-sm py-4 rounded-xl neo-border flex items-center justify-center gap-2 transition-all active:translate-y-0.5 uppercase tracking-wider"
              >
                <span>CHECKOUT NOW</span>
                <ArrowRight size={18} />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
