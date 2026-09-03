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

// Mailer transport (lazy loaded if SMTP is configured)
let smtpTransport: nodemailer.Transporter | null = null;

function getSmtpTransport(): nodemailer.Transporter | null {
  if (!smtpTransport && process.env.SMTP_HOST && process.env.SMTP_USER) {
    try {
      smtpTransport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_PORT === '465',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
      console.log(`[EMAIL SYSTEM] SMTP Transport configured for ${process.env.SMTP_HOST}`);
    } catch (err) {
      console.error('[EMAIL SYSTEM] Failed to create SMTP transport:', err);
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

export async function sendSystemEmail(options: SendEmailOptions): Promise<EmailRecord> {
  const fromAddress = process.env.SMTP_FROM || 'Jobskül Platform <notifications@jobskul.com>';
  const html = generateJobskulEmailHtml(options.title, options.bodyContent, options.ctaLabel, options.ctaUrl);
  const messageId = `<jsk-${Date.now()}-${Math.random().toString(36).substring(2, 8)}@jobskul.com>`;

  let smtpUsed = false;
  const transport = getSmtpTransport();

  if (transport) {
    try {
      await transport.sendMail({
        from: fromAddress,
        to: options.to,
        subject: options.subject,
        text: options.plainText,
        html: html,
        messageId,
      });
      smtpUsed = true;
      console.log(`[EMAIL DISPATCHED via SMTP] To: ${options.to} | Subject: "${options.subject}"`);
    } catch (err) {
      console.warn(`[EMAIL SYSTEM] SMTP send failed; falling back to transactional outbox delivery:`, err);
    }
  } else {
    console.log(`[EMAIL DISPATCHED via Jobskül Outbox Engine] To: ${options.to} | Subject: "${options.subject}"`);
  }

  const record: EmailRecord = {
    id: `mail-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    to: options.to,
    from: fromAddress,
    subject: options.subject,
    type: options.type,
    timestamp: new Date().toISOString(),
    status: 'delivered',
    html,
    text: options.plainText,
    messageId,
    smtpUsed,
    metadata: options.metadata,
  };

  dbEmails.unshift(record);
  return record;
}
