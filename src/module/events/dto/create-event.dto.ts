import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  eventGender,
  eventType,
  meetingType,
} from 'src/common/constants/app.enum';

export class CreateEventDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Event Category Id',
    example: '1',
  })
  categoryId: number;
  @IsEnum(eventGender)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Event Gender',
    example: 'Male',
  })
  gender: eventGender;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Event Start Date',
    example: '2023-05-23',
  })
  eventStartDate: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Event End Date',
    example: '2023-05-24',
  })
  eventEndDate: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Event Start Time',
    example: '2023-03-23 10:00:00',
  })
  eventStartTime: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Event End Time',
    example: '2023-03-23 11:30:00',
  })
  eventEndTime: string;
  @IsNotEmpty()
  @IsEnum(meetingType)
  @ApiProperty({
    description: 'Event Meeting Type',
    example: 'Online',
  })
  meetingType: meetingType;
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Event Participants Count',
    example: '10',
  })
  participantsCount: number;
  @IsNotEmpty()
  @IsEnum(eventType)
  @ApiProperty({
    description: 'Event Type',
    example: 'Public',
  })
  eventType: eventType;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Event Name',
    example: 'Event Name',
  })
  eventName: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Event Description',
    example: 'Event Description',
  })
  eventDescription: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Event Lat',
    example: '12.7582',
  })
  eventLat: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Event Long',
    example: '77.7088',
  })
  eventLong: string;
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Age Group Id',
    example: '7',
  })
  ageGroupId: number;
}
