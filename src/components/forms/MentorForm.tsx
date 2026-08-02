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

const disciplines = [
  "Physics and Quantum Science",
  "Computer Science and AI",
  "Materials Science",
  "Biology and Life Sciences",
  "Engineering",
  "Mathematics",
  "Science Education",
  "Other STEM field",
];

const availabilityOptions = [
  "1 to 2 hours per month",
  "3 to 5 hours per month",
  "Weekly sessions",
  "Event based only",
  "Flexible",
];

interface MentorFormProps {
  className?: string;
}

export function MentorForm({ className }: MentorFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    organisation: "",
    discipline: "",
    yearsExperience: "",
    availability: "",
    motivation: "",
  });

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Please enter a valid email.";
    if (!form.phone.trim()) next.phone = "Phone is required.";
    if (!form.discipline) next.discipline = "Please select a discipline.";
    if (!form.availability) next.availability = "Please select availability.";
    if (!form.motivation.trim())
      next.motivation = "Please share why you want to mentor.";
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
        type: "MENTOR",
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
          <CheckCircle2
            className="mx-auto h-10 w-10 text-teal"
            aria-hidden="true"
          />
          <p className="mt-3 font-display text-xl font-semibold text-navy">
            Mentor application received
          </p>
          <p className="mt-2 text-sm text-navy/70">
            Thanks. Our team will review your mentor application and follow up
            by email.
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
            <label htmlFor="mentor-name" className={formLabelClass}>
              Full name <span className="text-teal">*</span>
            </label>
            <input
              id="mentor-name"
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
            <label htmlFor="mentor-email" className={formLabelClass}>
              Email <span className="text-teal">*</span>
            </label>
            <input
              id="mentor-email"
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
            <label htmlFor="mentor-phone" className={formLabelClass}>
              Phone <span className="text-teal">*</span>
            </label>
            <input
              id="mentor-phone"
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
            <label htmlFor="mentor-org" className={formLabelClass}>
              Organisation or affiliation
            </label>
            <input
              id="mentor-org"
              className={formInputClass}
              value={form.organisation}
              onChange={(e) =>
                setForm((f) => ({ ...f, organisation: e.target.value }))
              }
              placeholder="University, lab, or company"
              disabled={status === "loading"}
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="mentor-discipline" className={formLabelClass}>
              STEM discipline <span className="text-teal">*</span>
            </label>
            <select
              id="mentor-discipline"
              className={formInputClass}
              value={form.discipline}
              onChange={(e) =>
                setForm((f) => ({ ...f, discipline: e.target.value }))
              }
              disabled={status === "loading"}
            >
              <option value="">Select discipline</option>
              {disciplines.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            {errors.discipline && (
              <p className={formHintClass} role="alert">
                {errors.discipline}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="mentor-years" className={formLabelClass}>
              Years of experience
            </label>
            <input
              id="mentor-years"
              type="number"
              min="0"
              max="60"
              className={formInputClass}
              value={form.yearsExperience}
              onChange={(e) =>
                setForm((f) => ({ ...f, yearsExperience: e.target.value }))
              }
              disabled={status === "loading"}
            />
          </div>
        </div>

        <div>
          <label htmlFor="mentor-availability" className={formLabelClass}>
            Availability <span className="text-teal">*</span>
          </label>
          <select
            id="mentor-availability"
            className={formInputClass}
            value={form.availability}
            onChange={(e) =>
              setForm((f) => ({ ...f, availability: e.target.value }))
            }
            disabled={status === "loading"}
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
          <label htmlFor="mentor-motivation" className={formLabelClass}>
            Why do you want to mentor? <span className="text-teal">*</span>
          </label>
          <textarea
            id="mentor-motivation"
            rows={4}
            className={cn(formInputClass, "resize-y")}
            value={form.motivation}
            onChange={(e) =>
              setForm((f) => ({ ...f, motivation: e.target.value }))
            }
            disabled={status === "loading"}
          />
          {errors.motivation && (
            <p className={formHintClass} role="alert">
              {errors.motivation}
            </p>
          )}
        </div>

        <div className="flex items-start gap-3">
          <input
            id="mentor-consent"
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-navy/30"
            disabled={status === "loading"}
          />
          <label htmlFor="mentor-consent" className="text-sm text-navy/80">
            I agree to STEMNova mentorship guidelines and consent to being
            contacted about mentor opportunities.{" "}
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
            "Submit mentor application"
          )}
        </Button>
      </form>
    </ApplicationFormShell>
  );
}
