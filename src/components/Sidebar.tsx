import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import {
  Home,
  TrendingUp,
  Bot,
  MapPin,
  Wallet,
  Coins,
  FileText,
  Activity,
  CalendarCheck,
  Receipt,
  HelpCircle,
  GraduationCap,
  ClipboardList,
  Sliders,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, setCurrentTab }) => {
  const { t } = useLanguage();
  const { user } = useAuth();

  const mainNav = [
    { id: 'home', label: t.nav.home, icon: Home },
    { id: 'advisor', label: t.nav.advisor, icon: Bot, badge: 'Voice' },
    { id: 'discover', label: t.nav.discover, icon: TrendingUp },
    { id: 'market', label: t.nav.market, icon: MapPin },
    { id: 'money', label: t.nav.money, icon: Wallet },
    { id: 'funding', label: t.nav.funding, icon: Coins },
  ];

  const toolsNav = [
    { id: 'plan', label: t.nav.plan, icon: FileText },
    { id: 'health', label: t.nav.health, icon: Activity },
    { id: 'daily', label: t.nav.daily, icon: CalendarCheck },
    { id: 'tracker', label: t.nav.tracker, icon: Receipt },
    { id: 'problem', label: t.nav.problem, icon: HelpCircle },
    { id: 'learn', label: t.nav.learn, icon: GraduationCap },
    { id: 'reports', label: t.nav.reports, icon: ClipboardList },
    { id: 'settings', label: t.nav.settings, icon: Sliders },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-stone-200 min-h-[calc(100vh-4rem)] p-4 shrink-0">
      {/* User profile snippet */}
      <div className="mb-6 p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white font-bold flex items-center justify-center text-sm shadow-2xs">
            {user.name.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-bold text-stone-900 truncate">{user.name}</h4>
            <p className="text-[11px] text-stone-500 truncate">
              {user.villageOrTown ? `${user.villageOrTown}, ` : ''}{user.district}
            </p>
          </div>
        </div>
        <div className="mt-2.5 pt-2 border-t border-stone-200/60 flex items-center justify-between text-[11px]">
          <span className="text-stone-500">Capital</span>
          <span className="font-semibold text-emerald-800">₹{user.availableCapital?.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Main Core Links */}
      <div className="space-y-1">
        <div className="px-3 pb-1 text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
          Core Advisory
        </div>
        {mainNav.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && !isActive && (
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-md">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Practical Tools Links */}
      <div className="mt-6 space-y-1">
        <div className="px-3 pb-1 text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
          Business Tools
        </div>
        {toolsNav.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Bottom helper card */}
      <div className="mt-auto pt-6">
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/70 text-emerald-950">
          <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-emerald-900">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>GramBiz AI</span>
          </div>
          <p className="text-[11px] text-emerald-800 leading-relaxed">
            {t.tagline}
          </p>
        </div>
      </div>
    </aside>
  );
};
