export type Language = 'en' | 'bn' | 'hi';

export interface UserProfile {
  id: string;
  name: string;
  phone?: string;
  state: string;
  district: string;
  villageOrTown: string;
  businessStatus: 'new' | 'existing';
  selectedBusiness?: string;
  businessCategory?: string;
  availableCapital: number;
  skills: string[];
  hasSpaceOrShop: boolean | 'not_sure';
  workPreference: 'full_time' | 'part_time';
  onboardingCompleted: boolean;
  accessibility: {
    largeText: boolean;
    highContrast: boolean;
    voiceAssistance: boolean;
    largeButtons: boolean;
  };
}

export interface BusinessIdea {
  id: string;
  name: string;
  nameBn: string;
  nameHi: string;
  category: string;
  categoryBn: string;
  categoryHi: string;
  minInvestment: number;
  maxInvestment: number;
  whySuits: string;
  requirements: string[];
  targetCustomers: string;
  potentialMonthlyIncome: number;
  breakEvenMonths: number;
  risks: string[];
  firstSteps: string[];
  suitabilityScore?: number;
}

export interface MarketIntelligence {
  state: string;
  district: string;
  category: string;
  demandLevel: 'High' | 'Moderate' | 'Seasonal';
  demandSummary: string;
  popularProducts: string[];
  seasonalOpportunities: {
    season: string;
    description: string;
    bestProducts: string[];
  }[];
  customerSegments: {
    name: string;
    sharePercent: number;
    behavior: string;
  }[];
  marketOpportunities: string[];
  transportationNotes: string;
  competitionLevel: 'Low' | 'Moderate' | 'High';
  rawMaterialAvailability: string;
}

export interface FinancialCalculation {
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
  // Computed fields
  totalInitialInvestment: number;
  monthlyFixedExpenses: number;
  monthlyVariableExpenses: number;
  totalMonthlyExpenses: number;
  estimatedMonthlyRevenue: number;
  estimatedMonthlyProfit: number;
  profitMarginPercent: number;
  breakEvenMonthlyRevenue: number;
  breakEvenUnitsOrDays: string;
  capitalFundingGap: number;
}

export interface CapitalAllocationItem {
  id: string;
  name: string;
  nameBn: string;
  nameHi: string;
  amount: number;
  percent: number;
  color: string;
  description: string;
}

export interface SaleRecord {
  id: string;
  date: string;
  product: string;
  quantity: number;
  amount: number;
  customerName?: string;
  isPaid: boolean;
}

export interface ExpenseRecord {
  id: string;
  date: string;
  category: 'raw_materials' | 'rent' | 'utilities' | 'transport' | 'salary' | 'packaging' | 'other';
  amount: number;
  notes?: string;
}

export interface DailyTaskItem {
  id: string;
  title: string;
  titleBn: string;
  titleHi: string;
  completed: boolean;
  category: 'inventory' | 'sales' | 'customer' | 'finance' | 'procurement';
  priority: 'high' | 'normal';
}

export interface BusinessPlanContent {
  businessName: string;
  location: string;
  executiveSummary: string;
  businessDescription: string;
  marketOpportunity: string;
  targetCustomers: string;
  productsAndServices: string[];
  operationsPlan: string;
  marketingStrategy: string;
  financialOverview: {
    startupCost: number;
    monthlyRunningCost: number;
    expectedRevenue: number;
    expectedNetProfit: number;
  };
  risksAndMitigation: string[];
  growthMilestones: {
    period: string;
    goal: string;
  }[];
}

export interface BusinessHealthAssessment {
  status: 'doing_well' | 'needs_attention' | 'needs_action';
  score: number;
  headline: string;
  monthlySales: number;
  monthlyExpenses: number;
  netMarginPercent: number;
  threeActions: string[];
  stockWarning?: string;
  creditCollectionWarning?: string;
}

export interface AIAdvisorMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  structured?: {
    simpleAnswer: string;
    actionSteps: string[];
    moneyNeeded?: string;
    opportunity?: string;
    risks?: string[];
    nextStep: string;
  };
}
