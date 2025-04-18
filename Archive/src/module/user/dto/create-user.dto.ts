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

class SubCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '1' })
  subCategoryId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Say No to Drugs' })
  subCategoryName: string;
}

class DeviceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'device Type',
    example: 'ios',
  })
  deviceType: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'ios' })
  os: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'iPhone 14' })
  deviceName: string;
}

export class CreateUserDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  files: Express.Multer.File[];

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

  @IsObject()
  @IsNotEmpty()
  @ApiProperty({ type: SubCategoryDto })
  subCategory: SubCategoryDto;

  @IsObject()
  @IsNotEmpty()
  @ApiProperty({ type: DeviceDto })
  device: DeviceDto;
}

// export class CreateUserDto {
//   @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
//   files: Express.Multer.File[];

//   @IsString()
//   @ApiProperty({ example: 'John Doe' })
//   fullName: string;

//   @IsString()
//   @ApiProperty({ example: 'johndoe' })
//   screenName: string;

//   @IsString()
//   @ApiProperty({ example: 'johndoe@example.com' })
//   email: string;

//   @IsString()
//   @ApiProperty({ example: '2000-01-01' })
//   dob: string;

//   @IsString()
//   @ApiProperty({ example: 'user' })
//   userRole: string;

//   @IsString()
//   @ApiProperty({ example: '12.9716' })
//   latitude: string;

//   @IsString()
//   @ApiProperty({ example: '77.5946' })
//   longitude: string;

//   @IsString()
//   @ApiProperty({ example: 'This is my introduction' })
//   introduction: string;

//   @IsString()
//   @ApiProperty({ example: 'test@123' })
//   password: string;

//   @ApiProperty({ example: 1 })
//   pageNo: number;

//   @IsObject()
//   @ApiProperty({ type: SubCategoryDto })
//   subCategory: SubCategoryDto;

//   @IsObject()
//   @ApiProperty({ type: DeviceDto })
//   device: DeviceDto;

// @IsNotEmpty()
//   // @ValidateNested()
//   // @Type(() => SubCategory)
//   @ApiProperty({
//     description: 'Category',
//     example: {
//       subCategoryId: 1,
//       subCategoryName: 'say no to drugs',
//     },
//   })
//   subCategory: object;

//   @IsNotEmpty()
//   // @ValidateNested()
//   // @Type(() => device)
//   @ApiProperty({
//     description: 'Device details',
//     // type: () => device,
//     example: {
//       deviceType: 'ios',
//       os: 'ios',
//       deviceName: 'iPhone 14',
//     },
//   })
//   device: object;

// }
