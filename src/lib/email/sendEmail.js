export async function sendEmail({ name, email, message, captchaToken, projectType, budget, timeline, features, company, phone }) {
  const service_id = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const template_id = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const user_id = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  if (!service_id || !template_id || !user_id) {
    throw new Error('Email service is not configured. Missing environment variables.')
  }

  // Create a comprehensive message including all form data
  const fullMessage = `
${message}

--- Project Details ---
Project Type: ${projectType || 'Not specified'}
Budget: ${budget || 'Not specified'}
Timeline: ${timeline || 'Not specified'}
Features: ${features && features.length > 0 ? features.join(', ') : 'Not specified'}
Company: ${company || 'Not specified'}
Phone: ${phone || 'Not specified'}
  `.trim()

  const payload = {
    service_id,
    template_id,
    user_id,
    template_params: {
      from_name: name,
      reply_to: email,
      message: fullMessage,
      project_type: projectType || '',
      budget: budget || '',
      timeline: timeline || '',
      features: features && features.length > 0 ? features.join(', ') : '',
      company: company || '',
      phone: phone || '',
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
