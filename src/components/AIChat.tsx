import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { VoiceButton } from './VoiceButton';
import {
  Bot,
  Send,
  Volume2,
  VolumeX,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Wallet,
  TrendingUp,
  HelpCircle,
  RotateCcw,
  Copy,
  Check,
  Download,
  SlidersHorizontal,
  Landmark,
  Package,
  Layers
} from 'lucide-react';
import { AIAdvisorMessage } from '../types';

type RoleMode = 'general' | 'financial' | 'growth' | 'schemes' | 'operations';

export const AIChat: React.FC = () => {
  const { language, t, speak, stopSpeaking, isSpeaking } = useLanguage();
  const { user } = useAuth();

  const [roleMode, setRoleMode] = useState<RoleMode>('general');
  const [inputQuestion, setInputQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial greeting
  const [messages, setMessages] = useState<AIAdvisorMessage[]>([
    {
      id: 'msg_welcome',
      sender: 'ai',
      text:
        language === 'bn'
          ? `নমস্কার ${user.name}! আমি গ্রামবিজ এআই-এর সিনিয়র ব্যবসায়িক পরামর্শক। আপনার এলাকার চাহিদা, পুঁজির হিসাব, লাভজনক ব্যবসা নির্বাচন বা সরকারি অনুদান নিয়ে যেকোনো প্রশ্ন জিজ্ঞাসা করতে পারেন। আমি ধাপে ধাপে আপনার সাথে কথা বলব।`
          : language === 'hi'
          ? `नमस्ते ${user.name}! मैं ग्रामबिज़ एआई का वरिष्ठ व्यापार सलाहकार हूँ। पूंजी की व्यवस्था, सही व्यापार का चयन, मुनाफा बढ़ाने या सरकारी योजनाओं से जुड़ा कोई भी सवाल पूछें। मैं लगातार आपके साथ बातचीत के रूप में मार्गदर्शन करूँगा।`
          : `Namaste ${user.name}! I am your Senior Rural Business Consultant at GramBiz AI. Ask me anything about selecting a business, calculating capital, accelerating sales, or securing low-interest microcredit. How can I assist your business today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Contextual follow-up suggestions based on active role
  const roleModes: { id: RoleMode; label: string; icon: any; desc: string }[] = [
    {
      id: 'general',
      label: language === 'bn' ? 'প্রধান পরামর্শক' : language === 'hi' ? 'मुख्य सलाहकार' : 'Lead Advisor',
      icon: Bot,
      desc: 'Holistic micro-enterprise guidance'
    },
    {
      id: 'financial',
      label: language === 'bn' ? 'আর্থিক বিশ্লেষক' : language === 'hi' ? 'पूंजी व लाभ' : 'Financial Analyst',
      icon: Wallet,
      desc: 'Unit economics, margins & cash flow'
    },
    {
      id: 'growth',
      label: language === 'bn' ? 'বিক্রি ও গ্রাহক বৃদ্ধি' : language === 'hi' ? 'बिक्री वृद्धि' : 'Growth & Sales',
      icon: TrendingUp,
      desc: 'Customer acquisition & village haat marketing'
    },
    {
      id: 'schemes',
      label: language === 'bn' ? 'সরকারি অনুদান ও ঋণ' : language === 'hi' ? 'सरकारी योजनाएं' : 'Schemes & Credit',
      icon: Landmark,
      desc: 'Mudra, SHG, and bank credit eligibility'
    },
    {
      id: 'operations',
      label: language === 'bn' ? 'স্টক ও পরিচালনা' : language === 'hi' ? 'स्टॉक व संचालन' : 'Operations',
      icon: Package,
      desc: 'Mandi sourcing & inventory rotation'
    }
  ];

  const quickPromptsByRole: Record<RoleMode, string[]> = {
    general: [
      t.advisor.quickPrompt1,
      t.advisor.quickPrompt2,
      t.advisor.quickPrompt3,
      'How to set up a new shop step by step?'
    ],
    financial: [
      'How much working capital do I need for 2 months?',
      'How to calculate exact break-even sales for my shop?',
      'What is a safe profit margin after deducting my family salary?',
      'Why does my cash run out even though sales look good?'
    ],
    growth: [
      'How to attract 30 new regular customers in 30 days?',
      'How to use WhatsApp groups to get pre-orders in the village?',
      'What special offers work best during festive seasons?',
      'How can I compete with older established village shops?'
    ],
    schemes: [
      'How to apply for Mudra Shishu loan without collateral?',
      'What subsidy schemes are available through local women SHGs?',
      'What documents do rural banks ask for micro-enterprise credit?',
      'How does PM-FME or PMEGP margin money assistance work?'
    ],
    operations: [
      'How to negotiate wholesale rates at the block mandi?',
      'What should I do with inventory that hasn\'t sold in 30 days?',
      'How to maintain dairy milk hygiene during peak summer?',
      'How to prevent raw spice dampness during monsoon?'
    ]
  };

  const handleSend = async (questionText: string) => {
    const q = questionText.trim();
    if (!q || loading) return;

    const userMsg: AIAdvisorMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    setInputQuestion('');
    setLoading(true);

    try {
      // Format messages history for multi-turn Gemini API
      const formattedForApi = updatedHistory.map((m) => ({
        role: (m.sender === 'user' ? 'user' : 'model') as 'user' | 'model',
        text: m.text
      }));

      const res = await api.sendChatMessage({
        messages: formattedForApi,
        roleMode,
        language,
        userProfile: user
      });

      const replyText = res?.text || 'I have analyzed your situation. Here are practical next steps.';

      const aiMsg: AIAdvisorMessage = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Chat error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    if (window.confirm(language === 'bn' ? 'কথোপকথন মুছে নতুন আলোচনা শুরু করবেন?' : 'Start a fresh consultation thread?')) {
      stopSpeaking();
      setMessages([
        {
          id: `msg_welcome_${Date.now()}`,
          sender: 'ai',
          text:
            language === 'bn'
              ? `নতুন আলোচনা শুরু হলো। আপনার ব্যবসা বা আর্থিক প্রশ্ন জিজ্ঞাসা করুন।`
              : `Thread reset. Please ask any new question regarding your business or capital planning.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  };

  const handleExportChat = () => {
    const transcript = messages
      .map(
        (m) =>
          `[${m.timestamp}] ${m.sender === 'user' ? user.name : 'GramBiz AI Consultant'}:\n${m.text}\n`
      )
      .join('\n---\n\n');

    const blob = new Blob([transcript], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `GramBiz_AI_Consultation_${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeakMessage = (text: string) => {
    speak(text);
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden flex flex-col h-[750px] max-h-[85vh]">
      {/* 1. Header with Role Mode Switcher & Export */}
      <div className="px-5 py-3.5 bg-stone-900 text-white flex flex-wrap items-center justify-between gap-3 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
            🌱
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold tracking-tight text-white">
                GramBiz AI · Senior Advisor
              </h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] bg-stone-800 text-emerald-300 font-semibold px-2 py-0.5 rounded-full border border-stone-700">
                Multi-Turn Mode
              </span>
            </div>
            <p className="text-[11px] text-stone-400">
              {roleModes.find((r) => r.id === roleMode)?.desc}
            </p>
          </div>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-2">
          {isSpeaking && (
            <button
              onClick={stopSpeaking}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600/90 hover:bg-rose-600 text-xs font-semibold text-white transition-all animate-pulse"
              title="Stop Audio"
            >
              <VolumeX className="w-3.5 h-3.5" />
              <span>Stop</span>
            </button>
          )}

          <button
            onClick={handleExportChat}
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
            title="Download Consultation Notes"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={handleClearChat}
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
            title="Restart Chat Thread"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Specialized Persona Role Switcher Tabs */}
      <div className="px-4 py-2 bg-stone-100/80 border-b border-stone-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {roleModes.map((rm) => {
          const Icon = rm.icon;
          const isActive = roleMode === rm.id;
          return (
            <button
              key={rm.id}
              onClick={() => setRoleMode(rm.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'bg-white text-stone-700 hover:bg-stone-200/80 border border-stone-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{rm.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Role-Specific Prompt Suggestions Strip */}
      <div className="px-4 py-2 bg-stone-50 border-b border-stone-200/60 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider shrink-0">
          Suggested:
        </span>
        {quickPromptsByRole[roleMode].map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            disabled={loading}
            className="text-xs text-stone-700 bg-white hover:bg-emerald-50 hover:text-emerald-800 border border-stone-200 hover:border-emerald-300 rounded-lg px-3 py-1.5 whitespace-nowrap transition-all shadow-2xs shrink-0 active:scale-95"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* 4. Multi-Turn Chat Scrollable Thread */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
        {messages.map((m) => {
          const isUser = m.sender === 'user';
          return (
            <div
              key={m.id}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[90%] sm:max-w-[82%] rounded-3xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed transition-all ${
                  isUser
                    ? 'bg-emerald-700 text-white rounded-br-xs shadow-xs'
                    : 'bg-stone-50 border border-stone-200/90 text-stone-900 rounded-bl-xs shadow-xs'
                }`}
              >
                {!isUser && (
                  <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-stone-200/70">
                    <span className="font-bold text-emerald-800 text-xs flex items-center gap-1.5">
                      <Bot className="w-4 h-4 text-emerald-700" />
                      <span>GramBiz AI · {roleModes.find((r) => r.id === roleMode)?.label}</span>
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleSpeakMessage(m.text)}
                        className="p-1 rounded-md text-stone-500 hover:text-emerald-700 hover:bg-stone-200/60 transition-colors"
                        title="Listen to Advice"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
                      </button>

                      <button
                        onClick={() => handleCopyMessage(m.id, m.text)}
                        className="p-1 rounded-md text-stone-500 hover:text-stone-800 hover:bg-stone-200/60 transition-colors"
                        title="Copy Response"
                      >
                        {copiedId === m.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                <div className="whitespace-pre-line font-normal">{m.text}</div>

                <div
                  className={`mt-2 text-[10px] text-right font-medium ${
                    isUser ? 'text-emerald-100' : 'text-stone-400'
                  }`}
                >
                  {m.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 text-xs text-stone-600 flex items-center gap-2.5 shadow-xs">
              <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
              <span>Analyzing market data & consulting rules...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 5. Input Bar with Voice & Multi-Turn submission */}
      <div className="p-3 sm:p-4 bg-stone-50 border-t border-stone-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputQuestion);
          }}
          className="flex items-center gap-2 sm:gap-3"
        >
          {/* Large touch voice button */}
          <VoiceButton
            size="sm"
            onTranscript={(spokenText) => {
              setInputQuestion(spokenText);
              handleSend(spokenText);
            }}
          />

          <input
            type="text"
            value={inputQuestion}
            onChange={(e) => setInputQuestion(e.target.value)}
            placeholder={
              language === 'bn'
                ? 'আপনার প্রশ্ন বাংলায় জিজ্ঞাসা করুন (মুখে বা লিখে)...'
                : language === 'hi'
                ? 'अपना सवाल हिन्दी में पूछें (बोलकर या लिखकर)...'
                : 'Ask anything about capital, market, prices, or schemes...'
            }
            disabled={loading}
            className="flex-1 bg-white border border-stone-300 rounded-2xl px-4 py-3 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder:text-stone-400"
          />

          <button
            type="submit"
            disabled={!inputQuestion.trim() || loading}
            className="min-h-[44px] min-w-[48px] px-4 bg-emerald-600 text-white rounded-2xl flex items-center justify-center font-bold text-xs sm:text-sm hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xs active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
