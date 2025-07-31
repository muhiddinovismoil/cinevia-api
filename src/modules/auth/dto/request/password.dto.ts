import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty()
  @IsNotEmpty()
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
