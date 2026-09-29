import { FinancialCalculation, CapitalAllocationItem, Language } from '../types';

export function calculateFinancials(inputs: {
  availableCapital: number;
  equipmentCost: number;
  rawMaterialCost: number;
  rentCost: number;
  salaryCost: number;
  utilitiesCost: number;
  transportCost: number;
  marketingCost: number;
  otherExpenses: number;
  expectedMonthlySales: number;
}): FinancialCalculation {
  const availableCapital = Math.max(0, Number(inputs.availableCapital) || 0);
  const equipmentCost = Math.max(0, Number(inputs.equipmentCost) || 0);
  const rawMaterialCost = Math.max(0, Number(inputs.rawMaterialCost) || 0);
  const rentCost = Math.max(0, Number(inputs.rentCost) || 0);
  const salaryCost = Math.max(0, Number(inputs.salaryCost) || 0);
  const utilitiesCost = Math.max(0, Number(inputs.utilitiesCost) || 0);
  const transportCost = Math.max(0, Number(inputs.transportCost) || 0);
  const marketingCost = Math.max(0, Number(inputs.marketingCost) || 0);
  const otherExpenses = Math.max(0, Number(inputs.otherExpenses) || 0);
  const expectedMonthlySales = Math.max(0, Number(inputs.expectedMonthlySales) || 0);

  // Total startup investment = equipment + initial marketing + 1st month raw material & rent setup
  const totalInitialInvestment = equipmentCost + marketingCost + rawMaterialCost + (rentCost * 2);

  const monthlyFixedExpenses = rentCost + salaryCost + utilitiesCost;
  const monthlyVariableExpenses = rawMaterialCost + transportCost + otherExpenses;
  const totalMonthlyExpenses = monthlyFixedExpenses + monthlyVariableExpenses;

  const estimatedMonthlyRevenue = expectedMonthlySales;
  const estimatedMonthlyProfit = estimatedMonthlyRevenue - totalMonthlyExpenses;

  const profitMarginPercent = estimatedMonthlyRevenue > 0
    ? Math.round((estimatedMonthlyProfit / estimatedMonthlyRevenue) * 100)
    : 0;

  // Revenue needed each month to cover total monthly expenses exactly (zero net loss)
  const breakEvenMonthlyRevenue = totalMonthlyExpenses;

  // Approximate days in a 30-day month needed to cover monthly expenses
  const dailySales = estimatedMonthlyRevenue / 30;
  const breakEvenDays = dailySales > 0 ? Math.min(30, Math.ceil(totalMonthlyExpenses / dailySales)) : 30;

  // Funding gap: how much more money is needed beyond own capital
  const capitalFundingGap = Math.max(0, totalInitialInvestment - availableCapital);

  return {
    availableCapital,
    equipmentCost,
    rawMaterialCost,
    rentCost,
    salaryCost,
    utilitiesCost,
    transportCost,
    marketingCost,
    otherExpenses,
    expectedMonthlySales,
    totalInitialInvestment,
    monthlyFixedExpenses,
    monthlyVariableExpenses,
    totalMonthlyExpenses,
    estimatedMonthlyRevenue,
    estimatedMonthlyProfit,
    profitMarginPercent,
    breakEvenMonthlyRevenue,
    breakEvenUnitsOrDays: `${breakEvenDays} days of monthly sales`,
    capitalFundingGap
  };
}

export function getDefaultCapitalAllocation(totalCapital: number): CapitalAllocationItem[] {
  const cap = Math.max(totalCapital || 25000, 10000);

  const p1 = Math.round(cap * 0.40);
  const p2 = Math.round(cap * 0.20);
  const p3 = Math.round(cap * 0.20);
  const p4 = Math.round(cap * 0.10);
  const p5 = cap - (p1 + p2 + p3 + p4); // remaining 10%

  return [
    {
      id: 'setup',
      name: 'Business Setup & Tools',
      nameBn: 'দোকান সেটআপ ও সরঞ্জাম',
      nameHi: 'सेटअप व औजार',
      amount: p1,
      percent: 40,
      color: '#059669', // emerald-600
      description: 'One-time machinery, racks, furniture, or signboard'
    },
    {
      id: 'materials',
      name: 'Initial Stock & Raw Materials',
      nameBn: 'প্রথম মাল ও কাঁচামাল',
      nameHi: 'पहला स्टॉक व कच्चा माल',
      amount: p2,
      percent: 20,
      color: '#0d9488', // teal-600
      description: 'Goods ready to sell or process'
    },
    {
      id: 'working_capital',
      name: 'Working Capital Reserve (2 Months)',
      nameBn: 'চলতি মূলধন (২ মাসের খরচ)',
      nameHi: 'कार्यशील पूंजी (2 महीने का खर्च)',
      amount: p3,
      percent: 20,
      color: '#0284c7', // sky-600
      description: 'Buffer for rent and bills before customer money flows in'
    },
    {
      id: 'marketing',
      name: 'Local Marketing & Launch',
      nameBn: 'প্রচার ও পরিচিতি',
      nameHi: 'प्रचार व शुरुआत',
      amount: p4,
      percent: 10,
      color: '#d97706', // amber-600
      description: 'Visiting cards, WhatsApp group announcement, opening discounts'
    },
    {
      id: 'emergency',
      name: 'Emergency Reserve Fund',
      nameBn: 'জরুরি আপৎকালীন তহবিল',
      nameHi: 'आपातकालीन सुरक्षा कोष',
      amount: p5,
      percent: 10,
      color: '#dc2626', // rose-600
      description: 'Never touched except for unforeseen equipment breakdowns'
    }
  ];
}

export function calculateLoanEMI(principal: number, annualRatePercent: number, tenureMonths: number) {
  const p = Math.max(1000, Number(principal) || 10000);
  const r = (Number(annualRatePercent) || 9) / 12 / 100;
  const n = Math.max(1, Number(tenureMonths) || 12);

  if (r === 0) {
    const emi = Math.round(p / n);
    return { emi, totalPayment: p, totalInterest: 0 };
  }

  const emiFloat = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const emi = Math.round(emiFloat);
  const totalPayment = emi * n;
  const totalInterest = Math.max(0, totalPayment - p);

  return {
    emi,
    totalPayment,
    totalInterest
  };
}

export function formatINR(val: number): string {
  const num = Math.round(val || 0);
  return '₹' + num.toLocaleString('en-IN');
}
