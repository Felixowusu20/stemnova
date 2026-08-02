"use client";

import { useMemo, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  getEventRegistrationForm,
  type EventRegistrationField,
} from "@/lib/event-registration-form";
import { submitForm } from "@/lib/submissions";
import { cn } from "@/lib/utils";
import type { Event } from "@/types";

interface EventRegistrationFormProps {
  event: Event;
  className?: string;
  onSuccess?: () => void;
}

type FormStatus = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full rounded-lg border border-[#dadce0] bg-white px-3.5 py-3 text-sm text-navy placeholder:text-navy/40 focus-visible:outline-none focus-visible:border-teal focus-visible:ring-1 focus-visible:ring-teal";

const labelClass = "mb-2 block text-base font-medium text-navy";

function emptyAnswers(fields: EventRegistrationField[]) {
  return Object.fromEntries(
    fields.map((field) => [
      field.id,
      field.type === "checkbox" ? false : field.type === "number" ? "1" : "",
    ])
  ) as Record<string, string | boolean>;
}

export function EventRegistrationForm({
  event,
  className,
  onSuccess,
}: EventRegistrationFormProps) {
  const formConfig = useMemo(
    () => getEventRegistrationForm(event),
    [event]
  );
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [answers, setAnswers] = useState(() =>
    emptyAnswers(formConfig.fields)
  );

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    for (const field of formConfig.fields) {
      const value = answers[field.id];
      if (field.type === "checkbox") {
        if (field.required && value !== true) {
          next[field.id] = "This confirmation is required.";
        }
        continue;
      }

      const text = String(value ?? "").trim();
      if (field.required && !text) {
        next[field.id] = "This question is required.";
        continue;
      }
      if (field.type === "email" && text && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
        next[field.id] = "Please enter a valid email.";
      }
      if (field.type === "number" && text) {
        const number = Number(text);
        if (!Number.isFinite(number) || number < 0) {
          next[field.id] = "Please enter a valid number.";
        }
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      const payloadAnswers: Record<string, string | number | boolean> = {};
      for (const field of formConfig.fields) {
        const value = answers[field.id];
        if (field.type === "checkbox") {
          payloadAnswers[field.id] = Boolean(value);
          payloadAnswers[field.label] = Boolean(value);
        } else if (field.type === "number") {
          const number = Number(value);
          payloadAnswers[field.id] = Number.isFinite(number) ? number : value;
          payloadAnswers[field.label] = payloadAnswers[field.id];
        } else {
          payloadAnswers[field.id] = String(value ?? "").trim();
          payloadAnswers[field.label] = payloadAnswers[field.id];
        }
      }

      const emailField = formConfig.fields.find((field) => field.type === "email");
      const nameField =
        formConfig.fields.find((field) => field.id === "fullName") ||
        formConfig.fields.find((field) => field.type === "text");

      await submitForm({
        type: "EVENT_REGISTRATION",
        relatedSlug: event.slug,
        relatedTitle: event.title,
        payload: {
          ...payloadAnswers,
          email: emailField
            ? String(answers[emailField.id] ?? "").trim()
            : undefined,
          name: nameField
            ? String(answers[nameField.id] ?? "").trim()
            : undefined,
          fullName: nameField
            ? String(answers[nameField.id] ?? "").trim()
            : undefined,
          eventSlug: event.slug,
          eventTitle: event.title,
          eventDate: event.date,
          eventTime: event.time,
          eventLocation: event.location,
          formTitle: formConfig.title,
        },
      });
      setStatus("success");
      onSuccess?.();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        className={cn(
          "overflow-hidden rounded-2xl border border-[#dadce0] bg-white shadow-sm",
          className
        )}
        role="status"
      >
        <div className="h-2.5 bg-teal" />
        <div className="p-8 text-center">
          <CheckCircle2
            className="mx-auto h-12 w-12 text-teal"
            aria-hidden="true"
          />
          <p className="mt-4 font-display text-2xl font-semibold text-navy">
            Registration submitted
          </p>
          <p className="mt-2 text-sm leading-relaxed text-navy/70">
            Thanks for registering for <strong>{event.title}</strong>. We will
            confirm your place by email.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "overflow-hidden rounded-2xl border border-[#dadce0] bg-white shadow-sm",
        className
      )}
      noValidate
    >
      <div className="h-2.5 bg-teal" />
      <div className="border-b border-[#dadce0] px-5 py-5 sm:px-7">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
          Registration form
        </p>
        <h3 className="mt-2 font-display text-xl font-bold text-navy sm:text-2xl">
          {formConfig.title || event.title}
        </h3>
        <p className="mt-2 text-sm text-navy/65">
          {new Date(event.date).toLocaleDateString("en-GH", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          · {event.time} · {event.location}
        </p>
        {formConfig.description && (
          <p className="mt-3 text-sm leading-relaxed text-navy/70">
            {formConfig.description}
          </p>
        )}
      </div>

      <div className="space-y-5 px-5 py-6 sm:px-7">
        {formConfig.fields.map((field) => (
          <div
            key={field.id}
            className="rounded-xl border border-[#dadce0] bg-white p-4 shadow-[0_1px_2px_rgba(60,64,67,0.08)]"
          >
            {field.type === "checkbox" ? (
              <label className="flex items-start gap-3 text-sm text-navy/85">
                <input
                  type="checkbox"
                  checked={Boolean(answers[field.id])}
                  onChange={(e) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [field.id]: e.target.checked,
                    }))
                  }
                  className="mt-0.5 h-4 w-4 rounded border-navy/30 text-teal focus-visible:ring-2 focus-visible:ring-teal"
                  disabled={status === "loading"}
                />
                <span>
                  {field.label}
                  {field.required && (
                    <span className="text-red-600"> *</span>
                  )}
                </span>
              </label>
            ) : (
              <>
                <label htmlFor={`reg-${field.id}`} className={labelClass}>
                  {field.label}
                  {field.required && (
                    <span className="text-red-600"> *</span>
                  )}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    id={`reg-${field.id}`}
                    rows={4}
                    value={String(answers[field.id] ?? "")}
                    placeholder={field.placeholder}
                    onChange={(e) =>
                      setAnswers((prev) => ({
                        ...prev,
                        [field.id]: e.target.value,
                      }))
                    }
                    className={cn(inputClass, "resize-y")}
                    disabled={status === "loading"}
                  />
                ) : field.type === "select" ? (
                  <select
                    id={`reg-${field.id}`}
                    value={String(answers[field.id] ?? "")}
                    onChange={(e) =>
                      setAnswers((prev) => ({
                        ...prev,
                        [field.id]: e.target.value,
                      }))
                    }
                    className={inputClass}
                    disabled={status === "loading"}
                  >
                    <option value="">Select an option</option>
                    {(field.options || []).map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : field.type === "radio" ? (
                  <div className="space-y-2">
                    {(field.options || []).map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-2 text-sm text-navy"
                      >
                        <input
                          type="radio"
                          name={field.id}
                          value={option}
                          checked={answers[field.id] === option}
                          onChange={() =>
                            setAnswers((prev) => ({
                              ...prev,
                              [field.id]: option,
                            }))
                          }
                          className="h-4 w-4 border-navy/30 text-teal focus-visible:ring-2 focus-visible:ring-teal"
                          disabled={status === "loading"}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                ) : (
                  <input
                    id={`reg-${field.id}`}
                    type={field.type}
                    value={String(answers[field.id] ?? "")}
                    placeholder={field.placeholder}
                    min={field.type === "number" ? 0 : undefined}
                    onChange={(e) =>
                      setAnswers((prev) => ({
                        ...prev,
                        [field.id]: e.target.value,
                      }))
                    }
                    className={inputClass}
                    disabled={status === "loading"}
                  />
                )}
              </>
            )}
            {errors[field.id] && (
              <p className="mt-2 text-xs text-red-600">{errors[field.id]}</p>
            )}
          </div>
        ))}

        {status === "error" && (
          <p className="text-sm text-red-600" role="alert">
            Something went wrong. Please try again.
          </p>
        )}
      </div>

      <div className="flex justify-end border-t border-[#dadce0] bg-[#f8f9fa] px-5 py-4 sm:px-7">
        <Button type="submit" variant="teal" disabled={status === "loading"}>
          {status === "loading" ? (
            <>
              <Loader2
                className="h-4 w-4 animate-spin motion-reduce:animate-none"
                aria-hidden="true"
              />
              Submitting…
            </>
          ) : (
            formConfig.submitLabel || "Submit"
          )}
        </Button>
      </div>
    </form>
  );
}
