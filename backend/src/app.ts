import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import indexRouter from './routes';
import morgan from 'morgan';
import { requestError, requestNotFound } from './middlewares/request';
import middlewares from './middlewares';

const createApp = async () => {
  const app = express();

  app.use(morgan('dev'));
  app.use(middlewares.cors);
  app.use(middlewares.response);
  app.use(express.json({ limit: process.env.LIMIT_REQUEST_SIZE }));
  app.use(
    express.urlencoded({
      limit: process.env.LIMIT_REQUEST_SIZE,
      extended: true,
    })
  );
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/api', indexRouter);

  app.all('*', requestNotFound);
  app.use(requestError);

  return app;
};

export default createApp;
