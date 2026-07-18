import nodemailer from 'nodemailer';


// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASSWORD || '',
  },
});

// Verify connection
transporter.verify((error) => {
  if (error) {
    console.error('❌ SMTP connection error:', error);
  } else {
    console.log('✅ SMTP server is ready to send emails');
  }
});

/**
 * Send OTP email
 */
export async function sendOTPEmail(email: string, otp: string): Promise<void> {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #0a0a0a;
          color: #ffffff;
          padding: 20px;
        }

        .container {
          max-width: 500px;
          margin: 0 auto;
          background: #1a1a1a;
          border-radius: 12px;
          padding: 40px;
          border: 1px solid #2a2a2a;
        }

        .logo {
          text-align: center;
          margin-bottom: 30px;
        }

        .otp-code {
          font-size: 36px;
          font-weight: bold;
          color: #10b981;
          text-align: center;
          padding: 20px;
          background: #0a0a0a;
          border-radius: 8px;
          letter-spacing: 8px;
          margin: 25px 0;
        }

        .message {
          color: #d1d5db;
          line-height: 1.6;
          text-align: center;
          font-size: 15px;
        }

        .expiry {
          text-align: center;
          color: #9ca3af;
          font-size: 14px;
          margin-top: 20px;
        }

        .footer {
          text-align: center;
          color: #6b7280;
          font-size: 12px;
          margin-top: 30px;
          border-top: 1px solid #2a2a2a;
          padding-top: 20px;
        }

        .highlight {
          color: #10b981;
          font-weight: bold;
        }
      </style>
    </head>

    <body>
      <div class="container">

        <div class="logo">
          <h1 style="color: #10b981; margin: 0;">TRUVA</h1>
          <p style="color: #9ca3af; margin: 5px 0 0;">
            Trust Every Digital Decision
          </p>
        </div>

        <h2 style="text-align: center; font-weight: normal; color: #ffffff;">
          Welcome to Truva 🎉
        </h2>

        <p class="message">
          Thanks for joining us! We're excited to have you here.
          To keep your account safe and complete your registration,
          please verify your email address using the code below.
        </p>

        <div class="otp-code">
          ${otp}
        </div>

        <p class="expiry">
          This verification code will expire in <span class="highlight">5 minutes</span>.
        </p>

        <p class="message">
          Once your email is verified, you'll be ready to explore Truva
          and make smarter, more confident digital decisions.
        </p>

        <div class="footer">
          <p>
            If you didn't create a Truva account, you can safely ignore this email.
          </p>

          <p>
            Need help? Our support team is always happy to assist.
          </p>

          <p>
            &copy; 2026 Truva. All rights reserved.
          </p>
        </div>

      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"Truva" <${process.env.SMTP_USER || 'noreply@truva.com'}>`,
    to: email,
    subject: 'Welcome to Truva — verify your email 🎉',
    html: htmlContent,
  });
}

export default transporter;