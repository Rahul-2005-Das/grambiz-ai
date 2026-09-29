import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import {
  calculateFinancials,
  getDefaultCapitalAllocation,
  formatINR
} from '../services/financialService';
import { api } from '../services/api';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import {
  Wallet,
  TrendingUp,
  AlertCircle,
  Sparkles,
  PieChart as PieIcon,
  BarChart3,
  Volume2,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

export const FinancialPlanner: React.FC = () => {
  const { language, t, speak } = useLanguage();
  const { user } = useAuth();

  // Financial inputs
  const [capital, setCapital] = useState<number>(user.availableCapital || 35000);
  const [equipment, setEquipment] = useState<number>(18000);
  const [rawMaterial, setRawMaterial] = useState<number>(8000);
  const [rent, setRent] = useState<number>(2000);
  const [salary, setSalary] = useState<number>(0); // Solo micro-business default
  const [utilities, setUtilities] = useState<number>(800);
  const [transport, setTransport] = useState<number>(1200);
  const [marketing, setMarketing] = useState<number>(1500);
  const [otherExpenses, setOtherExpenses] = useState<number>(500);
  const [expectedSales, setExpectedSales] = useState<number>(28000);

  // AI Insight state
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  // Computations
  const financials = useMemo(() => {
    return calculateFinancials({
      availableCapital: capital,
      equipmentCost: equipment,
      rawMaterialCost: rawMaterial,
      rentCost: rent,
      salaryCost: salary,
      utilitiesCost: utilities,
      transportCost: transport,
      marketingCost: marketing,
      otherExpenses,
      expectedMonthlySales: expectedSales
    });
  }, [
    capital,
    equipment,
    rawMaterial,
    rent,
    salary,
    utilities,
    transport,
    marketing,
    otherExpenses,
    expectedSales
  ]);

  // Capital allocation items
  const [allocations, setAllocations] = useState(() =>
    getDefaultCapitalAllocation(capital)
  );

  // Keep allocations synced with capital changes
  const handleCapitalChange = (newCap: number) => {
    setCapital(newCap);
    setAllocations(getDefaultCapitalAllocation(newCap));
  };

  // Recharts data sets
  const comparisonData = [
    {
      name: language === 'bn' ? 'টাকা' : 'Monthly (₹)',
      [language === 'bn' ? 'সম্ভাব্য বিক্রি' : 'Sales']: financials.estimatedMonthlyRevenue,
      [language === 'bn' ? 'মাসিক খরচ' : 'Costs']: financials.totalMonthlyExpenses,
      [language === 'bn' ? 'নিট লাভ' : 'Profit']: Math.max(0, financials.estimatedMonthlyProfit)
    }
  ];

  const profitTrajectoryData = [
    { month: 'M1', Profit: Math.round(financials.estimatedMonthlyProfit * 0.6) },
    { month: 'M2', Profit: Math.round(financials.estimatedMonthlyProfit * 0.8) },
    { month: 'M3', Profit: Math.round(financials.estimatedMonthlyProfit * 1.0) },
    { month: 'M4', Profit: Math.round(financials.estimatedMonthlyProfit * 1.08) },
    { month: 'M5', Profit: Math.round(financials.estimatedMonthlyProfit * 1.15) },
    { month: 'M6', Profit: Math.round(financials.estimatedMonthlyProfit * 1.25) }
  ];

  const pieData = allocations.map((a) => ({
    name: language === 'bn' ? a.nameBn : language === 'hi' ? a.nameHi : a.name,
    value: a.amount,
    color: a.color
  }));

  const handleFetchAiInsight = async () => {
    setLoadingAi(true);
    try {
      const res = await api.getFinancialInsight(financials, language);
      if (res && res.insight) {
        setAiInsight(res.insight);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingAi(false);
    }
  };

  const handleReadAloud = () => {
    const speech = `${t.finance.title}. ${t.finance.totalInvestment}: ${formatINR(financials.totalInitialInvestment)}. ${t.finance.monthlyRevenue}: ${formatINR(financials.estimatedMonthlyRevenue)}. ${t.finance.monthlyProfit}: ${formatINR(financials.estimatedMonthlyProfit)}.`;
    speak(speech);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 font-sans">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-3">
            <Wallet className="w-3.5 h-3.5 text-blue-600" />
            <span>{language === 'bn' ? 'আর্থিক গঠন ও পরিকল্পনা' : 'Financial Structuring'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            {t.finance.title}
          </h1>
          <p className="mt-1 text-sm text-stone-600 max-w-xl">
            {t.finance.subtitle}
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

      {/* Main Grid: Inputs on Left, Visual Calculations on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Easy Inputs (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs space-y-5">
          <h2 className="text-base font-bold text-stone-900 pb-2 border-b border-stone-100 flex items-center justify-between">
            <span>{language === 'bn' ? 'টাকার হিসাব লিখুন' : 'Financial Inputs'}</span>
            <span className="text-xs font-normal text-stone-500">₹ INR</span>
          </h2>

          {/* Section 1: Capital */}
          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1.5">
              {t.finance.capitalSection}
            </label>
            <input
              type="number"
              value={capital}
              onChange={(e) => handleCapitalChange(Number(e.target.value) || 0)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-base font-black text-emerald-800 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          {/* Section 2: Startup Costs */}
          <div className="space-y-3 pt-2 border-t border-stone-100">
            <span className="text-xs font-bold text-stone-700 block">
              {t.finance.startupCosts}
            </span>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="text-[11px] text-stone-500 block mb-1">
                  {t.finance.equipment}
                </label>
                <input
                  type="number"
                  value={equipment}
                  onChange={(e) => setEquipment(Number(e.target.value) || 0)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-xs font-bold"
                />
              </div>

              <div>
                <label className="text-[11px] text-stone-500 block mb-1">
                  {t.finance.marketing}
                </label>
                <input
                  type="number"
                  value={marketing}
                  onChange={(e) => setMarketing(Number(e.target.value) || 0)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-xs font-bold"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Monthly Expenses */}
          <div className="space-y-3 pt-2 border-t border-stone-100">
            <span className="text-xs font-bold text-stone-700 block">
              {t.finance.monthlyCosts}
            </span>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="text-[11px] text-stone-500 block mb-1">
                  {t.finance.rawMaterial}
                </label>
                <input
                  type="number"
                  value={rawMaterial}
                  onChange={(e) => setRawMaterial(Number(e.target.value) || 0)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-xs font-bold"
                />
              </div>

              <div>
                <label className="text-[11px] text-stone-500 block mb-1">
                  {t.finance.rent}
                </label>
                <input
                  type="number"
                  value={rent}
                  onChange={(e) => setRent(Number(e.target.value) || 0)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-xs font-bold"
                />
              </div>

              <div>
                <label className="text-[11px] text-stone-500 block mb-1">
                  {t.finance.utilities}
                </label>
                <input
                  type="number"
                  value={utilities}
                  onChange={(e) => setUtilities(Number(e.target.value) || 0)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-xs font-bold"
                />
              </div>

              <div>
                <label className="text-[11px] text-stone-500 block mb-1">
                  {t.finance.transport}
                </label>
                <input
                  type="number"
                  value={transport}
                  onChange={(e) => setTransport(Number(e.target.value) || 0)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-xs font-bold"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Expected Monthly Sales */}
          <div className="pt-2 border-t border-stone-100">
            <label className="block text-xs font-bold text-stone-800 mb-1.5">
              {t.finance.salesSection}
            </label>
            <input
              type="number"
              value={expectedSales}
              onChange={(e) => setExpectedSales(Number(e.target.value) || 0)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-base font-black text-stone-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Right Column: Visual Calculations & Financial Health (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Summary Metric Cards Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">
                {t.finance.totalInvestment}
              </span>
              <span className="text-lg font-black text-stone-900 mt-1 block tabular-nums">
                {formatINR(financials.totalInitialInvestment)}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">
                {t.finance.monthlyExpenses}
              </span>
              <span className="text-lg font-black text-stone-700 mt-1 block tabular-nums">
                {formatINR(financials.totalMonthlyExpenses)}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">
                {t.finance.monthlyProfit}
              </span>
              <span className={`text-lg font-black mt-1 block tabular-nums ${
                financials.estimatedMonthlyProfit >= 0 ? 'text-emerald-700' : 'text-rose-600'
              }`}>
                {formatINR(financials.estimatedMonthlyProfit)}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">
                {t.finance.profitMargin}
              </span>
              <span className="text-lg font-black text-emerald-800 mt-1 block tabular-nums">
                {financials.profitMarginPercent}%
              </span>
            </div>
          </div>

          {/* Funding Gap Alert if exists */}
          {financials.capitalFundingGap > 0 ? (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold">{t.finance.gapAlert}</h4>
                <p className="text-xs mt-0.5 leading-relaxed">
                  {t.finance.gapNeed.replace('{amount}', formatINR(financials.capitalFundingGap))}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold">
                  {language === 'bn' ? 'পুঁজি পর্যাপ্ত রয়েছে' : 'Capital is Sufficient'}
                </h4>
                <p className="text-xs mt-0.5">
                  {t.finance.surplusNotice.replace(
                    '{amount}',
                    formatINR(financials.availableCapital - financials.totalInitialInvestment)
                  )}
                </p>
              </div>
            </div>
          )}

          {/* Chart 1: Revenue vs Cost Bar Chart */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-700" />
                <h3 className="text-sm font-bold text-stone-900">
                  {t.finance.chartRevenueVsCost}
                </h3>
              </div>
              <span className="text-xs text-stone-400 tabular-nums">
                Break-even: {formatINR(financials.breakEvenMonthlyRevenue)}/mo
              </span>
            </div>

            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData}>
                  <XAxis dataKey="name" stroke="#78716c" fontSize={11} />
                  <YAxis stroke="#78716c" fontSize={11} tickFormatter={(val) => `₹${val}`} />
                  <Tooltip formatter={(value: any) => formatINR(Number(value))} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey={language === 'bn' ? 'সম্ভাব্য বিক্রি' : 'Sales'} fill="#059669" radius={[6, 6, 0, 0]} />
                  <Bar dataKey={language === 'bn' ? 'মাসিক খরচ' : 'Costs'} fill="#d97706" radius={[6, 6, 0, 0]} />
                  <Bar dataKey={language === 'bn' ? 'নিট লাভ' : 'Profit'} fill="#0284c7" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Projected Profit Growth (6 Months) */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs">
            <h3 className="text-sm font-bold text-stone-900 mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-teal-700" />
              <span>{t.finance.chartProfitFlow}</span>
            </h3>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={profitTrajectoryData}>
                  <XAxis dataKey="month" stroke="#78716c" fontSize={11} />
                  <YAxis stroke="#78716c" fontSize={11} tickFormatter={(val) => `₹${val}`} />
                  <Tooltip formatter={(value: any) => formatINR(Number(value))} />
                  <Line type="monotone" dataKey="Profit" stroke="#059669" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Simple Money Allocation (My Money Donut + Breakdown) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <PieIcon className="w-5 h-5 text-emerald-700" />
              <h2 className="text-lg font-bold text-stone-900">
                {t.finance.allocationTitle} ({formatINR(capital)})
              </h2>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              {language === 'bn'
                ? 'আপনার পুরো পুঁজি একবারে খরচে না দিয়ে ৫টি প্রয়োজনীয় ভাগে সাজান।'
                : 'Balanced allocation to avoid running out of working cash or emergency funds.'}
            </p>
          </div>

          <button
            onClick={handleFetchAiInsight}
            disabled={loadingAi}
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 flex items-center gap-1.5 shadow-2xs active:scale-95 shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{loadingAi ? 'Analyzing...' : 'Get AI Financial Advice'}</span>
          </button>
        </div>

        {/* AI Insight banner if retrieved */}
        {aiInsight && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-xs text-emerald-950 whitespace-pre-line leading-relaxed shadow-xs">
            {aiInsight}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Donut Chart */}
          <div className="md:col-span-5 h-56 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => formatINR(Number(value))} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Allocation Rows */}
          <div className="md:col-span-7 space-y-2.5">
            {allocations.map((item) => {
              const displayName = language === 'bn' ? item.nameBn : language === 'hi' ? item.nameHi : item.name;
              return (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl bg-stone-50 border border-stone-200/70 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <div className="truncate">
                      <div className="font-bold text-stone-900 truncate">{displayName}</div>
                      <div className="text-[11px] text-stone-500 truncate">{item.description}</div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-extrabold text-stone-900 tabular-nums">
                      {formatINR(item.amount)}
                    </div>
                    <div className="text-[10px] text-stone-400">{item.percent}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Professional Pro-Forma Income Statement Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div>
            <h3 className="text-sm font-bold text-stone-900">
              Pro-Forma Monthly Income Statement
            </h3>
            <p className="text-xs text-stone-500">
              Standardized rural micro-enterprise accounting summary
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-stone-100 text-stone-700 rounded-lg">
            NABARD / Bank Format
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-stone-200 text-stone-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-3">Line Item</th>
                <th className="py-2.5 px-3">Classification</th>
                <th className="py-2.5 px-3 text-right">Amount (₹)</th>
                <th className="py-2.5 px-3 text-right">% of Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-800">
              <tr className="bg-stone-50/50 font-bold">
                <td className="py-2.5 px-3">Gross Monthly Revenue</td>
                <td className="py-2.5 px-3 text-stone-500">Sales Inflow</td>
                <td className="py-2.5 px-3 text-right tabular-nums text-emerald-800">{formatINR(financials.estimatedMonthlyRevenue)}</td>
                <td className="py-2.5 px-3 text-right tabular-nums">100.0%</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 pl-6">Cost of Goods Sold (Raw Material)</td>
                <td className="py-2.5 px-3 text-stone-500">Variable COGS</td>
                <td className="py-2.5 px-3 text-right tabular-nums text-stone-600">({formatINR(rawMaterial)})</td>
                <td className="py-2.5 px-3 text-right tabular-nums text-stone-400">
                  {financials.estimatedMonthlyRevenue > 0 ? ((rawMaterial / financials.estimatedMonthlyRevenue) * 100).toFixed(1) : 0}%
                </td>
              </tr>
              <tr className="font-semibold text-stone-900 bg-stone-50/30">
                <td className="py-2.5 px-3">Gross Margin</td>
                <td className="py-2.5 px-3 text-stone-500">Gross Contribution</td>
                <td className="py-2.5 px-3 text-right tabular-nums">{formatINR(financials.estimatedMonthlyRevenue - rawMaterial)}</td>
                <td className="py-2.5 px-3 text-right tabular-nums">
                  {financials.estimatedMonthlyRevenue > 0 ? (((financials.estimatedMonthlyRevenue - rawMaterial) / financials.estimatedMonthlyRevenue) * 100).toFixed(1) : 0}%
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 pl-6">Operating Rent & Space</td>
                <td className="py-2.5 px-3 text-stone-500">Fixed Overhead</td>
                <td className="py-2.5 px-3 text-right tabular-nums text-stone-600">({formatINR(rent)})</td>
                <td className="py-2.5 px-3 text-right tabular-nums text-stone-400">
                  {financials.estimatedMonthlyRevenue > 0 ? ((rent / financials.estimatedMonthlyRevenue) * 100).toFixed(1) : 0}%
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 pl-6">Utilities & Energy</td>
                <td className="py-2.5 px-3 text-stone-500">Semi-Fixed</td>
                <td className="py-2.5 px-3 text-right tabular-nums text-stone-600">({formatINR(utilities)})</td>
                <td className="py-2.5 px-3 text-right tabular-nums text-stone-400">
                  {financials.estimatedMonthlyRevenue > 0 ? ((utilities / financials.estimatedMonthlyRevenue) * 100).toFixed(1) : 0}%
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 pl-6">Freight & Logistics</td>
                <td className="py-2.5 px-3 text-stone-500">Variable Delivery</td>
                <td className="py-2.5 px-3 text-right tabular-nums text-stone-600">({formatINR(transport)})</td>
                <td className="py-2.5 px-3 text-right tabular-nums text-stone-400">
                  {financials.estimatedMonthlyRevenue > 0 ? ((transport / financials.estimatedMonthlyRevenue) * 100).toFixed(1) : 0}%
                </td>
              </tr>
              <tr className="bg-emerald-50/70 font-extrabold text-emerald-950 border-t-2 border-emerald-300">
                <td className="py-3 px-3">Net Operating Profit (EBITDA)</td>
                <td className="py-3 px-3 text-emerald-700">Net Retained Cash</td>
                <td className="py-3 px-3 text-right tabular-nums text-base text-emerald-800">{formatINR(financials.estimatedMonthlyProfit)}</td>
                <td className="py-3 px-3 text-right tabular-nums">{financials.profitMarginPercent}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
