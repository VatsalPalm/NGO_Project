import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmAsyncOptions } from './dbConfig/TypeOrmConfig';
import { ConfigModule } from '@nestjs/config';
import { SqlService } from './dbConfig/sql.service';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { EventsModule } from './module/events/events.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from './Middleware/auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(TypeOrmAsyncOptions),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    EventsModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'abiiasbdibbbcaicbugnsadbaihv',
      signOptions: { expiresIn: '600s' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, SqlService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        {
          path: 'auth/loginUser',
          method: RequestMethod.POST,
        },
        {
          path: 'auth/registerUser',
          method: RequestMethod.POST,
        },
        {
          path: 'auth/verifyOtp',
          method: RequestMethod.POST,
        },
        {
          path: 'auth/createOtp',
          method: RequestMethod.POST,
        },
      )
      .forRoutes('*');
  }
}
