import Image from "next/image";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <blockquote
      className={cn(
        "flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm",
        className
      )}
    >
      <Quote
        className="h-8 w-8 text-[#5B2C83]/30"
        aria-hidden="true"
      />

      <p className="mt-4 flex-1 text-base leading-relaxed text-[#252525]/80">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <footer className="mt-6 flex items-center gap-3 border-t border-[#5B2C83]/10 pt-4">
        {testimonial.imageUrl && (
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
            <Image
              src={testimonial.imageUrl}
              alt=""
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
        )}
        <div>
          <cite className="not-italic font-semibold text-[#252525]">
            {testimonial.author}
          </cite>
          <p className="text-sm text-[#252525]/60">
            {testimonial.role}
            {testimonial.organization && ` · ${testimonial.organization}`}
          </p>
        </div>
      </footer>
    </blockquote>
  );
}
