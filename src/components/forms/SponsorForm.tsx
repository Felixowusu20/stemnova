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
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "loading" | "success";

const programmeOptions = [
  "Young Scholars STEM Discovery",
  "African STEM Fellows",
  "Quantum Education and Leaders",
  "Girls Discover Science",
  "STEM Teachers Academy",
  "Young African Researchers Fellowship",
  "Innovation for Sustainable Development",
  "Open to recommendation",
];

const budgetOptions = [
  "Under $5,000",
  "$5,000 to $25,000",
  "$25,000 to $100,000",
  "$100,000+",
  "Prefer to discuss",
];

interface SponsorFormProps {
  className?: string;
}

export function SponsorForm({ className }: SponsorFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [form, setForm] = useState({
    organisationName: "",
    contactPerson: "",
    email: "",
    phone: "",
    programme: "",
    budget: "",
    message: "",
  });

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.organisationName.trim())
      next.organisationName = "Organisation name is required.";
    if (!form.contactPerson.trim())
      next.contactPerson = "Contact person is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Please enter a valid email.";
    if (!form.phone.trim()) next.phone = "Phone is required.";
    if (!form.programme) next.programme = "Please select a programme.";
    if (!form.message.trim())
      next.message = "Please tell us about your sponsorship interest.";
    if (!consent) next.consent = "Please agree to continue.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 700));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <ApplicationFormShell className={className} showNotice={false}>
        <div className="py-6 text-center" role="status">
          <CheckCircle2
            className="mx-auto h-10 w-10 text-teal"
            aria-hidden="true"
          />
          <p className="mt-3 font-display text-xl font-semibold text-navy">
            Sponsorship enquiry received
          </p>
          <p className="mt-2 text-sm text-navy/70">
            Mock confirmation only. Partnerships will follow up once live forms
            are connected.
          </p>
        </div>
      </ApplicationFormShell>
    );
  }

  return (
    <ApplicationFormShell className={className} showNotice={false}>
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="sponsor-org" className={formLabelClass}>
              Organisation <span className="text-teal">*</span>
            </label>
            <input
              id="sponsor-org"
              className={formInputClass}
              value={form.organisationName}
              onChange={(e) =>
                setForm((f) => ({ ...f, organisationName: e.target.value }))
              }
              disabled={status === "loading"}
            />
            {errors.organisationName && (
              <p className={formHintClass} role="alert">
                {errors.organisationName}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="sponsor-contact" className={formLabelClass}>
              Contact person <span className="text-teal">*</span>
            </label>
            <input
              id="sponsor-contact"
              className={formInputClass}
              value={form.contactPerson}
              onChange={(e) =>
                setForm((f) => ({ ...f, contactPerson: e.target.value }))
              }
              disabled={status === "loading"}
            />
            {errors.contactPerson && (
              <p className={formHintClass} role="alert">
                {errors.contactPerson}
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="sponsor-email" className={formLabelClass}>
              Email <span className="text-teal">*</span>
            </label>
            <input
              id="sponsor-email"
              type="email"
              className={formInputClass}
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              disabled={status === "loading"}
            />
            {errors.email && (
              <p className={formHintClass} role="alert">
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="sponsor-phone" className={formLabelClass}>
              Phone <span className="text-teal">*</span>
            </label>
            <input
              id="sponsor-phone"
              type="tel"
              className={formInputClass}
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              disabled={status === "loading"}
            />
            {errors.phone && (
              <p className={formHintClass} role="alert">
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="sponsor-programme" className={formLabelClass}>
              Programme to sponsor <span className="text-teal">*</span>
            </label>
            <select
              id="sponsor-programme"
              className={formInputClass}
              value={form.programme}
              onChange={(e) =>
                setForm((f) => ({ ...f, programme: e.target.value }))
              }
              disabled={status === "loading"}
            >
              <option value="">Select programme</option>
              {programmeOptions.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            {errors.programme && (
              <p className={formHintClass} role="alert">
                {errors.programme}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="sponsor-budget" className={formLabelClass}>
              Indicative budget
            </label>
            <select
              id="sponsor-budget"
              className={formInputClass}
              value={form.budget}
              onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))}
              disabled={status === "loading"}
            >
              <option value="">Select range</option>
              {budgetOptions.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="sponsor-message" className={formLabelClass}>
            Sponsorship goals <span className="text-teal">*</span>
          </label>
          <textarea
            id="sponsor-message"
            rows={4}
            className={cn(formInputClass, "resize-y")}
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            placeholder="Tell us what impact you hope to support"
            disabled={status === "loading"}
          />
          {errors.message && (
            <p className={formHintClass} role="alert">
              {errors.message}
            </p>
          )}
        </div>

        <div className="flex items-start gap-3">
          <input
            id="sponsor-consent"
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-navy/30"
            disabled={status === "loading"}
          />
          <label htmlFor="sponsor-consent" className="text-sm text-navy/80">
            I agree to be contacted about sponsorship opportunities with STEMNova.{" "}
            <span className="text-teal">*</span>
          </label>
        </div>
        {errors.consent && (
          <p className={formHintClass} role="alert">
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
            "Submit sponsorship enquiry"
          )}
        </Button>
      </form>
    </ApplicationFormShell>
  );
}
