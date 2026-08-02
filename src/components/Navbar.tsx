import React, { useState } from 'react';
import { Menu, X, Zap, Sparkles, HelpCircle, History, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onOpenHistory: () => void;
  activeOrderCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onOpenHistory, activeOrderCount = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-2 z-40 px-3 max-w-2xl mx-auto w-full">
      <div className="bg-white rounded-2xl border-[2px] border-slate-900 shadow-[2.5px_2.5px_0px_#0f172a] p-2.5 sm:p-3 flex items-center justify-between transition-all">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('hero')} 
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 border-[2px] border-slate-900 flex items-center justify-center text-white shadow-[1.5px_1.5px_0px_#0f172a] group-hover:rotate-3 transition-transform">
            {/* AM Styled Logo */}
            <div className="relative font-black text-base sm:text-lg tracking-tighter flex items-center justify-center">
              A
              <span className="text-yellow-300 text-[10px] absolute -top-1 -right-1">★</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900">
                AlightPro
              </span>
              <span className="bg-pink-100 text-pink-700 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full border border-pink-300 flex items-center gap-0.5 shadow-[1px_1px_0px_#db2777]">
                ★ PRO 1 TH
              </span>
            </div>
            <p className="text-[9px] font-bold tracking-widest text-slate-500 uppercase -mt-0.5">
              ALIGHT MOTION VERIFIER
            </p>
          </div>
        </div>

        {/* Menu Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-9 h-9 sm:w-10 sm:h-10 bg-[#fef08a] hover:bg-yellow-300 border-[2px] border-slate-900 rounded-xl flex items-center justify-center shadow-[1.5px_1.5px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 transition-all text-slate-900"
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X className="w-5 h-5 stroke-[2.5]" /> : <Menu className="w-5 h-5 stroke-[2.5]" />}
        </button>
      </div>

      {/* Expanded Mobile / Desktop Menu Box */}
      {isOpen && (
        <div className="mt-2 bg-white rounded-2xl border-[2px] border-slate-900 shadow-[3px_3px_0px_#0f172a] p-2 flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
          <button
            onClick={() => handleNavClick('verification-panel')}
            className="w-full bg-[#e0f2fe] hover:bg-blue-200 text-slate-900 font-bold py-2 px-3 rounded-xl border-[1.5px] border-slate-900 flex items-center justify-between shadow-[1.5px_1.5px_0px_#0f172a] transition-all text-left text-xs sm:text-sm"
          >
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-600 fill-blue-500" />
              <span>Mulai Verifikasi</span>
            </div>
            <span className="text-[9px] bg-white text-slate-800 font-extrabold px-1.5 py-0.5 rounded border border-slate-900">
              PRO 1 TH
            </span>
          </button>

          <button
            onClick={() => handleNavClick('features')}
            className="w-full bg-[#fde8f2] hover:bg-pink-200 text-slate-900 font-bold py-2 px-3 rounded-xl border-[1.5px] border-slate-900 flex items-center gap-2 shadow-[1.5px_1.5px_0px_#0f172a] transition-all text-left text-xs sm:text-sm"
          >
            <Sparkles className="w-4 h-4 text-pink-600" />
            <span>Fitur Alight Motion Pro</span>
          </button>

          <button
            onClick={() => handleNavClick('faq')}
            className="w-full bg-[#f3e8ff] hover:bg-purple-200 text-slate-900 font-bold py-2 px-3 rounded-xl border-[1.5px] border-slate-900 flex items-center gap-2 shadow-[1.5px_1.5px_0px_#0f172a] transition-all text-left text-xs sm:text-sm"
          >
            <HelpCircle className="w-4 h-4 text-purple-600" />
            <span>Pertanyaan Umum (FAQ)</span>
          </button>

          <button
            onClick={() => {
              onOpenHistory();
              setIsOpen(false);
            }}
            className="w-full bg-[#fef08a] hover:bg-yellow-200 text-slate-900 font-bold py-2 px-3 rounded-xl border-[1.5px] border-slate-900 flex items-center justify-between shadow-[1.5px_1.5px_0px_#0f172a] transition-all text-left text-xs sm:text-sm"
          >
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-amber-700" />
              <span>Riwayat Order</span>
            </div>
            {activeOrderCount > 0 && (
              <span className="bg-amber-400 text-slate-900 text-[10px] font-black px-1.5 py-0.5 rounded-full border border-slate-900">
                {activeOrderCount}
              </span>
            )}
          </button>
        </div>
      )}
    </header>
  );
};
