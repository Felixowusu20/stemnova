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
import { cn } from "@/lib/utils";
import type { ResearchArea } from "@/types";

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

function NicheNode({
  area,
  className,
}: {
  area: ResearchArea;
  className?: string;
}) {
  const Icon = researchIcons[area.icon];

  return (
    <article
      className={cn(
        "relative z-10 rounded-2xl border border-navy/10 bg-white p-5 shadow-sm",
        className
      )}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-white">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="mt-3 font-display text-base font-semibold text-navy">
        {area.title}
      </h3>
      <p className="mt-1.5 text-sm leading-snug text-navy/80">
        {area.description}
      </p>
    </article>
  );
}

export function ResearchNichesMap() {
  const [a1, a2, a3, a4, a5, a6, a7, a8] = researchAreas;

  return (
    <div>
      {/* Mobile: connected vertical path */}
      <ol className="relative mx-auto max-w-md space-y-0 lg:hidden">
        <div
          className="absolute bottom-8 left-[1.375rem] top-6 w-px bg-gradient-to-b from-navy via-blue to-teal"
          aria-hidden="true"
        />
        {researchAreas.map((area, index) => {
          const Icon = researchIcons[area.icon];
          return (
            <li key={area.id} className="relative flex gap-4 pb-7 last:pb-0">
              <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-white ring-4 ring-white">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="rounded-2xl border border-navy/10 bg-light p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-teal">
                  Niche {index + 1}
                </p>
                <h3 className="mt-1 font-display text-base font-semibold text-navy">
                  {area.title}
                </h3>
                <p className="mt-1 text-sm leading-snug text-navy/80">
                  {area.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Desktop: constellation network */}
      <div className="relative mx-auto hidden max-w-5xl lg:block">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 1000 760"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="researchLine" x1="0" y1="0" x2="1000" y2="760">
              <stop stopColor="#0a2540" />
              <stop offset="0.45" stopColor="#2563eb" />
              <stop offset="1" stopColor="#14b8a6" />
            </linearGradient>
          </defs>

          {/* Outer constellation ring */}
          <path
            d="M500 90
               C700 90, 880 180, 900 320
               C920 460, 780 600, 560 650
               C340 700, 140 620, 110 430
               C80 240, 260 90, 500 90 Z"
            stroke="url(#researchLine)"
            strokeWidth="2"
            strokeDasharray="7 10"
            opacity="0.55"
          />

          {/* Hub spokes */}
          <path d="M500 280 L280 180" stroke="#2563eb" strokeWidth="1.75" strokeDasharray="4 6" />
          <path d="M500 280 L720 180" stroke="#2563eb" strokeWidth="1.75" strokeDasharray="4 6" />
          <path d="M500 280 L820 340" stroke="#14b8a6" strokeWidth="1.75" strokeDasharray="4 6" />
          <path d="M500 280 L760 520" stroke="#14b8a6" strokeWidth="1.75" strokeDasharray="4 6" />
          <path d="M500 280 L500 560" stroke="#0a2540" strokeWidth="1.75" strokeDasharray="4 6" />
          <path d="M500 280 L240 520" stroke="#14b8a6" strokeWidth="1.75" strokeDasharray="4 6" />
          <path d="M500 280 L180 340" stroke="#2563eb" strokeWidth="1.75" strokeDasharray="4 6" />

          {/* Soft node dots on connectors */}
          <circle cx="500" cy="280" r="5" fill="#14b8a6" />
          <circle cx="280" cy="180" r="3.5" fill="#2563eb" />
          <circle cx="720" cy="180" r="3.5" fill="#2563eb" />
          <circle cx="820" cy="340" r="3.5" fill="#14b8a6" />
          <circle cx="760" cy="520" r="3.5" fill="#14b8a6" />
          <circle cx="500" cy="560" r="3.5" fill="#0a2540" />
          <circle cx="240" cy="520" r="3.5" fill="#14b8a6" />
          <circle cx="180" cy="340" r="3.5" fill="#2563eb" />
        </svg>

        <div className="relative grid h-[760px] grid-cols-6 grid-rows-5 gap-4 px-2">
          <div className="col-span-2 col-start-1 row-start-1 flex items-start justify-start pt-4">
            {a1 && <NicheNode area={a1} className="w-[220px]" />}
          </div>
          <div className="col-span-2 col-start-5 row-start-1 flex items-start justify-end pt-4">
            {a2 && <NicheNode area={a2} className="w-[220px]" />}
          </div>

          <div className="col-span-2 col-start-3 row-start-2 row-span-2 flex items-center justify-center">
            <div className="relative z-10 flex h-44 w-44 flex-col items-center justify-center rounded-full border-2 border-teal/35 bg-navy px-5 text-center shadow-lg">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-teal">
                STEMNova
              </p>
              <p className="mt-2 font-display text-sm font-semibold leading-snug text-white">
                Connected research niches for African talent
              </p>
            </div>
          </div>

          <div className="col-span-2 col-start-1 row-start-2 flex items-center justify-start">
            {a3 && <NicheNode area={a3} className="w-[210px]" />}
          </div>
          <div className="col-span-2 col-start-5 row-start-2 flex items-center justify-end">
            {a4 && <NicheNode area={a4} className="w-[210px]" />}
          </div>

          <div className="col-span-2 col-start-1 row-start-4 flex items-end justify-start">
            {a5 && <NicheNode area={a5} className="w-[210px]" />}
          </div>
          <div className="col-span-2 col-start-5 row-start-4 flex items-end justify-end">
            {a6 && <NicheNode area={a6} className="w-[210px]" />}
          </div>

          <div className="col-span-2 col-start-2 row-start-5 flex items-end justify-center pb-2">
            {a7 && <NicheNode area={a7} className="w-[220px]" />}
          </div>
          <div className="col-span-2 col-start-4 row-start-5 flex items-end justify-center pb-2">
            {a8 && <NicheNode area={a8} className="w-[220px]" />}
          </div>
        </div>
      </div>
    </div>
  );
}
