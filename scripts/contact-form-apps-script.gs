const RECIPIENT_EMAIL = 'pcmufeeda@gmail.com';
const SHEET_NAME = 'Portfolio Enquiries';

function doPost(event) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const payload = JSON.parse(event.postData.contents || '{}');

    // Bots commonly fill hidden fields that human visitors never see.
    if (payload.website) {
      return jsonResponse({ ok: true });
    }

    const name = clean(payload.name);
    const email = clean(payload.email);
    const subject = clean(payload.subject);
    const message = clean(payload.message);

    if (!name || !email || !subject || !message) {
      return jsonResponse({ ok: false, error: 'Missing required fields.' });
    }

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      sheet.appendRow(['Received', 'Name', 'Email', 'Subject', 'Message', 'Source']);
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date(),
      name,
      email,
      subject,
      message,
      clean(payload.source),
    ]);

    MailApp.sendEmail({
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: `Portfolio enquiry: ${subject}`,
      htmlBody: [
        `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
        `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
        `<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>`,
        `<p><strong>Message:</strong></p>`,
        `<p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`,
      ].join(''),
    });

    return jsonResponse({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, error: 'Submission failed.' });
  } finally {
    lock.releaseLock();
  }
}

function clean(value) {
  return String(value || '').trim().slice(0, 5000);
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
