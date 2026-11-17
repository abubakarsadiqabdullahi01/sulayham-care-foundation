import { NextResponse } from "next/server";

/**
 * Contact endpoint.
 *
 * Validates the submission, drops bots via a honeypot, then emails it through
 * Resend. Set RESEND_API_KEY to turn delivery on; CONTACT_TO and CONTACT_FROM
 * override the destination and sender. With no key it logs and accepts, so
 * local and preview builds still work.
 */

type Payload = {
  name?: string;
  organisation?: string;
  email?: string;
  phone?: string;
  interest?: string;
  message?: string;
  /** Honeypot — real people leave it empty. */
  company?: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Payload;

  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Send valid JSON." }, { status: 400 });
  }

  if (body.company) {
    // Bot filled the honeypot. Accept quietly so it learns nothing.
    return NextResponse.json({ ok: true });
  }

  const errors: string[] = [];
  if (!body.name?.trim()) errors.push("Name is required.");
  if (!body.email?.trim() || !EMAIL.test(body.email)) errors.push("A valid email address is required.");
  if (!body.message?.trim() || body.message.trim().length < 10)
    errors.push("Please write at least a sentence so we can route the enquiry.");
  if ((body.message?.length ?? 0) > 5000) errors.push("Please keep the message under 5000 characters.");

  if (errors.length) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const key = process.env.RESEND_API_KEY;

  // No key configured (local dev, preview builds): log and accept, exactly as
  // before, so the form never breaks just because delivery is not wired yet.
  if (!key) {
    console.info("[SCAF enquiry]", {
      receivedAt: new Date().toISOString(),
      name: body.name,
      organisation: body.organisation ?? null,
      email: body.email,
      phone: body.phone ?? null,
      interest: body.interest ?? null,
      message: body.message,
    });
    return NextResponse.json({ ok: true });
  }

  // Plain text, not HTML, so nothing in the submission needs escaping.
  const lines = [
    `Name:         ${body.name}`,
    `Organisation: ${body.organisation?.trim() || "—"}`,
    `Email:        ${body.email}`,
    `Phone:        ${body.phone?.trim() || "—"}`,
    `About:        ${body.interest?.trim() || "—"}`,
    "",
    body.message,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM ?? "SCAF website <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO ?? "scafinformations@gmail.com"],
        // Collapse whitespace: the name is untrusted and this ends up in a header.
        subject: `SCAF enquiry — ${String(body.name).replace(/\s+/g, " ").slice(0, 80)}`,
        reply_to: body.email,
        text: lines,
      }),
    });

    if (!res.ok) {
      console.error("[SCAF enquiry] delivery failed", res.status, await res.text());
      return NextResponse.json({ error: "Could not send." }, { status: 502 });
    }
  } catch (cause) {
    console.error("[SCAF enquiry] delivery threw", cause);
    return NextResponse.json({ error: "Could not send." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
