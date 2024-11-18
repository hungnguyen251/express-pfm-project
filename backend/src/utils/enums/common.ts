export enum ResponseStatusEnum {
  SUCCESS = 'success',
  FAILED = 'failed',
  ERROR = 'error',
}

export enum EmailTemplateEnum {
  PASSWORD_RESET_CONFIRMATION = 'password-reset-confirmation',
  REGISTER_SUCCESS = 'register',
  PASSWORD_RESET_REQUEST = 'password-reset-request',
  TWO_FACTOR_VERIFICATION = 'send-2fa-code',
}

export enum EmailSubjectEnum {
  PASSWORD_RESET_CONFIRMATION = 'Password reset confirmation',
  REGISTER_SUCCESS = 'Registration successful',
  PASSWORD_RESET_REQUEST = 'Password reset request',
  TWO_FACTOR_VERIFICATION = '2FA Verify Code',
}

export enum VerificationTypeEnum {
  PASSWORD_RESET = 'PASSWORD_RESET',
  TWO_FACTOR_AUTH = 'TWO_FACTOR_AUTH',
}