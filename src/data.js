export const sections = [
  { id: "briefing", label: "Briefing", group: "Today" },
  { id: "treasury", label: "Treasury", group: "The books" },
  { id: "estates", label: "Estates", group: "The books" },
  { id: "council", label: "Council", group: "The books" },
  { id: "istana", label: "Istana", group: "The books" },
];

export const periods = [
  { id: "quarter", label: "Quarter" },
  { id: "year", label: "Year" },
  { id: "reign", label: "Reign" },
];

const ringgit = new Intl.NumberFormat("en-MY", {
  style: "currency",
  currency: "MYR",
  maximumFractionDigits: 0,
});

export function formatRinggit(value) {
  return ringgit.format(value);
}

export function formatMillions(value) {
  return `RM ${value.toLocaleString("en-MY")}m`;
}

export const books = {
  quarter: {
    spoken: ["The treasury holds", "four billion, eight hundred", "and twenty million ringgit."],
    figure: 4_820_000_000,
    delta: 0.064,
    asOf: "Close of 3 October 2026",
    note: "Above the previous quarter by 6.4%. The Muar grant is still unsigned.",
    series: [
      { label: "Apr", hasil: 318, royalty: 142, forest: 48 },
      { label: "May", hasil: 342, royalty: 136, forest: 51 },
      { label: "Jun", hasil: 401, royalty: 151, forest: 44 },
    ],
    shares: [
      { name: "Land tax", value: 34 },
      { name: "Royalty", value: 28 },
      { name: "Investments", value: 18 },
      { name: "Forestry", value: 12 },
      { name: "Other", value: 8 },
    ],
    estates: [
      { district: "Kota Tinggi", yield: 128, crop: "Oil palm" },
      { district: "Kluang", yield: 96, crop: "Oil palm" },
      { district: "Muar", yield: 84, crop: "Rubber" },
      { district: "Segamat", yield: 71, crop: "Oil palm" },
      { district: "Pontian", yield: 63, crop: "Pineapple" },
      { district: "Batu Pahat", yield: 58, crop: "Coconut" },
    ],
  },
  year: {
    spoken: ["The year stands at", "eleven billion,", "four hundred million ringgit."],
    figure: 11_400_000_000,
    delta: 0.031,
    asOf: "January through October 2026",
    note: "Tracking 3.1% above the warrant agreed in January.",
    series: [
      { label: "Jan", hasil: 280, royalty: 120, forest: 40 },
      { label: "Feb", hasil: 264, royalty: 118, forest: 36 },
      { label: "Mar", hasil: 301, royalty: 130, forest: 42 },
      { label: "Apr", hasil: 318, royalty: 142, forest: 48 },
      { label: "May", hasil: 342, royalty: 136, forest: 51 },
      { label: "Jun", hasil: 401, royalty: 151, forest: 44 },
      { label: "Jul", hasil: 388, royalty: 160, forest: 47 },
      { label: "Aug", hasil: 376, royalty: 155, forest: 52 },
      { label: "Sep", hasil: 394, royalty: 148, forest: 49 },
      { label: "Oct", hasil: 210, royalty: 86, forest: 22 },
    ],
    shares: [
      { name: "Land tax", value: 36 },
      { name: "Royalty", value: 27 },
      { name: "Investments", value: 16 },
      { name: "Forestry", value: 13 },
      { name: "Other", value: 8 },
    ],
    estates: [
      { district: "Kota Tinggi", yield: 410, crop: "Oil palm" },
      { district: "Kluang", yield: 352, crop: "Oil palm" },
      { district: "Muar", yield: 298, crop: "Rubber" },
      { district: "Segamat", yield: 264, crop: "Oil palm" },
      { district: "Pontian", yield: 221, crop: "Pineapple" },
      { district: "Batu Pahat", yield: 207, crop: "Coconut" },
    ],
  },
  reign: {
    spoken: ["Five years have brought", "forty-eight billion,", "six hundred million ringgit."],
    figure: 48_600_000_000,
    delta: 0.18,
    asOf: "2022 through 2026",
    note: "The books have doubled, led by royalty and land.",
    series: [
      { label: "2022", hasil: 6200, royalty: 2100, forest: 640 },
      { label: "2023", hasil: 7100, royalty: 2600, forest: 710 },
      { label: "2024", hasil: 8400, royalty: 3100, forest: 780 },
      { label: "2025", hasil: 9800, royalty: 3600, forest: 860 },
      { label: "2026", hasil: 11400, royalty: 4100, forest: 920 },
    ],
    shares: [
      { name: "Land tax", value: 41 },
      { name: "Royalty", value: 31 },
      { name: "Investments", value: 14 },
      { name: "Forestry", value: 9 },
      { name: "Other", value: 5 },
    ],
    estates: [
      { district: "Kota Tinggi", yield: 1860, crop: "Oil palm" },
      { district: "Kluang", yield: 1540, crop: "Oil palm" },
      { district: "Muar", yield: 1320, crop: "Rubber" },
      { district: "Segamat", yield: 1180, crop: "Oil palm" },
      { district: "Pontian", yield: 990, crop: "Pineapple" },
      { district: "Batu Pahat", yield: 870, crop: "Coconut" },
    ],
  },
};

export const ledger = [
  { id: "hasil", name: "Hasil negeri", detail: "Land tax and assessment", balance: 1_640_000_000, move: "+4.2%" },
  { id: "royalty", name: "Royalty", detail: "Petroleum and minerals", balance: 1_350_000_000, move: "−1.1%" },
  { id: "invest", name: "Investments", detail: "Johor Corporation holdings", balance: 868_000_000, move: "+2.4%" },
  { id: "forest", name: "Forestry", detail: "Coupe fees and timber", balance: 578_000_000, move: "+0.6%" },
  { id: "other", name: "Other receipts", detail: "Fees, fines, and interest", balance: 384_000_000, move: "+0.2%" },
];

export const records = [
  {
    id: "muar-18",
    kind: "Grant",
    title: "Land grant 18-M",
    place: "Muar",
    when: "Before Monday",
    needsSignature: true,
    summary: "Forty hectares of rubber smallholding, appealed after the June assessment.",
    body: "The district office supports the appeal. The file is complete except for the Regent’s signature. Monday’s audience is the last sitting before the grant lapses.",
  },
  {
    id: "serene-roof",
    kind: "Works",
    title: "Bukit Serene roof",
    place: "Istana Bukit Serene",
    when: "This month",
    needsSignature: false,
    summary: "Copper replacement on the east range is in its last month.",
    body: "The east range is weathertight. Gilding of the ridge crest starts on the 12th, if the rain holds off Kota Tinggi.",
  },
  {
    id: "audience-mon",
    kind: "Audience",
    title: "Monday audience",
    place: "Istana Besar",
    when: "Monday, 09:30",
    needsSignature: false,
    summary: "Three land appeals and one petition from Pontian fishermen.",
    body: "Order of business: Muar grant 18-M, Kluang boundary stone, Segamat water right, then the Pontian petition. Papers are in the red case.",
  },
  {
    id: "council-wed",
    kind: "Sitting",
    title: "State council",
    place: "Dewan",
    when: "Wednesday, 14:00",
    needsSignature: false,
    summary: "The quarter warrant is ready to be read into the minutes.",
    body: "Treasury will table the quarter close. Estates will answer on Kota Tinggi yields. No new appropriations are proposed.",
  },
  {
    id: "besar-hall",
    kind: "Works",
    title: "Istana Besar hall",
    place: "Johor Bahru",
    when: "November",
    needsSignature: false,
    summary: "Floor inlay is delayed two weeks for the marble from Ipoh.",
    body: "The hall cannot host the November banquet until the inlay is set. The steward recommends moving the banquet to Bukit Serene.",
  },
];

export const works = [
  { id: "roof", recordId: "serene-roof", name: "Bukit Serene roof", place: "East range", progress: 0.86, note: "Gilding starts on the 12th." },
  { id: "hall", recordId: "besar-hall", name: "Istana Besar hall", place: "Floor inlay", progress: 0.54, note: "Marble still in Ipoh." },
  { id: "garden", recordId: null, name: "Serene river garden", place: "Lower terrace", progress: 0.33, note: "Planting waits on the rains." },
  { id: "jetty", recordId: null, name: "Lido jetty", place: "Straits side", progress: 0.71, note: "Piles are in. Decking next." },
];
