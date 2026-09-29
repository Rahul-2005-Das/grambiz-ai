import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { BusinessPlanContent } from '../types';
import { formatINR } from '../services/financialService';
import {
  FileText,
  Printer,
  Copy,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Building,
  Target,
  Calendar,
  Volume2
} from 'lucide-react';

export const BusinessPlan: React.FC = () => {
  const { language, t, speak } = useLanguage();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Business inputs for plan
  const [businessTitle, setBusinessTitle] = useState(user.selectedBusiness || 'Mini Dairy & Fresh Milk Collection');
  const [customLocation, setCustomLocation] = useState(`${user.villageOrTown || 'Ranaghat'}, ${user.district}, ${user.state}`);
  const [investment, setInvestment] = useState(user.availableCapital || 35000);

  const [plan, setPlan] = useState<BusinessPlanContent | null>({
    businessName: businessTitle,
    location: customLocation,
    executiveSummary: language === 'bn'
      ? `${customLocation} এলাকায় স্থানীয় বাজার ও নিয়মিত পরিবারের খাঁটি দুধ ও ছানার চাহিদা মেটাতে এই ব্যবসাটি শুরু করার পরিকল্পনা। এককালীন প্রাথমিক বিনিয়োগ আনুমানিক ₹${investment} এবং প্রত্যাশিত মাসিক নিট লাভ ₹১২,০০০।`
      : `${customLocation} enterprise addressing daily local demand for fresh dairy and chhana sweets, with estimated setup of ${formatINR(investment)} and healthy projected net profit.`,
    businessDescription: 'Providing hygienic, fresh daily cow milk and cottage cheese directly to households and local sweet confectioners with transparent pricing.',
    marketOpportunity: 'Currently, sweet shops and daily buyers rely on distant middlemen with uncertain fat content and irregular delivery timings.',
    targetCustomers: 'Neighborhood families (60%), local Bengali sweet confectioners (25%), and morning tea stalls (15%).',
    productsAndServices: [
      'Fresh tested whole cow milk (morning & evening distribution)',
      'Fresh soft chhana (cottage cheese base) for regional sweet clusters',
      'Desi ghee & clarified butter during festive wedding seasons'
    ],
    operationsPlan: 'Early morning milking and collection at 5:30 AM; door deliveries completed by 7:30 AM. Evening delivery batch at 5:00 PM. Weekly bulk veterinary feed purchase.',
    marketingStrategy: 'Personal introduction to 10 village sweet makers with free 1L trial; distribution of printed phone contact cards across local women SHG networks.',
    financialOverview: {
      startupCost: investment,
      monthlyRunningCost: 16000,
      expectedRevenue: 28000,
      expectedNetProfit: 12000
    },
    risksAndMitigation: [
      'Cattle disease or seasonal tick fever: strictly maintain mandatory vaccination calendar and emergency ₹5,000 veterinary fund.',
      'Uncontrolled customer credit (udhar): strictly limit customer credit to 7 days maximum with token deposit.'
    ],
    growthMilestones: [
      { period: 'Month 1', goal: 'Secure first 25 loyal morning milk buyers and 2 sweet shop contracts' },
      { period: 'Month 3', goal: 'Achieve stable positive monthly net profit above ₹10,000' },
      { period: 'Month 6', goal: 'Acquire 2nd high-yield cow from retained operational earnings' }
    ]
  });

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await api.generateBusinessPlan(
        {
          selectedBusiness: businessTitle,
          villageOrTown: customLocation.split(',')[0] || user.villageOrTown,
          district: user.district,
          state: user.state
        },
        {
          totalInitialInvestment: investment,
          totalMonthlyExpenses: Math.round(investment * 0.45),
          estimatedMonthlyRevenue: Math.round(investment * 0.8),
          estimatedMonthlyProfit: Math.round(investment * 0.35)
        },
        language
      );

      if (res && res.plan) {
        setPlan(res.plan);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    if (!plan) return;
    const textToCopy = `BUSINESS PLAN: ${plan.businessName}\nLocation: ${plan.location}\n\nEXECUTIVE SUMMARY:\n${plan.executiveSummary}\n\nTARGET CUSTOMERS:\n${plan.targetCustomers}\n\nOPERATIONS:\n${plan.operationsPlan}\n\nFINANCIAL OVERVIEW:\nStartup Cost: ${formatINR(plan.financialOverview.startupCost)}\nMonthly Running Cost: ${formatINR(plan.financialOverview.monthlyRunningCost)}\nExpected Monthly Net Profit: ${formatINR(plan.financialOverview.expectedNetProfit)}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 font-sans print:max-w-none print:p-0">
      {/* Header (hidden during print) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold mb-3">
            <FileText className="w-3.5 h-3.5 text-purple-600" />
            <span>{language === 'bn' ? 'সহজ ব্যবসা খসড়া' : 'Plain-Language Business Plan'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            {t.businessPlan.title}
          </h1>
          <p className="mt-1 text-sm text-stone-600 max-w-xl">
            {t.businessPlan.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>{t.businessPlan.printBtn}</span>
          </button>
          <button
            onClick={handleCopy}
            className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center gap-1.5 border border-stone-300 transition-all active:scale-95"
          >
            <Copy className="w-4 h-4" />
            <span>{copied ? 'Copied!' : t.businessPlan.copyBtn}</span>
          </button>
        </div>
      </div>

      {/* Generator Controls (hidden during print) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-xs space-y-4 print:hidden">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Business Name / Concept
            </label>
            <input
              type="text"
              value={businessTitle}
              onChange={(e) => setBusinessTitle(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs sm:text-sm font-semibold text-stone-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Location
            </label>
            <input
              type="text"
              value={customLocation}
              onChange={(e) => setCustomLocation(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs sm:text-sm text-stone-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Initial Investment (₹)
            </label>
            <input
              type="number"
              value={investment}
              onChange={(e) => setInvestment(Number(e.target.value) || 0)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs sm:text-sm font-bold text-stone-900"
            />
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs sm:text-sm hover:bg-emerald-700 transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>{t.businessPlan.generating}</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>{t.businessPlan.generateBtn}</span>
            </>
          )}
        </button>
      </div>

      {/* The Printable Business Plan Document */}
      {plan && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm space-y-6 print:border-none print:shadow-none print:p-0">
          {/* Document Header */}
          <div className="pb-6 border-b border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-widest block mb-1">
                GramBiz AI · Micro-Enterprise Plan
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-950">
                {plan.businessName}
              </h2>
              <p className="text-xs text-stone-500 mt-1 flex items-center gap-1 font-medium">
                <span>📍 {plan.location}</span>
                <span>· Date: {new Date().toLocaleDateString()}</span>
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 text-right shrink-0">
              <span className="text-[10px] text-stone-400 uppercase font-bold block">Planned Startup Outlay</span>
              <span className="text-lg font-black text-emerald-800 tabular-nums">
                {formatINR(plan.financialOverview.startupCost)}
              </span>
            </div>
          </div>

          {/* 1. Executive Summary */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
              1. {t.businessPlan.execSummary}
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed bg-stone-50 p-4 rounded-2xl border border-stone-200/60">
              {plan.executiveSummary}
            </p>
          </div>

          {/* 2. Business Description & Market Opportunity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/60">
              <h3 className="text-xs font-bold text-stone-900 mb-1.5 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-stone-600" />
                <span>Description</span>
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {plan.businessDescription}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/60">
              <h3 className="text-xs font-bold text-stone-900 mb-1.5 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.businessPlan.marketOpp}</span>
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {plan.marketOpportunity}
              </p>
            </div>
          </div>

          {/* 3. Products & Services */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
              2. Products & Offerings
            </h3>
            <div className="space-y-1.5">
              {plan.productsAndServices.map((prod, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-stone-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{prod}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Target Customers & Marketing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                3. {t.businessPlan.targetCust}
              </h3>
              <p className="text-xs text-stone-700 leading-relaxed p-3.5 rounded-2xl bg-stone-50 border border-stone-200/60">
                {plan.targetCustomers}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                4. {t.businessPlan.marketingPlan}
              </h3>
              <p className="text-xs text-stone-700 leading-relaxed p-3.5 rounded-2xl bg-stone-50 border border-stone-200/60">
                {plan.marketingStrategy}
              </p>
            </div>
          </div>

          {/* 5. Day to Day Operations */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
              5. {t.businessPlan.opsPlan}
            </h3>
            <p className="text-xs text-stone-700 leading-relaxed p-3.5 rounded-2xl bg-stone-50 border border-stone-200/60">
              {plan.operationsPlan}
            </p>
          </div>

          {/* 6. Financial Overview Strip */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
              6. {t.businessPlan.financialPlan}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-stone-900">
              <div>
                <span className="text-[10px] text-stone-500 font-bold block">Startup Outlay</span>
                <span className="text-sm font-black tabular-nums">{formatINR(plan.financialOverview.startupCost)}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-500 font-bold block">Monthly Costs</span>
                <span className="text-sm font-black tabular-nums">{formatINR(plan.financialOverview.monthlyRunningCost)}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-500 font-bold block">Projected Revenue</span>
                <span className="text-sm font-black tabular-nums">{formatINR(plan.financialOverview.expectedRevenue)}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-500 font-bold block">Est. Net Profit</span>
                <span className="text-sm font-black text-emerald-800 tabular-nums">
                  {formatINR(plan.financialOverview.expectedNetProfit)}/mo
                </span>
              </div>
            </div>
          </div>

          {/* 7. Risks & Mitigation */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
              7. {t.businessPlan.risksMitigation}
            </h3>
            <div className="space-y-2">
              {plan.risksAndMitigation.map((risk, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{risk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 8. 6-Month Milestones */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
              8. {t.businessPlan.growthGoals}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {plan.growthMilestones.map((m, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-stone-50 border border-stone-200 text-xs">
                  <div className="font-bold text-emerald-800 mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{m.period}</span>
                  </div>
                  <p className="text-stone-600">{m.goal}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 9. Formal Bank / SHG Submission Endorsement Block */}
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <span className="font-bold text-stone-800 uppercase tracking-wider text-[11px]">
                Applicant Declaration & Bank Endorsement
              </span>
              <span className="text-[10px] text-stone-400">GramBiz AI Form DPR-01</span>
            </div>
            <p className="text-stone-600 leading-relaxed text-[11px]">
              I hereby declare that the estimates, location details, and proposed equipment list submitted in this project report represent true projections of my planned micro-enterprise. I understand that actual loan sanction or subsidy disbursement remains subject to official bank appraisal and documentation.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 text-stone-700">
              <div>
                <span className="text-[10px] text-stone-400 block">Applicant Signature / Thumb</span>
                <div className="mt-4 border-b border-stone-300 w-36 h-6" />
                <span className="text-[10px] font-semibold text-stone-600 mt-1 block">{user.name}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 block">SHG / Bank Representative</span>
                <div className="mt-4 border-b border-stone-300 w-36 h-6" />
                <span className="text-[10px] text-stone-500 mt-1 block">Seal & Verification</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-[10px] text-stone-400 block">Date of Application</span>
                <div className="mt-4 border-b border-stone-300 w-36 h-6" />
                <span className="text-[10px] text-stone-500 mt-1 block">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Bottom sign-off & disclaimer */}
          <div className="pt-6 border-t border-stone-200 text-center text-xs text-stone-400 leading-relaxed">
            {t.disclaimerNote}
          </div>
        </div>
      )}
    </div>
  );
};
