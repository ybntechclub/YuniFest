/**
 * =========================================================================
 * YUNIFEST 2026 — Google Drive Uploader & Automated Confirmation Email Service
 * Target Folder ID: 1-Z9Z7qD904fzBYjFRO3_Dip_ME96Fl1L
 * =========================================================================
 *
 * HOW TO DEPLOY / UPDATE IN 1 MINUTE:
 * 1. Open https://script.google.com/
 * 2. Open your YUNIFEST project (or create a New Project)
 * 3. Replace all code with this file
 * 4. Click "Deploy" -> "Manage deployments" -> Click the pencil icon on your active deployment
 * 5. Change Version to "New version"
 * 6. Click "Deploy"
 * =========================================================================
 */

var TARGET_FOLDER_ID = "1-Z9Z7qD904fzBYjFRO3_Dip_ME96Fl1L";
// var WHATSAPP_CHANNEL_URL = "https://whatsapp.com/channel/0029Va9yunifest2026";
// var REGISTRATION_HEAD_NAME = "Satyam Kumar";
// var REGISTRATION_HEAD_PHONE = "+91 99053 36808";
// var REGISTRATION_HEAD_EMAIL = "ybntechclub01@gmail.com";

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("No payload received");
    }

    var data = JSON.parse(e.postData.contents);
    var output = { success: true };

    // Action 1: Direct Send Email request
    if (data.action === "send_email") {
      if (data.email && data.htmlBody) {
        var subject = data.subject || ("Registration Token [" + (data.registrationCode || "") + "] — YUNIFEST 2026");
        GmailApp.sendEmail(data.email, subject, "", {
          htmlBody: data.htmlBody,
          name: "YUNIFEST 2026 Organizing Committee"
        });
        output.emailSent = true;
      }
      return ContentService.createTextOutput(JSON.stringify(output)).setMimeType(ContentService.MimeType.JSON);
    }

    // Action 2: Upload Payment Receipt to Google Drive Folder
    var folderId = data.folderId || TARGET_FOLDER_ID;
    var folder = DriveApp.getFolderById(folderId);

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

      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
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
 * Builds the dark cyberpunk email template (NO QR CODE)
 */
function generateEmailTemplate(data) {
  var fullName = (data.fullName || "Participant").toUpperCase();
  var token = data.registrationCode || "YUNI-2026";
  var eventName = data.eventName || "Festival Event";
  var studentId = data.studentIdNumber || "N/A";
  var category = (data.participationCategory || "Individual").toUpperCase();
  var txn = data.transactionId || "";
  var whatsappUrl = data.whatsAppChannelUrl || WHATSAPP_CHANNEL_URL;

  return '<!DOCTYPE html><html><body style="margin:0;padding:0;background-color:#060911;font-family:Arial,sans-serif;color:#f1f5f9;">' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#060911;padding:24px 12px;">' +
    '<tr><td align="center">' +
    '<table width="100%" style="max-width:560px;background-color:#0b111e;border:1.5px solid #1e293b;border-radius:24px;overflow:hidden;">' +
    '<tr><td align="center" style="padding:28px 20px;background:linear-gradient(180deg,#0e1a33 0%,#0b111e 100%);border-bottom:1px solid #1e293b;">' +
    '<h1 style="margin:0;font-size:26px;font-weight:900;color:#00F0FF;letter-spacing:1px;">YUNIFEST 2026</h1>' +
    '<p style="margin:4px 0 0 0;font-size:12px;color:#94a3b8;">YBN University Annual Mega Festival • Ranchi</p>' +
    '</td></tr>' +
    '<tr><td style="padding:24px 24px 10px 24px;">' +
    '<h2 style="margin:0 0 8px 0;font-size:18px;color:#ffffff;">Congratulations, <span style="color:#38bdf8;">' + fullName + '</span>! 👏</h2>' +
    '<p style="margin:0;font-size:13px;color:#cbd5e1;line-height:1.5;">Your registration for <strong style="color:#ffffff;">' + eventName + '</strong> organized by the <em>YBN University Fest Committee</em> has been successfully recorded!</p>' +
    '</td></tr>' +
    '<tr><td style="padding:10px 24px 18px 24px;">' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#06182c;border:2px solid #00F0FF;border-radius:16px;">' +
    '<tr><td align="center" style="padding:20px 14px;">' +
    '<div style="font-family:monospace;font-size:11px;font-weight:bold;color:#7dd3fc;letter-spacing:2px;margin-bottom:4px;">YOUR OFFICIAL REGISTRATION TOKEN</div>' +
    '<div style="font-family:monospace;font-size:30px;font-weight:900;color:#00F0FF;letter-spacing:3px;">' + token + '</div>' +
    '</td></tr></table>' +
    '</td></tr>' +
    '<tr><td style="padding:0 24px 18px 24px;">' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f172a;border:1px solid #1e293b;border-radius:12px;font-size:12px;">' +
    '<tr><td style="padding:10px 14px;border-bottom:1px solid #1e293b;color:#94a3b8;">Participant:</td><td style="padding:10px 14px;border-bottom:1px solid #1e293b;color:#ffffff;font-weight:bold;text-align:right;">' + fullName + '</td></tr>' +
    '<tr><td style="padding:10px 14px;border-bottom:1px solid #1e293b;color:#94a3b8;">ID / Roll No:</td><td style="padding:10px 14px;border-bottom:1px solid #1e293b;color:#38bdf8;font-weight:bold;text-align:right;">' + studentId + '</td></tr>' +
    '<tr><td style="padding:10px 14px;border-bottom:1px solid #1e293b;color:#94a3b8;">Event:</td><td style="padding:10px 14px;border-bottom:1px solid #1e293b;color:#ffffff;font-weight:bold;text-align:right;">' + eventName + '</td></tr>' +
    '<tr><td style="padding:10px 14px;' + (txn ? 'border-bottom:1px solid #1e293b;' : '') + 'color:#94a3b8;">Participation Mode:</td><td style="padding:10px 14px;' + (txn ? 'border-bottom:1px solid #1e293b;' : '') + 'color:#00F0FF;font-weight:bold;text-align:right;">' + category + '</td></tr>' +
    (txn ? '<tr><td style="padding:10px 14px;color:#94a3b8;">UTR Reference:</td><td style="padding:10px 14px;color:#22c55e;font-family:monospace;font-weight:bold;text-align:right;">' + txn + '</td></tr>' : '') +
    '</table>' +
    '</td></tr>' +
    '<tr><td style="padding:0 24px 18px 24px;">' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#062319;border:2px solid #10b981;border-radius:16px;">' +
    '<tr><td align="center" style="padding:20px 16px;">' +
    '<div style="font-size:14px;font-weight:bold;color:#ffffff;margin-bottom:6px;">📲 Join Official YUNIFEST 2026 WhatsApp Channel</div>' +
    '<p style="margin:0 0 14px 0;font-size:12px;color:#a7f3d0;line-height:1.4;">Get live alerts, schedule updates, guidelines, and instant announcements directly on WhatsApp!</p>' +
    '<a href="' + whatsappUrl + '" target="_blank" style="display:inline-block;background-color:#10b981;color:#022c22;font-size:12.5px;font-weight:800;padding:10px 24px;border-radius:999px;text-decoration:none;">📲 Join WhatsApp Channel Now →</a>' +
    '</td></tr></table>' +
    '</td></tr>' +
    '<tr><td style="padding:0 24px 18px 24px;">' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#190e28;border:1.5px solid #a855f7;border-radius:16px;">' +
    '<tr><td align="center" style="padding:16px 14px;">' +
    '<div style="font-size:12.5px;font-weight:bold;color:#f0abfc;margin-bottom:4px;">Thank you from YBN Tech Club & Fest Committee! 🙏</div>' +
    '<p style="margin:0;font-size:11.5px;color:#e9d5ff;font-style:italic;">"Your ideas have the power to turn possibilities into reality. Think bold, build smart, and let your innovation shine! 💡"</p>' +
    '</td></tr></table>' +
    '</td></tr>' +
    '<tr><td align="center" style="padding:20px 24px 26px 24px;background-color:#070c18;border-top:1px solid #1e293b;">' +
    '<div style="font-size:10.5px;font-family:monospace;color:#94a3b8;letter-spacing:1px;margin-bottom:4px;">Need Help? Contact Registration Head:</div>' +
   '</td></tr>' +
    '</table></td></tr></table></body></html>';
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "online",
      message: "YUNIFEST 2026 Drive & Email Service is live."
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
