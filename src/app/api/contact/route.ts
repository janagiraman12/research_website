/**
 * src/app/api/contact/route.ts
 *
 * POST /api/contact
 * Accepts JSON body, validates & sanitises, rate-limits by IP,
 * then sends an email via Nodemailer.
 */

import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail }          from "@/lib/mailer";
import { checkRateLimit }            from "@/lib/rateLimiter";

/* ── Types ─────────────────────────────────────────────────────── */

interface ContactBody {
  fullName:    string;
  email:       string;
  phone?:      string;
  institution?: string;
  country?:    string;
  subject:     string;
  message:     string;
}

/* ── Helpers ────────────────────────────────────────────────────── */

/** Remove HTML tags and trim whitespace. */
function sanitize(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.replace(/<[^>]*>/g, "").trim();
}

/** Basic RFC 5322 email check. */
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validationError(field: string, message: string) {
  console.log(`✗ Validation failed: ${field} - ${message}`);
  return NextResponse.json(
    { success: false, error: `${field}: ${message}` },
    { status: 400 }
  );
}

/** Resolve the requester's IP from standard proxy headers. */
function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

/* ── Route handler ──────────────────────────────────────────────── */

export async function POST(req: NextRequest): Promise<NextResponse> {
  /* 1 · Rate limiting ─────────────────────────────────────────── */
  const ip     = getIp(req);
  const limit  = checkRateLimit(ip, { maxRequests: 5, windowMs: 60_000 });

  if (!limit.allowed) {
    const retryAfter = Math.ceil((limit.resetAt - Date.now()) / 1000);
    return NextResponse.json(
      { success: false, error: "Too many requests. Please wait a minute and try again." },
      {
        status: 429,
        headers: {
          "Retry-After":               String(retryAfter),
          "X-RateLimit-Limit":         "5",
          "X-RateLimit-Remaining":     "0",
          "X-RateLimit-Reset":         String(limit.resetAt),
        },
      }
    );
  }

  /* 2 · Parse body ────────────────────────────────────────────── */
  console.log("✓ Request received");
  let body: ContactBody;
  try {
    body = await req.json();
    console.log("Incoming request body:", JSON.stringify({ ...body, message: body.message?.substring(0, 50) + "..." }));
  } catch {
    console.error("✗ Invalid JSON body");
    return NextResponse.json(
      { success: false, error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  /* 3 · Sanitise inputs ───────────────────────────────────────── */
  const fullName    = sanitize(body.fullName);
  const email       = sanitize(body.email);
  const phone       = sanitize(body.phone);
  const institution = sanitize(body.institution);
  const country     = sanitize(body.country);
  const subject     = sanitize(body.subject);
  const message     = sanitize(body.message);

  /* 4 · Server-side validation ────────────────────────────────── */
  if (!fullName || fullName.length < 2)
    return validationError("Full Name", "must be at least 2 characters.");

  if (fullName.length > 120)
    return validationError("Full Name", "must be at most 120 characters.");

  if (!email)
    return validationError("Email", "is required.");

  if (!isValidEmail(email))
    return validationError("Email", "is not a valid email address.");

  if (phone && !/^[+\d\s\-().]{0,20}$/.test(phone))
    return validationError("Phone", "contains invalid characters.");

  if (!subject || subject.length < 3)
    return validationError("Subject", "must be at least 3 characters.");

  if (subject.length > 200)
    return validationError("Subject", "must be at most 200 characters.");

  if (!message || message.length < 10)
    return validationError("Message", "must be at least 10 characters.");

  if (message.length > 5000)
    return validationError("Message", "must be at most 5 000 characters.");

  /* 5 · Anti-spam: honeypot field (optional – UI sends "_hp": "") */
  if ((body as unknown as Record<string, unknown>)["_hp"]) {
    // Silent reject — bot filled the hidden honeypot field
    return NextResponse.json({ success: true });
  }

  /* 6 · Format submission timestamp ──────────────────────────── */
  const submittedAt = new Date().toLocaleString("en-GB", {
    timeZone:    "Asia/Kolkata",
    day:         "2-digit",
    month:       "long",
    year:        "numeric",
    hour:        "2-digit",
    minute:      "2-digit",
    second:      "2-digit",
    hour12:      true,
  }) + " IST";

  /* 7 · Send email ────────────────────────────────────────────── */
  try {
    console.log("✓ Validation passed. Attempting to send email...");
    await sendContactEmail({
      fullName,
      email,
      phone:       phone       || undefined,
      institution: institution || undefined,
      country:     country     || undefined,
      subject,
      message,
      submittedAt,
    });

    return NextResponse.json(
      { success: true, message: "Contact form submitted successfully." },
      {
        status: 200,
        headers: {
          "X-RateLimit-Limit":     "5",
          "X-RateLimit-Remaining": String(limit.remaining),
          "X-RateLimit-Reset":     String(limit.resetAt),
        },
      }
    );
  } catch (err: any) {
    console.error("CONTACT API ERROR:", err);
    let errorMessage = "Unable to send your message at this time. Please try again later.";
    
    if (err.message?.includes("Missing environment variables")) {
      errorMessage = "Missing environment variables. Server configuration error.";
      console.error("✗ Missing env variable");
    } else if (err.code === "EAUTH" || err.responseCode === 535) {
      errorMessage = "Email authentication failed. Invalid SMTP login.";
      console.error("✗ SMTP auth failed");
    } else {
      console.error("✗ Email send failed");
    }

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

/* Block every other HTTP verb */
export async function GET()    { return NextResponse.json({ error: "Method not allowed." }, { status: 405 }); }
export async function PUT()    { return NextResponse.json({ error: "Method not allowed." }, { status: 405 }); }
export async function DELETE() { return NextResponse.json({ error: "Method not allowed." }, { status: 405 }); }
