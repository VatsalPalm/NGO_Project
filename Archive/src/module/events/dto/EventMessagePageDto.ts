import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDto } from '../../../common/dto/pagemeta.dto';
import { PageResponseType } from '../../../common/dto/PageResponseType.dto';

export class MarketingMessagePageDto extends PageResponseType {
  @ApiProperty({
    isArray: true,
  })
  readonly data: [];

  @ApiProperty()
  readonly meta: PageMetaDto;

  constructor(data: [], meta: PageMetaDto) {
    super();
    this.data = data;
    this.meta = meta;
  }
}
