"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { ApplicationFormShell } from "@/components/forms/ApplicationFormShell";
import {
  formHintClass,
  formInputClass,
  formLabelClass,
} from "@/components/forms/formStyles";
import { Button } from "@/components/ui/Button";
import {
  contactPageContent,
  type ContactFormFieldConfig,
} from "@/content/contact";
import { submitForm } from "@/lib/submissions";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  className?: string;
  fields?: ContactFormFieldConfig[];
  submitLabel?: string;
  successTitle?: string;
  successMessage?: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactForm({
  className,
  fields = contactPageContent.formFields,
  submitLabel = contactPageContent.submitLabel,
  successTitle = contactPageContent.successTitle,
  successMessage = contactPageContent.successMessage,
}: ContactFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const fieldById = new Map(fields.map((field) => [field.id, field]));

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    for (const field of fields) {
      const value = form[field.id].trim();
      if (field.required && !value) {
        next[field.id] = `${field.label} is required.`;
      }
    }
    const emailField = fieldById.get("email");
    if (
      emailField &&
      form.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      next.email = "Please enter a valid email.";
    }
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
            {successTitle}
          </p>
          <p className="mt-2 text-sm text-navy/70">{successMessage}</p>
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

  function renderField(
    id: ContactFormFieldConfig["id"],
    input: ReactNode
  ) {
    const field = fieldById.get(id);
    if (!field) return null;

    return (
      <div>
        <label htmlFor={`contact-${id}`} className={formLabelClass}>
          {field.label}
          {field.required ? <span className="text-teal"> *</span> : null}
        </label>
        {input}
        {errors[id] && (
          <p className={formHintClass} role="alert">
            {errors[id]}
          </p>
        )}
      </div>
    );
  }

  return (
    <ApplicationFormShell className={className} showNotice={false}>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          {renderField(
            "name",
            <input
              id="contact-name"
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className={formInputClass}
              disabled={status === "loading"}
              aria-invalid={errors.name ? "true" : undefined}
            />
          )}
          {renderField(
            "email",
            <input
              id="contact-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className={formInputClass}
              disabled={status === "loading"}
              aria-invalid={errors.email ? "true" : undefined}
            />
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {renderField(
            "phone",
            <input
              id="contact-phone"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className={formInputClass}
              disabled={status === "loading"}
            />
          )}
          {renderField(
            "subject",
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
          )}
        </div>

        {renderField(
          "message",
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
        )}

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
            submitLabel
          )}
        </Button>
      </form>
    </ApplicationFormShell>
  );
}
