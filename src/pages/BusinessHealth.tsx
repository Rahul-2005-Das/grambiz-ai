import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { formatINR } from '../services/financialService';
import { BusinessHealthAssessment } from '../types';
import {
  Activity,
  CheckCircle,
  AlertTriangle,
  AlertOctagon,
  Sparkles,
  RefreshCw,
  ArrowRight,
  ShieldCheck,
  Volume2
} from 'lucide-react';

export const BusinessHealth: React.FC = () => {
  const { language, t, speak } = useLanguage();
  const { user } = useAuth();

  // Inputs
  const [sales, setSales] = useState<number>(26000);
  const [expenses, setExpenses] = useState<number>(17000);
  const [customers, setCustomers] = useState<number>(45);
  const [stockCondition, setStockCondition] = useState<string>('stockSlow');
  const [pendingCredit, setPendingCredit] = useState<number>(3200);

  const [loading, setLoading] = useState(false);
  const [assessment, setAssessment] = useState<BusinessHealthAssessment | null>({
    status: 'doing_well',
    score: 82,
    headline: language === 'bn' ? 'ব্যবসা ভালো চলছে (সুস্থ)' : 'Doing Well (Healthy)',
    monthlySales: 26000,
    monthlyExpenses: 17000,
    netMarginPercent: 35,
    threeActions: language === 'bn' ? [
      'যাদের কাছে ₹৫০০-র বেশি বাকি আছে, তাদের সাথে হাসিমুখে দেখা করে অন্তত অর্ধেক টাকা আজই তুলুন।',
      'যে মাল ১ মাস ধরে বিক্রি হয়নি, সেগুলোর দাম ৫% কমিয়ে নগদ টাকা দ্রুত মুক্ত করুন।',
      'চলতি সপ্তাহের সমস্ত ছোটখাটো অপচয় বন্ধ করে নগদ অর্থ সুরক্ষিত রাখুন।'
    ] : [
      'Collect Overdue Credit: Politely remind top 3 customers owing money to pay at least 50% cash today.',
      'Clear Slow Stock: Bundle items sitting longer than 30 days with fast sellers to recover working cash.',
      'Cash Reserve: Put 10% of today\'s total earnings straight into your emergency safety envelope.'
    ]
  });

  const handleEvaluate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.checkBusinessHealth({
        sales,
        expenses,
        customers,
        stockCondition,
        pendingCredit,
        language
      });
      if (res) {
        setAssessment(res);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReadAloud = () => {
    if (!assessment) return;
    const text = `Business health assessment. Status: ${assessment.status}. Monthly sales: ${formatINR(assessment.monthlySales)}. Monthly expenses: ${formatINR(assessment.monthlyExpenses)}. Three actions you can do now: ${assessment.threeActions.join('. ')}.`;
    speak(text);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 font-sans">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold mb-3">
            <Activity className="w-3.5 h-3.5 text-rose-600" />
            <span>{language === 'bn' ? 'সহজ স্বাস্থ্য পরীক্ষা' : '2-Minute Business Checkup'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            {t.health.title}
          </h1>
          <p className="mt-1 text-sm text-stone-600 max-w-xl">
            {t.health.subtitle}
          </p>
        </div>

        <button
          onClick={handleReadAloud}
          className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center gap-2 border border-stone-300 transition-all shrink-0 active:scale-95"
        >
          <Volume2 className="w-4 h-4 text-emerald-700" />
          <span>{t.advisor.listenToAnswer}</span>
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleEvaluate} className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              {t.health.qSales}
            </label>
            <input
              type="number"
              value={sales}
              onChange={(e) => setSales(Number(e.target.value) || 0)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-sm font-bold text-stone-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              {t.health.qExpenses}
            </label>
            <input
              type="number"
              value={expenses}
              onChange={(e) => setExpenses(Number(e.target.value) || 0)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-sm font-bold text-stone-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              {t.health.qCustomers}
            </label>
            <input
              type="number"
              value={customers}
              onChange={(e) => setCustomers(Number(e.target.value) || 0)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-sm font-bold text-stone-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              {t.health.qCredit}
            </label>
            <input
              type="number"
              value={pendingCredit}
              onChange={(e) => setPendingCredit(Number(e.target.value) || 0)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-sm font-bold text-stone-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Stock condition radio pills */}
        <div>
          <label className="block text-xs font-bold text-stone-800 mb-2">
            {t.health.qStock}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => setStockCondition('stockGood')}
              className={`p-3.5 rounded-2xl border text-xs font-bold text-left transition-all ${
                stockCondition === 'stockGood'
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-2xs'
                  : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-emerald-300'
              }`}
            >
              🟢 {t.health.stockGood}
            </button>
            <button
              type="button"
              onClick={() => setStockCondition('stockSlow')}
              className={`p-3.5 rounded-2xl border text-xs font-bold text-left transition-all ${
                stockCondition === 'stockSlow'
                  ? 'border-amber-500 bg-amber-50 text-amber-950 shadow-2xs'
                  : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-amber-300'
              }`}
            >
              🟡 {t.health.stockSlow}
            </button>
            <button
              type="button"
              onClick={() => setStockCondition('stockOld')}
              className={`p-3.5 rounded-2xl border text-xs font-bold text-left transition-all ${
                stockCondition === 'stockOld'
                  ? 'border-rose-600 bg-rose-50 text-rose-950 shadow-2xs'
                  : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-rose-300'
              }`}
            >
              🔴 {t.health.stockOld}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-2xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>{t.health.evaluateBtn}</span>
            </>
          )}
        </button>
      </form>

      {/* Assessment Result Card */}
      {assessment && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          {/* Status Badge Headline */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
            <div>
              <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest block mb-1">
                Health Status
              </span>
              <div className="text-xl sm:text-2xl font-black flex items-center gap-2">
                {assessment.status === 'doing_well' ? (
                  <span className="text-emerald-700 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6" />
                    <span>{t.health.doingWell}</span>
                  </span>
                ) : assessment.status === 'needs_attention' ? (
                  <span className="text-amber-700 flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6" />
                    <span>{t.health.needsAttention}</span>
                  </span>
                ) : (
                  <span className="text-rose-700 flex items-center gap-2">
                    <AlertOctagon className="w-6 h-6" />
                    <span>{t.health.needsAction}</span>
                  </span>
                )}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 text-right">
              <span className="text-[10px] text-stone-400 font-bold uppercase block">Health Score</span>
              <span className="text-2xl font-black text-stone-900 tabular-nums">
                {assessment.score}/100
              </span>
            </div>
          </div>

          {/* 3 Things You Can Do Now */}
          <div>
            <h3 className="text-sm font-bold text-stone-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>{t.health.threeActionsTitle}</span>
            </h3>

            <div className="space-y-3">
              {assessment.threeActions.map((act, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/70 flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
                    {act}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Metric Recap Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-stone-50 border border-stone-200/80 text-xs">
            <div>
              <span className="text-stone-500 block">Monthly Sales</span>
              <span className="font-bold text-stone-900 tabular-nums">{formatINR(assessment.monthlySales)}</span>
            </div>
            <div>
              <span className="text-stone-500 block">Monthly Expenses</span>
              <span className="font-bold text-stone-900 tabular-nums">{formatINR(assessment.monthlyExpenses)}</span>
            </div>
            <div>
              <span className="text-stone-500 block">Net Profit</span>
              <span className="font-bold text-emerald-700 tabular-nums">
                {formatINR(assessment.monthlySales - assessment.monthlyExpenses)}
              </span>
            </div>
            <div>
              <span className="text-stone-500 block">Pending Credit</span>
              <span className="font-bold text-amber-800 tabular-nums">{formatINR(pendingCredit)}</span>
            </div>
          </div>

          {/* Important legal / disclaimer */}
          <div className="p-3.5 rounded-2xl bg-stone-100 text-[11px] text-stone-500 leading-relaxed text-center">
            ℹ️ {t.health.disclaimer}
          </div>
        </div>
      )}
    </div>
  );
};
