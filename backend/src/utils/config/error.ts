export default class AppError<T = undefined> extends Error {
  status: string;

  constructor(
    public statusCode: number,
    public message: string,
    public code?: string | number,
    public data?: T
  ) {
    super(message);
    console.log(this.statusCode);
    
    this.status = `${statusCode}`.startsWith('4')
      ? 'failed'
      : 'error';
    this.code = code ? code : statusCode;
    this.data = data;

    Error.captureStackTrace(this, this.constructor);
  }
}
