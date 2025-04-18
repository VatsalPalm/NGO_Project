import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';

class device {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'device Type',
    example: 'ios',
  })
  deviceType: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'os',
    example: 'ios',
  })
  os: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'device Name',
    example: 'iPhone 14',
  })
  deviceName: string;
}

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email',
    example: 'test123@yopmail.com',
  })
  email: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'password must be at least 6 characters' })
  @ApiProperty({
    description: 'password',
    example: 'test@123',
  })
  password: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => device)
  @ApiProperty({
    description: 'Device details',
    type: () => device,
  })
  device: device;
}
