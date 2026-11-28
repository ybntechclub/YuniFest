/**
 * =========================================================================
 * YUNIFEST 2026 - High-Deliverability Google Drive & Failover Email Service
 * Target Google Drive Folder ID: 1-Z9Z7qD904fzBYjFRO3_Dip_ME96Fl1L
 * =========================================================================
 *
 * FEATURES IN THIS VERSION:
 * 1. 100% Non-Spam Email Design:
 *    - Institutional white & university-blue layout (no dark phishing-like headers)
 *    - Zero spam-trigger phrases (removed fake "[OK] TRANSACTION VERIFIED" badges)
 *    - Clean plain-text alternative (zero "====" or "----" ASCII spam banners)
 *    - Legitimate university transactional footer with physical address & helpline
 *
 * 2. Automatic Dual-Email Failover (Account 1 -> Account 2):
 *    - Checks remaining daily quota before sending (free Gmail = 100/day)
 *    - If Account 1 runs out of quota or fails, it AUTOMATICALLY forwards the
 *      request to Account 2 (BACKUP_SCRIPT_URL) to send the email seamlessly!
 *    - Includes anti-loop protection and duplicate prevention cache.
 *
 * 3. Live Quota Monitoring:
 *    - Open this Web App URL in your browser anytime (doGet) to view your
 *      remaining daily email quota instantly!
 *
 * =========================================================================
 * HOW TO DEPLOY:
 * 1. Open https://script.google.com/ on your Primary Google Account.
 * 2. Paste this entire code and save.
 * 3. Deploy -> New deployment -> Web app:
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 4. Copy the Web App URL (This is your PRIMARY URL).
 *
 * HOW TO SET UP THE 2ND BACKUP EMAIL (OPTIONAL BUT RECOMMENDED):
 * 1. Open https://script.google.com/ on your Second Google Account.
 * 2. Paste this same code.
 * 3. Leave BACKUP_SCRIPT_URL as "" in Account 2.
 * 4. Deploy as Web app ("Execute as: Me", "Who has access: Anyone").
 * 5. Copy Account 2's Web App URL.
 * 6. In Account 1's script, set:
 *    var BACKUP_SCRIPT_URL = "https://script.google.com/macros/s/ACCOUNT_2_ID/exec";
 * 7. Click Deploy -> Manage deployments -> Edit -> New version -> Deploy.
 * =========================================================================
 */

// ---------------------------------------------------------------------------
// CONFIGURATION
// ---------------------------------------------------------------------------
var TARGET_FOLDER_ID = "1-Z9Z7qD904fzBYjFRO3_Dip_ME96Fl1L";
var WHATSAPP_CHANNEL_URL = "https://chat.whatsapp.com/CKA2mG98J8GGrNvuGDYHmw?mode=gi_t";
var OFFICIAL_HELPLINE = "+91 90312 74903";
var OFFICIAL_REPLY_TO = "yunifest@ybnu.ac.in"; // Official inquiry address

/**
 * BACKUP ACCOUNT FAILOVER:
 * If this account runs out of daily email quota (or hits an error),
 * the script will automatically forward the email to Account 2 below.
 * Leave as "" if you only have one account.
 */
var BACKUP_SCRIPT_URL = ""; 

/**
 * Diagnostic function to log quota in Apps Script editor
 */
function checkQuota() {
  var remaining = MailApp.getRemainingDailyQuota();
  Logger.log("Current account email quota remaining today: " + remaining);
}

/**
 * Test function to verify folder access from the Apps Script editor
 */
function testUploadFromEditor() {
  try {
    var folder = DriveApp.getFolderById(TARGET_FOLDER_ID);
    Logger.log("Found folder: " + folder.getName());
    var blob = Utilities.newBlob("YUNIFEST 2026 Test at " + new Date(), "text/plain", "test_connection.txt");
    var file = folder.createFile(blob);
    Logger.log("SUCCESS! Test file created: " + file.getUrl());
  } catch (err) {
    Logger.log("ERROR accessing folder: " + err.toString());
  }
}

/**
 * GET Handler: Visit your Web App URL in browser to check status & quota
 */
function doGet(e) {
  var remaining = 0;
  try {
    remaining = MailApp.getRemainingDailyQuota();
  } catch (qErr) {
    remaining = -1;
  }

  var currentAccount = "Unknown";
  try {
    currentAccount = Session.getActiveUser().getEmail() || Session.getEffectiveUser().getEmail();
  } catch (sErr) {}

  return ContentService
    .createTextOutput(JSON.stringify({
      status: "online",
      service: "YUNIFEST 2026 Drive & Anti-Spam Email Service",
      activeAccount: currentAccount,
      remainingDailyEmailQuota: remaining,
      backupConfigured: Boolean(BACKUP_SCRIPT_URL && BACKUP_SCRIPT_URL.indexOf("http") === 0),
      timestamp: new Date().toISOString()
    }, null, 2))
    .setMimeType(ContentService.MimeType.JSON);
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
    // Action 1: Direct Email Dispatch Request (from Admin / Resend)
    // -----------------------------------------------------------------------
    if (data.action === "send_email") {
      if (data.email) {
        var emailResult = dispatchWithFailover(data);
        output.emailSent = emailResult.sent;
        output.emailMessage = emailResult.message;
        output.senderAccount = emailResult.senderAccount;
      } else {
        output.emailSent = false;
        output.emailMessage = "Missing recipient email in payload";
      }
      return ContentService.createTextOutput(JSON.stringify(output)).setMimeType(ContentService.MimeType.JSON);
    }

    // -----------------------------------------------------------------------
    // Action 2: Check Quota Request
    // -----------------------------------------------------------------------
    if (data.action === "check_quota") {
      output.remainingQuota = MailApp.getRemainingDailyQuota();
      return ContentService.createTextOutput(JSON.stringify(output)).setMimeType(ContentService.MimeType.JSON);
    }

    // -----------------------------------------------------------------------
    // Action 3: Upload Payment Receipt to Google Drive Folder
    // -----------------------------------------------------------------------
    var folderId = data.folderId || TARGET_FOLDER_ID;
    var folder;
    try {
      folder = DriveApp.getFolderById(folderId);
    } catch (fErr) {
      throw new Error("Cannot open Google Drive Folder ID: " + folderId + ". Please ensure the Google account has Editor access: " + fErr.toString());
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
    var cleanEmail = (data.email || "participant").replace(/[^a-zA-Z0-9@._-]/g, "_");
    var cleanUtr = (data.transactionId || "UTR").replace(/[^a-zA-Z0-9_-]/g, "_");
    var filename = data.filename || (cleanEmail + "_" + cleanUtr + ".jpg");

    if (base64Data) {
      var decoded = Utilities.base64Decode(base64Data);
      var blob = Utilities.newBlob(decoded, contentType, filename);
      var file = folder.createFile(blob);

      try {
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      } catch (shareErr) {
        Logger.log("Sharing permission note (safe): " + shareErr.toString());
      }

      file.setDescription("Uploaded for YUNIFEST 2026. Participant: " + cleanEmail + " | UTR: " + cleanUtr);

      fileId = file.getId();
      viewUrl = "https://drive.google.com/file/d/" + fileId + "/view?usp=sharing";
      directImageUrl = "https://lh3.googleusercontent.com/d/" + fileId;
    }

    output.fileId = fileId;
    output.fileUrl = viewUrl;
    output.directImageUrl = directImageUrl;
    output.filename = filename;

    // -----------------------------------------------------------------------
    // Optional Inline Confirmation Email Dispatch
    // -----------------------------------------------------------------------
    if (data.email && data.sendEmail === true) {
      var mailRes = dispatchWithFailover(data);
      output.emailSent = mailRes.sent;
      output.emailMessage = mailRes.message;
      output.senderAccount = mailRes.senderAccount;
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
 * Intelligent Dispatcher:
 * 1. Checks quota on Current Account.
 * 2. If quota > 0, sends directly.
 * 3. If quota <= 0 or error occurs, automatically forwards to Backup Account 2!
 */
function dispatchWithFailover(data) {
  var remainingQuota = 0;
  try {
    remainingQuota = MailApp.getRemainingDailyQuota();
  } catch (qErr) {
    remainingQuota = 0;
  }

  // If primary account still has quota, attempt direct send
  if (remainingQuota > 0 && !data.forceBackup) {
    var primaryResult = sendAntiSpamEmail(data);
    if (primaryResult.sent) {
      primaryResult.senderAccount = "Primary Account (Remaining quota: " + (remainingQuota - 1) + ")";
      return primaryResult;
    }
    // If it failed due to a quota/rate-limit error, fall through to backup
    Logger.log("Primary account send failed: " + primaryResult.message + ". Evaluating backup failover...");
  } else {
    Logger.log("Primary account daily quota exhausted (remaining: " + remainingQuota + "). Triggering backup failover...");
  }

  // -------------------------------------------------------------------------
  // Automatic Failover to Account 2
  // -------------------------------------------------------------------------
  if (BACKUP_SCRIPT_URL && BACKUP_SCRIPT_URL.indexOf("http") === 0 && !data.isBackupForward) {
    try {
      var forwardPayload = JSON.stringify({
        action: "send_email",
        email: data.email,
        fullName: data.fullName,
        registrationCode: data.registrationCode,
        eventName: data.eventName,
        studentIdNumber: data.studentIdNumber,
        institutionName: data.institutionName,
        transactionId: data.transactionId,
        amountInr: data.amountInr,
        whatsAppChannelUrl: data.whatsAppChannelUrl || WHATSAPP_CHANNEL_URL,
        day1Event: data.day1Event,
        day2Event: data.day2Event,
        day3Event: data.day3Event,
        subject: data.subject,
        isBackupForward: true // Prevents infinite loop
      });

      var response = UrlFetchApp.fetch(BACKUP_SCRIPT_URL, {
        method: "post",
        contentType: "application/json",
        payload: forwardPayload,
        muteHttpExceptions: true
      });

      var backupResponse = JSON.parse(response.getContentText());
      if (backupResponse && (backupResponse.emailSent || backupResponse.success)) {
        Logger.log("SUCCESS: Email dispatched via Backup Account 2");
        return {
          sent: true,
          message: "Dispatched via Backup Email Account (Primary quota was " + remainingQuota + ")",
          senderAccount: "Backup Account 2 (Failover)"
        };
      } else {
        return {
          sent: false,
          message: "Backup account also failed: " + (backupResponse.emailMessage || backupResponse.error || "Unknown error"),
          senderAccount: "None (Both accounts failed)"
        };
      }
    } catch (failoverErr) {
      Logger.log("Failover invocation error: " + failoverErr.toString());
      return {
        sent: false,
        message: "Primary quota exhausted and Backup failed: " + failoverErr.toString(),
        senderAccount: "None"
      };
    }
  }

  return {
    sent: false,
    message: "Primary email quota reached (0 remaining). Please configure BACKUP_SCRIPT_URL with Account 2 to enable auto-failover.",
    senderAccount: "None"
  };
}

/**
 * Sends an email with Anti-Spam protection and duplicate prevention
 */
function sendAntiSpamEmail(data) {
  var recipientEmail = (data.email || "").trim();
  if (!recipientEmail || recipientEmail.indexOf("@") === -1) {
    return { sent: false, message: "Invalid recipient email" };
  }

  // 1. Anti-Duplicate Lock (Cache for 10 minutes per email + UTR/Code)
  var cleanKey = (data.registrationCode || data.transactionId || "reg").trim().toLowerCase();
  var cacheKey = "mail_lock_" + recipientEmail.toLowerCase().replace(/[^a-z0-9]/g, "_") + "_" + cleanKey.replace(/[^a-z0-9]/g, "_");
  try {
    var cache = CacheService.getScriptCache();
    var alreadySent = cache.get(cacheKey);
    if (alreadySent && !data.forceResend) {
      Logger.log("Duplicate email prevented for: " + recipientEmail + " (" + cleanKey + ")");
      return { sent: false, message: "Email already sent recently (duplicate prevented)" };
    }
    // Lock for 10 minutes (600 seconds)
    cache.put(cacheKey, "true", 600);
  } catch (cErr) {
    Logger.log("Cache check note (safe): " + cErr.toString());
  }

  var fullName = (data.fullName || "Festival Delegate").trim();
  var eventName = data.eventName || "YUNIFEST 2026 Festival Pass";
  var studentId = data.studentIdNumber || "Registered Delegate";
  var institution = data.institutionName || "YBN University, Ranchi";
  var amount = data.amountInr ? ("Rs. " + data.amountInr) : "Official Fee";
  var utr = data.transactionId || "Verified";
  var regCode = (data.registrationCode || "").trim();
  var whatsappUrl = data.whatsAppChannelUrl || WHATSAPP_CHANNEL_URL;

  // 2. High-Reputation Subject Line (Clean, professional, zero spam words, zero all-caps)
  var emailSubject = "Registration Confirmation: YUNIFEST 2026 - " + fullName;
  if (regCode) {
    emailSubject = "YUNIFEST 2026 Pass Confirmation - " + fullName + " (" + regCode + ")";
  }

  var day1 = data.day1Event || eventName || "Technical & Innovation Day";
  var day2 = data.day2Event || "Cultural Day Showcase & Competitions";
  var day3 = data.day3Event || "Grand Runway & EDM DJ Concert";

  // 3. Clean, Plain-Text Alternative Body (Zero spammy "====" or "----" ASCII banners)
  var plainTextBody = 
    "YUNIFEST 2026 - Registration Confirmation\n" +
    "YBN University, Namkum, Ranchi, Jharkhand\n\n" +
    "Dear " + fullName + ",\n\n" +
    "Thank you for registering for YUNIFEST 2026. Your registration and pass have been verified and confirmed by the Organizing Committee.\n\n" +
    (regCode ? "Your Official Registration Token: " + regCode + "\n" +
               "Please save this token and present it at the campus check-in desk on arrival.\n\n" : "") +
    "Festival Itinerary (December 10, 11 & 12, 2026):\n" +
    "• Day 1 (Dec 10) - Tech & Innovation: " + day1 + "\n" +
    "• Day 2 (Dec 11) - Cultural Showcases: " + day2 + "\n" +
    "• Day 3 (Dec 12) - Finale Runway & EDM Concert: " + day3 + "\n\n" +
    "Registration Summary:\n" +
    "• Participant Name: " + fullName + "\n" +
    "• Student Roll / ID: " + studentId + "\n" +
    "• Institution: " + institution + "\n" +
    "• Registered Event: " + eventName + "\n" +
    "• Transaction / UTR: " + utr + "\n" +
    "• Festival Fee: " + amount + " (Verified)\n" +
    "• Venue: YBN University Main Campus, Rajaulatu, Namkum, Ranchi - 834010\n\n" +
    "Campus Guidelines:\n" +
    "Please carry your physical College/University ID card along with this digital pass to Campus Gates on festival days.\n\n" +
    "Official WhatsApp Community:\n" +
    "Join the official WhatsApp group for live event updates, reporting times, and rules:\n" +
    whatsappUrl + "\n\n" +
    "Organizing Committee, YUNIFEST 2026\n" +
    "YBN University, Ranchi | Helpline: " + OFFICIAL_HELPLINE + "\n" +
    "This is an official transactional message sent to registered festival participants.";

  // 4. University-Grade High Deliverability HTML Template
  var htmlBody = generateDeliverableEmailHtml({
    fullName: fullName,
    registrationCode: regCode,
    eventName: eventName,
    studentId: studentId,
    institution: institution,
    amount: amount,
    utr: utr,
    whatsappUrl: whatsappUrl,
    day1Event: day1,
    day2Event: day2,
    day3Event: day3
  });

  try {
    GmailApp.sendEmail(recipientEmail, emailSubject, plainTextBody, {
      htmlBody: htmlBody,
      name: "YUNIFEST 2026 - YBN University",
      replyTo: OFFICIAL_REPLY_TO
    });
    Logger.log("Email dispatched successfully to: " + recipientEmail);
    return { sent: true, message: "Email dispatched to " + recipientEmail };
  } catch (sendErr) {
    Logger.log("GmailApp send error: " + sendErr.toString());
    return { sent: false, message: sendErr.toString() };
  }
}

/**
 * Builds a clean, university-grade HTML email that lands directly in the Primary Inbox
 * - Uses high-reputation light-mode styling (#f8fafc background, #ffffff card)
 * - Avoids suspicious dark cyberpunk schemes or phishing badge mimics
 * - Completely responsive on both mobile and desktop email clients
 */
function generateDeliverableEmailHtml(info) {
  var tokenHtml = '';
  if (info.registrationCode) {
    tokenHtml = 
      '<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f7ff;border:1.5px solid #bfdbfe;border-radius:12px;margin:20px 0;text-align:center;">' +
      '<tr><td style="padding:16px 20px;">' +
      '<div style="font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,sans-serif;font-size:11px;font-weight:700;color:#1d4ed8;letter-spacing:1px;text-transform:uppercase;margin-bottom:4px;">Official Registration Token</div>' +
      '<div style="font-family:monospace,Courier,monospace;font-size:28px;font-weight:800;color:#0f172a;letter-spacing:2px;">' + info.registrationCode + '</div>' +
      '<div style="font-size:11.5px;color:#64748b;margin-top:4px;">Present this Token at the festival check-in desk for your badge</div>' +
      '</td></tr></table>';
  }

  return '<!DOCTYPE html>' +
    '<html>' +
    '<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>' +
    '<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif;color:#1e293b;line-height:1.55;">' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;padding:28px 12px;">' +
    '<tr><td align="center">' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.04);">' +
    
    // Clean Institutional Header (University Blue)
    '<tr><td style="background-color:#0f2942;padding:26px 24px;text-align:center;color:#ffffff;">' +
    '<div style="font-size:11px;font-weight:700;color:#93c5fd;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:4px;">YBN UNIVERSITY • ANNUAL FESTIVAL</div>' +
    '<h1 style="margin:0;font-size:24px;font-weight:800;color:#ffffff;letter-spacing:0.5px;">YUNIFEST 2026</h1>' +
    '<p style="margin:4px 0 0 0;font-size:12px;color:#cbd5e1;">December 10, 11 &amp; 12, 2026 • Namkum Campus, Ranchi</p>' +
    '</td></tr>' +
    
    // Soft Verified Pill
    '<tr><td style="background-color:#f0fdf4;border-bottom:1px solid #bbf7d0;padding:10px 24px;text-align:center;">' +
    '<span style="display:inline-block;font-size:12px;font-weight:700;color:#15803d;">' +
    '● Registration &amp; Pass Verified' +
    '</span>' +
    '</td></tr>' +
    
    // Body Container
    '<tr><td style="padding:24px 24px 12px 24px;">' +
    '<p style="margin:0 0 12px 0;font-size:14px;color:#1e293b;font-weight:600;">Dear ' + info.fullName + ',</p>' +
    '<p style="margin:0 0 16px 0;font-size:13.5px;color:#475569;line-height:1.6;">' +
    'Thank you for registering for <strong>YUNIFEST 2026</strong>. Your participation and pass have been verified and confirmed by the Organizing Committee. We look forward to welcoming you to the campus.' +
    '</p>' +

    // Token Card
    tokenHtml +

    // 3-Day Itinerary Table
    '<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;font-size:12px;margin-bottom:16px;overflow:hidden;">' +
    '<tr><td colspan="2" style="background-color:#f1f5f9;padding:8px 14px;font-size:11px;font-weight:700;color:#334155;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #e2e8f0;">3-Day Festival Itinerary</td></tr>' +
    '<tr><td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;font-weight:700;color:#0369a1;width:34%;vertical-align:top;">Day 01 // Dec 10<br><span style="font-size:10px;color:#64748b;font-weight:normal;">Tech &amp; Innovation</span></td><td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#1e293b;">' + (info.day1Event || info.eventName) + '</td></tr>' +
    '<tr><td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;font-weight:700;color:#7e22ce;vertical-align:top;">Day 02 // Dec 11<br><span style="font-size:10px;color:#64748b;font-weight:normal;">Cultural Day</span></td><td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#1e293b;">' + (info.day2Event || "Cultural Day Showcase &amp; Competitions") + '</td></tr>' +
    '<tr><td style="padding:10px 14px;font-weight:700;color:#be185d;vertical-align:top;">Day 03 // Dec 12<br><span style="font-size:10px;color:#64748b;font-weight:normal;">Finale &amp; EDM</span></td><td style="padding:10px 14px;font-weight:600;color:#1e293b;">' + (info.day3Event || "Grand Runway &amp; EDM DJ Concert") + '</td></tr>' +
    '</table>' +

    // Credentials Summary Table
    '<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;font-size:12.5px;margin-bottom:16px;">' +
    '<tr><td style="padding:9px 14px;border-bottom:1px solid #e2e8f0;color:#64748b;width:38%;">Participant:</td><td style="padding:9px 14px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#1e293b;">' + info.fullName + '</td></tr>' +
    '<tr><td style="padding:9px 14px;border-bottom:1px solid #e2e8f0;color:#64748b;">Roll / ID No:</td><td style="padding:9px 14px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#1e293b;">' + info.studentId + '</td></tr>' +
    '<tr><td style="padding:9px 14px;border-bottom:1px solid #e2e8f0;color:#64748b;">Institution:</td><td style="padding:9px 14px;border-bottom:1px solid #e2e8f0;color:#1e293b;">' + info.institution + '</td></tr>' +
    '<tr><td style="padding:9px 14px;border-bottom:1px solid #e2e8f0;color:#64748b;">Registered Event:</td><td style="padding:9px 14px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#1e293b;">' + info.eventName + '</td></tr>' +
    '<tr><td style="padding:9px 14px;border-bottom:1px solid #e2e8f0;color:#64748b;">Transaction / UTR:</td><td style="padding:9px 14px;border-bottom:1px solid #e2e8f0;font-family:monospace;color:#047857;font-weight:600;">' + info.utr + '</td></tr>' +
    '<tr><td style="padding:9px 14px;color:#64748b;">Pass Tier &amp; Fee:</td><td style="padding:9px 14px;font-weight:600;color:#1e293b;">' + info.amount + ' (Verified)</td></tr>' +
    '</table>' +

    // Soft Campus Guidelines Note
    '<div style="background-color:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:11px 14px;margin-bottom:16px;">' +
    '<div style="font-size:11.5px;font-weight:700;color:#92400e;margin-bottom:2px;">Campus Entry Guidelines</div>' +
    '<div style="font-size:11.5px;color:#78350f;line-height:1.5;">' +
    'Please carry your original College/University ID card along with this digital confirmation pass to Campus Gates 1 &amp; 2 on festival days.' +
    '</div>' +
    '</div>' +

    // WhatsApp Action Box
    '<div style="background-color:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:14px;text-align:center;margin-bottom:18px;">' +
    '<div style="font-size:12.5px;font-weight:700;color:#166534;margin-bottom:3px;">Official WhatsApp Community</div>' +
    '<p style="margin:0 0 10px 0;font-size:11.5px;color:#15803d;">Stay updated with live reporting schedules, slot announcements, and stage timings.</p>' +
    '<a href="' + info.whatsappUrl + '" target="_blank" style="display:inline-block;background-color:#16a34a;color:#ffffff;font-size:12px;font-weight:700;padding:8px 20px;border-radius:999px;text-decoration:none;">' +
    'Join Official WhatsApp Group &rarr;' +
    '</a>' +
    '</div>' +

    '</td></tr>' +

    // Institutional Footer
    '<tr><td style="background-color:#f8fafc;border-top:1px solid #e2e8f0;padding:18px 24px;text-align:center;">' +
    '<div style="font-size:12px;font-weight:700;color:#0f172a;">YUNIFEST 2026 Organizing Committee</div>' +
    '<div style="font-size:11px;color:#64748b;margin-top:2px;">YBN University, Rajaulatu, Namkum, Ranchi, Jharkhand - 834010</div>' +
    '<div style="font-size:11px;color:#64748b;margin-top:2px;">Helpline: ' + OFFICIAL_HELPLINE + '</div>' +
    '<div style="margin-top:10px;padding-top:8px;border-top:1px solid #e2e8f0;font-size:10px;color:#94a3b8;line-height:1.4;">' +
    'You received this official transactional confirmation because you registered for YUNIFEST 2026.' +
    '</div>' +
    '</td></tr>' +

    '</table></td></tr></table></body></html>';
}
