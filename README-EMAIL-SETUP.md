# Email Setup Instructions

## Current Status
The contact form is now set up to send emails using Resend, but you need to configure the API key.

## Setup Steps

### 1. Get a Free Resend API Key
1. Go to https://resend.com/
2. Sign up for a free account
3. Get your API key from the dashboard
4. The free tier includes 3,000 emails per month

### 2. Configure Environment Variables
Create a `.env.local` file in your project root and add:

```
RESEND_API_KEY=your_actual_resend_api_key_here
```

### 3. Verify Email Domain (Optional)
For better deliverability, you can verify your domain:
- Add DNS records as instructed by Resend
- This allows you to send from `noreply@hksmediasolutions.com`

## How It Works

### Form Submission Flow:
1. User fills out contact form
2. Form data is sent to `/api/contact`
3. API validates the data
4. Email is sent to `abdulhadi@hksmediasolutions.com`
5. User gets success message
6. Form resets automatically

### Email Content:
- **Subject**: "New Launch Pack Request - [Brand Name]"
- **Recipient**: abdulhadi@hksmediasolutions.com
- **Reply-To**: Customer's email address
- **Content**: All form fields including requirements and experience

### Fallback System:
- If Resend fails, emails are logged to console
- Form still shows success message to user
- No user experience disruption

## Testing

### Without API Key:
- Form submission works
- Emails are logged to console
- User gets success message

### With API Key:
- Form submission works
- Emails are actually sent
- User gets success message
- You receive emails at abdulhadi@hksmediasolutions.com

## Alternative Email Services

If you prefer other services:

### SendGrid:
```bash
npm install @sendgrid/mail
```

### Mailgun:
```bash
npm install mailgun.js
```

### Nodemailer (for custom SMTP):
```bash
npm install nodemailer
```

## Security Notes

- API keys are stored in environment variables
- Form validation prevents spam
- Rate limiting can be added if needed
 