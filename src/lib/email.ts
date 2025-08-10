import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendConfirmEmail(to: string, token: string) {
  const url = `${process.env.BASE_URL}/confirm?token=${encodeURIComponent(token)}`;
  const html = `
    <div style="font-family:system-ui,Segoe UI,Arial">
      <h2>Confirm your subscription</h2>
      <p>Thanks for subscribing. Please confirm by clicking the link below:</p>
      <p><a href="${url}">Confirm subscription</a></p>
    </div>
  `;
  if (!process.env.RESEND_API_KEY) {
    console.log("[DEV] Confirm link:", url);
    return;
  }
  await resend.emails.send({
    from: process.env.FROM_EMAIL!,
    to,
    subject: "Confirm your subscription",
    html,
  });
}

export async function sendIssueEmail(to: string, subject: string, html: string) {
  if (!process.env.RESEND_API_KEY) {
    console.log(`[DEV] Would email ${to}: ${subject}`);
    return;
  }
  await resend.emails.send({
    from: process.env.FROM_EMAIL!,
    to,
    subject,
    html,
  });
}
