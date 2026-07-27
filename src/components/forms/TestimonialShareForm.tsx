"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

type FormStatus = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-navy/15 bg-white px-4 py-2.5 text-sm text-navy placeholder:text-navy/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2";

const labelClass = "mb-1.5 block text-sm font-medium text-navy";

export function TestimonialShareForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    message: "",
  });

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Please enter a valid email.";
    if (!form.role.trim()) next.role = "Your role is required.";
    if (!form.message.trim()) next.message = "Please share your idea or story.";
    else if (form.message.trim().length < 20)
      next.message = "Please write at least a short paragraph.";
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
      setForm({ name: "", email: "", role: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        className={cn(
          "rounded-2xl border border-teal/20 bg-teal/10 p-8 text-center",
          className
        )}
        role="status"
      >
        <p className="font-display text-xl font-semibold text-navy">
          Thank you for sharing
        </p>
        <p className="mt-2 text-sm leading-relaxed text-navy/75">
          Your story or idea has been received. Our team will review it soon.
        </p>
        <Button
          variant="outline"
          className="mt-5"
          onClick={() => setStatus("idle")}
        >
          Share another idea
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "rounded-2xl border border-navy/10 bg-white p-6 shadow-sm sm:p-8",
        className
      )}
      noValidate
    >
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-teal">
          Share with us
        </p>
        <h3 className="mt-2 font-display text-2xl font-bold text-navy">
          Share Your Story or Idea
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-navy/70">
          Tell us how STEMNova has shaped your journey, or share an idea that
          could strengthen African STEM opportunity.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="story-name" className={labelClass}>
            Full name
          </label>
          <input
            id="story-name"
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className={inputClass}
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-600">{errors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="story-email" className={labelClass}>
            Email
          </label>
          <input
            id="story-email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className={inputClass}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="story-role" className={labelClass}>
          Role or connection
        </label>
        <input
          id="story-role"
          name="role"
          type="text"
          placeholder="Student, teacher, researcher, partner, mentor"
          value={form.role}
          onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
          className={inputClass}
          aria-invalid={Boolean(errors.role)}
        />
        {errors.role && (
          <p className="mt-1 text-xs text-red-600">{errors.role}</p>
        )}
      </div>

      <div className="mt-4">
        <label htmlFor="story-message" className={labelClass}>
          Your story or idea
        </label>
        <textarea
          id="story-message"
          name="message"
          rows={5}
          placeholder="Share your experience or an idea for STEMNova..."
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className={cn(inputClass, "resize-y")}
          aria-invalid={Boolean(errors.message)}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-600">{errors.message}</p>
        )}
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-red-600" role="alert">
          Something went wrong. Please try again.
        </p>
      )}

      <Button
        type="submit"
        variant="teal"
        className="mt-6"
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" />
            Submit your idea
          </>
        )}
      </Button>
    </form>
  );
}
