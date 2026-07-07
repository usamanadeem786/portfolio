/** *************************************************************
 * Any file inside the folder pages/api is mapped to /api/* and *
 * will be treated as an API endpoint instead of a page.        *
 ****************************************************************/

import { config, siteMetaData } from '../../theme.config'

const getBrevoApiKey = () => {
  const rawKey = process.env.BREVO_API_KEY || process.env.SENDGRID_API_KEY || ''
  return rawKey
    .replace(/^SG\./, '')
    .replace(/^=+\s*/, '')
    .trim()
}

const getHtmlBody = (body) => {
  return Object.entries(body).map(([key, value]) => {
    if (typeof value === 'string') {
      return `<b>${key}</b>: ${value}`
    }
    if (typeof value === 'boolean') {
      return value === true ? key : false
    }
    if (typeof value === 'object' && value !== null) {
      return `<b>${key}</b>: ${getHtmlBody(value)?.filter(Boolean).join(', ')}`
    }
    return null
  })
}

const sendEmailViaBrevo = async ({ to, from, replyTo, subject, html }) => {
  const apiKey = getBrevoApiKey()

  if (!apiKey) {
    throw new Error('Missing email API key. Set BREVO_API_KEY in your .env file.')
  }

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      sender: { email: from, name: siteMetaData?.siteName || 'Portfolio Contact' },
      to: [{ email: to }],
      replyTo: { email: replyTo },
      subject,
      htmlContent: html,
    }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || `Email request failed (${response.status})`)
  }
}

const contact = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Request method is not allowed.' })
  }

  const { email } = req.body
  const { recipient, sender, subject } = config.contactForm || {}

  if (!recipient) {
    return res
      .status(400)
      .json({ error: 'Missing [config.contactForm.recipient] property in theme options.' })
  }
  if (!sender) {
    return res
      .status(400)
      .json({ error: 'Missing [config.contactForm.sender] property in theme options.' })
  }
  if (!email) {
    return res
      .status(400)
      .json({ error: 'Missing email address. Please provide a correct email address.' })
  }

  let html = getHtmlBody(req.body)
  if (Array.isArray(html)) {
    html = html.filter(Boolean).join('<br />')
  }

  try {
    await sendEmailViaBrevo({
      to: recipient,
      from: sender,
      replyTo: email,
      subject: req.body.subject || subject || 'Contact form entry',
      html,
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }

  return res.status(201).json({ error: '' })
}

export default contact
