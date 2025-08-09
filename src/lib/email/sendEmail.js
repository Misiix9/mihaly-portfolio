export async function sendEmail({ name, email, message, captchaToken }) {
  const service_id = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const template_id = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const user_id = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  if (!service_id || !template_id || !user_id) {
    throw new Error('Email service is not configured. Missing environment variables.')
  }

  const payload = {
    service_id,
    template_id,
    user_id,
    template_params: {
      from_name: name,
      reply_to: email,
      message,
      // Captcha token is included to allow logging in template or for
      // forwarding when using a custom proxy/verification endpoint later.
      hcaptcha_token: captchaToken || '',
    },
  }

  const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'Failed to send email')
  }

  return true
}
