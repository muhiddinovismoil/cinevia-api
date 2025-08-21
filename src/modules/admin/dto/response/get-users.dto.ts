import { ApiProperty } from '@nestjs/swagger';

export class GetUsersResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  photo: string | null;

  @ApiProperty()
  email: string;

  @ApiProperty()
  fullname: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  deletedAt: string;

  @ApiProperty()
  updatedAt: string;
}
