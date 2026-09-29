import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import {
  INDIAN_STATES,
  DISTRICT_MAP,
  BUSINESS_CATEGORIES,
  getMarketDataFor
} from '../data/demoMarkets';
import { MarketIntelligence } from '../types';
import {
  MapPin,
  TrendingUp,
  Calendar,
  Users,
  Truck,
  Building2,
  Sparkles,
  CheckCircle,
  HelpCircle,
  Volume2
} from 'lucide-react';

export const LocalMarket: React.FC = () => {
  const { language, t, speak } = useLanguage();
  const { user } = useAuth();

  const [state, setState] = useState(user.state || 'West Bengal');
  const [district, setDistrict] = useState(user.district || 'Nadia');
  const [category, setCategory] = useState(user.businessCategory || 'Dairy');

  const [marketData, setMarketData] = useState<MarketIntelligence>(() =>
    getMarketDataFor(state, district, category)
  );

  const availableDistricts = DISTRICT_MAP[state] || DISTRICT_MAP['West Bengal'];

  const handleFilter = (st: string, dst: string, cat: string) => {
    setState(st);
    setDistrict(dst);
    setCategory(cat);
    const data = getMarketDataFor(st, dst, cat);
    setMarketData(data);
  };

  const handleReadSummary = () => {
    const text = `${t.market.title} for ${district}, ${state}. ${marketData.demandSummary}. Popular products: ${marketData.popularProducts.join(', ')}.`;
    speak(text);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 font-sans">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold mb-3">
            <MapPin className="w-3.5 h-3.5 text-teal-600" />
            <span>{language === 'bn' ? 'মাঠপর্যায়ের স্থানীয় বাজার তথ্য' : 'Hyper-Local Ground Intelligence'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            {t.market.title}
          </h1>
          <p className="mt-1 text-sm text-stone-600 max-w-xl">
            {t.market.subtitle}
          </p>
        </div>

        <button
          onClick={handleReadSummary}
          className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center gap-2 border border-stone-300 transition-all shrink-0 active:scale-95"
        >
          <Volume2 className="w-4 h-4 text-emerald-700" />
          <span>{t.advisor.listenToAnswer}</span>
        </button>
      </div>

      {/* Filter Selectors Bar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/80 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              {t.market.selectState}
            </label>
            <select
              value={state}
              onChange={(e) => {
                const newSt = e.target.value;
                const newDst = DISTRICT_MAP[newSt]?.[0] || 'Default';
                handleFilter(newSt, newDst, category);
              }}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-xs sm:text-sm font-semibold text-stone-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            >
              {INDIAN_STATES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              {t.market.selectDistrict}
            </label>
            <select
              value={district}
              onChange={(e) => handleFilter(state, e.target.value, category)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-xs sm:text-sm font-semibold text-stone-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            >
              {availableDistricts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              {t.market.selectCategory}
            </label>
            <select
              value={category}
              onChange={(e) => handleFilter(state, district, e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-xs sm:text-sm font-semibold text-stone-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            >
              {BUSINESS_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Market Intelligence Display Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Local Demand & Summary */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                {t.market.demandSection}
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800">
                🟢 {marketData.demandLevel} Demand
              </span>
            </div>
            <h3 className="text-lg font-bold text-stone-900">
              {district} · {category}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
              {marketData.demandSummary}
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-stone-100">
            <span className="text-xs font-bold text-stone-800 block mb-2">
              {t.market.popularProducts}:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {marketData.popularProducts.map((p, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-800 text-xs font-medium"
                >
                  ✓ {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Card 2: Seasonal Opportunities */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
              <Calendar className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-stone-900">
              {t.market.seasonalSection}
            </h3>
          </div>

          <div className="space-y-3">
            {marketData.seasonalOpportunities.map((s, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200/60">
                <div className="text-xs font-bold text-amber-950 flex items-center justify-between">
                  <span>📅 {s.season}</span>
                </div>
                <p className="mt-1 text-xs text-stone-700 leading-snug">
                  {s.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {s.bestProducts.map((bp, bpIdx) => (
                    <span
                      key={bpIdx}
                      className="text-[11px] font-semibold text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded-md"
                    >
                      {bp}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 3: Customer Segments */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-xl bg-blue-100 text-blue-800">
              <Users className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-stone-900">
              {t.market.customersSection}
            </h3>
          </div>

          <div className="space-y-3">
            {marketData.customerSegments.map((seg, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-stone-50 border border-stone-200/70">
                <div className="flex items-center justify-between text-xs font-bold text-stone-900">
                  <span>{seg.name}</span>
                  <span className="text-emerald-700">{seg.sharePercent}% of buyers</span>
                </div>
                <p className="mt-1 text-xs text-stone-600">
                  {seg.behavior}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Card 4: Logistics & Sourcing */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-xl bg-teal-100 text-teal-800">
              <Truck className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-stone-900">
              {t.market.logisticsSection}
            </h3>
          </div>

          <div className="space-y-3 text-xs text-stone-700">
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/70">
              <span className="font-bold text-stone-900 block mb-1">
                🚚 Transport Access:
              </span>
              <p className="leading-relaxed">{marketData.transportationNotes}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/70">
              <span className="font-bold text-stone-900 block mb-1">
                🌾 Raw Material Availability:
              </span>
              <p className="leading-relaxed">{marketData.rawMaterialAvailability}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Notice Banner */}
      <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 text-xs text-stone-500 text-center">
        {t.disclaimerNote}
      </div>
    </div>
  );
};
