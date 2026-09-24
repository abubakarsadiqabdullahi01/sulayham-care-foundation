// The 21 Local Government Areas of Adamawa State.
// `coverage` is the field SCAF maintains: "active" where the organisation currently
// implements, "planned" for pipeline LGAs, "none" otherwise. Everything else is reference data.
// Sources: INEC Adamawa administrative directory; ward coordinates from open Nigeria geodata.

export type Coverage = "active" | "planned" | "none";

export type Lga = {
  name: string;
  hq: string;
  district: "North" | "Central" | "South";
  lat: number;
  lng: number;
  /** x/y are pre-projected to the ADAMAWA_VIEWBOX in src/data/map.ts */
  x: number;
  y: number;
  wards: number;
  coverage: Coverage;
};

export const ADAMAWA_LGAS: Lga[] = [
  { name: "Demsa", hq: "Demsa", district: "South", lat: 9.4012, lng: 12.1728, x: 217.1, y: 415.7, wards: 10, coverage: "none" },
  { name: "Fufore", hq: "Fufore", district: "Central", lat: 9.2055, lng: 12.6751, x: 332.5, y: 461.3, wards: 11, coverage: "active" },
  { name: "Ganye", hq: "Ganye", district: "South", lat: 8.3799, lng: 12.0586, x: 190.8, y: 653.6, wards: 10, coverage: "none" },
  { name: "Girei", hq: "Girei", district: "Central", lat: 9.4116, lng: 12.5993, x: 315.1, y: 413.3, wards: 10, coverage: "active" },
  { name: "Gombi", hq: "Gombi", district: "Central", lat: 10.1879, lng: 12.5984, x: 314.9, y: 232.5, wards: 10, coverage: "none" },
  { name: "Guyuk", hq: "Guyuk", district: "South", lat: 9.8432, lng: 11.9904, x: 175.1, y: 312.8, wards: 10, coverage: "none" },
  { name: "Hong", hq: "Hong", district: "Central", lat: 10.2847, lng: 13.0252, x: 413.0, y: 210.0, wards: 12, coverage: "none" },
  { name: "Jada", hq: "Jada", district: "South", lat: 8.7032, lng: 12.4353, x: 277.4, y: 578.3, wards: 11, coverage: "none" },
  { name: "Lamurde", hq: "Lamurde", district: "South", lat: 9.5698, lng: 11.7927, x: 129.7, y: 376.5, wards: 10, coverage: "none" },
  { name: "Madagali", hq: "Gulak", district: "North", lat: 10.8382, lng: 13.5485, x: 533.4, y: 81.0, wards: 10, coverage: "none" },
  { name: "Maiha", hq: "Maiha", district: "North", lat: 9.9186, lng: 13.2271, x: 447.1, y: 304.9, wards: 10, coverage: "none" },
  { name: "Mayo Belwa", hq: "Mayo Belwa", district: "South", lat: 8.9396, lng: 12.0355, x: 185.5, y: 523.2, wards: 12, coverage: "none" },
  { name: "Michika", hq: "Michika", district: "North", lat: 10.5886, lng: 13.4127, x: 502.1, y: 139.2, wards: 16, coverage: "none" },
  { name: "Mubi North", hq: "Mubi", district: "North", lat: 10.3202, lng: 13.3502, x: 487.8, y: 201.7, wards: 11, coverage: "planned" },
  { name: "Mubi South", hq: "Gella", district: "North", lat: 10.1799, lng: 13.3769, x: 493.9, y: 234.4, wards: 10, coverage: "none" },
  { name: "Numan", hq: "Numan", district: "South", lat: 9.4589, lng: 12.0069, x: 178.9, y: 402.3, wards: 10, coverage: "planned" },
  { name: "Shelleng", hq: "Shelleng", district: "South", lat: 9.8352, lng: 12.1718, x: 216.8, y: 314.6, wards: 10, coverage: "none" },
  { name: "Song", hq: "Song", district: "Central", lat: 9.8031, lng: 12.5855, x: 311.9, y: 322.1, wards: 11, coverage: "planned" },
  { name: "Toungo", hq: "Toungo", district: "South", lat: 8.0678, lng: 11.8739, x: 148.3, y: 726.3, wards: 10, coverage: "none" },
  { name: "Yola North", hq: "Jimeta", district: "Central", lat: 9.2603, lng: 12.5011, x: 292.5, y: 448.5, wards: 11, coverage: "active" },
  { name: "Yola South", hq: "Yola Town", district: "Central", lat: 9.1719, lng: 12.6061, x: 316.7, y: 469.1, wards: 11, coverage: "active" },
];

export const SENATORIAL_DISTRICTS = [
  { key: "North" as const, name: "Adamawa North" },
  { key: "Central" as const, name: "Adamawa Central" },
  { key: "South" as const, name: "Adamawa South" },
];

export const TOTAL_WARDS = ADAMAWA_LGAS.reduce((sum, l) => sum + l.wards, 0);
