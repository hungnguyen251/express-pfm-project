export interface IBaseResponse<T = undefined> {
    status: string;
    message: string;
    code: string | number;
    data?: T;
  }
  