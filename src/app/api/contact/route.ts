import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields (name, email, message) are required.' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // Target recipient
    const recipientEmail = process.env.RECIPIENT_EMAIL || 'ma02raj@gmail.com';

    // Web3Forms API integration
    const web3formsAccessKey = process.env.WEB3FORMS_ACCESS_KEY;

    if (
      !web3formsAccessKey ||
      web3formsAccessKey.trim() === '' ||
      web3formsAccessKey.includes('your_access_key') ||
      web3formsAccessKey.includes('<key')
    ) {
      console.error('[Contact API] WEB3FORMS_ACCESS_KEY is not configured in .env.local');
      return NextResponse.json(
        {
          error:
            'Contact service is currently not configured. Please add your WEB3FORMS_ACCESS_KEY in .env.local or email directly.',
        },
        { status: 503 }
      );
    }

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: web3formsAccessKey,
        name,
        email,
        replyto: email,
        message,
        from_name: `${name} via Portfolio`,
        subject: `New Portfolio Inquiry from ${name}`,
      }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok || !data?.success) {
      const errorMessage = data?.message || `Web3Forms responded with HTTP ${response.status}`;
      console.error('[Contact Submission Delivery Error]:', errorMessage);
      return NextResponse.json(
        { error: `Message delivery failed: ${errorMessage}. Please try again or reach out directly.` },
        { status: response.status >= 400 ? response.status : 502 }
      );
    }

    console.log(`[Contact Submission Success] Recipient: ${recipientEmail} | From: ${name} (${email})`);

    return NextResponse.json({
      success: true,
      recipient: recipientEmail,
      message: 'Your message has been dispatched successfully!',
    });
  } catch (err: unknown) {
    console.error('Contact form submission error:', err);
    return NextResponse.json(
      { error: 'An unexpected server error occurred while sending your message. Please try again.' },
      { status: 500 }
    );
  }
}
