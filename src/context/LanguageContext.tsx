import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';
import { en } from '../data/translations/en';
import { bn } from '../data/translations/bn';
import { hi } from '../data/translations/hi';
import { VoiceHelper } from '../services/voiceService';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof en;
  speak: (text: string) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
}

const translations = { en, bn, hi };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('grambiz_lang');
      if (saved === 'bn' || saved === 'hi' || saved === 'en') {
        return saved;
      }
    }
    return 'en';
  });

  const [isSpeaking, setIsSpeaking] = useState(false);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('grambiz_lang', lang);
    }
  };

  const speak = (text: string) => {
    setIsSpeaking(true);
    VoiceHelper.speak(text, language, () => {
      setIsSpeaking(false);
    });
  };

  const stopSpeaking = () => {
    VoiceHelper.stopSpeaking();
    setIsSpeaking(false);
  };

  const t = translations[language] || en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, speak, stopSpeaking, isSpeaking }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
