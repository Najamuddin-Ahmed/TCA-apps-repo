import React, { useState } from 'react';
import { Sparkles, Flame, Tag, Check, Copy } from 'lucide-react';

export default function AnnouncementBar({ onApplyCode }) {
  const [copied, setCopied] = useState(false);

  const copyCode = (code) => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    if (onApplyCode) onApplyCode(code);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-[#CCFF00] text-black text-xs font-mono font-bold tracking-wider py-2 overflow-hidden border-b-2 border-black relative z-40 select-none">
      <div className="flex items-center justify-between px-4 max-w-7xl mx-auto">
        {/* Animated Marquee Strip */}
        <div className="flex items-center space-x-6 overflow-hidden whitespace-nowrap">
          <div className="inline-flex items-center space-x-3">
            <span className="flex items-center gap-1 bg-black text-[#CCFF00] px-2 py-0.5 rounded text-[11px] font-black uppercase">
              <Flame size={13} className="text-orange-500 fill-orange-500" /> DROP 04 LIVE
            </span>
            <span>OVERSIZED SILHOUETTES JUST DROPPED</span>
            <span className="text-zinc-600">✦</span>
            <span>WORLDWIDE FREE SHIPPING ON ORDERS OVER $100</span>
            <span className="text-zinc-600">✦</span>
            <span className="hidden md:inline">NO ARCHIVE RESTOCKS // ONCE GONE, GONE FOREVER</span>
          </div>
        </div>

        {/* Promo code badge button */}
        <button
          onClick={() => copyCode('NOCAP')}
          className="flex-shrink-0 flex items-center gap-1.5 bg-black hover:bg-zinc-800 text-white hover:text-[#CCFF00] px-2.5 py-1 rounded transition-all active:scale-95 text-[11px] ml-3"
          title="Click to copy and apply discount"
        >
          <Tag size={12} className="text-[#CCFF00]" />
          <span>USE CODE <span className="text-[#CCFF00] underline underline-offset-2">NOCAP</span> FOR 20% OFF</span>
          {copied ? (
            <span className="flex items-center gap-1 text-[#CCFF00] font-bold">
              <Check size={12} /> COPIED!
            </span>
          ) : (
            <Copy size={11} className="opacity-70" />
          )}
        </button>
      </div>
    </div>
  );
}
