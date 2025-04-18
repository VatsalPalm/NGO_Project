import { TableName } from '../../common/constants/app.table_entity';

export class AuthQuery {
  createOtp(keys: any, values: any) {
    const query = `INSERT INTO ${TableName.Table_Otp} (${keys})  VALUES (${values})
   ON DUPLICATE KEY UPDATE
    email = VALUES(email),
    value = VALUES(value),
    userId = VALUES(userId),
    expiration = VALUES(expiration)
    `;
    // console.log('🚀 ~ AuthQuery ~ createOtp ~ query:', query);

    return {
      name: 'CREATE OTP',
      type: 'INSERT',
      query: query,
    };
  }

  findUserByEmail(email: string) {
    const query = `SELECT u.userId,u.fullName,u.screenName,u.email,u.dob,u.imageUrl,u.userRole,u.latitude,u.longitude,u.introduction,u.pageNo
      FROM ${TableName.Table_Users} as u where u.email='${email}'`;
    // console.log('🚀 ~ UserQueries ~ findUserByEmail ~ query:', query);

    return {
      name: 'FIND USER BY EMAIL',
      type: 'SELECT',
      query: query,
    };
  }

  verifyOtp(otp: string, userId: string) {
    const query = `SELECT value,userId FROM ${TableName.Table_Otp} WHERE value='${otp}' AND userId='${userId}'`;

    // console.log('🚀 ~ AuthQuery ~ verifyOtp ~ query:', query);
    return {
      name: 'VERIFY OTP',
      type: 'SELECT',
      query: query,
    };
  }

  updateCount(userId: number) {
    const query = `UPDATE ${TableName.Table_Otp} SET count = count + 1 WHERE userId = ${userId}`;
    return {
      name: 'UPDATE COUNT',
      type: 'UPDATE',
      query: query,
    };
  }

  findOtpByUserId(userId: string) {
    const query = `SELECT count,expiration,email FROM ${TableName.Table_Otp} WHERE userId='${userId}'`;
    return {
      name: 'FIND OTP BY USER ID',
      type: 'SELECT',
      query: query,
    };
  }
}
