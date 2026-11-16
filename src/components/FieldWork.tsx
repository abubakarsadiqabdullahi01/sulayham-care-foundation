import Image from "next/image";
import { Handshake } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { FIELD_WORK } from "@/data/org";

export function FieldWork() {
  const [lead, ...rest] = FIELD_WORK.photos;

  return (
    <Section id="field" className="bg-paper-deep">
      <SectionHeading
        kicker={FIELD_WORK.area}
        title={FIELD_WORK.title}
        lede={FIELD_WORK.blurb}
        accent="ink"
      />

      <Reveal className="mt-12">
        {/* From lg up the stacked pair sets the row height and the lead photo
            crops to match; below that each figure keeps its own aspect. */}
        <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
          <figure className="aspect-[4/3] overflow-hidden rounded-card border border-ink/10 bg-white lg:aspect-auto lg:h-full">
            <Image
              src={lead.src}
              alt={lead.alt}
              width={lead.width}
              height={lead.height}
              sizes="(min-width: 1024px) 62vw, 100vw"
              className="h-full w-full object-cover"
            />
          </figure>

          <div className="grid gap-4 sm:grid-cols-2 lg:h-full lg:grid-cols-1 lg:grid-rows-2">
            {rest.map((photo) => (
              <figure
                key={photo.src}
                className="aspect-[16/10] overflow-hidden rounded-card border border-ink/10 bg-white lg:aspect-auto lg:h-full"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(min-width: 1024px) 38vw, (min-width: 640px) 50vw, 100vw"
                  className="h-full w-full object-cover"
                />
              </figure>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-6 grid gap-4 rounded-card bg-ink p-7 text-paper sm:p-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <p className="font-display text-display-md text-paper">
            &ldquo;{FIELD_WORK.message}&rdquo;
          </p>
          <p className="flex items-start gap-3 text-[0.92rem] leading-relaxed text-paper/70">
            <Handshake size={18} className="mt-[3px] shrink-0 text-sun" />
            <span>
              Delivered in partnership with{" "}
              <span className="font-medium text-paper">{FIELD_WORK.partner}</span>.
            </span>
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
