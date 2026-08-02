import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { InstructionCard } from './components/InstructionCard';
import { VerificationPanel } from './components/VerificationPanel';
import { LiveStatsCard } from './components/LiveStatsCard';
import { FeatureListSection } from './components/FeatureListSection';
import { FaqSection } from './components/FaqSection';
import { FooterSection } from './components/FooterSection';
import { LiveNotificationToast } from './components/LiveNotificationToast';
import { SupportModal } from './components/SupportModal';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { VerificationRecord } from './types';

export default function App() {
  const [orders, setOrders] = useState<VerificationRecord[]>(() => {
    try {
      const saved = localStorage.getItem('alightpro_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('alightpro_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAddOrder = (newRecord: VerificationRecord) => {
    setOrders((prev) => [newRecord, ...prev]);
  };

  const handleClearOrders = () => {
    if (confirm('Apakah kamu yakin ingin menghapus seluruh riwayat aktivasi?')) {
      setOrders([]);
      localStorage.removeItem('alightpro_orders');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 pb-12 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Sticky Header */}
      <Navbar
        onNavigate={handleNavigate}
        onOpenHistory={() => setIsHistoryOpen(true)}
        activeOrderCount={orders.length}
      />

      {/* Main Container */}
      <main className="space-y-2">
        {/* Hero Section */}
        <HeroSection />

        {/* How to Get OOB Link Instructions */}
        <InstructionCard />

        {/* 3-Step OOB Verification Panel */}
        <VerificationPanel onSuccess={handleAddOrder} />

        {/* Real-time Verification Statistics */}
        <LiveStatsCard />

        {/* Pro Features Breakdown */}
        <FeatureListSection />

        {/* FAQ Accordions */}
        <FaqSection />
      </main>

      {/* Footer */}
      <FooterSection onNavigate={handleNavigate} />

      {/* Floating Real-time Activation Toast */}
      <LiveNotificationToast />

      {/* Floating Support Modal */}
      <SupportModal />

      {/* Order History Modal */}
      <OrderHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        orders={orders}
        onClear={handleClearOrders}
      />
    </div>
  );
}
