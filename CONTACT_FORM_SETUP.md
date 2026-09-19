# Contact form: Google Sheets + email

The portfolio form is ready to submit to a Google Apps Script web app. Until an
endpoint is configured, it safely falls back to opening the visitor's email
client.

## One-time setup

1. Create a Google Sheet for portfolio enquiries.
2. In that sheet, open **Extensions → Apps Script**.
3. Replace the editor contents with
   `scripts/contact-form-apps-script.gs`.
4. Click **Deploy → New deployment → Web app**.
5. Set **Execute as** to **Me** and **Who has access** to **Anyone**.
6. Authorize the script, deploy it, and copy the `/exec` URL.
7. Create `.env.local` in the project root:

   ```env
   VITE_CONTACT_ENDPOINT=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
   ```

8. Restart the development server or redeploy the site.

Each valid submission creates a row in the `Portfolio Enquiries` sheet and
sends an email to `pcmufeeda@gmail.com`. The notification's Reply-To address is
the visitor's email.

## Testing

Submit the deployed form once and verify:

- A new row appears in the sheet.
- The notification arrives by email.
- Replying addresses the visitor.

Google may place the first notification in Spam. Mark it as safe if needed.
