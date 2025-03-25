import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateOtpDto } from './dto/create-otp.dto';
import { AuthQuery } from './auth.query';
import { SqlService } from '../../dbConfig/sql.service';
import { USER_ERROR_LOGS } from '../../common/constants/app.message';
import { OtpGenrator } from '../../common/Functions/app.functions';
import { VerifyOtp } from './dto/verify-otp.dto';
import * as moment from 'moment';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
  private transporter;
  constructor(
    private readonly authQuery: AuthQuery,
    private readonly sqlService: SqlService,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });
  }

  async createOtp(createOtpDto: CreateOtpDto) {
    try {
      let { email } = createOtpDto;
      let res = await this.sqlService.run(
        this.authQuery.findUserByEmail(email),
      );

      if (!res || res.length === 0) {
        return {
          statusCode: 400,
          message: USER_ERROR_LOGS.USER_NOT_FOUND,
        };
      }

      let user = res[0];
      let otp = OtpGenrator(4);

      let obj = {
        email: email,
        value: otp,
        userId: user.userId,
        expiration: moment().add(5, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
      };

      let keys = Object.keys(obj);
      let values = Object.values(obj);
      let val = values.map((item) => "'" + item + "'");

      // Store OTP in the database
      await this.sqlService.run(this.authQuery.createOtp(keys, val));

      // Send OTP via email
      const emailSent = await this.sendMail(
        email,
        'Your OTP Code',
        `Your OTP code is: ${otp}. It is valid for 5 minutes.`,
      );

      if (!emailSent.success) {
        return {
          statusCode: 400,
          message: USER_ERROR_LOGS.FAILED_TO_SEND_OTP_EMAIL,
        };
      }

      return {
        statusCode: 200,
        message: USER_ERROR_LOGS.OTP_SENT_SUCCESSFULLY,
      };
    } catch (error) {
      console.log('🚀 ~ AuthService ~ createOtp ~ error:', error);
      throw new InternalServerErrorException(error?.message);
    }
  }

  async verifyOtp(verifyOtpDto: VerifyOtp) {
    try {
      let { otp, email } = verifyOtpDto;

      let res = await this.sqlService.run(
        this.authQuery.findUserByEmail(email),
      );
      if (!res || res.length === 0) {
        return {
          statusCode: 400,
          message: USER_ERROR_LOGS.USER_NOT_FOUND,
        };
      }
      let user = res[0];

      let OtpCount = await this.sqlService.run(
        this.authQuery.findOtpByUserId(user.userId),
      );
      let count = OtpCount[0].count;

      let expirationTime = moment(OtpCount[0].expiration).local();
      let currentDate = moment().local();

      if (currentDate.isAfter(expirationTime)) {
        return {
          statusCode: 400,
          message: USER_ERROR_LOGS.OTP_EXPIRED,
        };
      } else if (count >= 3) {
        return {
          statusCode: 400,
          message: USER_ERROR_LOGS.OTP_LIMIT_EXCEEDED,
        };
      } else {
        let resOtp = await this.sqlService.run(
          this.authQuery.verifyOtp(otp, user.userId),
        );

        if (!resOtp || resOtp.length === 0) {
          let updateCount = await this.sqlService.run(
            this.authQuery.updateCount(user.userId),
          );
          return {
            statusCode: 400,
            message: USER_ERROR_LOGS.INVALID_OTP,
          };
        } else {
          return {
            statusCode: 200,
            message: USER_ERROR_LOGS.OTP_VERIFY_SUCCESSFULLY,
          };
        }
      }
    } catch (error) {
      throw new InternalServerErrorException(error?.message);
    }
  }

  async sendMail(to: string, subject: string, text: string) {
    try {
      const mailOptions = {
        from: process.env.GMAIL_USER,
        to,
        subject,
        text,
      };

      const info = await this.transporter.sendMail(mailOptions);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

 
}
