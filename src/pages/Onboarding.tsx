import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { INDIAN_STATES, DISTRICT_MAP } from '../data/demoMarkets';
import { DEMO_BUSINESS_IDEAS } from '../data/demoBusinesses';
import { BusinessIdea } from '../types';
import { formatINR } from '../services/financialService';
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Volume2,
  Sparkles,
  MapPin,
  Wallet,
  Briefcase,
  HelpCircle,
  CheckCircle2,
  Lightbulb
} from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const { language, t, speak } = useLanguage();
  const { user, updateUser, setHasCompletedOnboarding } = useAuth();

  // Wizard Steps:
  // Step 1: Capital: "How much money do you have to start?"
  // Step 2: Location: "Where do you want to do business?"
  // Step 3: Business Selection: "What business do you want to do?"
  // Step 4 (Conditional): If "Not Sure" -> Deep Persona Questions (Skills, Experience, Space, Full/Part-time)
  // Step 5 (Conditional): AI Recommended 3-5 businesses
  const [step, setStep] = useState<number>(1);

  // Form State:
  // Q1: Capital
  const [capital, setCapital] = useState<number>(user.availableCapital || 25000);
  const [customCapitalInput, setCustomCapitalInput] = useState<string>('');
  const [isCustomCapital, setIsCustomCapital] = useState<boolean>(false);

  // Q2: Location
  const [selectedState, setSelectedState] = useState<string>(user.state || 'West Bengal');
  const [selectedDistrict, setSelectedDistrict] = useState<string>(user.district || 'Nadia');
  const [selectedBlock, setSelectedBlock] = useState<string>('Ranaghat');
  const [villageName, setVillageName] = useState<string>(user.villageOrTown || '');

  // Q3: Business Category
  const [selectedCategory, setSelectedCategory] = useState<string>(
    user.businessCategory || 'Dairy'
  );
  const [isNotSure, setIsNotSure] = useState<boolean>(false);

  // Step 4 (Deep Persona Questions if "Not Sure")
  const [skills, setSkills] = useState<string[]>(user.skills || []);
  const [experienceLevel, setExperienceLevel] = useState<'beginner' | 'moderate' | 'experienced'>('beginner');
  const [hasSpace, setHasSpace] = useState<boolean | 'not_sure'>(user.hasSpaceOrShop ?? true);
  const [workPreference, setWorkPreference] = useState<'full_time' | 'part_time'>('full_time');

  // Step 5 (AI Recommendations)
  const [recommendedBusinesses, setRecommendedBusinesses] = useState<BusinessIdea[]>([]);
  const [chosenBusiness, setChosenBusiness] = useState<string>(user.selectedBusiness || 'Mini Dairy & Fresh Milk Collection');

  const availableDistricts = DISTRICT_MAP[selectedState] || DISTRICT_MAP['West Bengal'];

  const capitalOptions = [
    { label: '₹10,000', value: 10000 },
    { label: '₹25,000', value: 25000 },
    { label: '₹50,000', value: 50000 },
    { label: '₹1,00,000+', value: 100000 }
  ];

  const businessCategoriesList = [
    { id: 'Agriculture', labelEn: 'Agriculture', labelBn: 'কৃষি ও চাষাবাদ', labelHi: 'कृषि व फसल', icon: '🌾' },
    { id: 'Dairy', labelEn: 'Dairy', labelBn: 'ডেয়ারি ও দুগ্ধ ব্যবসা', labelHi: 'डेयरी व दूध', icon: '🐄' },
    { id: 'Fishery', labelEn: 'Fishery', labelBn: 'মৎস্য চাষ', labelHi: 'मत्स्य पालन', icon: '🐟' },
    { id: 'Poultry', labelEn: 'Poultry', labelBn: 'পোল্ট্রি ও হাঁস-মুরগি', labelHi: 'पोल्ट्री व मुर्गी', icon: '🐔' },
    { id: 'Retail', labelEn: 'Retail', labelBn: 'খুচরা দোকান / মুদি', labelHi: 'किराना व खुदरा', icon: '🏪' },
    { id: 'Food', labelEn: 'Food', labelBn: 'খাদ্য প্রক্রিয়াকরণ ও মিষ্টি', labelHi: 'खाद्य व मिठाई', icon: '🍲' },
    { id: 'Textile', labelEn: 'Textile / Tailoring', labelBn: 'দর্জি ও পোশাক তৈরি', labelHi: 'सिलाई व कपड़ा', icon: '🧵' },
    { id: 'Service', labelEn: 'Service', labelBn: 'মেরামত ও সার্ভিসিং', labelHi: 'मरम्मत व सेवा', icon: '🔧' },
    { id: 'Other', labelEn: 'Other', labelBn: 'অন্যান্য গ্রামীণ ব্যবসা', labelHi: 'अन्य व्यवसाय', icon: '📦' },
    { id: 'Not Sure', labelEn: 'Not Sure (Help Me Choose)', labelBn: 'নিশ্চিত নই (আমাকে সাহায্য করুন)', labelHi: 'निश्चित नहीं (सुझाव दें)', icon: '❓' }
  ];

  const skillOptions = [
    { id: 'agri', labelEn: 'Farming / Animal care', labelBn: 'চাষবাস ও পশু পালন', labelHi: 'खेती व पशुपालन', icon: '🌾' },
    { id: 'shop', labelEn: 'Selling / Shopkeeping', labelBn: 'দোকানদারি ও হিসাব', labelHi: 'दुकान व हिसाब', icon: '🏪' },
    { id: 'craft', labelEn: 'Sewing / Handicraft', labelBn: 'দর্জি বা হস্তশিল্প', labelHi: 'सिलाई व हस्तकला', icon: '🧵' },
    { id: 'tech', labelEn: 'Mobile / Digital tools', labelBn: 'মোবাইল ও ডিজিটাল', labelHi: 'मोबाइल व डिजिटल', icon: '📱' },
    { id: 'food', labelEn: 'Cooking / Spices / Food', labelBn: 'রান্না, মশলা বা মিষ্টি', labelHi: 'रसोई व मसाला', icon: '🍲' },
    { id: 'driving', labelEn: 'Driving / Transport', labelBn: 'গাড়ি চালানো বা ডেলিভারি', labelHi: 'ड्राइविंग व डिलीवरी', icon: '🚚' }
  ];

  const handleReadQuestion = () => {
    let text = '';
    if (step === 1) {
      text = language === 'bn'
        ? 'প্রশ্ন ১: আপনার কাছে ব্যবসা শুরু করার জন্য কত টাকা আছে?'
        : language === 'hi'
        ? 'प्रश्न 1: आपके पास व्यापार शुरू करने के लिए कितना पैसा है?'
        : 'Question 1: How much money do you have to start the business?';
    } else if (step === 2) {
      text = language === 'bn'
        ? 'প্রশ্ন ২: আপনি কোথায় ব্যবসা করতে চান?'
        : language === 'hi'
        ? 'प्रश्न 2: आप कहाँ व्यापार करना चाहते हैं?'
        : 'Question 2: Where do you want to do business?';
    } else if (step === 3) {
      text = language === 'bn'
        ? 'প্রশ্ন ৩: আপনি কোন ব্যবসা করতে চান?'
        : language === 'hi'
        ? 'प्रश्न 3: आप कौन सा व्यापार करना चाहते हैं?'
        : 'Question 3: What business do you want to do?';
    } else if (step === 4) {
      text = language === 'bn'
        ? 'আপনার অভিজ্ঞতা, দক্ষতা এবং উপলব্ধ জায়গা সম্পর্কে বলুন।'
        : language === 'hi'
        ? 'अपने अनुभव, कौशल और उपलब्ध जगह के बारे में बताएं।'
        : 'Tell us about your skills, available space, and experience.';
    } else {
      text = language === 'bn'
        ? 'আপনার জন্য প্রস্তাবিত সেরা ৩টি গ্রামীণ ব্যবসা।'
        : language === 'hi'
        ? 'आपके लिए अनुशंसित शीर्ष 3 ग्रामीण व्यवसाय।'
        : 'Top recommended rural businesses tailored for you.';
    }
    speak(text);
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      if (isNotSure || selectedCategory === 'Not Sure') {
        setStep(4); // Ask deeper questions
      } else {
        finishOnboarding(selectedCategory);
      }
    } else if (step === 4) {
      // Filter or generate 3-5 recommendations from demo businesses
      const filtered = DEMO_BUSINESS_IDEAS.filter((b) => b.minInvestment <= (capital * 2.5)).slice(0, 4);
      setRecommendedBusinesses(filtered.length > 0 ? filtered : DEMO_BUSINESS_IDEAS.slice(0, 3));
      setStep(5);
    } else if (step === 5) {
      finishOnboarding(chosenBusiness);
    }
  };

  const finishOnboarding = (finalBusinessName: string) => {
    updateUser({
      name: user.name || 'Micro-Entrepreneur',
      state: selectedState,
      district: selectedDistrict,
      villageOrTown: villageName ? `${villageName}, ${selectedBlock}` : `${selectedBlock}, ${selectedDistrict}`,
      availableCapital: capital,
      businessCategory: selectedCategory === 'Not Sure' ? 'Dairy' : selectedCategory,
      selectedBusiness: finalBusinessName || 'Mini Dairy & Fresh Milk Collection',
      skills,
      hasSpaceOrShop: hasSpace,
      workPreference,
      onboardingCompleted: true
    });
    setHasCompletedOnboarding(true);
    onComplete();
  };

  const toggleSkill = (skillId: string) => {
    if (skills.includes(skillId)) {
      setSkills(skills.filter((s) => s !== skillId));
    } else {
      setSkills([...skills, skillId]);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col justify-center items-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-xl space-y-6">
        {/* Top Progress and Audio */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-emerald-700 text-white font-bold flex items-center justify-center text-xs">
              {step}
            </span>
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              {language === 'bn' ? `ধাপ ${step} (সহজ প্রশ্নাবলী)` : `Step ${step} of ${isNotSure ? 5 : 3}`}
            </span>
          </div>

          <button
            type="button"
            onClick={handleReadQuestion}
            className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-all flex items-center gap-1.5 text-xs font-semibold"
          >
            <Volume2 className="w-4 h-4 text-emerald-700" />
            <span className="hidden sm:inline">{language === 'bn' ? 'শুনুন' : 'Listen'}</span>
          </button>
        </div>

        {/* STEP 1: CAPITAL */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-stone-900 leading-snug">
                {language === 'bn'
                  ? 'আপনার কাছে ব্যবসা শুরু করার জন্য কত টাকা আছে?'
                  : language === 'hi'
                  ? 'आपके पास व्यापार शुरू करने के लिए कितना पैसा है?'
                  : 'How much money do you have to start the business?'}
              </h1>
              <p className="mt-1 text-xs text-stone-500">
                {language === 'bn'
                  ? 'আপনার নিজের জমানো বা পরিবারের সাহায্য থেকে প্রাপ্ত পুঁজি বাছাই করুন।'
                  : 'Select your available margin savings in hand to start.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {capitalOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    setCapital(opt.value);
                    setIsCustomCapital(false);
                  }}
                  className={`p-4 rounded-2xl border-2 text-center transition-all ${
                    capital === opt.value && !isCustomCapital
                      ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-black shadow-xs scale-[1.02]'
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 font-bold'
                  }`}
                >
                  <span className="text-lg block tabular-nums">{opt.label}</span>
                  <span className="text-[10px] text-stone-500 font-normal">
                    {opt.value <= 25000 ? 'Micro Scale' : 'Small Venture'}
                  </span>
                </button>
              ))}
            </div>

            {/* Custom Amount Option */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <button
                type="button"
                onClick={() => setIsCustomCapital(!isCustomCapital)}
                className="text-xs font-bold text-emerald-800 flex items-center justify-between w-full"
              >
                <span>
                  {language === 'bn'
                    ? '✏️ নিজের পরিমাণ লিখুন (Custom Amount)'
                    : language === 'hi'
                    ? '✏️ अपनी राशि लिखें (Custom Amount)'
                    : '✏️ Enter custom amount'}
                </span>
                <span className="text-[10px] text-stone-400">Tap to type</span>
              </button>

              {isCustomCapital && (
                <div className="relative pt-1">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-stone-400">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="1000"
                    step="5000"
                    value={customCapitalInput}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setCustomCapitalInput(e.target.value);
                      if (val > 0) setCapital(val);
                    }}
                    placeholder="e.g. 75000"
                    className="w-full bg-white border border-stone-300 rounded-xl py-2.5 pl-8 pr-3 text-base font-bold text-stone-900 focus:outline-hidden focus:border-emerald-600"
                  />
                </div>
              )}
            </div>

            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950">
              💡 {language === 'bn'
                ? `নির্বাচিত পুঁজি: ${formatINR(capital)}। এটি দিয়ে আনুমানিক ${formatINR(capital * 10)} পর্যন্ত প্রকল্পের জন্য আবেদন করা যাবে।`
                : `Selected Margin: ${formatINR(capital)}. This can structure a project outlay up to ${formatINR(capital * 10)}.`}
            </div>
          </div>
        )}

        {/* STEP 2: LOCATION */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-stone-900 leading-snug">
                {language === 'bn'
                  ? 'আপনি কোথায় ব্যবসা করতে চান?'
                  : language === 'hi'
                  ? 'आप कहाँ व्यापार करना चाहते हैं?'
                  : 'Where do you want to do business?'}
              </h1>
              <p className="mt-1 text-xs text-stone-500">
                {language === 'bn'
                  ? 'আপনার রাজ্য, জেলা, ব্লক এবং গ্রামের নাম নির্বাচন করুন।'
                  : 'Enter your State, District, Block, and Village.'}
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">State (রাজ্য / राज्य)</label>
                <select
                  value={selectedState}
                  onChange={(e) => {
                    const s = e.target.value;
                    setSelectedState(s);
                    const d = DISTRICT_MAP[s]?.[0] || 'Default';
                    setSelectedDistrict(d);
                  }}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-sm font-semibold text-stone-900"
                >
                  {INDIAN_STATES.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">District (জেলা / जिला)</label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-sm font-semibold text-stone-900"
                >
                  {availableDistricts.map((dst) => (
                    <option key={dst} value={dst}>{dst}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Block / Area (ব্লক)</label>
                  <input
                    type="text"
                    value={selectedBlock}
                    onChange={(e) => setSelectedBlock(e.target.value)}
                    placeholder="e.g. Ranaghat"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-sm font-semibold text-stone-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Village / Town (গ্রাম)</label>
                  <input
                    type="text"
                    value={villageName}
                    onChange={(e) => setVillageName(e.target.value)}
                    placeholder="e.g. Habibpur"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-sm font-semibold text-stone-900"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: BUSINESS SELECTION */}
        {step === 3 && (
          <div className="space-y-5">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-stone-900 leading-snug">
                {language === 'bn'
                  ? 'আপনি কোন ব্যবসা করতে চান?'
                  : language === 'hi'
                  ? 'आप कौन सा व्यापार करना चाहते हैं?'
                  : 'What business do you want to do?'}
              </h1>
              <p className="mt-1 text-xs text-stone-500">
                {language === 'bn'
                  ? 'তালিকা থেকে একটি ক্যাটাগরি বাছাই করুন বা "নিশ্চিত নই" বেছে নিন।'
                  : 'Pick a category or select "Not Sure" for personalized AI guidance.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 max-h-80 overflow-y-auto pr-1">
              {businessCategoriesList.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setIsNotSure(cat.id === 'Not Sure');
                  }}
                  className={`p-3.5 rounded-2xl border-2 text-left transition-all flex items-center gap-2.5 ${
                    selectedCategory === cat.id
                      ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-bold shadow-xs'
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800'
                  }`}
                >
                  <span className="text-xl shrink-0">{cat.icon}</span>
                  <div className="truncate">
                    <span className="block text-xs font-bold truncate">
                      {language === 'bn' ? cat.labelBn : language === 'hi' ? cat.labelHi : cat.labelEn}
                    </span>
                    <span className="text-[10px] text-stone-400 font-normal">{cat.id}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: DEEP PERSONA QUESTIONS (If "Not Sure") */}
        {step === 4 && (
          <div className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-teal-700" />
                <span>AI Guidance Matcher</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-stone-900 leading-snug">
                {language === 'bn'
                  ? 'আপনার সুবিধা ও সম্পদ সম্পর্কে বলুন'
                  : 'Tell us about your skills & resources'}
              </h1>
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-stone-700">
                {language === 'bn' ? '১. আপনার কী কী অভিজ্ঞতা বা দক্ষতা আছে?' : '1. What skills or experience do you have?'}
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {skillOptions.map((sk) => (
                  <button
                    key={sk.id}
                    type="button"
                    onClick={() => toggleSkill(sk.id)}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 ${
                      skills.includes(sk.id)
                        ? 'bg-teal-50 border-teal-600 text-teal-950 font-bold'
                        : 'bg-stone-50 border-stone-200 text-stone-700'
                    }`}
                  >
                    <span>{sk.icon}</span>
                    <span className="truncate">{language === 'bn' ? sk.labelBn : sk.labelEn}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Space */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-stone-700">
                {language === 'bn' ? '২. আপনার কি নিজস্ব দোকান বা জায়গা আছে?' : '2. Do you have a shop or available space?'}
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setHasSpace(true)}
                  className={`p-3 rounded-xl border ${hasSpace === true ? 'bg-emerald-50 border-emerald-600 text-emerald-950' : 'bg-stone-50 border-stone-200 text-stone-700'}`}
                >
                  🏠 Yes, owned space
                </button>
                <button
                  type="button"
                  onClick={() => setHasSpace(false)}
                  className={`p-3 rounded-xl border ${hasSpace === false ? 'bg-emerald-50 border-emerald-600 text-emerald-950' : 'bg-stone-50 border-stone-200 text-stone-700'}`}
                >
                  🚶 Will rent or home-based
                </button>
              </div>
            </div>

            {/* Time Commitment */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-stone-700">
                {language === 'bn' ? '৩. কতটা সময় দিতে পারবেন?' : '3. Work Commitment'}
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setWorkPreference('full_time')}
                  className={`p-3 rounded-xl border ${workPreference === 'full_time' ? 'bg-emerald-50 border-emerald-600 text-emerald-950' : 'bg-stone-50 border-stone-200 text-stone-700'}`}
                >
                  ⏰ Full-Time (8+ hrs)
                </button>
                <button
                  type="button"
                  onClick={() => setWorkPreference('part_time')}
                  className={`p-3 rounded-xl border ${workPreference === 'part_time' ? 'bg-emerald-50 border-emerald-600 text-emerald-950' : 'bg-stone-50 border-stone-200 text-stone-700'}`}
                >
                  ⏳ Part-Time (3-4 hrs)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: AI RECOMMENDATIONS (If "Not Sure") */}
        {step === 5 && (
          <div className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>AI Recommended Opportunities</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-stone-900 leading-snug">
                {language === 'bn' ? 'আপনার জন্য সেরা প্রস্তাবিত ব্যবসা' : 'Top Business Recommendations for You'}
              </h1>
              <p className="mt-1 text-xs text-stone-500">
                {language === 'bn'
                  ? 'আপনার পুঁজি ও স্থানীয় এলাকার জন্য সবচেয়ে মানানসই একটি বেছে নিন:'
                  : 'Select one to proceed to Hyper-Local Feasibility & Scheme Structuring:'}
              </p>
            </div>

            <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
              {recommendedBusinesses.map((idea) => (
                <div
                  key={idea.id}
                  onClick={() => {
                    setChosenBusiness(idea.name);
                    setSelectedCategory(idea.category);
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    chosenBusiness === idea.name
                      ? 'border-emerald-700 bg-emerald-50 shadow-sm'
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-stone-900">
                        {language === 'bn' ? idea.nameBn : language === 'hi' ? idea.nameHi : idea.name}
                      </h3>
                      <p className="text-[11px] text-stone-500 mt-0.5">{idea.whySuits}</p>
                    </div>
                    <span className="text-xs font-black text-emerald-800 tabular-nums">
                      {formatINR(idea.minInvestment)}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[11px] text-stone-600 pt-2 border-t border-stone-200/60">
                    <span>👥 {idea.targetCustomers}</span>
                    <span className="font-semibold text-emerald-700">~{idea.breakEvenMonths} mo break-even</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Navigation Buttons */}
        <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-3 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{language === 'bn' ? 'আগের প্রশ্ন' : 'Back'}</span>
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95"
          >
            <span>
              {step === (isNotSure ? 5 : 3)
                ? (language === 'bn' ? 'ড্যাশবোর্ডে প্রবেশ করুন' : 'Finish & Go to Dashboard')
                : (language === 'bn' ? 'পরবর্তী প্রশ্ন' : 'Next Step')}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
