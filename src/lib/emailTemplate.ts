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
  <title>YUNIFEST 2026 - Registration Details</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.55;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; padding: 28px 12px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 580px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);">
          
          <!-- Clean Institutional Header (University Blue) -->
          <tr>
            <td style="background-color: #0f2942; padding: 26px 24px; text-align: center; color: #ffffff;">
              <div style="font-size: 11px; font-weight: 700; color: #93c5fd; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 4px;">
                YBN UNIVERSITY &bull; ANNUAL FESTIVAL
              </div>
              <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: 0.5px;">
                YUNIFEST 2026
              </h1>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: #cbd5e1;">
                December 10, 11 &amp; 12, 2026 &bull; Namkum Campus, Ranchi
              </p>
            </td>
          </tr>

          <!-- Soft Verified Status Pill -->
          <tr>
            <td style="background-color: #f0fdf4; border-bottom: 1px solid #bbf7d0; padding: 10px 24px; text-align: center;">
              <span style="display: inline-block; font-size: 12px; font-weight: 700; color: #15803d;">
                &bull; Registration &amp; Pass Verified
              </span>
            </td>
          </tr>

          <!-- Confirmation Greeting -->
          <tr>
            <td style="padding: 24px 24px 12px 24px;">
              <p style="margin: 0 0 12px 0; font-size: 14px; color: #1e293b; font-weight: 600;">
                Dear ${cleanName},
              </p>
              <p style="margin: 0 0 16px 0; font-size: 13.5px; color: #475569; line-height: 1.6;">
                Thank you for registering for <strong>YUNIFEST 2026</strong>. Your participation and festival pass have been verified and confirmed by the Organizing Committee. We look forward to welcoming you to the campus.
              </p>
            </td>
          </tr>

          <!-- Official Registration Token Badge (Clean Soft Blue Card) -->
          <tr>
            <td style="padding: 0 24px 18px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0f7ff; border: 1.5px solid #bfdbfe; border-radius: 12px; text-align: center;">
                <tr>
                  <td style="padding: 16px 20px;">
                    <div style="font-size: 11px; font-weight: 700; color: #1d4ed8; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 4px;">
                      Official Registration Token
                    </div>
                    <div style="font-family: monospace, Courier, monospace; font-size: 28px; font-weight: 800; color: #0f172a; letter-spacing: 2px;">
                      ${token}
                    </div>
                    <div style="font-size: 11.5px; color: #64748b; margin-top: 4px;">
                      Present this Token at the festival check-in desk on arrival
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- 3-DAY FESTIVAL SCHEDULE / EVENT ITINERARY (All 3 Days) -->
          <tr>
            <td style="padding: 0 24px 18px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; font-size: 12px;">
                <tr>
                  <td colspan="2" style="background-color: #f1f5f9; padding: 8px 14px; font-size: 11px; font-weight: 700; color: #334155; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #e2e8f0;">
                    3-Day Festival Itinerary
                  </td>
                </tr>
                
                <!-- Day 1 -->
                <tr>
                  <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; width: 34%; font-weight: 700; color: #0369a1; vertical-align: top;">
                    Day 01 // Dec 10<br><span style="font-size: 10px; color: #64748b; font-weight: normal;">Tech &amp; Innovation</span>
                  </td>
                  <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #1e293b;">
                    ${day1Event}
                  </td>
                </tr>

                <!-- Day 2 -->
                <tr>
                  <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; width: 34%; font-weight: 700; color: #7e22ce; vertical-align: top;">
                    Day 02 // Dec 11<br><span style="font-size: 10px; color: #64748b; font-weight: normal;">Cultural Day</span>
                  </td>
                  <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #1e293b;">
                    ${day2Event}
                  </td>
                </tr>

                <!-- Day 3 -->
                <tr>
                  <td style="padding: 10px 14px; width: 34%; font-weight: 700; color: #be185d; vertical-align: top;">
                    Day 03 // Dec 12<br><span style="font-size: 10px; color: #64748b; font-weight: normal;">Finale &amp; EDM</span>
                  </td>
                  <td style="padding: 10px 14px; font-weight: 600; color: #1e293b;">
                    ${day3Event}
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Participant & Event Details Table -->
          <tr>
            <td style="padding: 0 24px 18px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; font-size: 12.5px;">
                <tr>
                  <td style="padding: 9px 14px; border-bottom: 1px solid #e2e8f0; color: #64748b; width: 38%;">Participant:</td>
                  <td style="padding: 9px 14px; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-weight: 600;">${cleanName}</td>
                </tr>
                <tr>
                  <td style="padding: 9px 14px; border-bottom: 1px solid #e2e8f0; color: #64748b;">Roll No / Student ID:</td>
                  <td style="padding: 9px 14px; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-weight: 600;">${idNum}</td>
                </tr>
                <tr>
                  <td style="padding: 9px 14px; border-bottom: 1px solid #e2e8f0; color: #64748b;">Institution:</td>
                  <td style="padding: 9px 14px; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-weight: 600;">${institutionName}</td>
                </tr>
                <tr>
                  <td style="padding: 9px 14px; border-bottom: 1px solid #e2e8f0; color: #64748b;">Registered Event:</td>
                  <td style="padding: 9px 14px; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-weight: 600;">${eventName}</td>
                </tr>
                ${txn ? `
                <tr>
                  <td style="padding: 9px 14px; border-bottom: 1px solid #e2e8f0; color: #64748b;">Transaction / UTR:</td>
                  <td style="padding: 9px 14px; border-bottom: 1px solid #e2e8f0; color: #047857; font-family: monospace; font-weight: 600;">${txn}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 9px 14px; color: #64748b;">Pass Tier &amp; Fee:</td>
                  <td style="padding: 9px 14px; color: #1e293b; font-weight: 600;">Rs. ${amountInr} (Verified)</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Campus Entry Guidelines Note -->
          <tr>
            <td style="padding: 0 24px 18px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #fffbeb; border: 1px solid #fde68a; border-radius: 10px;">
                <tr>
                  <td style="padding: 11px 14px;">
                    <div style="font-size: 11.5px; font-weight: 700; color: #92400e; margin-bottom: 2px;">
                      Campus Entry Guidelines
                    </div>
                    <div style="font-size: 11.5px; color: #78350f; line-height: 1.5;">
                      Please carry your physical College/University ID card along with this digital confirmation pass to Campus Gates on festival days.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- WhatsApp Community Box -->
          <tr>
            <td style="padding: 0 24px 20px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px;">
                <tr>
                  <td align="center" style="padding: 16px 18px;">
                    <div style="font-size: 13px; font-weight: 700; color: #166534; margin-bottom: 3px;">
                      Official WhatsApp Community
                    </div>
                    <p style="margin: 0 0 12px 0; font-size: 11.5px; color: #15803d; line-height: 1.5; max-width: 440px;">
                      Stay updated with live reporting schedules, slot announcements, and stage timings.
                    </p>
                    <a href="${whatsAppChannelUrl}" target="_blank" style="display: inline-block; background-color: #16a34a; color: #ffffff; font-size: 12px; font-weight: 700; padding: 9px 24px; border-radius: 999px; text-decoration: none;">
                      Join Official WhatsApp Group &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Official Institutional Footer -->
          <tr>
            <td align="center" style="padding: 18px 24px; background-color: #f8fafc; border-top: 1px solid #e2e8f0;">
              <div style="font-size: 12px; font-weight: 700; color: #0f172a; margin-bottom: 2px;">
                YUNIFEST 2026 Organizing Committee
              </div>
              <div style="font-size: 11px; color: #64748b;">
                YBN University &bull; Namkum, Ranchi, Jharkhand - 834010
              </div>
              <div style="font-size: 11px; color: #64748b; margin-top: 2px;">
                Official Helpline: +91 90312 74903
              </div>
              <div style="margin-top: 10px; padding-top: 8px; border-top: 1px solid #e2e8f0; font-size: 10px; color: #94a3b8; line-height: 1.4;">
                You received this official transactional confirmation because you registered for YUNIFEST 2026.
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
