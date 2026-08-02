import React, { useState, useEffect } from 'react';
import { CheckCircle2, X, Sparkles } from 'lucide-react';
import { INITIAL_ACTIVITY_LOGS } from '../data/contentData';

export const LiveNotificationToast: React.FC = () => {
  const [logs, setLogs] = useState(INITIAL_ACTIVITY_LOGS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/logs');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setLogs(data);
        }
      }
    } catch {
      // fallback
    }
  };

  useEffect(() => {
    fetchLogs();
    const timer = setInterval(() => {
      fetchLogs();
      if (logs.length > 0) {
        setIsVisible(false);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % logs.length);
          setIsVisible(true);
        }, 600);
      }
    }, 8000);

    return () => clearInterval(timer);
  }, [logs.length]);

  if (!isVisible || logs.length === 0) return null;

  const currentLog = logs[currentIndex] || logs[0];
  if (!currentLog) return null;

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-[320px] w-full animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-white border-2 border-slate-900 rounded-2xl p-2.5 shadow-[4px_4px_0px_#0f172a] flex items-center justify-between gap-2 text-slate-900">
        <div className="flex items-center gap-2.5 overflow-hidden">
          {/* Green Check Icon Circle */}
          <div className="w-9 h-9 rounded-xl bg-emerald-100 border-2 border-slate-900 flex items-center justify-center text-emerald-600 shrink-0 shadow-[1px_1px_0px_#0f172a]">
            <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
          </div>

          <div className="overflow-hidden">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xs text-slate-900 truncate max-w-[140px]">
                {currentLog.emailMasked}
              </span>
              <span className="text-[10px] font-bold text-slate-500 whitespace-nowrap">
                {currentLog.timeAgo}
              </span>
            </div>

            <p className="text-[11px] font-extrabold text-emerald-700 flex items-center gap-1 truncate mt-0.5">
              <Sparkles className="w-3 h-3 fill-pink-400 text-pink-500 shrink-0" />
              <span>{currentLog.statusText}</span>
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="w-6 h-6 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center shrink-0 transition-colors"
          aria-label="Tutup Notifikasi"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
