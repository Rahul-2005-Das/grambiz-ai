import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { StatCard } from '../components/StatCard';
import { api } from '../services/api';
import { formatINR } from '../services/financialService';
import {
  Lightbulb,
  TrendingUp,
  Wallet,
  ShoppingBag,
  Bot,
  FileText,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Volume2
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { language, t, speak } = useLanguage();
  const { user } = useAuth();

  const [summary, setSummary] = useState({
    todaySales: 1380,
    todayExpenses: 380,
    estimatedProfit: 1000,
    pendingPayments: 350
  });

  const [quickAddModal, setQuickAddModal] = useState<'sale' | 'expense' | null>(null);
  const [itemName, setItemName] = useState('');
  const [itemAmount, setItemAmount] = useState('');

  useEffect(() => {
    // Fetch live summary from server
    api.getFinanceRecords().then((res) => {
      if (res && res.summary) {
        setSummary({
          todaySales: res.summary.totalSales || 1380,
          todayExpenses: res.summary.totalExpenses || 380,
          estimatedProfit: (res.summary.totalSales || 1380) - (res.summary.totalExpenses || 380),
          pendingPayments: res.summary.pendingCredit || 350
        });
      }
    });
  }, []);

  const handleSaveQuickRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    const amt = Number(itemAmount);
    if (!itemName || !amt) return;

    if (quickAddModal === 'sale') {
      await api.addSale({ product: itemName, quantity: 1, amount: amt, isPaid: true });
      setSummary((prev) => ({
        ...prev,
        todaySales: prev.todaySales + amt,
        estimatedProfit: prev.estimatedProfit + amt
      }));
    } else {
      await api.addExpense({ category: 'other', amount: amt, notes: itemName });
      setSummary((prev) => ({
        ...prev,
        todayExpenses: prev.todayExpenses + amt,
        estimatedProfit: prev.estimatedProfit - amt
      }));
    }

    setItemName('');
    setItemAmount('');
    setQuickAddModal(null);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (language === 'bn') {
      if (hour < 12) return 'সুপ্রভাত';
      if (hour < 17) return 'শুভ দুপুর';
      return 'শুভ সন্ধ্যা';
    }
    if (language === 'hi') {
      if (hour < 12) return 'सुप्रभात';
      if (hour < 17) return 'शुभ दोपहर';
      return 'शुभ संध्या';
    }
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* 1. Header: Greeting & What do you want help with? */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-md mb-2">
            <span>📍 {user.villageOrTown || 'Rural Center'}, {user.district}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            {getGreeting()}, {user.name}
          </h1>
          <p className="mt-1 text-sm text-stone-600 font-medium">
            {t.dashboard.welcomeHelper}
          </p>
        </div>

        {/* Quick action buttons for sales & expenses */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={() => setQuickAddModal('sale')}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-1.5 shadow-xs active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>{t.dashboard.addSaleQuick}</span>
          </button>
          <button
            onClick={() => setQuickAddModal('expense')}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-stone-100 text-stone-800 text-xs font-bold hover:bg-stone-200 border border-stone-200 transition-all flex items-center justify-center gap-1.5 shadow-2xs active:scale-95"
          >
            <Minus className="w-4 h-4" />
            <span>{t.dashboard.addExpenseQuick}</span>
          </button>
        </div>
      </div>

      {/* 2. Today's Financial Summary Cards */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
            {t.dashboard.summaryTitle}
          </h2>
          <span className="text-[11px] text-stone-400">
            {new Date().toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard
            title={t.dashboard.todaySales}
            value={formatINR(summary.todaySales)}
            variant="emerald"
            icon={TrendingUp}
            subtitle="+12% from weekly average"
            onClick={() => onNavigate('tracker')}
          />
          <StatCard
            title={t.dashboard.todayExpenses}
            value={formatINR(summary.todayExpenses)}
            variant="stone"
            icon={Wallet}
            subtitle="Within daily target budget"
            onClick={() => onNavigate('tracker')}
          />
          <StatCard
            title={t.dashboard.estimatedProfit}
            value={formatINR(summary.estimatedProfit)}
            variant="teal"
            icon={Sparkles}
            subtitle="38% net operating margin"
            onClick={() => onNavigate('money')}
          />
          <StatCard
            title={t.dashboard.pendingPayments}
            value={formatINR(summary.pendingPayments)}
            variant="amber"
            icon={ShieldAlert}
            subtitle={language === 'bn' ? 'তাগাদা দিন' : 'Follow up'}
            onClick={() => onNavigate('tracker')}
          />
        </div>
      </div>

      {/* Professional Business Performance Index Widget */}
      <div className="p-5 rounded-3xl bg-linear-to-r from-stone-900 via-stone-850 to-stone-900 text-white border border-stone-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-black text-2xl shrink-0">
            84
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">
                Business Performance Index (BPI)
              </h3>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                🟢 Healthy
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-1 max-w-xl">
              {language === 'bn'
                ? 'নিয়মিত বিক্রি, নিয়ন্ত্রিত খরচ ও সময়মতো বাকি আদায়ের কারণে আপনার ব্যবসার আর্থিক স্বাস্থ্য শক্তিশালী রয়েছে।'
                : 'Steady cash generation, controlled operational overheads, and disciplined credit collection keep your venture viable.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('advisor')}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 shrink-0 active:scale-95"
        >
          <Bot className="w-4 h-4" />
          <span>Consult AI Advisor</span>
        </button>
      </div>

      {/* 3. Six Large Primary Action Cards */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
            {language === 'bn' ? 'প্রধান দিকনির্দেশনা' : 'Core Actions'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1: Start a Business */}
          <button
            onClick={() => onNavigate('discover')}
            className="p-6 rounded-3xl bg-white border border-stone-200 hover:border-emerald-400 hover:shadow-md transition-all text-left group active:scale-[0.99] shadow-2xs"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-xl mb-4 group-hover:scale-105 transition-transform">
              💡
            </div>
            <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
              {t.dashboard.quickActionStart}
            </h3>
            <p className="mt-1 text-xs text-stone-600 leading-relaxed">
              {t.dashboard.quickActionStartDesc}
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-emerald-700">
              <span>{language === 'bn' ? 'খুঁজে দেখুন' : 'Explore'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 2: Grow My Business / Health Check */}
          <button
            onClick={() => onNavigate('health')}
            className="p-6 rounded-3xl bg-white border border-stone-200 hover:border-teal-400 hover:shadow-md transition-all text-left group active:scale-[0.99] shadow-2xs"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center text-xl mb-4 group-hover:scale-105 transition-transform">
              📈
            </div>
            <h3 className="text-base font-bold text-stone-900 group-hover:text-teal-800 transition-colors">
              {t.dashboard.quickActionGrow}
            </h3>
            <p className="mt-1 text-xs text-stone-600 leading-relaxed">
              {t.dashboard.quickActionGrowDesc}
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-teal-700">
              <span>{language === 'bn' ? 'অবস্থা পরীক্ষা' : 'Check Health'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 3: Plan My Money */}
          <button
            onClick={() => onNavigate('money')}
            className="p-6 rounded-3xl bg-white border border-stone-200 hover:border-blue-400 hover:shadow-md transition-all text-left group active:scale-[0.99] shadow-2xs"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center text-xl mb-4 group-hover:scale-105 transition-transform">
              💰
            </div>
            <h3 className="text-base font-bold text-stone-900 group-hover:text-blue-800 transition-colors">
              {t.dashboard.quickActionMoney}
            </h3>
            <p className="mt-1 text-xs text-stone-600 leading-relaxed">
              {t.dashboard.quickActionMoneyDesc}
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-blue-700">
              <span>{language === 'bn' ? 'টাকা সাজান' : 'Plan Budget'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 4: Understand Market */}
          <button
            onClick={() => onNavigate('market')}
            className="p-6 rounded-3xl bg-white border border-stone-200 hover:border-amber-400 hover:shadow-md transition-all text-left group active:scale-[0.99] shadow-2xs"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-xl mb-4 group-hover:scale-105 transition-transform">
              🛒
            </div>
            <h3 className="text-base font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
              {t.dashboard.quickActionMarket}
            </h3>
            <p className="mt-1 text-xs text-stone-600 leading-relaxed">
              {t.dashboard.quickActionMarketDesc}
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-amber-700">
              <span>{language === 'bn' ? 'বাজার দেখুন' : 'Explore Market'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 5: Ask AI Advisor */}
          <button
            onClick={() => onNavigate('advisor')}
            className="p-6 rounded-3xl bg-linear-to-br from-emerald-50 to-white border-2 border-emerald-300 hover:border-emerald-500 hover:shadow-md transition-all text-left group active:scale-[0.99] shadow-2xs"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-xl mb-4 group-hover:scale-105 transition-transform shadow-xs">
              🤖
            </div>
            <h3 className="text-base font-bold text-emerald-950 group-hover:text-emerald-800 transition-colors">
              {t.dashboard.quickActionAskAI}
            </h3>
            <p className="mt-1 text-xs text-stone-600 leading-relaxed">
              {t.dashboard.quickActionAskAIDesc}
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-emerald-700">
              <span>{language === 'bn' ? 'কথা বলুন' : 'Speak to AI'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 6: Make Business Plan */}
          <button
            onClick={() => onNavigate('plan')}
            className="p-6 rounded-3xl bg-white border border-stone-200 hover:border-purple-400 hover:shadow-md transition-all text-left group active:scale-[0.99] shadow-2xs"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center text-xl mb-4 group-hover:scale-105 transition-transform">
              📄
            </div>
            <h3 className="text-base font-bold text-stone-900 group-hover:text-purple-800 transition-colors">
              {t.dashboard.quickActionPlan}
            </h3>
            <p className="mt-1 text-xs text-stone-600 leading-relaxed">
              {t.dashboard.quickActionPlanDesc}
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-purple-700">
              <span>{language === 'bn' ? 'তৈরি করুন' : 'Generate'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>

      {/* 4. AI Business Tip of the Day */}
      <div className="p-5 rounded-3xl bg-linear-to-r from-emerald-800 to-emerald-900 text-white flex items-start gap-4 shadow-sm">
        <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
          <Sparkles className="w-5 h-5 text-emerald-200" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              {t.dashboard.tipOfDayTitle}
            </h4>
            <button
              onClick={() => speak(t.dashboard.tipOfDayBody)}
              className="text-emerald-200 hover:text-white p-1 rounded-md"
              title="Listen"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
          <p className="mt-1.5 text-xs sm:text-sm text-emerald-50 leading-relaxed">
            {t.dashboard.tipOfDayBody}
          </p>
        </div>
      </div>

      {/* Quick Add Modal */}
      {quickAddModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-xl border border-stone-200">
            <h3 className="text-base font-bold text-stone-900 mb-4">
              {quickAddModal === 'sale' ? t.dashboard.addSaleQuick : t.dashboard.addExpenseQuick}
            </h3>
            <form onSubmit={handleSaveQuickRecord} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">
                  {quickAddModal === 'sale' ? t.tracker.productName : t.tracker.notes}
                </label>
                <input
                  type="text"
                  required
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder={quickAddModal === 'sale' ? 'e.g. 5L Milk, Spices' : 'e.g. Travel, Tea, Bag'}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">
                  {t.tracker.amount}
                </label>
                <input
                  type="number"
                  required
                  value={itemAmount}
                  onChange={(e) => setItemAmount(e.target.value)}
                  placeholder="₹ 150"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-sm font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setQuickAddModal(null)}
                  className="flex-1 py-2.5 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow-sm"
                >
                  {t.tracker.saveRecord}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
