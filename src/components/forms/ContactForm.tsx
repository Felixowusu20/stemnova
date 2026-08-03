"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { ApplicationFormShell } from "@/components/forms/ApplicationFormShell";
import {
  formHintClass,
  formInputClass,
  formLabelClass,
} from "@/components/forms/formStyles";
import { Button } from "@/components/ui/Button";
import { submitForm } from "@/lib/submissions";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  className?: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactForm({ className }: ContactFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Please enter a valid email.";
    if (!form.subject.trim()) next.subject = "Subject is required.";
    if (!form.message.trim()) next.message = "Message is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      await submitForm({
        type: "CONTACT",
        payload: { ...form },
      });
      setStatus("success");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <ApplicationFormShell className={className} showNotice={false}>
        <div className="py-4 text-center" role="status">
          <CheckCircle2
            className="mx-auto h-9 w-9 text-teal"
            aria-hidden="true"
          />
          <p className="mt-3 font-display text-xl font-semibold text-navy">
            Message sent
          </p>
          <p className="mt-2 text-sm text-navy/70">
            Thanks. We will get back to you soon.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setStatus("idle")}
          >
            Send another
          </Button>
        </div>
      </ApplicationFormShell>
    );
  }

  return (
    <ApplicationFormShell className={className} showNotice={false}>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className={formLabelClass}>
              Full name <span className="text-teal">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className={formInputClass}
              disabled={status === "loading"}
              aria-invalid={errors.name ? "true" : undefined}
            />
            {errors.name && (
              <p className={formHintClass} role="alert">
                {errors.name}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="contact-email" className={formLabelClass}>
              Email <span className="text-teal">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className={formInputClass}
              disabled={status === "loading"}
              aria-invalid={errors.email ? "true" : undefined}
            />
            {errors.email && (
              <p className={formHintClass} role="alert">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-phone" className={formLabelClass}>
              Phone
            </label>
            <input
              id="contact-phone"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className={formInputClass}
              disabled={status === "loading"}
            />
          </div>
          <div>
            <label htmlFor="contact-subject" className={formLabelClass}>
              Subject <span className="text-teal">*</span>
            </label>
            <input
              id="contact-subject"
              type="text"
              value={form.subject}
              onChange={(e) =>
                setForm((f) => ({ ...f, subject: e.target.value }))
              }
              className={formInputClass}
              disabled={status === "loading"}
              aria-invalid={errors.subject ? "true" : undefined}
            />
            {errors.subject && (
              <p className={formHintClass} role="alert">
                {errors.subject}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="contact-message" className={formLabelClass}>
            Message <span className="text-teal">*</span>
          </label>
          <textarea
            id="contact-message"
            rows={4}
            value={form.message}
            onChange={(e) =>
              setForm((f) => ({ ...f, message: e.target.value }))
            }
            className={cn(formInputClass, "resize-y")}
            disabled={status === "loading"}
            aria-invalid={errors.message ? "true" : undefined}
          />
          {errors.message && (
            <p className={formHintClass} role="alert">
              {errors.message}
            </p>
          )}
        </div>

        {status === "error" && (
          <p className="text-sm text-teal" role="alert">
            Something went wrong. Please try again.
          </p>
        )}

        <Button type="submit" fullWidth size="lg" disabled={status === "loading"}>
          {status === "loading" ? (
            <>
              <Loader2
                className="h-4 w-4 animate-spin motion-reduce:animate-none"
                aria-hidden="true"
              />
              Sending…
            </>
          ) : (
            "Send message"
          )}
        </Button>
      </form>
    </ApplicationFormShell>
  );
}
