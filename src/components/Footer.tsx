import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
import { CONTACTS, ORG, THEMATIC_AREAS } from "@/data/org";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Our work" },
  { href: "#context", label: "The need" },
  { href: "#coverage", label: "Where we work" },
  { href: "#structure", label: "Structure" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-paper">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr] md:gap-10">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-14 w-14 place-items-center rounded-full border border-white/15 bg-white/10 p-2">
              <Image
                src="/scaf-mark.png"
                alt=""
                width={56}
                height={56}
                className="h-full w-full object-contain"
              />
            </span>
            <div>
              <p className="font-display text-lg font-bold">{ORG.name}</p>
              <p className="text-[0.85rem] text-paper/60">{ORG.tagline}</p>
            </div>
          </div>
          <p className="mt-6 max-w-[42ch] text-[0.92rem] leading-relaxed text-paper/65">
            {ORG.type}, registered with the {ORG.registrar} as{" "}
            <span className="tnum">{ORG.registrationNumber}</span>.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-display text-[0.95rem] font-semibold text-paper">On this page</h2>
          <ul className="mt-4 space-y-2.5">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-[0.92rem] text-paper/65 transition-colors hover:text-paper">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-[0.95rem] font-semibold text-paper">Reach the office</h2>
          <p className="mt-4 flex items-start gap-2.5 text-[0.92rem] leading-relaxed text-paper/65">
            <MapPin size={16} className="mt-1 shrink-0 text-leaf" />
            <span>
              {ORG.headquarters.line1}
              <br />
              {ORG.headquarters.line2}, {ORG.headquarters.state}
            </span>
          </p>
          <ul className="mt-4 space-y-2">
            {CONTACTS[0].phones.map((phone) => (
              <li key={phone}>
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2.5 text-[0.92rem] text-paper/65 transition-colors hover:text-paper tnum"
                >
                  <Phone size={16} className="text-sun" />
                  {phone}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.82rem] text-paper/45">
            © {new Date().getFullYear()} {ORG.name}. All rights reserved.
          </p>
          <p className="text-[0.82rem] text-paper/45">
            {THEMATIC_AREAS.map((a) => a.title).join(" · ")}
          </p>
        </div>
      </div>
    </footer>
  );
}
