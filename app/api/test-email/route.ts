import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function GET(request: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { 
          status: 'API key not configured',
          message: 'Please add RESEND_API_KEY to your environment variables',
          instructions: 'See README-EMAIL-SETUP.md for setup instructions'
        },
        { status: 200 }
      )
    }

    const { data, error } = await resend.emails.send({
      from: 'HKS Media <noreply@hksmediasolutions.com>',
      to: ['abdulhadi@hksmediasolutions.com'],
      subject: 'Test Email - HKS Media Website',
      text: `
This is a test email from your HKS Media website.

If you receive this email, the contact form is working correctly!

Test sent at: ${new Date().toISOString()}
      `,
    })

    if (error) {
      return NextResponse.json(
        { 
          status: 'Error',
          error: error.message,
          details: error
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        status: 'Success',
        message: 'Test email sent successfully!',
        data: data
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Test email error:', error)
    return NextResponse.json(
      { 
        status: 'Error',
        error: 'Failed to send test email',
        details: error
      },
      { status: 500 }
    )
  }
} 