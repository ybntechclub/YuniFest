/**
 * =========================================================================
 * YUNIFEST 2026 — Google Drive Uploader & Anti-Spam Direct Email Service
 * Target Google Drive Folder ID: 1-Z9Z7qD904fzBYjFRO3_Dip_ME96Fl1L
 * =========================================================================
 *
 * HOW TO DEPLOY / UPDATE IN GOOGLE APPS SCRIPT:
 * 1. Open https://script.google.com/ and open your YUNIFEST project.
 * 2. Select all existing code, delete it, and paste this entire file.
 * 3. Click "Save" (Ctrl + S / disk icon).
 * 4. Click "Deploy" (top right) -> "Manage deployments".
 * 5. Click the PENCIL icon (Edit) on the active deployment.
 * 6. Set "Execute as": "Me (<your-google-account>)"
 * 7. Set "Who has access": "Anyone"
 * 8. Set "Version": "New version"
 * 9. Click "Deploy" and grant permissions if prompted.
 * =========================================================================
 */

var TARGET_FOLDER_ID = "1-Z9Z7qD904fzBYjFRO3_Dip_ME96Fl1L";
var WHATSAPP_CHANNEL_URL = "https://chat.whatsapp.com/CKA2mG98J8GGrNvuGDYHmw?mode=gi_t";
var OFFICIAL_HELPLINE = "+91 90312 74903";

/**
 * Test function to verify folder access from the Apps Script editor
 */
function testUploadFromEditor() {
  try {
    var folder = DriveApp.getFolderById(TARGET_FOLDER_ID);
    Logger.log("Found folder: " + folder.getName());
    var blob = Utilities.newBlob("YUNIFEST 2026 Drive Test at " + new Date(), "text/plain", "test_connection.txt");
    var file = folder.createFile(blob);
    Logger.log("SUCCESS! Test file created: " + file.getUrl());
  } catch (err) {
    Logger.log("ERROR accessing folder: " + err.toString());
  }
}

/**
 * Main Web App POST handler
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("No payload received in POST request");
    }

    var data = JSON.parse(e.postData.contents);
    var output = { success: true };

    // -----------------------------------------------------------------------
    // Action: Direct Manual Send Email Request (from Admin / Resend)
    // -----------------------------------------------------------------------
    if (data.action === "send_email") {
      if (data.email) {
        var emailResult = sendAntiSpamEmail(data);
        output.emailSent = emailResult.sent;
        output.emailMessage = emailResult.message;
      }
      return ContentService.createTextOutput(JSON.stringify(output)).setMimeType(ContentService.MimeType.JSON);
    }

    // -----------------------------------------------------------------------
    // Action: Upload Payment Receipt to Google Drive Folder
    // -----------------------------------------------------------------------
    var folderId = data.folderId || TARGET_FOLDER_ID;
    var folder;
    try {
      folder = DriveApp.getFolderById(folderId);
    } catch (fErr) {
      throw new Error("Cannot open Google Drive Folder ID: " + folderId + ". Ensure Google account has Editor permission: " + fErr.toString());
    }

    var base64Data = data.base64 || "";
    var contentType = "image/jpeg";

    if (base64Data.indexOf("data:") === 0) {
      var parts = base64Data.split(",");
      var header = parts[0];
      base64Data = parts[1];
      var mimeMatch = header.match(/:(.*?);/);
      if (mimeMatch) {
        contentType = mimeMatch[1];
      }
    }

    var fileId = "";
    var viewUrl = "";
    var directImageUrl = "";
    var email = (data.email || "participant").replace(/[^a-zA-Z0-9@._-]/g, "_");
    var utr = (data.transactionId || "UTR").replace(/[^a-zA-Z0-9_-]/g, "_");
    var filename = data.filename || (email + "_" + utr + ".jpg");

    if (base64Data) {
      var decoded = Utilities.base64Decode(base64Data);
      var blob = Utilities.newBlob(decoded, contentType, filename);
      var file = folder.createFile(blob);

      try {
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      } catch (shareErr) {
        Logger.log("Sharing permission note (safe): " + shareErr.toString());
      }

      file.setDescription("Uploaded for YUNIFEST 2026. Participant: " + email + " | UTR: " + utr);

      fileId = file.getId();
      viewUrl = "https://drive.google.com/file/d/" + fileId + "/view?usp=sharing";
      directImageUrl = "https://lh3.googleusercontent.com/d/" + fileId;
    }

    output.fileId = fileId;
    output.fileUrl = viewUrl;
    output.directImageUrl = directImageUrl;
    output.filename = filename;

    // -----------------------------------------------------------------------
    // Direct Confirmation Email Dispatch (Directly & ONLY ONCE from Apps Script)
    // -----------------------------------------------------------------------
    if (data.email && data.sendEmail === true) {
      var mailRes = sendAntiSpamEmail(data);
      output.emailSent = mailRes.sent;
      output.emailMessage = mailRes.message;
    }

    return ContentService
      .createTextOutput(JSON.stringify(output))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("doPost error: " + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Sends an email with Anti-Spam protection and duplicate prevention
 */
function sendAntiSpamEmail(data) {
  var recipientEmail = (data.email || "").trim();
  if (!recipientEmail || recipientEmail.indexOf("@") === -1) {
    return { sent: false, message: "Invalid recipient email" };
  }

  // 1. Anti-Duplicate Lock (Cache for 10 minutes per email + UTR)
  var cleanUtr = (data.transactionId || "reg").trim().toLowerCase();
  var cacheKey = "mail_lock_" + recipientEmail.toLowerCase() + "_" + cleanUtr;
  try {
    var cache = CacheService.getScriptCache();
    var alreadySent = cache.get(cacheKey);
    if (alreadySent) {
      Logger.log("Duplicate email prevented for: " + recipientEmail + " (" + cleanUtr + ")");
      return { sent: false, message: "Email already sent recently (duplicate prevented)" };
    }
    // Lock for 10 minutes (600 seconds)
    cache.put(cacheKey, "true", 600);
  } catch (cErr) {
    Logger.log("Cache check note (safe): " + cErr.toString());
  }

  var fullName = data.fullName || "Student Delegate";
  var eventName = data.eventName || "YUNIFEST 2026 Festival Pass";
  var studentId = data.studentIdNumber || "Verified Student";
  var institution = data.institutionName || "YBN University, Ranchi";
  var amount = data.amountInr ? ("₹" + data.amountInr) : "Official Fee";
  var utr = data.transactionId || "Logged";
  var regCode = data.registrationCode || "";
  var whatsappUrl = data.whatsAppChannelUrl || WHATSAPP_CHANNEL_URL;

  // 2. High-Reputation Subject Line (Avoids spam triggers, all-caps, and spam words)
  var emailSubject = data.subject || ("Your YUNIFEST 2026 Registration — " + fullName + (regCode ? " [" + regCode + "]" : ""));


  // 3. Complete Plain-Text Alternative Body (CRITICAL for bypassing Spam filters)
  var plainTextBody = 
    "YUNIFEST 2026: OFFICIAL REGISTRATION CONFIRMATION\n" +
    "YBN University, Ranchi, Jharkhand\n" +
    "=====================================================\n\n" +
    "Dear " + fullName + ",\n\n" +
    "Your registration for YUNIFEST 2026 has been confirmed by the Organizing Committee. Your details are listed below.\n\n" +
    "DELEGATE DETAILS:\n" +
    "-----------------------------------------------------\n" +
    (regCode ? "• Official Registration Token: " + regCode + "\n" : "") +
    "• Participant Name: " + fullName + "\n" +
    "• Student ID / Roll No: " + studentId + "\n" +
    "• Institution: " + institution + "\n" +
    "• Festival Event: " + eventName + "\n" +
    "• Festival Dates: December 10, 11 & 12, 2026\n" +
    "• Venue: YBN University Main Campus, Rajaulatu, Namkum, Ranchi\n" +
    "• Payment UTR / Transaction ID: " + utr + "\n" +
    "• Pass Fee: " + amount + "\n" +
    "-----------------------------------------------------\n\n" +
    (regCode ? "Please carry this confirmation email and show Token [" + regCode + "] at the festival check-in desk.\n\n" : "") +
    "MANDATORY CAMPUS ENTRY CLAUSE:\n" +
    "Please carry your original, physical College/University ID card. Entry to campus gates will be verified physically on all three days.\n\n" +
    "OFFICIAL WHATSAPP COMMUNITY:\n" +
    "Join the official WhatsApp group for real-time announcements, slot schedules, and rules:\n" +
    whatsappUrl + "\n\n" +
    "Warm regards,\n" +
    "Organizing Committee, YUNIFEST 2026\n" +
    "YBN University, Rajaulatu, Namkum, Ranchi, Jharkhand — 834010\n" +
    "-----------------------------------------------------\n" +
    "You received this confirmation because you registered for YUNIFEST 2026.";


  // 4. Clean, Institutional White & Navy HTML Template (Matches University Letters, 0 Spam Score)
  var htmlBody = data.htmlBody || generateDeliverableEmailHtml({
    fullName: fullName,
    registrationCode: regCode,
    eventName: eventName,
    studentId: studentId,
    institution: institution,
    amount: amount,
    utr: utr,
    whatsappUrl: whatsappUrl
  });

  try {
    GmailApp.sendEmail(recipientEmail, emailSubject, plainTextBody, {
      htmlBody: htmlBody,
      name: "YUNIFEST 2026 Organizing Committee"
    });
    Logger.log("Email dispatched directly to: " + recipientEmail);
    return { sent: true, message: "Email dispatched to " + recipientEmail };
  } catch (sendErr) {
    Logger.log("GmailApp send error: " + sendErr.toString());
    return { sent: false, message: sendErr.toString() };
  }
}

/**
 * Builds a clean, university-grade HTML email that lands in Primary Inbox
 */
function generateDeliverableEmailHtml(info) {
  var tokenHtml = '';
  if (info.registrationCode) {
    tokenHtml = 
      '<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f172a;border:2px solid #0284c7;border-radius:16px;margin-bottom:20px;text-align:center;">' +
      '<tr><td style="padding:20px 16px;">' +
      '<div style="font-family:monospace;font-size:11px;font-weight:700;color:#38bdf8;letter-spacing:2px;text-transform:uppercase;margin-bottom:6px;">OFFICIAL REGISTRATION TOKEN</div>' +
      '<div style="font-family:monospace;font-size:30px;font-weight:900;color:#38bdf8;letter-spacing:3px;">' + info.registrationCode + '</div>' +
      '<div style="font-size:11px;color:#94a3b8;margin-top:6px;">Present this Token at campus registration &amp; check-in desk for entry</div>' +
      '</td></tr></table>';
  }

  return '<!DOCTYPE html>' +
    '<html>' +
    '<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>' +
    '<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif;color:#0f172a;line-height:1.5;">' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;padding:30px 12px;">' +
    '<tr><td align="center">' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background-color:#ffffff;border:1px solid #cbd5e1;border-radius:20px;overflow:hidden;box-shadow:0 10px 25px -5px rgba(0,0,0,0.06);">' +
    
    // Institutional Header
    '<tr><td style="background-color:#0f172a;padding:28px 24px;text-align:center;color:#ffffff;">' +
    '<div style="font-family:monospace;font-size:11px;font-weight:700;color:#38bdf8;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:6px;">YBN UNIVERSITY • ANNUAL FESTIVAL</div>' +
    '<h1 style="margin:0;font-size:26px;font-weight:800;color:#ffffff;letter-spacing:0.5px;">YUNIFEST 2026</h1>' +
    '<p style="margin:6px 0 0 0;font-size:12px;color:#94a3b8;">December 10, 11 &amp; 12, 2026 • Namkum Campus, Ranchi</p>' +
    '</td></tr>' +
    
    // Status Bar: Verified & Confirmed
    '<tr><td style="background-color:#ecfdf5;border-bottom:1px solid #a7f3d0;padding:12px 24px;text-align:center;">' +
    '<span style="display:inline-block;font-size:12px;font-weight:700;color:#065f46;text-transform:uppercase;letter-spacing:0.5px;">' +
    '✓ TRANSACTION VERIFIED &amp; PASS CONFIRMED' +
    '</span>' +
    '</td></tr>' +
    
    // Body Content
    '<tr><td style="padding:26px 24px 10px 24px;">' +
    '<h2 style="margin:0 0 10px 0;font-size:18px;font-weight:700;color:#0f172a;">Dear ' + info.fullName + ',</h2>' +
    '<p style="margin:0 0 18px 0;font-size:13.5px;color:#334155;line-height:1.6;">' +
    'Congratulations! Your registration payment for <strong>' + info.eventName + '</strong> has been officially verified and approved by the <strong>YUNIFEST 2026 Organizing Committee</strong>.' +
    '</p>' +

    // Registration Token Box (Highlight)
    tokenHtml +

    // Credentials Card
    '<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;font-size:12.5px;margin-bottom:18px;">' +
    '<tr><td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;color:#64748b;width:38%;">Participant:</td><td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;font-weight:700;color:#0f172a;">' + info.fullName + '</td></tr>' +
    '<tr><td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;color:#64748b;">Roll / ID No:</td><td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;font-weight:700;color:#1e3a8a;font-family:monospace;">' + info.studentId + '</td></tr>' +
    '<tr><td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;color:#64748b;">Institution:</td><td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#0f172a;">' + info.institution + '</td></tr>' +
    '<tr><td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;color:#64748b;">Registered Event:</td><td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;font-weight:700;color:#0f172a;">' + info.eventName + '</td></tr>' +
    '<tr><td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;color:#64748b;">Transaction / UTR:</td><td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;font-weight:700;color:#047857;font-family:monospace;">' + info.utr + '</td></tr>' +
    '<tr><td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;color:#64748b;">Pass Tier &amp; Fee:</td><td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;font-weight:700;color:#0f172a;">' + info.amount + ' (Verified &amp; Paid)</td></tr>' +
    '<tr><td style="padding:10px 14px;color:#64748b;">Festival Access:</td><td style="padding:10px 14px;font-weight:700;color:#0f172a;">Dec 10, 11 &amp; 12, 2026 (All 3 Days)</td></tr>' +
    '</table>' +

    // Physical ID Clause Alert Box
    '<div style="background-color:#fef3c7;border-left:4px solid #f59e0b;padding:12px 14px;border-radius:8px;margin-bottom:18px;">' +
    '<strong style="font-size:12px;color:#92400e;display:block;margin-bottom:2px;">MANDATORY CAMPUS ENTRY POLICY:</strong>' +
    '<span style="font-size:11.5px;color:#78350f;line-height:1.5;">' +
    'Original, physical College/University ID card is strictly mandatory for campus verification at Gates 1 &amp; 2.' +
    '</span>' +
    '</div>' +

    // WhatsApp Action Button
    '<div style="background-color:#f0fdf4;border:1px solid #bbf7d0;border-radius:14px;padding:16px;text-align:center;margin-bottom:20px;">' +
    '<div style="font-size:13px;font-weight:700;color:#166534;margin-bottom:4px;">Official WhatsApp Group</div>' +
    '<p style="margin:0 0 12px 0;font-size:11.5px;color:#15803d;">Get reporting schedules, live competition rules, and backstage announcements directly on your phone.</p>' +
    '<a href="' + info.whatsappUrl + '" target="_blank" style="display:inline-block;background-color:#16a34a;color:#ffffff;font-size:12px;font-weight:700;padding:10px 24px;border-radius:999px;text-decoration:none;">' +
    'Join Official WhatsApp Group →' +
    '</a>' +
    '</div>' +

    '</td></tr>' +

    // Footer with University Physical Address (No phone, no coordinator names)
    '<tr><td style="background-color:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 24px;text-align:center;">' +
    '<div style="font-size:12px;font-weight:700;color:#0f172a;">YUNIFEST 2026 Organizing Committee</div>' +
    '<div style="font-size:11px;color:#64748b;margin-top:2px;">YBN University, Rajaulatu, Namkum, Ranchi, Jharkhand — 834010</div>' +
    '<div style="margin-top:12px;padding-top:10px;border-top:1px solid #e2e8f0;font-size:10px;color:#94a3b8;line-height:1.4;">' +
    'This is an official festival transactional communication. Please save this email and present your Token on arrival.' +
    '</div>' +
    '</td></tr>' +

    '</table></td></tr></table></body></html>';
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "online",
      message: "YUNIFEST 2026 Drive & Anti-Spam Email Service is running.",
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
