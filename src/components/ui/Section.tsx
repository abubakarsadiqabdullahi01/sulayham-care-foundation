import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const RAIL: Record<string, string> = {
  leaf: "text-leaf",
  sun: "text-sun",
  sky: "text-sky",
  heart: "text-heart",
  ink: "text-ink",
  paper: "text-sun",
};

export function SectionHeading({
  kicker,
  title,
  lede,
  accent = "leaf",
  tone = "dark",
  className,
}: {
  kicker: string;
  title: string;
  lede?: string;
  accent?: keyof typeof RAIL;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div className={cn("max-w-prose", className)}>
      <div className={cn("rail", RAIL[accent])}>
        <p
          className={cn(
            "font-display text-[0.9rem] font-semibold tracking-tight",
            tone === "light" ? "text-paper/70" : "text-stone",
          )}
        >
          {kicker}
        </p>
        <h2
          className={cn(
            "mt-1 text-display-lg",
            tone === "light" ? "text-paper" : "text-ink",
          )}
        >
          {title}
        </h2>
      </div>
      {lede ? (
        <p
          className={cn(
            "mt-5 text-lede",
            tone === "light" ? "text-paper/75" : "text-stone",
          )}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-20 sm:py-28", className)}>
      <div className="shell">{children}</div>
    </section>
  );
}
