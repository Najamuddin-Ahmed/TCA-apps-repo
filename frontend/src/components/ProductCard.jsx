import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star, Zap } from 'lucide-react';

export default function ProductCard({
  product,
  onQuickView,
  onAddToCart,
  isWishlisted,
  onToggleWishlist
}) {
  const [hovered, setHovered] = useState(false);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const currentImage = (hovered && product.images[1]) ? product.images[1] : product.images[0];

  return (
    <div 
      className="group relative bg-[#121217] rounded-2xl border border-zinc-800 hover:border-zinc-600 transition-all duration-300 flex flex-col overflow-hidden hover:shadow-xl hover:shadow-black/50"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Product Image Box */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-950 cursor-pointer" onClick={() => onQuickView(product)}>
        <img
          src={currentImage}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="bg-[#CCFF00] text-black text-[10px] font-mono font-black px-2 py-0.5 rounded uppercase neo-border tracking-wider">
              {product.badge}
            </span>
          )}
          {product.isDrop && (
            <span className="bg-[#FF007F] text-white text-[10px] font-mono font-black px-2 py-0.5 rounded uppercase tracking-wider">
              NEW DROP
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-[#FF007F] hover:scale-110 active:scale-95 transition-all"
          aria-label="Save to Wishlist"
        >
          <Heart 
            size={16} 
            className={isWishlisted ? "fill-[#FF007F] text-[#FF007F]" : ""} 
          />
        </button>

        {/* Aura score sticker */}
        <div className="absolute bottom-3 left-3 z-10 bg-black/80 backdrop-blur-md border border-zinc-700/80 px-2 py-0.5 rounded text-[11px] font-mono text-zinc-300 flex items-center gap-1">
          <Zap size={11} className="text-[#CCFF00] fill-[#CCFF00]" />
          <span>{product.auraScore} AURA</span>
        </div>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-3 bottom-12 z-10 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full bg-white/95 hover:bg-[#CCFF00] text-black py-2.5 rounded-xl font-mono text-xs font-black tracking-wider flex items-center justify-center gap-2 neo-border transition-colors"
          >
            <Eye size={14} />
            QUICK VIEW
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        <div>
          {/* Category & Vibe */}
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-1 uppercase tracking-wider">
            <span>{product.category}</span>
            <span className="text-[#00F0FF]">#{product.vibe}</span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className="font-display font-black text-sm sm:text-base text-white group-hover:text-[#CCFF00] transition-colors cursor-pointer line-clamp-1 uppercase tracking-tight"
          >
            {product.name}
          </h3>

          <p className="text-zinc-400 text-xs line-clamp-1 mt-0.5 font-sans">
            {product.tagline}
          </p>
        </div>

        {/* Color swatches preview */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 pt-1">
            {product.colors.map((c, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColorIdx(idx);
                }}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColorIdx === idx ? 'border-white scale-125' : 'border-zinc-700 opacity-70'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
            <span className="text-[10px] font-mono text-zinc-500 ml-1">
              {product.colors[selectedColorIdx]?.name}
            </span>
          </div>
        )}

        {/* Price & Add to Cart button */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80">
          <div className="flex items-baseline gap-2">
            <span className="font-mono font-black text-lg text-white">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="font-mono text-xs text-zinc-500 line-through">
                ${product.originalPrice}
              </span>
            )}
            {discountPercent > 0 && (
              <span className="text-[10px] font-mono font-bold text-[#CCFF00] bg-[#CCFF00]/10 px-1.5 py-0.5 rounded">
                -{discountPercent}%
              </span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product, product.sizes[0], product.colors[selectedColorIdx])}
            className="p-2 rounded-xl bg-zinc-800 hover:bg-[#CCFF00] text-zinc-300 hover:text-black transition-colors"
            title="Instant Add to Bag"
          >
            <ShoppingBag size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}
