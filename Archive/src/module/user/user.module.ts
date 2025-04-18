import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SqlService } from '../..//dbConfig/sql.service';
import { UserQueries } from './user.query';
import { AuthMiddleware } from '../../Middleware/auth.middleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UserController],
  providers: [UserService, SqlService, UserQueries],
})
export class UserModule {}
