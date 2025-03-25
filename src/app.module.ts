import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmAsyncOptions } from './dbConfig/TypeOrmConfig';
import { ConfigModule } from '@nestjs/config';
import { SqlService } from './dbConfig/sql.service';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { EventsModule } from './module/events/events.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(TypeOrmAsyncOptions),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService, SqlService],
})
export class AppModule {}
