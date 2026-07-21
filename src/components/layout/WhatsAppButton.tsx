import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/content";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  className?: string;
}

export function WhatsAppButton({ className }: WhatsAppButtonProps) {
  const { whatsappLink, whatsapp } = siteConfig.contact;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with us on WhatsApp at ${whatsapp}`}
      className={cn(
        "fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg",
        "transition-transform hover:scale-105 hover:shadow-xl",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2",
        "motion-safe:duration-200",
        className
      )}
    >
      <MessageCircle className="h-7 w-7" aria-hidden="true" />
    </a>
  );
}
