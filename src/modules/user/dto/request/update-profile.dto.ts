import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UpdateProfileDto {
  @ApiPropertyOptional()
  @IsString()
  photo: string;

  @ApiPropertyOptional()
  @IsEmail()
  email: string;

  @ApiPropertyOptional()
  @IsString()
  fullname: string;
}
