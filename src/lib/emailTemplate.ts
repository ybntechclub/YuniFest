// =========================================================================
// YUNIFEST 2026 - Official Participant Confirmation Email Template
// Direct YUNIFEST Organizing Committee Branding
// - 100% Clean Character Encoding (Zero raw emojis to prevent question marks)
// - Highlights the verified Registration Token (e.g. YUNI-2026-XXXX)
// - Complete 3-Day Festival Itinerary & Event Lineup Showcase
// - WhatsApp Group Direct Access Box
// - Official Committee Footer (NO personal phone, email, or coordinator names)
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
  day1Event?: string;
  day2Event?: string;
  day3Event?: string;
}

export const DEFAULT_WHATSAPP_CHANNEL_URL = 
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.YUNIFEST_WHATSAPP_CHANNEL_URL) || 
  'https://chat.whatsapp.com/CKA2mG98J8GGrNvuGDYHmw?mode=gi_t';

/**
 * Generates an email-client-compatible HTML email
 * Inlined styles, responsive tables, cyberpunk aesthetics with zero corruptible characters
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
    day1Event = eventName || "Technical & Innovation Day",
    day2Event = "Cultural Day Showcase & Competitions",
    day3Event = "Grand Runway & EDM DJ Concert",
  } = params;

  const cleanName = (fullName || "Participant").toUpperCase().trim();
  const token = (registrationCode || "YUNI-2026").trim();
  const idNum = (studentIdNumber || "N/A").trim();
  const mode = (participationCategory || "INDIVIDUAL").toUpperCase().trim();
  const txn = (transactionId || "").trim();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>YUNIFEST 2026 - Registration Token ${token}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #050811; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f1f5f9; line-height: 1.5; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #050811; padding: 28px 12px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 580px; background-color: #0c1322; border: 1.5px solid #1e293b; border-radius: 24px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.75);">
          
          <!-- Top Header: Title & Fest Info -->
          <tr>
            <td align="center" style="padding: 30px 24px 20px 24px; background: linear-gradient(180deg, #101c36 0%, #0c1322 100%); border-bottom: 1px solid #1e293b;">
              <div style="display: inline-block; padding: 4px 14px; border-radius: 999px; background-color: rgba(0, 240, 255, 0.1); border: 1px solid rgba(0, 240, 255, 0.3); font-family: 'Courier New', Courier, monospace; font-size: 11px; font-weight: bold; color: #00F0FF; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px;">
                ANNUAL MEGA FESTIVAL
              </div>
              <h1 style="margin: 0; font-size: 28px; font-weight: 900; color: #ffffff; letter-spacing: 1.5px; text-transform: uppercase;">
                YUNI<span style="color: #00F0FF;">FEST</span> 2026
              </h1>
              <p style="margin: 6px 0 0 0; font-size: 12px; color: #94a3b8; font-weight: 500; letter-spacing: 0.5px;">
                YBN University &bull; Namkum, Ranchi, Jharkhand
              </p>
            </td>
          </tr>

          <!-- Status Bar -->
          <tr>
            <td style="background-color: #064e3b; border-bottom: 1px solid #059669; padding: 12px 24px; text-align: center;">
              <span style="font-family: 'Courier New', Courier, monospace; font-size: 12px; font-weight: bold; color: #6ee7b7; letter-spacing: 1px; text-transform: uppercase;">
                [VERIFIED] REGISTRATION COMPLETE &bull; 3-DAY PASS CONFIRMED
              </span>
            </td>
          </tr>

          <!-- Confirmation Greeting -->
          <tr>
            <td style="padding: 24px 24px 14px 24px;">
              <h2 style="margin: 0 0 10px 0; font-size: 20px; font-weight: 800; color: #ffffff;">
                Congratulations, <span style="color: #38bdf8;">${cleanName}</span>!
              </h2>
              <p style="margin: 0; font-size: 14px; color: #cbd5e1; line-height: 1.6;">
                Your official registration in <strong style="color: #ffffff;">YUNIFEST 2026</strong> is complete! Your festival pass and payment have been verified by the <strong style="color: #38bdf8;">YUNIFEST 2026 Organizing Committee</strong>. You have confirmed entry to all three days of the festival.
              </p>
            </td>
          </tr>

          <!-- Official Registration Token Badge (Neon Cyan Box) -->
          <tr>
            <td style="padding: 6px 24px 18px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #06182c; border: 2px solid #00F0FF; border-radius: 16px; box-shadow: 0 0 24px rgba(0, 240, 255, 0.18);">
                <tr>
                  <td align="center" style="padding: 20px 16px;">
                    <div style="font-family: 'Courier New', Courier, monospace; font-size: 11px; font-weight: bold; color: #7dd3fc; letter-spacing: 2.5px; text-transform: uppercase; margin-bottom: 6px;">
                      OFFICIAL REGISTRATION TOKEN
                    </div>
                    <div style="font-family: 'Courier New', Courier, monospace; font-size: 32px; font-weight: 900; color: #00F0FF; letter-spacing: 3px; text-shadow: 0 0 12px rgba(0, 240, 255, 0.4);">
                      ${token}
                    </div>
                    <div style="font-size: 11px; color: #94a3b8; margin-top: 6px;">
                      Present this Token at the festival check-in desk for your Entry Pass &amp; Badge
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- 3-DAY FESTIVAL SCHEDULE / EVENT ITINERARY (All 3 Days) -->
          <tr>
            <td style="padding: 0 24px 18px 24px;">
              <div style="font-family: 'Courier New', Courier, monospace; font-size: 11px; font-weight: bold; color: #38bdf8; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 8px;">
                YOUR 3-DAY FESTIVAL ITINERARY &amp; EVENT LINEUP
              </div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; border: 1px solid #1e293b; border-radius: 14px; overflow: hidden; font-size: 12.5px;">
                
                <!-- Day 1 -->
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #1e293b; width: 34%; background-color: rgba(56, 189, 248, 0.05); vertical-align: top;">
                    <div style="font-family: 'Courier New', Courier, monospace; font-size: 10px; font-weight: bold; color: #38bdf8; text-transform: uppercase;">
                      DAY 01 // DEC 10
                    </div>
                    <div style="font-size: 10px; color: #94a3b8;">
                      Tech &amp; Innovation
                    </div>
                  </td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #1e293b; color: #ffffff; font-weight: bold;">
                    ${day1Event}
                  </td>
                </tr>

                <!-- Day 2 -->
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #1e293b; background-color: rgba(168, 85, 247, 0.05); vertical-align: top;">
                    <div style="font-family: 'Courier New', Courier, monospace; font-size: 10px; font-weight: bold; color: #c084fc; text-transform: uppercase;">
                      DAY 02 // DEC 11
                    </div>
                    <div style="font-size: 10px; color: #94a3b8;">
                      Cultural &amp; Stage
                    </div>
                  </td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #1e293b; color: #ffffff; font-weight: bold;">
                    ${day2Event}
                  </td>
                </tr>

                <!-- Day 3 -->
                <tr>
                  <td style="padding: 12px 16px; background-color: rgba(236, 72, 153, 0.05); vertical-align: top;">
                    <div style="font-family: 'Courier New', Courier, monospace; font-size: 10px; font-weight: bold; color: #f472b6; text-transform: uppercase;">
                      DAY 03 // DEC 12
                    </div>
                    <div style="font-size: 10px; color: #94a3b8;">
                      Grand Finale &amp; EDM
                    </div>
                  </td>
                  <td style="padding: 12px 16px; color: #ffffff; font-weight: bold;">
                    ${day3Event}
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
                  <td style="padding: 11px 16px; border-bottom: 1px solid #1e293b; color: #94a3b8; width: 40%;">Participant:</td>
                  <td style="padding: 11px 16px; border-bottom: 1px solid #1e293b; color: #ffffff; font-weight: bold; text-align: right;">${cleanName}</td>
                </tr>
                <tr>
                  <td style="padding: 11px 16px; border-bottom: 1px solid #1e293b; color: #94a3b8;">Roll No / Student ID:</td>
                  <td style="padding: 11px 16px; border-bottom: 1px solid #1e293b; color: #38bdf8; font-family: monospace; font-weight: bold; text-align: right;">${idNum}</td>
                </tr>
                <tr>
                  <td style="padding: 11px 16px; border-bottom: 1px solid #1e293b; color: #94a3b8;">Institution:</td>
                  <td style="padding: 11px 16px; border-bottom: 1px solid #1e293b; color: #e2e8f0; text-align: right;">${institutionName}</td>
                </tr>
                <tr>
                  <td style="padding: 11px 16px; border-bottom: 1px solid #1e293b; color: #94a3b8;">Participation Mode:</td>
                  <td style="padding: 11px 16px; border-bottom: 1px solid #1e293b; color: #00F0FF; font-weight: bold; text-align: right;">${mode}</td>
                </tr>
                ${txn ? `
                <tr>
                  <td style="padding: 11px 16px; border-bottom: 1px solid #1e293b; color: #94a3b8;">Transaction / UTR:</td>
                  <td style="padding: 11px 16px; border-bottom: 1px solid #1e293b; color: #22c55e; font-family: monospace; font-weight: bold; text-align: right;">${txn} (&#8377;${amountInr})</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 11px 16px; color: #94a3b8;">Festival Access:</td>
                  <td style="padding: 11px 16px; color: #ffffff; font-weight: bold; text-align: right;">Dec 10, 11 &amp; 12, 2026 (All 3 Days)</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Mandatory Campus Entry Policy -->
          <tr>
            <td style="padding: 0 24px 18px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #1c1917; border-left: 4px solid #f59e0b; border-radius: 8px;">
                <tr>
                  <td style="padding: 12px 16px;">
                    <div style="font-family: 'Courier New', Courier, monospace; font-size: 11px; font-weight: bold; color: #fbbf24; text-transform: uppercase; margin-bottom: 4px;">
                      MANDATORY CAMPUS ENTRY POLICY
                    </div>
                    <div style="font-size: 12px; color: #d6d3d1; line-height: 1.5;">
                      Original physical College/University ID card is strictly mandatory for campus verification at Gates 1 &amp; 2 on all festival days.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- WhatsApp Group Box (Clean, zero corruptible characters) -->
          <tr>
            <td style="padding: 0 24px 22px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #062319; border: 2px solid #10b981; border-radius: 16px; box-shadow: 0 0 20px rgba(16, 185, 129, 0.15);">
                <tr>
                  <td align="center" style="padding: 22px 18px;">
                    <div style="font-size: 15px; font-weight: 800; color: #ffffff; margin-bottom: 6px;">
                      Join Official YUNIFEST 2026 WhatsApp Group
                    </div>
                    <p style="margin: 0 0 16px 0; font-size: 12px; color: #a7f3d0; line-height: 1.5; max-width: 440px;">
                      Get real-time updates, event schedules, reporting slots, rules, and live announcements directly in the group.
                    </p>
                    <a href="${whatsAppChannelUrl}" target="_blank" style="display: inline-block; background-color: #10b981; color: #022c22; font-size: 13px; font-weight: 800; padding: 12px 28px; border-radius: 999px; text-decoration: none; letter-spacing: 0.5px; box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4);">
                      Join WhatsApp Group Now -&gt;
                    </a>
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
                YBN University &bull; Namkum, Ranchi, Jharkhand 834010
              </div>
              <div style="margin-top: 14px; padding-top: 12px; border-top: 1px solid rgba(30, 41, 59, 0.6); font-size: 10.5px; color: #64748b; line-height: 1.5;">
                This is an official festival communication. Please save this confirmation email and present your Token <strong>${token}</strong> at the festival reception on arrival.
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
