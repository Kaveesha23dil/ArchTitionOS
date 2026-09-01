"use client";

import { FormEvent, useState } from "react";

export function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || "Subscription failed.");

      setStatus("success");
      setMessage(result.message || "You are subscribed.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Subscription failed.");
    }
  }

  return (
    <form onSubmit={subscribe} aria-describedby="subscription-status">
      <label className="sr-only" htmlFor="subscriber-email">Email address</label>
      <input
        id="subscriber-email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="Enter your email address"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        disabled={status === "loading"}
        required
      />
      <button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Subscribing…" : "Subscribe"} <i />
      </button>
      <p id="subscription-status" className={`subscription-status ${status}`} aria-live="polite">{message}</p>
    </form>
  );
}
