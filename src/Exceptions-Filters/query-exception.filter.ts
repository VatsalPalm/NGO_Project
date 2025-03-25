import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { SqlService } from '../dbConfig/sql.service';
import { UserQueries } from '../module/user/user.query';

@Catch(QueryFailedError)
@Injectable()
export class QueryExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly sqlService: SqlService,
    private readonly userQueries: UserQueries,
  ) {}

  private async logException(request: Request, exception: QueryFailedError) {
    try {
      let reqBody = JSON.stringify(request.body);
      // reqBody = reqBody.replace(/'/g, "\\'");
      let msg = JSON.stringify(exception.message);
      msg = msg.replace(/'/g, "\\'");
      let exce = JSON.stringify(exception);
      exce = exce.replace(/'/g, "\\'");
      let requUrl = request.url;

      await this.sqlService.run(
        this.userQueries.ErrorLog(requUrl, reqBody, msg),
      );
    } catch (error) {
      console.error('Failed to log exception:', error);
    }
  }

  async catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    await this.logException(request, exception);

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Database query failed',
      error: exception.message,
    });
  }
}
