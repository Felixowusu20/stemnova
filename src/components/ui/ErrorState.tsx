import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load this content. Please try again.",
  onRetry,
  retryLabel = "Try again",
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-[#14B8A6]/30 bg-[#14B8A6]/5 px-6 py-12 text-center",
        className
      )}
      role="alert"
    >
      <div
        className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#14B8A6]/10 text-[#14B8A6]"
        aria-hidden="true"
      >
        <AlertCircle className="h-7 w-7" />
      </div>
      <h3 className="font-display text-xl font-semibold text-[#0A2540]">
        {title}
      </h3>
      <p className="mt-2 max-w-md text-[#0A2540]/70">{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry} className="mt-6">
          {retryLabel}
        </Button>
      )}
    </div>
  );
}
