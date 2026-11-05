import React, { useState, useEffect } from 'react';
import { Camera, Tag, ArrowRight, Heart, Sparkles, ExternalLink } from 'lucide-react';

export default function LookbookSection({ onSelectProduct }) {
  const [looks, setLooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/lookbook')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setLooks(data.lookbook);
        }
      })
      .catch(err => console.error('Error fetching lookbook', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="lookbook" className="py-20 bg-[#0A0A0C] border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] font-mono text-xs font-bold uppercase mb-2">
              <Camera size={13} />
              COMMUNITY CURATION
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
              LOOKBOOK <span className="text-[#CCFF00]">2026</span>
            </h2>
            <p className="text-zinc-400 text-sm mt-1 max-w-lg font-sans">
              As seen in Tokyo, Berlin, Brooklyn, and Seoul. Tag <strong className="text-white">@AuraLab.fits</strong> on TikTok to be featured.
            </p>
          </div>

          <div className="font-mono text-xs text-zinc-400">
            [ ARCHIVE EDITION // ISSUE 04 ]
          </div>
        </div>

        {/* Lookbook Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {looks.map((look) => (
            <div
              key={look.id}
              className="group bg-[#121217] rounded-3xl border border-zinc-800 overflow-hidden flex flex-col justify-between hover:border-zinc-600 transition-all shadow-lg"
            >
              {/* Photo */}
              <div className="relative aspect-[3/4] overflow-hidden bg-zinc-950">
                <img
                  src={look.image}
                  alt={look.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                {/* Creator Handle Pill */}
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-white font-bold border border-zinc-700">
                  {look.handle}
                </div>

                {/* Aura Score Sticker */}
                <div className="absolute top-3 right-3 bg-[#CCFF00] text-black px-2 py-0.5 rounded text-[10px] font-mono font-black neo-border">
                  {look.auraScore}
                </div>

                {/* Bottom title & quote */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-display font-black text-base text-white">{look.title}</h3>
                  <p className="text-[11px] font-sans text-zinc-300 italic mt-0.5 line-clamp-2">
                    "{look.quote}"
                  </p>
                </div>
              </div>

              {/* Tagged Products in Fit */}
              <div className="p-4 bg-zinc-900/60 border-t border-zinc-800 space-y-2">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                  FEATURED IN THIS FIT:
                </span>
                
                <div className="space-y-1.5">
                  {look.products && look.products.map((prod) => (
                    <button
                      key={prod.id}
                      onClick={() => onSelectProduct(prod)}
                      className="w-full flex items-center justify-between text-left p-2 rounded-xl bg-zinc-950/80 hover:bg-[#CCFF00] hover:text-black transition-colors text-xs font-mono group/btn border border-zinc-800/80"
                    >
                      <span className="truncate pr-2 font-bold text-zinc-200 group-hover/btn:text-black">
                        {prod.name}
                      </span>
                      <span className="font-black text-[#CCFF00] group-hover/btn:text-black flex-shrink-0">
                        ${prod.price}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
