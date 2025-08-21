import { ApiProperty } from '@nestjs/swagger';

export class GetStatistics {
  @ApiProperty()
  usersCount: number;

  @ApiProperty()
  newUsersThisMonth: number;

  @ApiProperty()
  totalSeries: number;

  @ApiProperty()
  moviesCount: number;
}
