"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { ORG } from "@/data/org";

const NAV = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Our work" },
  { href: "#field", label: "In the field" },
  { href: "#context", label: "The need" },
  { href: "#coverage", label: "Where we work" },
  { href: "#structure", label: "Structure" },
  { href: "#donate", label: "Donate" },
];

export function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        solid ? "bg-ink/95 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="shell flex h-[72px] items-center justify-between gap-6">
        <a href="#top" className="flex items-center gap-3" aria-label={`${ORG.name} home`}>
          <span className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/10 p-[7px]">
            <Image
              src="/scaf-mark.png"
              alt=""
              width={44}
              height={44}
              className="h-full w-full object-contain"
              priority
            />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-[1.05rem] font-bold text-paper">{ORG.shortName}</span>
            <span className="hidden text-[0.72rem] text-paper/60 sm:block">Sulayham Care Foundation</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[0.92rem] font-medium text-paper/75 transition-colors hover:text-paper"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#contact" className="btn-primary hidden sm:inline-flex">
            Partner with us
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-xl border border-white/20 text-paper lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-white/10 bg-ink lg:hidden">
          <nav className="shell flex flex-col py-4" aria-label="Primary mobile">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/5 py-4 font-display text-lg text-paper"
              >
                {item.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-5">
              Partner with us
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
