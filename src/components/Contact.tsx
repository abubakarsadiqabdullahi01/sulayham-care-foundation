"use client";

import { useState } from "react";
import { Check, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CONTACTS, ORG } from "@/data/org";

type Status = "idle" | "sending" | "sent" | "error";

const INTERESTS = [
  "Funding or grant partnership",
  "Implementation partnership",
  "Government or coordination",
  "Volunteering",
  "Something else",
];

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      setMessage("Thank you. Your message has reached the programmes team and someone will reply by email.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage(
        `That did not send. Please email or call the office directly on ${CONTACTS[0].phones[0]} and we will pick it up.`,
      );
    }
  }

  return (
    <Section id="contact" className="bg-paper">
      <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <SectionHeading
            kicker="Get in touch"
            title="Start a conversation with the office in Jimeta."
            lede="Whether you are a funder, an implementing partner, a government department or a neighbour with a problem worth solving, the same people answer."
            accent="leaf"
          />

          <Reveal className="mt-10">
            <div className="card p-7">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-leaf-soft text-leaf">
                  <MapPin size={19} />
                </span>
                <div>
                  <h3 className="font-display text-lg text-ink">Head office</h3>
                  <p className="mt-1 text-[0.95rem] leading-relaxed text-stone">
                    {ORG.headquarters.line1}
                    <br />
                    {ORG.headquarters.line2}
                    <br />
                    {ORG.headquarters.state}, {ORG.headquarters.country}
                  </p>
                </div>
              </div>

              <div className="mt-7 space-y-6 border-t border-ink/10 pt-6">
                {CONTACTS.map((person) => (
                  <div key={person.name} className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sun-soft text-sun">
                      <Phone size={19} />
                    </span>
                    <div>
                      <p className="font-display text-[1.02rem] text-ink">{person.name}</p>
                      <p className="text-[0.85rem] text-stone-light">{person.role}</p>
                      <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                        {person.phones.map((phone) => (
                          <a
                            key={phone}
                            href={`tel:${phone.replace(/\s/g, "")}`}
                            className="text-[0.92rem] font-medium text-ink underline decoration-ink/20 underline-offset-4 hover:decoration-ink tnum"
                          >
                            {phone}
                          </a>
                        ))}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <form onSubmit={onSubmit} className="card relative p-7 shadow-lift sm:p-9">
            <h3 className="font-display text-display-md text-ink">Send a message</h3>
            <p className="mt-2 text-[0.95rem] text-stone">
              Tell us what you are working on. We reply to every enquiry.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label htmlFor="name" className="mb-2 block text-[0.88rem] font-medium text-ink">
                  Your name
                </label>
                <input id="name" name="name" required autoComplete="name" className="field" />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="organisation" className="mb-2 block text-[0.88rem] font-medium text-ink">
                  Organisation
                </label>
                <input id="organisation" name="organisation" autoComplete="organization" className="field" />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="email" className="mb-2 block text-[0.88rem] font-medium text-ink">
                  Email
                </label>
                <input id="email" name="email" type="email" required autoComplete="email" className="field" />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="phone" className="mb-2 block text-[0.88rem] font-medium text-ink">
                  Phone
                </label>
                <input id="phone" name="phone" type="tel" autoComplete="tel" className="field" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="interest" className="mb-2 block text-[0.88rem] font-medium text-ink">
                  What is this about?
                </label>
                <select id="interest" name="interest" className="field" defaultValue={INTERESTS[0]}>
                  {INTERESTS.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="mb-2 block text-[0.88rem] font-medium text-ink">
                  Message
                </label>
                <textarea id="message" name="message" rows={5} required className="field resize-y" />
              </div>
            </div>

            {/* Honeypot: hidden from people, irresistible to bots. */}
            <div className="absolute left-[-9999px]" aria-hidden>
              <label htmlFor="company">Company</label>
              <input id="company" name="company" tabIndex={-1} autoComplete="off" />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-ink mt-7 w-full disabled:opacity-60 sm:w-auto"
            >
              {status === "sending" ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Sending
                </>
              ) : (
                <>
                  <Mail size={17} />
                  Send message
                </>
              )}
            </button>

            {status === "sent" || status === "error" ? (
              <p
                role="status"
                className={`mt-5 flex items-start gap-2 rounded-xl px-4 py-3 text-[0.9rem] leading-relaxed ${
                  status === "sent" ? "bg-leaf-soft text-ink" : "bg-heart-soft text-ink"
                }`}
              >
                {status === "sent" ? <Check size={16} className="mt-[3px] shrink-0 text-leaf" /> : null}
                {message}
              </p>
            ) : null}
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
