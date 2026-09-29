import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BusinessIdea } from '../types';
import { CheckCircle2, AlertTriangle, ArrowRight, Volume2, TrendingUp, Wallet, Clock, Users } from 'lucide-react';
import { formatINR } from '../services/financialService';

interface BusinessCardProps {
  idea: BusinessIdea;
  isSelected?: boolean;
  onSelect: (idea: BusinessIdea) => void;
}

export const BusinessCard: React.FC<BusinessCardProps> = ({
  idea,
  isSelected,
  onSelect
}) => {
  const { language, t, speak } = useLanguage();

  const displayName = language === 'bn' ? idea.nameBn || idea.name : language === 'hi' ? idea.nameHi || idea.name : idea.name;
  const displayCategory = language === 'bn' ? idea.categoryBn || idea.category : language === 'hi' ? idea.categoryHi || idea.category : idea.category;

  const handleReadAloud = (e: React.MouseEvent) => {
    e.stopPropagation();
    const speech = `${displayName}. ${idea.whySuits}. ${t.discovery.estInvestment}: ${formatINR(idea.minInvestment)} to ${formatINR(idea.maxInvestment)}. ${t.discovery.estProfit}: ${formatINR(idea.potentialMonthlyIncome)} per month.`;
    speak(speech);
  };

  return (
    <div
      className={`rounded-3xl border transition-all p-5 sm:p-6 shadow-xs flex flex-col justify-between ${
        isSelected
          ? 'bg-emerald-50/50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
          : 'bg-white border-stone-200 hover:border-emerald-300 hover:shadow-md'
      }`}
    >
      <div>
        {/* Top kicker and audio trigger */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-lg">
            {displayCategory}
          </span>
          <button
            onClick={handleReadAloud}
            className="p-1.5 text-stone-400 hover:text-emerald-700 hover:bg-stone-100 rounded-lg transition-colors"
            title={t.advisor.listenToAnswer}
          >
            <Volume2 className="w-4 h-4 text-emerald-700" />
          </button>
        </div>

        {/* Business Title */}
        <h3 className="text-lg font-bold text-stone-900 tracking-tight leading-snug">
          {displayName}
        </h3>

        {/* Why this suits user */}
        <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
          {idea.whySuits}
        </p>

        {/* Financial Metrics Strip */}
        <div className="mt-4 grid grid-cols-3 gap-2 p-3 rounded-2xl bg-stone-50 border border-stone-200/70">
          <div>
            <div className="text-[10px] text-stone-500 flex items-center gap-1 font-medium">
              <Wallet className="w-3 h-3 text-stone-400" />
              <span>{t.discovery.estInvestment}</span>
            </div>
            <div className="mt-0.5 text-xs sm:text-sm font-extrabold text-stone-900 tabular-nums">
              {formatINR(idea.minInvestment)}
            </div>
          </div>

          <div>
            <div className="text-[10px] text-stone-500 flex items-center gap-1 font-medium">
              <TrendingUp className="w-3 h-3 text-emerald-600" />
              <span>{t.discovery.estProfit}</span>
            </div>
            <div className="mt-0.5 text-xs sm:text-sm font-extrabold text-emerald-700 tabular-nums">
              {formatINR(idea.potentialMonthlyIncome)}/mo
            </div>
          </div>

          <div>
            <div className="text-[10px] text-stone-500 flex items-center gap-1 font-medium">
              <Clock className="w-3 h-3 text-stone-400" />
              <span>{t.discovery.breakEven}</span>
            </div>
            <div className="mt-0.5 text-xs sm:text-sm font-extrabold text-stone-900 tabular-nums">
              ~{idea.breakEvenMonths} mo
            </div>
          </div>
        </div>

        {/* Key requirements bullet points */}
        <div className="mt-4 space-y-1.5">
          <div className="text-xs font-bold text-stone-900 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.discovery.requirements}</span>
          </div>
          <ul className="text-xs text-stone-600 space-y-1 pl-4 list-disc marker:text-emerald-500">
            {idea.requirements?.slice(0, 3).map((req, idx) => (
              <li key={idx}>{req}</li>
            ))}
          </ul>
        </div>

        {/* Risks */}
        {idea.risks && idea.risks.length > 0 && (
          <div className="mt-3.5 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span className="leading-snug">{idea.risks[0]}</span>
          </div>
        )}

        {/* First Steps */}
        {idea.firstSteps && idea.firstSteps.length > 0 && (
          <div className="mt-3.5 pt-3 border-t border-stone-100">
            <div className="text-xs font-semibold text-stone-700 mb-1">
              {t.discovery.firstSteps}:
            </div>
            <p className="text-xs text-stone-600 italic">
              1. {idea.firstSteps[0]}
            </p>
          </div>
        )}
      </div>

      {/* Select Button */}
      <div className="mt-5 pt-3">
        <button
          onClick={() => onSelect(idea)}
          className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
            isSelected
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-stone-900 text-white hover:bg-emerald-700'
          }`}
        >
          <span>{t.discovery.selectThisBusiness}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
