import { ApiProperty } from '@nestjs/swagger';

export class GetProfileResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  fullname: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  photo: string;
}
