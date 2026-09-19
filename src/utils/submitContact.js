import { contact } from '../data/portfolio';

export async function submitContact({ name, email, subject, message, botcheck }) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  const payload = {
    name,
    email,
    subject,
    message,
    from_name: name,
  };

  if (accessKey) {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        ...payload,
        replyto: email,
        botcheck,
      }),
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error('submit_failed');
    }
    return;
  }

  const response = await fetch(`https://formsubmit.co/ajax/${contact.email}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      ...payload,
      _subject: `Portfolio message from ${name}`,
      _template: 'table',
      _captcha: 'false',
      _honey: botcheck,
    }),
  });

  const data = await response.json();
  const failed = !response.ok || data.success === 'false' || data.success === false;
  const needsActivation = /activation|activate form/i.test(data.message || '');

  if (needsActivation) {
    throw new Error('form_activation');
  }
  if (failed) {
    throw new Error('submit_failed');
  }
}
