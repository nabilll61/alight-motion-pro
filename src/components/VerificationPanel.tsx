import React, { useState, useEffect } from 'react';
import { Mail, Link2, CheckCircle2, ArrowRight, Loader2, RefreshCw, Copy, ExternalLink, ShieldCheck, Clock, Key, Video, Award, Layers, Calendar, Sparkles, X, Check } from 'lucide-react';
import { VerificationRecord } from '../types';

interface VerificationPanelProps {
  onSuccess: (record: VerificationRecord) => void;
}

export const VerificationPanel: React.FC<VerificationPanelProps> = ({ onSuccess }) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');
  const [oobLink, setOobLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successRecord, setSuccessRecord] = useState<VerificationRecord | null>(null);

  // Timer for Step 2
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes = 180s
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Step 1: Send OOB Link Request
  const handleSendOob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Masukkan alamat email yang valid.');
      return;
    }

    setErrorMsg('');
    setIsLoading(true);
    setLoadingText('Sistem sedang menginstruksikan server Alight Creative...');

    try {
      const res = await fetch('/api/oob/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Gagal memproses permintaan OOB');
      }

      setIsLoading(false);
      setCurrentStep(2);
      setTimeLeft(data.expiresInSeconds || 180);
      setTimerActive(true);
    } catch (err: any) {
      setIsLoading(false);
      setErrorMsg(err.message || 'Terjadi kesalahan server.');
    }
  };

  // Step 2: Verify OOB Link Token
  const handleVerifyOob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oobLink || oobLink.length < 5) {
      setErrorMsg('Masukkan link OOB atau token autentikasi yang valid dari email kamu.');
      return;
    }

    setErrorMsg('');
    setIsLoading(true);
    setLoadingText('Memverifikasi token OOB dengan Firebase Auth Server...');

    try {
      const res = await fetch('/api/oob/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, oobLink })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Verifikasi Token OOB Gagal.');
      }

      setIsLoading(false);
      setSuccessRecord(data.record);
      setCurrentStep(3);
      onSuccess(data.record);
    } catch (err: any) {
      setIsLoading(false);
      setErrorMsg(err.message || 'Gagal memverifikasi token OOB.');
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setEmail('');
    setOobLink('');
    setErrorMsg('');
    setSuccessRecord(null);
  };

  const copyLicense = () => {
    if (successRecord) {
      navigator.clipboard.writeText(
        `SERTIFIKAT ALIGHTPRO VERIFICATION\nEmail: ${successRecord.email}\nStatus: PRO 1 TAHUN (ACTIVE)\nID Lisensi: ${successRecord.id}\nTanggal: ${successRecord.timestamp}\nKadaluarsa: ${successRecord.expiresAt}`
      );
      alert('Sertifikat Verifikasi berhasil disalin!');
    }
  };

  return (
    <section id="verification-panel" className="px-3 max-w-2xl mx-auto w-full my-4 select-none">
      <div className="bg-white border-[2.5px] border-slate-900 rounded-[22px] p-4 sm:p-5 shadow-[4px_4px_0px_#0f172a]">
        {/* Panel Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444] border border-slate-900 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#eab308] border border-slate-900 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] border border-slate-900 inline-block"></span>
          </div>
          <span className="text-xs sm:text-[13px] font-black tracking-wider uppercase ml-1.5 text-slate-900">
            PANEL VERIFIKASI PRO
          </span>
        </div>

        {/* Header Line Divider */}
        <div className="h-[1.5px] bg-slate-900 w-full mb-4" />

        {/* Step Navigation Tabs */}
        <div className="bg-[#f0f4f8] border-[1.5px] border-slate-900 rounded-[16px] p-1 mb-5">
          <div className="grid grid-cols-3 gap-1">
            <button
              onClick={() => currentStep > 1 && setCurrentStep(1)}
              className={`py-1.5 px-1 text-xs font-extrabold transition-all flex items-center justify-center gap-1 ${
                currentStep === 1
                  ? 'bg-[#93c5fd] border-[1.5px] border-slate-900 text-slate-900 rounded-[12px] shadow-[2px_2px_0px_#0f172a]'
                  : 'bg-transparent text-slate-500 font-bold hover:text-slate-900'
              }`}
            >
              <span>1. Email</span>
            </button>

            <button
              onClick={() => currentStep > 2 && setCurrentStep(2)}
              disabled={currentStep < 2}
              className={`py-1.5 px-1 text-xs font-extrabold transition-all flex items-center justify-center gap-1 ${
                currentStep === 2
                  ? 'bg-[#93c5fd] border-[1.5px] border-slate-900 text-slate-900 rounded-[12px] shadow-[2px_2px_0px_#0f172a]'
                  : 'bg-transparent text-slate-400 font-bold disabled:opacity-50'
              }`}
            >
              <span>2. Tempel OOB</span>
            </button>

            <button
              disabled={currentStep < 3}
              className={`py-1.5 px-1 text-xs font-extrabold transition-all flex items-center justify-center gap-1 ${
                currentStep === 3
                  ? 'bg-[#6ee7b7] border-[1.5px] border-slate-900 text-slate-900 rounded-[12px] shadow-[2px_2px_0px_#0f172a]'
                  : 'bg-transparent text-slate-400 font-bold disabled:opacity-50'
              }`}
            >
              <span>3. Hasil Pro</span>
            </button>
          </div>
        </div>

        {/* Panel Content Body */}
        <div>
          {errorMsg && (
            <div className="mb-3.5 bg-red-100 border-[1.5px] border-slate-900 text-red-900 p-2.5 rounded-xl font-bold text-xs shadow-[1.5px_1.5px_0px_#0f172a]">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* STEP 1 FORM */}
          {currentStep === 1 && (
            <form onSubmit={handleSendOob} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase text-slate-900 tracking-wider mb-2">
                  ALAMAT EMAIL ALIGHT CREATIVE
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4 text-slate-600" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contoh: emailkamu@gmail.com"
                    className="w-full bg-[#f8fafc] border-[1.5px] border-slate-900 text-slate-900 text-xs sm:text-sm rounded-[12px] pl-9 pr-3 py-2.5 font-semibold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <p className="mt-2 text-[11px] sm:text-[11.5px] font-semibold text-slate-500 leading-normal">
                  Sistem akan menginstruksikan server Alight Creative untuk mengirimkan link login OOB.
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#93c5fd] hover:bg-blue-400 text-slate-900 font-extrabold text-xs sm:text-sm py-2.5 px-4 rounded-[12px] border-[1.5px] border-slate-900 shadow-[2.5px_2.5px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-900" />
                    <span>{loadingText}</span>
                  </>
                ) : (
                  <>
                    <span>Kirim Link OOB (Langkah 1)</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* STEP 2 FORM */}
          {currentStep === 2 && (
            <form onSubmit={handleVerifyOob} className="space-y-4">
              <div className="bg-blue-50 border-2 border-slate-900 rounded-xl p-3 flex items-center justify-between shadow-[2px_2px_0px_#0f172a]">
                <div>
                  <span className="text-[10px] font-black uppercase text-slate-500">Email Target:</span>
                  <p className="font-extrabold text-xs text-slate-900">{email}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-xs text-blue-700 font-extrabold underline hover:text-blue-900"
                >
                  Ubah
                </button>
              </div>

              {/* Countdown Timer */}
              <div className="bg-yellow-100 border-2 border-slate-900 rounded-xl p-3 flex items-center justify-between shadow-[2px_2px_0px_#0f172a]">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-700 stroke-[2.5]" />
                  <span className="text-xs font-extrabold text-slate-900">Masa Aktif Token Link:</span>
                </div>
                <span className="font-black text-sm text-slate-900 font-mono bg-white px-2 py-0.5 rounded border border-slate-900">
                  {formatTime(timeLeft)}
                </span>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-slate-900 tracking-wider mb-2">
                  TEMPEL LINK LOGIN OOB DARI EMAIL
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Link2 className="w-5 h-5 text-slate-700" />
                  </div>
                  <input
                    type="text"
                    required
                    value={oobLink}
                    onChange={(e) => setOobLink(e.target.value)}
                    placeholder="https://alightcreative.page.link/..."
                    className="w-full bg-slate-50 border-2 border-slate-900 text-slate-900 text-sm rounded-xl pl-11 pr-4 py-3 font-semibold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-[2px_2px_0px_#0f172a]"
                  />
                </div>
                <p className="mt-2 text-[11px] font-semibold text-slate-500 leading-normal">
                  Salin link login dari email Alight Creative lalu tempelkan di sini.
                </p>
              </div>

              <div className="flex flex-col gap-2 pt-1">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-300 hover:bg-blue-400 text-slate-900 font-extrabold text-sm py-3.5 px-4 rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-slate-900" />
                      <span>{loadingText}</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-slate-900 stroke-[2.5]" />
                      <span>Verifikasi Token OOB (Langkah 2)</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setTimeLeft(180);
                    setTimerActive(true);
                    alert('Permintaan kirim ulang link OOB diproses!');
                  }}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs py-2.5 px-3 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Isi Ulang / Kirim Ulang Link OOB</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 3 SUCCESS RESULT */}
          {currentStep === 3 && successRecord && (
            <div className="relative bg-white border-[2.5px] border-slate-900 rounded-[28px] p-5 sm:p-6 shadow-[5px_5px_0px_#0f172a] space-y-4 animate-in fade-in zoom-in-95 duration-300">
              
              {/* Close Button Top Right */}
              <button
                type="button"
                onClick={handleReset}
                className="absolute top-4 right-4 bg-white hover:bg-slate-100 text-slate-900 border-[2px] border-slate-900 rounded-xl p-1.5 transition-all shadow-[1.5px_1.5px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5"
                title="Tutup / Reset"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>

              {/* Top Header Badge & Checkmark Icon */}
              <div className="flex flex-col items-center justify-center pt-2">
                {/* PRO ACTIVE Badge */}
                <div className="bg-[#fef08a] border-[1.5px] border-slate-900 rounded-full px-3 py-0.5 text-[11px] font-black uppercase text-slate-900 flex items-center gap-1.5 shadow-[1.5px_1.5px_0px_#0f172a] z-10">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                  <span>PRO ACTIVE</span>
                </div>

                {/* Double Ring Green Checkmark Circle */}
                <div className="relative mt-[-8px]">
                  <div className="w-16 h-16 rounded-full bg-[#86efac] border-[2.5px] border-slate-900 flex items-center justify-center p-1.5 shadow-[2px_2px_0px_#0f172a]">
                    <div className="w-full h-full rounded-full bg-[#22c55e] border-[1.5px] border-slate-900 flex items-center justify-center text-slate-900">
                      <Check className="w-8 h-8 stroke-[3.5] text-slate-900" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Headline & Subtitle */}
              <div className="text-center space-y-1">
                <h3 className="font-black text-xl sm:text-2xl text-slate-900 tracking-tight flex items-center justify-center gap-1.5">
                  <span>Verifikasi Berhasil!</span>
                  <span className="text-2xl">🎉</span>
                </h3>
                <p className="text-xs sm:text-[13px] font-bold text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Selamat! Akun Alight Motion kamu resmi aktif versi Pro 1 Tahun.
                </p>
              </div>

              {/* 3 Feature Pills Row */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-[#dbeafe] border-[1.5px] border-slate-900 rounded-[18px] p-2.5 sm:p-3 flex flex-col items-center text-center gap-1 shadow-[2px_2px_0px_#0f172a]">
                  <Video className="w-5 h-5 text-slate-900 stroke-[2.25]" />
                  <span className="font-black text-[11px] sm:text-xs text-slate-900 leading-tight">
                    No Watermark
                  </span>
                </div>

                <div className="bg-[#dcfce7] border-[1.5px] border-slate-900 rounded-[18px] p-2.5 sm:p-3 flex flex-col items-center text-center gap-1 shadow-[2px_2px_0px_#0f172a]">
                  <Award className="w-5 h-5 text-slate-900 stroke-[2.25]" />
                  <span className="font-black text-[11px] sm:text-xs text-slate-900 leading-tight">
                    1 Tahun Full
                  </span>
                </div>

                <div className="bg-[#fef9c3] border-[1.5px] border-slate-900 rounded-[18px] p-2.5 sm:p-3 flex flex-col items-center text-center gap-1 shadow-[2px_2px_0px_#0f172a]">
                  <Layers className="w-5 h-5 text-slate-900 stroke-[2.25]" />
                  <span className="font-black text-[11px] sm:text-xs text-slate-900 leading-tight">
                    Full XML Preset
                  </span>
                </div>
              </div>

              {/* Details Box */}
              <div className="bg-white border-[1.5px] border-slate-900 rounded-[20px] p-4 space-y-3 text-xs shadow-[2px_2px_0px_#0f172a]">
                <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
                  <span className="font-bold text-slate-500 text-[11.5px]">Email Terdaftar:</span>
                  <span className="font-extrabold text-slate-900 truncate max-w-[180px] sm:max-w-[220px]">
                    {successRecord.email}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
                  <span className="font-bold text-slate-500 text-[11.5px]">Masa Berlaku Lisensi:</span>
                  <div className="flex items-center gap-1.5 font-extrabold text-slate-900">
                    <Calendar className="w-3.5 h-3.5 text-blue-600 stroke-[2.5]" />
                    <span>{successRecord.expiresAt}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
                  <span className="font-bold text-slate-500 text-[11.5px]">Status Akun:</span>
                  <span className="bg-[#86efac] text-slate-950 font-black text-[10.5px] tracking-wide px-2.5 py-0.5 rounded-full border border-slate-900 uppercase shadow-[1px_1px_0px_#0f172a]">
                    LINKED & VERIFIED
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-slate-500 text-[11.5px]">Auto Renewal:</span>
                  <div className="flex items-center gap-1 font-extrabold text-[#16a34a]">
                    <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                    <span>Aktif</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-1">
                <button
                  type="button"
                  onClick={copyLicense}
                  className="w-full bg-[#fef08a] hover:bg-yellow-300 text-slate-900 font-extrabold text-xs sm:text-sm py-3 px-4 rounded-[14px] border-[2px] border-slate-900 shadow-[3px_3px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <Copy className="w-4 h-4 stroke-[2.5]" />
                  <span>Salin Bukti Verifikasi</span>
                </button>

                <a
                  href="https://alightmotion.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#93c5fd] hover:bg-blue-400 text-slate-900 font-extrabold text-xs sm:text-sm py-3 px-4 rounded-[14px] border-[2px] border-slate-900 shadow-[3px_3px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <span>Mulai Gunakan Alight Motion Pro</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
