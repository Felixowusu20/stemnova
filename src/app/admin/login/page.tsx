"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  const configError = searchParams.get("error") === "Configuration";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(
    configError
      ? "Server auth is misconfigured (missing AUTH_SECRET). Check production environment variables."
      : ""
  );
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        setError(
          "Invalid email or password. If this is a new deploy, make sure the admin user was seeded in production."
        );
        setLoading(false);
        return;
      }

      // Hard navigation so the new session cookie is always sent to middleware.
      window.location.assign(callbackUrl);
    } catch {
      setError("Sign-in failed. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy outline-none ring-blue focus:ring-2"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="mb-1.5 block text-sm font-medium text-navy"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy outline-none ring-blue focus:ring-2"
        />
      </div>

      {error && (
        <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-navy px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0d3354] disabled:opacity-60"
      >
        {loading ? "Signing in…" : "Sign in to CMS"}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#071526] px-4 py-12">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 20% 20%, rgba(20,184,166,0.22), transparent), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(37,99,235,0.18), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl">
        <div className="border-b border-navy/5 bg-[#f8fafc] px-8 py-7">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">
            STEMNova Foundation
          </p>
          <h1 className="mt-2 font-display text-2xl font-bold text-navy">
            Content Management
          </h1>
          <p className="mt-2 text-sm text-navy/60">
            Sign in to manage site content, media, and navigation.
          </p>
        </div>
        <div className="px-8 py-8">
          <Suspense fallback={<p className="text-sm text-navy/60">Loading…</p>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
