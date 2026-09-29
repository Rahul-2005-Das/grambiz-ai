import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Home, Bot, TrendingUp, Wallet, MoreHorizontal, Sparkles, BookOpen, ShieldCheck, CheckSquare, Settings, FileText, HelpCircle, Layers } from 'lucide-react';

interface MobileBottomNavProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ currentTab, setCurrentTab }) => {
  const { t } = useLanguage();
  const [moreOpen, setMoreOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t.nav.home, icon: Home },
    { id: 'advisor', label: t.nav.advisor, icon: Bot, isSpecial: true },
    { id: 'discover', label: t.nav.discover, icon: TrendingUp },
    { id: 'money', label: t.nav.money, icon: Wallet },
    { id: 'more', label: t.nav.more, icon: MoreHorizontal, isMoreTrigger: true },
  ];

  return (
    <>
      {/* More Sheet overlay */}
      {moreOpen && (
        <div
          className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-50 md:hidden animate-in fade-in"
          onClick={() => setMoreOpen(false)}
        >
          <div
            className="absolute bottom-16 left-0 right-0 bg-white rounded-t-3xl border-t border-stone-200 shadow-2xl p-5 space-y-4 max-h-[75vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1.5 bg-stone-300 rounded-full mx-auto mb-2" />
            <div className="text-sm font-bold text-stone-900 pb-2 border-b border-stone-100 flex items-center justify-between">
              <span>{t.nav.more}</span>
              <span className="text-xs font-normal text-stone-500">GramBiz AI</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => { setCurrentTab('market'); setMoreOpen(false); }}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 hover:bg-emerald-50 text-left border border-stone-200/60"
              >
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
                  <Layers className="w-4 h-4" />
                </div>
                <div className="text-xs font-semibold text-stone-800">{t.nav.market}</div>
              </button>

              <button
                onClick={() => { setCurrentTab('funding'); setMoreOpen(false); }}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 hover:bg-emerald-50 text-left border border-stone-200/60"
              >
                <div className="p-2 rounded-lg bg-amber-100 text-amber-700">
                  <Wallet className="w-4 h-4" />
                </div>
                <div className="text-xs font-semibold text-stone-800">{t.nav.funding}</div>
              </button>

              <button
                onClick={() => { setCurrentTab('plan'); setMoreOpen(false); }}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 hover:bg-emerald-50 text-left border border-stone-200/60"
              >
                <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="text-xs font-semibold text-stone-800">{t.nav.plan}</div>
              </button>

              <button
                onClick={() => { setCurrentTab('health'); setMoreOpen(false); }}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 hover:bg-emerald-50 text-left border border-stone-200/60"
              >
                <div className="p-2 rounded-lg bg-teal-100 text-teal-700">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-xs font-semibold text-stone-800">{t.nav.health}</div>
              </button>

              <button
                onClick={() => { setCurrentTab('daily'); setMoreOpen(false); }}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 hover:bg-emerald-50 text-left border border-stone-200/60"
              >
                <div className="p-2 rounded-lg bg-purple-100 text-purple-700">
                  <CheckSquare className="w-4 h-4" />
                </div>
                <div className="text-xs font-semibold text-stone-800">{t.nav.daily}</div>
              </button>

              <button
                onClick={() => { setCurrentTab('tracker'); setMoreOpen(false); }}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 hover:bg-emerald-50 text-left border border-stone-200/60"
              >
                <div className="p-2 rounded-lg bg-indigo-100 text-indigo-700">
                  <Wallet className="w-4 h-4" />
                </div>
                <div className="text-xs font-semibold text-stone-800">{t.nav.tracker}</div>
              </button>

              <button
                onClick={() => { setCurrentTab('problem'); setMoreOpen(false); }}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 hover:bg-emerald-50 text-left border border-stone-200/60"
              >
                <div className="p-2 rounded-lg bg-rose-100 text-rose-700">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div className="text-xs font-semibold text-stone-800">{t.nav.problem}</div>
              </button>

              <button
                onClick={() => { setCurrentTab('learn'); setMoreOpen(false); }}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 hover:bg-emerald-50 text-left border border-stone-200/60"
              >
                <div className="p-2 rounded-lg bg-yellow-100 text-yellow-700">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="text-xs font-semibold text-stone-800">{t.nav.learn}</div>
              </button>

              <button
                onClick={() => { setCurrentTab('reports'); setMoreOpen(false); }}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 hover:bg-emerald-50 text-left border border-stone-200/60"
              >
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="text-xs font-semibold text-stone-800">{t.nav.reports}</div>
              </button>

              <button
                onClick={() => { setCurrentTab('settings'); setMoreOpen(false); }}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 hover:bg-emerald-50 text-left border border-stone-200/60"
              >
                <div className="p-2 rounded-lg bg-stone-200 text-stone-700">
                  <Settings className="w-4 h-4" />
                </div>
                <div className="text-xs font-semibold text-stone-800">{t.nav.settings}</div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-lg pb-safe">
        <div className="grid grid-cols-5 items-center h-16 px-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.isMoreTrigger) {
                    setMoreOpen(!moreOpen);
                  } else {
                    setCurrentTab(item.id);
                    setMoreOpen(false);
                  }
                }}
                className={`min-h-[48px] flex flex-col items-center justify-center relative transition-colors ${
                  isActive
                    ? 'text-emerald-700 font-bold'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                {item.isSpecial ? (
                  <div className="w-10 h-10 -mt-3.5 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md active:scale-95 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                ) : (
                  <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                )}
                <span className={`text-[10px] tracking-tight mt-1 truncate max-w-[62px] ${isActive ? 'font-bold text-emerald-800' : 'font-medium'}`}>
                  {item.label}
                </span>
                {isActive && !item.isSpecial && (
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 absolute bottom-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
