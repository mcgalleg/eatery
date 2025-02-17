import type { APIRoute } from 'astro';
import sgMail from '@sendgrid/mail';
import { format } from "date-fns";

// Initialize SendGrid with API key
const SENDGRID_API_KEY = import.meta.env.SENDGRID_API_KEY;

if (!SENDGRID_API_KEY) {
  throw new Error('SENDGRID_API_KEY environment variable is not set');
}

sgMail.setApiKey(SENDGRID_API_KEY);

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      eventDate,
      guestCount,
      eventType,
      package: packageSelection,
      eventLocation,
      message
    } = data;

    const formattedEventDate = eventDate ? format(new Date(eventDate), "MM/dd/yyyy") : "Not specified";

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return new Response(
        JSON.stringify({
          message: 'First name, last name, and email are required fields'
        }),
        { status: 400 }
      );
    }

    // Format the email content with HTML
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            .email-container {
              max-width: 600px;
              margin: 0 auto;
              font-family: Arial, sans-serif;
              color: #333333;
            }
            .header {
              background-color: #FF6B35;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .content {
              background-color: #ffffff;
              padding: 20px;
              border: 1px solid #dddddd;
              border-radius: 0 0 8px 8px;
            }
            .section {
              margin-bottom: 20px;
            }
            .section-title {
              font-weight: bold;
              color: #FF6B35;
              margin-bottom: 10px;
              font-size: 16px;
              border-bottom: 2px solid #FF6B35;
              padding-bottom: 5px;
            }
            .field {
              margin-bottom: 10px;
            }
            .label {
              font-weight: bold;
              color: #666666;
            }
            .value {
              color: #333333;
            }
            .message-box {
              background-color: #f9f9f9;
              padding: 15px;
              border-radius: 4px;
              margin-top: 10px;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h1 style="margin: 0;">New Catering Request</h1>
            </div>
            
            <div class="content">
              <div class="section">
                <div class="section-title">Contact Information</div>
                <div class="field">
                  <span class="label">Name:</span>
                  <span class="value">${firstName} ${lastName}</span>
                </div>
                <div class="field">
                  <span class="label">Email:</span>
                  <span class="value">${email}</span>
                </div>
                <div class="field">
                  <span class="label">Phone:</span>
                  <span class="value">${phone || 'Not specified'}</span>
                </div>
              </div>

              <div class="section">
                <div class="section-title">Event Details</div>
                <div class="field">
                  <span class="label">Event Type:</span>
                  <span class="value">${eventType}</span>
                </div>
                <div class="field">
                  <span class="label">Package Selected:</span>
                  <span class="value">${packageSelection}</span>
                </div>
                <div class="field">
                  <span class="label">Event Date:</span>
                  <span class="value">${formattedEventDate}</span>
                </div>
                <div class="field">
                  <span class="label">Guest Count:</span>
                  <span class="value">${guestCount || 'Not specified'}</span>
                </div>
                <div class="field">
                  <span class="label">Event Location:</span>
                  <span class="value">${eventLocation || 'Not specified'}</span>
                </div>
              </div>

              ${message ? `
                <div class="section">
                  <div class="section-title">Additional Details</div>
                  <div class="message-box">
                    ${message.replace(/\n/g, '<br>')}
                  </div>
                </div>
              ` : ''}
            </div>
          </div>
        </body>
      </html>
    `;

    // Keep a plain text version for email clients that don't support HTML
    const plainTextContent = `
      New Catering Quote Request

      Contact Information:
      Name: ${firstName} ${lastName}
      Email: ${email}
      Phone: ${phone || 'Not specified'}

      Event Details:
      Event Type: ${eventType}
      Package Selected: ${packageSelection}
      Event Date: ${formattedEventDate}
      Guest Count: ${guestCount || 'Not specified'}
      Event Location: ${eventLocation || 'Not specified'}

      Additional Details:
      ${message || 'None provided'}
    `;

    // Send email using SendGrid with HTML content
    await sgMail.send({
      to: 'catering@rositas.biz',
      from: 'Rositas Catering <catering@rositas.biz>',
      subject: `New Catering Request: ${firstName} ${lastName} - ${eventType}`,
      text: plainTextContent,
      html: htmlContent,
      replyTo: email
    });

    return new Response(
      JSON.stringify({
        message: 'Email sent successfully',
        success: true
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({
        message: 'Failed to send email',
        success: false
      }),
      { status: 500 }
    );
  }
} 