import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Renders CMS/admin goal lines with the marked check style.
 * Any non-empty string from the backend becomes a checked list item.
 */
export function MarkedGoalList({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  const goals = items.map((item) => item.trim()).filter(Boolean);
  if (goals.length === 0) return null;

  return (
    <ul className={cn("mt-3 space-y-2.5", className)}>
      {goals.map((goal, index) => (
        <li
          key={`${index}-${goal.slice(0, 24)}`}
          className="flex gap-2.5 text-sm leading-relaxed text-navy"
        >
          <span
            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-teal/40 bg-teal/15 text-teal"
            aria-hidden="true"
          >
            <Check className="h-3 w-3 stroke-[2.5]" />
          </span>
          <span>{goal}</span>
        </li>
      ))}
    </ul>
  );
}
