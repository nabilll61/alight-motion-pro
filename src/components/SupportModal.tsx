import React, { useState } from 'react';
import { Headset, X, MessageSquare, Radio, Send, UserCheck, ShieldCheck, ExternalLink } from 'lucide-react';

export const SupportModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Headset Support Button (Bottom Right) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 w-12 h-12 bg-yellow-300 hover:bg-yellow-400 text-slate-900 rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0px_#0f172a] flex items-center justify-center active:translate-x-0.5 active:translate-y-0.5 transition-all group"
        aria-label="Pusat Bantuan & Komunitas"
      >
        <Headset className="w-6 h-6 stroke-[2.5] group-hover:scale-110 transition-transform" />
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-900"></span>
      </button>

      {/* Support Modal Popup */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white border-2 border-slate-900 rounded-3xl max-w-md w-full shadow-[6px_6px_0px_#0f172a] overflow-hidden select-none animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-blue-300 p-4 border-b-2 border-slate-900 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border-2 border-slate-900 flex items-center justify-center text-slate-900 shadow-[2px_2px_0px_#0f172a]">
                  <Headset className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-black text-base text-slate-900 tracking-tight">
                    Pusat Bantuan & Komunitas
                  </h3>
                  <p className="text-[11px] font-bold text-slate-700">Layanan Bantuan & Komunitas</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-xl bg-white border-2 border-slate-900 flex items-center justify-center text-slate-900 hover:bg-slate-100 shadow-[1px_1px_0px_#0f172a]"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 md:p-5 space-y-4">
              <p className="text-xs font-bold text-slate-700 leading-relaxed">
                Dapatkan informasi terbaru, solusi kendala, dan diskusi seputar Alight Motion Pro.
              </p>

              {/* Support Links */}
              <div className="space-y-2.5">
                {/* Link 1: WhatsApp Group */}
                <a
                  href="https://chat.whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-100 hover:bg-emerald-200 border-2 border-slate-900 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-[3px_3px_0px_#0f172a] transition-all text-slate-900"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white border-2 border-slate-900 flex items-center justify-center text-emerald-600 shrink-0">
                      <MessageSquare className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs text-slate-900">Grup WhatsApp Komunitas</h4>
                      <p className="text-[10px] font-semibold text-slate-600">Diskusi & info update Alight Motion</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-700 shrink-0" />
                </a>

                {/* Link 2: Official WhatsApp Channel */}
                <a
                  href="https://whatsapp.com/channel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-100 hover:bg-blue-200 border-2 border-slate-900 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-[3px_3px_0px_#0f172a] transition-all text-slate-900"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white border-2 border-slate-900 flex items-center justify-center text-blue-600 shrink-0">
                      <Radio className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs text-slate-900">Channel WhatsApp Resmi</h4>
                      <p className="text-[10px] font-semibold text-slate-600">Pengumuman & kabar fitur terbaru</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-700 shrink-0" />
                </a>

                {/* Link 3: Telegram Group */}
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-100 hover:bg-purple-200 border-2 border-slate-900 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-[3px_3px_0px_#0f172a] transition-all text-slate-900"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white border-2 border-slate-900 flex items-center justify-center text-purple-600 shrink-0">
                      <Send className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs text-slate-900">Grup Telegram Support</h4>
                      <p className="text-[10px] font-semibold text-slate-600">Dukungan teknis cepat & file XML</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-700 shrink-0" />
                </a>

                {/* Link 4: Direct Admin Contact */}
                <a
                  href="https://wa.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow-200 hover:bg-yellow-300 border-2 border-slate-900 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-[3px_3px_0px_#0f172a] transition-all text-slate-900"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white border-2 border-slate-900 flex items-center justify-center text-amber-600 shrink-0">
                      <UserCheck className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs text-slate-900">Kontak Admin Direct</h4>
                      <p className="text-[10px] font-semibold text-slate-600">Konsultasi kendala verifikasi khusus</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-700 shrink-0" />
                </a>
              </div>

              {/* Admin Guarantee Box */}
              <div className="bg-slate-50 border-2 border-slate-300 rounded-xl p-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-[11px] font-bold text-slate-600">
                  Admin tidak pernah meminta password email kamu.
                </span>
              </div>

              {/* Close Button */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-900 font-extrabold text-xs py-2 px-5 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] transition-all"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
