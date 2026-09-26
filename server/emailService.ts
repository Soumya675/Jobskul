import nodemailer from 'nodemailer';

export interface EmailRecord {
  id: string;
  to: string;
  from: string;
  subject: string;
  type: 'application_submitted' | 'interview_scheduled' | 'status_updated' | 'candidate_invitation' | 'test_verification';
  timestamp: string;
  status: 'delivered' | 'sent';
  html: string;
  text: string;
  messageId: string;
  smtpUsed: boolean;
  metadata?: Record<string, any>;
}

// In-memory persistent email outbox
export const dbEmails: EmailRecord[] = [
  {
    id: 'mail-init-1',
    to: 'soumya.parida2022@gift.edu.in',
    from: 'Jobskül Platform <notifications@jobskul.com>',
    subject: 'Welcome to Jobskül Talent Ecosystem — Account Verified',
    type: 'test_verification',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    status: 'delivered',
    messageId: '<init-1@jobskul.com>',
    smtpUsed: false,
    text: 'Welcome to Jobskül! Your account is active. Explore verified jobs, AI matching, and technical project tracks.',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden; background: #FFFFFF;">
        <div style="background: #0073C8; padding: 24px; text-align: center; color: #FFFFFF;">
          <h1 style="margin: 0; font-size: 24px; font-weight: 900; letter-spacing: -0.5px;">Jobskül</h1>
          <p style="margin: 4px 0 0; font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;">HIRE • TRAIN • DEPLOY</p>
        </div>
        <div style="padding: 28px; color: #1E293B; line-height: 1.6;">
          <h2 style="font-size: 18px; font-weight: 800; margin-top: 0; color: #0F172A;">Welcome to Jobskül Ecosystem</h2>
          <p style="font-size: 14px; color: #475569;">Hello Soumya, your account is verified and fully operational. You now have access to 100% verified employer listings, AI-assisted ATS resume scoring, and live project workbenches.</p>
          <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px; margin: 20px 0;">
            <p style="margin: 0; font-size: 13px; font-weight: 600; color: #2563EB;">✓ Status: Ready for Deployments & Applications</p>
          </div>
          <p style="font-size: 13px; color: #64748B;">Best regards,<br/>The Jobskül Engineering Team</p>
        </div>
      </div>
    `,
    metadata: { candidateName: 'Soumya Parida' }
  }
];

// Reusable branded email layout generator
export function generateJobskulEmailHtml(title: string, bodyContent: string, ctaLabel?: string, ctaUrl?: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin: 0; padding: 20px; background-color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0F172A;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #FFFFFF; border-radius: 12px; border: 1px solid #E2E8F0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);" cellspacing="0" cellpadding="0" border="0">
          <!-- Header Bar -->
          <tr>
            <td style="background-color: #0073C8; padding: 26px 30px; text-align: center;">
              <div style="display: inline-block;">
                <span style="font-size: 32px; font-weight: 900; color: #FFFFFF; letter-spacing: -1px;">Jobs<span style="position: relative;">k<span style="color: #FFFFFF;">ü</span></span>l</span>
                <div style="margin-top: 6px; padding: 4px 14px; background: #005FA8; border-radius: 4px; display: inline-block;">
                  <span style="color: #FFFFFF; font-size: 10px; font-weight: 800; letter-spacing: 3px; text-transform: uppercase;">HIRE &bull; TRAIN &bull; DEPLOY</span>
                </div>
              </div>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding: 36px 32px; font-size: 14px; line-height: 1.65; color: #334155;">
              <h1 style="font-size: 20px; font-weight: 800; color: #0F172A; margin-top: 0; margin-bottom: 18px; line-height: 1.3;">${title}</h1>
              
              ${bodyContent}

              ${ctaLabel && ctaUrl ? `
                <div style="margin: 28px 0; text-align: center;">
                  <a href="${ctaUrl}" style="background-color: #0073C8; color: #FFFFFF; font-weight: 700; font-size: 13px; text-decoration: none; padding: 12px 24px; border-radius: 8px; display: inline-block;">
                    ${ctaLabel} &rarr;
                  </a>
                </div>
              ` : ''}

              <hr style="border: none; border-top: 1px solid #E2E8F0; margin: 30px 0 20px;" />

              <p style="font-size: 12px; color: #64748B; margin: 0;">
                Sent via <strong>Jobskül Talent Cloud</strong> &bull; Industry-Ready Placement Engine<br/>
                Need support? Contact <a href="mailto:support@jobskul.com" style="color: #0073C8; text-decoration: none;">support@jobskul.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

// Mailer transport (lazy loaded and dynamically configurable)
let smtpTransport: nodemailer.Transporter | null = null;
let lastDeliveryError: string | null = null;
let lastDispatchedAt: string | null = null;
let lastDeliveryStatus: 'success' | 'failed' | 'idle' = 'idle';

let currentSmtpConfig: {
  host?: string;
  port?: number;
  secure?: boolean;
  user?: string;
  pass?: string;
  service?: string;
  resendApiKey?: string;
} = {
  host: process.env.SMTP_HOST || (process.env.GMAIL_USER ? 'smtp.gmail.com' : undefined),
  port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : (process.env.GMAIL_USER ? 465 : 587),
  secure: process.env.SMTP_PORT === '465' || !!process.env.GMAIL_USER,
  user: process.env.SMTP_USER || process.env.GMAIL_USER,
  pass: process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD,
  service: process.env.GMAIL_USER ? 'gmail' : undefined,
  resendApiKey: process.env.RESEND_API_KEY
};

export function updateSmtpConfig(config: {
  host?: string;
  port?: number;
  secure?: boolean;
  user?: string;
  pass?: string;
  service?: string;
  resendApiKey?: string;
}) {
  currentSmtpConfig = { ...currentSmtpConfig, ...config };
  smtpTransport = null; // force re-creation
  lastDeliveryError = null;
  console.log(`[EMAIL SYSTEM] Mail configuration updated at runtime. User: ${currentSmtpConfig.user || 'None'} | Resend: ${Boolean(currentSmtpConfig.resendApiKey)}`);
}

export function getSmtpStatus() {
  const isSmtpConfigured = Boolean(
    (currentSmtpConfig.host || currentSmtpConfig.service) &&
    currentSmtpConfig.user &&
    currentSmtpConfig.pass
  );
  const isResendConfigured = Boolean(currentSmtpConfig.resendApiKey || process.env.RESEND_API_KEY);
  const isConfigured = isSmtpConfigured || isResendConfigured;

  let activeEngine: 'resend' | 'gmail' | 'smtp' | 'outbox' = 'outbox';
  if (isResendConfigured) {
    activeEngine = 'resend';
  } else if (currentSmtpConfig.service === 'gmail' || (currentSmtpConfig.user && currentSmtpConfig.user.includes('@gmail.com'))) {
    activeEngine = 'gmail';
  } else if (isSmtpConfigured) {
    activeEngine = 'smtp';
  }

  return {
    configured: isConfigured,
    activeEngine,
    resendConfigured: isResendConfigured,
    smtpConfigured: isSmtpConfigured,
    host: currentSmtpConfig.host || (currentSmtpConfig.service ? 'Gmail Service (smtp.gmail.com)' : (isResendConfigured ? 'Resend HTTPS API (api.resend.com)' : 'Local Outbox Engine')),
    port: currentSmtpConfig.port || 587,
    user: currentSmtpConfig.user ? `${currentSmtpConfig.user.substring(0, 3)}***@***` : (isResendConfigured ? 'Resend API Key' : 'None'),
    rawUser: currentSmtpConfig.user || '',
    service: currentSmtpConfig.service || (isResendConfigured ? 'resend' : 'custom'),
    lastDeliveryStatus,
    lastDeliveryError,
    lastDispatchedAt,
    totalDelivered: dbEmails.filter(e => e.smtpUsed).length,
    totalOutbox: dbEmails.length
  };
}

function getSmtpTransport(): nodemailer.Transporter | null {
  const host = currentSmtpConfig.host || process.env.SMTP_HOST;
  const user = currentSmtpConfig.user || process.env.SMTP_USER || process.env.GMAIL_USER;
  const pass = currentSmtpConfig.pass || process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;
  const port = currentSmtpConfig.port || (process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587);
  const secure = currentSmtpConfig.secure !== undefined ? currentSmtpConfig.secure : (port === 465);

  if (!smtpTransport && user && pass) {
    try {
      if (currentSmtpConfig.service === 'gmail' || (user && user.includes('@gmail.com'))) {
        smtpTransport = nodemailer.createTransport({
          service: 'gmail',
          auth: { user, pass }
        });
        console.log(`[EMAIL SYSTEM] Gmail SMTP Transport initialized for: ${user}`);
      } else if (host) {
        smtpTransport = nodemailer.createTransport({
          host,
          port,
          secure,
          auth: { user, pass },
          tls: {
            rejectUnauthorized: false
          }
        });
        console.log(`[EMAIL SYSTEM] Custom SMTP Transport initialized for host: ${host}:${port}`);
      }
    } catch (err: any) {
      console.error('[EMAIL SYSTEM] Failed to create SMTP transport:', err);
      lastDeliveryError = `Transport Init Failed: ${err.message}`;
    }
  }
  return smtpTransport;
}

export interface SendEmailOptions {
  to: string;
  subject: string;
  type: EmailRecord['type'];
  title: string;
  bodyContent: string;
  plainText: string;
  ctaLabel?: string;
  ctaUrl?: string;
  metadata?: Record<string, any>;
}

export async function sendSystemEmail(options: SendEmailOptions): Promise<EmailRecord & { deliveryMethod: 'resend' | 'smtp' | 'outbox'; deliveryError?: string | null }> {
  const fromAddress = process.env.SMTP_FROM || 'Jobskül Platform <notifications@jobskul.com>';
  const html = generateJobskulEmailHtml(options.title, options.bodyContent, options.ctaLabel, options.ctaUrl);
  const messageId = `<jsk-${Date.now()}-${Math.random().toString(36).substring(2, 8)}@jobskul.com>`;

  let smtpUsed = false;
  let deliveryMethod: 'resend' | 'smtp' | 'outbox' = 'outbox';
  let sendError: string | null = null;

  // 1. Check for Resend API (HTTP REST — bypasses container port blocks)
  const resendApiKey = currentSmtpConfig.resendApiKey || process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`
        },
        body: JSON.stringify({
          from: fromAddress.includes('@') ? fromAddress : 'Jobskül Notifications <onboarding@resend.dev>',
          to: [options.to],
          subject: options.subject,
          html: html,
          text: options.plainText
        })
      });

      const resData: any = await res.json().catch(() => ({}));
      if (res.ok && resData?.id) {
        smtpUsed = true;
        deliveryMethod = 'resend';
        lastDeliveryStatus = 'success';
        lastDeliveryError = null;
        lastDispatchedAt = new Date().toISOString();
        console.log(`[EMAIL DISPATCHED via Resend HTTP API] Message ID: ${resData.id} to: ${options.to}`);
      } else {
        sendError = resData?.message || `Resend HTTP error ${res.status}`;
        console.warn(`[EMAIL SYSTEM] Resend delivery rejected:`, resData);
      }
    } catch (err: any) {
      sendError = `Resend Fetch Exception: ${err.message}`;
      console.warn(`[EMAIL SYSTEM] Resend request failed:`, err);
    }
  }

  // 2. If Resend not used/failed, try Nodemailer SMTP Transport (Gmail or Custom SMTP)
  if (!smtpUsed) {
    const transport = getSmtpTransport();
    if (transport) {
      try {
        const info = await transport.sendMail({
          from: fromAddress,
          to: options.to,
          subject: options.subject,
          text: options.plainText,
          html: html,
          messageId,
        });
        smtpUsed = true;
        deliveryMethod = 'smtp';
        lastDeliveryStatus = 'success';
        lastDeliveryError = null;
        lastDispatchedAt = new Date().toISOString();
        console.log(`[EMAIL DISPATCHED via SMTP] To: ${options.to} | MessageId: ${info.messageId}`);
      } catch (err: any) {
        sendError = `SMTP Error: ${err.message || String(err)}`;
        lastDeliveryStatus = 'failed';
        lastDeliveryError = sendError;
        console.warn(`[EMAIL SYSTEM] SMTP transmission failed:`, err);
      }
    } else if (!resendApiKey) {
      sendError = "No external mail credentials (RESEND_API_KEY, GMAIL_APP_PASSWORD, or SMTP_PASS) are configured. Saved to Jobskül transactional outbox.";
    }
  }

  if (sendError && !smtpUsed) {
    lastDeliveryStatus = 'failed';
    lastDeliveryError = sendError;
  }

  const record: EmailRecord = {
    id: `mail-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    to: options.to,
    from: fromAddress,
    subject: options.subject,
    type: options.type,
    timestamp: new Date().toISOString(),
    status: smtpUsed ? 'delivered' : 'sent',
    html,
    text: options.plainText,
    messageId,
    smtpUsed,
    metadata: {
      ...options.metadata,
      deliveryMethod,
      deliveryError: sendError
    },
  };

  dbEmails.unshift(record);
  return {
    ...record,
    deliveryMethod,
    deliveryError: sendError
  };
}
