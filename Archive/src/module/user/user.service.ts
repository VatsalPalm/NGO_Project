import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserQueries } from './user.query';
import { SqlService } from '../../dbConfig/sql.service';
import * as _ from 'lodash';
import { LoginDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { refreshTokenGenrator } from '../../common/Functions/app.functions';
import { USER_ERROR_LOGS } from '../../common/constants/app.message';
import { QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly userQueries: UserQueries,
    private readonly sqlService: SqlService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(createUserDto: any, image: any) {
    const queryRunner: QueryRunner = await this.sqlService.startTransaction();
    try {
      const insertMessage = [
        'fullName',
        'screenName',
        'email',
        'dob',
        'userRole',
        'latitude',
        'longitude',
        'introduction',
        'pageNo',
      ];
      const Keys = _.pick(createUserDto, insertMessage);
      const keys = Object.keys(Keys);
      const values = Object.values(Keys);
      keys.push('imageUrl');
      values.push(image?.originalname);
      createUserDto.subCategory = createUserDto.subCategory
        ? JSON.parse(createUserDto.subCategory)
        : null;
      createUserDto.device = createUserDto.device
        ? JSON.parse(createUserDto.device)
        : null;
      const userUpdatedValues = values.map((value) => "'" + value + "'");
      let hasPassword = bcrypt.hashSync(createUserDto.password, 10);
      // User Insert
      let resUser = await this.sqlService.runWithTransaction(
        queryRunner,
        this.userQueries.createUser(keys, userUpdatedValues),
      );
      let InsertedUserId = resUser?.insertId;
      let accessToken = this.jwtService.sign({
        payload: createUserDto,
        userId: InsertedUserId,
      });
      let refreshToken = refreshTokenGenrator(6);
      // Password Insert
      let passWordObj = {
        userId: InsertedUserId,
        identifier: createUserDto.email,
        value: hasPassword,
      };
      const pwdKeys = Object.keys(passWordObj);
      const pwdValues = Object.values(passWordObj);
      const PwdUpdatedValues = pwdValues.map((value) => "'" + value + "'");
      await this.sqlService.runWithTransaction(
        queryRunner,
        this.userQueries.passwordInsert(pwdKeys, PwdUpdatedValues),
      );
      //Sub Categoryy Insert
      let SubCategoryObj = {
        userId: InsertedUserId,
        subCategoryId: createUserDto?.subCategory?.subCategoryId,
      };
      const SubCategoryKeys = Object.keys(SubCategoryObj);
      const SubCategoryValues = Object.values(SubCategoryObj);
      const SubCategoryUpdatedValues = SubCategoryValues.map(
        (value) => "'" + value + "'",
      );
      await this.sqlService.runWithTransaction(
        queryRunner,
        this.userQueries.subCategoryInsert(
          SubCategoryKeys,
          SubCategoryUpdatedValues,
        ),
      );
      // User Session Data Insert
      let UserSessionObj = {
        userId: InsertedUserId,
        accessToken: accessToken,
        refreshToken: refreshToken,
        deviceType: createUserDto?.device?.deviceType,
        os: createUserDto.device?.os,
        deviceName: createUserDto?.device?.deviceName,
      };
      let keysSession = Object.keys(UserSessionObj);
      const valuesSession = Object.values(UserSessionObj);
      const ValuesUpdatedSession = valuesSession.map(
        (value) => "'" + value + "'",
      );
      let UserSessionRes = await this.sqlService.runWithTransaction(
        queryRunner,
        this.userQueries.userSession(keysSession, ValuesUpdatedSession),
      );
      await this.sqlService.commitTransaction(queryRunner);
      if (!UserSessionRes || UserSessionRes.length == 0) {
        return {
          status: 200,
          message: USER_ERROR_LOGS.USER_NOT_REGISTERED,
          data: {
            accessToken: accessToken,
            refreshToken: refreshToken,
          },
        };
      } else {
        return {
          status: 200,
          message: USER_ERROR_LOGS.USER_REGISTER_SUCCESSFULLY,
          data: {
            accessToken: accessToken,
            refreshToken: refreshToken,
          },
        };
      }
    } catch (error) {
      // console.log('🚀 ~ UserService ~ registerUser ~ error:', error);
      await this.sqlService.rollBackTransaction(queryRunner);
      throw new InternalServerErrorException(error?.message);
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const data = { ...loginDto };
      const res = await this.sqlService.run(
        this.userQueries.findUserByEmail(data.email),
      );

      if (!res || res.length === 0) {
        return {
          status: 400,
          message: USER_ERROR_LOGS.USER_NOT_FOUND,
        };
      } else if (res[0].deletedStatus === 1) {
        return {
          status: 400,
          message: USER_ERROR_LOGS.USER_DELETED,
        };
      }
      const user = res[0];

      let ComparePassword = bcrypt.compareSync(data.password, user.password);

      if (!ComparePassword) {
        return {
          status: 400,
          message: USER_ERROR_LOGS.USER_PASSWORD_WORNG,
        };
      }

      const accessToken = this.jwtService.sign(user);
      const refreshToken = refreshTokenGenrator(6);

      let userSessionData = {
        accessToken: accessToken,
        refreshToken: refreshToken,
        userId: user?.userId,
        deviceType: data?.device?.deviceType,
        os: data?.device?.os,
        deviceName: data?.device?.deviceName,
      };

      const keysUserSession = Object.keys(userSessionData);

      const valuesUserSession = Object.values(userSessionData);
      const value = valuesUserSession.map((value) => "'" + value + "'");

      const result = await this.sqlService.run(
        this.userQueries.userSession(keysUserSession, value),
      );
      return {
        status: 200,
        message: USER_ERROR_LOGS.USER_LOGIN_SUCCESSFULLY,
        data: {
          user: user,
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      };
    } catch (error) {
      throw new InternalServerErrorException(error?.message);
    }
  }

  async removeAccount(userId: number) {
    try {
      let res = await this.sqlService.run(
        this.userQueries.removeAccount(userId),
      );
      return {
        statusCode: 200,
        message: USER_ERROR_LOGS.ACCOUNT_DELETED_SUCCESSFULLY,
      };
    } catch (error) {
      throw new InternalServerErrorException(error?.message);
    }
  }
}
