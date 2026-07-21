import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  actionLabel,
  actionHref,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#5B2C83]/20 bg-[#FFF9F7] px-6 py-16 text-center",
        className
      )}
    >
      <div
        className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#5B2C83]/10 text-[#5B2C83]"
        aria-hidden="true"
      >
        {icon ?? <Inbox className="h-7 w-7" />}
      </div>
      <h3 className="font-serif text-xl font-semibold text-[#252525]">
        {title}
      </h3>
      {description && (
        <p className="mt-2 max-w-md text-[#252525]/70">{description}</p>
      )}
      {actionLabel && actionHref && (
        <Button href={actionHref} className="mt-6">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
