// Central Configurable Scheme Engine & Financial Structuring Rules
// Adheres strictly to the Problem Statement specifications.

export interface SchemeRule {
  id: string;
  name: string;
  nameBn: string;
  nameHi: string;
  description: string;
  descriptionBn: string;
  descriptionHi: string;
  maxProjectCost: number; // in INR
  minProjectCost: number; // in INR
  fundingPercent: number; // e.g. 90%
  maxStatedAmount: number; // e.g. 1.25 lakh (125000) or 45 lakh (4500000)
  interestRateAnnual: number; // e.g. 6.5% or 8.0%
  tenureYears: number; // e.g. 3 years or 7 years
  tenureMonths: number;
  moratoriumMonths: number; // e.g. 3 months or 6 months
  repaymentFrequency: 'monthly' | 'quarterly' | 'both';
  officialSourceNotice: string;
}

export const CENTRAL_SCHEMES_CONFIG: {
  microFinance: SchemeRule;
  termLoan: SchemeRule;
  maxSupportedProjectCost: number;
  marginPercentDefault: number;
  loanPercentDefault: number;
} = {
  maxSupportedProjectCost: 5000000, // ₹50 Lakh
  marginPercentDefault: 0.10, // 10%
  loanPercentDefault: 0.90, // 90%

  microFinance: {
    id: 'micro_finance_scheme',
    name: 'Micro Finance Scheme',
    nameBn: 'মাইক্রো ফিনান্স স্কিম (ক্ষুদ্র অর্থায়ন)',
    nameHi: 'माइक्रो फाइनेंस योजना (लघु वित्तपोषण)',
    description: 'Specialized low-interest micro-enterprise credit for small village projects up to ₹1.40 Lakh.',
    descriptionBn: '₹১.৪০ লাখ পর্যন্ত ছোট গ্রামীণ প্রকল্পের জন্য বিশেষ স্বল্প সুদের ক্ষুদ্র ব্যবসায়িক ঋণ।',
    descriptionHi: '₹1.40 लाख तक की छोटी ग्रामीण परियोजनाओं के लिए विशेष कम ब्याज वाला लघु व्यावसायिक ऋण।',
    minProjectCost: 10000,
    maxProjectCost: 140000, // Up to ₹1.40 Lakh
    fundingPercent: 90,
    maxStatedAmount: 125000, // Maximum stated ₹1.25 Lakh
    interestRateAnnual: 6.5, // 6.5% p.a.
    tenureYears: 3,
    tenureMonths: 36, // 3 years
    moratoriumMonths: 3, // 3 months moratorium
    repaymentFrequency: 'both',
    officialSourceNotice: 'Scheme parameters based on PS guidelines. Verification required with local financial authority.'
  },

  termLoan: {
    id: 'term_loan_scheme',
    name: 'Term Loan Scheme',
    nameBn: 'টার্ম লোন স্কিম (মেয়াদি বাণিজ্যিক ঋণ)',
    nameHi: 'टर्म लोन योजना (सावधि वाणिज्यिक ऋण)',
    description: 'Structured enterprise development term funding for projects between ₹1.40 Lakh and ₹50 Lakh.',
    descriptionBn: '₹১.৪০ লাখ থেকে ₹৫০ লাখ পর্যন্ত মাঝারি গ্রামীণ উদ্যোগ স্থাপনের জন্য প্রাতিষ্ঠানিক মেয়াদি ঋণ।',
    descriptionHi: '₹1.40 लाख से ₹50 लाख तक के उद्यमों की स्थापना हेतु संस्थागत सावधि ऋण।',
    minProjectCost: 140001,
    maxProjectCost: 5000000, // Above ₹1.40 Lakh up to ₹50 Lakh
    fundingPercent: 90,
    maxStatedAmount: 4500000, // Maximum stated ₹45 Lakh
    interestRateAnnual: 8.0, // 8.0% p.a.
    tenureYears: 7,
    tenureMonths: 84, // 7 years
    moratoriumMonths: 6, // 6 months moratorium
    repaymentFrequency: 'both',
    officialSourceNotice: 'Scheme parameters based on PS guidelines. Verification required with local financial authority.'
  }
};

export interface StructuringResult {
  marginCapital: number;
  estimatedProjectCost: number;
  rawCalculatedLoan: number;
  eligibleLoanAmount: number;
  promoterContribution: number;
  recommendedScheme: SchemeRule | null;
  status: 'valid' | 'margin_zero' | 'margin_too_low' | 'exceeds_max_range' | 'invalid_input';
  statusMessage: string;
  statusMessageBn: string;
  statusMessageHi: string;
  isCapped: boolean;
}

/**
 * Calculates project cost and loan structuring based on Available Margin Capital.
 * Formula:
 *   Total Project Cost = Available Margin Capital / 10%
 *   Maximum Loan = Total Project Cost * 90%
 */
export function calculateSmartStructuring(availableMarginCapital: number): StructuringResult {
  const margin = Number(availableMarginCapital);

  if (isNaN(margin) || margin < 0) {
    return {
      marginCapital: 0,
      estimatedProjectCost: 0,
      rawCalculatedLoan: 0,
      eligibleLoanAmount: 0,
      promoterContribution: 0,
      recommendedScheme: null,
      status: 'invalid_input',
      statusMessage: 'Please enter a valid positive margin capital amount.',
      statusMessageBn: 'দয়া করে একটি সঠিক ইতিবাচক মূলধনের পরিমাণ লিখুন।',
      statusMessageHi: 'कृपया एक मान्य सकारात्मक पूंजी राशि दर्ज करें।',
      isCapped: false
    };
  }

  if (margin === 0) {
    return {
      marginCapital: 0,
      estimatedProjectCost: 0,
      rawCalculatedLoan: 0,
      eligibleLoanAmount: 0,
      promoterContribution: 0,
      recommendedScheme: null,
      status: 'margin_zero',
      statusMessage: 'Initial margin capital cannot be ₹0. Minimum 10% promoter stake is required.',
      statusMessageBn: 'প্রাথমিক নিজস্ব পুঁজি ₹০ হতে পারে না। প্রকল্প শুরুর জন্য অন্তত ১০% নিজস্ব অর্থ প্রয়োজন।',
      statusMessageHi: 'प्रारंभिक स्वयं की पूंजी ₹0 नहीं हो सकती। परियोजना शुरू करने के लिए कम से कम 10% स्वयं की राशि आवश्यक है।',
      isCapped: false
    };
  }

  if (margin < 1000) {
    return {
      marginCapital: margin,
      estimatedProjectCost: margin * 10,
      rawCalculatedLoan: margin * 9,
      eligibleLoanAmount: margin * 9,
      promoterContribution: margin,
      recommendedScheme: null,
      status: 'margin_too_low',
      statusMessage: 'Margin capital is too small to cover formal institutional scheme costs (minimum ₹1,000).',
      statusMessageBn: 'প্রাতিষ্ঠানিক স্কিম মূল্যায়নের জন্য নিজস্ব পুঁজি অত্যন্ত কম (কমপক্ষে ₹১,০০০ প্রয়োজন)।',
      statusMessageHi: 'संस्थागत योजना मूल्यांकन के लिए स्वयं की पूंजी बहुत कम है (न्यूनतम ₹1,000 आवश्यक)।',
      isCapped: false
    };
  }

  // Core formula: Total Project Cost = Margin / 10%
  const estimatedProjectCost = Math.round(margin / CENTRAL_SCHEMES_CONFIG.marginPercentDefault);
  const rawCalculatedLoan = Math.round(estimatedProjectCost * CENTRAL_SCHEMES_CONFIG.loanPercentDefault);

  // Check if exceeds maximum supported limit (₹50 Lakh)
  if (estimatedProjectCost > CENTRAL_SCHEMES_CONFIG.maxSupportedProjectCost) {
    return {
      marginCapital: margin,
      estimatedProjectCost,
      rawCalculatedLoan,
      eligibleLoanAmount: 0,
      promoterContribution: margin,
      recommendedScheme: null,
      status: 'exceeds_max_range',
      statusMessage: 'Your estimated project cost is outside the supported range of these schemes (Max ₹50 Lakh). Please check other applicable funding options.',
      statusMessageBn: 'আপনার আনুমানিক প্রকল্প ব্যয় এই স্কিমগুলির নির্ধারিত সীমার (সর্বোচ্চ ₹৫০ লাখ) বাইরে। দয়া করে অন্যান্য বৃহৎ তহবিল বিকল্প অনুসন্ধান করুন।',
      statusMessageHi: 'आपकी अनुमानित परियोजना लागत इन योजनाओं की निर्धारित सीमा (अधिकतम ₹50 लाख) से बाहर है। कृपया अन्य बड़े वित्तपोषण विकल्पों की जाँच करें।',
      isCapped: false
    };
  }

  // Route to Scheme 1 or Scheme 2
  let recommendedScheme: SchemeRule;
  if (estimatedProjectCost <= CENTRAL_SCHEMES_CONFIG.microFinance.maxProjectCost) {
    recommendedScheme = CENTRAL_SCHEMES_CONFIG.microFinance;
  } else {
    recommendedScheme = CENTRAL_SCHEMES_CONFIG.termLoan;
  }

  // Enforce scheme maximum stated ceiling cap
  const eligibleLoanAmount = Math.min(rawCalculatedLoan, recommendedScheme.maxStatedAmount);
  const isCapped = rawCalculatedLoan > recommendedScheme.maxStatedAmount;

  return {
    marginCapital: margin,
    estimatedProjectCost,
    rawCalculatedLoan,
    eligibleLoanAmount,
    promoterContribution: estimatedProjectCost - eligibleLoanAmount,
    recommendedScheme,
    status: 'valid',
    statusMessage: `Eligible for ${recommendedScheme.name} up to 90% funding.`,
    statusMessageBn: `${recommendedScheme.nameBn} এর আওতায় ৯০% পর্যন্ত ঋণ সহায়তা উপযোগী।`,
    statusMessageHi: `${recommendedScheme.nameHi} के अंतर्गत 90% तक ऋण सहायता हेतु उपयुक्त।`,
    isCapped
  };
}

export interface DetailedRepaymentSchedule {
  loanAmount: number;
  annualInterestRate: number;
  tenureMonths: number;
  tenureYears: number;
  moratoriumMonths: number;
  monthlyEMI: number;
  quarterlyRepayment: number;
  totalRepayment: number;
  totalInterest: number;
  moratoriumMonthlyInterestOnly: number;
}

/**
 * Calculates complete repayment metrics including monthly EMI and quarterly repayment views.
 */
export function calculateRepaymentDetails(
  principal: number,
  annualInterestRate: number,
  tenureMonths: number,
  moratoriumMonths: number = 0
): DetailedRepaymentSchedule {
  const p = Math.max(1000, Number(principal) || 10000);
  const annualRate = Number(annualInterestRate) || 8.0;
  const monthlyRate = annualRate / 12 / 100;
  const totalMonths = Math.max(1, Number(tenureMonths) || 36);

  // Active repayment months after moratorium
  const repaymentMonths = Math.max(1, totalMonths - moratoriumMonths);

  let monthlyEMI = 0;
  if (monthlyRate === 0) {
    monthlyEMI = Math.round(p / repaymentMonths);
  } else {
    const emiFloat = (p * monthlyRate * Math.pow(1 + monthlyRate, repaymentMonths)) /
      (Math.pow(1 + monthlyRate, repaymentMonths) - 1);
    monthlyEMI = Math.round(emiFloat);
  }

  // During moratorium, borrower pays simple monthly interest only
  const moratoriumMonthlyInterestOnly = Math.round(p * monthlyRate);
  const moratoriumTotalInterest = moratoriumMonthlyInterestOnly * moratoriumMonths;

  const totalRepayment = (monthlyEMI * repaymentMonths) + moratoriumTotalInterest;
  const totalInterest = Math.max(0, totalRepayment - p);

  // Quarterly repayment = approx 3 monthly payments
  const quarterlyRepayment = monthlyEMI * 3;

  return {
    loanAmount: p,
    annualInterestRate: annualRate,
    tenureMonths: totalMonths,
    tenureYears: Math.round((totalMonths / 12) * 10) / 10,
    moratoriumMonths,
    monthlyEMI,
    quarterlyRepayment,
    totalRepayment,
    totalInterest,
    moratoriumMonthlyInterestOnly
  };
}
