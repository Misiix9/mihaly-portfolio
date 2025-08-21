// Enhanced email service using ONLY EmailJS (fallbacks disabled per user preference)
export async function sendEmail({ name, email, message, captchaToken, projectType, budget, timeline, features, company, phone }) {
  const service_id = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const template_id = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const user_id = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  // If EmailJS is not configured, do NOT use fallbacks
  if (!service_id || !template_id || !user_id) {
    console.error('EmailJS not configured. Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY in .env')
    return { success: false, method: 'emailjs', error: 'EmailJS not configured' }
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

  try {
    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const text = await res.text()
      console.error('EmailJS failed:', text)
      // Fallbacks disabled: return error
      return { success: false, method: 'emailjs', error: text || 'EmailJS request failed' }
    }

    return { success: true, method: 'emailjs' }
  } catch (error) {
    console.error('EmailJS error:', error)
    // Fallbacks disabled: return error
    return { success: false, method: 'emailjs', error: error?.message || String(error) }
  }
}

// Fallback helpers retained for reference (disabled and unused)
/* eslint-disable no-unused-vars */
// Fallback email methods
async function sendEmailFallback({ name, email, message, projectType, budget, timeline, features, company, phone }) {
  // Method 1: Try Formspree (free service)
  try {
    const formspreeResult = await sendViaFormspree({ name, email, message, projectType, budget, timeline, features, company, phone })
    if (formspreeResult.success) {
      return formspreeResult
    }
  } catch (error) {
    console.warn('Formspree failed:', error)
  }

  // Method 2: Try Netlify Forms (if deployed on Netlify)
  try {
    const netlifyResult = await sendViaNetlifyForms({ name, email, message, projectType, budget, timeline, features, company, phone })
    if (netlifyResult.success) {
      return netlifyResult
    }
  } catch (error) {
    console.warn('Netlify Forms failed:', error)
  }

  // Method 3: Generate mailto link as last resort
  return generateMailtoLink({ name, email, message, projectType, budget, timeline, features, company, phone })
}

// Formspree integration (free tier available)
async function sendViaFormspree({ name, email, message, projectType, budget, timeline, features, company, phone }) {
  const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT
  
  if (!formspreeEndpoint) {
    throw new Error('Formspree not configured')
  }

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

  const response = await fetch(formspreeEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      message: fullMessage,
      _replyto: email,
      _subject: `New Contact Form Submission from ${name}`,
    }),
  })

  if (!response.ok) {
    throw new Error('Formspree submission failed')
  }

  return { success: true, method: 'formspree' }
}

// Netlify Forms integration
async function sendViaNetlifyForms({ name, email, message, projectType, budget, timeline, features, company, phone }) {
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

  const response = await fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      'form-name': 'contact',
      name,
      email,
      message: fullMessage,
      projectType: projectType || '',
      budget: budget || '',
      timeline: timeline || '',
      features: features && features.length > 0 ? features.join(', ') : '',
      company: company || '',
      phone: phone || '',
    }).toString(),
  })

  if (!response.ok) {
    throw new Error('Netlify Forms submission failed')
  }

  return { success: true, method: 'netlify' }
}

// Generate mailto link as ultimate fallback
function generateMailtoLink({ name, email, message, projectType, budget, timeline, features, company, phone }) {
  const fullMessage = `
Hi! I'm ${name} and I'd like to discuss a project with you.

${message}

--- Project Details ---
Project Type: ${projectType || 'Not specified'}
Budget: ${budget || 'Not specified'}
Timeline: ${timeline || 'Not specified'}
Features: ${features && features.length > 0 ? features.join(', ') : 'Not specified'}
Company: ${company || 'Not specified'}
Phone: ${phone || 'Not specified'}
Email: ${email}

Best regards,
${name}
  `.trim()

  const subject = `New Project Inquiry from ${name}`
  const mailtoLink = `mailto:your-email@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(fullMessage)}`
  
  // Open mailto link
  window.open(mailtoLink, '_self')
  
  return { success: true, method: 'mailto', message: 'Email client opened with pre-filled message' }
}
/* eslint-enable no-unused-vars */
