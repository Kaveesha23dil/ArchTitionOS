import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { promises as fs } from "fs";
import path from "path";

// Lazily initialised — avoids "Missing API key" crash at build time
// when RESEND_API_KEY is not yet set in the environment.
function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not configured. Add it to .env.local");
  return new Resend(key);
}

const DB_PATH = path.join(process.cwd(), "data", "subscribers.json");

interface Subscriber {
  email: string;
  subscribedAt: string;
}

async function readSubscribers(): Promise<Subscriber[]> {
  try {
    const raw = await fs.readFile(DB_PATH, "utf8");
    return JSON.parse(raw) as Subscriber[];
  } catch {
    return [];
  }
}

async function writeSubscribers(list: Subscriber[]): Promise<void> {
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
  await fs.writeFile(DB_PATH, JSON.stringify(list, null, 2), "utf8");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= 254;
}

function buildEmailHtml(email: string): string {
  const year = new Date().getFullYear();
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Welcome to ArchTitan OS</title>
</head>
<body style="margin:0;padding:0;background:#070b12;font-family:'Segoe UI',ui-sans-serif,system-ui,sans-serif;-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#070b12;padding:48px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#0c111a;border:1px solid rgba(255,255,255,0.1);border-radius:12px;overflow:hidden;">
        <tr>
          <td style="background:linear-gradient(135deg,#546dff,#3b55e6);padding:32px 40px;">
            <p style="margin:0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.7);font-weight:600;">Adaptive Linux Distribution</p>
            <h1 style="margin:8px 0 0;font-size:28px;font-weight:800;color:#ffffff;letter-spacing:-0.04em;line-height:1.2;">ArchTitan <span style="color:#a5b4fc;">OS</span></h1>
            <p style="margin:10px 0 0;font-size:13px;color:rgba(255,255,255,0.75);line-height:1.6;">Context-aware. Developer-centric. Built on Linux.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:40px 40px 32px;">
            <p style="margin:0 0 8px;font-size:13px;color:#8e96a8;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;">Welcome aboard</p>
            <h2 style="margin:0 0 20px;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.03em;line-height:1.3;">You are now part of the ArchTitan research community.</h2>
            <p style="margin:0 0 28px;font-size:14px;color:#a2a7b0;line-height:1.7;">Thanks for subscribing, <strong style="color:#fff;">${email}</strong>. We will keep you updated with development milestones, technical findings, and future release announcements.</p>
            <hr style="border:none;border-top:1px solid rgba(255,255,255,0.1);margin:0 0 28px;"/>
            <p style="margin:0 0 12px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#546dff;font-weight:700;">About ArchTitan OS</p>
            <p style="margin:0 0 20px;font-size:14px;color:#a2a7b0;line-height:1.7;">ArchTitan OS is an adaptive <strong style="color:#fff;">Arch Linux distribution</strong> designed for developer workloads. It understands workspace topology and cross-device context, then allocates CPU, memory, and GPU resources where they actually matter automatically.</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr>
                <td width="48%" style="background:#101620;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:16px 18px;vertical-align:top;">
                  <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#5ce1e6;font-weight:700;">THM Daemon</p>
                  <p style="margin:0;font-size:13px;color:#a2a7b0;line-height:1.55;">Real-time workspace classifier that adapts CPU and memory policies per developer context.</p>
                </td>
                <td width="4%"></td>
                <td width="48%" style="background:#101620;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:16px 18px;vertical-align:top;">
                  <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#5ce1e6;font-weight:700;">TitanShare</p>
                  <p style="margin:0;font-size:13px;color:#a2a7b0;line-height:1.55;">Secure, zero-config P2P file transfer over local networks with mDNS discovery.</p>
                </td>
              </tr>
              <tr><td colspan="3" style="height:12px;"></td></tr>
              <tr>
                <td width="48%" style="background:#101620;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:16px 18px;vertical-align:top;">
                  <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#5ce1e6;font-weight:700;">TitanMirror</p>
                  <p style="margin:0;font-size:13px;color:#a2a7b0;line-height:1.55;">Low-latency Android screen mirroring with H.264 hardware encoding and full touch control.</p>
                </td>
                <td width="4%"></td>
                <td width="48%" style="background:#101620;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:16px 18px;vertical-align:top;">
                  <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#5ce1e6;font-weight:700;">Hyprland Desktop</p>
                  <p style="margin:0;font-size:13px;color:#a2a7b0;line-height:1.55;">Tiling Wayland compositor with GPU-accelerated rendering and workspace-aware layouts.</p>
                </td>
              </tr>
            </table>
            <table cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
              <tr>
                <td style="background:linear-gradient(135deg,#546dff,#3b55e6);border-radius:100px;">
                  <a href="https://archtitan.dev" style="display:inline-block;padding:14px 28px;background:linear-gradient(135deg,#546dff,#3b55e6);border-radius:100px;font-size:13px;font-weight:700;color:#ffffff;text-decoration:none;">Explore ArchTitan OS</a>
                </td>
              </tr>
            </table>
            <p style="margin:0 0 14px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#8e96a8;font-weight:700;">Follow the project</p>
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-right:10px;"><a href="https://github.com/archtitan" style="display:inline-block;padding:8px 14px;background:#101620;border:1px solid rgba(255,255,255,0.1);border-radius:6px;font-size:12px;font-weight:600;color:#a2a7b0;text-decoration:none;">GitHub</a></td>
                <td style="padding-right:10px;"><a href="https://linkedin.com/company/archtitan" style="display:inline-block;padding:8px 14px;background:#101620;border:1px solid rgba(255,255,255,0.1);border-radius:6px;font-size:12px;font-weight:600;color:#a2a7b0;text-decoration:none;">LinkedIn</a></td>
                <td><a href="https://x.com/archtitan_os" style="display:inline-block;padding:8px 14px;background:#101620;border:1px solid rgba(255,255,255,0.1);border-radius:6px;font-size:12px;font-weight:600;color:#a2a7b0;text-decoration:none;">X / Twitter</a></td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:#070b12;padding:20px 40px;border-top:1px solid rgba(255,255,255,0.07);">
            <p style="margin:0;font-size:11px;color:#4a5263;line-height:1.6;">You are receiving this because you subscribed at archtitan.dev.<br/>Copyright ${year} ArchTitan OS. All rights reserved.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const subscribers = await readSubscribers();
    const alreadyExists = subscribers.some((s) => s.email === email);
    if (alreadyExists) {
      return NextResponse.json({ error: "This email is already subscribed." }, { status: 409 });
    }

    subscribers.push({ email, subscribedAt: new Date().toISOString() });
    await writeSubscribers(subscribers);

    let warning: string | undefined;
    try {
      const resend = getResend();
      const fromAddress = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
      const { error: sendError } = await resend.emails.send({
        from: `ArchTitan OS <${fromAddress}>`,
        to: email,
        subject: "Welcome to the ArchTitan OS research community",
        html: buildEmailHtml(email),
      });
      if (sendError) {
        console.error("[subscribe] Resend error:", sendError);
        warning = "Subscribed! Confirmation email could not be sent right now.";
      }
    } catch (emailErr) {
      console.error("[subscribe] Email init error:", emailErr);
      warning = "Subscribed! Add RESEND_API_KEY to .env.local to enable welcome emails.";
    }

    return NextResponse.json({ ok: true, ...(warning ? { warning } : {}) }, { status: 200 });
  } catch (err) {
    console.error("[subscribe] Unexpected error:", err);
    return NextResponse.json({ error: "An unexpected error occurred. Please try again." }, { status: 500 });
  }
}
