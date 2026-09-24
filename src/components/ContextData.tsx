"use client";

import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import {
  ADAMAWA_FACTS,
  DATA_AS_OF,
  EDUCATION,
  FUNDING,
  GBV,
  HEALTH_COVERAGE,
  POVERTY_BY_STATE,
  type Source,
} from "@/data/indicators";

const AXIS = { fontSize: 12, fill: "#5E6F68" };

/** Greedy word wrap to a character budget. */
function wrapWords(label: string, maxChars: number) {
  const lines: string[] = [];
  let line = "";
  for (const word of label.split(" ")) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/**
 * Category tick for a horizontal (vertical-layout) bar chart, wrapped to the
 * axis width. Used for the maternal-health categories on narrow screens.
 */
function WrappedCategoryTick({
  x,
  y,
  payload,
  width,
}: {
  x?: number;
  y?: number;
  payload?: { value?: string | number };
  width?: number;
}) {
  const fontSize = 11;
  const maxChars = Math.max(8, Math.floor(((width ?? 100) - 12) / (fontSize * 0.52)));
  const lines = wrapWords(String(payload?.value ?? ""), maxChars);
  const step = fontSize + 1;
  const first = -((lines.length - 1) * step) / 2 + fontSize * 0.35;

  return (
    <text x={x} y={y} textAnchor="end" fontSize={fontSize} fill="#5E6F68">
      {lines.map((text, i) => (
        <tspan key={text} x={x} dy={i === 0 ? first : step}>
          {text}
        </tspan>
      ))}
    </text>
  );
}

/**
 * Reports the rendered width of an element, so a chart can choose a layout that
 * fits rather than one fixed at author time.
 */
function useElementWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const measure = () => setWidth(node.getBoundingClientRect().width);
    measure();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }

    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, width] as const;
}

function Panel({
  title,
  note,
  source,
  children,
  className,
}: {
  title: string;
  note?: string;
  source: Source;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article className={`card flex h-full flex-col p-6 sm:p-7 ${className ?? ""}`}>
      <h3 className="font-display text-lg text-ink">{title}</h3>
      {note ? <p className="mt-2 text-[0.9rem] leading-relaxed text-stone">{note}</p> : null}
      <div className="mt-6 flex-1">{children}</div>
      <p className="mt-5 border-t border-ink/10 pt-4 text-[0.78rem] leading-relaxed text-stone-light">
        {source.url ? (
          <a
            href={source.url}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-start gap-1 hover:text-stone hover:underline"
          >
            {source.label}
            <ExternalLink size={12} className="mt-[3px] shrink-0" />
          </a>
        ) : (
          source.label
        )}
      </p>
    </article>
  );
}

const tooltipStyle = {
  contentStyle: {
    borderRadius: 12,
    border: "1px solid rgba(10,42,33,0.12)",
    fontSize: 13,
    fontFamily: "var(--font-body)",
    boxShadow: "0 12px 32px -12px rgba(10,42,33,0.25)",
  },
  cursor: { fill: "rgba(10,42,33,0.04)" },
};

/**
 * Maternal health coverage.
 *
 * Three long category names over two series. Below roughly 440px the chart gets
 * about 65px per category, which is not enough for "breastfeeding" at any size
 * worth reading, so the bars turn horizontal — the same orientation the poverty
 * chart above already uses — and the names move to the y-axis where a long label
 * costs width the chart can spare rather than width it cannot.
 */
function HealthCoveragePanel() {
  const [ref, width] = useElementWidth<HTMLDivElement>();
  const narrow = width > 0 && width < 440;

  return (
    <Panel title={HEALTH_COVERAGE.title} note={HEALTH_COVERAGE.note} source={HEALTH_COVERAGE.source}>
      <div ref={ref} className={narrow ? "h-[300px] w-full" : "h-[280px] w-full"}>
        <ResponsiveContainer width="100%" height="100%">
          {narrow ? (
            <BarChart
              data={HEALTH_COVERAGE.data}
              layout="vertical"
              margin={{ top: 4, right: 30, bottom: 4, left: 4 }}
              barGap={2}
            >
              <XAxis
                type="number"
                domain={[0, 100]}
                unit="%"
                tick={{ fontSize: 11, fill: "#5E6F68" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="indicator"
                width={92}
                tick={<WrappedCategoryTick />}
                axisLine={false}
                tickLine={false}
                interval={0}
              />
              <Tooltip formatter={(v: number) => [`${v}%`, ""]} {...tooltipStyle} />
              <Legend
                iconType="circle"
                iconSize={9}
                formatter={(value) => <span style={{ fontSize: 12, color: "#5E6F68" }}>{value}</span>}
              />
              <Bar dataKey="2018" fill="#C3CEC8" radius={[0, 5, 5, 0]} barSize={14} />
              <Bar dataKey="2023-24" fill="#2FA3DC" radius={[0, 5, 5, 0]} barSize={14} />
            </BarChart>
          ) : (
            <BarChart data={HEALTH_COVERAGE.data} margin={{ top: 4, right: 8, bottom: 4, left: -18 }}>
              <XAxis dataKey="indicator" tick={AXIS} axisLine={false} tickLine={false} interval={0} />
              <YAxis domain={[0, 100]} unit="%" tick={AXIS} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v: number) => [`${v}%`, ""]} {...tooltipStyle} />
              <Legend
                iconType="circle"
                iconSize={9}
                formatter={(value) => <span style={{ fontSize: 12, color: "#5E6F68" }}>{value}</span>}
              />
              <Bar dataKey="2018" fill="#C3CEC8" radius={[6, 6, 0, 0]} barSize={26} />
              <Bar dataKey="2023-24" fill="#2FA3DC" radius={[6, 6, 0, 0]} barSize={26} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </Panel>
  );
}

export function ContextData() {
  return (
    <Section id="context" className="bg-paper-deep">
      <SectionHeading
        kicker="The need"
        title="The case for this work, in numbers we did not collect ourselves."
        lede={`Published national and regional figures, so partners can check every one. Last reviewed ${DATA_AS_OF}.`}
        accent="heart"
      />

      <div className="mt-14 grid gap-5 lg:grid-cols-12">
        {/* Poverty */}
        <Reveal className="lg:col-span-7">
          <Panel
            title={POVERTY_BY_STATE.title}
            note={POVERTY_BY_STATE.note}
            source={POVERTY_BY_STATE.source}
          >
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={POVERTY_BY_STATE.data}
                  layout="vertical"
                  margin={{ top: 4, right: 28, bottom: 4, left: 4 }}
                >
                  <XAxis type="number" domain={[0, 100]} unit="%" tick={AXIS} axisLine={false} tickLine={false} />
                  <YAxis
                    type="category"
                    dataKey="state"
                    width={72}
                    tick={AXIS}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip formatter={(v: number) => [`${v}%`, "Poverty headcount"]} {...tooltipStyle} />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={22} isAnimationActive>
                    {POVERTY_BY_STATE.data.map((row) => (
                      <Cell key={row.state} fill={row.highlight ? "#1E9E4A" : "#C3CEC8"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-3 text-[0.85rem] text-stone">
              National headcount for comparison:{" "}
              <span className="font-semibold text-ink tnum">{POVERTY_BY_STATE.national}%</span>
            </p>
          </Panel>
        </Reveal>

        {/* Education headline */}
        <Reveal delay={0.06} className="lg:col-span-5">
          <article className="card flex h-full flex-col justify-between bg-ink p-6 text-paper sm:p-7">
            <div>
              <h3 className="font-display text-lg text-paper">Children out of school</h3>
              <p className="mt-6 font-display text-[clamp(3rem,7vw,4.5rem)] font-bold leading-none text-sun">
                <Counter to={EDUCATION.headline.value} decimals={1} />
                <span className="ml-2 text-[0.3em] font-semibold text-paper/70">
                  {EDUCATION.headline.unit}
                </span>
              </p>
              <p className="mt-3 text-[0.95rem] text-paper/70">
                {EDUCATION.headline.label} — {EDUCATION.breakdown[0].value}m of primary age and{" "}
                {EDUCATION.breakdown[1].value}m of secondary age.
              </p>

              <ul className="mt-7 space-y-4 border-t border-white/10 pt-6">
                {EDUCATION.regional.map((item) => (
                  <li key={item.label} className="flex items-baseline gap-4">
                    <span className="min-w-[4.5rem] font-display text-xl font-semibold text-leaf tnum">
                      {item.value}
                    </span>
                    <span className="text-[0.9rem] leading-relaxed text-paper/70">{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-6 border-t border-white/10 pt-4 text-[0.78rem] text-paper/45">
              UNICEF Nigeria, 2024 and 2025 statements
            </p>
          </article>
        </Reveal>

        {/* GBV */}
        <Reveal delay={0.04} className="lg:col-span-5">
          <Panel title={GBV.title} note={GBV.note} source={GBV.source}>
            <div className="h-[188px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={GBV.helpSeeking}
                    dataKey="value"
                    nameKey="name"
                    innerRadius="58%"
                    outerRadius="86%"
                    paddingAngle={2}
                    stroke="none"
                  >
                    {GBV.helpSeeking.map((slice) => (
                      <Cell key={slice.name} fill={slice.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number, n) => [`${v}%`, n as string]} {...tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* The legend is plain markup rather than recharts' own, which needs a
                fixed pixel height and silently clipped its third row — the 58% who
                tell nobody, the line the panel exists to make — on a 320px screen. */}
            <ul className="mt-4 space-y-2">
              {GBV.helpSeeking.map((slice) => (
                <li key={slice.name} className="flex items-baseline gap-2.5">
                  <span
                    className="mt-[1px] h-2.5 w-2.5 shrink-0 translate-y-[2px] rounded-full"
                    style={{ background: slice.fill }}
                  />
                  <span className="flex-1 text-[0.85rem] leading-snug text-stone">{slice.name}</span>
                  <span className="font-display text-[0.9rem] font-semibold text-ink tnum">
                    {slice.value}%
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-2 rounded-xl bg-heart-soft px-4 py-3 text-[0.88rem] leading-relaxed text-ink">
              <span className="font-display text-lg font-semibold text-heart tnum">
                {GBV.prevalence.value}%
              </span>{" "}
              {GBV.prevalence.label}.
            </p>
          </Panel>
        </Reveal>

        {/* Health coverage */}
        <Reveal delay={0.08} className="lg:col-span-7">
          <HealthCoveragePanel />
        </Reveal>

        {/* Funding */}
        <Reveal delay={0.04} className="lg:col-span-7">
          <Panel title={FUNDING.title} note={FUNDING.note} source={FUNDING.source}>
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={FUNDING.data} margin={{ top: 4, right: 8, bottom: 4, left: -14 }}>
                  <XAxis dataKey="year" tick={AXIS} axisLine={false} tickLine={false} />
                  <YAxis tick={AXIS} axisLine={false} tickLine={false} unit="m" />
                  <Tooltip
                    formatter={(v: number, _n, item) => [
                      `US$${v}m`,
                      item?.payload?.type === "appeal" ? "Requested" : "Received",
                    ]}
                    {...tooltipStyle}
                  />
                  <Bar dataKey="received" radius={[6, 6, 0, 0]} barSize={56}>
                    {FUNDING.data.map((row) => (
                      <Cell key={row.year} fill={row.type === "appeal" ? "#EE8022" : "#0A2A21"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-3 text-[0.85rem] text-stone">
              Dark bars are funding received. The orange bar is the 2026 appeal, not money in hand.
            </p>
          </Panel>
        </Reveal>

        {/* Adamawa facts */}
        <Reveal delay={0.1} className="lg:col-span-5">
          <article className="card h-full p-6 sm:p-7">
            <h3 className="font-display text-lg text-ink">Adamawa State at a glance</h3>
            <dl className="mt-6 divide-y divide-ink/10">
              {ADAMAWA_FACTS.map((fact) => (
                <div key={fact.label} className="flex items-baseline justify-between gap-4 py-4">
                  <div>
                    <dt className="text-[0.93rem] font-medium text-ink">{fact.label}</dt>
                    <p className="mt-0.5 text-[0.82rem] text-stone-light">{fact.detail}</p>
                  </div>
                  <dd className="font-display text-xl font-semibold text-leaf tnum">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 border-t border-ink/10 pt-4 text-[0.78rem] text-stone-light">
              Adamawa State Bureau of Statistics; INEC administrative directory
            </p>
          </article>
        </Reveal>
      </div>
    </Section>
  );
}
