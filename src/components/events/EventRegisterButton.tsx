"use client";

import { useState } from "react";
import { EventRegistrationForm } from "@/components/forms/EventRegistrationForm";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/utils";
import type { Event } from "@/types";

interface EventRegisterButtonProps {
  event: Event;
  className?: string;
  variant?: "primary" | "teal" | "outline" | "secondary";
  size?: "sm" | "md" | "lg";
  label?: string;
}

const variantClass = {
  primary:
    "bg-navy text-white hover:bg-navy/90 focus-visible:ring-blue",
  teal: "bg-teal text-white hover:bg-teal/90 focus-visible:ring-teal",
  outline:
    "border-2 border-navy text-navy bg-transparent hover:bg-navy/5 focus-visible:ring-blue",
  secondary:
    "bg-blue text-white hover:bg-blue/90 focus-visible:ring-blue",
};

const sizeClass = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export function EventRegisterButton({
  event,
  className,
  variant = "primary",
  size = "md",
  label = "Register",
}: EventRegisterButtonProps) {
  const [open, setOpen] = useState(false);

  if (event.isPast || !event.registrationRequired) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          variantClass[variant],
          sizeClass[size],
          className
        )}
      >
        {label}
      </button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Event registration"
        size="lg"
      >
        <EventRegistrationForm event={event} />
      </Modal>
    </>
  );
}
