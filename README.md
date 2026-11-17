# Sulayham Care Foundation

The organisation's website, built from the SCAF organisational profile
document. Next.js 14 (App Router), TypeScript, Tailwind CSS.

---

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build
npm start          # serve the production build
```

Node 18.18 or newer.

> The first build downloads two typefaces from Google Fonts, so the machine
> running the build needs internet access. On an air-gapped server, switch
> `src/app/layout.tsx` to `next/font/local` and commit the font files.

## Deploy

Any Node host works. On Vercel, push the repository and accept the defaults —
no environment variables are required for the site to run.

---

## Where the content lives

Nothing that a non-developer needs to change is buried in a component. Four
files hold everything:

| File | What it holds | Who edits it |
| --- | --- | --- |
| `src/data/org.ts` | Every word of SCAF's own profile: background, vision, mission, values, thematic areas, objectives, organogram, contacts | Communications |
| `src/data/indicators.ts` | The published statistics and their sources | Programmes / M&E |
| `src/data/lgas.ts` | The 21 LGAs, and which ones SCAF works in | Programmes |
| `src/data/map.ts` | Generated map geometry | Nobody — see below |

### Updating the coverage map

Open `src/data/lgas.ts` and change the `coverage` value on any LGA:

```ts
{ name: "Mubi North", hq: "Mubi", district: "North", …, coverage: "planned" },
```

- `"active"` — currently implementing (green)
- `"planned"` — in the pipeline (orange)
- `"none"` — not yet reached (grey)

The map, the legend, the filter chips and the "SCAF currently implements in N of
21 LGAs" sentence all read from this one field. The four active LGAs were
confirmed with the programmes team in November 2026; re-check them whenever
coverage changes, because the page should never claim presence the organisation
does not have.

Everything else in that file (headquarters, senatorial district, ward counts,
coordinates) is reference data and should not need changing.

### Updating a statistic

Each block in `src/data/indicators.ts` carries its own `source`. Change the
number and the source together — the page renders the source line under every
chart, which is the reason a funder can trust the figure. Bump `DATA_AS_OF` when
you review the set.

### Do not hand-edit `map.ts`

The SVG paths were generated from Natural Earth 10m administrative boundaries
(public domain) and projected to a fixed viewBox. LGA marker positions come from
official ward coordinates. Regenerate the file rather than adjusting paths by
hand.

---

## Structure

```
src/
  app/
    layout.tsx            fonts, metadata, skip link
    page.tsx              section order
    globals.css           tokens, .shell, .rail, buttons, reduced motion
    api/contact/route.ts  form endpoint — validation + honeypot
  components/
    Header  Hero  About  VisionMission  ThematicAreas
    ContextData           the five charts
    CoverageMap           Nigeria locator + Adamawa, 21 LGAs
    Organogram  Contact  Footer
    ui/  Section  Reveal  Counter
  data/                   org · indicators · lgas · map
  lib/cn.ts
public/
  scaf-mark.png           the mark, cut out of the logo for use on any ground
  scaf-logo.jpeg          the full logo incl. wordmark — social cards only
  scaf-organogram.png     the original chart, kept as the source document
```

---

## Wiring up the contact form

`src/app/api/contact/route.ts` validates the submission, rejects bots via a
honeypot field, and logs the enquiry — so the form works the moment you deploy,
it just does not deliver yet. Replace the marked block with your provider:

```ts
// ---- Replace this block with real delivery ----
console.info("[SCAF enquiry]", { … });
// -----------------------------------------------
```

Resend, SendGrid, Postmark or SMTP through Nodemailer all drop in here. Put the
API key in `.env.local` and read it with `process.env`.

---

## Design notes

**Colour comes from your own mark.** The three hands give leaf green, orange and
sky blue; the wordmark green pushed to near-black gives `ink`, which anchors the
hero, the structure section and the footer. The red of the heart is reserved for
gender-based violence and protection content and is used nowhere else, so the
colour carries meaning rather than decoration.

**Typography** is Bricolage Grotesque for display and Instrument Sans for body —
two clearly distinct faces rather than one family doing both jobs.

**Motion is spent in one place.** The hero's three arcs sweep in at 120° apart,
echoing the rotational gesture of the SCAF mark. Everything after that is either
a quiet scroll reveal or motion you triggered yourself: hovering an LGA or
filtering by senatorial district.

`Reveal` deliberately does not use a stock `whileInView` helper. It checks the
element's position synchronously on mount and keeps scroll and resize
fallbacks, so a fast scroll, a restored scroll position or a back-forward cache
restore can never leave a section stranded at zero opacity. Visible content
always wins over content animating.

**Accessibility.** Skip link, visible focus rings, keyboard-reachable map
markers with labels, `aria-expanded` on every disclosure, real `<label>`
elements on every field, and `prefers-reduced-motion` honoured throughout.

---

## Sources for the figures on the page

- Multidimensional poverty by state — National Bureau of Statistics, Nigeria MPI 2022
- Out-of-school children — UNICEF Nigeria, 2024 and 2025
- Maternal health coverage — Nigeria Demographic and Health Survey 2018 and 2023–24
- Gender-based violence — NDHS 2024; NAPTIP case data
- Humanitarian funding — UN OCHA Nigeria, 2026 HNRP launch
- Adamawa reference data — Adamawa State Bureau of Statistics; INEC administrative directory
- Boundaries — Natural Earth 10m admin-1 (public domain)
