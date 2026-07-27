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
import {
  confirmMockPayment,
  createDonationIntent,
} from "@/lib/payments";
import { cn } from "@/lib/utils";

interface DonationFormProps {
  className?: string;
}

type Frequency = "one-time" | "monthly";

const suggestedAmounts = [50, 100, 250, 500];

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function DonationForm({ className }: DonationFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [frequency, setFrequency] = useState<Frequency>("one-time");
  const [amount, setAmount] = useState<number | null>(100);
  const [customAmount, setCustomAmount] = useState("");
  const [form, setForm] = useState({
    donorName: "",
    donorEmail: "",
    message: "",
  });

  const finalAmount =
    amount ?? (customAmount ? parseFloat(customAmount) : 0);

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!finalAmount || finalAmount <= 0)
      next.amount = "Please choose or enter an amount.";
    if (!form.donorName.trim()) next.donorName = "Full name is required.";
    if (!form.donorEmail.trim()) next.donorEmail = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.donorEmail))
      next.donorEmail = "Please enter a valid email.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      const intent = await createDonationIntent({
        amount: finalAmount,
        currency: "GHS",
        donorName: form.donorName,
        donorEmail: form.donorEmail,
        message: form.message || undefined,
      });
      await confirmMockPayment(intent.id);
      setSuccess(true);
    } catch {
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <ApplicationFormShell className={className} showNotice={false}>
        <div className="py-4 text-center" role="status">
          <CheckCircle2
            className="mx-auto h-9 w-9 text-teal"
            aria-hidden="true"
          />
          <p className="mt-3 font-display text-xl font-semibold text-navy">
            Thank you for your support
          </p>
          <p className="mt-2 text-sm text-navy/70">
            Demo gift of <strong>{formatCurrency(finalAmount)}</strong>
            {frequency === "monthly" ? " monthly" : ""} recorded.
          </p>
        </div>
      </ApplicationFormShell>
    );
  }

  return (
    <ApplicationFormShell className={className} showNotice={false}>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <p className={formLabelClass}>Gift type</p>
          <div className="mt-1.5 grid grid-cols-2 gap-2">
            {(
              [
                { value: "one-time", label: "One time" },
                { value: "monthly", label: "Monthly" },
              ] as const
            ).map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFrequency(option.value)}
                className={cn(
                  "rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2",
                  frequency === option.value
                    ? "bg-navy text-white"
                    : "bg-navy/8 text-navy hover:bg-navy/15"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className={formLabelClass}>
            Amount (GHS) <span className="text-teal">*</span>
          </p>
          <div className="mt-1.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {suggestedAmounts.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setAmount(value);
                  setCustomAmount("");
                }}
                className={cn(
                  "rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2",
                  amount === value
                    ? "bg-teal text-white"
                    : "bg-navy/8 text-navy hover:bg-navy/15"
                )}
              >
                {formatCurrency(value)}
              </button>
            ))}
          </div>
          <div className="mt-2">
            <label htmlFor="customAmount" className="sr-only">
              Custom amount
            </label>
            <input
              id="customAmount"
              type="number"
              min="1"
              step="1"
              placeholder="Custom amount"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setAmount(null);
              }}
              className={formInputClass}
              aria-invalid={errors.amount ? "true" : undefined}
            />
          </div>
          {errors.amount && (
            <p className={formHintClass} role="alert">
              {errors.amount}
            </p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="donorName" className={formLabelClass}>
              Full name <span className="text-teal">*</span>
            </label>
            <input
              id="donorName"
              type="text"
              value={form.donorName}
              onChange={(e) =>
                setForm((f) => ({ ...f, donorName: e.target.value }))
              }
              className={formInputClass}
              disabled={loading}
              aria-invalid={errors.donorName ? "true" : undefined}
            />
            {errors.donorName && (
              <p className={formHintClass} role="alert">
                {errors.donorName}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="donorEmail" className={formLabelClass}>
              Email <span className="text-teal">*</span>
            </label>
            <input
              id="donorEmail"
              type="email"
              value={form.donorEmail}
              onChange={(e) =>
                setForm((f) => ({ ...f, donorEmail: e.target.value }))
              }
              className={formInputClass}
              disabled={loading}
              aria-invalid={errors.donorEmail ? "true" : undefined}
            />
            {errors.donorEmail && (
              <p className={formHintClass} role="alert">
                {errors.donorEmail}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="message" className={formLabelClass}>
            Message (optional)
          </label>
          <textarea
            id="message"
            rows={2}
            value={form.message}
            onChange={(e) =>
              setForm((f) => ({ ...f, message: e.target.value }))
            }
            className={cn(formInputClass, "resize-y")}
            placeholder="Optional note"
            disabled={loading}
          />
        </div>

        {errors.submit && (
          <p className="text-sm text-teal" role="alert">
            {errors.submit}
          </p>
        )}

        <Button type="submit" variant="teal" fullWidth size="lg" disabled={loading}>
          {loading ? (
            <>
              <Loader2
                className="h-4 w-4 animate-spin motion-reduce:animate-none"
                aria-hidden="true"
              />
              Submitting…
            </>
          ) : (
            `Donate ${finalAmount > 0 ? formatCurrency(finalAmount) : ""}`.trim()
          )}
        </Button>
      </form>
    </ApplicationFormShell>
  );
}
