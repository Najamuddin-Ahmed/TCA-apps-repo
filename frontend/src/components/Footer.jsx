import React, { useState } from 'react';
import { Zap, Send, ShieldCheck, Heart, Sparkles, Check } from 'lucide-react';

export default function Footer({ onApplyCode }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      if (onApplyCode) onApplyCode('DRIP15');
    }
  };

  return (
    <footer className="bg-[#08080A] text-zinc-400 font-mono text-xs border-t border-zinc-800">
      
      {/* Top Banner: Newsletter Club */}
      <div className="border-b border-zinc-800 py-12 bg-zinc-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center lg:text-left">
              <span className="text-[#CCFF00] font-bold text-xs uppercase tracking-widest flex items-center justify-center lg:justify-start gap-1">
                <Sparkles size={14} /> EXCLUSIVE ACCESS
              </span>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                JOIN THE AURA UNDERGROUND CLUB
              </h3>
              <p className="text-zinc-400 text-xs font-sans max-w-md">
                Get notified 30 minutes before drops hit the public site + receive instant 15% off code.
              </p>
            </div>

            {/* Newsletter form */}
            <div className="w-full max-w-md">
              {subscribed ? (
                <div className="bg-[#CCFF00]/10 border border-[#CCFF00] p-4 rounded-2xl text-center space-y-1">
                  <span className="flex items-center justify-center gap-1.5 text-[#CCFF00] font-bold">
                    <Check size={16} /> YOU'RE IN THE INNER CIRCLE!
                  </span>
                  <p className="text-zinc-300 text-xs">
                    Code <strong className="text-white">DRIP15</strong> has been activated for 15% off your next order.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 outline-none focus:border-[#CCFF00]"
                  />
                  <button
                    type="submit"
                    className="bg-[#CCFF00] hover:bg-[#b8e600] text-black font-black px-6 py-3 rounded-xl neo-border transition-all flex items-center gap-1"
                  >
                    <span>JOIN</span>
                    <Send size={13} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#CCFF00] flex items-center justify-center text-black font-black neo-border">
                <Zap size={18} className="fill-black" />
              </div>
              <span className="font-display font-black text-xl text-white tracking-tighter">
                AURA<span className="text-[#CCFF00]">.</span>LAB
              </span>
            </div>
            <p className="text-zinc-400 text-xs font-sans max-w-sm leading-relaxed">
              We design heavyweight garments for digital natives, skaters, techno heads, and anyone rejecting ordinary fast fashion. Built to outlast the trend cycle.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
              <span className="hover:text-white cursor-pointer">TIKTOK</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer">INSTAGRAM</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer">DISCORD</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer">SPOTIFY</span>
            </div>
          </div>

          {/* Col 1: Shop */}
          <div className="space-y-3">
            <h4 className="text-white font-bold tracking-wider text-xs uppercase">COLLECTIONS</h4>
            <ul className="space-y-2 text-zinc-400 text-xs">
              <li><a href="#catalog" className="hover:text-[#CCFF00]">New Drop 04</a></li>
              <li><a href="#catalog" className="hover:text-[#CCFF00]">Cyber Silhouettes</a></li>
              <li><a href="#catalog" className="hover:text-[#CCFF00]">Y2K Archives</a></li>
              <li><a href="#catalog" className="hover:text-[#CCFF00]">Parachute Cargos</a></li>
              <li><a href="#catalog" className="hover:text-[#CCFF00]">Accessories</a></li>
            </ul>
          </div>

          {/* Col 2: Info */}
          <div className="space-y-3">
            <h4 className="text-white font-bold tracking-wider text-xs uppercase">HELP & CARE</h4>
            <ul className="space-y-2 text-zinc-400 text-xs">
              <li className="hover:text-white cursor-pointer">Oversized Sizing Guide</li>
              <li className="hover:text-white cursor-pointer">Order Tracking (Live)</li>
              <li className="hover:text-white cursor-pointer">Worldwide Express Shipping</li>
              <li className="hover:text-white cursor-pointer">30-Day Hassle Free Returns</li>
              <li className="hover:text-white cursor-pointer">Washing & Heavyweight Care</li>
            </ul>
          </div>

          {/* Col 3: Sustainability */}
          <div className="space-y-3">
            <h4 className="text-white font-bold tracking-wider text-xs uppercase">ETHOS</h4>
            <ul className="space-y-2 text-zinc-400 text-xs">
              <li className="hover:text-white cursor-pointer">480 GSM French Terry</li>
              <li className="hover:text-white cursor-pointer">Plastic-Free Packaging</li>
              <li className="hover:text-white cursor-pointer">Fair Wage Factories</li>
              <li className="hover:text-white cursor-pointer">Zero Deadstock Policy</li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-10 mt-10 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            © 2026 AURA LAB CO. ALL RIGHTS RESERVED. POWERED BY VITE + REACT + TAILWIND.
          </div>
          <div className="flex items-center gap-3">
            <span className="text-zinc-400">ACCEPTED:</span>
            <span>APPLE PAY</span>
            <span>•</span>
            <span>KLARNA 4X</span>
            <span>•</span>
            <span>VISA / MC</span>
            <span>•</span>
            <span>SOLANA</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
