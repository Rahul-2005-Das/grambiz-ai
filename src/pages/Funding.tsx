import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import {
  CENTRAL_SCHEMES_CONFIG,
  calculateSmartStructuring,
  calculateRepaymentDetails,
  StructuringResult,
  DetailedRepaymentSchedule
} from '../data/schemeConfig';
import { formatINR } from '../services/financialService';
import {
  Coins,
  Calculator,
  Building,
  ShieldCheck,
  AlertTriangle,
  Info,
  HelpCircle,
  ExternalLink,
  Volume2,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';

interface FundingProps {
  onNavigate?: (tab: string) => void;
}

export const Funding: React.FC<FundingProps> = ({ onNavigate }) => {
  const { language, t, speak } = useLanguage();
  const { user } = useAuth();

  // Primary PS Input: Available Margin Capital
  const [marginInput, setMarginInput] = useState<number>(user.availableCapital || 100000);
  const [activeRepaymentTab, setActiveRepaymentTab] = useState<'monthly' | 'quarterly'>('monthly');

  // Interactive adjustments for interest rate and tenure if user wants to model custom terms
  const structuring: StructuringResult = useMemo(() => {
    return calculateSmartStructuring(marginInput);
  }, [marginInput]);

  // Active scheme defaults
  const scheme = structuring.recommendedScheme;
  const defaultInterest = scheme ? scheme.interestRateAnnual : 8.0;
  const defaultTenure = scheme ? scheme.tenureMonths : 84;
  const defaultMoratorium = scheme ? scheme.moratoriumMonths : 6;

  const [customInterest, setCustomInterest] = useState<number>(defaultInterest);
  const [customTenure, setCustomTenure] = useState<number>(defaultTenure);

  // Sync custom rates if scheme switches
  React.useEffect(() => {
    if (scheme) {
      setCustomInterest(scheme.interestRateAnnual);
      setCustomTenure(scheme.tenureMonths);
    }
  }, [scheme?.id]);

  const repayment: DetailedRepaymentSchedule = useMemo(() => {
    const principal = structuring.eligibleLoanAmount > 0
      ? structuring.eligibleLoanAmount
      : structuring.rawCalculatedLoan || 10000;
    return calculateRepaymentDetails(
      principal,
      customInterest,
      customTenure,
      defaultMoratorium
    );
  }, [structuring.eligibleLoanAmount, structuring.rawCalculatedLoan, customInterest, customTenure, defaultMoratorium]);

  const handleReadAloud = () => {
    if (structuring.status !== 'valid' || !scheme) {
      speak(structuring.statusMessage);
      return;
    }
    const text = language === 'bn'
      ? `স্মার্ট আর্থিক কাঠামো। নিজস্ব মার্জিন পুঁজি: ${formatINR(structuring.marginCapital)}। আনুমানিক মোট প্রকল্প ব্যয়: ${formatINR(structuring.estimatedProjectCost)}। যোগ্য সম্ভাব্য ঋণ: ${formatINR(structuring.eligibleLoanAmount)}। প্রস্তাবিত স্কিম: ${scheme.nameBn}। সুদের হার: ${customInterest} শতাংশ। মাসিক আনুমানিক কিস্তি: ${formatINR(repayment.monthlyEMI)}।`
      : language === 'hi'
      ? `स्मार्ट वित्तीय संरचना। स्वयं की मार्जिन पूंजी: ${formatINR(structuring.marginCapital)}। अनुमानित कुल परियोजना लागत: ${formatINR(structuring.estimatedProjectCost)}। संभावित ऋण: ${formatINR(structuring.eligibleLoanAmount)}। अनुशंसित योजना: ${scheme.nameHi}। ब्याज दर: ${customInterest} प्रतिशत। मासिक अनुमानित ईएमआई: ${formatINR(repayment.monthlyEMI)}।`
      : `Smart financial structuring. Available margin capital: ${formatINR(structuring.marginCapital)}. Estimated total project cost: ${formatINR(structuring.estimatedProjectCost)}. Maximum eligible loan: ${formatINR(structuring.eligibleLoanAmount)}. Recommended scheme: ${scheme.name}. Monthly estimated EMI: ${formatINR(repayment.monthlyEMI)} at ${customInterest}% per annum.`;
    speak(text);
  };

  const marginPresets = [
    { label: '₹10,000', value: 10000 },
    { label: '₹25,000', value: 25000 },
    { label: '₹50,000', value: 50000 },
    { label: '₹1,00,000', value: 100000 },
    { label: '₹2,50,000', value: 250000 }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16 font-sans">
      {/* 1. Header with Audio and Status */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
            <Coins className="w-3.5 h-3.5 text-emerald-700" />
            <span>
              {language === 'bn'
                ? 'স্মার্ট স্কিম ক্যালকুলেটর ও আর্থিক কাঠামো'
                : language === 'hi'
                ? 'स्मार्ट योजना कैलकुलेटर एवं वित्तीय संरचना'
                : 'Smart Scheme Calculator & Financial Structuring'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            {language === 'bn' ? 'পুঁজি পরিকল্পনা ও প্রাতিষ্ঠানিক স্কিম' : 'Margin Capital & Scheme Router'}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-stone-600 max-w-xl leading-relaxed">
            {language === 'bn'
              ? 'আপনার নিজস্ব জমানো পুঁজির ভিত্তিতে মোট প্রকল্প ব্যয়, সর্বোচ্চ ৯০% ঋণ সুযোগ ও প্রযোজ্য সরকারি স্কিম যাচাই করুন।'
              : 'Calculate total project cost from your available margin capital, determine eligible 90% debt funding, and route directly to verified schemes.'}
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleReadAloud}
            className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center gap-1.5 border border-stone-300 transition-all active:scale-95"
          >
            <Volume2 className="w-4 h-4 text-emerald-700" />
            <span>{t.advisor.listenToAnswer}</span>
          </button>

          {onNavigate && (
            <button
              onClick={() => onNavigate('plan')}
              className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs transition-all active:scale-95"
            >
              <span>{language === 'bn' ? 'ব্যবসায়িক পরিকল্পনা তৈরি করুন' : 'Generate Business Plan'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Margin Capital Input Box with Quick Presets */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-stone-900">
              {language === 'bn' ? '১. আপনার কাছে থাকা নিজস্ব মার্জিন পুঁজি' : '1. Enter Available Margin Capital'}
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              {language === 'bn'
                ? 'সূত্র: মোট প্রকল্প ব্যয় = মার্জিন পুঁজি ÷ ১০% · সর্বোচ্চ ঋণ = প্রকল্প ব্যয় × ৯০%'
                : 'Formula: Total Project Cost = Margin ÷ 10% · Maximum Loan = Project Cost × 90%'}
            </p>
          </div>

          <span className="text-[11px] bg-stone-100 text-stone-600 px-3 py-1 rounded-full border border-stone-200 font-semibold self-start sm:self-center">
            Illustrative Financing Calculation
          </span>
        </div>

        {/* Input & Presets */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          <div className="md:col-span-6 space-y-2">
            <label className="block text-xs font-bold text-stone-700">
              {language === 'bn' ? 'নিজস্ব পুঁজির পরিমাণ লিখুন (₹):' : 'Available Margin Amount (₹):'}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-stone-400">
                ₹
              </span>
              <input
                type="number"
                min="0"
                step="5000"
                value={marginInput || ''}
                onChange={(e) => setMarginInput(Math.max(0, Number(e.target.value)))}
                placeholder="100000"
                className="w-full bg-stone-50 border-2 border-stone-300 focus:border-emerald-600 rounded-2xl py-3.5 pl-10 pr-4 text-xl sm:text-2xl font-black text-stone-900 focus:outline-hidden tabular-nums"
              />
            </div>
          </div>

          <div className="md:col-span-6 space-y-2">
            <span className="block text-xs font-bold text-stone-600">
              {language === 'bn' ? 'সহজ বাটন থেকে বাছাই করুন:' : 'Quick Selection Presets:'}
            </span>
            <div className="flex flex-wrap gap-2">
              {marginPresets.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => setMarginInput(preset.value)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                    marginInput === preset.value
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Validation / Error Alerts */}
        {structuring.status !== 'valid' && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs sm:text-sm flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong>
                {language === 'bn' ? 'সতর্কতা:' : 'Notice:'}
              </strong>{' '}
              {language === 'bn' ? structuring.statusMessageBn : structuring.statusMessage}
            </div>
          </div>
        )}
      </div>

      {/* 3. The 3 Core Obvious Cards: Margin | Project Cost | Potential Loan */}
      {structuring.status === 'valid' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Your Margin */}
          <div className="p-6 rounded-3xl bg-white border-2 border-emerald-200 shadow-xs relative overflow-hidden">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-lg mb-3">
              💰
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
              {language === 'bn' ? 'আপনার মার্জিন পুঁজি' : 'Your Margin Capital'}
            </span>
            <span className="text-2xl sm:text-3xl font-black text-stone-900 mt-1 block tabular-nums">
              {formatINR(structuring.marginCapital)}
            </span>
            <span className="text-[11px] text-emerald-700 font-semibold block mt-1">
              10% Promoter Contribution Stake
            </span>
          </div>

          {/* Card 2: Estimated Project Cost */}
          <div className="p-6 rounded-3xl bg-linear-to-br from-stone-900 to-stone-850 text-white border border-stone-800 shadow-xs relative overflow-hidden">
            <div className="w-10 h-10 rounded-2xl bg-white/10 text-white flex items-center justify-center text-lg mb-3">
              🏗️
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
              {language === 'bn' ? 'আনুমানিক মোট প্রকল্প ব্যয়' : 'Estimated Project Cost'}
            </span>
            <span className="text-2xl sm:text-3xl font-black text-white mt-1 block tabular-nums">
              {formatINR(structuring.estimatedProjectCost)}
            </span>
            <span className="text-[11px] text-stone-300 block mt-1">
              Formula: {formatINR(structuring.marginCapital)} ÷ 10%
            </span>
          </div>

          {/* Card 3: Potential Loan Component */}
          <div className="p-6 rounded-3xl bg-emerald-50 border-2 border-emerald-300 shadow-xs relative overflow-hidden">
            <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center text-lg mb-3 shadow-xs">
              🏦
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
              {language === 'bn' ? 'সম্ভাব্য ব্যাংক ঋণ সুযোগ' : 'Potential Loan Component'}
            </span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-950 mt-1 block tabular-nums">
              {formatINR(structuring.eligibleLoanAmount)}
            </span>
            <span className="text-[11px] text-emerald-800 font-semibold block mt-1">
              Up to 90% Institutional Funding
              {structuring.isCapped && ' (Capped at Scheme Max)'}
            </span>
          </div>
        </div>
      )}

      {/* 4. Scheme Router Match Card (Phase 13) */}
      {structuring.status === 'valid' && scheme && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-500/40 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
                🎯 {language === 'bn' ? 'প্রযোজ্য সরকারি স্কিম রাউটার' : 'Applicable Scheme Router Recommendation'}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
                {language === 'bn' ? scheme.nameBn : language === 'hi' ? scheme.nameHi : scheme.name}
              </h2>
              <p className="text-xs text-stone-600 mt-0.5">
                {language === 'bn' ? scheme.descriptionBn : language === 'hi' ? scheme.descriptionHi : scheme.description}
              </p>
            </div>

            <div className="px-3.5 py-1.5 rounded-2xl bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300 self-start sm:self-center">
              Active Institutional Rule
            </div>
          </div>

          {/* Scheme Parameters Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="text-stone-500 block text-[11px]">Interest Rate</span>
              <span className="text-base font-black text-emerald-800 mt-0.5 block tabular-nums">
                {scheme.interestRateAnnual}% p.a.
              </span>
              <span className="text-[10px] text-stone-400">Subsidized enterprise rate</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="text-stone-500 block text-[11px]">Loan Tenure</span>
              <span className="text-base font-black text-stone-900 mt-0.5 block tabular-nums">
                {scheme.tenureYears} Years ({scheme.tenureMonths} mo)
              </span>
              <span className="text-[10px] text-stone-400">Structured amortization</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="text-stone-500 block text-[11px]">Moratorium Period</span>
              <span className="text-base font-black text-amber-800 mt-0.5 block tabular-nums">
                {scheme.moratoriumMonths} Months
              </span>
              <span className="text-[10px] text-stone-400">No principal repayment</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="text-stone-500 block text-[11px]">Maximum Stated Ceiling</span>
              <span className="text-base font-black text-stone-900 mt-0.5 block tabular-nums">
                {formatINR(scheme.maxStatedAmount)}
              </span>
              <span className="text-[10px] text-stone-400">Per project limit</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-stone-100 border border-stone-200 text-stone-600 text-[11px] leading-relaxed">
            ℹ️ {scheme.officialSourceNotice}
          </div>
        </div>
      )}

      {/* 5. EMI & Quarterly Repayment Estimator (Phase 15) */}
      {structuring.status === 'valid' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-700" />
              <h2 className="text-base sm:text-lg font-bold text-stone-900">
                {language === 'bn' ? '২. মাসিক ও ত্রৈমাসিক কিস্তি (EMI) হিসাব' : '2. Loan Repayment & Amortization Estimator'}
              </h2>
            </div>

            {/* Repayment Toggle (Monthly vs Quarterly) */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-stone-100 border border-stone-200">
              <button
                type="button"
                onClick={() => setActiveRepaymentTab('monthly')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeRepaymentTab === 'monthly'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {language === 'bn' ? 'মাসিক কিস্তি (Monthly)' : 'Monthly View'}
              </button>
              <button
                type="button"
                onClick={() => setActiveRepaymentTab('quarterly')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeRepaymentTab === 'quarterly'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {language === 'bn' ? 'ত্রৈমাসিক কিস্তি (Quarterly)' : 'Quarterly View'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Interactive Sliders (7 cols) */}
            <div className="md:col-span-7 space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-bold text-stone-700 mb-1">
                  <span>Interest Rate Modeling:</span>
                  <span className="text-emerald-800 font-extrabold">{customInterest}% p.a.</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="14"
                  step="0.5"
                  value={customInterest}
                  onChange={(e) => setCustomInterest(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                  <span>6.5% (Micro Finance)</span>
                  <span>8.0% (Term Loan)</span>
                  <span>12% (Commercial Bank)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-stone-700 mb-1">
                  <span>Repayment Tenure:</span>
                  <span className="text-emerald-800 font-extrabold">{customTenure} Months ({repayment.tenureYears} yrs)</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="84"
                  step="6"
                  value={customTenure}
                  onChange={(e) => setCustomTenure(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                  <span>36 Mo (3 Yrs)</span>
                  <span>60 Mo (5 Yrs)</span>
                  <span>84 Mo (7 Yrs)</span>
                </div>
              </div>

              {/* Moratorium Explanation Banner */}
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-950 text-[11px] space-y-1">
                <span className="font-bold flex items-center gap-1.5 text-amber-900">
                  <Calendar className="w-3.5 h-3.5 text-amber-700" />
                  <span>Moratorium Grace Period: {defaultMoratorium} Months Included</span>
                </span>
                <p className="leading-relaxed">
                  During the first {defaultMoratorium} months, you only pay simple interest (~{formatINR(repayment.moratoriumMonthlyInterestOnly)}/mo) while your business stabilizes. Principal amortization starts in month {defaultMoratorium + 1}.
                </p>
              </div>
            </div>

            {/* Repayment Display Card (5 cols) */}
            <div className="md:col-span-5 p-6 rounded-3xl bg-emerald-50 border-2 border-emerald-300 text-center space-y-4">
              {activeRepaymentTab === 'monthly' ? (
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
                    {language === 'bn' ? 'আনুমানিক মাসিক কিস্তি (EMI)' : 'Estimated Monthly EMI'}
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-emerald-950 mt-2 tabular-nums">
                    {formatINR(repayment.monthlyEMI)}
                    <span className="text-xs font-normal text-emerald-800"> / month</span>
                  </div>
                  <span className="text-[11px] text-emerald-700 block mt-1">
                    Payable for {repayment.tenureMonths - defaultMoratorium} active months
                  </span>
                </div>
              ) : (
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
                    {language === 'bn' ? 'আনুমানিক ত্রৈমাসিক কিস্তি' : 'Estimated Quarterly Repayment'}
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-emerald-950 mt-2 tabular-nums">
                    {formatINR(repayment.quarterlyRepayment)}
                    <span className="text-xs font-normal text-emerald-800"> / quarter</span>
                  </div>
                  <span className="text-[11px] text-emerald-700 block mt-1">
                    Every 3 months amortization cycle
                  </span>
                </div>
              )}

              <div className="pt-3 border-t border-emerald-200 space-y-1.5 text-xs text-emerald-900">
                <div className="flex justify-between">
                  <span>Total Principal Borrowed:</span>
                  <span className="font-bold tabular-nums">{formatINR(repayment.loanAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Total Interest:</span>
                  <span className="font-bold tabular-nums">{formatINR(repayment.totalInterest)}</span>
                </div>
                <div className="flex justify-between font-bold text-emerald-950 pt-1 border-t border-emerald-200/60">
                  <span>Total Repayment:</span>
                  <span className="tabular-nums">{formatINR(repayment.totalRepayment)}</span>
                </div>
              </div>

              <p className="text-[10px] text-emerald-800 text-left leading-relaxed">
                ⚠️ Repayment schedules may vary based on lending authority sanction terms.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 6. Navigation Controls (Back to Feasibility / Continue to Plan) */}
      <div className="sticky bottom-4 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-stone-200 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          onClick={() => onNavigate && onNavigate('feasibility')}
          className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'bn' ? '← সম্ভাব্যতা যাচাইয়ে ফিরুন' : '← Back to Feasibility'}</span>
        </button>

        <div className="text-center hidden md:block">
          <span className="text-xs font-bold text-stone-800 block">
            {language === 'bn' ? 'পরবর্তী ধাপ: অফিসিয়াল ব্যবসায়িক পরিকল্পনা' : 'Next Step: AI 1-Page Business Plan'}
          </span>
          <span className="text-[10px] text-stone-400">
            Export ready for bank submission and self-management
          </span>
        </div>

        <button
          onClick={() => onNavigate && onNavigate('plan')}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
        >
          <span>{language === 'bn' ? 'ব্যবসায়িক পরিকল্পনা তৈরি করুন →' : 'Generate Business Plan →'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 7. Institutional Disclaimers */}
      <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 text-xs text-stone-600 leading-relaxed flex items-start gap-2.5">
        <Info className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
        <span>
          {language === 'bn'
            ? 'সরকারি ও প্রাতিষ্ঠানিক নির্দেশিকা: প্রদর্শিত স্কিমের তথ্য ও হিসাব বর্তমান সমস্যা বিবরণীর স্পেসিফিকেশনের ওপর ভিত্তি করে তৈরি। আবেদন করার পূর্বে সংশ্লিষ্ট ব্যাংক বা সরকারি পোর্টালে সরাসরি যাচাই করা আবশ্যক। কোনো ঋণ মঞ্জুরির নিশ্চয়তা প্রদান করা হয় না।'
            : language === 'hi'
            ? 'सरकारी एवं संस्थागत सूचना: प्रदर्शित योजना की जानकारी और गणना मौजूदा विनिर्देशों पर आधारित है। आवेदन करने से पहले संबंधित बैंक या आधिकारिक पोर्टल पर सत्यापन आवश्यक है। किसी भी ऋण स्वीकृति की गारंटी नहीं दी जाती है।'
            : 'Scheme information shown here is based on the current problem statement specification and should be verified with the relevant official authority before application. GramBiz AI does not guarantee loan sanction or interest subsidies.'}
        </span>
      </div>
    </div>
  );
};
