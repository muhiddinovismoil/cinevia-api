import { ApiProperty } from '@nestjs/swagger';

export class FileUploadResponse {
  @ApiProperty()
  filename: string;

  @ApiProperty()
  mimetype: string;

  @ApiProperty()
  size: number;

  @ApiProperty()
  path: string;
}
