import express, { Request, Response } from 'express';
import authRoute from './auth';
import { rateLimiter } from '../middlewares/rate-limiter';

const router = express.Router();

/* GET home page. */
router.get('/', function(req: Request, res: Response) {
  res.json({ title: 'Express' });
});

router.use('/auth', rateLimiter, authRoute);

export default router;