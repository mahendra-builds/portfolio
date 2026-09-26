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
    const recipientEmail = 'ma02@gmail.com';

    // In server environment, we can also forward to external webhook / Web3Forms / Formspree if configured
    // Web3Forms provides zero-config form forwarding directly to recipient email:
    const web3formsAccessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (web3formsAccessKey) {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: web3formsAccessKey,
          name,
          email,
          message,
          to: recipientEmail,
          subject: `New Portfolio Inquiry from ${name}`,
        }),
      });
    }

    console.log(`[Contact Submission] To: ${recipientEmail} | From: ${name} (${email}) | Message: ${message}`);

    return NextResponse.json({
      success: true,
      recipient: recipientEmail,
      message: 'Your message has been dispatched successfully!',
    });
  } catch (err: unknown) {
    console.error('Contact form submission error:', err);
    return NextResponse.json(
      { error: 'Failed to process message submission. Please try again.' },
      { status: 500 }
    );
  }
}
