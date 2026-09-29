import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Globe, Mic, Volume2, VolumeX, Menu, X, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab }) => {
  const { language, setLanguage, t, isSpeaking, stopSpeaking } = useLanguage();
  const { user } = useAuth();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const languages: { code: Language; label: string; native: string }[] = [
    { code: 'bn', label: 'Bengali', native: 'বাংলা' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'en', label: 'English', native: 'English' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar Contract: 3 zones */}
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentTab('home')}
              className="text-left group flex items-center gap-2.5 focus:outline-hidden"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                🌱
              </div>
              <span className="text-xl font-extrabold tracking-tight text-emerald-950 font-display">
                GramBiz AI
              </span>
            </button>
          </div>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
            <button
              onClick={() => setCurrentTab('home')}
              className={`hover:text-emerald-700 transition-colors py-1 ${
                currentTab === 'home' ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600' : ''
              }`}
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => setCurrentTab('discover')}
              className={`hover:text-emerald-700 transition-colors py-1 ${
                currentTab === 'discover' ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600' : ''
              }`}
            >
              {t.nav.discover}
            </button>
            <button
              onClick={() => setCurrentTab('advisor')}
              className={`hover:text-emerald-700 transition-colors py-1 ${
                currentTab === 'advisor' ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600' : ''
              }`}
            >
              {t.nav.advisor}
            </button>
            <button
              onClick={() => setCurrentTab('market')}
              className={`hover:text-emerald-700 transition-colors py-1 ${
                currentTab === 'market' ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600' : ''
              }`}
            >
              {t.nav.market}
            </button>
            <button
              onClick={() => setCurrentTab('money')}
              className={`hover:text-emerald-700 transition-colors py-1 ${
                currentTab === 'money' ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600' : ''
              }`}
            >
              {t.nav.money}
            </button>
            <button
              onClick={() => setCurrentTab('reports')}
              className={`hover:text-emerald-700 transition-colors py-1 ${
                currentTab === 'reports' ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600' : ''
              }`}
            >
              {t.nav.reports}
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-2.5">
            {/* Audio Stop Button if speaking */}
            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 rounded-lg hover:bg-rose-100 transition-colors"
                title={t.advisor.stopAudio}
              >
                <VolumeX className="w-4 h-4 animate-pulse text-rose-600" />
                <span className="hidden sm:inline">{t.advisor.stopAudio}</span>
              </button>
            )}

            {/* Voice Advisor Direct Action */}
            <button
              onClick={() => setCurrentTab('advisor')}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-all shadow-2xs whitespace-nowrap active:scale-95"
            >
              <Mic className="w-4 h-4 text-emerald-600" />
              <span className="font-medium">{t.advisor.speakBtn}</span>
            </button>

            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors border border-stone-200"
                aria-label="Change Language"
              >
                <Globe className="w-3.5 h-3.5 text-stone-500" />
                <span>
                  {languages.find((l) => l.code === language)?.native || 'English'}
                </span>
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-stone-200 rounded-xl shadow-lg py-1.5 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1 text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                    {t.nav.chooseLanguage}
                  </div>
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-stone-50 transition-colors ${
                        language === l.code ? 'font-bold text-emerald-700 bg-emerald-50/60' : 'text-stone-700'
                      }`}
                    >
                      <span>{l.native}</span>
                      <span className="text-[10px] text-stone-400">{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 py-3 space-y-1 shadow-lg">
          <button
            onClick={() => { setCurrentTab('home'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              currentTab === 'home' ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-stone-700'
            }`}
          >
            {t.nav.home}
          </button>
          <button
            onClick={() => { setCurrentTab('discover'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              currentTab === 'discover' ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-stone-700'
            }`}
          >
            {t.nav.discover}
          </button>
          <button
            onClick={() => { setCurrentTab('advisor'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              currentTab === 'advisor' ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-stone-700'
            }`}
          >
            {t.nav.advisor}
          </button>
          <button
            onClick={() => { setCurrentTab('market'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              currentTab === 'market' ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-stone-700'
            }`}
          >
            {t.nav.market}
          </button>
          <button
            onClick={() => { setCurrentTab('money'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              currentTab === 'money' ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-stone-700'
            }`}
          >
            {t.nav.money}
          </button>
          <button
            onClick={() => { setCurrentTab('funding'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              currentTab === 'funding' ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-stone-700'
            }`}
          >
            {t.nav.funding}
          </button>
          <button
            onClick={() => { setCurrentTab('plan'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              currentTab === 'plan' ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-stone-700'
            }`}
          >
            {t.nav.plan}
          </button>
          <button
            onClick={() => { setCurrentTab('health'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              currentTab === 'health' ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-stone-700'
            }`}
          >
            {t.nav.health}
          </button>
          <button
            onClick={() => { setCurrentTab('tracker'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              currentTab === 'tracker' ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-stone-700'
            }`}
          >
            {t.nav.tracker}
          </button>
          <button
            onClick={() => { setCurrentTab('problem'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              currentTab === 'problem' ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-stone-700'
            }`}
          >
            {t.nav.problem}
          </button>
          <button
            onClick={() => { setCurrentTab('learn'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              currentTab === 'learn' ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-stone-700'
            }`}
          >
            {t.nav.learn}
          </button>
          <button
            onClick={() => { setCurrentTab('reports'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              currentTab === 'reports' ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-stone-700'
            }`}
          >
            {t.nav.reports}
          </button>
          <button
            onClick={() => { setCurrentTab('settings'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
              currentTab === 'settings' ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-stone-700'
            }`}
          >
            {t.nav.settings}
          </button>
        </div>
      )}
    </header>
  );
};
