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
    const logoUrl = process.env.NEXT_PUBLIC_APP_URL
      ? `${process.env.NEXT_PUBLIC_APP_URL}/Logo.png`
      : "https://www.fomjesus.org/Logo.png";

    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; border: 1px solid #e1e1e1; border-radius: 8px; background-color: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, ${
          BRAND_COLORS.primary
        } 0%, ${
      BRAND_COLORS.secondary
    } 100%); padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <div style="margin-bottom: 10px;">
            <img src="${logoUrl}" alt="Fishers of Men Logo" style="max-width: 120px; height: auto; filter: brightness(0) invert(1);" />
          </div>
          <h1 style="color: white; margin: 0; font-size: 28px; letter-spacing: 1px; text-shadow: 1px 1px 2px rgba(0,0,0,0.2);">
            Fishers of Men
          </h1>
          <p style="color: ${
            BRAND_COLORS.light
          }; margin: 5px 0 0; font-size: 16px;">
            ...those that are with us are more than those that who are with them - 2 Kings 6:16.
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

    const content = `
      <h2 style="color: ${BRAND_COLORS.primary}; margin: 0 0 20px; font-size: 24px;">Welcome to Fishers of Men, ${firstName}!</h2>
      
      <p style="color: ${BRAND_COLORS.dark}; margin: 0 0 16px; line-height: 1.6;">
        Thank you for creating your account with us. To complete your registration and access all features, please verify your email address by clicking the button below:
      </p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${verificationUrl}" style="
          display: inline-block; 
          background: #1e3a8a; 
          color: white !important; 
          padding: 14px 28px; 
          text-decoration: none; 
          border-radius: 8px; 
          font-weight: 600;
          font-size: 16px;
          text-align: center;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        ">Verify My Email</a>
      </div>
      
      <p style="color: ${BRAND_COLORS.dark}; margin: 20px 0 16px; line-height: 1.6;">
        If the button doesn't work, you can copy and paste this link into your browser:
      </p>
      <p style="word-break: break-all; color: ${BRAND_COLORS.muted}; background: #f3f4f6; padding: 10px; border-radius: 4px; font-family: monospace; font-size: 14px;">
        ${verificationUrl}
      </p>
      
      <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 20px 0; border-radius: 4px;">
        <p style="color: #92400e; margin: 0; font-weight: 600;">
          ⏰ This verification link will expire in 24 hours.
        </p>
      </div>
      
      <p style="color: ${BRAND_COLORS.dark}; margin: 20px 0 16px; line-height: 1.6;">
        If you didn't create an account with us, please ignore this email.
      </p>
      
      <p style="color: ${BRAND_COLORS.dark}; margin: 30px 0 0; line-height: 1.6;">
        God bless,<br>
        <strong>The Fishers of Men Team</strong>
      </p>
    `;

    const html = this.createEmailTemplate(content);

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

    const content = `
      <h2 style="color: #dc2626; margin: 0 0 20px; font-size: 24px;">Password Reset Request</h2>
      
      <p style="color: ${BRAND_COLORS.dark}; margin: 0 0 16px; line-height: 1.6;">
        Hello ${firstName},
      </p>
      
      <p style="color: ${BRAND_COLORS.dark}; margin: 0 0 16px; line-height: 1.6;">
        We received a request to reset your password for your Fishers of Men account. If you made this request, click the button below to reset your password:
      </p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" style="
          display: inline-block; 
          background: #dc2626; 
          color: white !important; 
          padding: 14px 28px; 
          text-decoration: none; 
          border-radius: 8px; 
          font-weight: 600;
          font-size: 16px;
          text-align: center;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        ">Reset My Password</a>
      </div>
      
      <p style="color: ${BRAND_COLORS.dark}; margin: 20px 0 16px; line-height: 1.6;">
        If the button doesn't work, you can copy and paste this link into your browser:
      </p>
      <p style="word-break: break-all; color: ${BRAND_COLORS.muted}; background: #f3f4f6; padding: 10px; border-radius: 4px; font-family: monospace; font-size: 14px;">
        ${resetUrl}
      </p>
      
      <div style="background: #fee2e2; border-left: 4px solid #dc2626; padding: 16px; margin: 20px 0; border-radius: 4px;">
        <p style="color: #991b1b; margin: 0; font-weight: 600;">
          ⏰ This reset link will expire in 1 hour.
        </p>
      </div>
      
      <p style="color: ${BRAND_COLORS.dark}; margin: 20px 0 16px; line-height: 1.6;">
        If you didn't request a password reset, please ignore this email. Your password will not be changed.
      </p>
      
      <p style="color: ${BRAND_COLORS.dark}; margin: 30px 0 0; line-height: 1.6;">
        God bless,<br>
        <strong>The Fishers of Men Team</strong>
      </p>
    `;

    const html = this.createEmailTemplate(content);

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

    const content = `
      <h2 style="color: ${BRAND_COLORS.accent}; margin: 0 0 20px; font-size: 24px;">Welcome to our community, ${firstName}!</h2>
      
      <p style="color: ${BRAND_COLORS.dark}; margin: 0 0 16px; line-height: 1.6;">
        Your email has been successfully verified and your account is now active. We're excited to have you join our digital ministry platform!
      </p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${loginUrl}" style="
          display: inline-block; 
          background: #1e3a8a; 
          color: white !important; 
          padding: 14px 28px; 
          text-decoration: none; 
          border-radius: 8px; 
          font-weight: 600;
          font-size: 16px;
          text-align: center;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        ">Access Your Account</a>
      </div>
      
      <h3 style="color: ${BRAND_COLORS.primary}; margin: 30px 0 20px; font-size: 20px;">What you can do now:</h3>
      
      <div style="margin: 15px 0; padding: 16px; background: white; border-radius: 8px; border-left: 4px solid ${BRAND_COLORS.primary};">
        <strong style="color: ${BRAND_COLORS.primary};">📖 Access Ministry Resources</strong><br>
        <span style="color: ${BRAND_COLORS.dark};">Browse sermons, devotionals, and Bible studies</span>
      </div>
      
      <div style="margin: 15px 0; padding: 16px; background: white; border-radius: 8px; border-left: 4px solid ${BRAND_COLORS.accent};">
        <strong style="color: ${BRAND_COLORS.accent};">🎓 Earn Certificates</strong><br>
        <span style="color: ${BRAND_COLORS.dark};">Complete courses and receive verified ministry certificates</span>
      </div>
      
      <div style="margin: 15px 0; padding: 16px; background: white; border-radius: 8px; border-left: 4px solid ${BRAND_COLORS.secondary};">
        <strong style="color: ${BRAND_COLORS.secondary};">🤝 Connect with Community</strong><br>
        <span style="color: ${BRAND_COLORS.dark};">Join groups, participate in discussions, and grow together</span>
      </div>
      
      <div style="margin: 15px 0; padding: 16px; background: white; border-radius: 8px; border-left: 4px solid #7c3aed;">
        <strong style="color: #7c3aed;">🙏 Prayer Requests</strong><br>
        <span style="color: ${BRAND_COLORS.dark};">Share and pray for each other's needs</span>
      </div>
      
      <p style="color: ${BRAND_COLORS.dark}; margin: 30px 0 16px; line-height: 1.6;">
        If you have any questions or need help getting started, don't hesitate to reach out to our support team.
      </p>
      
      <p style="color: ${BRAND_COLORS.dark}; margin: 30px 0 0; line-height: 1.6;">
        Blessings and welcome to the family!<br>
        <strong>The Fishers of Men Team</strong>
      </p>
    `;

    const html = this.createEmailTemplate(content);

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
