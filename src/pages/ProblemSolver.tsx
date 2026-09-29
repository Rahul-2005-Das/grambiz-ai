import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import {
  HelpCircle,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Eye,
  Volume2
} from 'lucide-react';

export const ProblemSolver: React.FC = () => {
  const { language, t, speak } = useLanguage();
  const { user } = useAuth();

  const [selectedProblem, setSelectedProblem] = useState<string>('p1');
  const [loading, setLoading] = useState(false);
  const [solution, setSolution] = useState<any>({
    diagnosis: language === 'bn'
      ? 'দোকানে বিক্রি কমার মূল কারণ সাধারণত পরিবর্তিত গ্রাহক চাহিদা, দুর্বল পরিচিতি বা পাইকারি দামের অমিল।'
      : 'Low sales in rural shops are usually caused by either lack of daily visibility, stock mismatch with neighborhood needs, or uncompetitive packaging sizes.',
    threeActions: language === 'bn' ? [
      'সবচেয়ে বেশি বিক্রি হওয়া ৫টি পণ্যের একটি সুন্দর বাইরে দৃশ্যমান ডিসপ্লে বোর্ড বানান।',
      '৫টি পরিচিত পরিবারের সাথে নম্রভাবে কথা বলুন তারা কোন জিনিস অন্য দোকান থেকে নিচ্ছেন।',
      'ছোট ₹১০ এবং ₹২০ টাকার সস্তা প্যাকেট বেশি করে রাখুন।'
    ] : [
      'Create an eye-level storefront basket displaying your top 5 fast-moving daily items.',
      'Politely ask 3 loyal families what items they currently travel to the town market to buy.',
      'Stock smaller ₹10-₹20 pack sizes to encourage daily impulse cash purchases.'
    ],
    watchOut: language === 'bn'
      ? 'বিক্রি বাড়ানোর জন্য অতিরিক্ত বাকিতে মাল দেবেন না।'
      : 'Do not offer excessive credit (udhar) just to temporarily boost daily sales numbers.',
    firstStep: language === 'bn'
      ? 'আজ বিকালেই দোকানের সামনের সাজসজ্জা পরিষ্কার করুন যাতে দূর থেকে মাল দেখা যায়।'
      : 'Rearrange your front shop counter this evening so passersby see fresh stock clearly.'
  });

  const problemsList = [
    { id: 'p1', label: t.problem.p1, icon: '📉' },
    { id: 'p2', label: t.problem.p2, icon: '💸' },
    { id: 'p3', label: t.problem.p3, icon: '⏳' },
    { id: 'p4', label: t.problem.p4, icon: '📦' },
    { id: 'p5', label: t.problem.p5, icon: '💳' },
    { id: 'p6', label: t.problem.p6, icon: '🚶' },
    { id: 'p7', label: t.problem.p7, icon: '🤔' }
  ];

  const handleSolve = async (problemId: string) => {
    setSelectedProblem(problemId);
    setLoading(true);

    const problemObj = problemsList.find((p) => p.id === problemId);
    const query = `Problem: ${problemObj?.label}. Provide diagnosis, 3 actions, things to watch, and immediate next step for rural enterprise.`;

    try {
      const res = await api.askAdvisor(query, language, user);
      if (res && res.text) {
        setSolution({
          diagnosis: res.text.split('\n')[0] || 'AI Diagnosis prepared.',
          threeActions: [
            'Action 1: Implement direct customer engagement today',
            'Action 2: Tighten cash handling and inspect supplier rates',
            'Action 3: Offer small bundle promotions'
          ],
          watchOut: 'Never compromise product quality or take high-interest unverified private loans.',
          firstStep: 'Speak to 2 experienced local business peers before making heavy financial changes.'
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleReadAloud = () => {
    const text = `Solution for business problem. Diagnosis: ${solution.diagnosis}. Three actions: ${solution.threeActions.join('. ')}. First step: ${solution.firstStep}.`;
    speak(text);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 font-sans">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>{language === 'bn' ? 'সরাসরি এআই সমস্যা সমাধান' : 'Rapid Business Doctor'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            {t.problem.title}
          </h1>
          <p className="mt-1 text-sm text-stone-600 max-w-xl">
            {t.problem.subtitle}
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

      {/* 7 Problem Selection Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {problemsList.map((p) => (
          <button
            key={p.id}
            onClick={() => handleSolve(p.id)}
            className={`p-4 rounded-2xl border text-left transition-all active:scale-[0.98] flex items-center gap-3 ${
              selectedProblem === p.id
                ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-xs ring-2 ring-emerald-500/20'
                : 'border-stone-200 bg-white text-stone-800 hover:border-emerald-300'
            }`}
          >
            <span className="text-2xl">{p.icon}</span>
            <span className="text-xs sm:text-sm font-semibold">{p.label}</span>
          </button>
        ))}
      </div>

      {/* AI Solution Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2 text-sm font-bold text-stone-900">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>AI Solution & Recovery Action Plan</span>
          </div>
          {loading && (
            <span className="text-xs text-stone-400 flex items-center gap-1">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing...</span>
            </span>
          )}
        </div>

        {/* 1. Diagnosis */}
        <div>
          <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
            1. {t.problem.diagnosisTitle}
          </h3>
          <p className="text-xs sm:text-sm text-stone-800 leading-relaxed bg-stone-50 p-4 rounded-2xl border border-stone-200/60">
            {solution.diagnosis}
          </p>
        </div>

        {/* 2. 3 Immediate Actions */}
        <div>
          <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
            2. {t.problem.threeFixesTitle}
          </h3>
          <div className="space-y-2.5">
            {solution.threeActions.map((act: string, idx: number) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs sm:text-sm text-emerald-950 flex items-start gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <span>{act}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Things to Watch Out */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block mb-0.5">{t.problem.watchOutTitle}:</span>
            <span>{solution.watchOut}</span>
          </div>
        </div>

        {/* 4. First Immediate Step */}
        <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-xs text-teal-950 flex items-start gap-2.5">
          <ArrowRight className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block mb-0.5">{t.problem.firstImmediateStep}</span>
            <span>{solution.firstStep}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
