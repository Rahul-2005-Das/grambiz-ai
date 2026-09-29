# GramBiz AI (গ্রামবিজ এআই / ग्रामबिज़ एआई)

> **"From Idea to Income — Smarter Business Decisions with AI"**  
> **"Your AI Business Companion for Rural Micro-Entrepreneurs"**

GramBiz AI is an AI-driven, hyper-local business advisory and financial structuring platform specifically designed for rural micro-entrepreneurs. Engineered with the core philosophy of **"LESS READING. MORE UNDERSTANDING."**, it provides intuitive visual cards, voice interaction, and full trilingual support across **English, বাংলা (Bengali), and हिन्दी (Hindi)**.

---

## 1. Project Overview

Rural entrepreneurs often encounter steep barriers: technical financial terminology, complex spreadsheets, language barriers, and an absence of localized market intelligence. GramBiz AI bridges this gap with an approachable digital mentor that walks entrepreneurs through business selection, capital planning, break-even analysis, daily sales tracking, and loan structuring without complicated accounting jargon.

---

## 2. Problem Statement

Many rural and semi-urban entrepreneurs experience:
- **Low digital literacy & language barriers**: Existing business software relies on English text and dense navigation.
- **Financial jargon overload**: Concepts like depreciation, working capital ratios, and balance sheets intimidate users.
- **Copycat business failures**: Opening duplicate shops without assessing local village demand, seasonality, or logistics.
- **Cash flow traps**: Profits trapped in customer credit (*udhar*), inventory waste, and lack of emergency buffers.

---

## 3. The Solution

GramBiz AI replaces complex dashboards with:
- **Trilingual native interface** (English, বাংলা, हिन्दी) from the first screen.
- **Voice-first assistance**: Ask questions in Bengali or Hindi and listen to spoken advice.
- **One-question-at-a-time onboarding** with large touch presets (₹10,000, ₹25,000, ₹50,000, ₹1,00,000+).
- **Hyper-local market intelligence** for rural districts across India.
- **Visual financial structuring**: Recharts-powered graphs for costs, revenues, break-even timelines, and money allocation.
- **Plain-language business plan generator** ready for bank loan reviews or self-evaluation.
- **Daily sales & expense tracker** requiring no ledger training.

---

## 4. Key Features

1. **Language-First Entry**: First-launch selector with large buttons for বাংলা, हिन्दी, and English.
2. **AI-Guided Business Discovery**: 7-step guided interview recommending 3–5 practical businesses with investment estimates, requirements, and risks.
3. **Hyper-Local Market Intelligence**: Demand levels, fast-selling products, seasonal spikes, customer segments, and transport notes for districts across West Bengal, UP, Bihar, Rajasthan, etc.
4. **AI Business Advisor**: Structured responses covering Simple Answer, What You Can Do, Money Needed, Opportunity, Risks, and Next Step.
5. **Visual Money Structuring**: Real-time calculations of startup costs, monthly running costs, profit margin, break-even point, and a 5-bucket capital allocation donut chart.
6. **Loan & Capital Gap Assistant**: Computes funding gap and monthly EMI, paired with verified routes (SHGs, Mudra Shishu, PACs).
7. **Business Plan Generator**: 10-section structured business plan with clean print and PDF export.
8. **Business Health Check**: Quick 2-minute diagnostic generating 🟢 Doing Well, 🟡 Needs Attention, or 🔴 Needs Action with 3 immediate action items.
9. **Daily Business Helper**: Practical daily habit checklist with audio read-aloud support.
10. **Simple Cash Tracker**: Large "➕ Add Sale" and "➖ Add Expense" buttons with today's cash balance.
11. **Business Problem Solver**: Instant recovery roadmaps for low sales, high costs, slow inventory, or uncollected credit.
12. **Learning Center**: 6 illustrated micro-lessons on real profit, stock management, customer credit, and separating business cash from household funds.
13. **Accessibility Suite**: Large text mode, high contrast mode, voice assistance, and large buttons for one-handed outdoor usage.

---

## 5. Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Lucide React, Recharts, Motion
- **Backend**: Node.js, Express.js, REST API
- **AI Engine**: Google Gemini API (`@google/genai` TypeScript SDK with `gemini-3.8-flash`)
- **Speech**: Web Speech Recognition API & Web Speech Synthesis API
- **Database**: Modular storage layer (in-memory demo database ready for SQLite / PostgreSQL migration)

---

## 6. Folder Structure

```
grambiz-ai/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx            # Top Bar Contract (3 zones)
│   │   ├── MobileBottomNav.tsx   # Mobile thumb-zone navigation
│   │   ├── Sidebar.tsx           # Desktop sidebar navigation
│   │   ├── VoiceButton.tsx       # Microphone speech recognition
│   │   ├── AIChat.tsx            # Trilingual AI conversational advisor
│   │   ├── BusinessCard.tsx      # Micro-business proposal card
│   │   └── StatCard.tsx          # Metric display card
│   ├── context/
│   │   ├── LanguageContext.tsx   # Trilingual state & speech synthesis
│   │   └── AuthContext.tsx       # Profile, capital, and accessibility state
│   ├── data/
│   │   ├── demoBusinesses.ts     # Curated rural micro-business catalog
│   │   ├── demoMarkets.ts        # Ground district intelligence dataset
│   │   └── translations/
│   │       ├── en.ts             # English translations
│   │       ├── bn.ts             # Bengali translations
│   │       └── hi.ts             # Hindi translations
│   ├── pages/
│   │   ├── Landing.tsx           # 10-section high conversion landing
│   │   ├── LanguageSelection.tsx # First-launch selection screen
│   │   ├── Onboarding.tsx        # Step-by-step onboarding
│   │   ├── Dashboard.tsx         # Greeting, summary metrics, quick actions
│   │   ├── BusinessDiscovery.tsx # 7-step business finder
│   │   ├── AIAdvisor.tsx         # Voice business assistant
│   │   ├── LocalMarket.tsx       # District market intelligence
│   │   ├── FinancialPlanner.tsx  # Revenue, cost, break-even, Recharts
│   │   ├── Funding.tsx           # Funding gap & EMI calculator
│   │   ├── BusinessPlan.tsx      # 10-section printable plan generator
│   │   ├── BusinessHealth.tsx    # 2-minute diagnostic checkup
│   │   ├── DailyHelper.tsx       # Daily task habit checklist
│   │   ├── SalesExpenses.tsx     # One-tap sales & expense tracker
│   │   ├── ProblemSolver.tsx     # 7 common problem action plans
│   │   ├── Learning.tsx          # 6 illustrated business lessons
│   │   ├── Reports.tsx           # Comprehensive printable report
│   │   └── Settings.tsx          # Accessibility controls
│   ├── services/
│   │   ├── api.ts                # Resilient client API caller with mock fallback
│   │   ├── financialService.ts   # Loan EMI, allocation, break-even math
│   │   └── voiceService.ts       # Speech-to-text & Text-to-speech wrapper
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces
│   ├── App.tsx                   # Central router & state coordinator
│   ├── main.tsx
│   └── index.css                 # Tailwind CSS & typography rules
├── server/
│   ├── routes/
│   │   ├── ai.ts                 # AI advisor, recommendations, plans
│   │   ├── business.ts           # Business catalog & plan persistence
│   │   ├── finance.ts            # Sales & expense endpoints
│   │   └── market.ts             # Local market intelligence
│   ├── services/
│   │   └── geminiService.ts      # Server-side Gemini API client
│   └── index.ts                  # Route aggregation
├── server.ts                     # Full-stack dev & production server
├── .env.example
├── package.json
└── README.md
```

---

## 7. Installation

Clone the repository and install dependencies:

```bash
git clone <repo-url>
cd grambiz-ai
npm install
```

---

## 8. Environment Variables

Create your local `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Define the following keys:

```ini
# Gemini API Key (Required for live Gemini 3.8 Flash generation)
GEMINI_API_KEY="your-gemini-api-key"

# Server Port (default 3000 in AI Studio, 5000 in standalone)
PORT=3000
```

*Note: The application has built-in deterministic fallbacks, so all features, charts, and calculations run completely even if no API key is supplied.*

---

## 9. Running the Application

### Full-Stack Development Mode
Starts the Express API server and Vite middlewares:

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Building for Production
Build the optimized Vite bundle:

```bash
npm run build
npm start
```

---

## 10. Deployment

### Deployment to Vercel (Frontend / Full-stack)
1. Push the repository to GitHub.
2. Import the project in the [Vercel Dashboard](https://vercel.com).
3. Set the Environment Variables:
   - `GEMINI_API_KEY`: Your Google Gemini API Key.
4. Framework Preset: **Vite**.
5. Build Command: `npm run build`.
6. Output Directory: `dist`.

### Deployment to Render (Backend Web Service)
1. Create a new **Web Service** on [Render](https://render.com).
2. Connect your repository.
3. Build Command: `npm install && npm run build`
4. Start Command: `node server.ts` or `npm start`
5. Add Environment Variables:
   - `GEMINI_API_KEY`
   - `NODE_ENV=production`
   - `PORT=10000`

---

## 11. Disclaimer

All financial numbers, margins, break-even predictions, and loan calculations provided by GramBiz AI are educational estimates designed for planning assistance. Actual business performance varies according to local market conditions, season, and management. GramBiz AI does not sanction loans or guarantee government scheme eligibility.
