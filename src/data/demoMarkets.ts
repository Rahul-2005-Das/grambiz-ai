import { MarketIntelligence } from '../types';

export const INDIAN_STATES = [
  'West Bengal',
  'Uttar Pradesh',
  'Bihar',
  'Rajasthan',
  'Madhya Pradesh',
  'Maharashtra',
  'Odisha',
  'Assam'
];

export const DISTRICT_MAP: Record<string, string[]> = {
  'West Bengal': ['Nadia', 'Murshidabad', 'Purba Bardhaman', 'North 24 Parganas', 'Bankura', 'Malda'],
  'Uttar Pradesh': ['Varanasi', 'Gorakhpur', 'Prayagraj', 'Bareilly', 'Ayodhya', 'Azamgarh'],
  'Bihar': ['Muzaffarpur', 'Gaya', 'Darbhanga', 'Nalanda', 'Samastipur', 'Madhubani'],
  'Rajasthan': ['Jaipur Rural', 'Alwar', 'Kota', 'Nagaur', 'Sikar'],
  'Madhya Pradesh': ['Ujjain', 'Sagar', 'Indore Rural', 'Chhindwara', 'Rewa'],
  'Maharashtra': ['Nashik Rural', 'Kolhapur', 'Solapur', 'Satara', 'Ahmednagar'],
  'Odisha': ['Cuttack Rural', 'Balasore', 'Mayurbhanj', 'Ganjam', 'Puri Rural'],
  'Assam': ['Kamrup Rural', 'Nagaon', 'Barpeta', 'Sonitpur', 'Cachar']
};

export const BUSINESS_CATEGORIES = [
  'All Categories',
  'Dairy',
  'Agriculture',
  'Food Processing',
  'Poultry',
  'Retail',
  'Digital Services',
  'Tailoring',
  'Handicrafts'
];

export const DEMO_MARKETS_DATA: Record<string, MarketIntelligence> = {
  'West Bengal_Nadia_Dairy': {
    state: 'West Bengal',
    district: 'Nadia',
    category: 'Dairy',
    demandLevel: 'High',
    demandSummary: 'High daily consumption of fresh cow milk driven by famous local Bengali sweet clusters (Chhanar Sandesh, Pantua) and Ranaghat-Krishnanagar markets.',
    popularProducts: [
      'Chhana (Cottage cheese base for sweets)',
      'Fresh unprocessed cow milk',
      'Desi ghee & fresh butter',
      'Kheer & sour curd (Dahi)'
    ],
    seasonalOpportunities: [
      {
        season: 'Winter & Festive (Oct - Feb)',
        description: 'Huge spike in demand for whole milk & chhana during Durga Puja, Kali Puja, wedding season, and Poush Sankranti pithe-puli.',
        bestProducts: ['Chhana for sweets', 'Concentrated milk', 'Rich curd']
      },
      {
        season: 'Summer (Apr - Jun)',
        description: 'High demand for buttermilk (ghol), sweet lassi, and cooling curd in daily village markets.',
        bestProducts: ['Flavored buttermilk', 'Sweet curd', 'Chilled pouch milk']
      }
    ],
    customerSegments: [
      { name: 'Sweet makers & Halwais', sharePercent: 50, behavior: 'Requires daily bulk supply of 40-80L with steady fat content.' },
      { name: 'Village & peri-urban households', sharePercent: 35, behavior: 'Regular morning door-delivery; values hygiene and pure unadulterated milk.' },
      { name: 'Tea stall operators', sharePercent: 15, behavior: 'Buys 10-20L daily, requires dependable 6 AM delivery.' }
    ],
    marketOpportunities: [
      'Supply chhana directly to Krishnanagar sweet hubs bypassing middleman cuts.',
      'Package fresh curd in traditional earthen pots (matka) for local wedding caterers.'
    ],
    transportationNotes: 'E-rickshaws (Toto) and localized bicycle milk carriers provide inexpensive, reliable morning distribution across a 6 km radius.',
    competitionLevel: 'Moderate',
    rawMaterialAvailability: 'Abundant green fodder along riverbanks; local veterinary centers accessible within 4 km.'
  },
  'West Bengal_Nadia_Agriculture': {
    state: 'West Bengal',
    district: 'Nadia',
    category: 'Agriculture',
    demandLevel: 'High',
    demandSummary: 'Nadia is renowned for intensive vegetable cropping (pointed gourd, cabbage, cauliflower) feeding Kolkata markets via local wholesale haats.',
    popularProducts: [
      'Organic vermi-compost fertilizer',
      'Hybrid vegetable seedlings & plugs',
      'Bio-pesticides (neem-based formulations)',
      'Seasonal seeds & micro-nutrients'
    ],
    seasonalOpportunities: [
      {
        season: 'Rabi / Winter vegetable season',
        description: 'Peak planting of cauliflower, cabbage, peas, and mustard; peak seedling and organic manure demand.',
        bestProducts: ['Nursery seedlings', 'Organic compost', 'Foliar spray']
      }
    ],
    customerSegments: [
      { name: 'Commercial vegetable farmers', sharePercent: 65, behavior: 'Frequent repeat buyers during planting cycles; look for high germination rates.' },
      { name: 'Kitchen garden households', sharePercent: 35, behavior: 'Small packet purchases of 5kg compost and saplings.' }
    ],
    marketOpportunities: [
      'Direct doorstep delivery of quality vermi-compost to farmer self-help groups.',
      'Seedling tray nursery saves farmers 2 weeks of germination effort.'
    ],
    transportationNotes: 'Road connectivity to Ranaghat, Bethuadahari and Krishnanagar wholesale haats is very good.',
    competitionLevel: 'Moderate',
    rawMaterialAvailability: 'Abundant cow dung and crop residue easily collected from neighboring farm clusters.'
  },
  'Uttar Pradesh_Varanasi_Food Processing': {
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    category: 'Food Processing',
    demandLevel: 'High',
    demandSummary: 'Enormous round-the-year demand for packaged spices, pickles, roasted snacks, and sattu driven by domestic consumption and millions of pilgrimage tourists.',
    popularProducts: [
      'Pure roasted Chana Sattu',
      'Handmade dry mango & red chili pickles',
      'Fresh stone-ground spices (Garam Masala, Haldi, Dhaniya)',
      'Namkeen & savory snacks (Mathri, Sev)'
    ],
    seasonalOpportunities: [
      {
        season: 'Summer (Apr - Jul)',
        description: 'Extremely high demand for Sattu sharbat mixes as an energizing, natural heat-relief drink.',
        bestProducts: ['Spiced Sattu packets', 'Mint flavored dry beverage mix']
      },
      {
        season: 'Post-Monsoon & Winter',
        description: 'Tourist influx and wedding banquets push up demand for premium spices and artisanal pickles.',
        bestProducts: ['Stuffed red chili pickle', 'Pure cold-pressed mustard oil']
      }
    ],
    customerSegments: [
      { name: 'Local retail grocery shops', sharePercent: 45, behavior: 'Need small ₹10, ₹20, and 250g hanging pouches with attractive print.' },
      { name: 'Tourists & pilgrims visiting ghats', sharePercent: 30, behavior: 'Seeks authentic regional Banarasi flavors; willing to pay premium for hygiene.' },
      { name: 'Village & suburban families', sharePercent: 25, behavior: 'Monthly bulk orders of 1kg-2kg staple spices.' }
    ],
    marketOpportunities: [
      'Establish small hygienic packaging unit with FSSAI registration to supply roadside stalls.',
      'Partner with homestays, ashrams, and local grocers near outer bypass roads.'
    ],
    transportationNotes: 'Tempo services and local delivery autos connect rural Varanasi blocks to city mandis efficiently within 45 minutes.',
    competitionLevel: 'Moderate',
    rawMaterialAvailability: 'Excellent raw grain and whole spice availability at nearby Mirzapur and Varanasi wholesale markets.'
  },
  'Bihar_Muzaffarpur_Agriculture': {
    state: 'Bihar',
    district: 'Muzaffarpur',
    category: 'Agriculture',
    demandLevel: 'High',
    demandSummary: 'Famed for Shahi Litchi, mango orchards, and year-round vegetable and maize production. High demand for bio-inputs and agro-services.',
    popularProducts: [
      'Fruit fly traps and organic tree wraps',
      'Vermi-compost enriched with Trichoderma',
      'Corrugated packaging boxes for litchi / fruits',
      'Battery-operated micro sprayers'
    ],
    seasonalOpportunities: [
      {
        season: 'Litchi season (April - June)',
        description: 'Vast harvesting and packaging activity across orchards.',
        bestProducts: ['Eco-friendly packing trays', 'Harvesting nets', 'Post-harvest processing']
      }
    ],
    customerSegments: [
      { name: 'Orchard owners & contractors', sharePercent: 55, behavior: 'Bulk buyers for protective covers, traps, and bio-nutrients.' },
      { name: 'Smallholder vegetable farmers', sharePercent: 45, behavior: 'Regular weekly buyers of soil supplements and foliar feeds.' }
    ],
    marketOpportunities: [
      'Vermi-wash and liquid bio-fertilizer bottling for orchard foliar nutrition.',
      'Small cold-storage transport aggregation for local perishable items.'
    ],
    transportationNotes: 'National Highway and rural road network connecting to Muzaffarpur fruit mandis.',
    competitionLevel: 'Moderate',
    rawMaterialAvailability: 'Abundant organic farm biomass, litchi leaf litter, and cattle manure available free or at nominal cost.'
  }
};

export function getMarketDataFor(state: string, district: string, category: string): MarketIntelligence {
  const key = `${state}_${district}_${category}`;
  if (DEMO_MARKETS_DATA[key]) {
    return DEMO_MARKETS_DATA[key];
  }

  // Fallback realistic synthesis for any selected district
  return {
    state: state || 'West Bengal',
    district: district || 'Nadia',
    category: category === 'All Categories' ? 'Retail & Agro-Allied' : category,
    demandLevel: 'High',
    demandSummary: `Steady localized demand across ${district || 'rural markets'} for affordable daily necessities, agricultural services, and value-added household products.`,
    popularProducts: [
      'Daily fast-moving essentials with small ₹10-₹50 pack sizes',
      'Fresh local farm produce with minimal transport markups',
      'Low-cost repair, stitching, and digital assistance services',
      'Locally processed nutritious food items'
    ],
    seasonalOpportunities: [
      {
        season: 'Festive & Marriage Season (Oct - Mar)',
        description: 'Discretionary spending doubles; village migrant workers return home with festival savings.',
        bestProducts: ['Readymade clothes & tailoring', 'Sweets & milk products', 'Gifting items']
      },
      {
        season: 'Crop Harvest Windows (Kharif & Rabi)',
        description: 'Farmers receive crop sale proceeds; high liquidity in local weekly haats.',
        bestProducts: ['Tools & home improvement', 'Bulk grocery stocking', 'Livestock feed']
      }
    ],
    customerSegments: [
      { name: 'Rural farming households', sharePercent: 50, behavior: 'Price-sensitive, prefers cash, values long-term personal trust and honest weight.' },
      { name: 'Small business operators & wage earners', sharePercent: 30, behavior: 'Daily evening purchases, responsive to friendly service.' },
      { name: 'Students & rural youth', sharePercent: 20, behavior: 'Early adopters of digital payments, snacks, and tech services.' }
    ],
    marketOpportunities: [
      `Fulfill gaps where villagers currently pay extra bus fares to travel to the nearest town.`,
      `Offer home delivery or WhatsApp order readiness for elderly village families.`
    ],
    transportationNotes: `Shared auto-rickshaws, battery e-rickshaws (Toto), and rural buses connect local habitations to block headquarters within 15-30 minutes.`,
    competitionLevel: 'Moderate',
    rawMaterialAvailability: `Local agro-dealers and weekly mandis provide dependable access to wholesale inputs.`
  };
}
