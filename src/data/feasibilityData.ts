// Hyper-Local Feasibility Data Engine
// Modeled specifically for rural micro-entrepreneurs under strict "LESS READING. MORE UNDERSTANDING" guidelines.
// All estimates are explicitly labeled as "AI-Assisted Estimate / Demo Data" per PS guidelines.

export interface FeasibilitySWOT {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface LocalThreatItem {
  risk: string;
  whyItMatters: string;
  possibleAction: string;
}

export interface CompetitorMapping {
  densityLevel: 'Low' | 'Moderate' | 'High';
  estimatedCountIn10Km: string;
  category: string;
  competitionLevel: string;
  differentiationStrategy: string;
  note: string;
}

export interface LocalPricingValue {
  estimatedPriceRange: string;
  purchasingConsiderations: string[];
  pricingStrategy: string;
  positioning: 'Value / Low-Cost' | 'Balanced / Daily Affordable' | 'Quality Premium';
  priceConfidence: string;
}

export interface HyperLocalFeasibilityReport {
  id: string;
  businessName: string;
  category: string;
  location: {
    state: string;
    district: string;
    villageOrBlock: string;
  };
  feasibilityAssessment: {
    badge: 'Strong Fit' | 'Needs Attention' | 'Higher Risk';
    headline: string;
    summary: string;
    scorePercent: number;
    reasons: {
      factor: string;
      status: 'positive' | 'warning' | 'neutral';
      detail: string;
    }[];
  };
  marketReach: {
    estimatedRadiusKm: number;
    potentialCustomerBase: string;
    coverageZone: string;
    dataLabel: 'AI-assisted estimate' | 'Demo Data' | 'Illustrative';
  };
  localDemand: {
    level: 'High' | 'Moderate' | 'Seasonal';
    dailyVolumeEstimate: string;
    peakHours: string;
    summary: string;
  };
  opportunityAnalysis: {
    primaryOpportunity: string;
    underservedNiche: string;
    customerGroups: string[];
    localSalesChannels: string[];
    seasonalOpportunity: string;
  };
  swot: FeasibilitySWOT;
  threats: LocalThreatItem[];
  competitors: CompetitorMapping;
  pricing: LocalPricingValue;
  customerTypes: {
    type: string;
    sharePercent: number;
    description: string;
  }[];
  distributionChannels: {
    channel: string;
    feasibility: 'High' | 'Medium' | 'Low';
    description: string;
  }[];
  seasonalFactors: {
    season: string;
    impact: 'Surge' | 'Steady' | 'Slowdown';
    action: string;
  }[];
}

export function getFeasibilityFor(
  state: string,
  district: string,
  category: string,
  marginCapital: number = 25000
): HyperLocalFeasibilityReport {
  const normCat = (category || 'Dairy').toLowerCase();
  const isDairy = normCat.includes('dairy') || normCat.includes('milk');
  const isPoultry = normCat.includes('poultry') || normCat.includes('egg');
  const isFood = normCat.includes('food') || normCat.includes('spice') || normCat.includes('oil');
  const isRetail = normCat.includes('retail') || normCat.includes('kirana') || normCat.includes('shop');
  const isTailoring = normCat.includes('tailor') || normCat.includes('textile');

  const locKey = `${district || 'Rural Center'}, ${state || 'West Bengal'}`;

  if (isDairy) {
    return {
      id: 'feas_dairy',
      businessName: 'Mini Dairy & Fresh Milk Collection',
      category: 'Dairy & Livestock',
      location: { state, district, villageOrBlock: district },
      feasibilityAssessment: {
        badge: marginCapital >= 25000 ? 'Strong Fit' : 'Needs Attention',
        headline: marginCapital >= 25000
          ? 'Strong Local Demand with Daily Cash Inflow'
          : 'Viable Model, but Requires Working Capital Buffer for Cattle Feed',
        summary: 'Essential staple consumption in village clusters and steady wholesale demand from local sweet shops make dairy highly viable.',
        scorePercent: marginCapital >= 25000 ? 86 : 72,
        reasons: [
          { factor: 'Market Opportunity', status: 'positive', detail: 'High recurring daily demand for unprocessed milk and cottage cheese (chhana).' },
          { factor: 'Capital Requirement', status: marginCapital >= 25000 ? 'positive' : 'warning', detail: 'Basic milk cans and cows require ₹30,000–₹60,000 initial investment.' },
          { factor: 'Competition', status: 'positive', detail: 'Nearby vendors focus on morning distribution; afternoon & evening slots remain open.' },
          { factor: 'Operating Risk', status: 'warning', detail: 'Cattle sickness and seasonal fodder cost spikes require a dedicated 10% emergency buffer.' },
          { factor: 'Customer Base', status: 'positive', detail: 'Immediate 40–60 household door-to-door customer pool within 2 km radius.' },
          { factor: 'Working Capital Needs', status: 'neutral', detail: 'Feed costs must be paid weekly; requires steady daily cash collection.' },
          { factor: 'Expected Operating Cost', status: 'positive', detail: 'Gross operating margin exceeds 45% when fodder is sourced directly from farmers.' }
        ]
      },
      marketReach: {
        estimatedRadiusKm: 5,
        potentialCustomerBase: '1,200 – 1,800 Households (AI-assisted estimate)',
        coverageZone: 'Immediate village cluster + nearest Block haat market',
        dataLabel: 'AI-assisted estimate'
      },
      localDemand: {
        level: 'High',
        dailyVolumeEstimate: '45 – 80 Liters / Day',
        peakHours: 'Morning: 6:00 AM – 8:30 AM | Evening: 5:00 PM – 7:30 PM',
        summary: 'Households prefer fresh milk directly from local producers over packaged pasteurized brands.'
      },
      opportunityAnalysis: {
        primaryOpportunity: 'Nearby village customers have limited daily access to unadulterated pure cow milk at reasonable rates.',
        underservedNiche: 'Bulk morning supply of thick cow milk for local sweet artisans (Moiras/Halwais) and tea stalls.',
        customerGroups: ['Village families with children', 'Local tea stalls (Chai shops)', 'Traditional sweet makers', 'Commuters on arterial road'],
        localSalesChannels: ['Direct door-to-door morning subscription', 'Counter sales at roadside kiosk', 'Bi-weekly village Haat'],
        seasonalOpportunity: 'Surge in demand during wedding months and harvest festival delicacies (Poush Sankranti, Chhath, Diwali).'
      },
      swot: {
        strengths: [
          'Immediate daily cash inflow with zero credit lag if cash-on-delivery is maintained',
          'Established household demand requiring minimal advertising expenditure',
          'Utilizes family homestead space without commercial rent overhead'
        ],
        weaknesses: [
          'Milk is highly perishable; spoilage risk if morning delivery is delayed past 9 AM',
          'High physical labor required 7 days a week for feeding and milking',
          'Limited cold-storage options in village areas during summer power cuts'
        ],
        opportunities: [
          'Value addition into Ghee, Paneer, and Curd yields 25% higher margins',
          'Tie-up with government milk cooperatives or primary dairy societies',
          'Supply dung cakes / organic compost to local vegetable growers'
        ],
        threats: [
          'Sudden price hikes in concentrated cattle feed and dry hay (khar)',
          'Monsoon hoof infections or bovine fever if sheds are damp',
          'Large cooperative collection vans entering the village with aggressive pricing'
        ]
      },
      threats: [
        {
          risk: 'Feed & Fodder Price Fluctuations',
          whyItMatters: 'Can compress operating margins by 12–18% during dry winter months.',
          possibleAction: 'Stock up on dry fodder right after the monsoon harvest at discounted wholesale rates.'
        },
        {
          risk: 'Customer Credit (Udhar) Accumulation',
          whyItMatters: 'Households asking for monthly credit can choke weekly cash needed for animal feed.',
          possibleAction: 'Enforce a strict 7-day maximum credit limit or collect payments on a weekly coupon system.'
        },
        {
          risk: 'Animal Health Contingencies',
          whyItMatters: 'Illness stops milk yield instantly while feeding costs continue.',
          possibleAction: 'Keep animal vaccinated via block veterinary camp and preserve an untouched ₹4,000 emergency fund.'
        }
      ],
      competitors: {
        densityLevel: 'Moderate',
        estimatedCountIn10Km: '3 – 5 local milk vendors (Illustrative estimate)',
        category: 'Informal Village Dairy Sellers',
        competitionLevel: 'Moderate but fragmented with no single dominant player',
        differentiationStrategy: 'Purity guarantee (no water mixing), punctual 6:30 AM doorstep delivery, and free fat tester demonstration.',
        note: 'Estimated competitor density based on regional village demographic models; not verified commercial registry data.'
      },
      pricing: {
        estimatedPriceRange: '₹48 – ₹58 per Liter',
        purchasingConsiderations: ['Visible cream layer (Fat %)', 'Prompt morning arrival', 'Trust in cleanliness'],
        pricingStrategy: 'Competitive entry at ₹50/L to build loyal monthly base, transitioning to value-added curd at ₹70/kg.',
        positioning: 'Balanced / Daily Affordable',
        priceConfidence: 'Estimated range based on rural market benchmarks'
      },
      customerTypes: [
        { type: 'Domestic Households', sharePercent: 55, description: 'Daily 0.5L – 2L purchases for household tea and children.' },
        { type: 'Sweet Shops & Tea Stalls', sharePercent: 30, description: 'Bulk 10L – 25L buyers prioritizing consistency and fat content.' },
        { type: 'Occasional / Festive Buyers', sharePercent: 15, description: 'Weekend curd, festival feasts, and ritual gatherings.' }
      ],
      distributionChannels: [
        { channel: 'Doorstep Morning Delivery (Cycle/Foot)', feasibility: 'High', description: 'Lowest cost, builds personal loyalty with village families.' },
        { channel: 'On-Premise Shed Counter', feasibility: 'High', description: 'Zero transit cost; nearby neighbors pick up milk with their own cans.' },
        { channel: 'Block Wholesale Aggregator', feasibility: 'Medium', description: 'Guaranteed volume purchase but offers lower per-liter payout.' }
      ],
      seasonalFactors: [
        { season: 'Festive & Winter (Oct - Feb)', impact: 'Surge', action: 'Increase milking volume and prepare sweet cottage cheese (chhana) for wedding season.' },
        { season: 'Summer (Apr - Jun)', impact: 'Steady', action: 'Offer chilled buttermilk and curd to beat heat and preserve perishable liquid milk.' },
        { season: 'Monsoon (Jul - Sep)', impact: 'Slowdown', action: 'Disinfect sheds against dampness; prevent fungal growth on stored animal feed.' }
      ]
    };
  }

  if (isFood) {
    return {
      id: 'feas_food',
      businessName: 'Mini Spice Grinding & Cold-Pressed Mustard Oil Unit',
      category: 'Food Processing',
      location: { state, district, villageOrBlock: district },
      feasibilityAssessment: {
        badge: marginCapital >= 30000 ? 'Strong Fit' : 'Needs Attention',
        headline: marginCapital >= 30000
          ? 'Strong Value-Add Potential with High Return on Machinery'
          : 'High Potential, requires adequate capital for electricity connection and compact grinder',
        summary: 'Village households and roadside eateries purchase spices and oil weekly; processing locally yields 35-50% profit over raw grains.',
        scorePercent: marginCapital >= 30000 ? 84 : 70,
        reasons: [
          { factor: 'Market Opportunity', status: 'positive', detail: 'Rural families prefer fresh unadulterated turmeric, chili powder, and pungent mustard oil.' },
          { factor: 'Capital Requirement', status: marginCapital >= 30000 ? 'positive' : 'warning', detail: 'Compact pulverizer machine costs approx ₹25,000–₹45,000.' },
          { factor: 'Competition', status: 'positive', detail: 'Most villages travel 4–8 km to town centers to get spices ground.' },
          { factor: 'Operating Risk', status: 'neutral', detail: 'Power outages can be mitigated with daytime single-phase efficient motors.' },
          { factor: 'Customer Base', status: 'positive', detail: 'Broad customer base across all households, grocery shops, and wedding caterers.' },
          { factor: 'Working Capital Needs', status: 'positive', detail: 'Customers often bring their own raw mustard/turmeric and pay custom milling job work fees.' },
          { factor: 'Expected Operating Cost', status: 'positive', detail: 'Low recurring overhead; primary operational expense is electricity and machine greasing.' }
        ]
      },
      marketReach: {
        estimatedRadiusKm: 8,
        potentialCustomerBase: '2,500 – 4,000 Households across 3 village clusters (Illustrative)',
        coverageZone: 'Village center, weekly bazaar, and neighboring agricultural hamlets',
        dataLabel: 'AI-assisted estimate'
      },
      localDemand: {
        level: 'High',
        dailyVolumeEstimate: '30 – 60 kg spice grinding / 20 – 40 Liters oil pressing',
        peakHours: '9:00 AM – 1:00 PM | 4:00 PM – 7:00 PM',
        summary: 'Steady demand year-round with massive spikes during winter post-harvest processing.'
      },
      opportunityAnalysis: {
        primaryOpportunity: 'Local consumers distrust packaged adulterated supermarket spices and want pure, aromatic ground spices in front of their eyes.',
        underservedNiche: 'Job-work milling service: farmers bring their own grown mustard/chili and pay ₹8–₹12 per kg grinding charge.',
        customerGroups: ['Local village households', 'Small grocery (Kirana) shops for branded resale', 'Rural wedding and feast caterers'],
        localSalesChannels: ['Village workshop counter', 'Pre-packaged pouches sold at weekly Haat', 'Direct delivery to local Kirana shops'],
        seasonalOpportunity: 'Post-harvest season (Feb - Apr) brings massive custom processing volume directly from farmers.'
      },
      swot: {
        strengths: [
          'High operating margin on custom processing job-work with zero raw material cost risk',
          'Finished spices and mustard oil have 6–12 months shelf life with minimal spoilage',
          'Dual revenue model: custom milling fees + selling own packaged brand'
        ],
        weaknesses: [
          'Requires steady single-phase or three-phase electric connection',
          'Dust and noise require proper ventilation and protective masks',
          'Initial machine setup requires technical familiarity for blade sharpening'
        ],
        opportunities: [
          'Packaging in attractive 100g / 250g plastic pouches with village branding',
          'Supplying mustard oil cake (Khol) to local dairy farmers as high-protein cattle feed',
          'Bulk wholesale orders for temple feasts, weddings, and school midday meals'
        ],
        threats: [
          'Extended village electricity load-shedding during peak afternoon hours',
          'Cheap adulterated industrial spice brands entering rural retail stores',
          'Motor burnout due to high voltage fluctuation without stabilizer'
        ]
      },
      threats: [
        {
          risk: 'Voltage Fluctuations & Power Cuts',
          whyItMatters: 'Can halt production and damage electric motors.',
          possibleAction: 'Install a heavy-duty copper stabilizer and schedule grinding during morning reliable grid hours.'
        },
        {
          risk: 'Raw Material Adulteration Concerns',
          whyItMatters: 'Customer trust is the only reason rural buyers choose local mills over factory packets.',
          possibleAction: 'Allow open-door inspection so customers can see their spices ground live.'
        },
        {
          risk: 'Wear and Tear of Machine Blades',
          whyItMatters: 'Dull blades reduce output speed and overheat the spice aroma.',
          possibleAction: 'Maintain a spare set of beaters and sharpen blades every 3 weeks.'
        }
      ],
      competitors: {
        densityLevel: 'Low',
        estimatedCountIn10Km: '1 – 2 mechanical flour/spice mills (Demo estimate)',
        category: 'Old Conventional Atta Chakkis',
        competitionLevel: 'Low; existing mills focus solely on wheat flour, neglecting fine spice hygiene',
        differentiationStrategy: 'Dedicated hygienic spice chamber (no mixing with wheat dust) and instant weighing scales.',
        note: 'Estimated based on typical rural Block infrastructure patterns.'
      },
      pricing: {
        estimatedPriceRange: 'Job-work: ₹10 – ₹15 / kg | Packaged Pure Turmeric: ₹240 – ₹280 / kg',
        purchasingConsiderations: ['Aroma and natural color', 'Cleanliness (no sand/grit)', 'Accurate digital weight'],
        pricingStrategy: 'Keep job-work rates equal to town chakkis while saving villagers travel expense and time.',
        positioning: 'Quality Premium',
        priceConfidence: 'Estimated range based on regional district milling rates'
      },
      customerTypes: [
        { type: 'Household Direct Buyers', sharePercent: 60, description: 'Bring their own harvest for monthly milling or buy 250g fresh packs.' },
        { type: 'Kirana Retail Outlets', sharePercent: 25, description: 'Buy wholesale 1kg bags to sell loose to village consumers.' },
        { type: 'Commercial Caterers & Dhabas', sharePercent: 15, description: 'Bulk 5kg – 10kg orders for feasts and highway eateries.' }
      ],
      distributionChannels: [
        { channel: 'Mill Front Counter', feasibility: 'High', description: 'Direct pickup by village residents on their way to market.' },
        { channel: 'Weekly Village Haat Stall', feasibility: 'High', description: 'Live demonstration grinding creates massive buzz and immediate retail sales.' },
        { channel: 'B2B Grocery Network', feasibility: 'Medium', description: 'Consignment sales to 5–10 nearby village Kirana stores.' }
      ],
      seasonalFactors: [
        { season: 'Winter & Post-Harvest (Jan - Apr)', impact: 'Surge', action: 'Run extended double shifts to process fresh mustard and turmeric crops.' },
        { season: 'Monsoon (Jun - Aug)', impact: 'Slowdown', action: 'Store raw mustard seeds in airtight drums to prevent moisture and mould.' },
        { season: 'Festive (Sep - Nov)', impact: 'Surge', action: 'Pre-grind festive gift packs for community feasts and Durga Puja/Diwali cookouts.' }
      ]
    };
  }

  // Default / Retail / Kirana / General Micro Enterprise
  return {
    id: 'feas_general',
    businessName: category || 'Rural Essential Grocery & Daily Needs Store',
    category: category || 'Retail & Daily Provisions',
    location: { state, district, villageOrBlock: district },
    feasibilityAssessment: {
      badge: marginCapital >= 20000 ? 'Strong Fit' : 'Needs Attention',
      headline: marginCapital >= 20000
        ? 'High Daily Turnover with Consistent Local Footfall'
        : 'Viable, but Requires Strict Credit (Udhar) Controls to Avoid Cash Traps',
      summary: 'Essential consumables have guaranteed daily demand; success depends entirely on product curation and cash liquidity management.',
      scorePercent: marginCapital >= 20000 ? 82 : 68,
      reasons: [
        { factor: 'Market Opportunity', status: 'positive', detail: 'Daily staple items (tea, sugar, oil, soap, stationery) bought by every village household.' },
        { factor: 'Capital Requirement', status: marginCapital >= 20000 ? 'positive' : 'warning', detail: 'Initial shelf inventory requires ₹20,000–₹50,000.' },
        { factor: 'Competition', status: 'warning', detail: 'Multiple small shops exist in main bazaar; strategic location near residential nodes is vital.' },
        { factor: 'Operating Risk', status: 'warning', detail: 'Customer requests for credit (Udhar) can lock up working capital.' },
        { factor: 'Customer Base', status: 'positive', detail: 'Steady repeat customer base within 500 meters walking distance.' },
        { factor: 'Working Capital Needs', status: 'neutral', detail: 'Must rotate stock weekly through nearest wholesale mandi.' },
        { factor: 'Expected Operating Cost', status: 'positive', detail: 'Low operational cost if operated in owned home room or roadside veranda.' }
      ]
    },
    marketReach: {
      estimatedRadiusKm: 3,
      potentialCustomerBase: '400 – 800 Village Households (Illustrative estimate)',
      coverageZone: 'Immediate village neighborhood and morning commuter path',
      dataLabel: 'AI-assisted estimate'
    },
    localDemand: {
      level: 'High',
      dailyVolumeEstimate: '₹1,500 – ₹3,500 daily gross sales',
      peakHours: '7:00 AM – 10:00 AM | 5:00 PM – 8:30 PM',
      summary: 'Fast-moving daily household essentials purchased in small unit packs (sachets and 250g quantities).'
    },
    opportunityAnalysis: {
      primaryOpportunity: 'Local villagers prefer buying small daily portions close to home rather than taking long auto trips to town.',
      underservedNiche: 'Stocking fresh items, small stationery, mobile recharge, and instant digital payments for youth.',
      customerGroups: ['Village homemakers', 'Agricultural day-wage earners', 'Schoolchildren', 'Evening tea gatherers'],
      localSalesChannels: ['Roadside shop counter', 'WhatsApp pre-order pickup for busy workers', 'Home delivery for elderly'],
      seasonalOpportunity: 'Harvest season increases spending power for higher-ticket household items and festive sweets.'
    },
    swot: {
      strengths: [
        'Immediate cash velocity: fast rotation of inventory creates frequent compounding profit',
        'Direct human relationships and trust with village families',
        'Flexible hours allowing family members to share shop supervision'
      ],
      weaknesses: [
        'High competition from existing village grocers',
        'Thin profit margins on branded commodities (5%–10% on sugar/oil)',
        'Pressure from neighbors to allow credit purchases'
      ],
      opportunities: [
        'Higher margins (20%–35%) on loose spices, pulses, snacks, and stationery',
        'Adding value services like mobile recharge, micro-ATM cash withdrawals',
        'Procuring directly from wholesale mandi to save 8% intermediary margin'
      ],
      threats: [
        'Uncollected credit balances causing cash freeze',
        'Inventory damage from rodents, humidity, or expired packaged goods',
        'Large road widening or rent increases if premise is leased'
      ]
    },
    threats: [
      {
        risk: 'Working Capital Stuck in Customer Credit (Udhar)',
        whyItMatters: 'If ₹15,000 is stuck in unpaid credits, the shopkeeper cannot buy fresh stock from the mandi.',
        possibleAction: 'Implement a strict ₹300 credit limit per family and maintain a polite daily WhatsApp/SMS reminder.'
      },
      {
        risk: 'Dead / Slow-Moving Inventory',
        whyItMatters: 'Ties up cash on shelves with goods that expire or get soiled.',
        possibleAction: 'Buy in small quantities; only reorder items that sell within 10 days.'
      },
      {
        risk: 'Wholesale Transport Costs',
        whyItMatters: 'Frequent small auto trips to town eat into thin retail margins.',
        possibleAction: 'Pool weekly transport orders with 2 other friendly local shopkeepers.'
      }
    ],
    competitors: {
      densityLevel: 'Moderate',
      estimatedCountIn10Km: '4 – 7 neighborhood retail shops (Demo estimate)',
      category: 'Small General Stores',
      competitionLevel: 'Moderate to High on packaged brands',
      differentiationStrategy: 'Always stocking fresh items, staying open early at 6:30 AM, and offering friendly digital UPI payment options.',
      note: 'Illustrative competitor information based on village population density.'
    },
    pricing: {
      estimatedPriceRange: 'Commodities: MRP minus 1-2% | Loose Staples: Competitive mandi parity',
      purchasingConsiderations: ['Correct digital weight', 'Small affordable sachet sizes', 'Fair credit terms'],
      pricingStrategy: 'Match town prices on visible items (oil, sugar) while keeping standard 20% margin on snacks and spices.',
      positioning: 'Balanced / Daily Affordable',
      priceConfidence: 'Estimated range based on regional retail benchmarks'
    },
    customerTypes: [
      { type: 'Daily Wage Earners', sharePercent: 50, description: 'Evening buyers purchasing 1-day quantities (small packs of oil, dal, spices).' },
      { type: 'Farming Households', sharePercent: 35, description: 'Weekly bulk purchases of rice, flour, and household detergents.' },
      { type: 'Children & Students', sharePercent: 15, description: 'Snacks, biscuits, pencils, notebooks, and small sweets.' }
    ],
    distributionChannels: [
      { channel: 'Main Front Road Counter', feasibility: 'High', description: 'Primary walk-in sales channel for the village.' },
      { channel: 'WhatsApp / Phone Order Pickup', feasibility: 'Medium', description: 'Customers message grocery list in advance for quick grab-and-go.' },
      { channel: 'Doorstep Delivery for Elderly', feasibility: 'High', description: 'Deepens community loyalty with senior residents.' }
    ],
    seasonalFactors: [
      { season: 'Harvest & Festival (Oct - Nov & Mar - Apr)', impact: 'Surge', action: 'Stock premium festive sweets, oils, and packaged gifts.' },
      { season: 'Monsoon (Jul - Aug)', impact: 'Slowdown', action: 'Elevate stock off floor using wooden pallets to protect against dampness.' },
      { season: 'Winter (Dec - Feb)', impact: 'Steady', action: 'Stock winter warming essentials, tea varieties, and biscuits.' }
    ]
  };
}
