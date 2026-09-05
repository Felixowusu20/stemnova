import { cn } from "@/lib/utils";

const CHART_COLORS = [
  "#0a2540",
  "#2563eb",
  "#14b8a6",
  "#0d9488",
  "#1d4ed8",
  "#334155",
  "#0891b2",
  "#475569",
  "#0f766e",
] as const;

interface BarItem {
  label: string;
  value: number;
}

interface ImpactBarChartProps {
  items: BarItem[];
  className?: string;
  valueSuffix?: string;
}

export function ImpactBarChart({
  items,
  className,
  valueSuffix = "%",
}: ImpactBarChartProps) {
  const max = Math.max(...items.map((item) => item.value), 1);

  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item, index) => (
        <div key={item.label}>
          <div className="mb-1.5 flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-navy">{item.label}</p>
            <p className="shrink-0 font-display text-sm font-bold text-navy">
              {item.value.toLocaleString()}
              {valueSuffix}
            </p>
          </div>
          <div
            className="h-2.5 overflow-hidden rounded-full bg-navy/8"
            role="progressbar"
            aria-valuenow={item.value}
            aria-valuemin={0}
            aria-valuemax={max}
            aria-label={`${item.label}: ${item.value.toLocaleString()}${valueSuffix}`}
          >
            <div
              className="h-full rounded-full transition-[width] duration-700"
              style={{
                width: `${(item.value / max) * 100}%`,
                backgroundColor: CHART_COLORS[index % CHART_COLORS.length],
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

interface DonutItem {
  label: string;
  value: number;
}

interface ImpactDonutChartProps {
  items: DonutItem[];
  className?: string;
}

export function ImpactDonutChart({ items, className }: ImpactDonutChartProps) {
  const rawTotal = items.reduce((sum, item) => sum + item.value, 0);
  const total = rawTotal || 1;
  const radius = 70;
  const stroke = 22;
  const circumference = 2 * Math.PI * radius;

  let offset = 0;
  const segments = items.map((item, index) => {
    const length = (item.value / total) * circumference;
    const segment = {
      ...item,
      color: CHART_COLORS[index % CHART_COLORS.length],
      dasharray: `${length} ${circumference - length}`,
      dashoffset: -offset,
    };
    offset += length;
    return segment;
  });

  return (
    <div
      className={cn(
        "grid items-center gap-8 md:grid-cols-[220px_1fr]",
        className
      )}
    >
      <div className="relative mx-auto h-52 w-52">
        <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="rgba(10,37,64,0.08)"
            strokeWidth={stroke}
          />
          {rawTotal > 0
            ? segments.map((segment) => (
                <circle
                  key={segment.label}
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  stroke={segment.color}
                  strokeWidth={stroke}
                  strokeDasharray={segment.dasharray}
                  strokeDashoffset={segment.dashoffset}
                  strokeLinecap="butt"
                />
              ))
            : null}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="font-display text-3xl font-bold text-navy">
            {rawTotal}%
          </p>
          <p className="text-xs font-medium text-navy/60">Allocated</p>
        </div>
      </div>

      <ul className="space-y-3">
        {segments.map((segment) => (
          <li key={segment.label} className="flex items-start gap-3">
            <span
              className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: segment.color }}
              aria-hidden="true"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-sm font-medium text-navy">{segment.label}</p>
                <p className="font-display text-sm font-bold text-navy">
                  {segment.value}%
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
