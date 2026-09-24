import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ORGANOGRAM } from "@/data/org";

/**
 * The organogram is drawn rather than shipped as the chart image: real boxes and
 * real connector rules, so it stays crisp at any zoom, reflows on a phone, and a
 * screen reader can walk the hierarchy as nested lists. The original chart is
 * still offered below as the source document.
 *
 * The horizontal bus is only drawn at `xl`, where all six units genuinely sit on
 * one row. Below that the units wrap, and a bus spanning wrapped rows would
 * describe reporting lines that do not exist — so each unit simply carries its
 * own chain instead.
 */

const UNIT_COUNT = ORGANOGRAM.units.length;

/**
 * Column geometry for the bus, kept in sync with `gap-x-4` on the unit grid.
 * A naive `i/6` split puts the drop lines a few pixels off each column centre,
 * because the gaps eat into the track width.
 */
const GAP = "1rem";
const TRACKS = `(100% - ${UNIT_COUNT - 1} * ${GAP})`;
const dropLeft = (i: number) =>
  `calc(${TRACKS} * ${(i + 0.5) / UNIT_COUNT} + ${i} * ${GAP})`;

function Stem({ className = "" }: { className?: string }) {
  return <div className={`mx-auto w-px bg-white/25 ${className}`} aria-hidden />;
}

function TierCard({
  tier,
  role,
  accent,
}: {
  tier: number;
  role: string;
  accent: "sun" | "leaf" | "sky";
}) {
  const ring = {
    sun: "border-sun/40 bg-sun/[0.10]",
    leaf: "border-leaf/40 bg-leaf/[0.10]",
    sky: "border-sky/40 bg-sky/[0.10]",
  }[accent];
  const dot = { sun: "bg-sun", leaf: "bg-leaf", sky: "bg-sky" }[accent];

  return (
    <div
      className={`mx-auto w-full max-w-[22rem] rounded-xl border px-6 py-4 text-center ${ring}`}
    >
      <span className="inline-flex items-center gap-2 font-display text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-paper/55">
        <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
        Tier {tier}
      </span>
      <p className="mt-1 font-display text-[1.15rem] leading-snug text-paper">{role}</p>
    </div>
  );
}

const ROLE_TONE = {
  officer: "border-sky/40 bg-sky/[0.12] font-semibold text-paper",
  assistant: "border-white/15 bg-white/[0.06] text-paper/85",
  support: "border-dashed border-white/20 bg-transparent text-paper/55",
} as const;

function RoleBox({ children, tone }: { children: string; tone: keyof typeof ROLE_TONE }) {
  return (
    <div
      className={`rounded-lg border px-3 py-3 text-center text-[0.86rem] leading-snug ${ROLE_TONE[tone]}`}
    >
      {children}
    </div>
  );
}

export function Organogram() {
  return (
    <Section id="structure" className="bg-ink text-paper">
      <SectionHeading
        kicker="How we are structured"
        title="A board, a director, and six units that each carry a thematic area."
        lede="Every unit runs on the same three-tier pattern: an officer who is accountable for the area, an assistant who carries the caseload, and volunteer or clerical support drawn from the community."
        accent="sun"
        tone="light"
      />

      <Reveal className="mt-14">
        <div className="rounded-card border border-white/10 bg-white/[0.02] px-4 py-10 sm:px-8 sm:py-12">
          {/* Chain of accountability */}
          <ol className="space-y-0">
            {ORGANOGRAM.chain.map((role, i) => (
              <li key={role}>
                {i > 0 ? <Stem className="h-7" /> : null}
                <TierCard
                  tier={i + 1}
                  role={role}
                  accent={(["sun", "leaf", "sky"] as const)[i]}
                />
              </li>
            ))}
          </ol>

          {/* Program Manager down to the units */}
          <Stem className="h-8" />

          {/* One row at xl: a bus with a drop into each column. */}
          <div className="relative hidden h-8 xl:block" aria-hidden>
            <div
              className="absolute top-0 h-px bg-white/25"
              style={{
                left: dropLeft(0),
                width: `calc(${TRACKS} * ${(UNIT_COUNT - 1) / UNIT_COUNT} + ${UNIT_COUNT - 1} * ${GAP})`,
              }}
            />
            {ORGANOGRAM.units.map((unit, i) => (
              <div
                key={unit.officer}
                className="absolute top-0 h-8 w-px bg-white/25"
                style={{ left: dropLeft(i) }}
              />
            ))}
          </div>

          <ul className="grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-y-0">
            {ORGANOGRAM.units.map((unit) => (
              <li key={unit.officer}>
                <ul className="space-y-0">
                  <li>
                    <RoleBox tone="officer">{unit.officer}</RoleBox>
                  </li>
                  <li>
                    <Stem className="h-4" />
                    <RoleBox tone="assistant">{unit.assistant}</RoleBox>
                  </li>
                  <li>
                    <Stem className="h-4" />
                    <RoleBox tone="support">{unit.support}</RoleBox>
                  </li>
                </ul>
              </li>
            ))}
          </ul>

          {/* Legend */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 border-t border-white/10 pt-7 text-[0.8rem] text-paper/60">
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-sm border border-sky/50 bg-sky/30" />
              Officer — accountable for the area
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-sm border border-white/25 bg-white/15" />
              Assistant — carries the caseload
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-sm border border-dashed border-white/35" />
              Volunteer or clerical support
            </span>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <details className="group mt-6 rounded-card border border-white/12 bg-white/[0.04]">
          <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-display text-[1.05rem] text-paper marker:content-['']">
            View the original organisational chart
            <ChevronDown size={18} className="text-paper/50 transition-transform group-open:rotate-180" />
          </summary>
          <div className="border-t border-white/10 p-4 sm:p-6">
            <div className="overflow-x-auto rounded-xl bg-white p-3">
              <Image
                src="/scaf-organogram.png"
                alt="Sulayham Care Foundation organisational chart"
                width={1600}
                height={1100}
                className="h-auto w-full min-w-[640px]"
              />
            </div>
          </div>
        </details>
      </Reveal>
    </Section>
  );
}
