import path from 'path'
import type { Transporter } from 'nodemailer'

export interface ContactData {
  name: string
  email: string
  company: string
  inquiry: string
}

const Brand = {
  name: 'Jastech VN',
  buttonBg: '#4f46e5',
  bg: '#1a1a1a',
  text: '#ffffff',
  muted: '#b5b5b5',
  logoCid: 'logo_Jastech',
  logoPath: path.join(process.cwd(), 'public', 'images', 'logo_Jastech.jpg'),
}

const logoSrc = () => `cid:${Brand.logoCid}`

// Chống HTML injection vì dữ liệu lấy từ form của người dùng
const esc = (s: string) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const nl2br = (s: string) => esc(s).replace(/\r?\n/g, '<br/>')

// ---------- Layout dùng chung ----------
interface LayoutOptions {
  title: string
  bodyHtml: string
  button?: { label: string; href: string }
  footerHtml: string
}

function layout({ title, bodyHtml, button, footerHtml }: LayoutOptions) {
  const buttonHtml = button
    ? `
      <tr>
        <td align="center" style="padding:24px 0 28px;">
          <a href="${button.href}"
             style="background:${Brand.buttonBg};color:#ffffff;text-decoration:none;
                    font-weight:600;font-size:14px;padding:12px 28px;border-radius:6px;
                    display:inline-block;">
            ${esc(button.label)}
          </a>
        </td>
      </tr>`
    : ''
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="dark" />
  <meta name="supported-color-schemes" content="dark" />
  <title>${esc(title)}</title>
</head>
<body style="margin:0;padding:0;background:${Brand.bg};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
         style="background:${Brand.bg};">
    <tr>
      <td align="center" style="padding:32px 12px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"
               style="width:100%;max-width:600px;background:${Brand.bg};
                      font-family:Inter,Segoe UI,Helvetica,Arial,sans-serif;color:${Brand.text};">
 
          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:24px;">
              <img src="${logoSrc()}" alt="${esc(Brand.name)}" height="48"
                   style="display:block;height:48px;border:0;outline:none;" />
            </td>
          </tr>
          <!-- Title -->
          <tr>
            <td align="center" style="padding-bottom:28px;">
              <h1 style="margin:0;font-size:20px;line-height:28px;font-weight:700;color:${Brand.text};">
                ${esc(title)}
              </h1>
            </td>
          </tr>
 
          <!-- Body -->
          <tr>
            <td style="padding:0 24px;font-size:14px;line-height:26px;color:${Brand.text};">
              ${bodyHtml}
            </td>
          </tr>
 
          ${buttonHtml}
 
          <!-- Divider -->
          <tr>
            <td style="padding:0 24px;">
              <hr style="border:0;border-top:1px solid #d9d9d9;margin:0 0 16px;" />
            </td>
          </tr>
 
          <!-- Footer -->
          <tr>
            <td style="padding:0 24px;font-size:14px;line-height:26px;color:${Brand.text};">
              ${footerHtml}
            </td>
          </tr>
 
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

// ---------- Template 1: gửi cho admin  ----------
export function buildAdminEmail(data: ContactData) {
  const { name, email, company, inquiry } = data

  // Bấm nút Contact -> mở mail client, trả lời thẳng cho người đăng ký
  const mailto = `mailto:${encodeURIComponent(email).replace('%40', '@')}?subject=${encodeURIComponent(`Re: Contact from ${name}`)}`

  const html = layout({
    title: 'Congrats! Someone just sent a contact notification',
    bodyHtml: `
      <p style="margin:0 0 16px;">Dear ${esc(Brand.name)},</p>
      <p style="margin:0 0 16px;">
        You have received a new contact request from <b>${esc(name)}</b>
        (${esc(company)}). Message:
      </p>
      <div style="background:#262626;border-left:3px solid ${Brand.buttonBg};
                  padding:12px 16px;border-radius:4px;color:${Brand.muted};">
        ${nl2br(inquiry)}
      </div>
      <p style="margin:16px 0 0;">Click the button below to get in touch with them.</p>`,
    button: { label: 'Contact', href: mailto },
    footerHtml: `
      Best regards,<br/>
      Name: ${esc(name)},<br/>
      Company: ${esc(company)},<br/>
      Email: <a href="mailto:${esc(email)}" style="color:${Brand.buttonBg};">${esc(email)}</a>`,
  })

  const text = `New contact form submisson\n\nCompany: ${company}\nName: ${name}\nEmail: ${email}\nMessage: ${inquiry}`

  return { html, text }
}

// ---------- Template 2: gửi cho user ----------
export function buildUserConfirmationEmail(
  data: ContactData,
  supportEmail: string
) {
  const { name, company, email, inquiry } = data

  const html = layout({
    title: 'Thank you for contacting us!',
    bodyHtml: `
      <p style="margin:0 0 16px;">Dear ${esc(name)},</p>
      <p style="margin:0 0 16px;">
        We have received your message and our team will get back to you as soon as possible.
        Here is a copy of what you sent us:
      </p>
      <div style="background:#262626;border-left:3px solid ${Brand.buttonBg};
                  padding:12px 16px;border-radius:4px;color:${Brand.muted};">
        ${nl2br(inquiry)}
      </div>
      <p style="margin:16px 0 0;">
        If you need to add more information, just reply to this email or use the button below.
      </p>`,
    button: { label: 'Contact us', href: `mailto:${supportEmail}` },
    footerHtml: `
      Best regards,<br/>
      ${esc(Brand.name)} Team<br/>
      <span style="color:${Brand.muted};">Your info: ${esc(company)} - ${esc(email)}</span>`,
  })

  const text = `Dear ${name},\n\nWe have received your message and will get back to you soon.\n\nYour message:\n${inquiry}\n\nBest regards,\n${Brand.name} Team`

  return { html, text }
}

// ---------- Gửi mail ----------
export async function sendContactEmails(
  transporter: Transporter,
  mailUser: string,
  data: ContactData
) {
  const logoAttachments = [
    { filename: 'logo_Jastech.jpg', path: Brand.logoPath, cid: Brand.logoCid },
  ]

  const admin = buildAdminEmail(data)
  const user = buildUserConfirmationEmail(data, mailUser)

  //Mail thông báo cho admin
  await transporter.sendMail({
    from: `"Contact Form" <${mailUser}>`,
    to: mailUser,
    replyTo: data.email,
    subject: `New contact form submission from ${data.name}`,
    text: admin.text,
    html: admin.html,
    attachments: logoAttachments,
  })

  // Mail xác nhận cho người dùng (gửi sau khi mail 1 thành công)
  await transporter.sendMail({
    from: `"${Brand.name}" <${mailUser}>`,
    to: data.email,
    replyTo: mailUser,
    subject: `We received your message, ${data.name}`,
    text: user.text,
    html: user.html,
    attachments: logoAttachments,
  })
}
