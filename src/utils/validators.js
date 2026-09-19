const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm({ name, email, subject, message }) {
  const errors = {};
  const values = {
    name: name?.trim() ?? '',
    email: email?.trim() ?? '',
    subject: subject?.trim() ?? '',
    message: message?.trim() ?? '',
  };

  if (!values.name) errors.name = 'Name is required.';
  if (!values.email) errors.email = 'Email is required.';
  else if (!EMAIL_REGEX.test(values.email)) errors.email = 'Enter a valid email address.';
  if (!values.subject) errors.subject = 'Subject is required.';
  if (!values.message) errors.message = 'Message is required.';
  else if (values.message.length < 10) errors.message = 'Message must be at least 10 characters.';

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
    values,
  };
}

export function formatExternalUrl(url) {
  if (!url) return '';
  return url.startsWith('http') ? url : `https://${url}`;
}

export function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}
