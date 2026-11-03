// Google Drive Upload Service for YUNIFEST 2026
// Folder: https://drive.google.com/drive/folders/1-Z9Z7qD904fzBYjFRO3_Dip_ME96Fl1L?usp=drive_link

export const GOOGLE_DRIVE_FOLDER_ID = '1-Z9Z7qD904fzBYjFRO3_Dip_ME96Fl1L';
export const GOOGLE_DRIVE_FOLDER_URL = `https://drive.google.com/drive/folders/${GOOGLE_DRIVE_FOLDER_ID}?usp=drive_link`;

const DRIVE_SCRIPT_URL = 
  import.meta.env.YUNIFEST_GOOGLE_DRIVE_SCRIPT_URL || 
  'https://script.google.com/macros/s/AKfycbx5Gs2lLreeJskwf3-1cnQcFuEQC2jc2-mWLny_ror6zhONpS1IjXNogtl2d6m8PDMfOQ/exec';

export interface UploadReceiptParams {
  base64: string;
  email: string;
  transactionId?: string;
}

/**
 * Uploads a payment receipt to the official festival Google Drive folder.
 * Returns the Google Drive file view URL (saved in Supabase).
 */
export async function uploadReceiptToGoogleDrive({
  base64,
  email,
  transactionId
}: UploadReceiptParams): Promise<string> {
  const cleanEmail = email.trim().replace(/[^a-zA-Z0-9@._-]/g, '_');
  const cleanUtr = (transactionId || 'UTR').trim().replace(/[^a-zA-Z0-9_-]/g, '_');
  const filename = `${cleanEmail}_${cleanUtr}.jpg`;

  if (!DRIVE_SCRIPT_URL) {
    console.warn(
      'Google Drive Script URL not yet configured in .env (YUNIFEST_GOOGLE_DRIVE_SCRIPT_URL). ' +
      'Saving compressed receipt as fallback.'
    );
    return base64;
  }

  try {
    // Send with text/plain to avoid CORS preflight in Google Apps Script
    const response = await fetch(DRIVE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({
        base64,
        filename,
        email: cleanEmail,
        transactionId: cleanUtr,
        folderId: GOOGLE_DRIVE_FOLDER_ID,
      }),
    });

    if (!response.ok) {
      throw new Error(`Google Apps Script upload failed with HTTP status ${response.status}`);
    }

    const data = await response.json();
    if (data.success && data.fileUrl) {
      console.log('Receipt successfully uploaded to Google Drive folder:', data.fileUrl);
      return data.fileUrl;
    }

    throw new Error(data.error || 'Unknown error uploading to Google Drive');
  } catch (err) {
    console.error('Failed to upload directly to Google Drive, falling back to local storage:', err);
    return base64;
  }
}

/**
 * Checks if a screenshot URL points to Google Drive
 */
export function isGoogleDriveUrl(url?: string | null): boolean {
  if (!url) return false;
  return url.includes('drive.google.com') || url.includes('googleusercontent.com');
}

/**
 * Extracts the Google Drive File ID from a URL
 */
export function getDriveFileId(url?: string | null): string | null {
  if (!url) return null;
  const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

/**
 * Returns a high-resolution direct image CDN URL for an image.
 * Uses lh3.googleusercontent.com direct CDN which avoids 302 redirects.
 */
export function getDriveDirectImageUrl(url?: string | null): string {
  if (!url) return '';
  const fileId = getDriveFileId(url);
  if (fileId) {
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }
  return url;
}

/**
 * Returns the official Google Drive embed preview URL (works in <iframe>)
 */
export function getDrivePreviewUrl(url?: string | null): string {
  if (!url) return '';
  const fileId = getDriveFileId(url);
  if (fileId) {
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }
  return url;
}

/**
 * Returns the standard Google Drive View / Sharing URL
 */
export function getDriveViewUrl(url?: string | null): string {
  if (!url) return '';
  const fileId = getDriveFileId(url);
  if (fileId) {
    return `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
  }
  return url;
}

/**
 * Backwards compatible alias for getDriveDirectImageUrl
 */
export function getDriveThumbnailUrl(url?: string | null): string {
  return getDriveDirectImageUrl(url);
}
