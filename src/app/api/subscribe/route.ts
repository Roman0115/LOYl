import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const mailchimpApiKey = process.env.MAILCHIMP_API_KEY
    const mailchimpListId = process.env.MAILCHIMP_LIST_ID
    const mailchimpServerPrefix = process.env.MAILCHIMP_SERVER_PREFIX

    if (!mailchimpApiKey || !mailchimpListId || !mailchimpServerPrefix) {
      return NextResponse.json(
        { error: 'Mailchimp configuration is missing' },
        { status: 500 }
      )
    }

    const mailchimpUrl = `https://${mailchimpServerPrefix}.api.mailchimp.com/3.0/lists/${mailchimpListId}/members`

    const response = await fetch(mailchimpUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${mailchimpApiKey}`,
      },
      body: JSON.stringify({
        email_address: email,
        status: 'pending',
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      // If email already exists, that's okay
      if (error.status === 400 && error.title === 'Member Exists') {
        return NextResponse.json(
          { message: 'You\'re already subscribed!' },
          { status: 200 }
        )
      }
      throw new Error(error.detail || 'Failed to subscribe')
    }

    return NextResponse.json(
      { message: 'Successfully subscribed! Check your email for confirmation.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
