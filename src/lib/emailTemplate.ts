// =========================================================================
// YUNIFEST 2026 — Official Participant Confirmation Email Template
// Styled to match the dark cyberpunk festival theme:
// Neon Cyan Token Badge + Green WhatsApp Channel Box + Registration Desk Head
// STRICT: NO QR CODE INCLUDED (as requested)
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
  registrationHeadName?: string;
  registrationHeadPhone?: string;
  registrationHeadEmail?: string;
}

export const DEFAULT_WHATSAPP_CHANNEL_URL = 
  import.meta.env.VITE_WHATSAPP_CHANNEL_URL || 
  import.meta.env.YUNIFEST_WHATSAPP_CHANNEL_URL || 
  'https://whatsapp.com/channel/0029Va9yunifest2026';

export const DEFAULT_REGISTRATION_HEAD = {
  name: "Satyam Kumar",
  phone: "+91 99053 36808",
  email: "ybntechclub01@gmail.com",
  role: "Technical & Registration Desk Head"
};

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
    registrationHeadName = DEFAULT_REGISTRATION_HEAD.name,
    registrationHeadPhone = DEFAULT_REGISTRATION_HEAD.phone,
    registrationHeadEmail = DEFAULT_REGISTRATION_HEAD.email
  } = params;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>YUNIFEST 2026 — Registration Token ${registrationCode}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #060911; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f1f5f9; line-height: 1.5; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #060911; padding: 24px 12px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; background-color: #0b111e; border: 1.5px solid #1e293b; border-radius: 24px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);">
          
          <!-- Top Header: Title & Subtitle -->
          <tr>
            <td align="center" style="padding: 32px 24px 20px 24px; background: linear-gradient(180deg, #0e1a33 0%, #0b111e 100%); border-bottom: 1px solid #1e293b;">
              <h1 style="margin: 0; font-size: 26px; font-weight: 900; color: #00F0FF; letter-spacing: 1.5px; text-transform: uppercase;">
                YUNIFEST 2026
              </h1>
              <p style="margin: 6px 0 0 0; font-size: 12px; color: #94a3b8; font-weight: 500; letter-spacing: 0.5px;">
                Annual Mega Festival • YBN University, Ranchi
              </p>
            </td>
          </tr>

          <!-- Congratulations Greeting -->
          <tr>
            <td style="padding: 28px 24px 12px 24px;">
              <h2 style="margin: 0 0 10px 0; font-size: 19px; font-weight: 800; color: #ffffff;">
                Congratulations, <span style="color: #38bdf8;">${fullName.toUpperCase()}</span>! 👏
              </h2>
              <p style="margin: 0; font-size: 13.5px; color: #cbd5e1; line-height: 1.6;">
                Your registration for <strong style="color: #ffffff;">${eventName}</strong> organized by the <em style="color: #94a3b8;">YBN University Fest Organizing Committee</em> has been successfully recorded!
              </p>
            </td>
          </tr>

          <!-- Official Registration Token Badge (Neon Cyan Cyberpunk Box) -->
          <tr>
            <td style="padding: 12px 24px 20px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #06182c; border: 2px solid #00F0FF; border-radius: 16px; box-shadow: 0 0 20px rgba(0, 240, 255, 0.15);">
                <tr>
                  <td align="center" style="padding: 22px 16px;">
                    <div style="font-family: 'Courier New', Courier, monospace; font-size: 11px; font-weight: bold; color: #7dd3fc; letter-spacing: 2.5px; text-transform: uppercase; margin-bottom: 6px;">
                      YOUR OFFICIAL REGISTRATION TOKEN
                    </div>
                    <div style="font-family: 'Courier New', Courier, monospace; font-size: 32px; font-weight: 900; color: #00F0FF; letter-spacing: 3px;">
                      ${registrationCode}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Participant & Event Details Table -->
          <tr>
            <td style="padding: 0 24px 20px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; border: 1px solid #1e293b; border-radius: 14px; font-size: 12.5px;">
                <tr>
                  <td style="padding: 10px 16px; border-bottom: 1px solid #1e293b; color: #94a3b8; width: 42%;">Participant Name:</td>
                  <td style="padding: 10px 16px; border-bottom: 1px solid #1e293b; color: #ffffff; font-weight: bold; text-align: right;">${fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; border-bottom: 1px solid #1e293b; color: #94a3b8;">College ID / Roll No:</td>
                  <td style="padding: 10px 16px; border-bottom: 1px solid #1e293b; color: #38bdf8; font-family: monospace; font-weight: bold; text-align: right;">${studentIdNumber}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; border-bottom: 1px solid #1e293b; color: #94a3b8;">Registered Event:</td>
                  <td style="padding: 10px 16px; border-bottom: 1px solid #1e293b; color: #ffffff; font-weight: bold; text-align: right;">${eventName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; border-bottom: 1px solid #1e293b; color: #94a3b8;">Participation Mode:</td>
                  <td style="padding: 10px 16px; border-bottom: 1px solid #1e293b; color: #00F0FF; font-weight: bold; text-align: right; text-transform: uppercase;">${participationCategory.toUpperCase()}</td>
                </tr>
                ${institutionName ? `
                <tr>
                  <td style="padding: 10px 16px; border-bottom: 1px solid #1e293b; color: #94a3b8;">Institution:</td>
                  <td style="padding: 10px 16px; border-bottom: 1px solid #1e293b; color: #e2e8f0; text-align: right;">${institutionName}</td>
                </tr>
                ` : ''}
                ${transactionId ? `
                <tr>
                  <td style="padding: 10px 16px; color: #94a3b8;">Transaction / UTR:</td>
                  <td style="padding: 10px 16px; color: #22c55e; font-family: monospace; font-weight: bold; text-align: right;">${transactionId} (₹${amountInr})</td>
                </tr>
                ` : ''}
              </table>
            </td>
          </tr>

          <!-- WhatsApp Channel Banner (Neon Green Box) -->
          <tr>
            <td style="padding: 0 24px 20px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #062319; border: 2px solid #10b981; border-radius: 16px; box-shadow: 0 0 20px rgba(16, 185, 129, 0.15);">
                <tr>
                  <td align="center" style="padding: 22px 18px;">
                    <div style="font-size: 15px; font-weight: 800; color: #ffffff; margin-bottom: 6px;">
                      📲 Join Official YUNIFEST 2026 WhatsApp Channel
                    </div>
                    <p style="margin: 0 0 16px 0; font-size: 12px; color: #a7f3d0; line-height: 1.5; max-width: 440px;">
                      Get live event alerts, schedule updates, presentation guidelines, and instant announcements directly on WhatsApp!
                    </p>
                    <a href="${whatsAppChannelUrl}" target="_blank" style="display: inline-block; background-color: #10b981; color: #022c22; font-size: 13px; font-weight: 800; padding: 12px 28px; border-radius: 999px; text-decoration: none; letter-spacing: 0.5px; box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4);">
                      📲 Join WhatsApp Channel Now →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Inspirational Thank You Card (Purple/Magenta Box) -->
          <tr>
            <td style="padding: 0 24px 20px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #190e28; border: 1.5px solid #a855f7; border-radius: 16px;">
                <tr>
                  <td align="center" style="padding: 18px 18px;">
                    <div style="font-size: 13px; font-weight: bold; color: #f0abfc; margin-bottom: 6px;">
                      Thank you from YBN Tech Club &amp; Fest Committee! 🙏
                    </div>
                    <p style="margin: 0; font-size: 12px; color: #e9d5ff; font-style: italic; line-height: 1.6;">
                      "Your ideas have the power to turn possibilities into reality. Think bold, build smart, and let your innovation shine! 💡"
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Registration Desk Head & Contact Footer -->
          <tr>
            <td align="center" style="padding: 22px 24px 28px 24px; background-color: #070c18; border-top: 1px solid #1e293b;">
              <div style="font-size: 11px; font-family: 'Courier New', Courier, monospace; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 6px;">
                Need Help? Contact Registration Head:
              </div>
              <div style="font-size: 13px; font-weight: bold; color: #ffffff; margin-bottom: 4px;">
                ${registrationHeadName} <span style="color: #64748b;">(Registration &amp; Technical Head)</span>
              </div>
              <div style="font-size: 12px; color: #38bdf8; font-family: 'Courier New', Courier, monospace;">
                <a href="tel:${registrationHeadPhone.replace(/\\s+/g, '')}" style="color: #38bdf8; text-decoration: none; font-weight: bold;">${registrationHeadPhone}</a>
                <span style="color: #475569; margin: 0 8px;">|</span>
                <a href="mailto:${registrationHeadEmail}" style="color: #38bdf8; text-decoration: none; font-weight: bold;">${registrationHeadEmail}</a>
              </div>
              <p style="margin: 14px 0 0 0; font-size: 10.5px; color: #64748b; line-height: 1.5;">
                YBN University Campus, Namkum, Ranchi, Jharkhand 834010<br>
                Please save this email or keep your Token <strong>${registrationCode}</strong> handy at the physical check-in desk.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
