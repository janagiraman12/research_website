"use client";

/**
 * src/components/ContactForm.tsx
 *
 * JFDAI Contact Form
 * – All required fields validated client-side before submission
 * – Submitted via fetch() to POST /api/contact (no page reload)
 * – Honeypot anti-spam field (_hp) is hidden from real users
 * – Shows loading spinner, success banner, or error banner
 */

import React, { useState, useRef } from "react";

/* ── Types ─────────────────────────────────────────────────────── */

interface FormFields {
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  country: string;
  subject: string;
  message: string;
  _hp: string;  // honeypot – must stay empty
}

interface FieldError {
  fullName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

const EMPTY: FormFields = {
  fullName: "", email: "", phone: "", institution: "",
  country: "", subject: "", message: "", _hp: "",
};

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia",
  "Australia", "Austria", "Azerbaijan", "Bahrain", "Bangladesh", "Belarus", "Belgium",
  "Bolivia", "Bosnia and Herzegovina", "Brazil", "Bulgaria", "Cambodia", "Cameroon",
  "Canada", "Chile", "China", "Colombia", "Croatia", "Cuba", "Cyprus", "Czech Republic",
  "Denmark", "Egypt", "Estonia", "Ethiopia", "Finland", "France", "Georgia", "Germany",
  "Ghana", "Greece", "Guatemala", "Hungary", "India", "Indonesia", "Iran", "Iraq",
  "Ireland", "Israel", "Italy", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait",
  "Latvia", "Lebanon", "Libya", "Lithuania", "Luxembourg", "Malaysia", "Mali", "Malta",
  "Mexico", "Morocco", "Myanmar", "Nepal", "Netherlands", "New Zealand", "Nigeria",
  "North Korea", "Norway", "Oman", "Pakistan", "Palestine", "Peru", "Philippines",
  "Poland", "Portugal", "Qatar", "Romania", "Russia", "Saudi Arabia", "Senegal",
  "Serbia", "Singapore", "Slovakia", "Slovenia", "Somalia", "South Africa",
  "South Korea", "Spain", "Sri Lanka", "Sudan", "Sweden", "Switzerland", "Syria",
  "Taiwan", "Tanzania", "Thailand", "Tunisia", "Turkey", "Uganda", "Ukraine",
  "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
  "Venezuela", "Vietnam", "Yemen", "Zimbabwe",
];

/* ── Validation ─────────────────────────────────────────────────── */

function validate(f: FormFields): FieldError {
  const errors: FieldError = {};

  if (!f.fullName.trim() || f.fullName.trim().length < 2)
    errors.fullName = "Please enter your full name (min 2 characters).";

  if (!f.email.trim())
    errors.email = "Email address is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim()))
    errors.email = "Please enter a valid email address.";

  if (f.phone && !/^[+\d\s\-().]{0,20}$/.test(f.phone.trim()))
    errors.phone = "Phone number contains invalid characters.";

  if (!f.subject.trim() || f.subject.trim().length < 3)
    errors.subject = "Subject must be at least 3 characters.";

  if (!f.message.trim() || f.message.trim().length < 10)
    errors.message = "Message must be at least 10 characters.";

  return errors;
}

/* ── Component ──────────────────────────────────────────────────── */

export default function ContactForm() {
  const [fields, setFields] = useState<FormFields>(EMPTY);
  const [errors, setErrors] = useState<FieldError>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [apiError, setApiError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  /* helpers */
  const set = (key: keyof FormFields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setFields(prev => ({ ...prev, [key]: e.target.value }));

  const clearError = (key: keyof FieldError) =>
    setErrors(prev => { const next = { ...prev }; delete next[key]; return next; });

  /* submit */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const errs = validate(fields);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus("loading");
    setApiError("");

    try {
      console.log("Submitting:", fields);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      const data = await res.json();
      console.log("Response:", data);

      if (res.ok && data.success) {
        setStatus("success");
        setFields(EMPTY);
        setErrors({});
      } else if (res.status === 429) {
        setStatus("error");
        setApiError(data.error ?? "Too many requests. Please wait a minute and try again.");
      } else {
        setStatus("error");
        // Show actual server error message
        setApiError(data.error ?? "Unable to send your message at this time. Please try again later.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      setStatus("error");
      setApiError("Unable to send your message at this time. Please try again later.");
    }
  }

  /* ── Shared field classes ────────────────────────────────────── */
  const inputCls = (err?: string) =>
    `w-full text-sm p-2.5 border ${err ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"}
     focus:outline-none focus:ring-2 focus:ring-[#2D6DB5] focus:border-transparent
     transition-colors placeholder-gray-400`;

  const labelCls = "block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wide";
  const errMsg = (msg?: string) =>
    msg ? <p className="mt-1 text-[11px] text-red-600 font-semibold">{msg}</p> : null;

  /* ── Render ──────────────────────────────────────────────────── */
  return (
    <div className="bg-white border border-gray-200 shadow-sm">
      {/* Section header */}
      <div className="bg-[#0B4A8F] px-6 py-4">
        <h3 className="text-white font-bold text-base uppercase tracking-wider">
          Send Us a Message
        </h3>
        <p className="text-[#BFD4EA] text-xs mt-0.5">
          All fields marked <span className="text-red-300 font-bold">*</span> are required.
        </p>
      </div>

      <div className="p-6">
        {/* ── Success banner ── */}
        {status === "success" && (
          <div className="mb-6 flex gap-3 items-start bg-green-50 border border-green-300
                          p-4 rounded text-sm text-green-800">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-600" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-bold">Message Sent Successfully!</p>
              <p className="mt-0.5 leading-relaxed">
                Thank you for contacting JFDAI. Your message has been sent successfully.
                Our editorial team will get back to you shortly.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-3 text-xs font-bold text-green-700 underline hover:text-green-900"
              >
                Send another message
              </button>
            </div>
          </div>
        )}

        {/* ── Error banner ── */}
        {status === "error" && (
          <div className="mb-6 flex gap-3 items-start bg-red-50 border border-red-300
                          p-4 rounded text-sm text-red-800">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-bold">Submission Failed</p>
              <p className="mt-0.5">{apiError}</p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-2 text-xs font-bold text-red-700 underline hover:text-red-900"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* ── Form (hidden after success) ── */}
        {status !== "success" && (
          <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">

            {/* Honeypot – hidden from real users, catches bots */}
            <input
              type="text"
              name="_hp"
              value={fields._hp}
              onChange={set("_hp")}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-[-9999px] w-px h-px overflow-hidden"
            />

            {/* Row 1: Full Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="jf-fullName" className={labelCls}>
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="jf-fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="Dr. Jane Smith"
                  value={fields.fullName}
                  onChange={set("fullName")}
                  onBlur={() => clearError("fullName")}
                  className={inputCls(errors.fullName)}
                  maxLength={120}
                />
                {errMsg(errors.fullName)}
              </div>

              <div>
                <label htmlFor="jf-email" className={labelCls}>
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="jf-email"
                  type="email"
                  autoComplete="email"
                  placeholder="j.smith@university.edu"
                  value={fields.email}
                  onChange={set("email")}
                  onBlur={() => clearError("email")}
                  className={inputCls(errors.email)}
                />
                {errMsg(errors.email)}
              </div>
            </div>

            {/* Row 2: Phone + Institution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="jf-phone" className={labelCls}>Phone Number</label>
                <input
                  id="jf-phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+91 98765 43210"
                  value={fields.phone}
                  onChange={set("phone")}
                  onBlur={() => clearError("phone")}
                  className={inputCls(errors.phone)}
                  maxLength={20}
                />
                {errMsg(errors.phone)}
              </div>

              <div>
                <label htmlFor="jf-institution" className={labelCls}>
                  Institution / Organization
                </label>
                <input
                  id="jf-institution"
                  type="text"
                  autoComplete="organization"
                  placeholder="Madras Engineering College"
                  value={fields.institution}
                  onChange={set("institution")}
                  className={inputCls()}
                  maxLength={200}
                />
              </div>
            </div>

            {/* Row 3: Country + Subject */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="jf-country" className={labelCls}>Country</label>
                <select
                  id="jf-country"
                  value={fields.country}
                  onChange={set("country")}
                  className={`${inputCls()} cursor-pointer`}
                >
                  <option value="">— Select your country —</option>
                  {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label htmlFor="jf-subject" className={labelCls}>
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  id="jf-subject"
                  type="text"
                  placeholder="Inquiry about manuscript submission"
                  value={fields.subject}
                  onChange={set("subject")}
                  onBlur={() => clearError("subject")}
                  className={inputCls(errors.subject)}
                  maxLength={200}
                />
                {errMsg(errors.subject)}
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="jf-message" className={labelCls}>
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="jf-message"
                rows={6}
                placeholder="Please describe your inquiry in detail..."
                value={fields.message}
                onChange={set("message")}
                onBlur={() => clearError("message")}
                className={`${inputCls(errors.message)} resize-y`}
                maxLength={5000}
              />
              <div className="flex justify-between items-center mt-1">
                {errMsg(errors.message)}
                <span className={`text-[11px] ml-auto font-medium ${fields.message.length > 4800 ? "text-orange-500" : "text-gray-400"
                  }`}>
                  {fields.message.length} / 5000
                </span>
              </div>
            </div>

            {/* Privacy note */}
            <p className="text-[11px] text-gray-500 leading-relaxed border-t border-gray-100 pt-4">
              By submitting this form, your message will be sent securely to the JFDAI editorial
              office at <strong>vijayakumarkadumbadi23@gmail.com</strong>. We do not share your contact
              details with third parties.
            </p>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex items-center justify-center gap-2 w-full md:w-auto
                         px-8 py-3 bg-[#0B4A8F] hover:bg-[#2D6DB5]
                         disabled:bg-gray-400 disabled:cursor-not-allowed
                         text-white font-bold text-sm uppercase tracking-wider
                         transition-colors duration-200 shadow-sm"
            >
              {status === "loading" ? (
                <>
                  {/* Spinner */}
                  <svg className="animate-spin w-4 h-4 text-white flex-shrink-0"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10"
                      stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending…
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7
                             a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send Message
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
