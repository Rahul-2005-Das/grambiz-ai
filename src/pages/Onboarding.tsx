import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { INDIAN_STATES, DISTRICT_MAP } from '../data/demoMarkets';
import { ArrowRight, ArrowLeft, Check, Volume2, Sparkles, MapPin, Wallet, Briefcase, HelpCircle } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const { language, t, speak } = useLanguage();
  const { user, updateUser, setHasCompletedOnboarding } = useAuth();

  const [step, setStep] = useState(1);
  const totalSteps = 5;

  // Step 1: Location
  const [selectedState, setSelectedState] = useState(user.state || 'West Bengal');
  const [selectedDistrict, setSelectedDistrict] = useState(user.district || 'Nadia');
  const [villageName, setVillageName] = useState(user.villageOrTown || '');

  // Step 2: Status
  const [status, setStatus] = useState<'new' | 'existing'>(user.businessStatus || 'new');

  // Step 3: Capital
  const [capital, setCapital] = useState<number>(user.availableCapital || 25000);
  const [customCapitalInput, setCustomCapitalInput] = useState<string>('');

  // Step 4: Skills & Space
  const [selectedSkills, setSelectedSkills] = useState<string[]>(user.skills || []);
  const [hasSpace, setHasSpace] = useState<boolean | 'not_sure'>(user.hasSpaceOrShop ?? true);

  // Step 5: Business Interest
  const [interestChoice, setInterestChoice] = useState<string>(
    user.selectedBusiness || 'not_sure'
  );

  const availableDistricts = DISTRICT_MAP[selectedState] || DISTRICT_MAP['West Bengal'];

  const capitalOptions = [
    { label: '₹10,000', value: 10000 },
    { label: '₹25,000', value: 25000 },
    { label: '₹50,000', value: 50000 },
    { label: '₹1,00,000+', value: 100000 }
  ];

  const skillOptions = [
    { id: 'agri', label: t.onboarding.skillAgri, icon: '🌾' },
    { id: 'shop', label: t.onboarding.skillShop, icon: '🏪' },
    { id: 'craft', label: t.onboarding.skillCraft, icon: '🧵' },
    { id: 'tech', label: t.onboarding.skillTech, icon: '📱' },
    { id: 'food', label: t.onboarding.skillFood, icon: '🍲' },
    { id: 'service', label: t.onboarding.skillService, icon: '🔧' }
  ];

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Save everything to AuthContext
      updateUser({
        state: selectedState,
        district: selectedDistrict,
        villageOrTown: villageName || 'Local Village',
        businessStatus: status,
        availableCapital: capital,
        skills: selectedSkills,
        hasSpaceOrShop: hasSpace,
        selectedBusiness: interestChoice === 'not_sure' ? 'Recommended by AI' : interestChoice,
        onboardingCompleted: true
      });
      setHasCompletedOnboarding(true);
      onComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const toggleSkill = (skillLabel: string) => {
    if (selectedSkills.includes(skillLabel)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skillLabel));
    } else {
      setSelectedSkills([...selectedSkills, skillLabel]);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col justify-center items-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-xl">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-500 mb-2">
            <span>
              {t.onboarding.step} {step} {t.onboarding.of} {totalSteps}
            </span>
            <span className="text-emerald-700 font-bold">
              {Math.round((step / totalSteps) * 100)}%
            </span>
          </div>
          <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 1: Location */}
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in">
            <div className="text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
                {t.onboarding.qLocationTitle}
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-stone-600">
                {t.onboarding.qLocationSubtitle}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  {t.onboarding.stateLabel}
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => {
                    const st = e.target.value;
                    setSelectedState(st);
                    setSelectedDistrict(DISTRICT_MAP[st]?.[0] || 'Default');
                  }}
                  className="w-full bg-stone-50 border border-stone-300 rounded-2xl p-3.5 text-sm font-semibold text-stone-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
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
                  {t.onboarding.districtLabel}
                </label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-2xl p-3.5 text-sm font-semibold text-stone-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                >
                  {availableDistricts.map((dst) => (
                    <option key={dst} value={dst}>
                      {dst}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  {t.onboarding.villageLabel}
                </label>
                <input
                  type="text"
                  value={villageName}
                  onChange={(e) => setVillageName(e.target.value)}
                  placeholder={language === 'bn' ? 'গ্রাম বা বাজারের নাম লিখুন...' : language === 'hi' ? 'गाँव या कस्बे का नाम लिखें...' : 'Enter village or local market name...'}
                  className="w-full bg-stone-50 border border-stone-300 rounded-2xl p-3.5 text-sm text-stone-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Business Status */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in">
            <div className="text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
                {t.onboarding.qStatusTitle}
              </h2>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setStatus('new')}
                className={`w-full p-5 rounded-2xl border-2 text-left transition-all active:scale-[0.98] ${
                  status === 'new'
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-sm'
                    : 'border-stone-200 hover:border-emerald-300 bg-stone-50/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-base font-bold text-stone-900 flex items-center gap-2">
                    <span>💡</span>
                    <span>{t.onboarding.statusNew}</span>
                  </div>
                  {status === 'new' && (
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
                <p className="mt-1 text-xs text-stone-600 pl-7">
                  {t.onboarding.statusNewDesc}
                </p>
              </button>

              <button
                type="button"
                onClick={() => setStatus('existing')}
                className={`w-full p-5 rounded-2xl border-2 text-left transition-all active:scale-[0.98] ${
                  status === 'existing'
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-sm'
                    : 'border-stone-200 hover:border-emerald-300 bg-stone-50/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-base font-bold text-stone-900 flex items-center gap-2">
                    <span>🏪</span>
                    <span>{t.onboarding.statusExisting}</span>
                  </div>
                  {status === 'existing' && (
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
                <p className="mt-1 text-xs text-stone-600 pl-7">
                  {t.onboarding.statusExistingDesc}
                </p>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Available Capital */}
        {step === 3 && (
          <div className="space-y-5 animate-in fade-in">
            <div className="text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
                {t.onboarding.qCapitalTitle}
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-stone-600">
                {t.onboarding.qCapitalSubtitle}
              </p>
            </div>

            {/* 4 Large Preset Amount Buttons */}
            <div className="grid grid-cols-2 gap-3">
              {capitalOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    setCapital(opt.value);
                    setCustomCapitalInput('');
                  }}
                  className={`p-5 rounded-2xl border-2 font-black text-lg transition-all active:scale-95 ${
                    capital === opt.value && !customCapitalInput
                      ? 'border-emerald-600 bg-emerald-600 text-white shadow-md'
                      : 'border-stone-200 bg-stone-50 text-stone-800 hover:border-emerald-400'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Enter Custom Amount */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                {t.onboarding.capitalAnother}
              </label>
              <input
                type="number"
                value={customCapitalInput}
                onChange={(e) => {
                  setCustomCapitalInput(e.target.value);
                  const parsed = Number(e.target.value);
                  if (parsed > 0) setCapital(parsed);
                }}
                placeholder="₹ 35,000"
                className="w-full bg-stone-50 border border-stone-300 rounded-2xl p-3.5 text-base font-bold text-stone-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
          </div>
        )}

        {/* STEP 4: Skills & Space */}
        {step === 4 && (
          <div className="space-y-5 animate-in fade-in">
            <div className="text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
                {t.onboarding.qSkillsTitle}
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {skillOptions.map((sk) => {
                const isSelected = selectedSkills.includes(sk.label);
                return (
                  <button
                    key={sk.id}
                    type="button"
                    onClick={() => toggleSkill(sk.label)}
                    className={`p-3 rounded-2xl border text-left transition-all active:scale-95 ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                        : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-emerald-300'
                    }`}
                  >
                    <div className="text-xl mb-1">{sk.icon}</div>
                    <div className="text-xs leading-snug">{sk.label}</div>
                  </button>
                );
              })}
            </div>

            {/* Space check */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-stone-800 mb-2">
                {t.onboarding.spaceQuestion}
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setHasSpace(true)}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                    hasSpace === true
                      ? 'border-emerald-600 bg-emerald-600 text-white'
                      : 'border-stone-200 bg-stone-50 text-stone-700'
                  }`}
                >
                  {t.onboarding.spaceYes}
                </button>
                <button
                  type="button"
                  onClick={() => setHasSpace(false)}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                    hasSpace === false
                      ? 'border-emerald-600 bg-emerald-600 text-white'
                      : 'border-stone-200 bg-stone-50 text-stone-700'
                  }`}
                >
                  {t.onboarding.spaceNo}
                </button>
                <button
                  type="button"
                  onClick={() => setHasSpace('not_sure')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                    hasSpace === 'not_sure'
                      ? 'border-emerald-600 bg-emerald-600 text-white'
                      : 'border-stone-200 bg-stone-50 text-stone-700'
                  }`}
                >
                  {t.onboarding.spaceNotSure}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Business Interest or "I Don't Know" */}
        {step === 5 && (
          <div className="space-y-5 animate-in fade-in">
            <div className="text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
                {t.onboarding.qInterestTitle}
              </h2>
            </div>

            <div className="space-y-3">
              {/* Not sure / Recommend for me */}
              <button
                type="button"
                onClick={() => setInterestChoice('not_sure')}
                className={`w-full p-5 rounded-2xl border-2 text-left transition-all active:scale-[0.98] ${
                  interestChoice === 'not_sure'
                    ? 'border-emerald-600 bg-emerald-50 shadow-md ring-2 ring-emerald-500/20'
                    : 'border-stone-200 bg-stone-50 hover:border-emerald-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg">
                    ✨
                  </div>
                  <div>
                    <div className="text-base font-bold text-stone-900">
                      {t.onboarding.interestNotSure}
                    </div>
                    <div className="text-xs text-stone-500">
                      {language === 'bn' ? 'আমার টাকা ও এলাকার চাহিদা দেখে এআই সেরা ব্যবসা বেছে দিক' : 'AI will analyze your money and location to suggest options'}
                    </div>
                  </div>
                </div>
              </button>

              {/* Or popular categories */}
              <button
                type="button"
                onClick={() => setInterestChoice('Dairy / Livestock')}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                  interestChoice === 'Dairy / Livestock'
                    ? 'border-emerald-600 bg-emerald-50'
                    : 'border-stone-200 bg-white'
                }`}
              >
                <div className="text-sm font-bold text-stone-900">🐄 {language === 'bn' ? 'ডেয়ারি ও দুধের ব্যবসা' : 'Dairy & Milk Supply'}</div>
              </button>

              <button
                type="button"
                onClick={() => setInterestChoice('Grocery / Kirana')}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                  interestChoice === 'Grocery / Kirana'
                    ? 'border-emerald-600 bg-emerald-50'
                    : 'border-stone-200 bg-white'
                }`}
              >
                <div className="text-sm font-bold text-stone-900">🏪 {language === 'bn' ? 'মুদি ও নিত্যপ্রয়োজনীয় দোকান' : 'Daily Needs & Grocery'}</div>
              </button>

              <button
                type="button"
                onClick={() => setInterestChoice('Digital Center')}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                  interestChoice === 'Digital Center'
                    ? 'border-emerald-600 bg-emerald-50'
                    : 'border-stone-200 bg-white'
                }`}
              >
                <div className="text-sm font-bold text-stone-900">📱 {language === 'bn' ? 'ডিজিটাল ও মোবাইল সেবা কেন্দ্র' : 'Digital Banking & Kiosk'}</div>
              </button>
            </div>
          </div>
        )}

        {/* Navigation Buttons (Back & Next) */}
        <div className="mt-8 pt-5 border-t border-stone-200 flex items-center justify-between gap-3">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-5 py-3 rounded-xl border border-stone-300 text-stone-700 font-bold text-xs sm:text-sm hover:bg-stone-50 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.onboarding.backBtn}</span>
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={handleNext}
            className="px-7 py-3.5 rounded-xl bg-emerald-600 text-white font-bold text-xs sm:text-sm hover:bg-emerald-700 transition-all shadow-md active:scale-95 flex items-center gap-2"
          >
            <span>{step === totalSteps ? t.onboarding.finishBtn : t.onboarding.nextBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
