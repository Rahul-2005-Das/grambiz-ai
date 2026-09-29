import { Language } from '../types';

export class VoiceHelper {
  private static recognition: any = null;
  private static isListening: boolean = false;

  public static isSpeechRecognitionSupported(): boolean {
    return typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
  }

  public static isSpeechSynthesisSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  public static getLocaleCode(lang: Language): string {
    switch (lang) {
      case 'bn':
        return 'bn-IN';
      case 'hi':
        return 'hi-IN';
      case 'en':
      default:
        return 'en-IN';
    }
  }

  public static startListening(
    lang: Language,
    onResult: (text: string) => void,
    onError: (err: any) => void,
    onEnd: () => void
  ) {
    if (!this.isSpeechRecognitionSupported()) {
      onError(new Error('Speech recognition is not supported in this browser.'));
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.lang = this.getLocaleCode(lang);
      this.recognition.continuous = false;
      this.recognition.interimResults = false;

      this.recognition.onstart = () => {
        this.isListening = true;
      };

      this.recognition.onresult = (event: any) => {
        const transcript = event.results?.[0]?.[0]?.transcript;
        if (transcript) {
          onResult(transcript);
        }
      };

      this.recognition.onerror = (event: any) => {
        this.isListening = false;
        onError(event.error || event);
      };

      this.recognition.onend = () => {
        this.isListening = false;
        onEnd();
      };

      this.recognition.start();
    } catch (err) {
      this.isListening = false;
      onError(err);
    }
  }

  public static stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {
        // Ignore
      }
      this.isListening = false;
    }
  }

  public static speak(text: string, lang: Language, onEnd?: () => void) {
    if (!this.isSpeechSynthesisSupported()) {
      return;
    }

    // Cancel any previous speech
    window.speechSynthesis.cancel();

    // Clean markdown asterisks or special characters for speech
    const cleanText = text.replace(/[*#_`•]/g, ' ').replace(/\s+/g, ' ').trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = this.getLocaleCode(lang);
    utterance.rate = 0.95; // Slightly slower for clear rural comprehension
    utterance.pitch = 1.0;

    // Try finding matching voice
    const voices = window.speechSynthesis.getVoices();
    const prefix = lang === 'bn' ? 'bn' : lang === 'hi' ? 'hi' : 'en';
    const matchingVoice = voices.find(v => v.lang.toLowerCase().startsWith(prefix));
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    window.speechSynthesis.speak(utterance);
  }

  public static stopSpeaking() {
    if (this.isSpeechSynthesisSupported()) {
      window.speechSynthesis.cancel();
    }
  }
}
