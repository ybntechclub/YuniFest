// =========================================================================
// YUNIFEST 2026 — Official Participant Confirmation Email Template
// Dark Cyberpunk Festival Theme:
// - Direct YUNIFEST Organizing Committee Branding (No third-party club names)
// - Glowing Neon Cyan Token Card (#00F0FF)
// - Emerald WhatsApp Channel Action Box (#10B981)
// - Official Committee Footer (NO personal phone, email, or coordinator name)
// - STRICT: NO QR CODE INCLUDED (as requested)
// =========================================================================

export interface EmailTemplateParams {
  fullName: string;
  email: string;
  registrationCode: string;
  eventName: string;
  studentIdNumber: string;
  institutionName?: string;
  participationCategory?: string;
  transactionId?: string;
  amountInr?: number;
  whatsAppChannelUrl?: string;
}

export const DEFAULT_WHATSAPP_CHANNEL_URL = 
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.YUNIFEST_WHATSAPP_CHANNEL_URL) || 
  'https://whatsapp.com/channel/0029Va9yunifest2026';

/**
 * Generates an email-client-compatible HTML email
 * Inlined styles, responsive tables, dark aesthetic with neon cyan & emerald accents
 */
export function generateRegistrationEmailHtml(params: EmailTemplateParams): string {
  const {
    fullName,
    registrationCode,
    eventName,
    studentIdNumber,
    institutionName = "YBN University, Ranchi",
    participationCategory = "INDIVIDUAL",
    transactionId = "",
    amountInr = 399,
    whatsAppChannelUrl = DEFAULT_WHATSAPP_CHANNEL_URL,
  } = params;

  const cleanName = (fullName || "Participant").toUpperCase().trim();
  const token = (registrationCode || "YUNI-2026").trim();
  const event = (eventName || "Festival Event").trim();
  const idNum = (studentIdNumber || "N/A").trim();
  const mode = (participationCategory || "INDIVIDUAL").toUpperCase().trim();
  const txn = (transactionId || "").trim();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>YUNIFEST 2026 — Registration Token ${token}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #050811; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f1f5f9; line-height: 1.5; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #050811; padding: 28px 12px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; background-color: #0c1322; border: 1.5px solid #1e293b; border-radius: 24px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.75);">
          
          <!-- Top Header: Title & Fest Info -->
          <tr>
            <td align="center" style="padding: 32px 24px 22px 24px; background: linear-gradient(180deg, #101c36 0%, #0c1322 100%); border-bottom: 1px solid #1e293b;">
              <div style="display: inline-block; padding: 4px 14px; border-radius: 999px; background-color: rgba(0, 240, 255, 0.1); border: 1px solid rgba(0, 240, 255, 0.3); font-family: 'Courier New', Courier, monospace; font-size: 11px; font-weight: bold; color: #00F0FF; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px;">
                ANNUAL MEGA FESTIVAL
              </div>
              <h1 style="margin: 0; font-size: 28px; font-weight: 900; color: #ffffff; letter-spacing: 1.5px; text-transform: uppercase;">
                YUNI<span style="color: #00F0FF;">FEST</span> 2026
              </h1>
              <p style="margin: 6px 0 0 0; font-size: 12px; color: #94a3b8; font-weight: 500; letter-spacing: 0.5px;">
                YBN University • Namkum, Ranchi, Jharkhand
              </p>
            </td>
          </tr>

          <!-- Congratulations Greeting -->
          <tr>
            <td style="padding: 26px 24px 12px 24px;">
              <h2 style="margin: 0 0 8px 0; font-size: 19px; font-weight: 800; color: #ffffff;">
                Congratulations, <span style="color: #38bdf8;">${cleanName}</span>! 👏
              </h2>
              <p style="margin: 0; font-size: 13.5px; color: #cbd5e1; line-height: 1.6;">
                Your official registration for <strong style="color: #ffffff;">${event}</strong> has been successfully confirmed and recorded by the <strong style="color: #38bdf8;">YUNIFEST 2026 Organizing Committee</strong>.
              </p>
            </td>
          </tr>

          <!-- Official Registration Token Badge (Neon Cyan Cyberpunk Box) -->
          <tr>
            <td style="padding: 10px 24px 18px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #06182c; border: 2px solid #00F0FF; border-radius: 16px; box-shadow: 0 0 24px rgba(0, 240, 255, 0.18);">
                <tr>
                  <td align="center" style="padding: 22px 16px;">
                    <div style="font-family: 'Courier New', Courier, monospace; font-size: 11px; font-weight: bold; color: #7dd3fc; letter-spacing: 2.5px; text-transform: uppercase; margin-bottom: 6px;">
                      OFFICIAL REGISTRATION TOKEN
                    </div>
                    <div style="font-family: 'Courier New', Courier, monospace; font-size: 32px; font-weight: 900; color: #00F0FF; letter-spacing: 3px; text-shadow: 0 0 12px rgba(0, 240, 255, 0.4);">
                      ${token}
                    </div>
                    <div style="font-size: 11px; color: #94a3b8; margin-top: 6px;">
                      Present this Token at the festival check-in desk for your Entry Pass
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Participant & Event Details Table -->
          <tr>
            <td style="padding: 0 24px 18px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; border: 1px solid #1e293b; border-radius: 14px; font-size: 12.5px;">
                <tr>
                  <td style="padding: 11px 16px; border-bottom: 1px solid #1e293b; color: #94a3b8; width: 42%;">Participant:</td>
                  <td style="padding: 11px 16px; border-bottom: 1px solid #1e293b; color: #ffffff; font-weight: bold; text-align: right;">${cleanName}</td>
                </tr>
                <tr>
                  <td style="padding: 11px 16px; border-bottom: 1px solid #1e293b; color: #94a3b8;">Roll No / Student ID:</td>
                  <td style="padding: 11px 16px; border-bottom: 1px solid #1e293b; color: #38bdf8; font-family: monospace; font-weight: bold; text-align: right;">${idNum}</td>
                </tr>
                <tr>
                  <td style="padding: 11px 16px; border-bottom: 1px solid #1e293b; color: #94a3b8;">Registered Event:</td>
                  <td style="padding: 11px 16px; border-bottom: 1px solid #1e293b; color: #ffffff; font-weight: bold; text-align: right;">${event}</td>
                </tr>
                <tr>
                  <td style="padding: 11px 16px; border-bottom: 1px solid #1e293b; color: #94a3b8;">Participation Mode:</td>
                  <td style="padding: 11px 16px; border-bottom: 1px solid #1e293b; color: #00F0FF; font-weight: bold; text-align: right;">${mode}</td>
                </tr>
                ${institutionName ? `
                <tr>
                  <td style="padding: 11px 16px; border-bottom: 1px solid #1e293b; color: #94a3b8;">Institution:</td>
                  <td style="padding: 11px 16px; border-bottom: 1px solid #1e293b; color: #e2e8f0; text-align: right;">${institutionName}</td>
                </tr>
                ` : ''}
                ${txn ? `
                <tr>
                  <td style="padding: 11px 16px; color: #94a3b8;">Transaction / UTR:</td>
                  <td style="padding: 11px 16px; color: #22c55e; font-family: monospace; font-weight: bold; text-align: right;">${txn} (₹${amountInr})</td>
                </tr>
                ` : ''}
              </table>
            </td>
          </tr>

          <!-- WhatsApp Channel Banner (Neon Green Box) -->
          <tr>
            <td style="padding: 0 24px 18px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #062319; border: 2px solid #10b981; border-radius: 16px; box-shadow: 0 0 20px rgba(16, 185, 129, 0.15);">
                <tr>
                  <td align="center" style="padding: 22px 18px;">
                    <div style="font-size: 15px; font-weight: 800; color: #ffffff; margin-bottom: 6px;">
                      📲 Join Official YUNIFEST 2026 WhatsApp Channel
                    </div>
                    <p style="margin: 0 0 16px 0; font-size: 12px; color: #a7f3d0; line-height: 1.5; max-width: 440px;">
                      Get real-time updates, event schedules, reporting slots, rules, and live festival announcements directly on WhatsApp!
                    </p>
                    <a href="${whatsAppChannelUrl}" target="_blank" style="display: inline-block; background-color: #10b981; color: #022c22; font-size: 13px; font-weight: 800; padding: 12px 28px; border-radius: 999px; text-decoration: none; letter-spacing: 0.5px; box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4);">
                      📲 Join WhatsApp Channel Now →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Inspirational Festival Card (Purple/Magenta Box) -->
          <tr>
            <td style="padding: 0 24px 20px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #160c24; border: 1.5px solid #a855f7; border-radius: 16px;">
                <tr>
                  <td align="center" style="padding: 18px 18px;">
                    <div style="font-size: 13px; font-weight: bold; color: #f0abfc; margin-bottom: 6px;">
                      Empowering Student Innovation, Culture &amp; Talent 💡
                    </div>
                    <p style="margin: 0; font-size: 12px; color: #e9d5ff; font-style: italic; line-height: 1.6;">
                      "Your ideas have the power to turn possibilities into reality. Think bold, build smart, and let your brilliance illuminate YUNIFEST 2026!"
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Official Organizing Committee Footer (No personal phone, email, or names) -->
          <tr>
            <td align="center" style="padding: 24px 24px 28px 24px; background-color: #070c18; border-top: 1px solid #1e293b;">
              <div style="font-size: 11px; font-family: 'Courier New', Courier, monospace; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 6px;">
                ISSUED BY
              </div>
              <div style="font-size: 14px; font-weight: 800; color: #ffffff; letter-spacing: 0.5px; margin-bottom: 4px;">
                YUNIFEST 2026 Organizing Committee
              </div>
              <div style="font-size: 11.5px; color: #94a3b8;">
                YBN University • Namkum, Ranchi, Jharkhand 834010
              </div>
              <div style="margin-top: 14px; padding-top: 12px; border-top: 1px solid rgba(30, 41, 59, 0.6); font-size: 10.5px; color: #64748b; line-height: 1.5;">
                This is an official festival communication. Please present this confirmation email and your Token <strong>${token}</strong> at the festival reception on arrival.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
