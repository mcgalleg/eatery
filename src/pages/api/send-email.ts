import type { APIRoute } from 'astro';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key
sgMail.setApiKey(import.meta.env.SENDGRID_API_KEY);

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const {
      name,
      email,
      phone,
      eventDate,
      guestCount,
      eventType,
      venue,
      message
    } = data;

    // Validate required fields
    if (!name || !email || !phone) {
      return new Response(
        JSON.stringify({
          message: 'Name, email, and phone are required fields'
        }),
        { status: 400 }
      );
    }

    // Format the email content
    const emailContent = `
      New Catering Quote Request
      
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Event Date: ${eventDate || 'Not specified'}
      Guest Count: ${guestCount || 'Not specified'}
      Event Type: ${eventType}
      Venue: ${venue || 'Not specified'}
      
      Additional Details:
      ${message || 'None provided'}
    `;

    // Send email using SendGrid
    await sgMail.send({
      to: 'catering@rositas.biz', // Your business email
      from: 'catering@rositas.biz', // Your verified sender
      subject: 'New Catering Quote Request',
      text: emailContent,
      replyTo: email
    });

    return new Response(
      JSON.stringify({
        message: 'Email sent successfully'
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({
        message: 'Failed to send email'
      }),
      { status: 500 }
    );
  }
} 