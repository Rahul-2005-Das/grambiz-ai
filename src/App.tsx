import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Landing } from './pages/Landing';
import { LanguageSelection } from './pages/LanguageSelection';
import { Onboarding } from './pages/Onboarding';
import { Dashboard } from './pages/Dashboard';
import { BusinessDiscovery } from './pages/BusinessDiscovery';
import { AIAdvisor } from './pages/AIAdvisor';
import { LocalMarket } from './pages/LocalMarket';
import { FinancialPlanner } from './pages/FinancialPlanner';
import { Funding } from './pages/Funding';
import { BusinessPlan } from './pages/BusinessPlan';
import { BusinessHealth } from './pages/BusinessHealth';
import { DailyHelper } from './pages/DailyHelper';
import { SalesExpenses } from './pages/SalesExpenses';
import { ProblemSolver } from './pages/ProblemSolver';
import { Learning } from './pages/Learning';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { BusinessIdea } from './types';

const MainAppContent: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { user, hasCompletedOnboarding } = useAuth();

  // Screen controller: 'landing' | 'language' | 'onboarding' | 'app'
  const [screen, setScreen] = useState<'landing' | 'language' | 'onboarding' | 'app'>(() => {
    if (typeof window !== 'undefined') {
      const hasChosenLang = localStorage.getItem('grambiz_lang_chosen');
      const savedUser = localStorage.getItem('grambiz_user');
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          if (parsed.onboardingCompleted) {
            return 'app';
          }
        } catch (e) {
          // ignore
        }
      }
      if (!hasChosenLang) {
        return 'language'; // First launch per requirements: "On first launch show: Choose Your Language"
      }
    }
    return 'landing';
  });

  // Active tab within 'app' view
  const [currentTab, setCurrentTab] = useState<string>('home');

  const handleLanguageChosen = () => {
    setScreen('onboarding');
  };

  const handleStartFromLanding = () => {
    if (hasCompletedOnboarding) {
      setScreen('app');
    } else {
      setScreen('language');
    }
  };

  const handleSelectBusinessFromDiscovery = (idea: BusinessIdea) => {
    // Navigate straight to financial planning with selected business context
    setCurrentTab('money');
  };

  // Accessibility class modifiers
  const a11yClass = `${user.accessibility.largeText ? 'text-lg leading-relaxed' : ''} ${
    user.accessibility.highContrast ? 'contrast-125' : ''
  } ${user.accessibility.largeButtons ? '[&_button]:min-h-[50px] [&_button]:text-base' : ''}`;

  return (
    <div className={`min-h-screen bg-stone-50 text-stone-900 ${a11yClass}`}>
      {/* 1. First-launch Language Selection */}
      {screen === 'language' && (
        <LanguageSelection onLanguageChosen={handleLanguageChosen} />
      )}

      {/* 2. Public Landing Page */}
      {screen === 'landing' && (
        <>
          <Navbar currentTab={currentTab} setCurrentTab={() => setScreen('app')} />
          <Landing
            onStart={handleStartFromLanding}
            onExplore={() => setScreen('app')}
          />
        </>
      )}

      {/* 3. Step-by-Step Onboarding */}
      {screen === 'onboarding' && (
        <Onboarding
          onComplete={() => {
            setScreen('app');
            setCurrentTab('home');
          }}
        />
      )}

      {/* 4. Main Application Dashboard & Tools */}
      {screen === 'app' && (
        <div className="flex flex-col min-h-screen">
          <Navbar
            currentTab={currentTab}
            setCurrentTab={(tab) => {
              if (tab === 'landing') {
                setScreen('landing');
              } else {
                setCurrentTab(tab);
              }
            }}
          />

          <div className="flex-1 flex w-full">
            {/* Desktop Sidebar */}
            <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

            {/* Main Content Area */}
            <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full pb-20 md:pb-8">
              {currentTab === 'home' && <Dashboard onNavigate={setCurrentTab} />}
              {currentTab === 'discover' && (
                <BusinessDiscovery onSelectBusiness={handleSelectBusinessFromDiscovery} />
              )}
              {currentTab === 'advisor' && <AIAdvisor />}
              {currentTab === 'market' && <LocalMarket />}
              {currentTab === 'money' && <FinancialPlanner />}
              {currentTab === 'funding' && <Funding />}
              {currentTab === 'plan' && <BusinessPlan />}
              {currentTab === 'health' && <BusinessHealth />}
              {currentTab === 'daily' && <DailyHelper />}
              {currentTab === 'tracker' && <SalesExpenses />}
              {currentTab === 'problem' && <ProblemSolver />}
              {currentTab === 'learn' && <Learning />}
              {currentTab === 'reports' && <Reports />}
              {currentTab === 'settings' && (
                <Settings onRestartOnboarding={() => setScreen('language')} />
              )}
            </main>
          </div>

          {/* Mobile Bottom Navigation Bar */}
          <MobileBottomNav currentTab={currentTab} setCurrentTab={setCurrentTab} />
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <MainAppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}
