/**
 * Published figures that frame why SCAF's thematic areas matter in Adamawa.
 * Every series carries its own source string — the page renders them, because a
 * donor-facing page that shows numbers without provenance is worth very little.
 * Update `asOf` whenever a figure is refreshed.
 */

export type Source = { label: string; url?: string };

export const DATA_AS_OF = "September 2026";

/** Multidimensional poverty headcount, North-East states + national benchmark. */
export const POVERTY_BY_STATE = {
  title: "People living in multidimensional poverty",
  unit: "% of population",
  note: "Adamawa carries the lowest headcount in the North-East — which still means three in five residents are deprived across health, education, living standards, and work and shocks.",
  source: {
    label: "National Bureau of Statistics, Nigeria Multidimensional Poverty Index 2022",
    url: "https://nigerianstat.gov.ng/",
  } as Source,
  data: [
    { state: "Adamawa", value: 59.9, highlight: true },
    { state: "Borno", value: 64.0 },
    { state: "Taraba", value: 65.1 },
    { state: "Gombe", value: 77.4 },
    { state: "Bauchi", value: 81.3 },
    { state: "Yobe", value: 81.7 },
  ],
  national: 63,
};

/** Maternal and child health service coverage, national. */
export const HEALTH_COVERAGE = {
  title: "Maternal health coverage in Nigeria",
  unit: "% of births / pregnancies",
  note: "Antenatal attendance has climbed, but almost half of all deliveries still happen without a skilled attendant present.",
  source: {
    label: "Nigeria Demographic and Health Survey 2018 and 2023–24",
    url: "https://dhsprogram.com/",
  } as Source,
  data: [
    { indicator: "Antenatal care", "2018": 57, "2023-24": 68 },
    { indicator: "Skilled birth attendance", "2018": 43, "2023-24": 52 },
    { indicator: "Exclusive breastfeeding", "2018": 29, "2023-24": 34 },
  ],
};

/** Education: out-of-school children. */
export const EDUCATION = {
  headline: {
    value: 18.3,
    unit: "million",
    label: "children out of school in Nigeria",
    source: { label: "UNICEF, 2024" } as Source,
  },
  breakdown: [
    { segment: "Primary age", value: 10.2 },
    { segment: "Secondary age", value: 8.1 },
  ],
  regional: [
    { label: "Children out of school in the North-East", value: "2 million", source: "UNICEF Maiduguri, May 2025" },
    {
      label: "Primary completers in the North-East who cannot read a basic text",
      value: "72%",
      source: "UNICEF, May 2025",
    },
    { label: "Nigeria's out-of-school children who are in northern states", value: "69%", source: "UNICEF, 2024" },
  ],
};

/** Gender-based violence. */
export const GBV = {
  title: "What happens after gender-based violence in Nigeria",
  note: "Roughly one in five women aged 15–49 has experienced physical or sexual violence. The response gap is the part programming can move.",
  source: {
    label: "Nigeria Demographic and Health Survey 2024; NAPTIP case data",
  } as Source,
  prevalence: { value: 21, label: "of women aged 15–49 have experienced physical or sexual violence" },
  helpSeeking: [
    { name: "Sought help to stop it", value: 24, fill: "#1E9E4A" },
    { name: "Told someone but sought no help", value: 18, fill: "#EE8022" },
    { name: "Neither sought help nor told anyone", value: 58, fill: "#E23B32" },
  ],
};

/** Humanitarian financing for the BAY states. */
export const FUNDING = {
  title: "Humanitarian funding for Borno, Adamawa and Yobe",
  unit: "US$ million",
  note: "Funding received in 2025 was about half the 2024 level. The 2026 appeal asks for $516m to reach 2.5 million people — which is why locally rooted organisations now carry more of the load.",
  source: {
    label: "UN OCHA Nigeria, 2026 Humanitarian Needs and Response Plan launch",
    url: "https://www.unocha.org/nigeria",
  } as Source,
  data: [
    { year: "2024", received: 564, type: "received" },
    { year: "2025", received: 282, type: "received" },
    { year: "2026", received: 516, type: "appeal" },
  ],
};

/** Adamawa State reference facts. */
export const ADAMAWA_FACTS = [
  { label: "Projected population", value: "4.9m", detail: "2021 projection from the 2006 census" },
  { label: "Land area", value: "36,917 km²", detail: "8th largest state in Nigeria" },
  { label: "Local government areas", value: "21", detail: "Across 3 senatorial districts" },
  { label: "Registration areas (wards)", value: "226", detail: "The level where delivery is actually planned" },
];

/** The credential rail under the hero. */
export const CREDENTIALS = [
  { label: "Founded", value: "2023" },
  { label: "CAC registration", value: "RN8195660" },
  { label: "Head office", value: "Jimeta-Yola" },
  { label: "Thematic areas", value: "6" },
];
