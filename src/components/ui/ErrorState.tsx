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
        "flex flex-col items-center justify-center rounded-2xl border border-[#D94F70]/30 bg-[#D94F70]/5 px-6 py-12 text-center",
        className
      )}
      role="alert"
    >
      <div
        className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#D94F70]/10 text-[#D94F70]"
        aria-hidden="true"
      >
        <AlertCircle className="h-7 w-7" />
      </div>
      <h3 className="font-serif text-xl font-semibold text-[#252525]">
        {title}
      </h3>
      <p className="mt-2 max-w-md text-[#252525]/70">{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry} className="mt-6">
          {retryLabel}
        </Button>
      )}
    </div>
  );
}
