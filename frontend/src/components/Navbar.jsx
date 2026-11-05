import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, Zap, Sparkles } from 'lucide-react';

export default function Navbar({ 
  cartCount, 
  cartTotal, 
  onOpenCart, 
  wishlistCount, 
  onOpenWishlist, 
  activeSection, 
  setActiveSection,
  searchQuery,
  setSearchQuery
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const scrollTo = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-30 bg-[#0A0A0C]/90 backdrop-blur-md border-b border-zinc-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}
              className="group flex items-center gap-2"
            >
              <div className="w-10 h-10 rounded-lg bg-[#CCFF00] flex items-center justify-center text-black font-black text-xl neo-border group-hover:rotate-6 transition-transform">
                <Zap size={22} className="fill-black" />
              </div>
              <div>
                <span className="font-display font-black text-2xl tracking-tighter text-white group-hover:text-[#CCFF00] transition-colors flex items-center gap-1.5">
                  AURA<span className="text-[#CCFF00] text-3xl leading-none">.</span>LAB
                </span>
                <span className="block text-[10px] font-mono tracking-widest text-zinc-400 uppercase -mt-1">
                  GEN-Z STREETWEAR ARCHIVE
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-mono tracking-wider font-semibold">
            <button
              onClick={() => scrollTo('catalog')}
              className={`transition-colors py-1 relative ${activeSection === 'catalog' ? 'text-[#CCFF00]' : 'text-zinc-300 hover:text-white'}`}
            >
              [ DROPS ]
              {activeSection === 'catalog' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#CCFF00]"></span>
              )}
            </button>
            <button
              onClick={() => scrollTo('fit-builder')}
              className="flex items-center gap-1 text-zinc-300 hover:text-[#CCFF00] transition-colors py-1"
            >
              <Sparkles size={14} className="text-[#FF007F]" />
              AURA FIT BUILDER
            </button>
            <button
              onClick={() => scrollTo('lookbook')}
              className={`transition-colors py-1 relative ${activeSection === 'lookbook' ? 'text-[#CCFF00]' : 'text-zinc-300 hover:text-white'}`}
            >
              LOOKBOOK 2026
            </button>
            <button
              onClick={() => scrollTo('reviews')}
              className="text-zinc-300 hover:text-white transition-colors py-1"
            >
              REVIEWS
            </button>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Live Search Trigger / Bar */}
            <div className="relative">
              {searchOpen ? (
                <div className="flex items-center bg-zinc-900 border border-[#CCFF00] rounded-full px-3 py-1.5 text-xs text-white">
                  <Search size={14} className="text-zinc-400 mr-2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search hoodie, cargos, y2k..."
                    className="bg-transparent outline-none w-36 sm:w-48 text-zinc-200 placeholder-zinc-500 font-mono"
                    autoFocus
                  />
                  <button onClick={() => setSearchOpen(false)} className="text-zinc-400 hover:text-white ml-1">
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors"
                  aria-label="Search items"
                >
                  <Search size={20} />
                </button>
              )}
            </div>

            {/* Wishlist Icon */}
            <button
              onClick={onOpenWishlist}
              className="p-2 rounded-lg text-zinc-400 hover:text-[#FF007F] hover:bg-zinc-800/80 transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF007F] text-white text-[11px] font-bold rounded-full flex items-center justify-center font-mono">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="group flex items-center gap-2 bg-[#18181B] hover:bg-[#CCFF00] hover:text-black border border-zinc-700 hover:border-[#CCFF00] px-3.5 py-2 rounded-xl transition-all font-mono font-bold text-xs"
              aria-label="Open Cart"
            >
              <div className="relative">
                <ShoppingBag size={18} className="text-white group-hover:text-black transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 w-5 h-5 bg-[#CCFF00] group-hover:bg-black text-black group-hover:text-[#CCFF00] text-[11px] font-black rounded-full flex items-center justify-center neo-border">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-bold ml-1 text-zinc-200 group-hover:text-black">
                ${cartTotal.toFixed(2)}
              </span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-[#0E0E12] px-6 py-6 space-y-4 font-mono text-sm">
          <button
            onClick={() => scrollTo('catalog')}
            className="block w-full text-left py-2 text-zinc-300 hover:text-[#CCFF00]"
          >
            → [ DROPS / CATALOG ]
          </button>
          <button
            onClick={() => scrollTo('fit-builder')}
            className="block w-full text-left py-2 text-zinc-300 hover:text-[#CCFF00]"
          >
            → ✨ AURA FIT BUILDER
          </button>
          <button
            onClick={() => scrollTo('lookbook')}
            className="block w-full text-left py-2 text-zinc-300 hover:text-[#CCFF00]"
          >
            → 📸 LOOKBOOK 2026
          </button>
          <button
            onClick={() => scrollTo('reviews')}
            className="block w-full text-left py-2 text-zinc-300 hover:text-[#CCFF00]"
          >
            → 🔥 COMMUNITY REVIEWS
          </button>
        </div>
      )}
    </nav>
  );
}
