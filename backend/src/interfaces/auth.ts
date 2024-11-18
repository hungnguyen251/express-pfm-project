export interface IPayloadRegister {
  name: string;
  email: string;
  password: string;
}

export interface IPayloadLogin {
  email: string;
  password: string;
}

export interface IPayloadVerifyCode {
  email: string;
  code: string;
}

export interface ISessionUser {
  id: string;
  email: string;
  name: string;
  type: string;
}

export interface IPayloadChangePasswordWithToken {
  token: string;
  newPassword: string;
}