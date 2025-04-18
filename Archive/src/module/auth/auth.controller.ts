import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  Query,
  Req,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { LoginDto } from '../user/dto/login-user.dto';
import { ApiBody, ApiConsumes, ApiResponse } from '@nestjs/swagger';
import { USER_ERROR_LOGS } from '../../common/constants/app.message';
import { CreateOtpDto } from './dto/create-otp.dto';
import { VerifyOtp } from './dto/verify-otp.dto';
import { QueryExceptionFilter } from '../../Exceptions-Filters/query-exception.filter';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
@UseFilters(QueryExceptionFilter)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @ApiResponse({
    status: 201,
    description: USER_ERROR_LOGS.USER_REGISTER_SUCCESSFULLY,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Post('/registerUser')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateUserDto,
    // schema: {
    //   properties: {
    //     files: {
    //       type: 'array',
    //       items: {
    //         type: 'string',
    //         format: 'binary',
    //         description: 'The file to upload',
    //       },
    //     },
    //     // fullName: {
    //     //   type: 'string',
    //     //   example: 'John Doe',
    //     // },
    //     // screenName: {
    //     //   type: 'string',
    //     //   example: 'johndoe',
    //     // },
    //     // email: {
    //     //   type: 'string',
    //     //   example: 'johndoe@example.com',
    //     // },
    //     // dob: {
    //     //   type: 'string',
    //     //   example: '2000-01-01',
    //     // },
    //     // userRole: {
    //     //   type: 'string',
    //     //   example: 'user',
    //     // },
    //     // latitude: {
    //     //   type: 'string',
    //     //   example: '12.9716',
    //     // },
    //     // longitude: {
    //     //   type: 'string',
    //     //   example: '77.5946',
    //     // },
    //     // introduction: {
    //     //   type: 'string',
    //     //   example: 'This is my introduction',
    //     // },
    //     // password: {
    //     //   type: 'string',
    //     //   example: 'test@123',
    //     // },
    //     // pageNo: {
    //     //   type: 'number',
    //     //   example: 1,
    //     // },
    //     // subCategory: {
    //     //   type: 'array',
    //     //   properties: {
    //     //     subCategoryId: {
    //     //       type: 'string',
    //     //       example: '1',
    //     //     },
    //     //     subCategoryName: {
    //     //       type: 'string',
    //     //       example: 'Say No to Drugs',
    //     //     },
    //     //   },
    //     // },
    //     // device: {
    //     //   type: 'array',
    //     //   properties: {
    //     //     deviceType: {
    //     //       type: 'string',
    //     //       example: 'ios',
    //     //     },
    //     //     os: {
    //     //       type: 'string',
    //     //       example: 'ios',
    //     //     },
    //     //     deviceName: {
    //     //       type: 'string',
    //     //       example: 'iPhone 14',
    //     //     },
    //     //   },
    //     // },
    //   },
    // },
  })
  @UseInterceptors(FileInterceptor('files')) // Note the 'files' for the multiple files
  async create(@Body() body: any, @UploadedFile() image: Express.Multer.File) {
    if (!image) {
      throw new HttpException(
        'Controller--No file uploaded or missing filename',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.userService.registerUser(body, image);
  }

  @ApiResponse({
    status: 201,
    description: USER_ERROR_LOGS.USER_LOGIN_SUCCESSFULLY,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Post('/loginUser')
  login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @ApiResponse({
    status: 201,
    description: USER_ERROR_LOGS.OTP_SENT_SUCCESSFULLY,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Post('/createOtp')
  createOtp(@Body() createOtpDto: CreateOtpDto) {
    return this.authService.createOtp(createOtpDto);
  }
  // async sendEmail(
  //   @Query('to') to: string,
  //   @Query('subject') subject: string,
  //   @Query('text') text: string,
  // ) {
  //   return this.authService.sendMail(to, subject, text);
  // }

  @ApiResponse({
    status: 201,
    description: USER_ERROR_LOGS.OTP_VERIFY_SUCCESSFULLY,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Post('/verifyOtp')
  VerifyOtp(@Body() verifyOtpDto: VerifyOtp) {
    return this.authService.verifyOtp(verifyOtpDto);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }
}
