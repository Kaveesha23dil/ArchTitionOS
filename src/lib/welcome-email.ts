type ResendResponse = { id?: string; message?: string };

export async function sendProjectWelcomeEmail(email: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const projectUrl = process.env.PROJECT_SITE_URL || "http://localhost:3000";

  if (!apiKey || !from) {
    throw new Error("Email delivery is not configured.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [email],
      subject: "Welcome to the ArchTitan OS research community",
      html: `
        <div style="background:#070b12;color:#f4f3ef;padding:40px;font-family:Arial,sans-serif;line-height:1.6">
          <p style="color:#5ce1e6;font-weight:700">ARCHTITAN OS</p>
          <h1 style="font-size:32px;line-height:1.1">Thanks for following our research.</h1>
          <p>ArchTitan OS is a context-aware, developer-centric Linux distribution built around workspace-aware resource orchestration and a native Linux-Android ecosystem.</p>
          <p>You are now subscribed to project milestones, technical findings, and release updates.</p>
          <a href="${projectUrl}" style="display:inline-block;margin-top:18px;padding:12px 18px;border-radius:999px;background:#546dff;color:#fff;text-decoration:none;font-weight:700">Explore ArchTitan OS</a>
        </div>
      `,
      text: `Thanks for following ArchTitan OS. You are now subscribed to project milestones, technical findings, and release updates. Explore the project: ${projectUrl}`,
    }),
  });

  const result = (await response.json()) as ResendResponse;
  if (!response.ok) {
    throw new Error(result.message || "The welcome email could not be sent.");
  }

  return result.id;
}
