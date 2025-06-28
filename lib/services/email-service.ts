export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

interface EmailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  fromName?: string;
}

// Color palette for Fishers of Men branding
const BRAND_COLORS = {
  primary: "#2563eb", // Blue
  secondary: "#3b82f6", // Light blue
  accent: "#059669", // Green
  light: "#f9fafb", // Light background
  dark: "#1f2937", // Dark text
  muted: "#6b7280", // Muted text
};

export class EmailService {
  /**
   * Creates a standard email template with consistent Fishers of Men styling
   */
  private createEmailTemplate(content: string): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; border: 1px solid #e1e1e1; border-radius: 8px; background-color: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, ${
          BRAND_COLORS.primary
        } 0%, ${
      BRAND_COLORS.secondary
    } 100%); padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px; letter-spacing: 1px; text-shadow: 1px 1px 2px rgba(0,0,0,0.2);">
            🐟 Fishers of Men
          </h1>
          <p style="color: ${
            BRAND_COLORS.light
          }; margin: 5px 0 0; font-size: 16px;">
            Digital Ministry Platform
          </p>
        </div>
        
        <!-- Content Area -->
        <div style="padding: 30px; background-color: ${BRAND_COLORS.light};">
          ${content}
        </div>
        
        <!-- Footer -->
        <div style="padding: 20px; text-align: center; background-color: ${
          BRAND_COLORS.primary
        }; border-radius: 0 0 8px 8px;">
          <p style="color: white; font-size: 12px; margin: 0;">
            © ${new Date().getFullYear()} Fishers of Men. All rights reserved.
          </p>
          <p style="color: rgba(255,255,255,0.7); font-size: 11px; margin: 5px 0 0;">
            <a href="https://www.fomjesus.org" style="color: white; text-decoration: none;">www.fomjesus.org</a>
          </p>
        </div>
      </div>
    `;
  }

  /**
   * Send an email using SMTP2GO API
   */
  async sendEmail({
    to,
    subject,
    html,
    text,
    fromName = "Fishers of Men",
  }: EmailOptions): Promise<boolean> {
    try {
      console.log(`Sending email to ${Array.isArray(to) ? to.join(", ") : to}`);
      console.log(
        `SMTP2GO API Key configured: ${!!process.env.SMTP2GO_API_KEY}`
      );

      if (!process.env.SMTP2GO_API_KEY) {
        console.error("SMTP2GO_API_KEY is not configured");
        return false;
      }
      const senderEmail =
        process.env.SMTP_FROM_EMAIL || "noreply@ekddigital.com";

      const response = await fetch("https://api.smtp2go.com/v3/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: process.env.SMTP2GO_API_KEY,
          sender: senderEmail,
          from_name: fromName,
          to: Array.isArray(to) ? to : [to],
          subject,
          html_body: html,
          text_body: text || html?.replace(/<[^>]*>?/gm, ""),
          custom_headers: [
            {
              header: "X-Mailer",
              value: "Fishers of Men Mailer",
            },
          ],
        }),
      });

      console.log(`SMTP2GO API response status: ${response.status}`);

      const data = await response.json();
      console.log("SMTP2GO API response data:", data);

      if (!response.ok) {
        console.error("SMTP2GO error:", data);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Email sending error:", error);
      return false;
    }
  }

  /**
   * Simple wrapper for backward compatibility
   */
  async sendSimpleEmail(
    to: string,
    subject: string,
    html: string,
    text?: string
  ): Promise<boolean> {
    return this.sendEmail({
      to,
      subject,
      html,
      text,
    });
  }

  // Email verification template
  generateVerificationEmail(
    verificationUrl: string,
    firstName: string
  ): EmailTemplate {
    const subject = "Verify Your Fishers of Men Account";

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Account</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .logo { color: #2563eb; font-size: 24px; font-weight: bold; }
          .content { background: #f9fafb; padding: 30px; border-radius: 8px; }
          .button { 
            display: inline-block; 
            background: #2563eb; 
            color: white; 
            padding: 12px 24px; 
            text-decoration: none; 
            border-radius: 6px; 
            margin: 20px 0;
          }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🐟 Fishers of Men</div>
          </div>
          
          <div class="content">
            <h2>Welcome to Fishers of Men, ${firstName}!</h2>
            
            <p>Thank you for creating your account with us. To complete your registration and access all features, please verify your email address by clicking the button below:</p>
            
            <div style="text-align: center;">
              <a href="${verificationUrl}" class="button">Verify My Email</a>
            </div>
            
            <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
            
            <p><strong>This verification link will expire in 24 hours.</strong></p>
            
            <p>If you didn't create an account with us, please ignore this email.</p>
            
            <p>God bless,<br>The Fishers of Men Team</p>
          </div>
          
          <div class="footer">
            <p>© ${new Date().getFullYear()} Fishers of Men. All rights reserved.</p>
            <p>This is an automated message, please do not reply.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
      Welcome to Fishers of Men, ${firstName}!
      
      Thank you for creating your account with us. To complete your registration and access all features, please verify your email address by visiting:
      
      ${verificationUrl}
      
      This verification link will expire in 24 hours.
      
      If you didn't create an account with us, please ignore this email.
      
      God bless,
      The Fishers of Men Team
    `;

    return { subject, html, text };
  }

  // Password reset template
  generatePasswordResetEmail(
    resetUrl: string,
    firstName: string
  ): EmailTemplate {
    const subject = "Reset Your Fishers of Men Password";

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .logo { color: #2563eb; font-size: 24px; font-weight: bold; }
          .content { background: #f9fafb; padding: 30px; border-radius: 8px; }
          .button { 
            display: inline-block; 
            background: #dc2626; 
            color: white; 
            padding: 12px 24px; 
            text-decoration: none; 
            border-radius: 6px; 
            margin: 20px 0;
          }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🐟 Fishers of Men</div>
          </div>
          
          <div class="content">
            <h2>Password Reset Request</h2>
            
            <p>Hello ${firstName},</p>
            
            <p>We received a request to reset your password for your Fishers of Men account. If you made this request, click the button below to reset your password:</p>
            
            <div style="text-align: center;">
              <a href="${resetUrl}" class="button">Reset My Password</a>
            </div>
            
            <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #666;">${resetUrl}</p>
            
            <p><strong>This reset link will expire in 1 hour.</strong></p>
            
            <p>If you didn't request a password reset, please ignore this email. Your password will not be changed.</p>
            
            <p>God bless,<br>The Fishers of Men Team</p>
          </div>
          
          <div class="footer">
            <p>© ${new Date().getFullYear()} Fishers of Men. All rights reserved.</p>
            <p>This is an automated message, please do not reply.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
      Password Reset Request
      
      Hello ${firstName},
      
      We received a request to reset your password for your Fishers of Men account. If you made this request, visit this link to reset your password:
      
      ${resetUrl}
      
      This reset link will expire in 1 hour.
      
      If you didn't request a password reset, please ignore this email. Your password will not be changed.
      
      God bless,
      The Fishers of Men Team
    `;

    return { subject, html, text };
  }

  // Welcome email after successful verification
  generateWelcomeEmail(firstName: string, loginUrl: string): EmailTemplate {
    const subject = "Welcome to Fishers of Men - Your Account is Ready!";

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Fishers of Men</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .logo { color: #2563eb; font-size: 24px; font-weight: bold; }
          .content { background: #f9fafb; padding: 30px; border-radius: 8px; }
          .button { 
            display: inline-block; 
            background: #059669; 
            color: white; 
            padding: 12px 24px; 
            text-decoration: none; 
            border-radius: 6px; 
            margin: 20px 0;
          }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          .feature { margin: 15px 0; padding: 15px; background: white; border-radius: 6px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🐟 Fishers of Men</div>
          </div>
          
          <div class="content">
            <h2>Welcome to our community, ${firstName}!</h2>
            
            <p>Your email has been successfully verified and your account is now active. We're excited to have you join our digital ministry platform!</p>
            
            <div style="text-align: center;">
              <a href="${loginUrl}" class="button">Access Your Account</a>
            </div>
            
            <h3>What you can do now:</h3>
            
            <div class="feature">
              <strong>📖 Access Ministry Resources</strong><br>
              Browse sermons, devotionals, and Bible studies
            </div>
            
            <div class="feature">
              <strong>🎓 Earn Certificates</strong><br>
              Complete courses and receive verified ministry certificates
            </div>
            
            <div class="feature">
              <strong>🤝 Connect with Community</strong><br>
              Join groups, participate in discussions, and grow together
            </div>
            
            <div class="feature">
              <strong>🙏 Prayer Requests</strong><br>
              Share and pray for each other's needs
            </div>
            
            <p>If you have any questions or need help getting started, don't hesitate to reach out to our support team.</p>
            
            <p>Blessings and welcome to the family!<br>The Fishers of Men Team</p>
          </div>
          
          <div class="footer">
            <p>© ${new Date().getFullYear()} Fishers of Men. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
      Welcome to our community, ${firstName}!
      
      Your email has been successfully verified and your account is now active. We're excited to have you join our digital ministry platform!
      
      Access your account: ${loginUrl}
      
      What you can do now:
      - Access Ministry Resources: Browse sermons, devotionals, and Bible studies
      - Earn Certificates: Complete courses and receive verified ministry certificates
      - Connect with Community: Join groups, participate in discussions, and grow together
      - Prayer Requests: Share and pray for each other's needs
      
      If you have any questions or need help getting started, don't hesitate to reach out to our support team.
      
      Blessings and welcome to the family!
      The Fishers of Men Team
    `;

    return { subject, html, text };
  }
}

export const emailService = new EmailService();
