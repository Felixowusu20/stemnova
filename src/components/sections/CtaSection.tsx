import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface CtaSectionProps {
  title?: string;
  description?: string;
  className?: string;
}

export function CtaSection({
  title = "Join Our Mission",
  description = "Help STEMNova discover scientific talent, develop research leaders, and advance STEM excellence across Africa. Donate, mentor, volunteer, or partner with us.",
  className,
}: CtaSectionProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-navy py-20 sm:py-24",
        className
      )}
    >
      <div
        className="absolute inset-0 opacity-30"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, #2563EB 0%, transparent 45%), radial-gradient(circle at 80% 50%, #14B8A6 0%, transparent 45%)",
        }}
      />
      <Container className="relative text-center">
        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/85">
          {description}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/donate" variant="teal" size="lg">
            Support STEMNova
          </Button>
          <Button
            href="/get-involved"
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white/10"
          >
            Get Involved
          </Button>
          <Button
            href="/partner"
            variant="ghost"
            size="lg"
            className="text-white hover:bg-white/10"
          >
            Partner With Us
          </Button>
        </div>
      </Container>
    </section>
  );
}
