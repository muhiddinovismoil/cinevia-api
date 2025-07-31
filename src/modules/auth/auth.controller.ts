import { ApiSuccessResponse, CurrentUser, Public } from '@decorators';
import {
  ForbiddenExceptionDto,
  InternalServerErrorExceptionDto,
  UnprocessableEntityExceptionDto,
} from '@dtos';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ICurrentUser } from '@type';

import { AuthService } from './auth.service';
import {
  ChangePasswordDto,
  ForgetPasswordDto,
  ResendOtpDto,
  ResetPasswordDto,
  SignInDto,
  SignUpUserDto,
  VerifyOtpDto,
} from './dto/request';
import { SignInResponseDto, SignUpUserResponseDto } from './dto/response';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiSuccessResponse(SignUpUserResponseDto)
  @ApiForbiddenResponse({
    type: ForbiddenExceptionDto,
    description: 'Forbidden',
  })
  @ApiUnprocessableEntityResponse({
    type: UnprocessableEntityExceptionDto,
    description: 'Unprocessable entity',
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorExceptionDto,
    description: 'Internal server error',
  })
  @Post('signup')
  async signUpUser(@Body() payload: SignUpUserDto) {
    return await this.authService.create(payload);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiSuccessResponse(SignInResponseDto)
  @ApiForbiddenResponse({
    type: ForbiddenExceptionDto,
    description: 'Forbidden',
  })
  @ApiUnprocessableEntityResponse({
    type: UnprocessableEntityExceptionDto,
    description: 'Unprocessable entity',
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorExceptionDto,
    description: 'Internal server error',
  })
  @Post('signin')
  async signInAsUser(@Body() payload: SignInDto) {
    return await this.authService.signin(payload);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiSuccessResponse(SignInResponseDto)
  @ApiForbiddenResponse({
    type: ForbiddenExceptionDto,
    description: 'Forbidden',
  })
  @ApiUnprocessableEntityResponse({
    type: UnprocessableEntityExceptionDto,
    description: 'Unprocessable entity',
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorExceptionDto,
    description: 'Internal server error',
  })
  @Post('admin/signin')
  async signInAsAdmin(@Body() payload: SignInDto) {
    return await this.authService.signinAsAdmin(payload);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Password reset successfully' })
  @ApiForbiddenResponse({
    type: ForbiddenExceptionDto,
    description: 'Forbidden',
  })
  @ApiUnprocessableEntityResponse({
    type: UnprocessableEntityExceptionDto,
    description: 'Unprocessable entity',
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorExceptionDto,
    description: 'Internal server error',
  })
  @Post('reset-password')
  async resetPassword(@Body() payload: ResetPasswordDto) {
    return await this.authService.resetPassword(payload);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiSuccessResponse(SignUpUserResponseDto)
  @ApiForbiddenResponse({
    type: ForbiddenExceptionDto,
    description: 'Forbidden',
  })
  @ApiUnprocessableEntityResponse({
    type: UnprocessableEntityExceptionDto,
    description: 'Unprocessable entity',
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorExceptionDto,
    description: 'Internal server error',
  })
  @Post('forget-password')
  async forgetPassword(@Body() payload: ForgetPasswordDto) {
    return await this.authService.forgetPassword(payload);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiSuccessResponse(SignUpUserResponseDto)
  @ApiForbiddenResponse({
    type: ForbiddenExceptionDto,
    description: 'Forbidden',
  })
  @ApiUnprocessableEntityResponse({
    type: UnprocessableEntityExceptionDto,
    description: 'Unprocessable entity',
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorExceptionDto,
    description: 'Internal server error',
  })
  @Post('resend-otp')
  async resendOtp(@Body() payload: ResendOtpDto) {
    return await this.authService.resendOtp(payload);
  }

  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Password changed successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({
    type: ForbiddenExceptionDto,
    description: 'Forbidden',
  })
  @ApiUnprocessableEntityResponse({
    type: UnprocessableEntityExceptionDto,
    description: 'Unprocessable entity',
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorExceptionDto,
    description: 'Internal server error',
  })
  @Post('change-password')
  async changePassword(
    @Body() payload: ChangePasswordDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    return await this.authService.changePassword(user.id, payload);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiForbiddenResponse({
    type: ForbiddenExceptionDto,
    description: 'Forbidden',
  })
  @ApiUnprocessableEntityResponse({
    type: UnprocessableEntityExceptionDto,
    description: 'Unprocessable entity',
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorExceptionDto,
    description: 'Internal server error',
  })
  @Post('verify')
  async verifyUser(@Body() payload: VerifyOtpDto) {
    return await this.authService.verify(payload);
  }
}
