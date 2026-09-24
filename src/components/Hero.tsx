"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, ShieldCheck } from "lucide-react";
import { ORG } from "@/data/org";
import { CREDENTIALS } from "@/data/indicators";

/**
 * The page's one orchestrated motion moment: the three brand arcs sweep in at
 * 120-degree intervals — the rotational gesture of the SCAF mark itself — and
 * the identity plate settles between them. Nothing else on the page animates
 * without the reader asking for it.
 */
const ARCS = [
  { color: "#2FA3DC", rotate: 0, delay: 0.15 },
  { color: "#EE8022", rotate: 120, delay: 0.3 },
  { color: "#1E9E4A", rotate: 240, delay: 0.45 },
];

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden bg-ink pt-[72px] text-paper">
      <div className="contours pointer-events-none absolute inset-0" aria-hidden />
      <div className="grain pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div
        className="pointer-events-none absolute -right-40 top-10 h-[540px] w-[540px] rounded-full bg-leaf/10 blur-3xl"
        aria-hidden
      />

      <div className="shell relative grid gap-16 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-28">
        <div>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[0.82rem] text-paper/80"
          >
            <MapPin size={14} className="text-sun" />
            Jimeta-Yola, Adamawa State, Nigeria
          </motion.p>

          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-6 text-display-xl text-paper"
          >
            Together for better lives.
          </motion.h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-7 max-w-[54ch] text-lede text-paper/75"
          >
            {ORG.lede}
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <a href="#contact" className="btn-primary">
              Partner with us
            </a>
            <a href="#about" className="btn-ghost">
              Read our profile
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.2, 0.65, 0.3, 1] }}
          className="mx-auto w-full max-w-[400px]"
        >
          {/* The mark sits inside the ring rather than in a plate that fills it:
              three arcs sweep in around a disc, and the hands read directly on
              the dark ground because the mark is cut out with no background. */}
          <div className="relative mx-auto aspect-square w-full">
            <div
              className="absolute inset-[12%] rounded-full bg-leaf/10 blur-2xl"
              aria-hidden
            />

            <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden>
              {ARCS.map((arc) => (
                <motion.circle
                  key={arc.rotate}
                  cx="200"
                  cy="200"
                  r="182"
                  fill="none"
                  stroke={arc.color}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="300 844"
                  style={{ transformOrigin: "200px 200px" }}
                  initial={reduced ? false : { rotate: arc.rotate - 45, opacity: 0, pathLength: 0 }}
                  animate={{ rotate: arc.rotate, opacity: 0.85, pathLength: 1 }}
                  transition={{ duration: 1, delay: arc.delay, ease: [0.2, 0.65, 0.3, 1] }}
                />
              ))}
            </svg>

            <div
              className="absolute inset-[13%] rounded-full border border-white/10 bg-white/[0.05]"
              aria-hidden
            />

            <Image
              src="/scaf-mark.png"
              alt={`${ORG.name} logo`}
              width={835}
              height={835}
              priority
              className="absolute inset-[22%] h-auto w-[56%]"
            />
          </div>

          <p className="mx-auto mt-9 flex max-w-[380px] items-start gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-[0.85rem] leading-relaxed text-paper/70">
            <ShieldCheck size={16} className="mt-[3px] shrink-0 text-leaf" />
            <span>
              Registered with the {ORG.registrar} as{" "}
              <span className="font-semibold text-paper tnum">{ORG.registrationNumber}</span> on{" "}
              {ORG.registeredOn}.
            </span>
          </p>
        </motion.div>
      </div>

      {/* Credential rail */}
      <div className="relative border-t border-white/10">
        <div className="shell grid grid-cols-2 divide-white/10 sm:grid-cols-4 sm:divide-x">
          {CREDENTIALS.map((item, i) => (
            <div
              key={item.label}
              className={`px-0 py-6 sm:px-6 ${i === 0 ? "sm:pl-0" : ""} ${
                i < 2 ? "border-b border-white/10 sm:border-b-0" : ""
              }`}
            >
              <p className="text-[0.8rem] text-paper/45">{item.label}</p>
              <p className="mt-1 font-display text-xl font-semibold text-paper tnum">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
