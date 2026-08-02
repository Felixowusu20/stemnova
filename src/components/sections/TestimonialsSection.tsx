"use client";

import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { TestimonialShareForm } from "@/components/forms/TestimonialShareForm";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  title?: string;
  description?: string;
  className?: string;
}

export function TestimonialsSection({
  testimonials,
  title = "Voices from the STEMNova Community",
  description = "Hear from students, teachers, and researchers shaping Africa's scientific future. Then share your own story or idea.",
  className,
}: TestimonialsSectionProps) {
  return (
    <section className={cn("bg-light py-16 sm:py-20", className)}>
      <Container>
        <SectionHeading
          title={title}
          description={description}
          align="center"
          className="mb-10"
        />

        <ul className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <li key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-12 max-w-3xl">
          <TestimonialShareForm />
        </div>
      </Container>
    </section>
  );
}
