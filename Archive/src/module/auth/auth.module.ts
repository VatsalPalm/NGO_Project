import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SqlService } from '../../dbConfig/sql.service';
import { AuthQuery } from './auth.query';
import { UserService } from '../user/user.service';
import { UserQueries } from '../user/user.query';

@Module({
  controllers: [AuthController],
  providers: [AuthService, SqlService, AuthQuery, UserQueries, UserService],
})
export class AuthModule {}
