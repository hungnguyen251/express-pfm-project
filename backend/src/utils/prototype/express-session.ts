import { ISessionUser } from '../../interfaces/auth';

declare module 'express-session' {
  interface SessionData {
    user: ISessionUser;
  }
}