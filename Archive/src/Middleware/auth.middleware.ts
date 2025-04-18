import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { ACCESS_TOKEN_ERROR_LOGS } from '../common/constants/app.message';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: any, res: any, next: () => void) {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
          throw new UnauthorizedException(
            ACCESS_TOKEN_ERROR_LOGS.ACCESS_TOKEN_NOT_FOUND,
          );
        }

        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
          throw new UnauthorizedException(
            ACCESS_TOKEN_ERROR_LOGS.ACCESS_SCECRET_NOT_FOUND,
          );
        }

        // console.log('🚀 ~ AuthMiddleware ~ use ~ secretKey:', {
        //   token,
        //   secretKey,
        // });

        // const payload = jwt.verify(token, secretKey);
        const payload = this.jwtService.verify(token, { secret: secretKey });
        // if (!payload) {
        //   throw new UnauthorizedException(
        //     ACCESS_TOKEN_ERROR_LOGS.ACCESS_TOKEN_NOT_VALID,
        //   );
        // }
        req['users'] = payload;
        next();
      } else {
        throw new UnauthorizedException(
          ACCESS_TOKEN_ERROR_LOGS.ACCESS_AUTHORIZATION_NOT_FOUND,
        );
      }
    } catch (error) {
      // console.error('🚀 ~ AuthMiddleware ~ use ~ error:', error);
      throw new UnauthorizedException(error?.response, error?.message);
    }
  }
}
