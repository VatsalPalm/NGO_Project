import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyOtp {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email',
    example: 'test123@yopmail.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'OTP',
    example: '1234',
  })
  otp: string;
}
