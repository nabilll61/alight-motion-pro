import React, { useState, useEffect } from 'react';
import { Users, Calendar, Sparkles, ShieldCheck, Database } from 'lucide-react';

export const LiveStatsCard: React.FC = () => {
  const [todayCount, setTodayCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      if (res.ok) {
        const data = await res.json();
        setTodayCount(data.todayCount);
        setTotalCount(data.totalCount);
      }
    } catch {
      // fallback
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-3 max-w-2xl mx-auto w-full my-2.5 select-none">
      <div className="bg-[#fef08a] border-[2px] border-slate-900 rounded-[18px] p-3 shadow-[3px_3px_0px_#0f172a] text-slate-900">
        {/* Card Header */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white border-[1.5px] border-slate-900 flex items-center justify-center text-slate-900 shadow-[1px_1px_0px_#0f172a]">
              <Users className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-black text-[11px] sm:text-xs tracking-tight text-slate-900 uppercase">
                STATISTIK VERIFIKASI REAL
              </h3>
              <p className="text-[9.5px] font-bold text-slate-700">Live Real-Time Database</p>
            </div>
          </div>

          <div className="bg-[#6ee7b7] text-slate-950 text-[9.5px] font-black px-2 py-0.5 rounded-full border-[1.5px] border-slate-900 flex items-center gap-1 shadow-[1px_1px_0px_#0f172a]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 animate-pulse"></span>
            <span>LIVE</span>
          </div>
        </div>

        {/* 2 Inner Stat Cards */}
        <div className="grid grid-cols-2 gap-2 mb-2.5">
          {/* Stat 1: Hari Ini */}
          <div className="bg-white border-[1.5px] border-slate-900 rounded-[14px] p-2.5 shadow-[2px_2px_0px_#0f172a] flex flex-col justify-between">
            <div className="flex items-center gap-1 text-blue-600 mb-0.5">
              <Calendar className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="font-extrabold text-[9px] uppercase text-slate-800">HARI INI</span>
            </div>
            <div className="text-2xl font-black text-slate-900 tracking-tight font-mono">
              {todayCount}
            </div>
            <p className="text-[9px] font-bold text-slate-500 mt-0.5">
              {todayCount} Terverifikasi
            </p>
          </div>

          {/* Stat 2: Total Sukses */}
          <div className="bg-[#93c5fd] border-[1.5px] border-slate-900 rounded-[14px] p-2.5 shadow-[2px_2px_0px_#0f172a] flex flex-col justify-between">
            <div className="flex items-center gap-1 text-pink-600 mb-0.5">
              <Sparkles className="w-3.5 h-3.5 fill-pink-500 stroke-[2.5]" />
              <span className="font-extrabold text-[9px] uppercase text-slate-900">TOTAL SUKSES</span>
            </div>
            <div className="text-2xl font-black text-slate-900 tracking-tight font-mono">
              {totalCount >= 1000 ? `${(totalCount / 1000).toFixed(1)}K` : totalCount}
            </div>
            <p className="text-[9px] font-bold text-slate-800 mt-0.5">
              {totalCount.toLocaleString('id-ID')} Akun Pro
            </p>
          </div>
        </div>

        {/* Bottom Footer Info Line */}
        <div className="flex items-center justify-between text-[11px] font-extrabold pt-0.5">
          <div className="flex items-center gap-1 text-slate-900">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 stroke-[2.5]" />
            <span className="text-[10px] font-extrabold">Terverifikasi Otomatis</span>
          </div>

          <div className="bg-white text-slate-800 text-[9px] font-mono font-bold px-2 py-0.5 rounded-lg border border-slate-900 flex items-center gap-1 shadow-[1px_1px_0px_#0f172a]">
            <Database className="w-3 h-3 text-emerald-600" />
            <span>mongodb</span>
          </div>
        </div>
      </div>
    </div>
  );
};
