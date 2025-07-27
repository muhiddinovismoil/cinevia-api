import { Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  async signUpUser() {}

  @Post('signin')
  async signInAsUser() {
    return { message: 'hello' };
  }

  @Post('admin/signin')
  async signInAsAdmin() {}

  @Post('reset-password')
  async resetPassword() {}

  @Post('forget-password')
  async forgetPassword() {}

  @Post('resend-otp')
  async resendOtp() {}

  @ApiBearerAuth()
  @Post('change-password')
  async changePassword() {}

  @Post('verify')
  async verifyUser() {}
}
