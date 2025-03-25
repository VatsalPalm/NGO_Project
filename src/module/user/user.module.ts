import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SqlService } from '../..//dbConfig/sql.service';
import { UserQueries } from './user.query';
import { AuthMiddleware } from '../../Middleware/auth.middleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'abiiasbdibbbcaicbugnsadbaihv',
      signOptions: { expiresIn: '600s' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, SqlService, UserQueries],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('user');
  }
}
