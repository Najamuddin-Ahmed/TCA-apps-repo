# ⚡ AURA.LAB // Gen-Z Streetwear & Aesthetic Clothing Store

A full-stack, hyper-modern Gen-Z clothing e-commerce web platform engineered with **Vite.js**, **React**, **Tailwind CSS**, and a **Node.js / Express** REST API backend.

Built around neo-brutalist and Y2K aesthetic design languages with electric lime, holographic cyan, cyber black, high-contrast badge stickers, interactive outfit matching, and smooth micro-interactions.

---

## 🚀 Quick Start

### 1. One-Click Launch (Windows)
Double-click `run-dev.bat` or run:
```powershell
.\run-dev.ps1
```
This automatically boots both the backend API (`http://localhost:5000`) and the Vite React frontend (`http://localhost:3000`).

---

### 2. Manual Launch

#### Backend API (Port 5000)
```bash
cd backend
npm run dev
```

#### Frontend (Port 3000)
```bash
cd frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎨 Features & Highlights

### 🛍️ Dynamic Product Drops
- **12 Curated Streetwear Pieces**: Heavyweight 480 GSM French Terry hoodies, parachute tech cargos, liquid chrome puffers, shredded distressed knits, rhinestone baby tees, chunky platform sneakers, and convertable balaclavas.
- **Image Hover Swap**: Hovering any product card previews alternative editorial angles.
- **Color Swatches & Size Picker**: Visual color dots and oversized fit selectors.
- **Aura Score Meter**: Every product features a calculated aura rating (e.g. `+15,000 AURA`).

### 🔍 Interactive Filtering & Vibe Checks
- Filter by Category: *Tops, Cargos & Flared, Outerwear, Footwear, Accessories*.
- Filter by Aesthetic / Vibe: *#cyberpunk, #y2k, #streetwear, #grunge*.
- Real-time search by keyword, tag, or material.
- Sorting by Trending, Price (Low to High / High to Low), and Community Rating.

### 🤖 AI Aura Fit Builder
- Select a vibe (*Techno Warehouse Rave, Skatepark Sunset, Retro Archive, Underground Gig*).
- Assembles a coordinated 3-piece fit (Top + Bottom + Footwear/Accessory).
- Instant **"Add All 3 Pieces to Bag"** button with bundled pricing.

### 📸 Editorial Lookbook 2026
- Community street fits from Tokyo, Berlin, Brooklyn, and Seoul.
- Direct **"Shop This Fit"** tags on each photo.

### 🛒 Slide-over Cart & Promo Engine
- Dynamic free shipping calculation meter ($100 threshold).
- Promo code verification via backend REST API:
  - `NOCAP` - 20% OFF Entire Order
  - `GENZ10` - 10% Welcome Discount
  - `DRIP50` - $50 OFF on orders over $150
  - `DRIP15` - 15% Newsletter Exclusive

### 💳 256-Bit Mock Checkout & Order Tracking
- Multi-option payment simulation: Apple Pay, Credit Card, Klarna 4x, Solana/Crypto.
- Celebratory confetti explosion on confirmed drop.
- Real-time generated order number, tracking code, and estimated delivery dates.

---

## 🧱 Architecture & Tech Stack

```
genz-clothing-store/
├── backend/                  # Node.js + Express REST API
│   ├── src/
│   │   ├── server.js         # API Server & CORS configuration
│   │   ├── data/
│   │   │   └── products.js   # Seed products, lookbook, and promo codes
│   │   └── routes/
│   │       ├── products.js   # GET /api/products, GET /api/products/:id
│   │       ├── promos.js     # POST /api/promos/validate
│   │       ├── orders.js     # POST /api/orders, GET /api/orders/:id
│   │       └── lookbook.js   # GET /api/lookbook
│   └── package.json
│
├── frontend/                 # Vite.js + React + Tailwind CSS
│   ├── src/
│   │   ├── components/
│   │   │   ├── AnnouncementBar.jsx # Ticker & promo code copy button
│   │   │   ├── Navbar.jsx          # Search, wishlist count & cart pill
│   │   │   ├── Hero.jsx            # High-impact typography & vibe switcher
│   │   │   ├── VibeFilter.jsx      # Multi-dimensional filter bar
│   │   │   ├── ProductCard.jsx     # Card with hover alternate angle
│   │   │   ├── ProductModal.jsx    # Deep dive quick view modal
│   │   │   ├── CartDrawer.jsx      # Slide-over bag with free shipping bar
│   │   │   ├── WishlistDrawer.jsx  # Saved grails drawer
│   │   │   ├── CheckoutModal.jsx   # Multi-step checkout & confetti
│   │   │   ├── OutfitGenerator.jsx # AI 3-piece fit builder
│   │   │   ├── LookbookSection.jsx # Street style editorial grid
│   │   │   ├── ReviewsTicker.jsx   # TikTok & IG verified reviews
│   │   │   └── Footer.jsx          # Newsletter club & manifesto
│   │   ├── App.jsx                 # Application state hub
│   │   ├── index.css               # Tailwind directives & custom neon styles
│   │   └── main.jsx
│   ├── tailwind.config.js
│   ├── vite.config.js             # Proxies /api to backend port 5000
│   └── package.json
│
├── run-dev.bat               # Windows batch launcher
├── run-dev.ps1               # PowerShell launcher
└── README.md
```
