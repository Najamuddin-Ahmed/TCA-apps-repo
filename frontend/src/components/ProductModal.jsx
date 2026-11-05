import React, { useState } from 'react';
import { X, Heart, ShoppingBag, ShieldCheck, Truck, RefreshCw, Zap, Check, Star } from 'lucide-react';

export default function ProductModal({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist
}) {
  if (!product) return null;

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { name: 'Standard', hex: '#000' });
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1800);
  };

  const handleBuyNow = () => {
    onBuyNow(product, selectedSize, selectedColor, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-[#121217] border-2 border-zinc-700 rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-black transition-colors"
        >
          <X size={20} />
        </button>

        {/* Left: Gallery Column */}
        <div className="md:w-1/2 bg-zinc-950 p-4 sm:p-6 flex flex-col justify-between">
          {/* Main Image */}
          <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
            <img
              src={product.images[selectedImageIdx] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 bg-[#CCFF00] text-black text-xs font-mono font-black px-2.5 py-1 rounded neo-border">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`w-16 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImageIdx === idx ? 'border-[#CCFF00] scale-105' : 'border-zinc-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info & Controls */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[80vh] md:max-h-none space-y-6">
          
          <div>
            {/* Header tags */}
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
              <span className="text-[#CCFF00] font-bold uppercase tracking-wider">#{product.vibe} COLLECTION</span>
              <span className="flex items-center gap-1 text-amber-400">
                <Star size={14} className="fill-amber-400" /> {product.rating} ({product.reviewsCount} reviews)
              </span>
            </div>

            <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
              {product.name}
            </h2>

            <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
              {product.description}
            </p>

            {/* Price & Aura Score Box */}
            <div className="flex items-center justify-between mt-4 p-3.5 bg-zinc-900/90 rounded-2xl border border-zinc-800">
              <div>
                <span className="text-xs font-mono text-zinc-400 block">PRICE</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono font-black text-2xl text-white">${product.price}</span>
                  {product.originalPrice && (
                    <span className="font-mono text-sm text-zinc-500 line-through">${product.originalPrice}</span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono text-zinc-400 block">AURA IMPACT</span>
                <span className="font-mono font-bold text-sm text-[#00F0FF] flex items-center gap-1 justify-end">
                  <Zap size={14} className="fill-[#00F0FF]" /> {product.auraScore}
                </span>
              </div>
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-zinc-400">COLOR: <strong className="text-white">{selectedColor.name}</strong></span>
                </div>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((c, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(c)}
                      className={`group relative p-0.5 rounded-full border-2 transition-all ${
                        selectedColor.name === c.name ? 'border-[#CCFF00] scale-110' : 'border-transparent'
                      }`}
                    >
                      <span
                        className="block w-7 h-7 rounded-full border border-black/50"
                        style={{ backgroundColor: c.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            <div className="mt-5">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-zinc-400">SELECT SIZE:</span>
                <span className="text-[#CCFF00] text-[11px]">OVERSIZED FIT</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                      selectedSize === s
                        ? 'bg-[#CCFF00] text-black border-[#CCFF00] neo-border font-black'
                        : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-600'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Stock urgency indicator */}
            <div className="mt-4 flex items-center gap-2 text-xs font-mono text-orange-400 bg-orange-950/30 border border-orange-900/50 px-3 py-1.5 rounded-xl">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span>Only {product.stockCount} units left in this size batch!</span>
            </div>

            {/* Details list */}
            {product.details && (
              <div className="mt-5 space-y-1.5 pt-4 border-t border-zinc-800 text-xs font-sans text-zinc-400">
                {product.details.map((d, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-[#CCFF00] font-mono">✦</span>
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-zinc-800 space-y-3">
            <div className="flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl px-2 py-1 font-mono text-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 py-1 text-zinc-400 hover:text-white"
                >
                  -
                </button>
                <span className="px-3 font-bold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                  className="px-2 py-1 text-zinc-400 hover:text-white"
                >
                  +
                </button>
              </div>

              {/* Add To Bag */}
              <button
                onClick={handleAddToCart}
                disabled={addedAnimation}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-mono text-xs font-black tracking-wider transition-all uppercase ${
                  addedAnimation
                    ? 'bg-emerald-500 text-black'
                    : 'bg-[#CCFF00] hover:bg-[#b8e600] text-black neo-border active:translate-y-0.5'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check size={16} /> ADDED TO BAG!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} /> ADD TO BAG • ${(product.price * quantity).toFixed(2)}
                  </>
                )}
              </button>

              {/* Wishlist Toggle */}
              <button
                onClick={() => onToggleWishlist(product)}
                className={`p-3 rounded-xl border transition-colors ${
                  isWishlisted
                    ? 'bg-[#FF007F]/20 border-[#FF007F] text-[#FF007F]'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
                title="Save to Wishlist"
              >
                <Heart size={20} className={isWishlisted ? "fill-[#FF007F]" : ""} />
              </button>
            </div>

            {/* Buy Now instant */}
            <button
              onClick={handleBuyNow}
              className="w-full bg-white hover:bg-zinc-200 text-black font-mono font-bold text-xs py-2.5 rounded-xl transition-all uppercase"
            >
              FAST CHECKOUT WITH 1-CLICK →
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
