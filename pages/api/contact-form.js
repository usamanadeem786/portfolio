/** *************************************************************
 * Any file inside the folder pages/api is mapped to /api/* and *
 * will be treated as an API endpoint instead of a page.        *
 ****************************************************************/

import { config, siteMetaData } from '../../theme.config'
import { sendEmail } from '../../lib/mailer'
import { buildAdminNotificationEmail, buildConfirmationEmail } from '../../lib/email-templates'

const contact = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Request method is not allowed.' })
  }

  const { email } = req.body
  const firstName = req.body['first-name']
  const lastName = req.body['last-name']
  const { recipient, sender } = config.contactForm || {}

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

  const submitterName = [firstName, lastName].filter(Boolean).join(' ')

  // 1. Notify the site owner with the submitted details. This is the
  // primary purpose of the form, so a failure here fails the request.
  try {
    await sendEmail({
      to: recipient,
      from: sender,
      replyTo: email,
      subject: submitterName
        ? `New inquiry from ${submitterName} via portfolio`
        : 'New contact form submission',
      html: buildAdminNotificationEmail(req.body),
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }

  // 2. Send the visitor an auto-reply confirming receipt. This is a nice-to-have,
  // so it shouldn't fail the whole request if it errors out.
  try {
    await sendEmail({
      to: email,
      toName: submitterName || undefined,
      from: sender,
      fromName: siteMetaData?.authorName,
      subject: `Thanks for reaching out${firstName ? `, ${firstName}` : ''}!`,
      html: buildConfirmationEmail({ firstName }),
    })
  } catch (error) {
    console.error('Failed to send contact form confirmation email:', error.message)
  }

  return res.status(201).json({ error: '' })
}

export default contact
