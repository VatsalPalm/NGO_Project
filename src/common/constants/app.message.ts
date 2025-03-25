export enum USER_ERROR_LOGS {
  USER_NOT_FOUND = 'User not found',
  USER_ALREADY_EXIST = 'User already exist',
  USER_NOT_REGISTERED = 'User not registered',
  USER_NOT_LOGIN = 'User not login',
  USER_NOT_UPDATE = 'User not update',
  USER_NOT_DELETE = 'User not delete',
  USER_NOT_FOUND_BY_ID = 'User not found by id',
  USER_EMAIL_NOT_FOUND = 'User email not found',
  USER_PASSWORD_WORNG = 'User password is worng',
  USER_LOGIN_SUCCESSFULLY = 'User login successfully',
  OTP_SENT_SUCCESSFULLY = 'Otp sent successfully',
  OTP_VERIFY_SUCCESSFULLY = 'Otp verify successfully',
  INVALID_OTP = 'Invalid otp',
  OTP_LIMIT_EXCEEDED = 'Otp limit exceeded',
  OTP_EXPIRED = 'Otp is expired',
  FAILED_TO_SEND_OTP_EMAIL = 'Failed to send OTP email',
  USER_REGISTER_SUCCESSFULLY = 'User register successfully',
  ACCOUNT_DELETED_SUCCESSFULLY = 'Account deleted successfully',
}

export enum ACCESS_TOKEN_ERROR_LOGS {
  ACCESS_TOKEN_NOT_FOUND = 'Access token is not found',
  ACCESS_TOKEN_NOT_VALID = 'Access token is not valid',
  ACCESS_TOKEN_EXPIRED = 'Access token is expired',
  ACCESS_SCECRET_NOT_FOUND = 'Access secret key is not found',
  ACCESS_AUTHORIZATION_NOT_FOUND = 'Authorization header is missing',
}
