import { Building2, HeartHandshake, Phone, ShieldCheck } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CONTACTS, DONATION, ORG } from "@/data/org";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-white/10 py-4 last:border-b-0">
      <dt className="text-[0.88rem] text-paper/60">{label}</dt>
      <dd className="text-right font-display text-[1.05rem] font-semibold text-paper tnum">{value}</dd>
    </div>
  );
}

export function Donate() {
  const ready = Boolean(DONATION.accountNumber && DONATION.bank && DONATION.accountName);

  return (
    <Section id="donate" className="bg-paper">
      <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <SectionHeading
            kicker="Support the work"
            title="A transfer goes further here than it does in a budget line."
            lede="SCAF works where the gap is widest and the overheads are smallest — a community organisation with its office in the neighbourhood it serves. Every naira is accounted for to the communities and partners we answer to."
            accent="heart"
          />

          <Reveal className="mt-9">
            <ul className="space-y-4">
              {[
                "Keeping a girl in school past the point where families usually withdraw her.",
                "Reaching a woman who has experienced violence with a referral pathway that works.",
                "Getting a mother to a skilled attendant for a delivery that would otherwise happen at home.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[0.97rem] leading-relaxed text-stone">
                  <HeartHandshake size={18} className="mt-[3px] shrink-0 text-heart" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div className="rounded-card bg-ink p-7 text-paper shadow-lift sm:p-9">
            <h3 className="font-display text-display-md text-paper">Give by bank transfer</h3>

            {ready ? (
              <dl className="mt-7">
                <Row label="Bank" value={DONATION.bank} />
                <Row label="Account name" value={DONATION.accountName} />
                <Row label="Account number" value={DONATION.accountNumber} />
              </dl>
            ) : (
              <p className="mt-6 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 text-[0.93rem] leading-relaxed text-paper/75">
                The foundation&rsquo;s donation account is being finalised. Until it is published
                here, please call the office and we will confirm the details with you directly.
              </p>
            )}

            <p className="mt-7 flex items-start gap-3 border-t border-white/10 pt-6 text-[0.88rem] leading-relaxed text-paper/65">
              <ShieldCheck size={16} className="mt-[3px] shrink-0 text-leaf" />
              <span>{DONATION.note}</span>
            </p>

            <div className="mt-6 space-y-3 border-t border-white/10 pt-6">
              <p className="flex items-start gap-3 text-[0.88rem] text-paper/65">
                <Building2 size={16} className="mt-[2px] shrink-0 text-sun" />
                <span>
                  {ORG.registrar} &middot;{" "}
                  <span className="font-medium text-paper tnum">{ORG.registrationNumber}</span>
                </span>
              </p>
              {CONTACTS[0].phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-[0.88rem] text-paper/65 transition-colors hover:text-paper tnum"
                >
                  <Phone size={16} className="shrink-0 text-sun" />
                  {phone}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
