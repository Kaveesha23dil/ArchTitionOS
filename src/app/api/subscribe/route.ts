import { NextResponse } from "next/server";
import { markWelcomeEmailSent, saveSubscriber } from "@/lib/subscribers";
import { sendProjectWelcomeEmail } from "@/lib/welcome-email";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const email = typeof body === "object" && body !== null && "email" in body
    ? String(body.email).trim().toLowerCase()
    : "";

  if (!emailPattern.test(email) || email.length > 254) {
    return NextResponse.json({ message: "Enter a valid email address." }, { status: 422 });
  }

  try {
    const subscriber = saveSubscriber(email);
    if (!subscriber.emailSentAt) {
      await sendProjectWelcomeEmail(email);
      markWelcomeEmailSent(email);
    }

    return NextResponse.json({ message: "You are subscribed. Check your inbox for our project introduction." });
  } catch (error) {
    console.error("Subscription failed", error);
    return NextResponse.json(
      { message: "Your address was saved, but the welcome email could not be sent. Please try again shortly." },
      { status: 503 },
    );
  }
}
