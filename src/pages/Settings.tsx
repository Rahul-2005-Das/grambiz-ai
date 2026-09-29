import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Language } from '../types';
import {
  Sliders,
  Globe,
  Type,
  Sun,
  Mic,
  MousePointer,
  RotateCcw,
  CheckCircle2,
  Volume2
} from 'lucide-react';

interface SettingsProps {
  onRestartOnboarding: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ onRestartOnboarding }) => {
  const { language, setLanguage, t, speak } = useLanguage();
  const { user, updateUser, resetUser } = useAuth();

  const handleToggle = (key: keyof typeof user.accessibility) => {
    updateUser({
      accessibility: {
        ...user.accessibility,
        [key]: !user.accessibility[key]
      }
    });
  };

  const handleReset = () => {
    if (window.confirm(language === 'bn' ? 'আপনি কি নিশ্চিত যে সমস্ত তথ্য মুছে পুনরায় শুরু করতে চান?' : 'Are you sure you want to reset app data and re-run onboarding?')) {
      resetUser();
      onRestartOnboarding();
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12 font-sans">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-800 text-xs font-bold mb-3">
          <Sliders className="w-3.5 h-3.5 text-stone-600" />
          <span>{language === 'bn' ? 'সুগमता ও পড়ার স্বাচ্ছন্দ্য' : 'Accessibility & Preferences'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          {t.settings.title}
        </h1>
        <p className="mt-1 text-sm text-stone-600">
          {t.settings.subtitle}
        </p>
      </div>

      {/* Language Section */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-stone-100 text-sm font-bold text-stone-900">
          <Globe className="w-4 h-4 text-emerald-600" />
          <span>{t.settings.languageSection}</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => setLanguage('bn')}
            className={`p-4 rounded-2xl border text-center transition-all ${
              language === 'bn'
                ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-2xs'
                : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-emerald-300'
            }`}
          >
            <div className="text-lg font-bold">বাংলা</div>
            <div className="text-[11px] text-stone-500 mt-0.5">Bengali</div>
          </button>

          <button
            onClick={() => setLanguage('hi')}
            className={`p-4 rounded-2xl border text-center transition-all ${
              language === 'hi'
                ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-2xs'
                : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-emerald-300'
            }`}
          >
            <div className="text-lg font-bold">हिन्दी</div>
            <div className="text-[11px] text-stone-500 mt-0.5">Hindi</div>
          </button>

          <button
            onClick={() => setLanguage('en')}
            className={`p-4 rounded-2xl border text-center transition-all ${
              language === 'en'
                ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-2xs'
                : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-emerald-300'
            }`}
          >
            <div className="text-lg font-bold">English</div>
            <div className="text-[11px] text-stone-500 mt-0.5">English</div>
          </button>
        </div>
      </div>

      {/* Accessibility Toggles */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-stone-900 pb-2 border-b border-stone-100">
          Visual & Reading Options
        </h2>

        {/* Large Text */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-stone-50 border border-stone-200/70">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white text-stone-700 border border-stone-200">
              <Type className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-stone-900">
                {t.settings.largeTextLabel}
              </div>
              <div className="text-xs text-stone-500">
                {t.settings.largeTextDesc}
              </div>
            </div>
          </div>
          <button
            onClick={() => handleToggle('largeText')}
            className={`w-12 h-7 rounded-full p-1 transition-colors ${
              user.accessibility.largeText ? 'bg-emerald-600' : 'bg-stone-300'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                user.accessibility.largeText ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* High Contrast */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-stone-50 border border-stone-200/70">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white text-stone-700 border border-stone-200">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-stone-900">
                {t.settings.highContrastLabel}
              </div>
              <div className="text-xs text-stone-500">
                {t.settings.highContrastDesc}
              </div>
            </div>
          </div>
          <button
            onClick={() => handleToggle('highContrast')}
            className={`w-12 h-7 rounded-full p-1 transition-colors ${
              user.accessibility.highContrast ? 'bg-emerald-600' : 'bg-stone-300'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                user.accessibility.highContrast ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Voice Reading Assistance */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-stone-50 border border-stone-200/70">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white text-stone-700 border border-stone-200">
              <Mic className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-stone-900">
                {t.settings.voiceAssistanceLabel}
              </div>
              <div className="text-xs text-stone-500">
                {t.settings.voiceAssistanceDesc}
              </div>
            </div>
          </div>
          <button
            onClick={() => handleToggle('voiceAssistance')}
            className={`w-12 h-7 rounded-full p-1 transition-colors ${
              user.accessibility.voiceAssistance ? 'bg-emerald-600' : 'bg-stone-300'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                user.accessibility.voiceAssistance ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Large Buttons */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-stone-50 border border-stone-200/70">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white text-stone-700 border border-stone-200">
              <MousePointer className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-stone-900">
                {t.settings.largeButtonsLabel}
              </div>
              <div className="text-xs text-stone-500">
                {t.settings.largeButtonsDesc}
              </div>
            </div>
          </div>
          <button
            onClick={() => handleToggle('largeButtons')}
            className={`w-12 h-7 rounded-full p-1 transition-colors ${
              user.accessibility.largeButtons ? 'bg-emerald-600' : 'bg-stone-300'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                user.accessibility.largeButtons ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Danger / Reset Area */}
      <div className="bg-rose-50/60 rounded-3xl p-6 border border-rose-200 shadow-2xs space-y-3">
        <h3 className="text-xs font-bold text-rose-900 uppercase tracking-wider">
          Reset Application Data
        </h3>
        <p className="text-xs text-rose-700">
          Clear all locally saved answers, chosen language, and restart onboarding from scratch.
        </p>
        <button
          onClick={handleReset}
          className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 active:scale-95"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t.settings.resetProfile}</span>
        </button>
      </div>
    </div>
  );
};
