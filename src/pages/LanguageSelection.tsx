import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../types';
import { Sparkles, ArrowRight, Volume2, Globe } from 'lucide-react';

interface LanguageSelectionProps {
  onLanguageChosen: (lang: Language) => void;
}

export const LanguageSelection: React.FC<LanguageSelectionProps> = ({ onLanguageChosen }) => {
  const { language, setLanguage, t, speak } = useLanguage();

  const handleSelect = (lang: Language) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('grambiz_lang_chosen', 'true');
    }
    // Read short confirmation in target language
    const welcomeSpeech = lang === 'bn'
      ? 'বাংলা ভাষা নির্বাচন করা হয়েছে। গ্রামবিজ এআই-এ আপনাকে স্বাগতম।'
      : lang === 'hi'
      ? 'हिन्दी भाषा का चयन किया गया है। ग्रामबिज़ एआई में आपका स्वागत है।'
      : 'English selected. Welcome to GramBiz AI.';
    speak(welcomeSpeech);
    onLanguageChosen(lang);
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col items-center justify-center p-4 sm:p-6 text-stone-900 font-sans">
      <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-xl text-center">
        {/* Brand Kicker */}
        <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-3xl mx-auto mb-4 shadow-sm">
          🌱
        </div>

        <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
          GramBiz AI
        </h1>
        <p className="text-xs text-stone-500 font-medium mt-0.5 mb-6">
          Your AI Business Companion
        </p>

        {/* Title in all three languages */}
        <div className="space-y-1 mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950">
            Choose Your Language
          </h2>
          <p className="text-stone-600 text-sm font-medium">
            আপনার ভাষা বেছে নিন &nbsp;·&nbsp; अपनी भाषा चुनें
          </p>
        </div>

        {/* 3 Large Buttons */}
        <div className="space-y-3.5">
          {/* Bengali Button */}
          <button
            onClick={() => handleSelect('bn')}
            className={`w-full p-5 rounded-2xl border-2 transition-all flex items-center justify-between text-left active:scale-[0.98] ${
              language === 'bn'
                ? 'border-emerald-600 bg-emerald-50/70 shadow-md ring-2 ring-emerald-500/20'
                : 'border-stone-200 bg-stone-50/60 hover:border-emerald-400 hover:bg-emerald-50/30 shadow-2xs'
            }`}
          >
            <div>
              <div className="text-xl sm:text-2xl font-bold text-stone-900 font-bengali">
                বাংলা
              </div>
              <div className="text-xs text-stone-500 mt-0.5">Bengali</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-emerald-700 shadow-2xs">
              <ArrowRight className="w-5 h-5" />
            </div>
          </button>

          {/* Hindi Button */}
          <button
            onClick={() => handleSelect('hi')}
            className={`w-full p-5 rounded-2xl border-2 transition-all flex items-center justify-between text-left active:scale-[0.98] ${
              language === 'hi'
                ? 'border-emerald-600 bg-emerald-50/70 shadow-md ring-2 ring-emerald-500/20'
                : 'border-stone-200 bg-stone-50/60 hover:border-emerald-400 hover:bg-emerald-50/30 shadow-2xs'
            }`}
          >
            <div>
              <div className="text-xl sm:text-2xl font-bold text-stone-900 font-devanagari">
                हिन्दी
              </div>
              <div className="text-xs text-stone-500 mt-0.5">Hindi</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-emerald-700 shadow-2xs">
              <ArrowRight className="w-5 h-5" />
            </div>
          </button>

          {/* English Button */}
          <button
            onClick={() => handleSelect('en')}
            className={`w-full p-5 rounded-2xl border-2 transition-all flex items-center justify-between text-left active:scale-[0.98] ${
              language === 'en'
                ? 'border-emerald-600 bg-emerald-50/70 shadow-md ring-2 ring-emerald-500/20'
                : 'border-stone-200 bg-stone-50/60 hover:border-emerald-400 hover:bg-emerald-50/30 shadow-2xs'
            }`}
          >
            <div>
              <div className="text-xl sm:text-2xl font-bold text-stone-900 font-sans">
                English
              </div>
              <div className="text-xs text-stone-500 mt-0.5">Default English</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-emerald-700 shadow-2xs">
              <ArrowRight className="w-5 h-5" />
            </div>
          </button>
        </div>

        {/* Footer info */}
        <p className="mt-8 text-xs text-stone-400 leading-relaxed">
          You can change the language anytime from the top bar or settings.
        </p>
      </div>
    </div>
  );
};
