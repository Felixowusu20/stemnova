"use client";

import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { ApplicationFormShell } from "@/components/forms/ApplicationFormShell";
import {
  formHintClass,
  formInputClass,
  formLabelClass,
} from "@/components/forms/formStyles";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface PartnerFormProps {
  className?: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

const partnershipTypes = [
  "University partnership",
  "Corporate sponsorship",
  "Government collaboration",
  "Research institution",
  "NGO collaboration",
  "Grant funding",
  "Other",
];

export function PartnerForm({ className }: PartnerFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [form, setForm] = useState({
    organizationName: "",
    contactPerson: "",
    email: "",
    phone: "",
    partnershipType: "",
    proposedSupport: "",
    message: "",
  });

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!form.organizationName.trim())
      next.organizationName = "Organization or individual name is required.";
    if (!form.contactPerson.trim())
      next.contactPerson = "Contact person is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Please enter a valid email.";
    if (!form.phone.trim()) next.phone = "Phone is required.";
    if (!form.partnershipType)
      next.partnershipType = "Please select a partnership type.";
    if (!form.proposedSupport.trim())
      next.proposedSupport = "Please describe your proposed support.";
    if (!form.message.trim()) next.message = "Please include a message.";
    if (!consent) next.consent = "You must agree to continue.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <ApplicationFormShell className={className} showNotice={false}>
        <div className="py-6 text-center" role="status">
          <p className="font-display text-xl font-semibold text-navy">
            Partnership enquiry received
          </p>
          <p className="mt-2 text-sm text-navy/70">
            Mock confirmation only. Our partnerships team will follow up once live
            forms are connected.
          </p>
        </div>
      </ApplicationFormShell>
    );
  }

  return (
    <ApplicationFormShell className={className} showNotice={false}>
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div>
          <label htmlFor="organizationName" className={formLabelClass}>
            Individual or organization name <span className="text-teal">*</span>
          </label>
          <input
            id="organizationName"
            type="text"
            value={form.organizationName}
            onChange={(e) =>
              setForm((f) => ({ ...f, organizationName: e.target.value }))
            }
            className={formInputClass}
            disabled={status === "loading"}
            aria-invalid={errors.organizationName ? "true" : undefined}
          />
          {errors.organizationName && (
            <p className={formHintClass} role="alert">
              {errors.organizationName}
            </p>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contactPerson" className={formLabelClass}>
              Contact person <span className="text-teal">*</span>
            </label>
            <input
              id="contactPerson"
              type="text"
              value={form.contactPerson}
              onChange={(e) =>
                setForm((f) => ({ ...f, contactPerson: e.target.value }))
              }
              className={formInputClass}
              disabled={status === "loading"}
              aria-invalid={errors.contactPerson ? "true" : undefined}
            />
            {errors.contactPerson && (
              <p className={formHintClass} role="alert">
                {errors.contactPerson}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="email" className={formLabelClass}>
              Email <span className="text-teal">*</span>
            </label>
            <input
              id="email"
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

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="phone" className={formLabelClass}>
              Phone <span className="text-teal">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className={formInputClass}
              disabled={status === "loading"}
              aria-invalid={errors.phone ? "true" : undefined}
            />
            {errors.phone && (
              <p className={formHintClass} role="alert">
                {errors.phone}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="partnershipType" className={formLabelClass}>
              Partnership type <span className="text-teal">*</span>
            </label>
            <select
              id="partnershipType"
              value={form.partnershipType}
              onChange={(e) =>
                setForm((f) => ({ ...f, partnershipType: e.target.value }))
              }
              className={formInputClass}
              disabled={status === "loading"}
              aria-invalid={errors.partnershipType ? "true" : undefined}
            >
              <option value="">Select type</option>
              {partnershipTypes.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errors.partnershipType && (
              <p className={formHintClass} role="alert">
                {errors.partnershipType}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="proposedSupport" className={formLabelClass}>
            Proposed support <span className="text-teal">*</span>
          </label>
          <textarea
            id="proposedSupport"
            rows={3}
            value={form.proposedSupport}
            onChange={(e) =>
              setForm((f) => ({ ...f, proposedSupport: e.target.value }))
            }
            className={cn(formInputClass, "resize-y")}
            disabled={status === "loading"}
            aria-invalid={errors.proposedSupport ? "true" : undefined}
          />
          {errors.proposedSupport && (
            <p className={formHintClass} role="alert">
              {errors.proposedSupport}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className={formLabelClass}>
            Message <span className="text-teal">*</span>
          </label>
          <textarea
            id="message"
            rows={4}
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
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

        <div className="flex items-start gap-3">
          <input
            id="consent"
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-navy/30"
            disabled={status === "loading"}
            aria-invalid={errors.consent ? "true" : undefined}
          />
          <label htmlFor="consent" className="text-sm text-navy/80">
            I agree to be contacted about partnership opportunities with STEMNova.{" "}
            <span className="text-teal">*</span>
          </label>
        </div>
        {errors.consent && (
          <p className={formHintClass} role="alert">
            {errors.consent}
          </p>
        )}

        {status === "error" && (
          <p className="text-sm text-teal" role="alert">
            Something went wrong. Please try again.
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
            "Submit partnership enquiry"
          )}
        </Button>
      </form>
    </ApplicationFormShell>
  );
}
