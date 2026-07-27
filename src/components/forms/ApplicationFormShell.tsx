import { cn } from "@/lib/utils";
import { MOCK_FORM_NOTICE } from "@/components/forms/formStyles";
import type { ReactNode } from "react";

interface ApplicationFormShellProps {
  children: ReactNode;
  className?: string;
  /** When false, hides the mock form notice banner. */
  showNotice?: boolean;
}

/** Card wrapper for mock application forms. */
export function ApplicationFormShell({
  children,
  className,
  showNotice = true,
}: ApplicationFormShellProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-navy/8 bg-white p-6 shadow-sm sm:p-8 lg:p-10",
        className
      )}
    >
      {showNotice && (
        <p className="mb-6 rounded-xl bg-light px-4 py-3 text-xs leading-relaxed text-navy/55">
          {MOCK_FORM_NOTICE}
        </p>
      )}
      {children}
    </div>
  );
}
