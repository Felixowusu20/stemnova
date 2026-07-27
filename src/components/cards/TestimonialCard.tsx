import Image from "next/image";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export function TestimonialCard({
  testimonial,
  className,
}: TestimonialCardProps) {
  return (
    <blockquote
      className={cn(
        "flex h-full flex-col rounded-xl border border-navy/10 bg-white p-5",
        className
      )}
    >
      <Quote className="h-6 w-6 text-teal/70" aria-hidden="true" />

      <p className="mt-3 flex-1 text-sm leading-relaxed text-navy">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <footer className="mt-5 flex items-center gap-3 border-t border-navy/10 pt-4">
        {testimonial.imageUrl && (
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <Image
              src={testimonial.imageUrl}
              alt=""
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
        )}
        <div>
          <cite className="not-italic text-sm font-semibold text-navy">
            {testimonial.author}
          </cite>
          <p className="text-xs text-navy/65">
            {testimonial.role}
            {testimonial.organization
              ? `, ${testimonial.organization}`
              : null}
          </p>
        </div>
      </footer>
    </blockquote>
  );
}
