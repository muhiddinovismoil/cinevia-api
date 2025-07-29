import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty()
  oldPassword: string;

  @ApiProperty()
  password: string;
}

export class ResetPasswordDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  hashCode: string;
}

export class ForgetPasswordDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  newPassword: string;
}
