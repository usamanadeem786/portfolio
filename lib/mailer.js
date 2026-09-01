import nodemailer from 'nodemailer'

let cachedTransporter = null

const getTransporter = () => {
  if (cachedTransporter) return cachedTransporter

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_SECURE } = process.env

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) {
    throw new Error(
      'Missing SMTP configuration. Set SMTP_HOST, SMTP_USER and SMTP_PASSWORD in your .env file.'
    )
  }

  const port = Number(SMTP_PORT) || 587
  // Port 465 is implicit TLS; anything else (e.g. 587) uses STARTTLS, which
  // nodemailer negotiates automatically when `secure` is false.
  const secure = SMTP_SECURE !== undefined ? SMTP_SECURE === 'true' : port === 465

  cachedTransporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
  })

  return cachedTransporter
}

export const sendEmail = async ({ to, toName, from, fromName, replyTo, subject, html }) => {
  const transporter = getTransporter()

  await transporter.sendMail({
    from: fromName ? `"${fromName}" <${from}>` : from,
    to: toName ? `"${toName}" <${to}>` : to,
    ...(replyTo && { replyTo }),
    subject,
    html,
  })
}
