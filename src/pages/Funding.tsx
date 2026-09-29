import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { calculateLoanEMI, formatINR } from '../services/financialService';
import {
  Coins,
  Calculator,
  Building,
  ShieldCheck,
  AlertTriangle,
  Info,
  HelpCircle,
  ExternalLink,
  Volume2
} from 'lucide-react';

export const Funding: React.FC = () => {
  const { language, t, speak } = useLanguage();
  const { user } = useAuth();

  // Gap calculation state
  const [projectCost, setProjectCost] = useState<number>(60000);
  const [ownSavings, setOwnSavings] = useState<number>(user.availableCapital || 35000);

  // EMI Calculator state
  const fundingGap = Math.max(0, projectCost - ownSavings);
  const [loanAmount, setLoanAmount] = useState<number>(fundingGap > 0 ? fundingGap : 25000);
  const [interestRate, setInterestRate] = useState<number>(9.5);
  const [tenureMonths, setTenureMonths] = useState<number>(24);

  const emiResult = calculateLoanEMI(loanAmount, interestRate, tenureMonths);

  const handleReadAloud = () => {
    const text = `${t.funding.title}. ${t.funding.projectCost}: ${formatINR(projectCost)}. ${t.funding.ownCapital}: ${formatINR(ownSavings)}. ${t.funding.fundingGap}: ${formatINR(fundingGap)}. Estimated EMI: ${formatINR(emiResult.emi)} for ${tenureMonths} months.`;
    speak(text);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 font-sans">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-3">
            <Coins className="w-3.5 h-3.5 text-amber-700" />
            <span>{language === 'bn' ? 'ঋণ ও মূলধন সহায়তা' : 'Loan & Capital Gap Assistant'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            {t.funding.title}
          </h1>
          <p className="mt-1 text-sm text-stone-600 max-w-xl">
            {t.funding.subtitle}
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

      {/* 1. Project Cost vs Own Money Funding Gap Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs">
        <h2 className="text-base font-bold text-stone-900 mb-4 pb-2 border-b border-stone-100">
          {language === 'bn' ? '১. নিজস্ব টাকা ও প্রয়োজনীয় পুঁজির তুলনা' : '1. Capital Gap Assessment'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
            <label className="block text-xs font-bold text-stone-600 mb-1">
              {t.funding.projectCost}
            </label>
            <input
              type="number"
              value={projectCost}
              onChange={(e) => setProjectCost(Number(e.target.value) || 0)}
              className="w-full bg-white border border-stone-300 rounded-xl p-3 text-lg font-black text-stone-900"
            />
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
            <label className="block text-xs font-bold text-stone-600 mb-1">
              {t.funding.ownCapital}
            </label>
            <input
              type="number"
              value={ownSavings}
              onChange={(e) => setOwnSavings(Number(e.target.value) || 0)}
              className="w-full bg-white border border-stone-300 rounded-xl p-3 text-lg font-black text-emerald-800"
            />
          </div>

          <div className={`p-4 rounded-2xl border flex flex-col justify-between ${
            fundingGap > 0
              ? 'bg-amber-50 border-amber-300 text-amber-950'
              : 'bg-emerald-50 border-emerald-300 text-emerald-950'
          }`}>
            <span className="text-xs font-bold uppercase tracking-wider">
              {t.funding.fundingGap}
            </span>
            <span className="text-2xl font-black mt-2 tabular-nums">
              {formatINR(fundingGap)}
            </span>
            <span className="text-[11px] mt-1">
              {fundingGap > 0
                ? (language === 'bn' ? 'অতিরিক্ত অর্থের প্রয়োজন' : 'External financing needed')
                : (language === 'bn' ? 'নিজস্ব টাকা পর্যাপ্ত' : 'Own savings are sufficient')}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Simple EMI Calculator */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-stone-100">
          <Calculator className="w-5 h-5 text-emerald-700" />
          <h2 className="text-base font-bold text-stone-900">
            {t.funding.emiCalculator}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Controls (7 cols) */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-stone-700 mb-1">
                <span>{t.funding.loanAmount}</span>
                <span className="text-emerald-800 font-extrabold">{formatINR(loanAmount)}</span>
              </div>
              <input
                type="range"
                min="5000"
                max="200000"
                step="5000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                <span>₹5,000</span>
                <span>₹1,00,000</span>
                <span>₹2,00,000</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-stone-700 mb-1">
                <span>{t.funding.interestRate}</span>
                <span className="text-emerald-800 font-extrabold">{interestRate}% p.a.</span>
              </div>
              <input
                type="range"
                min="4"
                max="24"
                step="0.5"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                <span>4% (Subsidized SHG)</span>
                <span>12% (MFI/Bank)</span>
                <span>24%</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-stone-700 mb-1">
                <span>{t.funding.tenureMonths}</span>
                <span className="text-emerald-800 font-extrabold">{tenureMonths} Months ({Math.round(tenureMonths / 12 * 10) / 10} yrs)</span>
              </div>
              <input
                type="range"
                min="6"
                max="60"
                step="6"
                value={tenureMonths}
                onChange={(e) => setTenureMonths(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                <span>6 Months</span>
                <span>24 Months (2 yrs)</span>
                <span>60 Months (5 yrs)</span>
              </div>
            </div>
          </div>

          {/* EMI Output Card (5 cols) */}
          <div className="md:col-span-5 p-6 rounded-3xl bg-emerald-50 border border-emerald-200 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
              {t.funding.estimatedEmi}
            </span>
            <div className="text-3xl sm:text-4xl font-black text-emerald-950 mt-2 tabular-nums">
              {formatINR(emiResult.emi)}
              <span className="text-xs font-normal text-emerald-800"> / month</span>
            </div>

            <div className="mt-4 pt-3 border-t border-emerald-200/80 flex justify-between text-xs text-emerald-900">
              <span>{t.funding.totalInterest}:</span>
              <span className="font-bold tabular-nums">{formatINR(emiResult.totalInterest)}</span>
            </div>

            <p className="mt-4 text-[11px] text-emerald-800 text-left leading-relaxed">
              ⚠️ {t.funding.repaymentWarning}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Verified Funding Options to Explore */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-stone-900 pb-2 border-b border-stone-100">
          {t.funding.schemesTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
              <span>👩‍🌾</span>
              <span>{t.funding.shgTitle}</span>
            </h3>
            <p className="mt-1 text-xs text-stone-600 leading-relaxed">
              {t.funding.shgDesc}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
              <span>🏦</span>
              <span>{t.funding.mudraTitle}</span>
            </h3>
            <p className="mt-1 text-xs text-stone-600 leading-relaxed">
              {t.funding.mudraDesc}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
              <span>🌾</span>
              <span>{t.funding.coopTitle}</span>
            </h3>
            <p className="mt-1 text-xs text-stone-600 leading-relaxed">
              {t.funding.coopDesc}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
              <span>🤝</span>
              <span>{t.funding.mfiTitle}</span>
            </h3>
            <p className="mt-1 text-xs text-stone-600 leading-relaxed">
              {t.funding.mfiDesc}
            </p>
          </div>
        </div>
      </div>

      {/* Official Notice */}
      <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 text-xs text-stone-600 leading-relaxed flex items-start gap-2.5">
        <Info className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
        <span>{t.funding.officialNotice}</span>
      </div>
    </div>
  );
};
