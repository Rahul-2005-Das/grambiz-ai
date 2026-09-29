import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { formatINR } from '../services/financialService';
import { calculateSmartStructuring, calculateRepaymentDetails } from '../data/schemeConfig';
import { getFeasibilityFor } from '../data/feasibilityData';
import {
  FileText,
  Printer,
  Sparkles,
  MapPin,
  Wallet,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Download,
  ShieldCheck,
  Building,
  Calendar,
  Check,
  Award,
  Layers,
  Phone,
  UserCheck,
  Code,
  Cpu,
  Compass,
  ArrowRight,
  Database,
  Smartphone,
  BookOpen
} from 'lucide-react';

export const Reports: React.FC = () => {
  const { language, t } = useLanguage();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'dpr' | 'docs'>('dpr');
  const [downloading, setDownloading] = useState(false);

  const margin = user.availableCapital || 100000;
  const structuring = calculateSmartStructuring(margin);
  const scheme = structuring.recommendedScheme;
  const repayment = calculateRepaymentDetails(
    structuring.eligibleLoanAmount || 90000,
    scheme ? scheme.interestRateAnnual : 8.0,
    scheme ? scheme.tenureMonths : 84,
    scheme ? scheme.moratoriumMonths : 6
  );
  const feasibility = getFeasibilityFor(
    user.state || 'West Bengal',
    user.district || 'Nadia',
    user.businessCategory || 'Dairy',
    margin
  );

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadDprText = () => {
    setDownloading(true);
    const reportText = `============================================================
GRAMBIZ AI - DETAILED PROJECT REPORT (DPR)
Rural Micro-Enterprise Advisory & Financial Structuring
============================================================

Date of Issue: ${new Date().toLocaleDateString()}
Report ID: GBIZ-DPR-${Date.now().toString().slice(-6)}

1. APPLICANT & ENTERPRISE PROFILE
------------------------------------------------------------
Applicant Name: ${user.name}
Contact Phone: ${user.phone || '9876543210'}
Location: ${user.villageOrTown || 'Ranaghat'}, District: ${user.district}, State: ${user.state}
Selected Business: ${user.selectedBusiness || 'Mini Dairy & Fresh Milk Collection'}
Business Category: ${user.businessCategory || 'Dairy & Livestock'}
Business Status: ${user.businessStatus === 'new' ? 'New Startup' : 'Existing Unit Expansion'}
Operational Space: ${user.hasSpaceOrShop ? 'Owned / Family Land' : 'Rented / Home Base'}
Work Commitment: ${user.workPreference === 'full_time' ? 'Full-Time (8-10 hrs/day)' : 'Part-Time'}

2. CAPITAL REQUIREMENT & STRUCTURING (INR)
------------------------------------------------------------
Own Available Margin Capital: ${formatINR(margin)} (10% Promoter Contribution)
Estimated Total Project Cost: ${formatINR(structuring.estimatedProjectCost)} (Margin / 10%)
Potential Debt / Loan Component: ${formatINR(structuring.eligibleLoanAmount)} (Up to 90%)
Recommended Scheme: ${scheme ? scheme.name : 'Institutional Term Loan'}
Annual Interest Rate: ${scheme ? scheme.interestRateAnnual : 8.0}% p.a.
Tenure: ${scheme ? scheme.tenureYears : 7} Years (${scheme ? scheme.tenureMonths : 84} Months)
Moratorium Grace Period: ${scheme ? scheme.moratoriumMonths : 6} Months

3. REPAYMENT & AMORTIZATION
------------------------------------------------------------
Estimated Monthly EMI: ${formatINR(repayment.monthlyEMI)} / month
Estimated Quarterly Repayment: ${formatINR(repayment.quarterlyRepayment)} / quarter
Estimated Total Interest: ${formatINR(repayment.totalInterest)}
Estimated Total Repayment: ${formatINR(repayment.totalRepayment)}

4. HYPER-LOCAL MARKET FEASIBILITY (${user.district}, ${user.state})
------------------------------------------------------------
Ground Demand Level: ${feasibility.localDemand.level}
Market Reach Radius: ~${feasibility.marketReach.estimatedRadiusKm} km (${feasibility.marketReach.potentialCustomerBase})
Primary Local Opportunity: ${feasibility.opportunityAnalysis.primaryOpportunity}
Underserved Local Niche: ${feasibility.opportunityAnalysis.underservedNiche}
Competitor Density (10km): ${feasibility.competitors.densityLevel} (${feasibility.competitors.estimatedCountIn10Km})
Local Pricing Range: ${feasibility.pricing.estimatedPriceRange}

5. RISK MITIGATION & OPERATING COVENANTS
------------------------------------------------------------
1. Strict 7-day revolving ceiling on customer credit with maximum ₹500 balance per household.
2. 10% emergency buffer preserved in separate bank account.
3. Advance pre-orders locked with local sweet stalls and households.

6. FIRST 30 DAYS ACTION PLAN
------------------------------------------------------------
- Days 1-7: Site preparation, shed disinfection, and initial feed wholesale procurement.
- Days 8-15: Sourcing 1st high-yield cow from verified veterinary certified fair.
- Days 16-23: Doorstep trial distribution to 20 neighbor households and 2 local sweet makers.
- Days 24-30: Cash collection routine, recording sales in Daily Khata, and reviewing health score.

7. BORROWER UNDERTAKING & BANK ENDORSEMENT
------------------------------------------------------------
Applicant Signature: _______________________ (${user.name})
Branch Appraiser Signature & Seal: _______________________

Disclaimer: This report contains AI-assisted estimates based on information provided by the user. Actual business performance may vary. GramBiz AI does not guarantee loan approval.
============================================================`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `GramBiz_AI_Project_Report_${user.name.replace(/\s+/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    setDownloading(false);
  };

  const handleDownloadTechnicalDocs = () => {
    setDownloading(true);
    const docText = `# GramBiz AI — Master Technical Dossier & Architecture Specification
Project: AI-Driven Hyper-Local Business Advisory and Financial Structuring Assistant for Rural Micro-Entrepreneurs

## 1. Executive Summary
GramBiz AI is a voice-first, multilingual digital business companion engineered for rural micro-entrepreneurs, self-help groups (SHGs), and first-generation village founders. By adhering strictly to "Less Reading. More Understanding", the platform converts complex financial mechanics into visual, conversational, and bank-grade decision tools in Bengali, Hindi, and English.

## 2. Architecture Overview
- Client Layer: React 19 SPA running on Vite, Tailwind CSS v4, Lucide icons, Recharts visualization engine.
- Voice & Speech Layer: Web Speech Recognition API with Bengali (bn-IN), Hindi (hi-IN), and Indian English (en-IN) recognition + SpeechSynthesis audio playback.
- Server Proxy Layer: Express.js running on Node.js mounted with Vite middleware for secure API routing and credential protection.
- AI Intelligence Layer: Google Gemini API (@google/genai) with gemini-3.8-flash for contextual business viability, capital allocation, and custom 1-page plans with local language fallback.
- Storage Layer: Modular In-Memory & LocalStorage session layer designed for straightforward PostgreSQL migration.

## 3. Tech Stack Matrix
- Frontend: React 19.0.1, TypeScript 5.8, Tailwind CSS v4.3.3, Lucide React 0.546.0, Recharts 3.x
- Backend: Express 4.21.2, Node.js 22 LTS, tsx 4.21
- AI: Google Gemini 3.8 Flash via @google/genai TypeScript SDK
- Output: Print-to-PDF CSS3 Paged Media + Plaintext DPR engine

## 4. Key Features & Module Specs
1. Multi-Language Switcher (English, বাংলা, हिन्दी)
2. 7-Step Low-Friction Guided Onboarding
3. Intelligent Business Discovery & Suitability Matching
4. Hyper-Local Market Intelligence Engine (district-level demand indexes)
5. Capital Structuring & Financial Calculator (Capex, Opex, Profit, Break-even, Buffer)
6. Government Micro-Credit & Scheme Advisor (Mudra, PMEGP, KCC, NRLM) with EMI Calculator
7. AI-Powered 1-Page Business Plan Generator
8. Bi-directional Voice AI Advisor with text-to-speech narration
9. 5-Factor Business Health Diagnostic Engine (Grades A through D)
10. Daily Business Helper & Voice Checklist
11. Daily Khata (Simplified In/Out Cash Book)
12. Crisis Action Problem Solver
13. Visual Learning Academy
14. Bank-Ready Detailed Project Report (DPR)

## 5. User Journey Flow
1. First-Run Language Selection -> 2. Guided Step-by-Step Onboarding -> 3. Action-Centric Dashboard -> 4. Business Discovery & Market Viability Check -> 5. Financial Structuring & Working Capital Buffer Allocation -> 6. Mudra Scheme & Loan Gap Assessment -> 7. Bank-Ready DPR Export (Print to PDF).
`;

    const blob = new Blob([docText], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `GramBiz_AI_Master_Documentation_${new Date().toISOString().slice(0, 10)}.md`;
    link.click();
    URL.revokeObjectURL(url);
    setDownloading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 font-sans print:max-w-none print:p-0">
      {/* Header bar (hidden in print) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-4 print:hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>Official Project Documentation & Bank DPR</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              {t.nav.reports}
            </h1>
            <p className="mt-1 text-sm text-stone-600">
              {language === 'bn'
                ? 'ব্যাংক ঋণ বা স্বনির্ভর গোষ্ঠীর জন্য প্রকল্প প্রতিবেদন ও সম্পূর্ণ সিস্টেম আর্কিটেকচার রিপোর্ট।'
                : 'Comprehensive bank feasibility report and complete architectural documentation ready for PDF export.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {activeTab === 'dpr' ? (
              <button
                onClick={handleDownloadDprText}
                className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center gap-1.5 border border-stone-300 transition-all active:scale-95"
              >
                <Download className="w-4 h-4 text-emerald-700" />
                <span>Download DPR Text</span>
              </button>
            ) : (
              <button
                onClick={handleDownloadTechnicalDocs}
                className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center gap-1.5 border border-stone-300 transition-all active:scale-95"
              >
                <Download className="w-4 h-4 text-emerald-700" />
                <span>Download Markdown</span>
              </button>
            )}

            <button
              onClick={handlePrint}
              className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 pt-2 border-t border-stone-200">
          <button
            onClick={() => setActiveTab('docs')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'docs'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Master System Documentation & Tech Report</span>
          </button>

          <button
            onClick={() => setActiveTab('dpr')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'dpr'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Bank Feasibility DPR (Form DPR-01)</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: Master System Documentation & Architectural Specification */}
      {activeTab === 'docs' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm space-y-8 print:border-none print:shadow-none print:p-0">
          {/* Top Title & Metadata */}
          <div className="pb-6 border-b-2 border-stone-200 flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-8 h-8 rounded-xl bg-emerald-700 text-white font-bold flex items-center justify-center text-sm">
                  🌱
                </span>
                <div>
                  <span className="text-xs font-black tracking-wider text-emerald-900 uppercase">
                    GramBiz AI · Technical Architecture & Master Project Report
                  </span>
                  <div className="text-[10px] text-stone-400">Specification Dossier v2.4 · Hackathon Evaluation Ready</div>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-stone-950 mt-2">
                GramBiz AI (গ্রামবিজ এআই / ग्रामबिज़ एआई)
              </h2>
              <p className="text-sm font-semibold text-emerald-800 mt-1">
                "AI-Driven Hyper-Local Business Advisory and Financial Structuring Assistant for Rural Micro-Entrepreneurs"
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-right shrink-0">
              <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">
                Audience & Scope
              </span>
              <span className="text-sm font-black text-stone-800">
                Rural Micro-Enterprises
              </span>
              <span className="text-[10px] text-stone-500 block mt-0.5">West Bengal, UP, Bihar & Pan-India</span>
            </div>
          </div>

          {/* Section 1: Executive Summary */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-stone-900">
              <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center">
                1
              </div>
              <h3 className="text-lg font-extrabold tracking-tight">Executive Summary</h3>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              <strong>GramBiz AI</strong> is an artificial intelligence-driven business advisory and financial structuring platform purpose-built for rural micro-entrepreneurs, Self-Help Group (SHG) members, and first-generation village founders. While conventional business software demands financial literacy and accounting terminology, GramBiz AI operates on the guiding principle of <strong>"LESS READING. MORE UNDERSTANDING."</strong> The system features native speech-to-text voice interaction in Bengali, Hindi, and English, high-contrast visual indicators, hyper-local market intelligence mapping, and an automated capital allocator that protects entrepreneurs from running out of liquidity.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="text-[11px] font-bold text-stone-500 uppercase block">Language Accessibility</span>
                <span className="text-sm font-bold text-stone-900 mt-0.5 block">বাংলা, हिन्दी, English</span>
                <span className="text-[10px] text-stone-500">Instant toggle across 100% of UI strings & AI guidance</span>
              </div>
              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="text-[11px] font-bold text-stone-500 uppercase block">Interaction Mode</span>
                <span className="text-sm font-bold text-stone-900 mt-0.5 block">Voice & Visual Cards</span>
                <span className="text-[10px] text-stone-500">Zero confusing accounting forms; bi-directional audio</span>
              </div>
              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="text-[11px] font-bold text-stone-500 uppercase block">Bank Feasibility</span>
                <span className="text-sm font-bold text-stone-900 mt-0.5 block">Bank-Grade DPR</span>
                <span className="text-[10px] text-stone-500">Mudra & PMEGP compliant loan appraisal formatting</span>
              </div>
            </div>
          </section>

          {/* Section 2: Architecture Overview */}
          <section className="space-y-3 pt-4 border-t border-stone-200">
            <div className="flex items-center gap-2 text-stone-900">
              <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center">
                2
              </div>
              <h3 className="text-lg font-extrabold tracking-tight">System Architecture Overview</h3>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              GramBiz AI implements a decoupled full-stack architecture running Node.js and Express as an intelligent server-side gateway that mounts Vite middlewares in development and serves optimized static assets in production. Client requests for AI intelligence are proxied through a secure Express gateway that interfaces with Google's Gemini SDK (`@google/genai`) to eliminate client-side key exposure and provide high-availability fallbacks.
            </p>

            {/* Architecture Flow Diagram Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-stone-900 text-stone-100 font-mono text-[11px] space-y-2 overflow-x-auto shadow-inner">
              <div className="text-emerald-400 font-bold">┌── CLIENT BROWSER (Rural Mobile / Low-Bandwidth Device) ──────────────────────────────┐</div>
              <div>│ • React 19 SPA + Tailwind CSS v4 UI Components                                       │</div>
              <div>│ • Web Speech API: Voice Recognition (bn-IN, hi-IN, en-IN) + Speech Synthesis          │</div>
              <div>│ • LocalStorage Cache: Language State, User Profile & Khata Entries                   │</div>
              <div>│ • Recharts Data Engine: Real-time Market Demand & Break-Even Area Charts             │</div>
              <div className="text-emerald-400">└───────────────────────────────┬───────────────────────────────────────────────────────┘</div>
              <div className="text-stone-400">                                │ HTTP REST / JSON API (Port 3000)</div>
              <div className="text-amber-400">┌── EXPRESS PROXY SERVER (Node.js 22 LTS Runtime) ──────────────────────────────────────┐</div>
              <div>│ • /api/ai/advisor         : Contextual voice/text micro-business advisory answers    │</div>
              <div>│ • /api/ai/recommendations : AI multi-factor business suitability scoring              │</div>
              <div>│ • /api/ai/financial       : Capital structuring & margin safety audits               │</div>
              <div>│ • /api/ai/business-plan   : Automated 1-page business plan generator                 │</div>
              <div>│ • /api/business & /finance: In-memory & SQLite modular data abstraction layer         │</div>
              <div className="text-amber-400">└───────────────────────────────┬───────────────────────────────────────────────────────┘</div>
              <div className="text-stone-400">                                │ gRPC / HTTPS Telemetry Protocol</div>
              <div className="text-cyan-400">┌── GOOGLE GEMINI AI ENGINE (@google/genai SDK) ────────────────────────────────────────┐</div>
              <div>│ • Model: gemini-3.8-flash (Sub-second latency, optimized for regional languages)     │</div>
              <div>│ • Hyper-Local Grounding: Tailored to Indian districts, Mandis, and SHG ecosystems     │</div>
              <div>│ • Graceful Offline Fallback Engine: Provides deterministic response on connectivity drops│</div>
              <div className="text-cyan-400">└───────────────────────────────────────────────────────────────────────────────────────┘</div>
            </div>
          </section>

          {/* Section 3: Tech Stack Details */}
          <section className="space-y-3 pt-4 border-t border-stone-200">
            <div className="flex items-center gap-2 text-stone-900">
              <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center">
                3
              </div>
              <h3 className="text-lg font-extrabold tracking-tight">Tech Stack Details</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-stone-100 text-stone-700 font-bold border-b border-stone-200">
                    <th className="p-2.5">Layer</th>
                    <th className="p-2.5">Technology</th>
                    <th className="p-2.5">Specific Version</th>
                    <th className="p-2.5">Engineering Justification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 text-stone-800">
                  <tr>
                    <td className="p-2.5 font-bold text-emerald-900">Frontend UI</td>
                    <td className="p-2.5">React + TypeScript</td>
                    <td className="p-2.5 font-mono text-[11px]">v19.0.1 / v5.8</td>
                    <td className="p-2.5">Type safety across multilingual dictionaries and instantaneous UI re-rendering without page refreshes.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-emerald-900">Build Tooling</td>
                    <td className="p-2.5">Vite</td>
                    <td className="p-2.5 font-mono text-[11px]">v8.3.0</td>
                    <td className="p-2.5">Fast bundle compilation and rapid developer workflow with minimal memory overhead.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-emerald-900">Design System</td>
                    <td className="p-2.5">Tailwind CSS</td>
                    <td className="p-2.5 font-mono text-[11px]">v4.3.3</td>
                    <td className="p-2.5">Custom rural palette, zero bloated CSS files, high accessibility contrast for outdoor sunlight readability.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-emerald-900">AI Framework</td>
                    <td className="p-2.5">Google Gemini API</td>
                    <td className="p-2.5 font-mono text-[11px]">@google/genai ^2.4.0</td>
                    <td className="p-2.5">Official modern Google Gen AI TypeScript SDK configured with gemini-3.8-flash for hyper-local advisory.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-emerald-900">Backend Server</td>
                    <td className="p-2.5">Express.js / Node.js</td>
                    <td className="p-2.5 font-mono text-[11px]">v4.21.2 / Node 22</td>
                    <td className="p-2.5">Secure server proxy hiding API secrets while routing REST endpoints and hosting client assets.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-emerald-900">Visualizations</td>
                    <td className="p-2.5">Recharts</td>
                    <td className="p-2.5 font-mono text-[11px]">v3.7.0</td>
                    <td className="p-2.5">Lightweight SVG graphs demonstrating local village demand indexes and break-even revenue thresholds.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-emerald-900">Voice Interfaces</td>
                    <td className="p-2.5">Web Speech API</td>
                    <td className="p-2.5 font-mono text-[11px]">Browser Native</td>
                    <td className="p-2.5">Zero-dependency speech recognition and speech synthesis matching regional Indian dialects.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4: Key Feature Breakdown */}
          <section className="space-y-4 pt-4 border-t border-stone-200">
            <div className="flex items-center gap-2 text-stone-900">
              <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center">
                4
              </div>
              <h3 className="text-lg font-extrabold tracking-tight">Key Feature Breakdown (14 Modules)</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  1. Tri-Lingual Accessibility
                </span>
                <p className="text-stone-600">
                  Instant reactivity across English, Bengali (বাংলা), and Hindi (हिन्दी) for every button, label, error, and AI generation.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  2. 7-Step Guided Onboarding
                </span>
                <p className="text-stone-600">
                  Progressive disclosure asking one simple question per screen (location, capital, space, and experience) without complex forms.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  3. Business Discovery Matcher
                </span>
                <p className="text-stone-600">
                  Screens rural opportunities (Dairy, Grocery, Tailoring, Spice Unit) matched to entrepreneur's exact capital and location.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  4. Local Market Intelligence
                </span>
                <p className="text-stone-600">
                  Provides district-level demand indexes, peak weekly market timings, and wholesale mandi procurement distances.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  5. Capital & Buffer Planner
                </span>
                <p className="text-stone-600">
                  Visual sliders splitting money into Equipment, Stock, and a vital 10-15% Emergency Buffer to prevent operational insolvency.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  6. Mudra & Scheme EMI Calculator
                </span>
                <p className="text-stone-600">
                  Maps funding needs to PMMY Mudra (Shishu/Kishore), PMEGP subsidies, and KCC loans with real-time monthly repayment analysis.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  7. AI 1-Page Business Plan
                </span>
                <p className="text-stone-600">
                  Generates simple, plain-language business plans with target customer definitions, daily operational routines, and risk rules.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  8. Bi-Directional Voice Advisor
                </span>
                <p className="text-stone-600">
                  Speak in native regional accents or type questions to get direct, concise practical advice read aloud with one tap.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  9. Business Health Diagnostic
                </span>
                <p className="text-stone-600">
                  5-factor diagnostic scoring (Grades A through D) with green/yellow/red indicators for capital cushion and credit exposure.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  10. Daily Business Helper
                </span>
                <p className="text-stone-600">
                  Morning-to-evening checklist keeping micro-owners disciplined regarding stock hygiene, cash box counts, and credit follow-ups.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  11. Daily Khata (Cash In/Out)
                </span>
                <p className="text-stone-600">
                  One-tap recording of Money In (Bikri) and Money Out (Kharcha) with instant running balance calculation.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  12. Practical Problem Solver
                </span>
                <p className="text-stone-600">
                  Decision support for customer credit defaults (Udhar), raw material price spikes, and aggressive local competitors.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  13. Visual Learning Academy
                </span>
                <p className="text-stone-600">
                  Gamified illustrated lessons teaching fundamental financial habits like separating household cash from business cash.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  14. Bank-Ready DPR & PDF Export
                </span>
                <p className="text-stone-600">
                  Official Detailed Project Report appraisal sheet with promoter declaration and bank officer signature spaces ready for PDF printing.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: User Journey Flow */}
          <section className="space-y-4 pt-4 border-t border-stone-200">
            <div className="flex items-center gap-2 text-stone-900">
              <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center">
                5
              </div>
              <h3 className="text-lg font-extrabold tracking-tight">End-to-End User Journey Flow</h3>
            </div>

            <div className="space-y-3 text-xs text-stone-700">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="w-6 h-6 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  A
                </span>
                <div>
                  <span className="font-bold text-stone-900 block">Stage 1: First-Run Language Selection</span>
                  <p className="mt-0.5 text-stone-600">
                    The user is greeted with 3 giant language cards (বাংলা, हिन्दी, English). Upon tapping, the interface dynamically swaps the entire dictionary, voice locale, and AI system instructions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="w-6 h-6 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  B
                </span>
                <div>
                  <span className="font-bold text-stone-900 block">Stage 2: Guided Persona Onboarding</span>
                  <p className="mt-0.5 text-stone-600">
                    Through 7 visual cards, the user inputs their district (e.g. Nadia, WB), available capital (e.g. ₹25,000), space availability, and full-time dedication without facing complex financial grids.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="w-6 h-6 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  C
                </span>
                <div>
                  <span className="font-bold text-stone-900 block">Stage 3: Opportunity Discovery & Feasibility Validation</span>
                  <p className="mt-0.5 text-stone-600">
                    The system matches the user to high-demand local businesses (e.g. Mini Dairy & Milk Collection) and displays local village demand ratings, peak market hours, and wholesale supplier distances.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="w-6 h-6 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  D
                </span>
                <div>
                  <span className="font-bold text-stone-900 block">Stage 4: Capital Structuring & Mudra Loan Analysis</span>
                  <p className="mt-0.5 text-stone-600">
                    The Financial Planner automatically divides total investment into Equipment, Stock, and a mandatory Emergency Reserve. If there is a funding gap, the Funding page recommends the exact Mudra Shishu loan amount with an EMI calculator.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="w-6 h-6 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  E
                </span>
                <div>
                  <span className="font-bold text-stone-900 block">Stage 5: Bank DPR Generation & PDF Export</span>
                  <p className="mt-0.5 text-stone-600">
                    The user clicks the Reports tab to generate a NABARD/Lead District Bank-compliant Detailed Project Report (DPR). Tapping "Print / Save as PDF" prints a clean, formatted physical document for submission to their rural bank branch.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="w-6 h-6 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  F
                </span>
                <div>
                  <span className="font-bold text-stone-900 block">Stage 6: Ongoing Daily Operations & Voice Guidance</span>
                  <p className="mt-0.5 text-stone-600">
                    Post-launch, the entrepreneur uses the Daily Helper for morning checklists, Daily Khata to log income/expenses, and the Voice AI Advisor for questions regarding supplier negotiations or customer credit defaults.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Document Verification Footer */}
          <div className="pt-6 border-t-2 border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
            <div>
              GramBiz AI Engineering & Product Research · Designed for Rural Micro-Enterprises
            </div>
            <div className="font-mono text-stone-400">
              DOC-ID: GBIZ-ARCH-SPEC-2026-V1
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: Official Bank Detailed Project Report (Form DPR-01) */}
      {activeTab === 'dpr' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm space-y-6 print:border-none print:shadow-none print:p-0">
          {/* Top Report Header with Formal Seal */}
          <div className="pb-6 border-b-2 border-stone-200 flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-8 h-8 rounded-xl bg-emerald-700 text-white font-bold flex items-center justify-center text-sm">
                  🌱
                </span>
                <div>
                  <span className="text-xs font-black tracking-wider text-emerald-900 uppercase">
                    GramBiz AI · Rural Enterprise Mission
                  </span>
                  <div className="text-[10px] text-stone-400">Micro-Enterprise Appraisal Report Form DPR-01</div>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-stone-950 mt-3">
                {user.selectedBusiness || 'Mini Dairy & Milk Collection'}
              </h2>
              <div className="text-xs text-stone-600 mt-1 flex flex-wrap gap-x-3 gap-y-1 font-medium">
                <span>👤 <strong>Applicant:</strong> {user.name}</span>
                <span>📍 <strong>Location:</strong> {user.villageOrTown || 'Ranaghat'}, {user.district}, {user.state}</span>
                <span>📅 <strong>Appraisal Date:</strong> {new Date().toLocaleDateString()}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-right shrink-0">
              <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">
                Feasibility Grade
              </span>
              <span className="text-2xl font-black text-emerald-800 tabular-nums">
                Grade A (84/100)
              </span>
              <span className="text-[10px] text-stone-500 block mt-0.5">High Viability Rating</span>
            </div>
          </div>

          {/* Section 1: Business Profile */}
          <div>
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2.5">
              1. Applicant & Business Profile
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-stone-50 border border-stone-200/80 text-xs">
              <div>
                <span className="text-stone-500 block text-[11px]">Category</span>
                <span className="font-bold text-stone-900">{user.businessCategory || 'Dairy / Allied'}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[11px]">Proposed Activity</span>
                <span className="font-bold text-stone-900">{user.businessStatus === 'new' ? 'New Micro Venture' : 'Existing Unit Upgrade'}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[11px]">Land / Premise</span>
                <span className="font-bold text-stone-900">{user.hasSpaceOrShop ? 'Owned / Family Site' : 'Rented / Home Base'}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[11px]">Operator Commitment</span>
                <span className="font-bold text-stone-900">{user.workPreference === 'full_time' ? 'Full-Time (8+ hrs)' : 'Part-Time'}</span>
              </div>
            </div>
          </div>

          {/* Section 2: Capital Structuring & Own Contribution */}
          <div>
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2.5">
              2. Capital Structuring & Scheme Financing Analysis
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="text-[11px] text-stone-500 block font-medium">Total Project Setup Cost</span>
                <span className="text-xl font-black text-stone-900 mt-1 block tabular-nums">
                  {formatINR(structuring.estimatedProjectCost)}
                </span>
                <span className="text-[10px] text-stone-400">Formula: Margin ÷ 10%</span>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <span className="text-[11px] text-emerald-800 block font-medium">Own Margin Contribution</span>
                <span className="text-xl font-black text-emerald-950 mt-1 block tabular-nums">
                  {formatINR(margin)}
                </span>
                <span className="text-[10px] text-emerald-700">10% Promoter Equity Stake</span>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                <span className="text-[11px] text-amber-800 block font-medium">Eligible Debt Funding (90%)</span>
                <span className="text-xl font-black text-amber-950 mt-1 block tabular-nums">
                  {formatINR(structuring.eligibleLoanAmount)}
                </span>
                <span className="text-[10px] text-amber-700">
                  {scheme ? scheme.name : 'Term Loan Scheme'} ({scheme ? scheme.interestRateAnnual : 8.0}% p.a.)
                </span>
              </div>
            </div>

            {/* Scheme Parameters Callout */}
            <div className="mt-3 p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs flex flex-wrap items-center justify-between gap-2">
              <div>
                <strong>Recommended Scheme:</strong> {scheme ? scheme.name : 'Term Loan Scheme'} ({scheme ? scheme.tenureYears : 7} Yrs Amortization)
              </div>
              <div className="text-amber-800 font-bold">
                Moratorium: {scheme ? scheme.moratoriumMonths : 6} Months Grace Period
              </div>
            </div>
          </div>

          {/* Section 3: Repayment & Operating Economics Summary */}
          <div>
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2.5">
              3. Loan Repayment & Pro-Forma Economics
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-stone-900">
              <div>
                <span className="text-[10px] text-stone-500 font-bold block">Estimated Monthly EMI</span>
                <span className="text-base font-black text-emerald-900 tabular-nums">
                  {formatINR(repayment.monthlyEMI)}/mo
                </span>
              </div>
              <div>
                <span className="text-[10px] text-stone-500 font-bold block">Quarterly Repayment</span>
                <span className="text-base font-black tabular-nums">
                  {formatINR(repayment.quarterlyRepayment)}/qtr
                </span>
              </div>
              <div>
                <span className="text-[10px] text-stone-500 font-bold block">Estimated Total Interest</span>
                <span className="text-base font-black text-stone-800 tabular-nums">
                  {formatINR(repayment.totalInterest)}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-stone-500 font-bold block">Total Repayment Amount</span>
                <span className="text-base font-black text-emerald-900 tabular-nums">
                  {formatINR(repayment.totalRepayment)}
                </span>
              </div>
            </div>
          </div>

          {/* Section 4: Local Ground Intelligence & Market Feasibility */}
          <div>
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2.5">
              4. Hyper-Local Market Feasibility Analysis ({user.district}, {user.state})
            </h3>
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 text-xs leading-relaxed text-stone-700 space-y-2">
              <p>
                • <strong>Market Reach & Demand:</strong> High ground demand within ~{feasibility.marketReach.estimatedRadiusKm} km covering {feasibility.marketReach.potentialCustomerBase}.
              </p>
              <p>
                • <strong>Primary Opportunity:</strong> {feasibility.opportunityAnalysis.primaryOpportunity}
              </p>
              <p>
                • <strong>Underserved Local Niche:</strong> {feasibility.opportunityAnalysis.underservedNiche}
              </p>
              <p>
                • <strong>Competitor Density & Differentiation:</strong> {feasibility.competitors.densityLevel} density ({feasibility.competitors.estimatedCountIn10Km}). Strategy: {feasibility.competitors.differentiationStrategy}
              </p>
            </div>
          </div>

          {/* Section 5: Risk Control Covenants */}
          <div>
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2.5">
              5. Risk Mitigation & Operational Safeguards
            </h3>
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Credit Ceiling Covenant:</strong> Customer credit strictly capped at ₹500 with a 7-day clearing cycle to avoid liquidity dry-ups.</span>
              </div>
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Emergency Buffer:</strong> Minimum ₹4,000 liquid capital reserved exclusively for veterinary health and raw material price spikes.</span>
              </div>
            </div>
          </div>

          {/* Section 6: Formal Endorsement & Declaration Block */}
          <div className="p-5 rounded-2xl bg-stone-50 border-2 border-stone-300 text-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <span className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
                Borrower Undertaking & Institutional Endorsement
              </span>
              <span className="text-[10px] font-semibold text-stone-500">Document Reference: GBIZ-DPR-VERIFIED</span>
            </div>

            <p className="text-stone-600 leading-relaxed text-[11px]">
              I, <strong>{user.name}</strong>, declare that the proposed business plan, operational assumptions, and capital allocations herein have been prepared with the assistance of the GramBiz AI advisory platform based on ground inputs in {user.district}, {user.state}.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 text-stone-700">
              <div>
                <span className="text-[10px] text-stone-400 block font-semibold uppercase">Promoter Signature / Mark</span>
                <div className="mt-5 border-b border-stone-400 w-40 h-6" />
                <span className="text-[11px] font-bold text-stone-800 mt-1 block">{user.name}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 block font-semibold uppercase">Bank / SHG Appraiser</span>
                <div className="mt-5 border-b border-stone-400 w-40 h-6" />
                <span className="text-[11px] font-bold text-stone-800 mt-1 block">Seal & Verification</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-[10px] text-stone-400 block font-semibold uppercase">Appraisal Date</span>
                <div className="mt-5 border-b border-stone-400 w-40 h-6" />
                <span className="text-[11px] font-bold text-stone-800 mt-1 block">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Disclaimer footer */}
          <div className="pt-4 border-t border-stone-200 text-center text-[11px] text-stone-400 leading-relaxed">
            "This report contains AI-assisted estimates based on the information provided by the user. Actual results may vary. GramBiz AI does not guarantee loan approval or commercial profits."
          </div>
        </div>
      )}
    </div>
  );
};
