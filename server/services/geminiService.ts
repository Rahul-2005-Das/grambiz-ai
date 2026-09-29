import { GoogleGenAI } from "@google/genai";

// Initialize Gemini client with proper telemetry header
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

const MODEL_NAME = 'gemini-3.8-flash';

// Language instruction helpers
function getLanguageInstruction(lang: string = 'en'): string {
  if (lang === 'bn') {
    return 'IMPORTANT: You MUST write your entire response in clear, simple, natural Bengali (বাংলা). Use friendly rural-friendly vocabulary. No English words unless technical terms in brackets.';
  }
  if (lang === 'hi') {
    return 'IMPORTANT: You MUST write your entire response in clear, simple, natural Hindi (हिन्दी). Use simple conversational language suitable for rural entrepreneurs.';
  }
  return 'IMPORTANT: Write in simple, clear, plain English without corporate jargon. Suitable for micro-entrepreneurs.';
}

/**
 * 1. AI Business Advisor
 */
export async function generateBusinessAdvice(params: {
  question: string;
  language?: string;
  userProfile?: any;
}) {
  const { question, language = 'en', userProfile } = params;
  const langRule = getLanguageInstruction(language);

  const systemPrompt = `You are "GramBiz AI", a warm, practical, knowledgeable business mentor for rural micro-entrepreneurs in India.
${langRule}

Keep your answer structured into exactly these 6 brief sections:
1. 💡 Simple Answer (Direct, clear answer in 2-3 sentences)
2. ✅ What You Can Do (3 practical steps)
3. 💰 Money Needed (Estimated minimal costs)
4. 📈 Opportunity (Potential customers or profits)
5. ⚠️ Risks (What to watch out for or avoid)
6. 👉 Next Step (Single concrete thing to do today)

Tone rules:
- Less reading, more understanding.
- Never guarantee profits or loan approval.
- Clearly present figures as estimates.
- Keep bullet points short.`;

  const userContext = userProfile
    ? `User Profile: Location: ${userProfile.district || 'Rural'}, Capital: ₹${userProfile.availableCapital || 25000}, Business: ${userProfile.selectedBusiness || 'New'}`
    : 'User is a rural micro-entrepreneur.';

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: `${userContext}\nUser Question: ${question}`,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.6,
        },
      });

      if (response && response.text) {
        return {
          success: true,
          text: response.text,
          language,
        };
      }
    } catch (err: any) {
      console.warn('Gemini API call failed, switching to local structured fallback:', err?.message);
    }
  }

  // Graceful deterministic fallback
  return getFallbackAdvisorResponse(question, language);
}

function getFallbackAdvisorResponse(question: string, lang: string) {
  if (lang === 'bn') {
    return {
      success: true,
      language: 'bn',
      text: `💡 সহজ উত্তর:
গ্রামে ব্যবসা সফল করতে কম খরচে নিত্যপ্রয়োজনীয় জিনিস ও স্থানীয় সেবাকে প্রাধান্য দেওয়া উচিত। নগদ টাকা হাতে রেখে শুরু করা সবচেয়ে নিরাপদ।

✅ আপনি যা করতে পারেন:
• আপনার পাড়ায় বা হাটে কোন জিনিসের চাহিদা সবচেয়ে বেশি তা ৫ জন মানুষের সাথে কথা বলে জানুন।
• পুরো পুঁজি একবারে না খাটিয়ে প্রথমে ৪০% মাল তুলুন।
• গ্রাহকদের বাকির খাতা কঠোরভাবে নিয়ন্ত্রণে রাখুন।

💰 প্রয়োজনীয় টাকা:
আনুমানিক ₹১৫,০০০ থেকে ₹৩০,০০০ টাকা প্রাথমিক স্টক ও হালকা সরঞ্জামের জন্য যথেষ্ট।

📈 ব্যবসার সুযোগ:
নিয়মিত ভালো ব্যবহার ও সঠিক ওজন দিলে আপনার এলাকাতেই ৫০-৬০ জন স্থায়ী খরিদ্দার তৈরি হয়ে যাবে।

⚠️ যে ঝুঁকি এড়িয়ে চলবেন:
• বেশি মুনাফার লোভে অচেনা নতুন মালের বড় স্টক তোলা।
• গ্রাহককে অতিরিক্ত বাকি দেওয়া।

👉 আজকের প্রথম পদক্ষেপ:
আজই আপনার এলাকার সবচেয়ে সফল ২ জন দোকানদারের কাজ ২০ মিনিট লক্ষ্য করুন এবং নোট নিন।`
    };
  }

  if (lang === 'hi') {
    return {
      success: true,
      language: 'hi',
      text: `💡 सरल जवाब:
गाँव और छोटे कस्बों में वही व्यापार सबसे टिकाऊ होता है जो रोजमर्रा की जरूरत या स्थानीय कृषि व दूध से जुड़ा हो। कम पूंजी में शुरुआत करना सबसे सुरक्षित है।

✅ आप क्या कर सकते हैं:
• गाँव के 5 समझदार लोगों से पूछें कि उन्हें किस सामान के लिए बाहर जाना पड़ता है।
• अपनी कुल बचत का केवल 40-50% हिस्सा ही पहले स्टॉक में लगाएं।
• उधारी पर कड़ी नजर रखें और बिना नकद काम करने से बचें।

💰 जरूरी पैसे:
शुरुआती सामान और औजारों के लिए लगभग ₹15,000 से ₹30,000 की पूंजी पर्याप्त है।

📈 कमाई का अवसर:
सही तौल और मधुर व्यवहार से आपके पास 1-2 महीने में 50 नियमित ग्राहक बन सकते हैं।

⚠️ सावधानियां:
• अनजान थोक व्यापारी को पहले दिन पूरा एडवांस न दें।
• शुरुआत में गैर-जरूरी साज-सज्जा पर पैसे खर्च न करें।

👉 आज का अगला कदम:
आज शाम ही थोक बाजार के भाव का पता लगाएं और आवश्यक सामानों की छोटी सूची बनाएं।`
    };
  }

  return {
    success: true,
    language: 'en',
    text: `💡 Simple Answer:
In rural and peri-urban markets, daily essentials, agro-services, and digital convenience businesses provide the fastest, most reliable cash turnaround.

✅ What You Can Do:
• Identify 3 high-frequency items that villagers currently travel to the nearest town to buy.
• Deploy only 40% of your starting capital initially to test market reaction.
• Implement a strict polite cash-first policy with minimal credit.

💰 Money Needed:
Approx. ₹15,000 to ₹35,000 for initial inventory and basic tools. Keep a ₹5,000 cash reserve.

📈 Opportunity:
Dependable local availability earns 40-60 loyal repeat customers within your first 60 days.

⚠️ Risks:
• High inventory spoilage or dead stock in untried goods.
• Uncontrolled customer credit (Udhar) eroding working capital.

👉 Next Step:
Visit 3 local shops this evening and note down their fastest-moving items.`
  };
}

/**
 * 2. AI Business Recommendations
 */
export async function generateBusinessRecommendations(params: {
  location: { state: string; district: string; village?: string };
  capital: number;
  skills: string[];
  hasSpace: boolean | string;
  workPref: string;
  language?: string;
}) {
  const { location, capital, skills, hasSpace, workPref, language = 'en' } = params;
  const langRule = getLanguageInstruction(language);

  const prompt = `Based on this rural entrepreneur's profile, recommend 3 to 4 viable micro-businesses:
- Location: ${location.village || 'Village'}, ${location.district}, ${location.state}
- Available Capital: ₹${capital}
- Skills: ${skills.join(', ') || 'General willingness to learn'}
- Space Available: ${hasSpace}
- Commitment: ${workPref}

${langRule}
Format your output as a valid JSON array where each object has:
- "name": string
- "whySuits": string (1-2 sentences)
- "minInvestment": number
- "maxInvestment": number
- "potentialMonthlyIncome": number
- "breakEvenMonths": number
- "requirements": array of strings (3 items)
- "targetCustomers": string
- "risks": array of strings (2 items)
- "firstSteps": array of strings (3 items)`;

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.5,
        },
      });

      if (response && response.text) {
        const parsed = JSON.parse(response.text);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return { success: true, ideas: parsed };
        }
      }
    } catch (err: any) {
      console.warn('Gemini recommendations call failed, using local model:', err?.message);
    }
  }

  // Fallback to tailored ideas from demo database matching capital
  return {
    success: true,
    ideas: [
      {
        name: language === 'bn' ? 'মিনি মসলা ও আটা পেষাই কল' : language === 'hi' ? 'मिनी मसाला व आटा पिसाई चक्की' : 'Mini Spice & Flour Grinding Unit',
        whySuits: language === 'bn' ? 'প্রতিটি পরিবারের প্রতিদিনের দরকার; নিজের ঘরে বা ছোট জায়গায় শুরু করা সম্ভব।' : language === 'hi' ? 'हर परिवार की दैनिक जरूरत है; छोटे कमरे से शुरू किया जा सकता है।' : 'Daily necessity for every household; fits low overhead spaces.',
        minInvestment: Math.min(capital, 30000),
        maxInvestment: Math.max(capital, 45000),
        potentialMonthlyIncome: 14000,
        breakEvenMonths: 4,
        requirements: ['Single-phase 2HP pulverizer', 'Electricity connection', 'Packaging scale'],
        targetCustomers: 'Neighborhood families and local food stalls',
        risks: ['Power supply fluctuations', 'Moisture in unground spices'],
        firstSteps: [
          'Verify electricity supply voltage',
          'Test 2HP machine from reputed manufacturer',
          'Offer free first grinding to 10 neighbors'
        ]
      },
      {
        name: language === 'bn' ? 'গ্রামীন ডিজিটাল সেবা ও মিনি ব্যাংক কেন্দ্র' : language === 'hi' ? 'ग्रामीण डिजिटल सेवा व मिनी बैंक पॉइंट' : 'Rural Digital Service & Banking Kiosk',
        whySuits: language === 'bn' ? 'সরকারি যোজনার টাকা তোলা ও ফর্ম পূরণের জন্য গ্রামবাসীদের শহরে যাওয়ার ঝামেলা কমায়।' : language === 'hi' ? 'सरकारी योजनाओं के पैसे निकालने और फॉर्म भरने के लिए शहर जाने की बचत।' : 'Saves villagers time travelling to distant bank branches.',
        minInvestment: Math.min(capital, 25000),
        maxInvestment: Math.max(capital, 38000),
        potentialMonthlyIncome: 16000,
        breakEvenMonths: 3,
        requirements: ['Biometric scanner', 'Printer & Xerox machine', 'Mobile 4G data'],
        targetCustomers: 'Farmers, elderly pensioners, students',
        risks: ['Internet downtime', 'Cash liquidity management'],
        firstSteps: [
          'Apply for certified banking correspondent BC ID',
          'Set up counter near market bus stop',
          'Display transparent service fee chart'
        ]
      },
      {
        name: language === 'bn' ? 'দেশি মুরগি ও ডিম পালন' : language === 'hi' ? 'देसी मुर्गी व अंडा पालन' : 'Backyard Desi Poultry Farm',
        whySuits: language === 'bn' ? 'দেশি ডিম ও মুরগির দাম ব্রয়লারের চেয়ে দ্বিগুণ; কম জায়গায় ভালো আয়।' : language === 'hi' ? 'देसी अंडे और मुर्गे के दाम ज्यादा मिलते हैं; घर के आंगन में हो सकता है।' : 'Desi birds fetch double market price; minimal space needed.',
        minInvestment: Math.min(capital, 20000),
        maxInvestment: Math.max(capital, 35000),
        potentialMonthlyIncome: 12000,
        breakEvenMonths: 4,
        requirements: ['Fenced wire shed', 'Clean water drinker', '50 vaccinated chicks'],
        targetCustomers: 'Weekly market shoppers and local restaurants',
        risks: ['Predators like cats/dogs', 'Seasonal bird flu'],
        firstSteps: [
          'Build secure bamboo/wire cage',
          'Procure first batch of 50 one-day chicks',
          'Pre-book buyers in weekly haat'
        ]
      }
    ]
  };
}

/**
 * 3. AI Financial Insights
 */
export async function generateFinancialInsights(params: {
  financialPlan: any;
  language?: string;
}) {
  const { financialPlan, language = 'en' } = params;
  const langRule = getLanguageInstruction(language);

  const prompt = `Analyze this micro-business financial model:
- Total Startup Investment: ₹${financialPlan.totalInitialInvestment}
- Own Capital Available: ₹${financialPlan.availableCapital}
- Funding Gap: ₹${financialPlan.capitalFundingGap}
- Monthly Expenses: ₹${financialPlan.totalMonthlyExpenses}
- Expected Monthly Revenue: ₹${financialPlan.estimatedMonthlyRevenue}
- Net Monthly Profit: ₹${financialPlan.estimatedMonthlyProfit}
- Break-Even Sales Needed: ₹${financialPlan.breakEvenMonthlyRevenue}

${langRule}
Provide a brief, encouraging, 4-point financial health review:
1. Feasibility Verdict (Sound / Needs caution)
2. Safe Capital Buffer recommendation
3. Cost Reduction Idea (1 practical way to cut monthly cost)
4. Revenue Safety Margin`;

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
        config: {
          systemInstruction: 'You are a prudent financial advisor for small rural businesses.',
          temperature: 0.5,
        },
      });

      if (response && response.text) {
        return { success: true, insight: response.text };
      }
    } catch (err: any) {
      console.warn('Gemini financial insight call failed, using local model:', err?.message);
    }
  }

  // Deterministic local financial insight
  const isHealthy = financialPlan.estimatedMonthlyProfit > 0 && financialPlan.capitalFundingGap <= 0;
  if (language === 'bn') {
    return {
      success: true,
      insight: isHealthy
        ? `✅ আর্থিক স্থায়িত্ব: আপনার লাভজনক মার্জিন আশাব্যঞ্জক। প্রতি মাসে প্রায় ₹${financialPlan.estimatedMonthlyProfit} লাভের অনুমান রয়েছে।
🛡️ জরুরি তহবিল: ব্যবসার নগদ বাক্সে অন্তত ₹${Math.round(financialPlan.totalMonthlyExpenses * 0.5)} আপৎকালীন সুরক্ষা হিসেবে আলাদা রাখুন।
✂️ খরচ কমানোর পরামর্শ: প্রথম ২ মাস দোকান সাজানোর বাড়তি খরচ না করে সরাসরি মাল কেনার ওপর জোর দিন।
🎯 ব্রেক-ইভেন লক্ষ্য: মাসে মাত্র ₹${financialPlan.breakEvenMonthlyRevenue} বিক্রি পার করলেই ব্যবসার সমস্ত খরচ উঠে যাবে।`
        : `⚠️ সতর্কতা: আপনার পুঁজির ঘাটতি রয়েছে ₹${financialPlan.capitalFundingGap}।
🛡️ তহবিল পরামর্শ: স্বনির্ভর গোষ্ঠী (SHG) বা মুদ্রা শিশু ঋণের মাধ্যমে ঘাটতি পূরণ করার পর কাজ শুরু করা নিরাপদ।
✂️ খরচ কমানোর উপায়: ব্যবহৃত বা রিফার্বিশড সরঞ্জাম ব্যবহার করে শুরুর খরচ ৩০% কমানো সম্ভব।
🎯 বাস্তব লক্ষ্য: প্রথমে এককালীন খরচ কমিয়ে নিজস্ব পুঁজিতে আনার চেষ্টা করুন।`
    };
  }

  if (language === 'hi') {
    return {
      success: true,
      insight: isHealthy
        ? `✅ वित्तीय स्थिति: आपका अनुमानित मुनाफा ₹${financialPlan.estimatedMonthlyProfit} प्रति माह बहुत उत्साहजनक है।
🛡️ आपातकालीन फंड: दुकान के गल्ले में कम से कम ₹${Math.round(financialPlan.totalMonthlyExpenses * 0.5)} अप्रत्याशित खर्चों के लिए हमेशा रखें।
✂️ खर्च कम करने की सलाह: शुरुआती महीनों में दुकान के दिखावे के बजाय अच्छे और तेज बिकने वाले सामान पर ध्यान दें।
🎯 ब्रेक-इवेन लक्ष्य: महीने में ₹${financialPlan.breakEvenMonthlyRevenue} की बिक्री होते ही आपकी कुल लागत निकल जाएगी।`
        : `⚠️ पूंजी की कमी: आपके पास ₹${financialPlan.capitalFundingGap} का पूंजी अंतर है।
🛡️ फंड सलाह: अपनी बचत के अनुसार काम को थोड़ा छोटा करें या मुद्रा लोन / एसएचजी की सहायता लें।
✂️ खर्च कम करें: महंगे नए उपकरणों के बदले अच्छे पुराने उपकरण लेने से ₹15,000 तक की बचत हो सकती है।
🎯 लक्ष्य: कर्ज लेने से पहले यह सुनिश्चित करें कि किस्त का भुगतान मुनाफे के 30% से अधिक न हो।`
    };
  }

  return {
    success: true,
    insight: isHealthy
      ? `✅ Financial Feasibility: Healthy projected net profit of ₹${financialPlan.estimatedMonthlyProfit}/month.
🛡️ Safety Reserve: Keep at least ₹${Math.round(financialPlan.totalMonthlyExpenses * 0.5)} liquid reserve for unexpected slow weeks.
✂️ Cost Optimization: Avoid lavish store decoration; prioritize fast-moving inventory.
🎯 Break-Even Threshold: Once you cross ₹${financialPlan.breakEvenMonthlyRevenue} in monthly sales, every rupee contributes to net profit.`
      : `⚠️ Capital Gap Notice: You have a funding gap of ₹${financialPlan.capitalFundingGap}.
🛡️ Action: Downscale phase 1 inventory or apply for an SHG / Mudra micro-loan.
✂️ Cost Tip: Procure refurbished tools to reduce initial equipment outlay by 25%.
🎯 Rule of Thumb: Never commit to a loan unless projected profit is at least 2.5× the monthly EMI.`
  };
}

/**
 * 4. AI Business Plan Generator
 */
export async function generateBusinessPlan(params: {
  profile: any;
  financialPlan: any;
  language?: string;
}) {
  const { profile, financialPlan, language = 'en' } = params;
  const langRule = getLanguageInstruction(language);

  const prompt = `Generate a concise 10-section simple business plan for a rural micro-enterprise:
- Business: ${profile.selectedBusiness || 'Micro Enterprise'}
- Location: ${profile.villageOrTown || 'Local Village'}, ${profile.district}, ${profile.state}
- Investment: ₹${financialPlan?.totalInitialInvestment || 40000}
- Monthly Revenue: ₹${financialPlan?.estimatedMonthlyRevenue || 25000}
- Net Profit: ₹${financialPlan?.estimatedMonthlyProfit || 9000}

${langRule}
Return valid JSON with these exact keys:
{
  "businessName": string,
  "location": string,
  "executiveSummary": string,
  "businessDescription": string,
  "marketOpportunity": string,
  "targetCustomers": string,
  "productsAndServices": array of strings,
  "operationsPlan": string,
  "marketingStrategy": string,
  "financialOverview": {
    "startupCost": number,
    "monthlyRunningCost": number,
    "expectedRevenue": number,
    "expectedNetProfit": number
  },
  "risksAndMitigation": array of strings (2-3 items),
  "growthMilestones": array of { "period": string, "goal": string } (3 items)
}`;

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.5,
        },
      });

      if (response && response.text) {
        const parsed = JSON.parse(response.text);
        if (parsed && parsed.businessName) {
          return { success: true, plan: parsed };
        }
      }
    } catch (err: any) {
      console.warn('Gemini business plan call failed, using structured fallback:', err?.message);
    }
  }

  // High quality deterministic fallback business plan
  const bName = profile.selectedBusiness || 'GramBiz Micro Enterprise';
  const loc = `${profile.villageOrTown || 'Local Block'}, ${profile.district || 'District'}, ${profile.state || 'India'}`;

  return {
    success: true,
    plan: {
      businessName: bName,
      location: loc,
      executiveSummary: language === 'bn'
        ? `${loc} এলাকায় স্থানীয় চাহিদা মেটাতে এই ব্যবসাটি শুরু করার পরিকল্পনা করা হয়েছে। প্রাথমিক পুঁজি ₹${financialPlan?.totalInitialInvestment || 35000} এবং আনুমানিক মাসিক লাভ ₹${financialPlan?.estimatedMonthlyProfit || 10000}।`
        : language === 'hi'
        ? `${loc} में स्थानीय जरूरतों को पूरा करने के लिए यह सूक्ष्म व्यापार शुरू किया जा रहा है। कुल लागत ₹${financialPlan?.totalInitialInvestment || 35000} और अनुमानित मासिक मुनाफा ₹${financialPlan?.estimatedMonthlyProfit || 10000} है।`
        : `A sustainable micro-enterprise based in ${loc}, addressing clear local demand with ₹${financialPlan?.totalInitialInvestment || 35000} initial setup and ₹${financialPlan?.estimatedMonthlyProfit || 10000} projected monthly profit.`,
      businessDescription: language === 'bn'
        ? 'স্থানীয় বাসিন্দাদের সাধ্যের মধ্যে উন্নত মানের নিত্যপ্রয়োজনীয় পণ্য ও দ্রুত সেবা প্রদান করা।'
        : language === 'hi'
        ? 'स्थानीय लोगों को किफायती दरों पर अच्छी गुणवत्ता वाला सामान और त्वरित सेवा उपलब्ध कराना।'
        : 'Providing reliable, hygienic, and affordable daily goods and services right within the community.',
      marketOpportunity: language === 'bn'
        ? 'বর্তমানে গ্রামবাসীদের দূরবর্তী শহরে গিয়ে বাড়তি ভাড়ার গাড়ি চড়ে এই সেবা নিতে হয়।'
        : language === 'hi'
        ? 'वर्तमान में ग्रामीणों को दूर के कस्बे में जाकर अतिरिक्त किराया खर्च करके यह सामान लाना पड़ता है।'
        : 'Villagers currently spend time and transport fares travelling to distant town markets.',
      targetCustomers: language === 'bn'
        ? 'আশেপাশের ৫০০টি পরিবার, স্থানীয় শিক্ষক, কৃষক ও পথচলতি সাধারণ মানুষ।'
        : language === 'hi'
        ? 'आसपास के 500 ग्रामीण परिवार, स्थानीय शिक्षक, किसान और दैनिक राहगीर।'
        : 'Neighborhood farming families, local school staff, daily commuters, and small shopkeepers.',
      productsAndServices: [
        'Primary product line with standard weights & transparent pricing',
        'Quick home delivery for elder households',
        'Seasonal packs during regional festivals'
      ],
      operationsPlan: language === 'bn'
        ? 'প্রতিদিন সকাল ৭টা থেকে সন্ধ্যা ৮টা পর্যন্ত খোলা থাকবে। সপ্তাহে ১ দিন পাইকারি বাজার থেকে মাল সংগ্রহ করা হবে।'
        : language === 'hi'
        ? 'प्रतिदिन सुबह 7 से रात 8 बजे तक सेवा। सप्ताह में एक दिन थोक मंडी से सीधे माल की खरीद।'
        : 'Daily operations from 7:00 AM to 8:00 PM with weekly wholesale restocking from local mandi.',
      marketingStrategy: language === 'bn'
        ? 'উদ্বোধনী দিনে নম্র মিষ্টি বিতরণ, পরিচিত স্বনির্ভর গোষ্ঠীগুলিতে প্রচার ও হোয়াটসঅ্যাপ ক্যাটালগ।'
        : language === 'hi'
        ? 'उद्घाटन पर छोटा मीठा वितरण, स्थानीय सहायता समूहों में प्रचार और व्हाट्सएप के माध्यम से जानकारी।'
        : 'Word-of-mouth launch with local women SHGs, clear storefront sign, and transparent rates.',
      financialOverview: {
        startupCost: financialPlan?.totalInitialInvestment || 35000,
        monthlyRunningCost: financialPlan?.totalMonthlyExpenses || 16000,
        expectedRevenue: financialPlan?.estimatedMonthlyRevenue || 26000,
        expectedNetProfit: financialPlan?.estimatedMonthlyProfit || 10000
      },
      risksAndMitigation: [
        language === 'bn' ? 'অতিরিক্ত বাকি দেওয়া বন্ধ রাখা এবং প্রতিদিনের নগদ জমা ক্যাশ বক্সে আলাদা রাখা।' : 'Strict cash-first policy to keep working capital protected.',
        language === 'bn' ? 'মৌসুমি মন্দার জন্য আগে থেকে ১০% জরুরি তহবিল তৈরি রাখা।' : 'Maintaining 10% emergency buffer to cushion seasonal dips.'
      ],
      growthMilestones: [
        { period: 'Month 1', goal: 'Complete basic shop setup and reach first 30 regular customers' },
        { period: 'Month 3', goal: 'Reach operational break-even and generate positive weekly net cash' },
        { period: 'Month 6', goal: 'Add 2 high-margin complementary product lines from retained profits' }
      ]
    }
  };
}

/**
 * 5. AI Business Health Diagnostic
 */
export async function generateBusinessHealthAdvice(params: {
  sales: number;
  expenses: number;
  customers: number;
  stockCondition: string;
  pendingCredit: number;
  language?: string;
}) {
  const { sales, expenses, customers, stockCondition, pendingCredit, language = 'en' } = params;
  const netProfit = sales - expenses;
  const marginPercent = sales > 0 ? Math.round((netProfit / sales) * 100) : 0;
  const creditRatio = sales > 0 ? pendingCredit / sales : 0;

  let status: 'doing_well' | 'needs_attention' | 'needs_action' = 'doing_well';
  let score = 85;

  if (netProfit < 0 || creditRatio > 0.4 || stockCondition === 'stockOld') {
    status = 'needs_action';
    score = 45;
  } else if (marginPercent < 15 || creditRatio > 0.25 || stockCondition === 'stockSlow') {
    status = 'needs_attention';
    score = 68;
  }

  const langRule = getLanguageInstruction(language);
  const prompt = `A micro-business in rural India has:
- Monthly Sales: ₹${sales}
- Monthly Expenses: ₹${expenses}
- Net Profit: ₹${netProfit} (${marginPercent}% margin)
- Customers: ${customers}
- Stock Condition: ${stockCondition}
- Pending Credit (Udhar): ₹${pendingCredit} (${Math.round(creditRatio * 100)}% of monthly sales)
- Health status: ${status}

${langRule}
Provide exactly 3 immediate practical actions the owner can take this week to improve cash and avoid failure.`;

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
        config: {
          systemInstruction: 'You are an empathetic, straightforward business doctor for small shops and rural producers.',
          temperature: 0.4,
        },
      });

      if (response && response.text) {
        return {
          success: true,
          status,
          score,
          monthlySales: sales,
          monthlyExpenses: expenses,
          netMarginPercent: marginPercent,
          threeActions: response.text.split('\n').filter(l => l.trim().length > 0).slice(0, 3)
        };
      }
    } catch (err: any) {
      console.warn('Gemini business health call failed, using rule-based assessment:', err?.message);
    }
  }

  // Fallback assessment actions
  const defaultActions = language === 'bn' ? [
    'বাকি আদায়: যাদের কাছে ₹৫০০-র বেশি বাকি আছে, তাদের সাথে হাসিমুখে দেখা করে অন্তত অর্ধেক টাকা আজই তুলুন।',
    'মালের হিসাব: যে মাল ১ মাস ধরে বিক্রি হয়নি, সেগুলোর দাম ৫% কমিয়ে নগদ টাকা দ্রুত মুক্ত করুন।',
    'অপ্রয়োজনীয় খরচ কমানো: চলতি সপ্তাহের সমস্ত ছোটখাটো অপচয় বন্ধ করে নগদ অর্থ সুরক্ষিত রাখুন।'
  ] : language === 'hi' ? [
    'उधार वसूली: जिन ग्राहकों पर ₹500 से अधिक बकाया है, उनसे विनम्रतापूर्वक मिलकर आज ही 50% नकद लें।',
    'अटका माल निकालना: जो सामान 30 दिनों से नहीं बिका, उस पर छोटी छूट देकर अपनी पूंजी तुरंत खाली करें।',
    'खर्च पर लगाम: इस हफ्ते के सभी गैर-जरूरी खर्च रोककर नकदी को गल्ले में सुरक्षित रखें।'
  ] : [
    'Collect Overdue Credit: Visit customers owing more than ₹500 and politely request at least 50% cash settlement today.',
    'Clear Slow Stock: Offer a modest 5% quick clearance discount on goods sitting longer than 30 days to unlock working capital.',
    'Daily Expense Freeze: Postpone all non-essential tool purchases until cash flow turns comfortably positive.'
  ];

  return {
    success: true,
    status,
    score,
    monthlySales: sales,
    monthlyExpenses: expenses,
    netMarginPercent: marginPercent,
    threeActions: defaultActions
  };
}

/**
 * 6. Multi-Turn Conversational Chatbot with Specialized Roles
 */
export async function handleMultiTurnChat(params: {
  messages: Array<{ role: 'user' | 'model' | 'ai'; text: string }>;
  roleMode?: 'general' | 'financial' | 'growth' | 'schemes' | 'operations';
  language?: string;
  userProfile?: any;
}) {
  const { messages, roleMode = 'general', language = 'en', userProfile } = params;
  const langRule = getLanguageInstruction(language);

  // Specialized System Instructions based on Role
  let roleInstruction = '';
  switch (roleMode) {
    case 'financial':
      roleInstruction = `You are a Senior Rural Microfinance Analyst & Capital Structuring Consultant for GramBiz AI.
Your specialty is unit economics, break-even planning, cash-flow discipline, working capital management, debt capacity, and loan structuring.
Always calculate or reference realistic margins, warn against high-interest informal credit, and explain financial ratios in practical everyday terms.`;
      break;
    case 'growth':
      roleInstruction = `You are a Rural Retail & Customer Acquisition Strategist for GramBiz AI.
Your specialty is footfall growth, word-of-mouth marketing, festive bundling, product placement, neighborhood trust-building, and digital ordering via WhatsApp.
Provide hyper-actionable, low-cost marketing tactics that work in village markets (haats).`;
      break;
    case 'schemes':
      roleInstruction = `You are a Government Schemes & Microcredit Compliance Specialist for GramBiz AI.
Your expertise covers Mudra Shishu/Kishore loans, PM-Kisan, National Rural Livelihoods Mission (NRLM), SHG Bank Linkage, PMEGP, KCC, and state-specific rural subsidies.
Explain formal eligibility criteria clearly, required documents (Aadhaar, Land records, Quotations), and bank branch interaction procedures. Never guarantee loan approvals.`;
      break;
    case 'operations':
      roleInstruction = `You are a Micro-Enterprise Operations & Supply Chain Expert for GramBiz AI.
Your focus is raw material procurement, mandi wholesale pricing, dead-stock prevention, spoilage control, machinery upkeep, and daily operational schedules.`;
      break;
    case 'general':
    default:
      roleInstruction = `You are the Lead Business Advisory Consultant for GramBiz AI.
You assist rural entrepreneurs with holistic guidance across opportunity discovery, ground feasibility, financial hygiene, and day-to-day business health.`;
      break;
  }

  const systemPrompt = `${roleInstruction}
${langRule}

Tone & Formatting Guidelines:
- Professional, supportive, analytical, and structured.
- Keep responses scannable: use bold key phrases, concise bullet points, and numbered action sequences.
- Address the user's specific past conversational context.
- Whenever applicable, provide:
  1. Concrete Assessment
  2. 2-3 Actionable Steps
  3. Financial/Risk Insight
  4. Suggested Follow-Up Question
- Never guarantee profits or loan sanctions. All monetary values must be clearly positioned as estimates.`;

  const userContext = userProfile
    ? `User Profile Context: Name: ${userProfile.name || 'Entrepreneur'}, District: ${userProfile.district || 'Rural'}, State: ${userProfile.state || 'India'}, Business: ${userProfile.selectedBusiness || 'Micro Business'}, Capital: ₹${userProfile.availableCapital || 25000}.`
    : 'User Profile: Rural Micro-Entrepreneur.';

  if (ai) {
    try {
      // Map multi-turn messages to Gemini SDK contents structure
      const formattedContents = [
        {
          role: 'user',
          parts: [{ text: `[System Context: ${userContext}] Hello, please assist me.` }],
        },
        {
          role: 'model',
          parts: [{ text: `Understood. I am your specialized GramBiz AI advisor ready to help you.` }],
        },
        ...messages.map((m) => ({
          role: (m.role === 'ai' || m.role === 'model' ? 'model' : 'user') as 'user' | 'model',
          parts: [{ text: m.text }],
        })),
      ];

      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: formattedContents,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.6,
        },
      });

      if (response && response.text) {
        return {
          success: true,
          text: response.text,
          roleMode,
          language,
        };
      }
    } catch (err: any) {
      console.warn('Gemini multi-turn chat error, falling back:', err?.message);
    }
  }

  // Multi-turn fallback responses
  const lastUserMsg = messages[messages.length - 1]?.text || '';
  return getFallbackChatResponse(lastUserMsg, roleMode, language);
}

function getFallbackChatResponse(query: string, roleMode: string, lang: string) {
  if (lang === 'bn') {
    return {
      success: true,
      text: `💼 **পেশাদার পরামর্শ (${roleMode === 'financial' ? 'আর্থিক পরামর্শক' : roleMode === 'growth' ? 'বৃদ্ধি ও বিপণন' : 'ব্যবসায়িক পরামর্শক'}):**

আপনার প্রশ্নের প্রেক্ষিতে বাস্তবসম্মত মূল্যায়ন:
• **মূল বিবেচনা:** গ্রামীণ বাজারে নিয়মিত চলতি মূলধন বজায় রাখা এবং অপ্রয়োজনীয় খরচ স্থগিত রাখা সবচেয়ে জরুরি।
• **পদক্ষেপ ১:** পাইকারি মহাজনের সাথে সাপ্তাহিক ক্রেডিট লিমিট এবং সঠিক ওজন যাচাই করুন।
• **পদক্ষেপ ২:** প্রতিদিনের নগদ আয়ের অন্তত ১০% আলাদা আপৎকালীন তহবিলে জমা রাখুন।
• **ঝুঁকি সতর্কতা:** অতিরিক্ত বাকিতে মাল বিক্রি করবেন না, সর্বোচ্চ ৭ দিনের সীমা বেঁধে দিন।

👉 **পরবর্তী পদক্ষেপ:** আপনার চলতি মাসের প্রত্যাশিত বিক্রি ও খরচের খসড়া পরীক্ষা করে দেখুন। আরও কোনো বিষয়ে জানতে চান?`,
      roleMode,
      language: 'bn',
    };
  }

  if (lang === 'hi') {
    return {
      success: true,
      text: `💼 **व्यावसायिक सलाह (${roleMode === 'financial' ? 'वित्तीय सलाहकार' : roleMode === 'growth' ? 'बिक्री व विस्तार' : 'मुख्य सलाहकार'}):**

आपके प्रश्न के अनुसार जमीनी मूल्यांकन:
• **मुख्य बिंदु:** ग्रामीण व्यापार में कार्यशील पूंजी (working capital) का सुरक्षित रहना सबसे पहली प्राथमिकता होनी चाहिए।
• **कदम १:** थोक मंडी में 2 अलग-अलग व्यापारियों से भाव का तुलनात्मक अध्ययन करें।
• **कदम २:** रोजाना की बिक्री से परिवार के राशन का खर्च अलग रखें और गल्ले को सुरक्षित रखें।
• **सावधानी:** बिना अग्रिम टोकन के बड़ा उधारी ऑर्डर न दें।

👉 **अगला कदम:** क्या आप इस योजना के लिए विस्तृत मासिक बजट या ब्रेक-इवेन देखना चाहते हैं?`,
      roleMode,
      language: 'hi',
    };
  }

  return {
    success: true,
    text: `💼 **Professional Advisory (${roleMode.toUpperCase()} CONSULTANT):**

**Executive Assessment:**
In local rural and peri-urban markets, operational resilience depends directly on tight cash-conversion cycles and proactive inventory rotation.

**Recommended Action Steps:**
1. **Optimize Working Capital:** Limit customer credit terms to a strict 7-day revolving ceiling with a ₹500 cap per household.
2. **Supplier Terms:** Negotiate 5% volume discounts on top 3 weekly staple purchases with your primary stockist.
3. **Emergency Liquidity:** Maintain a liquid cash reserve equal to at least 15 days of fixed operational expenses.

**Risk Mitigation:**
Avoid committing working capital to unproven, slow-moving novelty items before testing consumer demand.

👉 **Next Step:** Would you like me to project your cash flow for the next 3 months or review local supplier pricing?`,
    roleMode,
    language: 'en',
  };
}
