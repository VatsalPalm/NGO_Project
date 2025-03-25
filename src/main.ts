import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as dotenv from 'dotenv';
import * as path from 'path';
import { Swagger } from '../swagger';
import { QueryExceptionFilter } from './Exceptions-Filters/query-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { SqlService } from './dbConfig/sql.service';
import { UserQueries } from './module/user/user.query';

const env = process.env.NODE_ENV || 'development';
// console.log('🚀 ~ env:', env);
const Swaggerpath = '/api/docs';

const envPath = path.resolve(process.cwd(), `.env.${env.trim()}`);
dotenv.config({ path: envPath });
// console.log('Loading env file from:', envPath);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const sqlService = app.get(SqlService);
  const userQueries = app.get(UserQueries);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new QueryExceptionFilter(sqlService, userQueries));
  Swagger(app, Swaggerpath);
  await app.listen(process.env.PORT ?? 3000, () => {
    console.log('http://localhost:' + (process.env.PORT ?? 3000) + Swaggerpath);
  });
}
bootstrap();
