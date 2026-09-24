import {
  CloudRain,
  GraduationCap,
  HeartPulse,
  Scale,
  ShieldCheck,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { OBJECTIVES, THEMATIC_AREAS } from "@/data/org";

const ICONS: Record<string, LucideIcon> = {
  HeartPulse,
  GraduationCap,
  Sprout,
  CloudRain,
  Scale,
  ShieldCheck,
};

const TILE: Record<string, { chip: string; rule: string }> = {
  leaf: { chip: "bg-leaf-soft text-leaf", rule: "group-hover:border-leaf" },
  sun: { chip: "bg-sun-soft text-sun", rule: "group-hover:border-sun" },
  sky: { chip: "bg-sky-soft text-sky", rule: "group-hover:border-sky" },
  heart: { chip: "bg-heart-soft text-heart", rule: "group-hover:border-heart" },
  ink: { chip: "bg-paper-deep text-ink", rule: "group-hover:border-ink" },
};

const RAIL: Record<string, string> = {
  leaf: "text-leaf",
  sky: "text-sky",
  sun: "text-sun",
  ink: "text-ink",
};

export function ThematicAreas() {
  return (
    <Section id="work" className="bg-paper">
      <SectionHeading
        kicker="Our work"
        title="Six thematic areas, chosen because they fail together."
        lede="A girl who leaves school early is more likely to marry early, deliver without a skilled attendant, and have no income of her own. SCAF works across the whole chain rather than one link of it."
        accent="sun"
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {THEMATIC_AREAS.map((area, i) => {
          const Icon = ICONS[area.icon] ?? HeartPulse;
          const tile = TILE[area.accent];
          return (
            <Reveal key={area.key} delay={i * 0.05}>
              <article
                className={`group h-full rounded-card border border-ink/10 bg-white p-7 transition-colors duration-300 ${tile.rule}`}
              >
                <span className={`grid h-12 w-12 place-items-center rounded-xl ${tile.chip}`}>
                  <Icon size={22} />
                </span>
                <h3 className="mt-5 font-display text-xl text-ink">{area.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-stone">{area.blurb}</p>
              </article>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-24">
        <SectionHeading kicker="Objectives" title="What we hold ourselves to." accent="leaf" />
        <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {OBJECTIVES.map((objective, i) => (
            <Reveal key={objective.title} delay={i * 0.06}>
              <div className={`rail ${RAIL[objective.accent]}`}>
                <h3 className="font-display text-lg text-ink">{objective.title}</h3>
                <p className="mt-2 text-[0.97rem] leading-relaxed text-stone">{objective.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
