import express, { Request, Response } from 'express';
import authRoute from './auth';

const router = express.Router();

/* GET home page. */
router.get('/', function(req: Request, res: Response) {
  res.json({ title: 'Express' });
});

router.use('/auth', authRoute);

export default router;