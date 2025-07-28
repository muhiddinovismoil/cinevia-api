import { ApiProperty } from '@nestjs/swagger';

export class SignUpUserResponseDto {
  @ApiProperty()
  keyHash: string;
}
