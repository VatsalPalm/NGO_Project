import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  eventGender,
  eventType,
  meetingType,
} from '../../../common/constants/app.enum';
import { PageOptionsDto } from '../../../common/dto/page_options.dto';

export class EventListDto extends PageOptionsDto {}
