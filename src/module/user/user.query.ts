// import { TableName } from '../../constants/table.constants';

import { TableName } from '../../common/constants/app.table_entity';

export class UserQueries {
  ErrorLog(requUrl: any, responseObject: any, response: any) {
    const query = `INSERT INTO ${TableName.Table_Error_Log} (apiUrl, responseObject, response)  VALUES ('${requUrl}', '${responseObject}', '${response}')`;
    // const query = ``;
    console.log('🚀 ~ UserQueries ~ ErrorLog ~ query:', query);
    return {
      name: 'INSERT ERROR',
      type: 'INSERT',
      query: query,
    };
  }

  createUser(keys: any, values: any) {
    const query = `INSERT INTO ${TableName.Table_Users} (${keys}) VALUES (${values})`;
    return {
      name: 'INSERT USER',
      type: 'INSERT',
      query: query,
    };
  }

  findUserByEmail(email: string) {
    const query = `SELECT u.userId,u.fullName,u.screenName,u.email,u.dob,u.imageUrl,u.userRole,u.latitude,u.longitude,u.introduction,u.pageNo,up.value as password
    FROM ${TableName.Table_Users} as u
    INNER JOIN ${TableName.Table_Passport} as up
    ON u.userId = up.userId WHERE up.identifier = '${email}'`;
    // console.log('🚀 ~ UserQueries ~ findUserByEmail ~ query:', query);

    return {
      name: 'FIND USER BY EMAIL',
      type: 'SELECT',
      query: query,
    };
  }

  userSession(keys: any, values: any) {
    {
      const query = `INSERT INTO ${TableName.Table_UserSession} (${keys}) VALUES (${values})
      ON DUPLICATE KEY UPDATE
      accessToken = VALUES(accessToken),
      refreshToken = VALUES(refreshToken),
      deviceType = VALUES(deviceType),
      os = VALUES(os),
      deviceName = VALUES(deviceName),
      createdAt = NOW()
      `;

      return {
        name: 'INSERT USER SESSION',
        type: 'INSERT',
        query: query,
      };
    }
  }

  passwordInsert(keys: any, values: any) {
    const query = `INSERT INTO ${TableName.Table_Passport} (${keys}) VALUES (${values})
    ON DUPLICATE KEY UPDATE
    value = VALUES(value)`;
    return {
      name: 'INSERT PASSWORD',
      type: 'INSERT',
      query: query,
    };
  }

  subCategoryInsert(keys: any, values: any) {
    const query = `INSERT INTO ${TableName.Table_UserCategory} (${keys}) VALUES (${values})`;
    return {
      name: 'INSERT SUB CATEGORY',
      type: 'INSERT',
      query: query,
    };
  }

  removeAccount(userId: number) {
    const query = `UPDATE ${TableName.Table_Users} SET deletedStatus = 1 WHERE userId = ${userId}`;
    console.log('🚀 ~ UserQueries ~ removeAccount ~ query:', query);

    return {
      name: 'REMOVE ACCOUNT',
      type: 'DELETE',
      query: query,
    };
  }
}
