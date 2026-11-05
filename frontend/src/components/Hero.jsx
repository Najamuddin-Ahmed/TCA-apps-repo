import React, { useState } from 'react';
import { ArrowRight, Sparkles, Flame, ShieldCheck, Zap } from 'lucide-react';

export default function Hero({ onExploreDrops, onOpenFitBuilder }) {
  const [activeMood, setActiveMood] = useState(0);

  const moods = [
    {
      title: "CYBER DYS-TOPIA",
      vibe: "Acid Wash & Matrix Silhouettes",
      tag: "#CYBERPUNK",
      color: "from-lime-400 to-emerald-500",
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80"
    },
    {
      title: "Y2K RETRO ARCHIVE",
      vibe: "Baggy Cargos & Chrome Rhinestones",
      tag: "#Y2K_BABY",
      color: "from-pink-500 to-purple-600",
      image: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1000&q=80"
    },
    {
      title: "NEO-GRUNGE SHRED",
      vibe: "Distressed Open Knits & Platform Kicks",
      tag: "#DRAINCORE",
      color: "from-indigo-500 to-cyan-400",
      image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=1000&q=80"
    }
  ];

  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 lg:py-24 border-b border-zinc-800 bg-gradient-to-b from-black via-[#0A0A0E] to-[#0A0A0C]">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#CCFF00]/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#FF007F]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Text & Badges */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Tag Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-[#CCFF00] text-[#CCFF00] font-mono text-xs font-bold tracking-wide">
                <Flame size={13} className="text-orange-400 fill-orange-400" />
                SPRING 2026 DROP LIVE
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 font-mono text-xs">
                <Sparkles size={13} className="text-[#00F0FF]" />
                NO FAST FASHION // 480GSM HEAVYWEIGHT
              </span>
            </div>

            {/* Giant Gen-Z Typography */}
            <h1 className="font-display font-black text-4xl sm:text-6xl xl:text-7xl leading-[0.95] tracking-tight uppercase text-white">
              UNAPOLOGETIC <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CCFF00] via-[#00F0FF] to-[#FF007F]">
                STREETWEAR
              </span> <br />
              FOR MAXIMUM <span className="underline decoration-[#CCFF00] decoration-wavy decoration-2">AURA</span>.
            </h1>

            {/* Subtitle */}
            <p className="text-zinc-400 text-base sm:text-lg max-w-xl font-sans font-normal leading-relaxed">
              Curated oversized silhouettes, cyber-acid washes, parachute technical pants, and Y2K grails made for everyone who refuses to blend in.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={onExploreDrops}
                className="group flex items-center justify-center gap-3 bg-[#CCFF00] hover:bg-[#b8e600] text-black font-mono font-black text-sm px-8 py-4 rounded-xl neo-border transition-all active:translate-y-1 active:shadow-none"
              >
                <span>SHOP THE DROP</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenFitBuilder}
                className="group flex items-center justify-center gap-2 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700 hover:border-[#FF007F] text-white font-mono font-bold text-sm px-6 py-4 rounded-xl transition-all"
              >
                <Sparkles size={16} className="text-[#FF007F]" />
                <span>AI FIT BUILDER (GET STYLED)</span>
              </button>
            </div>

            {/* Social Proof & Perks */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-800/80 font-mono text-xs">
              <div>
                <span className="block font-black text-xl text-white">480 GSM</span>
                <span className="text-zinc-400">French Terry Cotton</span>
              </div>
              <div>
                <span className="block font-black text-xl text-[#CCFF00]">100% REAL</span>
                <span className="text-zinc-400">TikTok Verified Viral</span>
              </div>
              <div>
                <span className="block font-black text-xl text-white">4.9 ★</span>
                <span className="text-zinc-400">Over 3,000+ Reviews</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Featured Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              
              {/* Floating Sticker 1 */}
              <div className="absolute -top-4 -right-4 z-20 bg-[#FF007F] text-white px-3 py-1.5 rounded-lg text-xs font-mono font-black uppercase rotate-6 neo-border animate-float shadow-lg">
                ★ CERTIFIED DRIP
              </div>

              {/* Floating Sticker 2 */}
              <div className="absolute -bottom-5 -left-4 z-20 bg-[#CCFF00] text-black px-3 py-1.5 rounded-lg text-xs font-mono font-black uppercase -rotate-3 neo-border shadow-lg">
                ⚡ AURA +15,000
              </div>

              {/* Main Card */}
              <div className="rounded-2xl border-2 border-zinc-700 bg-zinc-900/90 overflow-hidden shadow-2xl relative">
                <div className="relative h-96 sm:h-[420px] overflow-hidden group">
                  <img
                    src={moods[activeMood].image}
                    alt={moods[activeMood].title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                  {/* Card Badge */}
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md border border-zinc-600 px-3 py-1 rounded-full text-xs font-mono text-[#00F0FF] font-bold">
                    {moods[activeMood].tag}
                  </div>

                  {/* Bottom details inside card */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[11px] font-mono tracking-widest text-[#CCFF00] uppercase font-bold">
                      {moods[activeMood].vibe}
                    </span>
                    <h3 className="font-display font-black text-2xl text-white mt-0.5">
                      {moods[activeMood].title}
                    </h3>
                  </div>
                </div>

                {/* Mood Switcher Pills */}
                <div className="p-3 bg-zinc-950 flex items-center justify-between border-t border-zinc-800 gap-1">
                  {moods.map((m, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveMood(idx)}
                      className={`flex-1 py-1.5 px-2 text-[11px] font-mono font-bold rounded-lg transition-all ${
                        activeMood === idx
                          ? 'bg-[#CCFF00] text-black neo-border'
                          : 'bg-zinc-900 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {idx === 0 ? 'CYBER' : idx === 1 ? 'Y2K' : 'GRUNGE'}
                    </button>
                  ))}
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
