"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { Event } from "@/types";

interface EventRegistrationFormProps {
  event: Event;
  className?: string;
  onSuccess?: () => void;
}

type FormStatus = "idle" | "loading" | "success";

const inputClass =
  "w-full rounded-xl border border-navy/15 bg-white px-4 py-2.5 text-sm text-navy placeholder:text-navy/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2";

const labelClass = "mb-1.5 block text-sm font-medium text-navy";

export function EventRegistrationForm({
  event,
  className,
  onSuccess,
}: EventRegistrationFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    organisation: "",
    guests: "1",
  });

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Please enter a valid email.";
    if (!form.phone.trim()) next.phone = "Phone is required.";
    const guests = parseInt(form.guests, 10);
    if (!guests || guests < 1) next.guests = "Enter at least 1 guest.";
    if (!consent) next.consent = "Please agree to continue.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    // Mock registration — real submissions will come from the admin panel flow.
    await new Promise((resolve) => setTimeout(resolve, 700));
    setStatus("success");
    onSuccess?.();
  };

  if (status === "success") {
    return (
      <div
        className={cn("rounded-2xl bg-teal/10 p-6 text-center", className)}
        role="status"
      >
        <CheckCircle2
          className="mx-auto h-10 w-10 text-teal"
          aria-hidden="true"
        />
        <p className="mt-3 font-display text-lg font-semibold text-navy">
          Registration received
        </p>
        <p className="mt-2 text-sm leading-relaxed text-navy/70">
          This is a mock confirmation for <strong>{event.title}</strong>. Live
          registration will be managed from the admin panel.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("space-y-4", className)}
      noValidate
    >
      <p className="text-sm text-navy/70">
        Register for <strong className="text-navy">{event.title}</strong> on{" "}
        {new Date(event.date).toLocaleDateString("en-GH", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}{" "}
        at {event.time}.
      </p>
      <p className="rounded-xl bg-light px-3 py-2 text-xs text-navy/55">
        Mock registration form for demonstration. Submissions are not stored yet.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="evt-reg-name" className={labelClass}>
            Full name <span className="text-teal">*</span>
          </label>
          <input
            id="evt-reg-name"
            type="text"
            value={form.fullName}
            onChange={(e) =>
              setForm((f) => ({ ...f, fullName: e.target.value }))
            }
            className={inputClass}
            disabled={status === "loading"}
            aria-invalid={errors.fullName ? "true" : undefined}
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-teal" role="alert">
              {errors.fullName}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="evt-reg-email" className={labelClass}>
            Email <span className="text-teal">*</span>
          </label>
          <input
            id="evt-reg-email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className={inputClass}
            disabled={status === "loading"}
            aria-invalid={errors.email ? "true" : undefined}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-teal" role="alert">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="evt-reg-phone" className={labelClass}>
            Phone <span className="text-teal">*</span>
          </label>
          <input
            id="evt-reg-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className={inputClass}
            disabled={status === "loading"}
            aria-invalid={errors.phone ? "true" : undefined}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-teal" role="alert">
              {errors.phone}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="evt-reg-guests" className={labelClass}>
            Guests <span className="text-teal">*</span>
          </label>
          <input
            id="evt-reg-guests"
            type="number"
            min="1"
            max="10"
            value={form.guests}
            onChange={(e) => setForm((f) => ({ ...f, guests: e.target.value }))}
            className={inputClass}
            disabled={status === "loading"}
            aria-invalid={errors.guests ? "true" : undefined}
          />
          {errors.guests && (
            <p className="mt-1 text-xs text-teal" role="alert">
              {errors.guests}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="evt-reg-org" className={labelClass}>
          Organisation or school
        </label>
        <input
          id="evt-reg-org"
          type="text"
          value={form.organisation}
          onChange={(e) =>
            setForm((f) => ({ ...f, organisation: e.target.value }))
          }
          className={inputClass}
          placeholder="Optional"
          disabled={status === "loading"}
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="evt-reg-consent"
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-navy/30 text-navy focus-visible:ring-2 focus-visible:ring-blue"
          disabled={status === "loading"}
          aria-invalid={errors.consent ? "true" : undefined}
        />
        <label htmlFor="evt-reg-consent" className="text-sm text-navy/80">
          I agree to receive event updates and consent to STEMNova&apos;s privacy
          policy. <span className="text-teal">*</span>
        </label>
      </div>
      {errors.consent && (
        <p className="text-xs text-teal" role="alert">
          {errors.consent}
        </p>
      )}

      <Button type="submit" fullWidth disabled={status === "loading"}>
        {status === "loading" ? (
          <>
            <Loader2
              className="h-4 w-4 animate-spin motion-reduce:animate-none"
              aria-hidden="true"
            />
            Submitting…
          </>
        ) : (
          "Submit registration"
        )}
      </Button>
    </form>
  );
}
