/**
 * Every word of SCAF's own profile lives here, so the marketing team can edit
 * copy without touching components. Content is taken from the SCAF
 * Organizational Profile document.
 */

export const ORG = {
  name: "Sulayham Care Foundation",
  shortName: "SCAF",
  tagline: "Together for better lives",
  founded: "2023",
  registrar: "Corporate Affairs Commission",
  registrationNumber: "RN8195660",
  registeredOn: "20 January 2025",
  type: "Non-governmental, not-for-profit organisation",
  headquarters: {
    line1: "No. 45, Moh'd Jega Road, Karewa",
    line2: "Jimeta, Yola",
    state: "Adamawa State",
    country: "Nigeria",
  },
  lede:
    "SCAF works alongside communities in Adamawa State to widen access to healthcare, education, livelihoods and protection — and to make sure the people affected by those gaps help decide how they are closed.",
  background: [
    "The Sulayham Care Foundation (SCAF) is a non-governmental, not-for-profit organisation founded in 2023 and officially registered with the Corporate Affairs Commission (RN8195660) on 20 January 2025.",
    "SCAF is dedicated to deepening community involvement and participation in poverty alleviation, good governance, transparency, human rights, the healthcare and protection of women and girls, gender-based violence, education, health, and youth development.",
    "The organisation has built partnerships with relevant stakeholders and collaborates with both international and national organisations to reach affected populations with essential services and resources.",
  ],
  vision:
    "To promote healthy communities, education and development that are more equitable and sustainable — using innovation and creativity to reduce poverty and improve quality of life.",
  mission:
    "To expand access to primary healthcare and wellness, provide quality education and skills development, and improve quality of life, especially in rural communities — including disaster relief and recovery that supports vulnerable populations in critical times.",
  values: [
    {
      title: "Dependable and transparent",
      body: "Commitments are kept and spending is open to the communities and partners we answer to.",
    },
    {
      title: "Collaboration",
      body: "We work with government, sister organisations and community structures rather than around them.",
    },
    {
      title: "Dedication",
      body: "We stay with a community past the launch event and through the difficult part of delivery.",
    },
    {
      title: "Creative leadership",
      body: "We look for the approach that fits the place, not the approach that fits the template.",
    },
  ],
} as const;

export type ThematicArea = {
  key: string;
  title: string;
  blurb: string;
  accent: "leaf" | "sun" | "sky" | "heart" | "ink";
  icon: string;
};

export const THEMATIC_AREAS: ThematicArea[] = [
  {
    key: "health",
    title: "Health",
    blurb:
      "Primary healthcare access and wellness, with particular attention to women's and girls' health and to rural facilities that carry more patients than they were built for.",
    accent: "leaf",
    icon: "HeartPulse",
  },
  {
    key: "education",
    title: "Education",
    blurb:
      "Getting children into classrooms and keeping them there, plus skills development for young people leaving school without a route into work.",
    accent: "sky",
    icon: "GraduationCap",
  },
  {
    key: "livelihood",
    title: "Livelihood",
    blurb:
      "Income-earning skills, small enterprise support and asset recovery for households whose farming or trading was interrupted by conflict or climate shocks.",
    accent: "sun",
    icon: "Sprout",
  },
  {
    key: "climate",
    title: "Climate change",
    blurb:
      "Helping communities prepare for flooding and erratic rainfall along the Benue valley, and adapt farming practice to a shortening growing season.",
    accent: "leaf",
    icon: "CloudRain",
  },
  {
    key: "governance",
    title: "Good governance",
    blurb:
      "Transparency, accountability and human rights work that gives residents a real seat at the table where decisions about their services are made.",
    accent: "ink",
    icon: "Scale",
  },
  {
    key: "gbv",
    title: "Gender-based violence",
    blurb:
      "Prevention, survivor referral pathways and community dialogue — reaching women and girls who currently neither report nor tell anyone.",
    accent: "heart",
    icon: "ShieldCheck",
  },
];

export type Objective = {
  title: string;
  body: string;
  accent: "leaf" | "sun" | "sky" | "ink";
};

export const OBJECTIVES: Objective[] = [
  {
    title: "Equitable access",
    body: "Ensure every individual, regardless of background or circumstance, has equitable access to comprehensive healthcare, safety measures, livelihood opportunities and quality education.",
    accent: "leaf",
  },
  {
    title: "Inclusive engagement and empowerment",
    body: "Promote inclusivity by actively engaging marginalised populations, community leaders and young people, and fostering their participation in decisions about healthcare, safety, livelihood and education in their communities.",
    accent: "sky",
  },
  {
    title: "Partnership and collaboration",
    body: "Work with government and sister organisations to maximise resources, share best practice, and collectively address the complex barriers to universal access.",
    accent: "sun",
  },
  {
    title: "Community resilience and sustainability",
    body: "Build resilient communities through programmes that strengthen their capacity to withstand and recover from shocks, so access to essential services is sustained.",
    accent: "ink",
  },
];

/** Organogram, transcribed from the SCAF organisational chart. */
export const ORGANOGRAM = {
  chain: ["Board of Directors", "Executive Director", "Program Manager"],
  units: [
    { officer: "Finance & Admin Officer", assistant: "Finance & Admin Assistant", support: "Volunteer" },
    { officer: "M&E Officer", assistant: "M&E Assistant", support: "Data Entry Clerk" },
    { officer: "Care & Support Officer", assistant: "Care & Support Assistant", support: "Volunteer" },
    {
      officer: "Medical & Sexual Prevention Officer",
      assistant: "Medical & Sexual Prevention Assistant",
      support: "Volunteer",
    },
    { officer: "Gender Desk Officer", assistant: "Gender Desk Assistant", support: "Volunteer" },
    { officer: "OVC Officer", assistant: "OVC Assistant", support: "Volunteer" },
  ],
};

export type ContactPerson = {
  name: string;
  role: string;
  phones: string[];
};

export const CONTACTS: ContactPerson[] = [
  {
    name: "HRM Hajiya Halima Umaru Adamu",
    role: "Executive Director",
    phones: ["+234 803 691 2617", "+234 869 573 495"],
  },
  {
    name: "Abdulaziz Mohammed Mustafah",
    role: "Programmes",
    phones: ["+234 803 233 1408", "+234 703 558 7511"],
  },
];

/**
 * Field activity shown under the governance thematic area. Add further entries
 * by copying the shape — the section renders whatever is in `photos`.
 */
export const FIELD_WORK = {
  area: "Good governance",
  title: "Community sensitisation on PVC collection",
  partner: "Dawis Initiative for Sustainability Community Development (DISCOD)",
  blurb:
    "Governance work starts with the card that makes a vote possible. SCAF and DISCOD took the Permanent Voter Card campaign into community squares — sitting with elders, ward heads and young people to explain what the PVC entitles them to, and to make the case for a peaceful, credible election free of vote buying and intimidation.",
  message: "Your PVC, your voice, your future — Katin zabenka, muryarka, makomarka!",
  photos: [
    {
      src: "/field/pvc-campaign-banner.jpg",
      width: 1280,
      height: 960,
      alt: "Two SCAF and DISCOD field officers in branded vests standing beside a campaign banner reading Community Sensitization on PVC Collection, with colleagues seated behind them.",
    },
    {
      src: "/field/pvc-community-briefing.jpg",
      width: 1280,
      height: 720,
      alt: "A SCAF officer in a high-visibility vest addressing a seated gathering of men in a community compound, with the foundation's banner behind him.",
    },
    {
      src: "/field/pvc-community-elders.jpg",
      width: 1280,
      height: 960,
      alt: "Community elders seated on mats under a thatched shelter listening to the session, beside a SCAF banner listing the foundation's aims, vision and mission.",
    },
  ],
};
