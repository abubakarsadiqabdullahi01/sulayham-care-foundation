import { Compass, Flag } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ORG } from "@/data/org";

const VALUE_ACCENT = ["text-sky", "text-sun", "text-leaf", "text-heart"];

export function VisionMission() {
  return (
    <Section className="bg-ink text-paper">
      <SectionHeading
        kicker="What guides the work"
        title="Vision, mission and the four things we refuse to trade away."
        accent="sun"
        tone="light"
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <article className="h-full rounded-card border border-white/10 bg-white/[0.04] p-8">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-sky/15 text-sky">
              <Compass size={20} />
            </span>
            <h3 className="mt-5 font-display text-2xl">Vision</h3>
            <p className="mt-3 text-[1.02rem] leading-relaxed text-paper/75">{ORG.vision}</p>
          </article>
        </Reveal>

        <Reveal delay={0.08}>
          <article className="h-full rounded-card border border-white/10 bg-white/[0.04] p-8">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-sun/15 text-sun">
              <Flag size={20} />
            </span>
            <h3 className="mt-5 font-display text-2xl">Mission</h3>
            <p className="mt-3 text-[1.02rem] leading-relaxed text-paper/75">{ORG.mission}</p>
          </article>
        </Reveal>
      </div>

      <div className="mt-16">
        <h3 className="font-display text-display-md text-paper">Core values</h3>
        <div className="mt-8 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {ORG.values.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.06}>
              <div className={`rail ${VALUE_ACCENT[i % VALUE_ACCENT.length]}`}>
                <h4 className="font-display text-lg text-paper">{value.title}</h4>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-paper/65">{value.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
