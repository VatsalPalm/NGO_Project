import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  isString,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { userRole } from '../../../common/constants/app.enum';

class SubCategory {
  @ApiProperty({
    description: 'Sub Category ID',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  subCategoryId: number;

  @ApiProperty({
    description: 'Sub Category Name',
    example: 'say no to drugs',
  })
  @IsString()
  @IsNotEmpty()
  subCategoryName: string;
}

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

export class CreateUserDto {
  @ApiProperty({
    description: 'Full Name',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Screen Name',
    example: 'John_Doe',
  })
  screenName: string;
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Email',
    example: 'test123@yopmail.com',
  })
  email: string;
  @IsDate()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Date of Birth',
    example: '1990-01-01',
  })
  @Type(() => Date)
  dob: Date;
  // @IsString()
  // @IsNotEmpty()
  // @ApiProperty({
  //   description: 'Image Url',
  //   example: 'https://example.com/image.jpg',
  // })
  // imageUrl: string;
  @IsEnum(userRole)
  @IsNotEmpty()
  @ApiProperty({
    description: 'User Role',
    example: 'user',
  })
  userRole: userRole;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'latitude',
    example: '12.9716',
  })
  latitude: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'longitude',
    example: '77.5946',
  })
  longitude: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'introduction',
    example: 'Hello, I am John Doe.',
  })
  introduction: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'pageNo',
    example: 1,
  })
  pageNo: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'password must be at least 6 characters' })
  @ApiProperty({
    description: 'password',
    example: 'test@123',
  })
  password: string;

  // @IsNotEmpty()
  // @IsString()
  // @ApiProperty({
  //   description: 'File Upload',
  //   example: '',
  // })
  // file: string;

  @IsNotEmpty()
  // @ValidateNested()
  // @Type(() => SubCategory)
  @ApiProperty({
    description: 'Category',
    example: {
      subCategoryId: 1,
      subCategoryName: 'say no to drugs',
    },
  })
  subCategory: SubCategory;

  @IsNotEmpty()
  // @ValidateNested()
  // @Type(() => device)
  @ApiProperty({
    description: 'Device details',
    // type: () => device,
    example: {
      deviceType: 'ios',
      os: 'ios',
      deviceName: 'iPhone 14',
    },
  })
  device: device;
}
