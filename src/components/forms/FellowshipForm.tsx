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

type FormStatus = "idle" | "loading" | "success" | "error";

const tracks = [
  "African STEM Fellows",
  "Young African Researchers Fellowship",
  "Either programme",
];

const educationLevels = [
  "Final year undergraduate",
  "Master's student",
  "PhD student",
  "Early career researcher",
  "Other",
];

const researchAreas = [
  "Quantum science",
  "Artificial intelligence",
  "Materials science",
  "Computational science",
  "Robotics",
  "Sustainable development",
  "Other STEM field",
];

interface FellowshipFormProps {
  className?: string;
}

export function FellowshipForm({ className }: FellowshipFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    track: "",
    education: "",
    researchArea: "",
    statement: "",
  });

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Please enter a valid email.";
    if (!form.phone.trim()) next.phone = "Phone is required.";
    if (!form.country.trim()) next.country = "Country is required.";
    if (!form.track) next.track = "Please select a fellowship track.";
    if (!form.education) next.education = "Please select your education level.";
    if (!form.researchArea) next.researchArea = "Please select a research area.";
    if (!form.statement.trim())
      next.statement = "Please share a short personal statement.";
    if (!consent) next.consent = "Please agree to continue.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      await submitForm({
        type: "FELLOWSHIP",
        payload: { ...form, consent: true },
        relatedTitle: form.track || undefined,
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
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
            Fellowship application received
          </p>
          <p className="mt-2 text-sm text-navy/70">
            Thanks. Our team will review your fellowship application and follow
            up by email.
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
            <label htmlFor="fellow-name" className={formLabelClass}>
              Full name <span className="text-teal">*</span>
            </label>
            <input
              id="fellow-name"
              className={formInputClass}
              value={form.fullName}
              onChange={(e) =>
                setForm((f) => ({ ...f, fullName: e.target.value }))
              }
              disabled={status === "loading"}
            />
            {errors.fullName && (
              <p className={formHintClass} role="alert">
                {errors.fullName}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="fellow-email" className={formLabelClass}>
              Email <span className="text-teal">*</span>
            </label>
            <input
              id="fellow-email"
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
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="fellow-phone" className={formLabelClass}>
              Phone <span className="text-teal">*</span>
            </label>
            <input
              id="fellow-phone"
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
          <div>
            <label htmlFor="fellow-country" className={formLabelClass}>
              Country <span className="text-teal">*</span>
            </label>
            <input
              id="fellow-country"
              className={formInputClass}
              value={form.country}
              onChange={(e) =>
                setForm((f) => ({ ...f, country: e.target.value }))
              }
              disabled={status === "loading"}
            />
            {errors.country && (
              <p className={formHintClass} role="alert">
                {errors.country}
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="fellow-track" className={formLabelClass}>
              Fellowship track <span className="text-teal">*</span>
            </label>
            <select
              id="fellow-track"
              className={formInputClass}
              value={form.track}
              onChange={(e) => setForm((f) => ({ ...f, track: e.target.value }))}
              disabled={status === "loading"}
            >
              <option value="">Select track</option>
              {tracks.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            {errors.track && (
              <p className={formHintClass} role="alert">
                {errors.track}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="fellow-education" className={formLabelClass}>
              Education level <span className="text-teal">*</span>
            </label>
            <select
              id="fellow-education"
              className={formInputClass}
              value={form.education}
              onChange={(e) =>
                setForm((f) => ({ ...f, education: e.target.value }))
              }
              disabled={status === "loading"}
            >
              <option value="">Select level</option>
              {educationLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
            {errors.education && (
              <p className={formHintClass} role="alert">
                {errors.education}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="fellow-area" className={formLabelClass}>
            Research area <span className="text-teal">*</span>
          </label>
          <select
            id="fellow-area"
            className={formInputClass}
            value={form.researchArea}
            onChange={(e) =>
              setForm((f) => ({ ...f, researchArea: e.target.value }))
            }
            disabled={status === "loading"}
          >
            <option value="">Select area</option>
            {researchAreas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
          {errors.researchArea && (
            <p className={formHintClass} role="alert">
              {errors.researchArea}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="fellow-statement" className={formLabelClass}>
            Personal statement <span className="text-teal">*</span>
          </label>
          <textarea
            id="fellow-statement"
            rows={5}
            className={cn(formInputClass, "resize-y")}
            value={form.statement}
            onChange={(e) =>
              setForm((f) => ({ ...f, statement: e.target.value }))
            }
            placeholder="Briefly describe your research interests and goals"
            disabled={status === "loading"}
          />
          {errors.statement && (
            <p className={formHintClass} role="alert">
              {errors.statement}
            </p>
          )}
        </div>

        <div className="flex items-start gap-3">
          <input
            id="fellow-consent"
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-navy/30"
            disabled={status === "loading"}
          />
          <label htmlFor="fellow-consent" className="text-sm text-navy/80">
            I confirm that the information provided is accurate and consent to
            STEMNova contacting me about this application.{" "}
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
            "Submit fellowship application"
          )}
        </Button>
      </form>
    </ApplicationFormShell>
  );
}
