import {
  Atom,
  Bot,
  Brain,
  Cpu,
  FileText,
  FlaskConical,
  Leaf,
  Network,
} from "lucide-react";
import { researchAreas } from "@/content";

const researchIcons = {
  atom: Atom,
  brain: Brain,
  cpu: Cpu,
  flask: FlaskConical,
  bot: Bot,
  leaf: Leaf,
  file: FileText,
  network: Network,
} as const;

export function ResearchNichesMap() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
      {researchAreas.map((area, index) => {
        const Icon = researchIcons[area.icon];

        return (
          <li key={area.id}>
            <article className="flex h-full flex-col rounded-2xl border border-navy/10 bg-white p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-teal">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-navy">
                {area.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-navy/70">
                {area.description}
              </p>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
