import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryExceptionFilter } from '../../Exceptions-Filters/query-exception.filter';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { USER_ERROR_LOGS } from 'src/common/constants/app.message';

@Controller('user')
@UseFilters(QueryExceptionFilter)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({
    status: 200,
    description: USER_ERROR_LOGS.USER_DELETED,
  })
  @ApiResponse({
    status: 400,
    description: USER_ERROR_LOGS.USER_NOT_DELETE,
  })
  @Delete('deleteUser')
  remove(@Req() req: any) {
    return this.userService.removeAccount(req?.users?.userId);
  }
}
