/**
 * Site typography themes.
 * Change ACTIVE_TYPOGRAPHY to switch the live heading/body pair.
 *
 * option-1 — Warm & Trustworthy (Lora + Inter) — best for non-profits
 * option-2 — Bold & Action-Oriented (Montserrat + Lato) — global causes
 * option-3 — Solid & Structural (Plus Jakarta Sans + IBM Plex Sans) — tech/corporate
 */
export type TypographyOption = "option-1" | "option-2" | "option-3";

export const ACTIVE_TYPOGRAPHY: TypographyOption = "option-1";

export const TYPOGRAPHY_OPTIONS: Record<
  TypographyOption,
  { label: string; heading: string; body: string; description: string }
> = {
  "option-1": {
    label: "Warm & Trustworthy",
    heading: "Lora",
    body: "Inter",
    description: "Elegant serif headings with clean sans body — best for non-profits.",
  },
  "option-2": {
    label: "Bold & Action-Oriented",
    heading: "Montserrat",
    body: "Lato",
    description: "Bold uppercase headings with approachable body — best for global causes.",
  },
  "option-3": {
    label: "Solid & Structural",
    heading: "Plus Jakarta Sans",
    body: "IBM Plex Sans",
    description: "Modern geometric headings with technical body — best for tech/corporate.",
  },
};
