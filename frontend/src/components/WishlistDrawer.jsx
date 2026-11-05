import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0E0E12] border-l border-zinc-800 flex flex-col justify-between shadow-2xl">
          
          {/* Header */}
          <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart size={20} className="text-[#FF007F] fill-[#FF007F]" />
              <h2 className="font-display font-black text-xl text-white uppercase tracking-tight">
                SAVED GRAILS ({wishlist.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Items */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            {wishlist.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
                  <Heart size={28} />
                </div>
                <h3 className="font-display font-bold text-lg text-white">NO SAVED FITS YET</h3>
                <p className="text-xs font-mono text-zinc-500">
                  Tap the heart icon on any drop to save it to your personal archive.
                </p>
              </div>
            ) : (
              wishlist.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3.5 bg-zinc-900/60 rounded-2xl border border-zinc-800/90"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-20 h-24 object-cover rounded-xl bg-zinc-950 flex-shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-display font-bold text-xs text-white line-clamp-1 uppercase">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => onRemoveFromWishlist(item.id)}
                          className="text-zinc-500 hover:text-[#FF007F] p-1"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <span className="text-[11px] font-mono text-zinc-400">
                        ${item.price} • #{item.vibe}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        onAddToCart(item, item.sizes[0], item.colors[0], 1);
                        onRemoveFromWishlist(item.id);
                      }}
                      className="w-full mt-2 py-2 bg-[#CCFF00] hover:bg-[#b8e600] text-black font-mono font-bold text-xs rounded-xl neo-border flex items-center justify-center gap-1.5 uppercase"
                    >
                      <ShoppingBag size={13} /> MOVE TO BAG
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-6 border-t border-zinc-800 bg-[#0A0A0C]">
            <button
              onClick={onClose}
              className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs font-bold py-3.5 rounded-xl border border-zinc-700"
            >
              CLOSE WISHLIST
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
