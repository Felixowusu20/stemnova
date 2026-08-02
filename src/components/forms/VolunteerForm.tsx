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
import { submitForm } from "@/lib/submissions";
import { cn } from "@/lib/utils";

interface VolunteerFormProps {
  className?: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

const interestOptions = [
  "STEM camps and workshops",
  "Event and logistics support",
  "Mentorship programme support",
  "Teacher training events",
  "Outreach and community programmes",
  "Communications and media",
  "Administrative support",
  "Other",
];

const ageRangeOptions = ["18 to 24", "25 to 34", "35 to 44", "45 to 54", "55+"];

const availabilityOptions = [
  "Weekday mornings",
  "Weekday afternoons",
  "Weekday evenings",
  "Weekends",
  "Flexible / as needed",
];

export function VolunteerForm({ className }: VolunteerFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    ageRange: "",
    areaOfInterest: "",
    availability: "",
    experience: "",
    motivation: "",
  });

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Please enter a valid email.";
    if (!form.phone.trim()) next.phone = "Phone is required.";
    if (!form.location.trim()) next.location = "Location is required.";
    if (!form.ageRange) next.ageRange = "Please select an age range.";
    if (!form.areaOfInterest)
      next.areaOfInterest = "Please select an area of interest.";
    if (!form.availability)
      next.availability = "Please select your availability.";
    if (!form.motivation.trim())
      next.motivation = "Please tell us why you want to volunteer.";
    if (!consent) next.consent = "You must agree to continue.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      await submitForm({
        type: "VOLUNTEER",
        payload: { ...form, consent: true },
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
          <p className="font-display text-xl font-semibold text-navy">
            Volunteer application received
          </p>
          <p className="mt-2 text-sm text-navy/70">
            Thanks. Our volunteer team will review your application and follow
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
            <label htmlFor="fullName" className={formLabelClass}>
              Full name <span className="text-teal">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              value={form.fullName}
              onChange={(e) =>
                setForm((f) => ({ ...f, fullName: e.target.value }))
              }
              className={formInputClass}
              disabled={status === "loading"}
              aria-invalid={errors.fullName ? "true" : undefined}
            />
            {errors.fullName && (
              <p className={formHintClass} role="alert">
                {errors.fullName}
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
            <label htmlFor="location" className={formLabelClass}>
              Location <span className="text-teal">*</span>
            </label>
            <input
              id="location"
              type="text"
              placeholder="City, Region"
              value={form.location}
              onChange={(e) =>
                setForm((f) => ({ ...f, location: e.target.value }))
              }
              className={formInputClass}
              disabled={status === "loading"}
              aria-invalid={errors.location ? "true" : undefined}
            />
            {errors.location && (
              <p className={formHintClass} role="alert">
                {errors.location}
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="ageRange" className={formLabelClass}>
              Age range <span className="text-teal">*</span>
            </label>
            <select
              id="ageRange"
              value={form.ageRange}
              onChange={(e) =>
                setForm((f) => ({ ...f, ageRange: e.target.value }))
              }
              className={formInputClass}
              disabled={status === "loading"}
              aria-invalid={errors.ageRange ? "true" : undefined}
            >
              <option value="">Select age range</option>
              {ageRangeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errors.ageRange && (
              <p className={formHintClass} role="alert">
                {errors.ageRange}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="areaOfInterest" className={formLabelClass}>
              Area of interest <span className="text-teal">*</span>
            </label>
            <select
              id="areaOfInterest"
              value={form.areaOfInterest}
              onChange={(e) =>
                setForm((f) => ({ ...f, areaOfInterest: e.target.value }))
              }
              className={formInputClass}
              disabled={status === "loading"}
              aria-invalid={errors.areaOfInterest ? "true" : undefined}
            >
              <option value="">Select area</option>
              {interestOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errors.areaOfInterest && (
              <p className={formHintClass} role="alert">
                {errors.areaOfInterest}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="availability" className={formLabelClass}>
            Availability <span className="text-teal">*</span>
          </label>
          <select
            id="availability"
            value={form.availability}
            onChange={(e) =>
              setForm((f) => ({ ...f, availability: e.target.value }))
            }
            className={formInputClass}
            disabled={status === "loading"}
            aria-invalid={errors.availability ? "true" : undefined}
          >
            <option value="">Select availability</option>
            {availabilityOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.availability && (
            <p className={formHintClass} role="alert">
              {errors.availability}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="experience" className={formLabelClass}>
            Relevant experience
          </label>
          <textarea
            id="experience"
            rows={3}
            value={form.experience}
            onChange={(e) =>
              setForm((f) => ({ ...f, experience: e.target.value }))
            }
            className={cn(formInputClass, "resize-y")}
            placeholder="Tell us about any relevant skills or experience (optional)"
            disabled={status === "loading"}
          />
        </div>

        <div>
          <label htmlFor="motivation" className={formLabelClass}>
            Why do you want to volunteer? <span className="text-teal">*</span>
          </label>
          <textarea
            id="motivation"
            rows={4}
            value={form.motivation}
            onChange={(e) =>
              setForm((f) => ({ ...f, motivation: e.target.value }))
            }
            className={cn(formInputClass, "resize-y")}
            disabled={status === "loading"}
            aria-invalid={errors.motivation ? "true" : undefined}
          />
          {errors.motivation && (
            <p className={formHintClass} role="alert">
              {errors.motivation}
            </p>
          )}
        </div>

        <div className="flex items-start gap-3">
          <input
            id="consent"
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-navy/30 text-navy focus-visible:ring-2 focus-visible:ring-blue"
            disabled={status === "loading"}
            aria-invalid={errors.consent ? "true" : undefined}
          />
          <label htmlFor="consent" className="text-sm text-navy/80">
            I agree to the foundation&apos;s volunteer policies and consent to
            being contacted about volunteer opportunities.{" "}
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
            "Submit application"
          )}
        </Button>
      </form>
    </ApplicationFormShell>
  );
}

