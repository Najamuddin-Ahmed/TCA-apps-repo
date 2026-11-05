import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, CreditCard, Sparkles, Truck, ArrowRight, Zap, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal({
  isOpen,
  onClose,
  items,
  total,
  discountAmount,
  promoCode,
  onOrderSuccess
}) {
  if (!isOpen) return null;

  const [step, setStep] = useState('checkout'); // 'checkout' or 'success'
  const [formData, setFormData] = useState({
    name: 'Alex Vance',
    email: 'alex.vance@dropmail.io',
    address: '420 Neon Boulevard, Apt 7B',
    city: 'New York',
    postalCode: '10001',
    paymentMethod: 'apple-pay'
  });
  const [loading, setLoading] = useState(false);
  const [orderResult, setOrderResult] = useState(null);
  const [copiedTrack, setCopiedTrack] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          customer: {
            name: formData.name,
            email: formData.email,
            address: `${formData.address}, ${formData.city} ${formData.postalCode}`
          },
          paymentMethod: formData.paymentMethod,
          promoCode,
          discountAmount,
          total
        })
      });

      const data = await res.json();
      if (data.success) {
        setOrderResult(data.order);
        setStep('success');
        onOrderSuccess();
        
        // Trigger celebratory confetti blast!
        try {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#CCFF00', '#FF007F', '#00F0FF', '#FFFFFF']
          });
        } catch (e) {
          // ignore if canvas not supported
        }
      }
    } catch (err) {
      alert('Order submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyTracking = () => {
    if (orderResult?.trackingNumber) {
      navigator.clipboard?.writeText(orderResult.trackingNumber);
      setCopiedTrack(true);
      setTimeout(() => setCopiedTrack(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/80 backdrop-blur-md">
      <div className="fixed inset-0" onClick={step === 'checkout' ? onClose : undefined} />

      <div className="relative w-full max-w-2xl bg-[#121217] border-2 border-zinc-700 rounded-3xl overflow-hidden shadow-2xl z-10 p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>

        {step === 'checkout' ? (
          <div>
            <div className="mb-6">
              <span className="text-[11px] font-mono text-[#CCFF00] font-bold tracking-widest uppercase">
                SECURE 256-BIT CHECKOUT
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight mt-1">
                LOCK IN YOUR FIT
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Contact info */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase">1. CONTACT & SHIPPING</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder-zinc-500 outline-none focus:border-[#CCFF00]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder-zinc-500 outline-none focus:border-[#CCFF00]"
                  />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder-zinc-500 outline-none focus:border-[#CCFF00]"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder-zinc-500 outline-none focus:border-[#CCFF00]"
                  />
                  <input
                    type="text"
                    required
                    placeholder="ZIP / Postal Code"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder-zinc-500 outline-none focus:border-[#CCFF00]"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase">2. SELECT PAYMENT METHOD</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'apple-pay', name: ' Pay', badge: 'FASTEST' },
                    { id: 'card', name: 'Credit Card', badge: 'VISA/MC' },
                    { id: 'klarna', name: 'Klarna 4x', badge: '0% APR' },
                    { id: 'crypto', name: 'Solana / ETH', badge: 'WEB3' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: p.id })}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        formData.paymentMethod === p.id
                          ? 'bg-[#CCFF00] text-black border-[#CCFF00] neo-border font-bold'
                          : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <span className="block text-xs font-mono font-bold">{p.name}</span>
                      <span className="block text-[9px] font-mono opacity-80 mt-0.5">{p.badge}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Order Summary Line */}
              <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800/90 flex items-center justify-between font-mono text-xs">
                <div>
                  <span className="text-zinc-400 block">{items.length} fits in order</span>
                  {promoCode && <span className="text-[#CCFF00]">Promo: {promoCode}</span>}
                </div>
                <div className="text-right">
                  <span className="text-zinc-400 block">Total Due</span>
                  <span className="text-lg font-black text-white">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#CCFF00] hover:bg-[#b8e600] text-black font-mono font-black text-sm py-4 rounded-xl neo-border flex items-center justify-center gap-2 transition-all active:translate-y-0.5 uppercase tracking-wider"
              >
                {loading ? (
                  <span>COMMUNICATING WITH DROP SERVER...</span>
                ) : (
                  <>
                    <span>CONFIRM ORDER (${total.toFixed(2)})</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

            </form>
          </div>
        ) : (
          /* Order Confirmation / Success View */
          <div className="text-center py-4 space-y-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#CCFF00] text-black flex items-center justify-center mx-auto neo-border shadow-lg">
              <CheckCircle2 size={36} />
            </div>

            <div>
              <span className="text-xs font-mono text-[#00F0FF] uppercase tracking-widest font-bold">
                ORDER CONFIRMED // VIBE UNLOCKED
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase mt-1">
                YOU'RE OFFICIALLY DRIPPED OUT.
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-md mx-auto">
                We've locked in your fit. A tracking confirmation email has been dispatched to{' '}
                <strong className="text-white">{orderResult?.customer?.email}</strong>.
              </p>
            </div>

            {/* Order Details Card */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 text-left font-mono text-xs space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-zinc-800/80">
                <span className="text-zinc-400">ORDER NUMBER</span>
                <span className="font-bold text-[#CCFF00]">{orderResult?.id}</span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-zinc-800/80">
                <span className="text-zinc-400">TRACKING NUMBER</span>
                <button
                  onClick={copyTracking}
                  className="flex items-center gap-1.5 text-white hover:text-[#CCFF00] font-bold"
                >
                  <span>{orderResult?.trackingNumber}</span>
                  {copiedTrack ? <Check size={13} className="text-[#CCFF00]" /> : <Copy size={13} />}
                </button>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-zinc-800/80">
                <span className="text-zinc-400">ESTIMATED DROP ARRIVAL</span>
                <span className="text-white font-bold">{orderResult?.estimatedDelivery}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-zinc-400">STATUS</span>
                <span className="text-emerald-400 font-bold">{orderResult?.status}</span>
              </div>
            </div>

            {/* Aura Earned Banner */}
            <div className="bg-[#FF007F]/10 border border-[#FF007F]/40 p-3.5 rounded-2xl flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2 text-white">
                <Zap size={16} className="text-[#FF007F] fill-[#FF007F]" />
                <span>LIFETIME AURA EARNED</span>
              </div>
              <span className="font-black text-[#FF007F]">+25,000 AURA</span>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-[#CCFF00] hover:bg-[#b8e600] text-black font-mono font-black text-sm py-3.5 rounded-xl neo-border uppercase tracking-wider"
            >
              KEEP BROWSING DROPS
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
