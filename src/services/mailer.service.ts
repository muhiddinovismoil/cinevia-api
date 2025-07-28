import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppMailService {
  constructor(private readonly mailer: MailerService) {}

  async sendOtp(
    to: string,
    name: string,
    otp: string,
    expiresIn = 5,
  ): Promise<void> {
    const html = `
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>Your OTP Code</title>
        </head>
        <body style="background-color: #0d0d0d; color: #f0f0f0; font-family: 'Segoe UI', sans-serif; padding: 30px;">
          <div style="max-width: 600px; margin: auto; background-color: #1a1a1a; border: 1px solid #333; border-radius: 12px; padding: 40px; box-shadow: 0 0 20px #00ffcce0;">
            <h2 style="text-align: center; color: #00ffcc;">🔐 Your One-Time Password</h2>
            <p style="font-size: 16px;">Hello <strong>${name}</strong>,</p>
            <p style="font-size: 15px;">Use the OTP code below to proceed with your request:</p>
            <div style="font-size: 32px; font-weight: bold; text-align: center; margin: 25px 0; color: #00ffcc;">
              ${otp}
            </div>
            <p style="font-size: 14px; color: #cccccc;">This code will expire in <strong>${expiresIn}</strong> minutes.</p>
            <p style="font-size: 13px; color: #999;">If you did not request this code, please ignore this message.</p>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #444;" />
            <p style="text-align: center; font-size: 12px; color: #666;">&copy; MovieApp – All rights reserved.</p>
          </div>
        </body>
      </html>
    `;

    await this.mailer.sendMail({
      to,
      subject: '🔐 Your OTP Code',
      html,
    });
  }
}
