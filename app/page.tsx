"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

// ─── DATA ────────────────────────────────────────────────────────────────────

const COUNTRIES = ["India", "USA", "UK", "Canada", "Australia"];
const STATES = {
  India: ["Maharashtra", "Karnataka", "Tamil Nadu", "Delhi", "Gujarat"],
  USA: ["California", "New York", "Texas", "Florida", "Illinois"],
  UK: ["England", "Scotland", "Wales"],
  Canada: ["Ontario", "British Columbia", "Quebec"],
  Australia: ["New South Wales", "Victoria", "Queensland"],
};
const CITIES = {
  Maharashtra: ["Pune", "Mumbai", "Nashik", "Aurangabad"],
  Karnataka: ["Bangalore", "Mysore", "Mangalore"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  Delhi: ["North Delhi", "South Delhi", "East Delhi"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
  California: ["Los Angeles", "San Francisco", "San Diego"],
  "New York": ["Manhattan", "Brooklyn", "Queens"],
};
const REGIONS = {
  Pune: ["West Pune", "East Pune", "Whitefield", "Hinjewadi", "Magarpatta"],
  Mumbai: ["Bandra", "Andheri", "Thane", "Navi Mumbai"],
  Bangalore: ["Whitefield", "HSR Layout", "Marathalli", "Indiranagar"],
  Chennai: ["T Nagar", "Anna Nagar", "Adyar", "Velachery"],
};

const CATEGORY_CARDS = [
  { id: "homes_live", label: "Homes to\nLive In" },
  { id: "investment", label: "Smart Investment\nPicks" },
  { id: "luxury", label: "Luxury & Signature\nHomes" },
  { id: "plots", label: "Plots & Land\nOpportunities" },
  { id: "tax", label: "Tax-Smart Property\nOptions" },
  { id: "commercial", label: "Commercial Spaces &\nIndustrial Assets" },
  { id: "special", label: "Special Opportunity\nDeals" },
  { id: "future", label: "Future-Ready &\nPurpose Homes" },
];

const SUB_OPTIONS = {
  homes_live: {
    title: "Choose the kind of home that fits how you want to live!",
    sub: "You can explore more than one option. Nothing is final yet.",
    items: [
      {
        id: "rtm",
        label: "Ready-to-Move Homes",
        desc: "See the home. Know the cost. Move in without waiting.",
      },
      {
        id: "uc",
        label: "Under-Construction Homes",
        desc: "Buy early, plan ahead, and grow into the home over time.",
      },
      {
        id: "family",
        label: "Spacious Family Homes",
        desc: "Designed for families that need space, privacy, and comfort.",
      },
      {
        id: "starter",
        label: "Compact Starter Homes",
        desc: "Smarter layouts for first-time buyers and simple living.",
      },
      {
        id: "senior",
        label: "Senior-Friendly Homes",
        desc: "Thoughtfully planned for safety, ease, and everyday comfort.",
      },
      {
        id: "pet",
        label: "Pet-Friendly Homes",
        desc: "Homes that welcome your pets as part of the family.",
      },
      {
        id: "gated",
        label: "Gated Community Living",
        desc: "Community living with security, amenities, and shared spaces.",
      },
      {
        id: "redevel",
        label: "Redevelopment Homes",
        desc: "Modern homes built where familiar neighbourhoods already exist.",
      },
    ],
  },
  investment: {
    title: "Choose which investment approach fits your current plan!",
    sub: "Property investments vary by market and timing.\nExploration helps clarity — not guarantees.",
    items: [
      {
        id: "rental",
        label: "Rental Yield Properties",
        desc: "Homes chosen for steady rental demand and predictable income.",
      },
      {
        id: "appr",
        label: "Appreciation-Focused Properties",
        desc: "Projects positioned in zones expected to mature over time.",
      },
      {
        id: "early",
        label: "Early-Stage Entry Projects",
        desc: "Lower entry points for investors with a longer holding horizon.",
      },
      {
        id: "pre",
        label: "Pre-Launch Opportunities",
        desc: "Limited early access for buyers comfortable with timing and execution risk.",
      },
      {
        id: "inv_heavy",
        label: "Investor-Heavy Projects",
        desc: "Projects already preferred by long-term investors.",
      },
      {
        id: "exit",
        label: "Exit-Ready Inventory",
        desc: "Properties selected for resale ease and buyer demand.",
      },
    ],
  },
  luxury: {
    title: "Choose what kind of home reflects the life you're building!",
    sub: "Luxury means different things at different stages of life.\nExplore what feels right for you.",
    items: [
      {
        id: "lux3",
        label: "Luxury Homes (₹3 Cr+)",
        desc: "Elevated living with better design, finishes, and privacy.",
      },
      {
        id: "lux5",
        label: "Luxurious Homes (₹5 Cr+)",
        desc: "Homes created for buyers who prioritise exclusivity and scale.",
      },
      {
        id: "lux10",
        label: "Ultra-Luxury Homes (₹10 Cr+)",
        desc: "Homes created for buyers who prioritise exclusivity and scale.",
      },
      {
        id: "branded",
        label: "Branded Residences",
        desc: "Residences shaped by globally recognised hospitality or lifestyle brands.",
      },
      {
        id: "golf",
        label: "Golf / Sea / River View Homes",
        desc: "Homes defined by rare views and limited outlooks.",
      },
      {
        id: "landmark",
        label: "Landmark Addresses",
        desc: "Homes known as much for where they are as for what they are.",
      },
      {
        id: "limited",
        label: "Limited Inventory Projects",
        desc: "Few homes. Fewer buyers. Long-term value.",
      },
    ],
  },
  plots: {
    title:
      "Choose what kind of land opportunity are you planning for right now?",
    sub: "Luxury means different things at different stages of life.\nExplore what feels right for you.",
    items: [
      {
        id: "plotted",
        label: "Plotted Developments",
        desc: "Legally defined plots within planned layouts and basic infrastructure.",
      },
      {
        id: "na",
        label: "NA Plots",
        desc: "Plots with non-agricultural status for permitted construction use.",
      },
      {
        id: "township",
        label: "Township Plots",
        desc: "Plots forming part of larger, long-term township developments.",
      },
      {
        id: "second",
        label: "Second-Home Land",
        desc: "Land considered for future personal or leisure use.",
      },
      {
        id: "peripheral",
        label: "Peripheral Growth Corridors",
        desc: "Plots located in zones expected to develop over time.",
      },
      {
        id: "villa",
        label: "Plot + Villa Communities",
        desc: "Land ownership with a defined villa development plan.",
      },
    ],
  },
  tax: {
    title: "Choose which tax consideration are you planning around right now!",
    sub: "Tax treatment depends on individual circumstances and prevailing laws.\nWe recommend discussing specifics with your tax advisor.",
    items: [
      {
        id: "tax80",
        label: "Tax-Saving Residential (80C / 24B)",
        desc: "Homes that may offer deductions under current residential tax provisions.",
      },
      {
        id: "ltcg",
        label: "Long-Term Capital Gain Planning",
        desc: "Properties considered while planning long-term capital gains reinvestment.",
      },
      {
        id: "reinv",
        label: "Reinvestment Properties (54 / 54F)",
        desc: "Options commonly evaluated for capital gain reinvestment scenarios.",
      },
      {
        id: "lease",
        label: "Lease-Structured Commercial",
        desc: "Commercial assets where lease structure influences tax treatment.",
      },
      {
        id: "trust",
        label: "Trust / HUF-Friendly Assets",
        desc: "Properties typically reviewed under trust or HUF ownership structures.",
      },
    ],
  },
  commercial: {
    title: "Choose whether you are buying for your business, income, or both?",
    sub: "Some buyers use commercial spaces.\nOthers lease them. Many do both over time.",
    items: [
      {
        id: "office",
        label: "Office Spaces",
        desc: "Offices evaluated for business use, lease demand, and long-term viability.",
      },
      {
        id: "retail",
        label: "Retail High-Street",
        desc: "Retail spaces chosen for visibility, footfall, and operational fit.",
      },
      {
        id: "ware",
        label: "Warehousing / Logistics",
        desc: "Spaces aligned for storage, distribution, or logistics operations.",
      },
      {
        id: "cowork",
        label: "Co-working Assets",
        desc: "Flexible office assets used directly or structured for shared occupancy.",
      },
      {
        id: "indust",
        label: "Industrial Units",
        desc: "Functional units designed for manufacturing or industrial activity.",
      },
      {
        id: "indust_own",
        label: "Industrial Land – Ownership",
        desc: "Long-term land ownership for building and operating your own facility.",
      },
      {
        id: "indust_lease",
        label: "Industrial Land – Lease Options",
        desc: "Leased industrial land for flexible or phased operations.",
      },
    ],
  },
  special: {
    title: "Choose which kind of opportunity are you evaluating right now?",
    sub: "Special opportunities arise from specific situations.\nAvailability and terms can change without notice.",
    items: [
      {
        id: "distress",
        label: "Distress Sale Properties",
        desc: "Properties available due to seller-specific situations rather than market pricing.",
      },
      {
        id: "bulk",
        label: "Bulk Inventory Deals",
        desc: "Multiple units offered together under a single negotiated structure.",
      },
      {
        id: "nri",
        label: "NRI Exit Units",
        desc: "Properties offered by overseas owners planning to exit holdings.",
      },
      {
        id: "lastfew",
        label: "Last Few Units Projects",
        desc: "Limited remaining inventory within otherwise completed or near-complete projects.",
      },
      {
        id: "dev_owned",
        label: "Developer-Owned Inventory",
        desc: "Units retained directly by developers and offered separately from regular sales.",
      },
    ],
  },
  future: {
    title: "Choose which value or way of living matters most to you right now?",
    sub: "Purpose-led homes reflect personal beliefs and long-term priorities.\nExplore what aligns with you.",
    items: [
      {
        id: "green",
        label: "Green / Sustainable Homes",
        desc: "Homes planned to reduce environmental impact and long-term resource use.",
      },
      {
        id: "vastu",
        label: "Vaastu-Compliant Homes",
        desc: "Homes planned with traditional spatial principles in mind.",
      },
      {
        id: "smart",
        label: "Smart Homes",
        desc: "Homes integrated with technology for comfort, efficiency, and control.",
      },
      {
        id: "wellness",
        label: "Wellness-Centric Projects",
        desc: "Communities designed around health, light, air, and everyday well-being.",
      },
    ],
  },
};

const BUDGET_OPTIONS = [
  "1 - 2 Cr",
  "2 - 3 Cr",
  "3 - 5 Cr",
  "5 - 10 Cr",
  "10 Cr+",
];
const TIMELINE_OPTIONS = ["Immediate", "1–3 Yrs", "3–5 Yrs"];
const FAMILY_OPTIONS = ["Solo", "Family", "Joint Decision"];
const PURPOSE_OPTIONS = ["Live", "Invest", "Mixed"];

const DUMMY_RESULTS = [
  {
    num: 1,
    key: "Family Oriented Homes",
    location: "West Pune",
    highlight: "Established Residential Area",
    link: "https://connectrainextjs.vercel.app/",
  },
  {
    num: 2,
    key: "50+ Amenities",
    location: "West Pune",
    highlight: "2 Schools and Hospital in Vicinity",
    link: "https://connectrainextjs.vercel.app/",
  },
  {
    num: 3,
    key: "Largest Room Sizes",
    location: "West Pune",
    highlight: "Vastu Certified Homes",
    link: "https://connectrainextjs.vercel.app/",
  },
];

// ─── SHARED COMPONENTS ──────────────────────────────────────────────────────

function OrangeBtn({ children, onClick, className = "", disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold rounded-lg transition-all duration-150 shadow-sm ${
        disabled ? "opacity-60 cursor-not-allowed" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
}

function Dropdown({ label, options, value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm md:text-base text-gray-600 bg-white focus:outline-none focus:border-orange-400 cursor-pointer"
      style={{ appearance: "auto" }}
    >
      <option value="">{label}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

// ─── STEP INDICATOR (subtle top bar) ────────────────────────────────────────
function StepBar({ step, total = 5 }) {
  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
      <div
        className="h-full bg-orange-500 transition-all duration-500"
        style={{ width: `${(step / total) * 100}%` }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 1 — WELCOME SCREEN
// ─────────────────────────────────────────────────────────────────────────────
function WelcomeStep({ onNext }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("top50_popup_seen");
    if (!hasSeenPopup) {
      setShowModal(true);
    } else {
      onNext();
    }
  }, [onNext]);

  const handleEnterClick = () => {
    localStorage.setItem("top50_popup_seen", "true");
    setShowModal(false);
    onNext();
  };

  const handleSkipPopup = () => {
    localStorage.setItem("top50_popup_seen", "true");
    setShowModal(false);
    onNext();
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white rounded-2xl shadow-xl border-2 border-orange-500 w-full max-w-md px-6 md:px-8 py-8 md:py-10 flex flex-col items-center text-center">
            <button
              onClick={handleSkipPopup}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl font-bold"
            >
              ×
            </button>

            <h1 className="text-lg md:text-xl font-bold text-gray-800 leading-snug">
              Welcome to the <span className="text-orange-500">TOP 50</span>
              <br />
              Special Curated Properties for you!
            </h1>

            <p className="mt-4 md:mt-5 text-sm md:text-base font-semibold text-gray-800">
              This is a <span className="text-orange-500">Privacy</span> First
              Platform
            </p>

            <p className="mt-3 md:mt-4 text-base md:text-lg text-gray-700 font-medium flex items-start gap-2 justify-center">
              <span>🔒</span>
              <span className="text-left">
                We don't ask who you are
                <br />— until you find what fits.
              </span>
            </p>

            <OrangeBtn
              onClick={handleEnterClick}
              className="mt-6 md:mt-7 px-4 md:px-6 py-2 md:py-3 text-sm md:text-base leading-snug w-full max-w-xs"
            >
              Click here to Enter With
              <br />
              Privacy confidence
            </OrangeBtn>

            <button
              onClick={handleSkipPopup}
              className="mt-3 md:mt-4 text-xs md:text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Skip and explore directly
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              Loading...
            </h1>
          </div>
        </div>
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 2 — LOCATION (Country → State → City → Region)
// ─────────────────────────────────────────────────────────────────────────────
function LocationStep({ onNext }) {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");

  const stateOpts = country ? STATES[country] || [] : [];
  const cityOpts = state ? CITIES[state] || [] : [];
  const regionOpts = city ? REGIONS[city] || [] : [];

  useEffect(() => {
    setState("");
    setCity("");
    setRegion("");
  }, [country]);
  useEffect(() => {
    setCity("");
    setRegion("");
  }, [state]);
  useEffect(() => {
    setRegion("");
  }, [city]);

  const canProceed = country && state && city;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-6 md:py-0">
      <div className="w-full max-w-3xl text-center px-2">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
          Fewer choices <span className="text-orange-500">|</span> Better
          decisions
        </h1>
        <p className="text-xs md:text-sm text-gray-500 mt-2 max-w-md mx-auto mb-6 md:mb-8">
          Top<span className="text-orange-500 font-bold">50</span>Properties
          curates only the most relevant homes and investments — based on{" "}
          <span className="font-bold underline">intent</span>, not listings.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-10">
          <div className="space-y-1">
            <label className="block text-xs md:text-sm font-medium text-gray-700 text-left mb-1">
              Country
            </label>
            <Dropdown
              label="Choose Country"
              options={COUNTRIES}
              value={country}
              onChange={setCountry}
            />
          </div>
          <div className="space-y-1">
            <label className="block text-xs md:text-sm font-medium text-gray-700 text-left mb-1">
              State
            </label>
            <Dropdown
              label="Choose State"
              options={stateOpts}
              value={state}
              onChange={setState}
            />
          </div>
          <div className="space-y-1">
            <label className="block text-xs md:text-sm font-medium text-gray-700 text-left mb-1">
              City
            </label>
            <Dropdown
              label="Choose City"
              options={cityOpts}
              value={city}
              onChange={setCity}
            />
          </div>
          <div className="space-y-1">
            <label className="block text-xs md:text-sm font-medium text-gray-700 text-left mb-1">
              Region
            </label>
            <Dropdown
              label="Choose Region"
              options={regionOpts}
              value={region}
              onChange={setRegion}
            />
          </div>
        </div>

        <OrangeBtn
          onClick={() => onNext({ country, state, city, region })}
          className={`px-6 md:px-10 py-3 md:py-3 text-sm md:text-base w-full sm:w-auto ${
            !canProceed ? "cursor-not-allowed" : ""
          }`}
          disabled={!canProceed}
        >
          Explore Curated Options
        </OrangeBtn>

        <div className="mt-8 md:mt-10 p-3 md:p-4 bg-white rounded-lg border border-gray-200 max-w-md mx-auto">
          <p className="font-bold text-gray-700 text-sm md:text-base">
            Privacy First
          </p>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            🔒 We don't ask who you are — until you find what fits.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 3 — CATEGORY GRID (8 orange pill cards)
// ─────────────────────────────────────────────────────────────────────────────
function CategoryStep({ onSelect }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-6 md:py-0">
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-6 md:mb-8">
          What best describes what you're looking for
          <span className="text-orange-500">?</span>
        </h1>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {CATEGORY_CARDS.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold rounded-lg px-3 py-4 md:px-4 md:py-5 text-xs md:text-sm leading-snug transition-all duration-150 shadow-sm whitespace-pre-line min-h-[90px] md:min-h-[110px] flex items-center justify-center"
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 4 — SUB-OPTION circles (multi-select)
// ─────────────────────────────────────────────────────────────────────────────
function SubOptionStep({ categoryId, onNext }) {
  const data = SUB_OPTIONS[categoryId];
  const [selected, setSelected] = useState([]);

  const toggle = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-6 md:py-0">
      <div className="w-full max-w-3xl text-center">
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 leading-snug mb-3 md:mb-4">
          {data.title.split("!")[0]}
          <span className="text-orange-500">!</span>
        </h1>
        <p className="text-xs md:text-sm text-gray-500 mb-6 md:mb-8 whitespace-pre-line">
          {data.sub}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 text-left">
          {[0, 1].map((colIndex) => (
            <div key={colIndex} className="flex flex-col gap-3 md:gap-4">
              {data.items
                .filter((_, index) => index % 2 === colIndex)
                .map((item) => {
                  const on = selected.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggle(item.id)}
                      className="flex items-start gap-3 text-left group p-3 hover:bg-orange-50 rounded-lg transition-colors"
                    >
                      <div
                        className={`mt-0.5 flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center transition-colors
                        ${
                          on
                            ? "border-orange-500 bg-orange-500"
                            : "border-orange-400 bg-transparent group-hover:border-orange-500"
                        }`}
                      >
                        {on && (
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 12 12"
                            fill="none"
                            className="md:w-3 md:h-3"
                          >
                            <path
                              d="M2 6l3 3 5-5"
                              stroke="#fff"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 text-sm md:text-base">
                          {item.label}
                        </p>
                        <p className="text-xs md:text-sm text-gray-500 mt-1">
                          {item.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
            </div>
          ))}
        </div>

        <div
          className={`mt-8 md:mt-10 transition-all duration-300 ${
            selected.length
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          <OrangeBtn
            onClick={() => onNext(selected)}
            className="px-6 md:px-10 py-3 text-sm md:text-base w-full sm:w-auto"
          >
            Continue
          </OrangeBtn>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 5 — PREFERENCE FILTERS (budget / timeline / family / purpose)
// ─────────────────────────────────────────────────────────────────────────────
function FilterStep({ onSubmit }) {
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [family, setFamily] = useState("");
  const [purpose, setPurpose] = useState("");

  const rows = [
    {
      label: "Budget Range",
      value: budget,
      set: setBudget,
      opts: BUDGET_OPTIONS,
    },
    {
      label: "Timeline",
      value: timeline,
      set: setTimeline,
      opts: TIMELINE_OPTIONS,
    },
    {
      label: "Family Involvement",
      value: family,
      set: setFamily,
      opts: FAMILY_OPTIONS,
    },
    {
      label: "Purpose",
      value: purpose,
      set: setPurpose,
      opts: PURPOSE_OPTIONS,
    },
  ];

  const canSubmit = budget && timeline && family && purpose;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-6 md:py-0">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-6 md:mb-8">
          What best describes what you're looking for
          <span className="text-orange-500">?</span>
        </h1>

        <div className="space-y-4 md:space-y-6 text-left max-w-lg mx-auto">
          {rows.map((r) => (
            <div
              key={r.label}
              className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-3 p-3 md:p-4 bg-white rounded-lg border border-gray-200"
            >
              <div className="w-full sm:w-48 flex-shrink-0">
                <label className="text-sm md:text-base font-medium text-gray-700">
                  {r.label} -
                </label>
              </div>
              <div className="flex-1 min-w-0">
                <Dropdown
                  label="Select an option"
                  options={r.opts}
                  value={r.value}
                  onChange={r.set}
                />
              </div>
              
            </div>
          ))}
        </div>

        <OrangeBtn
          onClick={() => onSubmit({ budget, timeline, family, purpose })}
          className={`mt-8 md:mt-10 px-6 md:px-10 py-3 text-sm md:text-base w-full sm:w-auto ${
            !canSubmit ? "cursor-not-allowed" : ""
          }`}
          disabled={!canSubmit}
        >
          View Filtered Properties
        </OrangeBtn>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 6 — RESULTS (3 cards + summary + reset)
// ─────────────────────────────────────────────────────────────────────────────
function ResultsPage({
  locationData,
  categoryId,
  selectedSubs,
  filters,
  onReset,
}) {
  const catLabel =
    CATEGORY_CARDS.find((c) => c.id === categoryId)?.label.replace("\n", " ") ||
    "";
  const subLabels = (SUB_OPTIONS[categoryId]?.items || [])
    .filter((it) => selectedSubs.includes(it.id))
    .map((it) => it.label);

  const parts = [
    [
      locationData.country,
      locationData.state,
      locationData.city,
      locationData.region,
    ]
      .filter(Boolean)
      .join(", "),
    catLabel,
    subLabels.join(" + ") || "—",
    filters.budget || "",
    filters.timeline ? `In ${filters.timeline}` : "",
    filters.family ? `Suitable for - ${filters.family} Centric Decision` : "",
    filters.purpose
      ? `Purpose - ${filters.purpose === "Live" ? "Living" : filters.purpose}`
      : "",
  ].filter(Boolean);

  const summaryText =
    "(Location - " + parts[0] + " >> " + parts.slice(1).join(" >> ") + ")";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-6 md:py-10">
      <div className="w-full max-w-5xl text-center">
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-3 md:mb-4">
          Here are your filtered properties -{" "}
          <span className="text-orange-500">3 / 50</span>
        </h1>
        <p className="text-xs md:text-sm text-gray-500 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed">
          {summaryText}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 mb-8 md:mb-10">
          {DUMMY_RESULTS.map((res) => (
            <div
              key={res.num}
              className="bg-white rounded-xl md:rounded-2xl border-2 border-orange-400 shadow-sm flex flex-col items-center pt-6 relative h-full"
            >
              <div className="absolute -top-4 md:-top-5 w-8 h-8 md:w-10 md:h-10 lg:w-11 lg:h-11 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-base md:text-lg shadow-md">
                {res.num}
              </div>

              <div className="px-4 md:px-5 pt-2 pb-4 md:pb-5 text-left w-full flex-1">
                <p className="text-xs text-gray-500">Key -</p>
                <p className="font-bold text-gray-800 text-sm md:text-base mb-2">
                  {res.key}
                </p>
                <p className="text-xs text-gray-500">Location</p>
                <p className="font-bold text-gray-800 text-sm md:text-base mb-3">
                  {res.location}
                </p>
                <p className="text-xs text-gray-500">Highlight -</p>
                <p className="font-bold text-gray-800 text-sm md:text-base">
                  {res.highlight}
                </p>
              </div>

              <Link
                href={res.link}
                target="_blank"
                className="w-full px-4 md:px-5 pb-4 md:pb-5 mt-auto"
              >
                <OrangeBtn className="w-full py-2 md:py-3 text-xs md:text-sm leading-snug">
                  View 7-Slide
                  <br />
                  Overview
                </OrangeBtn>
              </Link>
            </div>
          ))}
        </div>

        <button
          onClick={onReset}
          className="border border-orange-500 text-orange-500 hover:bg-orange-50 rounded-lg px-6 md:px-8 py-2 text-sm md:text-base font-semibold transition"
        >
          Reset Filter
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT — manages step state & wires everything together
// ─────────────────────────────────────────────────────────────────────────────
export default function Top50App() {
  const [step, setStep] = useState(1);
  const [locationData, setLocationData] = useState({});
  const [categoryId, setCategoryId] = useState("");
  const [selectedSubs, setSelectedSubs] = useState([]);
  const [filters, setFilters] = useState({});

  const reset = () => {
    setStep(1);
    setLocationData({});
    setCategoryId("");
    setSelectedSubs([]);
    setFilters({});
  };

  return (
    <>
      <StepBar step={step - 1} total={5} />

      {step === 1 && <WelcomeStep onNext={() => setStep(2)} />}
      {step === 2 && (
        <LocationStep
          onNext={(loc) => {
            setLocationData(loc);
            setStep(3);
          }}
        />
      )}
      {step === 3 && (
        <CategoryStep
          onSelect={(id) => {
            setCategoryId(id);
            setStep(4);
          }}
        />
      )}
      {step === 4 && (
        <SubOptionStep
          categoryId={categoryId}
          onNext={(subs) => {
            setSelectedSubs(subs);
            setStep(5);
          }}
        />
      )}
      {step === 5 && (
        <FilterStep
          onSubmit={(f) => {
            setFilters(f);
            setStep(6);
          }}
        />
      )}
      {step === 6 && (
        <ResultsPage
          locationData={locationData}
          categoryId={categoryId}
          selectedSubs={selectedSubs}
          filters={filters}
          onReset={reset}
        />
      )}
    </>
  );
}