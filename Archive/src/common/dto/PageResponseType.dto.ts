import { ApiProperty } from '@nestjs/swagger';

export class PageResponseType {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;
}
