import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { AIChat } from '../components/AIChat';
import {
  Sparkles,
  Volume2,
  ShieldCheck,
  HeartHandshake,
  CheckCircle2,
  FileSpreadsheet,
  Award,
  BookOpen
} from 'lucide-react';

export const AIAdvisor: React.FC = () => {
  const { language, t } = useLanguage();
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-5 pb-12 font-sans">
      {/* Top Banner with Professional Credentials */}
      <div className="bg-linear-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-7 shadow-xs">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>{t.tagline} · AI Multi-Turn Advisory</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              {t.advisor.title}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-emerald-100 max-w-xl leading-relaxed">
              {language === 'bn'
                ? 'আপনার ব্যবসার হিসাব, লাভ ও সরকারি স্কিম নিয়ে সার্বক্ষণিক বিশেষজ্ঞ পরামর্শ নিন। বহু-ধাপের কথোপকথনের মাধ্যমে এআই আপনার প্রশ্নের প্রেক্ষাপট মনে রেখে সরাসরি সমাধান দেবে।'
                : language === 'hi'
                ? 'अपने व्यापार की पूंजी, मुनाफा व योजनाओं पर विशेषज्ञ सलाह लें। मल्टी-टर्न चैट में एआई आपके सवालों के पिछले संदर्भ को याद रखकर व्यावहारिक उत्तर देगा।'
                : 'Interactive conversational advisory maintaining full context across turns. Switch between Financial, Growth, Government Schemes, and Operations specialist personas.'}
            </p>
          </div>

          <div className="hidden sm:flex flex-col items-center justify-center p-3 rounded-2xl bg-white/10 border border-white/15 text-center shrink-0">
            <span className="text-2xl mb-1">🤖</span>
            <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">
              Gemini 3.8
            </span>
          </div>
        </div>

        {/* Advisory ground rules note */}
        <div className="mt-4 pt-3 border-t border-white/15 flex flex-wrap items-center gap-4 text-[11px] text-emerald-200">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span>Multi-Turn Memory</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-emerald-300" />
            <span>Specialized Personas</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Volume2 className="w-3.5 h-3.5 text-emerald-300" />
            <span>Voice & Audio Playback</span>
          </span>
          <span className="flex items-center gap-1.5">
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-300" />
            <span>Exportable Transcripts</span>
          </span>
        </div>
      </div>

      {/* Main Multi-Turn AI Chat Interface */}
      <AIChat />

      {/* Bottom disclaimer */}
      <p className="text-center text-xs text-stone-400 max-w-xl mx-auto leading-relaxed">
        {t.disclaimerNote}
      </p>
    </div>
  );
};
