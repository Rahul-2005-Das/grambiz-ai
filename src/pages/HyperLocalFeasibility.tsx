import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { getFeasibilityFor, HyperLocalFeasibilityReport } from '../data/feasibilityData';
import { INDIAN_STATES, DISTRICT_MAP, BUSINESS_CATEGORIES } from '../data/demoMarkets';
import { formatINR } from '../services/financialService';
import {
  Compass,
  MapPin,
  TrendingUp,
  AlertTriangle,
  ShieldCheck,
  Users,
  Target,
  Truck,
  Calendar,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Volume2,
  Info,
  CheckCircle2,
  Eye,
  Building,
  HelpCircle,
  Coins
} from 'lucide-react';

interface HyperLocalFeasibilityProps {
  onNavigate: (tab: string) => void;
}

export const HyperLocalFeasibility: React.FC<HyperLocalFeasibilityProps> = ({ onNavigate }) => {
  const { language, t, speak } = useLanguage();
  const { user } = useAuth();

  const [state, setState] = useState(user.state || 'West Bengal');
  const [district, setDistrict] = useState(user.district || 'Nadia');
  const [category, setCategory] = useState(user.businessCategory || 'Dairy');
  const [margin, setMargin] = useState<number>(user.availableCapital || 25000);

  const report: HyperLocalFeasibilityReport = getFeasibilityFor(state, district, category, margin);

  const availableDistricts = DISTRICT_MAP[state] || DISTRICT_MAP['West Bengal'];

  const handleReadAloud = () => {
    const text = language === 'bn'
      ? `স্থানীয় সম্ভাব্যতা রিপোর্ট। এলাকা: ${district}, ${state}। ব্যবসার ধরণ: ${report.businessName}। রেটিং: ${report.feasibilityAssessment.badge}। ${report.feasibilityAssessment.headline}।`
      : language === 'hi'
      ? `स्थानीय व्यवहार्यता रिपोर्ट। क्षेत्र: ${district}, ${state}। व्यवसाय: ${report.businessName}। रेटिंग: ${report.feasibilityAssessment.badge}। ${report.feasibilityAssessment.headline}।`
      : `Hyper-local feasibility report for ${report.businessName} in ${district}, ${state}. Feasibility status: ${report.feasibilityAssessment.badge}. ${report.feasibilityAssessment.headline}.`;
    speak(text);
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Strong Fit':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'Needs Attention':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      default:
        return 'bg-rose-100 text-rose-900 border-rose-300';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16 font-sans">
      {/* 1. Header Bar with Audio and Back/Next */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
            <Compass className="w-3.5 h-3.5 text-emerald-700" />
            <span>
              {language === 'bn'
                ? 'হাইপার-লোকাল ব্যবসায়িক সম্ভাব্যতা মূল্যায়ন'
                : language === 'hi'
                ? 'हाइपर-लोकल व्यापार व्यवहार्यता मूल्यांकन'
                : 'Hyper-Local Business Feasibility Analysis'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            {report.businessName}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-stone-600 flex items-center gap-2 flex-wrap">
            <span>📍 {district}, {state}</span>
            <span>•</span>
            <span>💰 {language === 'bn' ? 'নিজস্ব মার্জিন পুঁজি' : 'Available Margin'}: {formatINR(margin)}</span>
            <span>•</span>
            <span className="text-amber-800 font-medium">⚠️ {report.marketReach.dataLabel}</span>
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

          <button
            onClick={() => onNavigate('funding')}
            className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs transition-all active:scale-95"
          >
            <span>{language === 'bn' ? 'আর্থিক হিসাব ও স্কিম দেখুন' : 'Structure Finance & Schemes'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Interactive Location & Category Filter Bar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-stone-100">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            {language === 'bn' ? 'বিশ্লেষণের মানদণ্ড পরিবর্তন করুন' : 'Change Location & Sector'}
          </span>
          <span className="text-[11px] text-stone-400">
            {language === 'bn' ? 'রিয়েল-টাইম এআই রি-ক্যালকুলেশন' : 'Real-time AI recalculation'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div>
            <label className="block text-[11px] font-bold text-stone-600 mb-1">State</label>
            <select
              value={state}
              onChange={(e) => {
                const s = e.target.value;
                setState(s);
                const firstDst = DISTRICT_MAP[s]?.[0] || 'Default';
                setDistrict(firstDst);
              }}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs sm:text-sm font-semibold text-stone-900"
            >
              {INDIAN_STATES.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-600 mb-1">District</label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs sm:text-sm font-semibold text-stone-900"
            >
              {availableDistricts.map((dst) => (
                <option key={dst} value={dst}>{dst}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-600 mb-1">Business Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs sm:text-sm font-semibold text-stone-900"
            >
              {BUSINESS_CATEGORIES.filter((c) => c !== 'All Categories').map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 3. AI-Assisted Feasibility Assessment Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
              {language === 'bn' ? 'এআই ব্যবসায়িক সম্ভাব্যতা মূল্যায়ন' : 'AI-Assisted Feasibility Assessment'}
            </span>
            <div className="flex items-center gap-3 mt-1.5">
              <span className={`px-3 py-1 rounded-full text-xs font-black border ${getBadgeColor(report.feasibilityAssessment.badge)}`}>
                {report.feasibilityAssessment.badge}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-stone-900">
                {report.feasibilityAssessment.headline}
              </h2>
            </div>
            <p className="mt-1 text-xs text-stone-600">
              {report.feasibilityAssessment.summary}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-center shrink-0">
            <span className="text-[10px] text-stone-400 font-bold uppercase block">Feasibility Score</span>
            <span className="text-2xl font-black text-emerald-800 tabular-nums">
              {report.feasibilityAssessment.scorePercent}/100
            </span>
            <span className="text-[10px] text-stone-500 block">Advisory Metric</span>
          </div>
        </div>

        {/* 7 Factor Assessment Table */}
        <div className="space-y-2 pt-2">
          <span className="text-xs font-bold text-stone-700 block">
            {language === 'bn' ? 'মূল্যায়নের পেছনের কারণসমূহ:' : 'Key Assessment Drivers & Reasoning:'}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {report.feasibilityAssessment.reasons.map((r, i) => (
              <div
                key={i}
                className={`p-3 rounded-2xl border flex items-start gap-2.5 ${
                  r.status === 'positive'
                    ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                    : r.status === 'warning'
                    ? 'bg-amber-50/60 border-amber-200 text-amber-950'
                    : 'bg-stone-50 border-stone-200 text-stone-800'
                }`}
              >
                <span className="mt-0.5 shrink-0">
                  {r.status === 'positive' ? '🟢' : r.status === 'warning' ? '🟡' : '⚪'}
                </span>
                <div>
                  <strong className="block font-bold">{r.factor}</strong>
                  <span className="text-[11px] leading-relaxed text-stone-600">{r.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Grid of Detailed Analysis Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Module 1: Market Reach & Local Demand */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-600" />
              <span>1. Market Reach & Local Demand</span>
            </h3>
            <span className="text-[10px] bg-stone-100 text-stone-600 font-semibold px-2 py-0.5 rounded-full border border-stone-200">
              {report.marketReach.dataLabel}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="text-stone-500 block text-[11px]">Primary Coverage Radius</span>
              <span className="text-base font-black text-stone-900 mt-0.5 block">
                Within ~{report.marketReach.estimatedRadiusKm} km
              </span>
              <span className="text-[10px] text-stone-400">Immediate village hub</span>
            </div>
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="text-stone-500 block text-[11px]">Estimated Customer Pool</span>
              <span className="text-sm font-bold text-emerald-800 mt-0.5 block">
                {report.marketReach.potentialCustomerBase}
              </span>
              <span className="text-[10px] text-stone-400">Local households & stalls</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs space-y-1.5">
            <div className="flex justify-between items-center text-emerald-950 font-bold">
              <span>Ground Demand Index:</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 text-[11px]">
                {report.localDemand.level} Demand
              </span>
            </div>
            <p className="text-stone-700 text-[11px] leading-relaxed">
              {report.localDemand.summary}
            </p>
            <div className="text-[11px] text-stone-600 pt-1 border-t border-emerald-200/80">
              ⏰ <strong>Peak Selling Hours:</strong> {report.localDemand.peakHours}
            </div>
          </div>
        </div>

        {/* Module 2: Opportunity Analysis */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>2. Opportunity Analysis</span>
            </h3>
            <span className="text-[10px] bg-teal-50 text-teal-800 font-semibold px-2 py-0.5 rounded-full border border-teal-200">
              Local Niche
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-teal-50/60 border border-teal-200 text-xs space-y-2">
            <div>
              <span className="text-[10px] font-bold uppercase text-teal-800 tracking-wider block">
                💡 Primary Opportunity
              </span>
              <p className="text-teal-950 font-medium mt-0.5 text-xs">
                {report.opportunityAnalysis.primaryOpportunity}
              </p>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-teal-800 tracking-wider block">
                🎯 Underserved Local Niche
              </span>
              <p className="text-stone-700 text-[11px] mt-0.5">
                {report.opportunityAnalysis.underservedNiche}
              </p>
            </div>
          </div>

          <div className="text-xs space-y-1.5">
            <span className="font-bold text-stone-700 block text-[11px]">Key Customer Groups:</span>
            <div className="flex flex-wrap gap-1.5">
              {report.opportunityAnalysis.customerGroups.map((cg, i) => (
                <span key={i} className="px-2.5 py-1 rounded-xl bg-stone-100 border border-stone-200 text-stone-700 text-[11px]">
                  👤 {cg}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Module 3: Visual SWOT Analysis */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-xs space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>3. Visual SWOT Analysis (Tailored to {district})</span>
            </h3>
            <span className="text-[10px] text-stone-400">Contextual Matrix</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Strengths */}
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
              <span className="font-black text-emerald-900 flex items-center gap-1.5">
                <span>💪</span>
                <span>Strengths (শক্তি)</span>
              </span>
              <ul className="space-y-1.5 text-stone-700 text-[11px]">
                {report.swot.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 shrink-0 font-bold">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
              <span className="font-black text-amber-900 flex items-center gap-1.5">
                <span>⚠️</span>
                <span>Weaknesses (সীমাবদ্ধতা)</span>
              </span>
              <ul className="space-y-1.5 text-stone-700 text-[11px]">
                {report.swot.weaknesses.map((w, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-amber-600 shrink-0 font-bold">•</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Opportunities */}
            <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200 space-y-2">
              <span className="font-black text-teal-900 flex items-center gap-1.5">
                <span>🌱</span>
                <span>Opportunities (সুযোগ)</span>
              </span>
              <ul className="space-y-1.5 text-stone-700 text-[11px]">
                {report.swot.opportunities.map((o, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-teal-600 shrink-0 font-bold">•</span>
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Threats */}
            <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-2">
              <span className="font-black text-rose-900 flex items-center gap-1.5">
                <span>🚨</span>
                <span>Threats (ঝুঁকি)</span>
              </span>
              <ul className="space-y-1.5 text-stone-700 text-[11px]">
                {report.swot.threats.map((t, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-rose-600 shrink-0 font-bold">•</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Module 4: Local Threats & Action Plan */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>4. Local Threats & Mitigation Action</span>
            </h3>
            <span className="text-[10px] text-stone-400">Risk Audit</span>
          </div>

          <div className="space-y-2.5">
            {report.threats.map((th, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-stone-900">
                  <span className="text-amber-600">⚡</span>
                  <span>{th.risk}</span>
                </div>
                <p className="text-stone-500 text-[11px]">
                  <strong>Why it matters:</strong> {th.whyItMatters}
                </p>
                <div className="pt-1 text-[11px] text-emerald-800 font-medium">
                  <strong>👉 Recommended Action:</strong> {th.possibleAction}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Module 5: Competitor Mapping */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span>5. Competitor Density Mapping</span>
            </h3>
            <span className="text-[10px] bg-stone-100 text-stone-600 font-semibold px-2 py-0.5 rounded-full border border-stone-200">
              Demo / Estimated
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-700">Estimated Density in 10 km:</span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 font-bold text-xs border border-blue-200">
                {report.competitors.densityLevel} Density
              </span>
            </div>

            <div className="text-xs text-stone-800">
              <strong>Estimated Count:</strong> {report.competitors.estimatedCountIn10Km}
            </div>

            <div className="text-xs text-stone-600 leading-relaxed">
              <strong>Competition Profile:</strong> {report.competitors.competitionLevel}
            </div>

            <div className="p-3 rounded-xl bg-white border border-stone-200 text-xs">
              <span className="font-bold text-emerald-800 block text-[11px] uppercase tracking-wider mb-1">
                ⭐ Recommended Differentiation Strategy
              </span>
              <p className="text-stone-700 text-[11px] leading-relaxed">
                {report.competitors.differentiationStrategy}
              </p>
            </div>

            <p className="text-[10px] text-stone-400 italic">
              ℹ️ {report.competitors.note}
            </p>
          </div>
        </div>

        {/* Module 6: Local Pricing & Market Value */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <Coins className="w-4 h-4 text-emerald-600" />
              <span>6. Local Pricing & Market Value</span>
            </h3>
            <span className="text-[10px] text-stone-400">Illustrative Range</span>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-stone-600">Estimated Local Price Range:</span>
              <span className="text-base font-black text-emerald-800 tabular-nums">
                {report.pricing.estimatedPriceRange}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-stone-600">Positioning Strategy:</span>
              <span className="font-bold text-stone-900">{report.pricing.positioning}</span>
            </div>

            <div className="text-xs space-y-1">
              <span className="text-stone-500 font-semibold block text-[11px]">Customer Purchasing Considerations:</span>
              <ul className="list-disc pl-4 text-stone-700 text-[11px] space-y-0.5">
                {report.pricing.purchasingConsiderations.map((pc, i) => (
                  <li key={i}>{pc}</li>
                ))}
              </ul>
            </div>

            <p className="text-[10px] text-stone-400 border-t border-stone-200 pt-2">
              ⚠️ {report.pricing.priceConfidence}. Market rates fluctuate with weekly mandi supply.
            </p>
          </div>
        </div>

        {/* Module 7: Customer Types & Distribution Channels */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-600" />
              <span>7. Customer Mix & Channels</span>
            </h3>
            <span className="text-[10px] text-stone-400">Route-to-Market</span>
          </div>

          <div className="space-y-2 text-xs">
            <span className="font-bold text-stone-700 block text-[11px]">Customer Segmentation:</span>
            {report.customerTypes.map((ct, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex justify-between items-center">
                <div>
                  <span className="font-bold text-stone-900 block">{ct.type}</span>
                  <span className="text-[10px] text-stone-500">{ct.description}</span>
                </div>
                <span className="font-black text-emerald-800 text-sm">{ct.sharePercent}%</span>
              </div>
            ))}
          </div>

          <div className="space-y-1.5 text-xs pt-2 border-t border-stone-100">
            <span className="font-bold text-stone-700 block text-[11px]">Feasible Distribution Channels:</span>
            {report.distributionChannels.map((dc, i) => (
              <div key={i} className="text-[11px] text-stone-700 flex items-center justify-between">
                <span>• {dc.channel}</span>
                <span className="text-emerald-700 font-semibold">{dc.feasibility} Feasibility</span>
              </div>
            ))}
          </div>
        </div>

        {/* Module 8: Seasonal Factors */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-xs space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-600" />
              <span>8. Seasonal Cycle & Operational Safeguards</span>
            </h3>
            <span className="text-[10px] text-stone-400">Annual Calendar</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {report.seasonalFactors.map((sf, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900">{sf.season}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    sf.impact === 'Surge'
                      ? 'bg-emerald-100 text-emerald-800'
                      : sf.impact === 'Slowdown'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-stone-200 text-stone-800'
                  }`}>
                    {sf.impact}
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed pt-1">
                  <strong>Action:</strong> {sf.action}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Sticky Bottom Action Bar with Back & Next */}
      <div className="sticky bottom-4 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-stone-200 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          onClick={() => onNavigate('discover')}
          className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'bn' ? '← অন্য ব্যবসা খুঁজুন' : '← Back to Discovery'}</span>
        </button>

        <div className="text-center hidden md:block">
          <span className="text-xs font-bold text-stone-800 block">
            {language === 'bn' ? 'পরবর্তী ধাপ: আর্থিক কাঠামো ও সরকারি স্কিম' : 'Next Step: Financial Structuring & Scheme Router'}
          </span>
          <span className="text-[10px] text-stone-400">
            Total Project Cost = Margin ÷ 10% · Maximum 90% Loan Routing
          </span>
        </div>

        <button
          onClick={() => onNavigate('funding')}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
        >
          <span>{language === 'bn' ? 'আর্থিক পরিকল্পনা শুরু করুন →' : 'Continue to Financial Structuring →'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 6. Legal & Financial Safety Disclaimer */}
      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {language === 'bn'
            ? 'সতর্কবার্তা: এগুলি আপনার প্রদত্ত তথ্যের ওপর ভিত্তি করে এআই-সহায়তাপ্রাপ্ত আনুমানিক বিশ্লেষণ। প্রকৃত বাজার পরিস্থিতি ও প্রতিযোগিতা অঞ্চলভেদে ভিন্ন হতে পারে। কোনো ব্যাংক ঋণ বা আর্থিক লাভের নিশ্চয়তা দেওয়া হয় না।'
            : language === 'hi'
            ? 'अस्वीकरण: ये आपके द्वारा प्रदान की गई जानकारी पर आधारित एआई-सहायता प्राप्त अनुमान हैं। वास्तविक बाजार स्थितियां भिन्न हो सकती हैं। कोई आधिकारिक बैंक ऋण या लाभ की गारंटी नहीं है।'
            : 'Disclaimer: These are AI-assisted estimates based on user-provided parameters and rural demographic indicators. Actual local business performance and competitors may vary. GramBiz AI does not guarantee loan approval or profit.'}
        </p>
      </div>
    </div>
  );
};
