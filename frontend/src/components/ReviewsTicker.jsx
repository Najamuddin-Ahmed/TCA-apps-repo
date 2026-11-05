import React from 'react';
import { Star, Flame, CheckCircle, MessageSquare } from 'lucide-react';

export default function ReviewsTicker() {
  const reviews = [
    {
      author: "@noah.drip",
      location: "London, UK",
      product: "Parachute Tech Cargos",
      rating: 5,
      text: "The bungee hem cinch is elite. Stacked over my chunky sneakers with zero dragging. Literal S-tier quality."
    },
    {
      author: "@maya_fits",
      location: "Los Angeles, CA",
      product: "Chrome Cropped Puffer",
      rating: 5,
      text: "Took this to a warehouse rave and 8 people asked me where it was from. Warm down to freezing too fr 🔥"
    },
    {
      author: "@kenji.archive",
      location: "Tokyo, JP",
      product: "Acid Cyber Hoodie",
      rating: 5,
      text: "480 GSM is heavy as armor. Doesn't shrink in the wash. Worth every penny, no cap."
    },
    {
      author: "@chloe_2002",
      location: "Melbourne, AU",
      product: "Y2K Rhinestone Baby Tee",
      rating: 5,
      text: "Rhinestones survived 6 delicate machine cycles without a single one falling off. Obsessed!"
    }
  ];

  return (
    <section id="reviews" className="py-20 bg-[#0E0E12] border-b border-zinc-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#CCFF00]/10 border border-[#CCFF00]/30 text-[#CCFF00] font-mono text-xs font-bold uppercase mb-2">
          <Star size={12} className="fill-[#CCFF00]" /> 4.9/5 COMMUNITY VIBE CHECK
        </div>
        <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
          WHAT THE CROWD IS SAYING
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviews.map((r, i) => (
            <div 
              key={i} 
              className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800 flex flex-col justify-between space-y-4 hover:border-zinc-600 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(r.rating)].map((_, idx) => (
                      <Star key={idx} size={13} className="fill-amber-400" />
                    ))}
                  </div>
                  <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                    <CheckCircle size={10} /> VERIFIED FIT
                  </span>
                </div>

                <p className="text-zinc-300 text-xs font-sans leading-relaxed">
                  "{r.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-900 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="font-bold text-white block">{r.author}</span>
                  <span className="text-[10px] text-zinc-500">{r.location}</span>
                </div>
                <span className="text-[10px] text-[#CCFF00] bg-[#CCFF00]/10 px-2 py-0.5 rounded">
                  {r.product}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
