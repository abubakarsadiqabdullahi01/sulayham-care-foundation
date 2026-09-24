import { Building2, CalendarCheck, FileBadge, Landmark } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ORG } from "@/data/org";

const REGISTRY = [
  { icon: CalendarCheck, label: "Founded", value: ORG.founded },
  { icon: FileBadge, label: "CAC registration", value: ORG.registrationNumber },
  { icon: Landmark, label: "Registered", value: ORG.registeredOn },
  { icon: Building2, label: "Legal status", value: "Not-for-profit NGO" },
];

export function About() {
  return (
    <Section id="about" className="bg-paper">
      <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <SectionHeading
            kicker="Who we are"
            title="A community organisation with its paperwork in order and its office in the neighbourhood."
            accent="leaf"
          />
          <div className="mt-8 space-y-5 text-[1.02rem] leading-relaxed text-stone">
            {ORG.background.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
        </div>

        <Reveal className="lg:pt-4">
          <div className="card overflow-hidden shadow-lift">
            <div className="bg-ink px-7 py-6 text-paper">
              <h3 className="font-display text-xl font-semibold">Organisational identity</h3>
              <p className="mt-1 text-[0.9rem] text-paper/65">
                The details a partner needs before the first conversation.
              </p>
            </div>
            <dl className="divide-y divide-ink/10">
              {REGISTRY.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4 px-7 py-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-leaf-soft text-leaf">
                    <Icon size={18} />
                  </span>
                  <dt className="flex-1 text-[0.92rem] text-stone">{label}</dt>
                  <dd className="text-right font-display text-[0.98rem] font-semibold text-ink tnum">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="border-t border-ink/10 bg-paper px-7 py-5">
              <p className="text-[0.82rem] text-stone">Head office</p>
              <p className="mt-1 text-[0.95rem] font-medium leading-relaxed text-ink">
                {ORG.headquarters.line1}
                <br />
                {ORG.headquarters.line2}, {ORG.headquarters.state}, {ORG.headquarters.country}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
