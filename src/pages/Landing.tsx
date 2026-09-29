import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  TrendingUp,
  Bot,
  MapPin,
  Wallet,
  Mic,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Users,
  Compass,
  FileText,
  PhoneCall,
  Activity,
  Layers,
  ChevronRight
} from 'lucide-react';

interface LandingProps {
  onStart: () => void;
  onExplore: () => void;
  onStartDemo?: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStart, onExplore, onStartDemo }) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-stone-200 bg-linear-to-b from-emerald-50/50 to-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            {/* Top kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-6 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.brandName} · {t.tagline}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-stone-950 tracking-tight leading-[1.15] text-balance">
              {language === 'bn'
                ? 'গ্রামীণ উদ্যোক্তাদের জন্য বিশ্বস্ত এআই ব্যবসা পরামর্শক'
                : language === 'hi'
                ? 'ग्रामीण उद्यमियों के लिए भरोसेमंद एआई व्यापार सलाहकार'
                : 'Your AI Business Advisor for Rural Entrepreneurship'}
            </h1>

            <p className="mt-5 text-base sm:text-xl text-stone-600 leading-relaxed max-w-2xl mx-auto font-normal">
              {language === 'bn'
                ? 'স্থানীয় বাজার বুঝুন, সহজ হিসাব করুন, উপযুক্ত ব্যবসা খুঁজুন এবং মাতৃভাষায় এআই পরামর্শের সাথে সঠিক সিদ্ধান্ত নিন।'
                : language === 'hi'
                ? 'स्थानीय बाजार समझें, पूंजी की योजना बनाएं, सही व्यापार चुनें और अपनी भाषा में व्यावहारिक एआई सलाह पाएं।'
                : 'Understand your local market, plan your money, explore business opportunities and make smarter decisions with AI.'}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                onClick={onStart}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-600 text-white font-bold text-base hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 active:scale-95"
              >
                <span>{language === 'bn' ? 'আমার ব্যবসা শুরু করুন' : language === 'hi' ? 'मेरा व्यापार शुरू करें' : 'Start My Business'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              {onStartDemo && (
                <button
                  onClick={onStartDemo}
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-base shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                  <span>🎯 {language === 'bn' ? 'SIH ডেমো ওয়াকথ্রু' : 'SIH Hackathon Demo'}</span>
                </button>
              )}

              <button
                onClick={onExplore}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white border border-stone-300 text-stone-800 font-bold text-base hover:bg-stone-100 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>{language === 'bn' ? 'কীভাবে কাজ করে দেখুন' : language === 'hi' ? 'जानिए यह कैसे काम करता है' : 'Explore How It Works'}</span>
              </button>
            </div>

            {/* Language Quick Selector Chips */}
            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-stone-500">
              <span className="font-medium">{t.nav.chooseLanguage}:</span>
              <button
                onClick={() => setLanguage('bn')}
                className={`px-3 py-1 rounded-lg border transition-all ${
                  language === 'bn'
                    ? 'bg-emerald-700 text-white border-emerald-700 font-bold'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                }`}
              >
                বাংলা
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-3 py-1 rounded-lg border transition-all ${
                  language === 'hi'
                    ? 'bg-emerald-700 text-white border-emerald-700 font-bold'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                }`}
              >
                हिन्दी
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-lg border transition-all ${
                  language === 'en'
                    ? 'bg-emerald-700 text-white border-emerald-700 font-bold'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 1. The Problem */}
      <section className="py-16 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              {language === 'bn'
                ? 'গ্রামীণ উদ্যোক্তাদের আসল চ্যালেঞ্জ'
                : language === 'hi'
                ? 'ग्रामीण उद्यमियों की वास्तविक चुनौतियां'
                : 'The Real Problems Micro-Entrepreneurs Face'}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-stone-600">
              {language === 'bn'
                ? 'জটিল সফটওয়্যার বা ইংরেজি ফর্ম নয় — প্রয়োজন সহজ ও মাতৃভাষায় দিকনির্দেশনা।'
                : language === 'hi'
                ? 'कठिन सॉफ्टवेयर नहीं, बल्कि आसान भाषा और व्यावहारिक मार्गदर्शन की आवश्यकता है।'
                : 'Traditional accounting tools are too complex, heavily text-dependent, and ignore rural ground realities.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-lg mb-4">
                ❌
              </div>
              <h3 className="text-base font-bold text-stone-900">
                {language === 'bn' ? 'জটিল আর্থিক পরিভাষা' : language === 'hi' ? 'जटिल वित्तीय शब्दावली' : 'Complex Financial Jargon'}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
                {language === 'bn'
                  ? 'ব্যালেন্স শিট, লেজার ও অডিটের ভয় উদ্যোক্তাকে পিছিয়ে দেয়।'
                  : language === 'hi'
                  ? 'बैलेंस शीट और भारी-भरकम लेजर शब्दों से छोटे व्यापारी डरते हैं।'
                  : 'Terms like depreciation, amortization, and balance sheets create fear and confusion.'}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg mb-4">
                ⚠️
              </div>
              <h3 className="text-base font-bold text-stone-900">
                {language === 'bn' ? 'স্থানীয় বাজারের তথ্যের অভাব' : language === 'hi' ? 'स्थानीय बाजार ज्ञान की कमी' : 'Lack of Local Market Reality'}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
                {language === 'bn'
                  ? 'অন্যের দেখাদেখি একই দোকান খুলে অনেকে লোকসানের মুখে পড়েন।'
                  : language === 'hi'
                  ? 'देखा-देखी में वही दुकान खोल लेना जिससे इलाके में जरूरत से ज्यादा दुकानें हो जाती हैं।'
                  : 'Blindly copying a neighboring shop without knowing local demand and seasonal dips.'}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg mb-4">
                📉
              </div>
              <h3 className="text-base font-bold text-stone-900">
                {language === 'bn' ? 'পুঁজি ও বাকির অব্যবস্থাপনা' : language === 'hi' ? 'अनियंत्रित उधारी व नकदी संकट' : 'Uncontrolled Credit & Cash Trap'}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
                {language === 'bn'
                  ? 'বাকির টাকা আটকে যাওয়া এবং ঘরের খরচে দোকানের টাকা শেষ হয়ে যাওয়া।'
                  : language === 'hi'
                  ? 'बाजार में उधार फंसना और दुकान की नकदी से घर का खर्च चलने से पूंजी खत्म होना।'
                  : 'Profits look fine on paper, but cash is trapped in customer credit (udhar) and emergencies.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. How GramBiz AI Helps: "LESS READING. MORE UNDERSTANDING." */}
      <section className="py-16 bg-emerald-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">
              Design Philosophy
            </span>
            <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold tracking-tight">
              "LESS READING. MORE UNDERSTANDING."
            </h2>
            <p className="mt-3 text-stone-300 text-sm sm:text-base">
              {language === 'bn'
                ? 'সহজ ভাষা, বড় বাটন, ছবিযুক্ত চার্ট এবং সরাসরি ভয়েস পরামর্শ।'
                : language === 'hi'
                ? 'सरल भाषा, बड़े बटन, रंगीन चार्ट और बोलकर पूछने की सुविधा।'
                : 'Built with large buttons, intuitive cards, local languages, voice synthesis, and direct steps.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <Mic className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold">
                {language === 'bn' ? 'ভয়েস-ফার্স্ট অভিজ্ঞতা' : language === 'hi' ? 'बोलकर पूछें (वॉयस)' : 'Voice-First Interaction'}
              </h3>
              <p className="mt-2 text-xs text-stone-300 leading-relaxed">
                {language === 'bn'
                  ? 'টাইপ করতে কষ্ট হলে বাংলায় কথা বলে প্রশ্ন করুন ও শুনুন।'
                  : language === 'hi'
                  ? 'टाइपिंग न आने पर भी बोलकर सवाल पूछें और उत्तर सुनें।'
                  : 'Speak naturally in Bengali, Hindi, or English. Listen to spoken advice.'}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold">
                {language === 'bn' ? 'ধাপে ধাপে সহজ প্রশ্ন' : language === 'hi' ? 'एक बार में एक सवाल' : 'Step-by-Step Questions'}
              </h3>
              <p className="mt-2 text-xs text-stone-300 leading-relaxed">
                {language === 'bn'
                  ? 'কোনো লম্বা ফর্ম নেই। সহজ ১টি করে প্রশ্ন ও বড় বাটন।'
                  : language === 'hi'
                  ? 'कोई लंबा फॉर्म नहीं। एक बार में एक आसान सवाल और बड़े विकल्प।'
                  : 'No giant intimidating forms. One simple question at a time with preset chips.'}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <Wallet className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold">
                {language === 'bn' ? 'টাকার পরিষ্কার চিত্র' : language === 'hi' ? 'पूंजी का स्पष्ट चार्ट' : 'Visual Money Structuring'}
              </h3>
              <p className="mt-2 text-xs text-stone-300 leading-relaxed">
                {language === 'bn'
                  ? 'পুঁজি কোন খাতে কত রাখতে হবে তা ডোনাট চার্টে পরিষ্কার দেখা যায়।'
                  : language === 'hi'
                  ? 'पूंजी कहां कितनी रखनी है, इसका रंगीन और आसान चार्ट।'
                  : 'Know exactly how much goes to setup, stock, working capital, and emergency reserve.'}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold">
                {language === 'bn' ? 'বাস্তবসম্মত সুরক্ষা' : language === 'hi' ? 'व्यावहारिक सुरक्षा' : 'Grounded & Safe'}
              </h3>
              <p className="mt-2 text-xs text-stone-300 leading-relaxed">
                {language === 'bn'
                  ? 'কখনোই ভুয়া মুনাফার প্রতিশ্রুতি নয়; সবসময় সতর্কতামূলক হিসাব।'
                  : language === 'hi'
                  ? 'कोई झूठे वादे नहीं; हर आंकड़ा सुरक्षित अनुमान पर आधारित।'
                  : 'Never promises unrealistic profits or guaranteed loans; emphasizes risk mitigation.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Features Showcase */}
      <section className="py-16 bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              {language === 'bn' ? 'গ্রামবিজ এআই-এর প্রধান সুবিধাসমূহ' : language === 'hi' ? 'ग्रामबिज़ एआई की प्रमुख सुविधाएं' : 'Everything You Need to Succeed'}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-stone-600">
              {language === 'bn'
                ? 'আইডিয়া খোঁজা থেকে শুরু করে আর্থিক খসড়া এবং দৈনিক বিক্রি হিসাব।'
                : language === 'hi'
                ? 'विचार खोजने से लेकर बैंक योजना और रोजाना बिक्री हिसाब तक।'
                : 'From initial business discovery to market intelligence, money planning, and daily tasks.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Discover */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-3">
                💡
              </div>
              <h3 className="text-base font-bold text-stone-900">{t.discovery.title}</h3>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                {t.discovery.subtitle}
              </p>
            </div>

            {/* 2. Market */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold mb-3">
                🛒
              </div>
              <h3 className="text-base font-bold text-stone-900">{t.market.title}</h3>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                {t.market.subtitle}
              </p>
            </div>

            {/* 3. Financial Planner */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold mb-3">
                💰
              </div>
              <h3 className="text-base font-bold text-stone-900">{t.finance.title}</h3>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                {t.finance.subtitle}
              </p>
            </div>

            {/* 4. Funding Gap & Loan */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold mb-3">
                🏦
              </div>
              <h3 className="text-base font-bold text-stone-900">{t.funding.title}</h3>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                {t.funding.subtitle}
              </p>
            </div>

            {/* 5. Business Plan */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold mb-3">
                📄
              </div>
              <h3 className="text-base font-bold text-stone-900">{t.businessPlan.title}</h3>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                {t.businessPlan.subtitle}
              </p>
            </div>

            {/* 6. Health Check */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold mb-3">
                🩺
              </div>
              <h3 className="text-base font-bold text-stone-900">{t.health.title}</h3>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                {t.health.subtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How It Works (The 4-Step Journey) */}
      <section className="py-16 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              {language === 'bn' ? 'মাত্র ৪টি সহজ ধাপে শুরু করুন' : language === 'hi' ? 'केवल 4 आसान चरणों में शुरुआत' : 'How GramBiz AI Guides You'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 relative">
              <div className="text-3xl font-black text-emerald-600 mb-2">01</div>
              <h4 className="text-sm font-bold text-stone-900">
                {language === 'bn' ? 'ভাষা ও অবস্থান বাছুন' : language === 'hi' ? 'भाषा व जिला चुनें' : 'Choose Language & Location'}
              </h4>
              <p className="mt-1.5 text-xs text-stone-600">
                {language === 'bn' ? 'বাংলা, হিন্দি বা ইংরেজিতে আপনার জেলা নির্ধারণ করুন।' : 'Select state and district in your native tongue.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 relative">
              <div className="text-3xl font-black text-emerald-600 mb-2">02</div>
              <h4 className="text-sm font-bold text-stone-900">
                {language === 'bn' ? 'পুঁজি ও আগ্রহ জানান' : language === 'hi' ? 'पूंजी व हुनर दर्ज करें' : 'Enter Budget & Skills'}
              </h4>
              <p className="mt-1.5 text-xs text-stone-600">
                {language === 'bn' ? 'হাতে কত টাকা আছে আর কী কাজ করতে চান ক্লিক করুন।' : 'Tap your available money or click "Not sure" for guidance.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 relative">
              <div className="text-3xl font-black text-emerald-600 mb-2">03</div>
              <h4 className="text-sm font-bold text-stone-900">
                {language === 'bn' ? 'উপযুক্ত ব্যবসার প্রস্তাব' : language === 'hi' ? 'व्यापार विकल्प व बाजार' : 'Select Tested Business'}
              </h4>
              <p className="mt-1.5 text-xs text-stone-600">
                {language === 'bn' ? 'এআই স্থানীয় চাহিদা পর্যালোচনা করে সেরা ৩-৫টি বিকল্প দেয়।' : 'AI checks local demand and recommends 3-5 grounded ideas.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 relative">
              <div className="text-3xl font-black text-emerald-600 mb-2">04</div>
              <h4 className="text-sm font-bold text-stone-900">
                {language === 'bn' ? 'টাকার হিসাব ও পরিকল্পনা' : language === 'hi' ? 'पैसों की योजना व प्रिंट' : 'Plan Money & Print Plan'}
              </h4>
              <p className="mt-1.5 text-xs text-stone-600">
                {language === 'bn' ? 'খরচ, লাভ, ব্রেক-ইভেন ও ঋণের খসড়া প্রিন্ট করুন।' : 'Calculate profit, break-even, and print a clear proposal.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Call To Action Banner */}
      <section className="py-16 bg-linear-to-r from-emerald-800 to-teal-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {t.heroTagline}
          </h2>
          <p className="mt-4 text-emerald-100 text-sm sm:text-base max-w-xl mx-auto">
            {language === 'bn'
              ? 'আজই শুরু করুন আপনার পছন্দের ভাষায়। কোনো জটিল শর্ত নেই।'
              : language === 'hi'
              ? 'आज ही अपनी मातृभाषा में सुरक्षित शुरुआत करें।'
              : 'Empowering rural micro-entrepreneurs with intelligent, empathetic, voice-enabled business guidance.'}
          </p>
          <div className="mt-8 flex justify-center">
            <button
              onClick={onStart}
              className="px-8 py-4 rounded-2xl bg-white text-emerald-900 font-bold text-base hover:bg-emerald-50 transition-all shadow-lg active:scale-95 flex items-center gap-2"
            >
              <span>{t.onboarding.startBtn}</span>
              <ArrowRight className="w-5 h-5 text-emerald-700" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-stone-900 text-stone-400 text-xs border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-stone-200 font-bold">
            <span>🌱 {t.brandName}</span>
            <span className="text-stone-500 font-normal">· {t.tagline}</span>
          </div>
          <p className="text-center sm:text-right max-w-md text-stone-400">
            {t.disclaimerNote}
          </p>
        </div>
      </footer>
    </div>
  );
};
