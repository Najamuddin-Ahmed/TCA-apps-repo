import React from 'react';
import { SlidersHorizontal, Sparkles, Flame, X } from 'lucide-react';

export default function VibeFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  vibes,
  selectedVibe,
  onSelectVibe,
  sortBy,
  onSelectSort,
  onlyDrops,
  onToggleOnlyDrops,
  resultsCount,
  onResetFilters,
  hasActiveFilters
}) {
  return (
    <div className="bg-[#121217] border-y border-zinc-800 py-6 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        
        {/* Top Row: Category Tabs & Drop Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition-all whitespace-nowrap uppercase ${
                  selectedCategory === cat.id
                    ? 'bg-[#CCFF00] text-black neo-border'
                    : 'bg-zinc-900/90 text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Right controls: Drops Only switch + Sort dropdown */}
          <div className="flex items-center gap-3">
            {/* New Drops Pill */}
            <button
              onClick={onToggleOnlyDrops}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                onlyDrops
                  ? 'bg-orange-500/20 text-orange-400 border-orange-500'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
              }`}
            >
              <Flame size={14} className={onlyDrops ? 'fill-orange-400' : ''} />
              <span>DROPS ONLY</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs font-mono text-zinc-300">
              <SlidersHorizontal size={14} className="text-zinc-500 mr-2" />
              <select
                value={sortBy}
                onChange={(e) => onSelectSort(e.target.value)}
                className="bg-transparent outline-none text-zinc-200 cursor-pointer font-bold"
              >
                <option value="trending" className="bg-zinc-900 text-white">Trending 🔥</option>
                <option value="price-low" className="bg-zinc-900 text-white">Price: Low to High</option>
                <option value="price-high" className="bg-zinc-900 text-white">Price: High to Low</option>
                <option value="rating" className="bg-zinc-900 text-white">Top Rated ⭐</option>
              </select>
            </div>
          </div>

        </div>

        {/* Bottom Row: Vibe Pills & Results Counter */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-800/60">
          
          {/* Aesthetic / Vibe Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono text-zinc-500 uppercase flex items-center gap-1 mr-1">
              <Sparkles size={12} className="text-[#CCFF00]" /> VIBE CHECK:
            </span>
            {vibes.map((v) => (
              <button
                key={v.id}
                onClick={() => onSelectVibe(v.id)}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all border ${
                  selectedVibe === v.id
                    ? 'bg-[#00F0FF]/15 text-[#00F0FF] border-[#00F0FF] font-bold'
                    : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:border-zinc-700'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>

          {/* Result Count and Clear Filters */}
          <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
            <span>SHOWING <strong className="text-white font-bold">{resultsCount}</strong> FITS</span>
            {hasActiveFilters && (
              <button
                onClick={onResetFilters}
                className="flex items-center gap-1 text-[#FF007F] hover:underline"
              >
                <X size={13} /> Reset
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
