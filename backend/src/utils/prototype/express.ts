export {};

declare global {
  namespace Express {
    interface Response {
      success(message: string, code: string | number, data?: object): void;
      created(message: string, code: string | number, data?: object): void;
  
      unauthorized(message: string, code: string | number): void;
      forbidden(message: string, code: string | number): void;
      badRequest(message: string, code: string | number, data?: object): void;
      notFound(message: string, code: string | number): void;
  
      internalServer(message: string, code: string | number): void;
    }
  }
}
