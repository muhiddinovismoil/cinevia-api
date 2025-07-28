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
    await this.mailer.sendMail({
      to,
      subject: '🔐 Your OTP Code',
      template: 'otp',
      context: {
        name,
        otp,
        expiresIn,
        appName: 'MovieApp',
      },
    });
  }
}
