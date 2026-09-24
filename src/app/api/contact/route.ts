import { NextResponse } from "next/server";

/**
 * Contact endpoint.
 *
 * Right now this validates the submission and logs it, so the form works from
 * the moment the site is deployed. To deliver the message, replace the marked
 * block with your mail provider (Resend, SendGrid, SMTP via Nodemailer) or
 * write the row to your database.
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

  if (errors.length) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  // ---- Replace this block with real delivery -------------------------------
  console.info("[SCAF enquiry]", {
    receivedAt: new Date().toISOString(),
    name: body.name,
    organisation: body.organisation ?? null,
    email: body.email,
    phone: body.phone ?? null,
    interest: body.interest ?? null,
    message: body.message,
  });
  // -------------------------------------------------------------------------

  return NextResponse.json({ ok: true });
}
