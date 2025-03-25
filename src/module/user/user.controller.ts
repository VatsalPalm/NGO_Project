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
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
@UseFilters(QueryExceptionFilter)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Delete('deleteUser')
  remove(@Req() req: any) {
    return this.userService.removeAccount(req?.users?.userId);
  }
}
