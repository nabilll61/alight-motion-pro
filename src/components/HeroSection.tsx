import React from 'react';
import { Sparkles, ShieldCheck, Video, Award, Layers } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="py-4 px-3 max-w-2xl mx-auto w-full flex flex-col items-start gap-3.5 select-none">
      {/* Top Badges */}
      <div className="flex flex-wrap gap-2 items-center">
        {/* Badge 1 */}
        <div className="bg-[#fde8f2] text-slate-900 font-extrabold text-[11px] sm:text-xs px-3.5 py-1.5 rounded-full border-[2px] border-slate-900 shadow-[2px_2px_0px_#0f172a] flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-pink-600 fill-pink-400" />
          <span>Platform Verifikasi Mandiri Alight Creative</span>
        </div>

        {/* Badge 2 */}
        <div className="bg-[#dcfce7] text-slate-900 font-extrabold text-[11px] sm:text-xs px-3.5 py-1.5 rounded-full border-[2px] border-slate-900 shadow-[2px_2px_0px_#0f172a] flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>100% Gratis & Tanpa Password</span>
        </div>
      </div>

      {/* Main Title */}
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
        Aktivasi{' '}
        <span className="bg-[#93c5fd] border-[2.5px] border-slate-900 text-slate-900 font-extrabold px-3.5 py-0.5 rounded-[20px] shadow-[3px_3px_0px_#0f172a] inline-block my-1 mx-0.5">
          Alight Motion Pro
        </span>{' '}
        1<br />
        Tahun.
      </h1>

      {/* Subtitle / Description */}
      <p className="text-slate-700 font-semibold text-xs sm:text-sm leading-relaxed max-w-xl">
        Nikmati fitur editing video tanpa watermark, unlocked all preset XML, rendering jernih 4K 60FPS, dan akses efek premium tanpa batas.
      </p>

      {/* 3 Key Benefit Cards */}
      <div className="grid grid-cols-3 gap-2 w-full pt-1">
        {/* Card 1 */}
        <div className="bg-[#e0f2fe] border-[2px] border-slate-900 rounded-[16px] p-2 sm:p-2.5 shadow-[2px_2px_0px_#0f172a] flex flex-col justify-between gap-2">
          <div className="w-7 h-7 rounded-lg bg-white border-[1.5px] border-slate-900 flex items-center justify-center text-blue-600 shadow-[1px_1px_0px_#0f172a]">
            <Video className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="font-extrabold text-[11px] sm:text-xs text-slate-900 leading-tight">No Watermark</h3>
            <p className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase mt-0.5 tracking-wider">EXPORT CLEAN</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-[#dcfce7] border-[2px] border-slate-900 rounded-[16px] p-2 sm:p-2.5 shadow-[2px_2px_0px_#0f172a] flex flex-col justify-between gap-2">
          <div className="w-7 h-7 rounded-lg bg-white border-[1.5px] border-slate-900 flex items-center justify-center text-emerald-600 shadow-[1px_1px_0px_#0f172a]">
            <Award className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="font-extrabold text-[11px] sm:text-xs text-slate-900 leading-tight">Durasi 1 Tahun</h3>
            <p className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase mt-0.5 tracking-wider">365 HARI FULL</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-[#fef08a] border-[2px] border-slate-900 rounded-[16px] p-2 sm:p-2.5 shadow-[2px_2px_0px_#0f172a] flex flex-col justify-between gap-2">
          <div className="w-7 h-7 rounded-lg bg-white border-[1.5px] border-slate-900 flex items-center justify-center text-amber-600 shadow-[1px_1px_0px_#0f172a]">
            <Layers className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="font-extrabold text-[11px] sm:text-xs text-slate-900 leading-tight">Full XML Preset</h3>
            <p className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase mt-0.5 tracking-wider">UNLIMITED IMPORT</p>
          </div>
        </div>
      </div>
    </section>
  );
};
