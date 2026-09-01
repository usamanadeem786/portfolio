const BRAND_COLOR = '#84cc16'
const TEXT_COLOR = '#18181b'
const MUTED_COLOR = '#71717a'
const BORDER_COLOR = '#e4e4e7'

const emailShell = ({ preheader = '', body }) => `
<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <span style="display:none;font-size:1px;color:#f4f4f5;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${preheader}</span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border:1px solid ${BORDER_COLOR};border-radius:8px;overflow:hidden;">
            <tr>
              <td style="background-color:${TEXT_COLOR};padding:20px 28px;">
                <span style="color:${BRAND_COLOR};font-weight:700;font-size:16px;letter-spacing:0.02em;">Usama Bin Nadeem</span>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                ${body}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 28px;border-top:1px solid ${BORDER_COLOR};">
                <p style="margin:0;font-size:12px;color:${MUTED_COLOR};">
                  Usama Bin Nadeem &middot; Python &amp; Backend Software Engineer
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`

const humanizeKey = (key) =>
  key
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim()

// Turns the raw, dynamic contact-form payload into an ordered list of
// { label, value } rows, collapsing `technologies[X]: true` checkbox
// entries into a single "Technologies" row instead of one row per box.
const flattenFormFields = (body) => {
  const rows = []
  const technologies = []

  Object.entries(body).forEach(([key, value]) => {
    const techMatch = key.match(/^technologies\[(.+)\]$/)

    if (techMatch) {
      if (value === true || value === 'true') technologies.push(techMatch[1])
      return
    }

    if (value === undefined || value === null || value === '' || value === false) return

    rows.push({ label: humanizeKey(key), value: String(value) })
  })

  if (technologies.length) {
    rows.push({ label: 'Technologies', value: technologies.join(', ') })
  }

  return rows
}

const escapeHtml = (str) =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

export const buildAdminNotificationEmail = (body) => {
  const rows = flattenFormFields(body)
  const messageRow = rows.find((r) => r.label === 'Message')
  const otherRows = rows.filter((r) => r.label !== 'Message')

  const rowsHtml = otherRows
    .map(
      ({ label, value }) => `
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid ${BORDER_COLOR};font-size:13px;color:${MUTED_COLOR};width:140px;vertical-align:top;">${escapeHtml(
            label
          )}</td>
          <td style="padding:8px 0;border-bottom:1px solid ${BORDER_COLOR};font-size:14px;color:${TEXT_COLOR};vertical-align:top;">${escapeHtml(
            value
          )}</td>
        </tr>`
    )
    .join('')

  const body_ = `
    <h2 style="margin:0 0 4px;font-size:18px;color:${TEXT_COLOR};">New contact form submission</h2>
    <p style="margin:0 0 20px;font-size:14px;color:${MUTED_COLOR};">Someone just reached out through your portfolio.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      ${rowsHtml}
    </table>
    ${
      messageRow
        ? `<div style="margin-bottom:4px;font-size:13px;color:${MUTED_COLOR};">Message</div>
           <div style="padding:14px;background-color:#fafafa;border:1px solid ${BORDER_COLOR};border-radius:6px;font-size:14px;color:${TEXT_COLOR};white-space:pre-wrap;">${escapeHtml(
             messageRow.value
           )}</div>`
        : ''
    }
  `

  return emailShell({ preheader: 'New contact form submission on your portfolio', body: body_ })
}

export const buildConfirmationEmail = ({ firstName }) => {
  const greetingName = firstName ? escapeHtml(firstName) : 'there'

  const body_ = `
    <h2 style="margin:0 0 4px;font-size:18px;color:${TEXT_COLOR};">Thanks for reaching out, ${greetingName}!</h2>
    <p style="margin:16px 0;font-size:14px;line-height:1.6;color:${TEXT_COLOR};">
      I've received your message and appreciate you taking the time to get in touch. I'll review the
      details and get back to you within 24&ndash;48 hours.
    </p>
    <p style="margin:16px 0;font-size:14px;line-height:1.6;color:${TEXT_COLOR};">
      In the meantime, feel free to take a look at my
      <a href="https://usamadev.company/projects" style="color:${BRAND_COLOR};text-decoration:none;font-weight:600;">recent projects</a>
      or connect with me on
      <a href="https://www.linkedin.com/in/usama-nadeem-853749269/" style="color:${BRAND_COLOR};text-decoration:none;font-weight:600;">LinkedIn</a>.
    </p>
    <p style="margin:24px 0 0;font-size:14px;line-height:1.6;color:${TEXT_COLOR};">
      Best,<br />
      <strong>Usama Bin Nadeem</strong>
    </p>
  `

  return emailShell({ preheader: 'Thanks for contacting Usama Bin Nadeem', body: body_ })
}
