"use client";

import { useState, useRef, FormEvent } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Animate success panel in when it appears
  useGSAP(() => {
    if (status === "success" && successRef.current) {
      gsap.fromTo(
        successRef.current,
        { y: 12, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out" }
      );
    }
  }, [status]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;

    const trimmed = email.trim();
    if (!trimmed) return;

    setStatus("loading");
    setMessage("");

    try {
      let res: Response;
      try {
        res = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: trimmed }),
        });
      } catch {
        // fetch itself failed — server unreachable or network down
        setStatus("error");
        setMessage("Could not reach the server. Please check your connection and try again.");
        return;
      }

      let data: Record<string, string> = {};
      try {
        data = await res.json();
      } catch {
        // Response wasn't valid JSON
        setStatus("error");
        setMessage("Received an unexpected response. Please try again.");
        return;
      }

      if (res.status === 409) {
        setStatus("error");
        setMessage("This email is already subscribed. Check your inbox for the welcome email.");
      } else if (res.status === 400) {
        setStatus("error");
        setMessage(data?.error || "Please enter a valid email address.");
      } else if (!res.ok) {
        setStatus("error");
        setMessage(data?.error || "Something went wrong on our end. Please try again in a moment.");
      } else {
        setStatus("success");
        setMessage(data?.warning || "");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  function handleRetry() {
    setStatus("idle");
    setMessage("");
  }

  if (status === "success") {
    return (
      <div ref={successRef} className="newsletter-success">
        <span className="newsletter-check">✓</span>
        <div>
          <strong>You&apos;re subscribed!</strong>
          <p>A welcome email is on its way to <em>{email}</em>.</p>
          {message && <p className="newsletter-warning">{message}</p>}
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="newsletter-form" noValidate>
      <label className="sr-only" htmlFor="footer-email">Email address</label>
      <input
        id="footer-email"
        type="email"
        placeholder="Enter your email address"
        required
        disabled={status === "loading"}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status === "error") { setStatus("idle"); setMessage(""); }
        }}
        aria-describedby={status === "error" ? "newsletter-error" : undefined}
      />
      <button type="submit" disabled={status === "loading"} aria-busy={status === "loading"}>
        {status === "loading" ? (
          <span className="newsletter-spinner" aria-label="Subscribing..." />
        ) : (
          <>Subscribe <i /></>
        )}
      </button>
      {status === "error" && message && (
        <div className="newsletter-error-row">
          <p id="newsletter-error" className="newsletter-error" role="alert">{message}</p>
          <button type="button" className="newsletter-retry" onClick={handleRetry}>Try again</button>
        </div>
      )}
    </form>
  );
}
