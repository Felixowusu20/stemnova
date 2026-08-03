"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Calendar, CheckCircle2, Loader2, MapPin, X } from "lucide-react";
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
  onClose?: () => void;
}

type FormStatus = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-navy/15 bg-white px-3.5 py-2.5 text-sm text-navy placeholder:text-navy/40 transition focus-visible:outline-none focus-visible:border-teal focus-visible:ring-2 focus-visible:ring-teal/30 disabled:opacity-60";

const labelClass = "mb-1.5 block text-sm font-medium text-navy";

function emptyAnswers(fields: EventRegistrationField[]) {
  return Object.fromEntries(
    fields.map((field) => [
      field.id,
      field.type === "checkbox" ? false : field.type === "number" ? "1" : "",
    ])
  ) as Record<string, string | boolean>;
}

function isWideField(field: EventRegistrationField) {
  return (
    field.type === "textarea" ||
    field.type === "checkbox" ||
    field.type === "radio"
  );
}

export function EventRegistrationForm({
  event,
  className,
  onSuccess,
  onClose,
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

  const eventDateLabel = new Date(event.date).toLocaleDateString("en-GH", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
          "flex min-h-[min(70dvh,520px)] flex-col items-center justify-center px-6 py-12 text-center sm:px-10",
          className
        )}
        role="status"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal/10">
          <CheckCircle2 className="h-8 w-8 text-teal" aria-hidden="true" />
        </div>
        <p className="mt-5 font-display text-2xl font-semibold text-navy sm:text-3xl">
          Registration submitted
        </p>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-navy/65 sm:text-base">
          Thanks for registering for <strong className="text-navy">{event.title}</strong>.
          We will confirm your place by email.
        </p>
        {onClose ? (
          <Button
            type="button"
            variant="teal"
            className="mt-8"
            onClick={onClose}
          >
            Done
          </Button>
        ) : null}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex min-h-0 flex-1 flex-col bg-white", className)}
      noValidate
    >
      <header className="relative shrink-0 border-b border-navy/8 bg-gradient-to-br from-navy/[0.03] via-white to-teal/[0.04] px-5 py-5 sm:px-8 sm:py-6 lg:px-10">
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 rounded-lg p-2 text-navy/50 transition hover:bg-navy/5 hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal sm:right-5 sm:top-5"
            aria-label="Close registration form"
          >
            <X className="h-5 w-5" />
          </button>
        ) : null}

        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal">
          Event registration
        </p>
        <h3 className="mt-2 max-w-3xl pr-10 font-display text-xl font-bold leading-snug text-navy sm:text-2xl lg:text-3xl">
          {formConfig.title || event.title}
        </h3>

        <div className="mt-3 flex flex-col gap-2 text-sm text-navy/65 sm:mt-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2">
          <span className="inline-flex items-start gap-2">
            <Calendar
              className="mt-0.5 h-4 w-4 shrink-0 text-teal"
              aria-hidden="true"
            />
            <span>
              {eventDateLabel}
              <span className="text-navy/35"> · </span>
              {event.time}
            </span>
          </span>
          <span className="inline-flex items-start gap-2">
            <MapPin
              className="mt-0.5 h-4 w-4 shrink-0 text-teal"
              aria-hidden="true"
            />
            <span>{event.location}</span>
          </span>
        </div>

        {formConfig.description ? (
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-navy/60 sm:mt-4">
            {formConfig.description}
          </p>
        ) : null}
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-8 sm:py-6 lg:px-10 lg:py-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-x-6 lg:gap-y-5">
          {formConfig.fields.map((field) => (
            <div
              key={field.id}
              className={cn(isWideField(field) && "sm:col-span-2")}
            >
              {field.type === "checkbox" ? (
                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-navy/10 bg-light/40 px-4 py-3.5 text-sm leading-relaxed text-navy/85 transition hover:border-navy/20">
                  <input
                    type="checkbox"
                    checked={Boolean(answers[field.id])}
                    onChange={(e) =>
                      setAnswers((prev) => ({
                        ...prev,
                        [field.id]: e.target.checked,
                      }))
                    }
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-navy/30 text-teal focus-visible:ring-2 focus-visible:ring-teal"
                    disabled={status === "loading"}
                  />
                  <span>
                    {field.label}
                    {field.required ? (
                      <span className="text-red-600"> *</span>
                    ) : null}
                  </span>
                </label>
              ) : (
                <>
                  <label htmlFor={`reg-${field.id}`} className={labelClass}>
                    {field.label}
                    {field.required ? (
                      <span className="text-red-600"> *</span>
                    ) : null}
                  </label>
                  {field.helpText ? (
                    <p className="mb-1.5 text-xs text-navy/50">{field.helpText}</p>
                  ) : null}
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
                      className={cn(inputClass, "min-h-[6.5rem] resize-y")}
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
                    <div className="grid gap-2 sm:grid-cols-2">
                      {(field.options || []).map((option) => (
                        <label
                          key={option}
                          className={cn(
                            "flex cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-sm text-navy transition",
                            answers[field.id] === option
                              ? "border-teal/40 bg-teal/5"
                              : "border-navy/12 hover:border-navy/25"
                          )}
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
                      autoComplete={
                        field.type === "email"
                          ? "email"
                          : field.type === "tel"
                            ? "tel"
                            : field.id === "fullName"
                              ? "name"
                              : undefined
                      }
                    />
                  )}
                </>
              )}
              {errors[field.id] ? (
                <p className="mt-1.5 text-xs text-red-600">{errors[field.id]}</p>
              ) : null}
            </div>
          ))}
        </div>

        {status === "error" ? (
          <p className="mt-5 text-sm text-red-600" role="alert">
            Something went wrong. Please try again.
          </p>
        ) : null}
      </div>

      <div className="shrink-0 border-t border-navy/8 bg-light/50 px-5 py-4 sm:px-8 sm:py-5 lg:px-10">
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center text-xs text-navy/45 sm:text-left">
            Required fields are marked with *
          </p>
          <Button
            type="submit"
            variant="teal"
            size="lg"
            disabled={status === "loading"}
            className="w-full sm:w-auto sm:min-w-[12rem]"
          >
            {status === "loading" ? (
              <>
                <Loader2
                  className="h-4 w-4 animate-spin motion-reduce:animate-none"
                  aria-hidden="true"
                />
                Submitting…
              </>
            ) : (
              formConfig.submitLabel || "Submit registration"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
