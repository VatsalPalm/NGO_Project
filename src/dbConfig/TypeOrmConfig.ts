import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export default class TypeOrmConfig {
  static getOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'localhost',
      port: process.env.DATABASE_PORT
        ? parseInt(process.env.DATABASE_PORT)
        : 8889,
      username: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || 'root',
      database: process.env.DATABASE_NAME || 'NGO',
      synchronize: false,
      logging: false,
      autoLoadEntities: false,
      multipleStatements: true,
      bigNumberStrings: false,
    };
  }
}

export const TypeOrmAsyncOptions: TypeOrmModuleAsyncOptions = {
  imports: [],
  inject: [],
  useFactory: (): TypeOrmModuleOptions => {
    return TypeOrmConfig.getOrmConfig();
  },
};
