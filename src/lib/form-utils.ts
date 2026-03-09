/**
 * Scroll to the first form field with a validation error.
 * Call this in the onError callback of handleSubmit.
 */
export function scrollToFirstError() {
  requestAnimationFrame(() => {
    const firstError = document.querySelector('[aria-invalid="true"]');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (firstError instanceof HTMLElement) firstError.focus();
    }
  });
}

const FORM_ENDPOINT = 'https://api.web3forms.com/submit';
const ACCESS_KEY = '__WEB3FORMS_ACCESS_KEY__'; // Replace with real key

/**
 * Submit form data to Web3Forms endpoint.
 * Returns true on success, throws on failure.
 */
export async function submitForm(data: Record<string, unknown>, subject: string): Promise<boolean> {
  // Skip API call if no real key configured (dev mode)
  if (ACCESS_KEY.startsWith('__')) {
    console.info('[Dev] Form would submit:', { subject, ...data });
    return true;
  }

  const res = await fetch(FORM_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_key: ACCESS_KEY,
      subject,
      from_name: 'Cypin Bridge Website',
      ...data,
    }),
  });

  if (!res.ok) throw new Error('Submission failed');
  const result = await res.json();
  if (!result.success) throw new Error(result.message || 'Submission failed');
  return true;
}
