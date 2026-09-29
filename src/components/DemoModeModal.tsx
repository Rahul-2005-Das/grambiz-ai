import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Play, CheckCircle2, ArrowRight, X, Compass, Coins, FileText } from 'lucide-react';

interface DemoModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchDemo: (targetTab: string) => void;
}

export const DemoModeModal: React.FC<DemoModeModalProps> = ({
  isOpen,
  onClose,
  onLaunchDemo
}) => {
  const { language, setLanguage } = useLanguage();
  const { updateUser, setHasCompletedOnboarding } = useAuth();

  if (!isOpen) return null;

  const handleStartSIHDemo = () => {
    // 1. Seed demo state per Phase 33 specifications:
    // Language: Bengali (বাংলা)
    setLanguage('bn');

    // Location: Ranaghat, Nadia, West Bengal | Margin: ₹1,00,000 | Business: Mini Dairy
    updateUser({
      name: 'Ramesh Das (রমেশ দাস)',
      phone: '9876543210',
      state: 'West Bengal',
      district: 'Nadia',
      villageOrTown: 'Ranaghat Block Center',
      availableCapital: 100000, // ₹1,00,000 margin capital
      businessCategory: 'Dairy',
      selectedBusiness: 'Mini Dairy & Fresh Milk Collection',
      skills: ['agri', 'shop'],
      hasSpaceOrShop: true,
      workPreference: 'full_time',
      onboardingCompleted: true
    });
    setHasCompletedOnboarding(true);

    // Launch directly to Hyper-Local Feasibility or Discovery per demo script
    onLaunchDemo('feasibility');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-stone-200 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-bold flex items-center justify-center text-sm">
              🎯
            </span>
            <div>
              <h3 className="text-base font-black text-stone-900">
                SIH Hackathon Presentation Mode
              </h3>
              <p className="text-[11px] text-stone-500">
                1-Click Pre-Configured End-to-End Evaluation Scenario
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo Scenario Summary */}
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs space-y-2 text-emerald-950">
          <span className="font-bold text-emerald-900 block text-[11px] uppercase tracking-wider">
            Pre-Seeded Micro-Entrepreneur Profile:
          </span>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div>• <strong>Language:</strong> বাংলা (Bengali UI & Voice)</div>
            <div>• <strong>Location:</strong> Ranaghat, Nadia (WB)</div>
            <div>• <strong>Margin Capital:</strong> ₹1,00,000 (10% Stake)</div>
            <div>• <strong>Category:</strong> Mini Dairy & Milk Collection</div>
            <div>• <strong>Total Project Cost:</strong> ₹10,00,000</div>
            <div>• <strong>Scheme Routed:</strong> Term Loan Scheme (8%)</div>
          </div>
        </div>

        {/* Step-by-Step 3-5 Minute Journey */}
        <div className="space-y-1.5 text-xs text-stone-700">
          <span className="font-bold text-stone-900 block text-[11px] uppercase tracking-wider">
            Walkthrough Sequence (3–5 Minutes):
          </span>
          <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
            <span>Hyper-Local Feasibility: 10 Dimensions + Visual SWOT + Local Threats</span>
          </div>
          <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
            <span>Smart Structuring: ₹1L Margin → ₹10L Cost → ₹9L Term Loan at 8%</span>
          </div>
          <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] font-bold shrink-0">3</span>
            <span>Repayment Engine: Monthly EMI + Quarterly Schedule + 6 Mo Moratorium</span>
          </div>
          <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] font-bold shrink-0">4</span>
            <span>Complete Feasibility Report: Official Bank-Ready DPR & 1-Click PDF</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="pt-2 flex items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100"
          >
            Cancel
          </button>
          <button
            onClick={handleStartSIHDemo}
            className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Launch Guided Demo Scenario</span>
          </button>
        </div>
      </div>
    </div>
  );
};
