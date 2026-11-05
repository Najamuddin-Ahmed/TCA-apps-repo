import React, { useState } from 'react';
import { Sparkles, ShoppingBag, Zap, RefreshCw, Check } from 'lucide-react';

export default function OutfitGenerator({ products, onAddMultipleToCart }) {
  const [selectedVibe, setSelectedVibe] = useState('cyberpunk');
  const [addedAll, setAddedAll] = useState(false);

  const presets = [
    {
      id: 'cyberpunk',
      name: 'Techno Warehouse Rave',
      emoji: '🪩',
      vibeTag: 'cyberpunk',
      badge: '+35,000 AURA',
      desc: 'Liquid chrome, dropped shoulders, and waterproof chest rig for 4AM soundscapes.'
    },
    {
      id: 'streetwear',
      name: 'Skatepark Sunset Run',
      emoji: '🛹',
      vibeTag: 'streetwear',
      badge: '+28,000 AURA',
      desc: 'Heavyweight baggy silhouettes, parachute cargos, and chunky wave kicks.'
    },
    {
      id: 'y2k',
      name: 'Retro Archive Flash',
      emoji: '💿',
      vibeTag: 'y2k',
      badge: '+30,000 AURA',
      desc: 'Early 2000s airbrush graphics, rhinestones, and aerodynamic shield frames.'
    },
    {
      id: 'grunge',
      name: 'Neo-Underground Gig',
      emoji: '🎸',
      vibeTag: 'grunge',
      badge: '+26,500 AURA',
      desc: 'Distressed ladder knits, pierced balaclava, and washed obsidian joggers.'
    }
  ];

  // Pick 3 items matching current selected vibe
  const matchingProducts = products.filter(p => p.vibe === selectedVibe);
  const topItem = matchingProducts.find(p => p.category === 'tops') || products.find(p => p.category === 'tops');
  const bottomItem = matchingProducts.find(p => p.category === 'bottoms') || products.find(p => p.category === 'bottoms');
  const extraItem = matchingProducts.find(p => p.category === 'accessories' || p.category === 'outerwear' || p.category === 'footwear') || products[0];

  const currentFit = [topItem, bottomItem, extraItem].filter(Boolean);
  const fitTotalPrice = currentFit.reduce((acc, item) => acc + item.price, 0);

  const handleAddEntireFit = () => {
    onAddMultipleToCart(currentFit);
    setAddedAll(true);
    setTimeout(() => setAddedAll(false), 2200);
  };

  return (
    <section id="fit-builder" className="py-20 bg-[#0E0E12] border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF007F]/10 border border-[#FF007F]/40 text-[#FF007F] font-mono text-xs font-bold uppercase mb-3">
            <Sparkles size={13} />
            AI AURA FIT BUILDER
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            INSTANT HEAD-TO-TOE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CCFF00] via-[#00F0FF] to-[#FF007F]">
              CURATED VIBE CHECK
            </span>
          </h2>
          <p className="text-zinc-400 text-sm mt-3 font-sans">
            Don't know how to style your drop? Pick your destination and let our algorithm assemble the complete 3-piece look.
          </p>
        </div>

        {/* Preset Vibe Buttons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {presets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => setSelectedVibe(preset.id)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                selectedVibe === preset.id
                  ? 'bg-zinc-900 border-[#CCFF00] neo-border shadow-lg'
                  : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{preset.emoji}</span>
                <span className="text-[10px] font-mono font-bold text-[#CCFF00] bg-[#CCFF00]/10 px-2 py-0.5 rounded">
                  {preset.badge}
                </span>
              </div>
              <h3 className="font-display font-bold text-sm text-white">{preset.name}</h3>
              <p className="text-[11px] font-sans text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                {preset.desc}
              </p>
            </button>
          ))}
        </div>

        {/* Selected Fit 3-Piece Showcase Card */}
        <div className="bg-[#121217] border-2 border-zinc-700 rounded-3xl p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentFit.map((item, idx) => (
              <div 
                key={item.id} 
                className="bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden group hover:border-zinc-600 transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-black/80 px-2.5 py-1 rounded text-[10px] font-mono text-[#00F0FF] uppercase font-bold">
                    PIECE 0{idx + 1} // {item.category}
                  </div>
                </div>

                <div className="p-4 space-y-1">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">{item.vibe}</span>
                  <h4 className="font-display font-bold text-sm text-white line-clamp-1 uppercase">
                    {item.name}
                  </h4>
                  <div className="flex items-center justify-between pt-2">
                    <span className="font-mono font-black text-sm text-white">${item.price}</span>
                    <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                      <Zap size={11} className="text-[#CCFF00] fill-[#CCFF00]" /> {item.auraScore}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Fit Summary Bar */}
          <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-0.5 text-center sm:text-left">
              <span className="text-xs font-mono text-zinc-400">COMPLETE 3-PIECE COMBO PRICE</span>
              <div className="flex items-baseline gap-2 justify-center sm:justify-start">
                <span className="font-mono font-black text-2xl text-white">${fitTotalPrice}</span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                  FREE WORLDWIDE SHIPPING INCLUDED
                </span>
              </div>
            </div>

            <button
              onClick={handleAddEntireFit}
              disabled={addedAll}
              className={`w-full sm:w-auto px-8 py-4 rounded-xl font-mono text-xs font-black tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
                addedAll
                  ? 'bg-emerald-500 text-black'
                  : 'bg-[#CCFF00] hover:bg-[#b8e600] text-black neo-border active:translate-y-0.5'
              }`}
            >
              {addedAll ? (
                <>
                  <Check size={18} /> ENTIRE LOOK ADDED TO BAG!
                </>
              ) : (
                <>
                  <ShoppingBag size={18} /> ADD ALL 3 PIECES TO BAG (${fitTotalPrice})
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
