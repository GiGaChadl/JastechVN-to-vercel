import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { sendContactEmails } from '@/components/providers/EmailTemplates'
export async function POST(request: Request) {
  try {
    // Parse the request body as JSON
    const { company, name, email, inquiry, captchaToken } = await request.json()

    // check if all required fields are present
    if (!company || !name || !email || !inquiry || !captchaToken) {
      return new Response(JSON.stringify({ error: 'Not enough information' }), {
        status: 400,
      })
    }

    const secret = process.env.RECAPTCHA_SECRET_KEY
    // Check if the reCAPTCHA secret key is set
    if (!secret) {
      return NextResponse.json(
        { error: 'Please set the RECAPTCHA_SECRET_KEY environment variable' },
        { status: 500 }
      )
    }

    // Prepare the request body for reCAPTCHA verification
    const verifyBody = new URLSearchParams({ secret, response: captchaToken })

    // Verify the reCAPTCHA token
    const recaptchaResponse = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: verifyBody.toString(),
        cache: 'no-store',
      }
    )
    // Parse the reCAPTCHA verification response
    const recaptchaData = await recaptchaResponse.json()

    // Check if the reCAPTCHA verification was successful and if the score is above the threshold
    if (
      !recaptchaData.success ||
      recaptchaData.score < 0.5 ||
      recaptchaData.action !== 'contact_form_submit'
    ) {
      return new Response(
        JSON.stringify({ error: 'reCAPTCHA verification failed' }),
        { status: 400 }
      )
    }

    const mailUser = process.env.SMTP_USER
    const mailPass = process.env.SMTP_PASS
    const smtpPort = Number(process.env.SMTP_PORT || 587)

    if (!mailUser || !mailPass) {
      return new Response(
        JSON.stringify({
          error: 'Email service is not configured',
        }),
        { status: 500 }
      )
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for other ports
      auth: {
        user: mailUser,
        pass: mailPass,
      },
    })

    await sendContactEmails(transporter, mailUser, {
      name,
      email,
      company,
      inquiry,
    })

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    })
  }
}
