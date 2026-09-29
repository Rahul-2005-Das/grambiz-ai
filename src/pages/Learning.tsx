import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  GraduationCap,
  BookOpen,
  Volume2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Wallet,
  ShieldCheck
} from 'lucide-react';

export const Learning: React.FC = () => {
  const { language, t, speak } = useLanguage();

  const [activeLesson, setActiveLesson] = useState<number>(0);

  const lessons = [
    {
      id: 1,
      title: t.learning.l1Title,
      desc: t.learning.l1Desc,
      icon: '💰',
      explanation: language === 'bn'
        ? 'অনেকে মনে করেন সারাদিনে ক্যাশ বাক্সে যা জমা হলো সেটাই লাভ। কিন্তু পণ্যের কেনা দাম, গাড়িভাড়া, বিদ্যুৎ ও দোকান ভাড়া বাদ দেওয়ার পরেই যে টাকা থাকে, কেবল সেটাই আপনার আসল নিট লাভ।'
        : 'Many new entrepreneurs mistake total daily cash collected for profit. Real net profit is only what remains after deducting raw material costs, freight, electricity, and shop rent.',
      visualExample: language === 'bn'
        ? 'যদি ₹১০০ টাকার মাল কিনে ₹১২০ টাকায় বিক্রি করেন এবং পরিবহন খরচ ₹৫ হয়, তবে আপনার আসল লাভ = ₹১৫ (১৫%), ₹২০ নয়।'
        : 'If you buy an item for ₹100 and sell it for ₹120, but pay ₹5 in transport, your real net profit is ₹15 (12.5%), NOT ₹20.',
      practicalAction: language === 'bn'
        ? 'আজই আপনার সবচেয়ে বেশি বিক্রিত ৩টি জিনিসের কেনা দামের সাথে সমস্ত আনুষঙ্গিক খরচ যোগ করে আসল লাভ হিসাব করুন।'
        : 'Today, calculate the exact unit cost of your top 3 selling items including transport and packaging.'
    },
    {
      id: 2,
      title: t.learning.l2Title,
      desc: t.learning.l2Desc,
      icon: '📦',
      explanation: language === 'bn'
        ? 'দোকানের তাক ভর্তি করে বেশি মাল তুলে রাখলেই লাভ হয় না। যে মাল দ্রুত বিক্রি হয় না, তাতে নগদ টাকা আটকে পড়ে এবং নষ্ট হওয়ার ঝুঁকি বাড়ে।'
        : 'Having a packed shop does not guarantee wealth. Goods sitting unsold for months freeze your cash and risk damage or obsolescence.',
      visualExample: language === 'bn'
        ? 'দ্রুত বিক্রিত মাল (চা, বিস্কুট, দুধ) প্রতি সপ্তাহে অল্প করে তুলুন; ৩ মাস ধরে পড়ে থাকা মাল অবিলম্বে ৫% কমিয়ে নগদ টাকা বের করুন।'
        : 'Keep 7 days worth of fast-moving staples. Discount dead stock that has not sold in 30 days to free up purchasing power.',
      practicalAction: language === 'bn'
        ? 'আপনার দোকানে ১ মাসের বেশি জমে থাকা সব মালে লাল দাগ দিন এবং সেগুলো বান্ডিল করে ছাড়ে বিক্রি করুন।'
        : 'Identify items that haven\'t moved in 30 days and create a "Quick Clearance" basket.'
    },
    {
      id: 3,
      title: t.learning.l3Title,
      desc: t.learning.l3Desc,
      icon: '🤝',
      explanation: language === 'bn'
        ? 'নতুন গ্রাহক আনার চেয়ে পুরনো গ্রাহককে ধরে রাখা সহজ ও সস্তা। সততা, সঠিক ওজন ও হাসিমুখ হলো গ্রামীণ ব্যবসার সবচেয়ে বড় বিজ্ঞাপন।'
        : 'Retaining regular customers is 5x cheaper than finding new ones. Honest weights, fair prices, and a warm greeting are your strongest local marketing tools.',
      visualExample: language === 'bn'
        ? 'প্রতিদিনের ১০ জন স্থায়ী গ্রাহকের নাম ও পছন্দ মনে রাখুন; বয়স্ক মানুষদের মাল বাড়িতে পৌঁছে দিলে তারা সারাজীবন আপনার দোকান থেকেই কিনবেন।'
        : 'Remember the names of 10 daily buyers. Offering free home delivery to elder villagers builds unbreakable loyalty.',
      practicalAction: language === 'bn'
        ? 'আজ ৩ জন পরিচিত গ্রাহককে মুখে ধন্যবাদ দিন এবং তাদের পরিবারের খোঁজ নিন।'
        : 'Greet 3 regular customers warmly by name and thank them for trusting your shop.'
    },
    {
      id: 4,
      title: t.learning.l4Title,
      desc: t.learning.l4Desc,
      icon: '📋',
      explanation: language === 'bn'
        ? 'বাকি দিলে সাময়িক বিক্রি বাড়ে, কিন্তু টাকা আটকে ব্যবসা বন্ধ হয়ে যেতে পারে। বাকি দেওয়ার একটি নির্দিষ্ট আর্থিক সীমা (যেমন সর্বোচ্চ ₹৫০০) ঠিক রাখুন।'
        : 'Offering excessive customer credit (udhar) artificially inflates sales numbers while silently destroying working capital. Establish strict credit limits.',
      visualExample: language === 'bn'
        ? 'যিনি আগের বাকি শোধ করেননি, তাকে নম্রভাবে বলুন: "দাদা, মহাজনকে নগদে দিতে হবে, আগের হিসাবটা পরিষ্কার করে নিন।"'
        : 'Politely insist: "The wholesale stockist demands cash payment today. Please clear last week\'s balance so we can give you new stock."',
      practicalAction: language === 'bn'
        ? 'আজই আপনার বাকির খাতা দেখে যাদের ১৫ দিনের বেশি বাকি আছে তাদের সাথে দেখা করুন।'
        : 'Review your credit book today and gently follow up with anyone overdue past 14 days.'
    },
    {
      id: 5,
      title: t.learning.l5Title,
      desc: t.learning.l5Desc,
      icon: '🏦',
      explanation: language === 'bn'
        ? 'ঋণ তখনই নেওয়া উচিত যখন সেই টাকা ব্যবসায় খাটিয়ে সুদের চেয়ে অন্তত দ্বিগুণ লাভ করা সম্ভব। ঘরের খরচ বা উৎসবের জন্য কখনো ব্যবসায়িক ঋণ নেবেন না।'
        : 'Only borrow money if the capital directly generates at least 2.5x more monthly profit than the loan EMI. Never use business credit for family consumption.',
      visualExample: language === 'bn'
        ? 'মাসে ₹১,০০০ কিস্তি দিতে হলে আপনার নিশ্চিত মুনাফা অন্তত ₹২,৫০০ হতে হবে, তবেই আপনি নিরাপদে থাকবেন।'
        : 'If your monthly EMI is ₹1,000, your estimated net business profit should be at least ₹2,500 to stay completely safe.',
      practicalAction: language === 'bn'
        ? 'যেকোনো ঋণ নেওয়ার আগে গ্রামবিজ এআই-এর "ঋণ ও মূলধন" ক্যালকুলেটরে কিস্তির হিসাব মিলিয়ে নিন।'
        : 'Use our simple EMI calculator to double-check repayment feasibility before signing paperwork.'
    },
    {
      id: 6,
      title: t.learning.l6Title,
      desc: t.learning.l6Desc,
      icon: '🏷️',
      explanation: language === 'bn'
        ? 'দোকানের ক্যাশ বাক্স কখনো পারিবারিক মানিব্যাগ নয়। ২টি আলাদা বাক্স রাখুন: একটি দোকানের নগদ, অপরটি নিজের বেতন হিসেবে ঘরে নেওয়ার টাকা।'
        : 'Never treat your shop\'s cash drawer as a family wallet. Maintain two separate boxes: one for business expenses, one for personal household salary.',
      visualExample: language === 'bn'
        ? 'প্রতিদিনের বিক্রি থেকে নিজেকে একটি নির্দিষ্ট দৈনিক বা সাপ্তাহিক বেতন দিন। বাকি সমস্ত টাকা দোকানের নতুন মাল ও জরুরি তহবিলের।'
        : 'Pay yourself a fixed weekly allowance from earnings. Keep the rest untouchable inside the business inventory account.',
      practicalAction: language === 'bn'
        ? 'আজই দুটি আলাদা কাঠের বাক্স বা খাম বানান: একটি "দোকানের টাকা", অপরটি "ঘরের রেশন খরচ"।'
        : 'Label two envelopes today: "Shop Cash" and "Household Grocery". Never mix them.'
    }
  ];

  const current = lessons[activeLesson];

  const handleReadLesson = () => {
    const text = `${current.title}. ${current.explanation}. Practical action: ${current.practicalAction}.`;
    speak(text);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 font-sans">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-bold mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-yellow-600" />
            <span>{language === 'bn' ? 'ব্যবহারিক ব্যবসার পাঠ' : 'Essential Micro-Lessons'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            {t.learning.title}
          </h1>
          <p className="mt-1 text-sm text-stone-600 max-w-xl">
            {t.learning.subtitle}
          </p>
        </div>

        <button
          onClick={handleReadLesson}
          className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center gap-2 border border-stone-300 transition-all shrink-0 active:scale-95"
        >
          <Volume2 className="w-4 h-4 text-emerald-700" />
          <span>{t.learning.listenLesson}</span>
        </button>
      </div>

      {/* Lesson Selector Strip */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {lessons.map((l, idx) => (
          <button
            key={l.id}
            onClick={() => setActiveLesson(idx)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
              activeLesson === idx
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white border border-stone-200 text-stone-700 hover:border-emerald-300'
            }`}
          >
            <span>{l.icon}</span>
            <span>Lesson {idx + 1}</span>
          </button>
        ))}
      </div>

      {/* Current Active Lesson Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-stone-100">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl shrink-0">
            {current.icon}
          </div>
          <div>
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              Lesson {activeLesson + 1} of {lessons.length}
            </span>
            <h2 className="text-lg sm:text-xl font-black text-stone-900">
              {current.title}
            </h2>
          </div>
        </div>

        {/* 1. Simple Explanation */}
        <div>
          <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
            1. Simple Explanation
          </h3>
          <p className="text-xs sm:text-sm text-stone-800 leading-relaxed bg-stone-50 p-4 rounded-2xl border border-stone-200/60">
            {current.explanation}
          </p>
        </div>

        {/* 2. Visual Example */}
        <div>
          <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
            2. Real-World Example
          </h3>
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/70 text-xs sm:text-sm text-amber-950 leading-relaxed">
            💡 {current.visualExample}
          </div>
        </div>

        {/* 3. Practical Action */}
        <div>
          <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
            3. Do This Today
          </h3>
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-950 font-medium flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>{current.practicalAction}</span>
          </div>
        </div>

        {/* Footer Next button */}
        <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
          <button
            onClick={() => setActiveLesson((prev) => (prev > 0 ? prev - 1 : lessons.length - 1))}
            className="px-4 py-2 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 hover:bg-stone-50"
          >
            Previous
          </button>
          <button
            onClick={() => setActiveLesson((prev) => (prev < lessons.length - 1 ? prev + 1 : 0))}
            className="px-6 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 flex items-center gap-1.5 shadow-xs"
          >
            <span>Next Lesson</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
