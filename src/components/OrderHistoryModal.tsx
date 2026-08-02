import React from 'react';
import { History, X, CheckCircle2, Copy, Trash2 } from 'lucide-react';
import { VerificationRecord } from '../types';

interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: VerificationRecord[];
  onClear: () => void;
}

export const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({
  isOpen,
  onClose,
  orders,
  onClear
}) => {
  if (!isOpen) return null;

  const copyOrder = (order: VerificationRecord) => {
    navigator.clipboard.writeText(
      `ALIGHTPRO LICENSE RECORD\nEmail: ${order.email}\nStatus: PRO 1 TAHUN (${order.status})\nID Lisensi: ${order.id}\nTanggal: ${order.timestamp}\nExpired: ${order.expiresAt}`
    );
    alert('Detail lisensi berhasil disalin ke clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white border-2 border-slate-900 rounded-3xl max-w-lg w-full shadow-[6px_6px_0px_#0f172a] overflow-hidden select-none animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-yellow-200 p-4 border-b-2 border-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white border-2 border-slate-900 flex items-center justify-center text-slate-900 shadow-[2px_2px_0px_#0f172a]">
              <History className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-black text-base text-slate-900 tracking-tight">
                Riwayat Order & Aktivasi
              </h3>
              <p className="text-[11px] font-bold text-slate-700">Daftar lisensi terverifikasi</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white border-2 border-slate-900 flex items-center justify-center text-slate-900 hover:bg-slate-100 shadow-[1px_1px_0px_#0f172a]"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 md:p-5 max-h-[60vh] overflow-y-auto space-y-3">
          {orders.length === 0 ? (
            <div className="text-center py-8 space-y-2">
              <div className="w-12 h-12 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center mx-auto text-slate-400">
                <History className="w-6 h-6" />
              </div>
              <p className="font-bold text-xs text-slate-500">Belum ada riwayat aktivasi akun.</p>
              <p className="text-[11px] text-slate-400">Silakan lakukan verifikasi melalui formulir utama.</p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-slate-50 border-2 border-slate-900 rounded-2xl p-3.5 shadow-[3px_3px_0px_#0f172a] space-y-2"
              >
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                    <span className="font-extrabold text-xs text-slate-900 truncate max-w-[180px]">
                      {order.email}
                    </span>
                  </div>
                  <span className="bg-emerald-300 text-slate-950 font-extrabold text-[10px] px-2 py-0.5 rounded-full border border-slate-900">
                    AKTIF (1 TH)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-400 font-bold block text-[9px] uppercase">ID Lisensi</span>
                    <span className="font-mono font-extrabold text-slate-900">{order.id}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block text-[9px] uppercase">Tgl Verifikasi</span>
                    <span className="font-bold text-slate-800">{order.timestamp}</span>
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => copyOrder(order)}
                    className="bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-[11px] px-2.5 py-1 rounded-lg border border-slate-900 flex items-center gap-1 shadow-[1px_1px_0px_#0f172a]"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Salin Info</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t-2 border-slate-900 bg-slate-50 flex items-center justify-between">
          {orders.length > 0 && (
            <button
              onClick={onClear}
              className="text-red-600 hover:text-red-800 font-extrabold text-xs flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Hapus Riwayat</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs py-2 px-5 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] ml-auto"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
