import React, { useState } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { VoiceHelper } from '../services/voiceService';

interface VoiceButtonProps {
  onTranscript: (text: string) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const VoiceButton: React.FC<VoiceButtonProps> = ({
  onTranscript,
  className = '',
  size = 'md'
}) => {
  const { language, t } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const toggleListening = () => {
    if (isListening) {
      VoiceHelper.stopListening();
      setIsListening(false);
      return;
    }

    setErrorMessage(null);
    setIsListening(true);

    VoiceHelper.startListening(
      language,
      (text) => {
        setIsListening(false);
        if (text) onTranscript(text);
      },
      (err) => {
        setIsListening(false);
        console.warn('Speech recognition error:', err);
        setErrorMessage(
          language === 'bn'
            ? 'মাইক্রোফোন চালু করা যায়নি। অনুগ্রহ করে টাইপ করুন।'
            : language === 'hi'
            ? 'माइक शुरू नहीं हो सका। कृपया लिखकर पूछें।'
            : 'Microphone not accessible. Please type your query.'
        );
      },
      () => {
        setIsListening(false);
      }
    );
  };

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20'
  }[size];

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-9 h-9'
  }[size];

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={toggleListening}
        aria-label={isListening ? t.advisor.listening : t.advisor.speakBtn}
        className={`relative rounded-full flex items-center justify-center transition-all shadow-md active:scale-95 focus:outline-hidden ${
          isListening
            ? 'bg-rose-600 text-white animate-pulse ring-4 ring-rose-300'
            : 'bg-emerald-600 text-white hover:bg-emerald-700 ring-2 ring-emerald-200'
        } ${sizeClasses} ${className}`}
      >
        {isListening ? (
          <MicOff className={iconSizes} />
        ) : (
          <Mic className={iconSizes} />
        )}

        {isListening && (
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-rose-500" />
          </span>
        )}
      </button>

      {isListening && (
        <span className="mt-2 text-xs font-semibold text-rose-600 animate-pulse">
          {t.advisor.listening}
        </span>
      )}

      {errorMessage && (
        <span className="mt-1 text-[11px] text-amber-700 max-w-xs text-center">
          {errorMessage}
        </span>
      )}
    </div>
  );
};
