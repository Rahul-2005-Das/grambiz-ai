import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Home, Bot, TrendingUp, Wallet, MoreHorizontal, Sparkles, BookOpen, ShieldCheck, CheckSquare, Settings, FileText, HelpCircle, Layers, Compass, Coins } from 'lucide-react';

interface MobileBottomNavProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ currentTab, setCurrentTab }) => {
  const { t } = useLanguage();
  const [sheetType, setSheetType] = useState<'business' | 'money' | 'more' | null>(null);

  const navItems = [
    { id: 'home', label: t.nav.home, icon: Home },
    { id: 'advisor', label: t.nav.advisor, icon: Bot, isSpecial: true },
    { id: 'business', label: t.nav.myBusiness || 'Business', icon: Compass, sheet: 'business' as const },
    { id: 'moneyGroup', label: t.nav.money, icon: Coins, sheet: 'money' as const },
    { id: 'more', label: t.nav.more, icon: MoreHorizontal, sheet: 'more' as const },
  ];

  return (
    <>
      {/* Sheet overlay for grouped navigation */}
      {sheetType && (
        <div
          className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-50 md:hidden animate-in fade-in"
          onClick={() => setSheetType(null)}
        >
          <div
            className="absolute bottom-16 left-0 right-0 bg-white rounded-t-3xl border-t border-stone-200 shadow-2xl p-5 space-y-4 max-h-[75vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1.5 bg-stone-300 rounded-full mx-auto mb-2" />

            {/* Business Sheet */}
            {sheetType === 'business' && (
              <>
                <div className="text-sm font-bold text-stone-900 pb-2 border-b border-stone-100 flex items-center justify-between">
                  <span>{t.nav.myBusiness || 'My Business Hub'}</span>
                  <span className="text-xs font-normal text-stone-500">PS Feasibility & Growth</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => { setCurrentTab('feasibility'); setSheetType(null); }}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-left border border-emerald-300"
                  >
                    <div className="p-2 rounded-lg bg-emerald-600 text-white">
                      <Compass className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-emerald-950">{t.nav.feasibility || 'Feasibility'}</div>
                      <div className="text-[10px] text-emerald-800">10 PS Dimensions</div>
                    </div>
                  </button>

                  <button
                    onClick={() => { setCurrentTab('discover'); setSheetType(null); }}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 hover:bg-emerald-50 text-left border border-stone-200/60"
                  >
                    <div className="p-2 rounded-lg bg-teal-100 text-teal-700">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-semibold text-stone-800">{t.nav.discover}</div>
                  </button>

                  <button
                    onClick={() => { setCurrentTab('market'); setSheetType(null); }}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 hover:bg-emerald-50 text-left border border-stone-200/60"
                  >
                    <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-semibold text-stone-800">{t.nav.market}</div>
                  </button>

                  <button
                    onClick={() => { setCurrentTab('plan'); setSheetType(null); }}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 hover:bg-emerald-50 text-left border border-stone-200/60"
                  >
                    <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-semibold text-stone-800">{t.nav.plan}</div>
                  </button>

                  <button
                    onClick={() => { setCurrentTab('health'); setSheetType(null); }}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 hover:bg-emerald-50 text-left border border-stone-200/60"
                  >
                    <div className="p-2 rounded-lg bg-teal-100 text-teal-700">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-semibold text-stone-800">{t.nav.health}</div>
                  </button>
                </div>
              </>
            )}

            {/* Money Sheet */}
            {sheetType === 'money' && (
              <>
                <div className="text-sm font-bold text-stone-900 pb-2 border-b border-stone-100 flex items-center justify-between">
                  <span>{t.nav.money}</span>
                  <span className="text-xs font-normal text-stone-500">Scheme & Capital</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => { setCurrentTab('funding'); setSheetType(null); }}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-left border border-emerald-300"
                  >
                    <div className="p-2 rounded-lg bg-emerald-700 text-white">
                      <Coins className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-emerald-950">{t.nav.funding || 'Scheme Router'}</div>
                      <div className="text-[10px] text-emerald-800">Margin / 10% · 90% Debt</div>
                    </div>
                  </button>

                  <button
                    onClick={() => { setCurrentTab('money'); setSheetType(null); }}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 hover:bg-stone-100 text-left border border-stone-200/60"
                  >
                    <div className="p-2 rounded-lg bg-amber-100 text-amber-700">
                      <Wallet className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-semibold text-stone-800">{t.nav.money}</div>
                  </button>

                  <button
                    onClick={() => { setCurrentTab('tracker'); setSheetType(null); }}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 hover:bg-stone-100 text-left border border-stone-200/60"
                  >
                    <div className="p-2 rounded-lg bg-indigo-100 text-indigo-700">
                      <Wallet className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-semibold text-stone-800">{t.nav.tracker}</div>
                  </button>
                </div>
              </>
            )}

            {/* More Sheet */}
            {sheetType === 'more' && (
              <>
                <div className="text-sm font-bold text-stone-900 pb-2 border-b border-stone-100 flex items-center justify-between">
                  <span>{t.nav.more}</span>
                  <span className="text-xs font-normal text-stone-500">GramBiz AI</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => { setCurrentTab('reports'); setSheetType(null); }}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-left border border-emerald-300"
                  >
                    <div className="p-2 rounded-lg bg-emerald-700 text-white">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-emerald-950">{t.nav.reports}</div>
                      <div className="text-[10px] text-emerald-800">Bank DPR & PDF</div>
                    </div>
                  </button>

                  <button
                    onClick={() => { setCurrentTab('daily'); setSheetType(null); }}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 hover:bg-stone-100 text-left border border-stone-200/60"
                  >
                    <div className="p-2 rounded-lg bg-purple-100 text-purple-700">
                      <CheckSquare className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-semibold text-stone-800">{t.nav.daily}</div>
                  </button>

                  <button
                    onClick={() => { setCurrentTab('problem'); setSheetType(null); }}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 hover:bg-stone-100 text-left border border-stone-200/60"
                  >
                    <div className="p-2 rounded-lg bg-rose-100 text-rose-700">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-semibold text-stone-800">{t.nav.problem}</div>
                  </button>

                  <button
                    onClick={() => { setCurrentTab('learn'); setSheetType(null); }}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 hover:bg-stone-100 text-left border border-stone-200/60"
                  >
                    <div className="p-2 rounded-lg bg-yellow-100 text-yellow-700">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-semibold text-stone-800">{t.nav.learn}</div>
                  </button>

                  <button
                    onClick={() => { setCurrentTab('settings'); setSheetType(null); }}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 hover:bg-stone-100 text-left border border-stone-200/60"
                  >
                    <div className="p-2 rounded-lg bg-stone-200 text-stone-700">
                      <Settings className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-semibold text-stone-800">{t.nav.settings}</div>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Fixed Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-lg pb-safe">
        <div className="grid grid-cols-5 items-center h-16 px-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isSheetActive = sheetType === item.sheet;
            const isActive = currentTab === item.id || isSheetActive;

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.sheet) {
                    setSheetType(sheetType === item.sheet ? null : item.sheet);
                  } else {
                    setCurrentTab(item.id);
                    setSheetType(null);
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
