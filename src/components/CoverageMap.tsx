"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import {
  ADAMAWA_NEIGHBOURS,
  ADAMAWA_PATH,
  ADAMAWA_VIEWBOX,
  NIGERIA_STATES,
  NIGERIA_VIEWBOX,
} from "@/data/map";
import { ADAMAWA_LGAS, SENATORIAL_DISTRICTS, TOTAL_WARDS, type Coverage } from "@/data/lgas";

const COVERAGE_STYLE: Record<Coverage, { dot: string; ring: string; label: string }> = {
  active: { dot: "#1E9E4A", ring: "rgba(30,158,74,0.25)", label: "Currently implementing" },
  planned: { dot: "#EE8022", ring: "rgba(238,128,34,0.25)", label: "In the pipeline" },
  none: { dot: "#8B9A94", ring: "rgba(139,154,148,0.2)", label: "Not yet reached" },
};

const HEAD_OFFICE = "Yola North";

type Filter = "All" | "North" | "Central" | "South";

/**
 * Everything inside an SVG scales with its viewBox, so a marker and a label
 * sized in viewBox units shrink with the map. At 420px wide that was already a
 * 10px tooltip; on a 308px phone it fell to 7.5px text and 6.5px dots — too
 * small to read and too small to hit. This hook reports how many CSS pixels one
 * viewBox unit currently covers, so sizes can be specified in real pixels and
 * stay constant whatever width the map renders at.
 */
function useViewBoxScale(ref: React.RefObject<SVGSVGElement>, viewBoxWidth: number) {
  const [pxPerUnit, setPxPerUnit] = useState(420 / viewBoxWidth);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const measure = () => {
      const width = node.getBoundingClientRect().width;
      if (width > 0) setPxPerUnit(width / viewBoxWidth);
    };

    measure();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }

    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, viewBoxWidth]);

  return pxPerUnit;
}

export function CoverageMap() {
  const [active, setActive] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("All");
  const mapRef = useRef<SVGSVGElement>(null);
  const pxPerUnit = useViewBoxScale(mapRef, ADAMAWA_VIEWBOX.width);

  /** A size in CSS pixels, expressed in viewBox units. */
  const u = (cssPx: number) => cssPx / pxPerUnit;

  const visible = useMemo(
    () => (filter === "All" ? ADAMAWA_LGAS : ADAMAWA_LGAS.filter((l) => l.district === filter)),
    [filter],
  );

  const selected = ADAMAWA_LGAS.find((l) => l.name === active) ?? null;
  const activeCount = ADAMAWA_LGAS.filter((l) => l.coverage === "active").length;

  return (
    <Section id="coverage" className="bg-paper">
      <SectionHeading
        kicker="Where we work"
        title="One state, 21 local government areas, 226 wards."
        lede="Adamawa is the eighth largest state in Nigeria and shares an international border with Cameroon. Delivery is planned at ward level, so this is the map that matters."
        accent="sky"
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12">
        {/* ---------------- Map ---------------- */}
        <Reveal>
          <div className="card relative overflow-hidden p-5 shadow-lift sm:p-7">
            {/* Nigeria locator. Absolute only from `sm` up: at phone width the
                main map fills the card and the inset sat on top of the northern
                LGAs, so below that it takes its own line above the map. */}
            <div className="mb-4 ml-auto w-[104px] rounded-xl border border-ink/10 bg-paper p-2 sm:absolute sm:right-5 sm:top-5 sm:mb-0 sm:w-[148px]">
              <svg
                viewBox={`0 0 ${NIGERIA_VIEWBOX.width} ${NIGERIA_VIEWBOX.height}`}
                className="h-auto w-full"
                role="img"
                aria-label="Locator map of Nigeria with Adamawa State highlighted"
              >
                {NIGERIA_STATES.map((state) => (
                  <path
                    key={state.id}
                    d={state.d}
                    fill={state.name === "Adamawa" ? "#1E9E4A" : "#DCE3DD"}
                    stroke="#F2F4EF"
                    strokeWidth={2}
                  />
                ))}
              </svg>
              <p className="mt-1 text-center text-[0.68rem] text-stone-light">Adamawa in Nigeria</p>
            </div>

            <svg
              ref={mapRef}
              viewBox={`0 0 ${ADAMAWA_VIEWBOX.width} ${ADAMAWA_VIEWBOX.height}`}
              className="mx-auto h-auto w-full max-w-[420px]"
              role="img"
              aria-label="Map of Adamawa State showing all 21 local government areas"
            >
              {ADAMAWA_NEIGHBOURS.map((n) => (
                <path key={n.name} d={n.d} fill="#E7EBE4" stroke="#D5DCD6" strokeWidth={1.5} />
              ))}

              <path d={ADAMAWA_PATH} fill="#0A2A21" stroke="#1A4A3B" strokeWidth={2} />

              {ADAMAWA_LGAS.map((lga) => {
                const style = COVERAGE_STYLE[lga.coverage];
                const dimmed = filter !== "All" && lga.district !== filter;
                const isActive = active === lga.name;
                return (
                  <g
                    key={lga.name}
                    onMouseEnter={() => setActive(lga.name)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(lga.name)}
                    onBlur={() => setActive(null)}
                    tabIndex={0}
                    role="button"
                    aria-label={`${lga.name} — ${style.label}`}
                    className="cursor-pointer outline-none"
                    style={{ opacity: dimmed ? 0.22 : 1, transition: "opacity 200ms" }}
                  >
                    {isActive ? (
                      <circle cx={lga.x} cy={lga.y} r={u(15)} fill={style.ring} />
                    ) : null}
                    <circle
                      cx={lga.x}
                      cy={lga.y}
                      r={isActive ? u(7.5) : u(5.5)}
                      fill={style.dot}
                      stroke="#0A2A21"
                      strokeWidth={u(1.2)}
                      style={{ transition: "r 160ms" }}
                    />
                    {lga.name === HEAD_OFFICE ? (
                      <circle
                        cx={lga.x}
                        cy={lga.y}
                        r={u(11)}
                        fill="none"
                        stroke="#EE8022"
                        strokeWidth={u(1.8)}
                      />
                    ) : null}
                    {/* Invisible 44px hit area — the painted dot is deliberately
                        small, but the target a finger has to find should not be. */}
                    <circle cx={lga.x} cy={lga.y} r={u(22)} fill="transparent" />
                  </g>
                );
              })}

              {selected
                ? (() => {
                    // Sized in CSS pixels so the label stays legible at any map width.
                    const w = u(150);
                    const h = u(42);
                    const pad = u(6);
                    const x = Math.min(
                      Math.max(selected.x - w / 2, pad),
                      ADAMAWA_VIEWBOX.width - w - pad,
                    );
                    const y = Math.max(selected.y - h - u(14), pad);
                    return (
                      <g pointerEvents="none">
                        <rect
                          x={x}
                          y={y}
                          width={w}
                          height={h}
                          rx={u(9)}
                          fill="#0A2A21"
                          stroke="#1E9E4A"
                          strokeWidth={u(1)}
                        />
                        <text
                          x={x + w / 2}
                          y={y + u(17)}
                          textAnchor="middle"
                          fill="#F2F4EF"
                          fontSize={u(14)}
                          fontWeight="600"
                        >
                          {selected.name}
                        </text>
                        <text
                          x={x + w / 2}
                          y={y + u(32)}
                          textAnchor="middle"
                          fill="#8B9A94"
                          fontSize={u(11)}
                        >
                          {selected.wards} wards · HQ {selected.hq}
                        </text>
                      </g>
                    );
                  })()
                : null}
            </svg>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-ink/10 pt-5">
              {(Object.keys(COVERAGE_STYLE) as Coverage[]).map((key) => (
                <span key={key} className="inline-flex items-center gap-2 text-[0.82rem] text-stone">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: COVERAGE_STYLE[key].dot }}
                  />
                  {COVERAGE_STYLE[key].label}
                </span>
              ))}
              <span className="inline-flex items-center gap-2 text-[0.82rem] text-stone">
                <span className="h-3 w-3 rounded-full border-2 border-sun" />
                Head office
              </span>
            </div>
          </div>
        </Reveal>

        {/* ---------------- List ---------------- */}
        <Reveal delay={0.08}>
          <div className="flex h-full flex-col">
            <div className="flex flex-wrap gap-2">
              {(["All", "North", "Central", "South"] as Filter[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFilter(key)}
                  aria-pressed={filter === key}
                  className={`inline-flex min-h-[44px] items-center rounded-full border px-4 text-[0.85rem] font-medium transition-colors ${
                    filter === key
                      ? "border-ink bg-ink text-paper"
                      : "border-ink/15 bg-white text-stone hover:border-ink/40"
                  }`}
                >
                  {key === "All" ? "All 21 LGAs" : `Adamawa ${key}`}
                </button>
              ))}
            </div>

            <div className="mt-6 space-y-8">
              {SENATORIAL_DISTRICTS.filter((d) => filter === "All" || d.key === filter).map((district) => {
                const rows = visible.filter((l) => l.district === district.key);
                if (!rows.length) return null;
                return (
                  <div key={district.key}>
                    <h3 className="font-display text-[0.95rem] font-semibold text-stone">
                      {district.name}
                      <span className="ml-2 font-sans font-normal text-stone-light tnum">
                        {rows.length} LGAs
                      </span>
                    </h3>
                    <ul className="mt-3 grid gap-1 sm:grid-cols-2">
                      {rows.map((lga) => {
                        const style = COVERAGE_STYLE[lga.coverage];
                        return (
                          <li key={lga.name}>
                            <button
                              type="button"
                              onMouseEnter={() => setActive(lga.name)}
                              onMouseLeave={() => setActive(null)}
                              onFocus={() => setActive(lga.name)}
                              onBlur={() => setActive(null)}
                              className={`flex min-h-[44px] w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
                                active === lga.name ? "bg-white shadow-sm" : "hover:bg-white"
                              }`}
                            >
                              <span
                                className="h-2.5 w-2.5 shrink-0 rounded-full"
                                style={{ background: style.dot }}
                              />
                              <span className="flex-1 text-[0.92rem] font-medium text-ink">{lga.name}</span>
                              <span className="text-[0.78rem] text-stone-light tnum">{lga.wards}w</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 rounded-card bg-ink p-6 text-paper">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 shrink-0 text-sun" />
                <div>
                  <p className="font-display text-lg">Head office, Yola North</p>
                  <p className="mt-1 text-[0.9rem] leading-relaxed text-paper/70">
                    No. 45, Moh&apos;d Jega Road, Karewa, Jimeta-Yola. SCAF currently implements in{" "}
                    <span className="font-semibold text-paper tnum">{activeCount}</span> of Adamawa&apos;s 21
                    LGAs, covering part of the state&apos;s{" "}
                    <span className="tnum">{TOTAL_WARDS}</span> wards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
