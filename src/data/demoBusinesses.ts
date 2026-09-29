import { BusinessIdea } from '../types';

export const DEMO_BUSINESS_IDEAS: BusinessIdea[] = [
  {
    id: 'dairy_mini_farm',
    name: 'Mini Dairy & Fresh Milk Collection',
    nameBn: 'ছোট ডেয়ারি ও খাঁটি দুধ সংগ্রহ কেন্দ্র',
    nameHi: 'मिनी डेयरी व ताजा दूध संकलन केंद्र',
    category: 'Dairy',
    categoryBn: 'পশুপালন ও ডেয়ারি',
    categoryHi: 'पशुपालन व डेयरी',
    minInvestment: 45000,
    maxInvestment: 120000,
    whySuits: 'Consistent daily cash flow; strong local demand from households, sweet shops, and tea stalls.',
    requirements: [
      'Clean shaded shed for 2 cows/buffaloes',
      'Daily green fodder & cattle feed supply',
      'Stainless steel milk cans & fat testing kit'
    ],
    targetCustomers: 'Village households, local sweet makers, daily tea stalls, and dairy cooperative collection vans.',
    potentialMonthlyIncome: 18000,
    breakEvenMonths: 5,
    risks: [
      'Cattle disease during monsoon; keep vaccinations up to date',
      'Feed price fluctuations; grow some green grass locally'
    ],
    firstSteps: [
      'Talk to 5 local tea stalls and sweet shops to lock in daily milk demand and rates.',
      'Inspect local breed cows known for disease resistance with a local vet.',
      'Reserve at least ₹8,000 for emergency animal medicine and initial cattle feed.'
    ]
  },
  {
    id: 'spices_grain_grinding',
    name: 'Small Spice & Flour Grinding Unit (Atta/Masala Chakki)',
    nameBn: 'মসলা ও আটা পেষাই কল (মিনি চাক্কি)',
    nameHi: 'मिनी मसाला व आटा पिसाई चक्की',
    category: 'Food Processing',
    categoryBn: 'খাদ্য প্রক্রিয়াকরণ',
    categoryHi: 'खाद्य प्रसंस्करण',
    minInvestment: 30000,
    maxInvestment: 65000,
    whySuits: 'Year-round daily necessity for every single family in the village; low inventory holding costs.',
    requirements: [
      'Single-phase commercial electricity connection (2-3 HP)',
      '10x10 ft ventilated room',
      'Pulverizer / grinding machine with sieves'
    ],
    targetCustomers: 'Village families bringing raw wheat/spices, local grocery shops buying freshly packaged turmeric and chili powder.',
    potentialMonthlyIncome: 14000,
    breakEvenMonths: 4,
    risks: [
      'Power outages in peak summer; plan grinding times during regular supply hours',
      'Stone or moisture in raw spices damaging grinding blades'
    ],
    firstSteps: [
      'Check electricity line stability in your neighborhood with an electrician.',
      'Purchase an energy-efficient single-phase pulverizer with warranty.',
      'Distribute sample 100g fresh ground spice packs to 20 neighboring homes.'
    ]
  },
  {
    id: 'rural_csc_digital_service',
    name: 'Village Digital Service & Mobile Banking Point',
    nameBn: 'গ্রামীণ ডিজিটাল সেবা ও মোবাইল ব্যাংকিং কেন্দ্র',
    nameHi: 'ग्रामीण डिजिटल सेवा व मिनी बैंकिंग केंद्र',
    category: 'Digital Services',
    categoryBn: 'ডিজিটাল ও মোবাইল সেবা',
    categoryHi: 'डिजिटल सेवाएं',
    minInvestment: 25000,
    maxInvestment: 50000,
    whySuits: 'High demand for Aadhaar cash withdrawal, ration/farmer scheme applications, and bill payments without travelling to the town.',
    requirements: [
      'Refurbished laptop or desktop + biometric fingerprint scanner',
      'Multi-function color printer/scanner/photocopier',
      '4G SIM hotspot or local broadband connection'
    ],
    targetCustomers: 'Farmers accessing PM-Kisan, seniors withdrawing pensions, students needing exam prints and xerox.',
    potentialMonthlyIncome: 16000,
    breakEvenMonths: 3,
    risks: [
      'Network downtime during bad weather; maintain dual SIM connections',
      'Cash balance management for daily withdrawals'
    ],
    firstSteps: [
      'Register with an authorized rural digital/banking correspondence partner (BC agent).',
      'Set up a desk in a prominent village market corner near the bus stop or panchayat.',
      'Put up a clear, visible board listing all services with transparent government fees.'
    ]
  },
  {
    id: 'poultry_backyard_broiler',
    name: 'Backyard Desi Poultry / Country Chicken Farm',
    nameBn: 'দেশি মুরগি ও ডিম পালন খামার',
    nameHi: 'देसी मुर्गी व अंडा पालन केंद्र',
    category: 'Poultry',
    categoryBn: 'পোলট্রি ও মুরগি পালন',
    categoryHi: 'पोल्ट्री व मुर्गी पालन',
    minInvestment: 20000,
    maxInvestment: 45000,
    whySuits: 'Desi chicken and eggs command 2x higher prices than regular broiler; low maintenance in open backyard spaces.',
    requirements: [
      'Fenced bamboo enclosure or wire mesh yard',
      'Clean drinking water feeders and warm brooding box',
      'Quality 1-day old desi chicks from verified hatchery'
    ],
    targetCustomers: 'Weekly village haat buyers, town roadside dhabas, local meat consumers willing to pay premium for organic desi birds.',
    potentialMonthlyIncome: 12000,
    breakEvenMonths: 4,
    risks: [
      'Predators (cats, wild dogs, snakes); ensure strong wire fencing',
      'Seasonal viral outbreaks; strictly follow vaccination calendar on day 7, 14, 21'
    ],
    firstSteps: [
      'Start small with 50-100 chicks to master feed and disease control first.',
      'Prepare warm wooden brooding box with 60W bulb for the first 10 days.',
      'Pre-book 3 buyers at the weekly village market before the batch matures.'
    ]
  },
  {
    id: 'tailoring_garment_boutique',
    name: 'Tailoring, Blouse Design & Readymade Alterations',
    nameBn: 'দর্জি দোকান, ব্লাউজ মেকিং ও তৈরি পোশাক সেবা',
    nameHi: 'सिलाई, ब्लाउज डिजाइनिंग व रेडीमेड ऑल्टरेशन',
    category: 'Tailoring',
    categoryBn: 'দর্জি কাজ ও পোশাক',
    categoryHi: 'सिलाई व परिधान',
    minInvestment: 15000,
    maxInvestment: 35000,
    whySuits: 'Can be started right inside a home; huge festive peaks during Durga Puja, Eid, Diwali, and wedding seasons.',
    requirements: [
      'Heavy-duty sewing machine (electric or foot-pedal)',
      'Interlock machine, cutting table, iron, and measuring tools',
      'Threads, zippers, buttons, and display hanger rack'
    ],
    targetCustomers: 'Village women, school students for uniform stitching, wedding guests requiring designer blouses and falls.',
    potentialMonthlyIncome: 11000,
    breakEvenMonths: 3,
    risks: [
      'Seasonal fluctuations post-wedding months; introduce school uniforms and curtain making during slack periods'
    ],
    firstSteps: [
      'Stitch 3 modern sample blouses/kurtis to display to neighbors.',
      'Distribute printed visiting slips with your phone number across self-help group members.',
      'Promise punctual 3-day turnaround to build quick trust over slow market competitors.'
    ]
  },
  {
    id: 'bio_organic_fertilizer_nursery',
    name: 'Vermi-Compost & Fruit Plant Nursery',
    nameBn: 'কেঁচো সার (ভার্মিকম্পোস্ট) ও ফল গাছের নার্সারি',
    nameHi: 'वर्मीकम्पोस्ट (केंचुआ खाद) व फल पौध नर्सरी',
    category: 'Agriculture',
    categoryBn: 'কৃষি ও জৈব সার',
    categoryHi: 'कृषि व जैविक खाद',
    minInvestment: 18000,
    maxInvestment: 40000,
    whySuits: 'Low capital requirement; uses abundant local cow dung and farm waste; high demand as farmers shift toward organic fertility.',
    requirements: [
      '2 to 3 shaded vermi-beds with plastic HDPE lining',
      'Cow dung, agricultural biomass, and Australian red earthworms (Eisenia fetida)',
      'Watering sprinkler can and sieve/packaging bags'
    ],
    targetCustomers: 'Local vegetable farmers, sugarcane growers, town rooftop gardeners, and rural agricultural shops.',
    potentialMonthlyIncome: 13000,
    breakEvenMonths: 3,
    risks: [
      'Excess heat drying out worms in summer; maintain 30% moisture and shade netting'
    ],
    firstSteps: [
      'Set up 1 trial vermi-bed with 5kg worms and test quality in 45 days.',
      'Give free 5kg test bags to 5 influential local vegetable farmers to observe yield boost.',
      'Package in clean 10kg and 25kg printed bags with instructions in local language.'
    ]
  },
  {
    id: 'kirana_fast_moving_grocery',
    name: 'Smart Daily Needs & Fast-Moving Grocery (Kirana)',
    nameBn: 'নিত্যপ্রয়োজনীয় সামগ্রী ও মুদি দোকান (স্মার্ট কিয়স্ক)',
    nameHi: 'दैनिक जरूरत की किराना व मिनी प्रोविजन स्टोर',
    category: 'Retail',
    categoryBn: 'দোকানদারি ও খুচরো বিক্রি',
    categoryHi: 'दुकानदारी व खुदरा बिक्री',
    minInvestment: 50000,
    maxInvestment: 150000,
    whySuits: 'Continuous high turnover; fast cash sales; low risk if non-perishable daily fast-moving consumer goods are stocked.',
    requirements: [
      'Prominent roadside shop or front-porch counter (at least 80 sq.ft.)',
      'Wooden/metal display racks and secure shutter lock',
      'Stock of daily spices, oils, soaps, biscuits, pulses, and mobile recharge vouchers'
    ],
    targetCustomers: 'Daily passing pedestrians, morning milk/tea shoppers, neighborhood families wanting quick nearby purchases.',
    potentialMonthlyIncome: 20000,
    breakEvenMonths: 6,
    risks: [
      'Giving excessive customer credit (udhar); enforce strict cash-first policy on fast items'
    ],
    firstSteps: [
      'List top 30 items that villagers currently have to travel far to purchase.',
      'Negotiate wholesale supply rates directly with town stockists for weekly delivery.',
      'Install a bright QR code scanner board for UPI payments alongside cash box.'
    ]
  },
  {
    id: 'eco_friendly_leaf_plates',
    name: 'Areca Palm / Sal Leaf Bio-Plate Making',
    nameBn: 'শালপাতা ও সুপারি পাতার বায়ো-থালা তৈরি কারখানা',
    nameHi: 'पत्तल-दोना व सुपारी पत्ता प्लेट निर्माण इकाई',
    category: 'Handicrafts',
    categoryBn: 'হস্তশিল্প ও কুটির শিল্প',
    categoryHi: 'हस्तशिल्प व कुटीर उद्योग',
    minInvestment: 35000,
    maxInvestment: 80000,
    whySuits: 'Huge surge in plastic bans; huge demand during village feasts, weddings, temple functions, and highway food joints.',
    requirements: [
      'Hydraulic or manual hot-press machine with interchangeable dies',
      'Raw dried sal leaves or areca palm sheaths from local gatherers',
      'Packaging polythene wraps and cardboard boxes'
    ],
    targetCustomers: 'Local caterers, temple trusts, street snack stalls, and wholesale distributors in neighboring towns.',
    potentialMonthlyIncome: 17000,
    breakEvenMonths: 4,
    risks: [
      'Moisture ruining leaf quality during rains; store raw leaves in dry raised wooden racks'
    ],
    firstSteps: [
      'Contract raw leaf collectors during post-harvest dry season at guaranteed fair prices.',
      'Purchase reliable dual-die pressing machine with heating regulator.',
      'Show sample 100-plate bundles to local wedding caterers and sweet shops.'
    ]
  }
];
