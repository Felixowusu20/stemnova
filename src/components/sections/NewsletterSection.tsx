import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface NewsletterSectionProps {
  title?: string;
  description?: string;
  className?: string;
}

export function NewsletterSection({
  title = "Stay Connected",
  description = "Subscribe for programme updates, fellowship deadlines, research insights, and event invitations from STEMNova Foundation.",
  className,
}: NewsletterSectionProps) {
  return (
    <section className={cn("py-16 sm:py-20", className)}>
      <Container>
        <div className="mx-auto max-w-2xl rounded-2xl bg-[#0A2540]/5 px-6 py-12 text-center sm:px-12">
          <h2 className="font-display text-3xl font-bold text-[#0A2540]">
            {title}
          </h2>
          <p className="mt-3 text-[#0A2540]/70">{description}</p>
          <NewsletterForm className="mt-8" />
        </div>
      </Container>
    </section>
  );
}
