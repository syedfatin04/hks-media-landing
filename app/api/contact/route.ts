import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { brandName, role, email, website, influencerType, experience } = body

    // Validate required fields
    if (!brandName || !role || !email || !influencerType || !experience) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create email content
    const subject = `New Launch Pack Request - ${brandName}`
    const emailBody = `
New Influencer Launch Pack Request

Brand Name: ${brandName}
Role: ${role}
Email: ${email}
Website/Instagram: ${website || 'Not provided'}

Influencer Requirements:
${influencerType}

Experience Level: ${experience}

---
This request was submitted from the HKS Media website.
Submitted at: ${new Date().toISOString()}
    `.trim()

    // Try to send email using Resend
    try {
      const resend = new Resend(process.env.RESEND_API_KEY)
      
      const { data, error } = await resend.emails.send({
        from: 'HKS Media <noreply@hksmediagroup.com>',
        to: ['abdulhadi@hksmediasolutions.com'],
        subject: subject,
        text: emailBody,
        replyTo: email, // Allow direct reply to the customer
      })

      if (error) {
        console.error('Resend error:', error)
        // Fallback to console logging if email fails
        console.log('Email to send (fallback):', {
          to: 'abdulhadi@hksmediasolutions.com',
          subject: subject,
          body: emailBody
        })
      } else {
        console.log('Email sent successfully:', data)
      }
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      // Fallback to console logging
      console.log('Email to send (fallback):', {
        to: 'abdulhadi@hksmediasolutions.com',
        subject: subject,
        body: emailBody
      })
    }

    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Form submitted successfully. We\'ll get back to you within 48 hours.' 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error processing form submission:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 