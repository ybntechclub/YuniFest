/**
 * =========================================================================
 * YUNIFEST 2026 — Google Drive Uploader & Automated Confirmation Email Service
 * Target Folder ID: 1-Z9Z7qD904fzBYjFRO3_Dip_ME96Fl1L
 * =========================================================================
 *
 * CRITICAL DEPLOYMENT SETTINGS:
 * 1. Open https://script.google.com/
 * 2. Open your project
 * 3. Replace all code with this file and click "Save" (Ctrl+S / floppy icon)
 * 4. Click "Deploy" (top right) -> "Manage deployments"
 * 5. Click the PENCIL icon (Edit) on the active deployment
 * 6. Set "Execute as": "Me (<your-email>)"
 * 7. Set "Who has access": "Anyone"
 * 8. Set "Version": "New version"
 * 9. Click "Deploy"
 * =========================================================================
 */

var TARGET_FOLDER_ID = "1-Z9Z7qD904fzBYjFRO3_Dip_ME96Fl1L";
var WHATSAPP_CHANNEL_URL = "https://whatsapp.com/channel/0029Va9yunifest2026";

/**
 * Run this function directly inside the Apps Script Editor to test folder permissions!
 * Select "testUploadFromEditor" in the dropdown and click "Run".
 */
function testUploadFromEditor() {
  try {
    var folder = DriveApp.getFolderById(TARGET_FOLDER_ID);
    Logger.log("Found folder: " + folder.getName());
    var blob = Utilities.newBlob("YUNIFEST 2026 Drive Connection OK at " + new Date(), "text/plain", "connection_test.txt");
    var file = folder.createFile(blob);
    Logger.log("SUCCESS! Test file created: " + file.getUrl());
  } catch (err) {
    Logger.log("ERROR accessing folder: " + err.toString());
  }
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("No payload received in POST request");
    }

    var data = JSON.parse(e.postData.contents);
    var output = { success: true };

    // Action 1: Direct Send Email request
    if (data.action === "send_email") {
      if (data.email && data.htmlBody) {
        var subject = data.subject || ("Registration Token [" + (data.registrationCode || "") + "] — YUNIFEST 2026");
        try {
          GmailApp.sendEmail(data.email, subject, "", {
            htmlBody: data.htmlBody,
            name: "YUNIFEST 2026 Organizing Committee"
          });
          output.emailSent = true;
        } catch (mailErr) {
          Logger.log("Gmail dispatch note: " + mailErr.toString());
          output.emailError = mailErr.toString();
        }
      }
      return ContentService.createTextOutput(JSON.stringify(output)).setMimeType(ContentService.MimeType.JSON);
    }

    // Action 2: Upload Payment Receipt to Google Drive Folder
    var folderId = data.folderId || TARGET_FOLDER_ID;
    var folder;
    try {
      folder = DriveApp.getFolderById(folderId);
    } catch (fErr) {
      throw new Error("Cannot open Google Drive Folder ID: " + folderId + ". Ensure the Google account running this script owns or has Editor permission on the folder: " + fErr.toString());
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
        Logger.log("Note on sharing setting (safe): " + shareErr.toString());
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

    // Action 3: Automatically Send Confirmation Email with Token & WhatsApp Channel Link
    if (data.email) {
      try {
        var emailHtml = data.htmlBody || generateEmailTemplate(data);
        var emailSubject = data.subject || ("Registration Confirmed [" + (data.registrationCode || "") + "] — YUNIFEST 2026");
        
        GmailApp.sendEmail(data.email, emailSubject, "", {
          htmlBody: emailHtml,
          name: "YUNIFEST 2026 Organizing Committee"
        });
        output.emailSent = true;
      } catch (mailErr) {
        Logger.log("Email dispatch failed: " + mailErr.toString());
        output.emailError = mailErr.toString();
      }
    }

    return ContentService
      .createTextOutput(JSON.stringify(output))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Builds the official dark cyberpunk email template (NO QR CODE, NO PERSONAL CONTACTS)
 */
function generateEmailTemplate(data) {
  var fullName = (data.fullName || "Participant").toUpperCase();
  var token = data.registrationCode || "YUNI-2026";
  var eventName = data.eventName || "Festival Event";
  var studentId = data.studentIdNumber || "N/A";
  var category = (data.participationCategory || "Individual").toUpperCase();
  var txn = data.transactionId || "";
  var whatsappUrl = data.whatsAppChannelUrl || WHATSAPP_CHANNEL_URL;

  return '<!DOCTYPE html><html><body style="margin:0;padding:0;background-color:#050811;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,sans-serif;color:#f1f5f9;">' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#050811;padding:28px 12px;">' +
    '<tr><td align="center">' +
    '<table width="100%" style="max-width:560px;background-color:#0c1322;border:1.5px solid #1e293b;border-radius:24px;overflow:hidden;box-shadow:0 25px 50px -12px rgba(0,0,0,0.75);">' +
    
    // Header Banner
    '<tr><td align="center" style="padding:32px 24px 22px 24px;background:linear-gradient(180deg,#101c36 0%,#0c1322 100%);border-bottom:1px solid #1e293b;">' +
    '<div style="display:inline-block;padding:4px 14px;border-radius:999px;background-color:rgba(0,240,255,0.1);border:1px solid rgba(0,240,255,0.3);font-family:monospace;font-size:11px;font-weight:bold;color:#00F0FF;letter-spacing:2px;margin-bottom:10px;">ANNUAL MEGA FESTIVAL</div>' +
    '<h1 style="margin:0;font-size:28px;font-weight:900;color:#ffffff;letter-spacing:1.5px;">YUNI<span style="color:#00F0FF;">FEST</span> 2026</h1>' +
    '<p style="margin:6px 0 0 0;font-size:12px;color:#94a3b8;">YBN University • Namkum, Ranchi, Jharkhand</p>' +
    '</td></tr>' +
    
    // Congratulations Greeting
    '<tr><td style="padding:26px 24px 12px 24px;">' +
    '<h2 style="margin:0 0 8px 0;font-size:19px;font-weight:800;color:#ffffff;">Congratulations, <span style="color:#38bdf8;">' + fullName + '</span>! 👏</h2>' +
    '<p style="margin:0;font-size:13.5px;color:#cbd5e1;line-height:1.6;">Your registration for <strong style="color:#ffffff;">' + eventName + '</strong> has been recorded by the <strong style="color:#38bdf8;">YUNIFEST 2026 Organizing Committee</strong>.</p>' +
    '</td></tr>' +
    
    // Neon Cyan Token Badge
    '<tr><td style="padding:10px 24px 18px 24px;">' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#06182c;border:2px solid #00F0FF;border-radius:16px;box-shadow:0 0 24px rgba(0,240,255,0.18);">' +
    '<tr><td align="center" style="padding:22px 16px;">' +
    '<div style="font-family:monospace;font-size:11px;font-weight:bold;color:#7dd3fc;letter-spacing:2.5px;margin-bottom:6px;">OFFICIAL REGISTRATION TOKEN</div>' +
    '<div style="font-family:monospace;font-size:32px;font-weight:900;color:#00F0FF;letter-spacing:3px;">' + token + '</div>' +
    '<div style="font-size:11px;color:#94a3b8;margin-top:6px;">Present this Token at the festival check-in desk for your Entry Pass</div>' +
    '</td></tr></table>' +
    '</td></tr>' +
    
    // Details Table
    '<tr><td style="padding:0 24px 18px 24px;">' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f172a;border:1px solid #1e293b;border-radius:14px;font-size:12.5px;">' +
    '<tr><td style="padding:11px 16px;border-bottom:1px solid #1e293b;color:#94a3b8;width:42%;">Participant:</td><td style="padding:11px 16px;border-bottom:1px solid #1e293b;color:#ffffff;font-weight:bold;text-align:right;">' + fullName + '</td></tr>' +
    '<tr><td style="padding:11px 16px;border-bottom:1px solid #1e293b;color:#94a3b8;">Roll No / Student ID:</td><td style="padding:11px 16px;border-bottom:1px solid #1e293b;color:#38bdf8;font-family:monospace;font-weight:bold;text-align:right;">' + studentId + '</td></tr>' +
    '<tr><td style="padding:11px 16px;border-bottom:1px solid #1e293b;color:#94a3b8;">Registered Event:</td><td style="padding:11px 16px;border-bottom:1px solid #1e293b;color:#ffffff;font-weight:bold;text-align:right;">' + eventName + '</td></tr>' +
    '<tr><td style="padding:11px 16px;border-bottom:1px solid #1e293b;color:#94a3b8;">Participation Mode:</td><td style="padding:11px 16px;border-bottom:1px solid #1e293b;color:#00F0FF;font-weight:bold;text-align:right;">' + category + '</td></tr>' +
    (txn ? '<tr><td style="padding:11px 16px;color:#94a3b8;">Transaction / UTR:</td><td style="padding:11px 16px;color:#22c55e;font-family:monospace;font-weight:bold;text-align:right;">' + txn + '</td></tr>' : '') +
    '</table>' +
    '</td></tr>' +
    
    // WhatsApp Channel Box (Emerald Green)
    '<tr><td style="padding:0 24px 18px 24px;">' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#062319;border:2px solid #10b981;border-radius:16px;box-shadow:0 0 20px rgba(16,185,129,0.15);">' +
    '<tr><td align="center" style="padding:22px 18px;">' +
    '<div style="font-size:15px;font-weight:800;color:#ffffff;margin-bottom:6px;">📲 Join Official YUNIFEST 2026 WhatsApp Channel</div>' +
    '<p style="margin:0 0 16px 0;font-size:12px;color:#a7f3d0;line-height:1.5;">Get real-time updates, event schedules, reporting slots, rules, and live festival announcements directly on WhatsApp!</p>' +
    '<a href="' + whatsappUrl + '" target="_blank" style="display:inline-block;background-color:#10b981;color:#022c22;font-size:13px;font-weight:800;padding:12px 28px;border-radius:999px;text-decoration:none;">📲 Join WhatsApp Channel Now →</a>' +
    '</td></tr></table>' +
    '</td></tr>' +
    
    // Inspirational Card (Purple)
    '<tr><td style="padding:0 24px 20px 24px;">' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#160c24;border:1.5px solid #a855f7;border-radius:16px;">' +
    '<tr><td align="center" style="padding:18px 18px;">' +
    '<div style="font-size:13px;font-weight:bold;color:#f0abfc;margin-bottom:6px;">Empowering Student Innovation, Culture &amp; Talent 💡</div>' +
    '<p style="margin:0;font-size:12px;color:#e9d5ff;font-style:italic;line-height:1.6;">"Your ideas have the power to turn possibilities into reality. Think bold, build smart, and let your brilliance illuminate YUNIFEST 2026!"</p>' +
    '</td></tr></table>' +
    '</td></tr>' +
    
    // Official Committee Footer (Strictly NO personal phone, NO personal email, NO coordinator name)
    '<tr><td align="center" style="padding:24px 24px 28px 24px;background-color:#070c18;border-top:1px solid #1e293b;">' +
    '<div style="font-size:11px;font-family:monospace;color:#94a3b8;letter-spacing:1.5px;margin-bottom:6px;">ISSUED BY</div>' +
    '<div style="font-size:14px;font-weight:800;color:#ffffff;letter-spacing:0.5px;margin-bottom:4px;">YUNIFEST 2026 Organizing Committee</div>' +
    '<div style="font-size:11.5px;color:#94a3b8;">YBN University • Namkum, Ranchi, Jharkhand 834010</div>' +
    '<div style="margin-top:14px;padding-top:12px;border-top:1px solid rgba(30,41,59,0.6);font-size:10.5px;color:#64748b;line-height:1.5;">This is an official festival communication. Please present this confirmation email and your Token <strong>' + token + '</strong> at the festival reception on arrival.</div>' +
    '</td></tr>' +
    
    '</table></td></tr></table></body></html>';
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "online",
      message: "YUNIFEST 2026 Drive & Email Service is live.",
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
