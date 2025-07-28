import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SignInUserDto, SignUpUserDto, VerifyOtpDto } from './dto/request';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUpUser(@Body() payload: SignUpUserDto) {
    return await this.authService.create(payload);
  }

  @Post('signin')
  async signInAsUser(@Body() payload: SignInUserDto) {
    return await this.authService.signin(payload);
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
  async verifyUser(@Body() payload: VerifyOtpDto) {
    return await this.authService.verify(payload);
  }
}
