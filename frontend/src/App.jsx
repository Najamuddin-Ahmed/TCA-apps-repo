import React, { useState, useEffect } from 'react';
import AnnouncementBar from './components/AnnouncementBar.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import VibeFilter from './components/VibeFilter.jsx';
import ProductCard from './components/ProductCard.jsx';
import ProductModal from './components/ProductModal.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import WishlistDrawer from './components/WishlistDrawer.jsx';
import CheckoutModal from './components/CheckoutModal.jsx';
import OutfitGenerator from './components/OutfitGenerator.jsx';
import LookbookSection from './components/LookbookSection.jsx';
import ReviewsTicker from './components/ReviewsTicker.jsx';
import Footer from './components/Footer.jsx';
import { Sparkles, ShoppingBag, ArrowUpRight, Flame } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Fits' },
  { id: 'tops', label: 'Heavyweight Tops' },
  { id: 'bottoms', label: 'Cargos & Flared' },
  { id: 'outerwear', label: 'Puffers & Jackets' },
  { id: 'footwear', label: 'Platform Kicks' },
  { id: 'accessories', label: 'Rig & Balaclavas' }
];

const VIBES = [
  { id: 'all', label: 'All Vibes ✨' },
  { id: 'cyberpunk', label: 'Cyber Acid 👾' },
  { id: 'y2k', label: 'Y2K Archive 💿' },
  { id: 'streetwear', label: 'Heavy Street 🛹' },
  { id: 'grunge', label: 'Neo-Grunge 🎸' }
];

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter & Search states
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVibe, setSelectedVibe] = useState('all');
  const [sortBy, setSortBy] = useState('trending');
  const [onlyDrops, setOnlyDrops] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('catalog');

  // Cart & Wishlist states with LocalStorage persistence
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Promo code states
  const [promoCode, setPromoCode] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  // Modals & Drawers
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Persist cart & wishlist
  useEffect(() => {
    localStorage.setItem('aura_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('aura_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Fetch products from backend API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      if (selectedVibe !== 'all') params.append('vibe', selectedVibe);
      if (onlyDrops) params.append('isDrop', 'true');
      if (sortBy) params.append('sort', sortBy);
      if (searchQuery.trim()) params.append('search', searchQuery.trim());

      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      } else {
        setError(data.message || 'Error loading products');
      }
    } catch (err) {
      console.error(err);
      setError('Could not connect to Aura Lab API server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedVibe, sortBy, onlyDrops, searchQuery]);

  // Cart Handlers
  const handleAddToCart = (product, selectedSize = 'M', selectedColor = null, quantity = 1) => {
    const color = selectedColor || (product.colors && product.colors[0]) || { name: 'Standard', hex: '#000' };
    const size = selectedSize || (product.sizes && product.sizes[0]) || 'M';

    setCart(prev => {
      const existingIdx = prev.findIndex(
        item => item.id === product.id && item.selectedSize === size && item.selectedColor?.name === color.name
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            ...product,
            selectedSize: size,
            selectedColor: color,
            quantity
          }
        ];
      }
    });

    showToast(`Added ${product.name} to bag!`);
  };

  const handleAddMultipleToCart = (items) => {
    items.forEach(item => {
      handleAddToCart(item, item.sizes[0], item.colors[0], 1);
    });
    setCartOpen(true);
    showToast(`Added full 3-piece look to bag!`);
  };

  const handleUpdateQuantity = (id, size, colorName, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(id, size, colorName);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.id === id && item.selectedSize === size && item.selectedColor?.name === colorName) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const handleRemoveItem = (id, size, colorName) => {
    setCart(prev => prev.filter(
      item => !(item.id === id && item.selectedSize === size && item.selectedColor?.name === colorName)
    ));
    showToast('Item removed from bag');
  };

  const handleBuyNow = (product, size, color, quantity) => {
    handleAddToCart(product, size, color, quantity);
    setQuickViewProduct(null);
    setCheckoutOpen(true);
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product) => {
    const exists = wishlist.some(item => item.id === product.id);
    if (exists) {
      setWishlist(prev => prev.filter(item => item.id !== product.id));
      showToast('Removed from saved grails');
    } else {
      setWishlist(prev => [...prev, product]);
      showToast('Saved to your grails! 💖');
    }
  };

  // Promo Code
  const handleApplyPromo = (code, amount) => {
    setPromoCode(code);
    setDiscountAmount(amount);
    showToast(`Promo ${code} applied! (-$${amount.toFixed(2)})`);
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedVibe('all');
    setSortBy('trending');
    setOnlyDrops(false);
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedVibe !== 'all' || onlyDrops || searchQuery !== '';

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0C] text-slate-100 font-sans selection:bg-[#CCFF00] selection:text-black">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#CCFF00] text-black font-mono font-bold text-xs px-4 py-3 rounded-2xl neo-border shadow-2xl animate-bounce flex items-center gap-2">
          <Sparkles size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Announcement Marquee Bar */}
      <AnnouncementBar onApplyCode={(code) => handleApplyPromo(code, Math.round(cartSubtotal * 0.2))} />

      {/* Main Navbar */}
      <Navbar
        cartCount={cartCount}
        cartTotal={cartSubtotal}
        onOpenCart={() => setCartOpen(true)}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setWishlistOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Hero Section */}
      <Hero
        onExploreDrops={() => {
          const el = document.getElementById('catalog');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenFitBuilder={() => {
          const el = document.getElementById('fit-builder');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Product Catalog Section */}
      <section id="catalog" className="py-12 flex-1">
        
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-mono text-[#CCFF00] uppercase tracking-widest font-bold">
                SPRING / SUMMER 2026 DROP
              </span>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight mt-1">
                LATEST ARCHIVE FITS
              </h2>
            </div>
            <p className="text-xs font-mono text-zinc-400 max-w-sm">
              Limited run batches. No reprints once sold out.
            </p>
          </div>
        </div>

        {/* Filter & Vibe Check Bar */}
        <VibeFilter
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          vibes={VIBES}
          selectedVibe={selectedVibe}
          onSelectVibe={setSelectedVibe}
          sortBy={sortBy}
          onSelectSort={setSortBy}
          onlyDrops={onlyDrops}
          onToggleOnlyDrops={() => setOnlyDrops(!onlyDrops)}
          resultsCount={products.length}
          onResetFilters={resetFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Product Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-zinc-900/60 rounded-2xl h-80 border border-zinc-800" />
              ))}
            </div>
          ) : error ? (
            <div className="p-8 text-center bg-zinc-900/40 rounded-2xl border border-zinc-800 text-rose-400 font-mono text-sm">
              {error}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 bg-zinc-900/30 rounded-3xl border border-zinc-800/80 p-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mx-auto text-zinc-400">
                <Flame size={24} />
              </div>
              <h3 className="font-display font-black text-xl text-white uppercase">NO MATCHING FITS FOUND</h3>
              <p className="text-zinc-400 text-xs font-mono max-w-md mx-auto">
                Try widening your search terms or resetting the vibe check filters.
              </p>
              <button
                onClick={resetFilters}
                className="bg-[#CCFF00] text-black font-mono font-bold text-xs px-6 py-2.5 rounded-xl neo-border uppercase"
              >
                SHOW ALL FITS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                  onAddToCart={handleAddToCart}
                  isWishlisted={wishlist.some(item => item.id === product.id)}
                  onToggleWishlist={handleToggleWishlist}
                />
              ))}
            </div>
          )}
        </div>

      </section>

      {/* AI Outfit Generator Section */}
      <OutfitGenerator
        products={products}
        onAddMultipleToCart={handleAddMultipleToCart}
      />

      {/* Community Streetwear Lookbook */}
      <LookbookSection
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />

      {/* Community TikTok Reviews */}
      <ReviewsTicker />

      {/* Modern Gen-Z Footer */}
      <Footer onApplyCode={(code) => handleApplyPromo(code, Math.round(cartSubtotal * 0.15))} />

      {/* Modals & Drawers */}
      <ProductModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        isWishlisted={quickViewProduct ? wishlist.some(item => item.id === quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
        promoCode={promoCode}
        discountAmount={discountAmount}
        onApplyPromo={handleApplyPromo}
        subtotal={cartSubtotal}
      />

      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={(id) => setWishlist(prev => prev.filter(item => item.id !== id))}
        onAddToCart={handleAddToCart}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={cart}
        total={Math.max(0, cartSubtotal - discountAmount + (cartSubtotal >= 100 || cartSubtotal === 0 ? 0 : 10))}
        discountAmount={discountAmount}
        promoCode={promoCode}
        onOrderSuccess={() => {
          setCart([]);
          setPromoCode(null);
          setDiscountAmount(0);
        }}
      />

    </div>
  );
}
