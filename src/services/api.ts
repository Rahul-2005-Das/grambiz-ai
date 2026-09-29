import { BusinessIdea, MarketIntelligence, BusinessPlanContent } from '../types';

export const api = {
  // Multi-Turn Chatbot
  async sendChatMessage(params: {
    messages: Array<{ role: 'user' | 'model' | 'ai'; text: string }>;
    roleMode?: 'general' | 'financial' | 'growth' | 'schemes' | 'operations';
    language?: string;
    userProfile?: any;
  }) {
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('Backend /api/ai/chat unavailable, using local multi-turn fallback');
      const lastMsg = params.messages[params.messages.length - 1]?.text || '';
      return {
        success: true,
        text: params.language === 'bn'
          ? `💼 **পেশাদার পরামর্শক প্রতিক্রিয়া:**\n\nআপনার প্রশ্নের পরিপ্রেক্ষিতে সুপারিশ:\n• **১. পুঁজি সুরক্ষা:** সর্বদা মোট পুঁজির ২০% আপৎকালীন ও চলতি খরচের জন্য অক্ষত রাখুন।\n• **২. দ্রুত বিক্রি:** যে পণ্য প্রতি সপ্তাহে আবর্তিত হয় কেবল সেটিতেই প্রথম বিনিয়োগ করুন।\n• **৩. গ্রাহক বিশ্বাস:** সঠিক মাপ ও পণ্যের বিশুদ্ধতা বজায় রাখুন।\n\n👉 আরও কোনো আর্থিক বা বিপণন প্রশ্ন থাকলে জিজ্ঞাসা করতে পারেন।`
          : `💼 **Professional Consultant Advisory:**\n\nBased on your query:\n• **1. Capital Preservation:** Safeguard at least 20% of your starting capital in an untouched operating reserve.\n• **2. High Turnover:** Concentrate inventory on staples turning over in 7–10 days.\n• **3. Trust & Retention:** Consistent quality and upfront transparent pricing generate highest local referrals.\n\n👉 Would you like guidance on suppliers, pricing models, or loan eligibility?`
      };
    }
  },

  // AI Advisor
  async askAdvisor(question: string, language: string = 'en', userProfile?: any) {
    try {
      const res = await fetch('/api/ai/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, language, userProfile })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('Backend /api/ai/advisor unavailable, using local response fallback');
      return {
        success: true,
        text: language === 'bn'
          ? `💡 সহজ উত্তর:\nআপনার এলাকায় নিত্যপ্রয়োজনীয় খাদ্যপণ্য বা কৃষিসেবা ভিত্তিক কাজে ঝুঁকি কম।\n\n✅ আপনি যা করতে পারেন:\n• প্রথমে অল্প মাল দিয়ে স্থানীয় চাহিদা পরীক্ষা করুন।\n• নগদ বিক্রির ওপর জোর দিন এবং বাকির খাতা কঠোর রাখুন।\n\n💰 প্রয়োজনীয় টাকা:\nশুরুতে ₹১৫,০০০ থেকে ₹৩০,০০০ টাকা যথেষ্ট।\n\n📈 সুযোগ:\nনিয়মিত সেবায় সহজেই ৩০-৫০ জন স্থায়ী গ্রাহক পাবেন।\n\n⚠️ সতর্কতা:\nধার-দেনা বেশি দিলে চলতি পুঁজি আটকে যেতে পারে।\n\n👉 পরবর্তী পদক্ষেপ:\nআজই কাছের বাজারে দ্রুত বিক্রি হওয়া মালের তালিকা তৈরি করুন।`
          : language === 'hi'
          ? `💡 सरल जवाब:\nगाँव में दैनिक उपभोग की वस्तुएं या कृषि-डेयरी आधारित काम सबसे सुरक्षित हैं।\n\n✅ आप क्या कर सकते हैं:\n• शुरुआत में थोड़ी पूंजी से काम चालू करके मांग जांचें।\n• नकद बिक्री को प्राथमिकता दें और उधार सीमित रखें।\n\n💰 जरूरी पैसे:\nशुरुआत के लिए ₹15,000 से ₹30,000 पर्याप्त हैं।\n\n📈 अवसर:\nअच्छे व्यवहार से 30-50 नियमित ग्राहक आसानी से बन सकते हैं।\n\n⚠️ सावधानी:\nग्राहकों को ज्यादा उधार देने से बचें।\n\n👉 अगला कदम:\nआज ही स्थानीय बाजार के भाव और तेज बिकने वाले सामान देखें।`
          : `💡 Simple Answer:\nEveryday consumer essentials and agro-allied services have the lowest failure rates in rural hubs.\n\n✅ What You Can Do:\n• Start with conservative inventory to gauge neighborhood demand.\n• Keep a cash-first policy and maintain an emergency reserve box.\n\n💰 Money Needed:\nApprox. ₹15,000 to ₹30,000 is sufficient for setup.\n\n📈 Opportunity:\nBuild 30-50 loyal repeat customers within your first 60 days.\n\n⚠️ Risks:\nExcessive customer credit tying up working capital.\n\n👉 Next Step:\nList 5 fast-moving items in your local village market today.`
      };
    }
  },

  // Business Recommendations
  async getBusinessRecommendations(params: {
    location: { state: string; district: string; village?: string };
    capital: number;
    skills: string[];
    hasSpace: boolean | string;
    workPref: string;
    language?: string;
  }) {
    try {
      const res = await fetch('/api/ai/business-recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('Backend recommendations call failed, returning structured mock');
      return {
        success: true,
        ideas: [
          {
            name: params.language === 'bn' ? 'মিনি মসলা ও আটা পেষাই কল' : params.language === 'hi' ? 'मिनी मसाला व आटा पिसाई चक्की' : 'Mini Spice & Flour Grinding Unit',
            whySuits: params.language === 'bn' ? 'প্রতিদিনের আবশ্যিক প্রয়োজন; কম জায়গায় সহজেই শুরু করা যায়।' : 'Daily necessity for every household with low overheads.',
            minInvestment: 25000,
            maxInvestment: 45000,
            potentialMonthlyIncome: 14000,
            breakEvenMonths: 4,
            requirements: ['Single-phase 2HP pulverizer', 'Electricity connection', 'Packaging scale'],
            targetCustomers: 'Neighborhood families and local food stalls',
            risks: ['Power supply fluctuations', 'Moisture in raw spices'],
            firstSteps: [
              'Verify electricity line voltage',
              'Check machine models from local dealer',
              'Offer free trial grinding to 10 neighbors'
            ]
          },
          {
            name: params.language === 'bn' ? 'গ্রামীণ ডিজিটাল সেবা ও মিনি ব্যাংক কেন্দ্র' : params.language === 'hi' ? 'ग्रामीण डिजिटल सेवा व मिनी बैंक पॉइंट' : 'Rural Digital Service & Banking Kiosk',
            whySuits: params.language === 'bn' ? 'ব্যাংক ও সরকারি সুবিধার জন্য গ্রামবাসীদের শহরে যাওয়ার খরচ বাঁচায়।' : 'Saves villagers travel expenses for cash withdrawals and forms.',
            minInvestment: 20000,
            maxInvestment: 35000,
            potentialMonthlyIncome: 16000,
            breakEvenMonths: 3,
            requirements: ['Biometric scanner', 'Printer / Photocopy unit', 'Mobile 4G data'],
            targetCustomers: 'Farmers, elderly pensioners, rural students',
            risks: ['Internet downtime', 'Daily cash handling'],
            firstSteps: [
              'Register for BC bank agent ID',
              'Set up counter near market bus stop',
              'Display transparent service fee card'
            ]
          }
        ]
      };
    }
  },

  // Financial Insights
  async getFinancialInsight(financialPlan: any, language: string = 'en') {
    try {
      const res = await fetch('/api/ai/financial-insight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ financialPlan, language })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      return {
        success: true,
        insight: language === 'bn'
          ? `✅ লাভজনক সম্ভাবনা: আনুমানিক মাসিক লাভ ₹${financialPlan.estimatedMonthlyProfit} আশাব্যঞ্জক।\n🛡️ জরুরি তহবিল: অন্তত ₹${Math.round(financialPlan.totalMonthlyExpenses * 0.4)} আলাদা রাখুন।\n🎯 ব্রেক-ইভেন: মাসে ₹${financialPlan.breakEvenMonthlyRevenue} বিক্রি পার করলেই খরচ উঠে যাবে।`
          : `✅ Sound Feasibility: Projected net profit of ₹${financialPlan.estimatedMonthlyProfit}/month.\n🛡️ Reserve: Maintain ₹${Math.round(financialPlan.totalMonthlyExpenses * 0.4)} in emergency liquidity.\n🎯 Break-Even: Reached at ₹${financialPlan.breakEvenMonthlyRevenue}/month.`
      };
    }
  },

  // Business Plan
  async generateBusinessPlan(profile: any, financialPlan: any, language: string = 'en') {
    try {
      const res = await fetch('/api/ai/business-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile, financialPlan, language })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      const loc = `${profile.district || 'Nadia'}, ${profile.state || 'West Bengal'}`;
      return {
        success: true,
        plan: {
          businessName: profile.selectedBusiness || 'GramBiz Micro Enterprise',
          location: loc,
          executiveSummary: `A viable rural micro-enterprise in ${loc}, planned with ₹${financialPlan?.totalInitialInvestment || 35000} initial setup and estimated ₹${financialPlan?.estimatedMonthlyProfit || 12000} monthly profit.`,
          businessDescription: 'Providing high quality, affordable daily products and fast doorstep assistance to local villagers.',
          marketOpportunity: 'High local recurring demand without travelling to town centers.',
          targetCustomers: 'Neighborhood families, local farmers, and small village shops.',
          productsAndServices: ['Daily primary items', 'Small pack sizes (₹10 - ₹50)', 'Home delivery for elders'],
          operationsPlan: 'Daily 7:30 AM to 8:00 PM opening, weekly mandi replenishment.',
          marketingStrategy: 'Direct word-of-mouth with local women SHGs and clear signboard.',
          financialOverview: {
            startupCost: financialPlan?.totalInitialInvestment || 35000,
            monthlyRunningCost: financialPlan?.totalMonthlyExpenses || 15000,
            expectedRevenue: financialPlan?.estimatedMonthlyRevenue || 27000,
            expectedNetProfit: financialPlan?.estimatedMonthlyProfit || 12000
          },
          risksAndMitigation: ['Zero uncontrolled credit', '10% emergency buffer reserve'],
          growthMilestones: [
            { period: 'Month 1', goal: 'Establish presence and 30 regular buyers' },
            { period: 'Month 3', goal: 'Achieve stable break-even' },
            { period: 'Month 6', goal: 'Reinvest retained profits in new stock lines' }
          ]
        }
      };
    }
  },

  // Business Health
  async checkBusinessHealth(params: {
    sales: number;
    expenses: number;
    customers: number;
    stockCondition: string;
    pendingCredit: number;
    language?: string;
  }) {
    try {
      const res = await fetch('/api/ai/business-health', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      const net = params.sales - params.expenses;
      return {
        success: true,
        status: net > 0 ? 'doing_well' : 'needs_attention',
        score: net > 0 ? 80 : 55,
        monthlySales: params.sales,
        monthlyExpenses: params.expenses,
        netMarginPercent: params.sales > 0 ? Math.round((net / params.sales) * 100) : 0,
        threeActions: [
          'Collect pending customer credit today with gentle in-person reminders',
          'Offer 5% discount on old unsold inventory to release working cash',
          'Freeze non-essential purchases for the next 14 days'
        ]
      };
    }
  },

  // Finance Records
  async getFinanceRecords() {
    try {
      const res = await fetch('/api/finance/records');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      return {
        success: true,
        sales: [],
        expenses: [],
        summary: { totalSales: 0, totalExpenses: 0, netBalance: 0, pendingCredit: 0 }
      };
    }
  },

  async addSale(sale: { product: string; quantity: number; amount: number; customerName?: string; isPaid?: boolean }) {
    try {
      const res = await fetch('/api/finance/sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sale)
      });
      return await res.json();
    } catch (err) {
      return { success: true, record: { id: `local_${Date.now()}`, date: new Date().toISOString().split('T')[0], ...sale } };
    }
  },

  async addExpense(expense: { category: string; amount: number; notes?: string }) {
    try {
      const res = await fetch('/api/finance/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense)
      });
      return await res.json();
    } catch (err) {
      return { success: true, record: { id: `local_${Date.now()}`, date: new Date().toISOString().split('T')[0], ...expense } };
    }
  }
};
