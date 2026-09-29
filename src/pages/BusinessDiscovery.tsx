import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { BusinessCard } from '../components/BusinessCard';
import { DEMO_BUSINESS_IDEAS } from '../data/demoBusinesses';
import { api } from '../services/api';
import { BusinessIdea } from '../types';
import { Sparkles, ArrowRight, ArrowLeft, RefreshCw, CheckCircle2 } from 'lucide-react';
import { formatINR } from '../services/financialService';

interface BusinessDiscoveryProps {
  onSelectBusiness: (business: BusinessIdea) => void;
}

export const BusinessDiscovery: React.FC<BusinessDiscoveryProps> = ({ onSelectBusiness }) => {
  const { language, t } = useLanguage();
  const { user, updateUser } = useAuth();

  const [wizardStep, setWizardStep] = useState(1);
  const totalWizardSteps = 7;

  // Question Answers
  const [qLocation, setQLocation] = useState(user.district || 'Nadia');
  const [qCapital, setQCapital] = useState<number>(user.availableCapital || 25000);
  const [qSkills, setQSkills] = useState<string>(user.skills?.[0] || 'not_sure');
  const [qSpace, setQSpace] = useState<string>('yes');
  const [qTimeCommitment, setQTimeCommitment] = useState<'full_time' | 'part_time'>('full_time');
  const [qInterest, setQInterest] = useState<string>('not_sure');
  const [qResources, setQResources] = useState<string>('not_sure');

  const [loading, setLoading] = useState(false);
  const [recommendedIdeas, setRecommendedIdeas] = useState<BusinessIdea[]>(DEMO_BUSINESS_IDEAS.slice(0, 4));
  const [hasGenerated, setHasGenerated] = useState(false);

  const notSureText = language === 'bn' ? 'জানি না / সেরা বিকল্প দিন' : language === 'hi' ? 'पता नहीं / सबसे अच्छा बताएं' : 'Not Sure / Recommend Best';

  const handleGenerateIdeas = async () => {
    setLoading(true);
    setHasGenerated(true);

    try {
      const res = await api.getBusinessRecommendations({
        location: { state: user.state || 'West Bengal', district: qLocation },
        capital: qCapital,
        skills: [qSkills],
        hasSpace: qSpace,
        workPref: qTimeCommitment,
        language
      });

      if (res && res.ideas && res.ideas.length > 0) {
        // Map to BusinessIdea format with fallback IDs
        const mapped: BusinessIdea[] = res.ideas.map((item: any, idx: number) => ({
          id: `rec_${idx}_${Date.now()}`,
          name: item.name,
          nameBn: item.name,
          nameHi: item.name,
          category: item.category || 'Retail',
          categoryBn: item.category || 'খুচরো ব্যবসা',
          categoryHi: item.category || 'खुदरा व्यापार',
          minInvestment: item.minInvestment || Math.round(qCapital * 0.8),
          maxInvestment: item.maxInvestment || Math.round(qCapital * 1.2),
          whySuits: item.whySuits || 'Matches your budget and local market opportunities.',
          requirements: item.requirements || ['Basic tools', 'Initial stock', 'Space/Table'],
          targetCustomers: item.targetCustomers || 'Local villagers and passersby',
          potentialMonthlyIncome: item.potentialMonthlyIncome || Math.round(qCapital * 0.4),
          breakEvenMonths: item.breakEvenMonths || 4,
          risks: item.risks || ['Seasonal dips', 'Customer credit risk'],
          firstSteps: item.firstSteps || ['Check competitor pricing', 'Source wholesale materials', 'Inform neighbors']
        }));
        setRecommendedIdeas(mapped);
      } else {
        // Fallback to demo items matching budget
        setRecommendedIdeas(DEMO_BUSINESS_IDEAS.filter((b) => b.minInvestment <= qCapital * 1.3));
      }
    } catch (e) {
      console.error(e);
      setRecommendedIdeas(DEMO_BUSINESS_IDEAS.slice(0, 4));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>{language === 'bn' ? 'এআই নির্দেশিত ব্যবসা অনুসন্ধান' : 'AI Business Discovery'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          {t.discovery.title}
        </h1>
        <p className="mt-1 text-sm text-stone-600 max-w-2xl">
          {t.discovery.subtitle}
        </p>
      </div>

      {/* 7-Step Interactive Card Question Wizard */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-100">
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg">
            Question {wizardStep} of {totalWizardSteps}
          </span>
          <div className="flex gap-1">
            {Array.from({ length: totalWizardSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 w-6 rounded-full transition-colors ${
                  i + 1 <= wizardStep ? 'bg-emerald-600' : 'bg-stone-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Q1: Where do you live? */}
        {wizardStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-stone-900">
              {t.discovery.step1}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {['Nadia', 'Murshidabad', 'Purba Bardhaman', 'Varanasi', 'Muzaffarpur', 'Jaipur Rural'].map((dist) => (
                <button
                  key={dist}
                  type="button"
                  onClick={() => setQLocation(dist)}
                  className={`p-4 rounded-2xl border text-sm font-bold text-left transition-all ${
                    qLocation === dist
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-2xs'
                      : 'border-stone-200 bg-stone-50 text-stone-800 hover:border-emerald-300'
                  }`}
                >
                  📍 {dist}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Q2: How much money can you invest? */}
        {wizardStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-stone-900">
              {t.discovery.step2}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[15000, 25000, 50000, 100000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setQCapital(amt)}
                  className={`p-5 rounded-2xl border font-black text-base transition-all ${
                    qCapital === amt
                      ? 'border-emerald-600 bg-emerald-600 text-white shadow-sm'
                      : 'border-stone-200 bg-stone-50 text-stone-900 hover:border-emerald-400'
                  }`}
                >
                  {formatINR(amt)}
                </button>
              ))}
            </div>
            <div className="pt-2">
              <label className="block text-xs font-semibold text-stone-600 mb-1">
                {t.onboarding.capitalAnother}
              </label>
              <input
                type="number"
                value={qCapital}
                onChange={(e) => setQCapital(Number(e.target.value) || 0)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-sm font-bold"
              />
            </div>
          </div>
        )}

        {/* Q3: What skills do you have? */}
        {wizardStep === 3 && (
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-stone-900">
              {t.discovery.step3}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {[
                { id: 'dairy', label: 'Cattle / Dairy / Farming', icon: '🐄' },
                { id: 'shop', label: 'Retail / Shopkeeping', icon: '🏪' },
                { id: 'tailoring', label: 'Tailoring / Sewing', icon: '🧵' },
                { id: 'tech', label: 'Mobile / Digital tools', icon: '📱' },
                { id: 'cooking', label: 'Cooking / Food preparation', icon: '🍲' },
                { id: 'not_sure', label: notSureText, icon: '❓' }
              ].map((sk) => (
                <button
                  key={sk.id}
                  type="button"
                  onClick={() => setQSkills(sk.label)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    qSkills === sk.label
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                      : 'border-stone-200 bg-stone-50 text-stone-800 hover:border-emerald-300'
                  }`}
                >
                  <span className="text-xl mb-1 block">{sk.icon}</span>
                  <span className="text-xs leading-tight">{sk.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Q4: Space */}
        {wizardStep === 4 && (
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-stone-900">
              {t.discovery.step4}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'yes', label: 'Yes, I have an owned shop or yard space', icon: '🏠' },
                { id: 'no', label: 'No, home-based or will rent small spot', icon: '⛺' },
                { id: 'not_sure', label: notSureText, icon: '❓' }
              ].map((sp) => (
                <button
                  key={sp.id}
                  type="button"
                  onClick={() => setQSpace(sp.id)}
                  className={`p-5 rounded-2xl border text-left transition-all ${
                    qSpace === sp.id
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold shadow-2xs'
                      : 'border-stone-200 bg-stone-50 text-stone-800 hover:border-emerald-300'
                  }`}
                >
                  <span className="text-2xl mb-1.5 block">{sp.icon}</span>
                  <span className="text-xs leading-snug">{sp.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Q5: Full-time or Part-time */}
        {wizardStep === 5 && (
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-stone-900">
              {t.discovery.step5}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setQTimeCommitment('full_time')}
                className={`p-6 rounded-2xl border text-center transition-all ${
                  qTimeCommitment === 'full_time'
                    ? 'border-emerald-600 bg-emerald-600 text-white font-bold shadow-sm'
                    : 'border-stone-200 bg-stone-50 text-stone-800'
                }`}
              >
                <div className="text-2xl mb-1">⏱️</div>
                <div className="text-sm font-bold">{t.discovery.fullTime}</div>
                <div className="text-xs opacity-80 mt-1">8-10 hours / day</div>
              </button>

              <button
                type="button"
                onClick={() => setQTimeCommitment('part_time')}
                className={`p-6 rounded-2xl border text-center transition-all ${
                  qTimeCommitment === 'part_time'
                    ? 'border-emerald-600 bg-emerald-600 text-white font-bold shadow-sm'
                    : 'border-stone-200 bg-stone-50 text-stone-800'
                }`}
              >
                <div className="text-2xl mb-1">🌤️</div>
                <div className="text-sm font-bold">{t.discovery.partTime}</div>
                <div className="text-xs opacity-80 mt-1">3-4 hours / day</div>
              </button>
            </div>
          </div>
        )}

        {/* Q6: Work Preference */}
        {wizardStep === 6 && (
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-stone-900">
              {t.discovery.step6}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {[
                'Food & Agro Processing',
                'Animal Husbandry & Dairy',
                'Retail Goods & Grocery',
                'Repair & Mechanical',
                'Textiles & Handicrafts',
                notSureText
              ].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setQInterest(item)}
                  className={`p-4 rounded-2xl border text-xs font-bold text-left transition-all ${
                    qInterest === item
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                      : 'border-stone-200 bg-stone-50 text-stone-800 hover:border-emerald-300'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Q7: Nearby Resources */}
        {wizardStep === 7 && (
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-stone-900">
              {t.discovery.step7}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {[
                'Abundant fresh milk & green fodder',
                'Surplus grains & raw spices',
                'Frequent bus stop / weekly market crowd',
                'Raw bamboo or sal leaves',
                'High student & pension withdrawal crowd',
                notSureText
              ].map((resItem) => (
                <button
                  key={resItem}
                  type="button"
                  onClick={() => setQResources(resItem)}
                  className={`p-4 rounded-2xl border text-xs font-bold text-left transition-all ${
                    qResources === resItem
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                      : 'border-stone-200 bg-stone-50 text-stone-800 hover:border-emerald-300'
                  }`}
                >
                  {resItem}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Wizard Navigation Footer */}
        <div className="mt-8 pt-5 border-t border-stone-200 flex items-center justify-between">
          {wizardStep > 1 ? (
            <button
              type="button"
              onClick={() => setWizardStep(wizardStep - 1)}
              className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-bold text-xs hover:bg-stone-50 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {wizardStep < totalWizardSteps ? (
            <button
              type="button"
              onClick={() => setWizardStep(wizardStep + 1)}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 flex items-center gap-1.5 shadow-xs"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleGenerateIdeas}
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 shadow-md flex items-center gap-2 active:scale-95"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{t.discovery.analyzingText}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{t.discovery.findBusinessesBtn}</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Recommended Business Ideas Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-xl font-extrabold text-stone-900">
              {t.discovery.resultsTitle}
            </h2>
            <p className="text-xs text-stone-500">
              {t.discovery.resultsSubtitle.replace('{capital}', formatINR(qCapital)).replace('{district}', qLocation)}
            </p>
          </div>
          <button
            onClick={handleGenerateIdeas}
            disabled={loading}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 p-2 rounded-lg hover:bg-emerald-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Regenerate</span>
          </button>
        </div>

        {/* Disclaimer banner */}
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-[11px] text-amber-900 leading-relaxed">
          ℹ️ {t.disclaimerNote}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendedIdeas.map((idea) => (
            <BusinessCard
              key={idea.id}
              idea={idea}
              isSelected={user.selectedBusiness === idea.name}
              onSelect={(selected) => {
                updateUser({
                  selectedBusiness: selected.name,
                  businessCategory: selected.category
                });
                onSelectBusiness(selected);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
