/**
 * src/lib/mailer.ts
 *
 * Singleton Nodemailer transporter.
 * All SMTP credentials are read exclusively from environment variables –
 * never from client-side code.
 */

import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

let transporter: Transporter | null = null;

async function getTransporter(): Promise<Transporter> {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT ?? "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    const missing = [];
    if (!host) missing.push("SMTP_HOST");
    if (!user) missing.push("SMTP_USER");
    if (!pass) missing.push("SMTP_PASS");
    console.error("CONTACT API ERROR: Missing environment variables:", missing.join(", "));
    throw new Error(`Missing environment variables: ${missing.join(", ")}`);
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,        // true for port 465, false for 587/25
    auth: { user, pass },
    tls: { rejectUnauthorized: false },  // allow self-signed certs in dev
  });

  try {
    await transporter.verify();
    console.log("✓ SMTP connected successfully");
  } catch (error) {
    console.error("✗ SMTP auth failed:", error);
    transporter = null; // Reset so next time it tries again
    throw error;
  }

  return transporter;
}

export interface ContactEmailPayload {
  fullName: string;
  email: string;
  phone?: string;
  institution?: string;
  country?: string;
  subject: string;
  message: string;
  submittedAt: string;
}

/** Sends the contact-form submission to the configured recipient. */
export async function sendContactEmail(payload: ContactEmailPayload): Promise<void> {
  const {
    fullName, email, phone, institution, country,
    subject, message, submittedAt,
  } = payload;

  const to = process.env.EMAIL_TO ?? "vijayakumarkadumbadi23@gmail.com";

  // Some strict SMTP servers reject the email if a name is prepended.
  // Use strictly the email address without < > or names.
  const from = process.env.SMTP_USER;

  const textBody = `
A new inquiry has been submitted through the JFDAI website.

Name:        ${fullName}
Email:       ${email}
Phone:       ${phone || "Not provided"}
Institution: ${institution || "Not provided"}
Country:     ${country || "Not provided"}
Subject:     ${subject}

Message:
${message}

Submitted On:
${submittedAt}
`.trim();

  const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:30px 0;">
    <tr><td align="center">
      <table width="620" cellpadding="0" cellspacing="0"
             style="background:#ffffff;border:1px solid #e5e7eb;border-top:4px solid #0B4A8F;">
        <!-- Header -->
        <tr>
          <td style="background:#0B4A8F;padding:20px 30px;">
            <p style="margin:0;font-size:11px;color:#BFD4EA;letter-spacing:2px;text-transform:uppercase;">
              Journal of Federated and Distributed AI
            </p>
            <h1 style="margin:4px 0 0;font-size:18px;color:#ffffff;font-weight:700;">
              New Contact Form Submission
            </h1>
          </td>
        </tr>
        <!-- Intro -->
        <tr>
          <td style="padding:24px 30px 8px;">
            <p style="margin:0;font-size:13px;color:#4b5563;line-height:1.6;">
              A new inquiry has been submitted through the JFDAI website contact form.
            </p>
          </td>
        </tr>
        <!-- Sender details -->
        <tr>
          <td style="padding:8px 30px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0"
                   style="border:1px solid #e5e7eb;border-radius:4px;overflow:hidden;">
              ${row("Name", fullName)}
              ${row("Email", `<a href="mailto:${email}" style="color:#2D6DB5;">${email}</a>`)}
              ${row("Phone", phone || "<em style='color:#9ca3af'>Not provided</em>", "#f9fafb")}
              ${row("Institution", institution || "<em style='color:#9ca3af'>Not provided</em>")}
              ${row("Country", country || "<em style='color:#9ca3af'>Not provided</em>", "#f9fafb")}
              ${row("Subject", subject)}
            </table>
          </td>
        </tr>
        <!-- Message -->
        <tr>
          <td style="padding:0 30px 24px;">
            <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#0B4A8F;
                      text-transform:uppercase;letter-spacing:1px;">Message</p>
            <div style="background:#f9fafb;border:1px solid #e5e7eb;border-left:3px solid #2D6DB5;
                        padding:14px 16px;font-size:13px;color:#374151;line-height:1.7;
                        white-space:pre-wrap;">${escapeHtml(message)}</div>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;border-top:1px solid #e5e7eb;
                     padding:14px 30px;font-size:11px;color:#9ca3af;">
            Submitted on: <strong style="color:#6b7280;">${submittedAt}</strong>
            &nbsp;·&nbsp; JFDAI Contact System &nbsp;·&nbsp; Do not reply to this automated email.
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
`.trim();

  const tp = await getTransporter();
  await tp.sendMail({
    from,
    to,
    replyTo: `"${fullName}" <${email}>`,
    subject: `New Contact Form Submission - JFDAI Website`,
    text: textBody,
    html: htmlBody,
  });
  console.log("✓ Email sent");
}

/* ── helpers ────────────────────────────────────────────────────── */

function row(label: string, value: string, bg = "#ffffff"): string {
  return `
    <tr style="background:${bg};">
      <td style="width:130px;padding:9px 14px;font-size:11px;font-weight:700;
                 color:#6b7280;text-transform:uppercase;letter-spacing:.5px;
                 border-bottom:1px solid #f3f4f6;">${label}</td>
      <td style="padding:9px 14px;font-size:13px;color:#111827;
                 border-bottom:1px solid #f3f4f6;">${value}</td>
    </tr>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
