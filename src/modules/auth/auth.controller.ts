import { Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  @Post('signup')
  async signUpUser() {}

  @Post('signin')
  async signInAsUser() {}

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
