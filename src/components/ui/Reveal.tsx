"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * One reveal primitive for the whole page.
 *
 * Deliberately not framer-motion's `whileInView`: this version checks the
 * element's position synchronously on mount and keeps a scroll fallback, so
 * content can never end up stranded at zero opacity if a fast scroll, a restored
 * scroll position or a bfcache restore causes the observer callback to be
 * missed. Content being visible always wins over content animating.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  y = 16,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      setReduced(true);
      setShown(true);
      return;
    }

    const node = ref.current;
    if (!node) {
      setShown(true);
      return;
    }

    let done = false;
    const show = () => {
      if (done) return;
      done = true;
      setShown(true);
      observer.disconnect();
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };

    // Anything already at or above the fold reveals on the spot.
    const check = () => {
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight - 40 && rect.bottom > 0) show();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) show();
      },
      { rootMargin: "0px 0px -40px 0px", threshold: 0.01 },
    );

    observer.observe(node);
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : `translateY(${y}px)`,
        transition: reduced
          ? undefined
          : `opacity 560ms cubic-bezier(.2,.65,.3,1) ${delay}s, transform 560ms cubic-bezier(.2,.65,.3,1) ${delay}s`,
        willChange: shown ? undefined : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
