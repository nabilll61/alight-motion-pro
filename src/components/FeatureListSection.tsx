import React from 'react';
import { Sparkles, FileCode, Sliders, Layers, Video, Cloud, Check } from 'lucide-react';
import { FEATURE_DATA } from '../data/contentData';

export const FeatureListSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-pink-600 fill-pink-400 stroke-[2.5]" />;
      case 'FileCode':
        return <FileCode className="w-5 h-5 text-blue-600 stroke-[2.5]" />;
      case 'Sliders':
        return <Sliders className="w-5 h-5 text-emerald-600 stroke-[2.5]" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-purple-600 stroke-[2.5]" />;
      case 'Video':
        return <Video className="w-5 h-5 text-amber-600 stroke-[2.5]" />;
      case 'CloudSync':
        return <Cloud className="w-5 h-5 text-sky-600 stroke-[2.5]" />;
      default:
        return <Sparkles className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <section id="features" className="py-8 px-3 max-w-2xl mx-auto w-full select-none">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center gap-3 mb-6">
        <div className="bg-yellow-200 text-slate-900 font-extrabold text-xs px-3.5 py-1.5 rounded-full border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] inline-flex items-center gap-1.5">
          <span>⚡ Keunggulan Alight Motion Pro 1 Tahun</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-snug">
          Semua Fitur Premium
          <br />
          <span className="bg-blue-200 border-2 border-slate-900 text-slate-900 font-extrabold px-3 py-0.5 rounded-2xl shadow-[3px_3px_0px_#0f172a] inline-block mt-1">
            Terbuka 100% Bebas Akses
          </span>
        </h2>

        <p className="text-slate-700 font-semibold text-xs md:text-sm max-w-lg leading-relaxed">
          Nikmati kebebasan berkreasi membuat video cinematic, AM preset, jedag-jedug aesthetic, dan motion graphics tanpa halangan fitur terkunci.
        </p>
      </div>

      {/* Feature Cards Stack */}
      <div className="space-y-4">
        {FEATURE_DATA.map((feat) => (
          <div
            key={feat.id}
            className="bg-white border-2 border-slate-900 rounded-2xl p-4 shadow-[4px_4px_0px_#0f172a] transition-all hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border-2 border-slate-900 flex items-center justify-center shadow-[2px_2px_0px_#0f172a]">
                {getIcon(feat.icon)}
              </div>

              <span className="bg-slate-100 text-slate-900 text-[10px] font-black tracking-wider px-2.5 py-1 rounded-full border border-slate-900 uppercase shadow-[1px_1px_0px_#0f172a]">
                {feat.badge}
              </span>
            </div>

            <h3 className="font-extrabold text-base text-slate-900 tracking-tight mb-1">
              {feat.title}
            </h3>

            <p className="text-xs font-semibold text-slate-600 leading-relaxed mb-3">
              {feat.description}
            </p>

            <div className="pt-2 border-t border-slate-200 flex items-center gap-1.5 text-xs font-extrabold text-emerald-700">
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Termasuk Paket Pro 1 Tahun Gratis</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
